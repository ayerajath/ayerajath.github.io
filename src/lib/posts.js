// Loads every markdown post at build time and parses its frontmatter.
const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });

const parseMarkdown = (text) => {
  const frontmatter = {};
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  if (lines[0] !== '---') return { frontmatter, content: text };

  let i = 1;
  while (i < lines.length && lines[i] !== '---') {
    const line = lines[i];
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
    i++;
  }
  return { frontmatter, content: lines.slice(i + 1).join('\n') };
};

const parseTags = (raw) =>
  (raw || '').replace(/^\[|\]$/g, '').split(',').map((t) => t.trim()).filter(Boolean);

const posts = Object.values(modules)
  .map((raw) => {
    const { frontmatter, content } = parseMarkdown(raw);
    return {
      slug: frontmatter.slug,
      title: frontmatter.title,
      date: new Date(frontmatter.date),
      tags: parseTags(frontmatter.tags),
      featured: frontmatter.featured === 'true',
      draft: frontmatter.draft === 'true',
      content,
    };
  })
  .filter((p) => p.slug && p.title && !Number.isNaN(p.date.getTime()) && !p.draft)
  .sort((a, b) => b.date - a.date);


export const getPosts = () => posts;
export const getPost = (slug) => posts.find((p) => p.slug === slug);

export const formatDate = (date, opts = { month: 'short', day: 'numeric', year: 'numeric' }) =>
  date.toLocaleDateString('en-US', opts);
