# Source Playbook — Text & Discussion Platforms

Load this reference when running live research. Covers X/Twitter, Reddit, Google Trends, and news sources — the four main signal streams for cricjosh.in and techfor60s.com.

---

## X / Twitter

**The question it answers:** Who's driving the conversation in this niche right now, and what are they arguing about?

### Advanced search operators (Amandeep's power move)

Use these in X's search bar or construct URLs directly with `?q=<query>`:

- `from:handle` — posts from a specific account
- `to:handle` — replies to a specific account
- `min_faves:1000` — only posts with 1k+ likes
- `min_retweets:100` — only posts with 100+ retweets
- `min_replies:50` — only posts with 50+ replies (good for controversy signal)
- `since:2026-04-10 until:2026-04-17` — date range
- `lang:en` / `lang:hi` — language filter
- `filter:links` — posts with a link (often news-driven)
- `filter:media` — posts with images/video

**Composed examples:**
- Cricket, this week, high-engagement: `IPL min_faves:5000 since:2026-04-10 lang:en`
- Specific moment in cricket: `"DRS" OR "umpire" min_faves:2000 since:2026-04-15`
- Senior tech topics: `"scam" OR "phishing" "elderly" OR "seniors" min_faves:500 since:2026-04-10`
- WhatsApp-specific updates: `WhatsApp update min_faves:1000 lang:en since:2026-04-01`

### Reading the metrics

- **Replies > likes** — post is controversial or engaging discussion, not just affirmation. Strong interest signal.
- **Quote-tweets** — when people *riff* on a post rather than just share it, the content has narrative legs. Check the quote-tweets for follow-up article angles.
- **Account size context** — a 500-follower account with 10k likes is a breakout; a 2M-follower account with 10k likes is below average. Always contextualize.

### What to ignore on X

- Raw impression counts (easily inflated, unreliable)
- Engagement on accounts with obvious bot followings
- "This went viral" screenshots without direct links
- Trending topics driven by coordinated pushes (check the first 50 posts — if they're all similar phrasing, it's manufactured)

---

## Reddit

**The question it answers:** What is a specific community obsessed with right now, and what aren't they getting answered?

### Why Reddit is underrated

- Users self-organize into niches — the subreddit structure *is* the niche map.
- Upvotes are relatively hard to fake at community scale.
- Comment threads reveal the *questions behind the question*.
- Niche subreddits often surface topics 1–2 weeks before mainstream media catches up.

### URL patterns worth memorizing

- `reddit.com/r/<sub>/top/?t=week` — top posts this week
- `reddit.com/r/<sub>/top/?t=month` — top posts this month
- `reddit.com/r/<sub>/rising/` — what's climbing *right now*
- `reddit.com/search/?q=<query>&sort=top&t=week` — search across all Reddit
- `reddit.com/r/<sub>/search/?q=<query>&restrict_sr=1&sort=top` — search within a sub

### Reading the metrics

- **Rising > Hot > Top** for early signals. "Rising" shows posts gaining velocity; those are tomorrow's viral content elsewhere.
- **Upvote ratio** (shown on the post) — under 90% means controversy. 80–90% is healthy disagreement. Below 70% is a pile-on (avoid replicating unless you want that dynamic).
- **Comments vs upvotes** — high comments / low upvotes = people disagree but engage (good for debate-style articles). High upvotes / low comments = people agree, move on (good for definitive explainer articles).
- **Cross-posted tracking** — when the same post shows up in 4+ subreddits in a week, it's riding a wave worth catching.

### Cricket-relevant subs (cricjosh.in)

- **r/Cricket** — global cricket, active year-round, main signal source
- **r/ipl** — hyperactive during IPL season, quiet otherwise
- **r/cricketshitpost** — meme/humor signal, often a leading indicator for what cricket Twitter is about to joke about

### Senior-tech-relevant subs (techfor60s.com)

- **r/techsupport** — what problems people actually have; comments reveal the gaps in existing documentation
- **r/Seniors**, **r/AskOldPeople** — direct audience voice
- **r/talesfromtechsupport** — stories that reveal scam and confusion patterns (scam awareness article fodder)
- **r/scams** — track what scams are actively circulating; time-sensitive content opportunity

### Comment-section mining (Amandeep's favorite underused technique)

For any top post in a relevant sub:

1. Sort comments by **Top**, read the top 5–10
2. Look for: (a) corrections of the original post, (b) unanswered questions in replies, (c) "this reminds me of..." personal stories
3. Each of these is a potential article angle — the questions in comments are the unmet-need map

---

## Google Trends

**The question it answers:** Are people searching for this, and is interest rising, stable, or falling?

Trends is Amandeep's single most-used tool. Why: it's the one place you can see *intent* (people searching for answers) rather than *engagement* (people clicking what algorithms show). Intent is a leading indicator for SEO-driven sites — which both cricjosh.in and techfor60s.com are.

### Setting it up correctly

Default Trends setup is almost always wrong:
- Default: "Worldwide, past 12 months"
- What you want for these sites: "India, past 7 days / 30 days / 90 days" depending on the question

### Core moves

1. **"Related queries" > "Rising"** — not Top. Rising queries have the most upside. Any "Breakout" label means the query went from near-zero to significant traffic — these are goldmines for new article topics.
2. **Compare mode** — type a second search term to compare. If a new term is overtaking a historically dominant one, that's a leading signal (e.g., if "WhatsApp scam" is overtaking "phone call scam" in India, senior-tech coverage should shift).
3. **Category filters** — under the search box, filter by category. For cricket: Sports > Cricket. For senior tech: hard to filter precisely, use keyword specificity instead.
4. **Real-time trends** — `trends.google.com/trending` shows what's being searched *in the last 24 hours*. Pair with news context to understand *why*.

### URL pattern

Amandeep often constructs Trends URLs directly:
`trends.google.com/trends/explore?q=<query>&geo=IN&date=now%207-d`

Parameters:
- `q=<query>` — the search term (URL-encoded)
- `geo=IN` — India (use `US`, `GB`, etc. for other regions)
- `date=now%207-d` — past 7 days (other options: `now%201-d`, `today%201-m`, `today%203-m`, `today%2012-m`)

### What Trends won't tell you

- *Why* people are searching (pair with news/social context)
- Whether searchers are buying, sharing, or just curious
- Anything about non-search platforms

---

## News & Blogs

**The question it answers:** What stories are being covered heavily, and where are the angles being missed?

### Core moves

1. **Google News with time filter** — `news.google.com`, search your topic, click **Tools** → **Recent**. Count sources covering the same story to gauge scale.
2. **Headline pattern analysis** — when 20 outlets cover a story, headlines cluster into 2–3 framings. The *fourth framing* (the one nobody's taking) is often the opportunity for a differentiated piece.
3. **Comment-section mining** — on major outlets that still show comments, readers often voice the question the article didn't answer. Article opportunity.
4. **Newsletter tracking** — niche newsletters often cover a story 2–3 days before mainstream with a specific angle. Worth subscribing to 3–5 per niche:
   - **Cricket:** ESPNcricinfo newsletters, The Cricket Monthly, Wisden digital, substacks from specific cricket writers
   - **Senior tech:** Clark.com (scam awareness), AARP tech section, Komando, niche substacks on accessibility
5. **RSS aggregation** — a plain feed reader with 20–30 niche sources gives you a sense of coverage density and timing in minutes.

### Metrics that matter (harder to get but valuable)

- Number of outlets covering the same story within 48 hours = scale
- Comment count on the article itself (where shown) = reader investment
- Appearance in aggregator newsletters = curator signal

---

## Cross-Platform Migration — Amandeep's Favorite Leading Indicator

Pattern to watch for in both niches:

1. **T+0**: Story first appears on X or in a niche subreddit
2. **T+1 to T+3 days**: Picked up by niche newsletters and smaller blogs
3. **T+3 to T+7 days**: Mainstream news covers it
4. **T+1 to T+2 weeks**: Aggregator sites / listicle blogs digest it

Each jump is a signal the story has durability — it's not just a platform-specific quirk.

**How to exploit this:**
- Save interesting X posts / Reddit threads in the niche that seem undercovered
- Check back in 2–3 days — has the idea moved?
- If yes, there's often a 2–5 day window to publish *before* the mainstream coverage arrives
- That's how strategically-timed sites beat the incumbents to SEO and social traffic

---

## When Amandeep Pulls Live Data vs. Reasons From Priors

- **Live search required:** "What's trending now?", "Did X happen today?", "Is topic Y still rising?", anything with a present-tense or recent-time framing.
- **Priors sufficient:** General framework questions ("how does cricket content tend to travel?"), analysis of a piece the user shared (teardown), or planning guidance that doesn't depend on today's specific state.

Amandeep errs toward pulling live data when in doubt — stale recommendations are worse than slightly slower ones.
