// Saves my recent Letterboxd diary entries to src/data/letterboxd.json (newest
// first). Runs before `dev` and `build`. If the feed can't be reached, the last
// saved file is kept so the build never fails because of it.
import { writeFile } from 'node:fs/promises';

const USER = 'ayerajath';
const KEEP = 20;
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
  const entries = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map((m) => m[1])
    .filter((it) => tag(it, 'letterboxd:filmTitle') && tag(it, 'letterboxd:watchedDate'))
    .slice(0, KEEP)
    .map((item) => ({
      title: tag(item, 'letterboxd:filmTitle'),
      year: tag(item, 'letterboxd:filmYear'),
      rating: Number(tag(item, 'letterboxd:memberRating')) || null,
      // ISO day, e.g. 2026-10-10
      watched: tag(item, 'letterboxd:watchedDate'),
      url: tag(item, 'link'),
      poster: (item.match(/<img src="([^"]+)"/) || [])[1] || '',
    }));
  if (!entries.length) throw new Error('no diary entries in feed');

  await writeFile(OUT, `${JSON.stringify(entries, null, 2)}\n`);
  console.log(`letterboxd: ${entries.length} entries, latest is ${entries[0].title} (${entries[0].year})`);
} catch (err) {
  console.warn(`letterboxd: could not refresh (${err.message}), keeping the saved one`);
}
