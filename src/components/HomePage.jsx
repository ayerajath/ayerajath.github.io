import React from 'react';
import './HomePage.css';
import profileImg from '../assets/rajath.jpg';
import RunningPanda from './RunningPanda.jsx';

const HomePage = () => {
  return (
    <div className="container home-page">
      <header className="hero-header reveal" style={{ animationDelay: '0.1s' }}>
        <div className="hero-content">
          <h1 className="hero-title">Rajath Aithal.</h1>
          <img
            src={profileImg}
            alt="Rajath Aithal"
            className="hero-avatar"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('panda-wave'))}
          />
        </div>
      </header>

      <div className="home-sections">
        <section className="home-section meta-container mono reveal" style={{ animationDelay: '0.2s' }}>
          <div className="meta-row">
            <span className="meta-label">Status</span>
            <span className="meta-value">Engineering @ <a href="https://www.launchdarkly.com" target="_blank" rel="noopener noreferrer">LaunchDarkly</a></span>
          </div>
          <div className="meta-row">
            <span className="meta-label">Location</span>
            <span className="meta-value">Bengaluru, India</span>
          </div>
        </section>

        <section className="home-section bio-container reveal" style={{ animationDelay: '0.3s' }}>
          <p className="bio-traits">
            Curious. Agentic. Engineer. Product. Sports. Video Games.
          </p>
          <p className="bio-text">
            I love building products that matter and understanding how things work.
            Deeply interested in finance, stock markets, and human stories.
          </p>
        </section>

        <section className="home-section connect-container mono reveal" style={{ animationDelay: '0.4s' }}>
          <h2 className="section-label">Connect</h2>
          <div className="social-links">
            <a href="https://twitter.com/ayerajath" target="_blank" rel="noopener noreferrer">Twitter/X</a>
            <a href="https://www.linkedin.com/in/rajathaithal/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.github.com/ayerajath" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:rajathaithal@gmail.com">Email</a>
          </div>
        </section>
      </div>

      <RunningPanda />
    </div>
  );
};

export default HomePage;