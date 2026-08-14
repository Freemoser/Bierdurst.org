import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const repositoryPath = '/Bier-durst.de';

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => (
    entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]
  )))).flat();
}

const htmlFiles = (await files('dist')).filter((file) => file.endsWith('.html'));
const localUrl = new RegExp(`(href|src)=(['"])/(?!/|${repositoryPath.slice(1)}/)`, 'g');

for (const file of htmlFiles) {
  const source = await readFile(file, 'utf8');
  const rewritten = source.replace(localUrl, `$1=$2${repositoryPath}/`);

  if (!rewritten.includes('<meta name="robots" content="noindex, nofollow, noarchive">')) {
    throw new Error(`Noindex-Metadaten fehlen in ${file}`);
  }
  if (localUrl.test(rewritten)) {
    throw new Error(`Nicht praefigierte lokale URL in ${file}`);
  }
  localUrl.lastIndex = 0;
  await writeFile(file, rewritten);
}

await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
await rm('dist/sitemap.xml', { force: true });
console.log(`${htmlFiles.length} HTML-Dateien fuer die GitHub-Pages-Test-URL vorbereitet (noindex).`);
