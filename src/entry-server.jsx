// Build-time renderer: turns each route into static HTML (see scripts/prerender.mjs).
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import Pages from './Pages.jsx';

export { pageMeta, routes, SITE } from './lib/meta.js';
export { getPosts } from './lib/posts.js';

export const render = (url) =>
  renderToString(
    <StaticRouter location={url}>
      <Pages />
    </StaticRouter>
  );
