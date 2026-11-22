import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../assets/rajath.jpg';
import { formatDate, getPosts } from '../lib/posts.js';
import { getLog } from '../lib/log.js';
import { featured } from '../data/featured.js';
import LogList from './LogList.jsx';

const posts = getPosts();
const log = getLog(8);

const ext = { target: '_blank', rel: 'noopener noreferrer' };

const bengaluruTime = () =>
  new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' });

const useClock = () => {
  const [time, setTime] = useState(bengaluruTime);
  useEffect(() => {
    // The prerendered HTML holds the build-time clock; correct it right away.
    setTime(bengaluruTime());
    const id = setInterval(() => setTime(bengaluruTime()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const Block = ({ title, i, aside, children }) => (
  <section className="block enter" style={{ '--i': i }} aria-labelledby={`h-${title}`}>
    <div className="block-head">
      <h2 id={`h-${title}`} className="block-title">{title}</h2>
      {aside}
    </div>
    {children}
  </section>
);

const HomePage = () => {
  const time = useClock();

  return (
    <>
      <header className="hero enter">
        <div className="hero-id">
          <img src={profileImg} alt="" className="hero-photo" width="48" height="48" />
          <div>
            <h1 className="hero-name">Rajath Aithal</h1>
            <p className="meta">
              Bengaluru · <span suppressHydrationWarning>{time}</span>
            </p>
          </div>
        </div>

        <p className="hero-line">I build systems that run on their own, and I keep score.</p>

        <p className="hero-body">
          By day, backend and data at a stealth startup. On the side, a pipeline that ships browser games, an agent
          that scouts for product ideas, and tools for working with AI. Off the keyboard: up at six, running, and
          reading fifteen minutes a day.
        </p>

        <nav className="hero-links" aria-label="Elsewhere">
          <a href="https://twitter.com/ayerajath" {...ext}>X</a>
          <a href="https://www.github.com/ayerajath" {...ext}>GitHub</a>
          <a href="https://www.linkedin.com/in/rajathaithal/" {...ext}>LinkedIn</a>
          <a href="mailto:rajathaithal@gmail.com">Email</a>
        </nav>
      </header>

      <Block title="Systems" i={1}>
        <ul className="systems">
          {featured.map((s) => {
            const inner = (
              <>
                <span className="system-top">
                  <span className="system-name">{s.name}</span>
                  <span className="meta">{s.since}</span>
                </span>
                <span className="system-what">{s.what}</span>
                <span className="system-score">{s.score}</span>
              </>
            );
            return (
              <li key={s.name}>
                {s.url ? (
                  <a className="system is-link" href={s.url} {...ext}>{inner}</a>
                ) : (
                  <div className="system">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Block>

      <Block title="Log" i={2} aside={<Link to="/log" className="block-more">Full log →</Link>}>
        <LogList entries={log} />
      </Block>

      <Block title="Writing" i={3}>
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
      </Block>

      <footer className="foot enter" style={{ '--i': 4 }}>
        <p>
          Follow along on <a href="https://twitter.com/ayerajath" {...ext}>X</a> or by{' '}
          <a href="/rss.xml">RSS</a>. What I'm focused on lives on the <Link to="/now">now page</Link>.
        </p>
      </footer>
    </>
  );
};

export default HomePage;
