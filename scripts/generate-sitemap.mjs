import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

async function markdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? markdownFiles(path) : (entry.name === 'index.md' ? [path] : []);
  }));
  return nested.flat();
}

function field(frontmatter, name) {
  const match = frontmatter.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'));
  return match?.[1].trim().replace(/^['"]|['"]$/g, '');
}

const pages = [];
const manifest = JSON.parse(await readFile('data/url-manifest.json', 'utf8'));
const launchSlugs = new Set(manifest.filter((page) => page.launch_status === 'publish').map((page) => page.slug));
for (const file of await markdownFiles('content')) {
  const source = await readFile(file, 'utf8');
  const frontmatter = source.split('---', 3)[1] ?? '';
  const slug = field(frontmatter, 'slug');
  if (!launchSlugs.has(slug) || field(frontmatter, 'index') !== 'true') continue;
  pages.push({ slug, lastmod: field(frontmatter, 'last_updated') });
}
pages.sort((a, b) => a.slug.localeCompare(b.slug, 'de'));
const rows = pages.map(({ slug, lastmod }) => `  <url>\n    <loc>https://bierdurst.org${slug === '/' ? '/' : slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
await writeFile('public/sitemap.xml', xml);
console.log(`Launch-Sitemap mit ${pages.length} URLs erzeugt.`);
