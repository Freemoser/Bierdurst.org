---
title: Bierpreis-pro-Liter-Rechner
slug: /bier-rechner/bierpreis-pro-liter/
canonical: https://bierdurst.org/bier-rechner/bierpreis-pro-liter/
meta_title: Bierpreis-pro-Liter-Rechner | BierDurst.org
meta_description: Vergleiche Bierpreise fair nach Litern – für Kasten, Sixpack, Einzelflasche oder Fass.
category: Bierrechner
language: de
last_updated: '2026-08-03'
editorial_status: redaktioneller Entwurf
keywords:
- Bier Preis pro Liter Rechner
- Kasten Bier Preisvergleich
sources:
- https://brauer-bund.de/biervielfalt/bierstile-in-deutschland/
- https://www.gesetze-im-internet.de/bierv/
article_id: 126
page_type: tool
cluster: bier-rechner
publish_phase: 1
launch_status: publish
priority: high
search_intent: calculator
review_cycle: 12 months
index: true
tool_id: beer-unit-price-calculator
---

# Bierpreis-pro-Liter-Rechner

Kastenpreise sind schwer vergleichbar, weil Flaschenzahl und Flaschengröße variieren. Der Rechner ermittelt deshalb den reinen Getränkepreis je Liter. Pfand wird separat ausgewiesen und nicht als Verbrauchskosten behandelt.

## Eingaben

- Verkaufspreis inklusive Pfand oder ohne Pfand
- Pfandbetrag, falls im Preis enthalten
- Anzahl der Flaschen
- Inhalt je Flasche in Litern
- alternativ direkte Gesamtmenge

## Formeln

`Getränkepreis = Gesamtpreis − Pfand`

`Gesamtliter = Flaschenzahl × Flaschengröße`

`Preis je Liter = Getränkepreis ÷ Gesamtliter`

## Beispiel

Ein Kasten kostet 18 Euro zuzüglich 3,10 Euro Pfand und enthält 20 Flaschen à 0,5 Liter. Die Getränkemenge beträgt zehn Liter, der Preis je Liter somit 1,80 Euro.

## Vorgaben für die Programmierung

- Schalter „Pfand bereits enthalten“.
- Ergebnis für Getränkepreis und Pfand getrennt darstellen.
- Eingabefehler wie null Liter abfangen.
- Keine Händlerpreise automatisch abrufen; die Seite bleibt vollständig statisch.

## Beispiele

| Angebot | Getränkepreis ohne Pfand | Menge | Preis je Liter |
|---|---:|---:|---:|
| 20 × 0,5 l für 18 € | 18 € | 10 l | 1,80 € |
| 24 × 0,33 l für 16 € | 16 € | 7,92 l | ca. 2,02 € |
| Sixpack 6 × 0,33 l für 5,49 € | 5,49 € | 1,98 l | ca. 2,77 € |

Die Tabelle ignoriert Pfand, weil es bei Rückgabe erstattet wird. Wird ein Gebinde nicht zurückgegeben, entstehen faktisch zusätzliche Kosten.

## Ergebnisfelder

- Getränkepreis insgesamt
- Pfand separat
- Gesamtmenge in Litern
- Preis je Liter
- optional Preis je 0,5 Liter und je 0,33 Liter

## Eingabemodi

Der Nutzer kann entweder Flaschenzahl und Flaschengröße eingeben oder direkt die Gesamtmenge. Ein Umschalter verhindert gleichzeitig widersprüchliche Werte. Dezimaltrennzeichen Komma und Punkt werden akzeptiert.

## Typische Fehler verhindern

- Pfand doppelt abziehen
- 33 Milliliter statt 0,33 Liter eingeben
- Kastenpreis mit Sixpackpreis vergleichen, ohne Liter umzurechnen
- einen Rabatt auf den Pfandbetrag anwenden

## Häufige Fragen

### Ist der billigste Liter automatisch das beste Angebot?

Nur mengenmäßig. Geschmack, Haltbarkeit, Rückgabemöglichkeit und gewünschte Sorte spielen ebenfalls eine Rolle.

## Das könnte dich auch interessieren

- [Alkoholmengen-Rechner für Bier](/bier-rechner/alkoholmenge/)
- [Bier-Kühlzeit-Rechner](/bier-rechner/bier-kuehlzeit/)
- [Fassbier-Rechner: Gläser und Maß pro Fass](/bier-rechner/fassbier/)
