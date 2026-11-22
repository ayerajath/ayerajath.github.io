import React from 'react';
import { Link } from 'react-router-dom';
import { getLog } from '../lib/log.js';
import LogList from './LogList.jsx';

const LogPage = () => (
  <>
    <Link to="/" className="back enter">← Back</Link>

    <header className="post-head enter" style={{ '--i': 1 }}>
      <h1 className="post-title">Log</h1>
      <p className="meta">Everything I wrote, watched and shipped, newest first.</p>
    </header>

    <div className="enter" style={{ '--i': 2 }}>
      <LogList entries={getLog()} years />
    </div>
  </>
);

export default LogPage;
