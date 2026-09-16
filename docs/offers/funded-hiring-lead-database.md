# Offer: "Funded & Hiring" Lead Database for IT Recruitment Agencies

Transforms the "here are three funded software companies and their hiring managers" cold email from a *service* pitch (we'll send 1,000 messages for you) into a *product* pitch: the list itself is what's for sale.

---

## 1. Positioning

**Who:** IT / tech recruitment agencies and staffing firms that place software engineers (contingency and contract). Owner, Managing Director, Head of Business Development, senior 360 recruiters.

**What they buy:** A weekly feed of software companies that **just raised a funding round AND are actively hiring engineers**, with the **hiring manager's verified contact** attached (name, title, LinkedIn, email, direct dial), plus the round details and the open roles.

**Why it works:** Funded + hiring = budget + urgency + no incumbent agency yet. The recruiter's job is to be first in the door. Everyone else sells "a list of tech companies"; this sells *timing*.

**One-line offer:**
> Every Monday, every US software company that raised in the last 30 days and is hiring engineers — with the hiring manager's verified email and direct dial. You reach them before the other 40 agencies do.

**Name options:** Funded & Hiring · First-In Feed · The Raise Report · Fresh Money List

---

## 2. What's in each record (the spec — this is the product)

| Field | Source |
|---|---|
| Company, website, HQ, headcount, LinkedIn | GetLeads / Apollo |
| **Round**: type (Seed/A/B/C), amount, date, lead investor | GetLeads `list_funding_signals` / Crunchbase-style feeds |
| **Open engineering roles**: count, titles, links to postings, posted date | Job-signal pipeline (Blitz/MTN — same engine as the Orion/Quotient/Pharma "Jobs Daily" pipelines) |
| **Hiring manager**: name, title (CTO / VP Eng / Head of Engineering / Head of Talent / Technical Recruiter), LinkedIn URL | GetLeads `lookup_decision_makers` |
| **Verified email** (catch-all flagged), **direct dial / mobile** | GetLeads enrichment + Millionverifier |
| Tech stack (from job posts) | job-post parse |
| Signal date + "days since raise" | computed |

Quality bar to state publicly: ≥95% email deliverability guarantee — replace any bounce free. Every company verified to have ≥1 engineering role posted in the last 14 days.

---

## 3. Packaging & pricing (recommendations — confirm before selling)

| Tier | What | Price |
|---|---|---|
| **Sample (free)** | The 3 leads in the email | $0 — this is the hook |
| **Starter list (one-time)** | Last 30 days of raises, US, ~150–250 companies, 1 hiring manager each, verified email + dial | **$497** |
| **Weekly feed (subscription)** | Every new raise-and-hiring company each Monday (~30–60/week), 1–2 contacts each, Google Sheet / Airtable / CSV, or pushed into their Smartlead/Instantly/CRM | **$397/mo** (or $997/quarter) |
| **Feed + niche filter** | Same, filtered to their specialty (e.g., AI/ML, fintech, DevOps, only Series A–B, only 20–200 headcount, only NYC/remote) | **$597/mo** |
| **Feed + sending (upsell)** | The feed *plus* Readymation sends 1,000 personalized emails/mo from it and hands back interested replies — the original service offer, now positioned as the upgrade | $1,500–2,500/mo or per-show |

Guarantees: bounce replacement; cancel anytime; first week free on the subscription if they buy the starter list.

---

## 4. The cold email sequence

Rules that make this work:
- **The three leads must be real, fresh (raised ≤14 days ago), and relevant to that agency's niche.** A recruiter will Google them. Fake or stale = instant delete.
- **Plain text. No hyperlinks.** Write `linkedin.com/in/jane-doe` without `https://` — three live links in a cold email tank deliverability.
- **Phone: include the direct dial for one of the three and "dials on the full list" for the rest.** Full contact data for all three gives away too much and looks like a data dump; one dial proves you have it.
- Personalize line 1 to the agency's niche (from their site: "you place backend engineers in fintech").
- Send from the Readymation recruiting-pool domains, 30–40/day per mailbox.

### Email 1 — the lead drop

**Subject options** (A/B):
- `3 funded companies hiring engineers this week`
- `{{company_1}} just raised — hiring 4 engineers`
- `hiring managers at 3 fresh raises (contacts inside)`

```
Hi {{first_name}},

Saw {{agency}} places {{niche, e.g. backend and platform engineers}}. Here are three software companies that raised in the last two weeks and already have engineering roles open — with the person who owns the hiring:

1) {{Company 1}} — {{Series A, $12M, raised {{date}}}} — {{4}} open eng roles
   {{Name}}, {{VP Engineering}}
   linkedin.com/in/{{handle}} · {{email}} · {{+1 415 555 0142}}

2) {{Company 2}} — {{Seed, $4.5M, raised {{date}}}} — {{2}} open eng roles
   {{Name}}, {{CTO}}
   linkedin.com/in/{{handle}} · {{email}}

3) {{Company 3}} — {{Series B, $30M, raised {{date}}}} — {{7}} open eng roles
   {{Name}}, {{Head of Talent}}
   linkedin.com/in/{{handle}} · {{email}}

There were {{47}} companies like this in the US last week. I put every one of them — round, open roles, hiring manager, verified email and direct dial — into a sheet every Monday for recruiting firms that want to be first in.

Want the full list from last week? Reply "list" and I'll send it over.

Heinz
Readymation
```

### Email 2 — 3 days later (same thread)

```
{{first_name}} — one more from this morning:

{{Company 4}} — {{Series A, $9M}}, {{3}} open roles ({{Senior Backend, Platform, SRE}})
{{Name}}, {{Head of Engineering}} · linkedin.com/in/{{handle}} · {{email}}

Last week's full sheet has {{47}} of these. Happy to send it — just reply "list".
```

### Email 3 — 4 days later (breakup, value framing)

```
Quick math, {{first_name}}:

One placement from a funded company ≈ ${{25,000}} fee. The weekly feed is ${{397}}/mo. If it lands you one job order a quarter it's paid for 20x.

If the timing's off, no worries — should I close this out?
```

### Optional Email 0 — LinkedIn touch the same day as Email 1
Connection request, no note. If accepted: "Sent you three funded companies hiring engineers by email — check your inbox."

---

## 5. Reply handling

**"list" / "yes" / "send it"** → send the Google Sheet of last week's full feed (view-only, watermarked, hiring-manager emails masked to `j***@company.com` except the 3 from the email + 5 more fully open). Then:
> Here's last week — {{47}} companies. Full emails + dials are open on 8 of them so you can test. If you want the whole thing unlocked, plus every new raise going forward each Monday, it's $397/mo, cancel anytime. Want me to send the link?

**"How much?"** → price straight, then anchor: "One placement fee pays for 5 years of it."

**"We already use Apollo / ZoomInfo"** → "Apollo tells you who exists. This tells you who raised money *last week* and posted engineering roles *this week*, with the person to call. It's a timing feed, not a database — most clients run it alongside Apollo."

**"Can you just send the emails for us?"** → the upsell: "Yes — that's the done-for-you tier. We send ~1,000 personalized emails/month from the feed and hand you the interested replies. $X/mo or pay-per-show."

**"Is this data compliant?"** → US B2B business contact data, CAN-SPAM compliant; every record sourced from public filings/press + verified. Opt-outs honored on request.

---

## 6. Production (how to build the feed with the existing stack)

1. **Funding signals** — GetLeads `list_funding_signals` (US, software, last 7 days) → company list.
2. **Hiring filter** — run companies through the job-signal pipeline (Blitz/MTN, same as the Orion "Jobs Daily" engine) for engineering titles posted ≤14 days; drop companies with 0 roles.
3. **Decision makers** — GetLeads `lookup_decision_makers` with titles: CTO, VP Engineering, Head of Engineering, Engineering Manager, Head of Talent, Technical Recruiter. Prefer the eng leader for companies <100 people, Head of Talent above that.
4. **Enrich + verify** — GetLeads enrich person batch → email + direct dial → Millionverifier; flag catch-all.
5. **Publish** — Google Sheet (one tab per week) + CSV; optional Airtable. Watermark the sample; unmask on payment.
6. **Sell** — Stripe payment link per tier; on payment, share the unmasked sheet and add them to a "subscribers" tab so Monday delivery is one script.

Rough cost per record (GetLeads credits + verification): pennies; the margin is in the timing, not the data.

---

## 7. Where this plugs into the Upwork profile

- Project Catalog entry: **"You will get a weekly list of funded software companies hiring engineers, with hiring-manager contacts"** — entry tier at $497 one-time / $397 monthly.
- Portfolio item: screenshot of one week's sheet (client names visible — they're public raises) + a sample email.
- Overview "WILL" bullet: ✅ Funded & Hiring Lead Database — every US software company that raised in the last 30 days and is hiring engineers, with the hiring manager's verified email and direct dial.
