import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../assets/rajath.jpg';
import { formatDate, getPosts } from '../lib/posts.js';
import { updated } from '../data/now.js';
import NowList from './NowList.jsx';
import Popover, { OfficeCard } from './Popover.jsx';

const posts = getPosts();

const ext = { target: '_blank', rel: 'noopener noreferrer' };

const bengaluruTime = () =>
  new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' });

const useClock = () => {
  const [time, setTime] = useState(bengaluruTime);
  useEffect(() => {
    const id = setInterval(() => setTime(bengaluruTime()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const Section = ({ title, i, children }) => (
  <section className="section enter" style={{ '--i': i }}>
    <h2 className="section-title">{title}</h2>
    <div className="section-body">{children}</div>
  </section>
);

const HomePage = () => {
  const time = useClock();

  return (
    <>
      <header className="intro enter">
        <img src={profileImg} alt="Rajath Aithal" className="intro-photo" />
        <div>
          <h1 className="intro-name">Rajath Aithal</h1>
          <p className="intro-role">Software Engineer</p>
        </div>
        <p className="intro-clock">
          <span className="clock-dot" aria-hidden="true" />
          Bengaluru, {time}
        </p>
      </header>

      <Section title="Today" i={1}>
        <div className="prose">
          <p>
            I work on backend and data at a{' '}
            <Popover label="stealth startup"><OfficeCard /></Popover> in Bengaluru. I like building products that make me
            curious, and I'm always learning, lately about the experience layer on top of the systems.
          </p>
          <p>I care about discipline and consistency. Up at six most days, a little better every day.</p>
        </div>
      </Section>

      <Section title="Now" i={2}>
        <NowList />
        <Link to="/now" className="more-link">Updated {updated} →</Link>
      </Section>

      <Section title="Writing" i={3}>
        <ul className="list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`} className="list-row">
                <span className="list-title">{post.title}</span>
                <span className="list-date">{formatDate(post.date, { month: 'short', year: 'numeric' })}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Elsewhere" i={4}>
        <p className="prose">
          <a className="inline-link" href="https://twitter.com/ayerajath" {...ext}>X</a>,{' '}
          <a className="inline-link" href="https://www.linkedin.com/in/rajathaithal/" {...ext}>LinkedIn</a>,{' '}
          <a className="inline-link" href="https://www.github.com/ayerajath" {...ext}>GitHub</a>, or say hi at{' '}
          <a className="inline-link" href="mailto:rajathaithal@gmail.com">rajathaithal@gmail.com</a>.
        </p>
      </Section>
    </>
  );
};

export default HomePage;
