// Contrastes WCAG des paires texte/fond déclarées par le système (AA : 4,5:1 texte, 3:1 éléments non textuels)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { tokens } from '../tokens.js'

const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
const lum = hex => { const n = parseInt(hex.slice(1), 16); return 0.2126 * lin(n >> 16) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255) }
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

const { brand, neutral } = tokens.color
const AA = 4.5
const UI = 3

const textPairs = [
  // [texte, fond, usage]
  [neutral.ink, neutral.white, 'texte principal sur blanc'],
  [neutral.ink, neutral.cream, 'texte principal sur crème'],
  [neutral.ink, brand.powder, 'navigation active'],
  [neutral.text2, neutral.white, 'texte secondaire sur blanc'],
  [neutral.text2, neutral.cream, 'en-tête de tableau'],
  [neutral.text2, neutral.hover, 'texte secondaire au survol'],
  [brand.pinkText, neutral.white, 'texte rose sur blanc'],
  [brand.pinkText, neutral.cream, 'libellé rose sur crème'],
  [brand.pinkText, brand.powder, 'texte rose sur poudré'],
  [neutral.white, neutral.ink, 'bouton standard'],
  [neutral.white, brand.pinkText, 'bouton principal'],
  [neutral.white, brand.pinkDeep, 'bouton principal survolé'],
]
for (const [name, s] of Object.entries(tokens.status)) {
  textPairs.push([s.text, s.bg, `badge ${name}`])
  textPairs.push([s.text, neutral.white, `texte ${name} sur blanc`])
  textPairs.push([neutral.white, s.solid, `texte blanc sur ${name} plein`])
}

for (const [fg, bg, usage] of textPairs) {
  test(`AA texte : ${usage} (${fg} sur ${bg})`, () => {
    const r = ratio(fg, bg)
    assert.ok(r >= AA, `${r.toFixed(2)}:1 < 4,5:1`)
  })
}

const uiPairs = [
  [brand.pink, neutral.white, 'anneau de focus sur blanc'],
  [brand.pink, neutral.cream, 'anneau de focus sur crème'],
  [brand.pink, brand.powder, 'anneau de focus sur poudré'],
  ...tokens.chart.series.map((c, i) => [c, neutral.white, `série ${i + 1} du graphique`]),
  ...Object.entries(tokens.status).map(([n, s]) => [s.solid, neutral.white, `icône ${n}`]),
]
for (const [fg, bg, usage] of uiPairs) {
  test(`3:1 non textuel : ${usage} (${fg} sur ${bg})`, () => {
    const r = ratio(fg, bg)
    assert.ok(r >= UI, `${r.toFixed(2)}:1 < 3:1`)
  })
}

test('les couleurs interdites en texte le sont pour une raison (rose marque, discret)', () => {
  assert.ok(ratio(brand.pink, neutral.white) < AA)
  assert.ok(ratio(neutral.faint, neutral.white) < UI)
  assert.ok(ratio(tokens.color.successFill, neutral.white) < AA)
})
