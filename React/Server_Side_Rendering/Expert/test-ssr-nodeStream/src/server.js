import express from 'express';
import fs from 'fs';
import path from 'path';
import * as url from 'url';
import lruCache from 'lru-cache';

import { renderPage, prerenderPages } from './common';

const ssrCache = new lruCache({
  max: 100,
  maxAge: 1000 * 60,
});

const app = express();

const prerenderHtml = {};
for (const page of prerenderPages) {
  const pageHtml = fs.readFileSync(
    path.resolve(__dirname, `../dist/${page}.html`),
    'utf8'
  );
  prerenderHtml[page] = pageHtml;
}

const html = fs
  .readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8')
  .replace('__STYLE_FROM_SERVER__', '');

app.use('/dist', express.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const cacheKey = parseUrl.path;
  if (ssrCache.has(cacheKey)) {
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  const page = parseUrl.pathname ? parseUrl.pathname.substr(1) : 'home';
  const initialData = { page };
  const pageHtml = prerenderPages.includes(page)
    ? prerenderHtml[page]
    : renderPage(page);
  const result = pageHtml.replace(
    '__DATA_FROM_SERVER__',
    JSON.stringify(initialData)
  );
  ssrCache.set(cacheKey, result);
  res.send(result);
});
app.listen(3000);
