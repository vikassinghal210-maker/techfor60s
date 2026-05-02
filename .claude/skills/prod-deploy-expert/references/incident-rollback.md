# Incident Response & Rollback Runbook

Platform-agnostic. Use this when something is wrong in prod and the clock is ticking. For specific rollback commands, see the platform reference file.

---

## Ravi's Incident Response Philosophy

> "In an incident, you have three jobs — in this order: **stop the bleeding**, **communicate**, **understand**. Never skip to step three first."

Two things you should internalize:

1. **Rollback is always a valid first move.** It is not "giving up." It's returning to a known-good state so you can think without a fire alarm going off. You can always re-deploy once you understand the bug.
2. **The first five minutes of communication matter more than the first hour of fixing.** A team channel update every 5–10 minutes during an incident beats a perfect fix delivered silently.

---

## 🚨 Incident Flowchart

### Step 1 — Confirm it's real (60 seconds max)

Before rolling back, spend *up to* 60 seconds confirming:

- Hit the affected URL in a private/Incognito window. Still broken?
- Check from a different network (phone data, not your wifi)
- Check the platform's status page (Vercel / Netlify / Cloudflare)
- Check your uptime monitor / synthetic check history — when did it start firing?

**If any of these suggests the site is actually fine for most users** (e.g., broken only on your corporate VPN), pause — it might be a local issue, not a prod incident. But if in doubt, proceed.

### Step 2 — Announce the incident

Post in the team channel, immediately:

> `🚨 [time] Possible incident on <site>. Symptom: <what's broken>. Investigating. Last deploy was <deploy-id> at <time>. Will update in 5 min.`

Don't wait until you have a diagnosis. Announce the fact of the incident, then work.

### Step 3 — Decide: rollback or investigate?

**Rollback immediately if:**
- The incident started within minutes of the most recent promotion
- Error rate / 500s are elevated
- Core functionality (homepage, article pages, forms) is broken
- You have no quick diagnosis AND the site is visibly broken for users

**Investigate briefly before rolling back if:**
- The incident is clearly *not* related to the deploy (e.g., a third-party API is down, the platform itself has a status page incident, DNS provider issue)
- The issue is minor and only affects a non-critical feature

Ravi's bias: **when in doubt, roll back.** You can always re-investigate from a stable baseline.

### Step 4 — Execute the rollback

Platform-specific — see `vercel.md`, `netlify.md`, or `cloudflare-pages.md`.

Typical flow:
1. Identify the last-known-good deployment (the one that was live before the bad promotion)
2. Promote/publish/rollback to that deployment via the platform dashboard
3. Wait for propagation (usually <60 seconds)
4. Verify the site is restored in a private window

### Step 5 — Verify recovery

Run abbreviated smoke tests on the now-rolled-back site:
- Homepage loads?
- Affected routes load?
- No errors in the platform's logs tab?
- Uptime monitor back to green?

### Step 6 — Communicate resolution

> `✅ [time] <site> recovered via rollback to <deploy-id>. Smoke tests green. Investigating root cause now. RCA to follow.`

### Step 7 — Investigate the root cause (now, with time)

Only now, with a stable prod and no fire alarm, do you dig into *why* the deploy broke things. Pull up the diff, reproduce in a preview deployment, figure out the bug.

### Step 8 — Post-incident write-up

For any non-trivial incident, write it up:

- **What happened** — symptom, start time, end time
- **Impact** — which users/features were affected, for how long
- **Root cause** — what the bug actually was
- **Why it wasn't caught pre-deploy** — gap in testing, missing smoke test, etc.
- **Action items** — what gets added to the pre-deploy checklist or preview verification to prevent recurrence

Keep these in a shared doc or incident log. Small team, but still worth it — patterns emerge over time.

---

## 🔍 Common Incident Patterns & How Ravi Diagnoses

### "The site is down"

1. Check the platform status page first. If Vercel/Netlify/Cloudflare itself has an incident, there's nothing to fix on your end — announce, wait, monitor.
2. Check DNS — is the domain resolving? Is the certificate valid?
3. Check the platform's deployment status — is the production deployment showing as "Ready"/"Published"? Or is it in a failed state?
4. Check the platform's function logs for mass 500s.
5. If recent deploy → rollback.

### "The site looks broken but doesn't error"

1. Hard refresh in Incognito. Still broken?
2. Check a specific URL from a different network.
3. It might be stale edge cache. Platform-specific cache purge.
4. Or stale browser cache / service worker. Check if a SW is registered and consider unregistering it for users if needed.
5. If it really is a regression in the live deploy → rollback.

### "Forms stopped working"

1. Submit a form yourself, watch devtools network tab. What status does the submission endpoint return?
2. Check the API route's function logs on the platform.
3. Common cause: an env var the API route needs got changed or unset.
4. Check if a third-party service (SendGrid, Resend, etc.) is the actual failure point.
5. If it's the deploy → rollback.

### "Specific pages 404 or 500 but others are fine"

1. Likely an ISR/SSG issue, middleware issue, or a route-specific bug.
2. Check the function logs filtered to those routes.
3. If ISR: try triggering revalidation for the affected paths.
4. If middleware: it might be rewriting/redirecting incorrectly — middleware bugs manifest as route-level weirdness.
5. If recent deploy → rollback.

### "Site is slow / high latency"

1. Check platform analytics → p95 latency, function duration.
2. Check if a function is cold-starting more than usual (new function added, cold start cost increased).
3. Check for a dependency that does I/O on import.
4. Check if a DB/upstream service is slow — the site may be blameless.
5. Not always rollback territory, but if it started with the deploy, rollback is still the fastest path to stable.

---

## 📝 Rollback Decision Cheat Sheet

When you're in the middle of an incident and your brain is cluttered, use this:

| Signal | Rollback? |
|---|---|
| Incident started within minutes of a promotion | **Yes** |
| Elevated 5xx error rate post-deploy | **Yes** |
| Homepage broken | **Yes** |
| Forms or API routes failing | **Yes, if they worked before the deploy** |
| Platform status page shows platform-side incident | **No** — not your deploy |
| Third-party API / service returning errors | **No** — not your deploy, but mitigate if possible |
| Stale cache showing old content | **No** — purge cache instead |
| Minor visual regression on one page | **Probably not** — fix forward with a new preview-verified deploy |
| You can't explain what's wrong | **Yes** — you don't need to understand it to return to safety |

---

## 🧊 After-Hours / On-Call Protocol

For both `cricjosh.in` and `techfor60s.com`, the typical on-call scenarios:

- **cricjosh.in during a match** — Anytime. Match-day incidents are the most painful because they're the most visible. Roll back fast; debug after the match ends.
- **techfor60s.com at off-hours** — Lower urgency but don't let it sit. A 500 error for an elderly user at 10pm is a user who may not come back tomorrow.

Rules for after-hours:
1. Always confirm the incident from a second network before paging someone else
2. Err toward rollback — don't try to be clever at 2am
3. Write down what you did *as you do it* — future-you will need the timeline tomorrow
4. If you can't reach a known-good state within 15 minutes of starting, escalate

---

## 🧠 Things Ravi Says During Incidents (And Why)

- **"What was the last thing that changed?"** — 80% of incidents correlate with a recent change. Start there.
- **"Let's roll back first, then talk about fixing."** — Stops the debate about whether to roll back.
- **"Is it broken for real users, or just for us?"** — Separates "prod is down" from "my laptop has a weird cache."
- **"What does the status page say?"** — Because sometimes it really is the platform.
- **"Write it down now, not later."** — Incident timelines reconstructed from memory are always wrong.
- **"We'll do the post-mortem tomorrow. Tonight, we stabilize and sleep."** — Good decisions require rest; post-mortems require clarity.
