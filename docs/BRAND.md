# Obsidian Guitars: brand decision log

Every business and brand decision made for launch, with the reasoning. The owner delegated full authority for these calls. Anything marked **(placeholder)** must be confirmed or replaced before launch (see the README checklist). Where a later decision replaces an earlier one, the earlier text is kept and marked **Superseded**; section 0 is the current source of truth.

---

## 0. October 2026 owner decisions (13 October 2026)

### Sourcing (internal, factual)
- **Necks and bodies are bought** from specialist makers, built to Obsidian's specs: woods, profile, radius, fret size, routing.
- **In-house:** finishing (paint and lacquer), fretwork (leveling, crowning, polishing, nut work) and setup. Final assembly and wiring are treated as part of setup and are described publicly only as "assembly" (**owner to confirm**, see README).
- **Public copy rules:** never name or mention suppliers, and don't volunteer "outsourced". Say what is true: the design is ours; the components are made to our specification; each guitar is finished, fretted and set up by hand in our shop by one person, who signs the build sheet; the 37-point setup and inspection. Never claim board selection, an in-house kiln or roasting, laminated/five-piece necks, neck rests, hand carving of necks or tops, chambering or routing by the shop, or one luthier building "start to finish". "Carved maple top" and "chambered" are fine as product specs.
- **Build sheet / Provenance File** records the spec, the wood species and grades, and the final setup measurements (action, relief, pickup heights, weight), plus the instrument number and the signature of the person who finished and set up the guitar. No supplier, board ID or batch numbers.
- **Quench is redefined** as Obsidian's neck standard, not a manufacturing process: every neck, maple or mahogany, is made to our profile specs (or the customer's measurements), then the frets are leveled, crowned and polished, the nut is cut and fitted by hand, and the neck is finished and set up to the customer's measurements in our shop.
- **Founder persona:** Elias Marr keeps the repair-bench origin; he no longer builds from raw wood. The bench is why the shop concentrates on fretwork, finish and setup.

### Neck woods
- **Basalt:** standard neck is **mahogany**, glued-in set neck; roasted maple is an option at no charge.
- **Andesite, Tephra, Rhyolite, Scoria:** standard neck is **roasted maple** (made to spec); **mahogany is +$150** (placeholder, to confirm against supplier costs).
- A roasted-maple fretboard stays available with a mahogany neck: it's a separate glued-on board, and the configurator says so.

### Founders' Run pricing (Nos. 1–25 only)
| Model | List base | Founders' base |
|---|---|---|
| Andesite | $4,600 | $3,900 |
| Tephra | $4,800 | $4,100 |
| Rhyolite | $5,200 | $4,400 |
| Basalt | $5,900 | $5,000 |
| Scoria | $6,400 | $5,400 |

Upgrades are charged at list. Rationale for copy: early buyers are taking a chance on a new builder, and they also get a low number, a brass plate and free setups for life. Presented as a launch price for the first 25 instruments, never as a discount gimmick: no countdowns, no "only X left". At 6 slots a quarter the run fills in about a year; never state a date. List prices and all other upgrade prices are unchanged. Product schema keeps `price` at the list base.

### Capacity and lead time
- **6 build slots a quarter** (was 12).
- **Lead time: 16–24 weeks from deposit, plus about 4 weeks for a nitrocellulose finish** (was 12–16 weeks). The terms keep the "more than four weeks late, you may cancel" clause.
- **Deposit sentence** now reads "until your components are ordered" instead of "until your wood is cut" (the shop no longer cuts wood). See section 5.

---

## 1. Positioning

**Decision:** Obsidian is a small, accountable workshop that builds a limited number of electric guitars to order, and proves its quality with process and paperwork rather than adjectives.

**One-line POV:** *Electric guitars, finished one at a time by the person who signs for them.* (Changed 13 Oct 2026 from "built", see section 0.)

**Why:** A buyer who sees an Obsidian in the wild and looks it up has to believe it's worth several thousand dollars, from a brand with no history, no reviews and no famous players. The only honest levers a new brand has are (a) a visible, specific process, (b) a named person accountable for each instrument, (c) documented provenance, and (d) real scarcity. The positioning is built around those four. Brands in this space (for example the minimal, visuals-first approach the owner admired) win on restraint and specificity. We take the same posture without borrowing any of their language or marks.

**Customer:** working and serious amateur players, 30–60, who have owned good production guitars, have been let down by a neck or a setup, and are buying a "forever" instrument. Secondary: collectors.

## 2. Model names

| Shape | Old name | New name | Why the name fits |
|---|---|---|---|
| T-style | (added Oct 2026) | **Andesite** | The everyday, load-bearing rock that builds mountain ranges: simple, direct, honest |
| Superstrat | Apex | **Tephra** | Fine volcanic ash thrown highest: fast, light, precise |
| Offset (chambered) | Solace | **Rhyolite** | The lava obsidian forms from; same chemistry, cooled slower and full of air (chambered) |
| Single-cut | Vantage | **Basalt** | Dense rock that cools into columns: weight, sustain |
| Headless | Eclipse | **Scoria** | Rock full of air pockets, light enough to float: headless, chambered, light |

**Why:** "Eclipse" (ESP) and "Vantage" (an established brand) were conflicts. A quick check found that "Apex" is Ibanez's Munky signature line, so it went too. "Solace" was free but sat close to Solar Guitars and didn't fit a system. One coherent family (the rocks obsidian belongs to) makes the lineup feel designed, gives each name a built-in story, and is unlikely to collide. Web searches found no existing guitar models with these names; "Caldera" was rejected because JET Guitars uses it. **A formal trademark search is still the owner's job before launch.**

**Slugs:** `andesite`, `tephra`, `rhyolite`, `basalt`, `scoria`. Lineup order is by price.

**Andesite (added Oct 2026, owner decision):** a T-style was the biggest gap in the lineup: it's one of the most popular boutique shapes, and the existing piano-key guitar on the market is T-style. Its outline is drawn as our own; don't copy any manufacturer's exact body or headstock. Use industry terms (S-style, T-style, single-cut) on the site, never "Strat", "Tele" or "Les Paul", which are Fender and Gibson trademarks.

## 3. Signature differentiator: the Quench neck

> **Superseded (13 Oct 2026):** Quench is now a neck standard, not an in-house roast/laminate/rest/carve process. See section 0. The original decision is kept below for the record.

**Decision:** Every Obsidian neck goes through **Quench**, an in-house process:
1. **Roast:** maple roasted in our own kiln on a slow, staged schedule.
2. **Laminate:** five quartersawn strips glued with alternating grain.
3. **Rest:** at least 60 days in a humidity-controlled room.
4. **Carve:** hand-carved to the customer's measurements, thin satin finish.

**Why a neck:** It's the part players touch most and the part most likely to fail (seasonal movement was the founder's recurring repair problem). Each step is real, established lutherie practice, so the claim is plausible and deliverable from day one with a modest kiln and a resting room. It also creates a story ("obsidian forms when lava is *quenched*") and an artefact (a Quench batch number on every wood-source record).

**Rules for using it:**
- Always describe it as a process the shop runs, and never as a patent, trademark registration, certification or "technology".
- Claim intent, not measured results ("built to resist seasonal movement", "we expect fewer truss-rod adjustments"). Add numbers only once real data exists.
- Batches run ahead of the queue so the 60-day rest never delays a build.

**Where it appears:** home, models, every model page (spec row plus callout), craftsmanship (full section and diagram), FAQ, warranty (a Quench neck that moves beyond normal adjustment is covered), and the roasted-maple journal post.

## 4. Pricing

| Model | Base price |
|---|---|
| Andesite | $4,600 |
| Tephra | $4,800 |
| Rhyolite | $5,200 |
| Basalt | $5,900 |
| Scoria | $6,400 |

**Why:** The old $4,200–$5,100 range sat at the bottom of boutique pricing and undercut the "worth thousands" goal. The new base prices put Obsidian alongside established independent builders and big-brand custom shops, with typical finished builds at $5,500–$8,000. The order reflects real labour: slab-body bolt-on (Andesite, the entry point) < contoured bolt-on (Tephra, Rhyolite with chambering) < carved top + set neck + binding (Basalt) < headless hardware + multiscale + chambering (Scoria).

> **Superseded in part (13 Oct 2026):** list prices are unchanged, but Founders' Run base prices and the +$150 mahogany neck option were added. See section 0.

**Every base price includes:** Quench neck, stainless frets, locking tuners, bone or graphite nut, 37-point setup, hardshell case, Provenance File.

**Upgrade tiers:**

| Tier | Option | Price |
|---|---|---|
| Wood grade | Select | Included |
| | Master (figured flame or quilt top) | +$650 |
| | Reserve (single bookmatched board chosen with us on video) | +$1,500 |
| Finish | Satin or solid gloss | Included |
| | Translucent or hand-shaded burst | +$450 |
| | Nitrocellulose, any color | +$600 |
| Hardware | Nickel or black | Included |
| | Gold or aged nickel | +$250 |
| | Premium tremolo or fixed-bridge upgrade | +$350 |
| Inlays & config | Pearl shard side-offset inlays | Included |
| | Abalone or brass shard inlays | +$300 |
| | Custom inlay artwork | from +$900 |
| | 7-string / 8-string | +$350 / +$600 |
| | Multiscale (standard on Scoria) | +$450 |
| | Left-handed | No charge |

Shipping and duties are quoted at the spec stage.

## 5. Deposit terms (single source of truth)

> A 30% deposit reserves your build slot once you approve your written spec and fixed quote. It is fully refundable until your components are ordered, less the cost of any parts already ordered for your build; once construction begins it is non-refundable. The remaining 70% is due when your guitar passes final inspection, before it ships.

**Why 30% (down from 50%):** It lowers the commitment barrier for a brand with no track record, while still covering materials and a meaningful share of labour. (13 Oct 2026: the trigger changed from "your wood is cut" to "your components are ordered", because the shop no longer cuts wood.) Making refundability depend on when we commit money to your build is fair and easy to explain, and it builds trust. It works with a deposit-then-balance checkout (two payments). It appears verbatim in the custom shop, FAQ, terms and the cost guide; change it in all four together.

Also decided: a fixed written quote before any payment, a target ship month on every quote, and a cancellation right if a build slips more than four weeks.

## 6. Scarcity model

- ~~12 build slots per quarter~~ **Superseded (13 Oct 2026): 6 build slots per quarter.** See section 0. Slots open to the waitlist first.
- **Owner decisions (Oct 2026):**
  - **Every guitar is built to order.** There are no stock builds, ever.
  - **Every instrument is numbered in one sequence across all models, starting at No. 1.** Numbers are never reused.
  - **Founders' Run:** Nos. 1–25 (any model) get a brass number plate on the heel and free setups for life. It closes permanently after No. 25.
  - **Materials:** no ivory or protected-species materials, ever. This is stated once on the terms page, not in product or marketing copy.
- **No fake urgency:** no countdowns or "only 2 left" badges. Capacity is stated as a fact and will be updated honestly if a second bench opens.

**Why:** The scarcity is real (one builder), so it's credible. The Founders' Run turns "we're new" into a reason to buy now and creates collectible low numbers for early customers. A single sequence makes every number meaningful: No. 7 tells a future buyer exactly how early it was.

## 7. Founder persona (placeholder)

> **Superseded in part (13 Oct 2026):** the kiln, garage-building and roasting story is retired. Elias keeps the repair-bench origin; the site no longer says he builds from raw wood. See section 0.

**Elias Marr, founder and luthier.** He spent close to a decade running the repair bench at a busy music shop, where he kept seeing expensive guitars come in with moving necks, lifting frets and finishes hiding sloppy fretwork. He started building at night in a two-bay garage with a secondhand ceramics kiln from a closing pottery studio. Experiments with roasting and resting his own maple became Quench. The name "Obsidian" came from the kiln: lava that cools too fast to organise itself, and a reminder to do the opposite.

**Why:** A repair-bench origin gives instant authority on what fails, which is the exact anxiety of a $5,000 buyer. It ties directly to the differentiator, and it's modest and believable. A second bench is shown honestly as "opening 2027".

**Owner action:** replace the persona with the real founder's name, story and photos. Keep the structure: a specific origin, a specific problem solved, one accountable person.

## 8. Proof assets

- **Provenance File** (certificate of authenticity): serial stamped in the neck heel and logged in a build register, signed build sheet with setup measurements, a wood record (species and grade), and the signature of the person who finished and set up the guitar. (13 Oct 2026: supplier, board ID and Quench batch removed.)
- **Build journal:** private photos and notes at six stages, archived with the serial for future owners.
- **Second-owner registration:** a five-year warranty from the original ship date for registered second owners. This supports resale value, which supports the price.
- **Artist program:** artist rate plus priority slot in exchange for honest written feedback. No paid endorsements, no scripted content, and no names listed until they've played the guitar.

## 9. Visual direction

**Revised Oct 2026 ("de-AI" pass).** The original near-black, brass and Playfair look read as a generic luxury template. The site now looks like a small workshop's paperwork.

- **Palette:** warm paper (`#f3eee5`), surface (`#fbf8f2`), ink (`#1c1a17`), secondary text (`#5b554b`), rules (`#d9d0c1`) and one accent, rust (`#9a4a2b`, hover `#7a3820`) for links, primary buttons and focus. Accent passes WCAG AA on paper (5.4:1) and surface (5.9:1); white on rust is 6.2:1. Guitar renders and diagrams keep their dark studio backgrounds and sit on dark mats (`#15130f`), like photographs. The footer is dark.
- **Type:** Newsreader (headings, weights 400–600, sentence case, never all caps), IBM Plex Sans (body), IBM Plex Mono (prices, specs, measurements, dates, instrument numbers and small labels, like a build sheet). All from Google Fonts.
- **Labels:** no tracked-out uppercase eyebrows. A small Plex Mono label is used only where it carries information: a model's shape type, a post's category and reading time.
- **Headlines:** plain, specific sentences a luthier would say. No two-beat slogans, triads or "not X but Y".
- **Layout:** sections vary: photo splits, full-bleed photos, ruled lists, a mono "workshop sheet". Model cards stay cards; other grids are ruled lists. Buttons are sentence case with a 3px radius.
- **Logo:** a faceted, knapped-stone "O" monogram and an angular wordmark drawn as paths; `logo-mark-ink.svg`/`wordmark-ink.svg` on light, `logo-light.svg` on dark. The shard shape repeats as the fretboard inlay, the Rhyolite sound port and the headstock mark.
- **Imagery:** studio renders on dark mats until real photography exists. Workshop atmosphere uses placeholder Unsplash photos (`docs/CREDITS.md`), never presented as our guitars, customers, shop or founder.

## 10. Site structure decisions

- Added `about.html` (founder and builders), `artists.html` (artist program), and `thanks.html` (no-JS form fallback, noindex).
- Nav: Models · Craftsmanship · Custom Shop · Gallery · About · Journal · Contact, plus a "Reserve a Slot" CTA.
- Gallery reframed honestly as "launch specifications, rendered" rather than implying finished customer builds.
- "Stock builds" removed: everything is built to order, which matches MadeToOrder schema and the scarcity story.

## 11. Brand voice guide

**In one line:** a luthier talking across the bench. Calm, specific, a little dry, and never selling.

**Principles**
1. **Specific over superlative.** "Frets leveled and crowned by hand" beats "unparalleled stability". If a sentence works for any brand, cut it.
2. **Short declaratives.** Lead with the fact. Most sentences under 20 words.
3. **Proof, not adjectives.** Prefer numbers, materials, steps and paperwork. If we can't prove it, we don't say it.
4. **Honest about trade-offs.** Say what roasted maple, nitro or headless designs *don't* do well. Candour is the brand.
5. **One metaphor per page.** The volcanic/glass imagery is seasoning. Use it once, then get practical.
6. **Second person, sparingly.** "You" when talking about the buyer's guitar; "we" for the shop. Never "our valued customers".

**Never use:** best, ultimate, world-class, unparalleled, revolutionary, game-changing, legendary, "tone monster", patented (unless it becomes true), and fake urgency ("hurry", "only X left").

**Sounds like:**
- "The price on the quote is the price you pay."
- "We won't show a finished-guitar photo until there's a finished guitar."
- "It isn't patented and isn't magic, but we do it on every neck."

**Doesn't sound like:**
- "Experience the ultimate in tone and playability with our revolutionary neck technology!"

**Formatting:** sentence case headings, no uppercase eyebrows, prices always as "From $X,XXX" in Plex Mono, and the five model names always written "the Andesite", "the Tephra", "the Basalt" and so on.

## 12. Things we explicitly decided not to do

- No customer reviews, testimonials, artist endorsements, press logos, awards or certifications until they're real.
- No real-looking placeholder contact data. Placeholders are bracketed and visibly styled.
- No Stripe integration (the owner's call). Copy refers to "our secure checkout" for the deposit and balance.
- No framework or build tool. The site is plain HTML/CSS/JS, and the only third-party calls are Google Fonts and the form endpoint.
