import assert from 'node:assert/strict';
import { calculateAlcohol, calculateCooling, calculateKeg, calculateParty, calculateUnitPrice } from '../public/scripts/calculators.mjs';

const party = calculateParty({ guests: 50, drinkers: 22, duration: 6, reserve: 10, bottleSize: 0.5, bottlesPerCrate: 20 });
assert.equal(party.normal.bottles, 69);
assert.equal(party.normal.crates, 4);
assert.throws(() => calculateParty({ guests: 5, drinkers: 6, duration: 4, reserve: 10, bottleSize: 0.5, bottlesPerCrate: 20 }));

const keg = calculateKeg({ kegLitres: 30, glassLitres: 0.5, loss: 5, guests: 20 });
assert.equal(keg.realistic, 57);
assert.equal(keg.usable, 28.5);

const price = calculateUnitPrice({ totalPrice: 21.1, deposit: 3.1, depositIncluded: true, mode: 'bottles', bottleCount: 20, bottleSize: 0.5, directLitres: 0 });
assert.equal(price.perLitre, 1.8);

const cooling = calculateCooling({ start: 20, target: 7, container: 'bottle05', method: 'fridge', count: 1 });
assert.ok(cooling.min < cooling.max && cooling.min > 60);
assert.throws(() => calculateCooling({ start: 7, target: 20, container: 'can', method: 'ice', count: 1 }));

const alcohol = calculateAlcohol({ millilitres: 500, abv: 5, count: 1 });
assert.equal(Number(alcohol.total.toFixed(3)), 19.725);

console.log('Alle fünf Rechnerlogiken wurden erfolgreich geprüft.');
