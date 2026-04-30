# The Noble Seller — Project Handover v3
*Supersedes noble-seller-handover-v2_2.md entirely. Current as of April 28, 2026.*

---

## Project Summary

Building a full-stack web application called **The Noble Seller** (thenobleseller.com) that offers:
- A free newsletter at the homepage
- A free sales personality assessment called **The Noble Quotient (NQ)**
- A paid AI-generated coaching guide called **The Noble Codex**

**Taglines:**
- Hero / marketing: "Sell more. Without selling out."
- Formal / footer: "Authentic influence. Engineered results."

**Core funnel:**
Newsletter signup (/) → NQ assessment (/quotient) → Free results (/quotient/results/[id]) → Paid Codex (/codex/[id]) ($47 standard / $37 newsletter subscriber)

**Brand voice:** The Noble Seller is the byline — no named founder, no personal brand attached. Voice modeled on Halbert, Karbo, Carlton, and Mongo (Scott Haines). Three operating modes: Mode 2 (opinion/brand POV, default), Mode 3 (observed pattern/teaching), Mode 1 (cinematic scene, used selectively). See Voice_and_Style_Guide.md for full detail.

---

## Brand Naming

| Reference | Value |
|---|---|
| Company / site | The Noble Seller |
| Domain | thenobleseller.com |
| Newsletter | The Noble Seller (newsletter) |
| Assessment | The Noble Quotient |
| Coaching guide | The Noble Codex |
| Hero tagline | Sell more. Without selling out. |
| Formal tagline | Authentic influence. Engineered results. |

---

## Tech Stack

| Service | Purpose | Status |
|---|---|---|
| Next.js 15.5.15 | Frontend + API routes | Built and running |
| Tailwind CSS 3.4 | Styling | Active with custom tns.* token set |
| Beehiiv | Newsletter platform | Active — V2 API wired, signups live |
| Supabase | Database (assessments, scores, Codexes) | Not set up — localStorage fallback active |
| Stripe | Payment processing | Not set up — dev-mode bypass active |
| Resend | Transactional email | Not set up — console fallback active |
| Vercel | Hosting | Not set up — running locally only |
| Claude API (Sonnet 4) | Codex generation | Active — requires ANTHROPIC_API_KEY |
| Git | Version control | Initialized. One commit on main: "TNS homepage v1" |

**Local dev:** Mac. Project folder at `/Users/dylan/Claude AI Code/the-noble-profile`

**To run locally — full startup sequence:**
```bash
cd "/Users/dylan/Claude AI Code/the-noble-profile"
git status                    # confirm on main, nothing uncommitted
ls -la .env.local             # confirm env file exists
npm run dev                   # start dev server
# Open second Terminal tab for Claude Code:
claude
```
Then open `http://localhost:3000`

**After any Claude Code session that adds new components or modifies layout.tsx:**
```bash
rm -rf .next node_modules/.cache && npm run dev
```
This clears stale webpack cache. Required after structural changes — skipping it causes runtime errors.

**Minimum .env.local:**
```
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
BEEHIIV_API_KEY=your_beehiiv_api_key
BEEHIIV_PUBLICATION_ID=pub_your_v2_publication_id
```

Note: Beehiiv requires the **V2** Publication ID (found in Settings → API → Publication ID section, select V2). V1 IDs cause INVALID_PATTERN 400 errors.

---

## Route Architecture — Current State

| Route | What it is | Status |
|---|---|---|
| `/` | TNS newsletter homepage | Built, live locally |
| `/quotient` | NQ email gate (entry to assessment) | Moved from `/`, visual repaint pending |
| `/quotient/assessment` | 25-question assessment | Working, visual repaint pending |
| `/quotient/results/[id]` | Results page with archetype + scores | Working, visual repaint pending |
| `/codex/[id]` | AI-generated Codex output | Working, design upgrade pending |
| `/about` | About page | Placeholder only ("More on the way.") |
| `/api/subscribe` | Beehiiv newsletter signup endpoint | Built and working |
| `/api/submit-assessment` | Saves assessment, returns results URL | Working |
| `/api/generate-codex` | Streams Codex content via Claude API | Working |
| `/api/create-checkout` | Stripe checkout session | Dev bypass active |
| `/api/webhooks/stripe` | Stripe webhook handler | Built, needs review before launch |

---

## Design System — Locked Tokens

All tokens live in `tailwind.config.ts` under `tns.*`.

### Colors
| Token | Value | Usage |
|---|---|---|
| `tns.bg` | `#FAFAF7` | Page background (warm off-white) |
| `tns.bgAlt` | `#F2F0E8` | Manifesto section background |
| `tns.fg` | `#0F0F0F` | Primary text |
| `tns.muted` | `#6B6B6B` | Secondary text, eyebrows, captions |
| `tns.border` | `#E8E6DF` | Dividers, input borders |
| `tns.accent` | `#722F37` | Oxblood — CTAs, links, brand accent |
| `tns.accentDark` | `#5A2128` | Oxblood hover state |

### Typography
| Token | Value |
|---|---|
| `--font-display` | Fraunces (variable, weights 400/600, Google Fonts via next/font) |
| `--font-sans` | Inter (variable, weights 400/500, Google Fonts via next/font) |

### Spacing Scale (tns-* tokens)
xs:4px, sm:8px, md:16px, lg:24px, xl:32px, 2xl:48px, 3xl:64px, 4xl:96px, 5xl:128px

### Max Widths
- `prose`: 760px (centered page column — all homepage sections)
- `wide`: 1080px (available but not used on homepage currently)

### Container Padding
`px-8 md:px-10` (32px mobile / 40px desktop). Chosen to absorb optical bearing overhang from Fraunces at large display sizes.

---

## Homepage — Built and Locked

**Layout:** Single centered prose column (760px max, Welsh-style). All sections share the same horizontal centerline.

**Section structure:**

1. **SiteHeader** (global, via app/layout.tsx)
   - "The Noble Seller" wordmark in Fraunces, links to /
   - Nav: "The Noble Quotient" → /quotient | "Subscribe" → /#subscribe
   - Container prose width, same column as page content

2. **Hero**
   - Headline: "Sell more.\nWithout selling out." (forced `<br />` between sentences)
   - Font: Fraunces, `clamp(48px, 6vw, 72px)`, tracking-tight, leading-[0.98]
   - Subhead: Inter, centered, max-w-[520px] mx-auto
   - EmailInput: max-w-[440px] mx-auto, id="subscribe", scroll-mt-24
   - Microcopy: "Free. Unsubscribe anytime. No spam, ever."

3. **What's inside**
   - Eyebrow: WHAT'S INSIDE
   - Headline: "Three reasons sellers read it." (h2, text-2xl md:text-3xl)
   - Three centered columns (grid-cols-1 md:grid-cols-3, gap-tns-lg)
   - Col 1: "One sharp idea per issue." / "Something you can use this week. Not someday. Not in theory."
   - Col 2: "Frameworks that actually work." / "The mental models behind real deals. Tested, not borrowed from a book."
   - Col 3: "A second opinion every Wednesday." / "The take you're not going to get from your manager."

4. **Manifesto** (full-viewport bgAlt panel, content prose-width centered)
   - Eyebrow: WHO THIS IS FOR
   - Headline: "For the operators, not the audience." (h2, text-3xl md:text-4xl)
   - Body: Two paragraphs. See app/page.tsx for locked copy.

5. **Start here** (NQ feature)
   - Eyebrow: START HERE
   - Headline: "Find out how you actually sell." (h2, text-2xl md:text-3xl)
   - Body: Two paragraphs describing NQ + Codex. See app/page.tsx for locked copy.
   - CTA button: "Take the assessment" → /quotient

6. **Final CTA**
   - Headline: "Get the newsletter." (h2, text-2xl md:text-3xl)
   - Subhead: "One issue a week. Sharp, useful, fast to read."
   - EmailInput (same component as hero, both wired to /api/subscribe)

7. **Footer**
   - Left: "The Noble Seller" wordmark + "Authentic influence. Engineered results." (italic, muted)
   - Right: The Noble Quotient · Subscribe · Privacy · Contact
   - Bottom: © 2026 The Noble Seller

**All homepage copy is locked.** Do not change any copy without explicit approval. The copy went through multiple rounds of review.

---

## Beehiiv Integration — Working

**API route:** `app/api/subscribe/route.ts`
- POST endpoint accepting `{ email }` in request body
- Calls Beehiiv V2 API: `POST /v2/publications/{publicationId}/subscriptions`
- Params: `reactivate_existing: false`, `send_welcome_email: true`
- UTM: source=thenobleseller.com, medium=organic, campaign=homepage
- Returns `{ success: true }` on 200, `{ error: string }` on failure

**EmailInput component:** `components/ui/EmailInput.tsx`
- States: idle → loading ("···" button, inputs disabled) → success ("Thanks. You're on the list.") or error ("Something went wrong. Please try again.")
- Both EmailInput instances on the homepage hit `/api/subscribe`
- Success clears the input. Error keeps it so user can retry.

**Beehiiv account:** Publication created, V2 API key generated. Welcome email should be set up in Beehiiv → Automations → Welcome Email before sending real traffic.

---

## UI Components — Built

All in `components/ui/`:

| Component | Props | Notes |
|---|---|---|
| `Button` | variant: primary/ghost/link | Primary = oxblood fill, cream text |
| `EmailInput` | onSubmit? (optional callback) | Always calls /api/subscribe. onSubmit fires after success if provided. |
| `Container` | maxWidth: prose/wide | mx-auto, px-8 md:px-10 |
| `Section` | size: md/lg/xl, as?, className? | py-* based on size |
| `SiteHeader` | none | Server component, renders in layout.tsx |

---

## Visual Design — Pages Remaining

The homepage is designed and built. All other pages still use the original teal/Inter placeholder design. Repaint needed in this priority order:

**1. /quotient (email gate) — next session**
- Remove the legacy NQ header (causes doubled-header with new SiteHeader)
- Repaint to cream/oxblood/Fraunces token system
- Review copy against voice guide
- Remove em dash from "Discover your natural selling style — and what's holding you back"

**2. /quotient/assessment**
- Repaint to new token system
- Preserve all logic untouched

**3. /quotient/results/[id]**
- Repaint to new token system
- Review results page layout — currently works but design is placeholder

**4. /codex/[id] — major design session**
This is the paid product. Requires premium treatment:
- Cover section (archetype name, date generated, "The Noble Codex" as formal title)
- Sticky section navigator (6 sections)
- Score visualization (12-dimension bar or radar chart)
- Pull quote / callout block treatment for key insights
- Print-to-PDF as a designed artifact (@print CSS)
- AI disclosure copy (honest, confident, non-apologetic)
- Body text upgrade: larger, better spaced, premium feel

**5. /about**
- Currently placeholder
- Write in brand voice, Mode 2 default
- No founder photo, no personal name
- Brand-as-narrator

---

## Copy Decisions — Locked

**Em dashes in prose:** Removed everywhere. Period or comma used as replacement. Em dashes retained only in headlines and UI labels where they are design choices, not writing tics.

**AI vocabulary ban list:** crucial, pivotal, vital, highlight, underscore, showcase, landscape, testament, tapestry, vibrant, intricate, additionally, align with, foster, garner, enhance, delve, serves as, stands as, game-changer, hack (noun), buckle up, spoiler alert, now more than ever, in today's market, imagine if, what if I told you, picture this, here's the deal, here's the truth, let's be honest, gurus.

**AI disclosure strategy:** Mention AI on the Codex product page and at point of purchase — not on the homepage. Framing: "Your scores are run through a generation pipeline that turns them into 6 sections of personalized coaching." Never name Claude specifically.

**Pricing:** $37 subscribers / $47 public. No fake anchors, no countdown timers. The subscriber price is a genuine perk, not a manufactured discount. The $10 gap is intentional — real but modest.

**Voice guide:** See `Voice_and_Style_Guide.md` v1.2 in project root. Must be read by Claude Code before any copy is written.

---

## Reference Files in Project Root

These files must be read by Claude Code before any copy or design work:

| File | Purpose |
|---|---|
| `Voice_and_Style_Guide.md` | Brand voice, three modes, banned words, sample headlines and openings |
| `Signs_of_AI_Writing.md` | Comprehensive AI-tell reference |
| `Playbook_Design_Structure.md` | Design principles, relevant to Codex layout |
| `noble-seller-handover-v3.md` | This file — current project state |

---

## Assessment Design — Unchanged from v2

See previous handover for full question list, scoring engine, archetype system, and Codex generation details. Nothing in the assessment, scoring, or generation pipeline was modified in this session.

---

## Pre-Launch Checklist — Updated

- [ ] Request Anthropic tier upgrade (console.anthropic.com) — do this now, takes time
- [ ] Set up Supabase — create account, create project, add credentials to .env.local
- [ ] Set up Stripe — create account, create two price IDs ($47 and $37), add credentials
- [ ] Set up Resend — create account, verify sending domain, add credentials — note: RESEND_FROM_EMAIL currently set to noreply@noblesalesconcepts.com — update to thenobleseller.com domain before launch
- [ ] Create GitHub account and push repo before deployment
- [ ] Deploy to Vercel — connect repo, add environment variables, get live URL
- [ ] Set up Beehiiv welcome email (Automations → Welcome Email)
- [ ] Generate Beehiiv production API key (separate from local dev key)
- [ ] Full mobile QA across all pages
- [ ] AI agent validation runs (8-10 personas, spreadsheet scoring)
- [ ] Review Stripe webhook route before going live
- [ ] Affiliate link integration — Gong, HubSpot, Apollo, Lavender in Codex tools section
- [ ] Privacy policy page (/privacy — linked in footer, page doesn't exist yet)
- [ ] Contact page or mailto (/contact — linked in footer, page doesn't exist yet)

---

## Key Decisions Log — New Entries

| Decision | Choice | Rationale |
|---|---|---|
| Site architecture | Newsletter homepage at /, NQ moved to /quotient | Newsletter is the business; NQ is the featured product |
| Newsletter platform | Beehiiv | Free to 2,500 subs, growth tools, clean V2 API |
| Accent color | Oxblood #722F37 | Distinctive, premium, matches brand name — avoids B2B blue |
| Display font | Fraunces | Noble character, modern variable serif, editorial weight |
| Body font | Inter | Clean, legible, industry standard |
| Layout style | Centered prose column, Welsh-style | Eliminates left-anchoring alignment issues, editorial feel |
| Prose column width | 760px | 680px felt too narrow after testing; 760px matches editorial references |
| Hero tagline | "Sell more. Without selling out." | Punchy, memorable, six words, brand promise compressed |
| Formal tagline | "Authentic influence. Engineered results." | Used in footer and formal contexts |
| Brand persona | Fully incognito — no named founder, no photo | Preserves optionality, avoids deception risk of pen name |
| Voice default mode | Mode 2 (opinion/brand POV) | Safest for incognito brand; most reusable |
| First person in copy | Allowed in Mode 2 as thinker not memoirist | "I" is a perspective, not autobiography |
| Composite stories | Allowed if lesson is true | Standard practice, ethically defensible |
| Fake-anchor pricing | Rejected | Contradicts "authentic" brand promise |
| Subscriber price | $37 (vs $47 public) | $10 gap is real perk, not manufactured discount |
| AI disclosure location | Codex page only, not homepage | Homepage mentions commodity; product page can explain the pipeline |
| Beehiiv API version | V2 | V1 Publication IDs cause INVALID_PATTERN errors on V2 endpoint |
| Container padding | px-8 md:px-10 | Absorbs Fraunces optical bearing overhang at display sizes |

---

## Important Context

- Dylan is on a Mac, newer to Terminal. Keep CLI instructions simple and explicit.
- Use `nano .env.local` to edit environment files.
- Always clear cache after structural changes: `rm -rf .next node_modules/.cache && npm run dev`
- Claude Code is the build environment. Claude.ai chat is for strategy, design, and direction.
- Dylan has strong product instincts and final say on all decisions. Push back constructively when you see a better path.
- The malware warning Claude Code shows on startup is a false positive on this codebase. All files are standard Next.js application code. Proceed normally.
- Git is initialized. One commit on main. No GitHub remote yet — will be set up before deployment.
- When asking Dylan to confirm env vars are present, ask for yes/no only. Never ask for values to be pasted in chat.
