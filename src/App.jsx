import React, { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage.jsx';
import BlogListPage from './components/BlogListPage.jsx';
import BlogPostPage from './components/BlogPostPage.jsx';
import NowPage from './components/NowPage.jsx';
import posthog from 'posthog-js';

const Pages = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main key={pathname} className="page">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/now" element={<NowPage />} />
        <Route path="/posts" element={<BlogListPage />} />
        <Route path="/posts/:slug" element={<BlogPostPage />} />
      </Routes>
    </main>
  );
};

function App() {
  useEffect(() => {
    posthog.capture('random_event', { foo: 'bar', time: Date.now() });
  }, []);

  return (
    <Router>
      <Pages />
    </Router>
  );
}

export default App;
