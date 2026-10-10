import lastWatched from './letterboxd.json';

// Content for the hover popovers. Strava and Fable `latest` are filled in by
// hand; Letterboxd updates itself. Anything left empty is simply not shown.
export const office = {
  title: 'Indiranagar, Bengaluru',
  sub: 'Where the stealth startup is',
  coords: '12.9784° N, 77.6408° E',
};

export const profiles = {
  strava: {
    name: 'Strava',
    blurb: 'Every run, logged. The streak lives here.',
    url: 'https://www.strava.com/athletes/116489930',
    // Latest run, e.g. { distance: '8.2 km', time: '44:10', pace: '5:23 /km', date: 'Oct 9, 2026' }
    latest: null,
  },
  fable: {
    name: 'Fable',
    blurb: 'What I am reading, and what I thought of it.',
    url: 'https://fable.co/fabler/rajath-aithal-107396400076?tab=stats&period_type=year',
    // Current book, e.g. { title: 'Atomic Habits', author: 'James Clear' }
    latest: null,
  },
  letterboxd: {
    name: 'Letterboxd',
    blurb: 'Films I have watched, with the occasional review.',
    url: 'https://letterboxd.com/ayerajath/',
    // Refreshed from https://letterboxd.com/ayerajath/rss/ on every dev/build.
    latest: lastWatched,
  },
};
