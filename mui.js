// Thème MUI des fronts admin Freya, dérivé des jetons (tokens.js).
// Compatible MUI 6 à 9 : uniquement des styleOverrides en objets et des sélecteurs de classes stables
// (`.MuiButton-contained.MuiButton-colorSecondary`, pas les classes composées retirées en MUI 7+).
// Le paquet n'importe pas MUI : le front passe son propre createTheme à createFreyaTheme.
import { tokens } from './tokens.js'

const { brand, neutral } = tokens.color
const { status, font, type, radius, shadow, density } = tokens

const px = n => `${n}px`
const typo = (t, extra = {}) => ({
  fontSize: px(t.size),
  lineHeight: px(t.lineHeight),
  fontWeight: t.weight,
  letterSpacing: t.letterSpacing ? px(t.letterSpacing) : 0,
  ...extra,
})
const focusRing = { outline: `2px solid ${brand.pink}`, outlineOffset: 2 }
const tabular = { fontVariantNumeric: 'tabular-nums' }

// Filet à la place d'une ombre (élévations 1 à 4), ombre de calque au-delà (menus, tiroirs, dialogues)
const LINE_SHADOW = `0 0 0 1px ${neutral.line}`
const OVERLAY_SHADOW = `0 0 0 1px rgba(17,17,17,0.06), ${shadow.overlay}`
const shadows = Array.from({ length: 25 }, (_, i) => (i === 0 ? 'none' : i <= 4 ? LINE_SHADOW : OVERLAY_SHADOW))

const paletteColor = s => ({ main: s.solid, light: s.border, dark: s.text, contrastText: neutral.white })

// Badge de statut clair (texte, fond, bordure) pour une puce ou une alerte
const statusChip = s => ({ backgroundColor: s.bg, color: s.text, border: `1px solid ${s.border}` })
const COLORS = { Success: 'success', Warning: 'warning', Error: 'error', Info: 'info' }

const chipColors = {}
const alertColors = {}
for (const [Cls, key] of Object.entries(COLORS)) {
  const s = status[key]
  chipColors[`&.MuiChip-filled.MuiChip-color${Cls}`] = statusChip(s)
  chipColors[`&.MuiChip-outlined.MuiChip-color${Cls}`] = { color: s.text, borderColor: s.border }
  alertColors[`&.MuiAlert-standard.MuiAlert-color${Cls}`] = {
    ...statusChip(s),
    '& .MuiAlert-icon': { color: s.solid },
  }
  alertColors[`&.MuiAlert-outlined.MuiAlert-color${Cls}`] = {
    backgroundColor: neutral.white,
    color: s.text,
    borderColor: s.border,
    '& .MuiAlert-icon': { color: s.solid },
  }
  alertColors[`&.MuiAlert-filled.MuiAlert-color${Cls}`] = {
    backgroundColor: s.solid,
    color: neutral.white,
    border: 0,
  }
}

const tableHead = {
  backgroundColor: neutral.cream,
  color: neutral.text2,
  fontSize: px(type.label.size),
  lineHeight: px(type.label.lineHeight),
  fontWeight: 700,
  letterSpacing: '1px',
  textTransform: 'uppercase',
}

/** @type {import('@mui/material/styles').ThemeOptions} */
export const freyaThemeOptions = {
  palette: {
    mode: 'light',
    // Standard : encre. Le rose (secondary) est réservé à l'action principale de l'écran.
    primary: { main: neutral.ink, light: '#3D393B', dark: '#000000', contrastText: neutral.white },
    secondary: { main: brand.pinkText, light: brand.pink, dark: brand.pinkDeep, contrastText: neutral.white },
    success: paletteColor(status.success),
    warning: paletteColor(status.warning),
    error: paletteColor(status.error),
    info: paletteColor(status.info),
    text: { primary: neutral.ink, secondary: neutral.text2, disabled: 'rgba(17,17,17,0.38)' },
    divider: neutral.line,
    background: { default: neutral.cream, paper: neutral.white },
    action: {
      hover: 'rgba(17,17,17,0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(238,51,136,0.10)',
      selectedOpacity: 0.1,
      focus: 'rgba(17,17,17,0.12)',
      focusOpacity: 0.12,
    },
  },
  shape: { borderRadius: radius.sm },
  shadows,
  typography: {
    fontFamily: font.sans,
    fontSize: type.body.size,
    htmlFontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: typo({ size: 32, lineHeight: 40, weight: 800, letterSpacing: -0.6 }),
    h2: typo({ size: 28, lineHeight: 36, weight: 800, letterSpacing: -0.5 }),
    h3: typo(type.pageTitle),
    h4: typo(type.pageTitle),
    h5: typo(type.sectionTitle),
    h6: typo({ size: 16, lineHeight: 24, weight: 700, letterSpacing: 0 }),
    subtitle1: typo({ size: 15, lineHeight: 22, weight: 600, letterSpacing: 0 }),
    subtitle2: typo({ size: 14, lineHeight: 20, weight: 600, letterSpacing: 0 }),
    body1: typo(type.body),
    body2: typo(type.table),
    caption: typo(type.help),
    overline: typo(type.label, { textTransform: 'uppercase' }),
    button: typo(type.button, { textTransform: 'none' }),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: neutral.cream,
          color: neutral.ink,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '::selection': { backgroundColor: brand.pink200 },
      },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
      styleOverrides: { root: { '&.Mui-focusVisible': focusRing } },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: radius.pill,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          minHeight: 40,
          paddingLeft: 18,
          paddingRight: 18,
          transition: 'background-color 120ms, border-color 120ms, color 120ms',
          '&:hover': { boxShadow: 'none' },
          '&.MuiButton-sizeSmall': { minHeight: 32, paddingLeft: 14, paddingRight: 14, fontSize: '13px' },
          '&.MuiButton-sizeLarge': { minHeight: 48, paddingLeft: 24, paddingRight: 24, fontSize: '15px' },
          // Standard : pilule noire
          '&.MuiButton-contained.MuiButton-colorPrimary': {
            backgroundColor: neutral.ink,
            color: neutral.white,
            '&:hover': { backgroundColor: '#2E2A2C' },
          },
          // Principal (une fois par écran) : pilule rose, halo rose
          '&.MuiButton-contained.MuiButton-colorSecondary': {
            backgroundColor: brand.pinkText,
            color: neutral.white,
            boxShadow: shadow.halo,
            '&:hover': { backgroundColor: brand.pinkDeep, boxShadow: shadow.halo },
          },
          // Danger
          '&.MuiButton-contained.MuiButton-colorError': {
            backgroundColor: status.error.solid,
            color: neutral.white,
            '&:hover': { backgroundColor: status.error.text },
          },
          // Secondaire : contour
          '&.MuiButton-outlined': {
            backgroundColor: neutral.white,
            borderColor: neutral.lineStrong,
            color: neutral.ink,
            '&:hover': { borderColor: neutral.ink, backgroundColor: neutral.hover },
          },
          '&.MuiButton-outlined.MuiButton-colorSecondary': { color: brand.pinkText, borderColor: brand.pink300 },
          '&.MuiButton-outlined.MuiButton-colorError': {
            color: status.error.text,
            borderColor: status.error.border,
            '&:hover': { borderColor: status.error.solid, backgroundColor: status.error.bg },
          },
          '&.MuiButton-outlined.MuiButton-colorSuccess': { color: status.success.text, borderColor: status.success.border },
          '&.MuiButton-outlined.MuiButton-colorWarning': { color: status.warning.text, borderColor: status.warning.border },
          '&.MuiButton-outlined.MuiButton-colorInfo': { color: status.info.text, borderColor: status.info.border },
          // Texte
          '&.MuiButton-text': { paddingLeft: 12, paddingRight: 12, '&:hover': { backgroundColor: neutral.hover } },
          '&.MuiButton-text.MuiButton-colorPrimary': { color: neutral.ink },
          '&.MuiButton-text.MuiButton-colorSecondary': { color: brand.pinkText },
          '&.MuiButton-text.MuiButton-colorError': { color: status.error.text },
          '&.MuiButton-text.MuiButton-colorSuccess': { color: status.success.text },
          '&.MuiButton-text.MuiButton-colorWarning': { color: status.warning.text },
          '&.MuiButton-text.MuiButton-colorInfo': { color: status.info.text },
          '&.Mui-disabled': { boxShadow: 'none' },
          '&.MuiButton-contained.Mui-disabled': { backgroundColor: '#F1EDEE', color: '#A59DA1' },
          '&.MuiButton-outlined.Mui-disabled': { borderColor: neutral.line, color: '#A59DA1' },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: { root: { '&:hover': { backgroundColor: neutral.hover } } },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          color: neutral.ink,
          borderColor: neutral.line,
          '&.Mui-selected': {
            backgroundColor: neutral.ink,
            color: neutral.white,
            '&:hover': { backgroundColor: '#2E2A2C' },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: radius.pill,
          fontWeight: 600,
          fontSize: '12px',
          height: 28,
          // Puce inactive : blanche, filet
          '&.MuiChip-filled.MuiChip-colorDefault': {
            backgroundColor: neutral.white,
            color: neutral.ink,
            border: `1px solid ${neutral.line}`,
          },
          '&.MuiChip-clickable.MuiChip-colorDefault:hover': { backgroundColor: neutral.hover },
          '&.MuiChip-outlined.MuiChip-colorDefault': { borderColor: neutral.line, color: neutral.ink },
          // Puce active : noire, texte blanc
          '&.MuiChip-filled.MuiChip-colorPrimary': { backgroundColor: neutral.ink, color: neutral.white },
          '&.MuiChip-filled.MuiChip-colorSecondary': statusChip(status.brand),
          '&.MuiChip-outlined.MuiChip-colorSecondary': { color: brand.pinkText, borderColor: brand.pink200 },
          ...chipColors,
          '&.MuiChip-sizeSmall': { height: 24, fontSize: '12px' },
          '& .MuiChip-icon': { color: 'inherit' },
          '& .MuiChip-deleteIcon': { color: 'inherit', opacity: 0.6, '&:hover': { color: 'inherit', opacity: 1 } },
          '&.Mui-focusVisible': focusRing,
        },
        label: { paddingLeft: 10, paddingRight: 10 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        rounded: { borderRadius: radius.lg },
        outlined: { borderColor: neutral.line },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: radius.lg, border: `1px solid ${neutral.line}`, boxShadow: 'none' },
      },
    },
    MuiCardHeader: {
      styleOverrides: { title: typo(type.cardTitle), subheader: { fontSize: '12px', color: neutral.text2 } },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: { color: neutral.text2, '&.Mui-focused': { color: brand.pinkText } },
      },
    },
    MuiInputLabel: {
      styleOverrides: { root: { fontSize: px(type.body.size) } },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          backgroundColor: neutral.white,
          fontSize: px(type.body.size),
          '& .MuiOutlinedInput-notchedOutline': { borderColor: neutral.lineStrong },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#B5ADB1' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: brand.pink, borderWidth: 2 },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: status.error.solid },
          '&.Mui-disabled': { backgroundColor: neutral.cream },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: { root: { fontSize: px(type.help.size), marginLeft: 4 } },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: `1px solid ${neutral.line}`, fontSize: px(type.table.size), ...tabular },
        head: { ...tableHead, whiteSpace: 'nowrap', paddingTop: 10, paddingBottom: 10 },
        sizeSmall: { paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12 },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.MuiTableRow-hover:hover': { backgroundColor: neutral.hover },
          '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: brand.powder },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: { root: { fontSize: px(type.table.size) }, toolbar: { minHeight: 48 } },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '--DataGrid-containerBackground': neutral.cream,
          '--DataGrid-rowBorderColor': neutral.line,
          border: `1px solid ${neutral.line}`,
          borderRadius: radius.lg,
          backgroundColor: neutral.white,
          fontSize: px(type.table.size),
          ...tabular,
          '& .MuiDataGrid-columnHeader, & .MuiDataGrid-filler': { backgroundColor: neutral.cream },
          '& .MuiDataGrid-columnHeaderTitle': { ...tableHead, backgroundColor: 'transparent' },
          '& .MuiDataGrid-row:hover': { backgroundColor: neutral.hover },
          '& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover': { backgroundColor: brand.powder },
          '& .MuiDataGrid-cell': { borderColor: neutral.line },
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': { outline: 'none' },
          '& .MuiDataGrid-cell:focus-visible, & .MuiDataGrid-columnHeader:focus-visible': {
            outline: `2px solid ${brand.pink}`,
            outlineOffset: -2,
          },
          '& .MuiDataGrid-footerContainer': { borderTop: `1px solid ${neutral.line}` },
        },
      },
    },
    MuiAppBar: {
      defaultProps: { color: 'inherit', elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: neutral.white,
          color: neutral.ink,
          boxShadow: 'none',
          borderBottom: `1px solid ${neutral.line}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: neutral.white, borderRight: `1px solid ${neutral.line}` },
      },
    },
    // Navigation : élément actif = fond rose poudré, texte encre, icône rose texte
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          minHeight: 40,
          color: neutral.text2,
          '&:hover': { backgroundColor: neutral.hover, color: neutral.ink },
          '&.Mui-selected': {
            backgroundColor: brand.powder,
            color: neutral.ink,
            '& .MuiListItemIcon-root': { color: brand.pinkText },
            '&:hover': { backgroundColor: brand.pink200 },
          },
          '&.Mui-focusVisible': { ...focusRing, outlineOffset: -2, backgroundColor: 'transparent' },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: { root: { minWidth: 36, color: 'inherit' } },
    },
    MuiMenu: {
      styleOverrides: { paper: { borderRadius: radius.md } },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: px(type.body.size),
          minHeight: 36,
          '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: brand.powder },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: { paper: { borderRadius: radius.md }, option: { fontSize: px(type.body.size) } },
    },
    MuiTabs: {
      styleOverrides: {
        root: { minHeight: 44, borderBottom: `1px solid ${neutral.line}` },
        indicator: { backgroundColor: brand.pink, height: 2 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: px(type.body.size),
          minHeight: 44,
          color: neutral.text2,
          '&.Mui-selected': { color: neutral.ink },
          '&:hover': { color: neutral.ink },
        },
      },
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: radius.xl } },
    },
    MuiDialogTitle: {
      styleOverrides: { root: { ...typo(type.sectionTitle), padding: '20px 24px 8px' } },
    },
    MuiDialogActions: {
      styleOverrides: { root: { padding: '12px 24px 20px', gap: 8 } },
    },
    MuiBackdrop: {
      styleOverrides: { root: { '&:not(.MuiBackdrop-invisible)': { backgroundColor: 'rgba(17,17,17,0.32)' } } },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: neutral.ink,
          color: neutral.white,
          fontSize: '12px',
          lineHeight: '16px',
          fontWeight: 500,
          borderRadius: radius.sm,
          padding: '6px 10px',
        },
        arrow: { color: neutral.ink },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: radius.md, fontSize: px(type.body.size), border: '1px solid transparent', ...alertColors },
        message: { fontWeight: 500 },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: { root: { backgroundColor: neutral.ink, borderRadius: radius.md } },
    },
    MuiBadge: {
      styleOverrides: {
        badge: { fontWeight: 700, fontSize: '11px', minWidth: 18, height: 18, padding: '0 5px' },
      },
    },
    MuiCircularProgress: {
      defaultProps: { color: 'secondary' },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: radius.pill, backgroundColor: brand.powder },
        bar: { borderRadius: radius.pill, backgroundColor: brand.pink },
      },
    },
    MuiSkeleton: {
      styleOverrides: { root: { backgroundColor: '#F1ECEE' } },
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: { root: { color: brand.pinkText, fontWeight: 600 } },
    },
    MuiAccordion: {
      styleOverrides: { root: { '&::before': { display: 'none' } } },
    },
  },
}

// Hauteurs de ligne recommandées pour les tableaux et DataGrid (rowHeight, columnHeaderHeight)
export const tableDensity = density

/**
 * Crée le thème MUI Freya avec le createTheme du front (aucune dépendance à sa version de MUI).
 * Les arguments suivants sont fusionnés par-dessus (locales, ajustements propres au front).
 * @example createFreyaTheme(createTheme, frFR)
 */
export function createFreyaTheme(createTheme, ...overrides) {
  if (typeof createTheme !== 'function') {
    throw new TypeError('createFreyaTheme : passer le createTheme de @mui/material/styles en premier argument')
  }
  return createTheme(freyaThemeOptions, ...overrides)
}

export default createFreyaTheme
