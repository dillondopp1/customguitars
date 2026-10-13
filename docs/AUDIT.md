# Site audit: findings and resolution

Status key: **Resolved** = fixed in this branch. **Owner action** = fixed as far as code allows; needs a real-world input before launch (see the README checklist).

| # | Priority | Finding | Status |
|---|----------|---------|--------|
| 1 | Critical | Forms only faked success; leads were lost | Resolved + owner action |
| 2 | Critical | "Eclipse" / "Vantage" trademark and SEO conflicts | Resolved |
| 3 | Critical | Line-art SVGs looked like wireframes; no logo, favicon or og-image | Resolved + owner action |
| 4 | Critical | No people behind the brand | Resolved + owner action |
| 5 | Critical | "Est. 2026" in hero | Resolved |
| 6 | Critical | Untruthful structured data and fake contact details | Resolved + owner action |
| 7 | High | No proof of quality (COA, provenance, artists, media) | Resolved + owner action |
| 8 | High | No proprietary differentiator | Resolved |
| 9 | High | No scarcity or waitlist capture | Resolved |
| 10 | High | Inconsistent pricing and deposit terms | Resolved |
| 11 | Tech/SEO | og-image and favicon missing from heads | Resolved |
| 12 | Tech/SEO | Inconsistent header/footer; blog relative paths | Resolved |
| 13 | Tech/SEO | Custom shop ignored `?model=` | Resolved |
| 14 | Tech/SEO | Accessibility gaps | Resolved |
| 15 | Tech/SEO | Sitemap lastmod, breadcrumbs, Article schema, thin blog | Resolved |
| 16 | Positioning | Generic voice | Resolved |

---

## 1. Forms lost leads (Critical): Resolved, owner action needed

**Before:** `js/main.js` hid the form and showed "success" on submit without sending anything.

**Now:**
- All four forms (`custom-build`, `contact`, `artist-application`, and the footer `waitlist` on every page) carry `name`, `method="POST"`, `data-netlify="true"`, `netlify-honeypot="bot-field"`, a hidden `form-name` input and a hidden honeypot field. With no JavaScript, they post to `thanks.html`, which Netlify handles natively.
- With JavaScript, `js/main.js` submits through the `OBSIDIAN_FORMS` config block at the top of the file. That is the one place to configure delivery: `provider` is `'auto'`, `'netlify'` or `'formspree'`, and `formspreeEndpoint` holds a clearly marked placeholder (`YOUR_FORM_ID`).
- The success state is shown **only after a confirmed 2xx from the real provider**. Netlify responses are verified by their `x-nf-request-id`/`server: Netlify` headers. This matters because some static servers (including `npx serve`) answer any POST with 200, which would otherwise have silently dropped the lead. Any failure shows an error state (`role="alert"`) and leaves the form filled in.
- Tested with Playwright: non-Netlify server leads to the error state; mocked Netlify leads to success, with a payload containing `form-name` and fields; Netlify 404 falls back to a configured Formspree endpoint and succeeds.

**Owner:** deploy on Netlify (zero config) or paste a Formspree endpoint. See README.

## 2. Model names (Critical): Resolved

ESP sells an "Eclipse", "Vantage" is an established guitar brand, and a quick check showed **"Apex" is Ibanez's Munky signature line (APEX20/APEX30)**, so it was replaced too. "Solace" had no hits but was close to Solar Guitars and didn't fit the new naming system, so it was replaced as well.

New names come from the volcanic rocks related to obsidian: **Tephra** (superstrat), **Rhyolite** (chambered offset), **Basalt** (single-cut), **Scoria** (headless). Web searches for each as a guitar model returned no existing models. "Caldera" was considered for the headless and rejected because JET Guitars has a Caldera. Files were renamed (`model-tephra.html` and so on), and every link, schema block, sitemap entry, gallery caption, custom-shop option and blog link was updated. The site was never launched, so the old URLs need no redirects. *A formal trademark search is still recommended before launch (README).*

## 3. Imagery (Critical): Resolved, owner action needed

- `assets/render-<model>.svg` (plus a second finish per model) are illustrated product renders. Each has a filled body with burst gradients, a turbulence-generated flame or quilt figure, edge shading and gloss highlight, a drop shadow on a studio background, a fretboard with frets and pearl "shard" inlays, nut, headstock and tuners, pickups with pole pieces, bridge, strings and knobs. JPEG rasters (`render-<model>.jpg`) feed Product schema and per-model og images.
- Brand: `logo-mark.svg` (faceted, knapped-stone "O" monogram), `wordmark.svg` and `logo.svg` (an angular wordmark drawn as paths, so it doesn't depend on fonts), `logo.png` for schema.
- Favicons: `favicon.ico` (16/32/48), `assets/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`.
- `assets/og-image.png`, 1200×630, rendered with the preinstalled Chromium.
- Supporting illustrations: `quench-neck.svg` (neck cross-section) and `provenance.svg` (build sheet).
- Photo replacement points are marked in HTML with `<!-- REPLACE: ... -->` and listed in the README.

## 4. People (Critical): Resolved, owner action needed

New `about.html` with the founder story (persona **Elias Marr**, a former repair-bench tech who started Obsidian in a garage with a secondhand pottery kiln) and a "Builders" grid. A teaser appears on the homepage and craftsmanship page, and bylines on journal posts. All portraits are monogram placeholders (`EM`), never stock faces, and every one is marked `<!-- REPLACE -->`. Bench two is presented honestly as "opening 2027".

## 5. "Est. 2026" (Critical): Resolved

The hero now reads "Hand-built electric guitars · 12 build slots a quarter" / **"Built slow, on purpose."**

## 6. Structured data and contact data (Critical): Resolved, owner action needed

- Product `availability` is now `https://schema.org/MadeToOrder` (a valid Google value), with `minPrice` in a `PriceSpecification`.
- `LocalBusiness` with the fabricated "412 Foundry Row" address and 555 phone number was **removed**. The contact page uses `ContactPage`, and the homepage uses `Organization` without fake `sameAs` social handles.
- Visible contact details are now explicit placeholders (`[General inquiries email: add before launch]`, `[Workshop address: add before launch]`), styled so they can't be mistaken for real details. Forms are the primary contact path.
- All 39 JSON-LD blocks parse as JSON (validated by script).

## 7. Proof of quality (High): Resolved, owner action needed

- **Provenance File / certificate of authenticity:** serial number stamped in the neck heel, signed build sheet with setup measurements, wood-source record (supplier, board ID, Quench batch), luthier signature. Featured on home, every model page and craftsmanship.
- **Build journal:** a private photo journal at six stages, archived with the serial for future owners.
- **Artist program:** `artists.html` explains the program (artist rate plus priority slot in exchange for honest feedback, no paid endorsements) and has an application form. Roster slots read "Artist feature coming soon", with a REPLACE note never to list anyone who hasn't played an Obsidian.
- **Media slots:** each model page has a video slot and two sound-clip slots, and craftsmanship and about have workshop photo and film slots. All are labelled "coming soon" and marked `<!-- REPLACE -->`.
- No testimonials, reviews, press, awards or certifications were invented.

## 8. Differentiator (High): Resolved

**Quench**, the shop's neck process: kiln-roasted in-house, five quartersawn strips with alternating grain, rested 60+ days, then hand-carved. It appears on home, models, every model page (callout plus spec row), craftsmanship (full section and diagram), FAQ, warranty and the roasted-maple journal post. It is always described as a workshop process, explicitly "not a patent or certification". Claims are framed as intent ("built to resist seasonal movement"), not measured results.

## 9. Scarcity and capture (High): Resolved

- **12 build slots per quarter**, stated consistently, with slots opening to the waitlist first. No fake "only 2 left" counters.
- **Founders' Run:** Nos. 1–25 in the single build sequence (every instrument is numbered from No. 1), with a brass number plate and lifetime free setups. The run closes permanently after No. 25.
- **Waitlist capture:** a footer form on every page (Netlify form `waitlist`), plus an opt-in checkbox on the build request. Wired exactly like the other forms.

## 10. Pricing (High): Resolved

Base prices are Tephra $4,800, Rhyolite $5,200, Basalt $5,900 and Scoria $6,400, identical on home, models, model pages, schema, the custom shop, the FAQ and the journal. Upgrade tiers (wood grade, finish, hardware, inlays and configuration) are listed once in the custom shop (`#pricing`). Deposit terms are a single sentence, generated from one constant, and appear **verbatim** in the custom shop, FAQ (visible text and FAQPage schema), terms of sale and the cost guide. Verified by script.

## 11. og-image and favicon in every head: Resolved

Every page's `<head>` has the ICO and SVG favicons, the apple-touch-icon, and `og:image`/`twitter:image` (absolute URL; model pages use their own render), plus `og:site_name` and `theme-color`.

## 12. Consistent header/footer: Resolved

All 25 pages, including legal, thanks, 404 and blog posts, share the same header (seven links plus a "Reserve a Slot" CTA) and footer (waitlist, instruments, workshop, legal). Blog pages use `../` paths. Same-directory blog links are written as `../blog/<slug>.html` so they still work on hosts that serve `/blog/index.html` as `/blog` (the local `serve` does exactly this). `404.html` uses root-absolute paths so it renders correctly at any depth.

## 13. `?model=` preselect: Resolved

`js/main.js` reads `?model=` and selects it if it matches a slug (unknown values are ignored). Verified for all four slugs. Note: `npx serve` redirects `*.html` to clean URLs and drops the query string on that redirect, so test locally with `/custom-shop?model=basalt`. Netlify keeps the query string.

## 14. Accessibility: Resolved

Skip link (first tab stop, verified), `<main id="main">`, FAQ questions are `<button>`s with `aria-expanded`/`aria-controls` and `hidden` panels, the menu toggle has `aria-expanded`/`aria-controls`/a dynamic label and closes on Escape, the off-canvas menu is `visibility:hidden` when closed (not tabbable), consistent CSS plus/minus and hamburger/close icons, visible `:focus-visible` outlines, `aria-current="page"` in the nav, labelled form fields, a reduced-motion media query, and breadcrumbs as `<nav aria-label="Breadcrumb">`.

## 15. SEO: Resolved

- `sitemap.xml`: every indexable page with `<lastmod>`; thanks and 404 excluded (and `noindex`).
- `BreadcrumbList` JSON-LD on every inner page, matching the visible breadcrumb.
- `Article` schema with `Person` author, `datePublished`/`dateModified`, publisher and image on every post. `Blog` schema on the index.
- Four new long-form buyer-intent posts: custom build process and cost, headless vs traditional, roasted maple necks, nitro vs poly. The two existing posts were refreshed (tonewood claims tempered to be honest). Posts interlink with each other and with model pages, and model pages link back to relevant posts.
- Exactly one `<h1>` per page (verified by script). Footer headings are `h2`.

## 16. Positioning and voice: Resolved

The homepage and key copy were rewritten around one point of view: *built slow, on purpose; proof over adjectives*. The voice guide is in `docs/BRAND.md`.

---

## Verification performed

- Local server (`npx serve`) plus a custom crawler: every internal `href`/`src`/CSS `url()` from every HTML, CSS and XML file returns 200 after redirects (49 URLs, 0 failures).
- Playwright screenshots of home, the Tephra page and the custom shop at 1440px and 390px. Fixed a cropped hero render, nav links inheriting content underlines, a visible mask edge on the hero, and spec tables cramped on phones. No horizontal overflow on any checked page.
- `?model=` preselect, form success, error and fallback states, menu, FAQ and skip link tested in Chromium.
- All JSON-LD blocks parse; sitemap is well-formed XML.
