import React from 'react';
import { Link } from 'react-router-dom';
import { updated } from '../data/now.js';
import NowList from './NowList.jsx';

// A plain /now page, after Derek Sivers' nownownow.com idea.
const NowPage = () => (
  <>
    <Link to="/" className="back enter">← Back</Link>

    <header className="post-head enter" style={{ '--i': 1 }}>
      <h1 className="post-title">Now</h1>
      <p className="post-date">Updated {updated}, in Bengaluru</p>
    </header>

    <NowList className="enter" style={{ '--i': 2 }} />

    <p className="prose enter" style={{ '--i': 3, marginTop: 64 }}>
      This is a{' '}
      <a className="inline-link" href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">
        now page
      </a>
      .
    </p>
  </>
);

export default NowPage;
