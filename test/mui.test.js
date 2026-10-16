// mui.js doit produire un thème valide avec createTheme de MUI 6 et de MUI 9 (@mui/material 6 et l'alias mui9 en devDependencies)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createFreyaTheme, freyaThemeOptions } from '../mui.js'
import { tokens } from '../tokens.js'
import { createRequire } from 'node:module'

// require : MUI 6 n'a pas de champ exports (import de dossier refusé en ESM)
const require = createRequire(import.meta.url)

const versions = [['MUI 6', '@mui/material'], ['MUI 9', 'mui9']]

for (const [label, pkg] of versions) {
  test(`${label} : createFreyaTheme produit un thème complet`, async () => {
    const { createTheme } = require(`${pkg}/styles`)
    const { frFR } = require(`${pkg}/locale`)
    const theme = createFreyaTheme(createTheme, frFR)
    assert.equal(theme.palette.primary.main, tokens.color.neutral.ink)
    assert.equal(theme.palette.secondary.main, tokens.color.brand.pinkText)
    assert.equal(theme.palette.background.default, tokens.color.neutral.cream)
    assert.equal(theme.palette.divider, tokens.color.neutral.line)
    assert.equal(theme.shape.borderRadius, tokens.radius.sm)
    assert.equal(theme.shadows.length, 25)
    assert.match(theme.typography.fontFamily, /Plus Jakarta Sans/)
    assert.equal(theme.typography.h4.fontWeight, 800)
    assert.equal(theme.spacing(2), '16px')
    // Les locales passées en surcharge sont fusionnées
    assert.ok(theme.components.MuiTablePagination.defaultProps.labelRowsPerPage)
    assert.ok(theme.components.MuiButton.styleOverrides.root)
    assert.equal(theme.components.MuiTableCell.styleOverrides.root.fontVariantNumeric, 'tabular-nums')
    // Couleurs dérivées calculées par MUI sans erreur
    assert.equal(typeof theme.palette.getContrastText(tokens.color.brand.pinkText), 'string')
  })

  test(`${label} : un override du front l'emporte sur le thème Freya`, async () => {
    const { createTheme } = require(`${pkg}/styles`)
    const theme = createFreyaTheme(createTheme, { palette: { background: { default: '#FFFFFF' } } })
    assert.equal(theme.palette.background.default, '#FFFFFF')
    assert.equal(theme.palette.primary.main, tokens.color.neutral.ink)
  })
}

test('freyaThemeOptions n\'est pas modifié par createFreyaTheme', async () => {
  const before = JSON.stringify(freyaThemeOptions)
  const { createTheme } = require('mui9/styles')
  createFreyaTheme(createTheme, { palette: { primary: { main: '#000000' } } })
  assert.equal(JSON.stringify(freyaThemeOptions), before)
})

test('createFreyaTheme refuse un premier argument qui n\'est pas createTheme', () => {
  assert.throws(() => createFreyaTheme({}), TypeError)
})

for (const [label, pkg] of versions) {
  test(`${label} : les composants surchargés se rendent avec le thème (rendu serveur)`, () => {
    const React = require('react')
    const { renderToString } = require('react-dom/server')
    const { createTheme, ThemeProvider } = require(`${pkg}/styles`)
    const theme = createFreyaTheme(createTheme)
    const h = React.createElement
    const M = name => require(`${pkg}/${name}`).default
    const tree = h(ThemeProvider, { theme }, [
      h(M('Button'), { key: 1, variant: 'contained', color: 'secondary' }, 'Créer la facture'),
      h(M('Button'), { key: 2, variant: 'outlined' }, 'Exporter'),
      h(M('Chip'), { key: 3, label: 'Payée', color: 'success', size: 'small' }),
      h(M('Alert'), { key: 4, severity: 'warning' }, 'Échéance proche'),
      h(M('TextField'), { key: 5, label: 'Client' }),
      h(M('ListItemButton'), { key: 6, selected: true }, 'Factures'),
      h(M('Tabs'), { key: 7, value: 0 }, h(M('Tab'), { label: 'Toutes' })),
      h(M('Table'), { key: 8 }, h(M('TableBody'), null, h(M('TableRow'), null, h(M('TableCell'), { align: 'right' }, '1 250,000 TND')))),
    ])
    const html = renderToString(tree)
    assert.match(html, /Créer la facture/)
    assert.match(html, /1 250,000 TND/)
  })
}

test('Bouton rose désactivé : pas de halo (la règle colorSecondary l\'emporterait sinon)', () => {
  const rule = freyaThemeOptions.components.MuiButton.styleOverrides.root['&.MuiButton-contained.MuiButton-colorSecondary']
  assert.equal(rule.boxShadow, tokens.shadow.halo)
  assert.deepEqual(rule['&.Mui-disabled'], { boxShadow: 'none' })
})
