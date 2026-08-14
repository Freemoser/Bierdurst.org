import { readFile } from 'node:fs/promises';

const beers = JSON.parse(await readFile('data/beer-styles.json', 'utf8'));
const brands = JSON.parse(await readFile('data/beer-brands.json', 'utf8'));
const statistics = JSON.parse(await readFile('data/beer-market-statistics.json', 'utf8'));
const errors = [];
const slugs = new Set();
const names = new Set();
const rangeFields = ['alcohol', 'ibu', 'ebc', 'plato', 'temperature'];

if (beers.length < 30) errors.push(`Zu wenige Bierstile: ${beers.length}`);
for (const beer of beers) {
  if (!/^[a-z0-9-]+$/.test(beer.slug)) errors.push(`Ungültiger Slug: ${beer.slug}`);
  if (slugs.has(beer.slug)) errors.push(`Doppelter Slug: ${beer.slug}`);
  if (names.has(beer.name)) errors.push(`Doppelter Name: ${beer.name}`);
  slugs.add(beer.slug);
  names.add(beer.name);
  for (const field of rangeFields) {
    const range = beer[field];
    if (!Array.isArray(range) || range.length !== 2 || !range.every(Number.isFinite) || range[0] > range[1]) errors.push(`Ungültige Spanne ${field} bei ${beer.name}`);
  }
  if (!Array.isArray(beer.profile) || beer.profile.length < 2) errors.push(`Fehlendes Geschmacksprofil bei ${beer.name}`);
  if (!Array.isArray(beer.food) || beer.food.length < 2) errors.push(`Fehlende Speisen bei ${beer.name}`);
  try { new URL(beer.source); } catch { errors.push(`Ungültige Quelle bei ${beer.name}`); }
}

const brandSlugs = new Set();
const brandNames = new Set();
for (const brand of brands) {
  if (!/^[a-z0-9-]+$/.test(brand.slug)) errors.push(`Ungültiger Marken-Slug: ${brand.slug}`);
  if (brandSlugs.has(brand.slug)) errors.push(`Doppelter Marken-Slug: ${brand.slug}`);
  if (brandNames.has(brand.name)) errors.push(`Doppelter Markenname: ${brand.name}`);
  brandSlugs.add(brand.slug);
  brandNames.add(brand.name);
  if (!slugs.has(brand.style)) errors.push(`Unbekannter Stil ${brand.style} bei ${brand.name}`);
  if (!brand.brewery || !brand.city || !brand.state || !brand.group) errors.push(`Unvollständiger Markensteckbrief: ${brand.name}`);
  try { new URL(brand.source); } catch { errors.push(`Ungültige Markenquelle bei ${brand.name}`); }
  if (brand.salesHl !== undefined && (!Number.isFinite(brand.salesHl) || (!Number.isInteger(brand.salesYear) && !brand.salesAsOf))) errors.push(`Ungültige Absatzangabe bei ${brand.name}`);
  if (brand.employees !== undefined && (!Number.isFinite(brand.employees) || !Number.isInteger(brand.employeesYear))) errors.push(`Ungültige Beschäftigtenangabe bei ${brand.name}`);
}

const statisticSlugs = new Set();
for (const statistic of statistics) {
  if (!/^[a-z0-9-]+$/.test(statistic.slug) || statisticSlugs.has(statistic.slug)) errors.push(`Ungültiger oder doppelter Statistik-Slug: ${statistic.slug}`);
  statisticSlugs.add(statistic.slug);
  if (!statistic.label || !statistic.value || !statistic.definition || !statistic.chartNote) errors.push(`Unvollständige Statistik: ${statistic.slug}`);
  try { new URL(statistic.sourceUrl); } catch { errors.push(`Ungültige Statistikquelle bei ${statistic.slug}`); }
  if (!Array.isArray(statistic.faq) || statistic.faq.length < 3) errors.push(`Zu wenig FAQ-Einträge bei ${statistic.slug}`);
  for (let index = 0; index < statistic.series.length; index += 1) {
    const point = statistic.series[index];
    if (!Number.isInteger(point.year) || !Number.isFinite(point.value)) errors.push(`Ungültiger Zeitreihenwert bei ${statistic.slug}`);
    if (index > 0 && point.year <= statistic.series[index - 1].year) errors.push(`Zeitreihe nicht aufsteigend bei ${statistic.slug}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`${beers.length} Bierstile, ${brands.length} echte Biermarken und ${statistics.length} Biermarkt-Statistiken mit eindeutigen Slugs, Quellen und gültigen Daten geprüft.`);
