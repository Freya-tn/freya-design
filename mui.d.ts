// Types du thème MUI de freya-design (écrits à la main). Nécessite @mui/material (6 à 9) dans le front.
import type { ThemeOptions } from '@mui/material/styles'
import type { FreyaTokens } from './tokens'

/** Options de thème MUI de la charte admin Freya (palette, typographie, formes, ombres, composants). */
export declare const freyaThemeOptions: ThemeOptions

/** Hauteurs de ligne recommandées des tableaux (px) : comfortable 52, standard 44, compact 36, en-tête 40. */
export declare const tableDensity: FreyaTokens['density']

/**
 * Crée le thème Freya avec le `createTheme` du front, puis fusionne les arguments suivants
 * (locales françaises, ajustements propres au front).
 * @example
 * import { createTheme } from '@mui/material/styles'
 * import { frFR } from '@mui/material/locale'
 * import { createFreyaTheme } from '@freya/design/mui'
 * export default createFreyaTheme(createTheme, frFR)
 */
export declare function createFreyaTheme<T>(
  createTheme: (options: ThemeOptions, ...args: object[]) => T,
  ...overrides: object[]
): T

export default createFreyaTheme
