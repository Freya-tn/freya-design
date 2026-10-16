// Jetons du système de design des fronts admin Freya (freya-design).
// C'est LA source de vérité : tokens.css et mui.js en dérivent. Après toute modification ici,
// lancer `npm run build:css` puis `npm test` (voir DESIGN.md, section 10).
// Valeurs relevées sur la charte du site freya.tn, adaptées à l'admin (contraste AA partout).

const brand = {
  // Rose marque : remplissages, accents, halo, anneau de focus. Jamais pour du texte (3,84:1 sur blanc).
  pink: '#EE3388',
  // Rose texte : tout texte rose, et fond du bouton principal de l'admin (5,79:1 avec du blanc).
  pinkText: '#C21868',
  // Rose profond : survol et appui du bouton principal (7,51:1 avec du blanc).
  pinkDeep: '#A3135A',
  // Rose poudré : fond de l'élément de navigation actif, des sélections, des mises en avant.
  powder: '#FDEBF1',
  pink200: '#F9D9E5',
  pink300: '#F6A9C8',
}

const neutral = {
  ink: '#111111', // texte principal, bouton standard, puce active
  text2: '#6B6468', // texte secondaire, aide, en-têtes de tableau
  faint: '#CFC8CB', // traits discrets, icônes désactivées, séries « Autres ». Jamais pour du texte.
  line: '#E9E4E6', // filets, bordures de cartes et de tableaux
  lineStrong: '#DAD3D6', // bordure des champs au repos
  white: '#FFFFFF',
  cream: '#FBF8F5', // fond de page, en-tête de tableau
  hover: '#F6F2F3', // survol d'une ligne, d'un élément de liste
}

// Couleurs de catégories de la charte (texte AA sur blanc), pour étiqueter des familles d'objets
const category = {
  blue: '#1F5673',
  violet: '#5A3678',
  green: '#3E5A2C',
  amber: '#7A4318',
  gold: '#6E5300',
  red: '#8A2A24',
}

// États de l'admin : texte, fond clair, bordure, et couleur pleine (icône, point, puce pleine, texte blanc dessus).
// Toutes les paires texte/fond sont AA (>= 4,5:1), vérifiées par test/contrast.test.js.
const status = {
  success: { text: '#146B38', bg: '#E8F5EE', border: '#B5DCC4', solid: '#1A7A40' },
  warning: { text: '#7A4318', bg: '#FDF3E7', border: '#F0D2AE', solid: '#A85A0C' },
  error: { text: '#8A2A24', bg: '#FCEDEC', border: '#F2C4C0', solid: '#B3261E' },
  info: { text: '#1F5673', bg: '#EAF2F6', border: '#BED5E2', solid: '#2B6E91' },
  neutral: { text: '#6B6468', bg: '#F4F1F2', border: '#E0DADD', solid: '#6B6468' },
  brand: { text: '#C21868', bg: '#FDEBF1', border: '#F9D9E5', solid: '#C21868' },
}

// Palette des graphiques, dans l'ordre d'usage (série 1 = rose marque). 5 séries au plus, puis « Autres ».
// Validée (luminosité, chroma, séparation daltonisme, contraste >= 3:1 sur blanc).
const chart = {
  series: ['#EE3388', '#3A8FC0', '#C26A1E', '#8350B5', '#4E8A35'],
  other: '#CFC8CB',
  grid: '#E9E4E6',
  axis: '#6B6468',
}

const gradient = {
  powder: 'linear-gradient(160deg, #F6E3EA, #FDF4F7)',
  hero: 'linear-gradient(170deg, #F3D6E2, #FBEFF4 55%, #F6E3EA)',
}

const font = {
  sans: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  accent: '"Cormorant Garamond", Georgia, "Times New Roman", serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
}

// Échelle typographique de l'admin (tailles et interlignes en px, letterSpacing en px)
const type = {
  pageTitle: { size: 24, lineHeight: 32, weight: 800, letterSpacing: -0.4 },
  sectionTitle: { size: 18, lineHeight: 26, weight: 700, letterSpacing: -0.2 },
  cardTitle: { size: 15, lineHeight: 22, weight: 700, letterSpacing: 0 },
  body: { size: 14, lineHeight: 22, weight: 400, letterSpacing: 0 },
  table: { size: 13, lineHeight: 20, weight: 400, letterSpacing: 0 },
  label: { size: 11, lineHeight: 16, weight: 700, letterSpacing: 1.5 },
  help: { size: 12, lineHeight: 18, weight: 400, letterSpacing: 0 },
  button: { size: 14, lineHeight: 20, weight: 600, letterSpacing: 0 },
  kpi: { size: 28, lineHeight: 34, weight: 800, letterSpacing: -0.6 },
}

// Échelle d'espacement : pas de 4 px (clé = multiple de 4)
const space = { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64 }

const radius = {
  xs: 6, // case à cocher, petite étiquette
  sm: 8, // bouton d'icône, élément de menu, info-bulle
  md: 12, // champ de formulaire, alerte, élément de navigation
  lg: 16, // carte, tableau, menu déroulant
  xl: 20, // dialogue, grande carte
  pill: 999, // boutons, puces, badges
}

const shadow = {
  none: 'none',
  // Halo rose : uniquement sous l'action principale de l'écran
  halo: '0 8px 20px rgba(238,51,136,0.35)',
  // Calques posés au-dessus de la page : menus, tiroirs, dialogues, popovers
  overlay: '0 24px 40px rgba(17,17,17,0.08)',
  // Anneau de focus visible (clavier)
  focus: '0 0 0 2px #FFFFFF, 0 0 0 4px #EE3388',
}

const duration = { fast: 120, base: 200, slow: 300 }
const easing = { standard: 'cubic-bezier(0.2, 0, 0, 1)' }

const layout = {
  sidebar: 248, // largeur de la barre latérale
  appBar: 64, // hauteur de la barre du haut
  content: 1440, // largeur maximale du contenu
  form: 720, // largeur maximale d'un formulaire
  gutter: 24, // gouttière (desktop) ; 16 sous 600 px
}

// Hauteur de ligne des tableaux (px)
const density = { comfortable: 52, standard: 44, compact: 36, header: 40 }

export const tokens = {
  color: { brand, neutral, category, successFill: '#1A8F4A' },
  status,
  chart,
  gradient,
  font,
  type,
  space,
  radius,
  shadow,
  duration,
  easing,
  layout,
  density,
}

export default tokens
