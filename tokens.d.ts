// Types des jetons de freya-design (écrits à la main, à tenir à jour avec tokens.js).

export interface StatusColors {
  /** Texte et icône sur `bg` (AA) */
  text: string
  /** Fond clair du badge, de l'alerte */
  bg: string
  /** Bordure du badge, de l'alerte */
  border: string
  /** Couleur pleine : point, icône seule, fond sous un texte blanc (AA) */
  solid: string
}

export type StatusName = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'brand'

export interface TypeStep {
  /** Taille en px */
  size: number
  /** Interligne en px */
  lineHeight: number
  weight: 400 | 500 | 600 | 700 | 800
  /** Espacement des lettres en px */
  letterSpacing: number
}

export interface FreyaTokens {
  color: {
    brand: {
      pink: '#EE3388'
      pinkText: '#C21868'
      pinkDeep: '#A3135A'
      powder: '#FDEBF1'
      pink200: '#F9D9E5'
      pink300: '#F6A9C8'
    }
    neutral: {
      ink: '#111111'
      text2: '#6B6468'
      faint: '#CFC8CB'
      line: '#E9E4E6'
      lineStrong: '#DAD3D6'
      white: '#FFFFFF'
      cream: '#FBF8F5'
      hover: '#F6F2F3'
    }
    category: {
      blue: '#1F5673'
      violet: '#5A3678'
      green: '#3E5A2C'
      amber: '#7A4318'
      gold: '#6E5300'
      red: '#8A2A24'
    }
    /** Vert succès de la charte : remplissage seulement (4,14:1 sur blanc, pas assez pour du texte) */
    successFill: '#1A8F4A'
  }
  status: Record<StatusName, StatusColors>
  chart: {
    /** Ordre d'usage des séries (5 au plus) */
    series: readonly [string, string, string, string, string]
    other: string
    grid: string
    axis: string
  }
  gradient: { powder: string; hero: string }
  font: {
    sans: string
    accent: string
    mono: string
    weight: { regular: 400; medium: 500; semibold: 600; bold: 700; extrabold: 800 }
  }
  type: Record<
    'pageTitle' | 'sectionTitle' | 'cardTitle' | 'body' | 'table' | 'label' | 'help' | 'button' | 'kpi',
    TypeStep
  >
  /** Espacement en px, clé = multiple de 4 px */
  space: Record<0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16, number>
  /** Rayons en px */
  radius: { xs: 6; sm: 8; md: 12; lg: 16; xl: 20; pill: 999 }
  shadow: { none: 'none'; halo: string; overlay: string; focus: string }
  /** Durées en ms */
  duration: { fast: number; base: number; slow: number }
  easing: { standard: string }
  /** Dimensions de mise en page en px */
  layout: { sidebar: number; appBar: number; content: number; form: number; gutter: number }
  /** Hauteurs de ligne des tableaux en px */
  density: { comfortable: number; standard: number; compact: number; header: number }
}

export declare const tokens: FreyaTokens
export default tokens
