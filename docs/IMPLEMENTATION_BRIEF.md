# Implementierungsauftrag für die Programmier-KI

## Ziel

Baue `bierdurst.org` als sehr schnelle, vollständig statische deutschsprachige Website. Kein Login, kein Backend, keine Datenbank, keine Kommentare. Hosting auf GitHub Pages; Cloudflare dient als Registrar und DNS-Anbieter. Inhalte liegen als Markdown in diesem Paket.

## Empfohlener Stack

- Astro in aktueller stabiler Version
- TypeScript
- Astro Content Collections für Markdown
- statischer Build ohne Serverfunktionen
- minimales eigenes CSS oder kleines Utility-Setup
- kein schweres UI-Framework

## Content-Schema

Alle Markdown-Dateien besitzen Frontmatter. Validiere mindestens:

- `title`
- `slug`
- `canonical`
- `meta_description`
- `page_type`
- `cluster`
- `publish_phase`
- `launch_status`
- `index`
- `last_updated`

Im ersten Deployment werden nur Dateien mit `launch_status: publish` gebaut. Eine Umgebungsvariable darf optional alle Queue-Seiten für Preview-Builds freischalten.

## Erforderliche Komponenten

- `Header` mit Hauptnavigation
- `Footer` mit Impressum, Datenschutz, Kontakt, Methodik und Verantwortung
- `Breadcrumbs`
- `ArticleLayout`
- `TableOfContents` aus H2/H3
- `QuickAnswer` für den ersten hervorgehobenen Absatz
- `RelatedArticles`
- `SourcesList` aus Frontmatter
- `LastUpdated`
- `AdSlot` mit stabil reservierter Höhe
- `CalculatorCard` für statische Browserrechner
- `ResponsibleAlcoholNotice`

## Navigation

- Biersorten
- Biervergleich
- Bierwissen
- Bierrechner
- Bierregionen
- Oktoberfest

Bestenlisten werden zunächst unter Bierwissen beziehungsweise über den Hub erreichbar, aber nicht zwingend als Hauptmenüpunkt angezeigt.

## Rechner

Implementiere fünf Rechner rein clientseitig:

1. `party-beer-calculator`
2. `keg-servings-calculator`
3. `beer-unit-price-calculator`
4. `beer-cooling-time-calculator`
5. `pure-alcohol-calculator`

Anforderungen:

- keine Datenübertragung
- Eingaben validieren
- klare Einheiten
- Resultate auf mobilen Geräten gut lesbar
- keine Aussagen zu sicherer Fahrtüchtigkeit oder Promille
- Formeln und Annahmen direkt unter dem Ergebnis erklären
- kein Buttontext, der Alkoholkonsum fördert

## SEO

Für jede Seite:

- eindeutiger `<title>`
- Meta-Description
- Canonical
- genau eine H1
- Open Graph und Twitter-Metadaten
- `Article`-JSON-LD für Artikel
- `BreadcrumbList`-JSON-LD
- `Organization`- beziehungsweise `WebSite`-Daten auf der Startseite
- keine erfundenen Bewertungen oder Review-Schemata
- FAQ-Inhalte sichtbar ausgeben, aber FAQ-Schema nicht als Priorität behandeln
- saubere 404-Seite
- HTML-Links als normale `<a href>`-Elemente

## Sitemap und robots.txt

- `public/sitemap.xml` ist die Launch-Sitemap
- nach jeder Freischaltung Sitemap automatisch aus veröffentlichten Markdown-Dateien generieren
- `<lastmod>` nur bei echter inhaltlicher Änderung aktualisieren
- `priority` und `changefreq` nicht erzeugen
- `public/robots.txt` übernehmen
- `sitemap-full.xml` ist nur eine Roadmap und darf nicht als Live-Sitemap eingereicht werden, solange Queue-Seiten nicht veröffentlicht sind

## AdSense und Datenschutz

- AdSense-Code erst laden, wenn eine echte Publisher-ID als Umgebungsvariable gesetzt ist
- Platzhalter niemals produktiv als Publisher-ID verwenden
- Google-zertifizierte CMP für EWR, Vereinigtes Königreich und Schweiz vor personalisierten Anzeigen einrichten
- Consent Mode und Datenschutzerklärung sauber anbinden
- `ads.txt.template` nach Freigabe mit echter Publisher-ID zu `ads.txt` machen
- Anzeigenplätze dürfen Navigation und Rechner nicht imitieren
- Layout-Verschiebung durch reservierte Ad-Slot-Höhen vermeiden

## Performance

- statisches HTML
- möglichst kein JavaScript auf normalen Artikelseiten
- Rechner-JavaScript nur auf Rechnerseiten laden
- Bilder in AVIF/WebP mit Größenangaben
- Lazy Loading unterhalb des sichtbaren Bereichs
- keine externen Schriften; Systemfont oder selbst gehostet
- Ziel: Lighthouse Performance, SEO und Accessibility jeweils mindestens 90 mobil

## Bilder

Keine Bilder oder Logos von Brauereiseiten kopieren. Nutze eigene Diagramme, lizenzierte Fotos oder neutrale Illustrationen. Alt-Texte müssen das sichtbare Motiv beschreiben und dürfen nicht mit Keywords gefüllt werden.

## Qualitätssicherung vor Deployment

- Build ohne Fehler
- alle internen Links prüfen
- keine Orphan-Pages
- keine doppelten Titel oder Canonicals
- Sitemap enthält nur veröffentlichte 200-Status-URLs
- strukturierte Daten mit Rich Results Test prüfen
- mobile Navigation und Tabellen testen
- Impressum und Datenschutz dürfen nicht mit Platzhaltern live gehen

## Deployment

GitHub Pages mit automatischem Build aus dem `main`-Branch. Produktionsdomain `bierdurst.org`, HTTPS erzwingen, `www` auf die Hauptdomain weiterleiten und Cloudflare zunächst im DNS-only-Modus verwenden.
