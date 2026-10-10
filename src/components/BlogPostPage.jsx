import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { formatDate, getPost } from '../lib/posts.js';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  return (
    <>
      <Link to="/" className="back enter">← Back</Link>

      {post ? (
        <article>
          <header className="post-head enter" style={{ '--i': 1 }}>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-date">{formatDate(post.date, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </header>
          <div className="post-body enter" style={{ '--i': 2 }}>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      ) : (
        <p className="prose enter" style={{ '--i': 1 }}>This post doesn't exist.</p>
      )}
    </>
  );
};

export default BlogPostPage;
