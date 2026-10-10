import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, getPosts } from '../lib/posts.js';

const BlogListPage = () => (
  <>
    <Link to="/" className="back enter">← Back</Link>

    <header className="post-head enter" style={{ '--i': 1 }}>
      <h1 className="post-title">Writing</h1>
    </header>

    <ul className="list enter" style={{ '--i': 2 }}>
      {getPosts().map((post) => (
        <li key={post.slug}>
          <Link to={`/posts/${post.slug}`} className="list-row">
            <span className="list-title">{post.title}</span>
            <span className="list-date">{formatDate(post.date, { month: 'short', year: 'numeric' })}</span>
          </Link>
        </li>
      ))}
    </ul>
  </>
);

export default BlogListPage;
