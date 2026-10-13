# Obsidian Guitars: website

A static website (plain HTML/CSS/JS, no build step) for **Obsidian Guitars** (Obsidian Instruments Co.), a small workshop that hand-builds electric guitars to order.

- Brand and business decisions, with reasons: [`docs/BRAND.md`](docs/BRAND.md)
- Audit findings and how each was resolved: [`docs/AUDIT.md`](docs/AUDIT.md)

---

## Pre-launch checklist

Everything below is a placeholder or needs configuring before the site goes live. Search the code for `REPLACE` and `placeholder` to find each spot (`grep -rn "REPLACE\|class=\"placeholder\"" --include=*.html .`).

### 1. Forms (required, or you will lose leads)

There are four forms: `custom-build` (custom-shop.html), `contact` (contact.html), `artist-application` (artists.html) and `waitlist` (footer of every page). They are configured in **one place**: the `OBSIDIAN_FORMS` block at the top of [`js/main.js`](js/main.js).

- **If you host on Netlify (recommended):** nothing to set. Netlify detects the forms at deploy time from `data-netlify="true"`. After the first deploy, open *Site → Forms* in Netlify, confirm all four forms appear, and add an email notification for each (*Forms → Notifications*). Spam is filtered by the built-in honeypot (`bot-field`).
- **If you host anywhere else:** create a form at [formspree.io](https://formspree.io), then in `js/main.js` set:
  ```js
  provider: 'formspree',
  formspreeEndpoint: 'https://formspree.io/f/abcdwxyz'   // your endpoint
  ```
  One Formspree form can receive all four; each submission includes a `form-name` field telling you which form it came from.
- Default `provider: 'auto'` tries Netlify, then Formspree. The success message is shown **only** when the provider confirms receipt; otherwise visitors see an error. Test every form once after deploying.
- No-JS visitors post to `thanks.html` (works on Netlify).

### 2. Real photography (biggest lever on perceived value)

All product imagery is illustrated SVG renders (`assets/render-*.svg`, rasters in `assets/render-*.jpg`). Replace them with real photographs as soon as instruments exist: dark seamless background, one warm key light, 2:1 crops for product shots. Keep file names (or update the `src`), and keep alt text accurate to the actual build.

| Where | What to shoot | Marker |
|---|---|---|
| `model-*.html` top render | Full-front studio shot, 2:1 | `<!-- REPLACE: studio photograph ... -->` |
| `model-*.html` second figure | Alternate finish or detail | caption says "Studio render" |
| `gallery.html` | Finished Founders' Run builds | `<!-- REPLACE: swap each render ... -->` |
| `index.html` hero | Hero shot, 2:1, guitar on dark | uses `render-basalt.svg` |
| `index.html`, `about.html` portraits | Founder at the bench, 4:5. **No stock photos.** | `<!-- REPLACE: founder portrait ... -->` |
| `about.html` workshop | Bench, kiln, resting room | `<!-- REPLACE: workshop photographs -->` |
| `craftsmanship.html` | Board selection photo; workshop film | `<!-- REPLACE: workshop photograph ... -->` |
| `model-*.html` "Hear it" | One video and two audio clips per model | `<!-- REPLACE: video embed ... -->` / `audio embed` |
| `assets/og-image.png` | Social share image, 1200×630 | regenerate with a real photo |
| `assets/render-*.jpg` | Used by Product schema and model og:image | replace with photos |

### 3. People and story

- **Founder persona.** "Elias Marr" and the origin story in `about.html`, the homepage teaser, the craftsmanship page and every journal byline are a working persona. Replace them with the real founder's name, history and portrait (`<!-- REPLACE: founder story ... -->`). Also update `FOUNDER` in the Article schema author on each post (`blog/*.html`).
- **Artists.** `artists.html` has "Artist feature coming soon" slots. Only add artists who have played an Obsidian and given written permission. Never add testimonials or reviews that aren't real.

### 4. Contact details and legal

- `contact.html`: general email, press email, workshop address (bracketed placeholders).
- `about.html`: workshop location.
- `privacy.html`: privacy contact email; confirm the named form provider and any analytics.
- `terms.html`: governing law (state/country), and **have a lawyer review the terms**.
- Before adding a street address, decide whether to add `LocalBusiness` schema (it was removed because the address was invented).

### 5. Domain

`https://www.obsidianguitars.com` is a placeholder. Once you own a domain, find and replace it across `*.html`, `blog/*.html`, `sitemap.xml` and `robots.txt` (canonical tags, og:url and og:image, JSON-LD, sitemap). Then submit the sitemap in Google Search Console.

### 6. Trademark

Model names (Tephra, Rhyolite, Basalt, Scoria) and "Quench" passed a quick web search for existing guitar models, but that is not legal clearance. Run a proper trademark search (USPTO, plus EUIPO and UKIPO if you sell abroad) for "Obsidian Guitars", the four model names and "Quench" in class 15 (musical instruments) before printing headstocks.

### 7. Stripe / checkout hookup points

No payments are integrated. The copy already describes the flow: **written spec + fixed quote → 30% deposit → build → 70% balance after final inspection → ship.**

- **Deposit:** after you send a quote, email the customer a Stripe Payment Link (or Checkout Session) for 30% of the quoted price. There is no "Pay deposit" button on the site by design, because each quote is unique.
- **Balance:** a second Payment Link for the remaining 70%, sent when the guitar passes final inspection.
- If you later want a public "Reserve a slot" button, the natural places are the `#deposit` box in `custom-shop.html` and the CTA on each model page. Keep the deposit sentence identical everywhere it appears (custom shop, FAQ, terms, `blog/how-a-custom-guitar-build-works-and-what-it-costs.html`).
- Update `privacy.html` to name Stripe as the payment processor.

### 8. Business facts to confirm

These are stated on the site; change them everywhere if they're wrong: 12 build slots per quarter; Founders' Run of 25 (F01–F25, brass serial plate, free setups for life); 12–16 week build time; 60-day neck rest; 37-point setup; base prices and upgrade tiers (`custom-shop.html#pricing`); lifetime warranty for the original owner plus 5 years for registered second owners.

---

## Site structure

```
index.html                Home
models.html               Lineup
model-tephra.html         Superstrat         (from $4,800)
model-rhyolite.html       Chambered offset   (from $5,200)
model-basalt.html         Single-cut         (from $5,900)
model-scoria.html         Headless multiscale (from $6,400)
custom-shop.html          Build request form, process, pricing tiers, deposit terms (#pricing, #deposit)
craftsmanship.html        Build process, Quench neck (#quench), provenance / COA, build journal
about.html                Founder story and the builders
artists.html              Artist program and application form
gallery.html              Render gallery (to become photography)
faq.html                  FAQ (accessible accordions + FAQPage schema)
contact.html              Contact form
warranty.html  privacy.html  terms.html
thanks.html               No-JS form fallback (noindex)
404.html                  Uses root-absolute paths so it works at any depth
blog/index.html + 6 posts Journal
css/style.css  js/main.js
assets/                   renders (svg + jpg), logo, wordmark, monogram, favicons, og-image, diagrams
favicon.ico  sitemap.xml  robots.txt
docs/AUDIT.md  docs/BRAND.md
```

## SEO built in

Unique titles and descriptions, canonical tags, Open Graph and Twitter cards with og-image on every page, favicons, `Organization`/`WebSite` (home), `Product` with `MadeToOrder` offers (models), `FAQPage`, `Article` with author and dates (posts), `Blog`, `BreadcrumbList` on every inner page, a sitemap with `lastmod`, one H1 per page, and an interlinked journal aimed at buyer-intent searches.

## Running locally

No build step. Serve the folder:

```
npx serve .
```

Note: `serve` redirects `page.html` to `/page` and drops the query string on that redirect, so test the custom shop preselect with `/custom-shop?model=basalt` locally. Netlify keeps the query string. Forms will show their error state locally unless you configure Formspree, which is expected.
