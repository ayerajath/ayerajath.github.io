import React, { useEffect, useId, useRef, useState } from 'react';
import { office, profiles } from '../data/links.js';
import './Popover.css';

// Inline word that opens a small card on hover, focus or tap.
const Popover = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const [below, setBelow] = useState(false);
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const closeTimer = useRef(null);
  const id = useId();

  const show = () => {
    clearTimeout(closeTimer.current);
    // Open below the word when there is no room above it.
    const top = rootRef.current.getBoundingClientRect().top;
    setBelow(top < (cardRef.current?.offsetHeight || 0) + 24);
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onDown = (e) => !rootRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <span
      ref={rootRef}
      className="pop"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => !rootRef.current.contains(e.relatedTarget) && hide()}
    >
      <button
        type="button"
        className="pop-trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => (open ? setOpen(false) : show())}
      >
        {label}
      </button>
      <span
        ref={cardRef}
        id={id}
        role="group"
        className={`pop-card ${below ? 'is-below' : ''} ${open ? 'is-open' : ''}`}
      >
        {children}
      </span>
    </span>
  );
};

// A tiny map of streets with a pin on the office.
export const OfficeCard = () => (
  <>
    <svg className="pop-map" viewBox="0 0 240 110" aria-hidden="true">
      <rect width="240" height="110" className="map-land" />
      <path d="M150 0 C 140 30 168 60 160 110" className="map-park" />
      <path d="M0 64 H240 M0 30 C 80 36 160 22 240 28 M0 92 H240" className="map-road" />
      <path d="M52 0 V110 M118 0 C 112 40 126 70 120 110 M196 0 V110" className="map-road" />
      <path d="M0 48 H240 M84 0 V110 M170 0 V110 M0 14 H240" className="map-lane" />
      <circle cx="120" cy="58" r="10" className="map-pulse" />
      <circle cx="120" cy="58" r="5" className="map-pin" />
    </svg>
    <span className="pop-body">
      <span className="pop-title">{office.title}</span>
      <span className="pop-sub">{office.sub}</span>
      <span className="pop-meta">{office.coords}</span>
    </span>
  </>
);

const stars = (rating) => '★'.repeat(Math.floor(rating)) + (rating % 1 ? '½' : '');

// The most recent thing on each service, when one is filled in.
const Latest = ({ service, item }) => {
  if (service === 'letterboxd') {
    return (
      <a className="pop-latest" href={item.url} target="_blank" rel="noopener noreferrer">
        {item.poster && <img className="pop-poster" src={item.poster} alt="" loading="lazy" />}
        <span className="pop-latest-text">
          <span className="pop-meta">Last watched</span>
          <span className="pop-title">
            {item.title} <span className="pop-sub">{item.year}</span>
          </span>
          <span className="pop-stars" aria-label={`${item.rating} out of 5`}>{stars(item.rating)}</span>
          <span className="pop-meta">{item.watched}</span>
        </span>
      </a>
    );
  }
  if (service === 'strava') {
    return (
      <span className="pop-latest">
        <span className="pop-latest-text">
          <span className="pop-meta">Latest run · {item.date}</span>
          <span className="pop-stats">
            <span><b>{item.distance}</b></span>
            <span>{item.time}</span>
            {item.pace && <span>{item.pace}</span>}
          </span>
        </span>
      </span>
    );
  }
  return (
    <span className="pop-latest">
      <span className="pop-latest-text">
        <span className="pop-meta">Currently reading</span>
        <span className="pop-title">{item.title}</span>
        {item.author && <span className="pop-sub">{item.author}</span>}
      </span>
    </span>
  );
};

// A profile on another site: name, a line about it, the latest thing, the link.
export const ProfileCard = ({ service }) => {
  const p = profiles[service];
  return (
    <span className="pop-body">
      <span className="pop-head">
        <span className={`pop-mark mark-${service}`} aria-hidden="true">{p.name[0]}</span>
        <span className="pop-title">{p.name}</span>
      </span>
      <span className="pop-sub">{p.blurb}</span>
      {p.latest && <Latest service={service} item={p.latest} />}
      {p.url && (
        <a className="pop-link" href={p.url} target="_blank" rel="noopener noreferrer">
          Open {p.name} ↗
        </a>
      )}
    </span>
  );
};

export default Popover;
