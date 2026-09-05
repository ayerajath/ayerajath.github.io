import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

// Helper function to parse frontmatter (simplified)
const parseFrontmatter = (text) => {
  const frontmatter = {};
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  if (lines[0] === '---') {
    let i = 1;
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
  }
  return frontmatter;
};

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // This uses import.meta.glob, common in Vite.
    // For Create React App, you might need a different approach or a build script.
    const fetchPosts = async () => {
      const postModules = import.meta.glob('../posts/*.md', { as: 'raw' });
      const postList = [];
      for (const path in postModules) {
        const rawContent = await postModules[path]();
        const frontmatter = parseFrontmatter(rawContent);
        if (frontmatter.slug && frontmatter.title && frontmatter.date && frontmatter.draft !== 'true') {
          const tag = (frontmatter.tags || '').replace(/^\[|\]$/g, '').split(',')[0].trim();
          postList.push({
            slug: frontmatter.slug,
            title: frontmatter.title,
            date: frontmatter.date,
            tag,
            featured: frontmatter.featured === 'true',
          });
        }
      }
      // Sort posts by date, newest first
      postList.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(postList);
    };

    fetchPosts();
  }, []);

  if (!posts.length) {
    return (
      <div className="container">
        <div className="blog-list-container">
          <p className="blog-loading mono">Loading posts…</p>
        </div>
      </div>
    );
  }

  const postsByYear = posts.reduce((groups, post) => {
    const year = new Date(post.date).getFullYear();
    (groups[year] = groups[year] || []).push(post);
    return groups;
  }, {});

  return (
    <div className="container">
      <div className="blog-list-container">
        {Object.keys(postsByYear).sort((a, b) => b - a).map((year) => (
          <div key={year} className="blog-year-group">
            <h2 className="blog-year-label mono">{year}</h2>
            <ul className="blog-list">
              {postsByYear[year].map((post, index) => (
                <li key={post.slug} className="blog-list-item reveal" style={{ animationDelay: `${index * 0.1 + 0.1}s` }}>
                  <Link to={`/posts/${post.slug}`} className="blog-list-link">
                    <span className="blog-post-title">
                      {post.featured && <span className="blog-post-marker" title="Featured">●</span>}
                      {post.title}
                    </span>
                    <span className="blog-post-meta">
                      {post.tag && <span className="blog-post-tag">{post.tag}</span>}
                      <span className="blog-post-date">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListPage; 