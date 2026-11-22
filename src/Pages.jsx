import React, { useEffect, useLayoutEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import HomePage from './components/HomePage.jsx';
import ClassicHomePage from './components/ClassicHomePage.jsx';
import BlogListPage from './components/BlogListPage.jsx';
import BlogPostPage from './components/BlogPostPage.jsx';
import NowPage from './components/NowPage.jsx';
import LogPage from './components/LogPage.jsx';
import { pageMeta } from './lib/meta.js';
import { REDESIGN } from './lib/flags.js';

const NotFoundPage = () => (
  <>
    <Link to="/" className="back enter">← Back</Link>
    <p className="prose enter" style={{ '--i': 1 }}>This page doesn't exist.</p>
  </>
);

// useLayoutEffect warns during the prerender, where there is no window to scroll.
const useClientLayoutEffect = typeof window === 'undefined' ? () => {} : useLayoutEffect;

// The routes, shared by the browser app (App.jsx) and the prerender (entry-server.jsx).
const Pages = () => {
  const { pathname } = useLocation();

  useClientLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Keep the tab title in step with client-side navigation.
  useEffect(() => {
    document.title = pageMeta(pathname).title;
  }, [pathname]);

  return (
    <main key={pathname} className={REDESIGN ? 'page is-redesign' : 'page'}>
      <Routes>
        <Route path="/" element={REDESIGN ? <HomePage /> : <ClassicHomePage />} />
        <Route path="/now" element={<NowPage />} />
        {REDESIGN && <Route path="/log" element={<LogPage />} />}
        <Route path="/posts" element={<BlogListPage />} />
        <Route path="/posts/:slug" element={<BlogPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
};

export default Pages;
