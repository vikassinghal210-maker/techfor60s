'use client'

import { useState } from 'react'
import {
  Phone,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Search,
  Info,
  ExternalLink,
  Ban,
  PhoneOff,
  CircleAlert,
} from 'lucide-react'

type RiskLevel = 'safe' | 'suspicious' | 'danger' | 'unknown'

interface AnalysisResult {
  riskLevel: RiskLevel
  warnings: string[]
  tips: string[]
}

/* ── Known scam area codes and patterns ─────────────────────────────── */

const PREMIUM_RATE_CODES = ['900', '976', '242', '246', '284', '345', '441', '473', '649', '664', '721', '758', '767', '784', '809', '829', '849', '868', '869', '876']

const SPOOFED_GOVT_PREFIXES = [
  { prefix: '202', label: 'Washington D.C. — commonly spoofed as SSA, IRS, or government agencies' },
  { prefix: '800', label: 'Toll-free — often spoofed by fake IRS, Medicare, and tech support scams' },
  { prefix: '888', label: 'Toll-free — commonly used in fake bank and credit card scams' },
  { prefix: '877', label: 'Toll-free — frequently spoofed by robocallers' },
  { prefix: '866', label: 'Toll-free — used in fake warranty and insurance scams' },
]

const KNOWN_SCAM_PATTERNS = [
  {
    pattern: 'Calls from 202-XXX-XXXX claiming to be the Social Security Administration',
    description: 'The SSA will never call you threatening to suspend your Social Security number. They primarily contact you by mail.',
    severity: 'high' as const,
  },
  {
    pattern: 'Calls from 800-XXX-XXXX claiming to be the IRS',
    description: 'The IRS will never call to demand immediate payment or threaten arrest. They always send written notices first.',
    severity: 'high' as const,
  },
  {
    pattern: 'Calls from +1-876-XXX-XXXX (Jamaica) about lottery winnings',
    description: 'Jamaican lottery scams tell you that you have won a prize but must pay taxes or fees upfront. This is always a scam.',
    severity: 'high' as const,
  },
  {
    pattern: 'Calls from 900 or 976 numbers charging premium rates',
    description: 'These are premium-rate numbers that charge very high per-minute fees. Never call them back.',
    severity: 'high' as const,
  },
  {
    pattern: 'Calls from your own phone number (neighbor spoofing)',
    description: 'Scammers can make it look like a call is coming from your own number or a number very similar to yours. This is called neighbor spoofing.',
    severity: 'medium' as const,
  },
  {
    pattern: 'One-ring calls from international numbers (Wangiri scam)',
    description: 'The phone rings once and hangs up, hoping you will call back a premium-rate international number.',
    severity: 'high' as const,
  },
  {
    pattern: 'Calls claiming to be Medicare offering a "free" back brace or DNA test',
    description: 'Medicare will never call you unsolicited to offer free medical equipment. These scams steal your Medicare ID for billing fraud.',
    severity: 'high' as const,
  },
  {
    pattern: 'Calls from "Microsoft" or "Apple" about a virus on your computer',
    description: 'Tech companies will never call you about problems with your device. These callers want remote access to steal your information.',
    severity: 'high' as const,
  },
  {
    pattern: 'Calls from your "bank" asking to verify your account number or PIN',
    description: 'Your bank will never ask for your full account number, PIN, or password over the phone. Hang up and call the number on your card.',
    severity: 'high' as const,
  },
  {
    pattern: 'Calls claiming a grandchild is in jail and needs bail money',
    description: 'The grandparent scam uses urgency and emotion. Always hang up and call your grandchild directly using a number you already have.',
    severity: 'high' as const,
  },
]

/* ── Phone number analysis ──────────────────────────────────────────── */

function normalizePhone(input: string): string {
  return input.replace(/[^0-9+]/g, '')
}

function analyzePhoneNumber(rawInput: string): AnalysisResult {
  const digits = normalizePhone(rawInput)
  const warnings: string[] = []
  const tips: string[] = []

  // Empty check
  if (digits.length === 0) {
    return { riskLevel: 'unknown', warnings: ['Please enter a phone number to check.'], tips: [] }
  }

  // Too short
  if (digits.length < 7) {
    warnings.push('This number is too short to be a valid phone number.')
    return { riskLevel: 'suspicious', warnings, tips: ['Valid US numbers have 10 digits (or 11 with a leading 1).'] }
  }

  // Too many digits
  if (digits.replace(/^\+/, '').length > 15) {
    warnings.push('This number has too many digits to be a valid phone number.')
    return { riskLevel: 'suspicious', warnings, tips: ['Phone numbers should not exceed 15 digits.'] }
  }

  // Extract area code
  let areaCode = ''
  const cleaned = digits.replace(/^\+?1/, '') // strip country code
  if (cleaned.length >= 10) {
    areaCode = cleaned.substring(0, 3)
  } else if (cleaned.length >= 7) {
    areaCode = cleaned.substring(0, 3)
  }

  // Check premium rate codes
  if (areaCode && PREMIUM_RATE_CODES.includes(areaCode)) {
    warnings.push(`Area code ${areaCode} is associated with premium-rate or international numbers frequently used in scams.`)
    warnings.push('Calling this number back could result in very high charges on your phone bill.')
    tips.push('Never call back an unfamiliar number with this area code.')
    tips.push('If you did not initiate the call, it is very likely a scam.')
    return { riskLevel: 'danger', warnings, tips }
  }

  // Check spoofed government prefixes
  const govMatch = SPOOFED_GOVT_PREFIXES.find(g => g.prefix === areaCode)
  if (govMatch) {
    warnings.push(`Area code ${areaCode}: ${govMatch.label}.`)
    warnings.push('Government agencies like the SSA, IRS, and Medicare almost never make unsolicited phone calls.')
    tips.push('If someone claims to be from a government agency, hang up and call the official number from the agency website.')
    tips.push('The SSA official number is 1-800-772-1213. The IRS number is 1-800-829-1040.')
    return { riskLevel: 'suspicious', warnings, tips }
  }

  // Check for international numbers (starts with + and not +1)
  if (digits.startsWith('+') && !digits.startsWith('+1')) {
    warnings.push('This appears to be an international number. Many phone scams originate from overseas numbers.')
    tips.push('Be extra cautious with unexpected calls from international numbers.')
    tips.push('Never call back an international number you do not recognize — you may be charged premium rates.')
    return { riskLevel: 'suspicious', warnings, tips }
  }

  // Looks normal
  tips.push('This number does not match any known scam patterns in our database, but that does not guarantee it is safe.')
  tips.push('If the caller asked for personal information, money, or gift cards, it is likely a scam regardless of the number.')
  tips.push('You can search this number on the FTC complaint database or use your phone carrier\'s spam-blocking features.')
  return { riskLevel: 'safe', warnings, tips }
}

/* ── Component ──────────────────────────────────────────────────────── */

export default function ScamPhoneLookup() {
  const [phoneInput, setPhoneInput] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [showPatterns, setShowPatterns] = useState(false)

  function handleCheck() {
    const analysis = analyzePhoneNumber(phoneInput)
    setResult(analysis)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleCheck()
  }

  const riskColors: Record<RiskLevel, { bg: string; border: string; icon: React.ReactNode }> = {
    danger: {
      bg: 'rgba(239, 68, 68, 0.1)',
      border: '#ef4444',
      icon: <ShieldAlert size={32} className="text-red-500" />,
    },
    suspicious: {
      bg: 'rgba(245, 158, 11, 0.1)',
      border: '#f59e0b',
      icon: <AlertTriangle size={32} className="text-amber-500" />,
    },
    safe: {
      bg: 'rgba(34, 197, 94, 0.1)',
      border: '#22c55e',
      icon: <ShieldCheck size={32} className="text-green-500" />,
    },
    unknown: {
      bg: 'var(--bg-secondary)',
      border: 'var(--border-color)',
      icon: <Info size={32} style={{ color: 'var(--text-secondary)' }} />,
    },
  }

  const riskLabels: Record<RiskLevel, string> = {
    danger: 'High Risk — Likely a Scam Number',
    suspicious: 'Caution — This Number Has Scam Characteristics',
    safe: 'No Known Scam Patterns Found',
    unknown: 'Enter a Number to Check',
  }

  return (
    <div className="space-y-8">
      {/* ── Search Input ──────────────────────────────────────────── */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <label
          htmlFor="phone-input"
          className="block text-lg font-semibold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          <Phone size={20} className="inline mr-2 text-brand-blue" />
          Enter a Phone Number to Check
        </label>
        <p className="text-lg mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Type or paste the phone number that called you. We&apos;ll check it against known scam
          patterns. <strong>Nothing is sent to any server</strong> — everything stays on your device.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="phone-input"
            type="tel"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 202-555-1234 or +1-800-555-0000"
            className="flex-1 rounded-lg border px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            aria-describedby="phone-privacy-note"
          />
          <button
            onClick={handleCheck}
            className="bg-brand-blue text-white px-6 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Search size={20} />
            Check Number
          </button>
        </div>
        <p id="phone-privacy-note" className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
          🔒 100% private — this tool runs entirely in your browser. No data is sent anywhere.
        </p>
      </div>

      {/* ── Result ────────────────────────────────────────────────── */}
      {result && (
        <div
          className="rounded-xl border p-6"
          style={{
            backgroundColor: riskColors[result.riskLevel].bg,
            borderColor: riskColors[result.riskLevel].border,
          }}
        >
          <div className="flex items-start gap-4 mb-4">
            {riskColors[result.riskLevel].icon}
            <div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {riskLabels[result.riskLevel]}
              </h3>
              {phoneInput && (
                <p className="text-lg mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Number checked: <strong>{phoneInput}</strong>
                </p>
              )}
            </div>
          </div>

          {result.warnings.length > 0 && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                <CircleAlert size={18} className="inline mr-1 text-red-500" />
                Warnings
              </h4>
              <ul className="space-y-2">
                {result.warnings.map((w, i) => (
                  <li key={i} className="text-lg leading-relaxed flex items-start gap-2" style={{ color: 'var(--text-primary)' }}>
                    <span className="text-red-500 mt-1">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.tips.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                <Info size={18} className="inline mr-1 text-brand-blue" />
                What You Should Do
              </h4>
              <ul className="space-y-2">
                {result.tips.map((t, i) => (
                  <li key={i} className="text-lg leading-relaxed flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <span className="text-brand-blue mt-1">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ── Common Scam Number Patterns Database ──────────────────── */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <button
          onClick={() => setShowPatterns(!showPatterns)}
          className="w-full flex items-center justify-between text-left"
        >
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            <ShieldAlert size={22} className="inline mr-2 text-red-500" />
            Common Scam Phone Number Patterns
          </h3>
          <span className="text-brand-blue text-2xl transition-transform" style={{ transform: showPatterns ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▾
          </span>
        </button>
        <p className="text-lg mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          These are the most frequently reported scam call patterns. Click above to {showPatterns ? 'hide' : 'show'} the full list.
        </p>

        {showPatterns && (
          <div className="mt-4 space-y-4">
            {KNOWN_SCAM_PATTERNS.map((scam, i) => (
              <div
                key={i}
                className="rounded-lg border p-4"
                style={{
                  borderColor: scam.severity === 'high' ? '#ef4444' : '#f59e0b',
                  backgroundColor: scam.severity === 'high' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(245, 158, 11, 0.05)',
                }}
              >
                <p className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {scam.severity === 'high' ? '🚨' : '⚠️'} {scam.pattern}
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {scam.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Caller ID Spoofing Explained ──────────────────────────── */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          <Info size={22} className="inline mr-2 text-brand-blue" />
          What Is Caller ID Spoofing?
        </h3>
        <div className="space-y-3">
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <strong>Caller ID spoofing</strong> is when a scammer deliberately changes the phone number
            that appears on your caller ID. They can make it look like the call is coming from your
            bank, a government agency, or even your own phone number.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            This means that <strong>you cannot trust caller ID alone</strong> to determine if a call is
            legitimate. Even if your phone shows &quot;Social Security Administration&quot; or your
            bank&apos;s name, the caller may be a scammer.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <strong>What to do:</strong> If someone calls claiming to be from a company or government
            agency, hang up and call the organization directly using the official number from their
            website or from your account statement. Never use a phone number the caller gives you.
          </p>
        </div>
      </div>

      {/* ── Tips for Blocking Scam Calls ──────────────────────────── */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          <PhoneOff size={22} className="inline mr-2 text-brand-blue" />
          How to Block Scam Calls
        </h3>
        <div className="space-y-4">
          {[
            {
              title: 'Register on the Do Not Call List',
              desc: 'Add your number to the National Do Not Call Registry at donotcall.gov or by calling 1-888-382-1222. This stops legitimate telemarketers (but not scammers).',
            },
            {
              title: 'Use Your Phone\'s Built-In Spam Blocking',
              desc: 'Both iPhone and Android have built-in features to silence unknown callers. On iPhone, go to Settings > Phone > Silence Unknown Callers. On Android, open the Phone app > Settings > Caller ID & Spam.',
            },
            {
              title: 'Ask Your Phone Carrier for Free Scam Blocking',
              desc: 'Most carriers offer free scam-blocking tools: T-Mobile Scam Shield, AT&T ActiveArmor, and Verizon Call Filter. Call your carrier to activate these.',
            },
            {
              title: 'Never Press Buttons or Say "Yes"',
              desc: 'If a robocall asks you to press a number to be removed from a list, hang up. Pressing buttons confirms your number is active and leads to more calls.',
            },
            {
              title: 'Block Individual Numbers',
              desc: 'After receiving a scam call, block that number on your phone. On iPhone, tap the number and select "Block this Caller." On Android, tap the number and select "Block."',
            },
            {
              title: 'Consider a Call-Blocking App',
              desc: 'Apps like Nomorobo, Hiya, and RoboKiller can automatically screen and block scam calls. Many offer free versions for basic protection.',
            },
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-lg"
              >
                {i + 1}
              </span>
              <div>
                <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {tip.title}
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Report Scam Numbers ───────────────────────────────────── */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          <Ban size={22} className="inline mr-2 text-red-500" />
          Report a Scam Phone Number
        </h3>
        <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          Reporting scam numbers helps protect others. Here are the official places to file a report:
        </p>
        <div className="space-y-3">
          {[
            {
              name: 'FTC (Federal Trade Commission)',
              url: 'https://reportfraud.ftc.gov/',
              desc: 'The main place to report any scam or fraud in the United States.',
            },
            {
              name: 'Do Not Call Registry Complaints',
              url: 'https://www.donotcall.gov/report.html',
              desc: 'Report unwanted calls if your number is on the Do Not Call list.',
            },
            {
              name: 'FCC (Federal Communications Commission)',
              url: 'https://consumercomplaints.fcc.gov/',
              desc: 'Report spoofed calls, robocalls, and phone carrier issues.',
            },
            {
              name: 'Your State Attorney General',
              url: 'https://www.naag.org/find-my-ag/',
              desc: 'Many states have their own fraud reporting systems. Find your state\'s AG office.',
            },
          ].map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border p-4 hover:opacity-80 transition-opacity"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}
            >
              <p className="text-lg font-semibold text-brand-blue flex items-center gap-2">
                {link.name}
                <ExternalLink size={16} />
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {link.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
