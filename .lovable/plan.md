
## Goal
1. Remove the Bangla (BN) language option entirely.
2. Standardize on exactly two fonts across the whole site.
3. Tighten the color palette into one consistent system used everywhere.

---

## 1. Remove Bangla

- Delete `src/contexts/LanguageContext.tsx` and the `LanguageProvider` wrapper from `src/App.tsx`/`main.tsx`.
- Remove every `useLanguage`, `lang`, `t(...)` usage in:
  - `Navbar.tsx` (remove language toggle button + `font-bangla` class)
  - `Hero, About, Skills, Experience, Projects, Testimonials, Contact, Footer`
  - All `pages/*Page.tsx` and `Index.tsx`
- Replace `t("...")` calls with the existing English strings (hardcoded).
- Remove `font-bangla` from `tailwind.config.ts` and any Hind Siliguri font loads from `index.html`.

## 2. Two-font system

Use only:
- **Display / headings:** `Playfair Display` (kept — already in use for brand feel)
- **Body / UI:** `Inter` (kept — clean and pairs well)

Actions:
- `tailwind.config.ts` `fontFamily` keeps only `sans: Inter` and `display: Playfair Display`. Remove `bangla`.
- `index.html`: load only these two Google Font families (drop Hind Siliguri).
- Audit components: every heading uses `font-display`; everything else inherits `font-sans`. No third font anywhere.

## 3. Color consistency

Refine the existing cream/teal/gold palette in `src/index.css` so every component pulls from the same tokens. Final palette:

```text
Background      #FAF6F0   cream
Surface/Card    #FFFFFF / #F3EEE4
Foreground      #1A2A2E   deep ink
Muted text      #5C6B6E
Primary         #1A5653   dark teal  (CTAs, links, accents)
Primary hover   #144441
Accent          #E8A838   golden  (highlights, first-letter, badges)
Border          #E5DCC9
Destructive     #C0392B
```

Actions:
- Update HSL values in `:root` of `src/index.css` to match the palette above.
- Sweep components and remove any hardcoded color classes (`text-orange-*`, `bg-white`, `text-black`, custom hexes). Replace with semantic tokens: `bg-background`, `text-foreground`, `text-primary`, `text-accent`, `bg-card`, `border-border`, `text-muted-foreground`.
- Buttons: primary = `bg-primary text-primary-foreground`; secondary = `border border-primary text-primary`; accent highlights only for emphasis (badges, hero first letters, hover underlines).
- Sections alternate `bg-background` and `bg-card` only — no other surface colors.

## Files touched
- `src/index.css`, `tailwind.config.ts`, `index.html`
- `src/App.tsx` (remove LanguageProvider)
- `src/contexts/LanguageContext.tsx` (delete)
- `src/components/Navbar.tsx`, `Hero.tsx`, `About.tsx`, `Skills.tsx`, `Experience.tsx`, `Projects.tsx`, `Testimonials.tsx`, `Contact.tsx`, `Footer.tsx`
- `src/pages/HomePage.tsx`, `Index.tsx`, `AboutPage.tsx`, `SkillsPage.tsx`, `ExperiencePage.tsx`, `ProjectsPage.tsx`, `TestimonialsPage.tsx`, `ContactPage.tsx`

## Out of scope
- No layout/structure changes, no new sections, no animation changes.
