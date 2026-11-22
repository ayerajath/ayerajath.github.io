import React from 'react';
import { Link } from 'react-router-dom';
import { VERBS } from '../lib/log.js';

const ext = { target: '_blank', rel: 'noopener noreferrer' };
const short = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
// Local calendar day; toISOString would shift early-morning dates back a day.
const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const Text = ({ entry }) => {
  const body = (
    <>
      <span className="log-text">{entry.text}</span>
      {entry.detail && (
        <span className="log-detail" aria-label={entry.detailLabel}>
          {entry.detail}
        </span>
      )}
    </>
  );
  if (entry.to) return <Link to={entry.to} className="log-link">{body}</Link>;
  if (entry.url) return <a href={entry.url} className="log-link" {...ext}>{body}</a>;
  return <span className="log-plain">{body}</span>;
};

// A dated list. With `years`, a year heading starts each year after the first.
const LogList = ({ entries, years = false }) => {
  let lastYear = entries[0]?.date.getFullYear();
  return (
    <ol className="log">
      {entries.map((entry, i) => {
        const year = entry.date.getFullYear();
        const newYear = years && year !== lastYear;
        lastYear = year;
        return (
          <React.Fragment key={`${iso(entry.date)}-${entry.kind}-${i}`}>
            {newYear && <li className="log-year" aria-hidden="true">{year}</li>}
            <li className="log-row">
              <time className="log-date" dateTime={iso(entry.date)}>
                {short(entry.date)}
                {years ? <span className="sr-only"> {year}</span> : null}
              </time>
              <span className={`log-kind kind-${entry.kind}`}>{VERBS[entry.kind] || entry.kind}</span>
              <Text entry={entry} />
            </li>
          </React.Fragment>
        );
      })}
    </ol>
  );
};

export default LogList;
