# SEO- und Umsatzarchitektur für BierDurst.org

## Geschäftsziel

Mindestens 40 Euro AdSense-Umsatz pro Monat. Das ist kein garantierbares Ergebnis. Als belastbares Arbeitsziel sollte die Seite auf **mindestens 10.000 bis 20.000 Seitenaufrufe pro Monat** ausgerichtet werden.

Die Rechnung basiert auf dem Seiten-RPM:

`Umsatz = Seitenaufrufe / 1.000 × Seiten-RPM`

| angenommener Seiten-RPM | nötige Seitenaufrufe für 40 € |
|---:|---:|
| 2 € | 20.000 |
| 4 € | 10.000 |
| 6 € | 6.667 |
| 8 € | 5.000 |

Da Bier ein alkoholbezogenes Thema ist und Werbeinventar eingeschränkt sein kann, wird intern mit **15.000 Seitenaufrufen pro Monat** als Sicherheitsziel geplant. Der tatsächliche RPM ist erst nach Freischaltung und einigen Wochen Traffic bekannt.

## Positionierung

BierDurst.org ist keine Bewertungscommunity und kein Bier-Shop. Die Seite ist ein deutschsprachiges Informations- und Werkzeugportal:

1. Bierarten verstehen
2. ähnliche Biere vergleichen
3. praktische Alltagsfragen lösen
4. Mengen und Preise berechnen
5. deutsche Bierregionen und das Oktoberfest erklären

## Priorität der Cluster

### 1. Rechner und konkrete Alltagsfragen

Diese Seiten besitzen den stärksten wiederkehrenden Nutzen und können natürliche Links erhalten:

- Biermenge für eine Party
- Fassbier in Gläser umrechnen
- Preis je Liter
- Kühlzeit
- Flaschen, Liter und Gewicht eines Kastens
- Haltbarkeit und Lagerung
- Kalorien und Etikettangaben

### 2. Hauptsorten und Vergleiche

Pils, Helles, Weizen, Lager, Kölsch, Altbier, alkoholfrei sowie die wichtigsten direkten Unterschiede.

### 3. Oktoberfest

Starker saisonaler Cluster. Im August und September 2026 muss er aktuell, schnell und prominent auf der Startseite stehen. Nach dem Oktoberfest wird er auf das nächste Jahr umgestellt.

### 4. Marktwerte und Regionen

Gute Autoritätsseiten, aber datenintensiv. Zahlen müssen ein Jahr und eine Quelle tragen.

### 5. Seltene Bierstile

Diese Seiten bauen thematische Tiefe auf, sind aber keine Priorität für die ersten 40 Euro.

## Interne Verlinkung

Jede Inhaltsseite erhält:

- einen Breadcrumb zur Startseite und zum Cluster-Hub
- mindestens einen Link zur übergeordneten Hubseite
- zwei bis vier kontextuelle Links im Text
- zwei bis vier passende Artikel am Ende
- bei passenden Fragen einen Link zu einem Rechner

Wichtige Seiten müssen in höchstens drei Klicks von der Startseite erreichbar sein. Linktexte beschreiben das Ziel konkret; kein massenhaftes „hier klicken“.

## Startseite

Reihenfolge:

1. H1 und kurze Positionierung
2. sechs Clusterkarten
3. Rechner prominent
4. aktuell: Oktoberfest 2026
5. häufig gesuchte Grundlagen
6. zuletzt aktualisierte Artikel
7. Methodik und Verantwortung

## Anzeigenstrategie

Die Seite startet ohne aggressive Anzeigen. Vorgesehene Slots:

- Artikel: nach der Einleitung
- Artikel: ungefähr in der Mitte, nur bei ausreichender Länge
- Artikel: nach dem Hauptinhalt vor verwandten Artikeln
- Desktop optional: eine ruhige Sidebar-Anzeige
- Rechner: eine Anzeige oberhalb der Erklärung und eine nach dem Ergebnisbereich, niemals zwischen Eingabe und Berechnen-Button
- Startseite: höchstens eine Anzeige nach den wichtigsten Einstiegen

Anzeigen dürfen nicht wie Navigation, Rechnerfelder oder Downloadbuttons aussehen. Auto Ads erst nach manueller Prüfung aktivieren.

## Veröffentlichungsplan

### Phase 1

Nur Dateien mit `launch_status: publish` veröffentlichen. Sitemap: `public/sitemap.xml`.

### Phase 2

Pro Woche drei bis fünf redaktionell geprüfte Seiten aus der Queue freischalten. Neue Seiten erst in die Sitemap aufnehmen, wenn sie live und intern verlinkt sind.

### Phase 3

Nur Themen ausbauen, die in der Search Console Impressionen erhalten oder ein klares inhaltliches Loch schließen.

## Messung

Wöchentlich prüfen:

- indexierte URLs
- Suchimpressionen und Klicks je Seite
- Suchbegriffe mit Position 5 bis 20
- Seiten mit Impressionen, aber schlechter Klickrate
- Seiten-RPM und Umsatz nach Cluster
- Core Web Vitals und mobile Fehler

Nach 8 bis 12 Wochen werden zuerst Artikel verbessert, die bereits Impressionen haben. Neue Artikel ohne Nachfrage sind nachrangig.
