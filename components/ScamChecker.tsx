'use client'

import { useState } from 'react'
import { trackToolUsage } from '@/lib/ga-events'
import { ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'

interface RedFlag {
  label: string
  description: string
  severity: 'high' | 'medium' | 'low'
}

type Verdict = 'safe' | 'suspicious' | 'danger'

const URGENCY_PATTERNS = [
  /act\s+now/i, /immediate(ly)?/i, /urgent(ly)?/i, /limited\s+time/i,
  /expires?\s+(today|soon|in\s+\d)/i, /last\s+chance/i, /hurry/i,
  /don'?t\s+(wait|delay|miss)/i, /right\s+away/i, /asap/i,
  /within\s+24\s+hours/i, /account\s+will\s+be\s+(closed|suspended|locked)/i,
]

const PERSONAL_INFO_PATTERNS = [
  /social\s+security/i, /ssn/i, /bank\s+account/i, /credit\s+card/i,
  /password/i, /pin\s+(number|code)/i, /date\s+of\s+birth/i,
  /mother'?s?\s+maiden/i, /routing\s+number/i, /verify\s+your\s+(identity|account)/i,
  /confirm\s+your\s+(details|information|account)/i, /update\s+your\s+payment/i,
]

const MONEY_PATTERNS = [
  /you('ve)?\s+(won|inherited)/i, /prize/i, /lottery/i, /million\s+dollars/i,
  /send\s+(money|payment|funds)/i, /wire\s+transfer/i, /gift\s+card/i,
  /bitcoin|crypto/i, /unclaimed\s+(funds|money)/i, /free\s+money/i,
  /cash\s+prize/i, /congratulations.*winner/i,
]

const THREAT_PATTERNS = [
  /warrant\s+for\s+your\s+arrest/i, /legal\s+action/i, /sued/i,
  /irs/i, /fbi/i, /arrested/i, /jail/i, /police/i,
  /your\s+account\s+has\s+been\s+(hacked|compromised|breached)/i,
  /unauthorized\s+(access|transaction|activity)/i,
  /suspicious\s+activity/i, /fraud\s+alert/i,
]

const LINK_PATTERNS = [
  /click\s+(here|this\s+link|below)/i, /bit\.ly/i, /tinyurl/i,
  /goo\.gl/i, /t\.co/i, /rb\.gy/i,
  /http:\/\//i, // non-HTTPS links
]

const IMPERSONATION_PATTERNS = [
  /apple\s+support/i, /microsoft\s+support/i, /amazon\s+customer/i,
  /geek\s+squad/i, /tech\s+support/i, /customer\s+service/i,
  /we\s+noticed\s+(unusual|suspicious)/i, /your\s+order\s+#?\d/i,
  /delivery\s+failed/i, /package\s+(could\s+not|cannot)\s+be\s+delivered/i,
  /usps|ups|fedex/i,
]

const GRAMMAR_PATTERNS = [
  /dear\s+(sir|madam|customer|user|friend|valued)/i,
  /kindly\s+(do|click|send|provide|verify|confirm|respond)/i,
  /do\s+the\s+needful/i, /revert\s+back/i,
  /yours?\s+faithfully/i,
]

function analyzeText(text: string): { verdict: Verdict; flags: RedFlag[] } {
  const flags: RedFlag[] = []

  // Check urgency
  const urgencyMatches = URGENCY_PATTERNS.filter(p => p.test(text))
  if (urgencyMatches.length > 0) {
    flags.push({
      label: 'Urgency / Pressure Tactics',
      description: 'This message tries to rush you into acting quickly. Scammers create urgency so you don\'t have time to think.',
      severity: 'high',
    })
  }

  // Check personal info requests
  const personalMatches = PERSONAL_INFO_PATTERNS.filter(p => p.test(text))
  if (personalMatches.length > 0) {
    flags.push({
      label: 'Asks for Personal Information',
      description: 'Legitimate companies will never ask for passwords, Social Security numbers, or bank details via email or text.',
      severity: 'high',
    })
  }

  // Check money / prizes
  const moneyMatches = MONEY_PATTERNS.filter(p => p.test(text))
  if (moneyMatches.length > 0) {
    flags.push({
      label: 'Money or Prize Offer',
      description: 'If you didn\'t enter a contest, you didn\'t win one. "Free money" offers are almost always scams.',
      severity: 'high',
    })
  }

  // Check threats
  const threatMatches = THREAT_PATTERNS.filter(p => p.test(text))
  if (threatMatches.length > 0) {
    flags.push({
      label: 'Threats or Scare Tactics',
      description: 'Government agencies like the IRS will never threaten you by email or text. Real alerts come by postal mail.',
      severity: 'high',
    })
  }

  // Check suspicious links
  const linkMatches = LINK_PATTERNS.filter(p => p.test(text))
  if (linkMatches.length > 0) {
    flags.push({
      label: 'Suspicious Links',
      description: 'Shortened links (bit.ly, tinyurl) or non-secure (http://) links can lead to fake websites designed to steal your information.',
      severity: 'medium',
    })
  }

  // Check impersonation
  const impersonationMatches = IMPERSONATION_PATTERNS.filter(p => p.test(text))
  if (impersonationMatches.length > 0) {
    flags.push({
      label: 'Possible Impersonation',
      description: 'This message may be pretending to be from a well-known company. Always go directly to the company\'s official website instead of clicking links.',
      severity: 'medium',
    })
  }

  // Check grammar patterns
  const grammarMatches = GRAMMAR_PATTERNS.filter(p => p.test(text))
  if (grammarMatches.length > 0) {
    flags.push({
      label: 'Unusual Language or Grammar',
      description: 'Phrases like "Dear Valued Customer" or "Kindly do the needful" are common in scam messages.',
      severity: 'low',
    })
  }

  // All-caps check
  const words = text.split(/\s+/)
  const capsWords = words.filter(w => w.length > 3 && w === w.toUpperCase() && /[A-Z]/.test(w))
  if (capsWords.length >= 3) {
    flags.push({
      label: 'Excessive CAPITAL LETTERS',
      description: 'Using lots of capital letters is a common tactic to grab your attention and create panic.',
      severity: 'low',
    })
  }

  // Determine verdict
  const highCount = flags.filter(f => f.severity === 'high').length
  const mediumCount = flags.filter(f => f.severity === 'medium').length

  let verdict: Verdict = 'safe'
  if (highCount >= 2 || (highCount >= 1 && mediumCount >= 1)) {
    verdict = 'danger'
  } else if (highCount >= 1 || mediumCount >= 2) {
    verdict = 'suspicious'
  } else if (mediumCount >= 1 || flags.length >= 2) {
    verdict = 'suspicious'
  }

  return { verdict, flags }
}

const VERDICT_CONFIG = {
  safe: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-300 dark:border-green-700',
    icon: ShieldCheck,
    iconColor: 'text-green-600',
    title: 'Looks Safe',
    description: 'We didn\'t find obvious scam indicators. However, always trust your instincts — if something feels off, it probably is.',
  },
  suspicious: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-300 dark:border-amber-700',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
    title: 'Suspicious — Be Careful',
    description: 'We found some warning signs. Do NOT click any links or reply with personal information. When in doubt, contact the company directly using a number from their official website.',
  },
  danger: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-300 dark:border-red-700',
    icon: ShieldAlert,
    iconColor: 'text-red-600',
    title: 'Likely a Scam',
    description: 'This message has multiple red flags commonly found in scams. Do NOT respond, click any links, or share any information. Delete it immediately.',
  },
}

const SEVERITY_ICONS = {
  high: XCircle,
  medium: AlertTriangle,
  low: Info,
}

const SEVERITY_COLORS = {
  high: 'text-red-600',
  medium: 'text-amber-600',
  low: 'text-blue-600',
}

export default function ScamChecker() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<{ verdict: Verdict; flags: RedFlag[] } | null>(null)

  const handleCheck = () => {
    if (text.trim().length < 10) return
    const analysis = analyzeText(text)
    setResult(analysis)
    trackToolUsage('scam-checker', analysis.verdict)
  }

  const handleClear = () => {
    setText('')
    setResult(null)
  }

  return (
    <div className="space-y-8">
      {/* Input */}
      <div>
        <label
          htmlFor="scam-input"
          className="block text-lg font-semibold mb-3 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          Paste the suspicious message below:
        </label>
        <textarea
          id="scam-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setResult(null)
          }}
          placeholder="Paste the email, text message, or social media message here..."
          rows={8}
          className="w-full rounded-xl border p-4 text-lg leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-brand-blue"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
        />
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={handleCheck}
            disabled={text.trim().length < 10}
            className="px-6 py-3 rounded-xl bg-brand-blue text-white text-lg font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check for Scams
          </button>
          {text.length > 0 && (
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
                  <div>
                    <h3 className={`text-2xl font-bold font-[family-name:var(--font-heading)] mb-2 ${config.iconColor}`}>
                      {config.title}
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {config.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Red Flags */}
          {result.flags.length > 0 && (
            <div>
              <h3
                className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Warning Signs Found ({result.flags.length})
              </h3>
              <div className="space-y-3">
                {result.flags.map((flag, i) => {
                  const SevIcon = SEVERITY_ICONS[flag.severity]
                  return (
                    <div
                      key={i}
                      className="rounded-xl border p-4 sm:p-5"
                      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                    >
                      <div className="flex items-start gap-3">
                        <SevIcon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${SEVERITY_COLORS[flag.severity]}`} />
                        <div>
                          <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {flag.label}
                          </p>
                          <p className="text-base leading-relaxed mt-1" style={{ color: 'var(--text-secondary)' }}>
                            {flag.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

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
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" />
                <span><strong>Don&apos;t reply</strong> to the message or call any phone numbers in it.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" />
                <span><strong>Don&apos;t click</strong> any links — they may lead to fake websites.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" />
                <span><strong>Contact the company directly</strong> using a number from their official website or your bill.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" />
                <span><strong>Report it:</strong> Forward scam texts to 7726 (SPAM). Report scam emails to <a href="https://reportfraud.ftc.gov" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">reportfraud.ftc.gov</a>.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" />
                <span><strong>Tell someone you trust</strong> — a family member, friend, or caregiver — if you&apos;re unsure.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <strong>Note:</strong> This tool uses pattern matching to detect common scam tactics. It cannot catch every scam,
        especially sophisticated ones. Always use your best judgment and ask someone you trust if you&apos;re unsure.
      </p>
    </div>
  )
}
