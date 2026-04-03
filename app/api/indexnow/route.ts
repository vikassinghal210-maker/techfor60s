import type { NextRequest } from 'next/server'

const INDEXNOW_KEY = '283a0d9f13302e4a28e4226f1a260841'
const SITE_HOST = 'techfor60s.com'
const SITE_URL = 'https://techfor60s.com'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

export async function POST(request: NextRequest) {
  // Protect with secret
  const secret = request.headers.get('x-indexnow-secret')
  const expectedSecret = process.env.INDEXNOW_SECRET

  if (!expectedSecret) {
    return Response.json(
      { error: 'INDEXNOW_SECRET env var is not configured' },
      { status: 500 }
    )
  }

  if (secret !== expectedSecret) {
    return Response.json(
      { error: 'Unauthorized: invalid or missing x-indexnow-secret header' },
      { status: 401 }
    )
  }

  let body: { urls?: unknown }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { urls } = body

  if (!Array.isArray(urls) || urls.length === 0) {
    return Response.json(
      { error: 'Request body must include a non-empty "urls" array' },
      { status: 400 }
    )
  }

  const urlList = urls.filter((u): u is string => typeof u === 'string')

  if (urlList.length === 0) {
    return Response.json(
      { error: 'No valid string URLs found in the "urls" array' },
      { status: 400 }
    )
  }

  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  }

  try {
    const indexNowResponse = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })

    if (!indexNowResponse.ok) {
      const text = await indexNowResponse.text().catch(() => '')
      return Response.json(
        {
          error: 'IndexNow API returned an error',
          status: indexNowResponse.status,
          detail: text,
        },
        { status: 502 }
      )
    }

    return Response.json({
      success: true,
      submitted: urlList.length,
      message: `Successfully submitted ${urlList.length} URL(s) to IndexNow`,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return Response.json(
      { error: 'Failed to reach IndexNow API', detail: message },
      { status: 502 }
    )
  }
}
