// tokens.css doit être exactement ce que génère scripts/build-css.mjs à partir de tokens.js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { renderCss } from '../scripts/build-css.mjs'

test('tokens.css est à jour (sinon : npm run build:css)', () => {
  const onDisk = readFileSync(new URL('../tokens.css', import.meta.url), 'utf8')
  assert.equal(onDisk, renderCss())
})

test('chaque couleur de tokens.js est une couleur hexadécimale à 6 chiffres', async () => {
  const { tokens } = await import('../tokens.js')
  const walk = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (typeof v === 'object' ? walk(v, `${p}${k}.`) : [[`${p}${k}`, v]]))
  for (const [path, value] of [...walk(tokens.color), ...walk(tokens.status), ...walk(tokens.chart)]) {
    assert.match(value, /^#[0-9A-F]{6}$/, path)
  }
})

test('aucun tiret cadratin dans les fichiers du paquet', () => {
  for (const f of ['tokens.js', 'tokens.d.ts', 'tokens.css', 'fonts.css', 'mui.js', 'mui.d.ts', 'DESIGN.md', 'README.md', 'CHANGELOG.md', 'LICENSE', 'specimen.html']) {
    const txt = readFileSync(new URL(`../${f}`, import.meta.url), 'utf8')
    assert.ok(!txt.includes('\u2014'), f)
  }
})
