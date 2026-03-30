'use client'

import { useState } from 'react'
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Globe,
  Lock,
  Unlock,
  Search,
  ExternalLink,
} from 'lucide-react'

/* ───────────────── types ───────────────── */

interface CheckResult {
  label: string
  description: string
  severity: 'high' | 'medium' | 'low'
  passed: boolean
}

type Verdict = 'safe' | 'caution' | 'dangerous'

/* ───────────────── constants ───────────────── */

const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.click', '.buzz', '.info', '.club', '.work',
  '.gq', '.ml', '.cf', '.ga', '.tk', '.cam', '.icu', '.rest',
]

const POPULAR_DOMAINS = [
  'google', 'amazon', 'paypal', 'microsoft', 'apple', 'facebook',
  'netflix', 'walmart', 'costco', 'bankofamerica', 'wellsfargo', 'chase',
  'instagram', 'twitter', 'linkedin', 'yahoo', 'ebay', 'target',
]

const PHISHING_KEYWORDS = [
  'login', 'verify', 'secure', 'account', 'update', 'confirm',
  'banking', 'signin', 'sign-in', 'webscr', 'password', 'credential',
  'suspend', 'locked', 'alert', 'urgent', 'restore',
]

/* Characters that look like Latin letters but are from different scripts */
const HOMOGRAPH_MAP: Record<string, string> = {
  '\u0430': 'a', '\u0435': 'e', '\u043E': 'o', '\u0440': 'p',
  '\u0441': 'c', '\u0443': 'y', '\u0445': 'x', '\u0455': 's',
  '\u0456': 'i', '\u0458': 'j', '\u04BB': 'h', '\u0501': 'd',
  '\u0261': 'g', '\u026A': 'i', '\u0142': 'l', '\u0144': 'n',
}

/* ───────────────── helpers ───────────────── */

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}

function extractDomain(url: string): string {
  try {
    let cleaned = url.trim()
    if (!/^https?:\/\//i.test(cleaned)) cleaned = 'https://' + cleaned
    const u = new URL(cleaned)
    return u.hostname.toLowerCase()
  } catch {
    // fallback: strip protocol and path manually
    return url.replace(/^https?:\/\//i, '').split('/')[0].toLowerCase()
  }
}

function hasHomographChars(domain: string): boolean {
  for (const ch of domain) {
    if (HOMOGRAPH_MAP[ch]) return true
  }
  // Check for mixed scripts (Latin + Cyrillic etc.)
  const hasLatin = /[a-z]/i.test(domain)
  const hasCyrillic = /[\u0400-\u04FF]/u.test(domain)
  const hasGreek = /[\u0370-\u03FF]/u.test(domain)
  if (hasLatin && (hasCyrillic || hasGreek)) return true
  return false
}

function isIPAddress(domain: string): boolean {
  // IPv4
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domain)) return true
  // IPv6 in brackets
  if (/^\[.*\]$/.test(domain)) return true
  return false
}

/* ───────────────── analysis engine ───────────────── */

function analyzeUrl(rawUrl: string): { verdict: Verdict; score: number; checks: CheckResult[] } {
  const checks: CheckResult[] = []
  const url = rawUrl.trim()

  /* 1. HTTPS check */
  const isHttps = /^https:\/\//i.test(url)
  const isHttp = /^http:\/\//i.test(url)
  checks.push({
    label: 'HTTPS Encryption',
    description: isHttps
      ? 'This website uses HTTPS, which means your connection is encrypted.'
      : isHttp
        ? 'This website uses HTTP (not HTTPS), which means your data is NOT encrypted. Avoid entering passwords or personal information.'
        : 'Could not determine if this site uses HTTPS. Make sure the address starts with https:// before entering any personal information.',
    severity: isHttp ? 'high' : 'low',
    passed: isHttps,
  })

  /* 2. Domain extraction for remaining checks */
  const domain = extractDomain(url)

  /* 3. Suspicious TLD */
  const tld = '.' + domain.split('.').pop()
  const isSuspiciousTld = SUSPICIOUS_TLDS.includes(tld)
  checks.push({
    label: 'Domain Extension (TLD)',
    description: isSuspiciousTld
      ? `The domain extension "${tld}" is frequently used by scam and phishing websites. Be extra cautious.`
      : `The domain extension "${tld}" is not commonly associated with scams.`,
    severity: isSuspiciousTld ? 'medium' : 'low',
    passed: !isSuspiciousTld,
  })

  /* 4. Typosquatting detection */
  const domainBase = domain.split('.').slice(0, -1).join('').replace(/[^a-z0-9]/g, '')
  let closestMatch = ''
  let closestDist = Infinity
  for (const popular of POPULAR_DOMAINS) {
    const dist = levenshtein(domainBase, popular)
    if (dist > 0 && dist <= 2 && dist < closestDist) {
      closestDist = dist
      closestMatch = popular
    }
  }
  const isTyposquat = closestMatch.length > 0
  checks.push({
    label: 'Typosquatting Detection',
    description: isTyposquat
      ? `This domain looks very similar to "${closestMatch}.com" — it may be a fake copycat site trying to trick you.`
      : 'This domain does not closely resemble any well-known website names.',
    severity: isTyposquat ? 'high' : 'low',
    passed: !isTyposquat,
  })

  /* 5. URL length */
  const isLong = url.length > 100
  checks.push({
    label: 'URL Length',
    description: isLong
      ? `This URL is ${url.length} characters long, which is unusually long. Scam sites often use very long URLs to hide suspicious parts.`
      : `This URL is a normal length (${url.length} characters).`,
    severity: isLong ? 'medium' : 'low',
    passed: !isLong,
  })

  /* 6. Excessive subdomains */
  const subdomainParts = domain.split('.')
  const hasExcessiveSubdomains = subdomainParts.length > 3
  checks.push({
    label: 'Excessive Subdomains',
    description: hasExcessiveSubdomains
      ? `This URL has ${subdomainParts.length - 2} subdomains (e.g., "a.b.c.example.com"). Scammers often use many subdomains to disguise the real website address.`
      : 'The number of subdomains looks normal.',
    severity: hasExcessiveSubdomains ? 'medium' : 'low',
    passed: !hasExcessiveSubdomains,
  })

  /* 7. IP address URL */
  const isIp = isIPAddress(domain)
  checks.push({
    label: 'IP Address URL',
    description: isIp
      ? 'This URL uses a raw IP address instead of a domain name. Legitimate websites almost always use a proper domain name like "example.com".'
      : 'This URL uses a proper domain name, which is normal.',
    severity: isIp ? 'high' : 'low',
    passed: !isIp,
  })

  /* 8. Phishing keywords */
  const urlLower = url.toLowerCase()
  const foundKeywords = PHISHING_KEYWORDS.filter(kw => urlLower.includes(kw))
  const hasPhishingKeywords = foundKeywords.length >= 2
  checks.push({
    label: 'Phishing Keywords',
    description: hasPhishingKeywords
      ? `The URL contains suspicious keywords: "${foundKeywords.join('", "')}". Scam websites often include words like "login", "verify", or "secure" to appear legitimate.`
      : 'No suspicious keyword combinations were found in the URL.',
    severity: hasPhishingKeywords ? 'medium' : 'low',
    passed: !hasPhishingKeywords,
  })

  /* 9. Homograph / look-alike characters */
  const hasHomograph = hasHomographChars(domain)
  checks.push({
    label: 'Look-Alike Characters',
    description: hasHomograph
      ? 'This URL contains characters from non-Latin alphabets that look identical to English letters (called a "homograph attack"). The site may be impersonating a legitimate website.'
      : 'No look-alike character tricks were detected in this URL.',
    severity: hasHomograph ? 'high' : 'low',
    passed: !hasHomograph,
  })

  /* Score & verdict */
  let score = 100
  for (const check of checks) {
    if (!check.passed) {
      if (check.severity === 'high') score -= 30
      else if (check.severity === 'medium') score -= 15
      else score -= 5
    }
  }
  score = Math.max(0, Math.min(100, score))

  let verdict: Verdict = 'safe'
  if (score < 40) verdict = 'dangerous'
  else if (score < 70) verdict = 'caution'

  return { verdict, score, checks }
}

/* ───────────────── verdict display config ───────────────── */

const VERDICT_CONFIG = {
  safe: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-300 dark:border-green-700',
    icon: ShieldCheck,
    iconColor: 'text-green-600',
    title: 'Looks Safe',
    description: 'This URL does not show obvious warning signs. However, always be cautious when entering personal information on any website.',
  },
  caution: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-300 dark:border-amber-700',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
    title: 'Use Caution',
    description: 'This URL has some warning signs. Do NOT enter personal information, passwords, or credit card details unless you are absolutely sure this is a legitimate website.',
  },
  dangerous: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-300 dark:border-red-700',
    icon: ShieldAlert,
    iconColor: 'text-red-600',
    title: 'Likely Unsafe',
    description: 'This URL has multiple warning signs of a dangerous or fraudulent website. Do NOT visit this site. Do NOT enter any information. Close the page immediately if you have it open.',
  },
}

const SEVERITY_ICONS = { high: XCircle, medium: AlertTriangle, low: Info }
const SEVERITY_COLORS = { high: 'text-red-600', medium: 'text-amber-600', low: 'text-blue-600' }

/* ───────────────── component ───────────────── */

export default function WebsiteSafetyChecker() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<{ verdict: Verdict; score: number; checks: CheckResult[] } | null>(null)

  const handleCheck = () => {
    if (url.trim().length < 4) return
    setResult(analyzeUrl(url))
  }

  const handleClear = () => {
    setUrl('')
    setResult(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCheck()
  }

  return (
    <div className="space-y-8">
      {/* Input */}
      <div>
        <label
          htmlFor="url-input"
          className="block text-lg font-semibold mb-3 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          Enter or paste a website address (URL):
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Globe
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: 'var(--text-secondary)' }}
            />
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setResult(null)
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g. https://www.example.com"
              className="w-full rounded-xl border pl-12 pr-4 py-4 text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-blue"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={handleCheck}
            disabled={url.trim().length < 4}
            className="px-6 py-3 rounded-xl bg-brand-blue text-white text-lg font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Check Website Safety
          </button>
          {url.length > 0 && (
            <button
              onClick={handleClear}
              className="px-6 py-3 rounded-xl border text-lg font-semibold transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Verdict Card */}
          {(() => {
            const config = VERDICT_CONFIG[result.verdict]
            const Icon = config.icon
            return (
              <div className={`rounded-xl border-2 p-6 sm:p-8 ${config.bg} ${config.border}`}>
                <div className="flex items-start gap-4">
                  <Icon className={`w-12 h-12 flex-shrink-0 ${config.iconColor}`} strokeWidth={2} />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                      <h3 className={`text-2xl font-bold font-[family-name:var(--font-heading)] ${config.iconColor}`}>
                        {config.title}
                      </h3>
                      <span className={`text-lg font-bold ${config.iconColor}`}>
                        Safety Score: {result.score}/100
                      </span>
                    </div>
                    <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {config.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Score Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Safety Score
              </span>
              <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                {result.score}/100
              </span>
            </div>
            <div className="w-full h-4 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${result.score}%`,
                  backgroundColor: result.score >= 70 ? '#22c55e' : result.score >= 40 ? '#f59e0b' : '#ef4444',
                }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-sm text-red-500">Dangerous</span>
              <span className="text-sm text-amber-500">Caution</span>
              <span className="text-sm text-green-500">Safe</span>
            </div>
          </div>

          {/* Individual Checks */}
          <div>
            <h3
              className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Detailed Check Results
            </h3>
            <div className="space-y-3">
              {result.checks.map((check, i) => {
                const SevIcon = check.passed ? CheckCircle : SEVERITY_ICONS[check.severity]
                const sevColor = check.passed ? 'text-green-600' : SEVERITY_COLORS[check.severity]
                return (
                  <div
                    key={i}
                    className="rounded-xl border p-4 sm:p-5"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                  >
                    <div className="flex items-start gap-3">
                      <SevIcon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${sevColor}`} />
                      <div>
                        <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {check.label}
                        </p>
                        <p className="text-base leading-relaxed mt-1" style={{ color: 'var(--text-secondary)' }}>
                          {check.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* What to Do */}
          <div
            className="rounded-xl border p-6 sm:p-8"
            style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
          >
            <h3
              className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              What Should I Do?
            </h3>
            <ul className="space-y-3 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {result.verdict === 'safe' ? (
                <>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" />
                    <span>The URL looks normal, but <strong>always verify</strong> you are on the correct website before entering personal information.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" />
                    <span>Look for the <strong>padlock icon</strong> in your browser&apos;s address bar — it means the connection is encrypted.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" />
                    <span>If you received this link in an unexpected email or text, <strong>type the website address yourself</strong> instead of clicking the link.</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-red-600" />
                    <span><strong>Do NOT enter</strong> any passwords, credit card numbers, or personal information on this website.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-red-600" />
                    <span><strong>Close the website</strong> if you currently have it open in your browser.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" />
                    <span>If you already entered information, <strong>change your passwords immediately</strong> and contact your bank if you shared financial details.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" />
                    <span><strong>Ask a family member or friend</strong> for a second opinion if you&apos;re not sure.</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Educational Section */}
      <div
        className="rounded-xl border p-6 sm:p-8"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <h3
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          How to Check If a Website Is Safe
        </h3>
        <div className="space-y-5 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <div className="flex items-start gap-4">
            <Lock className="w-7 h-7 flex-shrink-0 mt-0.5 text-green-600" />
            <div>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Look for HTTPS and the padlock icon
              </p>
              <p>
                Safe websites start with <strong>https://</strong> (not http://). Your browser shows a padlock icon
                next to the address. This means your connection is encrypted and harder for criminals to intercept.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Search className="w-7 h-7 flex-shrink-0 mt-0.5 text-brand-blue" />
            <div>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Check the domain name carefully
              </p>
              <p>
                Scammers create websites that look like real ones but with tiny differences.
                For example, <strong>amaz0n.com</strong> (with a zero) instead of <strong>amazon.com</strong>.
                Always double-check the spelling.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Unlock className="w-7 h-7 flex-shrink-0 mt-0.5 text-red-500" />
            <div>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Be wary of unusual web addresses
              </p>
              <p>
                Watch out for very long URLs, addresses with lots of numbers or random characters,
                and websites that use an IP address (like 192.168.1.1) instead of a proper name. These are red flags.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ExternalLink className="w-7 h-7 flex-shrink-0 mt-0.5 text-amber-500" />
            <div>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Type the address yourself instead of clicking links
              </p>
              <p>
                If you receive a link in an email or text message, <strong>do not click it</strong>. Instead,
                open your browser and type the website address yourself. This ensures you go to the real website,
                not a fake one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <strong>Note:</strong> This tool checks URL patterns for common warning signs. It does not visit the website
        or scan it for viruses. No automated tool can catch every threat. Always use your best judgment and ask
        someone you trust if you&apos;re not sure about a website.
      </p>
    </div>
  )
}
