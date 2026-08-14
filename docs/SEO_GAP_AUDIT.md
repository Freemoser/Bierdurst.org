# SEO- und Inhaltslücken vor dem Produktivstart

Stand: 14. August 2026. Grundlage ist der validierte Build mit 205 veröffentlichbaren URLs. Die GitHub-Pages-Vorschau bleibt vollständig auf `noindex, nofollow, noarchive` und enthält keine Sitemap.

## Bereits technisch abgedeckt

- eindeutiger Title und Canonical auf jeder veröffentlichbaren Seite
- genau eine H1 pro Seite
- Meta-Description auf jeder Seite
- keine internen Links auf Queue- oder Fehlerseiten
- strukturierte Daten für Website, Bierstile, Marken und Statistiken
- statische, schnelle Auslieferung ohne Tracking oder Anzeigen in der Vorschau

## Priorität 1: Inhalte vor der Indexierung ausbauen

### 85 Markenprofile

79 Markenprofile enthalten derzeit weniger als 150 sichtbare Wörter; keines erreicht 300 Wörter. Die Steckbriefe sind sachlich und belegt, aber in Aufbau und Formulierung stark ähnlich. Vor einer breiten Indexierung sollten die wichtigsten 15 bis 25 Marken jeweils einzigartige Abschnitte erhalten:

- Geschichte und regionale Bedeutung
- wichtigste Produktlinien statt bloßer Hauptstil-Zuordnung
- Einordnung von Brauerei, Marke und Konzern
- Besonderheiten bei Rezeptur, Positionierung oder Vertrieb
- mindestens zwei belastbare, möglichst primäre Quellen
- sinnvolle interne Links zu Stil, Region und passenden Vergleichen

Die übrigen Markenprofile sollten bis zum redaktionellen Ausbau auf `noindex` bleiben, damit kein großes Paket dünner, ähnlich aufgebauter Seiten indexiert wird.

### 33 Bierstilprofile

33 der 40 Kompendium- und Statistikseiten enthalten weniger als 150 Wörter. Für die Bierstile fehlen vor allem eigenständige redaktionelle Abschnitte zu:

- Geschmack und Aroma in vollständigen Beschreibungen
- historische Herkunft und heutige Verbreitung
- Brauverfahren und typische Zutaten
- Abgrenzung zu ähnlichen Stilen
- Glas, Trinktemperatur und Speisen mit Begründung
- FAQ und belastbare Stilquellen

Ziel ist nicht eine feste Wortzahl, sondern eine vollständige Beantwortung der jeweiligen Suchintention. Für zentrale Stile wie Pils, Helles, Weizenbier, Kölsch, Altbier und IPA sind etwa 500 bis 900 substanziell recherchierte Wörter realistisch.

### Bierspiele

Die vier Spieleseiten enthalten 64 bis 101 sichtbare Wörter. Für Nutzer funktionieren sie bereits, für organische Landingpages fehlen jedoch:

- kurze Spielanleitung und Regeln
- Varianten für Gruppen oder Tastings
- Erklärung der verwendeten Markenauswahl
- Datenschutz-Hinweis in ausführlicher Form
- FAQ zu Speicherung, Zufallsauswahl und Neustart

## Priorität 2: Redaktionelle Metadaten

Die zentralen Template-Titles wurden im Audit gekürzt. Bei den redaktionellen Artikeln sind kurze Meta-Descriptions nicht automatisch ein Fehler; sie sollten aber auf den wichtigsten Einstiegsseiten stärker Nutzen, Thema und konkretes Ergebnis formulieren. Zuerst prüfen:

- Startseite
- Bierrechner-Übersicht und vier Rechner
- Bierwissen-Übersicht
- Biervergleich-Übersicht
- Über uns sowie Quellen & Methodik

Impressum und Datenschutz müssen nicht auf Suchmaschinen-Klickrate optimiert werden.

## Priorität 3: Pflichtangaben und Vertrauen

- Geschäftliche E-Mail-Adresse in Impressum, Datenschutz und Kontakt ergänzen.
- Hostingtext beim Wechsel von GitHub Pages auf das endgültige Hosting erneut anpassen.
- Gesundheits-, Preis-, Markt- und Oktoberfestangaben vor der Indexierung redaktionell gegen aktuelle Primärquellen prüfen.
- Autor- oder Redaktionsverantwortung und Aktualisierungsdatum auf wichtigen Informationsartikeln sichtbar ausspielen.

## Empfohlene Freigabereihenfolge

1. Bestehende 76 redaktionelle Launch-Seiten final prüfen und indexieren.
2. Die wichtigsten Bierstile inhaltlich ausbauen und einzeln freigeben.
3. Die wichtigsten Markenprofile redaktionell erweitern und einzeln freigeben.
4. Übrige programmgenerierte Profile erst nach eigenständiger inhaltlicher Bearbeitung indexieren.
5. Erst dann Sitemap bei der Search Console einreichen.
