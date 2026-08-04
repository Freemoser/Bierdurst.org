export function calculateParty({ guests, drinkers, duration, reserve, bottleSize, bottlesPerCrate }) {
  if (![guests, drinkers, duration, reserve, bottleSize, bottlesPerCrate].every(Number.isFinite)) throw new Error('Bitte alle Felder vollständig ausfüllen.');
  if (guests < 1 || guests > 10000 || drinkers < 0 || drinkers > guests) throw new Error('Die Zahl erwachsener Biertrinker muss zwischen 0 und der Gästezahl liegen.');
  if (duration < 1 || duration > 48 || reserve < 0 || reserve > 100 || ![0.33, 0.5].includes(bottleSize) || bottlesPerCrate < 1 || bottlesPerCrate > 40) throw new Error('Bitte realistische positive Werte verwenden.');
  const base = Math.min(2.2, 0.7 + duration * 0.12) * (1 + reserve / 100);
  const scenario = (multiplier) => {
    const litres = drinkers * base * multiplier;
    const bottles = Math.ceil(litres / bottleSize);
    return { litres, bottles, crates: Math.ceil(bottles / bottlesPerCrate) };
  };
  return { lean: scenario(0.8), normal: scenario(1), generous: scenario(1.2), high: scenario(1.2).litres > 300 };
}

export function calculateKeg({ kegLitres, glassLitres, loss, guests }) {
  if (![kegLitres, glassLitres, loss].every(Number.isFinite) || kegLitres <= 0 || kegLitres > 1000 || glassLitres <= 0 || glassLitres > 2 || loss < 0 || loss >= 100) throw new Error('Bitte Fass-, Glasgröße und Verlust realistisch eingeben.');
  if (Number.isFinite(guests) && guests < 0) throw new Error('Die Gästezahl darf nicht negativ sein.');
  const usable = kegLitres * (1 - loss / 100);
  const realistic = Math.floor(usable / glassLitres);
  return { theoretical: Math.floor(kegLitres / glassLitres), usable, realistic, remainder: usable - realistic * glassLitres, perGuest: guests > 0 ? realistic / guests : null };
}

export function calculateUnitPrice({ totalPrice, deposit, depositIncluded, mode, bottleCount, bottleSize, directLitres }) {
  if (![totalPrice, deposit].every(Number.isFinite) || totalPrice < 0 || deposit < 0) throw new Error('Preis und Pfand müssen positive Zahlen sein.');
  const beveragePrice = totalPrice - (depositIncluded ? deposit : 0);
  const litres = mode === 'direct' ? directLitres : bottleCount * bottleSize;
  if (!Number.isFinite(litres) || litres <= 0 || beveragePrice < 0) throw new Error('Getränkepreis und Gesamtmenge müssen größer als null sein.');
  return { beveragePrice, deposit, litres, perLitre: beveragePrice / litres, perHalf: beveragePrice / litres / 2, perThird: beveragePrice / litres * 0.33 };
}

export function calculateCooling({ start, target, container, method, count }) {
  if (![start, target, count].every(Number.isFinite) || count < 1 || count > 200 || start <= target) throw new Error('Die Starttemperatur muss über der Zieltemperatur liegen.');
  if (target < -2) throw new Error('Die Zieltemperatur liegt im möglichen Gefrierbereich von Bier.');
  const methodFactor = { fridge: 12, ice: 2.6, salt: 1.7 }[method];
  const containerFactor = { can: 0.85, bottle033: 1, bottle05: 1.18 }[container];
  if (!methodFactor || !containerFactor) throw new Error('Bitte Gebinde und Kühlmethode auswählen.');
  const bulk = count >= 12 ? 1.45 : count >= 6 ? 1.25 : 1;
  const minutes = (start - target) * methodFactor * containerFactor * bulk;
  return { min: Math.max(5, Math.round(minutes * 0.8 / 5) * 5), max: Math.max(10, Math.round(minutes * 1.25 / 5) * 5) };
}

export function calculateAlcohol({ millilitres, abv, count }) {
  if (![millilitres, abv, count].every(Number.isFinite) || millilitres <= 0 || millilitres > 10000 || abv < 0 || abv > 25 || count < 1 || count > 1000) throw new Error('Bitte realistische positive Werte verwenden.');
  const perContainer = millilitres * (abv / 100) * 0.789;
  return { perContainer, total: perContainer * count };
}

const number = (form, name) => Number(String(new FormData(form).get(name) ?? '').replace(',', '.'));
const fmt = (value, digits = 1) => new Intl.NumberFormat('de-DE', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);
const euro = (value) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);

function renderParty(form) {
  const data = calculateParty({ guests: number(form, 'guests'), drinkers: number(form, 'drinkers'), duration: number(form, 'duration'), reserve: number(form, 'reserve'), bottleSize: number(form, 'bottleSize'), bottlesPerCrate: number(form, 'bottlesPerCrate') });
  const row = (label, value) => `<div><strong>${label}</strong><span>${fmt(value.litres)} l · ${value.bottles} Flaschen · ${value.crates} Kästen</span></div>`;
  return `<h3>Planung in drei Szenarien</h3><div class="result-grid">${row('Knapp geplant', data.lean)}${row('Normal geplant', data.normal)}${row('Großzügig geplant', data.generous)}</div><p>Die Reserve ist bereits enthalten. Alkoholfreie Getränke und Wasser bitte separat und großzügig einplanen.${data.high ? ' Prüfe bei dieser hohen Gesamtmenge die Eingaben noch einmal.' : ''}</p><small>Schätzung: Basiswert nach Dauer × erwachsene Biertrinker × Reserve; Szenarien ±20 %. Kein Konsumziel.</small>`;
}

function renderKeg(form) {
  const data = calculateKeg({ kegLitres: number(form, 'kegLitres'), glassLitres: number(form, 'glassLitres'), loss: number(form, 'loss'), guests: number(form, 'guests') });
  return `<h3>${data.realistic} volle Gläser realistisch</h3><div class="result-grid"><div><strong>Theoretisch</strong><span>${data.theoretical} Gläser</span></div><div><strong>Nutzbar</strong><span>${fmt(data.usable)} l</span></div><div><strong>Rest</strong><span>${fmt(data.remainder, 2)} l</span></div></div>${data.perGuest !== null ? `<p>Rechnerisch ${fmt(data.perGuest, 2)} Gläser je Gast – nur für die Logistik, nicht als Konsumempfehlung.</p>` : ''}<small>Nutzbare Liter = Fassgröße × (1 − Verlust). Volle Gläser werden abgerundet.</small>`;
}

function renderPrice(form) {
  const data = calculateUnitPrice({ totalPrice: number(form, 'totalPrice'), deposit: number(form, 'deposit'), depositIncluded: new FormData(form).get('depositIncluded') === 'yes', mode: new FormData(form).get('mode'), bottleCount: number(form, 'bottleCount'), bottleSize: number(form, 'bottleSize'), directLitres: number(form, 'directLitres') });
  return `<h3>${euro(data.perLitre)} je Liter</h3><div class="result-grid"><div><strong>Getränkepreis</strong><span>${euro(data.beveragePrice)}</span></div><div><strong>Gesamtmenge</strong><span>${fmt(data.litres, 2)} l</span></div><div><strong>Pfand separat</strong><span>${euro(data.deposit)}</span></div><div><strong>je 0,5 l</strong><span>${euro(data.perHalf)}</span></div><div><strong>je 0,33 l</strong><span>${euro(data.perThird)}</span></div></div><small>Pfand wird nur abgezogen, wenn „im Gesamtpreis enthalten“ gewählt wurde.</small>`;
}

function renderCooling(form) {
  const data = calculateCooling({ start: number(form, 'start'), target: number(form, 'target'), container: new FormData(form).get('container'), method: new FormData(form).get('method'), count: number(form, 'count') });
  return `<h3>Ungefähr ${data.min} bis ${data.max} Minuten</h3><p>Prüfe die Temperatur am Gebinde. Kühlschrankleistung, Beladung und Bewegung können die tatsächliche Zeit deutlich verändern.</p><small>Redaktionelle Schätzung aus Temperaturdifferenz, Gebinde, Methode und Mengenaufschlag. Kein Gefrierfach-Timer.</small>`;
}

function renderAlcohol(form) {
  const data = calculateAlcohol({ millilitres: number(form, 'millilitres'), abv: number(form, 'abv'), count: number(form, 'count') });
  return `<h3>Ungefähr ${fmt(data.total)} g reiner Alkohol insgesamt</h3><p>Pro Gebinde: ungefähr ${fmt(data.perContainer)} g. Das Ergebnis macht keine Aussage zu Promille, Fahrtüchtigkeit oder sicherem Konsum.</p><small>Formel: ml × Vol.-% ÷ 100 × 0,789 × Anzahl.</small>`;
}

const renderers = { 'party-beer-calculator': renderParty, 'keg-servings-calculator': renderKeg, 'beer-unit-price-calculator': renderPrice, 'beer-cooling-time-calculator': renderCooling, 'pure-alcohol-calculator': renderAlcohol };

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-calculator]').forEach((form) => {
    const result = form.querySelector('[data-result]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      try {
        result.classList.remove('error');
        result.innerHTML = renderers[form.dataset.calculator](form);
      } catch (error) {
        result.classList.add('error');
        result.innerHTML = `<strong>Eingaben prüfen:</strong> ${error.message}`;
      }
      result.hidden = false;
      result.focus();
    });
  });
}
