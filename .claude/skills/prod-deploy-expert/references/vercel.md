# Vercel Deployment Playbook

For `cricjosh.in` or `techfor60s.com` hosted on Vercel. All commands assume the Vercel CLI is installed (`npm i -g vercel`) and you're authenticated (`vercel login`).

---

## 1. Verify the preview deployment

Every PR gets a preview URL — find it on the PR itself (Vercel bot comment) or in the Vercel dashboard under the project's **Deployments** tab.

**Non-negotiable preview checks:**
- Click the preview URL — does it actually load?
- Check the exact routes the PR changes (not just `/`)
- Open devtools console — any new errors or hydration warnings?
- Mobile viewport — devtools device emulation or an actual phone
- If the change adds an env var, confirm it's set in the **Preview** environment before expecting the preview to work

---

## 2. Note the current live deployment (rollback target)

In the Vercel dashboard → your project → **Deployments** tab → filter by "Production". The top entry is what's live right now.

**Write down its deployment ID** (looks like `dpl_xxxxxxxxxxxx`) or the commit SHA. This is your rollback target. Do this *before* promoting — you'll need it fast if something goes wrong.

---

## 3. Confirm Production env vars

Dashboard → project → **Settings** → **Environment Variables** → filter for **Production**.

- Is every variable the new code expects actually present and set for Production scope?
- Vercel env vars are scoped per environment (Production / Preview / Development). A var that works in Preview doesn't automatically exist in Production.
- If you're adding a new var, add it *first*, then promote. Not simultaneously.

---

## 4. Promote to production

Two common paths — pick based on your team's workflow:

### Path A: Git-based (most common)
If the project is connected to Git and Production is set to auto-deploy from `main` (or whichever branch), then merging the PR to the production branch auto-promotes. This is the default Vercel flow.

**Watch for:**
- The new deployment in the Deployments tab changing from "Building" → "Ready" → "Production"
- Build logs green, no warnings about missing env vars

### Path B: Promote an existing preview (manual)
Dashboard → **Deployments** → find the preview deployment you verified → `...` menu → **Promote to Production**.

This aliases the preview deployment to the production domain *without rebuilding*. Useful when you want to promote the exact build you just tested — no risk of the "rebuild produces a different artifact" problem.

### Path C: CLI (less common, for scripted workflows)
```
vercel --prod
```
Runs a fresh build and promotes. Ravi avoids this unless there's a specific reason — it rebuilds, so the artifact going live isn't the exact one you tested.

---

## 5. Smoke-test (from the main SKILL.md checklist)

Don't skip this even if the deploy logs are green. "Ready" in Vercel means the build succeeded, not that your app works.

Key things specific to Vercel:
- Check **Functions** tab → recent invocations → any 500s?
- Check **Logs** tab → filter to last 5 minutes → any error-level entries?
- If you use **Edge Middleware**, it runs on every request — a bad middleware deploy breaks every route at once. Test multiple routes, not just one.

---

## 6. Rolling back on Vercel

This is what makes managed platforms worth it — rollback is a single action.

**Dashboard method (preferred during an incident — faster to see):**
Dashboard → **Deployments** → find your rollback target (the deployment ID you wrote down) → `...` menu → **Promote to Production**.

The old deployment's build artifact is re-aliased to production. No rebuild, no wait for a fresh compile. Typically live in under 30 seconds.

**CLI method:**
```
vercel rollback <deployment-url-or-id>
```

### Important rollback caveats

- **Database migrations don't roll back with code.** If the promoted version ran a migration that altered schema, rolling back the code can leave you in a broken state. Next.js apps on Vercel usually don't have this issue (most persistence is external — Supabase, Planetscale, etc.) but verify.
- **Env var changes don't roll back with code.** If the new deploy required a new env var and you set it, rolling back the code doesn't un-set the var. Usually harmless, but note it.
- **ISR cache persists.** Pages that were re-generated under the broken deployment may still be served from the cache even after rollback. Trigger on-demand revalidation for affected routes, or wait for the next ISR cycle.

---

## 7. ISR / on-demand revalidation

If the site uses ISR (likely — it's the default for content sites on Next.js):

- A bad deploy may have regenerated pages with broken content.
- Post-rollback, hit your revalidation endpoint for affected paths, or trigger a redeploy with the previous commit to flush.
- Know which pages use ISR vs SSG vs SSR before you need this information at 2am — document it in the repo.

---

## 8. Vercel-specific gotchas Ravi has learned

- **The build cache.** When a deploy fails mysteriously on code that obviously should work, go to project settings and clear the build cache, then redeploy. Resolves it more often than it should.
- **Node.js version drift.** Vercel defaults can change. Pin your Node version in `package.json` (`"engines": { "node": "20.x" }`) or via the dashboard's Node.js Version setting. Don't leave it on "default."
- **Function region.** By default, Vercel functions run in Washington, D.C. (`iad1`). For both of these sites serving Indian users, consider setting the function region to Mumbai (`bom1`) in `vercel.json` for API routes, or use Edge runtime where possible.
- **Preview deployments with prod secrets.** Don't set production API keys with Preview scope "just to make preview work." Use non-prod keys for Preview; scope carefully.
- **Domain aliasing.** If you ever manually re-alias a domain (CLI or dashboard), double-check which deployment the production domain is pointing at after. The source of truth is the domains tab, not what you *think* is live.
