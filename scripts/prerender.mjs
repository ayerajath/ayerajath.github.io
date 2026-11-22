// Runs after `vite build` and the SSR build. Writes one static HTML file per
// route (index.html, now.html, posts/<slug>.html, ...) with the page content and
// its own title and share tags, so search engines and link previews see a real
// page with HTTP 200 instead of the SPA 404 fallback. Also writes 404.html (the
// empty app shell, for unknown URLs) and sitemap.xml.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { render, routes, pageMeta, SITE } = await import(pathToFileURL(join(ssrDir, 'entry-server.mjs')).href);

const template = await readFile(join(dist, 'index.html'), 'utf8');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Replace the content of an existing <meta name|property="key" content="..."> tag.
const setMeta = (html, key, value) => {
  const re = new RegExp(`(<meta\\s+(?:name|property)="${key}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`index.html has no <meta> for ${key}`);
  return html.replace(re, `$1${esc(value)}$2`);
};

const head = (html, meta) => {
  const url = `${SITE.url}${meta.path === '/' ? '/' : meta.path}`;
  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);
  out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  out = setMeta(out, 'description', meta.description);
  for (const p of ['og', 'twitter']) {
    out = setMeta(out, `${p}:url`, url);
    out = setMeta(out, `${p}:title`, meta.post ? meta.post.title : meta.title);
    out = setMeta(out, `${p}:description`, meta.description);
  }
  out = setMeta(out, 'og:type', meta.type);

  let extra = '';
  if (meta.post) {
    const published = meta.post.date.toISOString();
    extra += `  <meta property="article:published_time" content="${published}" />\n`;
    extra += `  <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: meta.post.title,
      description: meta.description,
      datePublished: published,
      url,
      image: SITE.image,
      author: { '@type': 'Person', name: SITE.name, url: SITE.url },
    }).replace(/</g, '\\u003c')}</script>\n`;
  }
  if (meta.notFound) extra += '  <meta name="robots" content="noindex" />\n';
  return extra ? out.replace('</head>', `${extra}</head>`) : out;
};

const fileFor = (path) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`);

for (const path of routes()) {
  const html = head(template, pageMeta(path)).replace(
    '<div id="root"></div>',
    `<div id="root">${render(path)}</div>`
  );
  const file = join(dist, fileFor(path));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  console.log(`prerendered ${path} -> ${fileFor(path)}`);
}

// Unknown URLs: GitHub Pages serves 404.html with status 404, and the app
// renders the right page (or "doesn't exist") in the browser.
await writeFile(join(dist, '404.html'), head(template, pageMeta('/__not-found__')));

const day = (d) => d.toISOString().slice(0, 10);
const posts = routes().filter((p) => p.startsWith('/posts/'));
const lastPost = pageMeta(posts[0] || '/').post?.date || new Date();
const entries = routes().map((path) => {
  const meta = pageMeta(path);
  const lastmod = meta.post ? meta.post.date : lastPost;
  return `  <url>\n    <loc>${SITE.url}${path === '/' ? '/' : path}</loc>\n    <lastmod>${day(lastmod)}</lastmod>\n  </url>`;
});
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`
);
console.log(`sitemap.xml: ${entries.length} URLs`);

await rm(ssrDir, { recursive: true, force: true });
