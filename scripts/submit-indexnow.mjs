/**
 * submit-indexnow.mjs
 *
 * Fetches the sitemap from techfor60s.com, parses all URLs, and submits them
 * to IndexNow in batches of 100.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs
 */

const INDEXNOW_KEY = '283a0d9f13302e4a28e4226f1a260841'
const SITE_HOST = 'techfor60s.com'
const SITE_URL = 'https://techfor60s.com'
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
const BATCH_SIZE = 100

async function fetchSitemap(url) {
  console.log(`Fetching sitemap: ${url}`)
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap (${res.status}): ${url}`)
  }
  return res.text()
}

function parseUrls(xml) {
  const matches = xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)
  const urls = []
  for (const match of matches) {
    const url = match[1].trim()
    if (url) urls.push(url)
  }
  return urls
}

async function parseSitemapIndex(xml) {
  // Check if this is a sitemap index (contains <sitemapindex>)
  if (!xml.includes('<sitemapindex')) return null

  const matches = xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)
  const sitemapUrls = []
  for (const match of matches) {
    sitemapUrls.push(match[1].trim())
  }
  return sitemapUrls
}

async function getAllUrls() {
  const rootXml = await fetchSitemap(SITEMAP_URL)
  const sitemapIndex = await parseSitemapIndex(rootXml)

  if (sitemapIndex) {
    console.log(`Found sitemap index with ${sitemapIndex.length} sub-sitemaps`)
    const allUrls = []
    for (const sitemapUrl of sitemapIndex) {
      try {
        const xml = await fetchSitemap(sitemapUrl)
        const urls = parseUrls(xml)
        console.log(`  ${sitemapUrl}: ${urls.length} URLs`)
        allUrls.push(...urls)
      } catch (err) {
        console.warn(`  Warning: failed to fetch ${sitemapUrl}: ${err.message}`)
      }
    }
    return allUrls
  }

  // Single sitemap
  const urls = parseUrls(rootXml)
  return urls
}

function chunkArray(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

async function submitBatch(urlList, batchIndex, totalBatches) {
  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  }

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })

  if (res.ok) {
    console.log(
      `  Batch ${batchIndex + 1}/${totalBatches}: submitted ${urlList.length} URLs — HTTP ${res.status}`
    )
  } else {
    const text = await res.text().catch(() => '')
    console.error(
      `  Batch ${batchIndex + 1}/${totalBatches}: FAILED — HTTP ${res.status} ${text}`
    )
  }
}

async function main() {
  console.log('=== IndexNow Submission Script ===')
  console.log(`Site:     ${SITE_URL}`)
  console.log(`Endpoint: ${INDEXNOW_ENDPOINT}`)
  console.log(`Key:      ${INDEXNOW_KEY}`)
  console.log()

  let urls
  try {
    urls = await getAllUrls()
  } catch (err) {
    console.error(`Error fetching sitemap: ${err.message}`)
    process.exit(1)
  }

  if (urls.length === 0) {
    console.error('No URLs found in sitemap. Exiting.')
    process.exit(1)
  }

  console.log(`\nTotal URLs found: ${urls.length}`)
  console.log(`Submitting in batches of ${BATCH_SIZE}...\n`)

  const batches = chunkArray(urls, BATCH_SIZE)

  for (let i = 0; i < batches.length; i++) {
    try {
      await submitBatch(batches[i], i, batches.length)
    } catch (err) {
      console.error(`  Batch ${i + 1}/${batches.length}: request error — ${err.message}`)
    }
    // Small delay between batches to be polite to the API
    if (i < batches.length - 1) {
      await new Promise((r) => setTimeout(r, 500))
    }
  }

  console.log('\nDone.')
}

main()
