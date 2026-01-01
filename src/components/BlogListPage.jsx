import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

// Helper function to parse frontmatter (simplified)
const parseFrontmatter = (text) => {
  const frontmatter = {};
  const lines = text.split('\n');
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
        console.log(path, frontmatter);
        if (frontmatter.slug && frontmatter.title && frontmatter.date && frontmatter.draft !== 'true') {
          postList.push({
            slug: frontmatter.slug,
            title: frontmatter.title,
            date: frontmatter.date,
          });
          console.log(postList);
        }
      }
      // Sort posts by date, newest first
      postList.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(postList);
    };

    fetchPosts();
  }, []);

  if (!posts.length) {
    return <div className="container"><p>Loading posts...</p></div>;
  }

  return (
    <div className="container">
      <div className="blog-list-container">
        <ul className="blog-list">
          {posts.map((post, index) => (
            <li key={post.slug} className="blog-list-item reveal" style={{ animationDelay: `${index * 0.1 + 0.1}s` }}>
              <Link to={`/posts/${post.slug}`} className="blog-list-link">
                <span className="blog-post-title">{post.title}</span>
                <span className="blog-post-date">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogListPage; 