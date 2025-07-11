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