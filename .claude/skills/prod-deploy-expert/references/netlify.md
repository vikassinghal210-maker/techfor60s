# Netlify Deployment Playbook

For `cricjosh.in` or `techfor60s.com` hosted on Netlify. Commands assume the Netlify CLI is installed (`npm i -g netlify-cli`) and you're authenticated (`netlify login`).

---

## 1. Verify the deploy preview

Netlify calls them **Deploy Previews**. Every PR gets one automatically if the site is Git-linked.

- Preview URL is posted on the PR by the Netlify bot, and shown in the Netlify dashboard under **Deploys** → the specific deploy entry.
- Click through it. Verify the changed routes, not just the homepage.
- Browser devtools console — any new warnings?
- Mobile viewport.
- If a new env var is required, it must be set with **Deploy Previews** scope for the preview to work, and with **Production** scope before promoting.

---

## 2. Note the current published deploy (rollback target)

Netlify dashboard → your site → **Deploys** tab → look for the deploy tagged **Published**. That's what's live.

**Write down its deploy ID** (shown in the URL when you click into it, or the short ID on the list) or the commit SHA. This is your rollback target.

---

## 3. Confirm Production env vars

Dashboard → **Site configuration** → **Environment variables**.

- Netlify env vars have per-context scopes: Production, Deploy Previews, Branch deploys, etc.
- Verify every var the new code expects is set with **Production** context.
- Add new vars *before* promoting, not at the same time.

---

## 4. Promote to production

### Path A: Git-based (default)
If your Production branch is `main` (or whatever you've configured), merging the PR triggers a build and, assuming it succeeds, publishes automatically. Watch the deploy progress in the **Deploys** tab.

### Path B: Publish a specific existing deploy (manual)
If you've verified a branch deploy or a specific preview and want to publish exactly that artifact — no rebuild:

Dashboard → **Deploys** → click the deploy you want → **Publish deploy** button.

This is Ravi's preferred flow when you want certainty that what you tested is what goes live.

### Path C: CLI
```
netlify deploy --prod
```
Rebuilds and publishes. Avoid during incidents — it rebuilds, so you're not deploying the exact tested artifact.

---

## 5. Smoke-test

Same universal smoke tests from the main SKILL.md. Netlify-specific checks:

- **Functions** tab → recent invocations → any 500s?
- **Logs** tab (or `netlify functions:log` via CLI) → filter recent → any errors?
- If using **Netlify Edge Functions**, remember they intercept requests — a broken edge function breaks everything downstream. Test multiple routes.
- If using Netlify Forms, submit one and verify it appears under **Forms** in the dashboard.

---

## 6. Rolling back on Netlify

**Dashboard method (preferred):**
Dashboard → **Deploys** → find your rollback target → click it → **Publish deploy**.

This re-publishes the old artifact. No rebuild, typically live within a minute.

**CLI alternative:**
```
netlify rollback
```
Rolls back to the previous published deploy. Confirm afterwards that the correct deploy is published.

### Rollback caveats (same category as Vercel)

- **ISR / ODR cache**: Next.js on Netlify uses the Netlify adapter's cache. Bad regenerations may persist after code rollback — trigger revalidation or purge the CDN cache.
- **Env var changes don't roll back with code.** If you set a new var, it stays set. Usually fine, but note.
- **Netlify Forms submissions** from the bad deploy stay in your dashboard — that's fine, just be aware.
- **Branch rename / prod branch change** can't be undone by a deploy rollback. Treat those as their own careful operation.

---

## 7. Cache purging on Netlify

If a deploy goes out but users report stale content:

- Dashboard → **Deploys** → top banner often offers **Clear cache and deploy site** — that's the nuclear option.
- For targeted purging of ISR/on-demand revalidated pages, use your revalidation endpoint.
- Remember: users with service workers from the old deploy may see stale HTML until the SW updates. Not much you can do beyond waiting or forcing a version bump in the SW.

---

## 8. Netlify-specific gotchas Ravi has learned

- **Build plugins.** If the site uses `@netlify/plugin-nextjs` or similar, plugin version changes can silently alter how the Next.js output is adapted. Pin versions; don't leave them on `latest`.
- **Build minutes & concurrent builds.** If you're on a tight plan, concurrent builds may queue. Not a correctness issue, but affects your deploy window timing.
- **Context-specific env vars.** Easy to set a var with "all scopes" and leak prod credentials to Deploy Previews. Scope carefully.
- **Asset optimization.** Netlify's image/asset optimization can sometimes produce unexpected output. If images look wrong post-deploy, check whether asset optimization is on.
- **Domain & SSL.** If you ever change the primary domain config, SSL re-provisioning can take a few minutes. Don't bundle domain changes with code deploys.
- **Functions region.** Netlify Functions default region isn't always optimal for India-based traffic. Check the site's function region setting.
