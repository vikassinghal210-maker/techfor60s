'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { trackToolUsage } from '@/lib/ga-events'
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Lock,
} from 'lucide-react'

type Severity = 'high' | 'medium' | 'low'

interface Flag {
  id: string
  label: string
  description: string
  severity: Severity
  weight: number
  matched: string[]
}

interface RuleDef {
  id: string
  label: string
  description: string
  severity: Severity
  weight: number
  patterns: RegExp[]
}

// ── Rule library — every rule fires based on regex matches against the message.
// Weights add up to the risk score (capped at 100). Severities drive UI colours.
const RULES: RuleDef[] = [
  {
    id: 'otp',
    label: 'Asking for an OTP, code, or verification number',
    description:
      'A real bank, government office, or tech company will never ask you to read back a code from a text. If you share it, scammers can log in to your account.',
    severity: 'high',
    weight: 30,
    patterns: [
      /\b(send|share|give|tell|forward|read back|read-me|reply with)\b[^.]{0,40}\b(otp|code|verification|one[-\s]?time|passcode|pin)\b/i,
      /\b(otp|verification code|one[-\s]?time password|passcode)\b[^.]{0,40}\b(is|was|\d{4,6})\b/i,
    ],
  },
  {
    id: 'urgency',
    label: 'Urgency or a ticking clock',
    description:
      'Phrases like "act within 60 minutes" or "last chance" are designed to rush you. Real companies give you time to think and check.',
    severity: 'high',
    weight: 15,
    patterns: [
      /\bact\s+(now|within|immediately|fast)\b/i,
      /\bimmediate\s+action\s+required\b/i,
      /\blast\s+chance\b/i,
      /\b(within|in\s+the\s+next)\s+\d+\s+(minutes?|hours?)\b/i,
      /\bwill\s+(expire|be\s+closed|be\s+suspended|be\s+deactivated)\s+(today|in\s+\d|within)\b/i,
      /\b(hurry|don't\s+delay|limited\s+time|urgent(ly)?)\b/i,
    ],
  },
  {
    id: 'account-locked',
    label: 'Account suspended, locked, or on hold',
    description:
      '"Your account has been suspended" is one of the most common scam hooks. If you are worried, open a new tab and sign in directly — do not click the link.',
    severity: 'high',
    weight: 15,
    patterns: [
      /\baccount\s+(has\s+been|is|was)\s+(suspended|locked|restricted|on\s+hold|frozen|deactivated)\b/i,
      /\baccess\s+(has\s+been|is)\s+(limited|restricted)\b/i,
      /\bunusual\s+(sign[-\s]?in|login|activity)\b/i,
    ],
  },
  {
    id: 'gift-card',
    label: 'Asking you to pay with gift cards or wire transfer',
    description:
      'No legitimate business, agency, or family member will ever ask you to pay with Apple, Google Play, Amazon, or Target gift cards. This is always a scam.',
    severity: 'high',
    weight: 30,
    patterns: [
      /\bgift\s+cards?\b/i,
      /\b(apple|itunes|google\s+play|amazon|target|walmart|steam)\s+cards?\b/i,
      /\bwire\s+transfer\b/i,
      /\bmoneygram|western\s+union\b/i,
      /\b(bitcoin|crypto(currency)?|usdt|ethereum)\s+(payment|wallet|atm)\b/i,
    ],
  },
  {
    id: 'threat',
    label: 'Threats — arrest, deportation, legal action',
    description:
      'Real government agencies do not threaten arrest by text or email. They send letters. Hang up and report these messages.',
    severity: 'high',
    weight: 20,
    patterns: [
      /\b(warrant|arrest|arrested|jail|prison)\b/i,
      /\b(legal\s+action|lawsuit|sue(d)?|court\s+summons)\b/i,
      /\b(deport(ed|ation)?|removal\s+from\s+the\s+country)\b/i,
      /\b(police|sheriff|federal\s+agent)\s+(will|are|is)\s+(coming|on\s+their\s+way|sent)\b/i,
    ],
  },
  {
    id: 'agency-sms',
    label: 'Claims to be from the IRS, Medicare, HMRC, or ATO by text',
    description:
      'The IRS, Medicare, UK HMRC, and Australian ATO do not send texts asking for money, passwords, or links. This is a red flag on its own.',
    severity: 'high',
    weight: 20,
    patterns: [
      /\b(irs|internal\s+revenue\s+service)\b/i,
      /\bmedicare\b/i,
      /\bhmrc\b|\bhm\s+revenue\b/i,
      /\bato\b|\baustralian\s+taxation\s+office\b/i,
      /\b(social\s+security\s+administration|ssa)\b/i,
    ],
  },
  {
    id: 'shortener',
    label: 'Link uses a URL shortener or suspicious domain',
    description:
      'bit.ly, tinyurl, and random subdomains hide where the link actually goes. Real companies send links to their real website (like chase.com).',
    severity: 'medium',
    weight: 15,
    patterns: [
      /\b(bit\.ly|tinyurl\.com|t\.co|goo\.gl|rb\.gy|is\.gd|ow\.ly|buff\.ly|cutt\.ly|shorturl\.at)\b/i,
      // Long random-looking hostnames before a tld
      /https?:\/\/[a-z0-9-]{10,}\.(xyz|top|click|link|info|buzz|live|zip|mov|work|gq|tk|ml|cf|ga)\b/i,
      // Brand name buried as a subdomain of an unrelated domain
      /https?:\/\/(www\.)?[a-z0-9-]+\.(amazon|apple|microsoft|paypal|netflix|fedex|ups|usps|chase|wells|bank)[a-z0-9-]*\.[a-z]{2,}/i,
    ],
  },
  {
    id: 'generic-greeting',
    label: 'Generic greeting ("Dear Customer", "Dear User")',
    description:
      'Your bank and the companies you actually use will address you by name. Generic greetings usually mean the sender does not know who you are.',
    severity: 'medium',
    weight: 8,
    patterns: [
      /\bdear\s+(customer|user|client|sir\/?madam|valued\s+member|account\s+holder|friend)\b/i,
      /\bhello\s+dear\b/i,
    ],
  },
  {
    id: 'personal-info',
    label: 'Asks for personal details (SSN, bank, card number)',
    description:
      'No legitimate company asks for your Social Security Number, full card number, PIN, or password by text or email.',
    severity: 'high',
    weight: 20,
    patterns: [
      /\bsocial\s+security\s+(number|#)?\b|\bssn\b/i,
      /\b(bank\s+account|routing\s+number|account\s+number)\b/i,
      /\b(credit\s+card|debit\s+card)\s+(number|details)\b/i,
      /\b(pin|password)\b[^.]{0,20}\b(verify|confirm|enter|provide)\b/i,
      /\bmother'?s?\s+maiden\s+name\b/i,
      /\bdate\s+of\s+birth\b/i,
    ],
  },
  {
    id: 'punctuation',
    label: 'Excessive ALL CAPS or !!!',
    description:
      'Real companies do not shout. Lots of capital letters or exclamation points are a sign the message is trying to panic you.',
    severity: 'low',
    weight: 5,
    patterns: [
      /!{3,}/,
      /\?{3,}/,
    ],
  },
  {
    id: 'prize',
    label: 'Prize, lottery, or "you have won"',
    description:
      'If you did not enter a contest, you did not win one. Messages about unclaimed prizes, lotteries, or inheritances are almost always scams.',
    severity: 'medium',
    weight: 12,
    patterns: [
      /\byou\s+(have|'?ve)\s+won\b/i,
      /\b(lottery|jackpot|sweepstakes)\b/i,
      /\bclaim\s+your\s+(prize|reward|gift)\b/i,
      /\bunclaimed\s+(funds|money|inheritance)\b/i,
      /\b(congratulations|congrats)[^.]{0,30}\bwinner\b/i,
    ],
  },
  {
    id: 'delivery',
    label: 'Surprise delivery or package issue',
    description:
      'USPS, FedEx, UPS, Royal Mail, and Australia Post do not charge "redelivery fees" by text. Open the real carrier\'s app or website to check any package.',
    severity: 'medium',
    weight: 10,
    patterns: [
      /\b(package|parcel|shipment|delivery)\s+(could\s+not|cannot|can't)\s+be\s+delivered\b/i,
      /\b(redelivery|re-delivery)\s+(fee|charge)\b/i,
      /\b(usps|ups|fedex|dhl|royal\s+mail|australia\s+post)\b[^.]{0,40}\b(pending|hold|failed)\b/i,
      /\btrack\s+your\s+package\s+here\b/i,
    ],
  },
]

function analyze(text: string) {
  const flags: Flag[] = []
  let score = 0
  const trimmed = text.trim()

  // ALL CAPS detection — separate from regex rules
  const letters = trimmed.replace(/[^a-zA-Z]/g, '')
  if (letters.length >= 20) {
    const caps = letters.replace(/[^A-Z]/g, '').length
    const ratio = caps / letters.length
    if (ratio > 0.6) {
      flags.push({
        id: 'all-caps',
        label: 'Message is mostly IN CAPITAL LETTERS',
        description:
          'Writing in all caps is a classic scam tactic — it is designed to grab your attention and panic you.',
        severity: 'low',
        weight: 5,
        matched: [],
      })
      score += 5
    }
  }

  for (const rule of RULES) {
    const matched: string[] = []
    for (const pattern of rule.patterns) {
      const m = trimmed.match(pattern)
      if (m && m[0]) matched.push(m[0])
    }
    if (matched.length > 0) {
      flags.push({
        id: rule.id,
        label: rule.label,
        description: rule.description,
        severity: rule.severity,
        weight: rule.weight,
        matched: Array.from(new Set(matched)).slice(0, 3),
      })
      score += rule.weight
    }
  }

  score = Math.min(100, score)

  let verdict: 'safe' | 'caution' | 'risky' | 'danger'
  if (score >= 60) verdict = 'danger'
  else if (score >= 30) verdict = 'risky'
  else if (score >= 10) verdict = 'caution'
  else verdict = 'safe'

  return { verdict, score, flags }
}

const VERDICT_STYLE = {
  safe: {
    title: 'No strong scam signals found',
    body: 'We did not spot the usual scam patterns in this message. Still, trust your gut — if something feels off, ask someone you know before clicking or replying.',
    icon: ShieldCheck,
    color: 'text-green-700 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-300 dark:border-green-700',
    bar: 'bg-green-500',
  },
  caution: {
    title: 'Treat this with caution',
    body: 'There are a few small warning signs. Do not click links yet. If the message claims to be from a company you use, log in to their real website in a separate tab to check.',
    icon: Info,
    color: 'text-blue-700 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-300 dark:border-blue-700',
    bar: 'bg-blue-500',
  },
  risky: {
    title: 'Looks suspicious — do not click anything',
    body: 'This message has several classic scam traits. Do not reply, do not call any number in the message, and do not share any personal details.',
    icon: AlertTriangle,
    color: 'text-amber-700 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-300 dark:border-amber-700',
    bar: 'bg-amber-500',
  },
  danger: {
    title: 'Very likely a scam — delete it',
    body: 'This message has multiple strong scam indicators. Delete it. Do not click, reply, or call back. If money or information has already been shared, see the "What to do next" box below.',
    icon: ShieldAlert,
    color: 'text-red-700 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-300 dark:border-red-700',
    bar: 'bg-red-500',
  },
} as const

const SEVERITY_ICON = {
  high: XCircle,
  medium: AlertTriangle,
  low: Info,
}

const SEVERITY_COLOR = {
  high: 'text-red-600 dark:text-red-400',
  medium: 'text-amber-600 dark:text-amber-400',
  low: 'text-blue-600 dark:text-blue-400',
}

export default function ScamMessageCheckerClient() {
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const result = useMemo(() => (submitted && text.trim().length >= 10 ? analyze(text) : null), [submitted, text])

  const handleCheck = () => {
    if (text.trim().length < 10) return
    setSubmitted(true)
    const r = analyze(text)
    trackToolUsage('scam-message-checker', r.verdict)
  }

  const handleClear = () => {
    setText('')
    setSubmitted(false)
  }

  const style = result ? VERDICT_STYLE[result.verdict] : null
  const VerdictIcon = style?.icon ?? ShieldCheck

  return (
    <div className="space-y-8">
      {/* Trust banner — reassure user message stays local */}
      <div
        role="note"
        className="flex items-start gap-3 rounded-xl border p-4 sm:p-5"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <Lock className="w-6 h-6 flex-shrink-0 mt-0.5 text-brand-blue" aria-hidden />
        <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>
          <strong>Your message never leaves this page.</strong>{' '}
          <span style={{ color: 'var(--text-secondary)' }}>
            All analysis runs locally in your browser. We do not save, send, or store what you paste.
          </span>
        </p>
      </div>

      {/* Input */}
      <div>
        <label
          htmlFor="scam-msg-input"
          className="block text-lg font-semibold mb-3 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          Paste the suspicious text message, email, or social media message:
        </label>
        <textarea
          id="scam-msg-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setSubmitted(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleCheck()
          }}
          placeholder="Example: Dear Customer, your account has been suspended. Please verify within 60 minutes at bit.ly/xyz123..."
          rows={8}
          aria-describedby="scam-msg-hint"
          className="w-full rounded-xl border p-4 text-lg leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-brand-blue"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
        />
        <p id="scam-msg-hint" className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
          Paste at least a sentence or two so the checker has enough to analyse.
        </p>

        <div className="flex flex-wrap gap-3 mt-5">
          <button
            type="button"
            onClick={handleCheck}
            disabled={text.trim().length < 10}
            className="px-6 py-4 min-h-[44px] rounded-xl bg-brand-blue text-white text-lg font-semibold transition-opacity hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check this message
          </button>
          {text.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-4 min-h-[44px] rounded-xl border-2 text-lg font-semibold transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Result */}
      {result && style && (
        <div className="space-y-6" aria-live="polite">
          {/* Verdict card */}
          <div className={`rounded-xl border-2 p-6 sm:p-8 ${style.bg} ${style.border}`}>
            <div className="flex items-start gap-4">
              <VerdictIcon className={`w-12 h-12 flex-shrink-0 ${style.color}`} strokeWidth={2} aria-hidden />
              <div className="flex-1 min-w-0">
                <h2 className={`text-2xl font-bold font-[family-name:var(--font-heading)] mb-2 ${style.color}`}>
                  {style.title}
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {style.body}
                </p>
                <div className="mt-5">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                      Risk score
                    </span>
                    <span className={`text-2xl font-bold ${style.color}`}>{result.score} / 100</span>
                  </div>
                  <div
                    className="h-3 rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={result.score}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ backgroundColor: 'var(--border-color)' }}
                  >
                    <div
                      className={`h-full ${style.bar} transition-all duration-500`}
                      style={{ width: `${result.score}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flags */}
          {result.flags.length > 0 && (
            <div>
              <h3
                className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Warning signs found ({result.flags.length})
              </h3>
              <ul className="space-y-3">
                {result.flags.map((flag) => {
                  const SevIcon = SEVERITY_ICON[flag.severity]
                  return (
                    <li
                      key={flag.id}
                      className="rounded-xl border p-4 sm:p-5"
                      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                    >
                      <div className="flex items-start gap-3">
                        <SevIcon
                          className={`w-6 h-6 flex-shrink-0 mt-0.5 ${SEVERITY_COLOR[flag.severity]}`}
                          aria-hidden
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {flag.label}
                          </p>
                          <p className="text-base leading-relaxed mt-1" style={{ color: 'var(--text-secondary)' }}>
                            {flag.description}
                          </p>
                          {flag.matched.length > 0 && (
                            <p className="text-sm mt-2 italic break-words" style={{ color: 'var(--text-muted)' }}>
                              Matched:{' '}
                              {flag.matched.map((m, i) => (
                                <span key={i}>
                                  {i > 0 && ', '}
                                  <code
                                    className="px-1.5 py-0.5 rounded border not-italic"
                                    style={{
                                      backgroundColor: 'var(--bg-tertiary)',
                                      borderColor: 'var(--border-color)',
                                    }}
                                  >
                                    {m.length > 60 ? m.slice(0, 57) + '…' : m}
                                  </code>
                                </span>
                              ))}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* What to do next */}
          <div
            className="rounded-xl border p-6 sm:p-8"
            style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
          >
            <h3
              className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              What to do next
            </h3>
            <ul className="space-y-3 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" aria-hidden />
                <span>
                  <strong>Do not click any link</strong> in the message — even the "unsubscribe" one.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" aria-hidden />
                <span>
                  <strong>Do not call back</strong> any phone number in the message. Look up the real number on the
                  company&rsquo;s official website or your last bill.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" aria-hidden />
                <span>
                  <strong>Report it.</strong> US: forward scam texts to <strong>7726 (SPAM)</strong> and file at{' '}
                  <a
                    href="https://reportfraud.ftc.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue underline"
                  >
                    reportfraud.ftc.gov
                  </a>
                  . UK: forward to <strong>7726</strong> and report at{' '}
                  <a
                    href="https://www.actionfraud.police.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue underline"
                  >
                    actionfraud.police.uk
                  </a>
                  . Australia: report to{' '}
                  <a
                    href="https://www.scamwatch.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue underline"
                  >
                    scamwatch.gov.au
                  </a>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" aria-hidden />
                <span>
                  <strong>Tell someone you trust.</strong> A second pair of eyes catches things you might miss.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" aria-hidden />
                <span>
                  <strong>Already clicked or shared info?</strong> Change the password on that account, call your bank
                  if money moved, and place a free fraud alert with Equifax, Experian, or TransUnion.
                </span>
              </li>
            </ul>

            <div className="mt-5 text-base" style={{ color: 'var(--text-secondary)' }}>
              Want to go deeper? Read{' '}
              <Link href="/blog/irs-impersonation-scam-how-to-spot-2026" className="text-brand-blue underline font-medium">
                how to spot an IRS impersonation scam
              </Link>
              .
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
