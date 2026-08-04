import { rm } from 'node:fs/promises';

await Promise.all([
  rm('dist/sitemap-full.xml', { force: true }),
  rm('dist/ads.txt.template', { force: true })
]);
