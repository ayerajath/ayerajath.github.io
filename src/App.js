import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage';
import BlogListPage from './components/BlogListPage';
import BlogPostPage from './components/BlogPostPage';
// import AboutPage from './components/AboutPage';
import profileImg from './assets/rajath.jpg';
import posthog from 'posthog-js';

// Placeholder components - we'll create these soon
// const HomePage = () => <div className="container"><h1>Home</h1><p>Welcome to my blog!</p></div>;
// const BlogListPage = () => <div className="container"><h1>Blog</h1><p>Coming soon...</p></div>;
// const BlogPostPage = () => <div className="container"><h1>Blog Post</h1><p>Coming soon...</p></div>;
// const AboutPage = () => <div className="container"><h1>About</h1><p>A little bit about me.</p></div>;

function App() {
  useEffect(() => {
    posthog.capture('app_loaded', { time: Date.now() });
  }, []);
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-flex">
            <img src={profileImg} alt="Rajath Aithal" className="profile-image" />
            <nav className="header-nav-group">
              <div className="nav-bottom">
                <Link to="/">About</Link>
                <Link to="/posts">Posts</Link>
              </div>
            </nav>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<BlogListPage />} />
            <Route path="/posts/:slug" element={<BlogPostPage />} />
            {/* <Route path="/about" element={<AboutPage />} /> */}
          </Routes>
        </main>
        {/* <footer className="App-footer">
          <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </footer> */}
      </div>
    </Router>
  );
}

export default App; 