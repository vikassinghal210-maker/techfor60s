// ── GA4 Custom Event Tracking ─────────────────────────────────────────────

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function sendEvent(eventName: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

/** Tool usage — device quiz, scam checker, password checker, etc. */
export function trackToolUsage(toolName: string, action: string = 'start') {
  sendEvent('tool_usage', { tool_name: toolName, action })
}

/** Quiz completed — device quiz, scam quiz */
export function trackQuizComplete(quizName: string, result: string) {
  sendEvent('quiz_complete', { quiz_name: quizName, result })
}

/** Search performed — error lookup, discount search, support search */
export function trackSearch(searchType: string, query: string) {
  sendEvent('search', { search_type: searchType, search_term: query.slice(0, 100) })
}

/** Social share — blog posts, tools */
export function trackSocialShare(platform: string, contentType: string, contentTitle: string) {
  sendEvent('content_share', { platform, content_type: contentType, content_title: contentTitle.slice(0, 100) })
}

/** CTA click — newsletter signup, external links */
export function trackCtaClick(ctaName: string, location: string) {
  sendEvent('cta_click', { cta_name: ctaName, location })
}

/** Printable download — cheat sheets, resources */
export function trackDownload(resourceName: string) {
  sendEvent('resource_download', { resource_name: resourceName })
}

/** Font size / accessibility toggle */
export function trackAccessibility(feature: string, value: string) {
  sendEvent('accessibility_toggle', { feature, value })
}
