import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import './HomePage.css'; // We'll create this for specific homepage styles

const HomePage = () => {
  return (
    <div className="container home-page">
      <section className="intro-section">
        <p>
          Hey! I'm Rajath Aithal, an engineer based in Bengaluru, India.
          Welcome to this tiny corner of the internet. I hope to make it a little more interesting.
        </p>
        <p>
          I'm currently working at <a href="https://www.launchdarkly.com" target="_blank" rel="noopener noreferrer">LaunchDarkly</a>. Joined via an acquisition of my previous company, <a href="https://www.houseware.io" target="_blank" rel="noopener noreferrer">Houseware</a>!
          We're building a Product Analytics platform inside of LaunchDarkly.
        </p>

        <p>
          I'm interested in almost everything. I love to listen to people's stories. I love to learn.
        </p>

        <p>
          If there are some things that I spend most of my time on, it's building products, learning new stuff, finance/stock markets.
        </p>

        <p>
          Outside all of this, I love to play sports, watch movies and play games. 
          I'm trying to run more, I have some goals that I'm trying to achieve. Let's see how it goes.
        </p>
      </section>

      <section className="social-links-section">
        <h2>Connect</h2>
        <div className="social-links-grid">
          <a href="https://twitter.com/ayerajath" target="_blank" rel="noopener noreferrer" className="social-link">
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="social-label">Twitter/X</span>
          </a>
          <a href="https://www.linkedin.com/in/rajathaithal/" target="_blank" rel="noopener noreferrer" className="social-link">
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="social-label">LinkedIn</span>
          </a>
          <a href="https://www.github.com/ayerajath" target="_blank" rel="noopener noreferrer" className="social-link">
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="social-label">GitHub</span>
          </a>
          <a href="mailto:rajathaithal@gmail.com" className="social-link">
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z"/>
            </svg>
            <span className="social-label">Email</span>
          </a>
        </div>
      </section>



    </div>
  );
};

export default HomePage; 