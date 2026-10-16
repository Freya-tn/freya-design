# Freya Design : système de design des fronts admin

Ce document est la référence pour quiconque crée ou modifie un front admin de Freya (Hub de la compta, freyaOMS,
portail, outils internes), développeur ou agent IA. Il décrit **quoi** utiliser, **avec quelles valeurs**, et
**comment** l'appliquer. Les valeurs viennent de `tokens.js` (la source de vérité) ; `tokens.css` et `mui.js` en
dérivent. En cas de doute entre ce document et `tokens.js`, `tokens.js` fait foi et ce document doit être corrigé.

Charte d'origine : le site freya.tn (maquettes 2026) et l'app vendeuses, qui l'applique déjà (thème `kbeauty` de
`freya-academy/apps/mobile/lib/theme.ts`). L'admin en reprend les polices, les couleurs et les formes, adaptées à un
outil de travail quotidien : plus dense, plus sobre, contraste AA partout.

Sommaire

1. Principes de l'admin
2. Couleurs
3. Typographie
4. Espacement, grille et densité
5. Formes et élévation
6. Composants
7. Accessibilité
8. Rédaction
9. Utilisation
10. Faire évoluer le système

---

## 1. Principes de l'admin

1. **Les données d'abord.** Un écran admin sert à lire, comparer et agir sur des données. Chaque élément visuel doit
   aider à ça. Pas d'illustration, pas de dégradé derrière un tableau, pas de carte décorative.
2. **Dense mais lisible.** Corps 14 px, tableaux 13 px, lignes de 44 px par défaut. On montre beaucoup d'information
   sans serrer : interlignes généreux, filets fins, alignements stricts (nombres à droite, chiffres tabulaires).
3. **Sobre : la marque se voit par les accents, pas par la décoration.** Fond crème, surfaces blanches, texte encre.
   Le rose apparaît en petites touches : élément de navigation actif, indicateur d'onglet, libellés de section,
   anneau de focus, première série d'un graphique, et l'action principale.
4. **Une seule action rose par écran.** Le bouton rose (`color="secondary"`) est l'action que l'écran existe pour
   permettre (« Créer la commande », « Enregistrer »). Toutes les autres actions sont noires, en contour ou en texte.
   Un dialogue est un écran : il a au plus une action rose.
5. **Cohérence avec freya.tn et l'app vendeuses.** Mêmes polices (Plus Jakarta Sans, Cormorant Garamond en accent),
   mêmes couleurs, mêmes pilules, même absence d'ombres. Quelqu'un qui passe de l'app au Hub doit reconnaître la
   marque.
6. **Rien en dur.** Couleurs, tailles, rayons et ombres viennent du thème (MUI) ou des variables `--fd-*` (CSS).
   Une valeur absente du système se discute et s'ajoute ici (section 10), elle ne s'invente pas dans une page.

---

## 2. Couleurs

### 2.1 Marque

| Jeton | Valeur | Usage | Variable CSS |
|---|---|---|---|
| `color.brand.pink` | `#EE3388` | Rose marque : accents non textuels (indicateur d'onglet, focus, halo, graphique série 1, barre de progression) | `--fd-pink` |
| `color.brand.pinkText` | `#C21868` | **Tout texte rose**, libellés de section, liens, fond du bouton principal | `--fd-pink-text` |
| `color.brand.pinkDeep` | `#A3135A` | Survol et appui du bouton principal | `--fd-pink-deep` |
| `color.brand.powder` | `#FDEBF1` | Rose poudré : navigation active, ligne sélectionnée, mise en avant | `--fd-powder` |
| `color.brand.pink200` | `#F9D9E5` | Survol d'un élément actif, bordure de mise en avant, sélection de texte | `--fd-pink200` |
| `color.brand.pink300` | `#F6A9C8` | Bordure d'un bouton contour rose | `--fd-pink300` |

Dégradés (réservés aux écrans de connexion et pages d'accueil, **jamais** derrière des données) :
`gradient.powder` = `linear-gradient(160deg, #F6E3EA, #FDF4F7)` ; `gradient.hero` =
`linear-gradient(170deg, #F3D6E2, #FBEFF4 55%, #F6E3EA)`.

### 2.2 Neutres

| Jeton | Valeur | Usage | Variable CSS |
|---|---|---|---|
| `neutral.ink` | `#111111` | Texte principal, bouton standard, puce active | `--fd-ink` |
| `neutral.text2` | `#6B6468` | Texte secondaire, aide, en-têtes de tableau, navigation au repos | `--fd-text2` |
| `neutral.faint` | `#CFC8CB` | Traits discrets, icônes désactivées, série « Autres ». **Jamais pour du texte** | `--fd-faint` |
| `neutral.line` | `#E9E4E6` | Filets, bordures de cartes, de tableaux, séparateurs | `--fd-line` |
| `neutral.lineStrong` | `#DAD3D6` | Bordure des champs et des boutons contour au repos | `--fd-line-strong` |
| `neutral.white` | `#FFFFFF` | Surfaces : cartes, tableaux, barre latérale, barre du haut, champs | `--fd-white` |
| `neutral.cream` | `#FBF8F5` | Fond de page, en-tête de tableau | `--fd-cream` |
| `neutral.hover` | `#F6F2F3` | Survol d'une ligne, d'un élément de liste, d'un bouton texte | `--fd-hover` |

### 2.3 Catégories

Couleurs de la charte pour **étiqueter des familles d'objets** (canal de vente, type de produit), en texte ou en
pastille. Toutes sont AA en texte sur blanc. Elles ne remplacent pas les couleurs d'état.

| Jeton | Valeur | Contraste sur blanc |
|---|---|---|
| `category.blue` | `#1F5673` | 7,96:1 |
| `category.violet` | `#5A3678` | 9,40:1 |
| `category.green` | `#3E5A2C` | 7,77:1 |
| `category.amber` | `#7A4318` | 7,94:1 |
| `category.gold` | `#6E5300` | 7,24:1 |
| `category.red` | `#8A2A24` | 8,62:1 |

Le vert succès de la charte `#1A8F4A` (`color.successFill`) n'atteint que 4,14:1 sur blanc : il reste disponible
pour un remplissage (point, icône), jamais pour du texte. L'admin utilise les verts d'état ci-dessous.

### 2.4 États (adaptés à l'admin)

Chaque état a quatre valeurs : **texte** (sur le fond clair ou sur blanc), **fond** clair, **bordure**, et
**plein** (point, icône seule, ou fond sous un texte blanc). Tous les couples sont AA, vérifiés par
`test/contrast.test.js`.

| État | Texte | Fond | Bordure | Plein | Texte / fond | Texte / blanc | Blanc / plein |
|---|---|---|---|---|---|---|---|
| `success` (succès) | `#146B38` | `#E8F5EE` | `#B5DCC4` | `#1A7A40` | 5,87:1 | 6,58:1 | 5,38:1 |
| `warning` (avertissement) | `#7A4318` | `#FDF3E7` | `#F0D2AE` | `#A85A0C` | 7,24:1 | 7,94:1 | 5,08:1 |
| `error` (erreur) | `#8A2A24` | `#FCEDEC` | `#F2C4C0` | `#B3261E` | 7,58:1 | 8,62:1 | 6,54:1 |
| `info` | `#1F5673` | `#EAF2F6` | `#BED5E2` | `#2B6E91` | 7,03:1 | 7,96:1 | 5,61:1 |
| `neutral` (neutre) | `#6B6468` | `#F4F1F2` | `#E0DADD` | `#6B6468` | 5,13:1 | 5,76:1 | 5,76:1 |
| `brand` (nouveau, à traiter) | `#C21868` | `#FDEBF1` | `#F9D9E5` | `#C21868` | 5,06:1 | 5,79:1 | 5,79:1 |

Choix d'adaptation : les textes d'état reprennent les couleurs de catégories de la charte (ambre, rouge, bleu) qui
sont déjà sombres et lisibles ; le vert est assombri (`#146B38`) car le vert de la charte ne passe pas AA ; les
couleurs pleines sont un cran plus vives que les textes pour rester reconnaissables en icône tout en portant un
texte blanc à plus de 4,5:1.

Variables CSS : `--fd-status-<état>-text`, `--fd-status-<état>-bg`, `--fd-status-<état>-border`,
`--fd-status-<état>-solid`. Dans MUI : `palette.success.main` = plein, `palette.success.dark` = texte,
`palette.success.light` = bordure (idem pour `warning`, `error`, `info`).

### 2.5 Graphiques

Ordre d'usage fixe (la série 1 est toujours le rose marque) :

| Ordre | Valeur | Variable CSS |
|---|---|---|
| 1 | `#EE3388` rose | `--fd-chart-1` |
| 2 | `#3A8FC0` bleu | `--fd-chart-2` |
| 3 | `#C26A1E` ambre | `--fd-chart-3` |
| 4 | `#8350B5` violet | `--fd-chart-4` |
| 5 | `#4E8A35` vert | `--fd-chart-5` |
| Autres | `#CFC8CB` | `--fd-chart-other` |

Grille `#E9E4E6` (`--fd-chart-grid`), axes et libellés `#6B6468` (`--fd-chart-axis`). La palette est validée :
luminosité et saturation homogènes, séparation suffisante pour les daltonismes entre séries voisines, chaque série
à au moins 3:1 sur blanc. **Cinq séries au plus** ; au-delà, regrouper dans « Autres » ou faire plusieurs petits
graphiques. Les catégories sombres de la charte (2.3) ne servent pas de séries : trop proches entre elles.

### 2.6 Règles

- Texte rose = `#C21868`, toujours. **Jamais `#EE3388` en texte** (3,84:1 sur blanc, insuffisant).
- **Jamais `#CFC8CB` en texte** (1,64:1). Pour un texte discret : `#6B6468`.
- Fond de page crème `#FBF8F5`, surfaces blanches. Pas de fond gris, pas de fond coloré derrière un tableau.
- Les couleurs d'état ne servent qu'aux états. Une série de graphique, une catégorie ou une décoration n'utilise
  jamais le vert, l'ambre ou le rouge d'état.
- Une couleur n'est jamais le seul porteur d'information (voir section 7).

---

## 3. Typographie

Polices : **Plus Jakarta Sans** pour toute l'interface (400, 500, 600, 700, 800) ; **Cormorant Garamond italique 500**
pour un mot d'accent, très rarement. Pile : `"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
Roboto, Helvetica, Arial, sans-serif` (`--fd-font-sans`).

### 3.1 Échelle admin

| Rôle | Taille / interligne | Graisse | Espacement | Variante MUI | Jeton |
|---|---|---|---|---|---|
| Titre de page | 24 / 32 | 800 | -0,4 px | `h4` (et `h3`) | `type.pageTitle` |
| Titre de section | 18 / 26 | 700 | -0,2 px | `h5`, `DialogTitle` | `type.sectionTitle` |
| Titre de bloc | 16 / 24 | 700 | 0 | `h6` | |
| Titre de carte | 15 / 22 | 700 | 0 | `subtitle1` (600), `CardHeader` | `type.cardTitle` |
| Corps | 14 / 22 | 400 | 0 | `body1` | `type.body` |
| Corps fort | 14 / 20 | 600 | 0 | `subtitle2` | |
| Tableau, texte dense | 13 / 20 | 400 | 0 | `body2`, `TableCell` | `type.table` |
| Aide, légende | 12 / 18 | 400 | 0 | `caption` | `type.help` |
| Libellé | 11 / 16 | 700, MAJUSCULES | 1,5 px | `overline` | `type.label` |
| Bouton | 14 / 20 | 600 | 0 | `button` (sans majuscules) | `type.button` |
| Indicateur (KPI) | 28 / 34 | 800 | -0,6 px | (sx, voir 6.8) | `type.kpi` |

`h1` (32/40) et `h2` (28/36) existent pour un écran de connexion ou une page d'accueil, pas pour une page de travail.

### 3.2 Règles

- **Chiffres tabulaires** (`font-variant-numeric: tabular-nums`) dans les tableaux, les montants et les KPI : les
  colonnes de chiffres s'alignent. Le thème MUI l'applique à `TableCell` et `DataGrid` ; ailleurs, l'ajouter :
  `sx={{ fontVariantNumeric: 'tabular-nums' }}`.
- Libellé de section : 11 px, 700, majuscules, espacement 1,5 px, couleur `#C21868`
  (`<Typography variant="overline" color="secondary">`). En-tête de tableau : même forme, couleur `#6B6468`,
  espacement 1 px (plus serré, la ligne est dense).
- Graisses : 400 corps, 600 interactif (boutons, onglets, navigation active), 700 titres, 800 titre de page et KPI.
  Pas de 300, pas de 900.
- **Cormorant Garamond : au plus un mot d'accent dans le titre d'une page ou d'un écran de connexion.** Jamais dans
  un tableau, un bouton, un formulaire, un montant ni un texte de moins de 24 px. Rendu comme dans l'app
  (`BrandTitle`) : la fin du titre en Cormorant italique 500, 1,15 fois plus grande, même couleur.

```tsx
<Typography variant="h4">
  Bonjour{' '}
  <Box component="span" sx={{ fontFamily: tokens.font.accent, fontStyle: 'italic', fontWeight: 500, fontSize: '1.15em' }}>
    Amira.
  </Box>
</Typography>
```

---

## 4. Espacement, grille et densité

### 4.1 Échelle

Pas de 4 px. Jetons `space` (clé = multiple de 4) et variables `--fd-space-*` :

| Clé | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 |
|---|---|---|---|---|---|---|---|---|---|---|
| px | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 |

Dans MUI, `theme.spacing` reste à 8 px par unité (les fronts existants en dépendent) : `p: 0.5` = 4 px, `p: 1` =
8 px, `p: 1.5` = 12 px, `p: 2` = 16 px, `p: 3` = 24 px, `p: 4` = 32 px. N'utiliser que des valeurs qui tombent sur
l'échelle.

### 4.2 Mise en page

| Élément | Valeur | Jeton |
|---|---|---|
| Barre latérale | 248 px, blanche, filet à droite | `layout.sidebar` |
| Barre du haut | 64 px, blanche, filet en bas | `layout.appBar` |
| Contenu | 1440 px au plus, centré au-delà | `layout.content` |
| Formulaire | 720 px au plus | `layout.form` |
| Gouttière | 24 px (16 px sous 600 px de large) | `layout.gutter` |
| Entre deux sections | 32 px | `space[8]` |
| Entre deux cartes | 16 px (24 px pour des cartes larges) | `space[4]` |
| Intérieur d'une carte | 20 à 24 px | `space[5]`, `space[6]` |
| Entre un libellé et son champ, entre deux champs | 8 px, 16 px | |

Grille : 12 colonnes (`Grid` MUI) avec un espacement de 16 px (`spacing={2}`), 24 px pour les tableaux de bord.

### 4.3 Densité des tableaux

| Densité | Hauteur de ligne | Quand | MUI |
|---|---|---|---|
| Confortable | 52 px | Listes courtes, lignes à deux niveaux (nom + détail) | `TableCell` taille par défaut, `DataGrid density="comfortable"` |
| Standard | 44 px | Par défaut | `DataGrid rowHeight={44}` |
| Compacte | 36 px | Grandes listes de travail, lignes à une information | `<Table size="small">`, `DataGrid density="compact"` |
| En-tête | 40 px | Toujours | `columnHeaderHeight={40}` |

`tableDensity` (exporté par `@freya/design/mui`) contient ces valeurs.

---

## 5. Formes et élévation

### 5.1 Rayons

| Jeton | px | Composants |
|---|---|---|
| `radius.xs` | 6 | Case à cocher, petite étiquette dans un texte |
| `radius.sm` | 8 | Info-bulle, bouton d'icône carré, `theme.shape.borderRadius` |
| `radius.md` | 12 | Champs, alertes, éléments de navigation, menus déroulants |
| `radius.lg` | 16 | Cartes, tableaux, `Paper` |
| `radius.xl` | 20 | Dialogues, grandes cartes d'accueil |
| `radius.pill` | 999 | Boutons, puces, badges, barres de progression |

Dans MUI, `shape.borderRadius` vaut 8 : `sx={{ borderRadius: 1.5 }}` = 12 px, `borderRadius: 2` = 16 px.

### 5.2 Filets plutôt qu'ombres

- Une surface se détache par un **filet** de 1 px `#E9E4E6`, pas par une ombre. Les élévations MUI 1 à 4 (cartes,
  `Paper`, accordéons) sont rendues comme un filet.
- **Ombres permises, et seulement elles :**
  - halo rose `0 8px 20px rgba(238,51,136,0.35)` sous l'action principale (le thème le pose sur le bouton
    `contained` `secondary`) ;
  - calques au-dessus de la page (menus, tiroirs, dialogues, popovers, notifications) :
    `0 24px 40px rgba(17,17,17,0.08)` (élévations MUI 5 et plus).
- Pas d'ombre maison, pas d'ombre au survol, pas d'ombre sur une carte.

---

## 6. Composants

Les exemples sont en MUI (thème `createFreyaTheme`). L'équivalent CSS simple utilise les variables `--fd-*`
(section 9.3).

### 6.1 Boutons

Tous les boutons sont des pilules, 600, sans majuscules, hauteur 40 px (32 en `small`, 48 en `large`).

| Rôle | MUI | Rendu | Règle |
|---|---|---|---|
| **Principal** | `variant="contained" color="secondary"` | Fond `#C21868`, texte blanc (5,79:1), halo rose ; survol `#A3135A` | **Une fois par écran**, l'action pour laquelle l'écran existe |
| Standard | `variant="contained"` (primary) | Fond encre `#111111`, texte blanc | Actions affirmées secondaires (« Appliquer », « Valider ») |
| Secondaire | `variant="outlined"` | Blanc, filet `#DAD3D6`, texte encre ; survol filet encre | La plupart des actions (« Exporter », « Filtrer », « Annuler ») |
| Texte | `variant="text"` | Texte encre, fond au survol | Actions de ligne, « Voir tout », actions tertiaires |
| Danger | `variant="contained" color="error"` (confirmation) ou `variant="outlined" color="error"` | Fond `#B3261E` / contour `#F2C4C0`, texte `#8A2A24` | Supprimer, annuler une facture. Toujours confirmé par un dialogue |

Pourquoi `#C21868` et pas `#EE3388` pour le bouton principal : sur le site et dans l'app, le bouton rose marque porte
un texte blanc à 3,84:1, accepté pour un grand bouton mobile. L'admin, utilisé toute la journée, vise AA partout :
le fond prend le rose texte (5,79:1) et le rose marque reste dans le halo.

```tsx
<Stack direction="row" spacing={1}>
  <Button variant="outlined">Annuler</Button>
  <Button variant="contained" color="secondary">Créer la commande</Button>
</Stack>
```

Ordre : action principale à droite dans une barre d'actions ou un dialogue, en haut à droite d'une page. Icône à
gauche du libellé (`startIcon`) seulement si elle aide. Un bouton qui charge garde sa largeur et affiche un
`CircularProgress size={16} color="inherit"`.

### 6.2 Puces et filtres

- Puce inactive : blanche, filet `#E9E4E6`, texte encre (`<Chip label="Toutes" />`, `clickable`).
- Puce active : noire, texte blanc (`<Chip label="En retard" color="primary" />`).
- Hauteur 28 px (24 en `small`), 12 px 600.
- Une rangée de filtres se place au-dessus du tableau, alignée à gauche, espacement 8 px ; la recherche à gauche,
  les filtres ensuite, les actions (export) à droite.

```tsx
{FILTRES.map(f => (
  <Chip key={f.id} label={f.label} clickable color={f.id === actif ? 'primary' : 'default'} onClick={() => setActif(f.id)} />
))}
```

### 6.3 Badges de statut

Un statut est une puce `small` claire : texte, fond et bordure de l'état (2.4). Toujours un libellé, jamais une
pastille de couleur seule.

```tsx
<Chip size="small" color="success" label="Payée" />
```

Correspondance des statuts métier :

| État | Statuts |
|---|---|
| `success` | Payée, Encaissé, Livrée, Traité, Validée, Envoyée au client, Synchronisé |
| `warning` | En attente, Partiellement payée, À livrer, Échéance proche, À relancer, Ouverte depuis plus de 15 jours |
| `error` | En retard, Impayée, Rejeté (chèque, traite), Échec d'envoi, Stock épuisé |
| `info` | En cours, Déposé, Envoyée, Avoir, En préparation |
| `neutral` | Brouillon, Annulée, Refusée, Archivée, Clôturée |
| `brand` (`color="secondary"`) | Nouvelle, À traiter |

Une commande annulée n'est pas une erreur : c'est un état final neutre. Le rouge est réservé à ce qui demande une
action.

### 6.4 Champs de formulaire

- `TextField` contour : fond blanc, rayon 12, filet `#DAD3D6`, survol `#B5ADB1`, **focus : bordure rose
  `#EE3388` 2 px**, libellé au focus `#C21868`, erreur `#B3261E` avec message d'aide 12 px.
- `size="small"` (40 px) dans les barres de filtres et les tableaux ; taille normale (56 px) dans les formulaires.
- Libellé toujours visible (pas de placeholder seul). Aide sous le champ en `caption`. Champ obligatoire : `required`
  (astérisque MUI).
- Montant : aligné à droite, `InputProps={{ endAdornment: <InputAdornment position="end">TND</InputAdornment> }}`.
- Un formulaire : une colonne, 720 px au plus, sections titrées en `overline` rose, actions en bas à droite.

### 6.5 Tableaux

- Conteneur : `Paper` (filet, rayon 16) ou `DataGrid` (filet, rayon 16, fond blanc).
- **En-tête crème** `#FBF8F5`, 11 px 700, MAJUSCULES, espacement 1 px, `#6B6468`, hauteur 40 px.
- Lignes : 13 px, filet `#E9E4E6` entre les lignes, **survol `#F6F2F3`**, sélection `#FDEBF1`. Hauteur selon 4.3.
- **Nombres alignés à droite** (`align="right"`, ou `type: 'number'` en DataGrid), chiffres tabulaires.
- **Montants avec `TND`**, trois décimales, espace fine insécable pour les milliers : `1 250,000 TND`. En-tête de
  colonne : « Montant TTC (TND) » permet d'alléger les cellules si la colonne ne contient que des montants.
- Dates au format français (section 8). Statut en badge (6.3). Actions de ligne en boutons texte ou `IconButton`
  avec `title` à droite.
- Ligne cliquable : curseur pointeur et survol ; l'action principale de la ligne ouvre le détail (tiroir à droite).

```tsx
<TableCell align="right">{formatTND(facture.total_ttc)}</TableCell>
```

```ts
export const formatTND = (n: number) =>
  `${new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(n)} TND`
```

### 6.6 Cartes et indicateurs (KPI)

- Carte : blanche, filet `#E9E4E6`, rayon 16, intérieur 20 à 24 px, pas d'ombre.
- KPI : libellé en `overline` (`#6B6468` ou `#C21868`), valeur 28/34 800 tabulaire, unité plus petite, variation en
  `caption` avec signe et mot (« +12 % sur 30 jours »), couleur d'état seulement si la variation est un état.

```tsx
<Card>
  <CardContent>
    <Typography variant="overline" color="text.secondary">Encaissé ce mois</Typography>
    <Typography sx={{ fontSize: 28, lineHeight: '34px', fontWeight: 800, letterSpacing: '-0.6px', fontVariantNumeric: 'tabular-nums' }}>
      48 320,500 <Box component="span" sx={{ fontSize: 14, fontWeight: 600, color: 'text.secondary' }}>TND</Box>
    </Typography>
    <Typography variant="caption" color="text.secondary">+12 % sur 30 jours</Typography>
  </CardContent>
</Card>
```

Quatre KPI au plus par rangée. Une mise en avant exceptionnelle (objectif atteint) peut prendre le fond
`gradient.powder` et un filet `#F9D9E5` ; une par écran au plus.

### 6.7 Navigation

- **Barre latérale blanche** 248 px, filet `#E9E4E6` à droite. En-tête : nom de l'outil (16 px 800, encre) et
  sous-titre (`caption`, `#6B6468`).
- Élément : 40 px de haut, rayon 12, 14 px, icône 20 px dans 36 px, texte `#6B6468` ; survol fond `#F6F2F3`, texte
  encre.
- **Élément actif : fond rose poudré `#FDEBF1`, texte encre 600, icône `#C21868`.** (`ListItemButton selected`,
  le thème s'en charge.)
- Groupes dépliables : en-tête de groupe comme un élément, enfants indentés de 36 px.
- Barre du haut blanche 64 px, filet en bas : titre de la page (16 px 700) à gauche ; cloche, utilisateur et
  déconnexion à droite.

### 6.8 Onglets

Texte 14 px 600, `#6B6468` au repos, encre une fois choisi, **indicateur rose `#EE3388` 2 px**, filet `#E9E4E6` sous
la rangée. Libellés courts, avec un compteur entre parenthèses si utile (« À traiter (4) »).

### 6.9 Dialogues et tiroirs

- Dialogue : rayon 20, ombre de calque, fond assombri `rgba(17,17,17,0.32)`. Titre 18 px 700 ; contenu 14 px ;
  actions en bas à droite (`Annuler` en contour, action en principal ou en danger).
- Dialogue de confirmation d'une action destructive : le titre dit l'action (« Annuler la facture F-2026-0142 ? »),
  le bouton aussi (« Annuler la facture »), jamais « OK ».
- Tiroir de détail : à droite, 480 à 640 px, en-tête avec titre et fermeture, ombre de calque.

### 6.10 Alertes et notifications

- `Alert` (variante par défaut) : fond, bordure et texte de l'état, icône en couleur pleine, rayon 12.
  `<Alert severity="warning">3 factures arrivent à échéance cette semaine.</Alert>`
- Notification passagère (`Snackbar`) : en bas à gauche, 4 à 6 s, `Alert variant="filled"` pour une erreur, fond
  encre pour une confirmation neutre (« Facture enregistrée »).
- Badge de compteur (`Badge`) : 18 px, 11 px 700 ; `color="error"` pour ce qui est en retard, `color="secondary"`
  pour ce qui est nouveau.

### 6.11 États vides

Centré dans la zone de contenu : une icône 40 px `#CFC8CB` (décorative), un titre 16 px 700 (« Aucune facture pour
ce filtre »), une phrase d'aide 14 px `#6B6468`, et au plus une action (souvent « Effacer les filtres »). Pas
d'illustration.

### 6.12 Chargement

- Premier chargement d'un tableau ou d'une carte : `Skeleton` (fond `#F1ECEE`) à la forme du contenu.
- Action en cours : `CircularProgress` rose (thème : `secondary`), 16 px dans un bouton, 32 px au centre d'une zone.
- Progression connue (import, envoi) : `LinearProgress`, piste poudrée, barre rose.
- Jamais d'écran blanc : la barre latérale et le titre restent visibles.

### 6.13 Graphiques

- Couleurs dans l'ordre de 2.5, la série 1 pour la donnée principale. Cinq séries au plus.
- Grille horizontale seule, `#E9E4E6` ; axes et graduations 12 px `#6B6468` ; montants abrégés sur l'axe (« 12 k »)
  et complets dans l'info-bulle (« 12 450,000 TND »).
- Lignes 2 px, barres à bouts arrondis 4 px, 2 px d'espace entre deux segments empilés.
- Légende dès deux séries ; valeurs et libellés en couleurs de texte, jamais dans la couleur de la série.
- Un seul axe vertical. Deux mesures d'échelles différentes : deux graphiques.
- Les couleurs d'état ne servent pas de séries.

---

## 7. Accessibilité

- **Contraste AA** : 4,5:1 pour tout texte, 3:1 pour les éléments non textuels utiles (icônes, bordures de champs
  actifs, anneau de focus, séries de graphiques). Les paires du système sont testées (`npm test`).
- **Focus visible** : anneau de 2 px `#EE3388`, décalé de 2 px (3,84:1 sur blanc, 3,63:1 sur crème, 3,35:1 sur
  poudré). Le thème le pose sur tous les éléments interactifs MUI (`.Mui-focusVisible`) ; en CSS :
  `:focus-visible { outline: 2px solid var(--fd-pink); outline-offset: 2px; }`. Ne jamais retirer un `outline` sans
  le remplacer.
- **Tailles de cible** : 32 px au moins (boutons `small`, puces), 40 px par défaut ; bouton d'icône 36 px au moins
  avec un `title` ou un `aria-label`.
- **Pas d'information par la couleur seule** : un statut a un libellé, une variation a un signe et un mot, une
  série de graphique a une légende, un champ en erreur a un message.
- Tableaux : vrais éléments `table`/`th` (ou `DataGrid`), en-têtes explicites. Formulaires : chaque champ a un
  libellé associé.
- Mouvement : transitions de 120 à 300 ms (`duration`), aucune animation décorative ; respecter
  `prefers-reduced-motion`.

---

## 8. Rédaction

- **Français**, vouvoiement, phrases courtes. Boutons à l'infinitif et précis (« Créer la facture », pas
  « Valider » quand on peut dire plus).
- **Pas de tiret cadratin.** Utiliser `·`, `:`, une virgule ou un point.
- **Montants en TND**, trois décimales (millimes), virgule décimale, espace insécable pour les milliers et avant
  l'unité : `1 250,000 TND`. Pas de « DT » dans l'interface (sauf sur un document légal qui l'exige).
- **Dates au format français** : `16/10/2026` dans un tableau, `16 oct. 2026` ou `16 octobre 2026` dans un texte,
  `16/10/2026 à 14:05` avec l'heure. Fuseau Africa/Tunis. Utiliser `Intl.DateTimeFormat('fr-FR')` ou `date-fns`
  avec la locale `fr`.
- Pourcentages : `12 %` (espace insécable avant `%`). Numéros : `F-2026-0142`, `#1042`.
- Messages d'erreur : ce qui s'est passé et quoi faire (« Impossible d'enregistrer la facture. Vérifiez la connexion
  puis réessayez. »), jamais un code brut seul.
- Majuscule au premier mot seulement (« Factures d'achat », pas « Factures D'Achat »). Les libellés en majuscules
  sont obtenus par le style, le texte source reste en casse normale.

---

## 9. Utilisation

### 9.1 Installation

Le paquet est distribué par GitHub (dépôt public `Freya-tn/freya-design`), en dépendance git **versionnée par tag** :

```json
"dependencies": {
  "@freya/design": "github:Freya-tn/freya-design#v1.0.0"
}
```

Puis `npm install`. Aucun build : le paquet est du JavaScript ESM et des fichiers CSS. Il apporte les polices
(`@fontsource/plus-jakarta-sans`, `@fontsource/cormorant-garamond`, licence OFL). Pour travailler sur le paquet en
local : `"@freya/design": "file:../freya-design"`, à remplacer par la dépendance git avant de livrer.

Exports : `@freya/design` (jetons), `@freya/design/mui` (thème MUI), `@freya/design/tokens.css` (variables CSS),
`@freya/design/fonts.css` (polices).

### 9.2 Avec MUI (6 à 9)

```ts
// src/theme.ts
import { createTheme } from '@mui/material/styles'
import { frFR as coreFrFR } from '@mui/material/locale'
import { frFR as dataGridFrFR } from '@mui/x-data-grid/locales'
import { createFreyaTheme } from '@freya/design/mui'
import '@freya/design/fonts.css'

export default createFreyaTheme(createTheme, coreFrFR, dataGridFrFR)
```

```tsx
// main.tsx
<ThemeProvider theme={theme}>
  <CssBaseline />
  ...
</ThemeProvider>
```

`createFreyaTheme(createTheme, ...surcharges)` reçoit le `createTheme` du front : le paquet ne dépend pas de la
version de MUI installée. Les surcharges (locales, réglages propres au front) sont fusionnées par-dessus. Dans les
composants, utiliser les clés du thème (`color="text.secondary"`, `bgcolor="background.default"`,
`borderColor="divider"`) ou les jetons (`import { tokens } from '@freya/design'`) pour ce que le thème n'expose pas
(`tokens.status.warning.bg`, `tokens.chart.series[0]`).

### 9.3 En CSS simple

```css
@import "@freya/design/fonts.css";
@import "@freya/design/tokens.css";

body { margin: 0; background: var(--fd-cream); color: var(--fd-ink);
  font: var(--fd-type-body-weight) var(--fd-type-body-size)/var(--fd-type-body-line-height) var(--fd-font-sans); }

.btn { border: 0; border-radius: var(--fd-radius-pill); padding: 0 18px; min-height: 40px;
  font: 600 14px/20px var(--fd-font-sans); cursor: pointer; }
.btn--primary { background: var(--fd-pink-text); color: var(--fd-white); box-shadow: var(--fd-shadow-halo); }
.btn--primary:hover { background: var(--fd-pink-deep); }
.btn--ink { background: var(--fd-ink); color: var(--fd-white); }
.btn--outline { background: var(--fd-white); color: var(--fd-ink); border: 1px solid var(--fd-line-strong); }
:focus-visible { outline: 2px solid var(--fd-pink); outline-offset: 2px; }

.card { background: var(--fd-white); border: 1px solid var(--fd-line); border-radius: var(--fd-radius-lg); padding: var(--fd-space-6); }
.label { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--fd-pink-text); }
.badge { display: inline-flex; align-items: center; height: 24px; padding: 0 10px; border-radius: var(--fd-radius-pill);
  font-size: 12px; font-weight: 600; border: 1px solid; }
.badge--success { color: var(--fd-status-success-text); background: var(--fd-status-success-bg); border-color: var(--fd-status-success-border); }
.num { text-align: right; font-variant-numeric: tabular-nums; }
```

`specimen.html` (à la racine du dépôt) montre ces classes en situation.

### 9.4 Interdits

- **Couleurs en dur** (`#1B4332`, `"green"`, `rgba(...)` maison) dans les composants : passer par le thème ou les
  jetons. Seule exception : les gabarits de documents imprimés (factures PDF), qui suivent leur propre mise en page.
- **Polices locales ou autres polices** (Inter, Roboto, system-ui en premier choix) : charger `fonts.css`.
- **Ombres maison** : seules les deux ombres de 5.2.
- Plusieurs boutons roses sur un même écran ; du texte en `#EE3388` ou `#CFC8CB` ; un dégradé derrière des données.
- Recopier les valeurs du thème dans un front (« copie exacte ») : on installe le paquet et on suit sa version.

---

## 10. Faire évoluer le système

1. Modifier **`tokens.js`** (et `tokens.d.ts` si la forme change). Ne jamais modifier `tokens.css` à la main.
2. Régénérer le CSS : `npm run build:css`.
3. Mettre à jour `mui.js` si un composant doit en profiter, puis **ce document** (valeurs, tableaux, exemples).
4. `npm test` : CSS à jour, contrastes AA, thème valide avec MUI 6 et MUI 9. Ajouter la nouvelle paire texte/fond
   au test de contraste si vous en créez une.
5. Ouvrir `specimen.html` et vérifier le rendu.
6. Nouvelle version **semver** dans `package.json` et une entrée dans `CHANGELOG.md` :
   - correctif (valeur ajustée sans changement visible notable) : `1.0.1` ;
   - ajout compatible (nouveau jeton, nouveau composant stylé) : `1.1.0` ;
   - changement qui modifie l'apparence ou renomme/retire un jeton : `2.0.0`.
7. Commit, tag annoté et push : `git tag -a v1.1.0 -m "v1.1.0"` puis `git push origin main --tags`.
8. Dans chaque front : passer la dépendance au nouveau tag (`#v1.1.0`), `npm install`, vérifier l'écran, livrer.
   Les fronts ne suivent pas `main` : chacun monte de version quand il est prêt.
