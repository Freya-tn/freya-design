# @freya/design

Système de design des fronts admin Freya : jetons (`tokens.js`), variables CSS (`tokens.css`), polices
(`fonts.css`) et thème MUI 6 à 9 (`mui.js`), dérivés de la charte du site freya.tn.

**Toute la documentation est dans [DESIGN.md](./DESIGN.md)** : principes, couleurs, typographie, composants,
accessibilité, rédaction, installation et évolution.

```json
"@freya/design": "github:Freya-tn/freya-design#v1.0.0"
```

```ts
import { createTheme } from '@mui/material/styles'
import { createFreyaTheme } from '@freya/design/mui'
import '@freya/design/fonts.css'

export default createFreyaTheme(createTheme)
```

Aperçu : ouvrir `specimen.html` après `npm install`. Tests : `npm test`. Après une modification de `tokens.js` :
`npm run build:css`.
