import React from 'react';
import './HomePage.css';
import profileImg from '../assets/rajath.jpg';

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
          />
        </div>
      </header>

      <div className="home-sections">
        <section className="home-section meta-container mono reveal" style={{ animationDelay: '0.2s' }}>
          <div className="meta-row">
            <span className="meta-label">Status</span>
            <span className="meta-value">Engineering Backend and Data @ Stealth</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">Location</span>
            <span className="meta-value">Bengaluru, India</span>
          </div>
        </section>

        <section className="home-section bio-container reveal" style={{ animationDelay: '0.3s' }}>
          <p className="bio-traits">
            Curious. Engineer.
          </p>
          <p className="bio-text">
            I love to build products that intrigue me!
            Interested in a lot of things and always learning!
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
    </div>
  );
};

export default HomePage;