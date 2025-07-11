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
          I'm currently working at LaunchDarkly. Joined via an acquisition of my previous company, Houseware!
        </p>

        <p>
          I'm interested in almost everything. Everything has a story.
        </p>
      </section>

      <section className="contact-section">
        <p>
          You can find me on <a href="https://twitter.com/ayerajath" target="_blank" rel="noopener noreferrer">Twitter/X</a> or 
          <a href="mailto:rajath.aithal@gmail.com"> email me</a>.
        </p>
      </section>



    </div>
  );
};

export default HomePage; 