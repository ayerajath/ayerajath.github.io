// Title, description and share tags for every page. Used by the build-time
// prerender (scripts/prerender.mjs) and by the client when the route changes.
import { getPost, getPosts } from './posts.js';

export const SITE = {
  url: 'https://rajathaithal.com',
  name: 'Rajath Aithal',
  description: 'Rajath Aithal builds systems that run on their own, and keeps score: backend and data by day, games, agents and AI tools on the side.',
  image: 'https://rajathaithal.com/rajath.jpg',
};

// First paragraph of a post as plain text, cut to about 155 characters.
const excerpt = (markdown) => {
  const para = markdown
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !/^(#|!\[|>|```|---|\*\s|-\s|\d+\.\s)/.test(p)) || '';
  const text = para
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= 155) return text;
  return `${text.slice(0, 152).replace(/\s+\S*$/, '')}…`;
};

// Every path the site serves, for the prerender and the sitemap.
export const routes = () => ['/', '/log', '/now', '/posts', ...getPosts().map((p) => `/posts/${p.slug}`)];

export const pageMeta = (pathname) => {
  const path = pathname.replace(/\/+$/, '') || '/';
  const base = { path, title: SITE.name, description: SITE.description, type: 'website' };

  if (path === '/') return base;
  if (path === '/now') {
    return { ...base, title: `Now · ${SITE.name}`, description: 'What Rajath Aithal is focused on right now.' };
  }
  if (path === '/log') {
    return { ...base, title: `Log · ${SITE.name}`, description: 'Everything Rajath Aithal wrote, watched and shipped, newest first.' };
  }
  if (path === '/posts') {
    return { ...base, title: `Writing · ${SITE.name}`, description: 'Posts by Rajath Aithal.' };
  }

  const slug = path.match(/^\/posts\/([^/]+)$/)?.[1];
  const post = slug && getPost(slug);
  if (post) {
    return {
      ...base,
      title: `${post.title} · ${SITE.name}`,
      description: post.description || excerpt(post.content) || SITE.description,
      type: 'article',
      post,
    };
  }
  return { ...base, title: `Not found · ${SITE.name}`, notFound: true };
};
