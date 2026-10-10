import React from 'react';
import Popover, { OfficeCard, ProfileCard } from './Popover.jsx';
import { now } from '../data/now.js';

const card = (pop) => (pop === 'office' ? <OfficeCard /> : <ProfileCard service={pop} />);

// Splits `note` around the phrase that opens the popover.
const Note = ({ item }) => {
  const at = item.popOn ? item.note.indexOf(item.popOn) : -1;
  if (at < 0) return item.note;
  return (
    <>
      {item.note.slice(0, at)}
      <Popover label={item.popOn}>{card(item.pop)}</Popover>
      {item.note.slice(at + item.popOn.length)}
    </>
  );
};

const NowList = ({ className = '', style }) => (
  <dl className={`now ${className}`} style={style}>
    {now.map((item) => (
      <div key={item.title} className="now-row">
        <dt>
          {item.pop && !item.popOn ? <Popover label={item.title}>{card(item.pop)}</Popover> : item.title}
        </dt>
        <dd>
          <Note item={item} />
        </dd>
      </div>
    ))}
  </dl>
);

export default NowList;
