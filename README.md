# Bier-Durst.de

Produktionsfertige, vollständig statische Informationswebsite rund um Bier. Das Projekt nutzt Astro und TypeScript, benötigt weder Login noch Datenbank oder Backend und ist für Cloudflare Pages vorbereitet.

## Lokal starten

Voraussetzung: Node.js 22.12 oder neuer und npm 9.6.5 oder neuer.

```bash
npm ci
npm run dev
```

Die lokale Adresse wird anschließend im Terminal ausgegeben.

## Prüfen und bauen

```bash
npm run check
npm run build
```

`npm run check` prüft TypeScript, Astro-Komponenten und alle fünf Rechnerlogiken. `npm run build` erzeugt zuerst die Launch-Sitemap, baut die statischen Seiten und prüft danach:

- interne Links und lokale Assets
- Launch-URL-Grenze
- Sitemap-Ziele
- eindeutige Titel und Canonicals
- Meta-Descriptions und genau eine H1 je Seite
- Ausschluss von `sitemap-full.xml` und `ads.txt.template`
- Ausschluss von Lorem Ipsum

Der fertige Build liegt in `dist/`.

## Launch- und Preview-Builds

Der normale Produktionsbuild erzeugt die 76 redaktionellen Launch-URLs aus dem Manifest sowie die freigegebenen Kompendium-, Statistik- und Spieleseiten. Aktuell umfasst die generierte `public/sitemap.xml` insgesamt 205 URLs. Queue-Inhalte werden nicht veröffentlicht.

Für eine private redaktionelle Vorschau aller Queue-Seiten:

```bash
PREVIEW_QUEUE=true npm run dev
```

Der fünfte Rechner (`pure-alcohol-calculator`) ist vollständig implementiert und getestet, bleibt im Produktionsbuild aber entsprechend der Launch-Sitemap noch in der Queue.

## Cloudflare Pages

Empfohlene Einstellungen bei einer GitHub-Verknüpfung:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: Repository-Wurzel

`wrangler.toml`, `_headers` und `_redirects` sind vorbereitet. Die kanonische Domain ist `https://bier-durst.de`; `www` wird auf die Hauptdomain umgeleitet. Nach dem ersten Deployment die Custom Domains in Cloudflare Pages hinterlegen und HTTPS/Redirect im Dashboard kontrollieren.

## Temporäre Vorschau auf GitHub Pages

Der Workflow `.github/workflows/deploy-pages-preview.yml` veröffentlicht eine Testversion unter dem Repository-Pfad auf GitHub Pages. Der Preview-Build setzt auf jeder HTML-Seite `noindex, nofollow, noarchive`, sperrt zusätzlich die mitgelieferte `robots.txt` und deaktiviert Anzeigen. Interne Links und Assets erhalten erst nach der regulären Build-Validierung den Präfix `/Bier-durst.de/`.

```bash
npm run build:pages
```

Die Vorschau ist nur für Tests gedacht und wird weder bei Google eingereicht noch als Produktionshosting dokumentiert. Vor dem echten Go-live muss der Preview-Workflow entfernt oder auf die finale Hosting-Konfiguration umgestellt werden.

## Werbung und Consent

Anzeigenflächen reservieren stabilen Platz, sind aber standardmäßig deaktiviert. AdSense wird nur vorbereitet, wenn beide Werte gesetzt sind und die Publisher-ID dem echten AdSense-Format entspricht:

```bash
PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
PUBLIC_CMP_SCRIPT_URL=https://...
```

Die konfigurierte, Google-zertifizierte CMP muss nach Einwilligung `window.enableBierDurstAds()` aufrufen. Ohne echte ID und CMP-URL wird kein AdSense-Script geladen. `public/ads.txt.template` ist nur eine Vorlage und wird aus dem Produktionsordner entfernt.

## Vor dem echten Go-live manuell erledigen

- [ ] Betreiberangaben im Impressum vollständig und rechtlich prüfen
- [ ] Datenschutzerklärung auf Hosting, CMP, Messung und AdSense anpassen und rechtlich prüfen
- [ ] Google-zertifizierte CMP auswählen, konfigurieren und testen
- [ ] echte AdSense-Publisher-ID setzen; danach `ads.txt.template` mit der echten ID als `public/ads.txt` freigeben
- [ ] Search Console verifizieren und ausschließlich `https://bier-durst.de/sitemap.xml` einreichen
- [ ] Oktoberfest-, Preis-, Markt-, Gesundheits- und Rechtsangaben vor Veröffentlichung redaktionell gegen Primärquellen prüfen
- [ ] Custom Domains `bier-durst.de` und `www.bier-durst.de` in Cloudflare verbinden und den Redirect prüfen

Impressum und Datenschutz zeigen bis zur Ergänzung absichtlich deutlich sichtbare Warnhinweise. Sie dürfen in diesem Zustand nicht öffentlich live geschaltet werden.

## Projektstruktur

- `content/` – Markdown-Inhalte und Frontmatter
- `src/components/` – Layout-, SEO-, Navigations- und Rechnerkomponenten
- `src/pages/` – statische Routen und 404-Seite
- `public/` – statische Assets, Robots, Sitemap und Cloudflare-Regeln
- `scripts/` – Sitemap-Generator, Rechner-Tests und Build-Validierung
- `data/` – URL-Manifest und interne Linkarchitektur
- `docs/` – redaktionelles und technisches Briefing
