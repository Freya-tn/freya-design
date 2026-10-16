# Journal des versions

Format : une entrée par version publiée (tag `vX.Y.Z`), la plus récente en haut. Voir DESIGN.md, section 10.

## 1.0.0 (2026-10-16)

Première version.

- Jetons : couleurs de marque, neutres, catégories, états de l'admin (texte, fond, bordure, plein, tous AA),
  palette des graphiques (5 séries validées), typographie, espacement (pas de 4 px), rayons, ombres, durées,
  mise en page, densité des tableaux.
- `tokens.css` (variables `--fd-*`) généré depuis `tokens.js`.
- `fonts.css` : Plus Jakarta Sans 400 à 800, Cormorant Garamond italique 500 (fontsource, sous-ensemble latin).
- `mui.js` : `freyaThemeOptions` et `createFreyaTheme(createTheme, ...surcharges)`, compatibles MUI 6 à 9.
- DESIGN.md, specimen.html, tests (CSS à jour, contrastes, thème MUI 6 et 9).
- Pilote : Freya Hub (freya-front).
