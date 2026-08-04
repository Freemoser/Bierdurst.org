# Master-Prompt für die Programmier-KI

Du erhältst das Paket `bier-durst-handoff-v2`. Baue daraus eine produktionsreife, vollständig statische Website für `https://bier-durst.de`.

Lies zuerst vollständig:

1. `README.md`
2. `docs/IMPLEMENTATION_BRIEF.md`
3. `docs/SEO_REVENUE_ARCHITECTURE.md`
4. `docs/CONTENT_AUDIT.md`
5. `data/url-manifest.json`
6. `data/internal-link-map.json`

## Verbindliches Ziel

Erstelle eine schnelle deutschsprachige Informationswebsite rund um Bier. Kein Login, keine Community, keine Datenbank, keine Kommentare und kein serverseitiges Backend. Hosting muss auf Cloudflare Pages funktionieren.

## Technische Vorgabe

- Astro mit TypeScript und Content Collections
- statischer Build
- Inhalte aus `content/**/index.md`
- im ersten Produktionsbuild nur Seiten mit `launch_status: publish`
- Queue-Seiten in Preview-Builds optional aktivierbar
- Rechner nur clientseitig, ohne Datenübertragung
- responsive, barrierearm und mobil zuerst

## Muss umgesetzt werden

- Hauptnavigation gemäß Briefing
- Startseite, Hubs, Artikel, Rechner und Vertrauensseiten
- Breadcrumbs und Inhaltsverzeichnis
- Canonical, Meta-Tags und Open Graph
- Article- und BreadcrumbList-JSON-LD
- automatisch generierte Launch-Sitemap nur aus veröffentlichten Seiten
- robots.txt
- 404-Seite
- interne Linkprüfung im Build oder in CI
- fünf Rechner gemäß `tool_id`
- vorbereitete, aber standardmäßig deaktivierte AdSense-Slots
- AdSense erst bei echter Publisher-ID laden
- CMP/Consent-Integration vorbereiten
- keine kopierten Brauereibilder oder Logos

## Qualitätsregeln

- Keine Inhalte erfinden oder bestehende Fakten eigenmächtig ändern.
- Keine Queue-Seite ungeprüft veröffentlichen.
- Impressum und Datenschutz nicht mit Platzhaltern deployen.
- Oktoberfestdaten vor Veröffentlichung gegen die im Frontmatter genannten Primärquellen prüfen.
- Anzeigen niemals wie Navigation, Rechnerfelder oder Buttons gestalten.
- Keine Promille- oder Fahrtüchtigkeitsaussagen im Alkoholmengen-Rechner.

## Ergebnis

Liefere ein vollständiges Git-Repository mit:

- lokal ausführbarem Development-Setup
- erfolgreichem Production-Build
- Cloudflare-Pages-Konfiguration
- README mit Start-, Build- und Deploymentbefehlen
- Tests oder Prüfskript für interne Links, doppelte Canonicals und Sitemap-URLs
- kurzer Liste aller noch manuell zu erledigenden Punkte, insbesondere Impressum, Datenschutz, AdSense-Publisher-ID und Search-Console-Verifizierung
