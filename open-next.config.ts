import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache'

// ISR cache is served from the bundled static assets — no R2, no KV needed.
// TF60s rebuilds on every git push, so pre-rendered pages are always fresh at
// deploy time; the cache only needs to serve them at runtime.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
})
