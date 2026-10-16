// Génère tokens.css à partir de tokens.js (seule source de vérité).
// Usage : `npm run build:css`. Le test test/tokens-css.test.js échoue si tokens.css n'est pas à jour.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { tokens } from '../tokens.js'

const kebab = s => String(s).replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

// Unité d'une valeur numérique selon son chemin
function unit(path, value) {
  if (typeof value !== 'number') return value
  if (path.includes('weight')) return String(value)
  if (path[0] === 'duration') return `${value}ms`
  return value === 0 ? '0' : `${value}px`
}

function flatten(obj, path = [], out = []) {
  for (const [k, v] of Object.entries(obj)) {
    const p = [...path, Array.isArray(obj) ? String(Number(k) + 1) : k]
    if (v && typeof v === 'object') flatten(v, p, out)
    else out.push([p, v])
  }
  return out
}

// Nom de la variable : les couleurs perdent leur groupe (--fd-pink, --fd-ink, --fd-blue), le reste garde son chemin
function varName(path) {
  const parts = path[0] === 'color' ? path.slice(-1) : path[0] === 'chart' && path[1] === 'series' ? ['chart', path[2]] : path
  return `--fd-${parts.map(kebab).join('-')}`
}

export function renderCss() {
  const lines = flatten(tokens).map(([p, v]) => `  ${varName(p)}: ${unit(p, v)};`)
  return [
    '/* freya-design : variables CSS des jetons. FICHIER GÉNÉRÉ par scripts/build-css.mjs à partir de tokens.js,',
    '   ne pas modifier à la main. Préfixe --fd- (freya design). Voir DESIGN.md. */',
    ':root {',
    ...lines,
    '}',
    '',
  ].join('\n')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const target = fileURLToPath(new URL('../tokens.css', import.meta.url))
  writeFileSync(target, renderCss())
  console.log(`tokens.css régénéré (${renderCss().split('\n').length} lignes)`)
}
