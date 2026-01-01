import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './Blog.css';
import ReadingProgressBar from './ReadingProgressBar.jsx';

// Helper function to parse frontmatter and content
const parseMarkdown = (text) => {
  const frontmatter = {};
  let content = text;
  const lines = text.split('\n');
  if (lines[0] === '---') {
    let i = 1;
    let contentStartIndex = 0;
    while (lines[i] !== '---' && i < lines.length) {
      const line = lines[i];
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
        frontmatter[key] = value;
      }
      i++;
    }
    contentStartIndex = i + 1;
    content = lines.slice(contentStartIndex).join('\n');
  }
  return { frontmatter, content };
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({ frontmatter: {}, content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        // Dynamically import the markdown file based on the slug
        // This assumes a naming convention like `slug.md` in `src/posts`
        // For Vite: import(`../posts/${slug}.md?raw`)
        // For CRA, this is more complex and might require ejecting or using raw-loader
        // As a fallback, we will try to match against the glob import again.

        const postModules = import.meta.glob('../posts/*.md', { as: 'raw' });
        let found = false;
        for (const path in postModules) {
          if (path.includes(`/${slug}.md`)) {
            const rawContent = await postModules[path]();
            const { frontmatter, content } = parseMarkdown(rawContent);
            console.log(frontmatter);
            console.log(slug);
            if (frontmatter.slug === slug) {
              setPost({ frontmatter, content });
              found = true;
              break;
            }
          }
        }
        if (!found) {
          setError('Post not found.');
        }

      } catch (e) {
        console.error("Error fetching post:", e);
        setError('Could not load the post.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return <div className="container"><p>Loading post...</p></div>;
  }

  if (error) {
    return <div className="container"><p>{error}</p></div>;
  }

  if (!post.frontmatter.title) {
    return <div className="container"><p>Post not found.</p></div>;
  }

  const tags = post.frontmatter.tags ? post.frontmatter.tags.replace(/^\[|\]$/g, '').split(',').map(tag => tag.trim()) : [];

  return (
    <div className="container blog-post">
      <ReadingProgressBar />
      <header className="blog-post-header">
        <h1 className="post-title">{post.frontmatter.title}</h1>
        <div className="post-meta">
          <time className="post-date">{new Date(post.frontmatter.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
          {tags.length > 0 && (
            <div className="post-tags">
              {tags.map(tag => (
                <span key={tag} className="post-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </header>
      <article className="post-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
};

export default BlogPostPage; 