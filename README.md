# BierDurst.org

Produktionsfertige, vollständig statische Informationswebsite rund um Bier. Das Projekt nutzt Astro und TypeScript, benötigt weder Login noch Datenbank oder Backend und wird über GitHub Pages ausgeliefert. Cloudflare dient als Registrar und DNS-Anbieter.

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

## Launch- und Redaktionsvorschau

Der Produktionsbuild erzeugt 76 indexierbare redaktionelle Launch-URLs aus dem Manifest. Die datengetriebenen Kompendium-, Statistik- und Spieleseiten sind bereits erreichbar, bleiben bis zum redaktionellen Ausbau aber auf `noindex, follow` und werden nicht in die Sitemap aufgenommen. Queue-Inhalte werden nicht veröffentlicht.

Für eine private redaktionelle Vorschau aller Queue-Seiten:

```bash
PREVIEW_QUEUE=true npm run dev
```

Der fünfte Rechner (`pure-alcohol-calculator`) ist vollständig implementiert und getestet, bleibt im Produktionsbuild aber entsprechend der Launch-Sitemap noch in der Queue.

## GitHub Pages und Cloudflare DNS

Der Workflow `.github/workflows/deploy-pages.yml` prüft und baut jeden Push auf `main` und veröffentlicht `dist/` über GitHub Pages. Die Datei `public/CNAME` setzt die Produktionsdomain auf `bierdurst.org`.

- GitHub Pages Source: GitHub Actions
- Produktionsbranch: `main`
- Produktionsdomain: `bierdurst.org`
- `www`: CNAME auf den GitHub-Pages-Host; Weiterleitung auf die Apex-Domain
- Cloudflare-Records zunächst DNS-only, nicht proxied

Die kanonische Hostvariante ist ausschließlich `https://bierdurst.org`. HTTPS wird nach erfolgreicher DNS-Prüfung in GitHub Pages erzwungen.

## Werbung und Consent

Google Analytics 4 ist mit der Mess-ID `G-1DG8C53H4L` im Basic Consent Mode eingebunden. Das Google-Tag wird erst nach einer aktiven Zustimmung über den Cookie-Banner geladen. Eine Ablehnung löst keine Übertragung an Google aus; die Auswahl kann jederzeit über **Datenschutz-Einstellungen** im Footer geändert werden. Google Signals und Werbepersonalisierung bleiben deaktiviert.

Anzeigenflächen reservieren stabilen Platz, sind aber standardmäßig deaktiviert. AdSense wird nur vorbereitet, wenn beide Werte gesetzt sind und die Publisher-ID dem echten AdSense-Format entspricht:

```bash
PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
PUBLIC_CMP_SCRIPT_URL=https://...
```

Die konfigurierte, Google-zertifizierte CMP muss nach Einwilligung `window.enableBierDurstAds()` aufrufen. Ohne echte ID und CMP-URL wird kein AdSense-Script geladen. `public/ads.txt.template` ist nur eine Vorlage und wird aus dem Produktionsordner entfernt.

## Launch-Reihenfolge

- [x] Branding, Canonicals und Kontaktadresse auf `bierdurst.org` umstellen
- [x] GitHub-Pages-Produktionsworkflow vorbereiten
- [x] Google Analytics mit vorheriger Einwilligung und widerrufbaren Datenschutzeinstellungen einrichten
- [x] Werbung zum Launch deaktiviert lassen
- [ ] Domain bei Cloudflare registrieren und DNS mit GitHub Pages verbinden
- [ ] Google Search Console verifizieren und `https://bierdurst.org/sitemap.xml` einreichen
- [ ] Bing Webmaster Tools anschließend verbinden
- [ ] weitere Seiten einzeln redaktionell ausbauen und zur Indexierung freigeben
- [ ] AdSense/CMP frühestens nach der geplanten Anlaufphase von etwa drei Monaten einrichten

Betreiberangaben und Datenschutzerklärung sollten trotz technischer Prüfung vor dem Launch juristisch geprüft werden. Zeitabhängige Preis-, Markt- und Veranstaltungsdaten benötigen weiterhin ihren dokumentierten Aktualisierungszyklus.

## Projektstruktur

- `content/` – Markdown-Inhalte und Frontmatter
- `src/components/` – Layout-, SEO-, Navigations- und Rechnerkomponenten
- `src/pages/` – statische Routen und 404-Seite
- `public/` – statische Assets, CNAME, Robots und Sitemap
- `scripts/` – Sitemap-Generator, Rechner-Tests und Build-Validierung
- `data/` – URL-Manifest und interne Linkarchitektur
- `docs/` – redaktionelles und technisches Briefing
