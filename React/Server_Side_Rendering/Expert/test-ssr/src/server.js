import express from 'express';
import fs from 'fs';
import path from 'path';
import * as url from 'url';

import { renderPage, prerenderPages } from './common';

const app = express();

const prerenderHtml = {};
for (const page of prerenderPages) {
  const pageHtml = fs.readFileSync(
    path.resolve(__dirname, `../dist/${page}.html`)
  );
  prerenderHtml[page] = pageHtml;
}

const html = fs.readFileSync(
  path.resolve(__dirname, '../dist/index.html'),
  'utf8'
);
app.use('/dist', express.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const page = parseUrl.pathname ? parseUrl.pathname.substr(1) : 'home';
  const initialDate = { page };
  const pageHtml = prerenderPages.includes(page)
    ? prerenderHtml[page]
    : renderPage(page);
  const result = pageHtml.replace(
    '__DATA_FROM_SERVER__',
    JSON.stringify(initialDate)
  );
  res.send(result);
});
app.listen(3000);
