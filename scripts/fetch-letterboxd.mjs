// Saves my most recent Letterboxd diary entry to src/data/letterboxd.json.
// Runs before `dev` and `build`. If the feed can't be reached, the last saved
// file is kept so the build never fails because of it.
import { writeFile } from 'node:fs/promises';

const USER = 'ayerajath';
const OUT = new URL('../src/data/letterboxd.json', import.meta.url);

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? m[1].trim() : '';
};

try {
  const res = await fetch(`https://letterboxd.com/${USER}/rss/`, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();

  // Diary entries carry a filmTitle; lists in the feed don't.
  const item = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map((m) => m[1])
    .find((it) => tag(it, 'letterboxd:filmTitle'));
  if (!item) throw new Error('no diary entries in feed');

  const watched = tag(item, 'letterboxd:watchedDate');
  const latest = {
    title: tag(item, 'letterboxd:filmTitle'),
    year: tag(item, 'letterboxd:filmYear'),
    rating: Number(tag(item, 'letterboxd:memberRating')) || null,
    watched: watched
      ? new Date(`${watched}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '',
    url: tag(item, 'link'),
    poster: (item.match(/<img src="([^"]+)"/) || [])[1] || '',
  };

  await writeFile(OUT, `${JSON.stringify(latest, null, 2)}\n`);
  console.log(`letterboxd: latest is ${latest.title} (${latest.year})`);
} catch (err) {
  console.warn(`letterboxd: could not refresh (${err.message}), keeping the saved one`);
}
