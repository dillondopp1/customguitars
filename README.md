# Obsidian Guitars — Site

A full static website for **Obsidian Guitars** (dba Obsidian Instruments Co.), a custom electric guitar brand built from scratch for this project, styled after the premium feel of Aristides Instruments.

## Brand decisions made (since the business didn't exist yet)

- **Name:** Obsidian Guitars — evokes precision, dark craftsmanship, premium feel.
- **Positioning:** Small-batch, hand-built custom electric guitars for touring pros and serious collectors. Pricing from $4,200–$8,500+ to read as a legitimate premium boutique brand, not a mass-market shop.
- **Lineup (4 models):** Apex (superstrat), Vantage (single-cut), Eclipse (headless), Solace (offset) — covers the major shape categories so every type of player has an entry point.
- **Fictional details** (placeholders you should replace before launch): address (Asheville, NC), phone number, emails (`@obsidianguitars.com`), social handles.

## Site structure

```
index.html              Home
models.html              Model lineup
model-apex.html           Individual model pages with specs + Product schema
model-vantage.html
model-eclipse.html
model-solace.html
custom-shop.html          Lead-gen configurator form (feeds into Stripe checkout later)
craftsmanship.html        Brand story / build process (builds trust + premium perception)
gallery.html               Finished-build showcase
faq.html                    FAQ + FAQPage schema (great for rich snippets)
contact.html                Contact form + LocalBusiness schema
warranty.html / privacy.html / terms.html
blog/index.html + 2 posts   SEO content marketing ("Journal")
404.html, robots.txt, sitemap.xml
css/style.css, js/main.js, assets/*.svg
```

## SEO work already built in

- Unique `<title>` and meta description per page
- Canonical tags
- JSON-LD structured data: Organization, Product (each model), FAQPage, Article (blog), LocalBusiness
- `sitemap.xml` + `robots.txt`
- Semantic heading structure, descriptive alt text, fast-loading (no heavy JS/frameworks, SVG graphics instead of large images)
- A blog ("Journal") targeting long-tail, buying-intent search queries (e.g. "what makes a guitar worth thousands")

## What's still placeholder / needs real content

- **Photography.** All product imagery is line-art SVG placeholders. Before launch, replace with real guitar photography — this is the single biggest lever for the "looks like a $5k guitar" perception you want. Budget for a proper product photoshoot (dark background, studio lighting, macro shots of grain/finish/hardware).
- **Logo.** Currently text-only wordmark. Commission a real mark.
- **Og image** (`assets/og-image.jpg`) referenced in meta tags but not created — add for social share previews.
- **Real contact details** throughout (address, phone, emails).
- **Domain** — `obsidianguitars.com` is a placeholder; check availability and update canonical URLs / sitemap / schema accordingly once you pick a real domain.

## Stripe / checkout (you said you'll handle this)

The `custom-shop.html` form currently captures leads only (no payment). When you're ready:
1. Add a Stripe Checkout or Payment Links integration for deposit collection (the copy already says "50% deposit... paid securely" to set that expectation).
2. For stock/in-stock models, add "Buy Now" buttons on the model pages wired to Stripe Checkout or Payment Links.
3. The lead form currently just shows a success message client-side (`js/main.js`) — swap this for a real submit handler to your backend/CRM/email once you have one.

## Running locally

No build step — plain HTML/CSS/JS. Just open `index.html` in a browser, or serve the folder:

```
npx serve .
```
