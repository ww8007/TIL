import express from 'express';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './App';
import * as url from 'url';

import { ServerStyleSheet } from 'styled-components';

const app = express();
const html = fs.readFileSync(
  path.resolve(__dirname, '../dist/index.html'),
  'utf8'
);
app.use('/dist', express.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const page = parseUrl.pathname ? parseUrl.pathname.substr(1) : 'home';
  const sheet = new ServerStyleSheet();
  const renderString = renderToString(sheet.collectStyles(<App page={page} />));
  const styles = sheet.getStyleTags();
  const initialDate = { page };
  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(initialDate))
    .replace('__STYLE_FROM_SERVER__', styles);
  res.send(result);
});
app.listen(3000);
