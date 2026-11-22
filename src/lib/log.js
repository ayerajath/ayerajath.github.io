// One dated stream of everything: posts, films, and hand-written entries.
import { getPosts } from './posts.js';
import { entries } from '../data/log.js';
import films from '../data/letterboxd.json';

// Parse 'YYYY-MM-DD' at local noon so the day never shifts with the time zone.
const day = (iso) => new Date(`${iso.slice(0, 10)}T12:00:00`);

// Films are frequent; keep the most recent few so they don't drown the rest.
const FILMS = 6;

const stars = (rating) => (rating ? '★'.repeat(Math.floor(rating)) + (rating % 1 ? '½' : '') : '');

// Built on first use (not at import), so builds with the worklog flag off drop it.
let all;
const build = () => [
  ...getPosts().map((p) => ({
    date: p.date,
    kind: 'wrote',
    text: p.title,
    to: `/posts/${p.slug}`,
  })),
  ...(Array.isArray(films) ? films : []).slice(0, FILMS).map((f) => ({
    date: day(f.watched),
    kind: 'watched',
    text: f.title,
    detail: [f.year, stars(f.rating)].filter(Boolean).join(' · '),
    detailLabel: f.rating ? `${f.year}, rated ${f.rating} out of 5` : f.year,
    url: f.url,
  })),
  ...entries.map((e) => ({ ...e, date: day(e.date) })),
]
  .filter((e) => !Number.isNaN(e.date.getTime()))
  .sort((a, b) => b.date - a.date);

export const getLog = (limit) => {
  all = all || build();
  return limit ? all.slice(0, limit) : all;
};

export const VERBS = {
  wrote: 'Wrote',
  watched: 'Watched',
  shipped: 'Shipped',
  note: 'Note',
  ran: 'Ran',
  read: 'Read',
  learned: 'Learned',
};
