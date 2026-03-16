# SiteForge QA Report

**Date:** 2026-03-16
**Branch:** `claude/siteforge-homepage-ryOsQ`

---

## Build Summary

**Final Build Status:** PASS (0 errors, warnings only)

```
Route (app)                                     Size     First Load JS
┌ ○ /                                           7.22 kB         267 kB
├ ƒ /b/[slug]                                   32.5 kB         277 kB
├ ○ /dashboard                                  8.87 kB         264 kB
├ ƒ /edit/[businessId]                          10.5 kB         271 kB
└ ○ /pricing                                    7.53 kB         252 kB
... (34 total routes)
```

TypeScript: **0 errors**
ESLint: **0 errors** (warnings only — `<img>` tags in templates, custom font in layout)

---

## Bugs Found & Fixed

### ESLint Errors (Blocking Build — Fixed)

| File | Line | Issue | Fix |
|------|------|-------|-----|
| `app/b/[slug]/page.tsx` | 83, 85 | Unescaped `'` in JSX | Replaced with `&apos;` |
| `app/templates/barbershop/BarbershopContact.tsx` | 122 | Unescaped `'` | Replaced with `&apos;` |
| `app/templates/cafe/CafeMenu.tsx` | 45 | Unescaped `'` | Replaced with `&apos;` |
| `app/templates/nail_salon/NailSalonContact.tsx` | 98 | Unescaped `'` | Replaced with `&apos;` |
| `app/templates/photography/PhotographyContact.tsx` | 26 | Unescaped `"` | Replaced with `&ldquo;` / `&rdquo;` |
| `app/templates/restaurant/RestaurantContact.tsx` | 98 | Unescaped `'` | Replaced with `&apos;` |

### ESLint Warnings (Non-blocking — Not Fixed)

| File | Issue | Notes |
|------|-------|-------|
| `app/layout.tsx` | Custom font via `<link>` tag | Font URL already has `display=swap`; converting to `next/font` would require refactoring all templates |
| Multiple template files | `<img>` tags instead of `next/image` | These are in gallery sections with dynamic Cloudinary URLs and inline styles; replacing with `next/image` would require significant refactoring |

---

## Edge Cases Implemented

### Edge Case 1 — Slug Collision Check
- **File:** `components/editor/Step5_Publish.tsx`
- **Change:** Slug availability check now shows Hebrew error message `הכתובת הזו כבר תפוסה, נסה כתובת אחרת` when slug is taken
- **Also fixed:** `lib/firestore.ts` — `checkSlugAvailable()` now accepts optional `excludeId` parameter so re-publishing an existing business doesn't incorrectly flag its own slug as taken

### Edge Case 5 — No Services Warning
- **File:** `components/editor/Step3_Services.tsx`
- **Change:** Empty services state now shows a yellow warning box with Hebrew message `הוסף לפחות שירות אחד כדי שהסקשן יוצג` instead of a faint note

### Edge Case 6 — Slug Sanitization
- **File:** `components/editor/Step5_Publish.tsx`
- **Change:** `generateSlug()` now:
  - Strips Hebrew characters (`\u0590-\u05FF` range)
  - Falls back to `category-timestamp` if the result would be empty
  - Accepts `category` as a second parameter for better fallback slugs
  - Already handles: spaces→dashes, special chars, multiple dashes, leading/trailing dashes, lowercase

### Edge Case 7 — Auth Redirect
- **Status:** Already implemented in `middleware.ts` and `app/login/page.tsx`
  - Middleware saves `?redirect=/dashboard` (or intended path)
  - Login page reads `redirect` param and redirects after successful login
  - Dashboard page redirects to `/login?redirect=/dashboard` if not authenticated

### Edge Case 8 — Firebase Offline Error Handling
- **File:** `app/b/[slug]/page.tsx`
  - `loadBusiness()` return type extended to `BusinessData | null | 'offline'`
  - If Firestore fails and no mock fallback exists, returns `'offline'`
  - Page renders Hebrew error: `האתר זמנית לא זמין, נסה שוב בעוד כמה דקות`
- **File:** `app/dashboard/page.tsx`
  - Added `fetchError` state
  - Extracted `loadBusinesses` to a `useCallback` for retry functionality
  - Shows red error banner with Retry button when fetch fails

### Edge Case 9 — Cloudinary Upload Error
- **File:** `components/ui/ImageUploadBox.tsx`
- **Change:** Error message updated to Hebrew: `ההעלאה נכשלה, נסה שוב`
- Existing behavior preserved: box stays open, user can retry

### Edge Case 2 — Empty Gallery
- **Status:** Already handled in all gallery components
  - `BarbershopGallery.tsx`, `RestaurantGallery.tsx`, `GymGallery.tsx`, `CafeGallery.tsx`, `NailSalonGallery.tsx`, `PhotographyPortfolio.tsx` all check `photos.length === 0` and return `null`
  - Inline templates (`BarbershopModernTemplate`, `BarbershopBoldTemplate`, etc.) use `filter(Boolean).length > 0` guards

### Edge Case 3 — Missing Cover Photo
- **Files:** `BarbershopHero.tsx`, `RestaurantHero.tsx`, `GymHero.tsx`, `CafeHero.tsx`, `PhotographyHero.tsx`
- **Change:** When `coverPhotoUrl` is empty, a CSS gradient placeholder is shown instead of a broken background, using colors matching each template's theme

### Edge Case 10 — Mobile Editor Preview
- **Status:** Already implemented in `app/edit/[businessId]/page.tsx`
  - Preview panel: `hidden lg:block` (hidden on mobile)
  - Floating preview button: `lg:hidden fixed bottom-6 end-5`
  - Full-screen modal with close button using AnimatePresence

---

## Performance Fixes

1. **Font `display: swap`** — Already present in Google Fonts URL (`&display=swap`)
2. **Store reset after publish** — `reset()` called in `Step5_Publish.tsx` after successful publish to free memory
3. **ScrollToTop component** — Created `components/ui/ScrollToTop.tsx`, added to `app/layout.tsx`

---

## UI Consistency Fixes

1. **Focus visible styles** — Added to `app/globals.css`:
   ```css
   *:focus-visible { outline: 2px solid #8b5cf6; outline-offset: 2px; }
   ```
2. **Overflow-x hidden** — Added `html { overflow-x: hidden; }` to `app/globals.css` (body already had `overflow-x: hidden`)
3. **ScrollToTop** — Scrolls to top on every route change

---

## Mobile Layout Fixes

1. **Editor preview panel:** `hidden lg:block` already in place
2. **Sticky bottom step navigation bar:** Added `sticky bottom-0 z-10 bg-gray-900 border-t border-gray-800` bar visible only on mobile (`md:hidden`) in `app/edit/[businessId]/page.tsx`

---

## SEO Fixes

Added `layout.tsx` files with `Metadata` exports for all client-component pages:

| Page | Title |
|------|-------|
| `/about` | About SiteForge — Our Mission |
| `/contact` | Contact SiteForge — Get in Touch |
| `/pricing` | Pricing — SiteForge Plans |
| `/blog` | Blog — SiteForge Business Tips |
| `/how-it-works` | How It Works — SiteForge |
| `/help` | Help Center — SiteForge |
| `/examples` | Examples — SiteForge Business Websites |

`/b/[slug]/page.tsx` — `generateMetadata` was already implemented and correctly generates dynamic title/description/OG tags from business data.

---

## Known Remaining Issues

1. **`<img>` vs `next/image`** — Several gallery sections in templates use raw `<img>` tags (gallery items, user avatars). Migrating to `next/image` would require adding width/height or using `fill` + `sizes`, which could break the current CSS column masonry layouts. Low risk for now.

2. **Custom font via `<link>`** — ESLint warns about custom fonts not being in `pages/_document.js`. Since this is an App Router project, the fonts are correctly in `app/layout.tsx`. The warning is a false positive.

3. **Hebrew i18n in Step5_Publish** — The publish step mixes English and Hebrew strings. The rest of the app uses a translation system (`lib/translations.ts`), but Step5 has hardcoded strings. Full i18n for Step5 would require adding Hebrew keys to the translation system.

4. **Explore page** — No `/explore` route exists (the page list says `NOT FOUND`). No action needed unless the feature is planned.
