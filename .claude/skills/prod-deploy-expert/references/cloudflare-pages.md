# Cloudflare Pages Deployment Playbook

For `cricjosh.in` or `techfor60s.com` hosted on Cloudflare Pages. Commands assume `wrangler` is installed (`npm i -g wrangler`) and you're authenticated (`wrangler login`).

Note: Next.js on Cloudflare Pages typically uses `@cloudflare/next-on-pages` as the build adapter. Be aware of which Next.js features are supported on the Cloudflare runtime — not all Node.js APIs work on Workers/edge runtime.

---

## 1. Verify the preview deployment

Every non-production branch / PR gets a preview deployment automatically.

- Preview URL is in the PR checks (Cloudflare bot) or in the Cloudflare dashboard → **Workers & Pages** → your project → **Deployments** (filter by Preview).
- Click through it. Verify changed routes specifically.
- Devtools console — watch for hydration and runtime errors.
- Mobile viewport.
- If new env vars are needed, they must be configured for **Preview** scope for preview to work, and **Production** scope before promoting.

---

## 2. Note the current production deployment (rollback target)

Dashboard → **Workers & Pages** → your project → **Deployments** → filter by **Production**. Top entry is live.

Record its deployment ID (shown on hover / in the URL) or commit SHA. That's your rollback target.

---

## 3. Confirm Production env vars & bindings

Dashboard → project → **Settings** → **Environment variables and secrets**.

- Variables / secrets are scoped per environment (Production, Preview).
- Cloudflare also has **bindings** — KV namespaces, D1 databases, R2 buckets, Queues, etc. If the new code uses a binding, confirm it's bound in Production, not just Preview.
- Missing bindings will not fail the build — they fail at request time. Easy way to ship a broken prod deploy.

---

## 4. Promote to production

### Path A: Git-based (default)
Merge to your production branch (typically `main`). Cloudflare auto-builds and deploys to the production domain.

### Path B: Promote an existing deployment (manual)
Dashboard → **Deployments** → find the specific deployment you verified → `...` menu → **Rollback to this deployment** (the label is "Rollback" but it serves as "make this one live," too).

This re-serves the artifact without rebuilding — preferred when you want to promote the exact tested build.

### Path C: CLI
```
wrangler pages deploy <build-output-directory> --project-name=<your-project> --branch=main
```
For most Next.js-on-Pages setups, the build output is `.vercel/output/static` after running `npx @cloudflare/next-on-pages`. This rebuilds & deploys; use sparingly.

---

## 5. Gradual deployments (Cloudflare's quiet superpower)

Cloudflare Workers/Pages support **gradual deployments** — you can ship a new version to a percentage of traffic first (e.g., 10%), watch metrics, then ramp up.

This is the cleanest canary mechanism of the three platforms. Consider it for:
- `cricjosh.in` before expected traffic spikes (match days)
- Any change to middleware or runtime behavior
- Any Next.js or adapter major version bump

Dashboard → project → **Deployments** → new version → **Deploy with gradual rollout**, pick percentage, monitor, ramp up.

If metrics look bad at 10%, you can cut traffic back to 0% from the new version without a full rollback.

---

## 6. Smoke-test

Universal smoke tests apply (see main SKILL.md). Cloudflare-specific:

- Dashboard → project → **Deployments** → click the live deployment → view real-time logs
- Or CLI: `wrangler pages deployment tail <deployment-id>`
- Check **Analytics** tab → error rate / p95 latency — any jump?
- If you use Cloudflare Workers (beyond Pages Functions), check those separately.
- The Cloudflare runtime is a Workers-style V8 isolate, not Node.js. Some npm packages that worked in local `next dev` won't work at runtime — this often manifests as 500s only in the deployed environment, never locally. Always smoke-test the deployed URL, not your local dev server.

---

## 7. Rolling back on Cloudflare Pages

**Dashboard method:**
Deployments → find your rollback target → `...` → **Rollback to this deployment**.

Instant — typically propagates in under a minute globally.

**CLI method:**
List deployments first, then rollback:
```
wrangler pages deployment list --project-name=<your-project>
wrangler pages deployment rollback <deployment-id> --project-name=<your-project>
```

### Rollback caveats

- **KV / D1 data changes don't roll back.** If your new deploy wrote data to KV or D1, rolling the code back doesn't undo the writes. Know what your change touches.
- **Env var changes don't roll back with code.** Same as other platforms.
- **Cache (Cloudflare CDN)**: HTML served from edge cache won't update until TTL expires or you purge. Use dashboard → **Caching** → **Configuration** → **Purge Cache** (purge everything is the safe panic option; purge by URL/prefix for surgical).
- **Gradual rollout state.** If you were mid-gradual-rollout when rolling back, confirm the traffic split after rollback — you want 100% on the known-good version.

---

## 8. Cloudflare-specific gotchas Ravi has learned

- **Runtime is not Node.** Packages that pull in `fs`, `path`, native binaries, or do heavy sync CPU work will fail or be slow on the Workers runtime. Check compatibility when upgrading dependencies.
- **Compatibility date / flags.** `wrangler.toml` or project settings define a `compatibility_date` and optional flags. Changing them changes runtime behavior — treat as a risky change, not a config tweak.
- **Function / bundle size limits.** Workers have a 1 MB (free) or 10 MB (paid) compressed size limit per Worker. A new dependency can push you over unexpectedly; the build will fail.
- **`@cloudflare/next-on-pages` version drift.** This adapter changes with Next.js versions. Pin both and upgrade together deliberately.
- **R2 / KV / D1 bindings in prod vs preview.** It's easy to bind the same prod resource to Preview and accidentally have preview deployments writing to prod data. Use separate resources per environment.
- **Caching rules.** Cloudflare Page Rules / Cache Rules can override your app's cache headers. If caching behavior seems wrong post-deploy, check the rules before blaming the code.
- **DNS is on Cloudflare too.** Domain/DNS changes for these sites are one tab away — treat them as their own deploy with their own window. Don't bundle.
