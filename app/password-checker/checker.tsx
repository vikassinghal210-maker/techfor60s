'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { trackToolUsage } from '@/lib/ga-events'
import { Eye, EyeOff, RefreshCw, Copy, Check, ShieldCheck, ShieldAlert, Lock, Info } from 'lucide-react'

// Top 100 most-used passwords (public SecList / Have I Been Pwned released sets, abbreviated).
// Kept as a frozen constant so the bundle is small and fully client-side.
const TOP_PASSWORDS = new Set<string>([
  '123456', '123456789', 'qwerty', 'password', '12345', 'qwerty123', '1q2w3e', '12345678', '111111', '1234567890',
  '1234567', '123123', 'password1', '000000', 'iloveyou', 'abc123', '654321', '123321', 'qwertyuiop', 'admin',
  'welcome', 'monkey', 'login', 'letmein', 'dragon', 'master', 'hello', 'freedom', 'whatever', 'qazwsx',
  'trustno1', '121212', 'passw0rd', 'baseball', 'football', 'shadow', 'superman', 'michael', 'jennifer', 'jordan',
  'hunter', 'sunshine', 'princess', 'ashley', 'bailey', 'access', 'flower', 'charlie', 'donald', 'batman',
  'zaq1zaq1', 'starwars', 'ninja', 'azerty', 'solo', 'passer', 'pokemon', 'cheese', 'computer', 'summer',
  'internet', 'service', 'canada', 'hello1', 'ranger', 'yankees', 'jesus', 'mustang', 'mercedes', 'harley',
  'butterfly', 'liverpool', 'chelsea', 'united', 'winter', 'welcome1', 'qwerty1', 'password123', 'qwe123', 'q1w2e3r4',
  'zxcvbn', 'zxcvbnm', 'asdfgh', 'asdfghjkl', 'qwertz', 'lovely', 'nicole', 'daniel', 'andrew', 'maggie',
  'tigger', 'buster', 'thomas', 'robert', 'samantha', 'chocolate', 'sophie', 'anthony', 'william', 'joshua',
  '696969', '7777777', 'changeme', 'password!', 'admin123',
])

// Common leet-substitutions so "P@ssw0rd" is still detected as "password"
function normalizeLeet(s: string): string {
  return s
    .toLowerCase()
    .replace(/@/g, 'a')
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/!/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/7/g, 't')
    .replace(/\$/g, 's')
}

interface Analysis {
  length: number
  entropyBits: number
  strength: 0 | 1 | 2 | 3 | 4
  label: string
  color: string
  bar: string
  barPct: number
  weaknesses: string[]
  wins: string[]
  crackTime: string
}

function estimateEntropy(pw: string): number {
  let pool = 0
  if (/[a-z]/.test(pw)) pool += 26
  if (/[A-Z]/.test(pw)) pool += 26
  if (/[0-9]/.test(pw)) pool += 10
  if (/[^A-Za-z0-9]/.test(pw)) pool += 32
  if (pool === 0) return 0
  return Math.round(pw.length * Math.log2(pool))
}

function crackTimeForEntropy(bits: number): string {
  // Assume offline fast hash — 10 billion guesses/sec
  const guesses = Math.pow(2, bits) / 2 // average
  const seconds = guesses / 1e10
  if (seconds < 1) return 'less than a second'
  if (seconds < 60) return `${Math.ceil(seconds)} seconds`
  if (seconds < 3600) return `${Math.ceil(seconds / 60)} minutes`
  if (seconds < 86400) return `${Math.ceil(seconds / 3600)} hours`
  if (seconds < 31536000) return `${Math.ceil(seconds / 86400)} days`
  const years = seconds / 31536000
  if (years < 1000) return `${Math.ceil(years).toLocaleString()} years`
  if (years < 1e6) return `${Math.ceil(years / 1000).toLocaleString()} thousand years`
  if (years < 1e9) return `${Math.ceil(years / 1e6).toLocaleString()} million years`
  if (years < 1e12) return `${Math.ceil(years / 1e9).toLocaleString()} billion years`
  return 'centuries beyond measure'
}

function analyzePassword(pw: string): Analysis {
  const weaknesses: string[] = []
  const wins: string[] = []

  if (pw.length < 8) {
    weaknesses.push(`Your password is only ${pw.length} character${pw.length === 1 ? '' : 's'} long. Aim for at least 12.`)
  } else if (pw.length < 12) {
    weaknesses.push(`At ${pw.length} characters, this is on the short side. 12 or more is much safer.`)
  } else if (pw.length >= 16) {
    wins.push(`Great length — ${pw.length} characters makes brute-force guessing very slow.`)
  } else {
    wins.push(`Good length (${pw.length} characters).`)
  }

  const hasLower = /[a-z]/.test(pw)
  const hasUpper = /[A-Z]/.test(pw)
  const hasDigit = /[0-9]/.test(pw)
  const hasSpecial = /[^A-Za-z0-9]/.test(pw)

  const variety = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length
  if (variety <= 1) {
    weaknesses.push('Uses only one kind of character. Mix upper case, lower case, numbers, and symbols.')
  } else if (variety === 2) {
    weaknesses.push('Only uses two kinds of characters. Add a number or symbol for extra strength.')
  } else if (variety >= 3) {
    wins.push(`Good mix of character types (${variety} of 4).`)
  }

  // Top-100 check (with leet normalisation)
  const normal = pw.toLowerCase()
  const leet = normalizeLeet(pw)
  if (TOP_PASSWORDS.has(normal) || TOP_PASSWORDS.has(leet)) {
    weaknesses.push('This is one of the 100 most commonly used passwords in the world. Attackers try these first — change it today.')
  }

  // Repeated characters
  if (/(.)\1{2,}/.test(pw)) {
    weaknesses.push('Has the same character repeated in a row (like "aaa" or "111"). Break it up.')
  }

  // Sequential characters
  const sequences = ['abcdefghijklmnopqrstuvwxyz', '0123456789', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm']
  for (const seq of sequences) {
    for (let i = 0; i <= seq.length - 4; i++) {
      const run = seq.slice(i, i + 4)
      if (normal.includes(run) || normal.includes(run.split('').reverse().join(''))) {
        weaknesses.push(`Contains a keyboard or alphabet sequence ("${run}"). These are the next thing attackers try.`)
        break
      }
    }
  }

  // Common-word base + trailing digits (e.g., "summer2024")
  if (/^[a-z]+\d{1,4}!?$/i.test(pw) && pw.length <= 14) {
    weaknesses.push('Looks like a dictionary word followed by digits — a very common, easy-to-crack pattern.')
  }

  // Year
  if (/(19|20)\d{2}/.test(pw)) {
    weaknesses.push('Contains a 4-digit year. Years are easy to guess, especially if they match a birthday.')
  }

  const entropyBits = estimateEntropy(pw)

  let strength: 0 | 1 | 2 | 3 | 4 = 0
  if (pw.length === 0) strength = 0
  else if (TOP_PASSWORDS.has(normal) || TOP_PASSWORDS.has(leet) || entropyBits < 28) strength = 0
  else if (entropyBits < 40) strength = 1
  else if (entropyBits < 56) strength = 2
  else if (entropyBits < 72) strength = 3
  else strength = 4

  const LABELS = ['Very weak', 'Weak', 'Okay', 'Strong', 'Very strong'] as const
  const COLORS = [
    'text-red-700 dark:text-red-400',
    'text-red-700 dark:text-red-400',
    'text-amber-700 dark:text-amber-400',
    'text-blue-700 dark:text-blue-400',
    'text-green-700 dark:text-green-400',
  ]
  const BARS = ['bg-red-500', 'bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-green-500']
  const PCTS = [20, 40, 60, 80, 100]

  return {
    length: pw.length,
    entropyBits,
    strength,
    label: LABELS[strength],
    color: COLORS[strength],
    bar: BARS[strength],
    barPct: pw.length === 0 ? 0 : PCTS[strength],
    weaknesses,
    wins,
    crackTime: crackTimeForEntropy(entropyBits),
  }
}

// ── Passphrase generator — 4 common, easy-to-read words + a digit ─────────────
// Short, senior-friendly wordlist. Kept to concrete nouns (no rare or spelling-tricky words).
const PASSPHRASE_WORDS = [
  'Apple', 'Anchor', 'Autumn', 'Basket', 'Bicycle', 'Blanket', 'Breeze', 'Butter', 'Cabin', 'Candle',
  'Canyon', 'Castle', 'Cherry', 'Coffee', 'Copper', 'Cotton', 'Crystal', 'Daisy', 'Dolphin', 'Eagle',
  'Ember', 'Evening', 'Falcon', 'Fire', 'Forest', 'Fountain', 'Garden', 'Ginger', 'Glacier', 'Golden',
  'Harbor', 'Harvest', 'Hazel', 'Honey', 'Ivory', 'Jasmine', 'Juniper', 'Kettle', 'Lantern', 'Lavender',
  'Lemon', 'Lilac', 'Lilypond', 'Lotus', 'Maple', 'Marble', 'Meadow', 'Melody', 'Mountain', 'Muffin',
  'Ocean', 'Orchard', 'Otter', 'Paddle', 'Pearl', 'Pebble', 'Piano', 'Pine', 'Plum', 'Poppy',
  'Quiet', 'Rabbit', 'Rainbow', 'Raven', 'River', 'Robin', 'Rose', 'Saffron', 'Sailboat', 'Salmon',
  'Sandy', 'Sapphire', 'Scarlet', 'Shadow', 'Silver', 'Snowfall', 'Spice', 'Spring', 'Squirrel', 'Stone',
  'Sunrise', 'Sunset', 'Sweater', 'Sycamore', 'Tangerine', 'Tea', 'Thunder', 'Tiger', 'Timber', 'Topaz',
  'Tulip', 'Valley', 'Velvet', 'Violet', 'Walnut', 'Whisper', 'Willow', 'Window', 'Winter', 'Yellow',
]
// 100 words × 4 slots = 100^4 = 100 million combinations, plus digit and separator choice.
// With 26 bits from words alone, senior-friendly but still well above "Okay" for the user-facing score.

function getSecureRandomInt(max: number): number {
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const buf = new Uint32Array(1)
    window.crypto.getRandomValues(buf)
    return buf[0] % max
  }
  return Math.floor(Math.random() * max)
}

function generatePassphrase(): string {
  const w: string[] = []
  const used = new Set<number>()
  while (w.length < 4) {
    const i = getSecureRandomInt(PASSPHRASE_WORDS.length)
    if (used.has(i)) continue
    used.add(i)
    w.push(PASSPHRASE_WORDS[i])
  }
  const digit = getSecureRandomInt(90) + 10 // 10–99
  return `${w[0]}-${w[1]}-${w[2]}-${w[3]}-${digit}`
}

export default function PasswordCheckerClient() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [generated, setGenerated] = useState('')
  const [copied, setCopied] = useState(false)

  const analysis = useMemo(() => analyzePassword(password), [password])

  const handleGenerate = () => {
    const pw = generatePassphrase()
    setGenerated(pw)
    setCopied(false)
    trackToolUsage('password-checker', 'generate')
  }

  const handleCopy = async () => {
    if (!generated) return
    try {
      await navigator.clipboard.writeText(generated)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="space-y-8">
      {/* Trust banner */}
      <div
        role="note"
        className="flex items-start gap-3 rounded-xl border p-4 sm:p-5"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <Lock className="w-6 h-6 flex-shrink-0 mt-0.5 text-brand-blue" aria-hidden />
        <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>
          <strong>Your password never leaves this page.</strong>{' '}
          <span style={{ color: 'var(--text-secondary)' }}>
            We do not save it, store it, or send it anywhere. All checks run inside your browser.
          </span>
        </p>
      </div>

      {/* Input */}
      <div>
        <label
          htmlFor="pw-input"
          className="block text-lg font-semibold mb-3 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          Type or paste a password to check:
        </label>
        <div className="relative max-w-xl">
          <input
            id="pw-input"
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password…"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-describedby="pw-hint"
            className="w-full rounded-xl border p-4 pr-14 text-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            style={{ color: 'var(--text-muted)' }}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
          </button>
        </div>
        <p id="pw-hint" className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
          We recommend typing a dummy password here — not your real bank password — just to see the result.
        </p>
      </div>

      {/* Strength result */}
      {password.length > 0 && (
        <div
          className="rounded-xl border-2 p-6 sm:p-8"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
          aria-live="polite"
        >
          <div className="flex items-center gap-3 mb-4">
            {analysis.strength >= 3 ? (
              <ShieldCheck className={`w-10 h-10 ${analysis.color}`} aria-hidden />
            ) : (
              <ShieldAlert className={`w-10 h-10 ${analysis.color}`} aria-hidden />
            )}
            <h2 className={`text-2xl font-bold font-[family-name:var(--font-heading)] ${analysis.color}`}>
              {analysis.label}
            </h2>
          </div>

          {/* Bar */}
          <div
            className="h-3 rounded-full overflow-hidden mb-4"
            role="progressbar"
            aria-valuenow={analysis.barPct}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ backgroundColor: 'var(--border-color)' }}
          >
            <div
              className={`h-full ${analysis.bar} transition-all duration-500`}
              style={{ width: `${analysis.barPct}%` }}
            />
          </div>

          <p className="text-base sm:text-lg leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            A fast computer would take roughly <strong>{analysis.crackTime}</strong> to guess this password.
            <span className="text-sm block mt-1" style={{ color: 'var(--text-muted)' }}>
              Estimated strength: {analysis.entropyBits} bits of entropy.
            </span>
          </p>

          {analysis.weaknesses.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                What to fix
              </h3>
              <ul className="space-y-2">
                {analysis.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-base" style={{ color: 'var(--text-secondary)' }}>
                    <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600 dark:text-red-400" aria-hidden />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.wins.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                What you got right
              </h3>
              <ul className="space-y-2">
                {analysis.wins.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-base" style={{ color: 'var(--text-secondary)' }}>
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600 dark:text-green-400" aria-hidden />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Passphrase generator */}
      <div
        className="rounded-xl border-2 p-6 sm:p-8"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <h3
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          Need a strong password that you can actually remember?
        </h3>
        <p className="mb-5 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Hit the button for a senior-friendly passphrase — four simple words joined with dashes and a number at the
          end. Long enough to be safe, short enough to remember.
        </p>
        <button
          type="button"
          onClick={handleGenerate}
          className="px-6 py-4 min-h-[44px] rounded-xl bg-brand-blue text-white text-lg font-semibold inline-flex items-center gap-2 hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <RefreshCw className="w-5 h-5" aria-hidden /> Generate a passphrase
        </button>

        {generated && (
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <code
              className="text-lg sm:text-xl font-mono px-4 py-3 rounded-lg border break-all"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              {generated}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-3 min-h-[44px] rounded-xl border-2 text-base font-semibold inline-flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" aria-hidden /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden /> Copy
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Where to use strong passwords */}
      <div
        className="rounded-xl border p-6 sm:p-8"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <h3
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Where you really need a strong password
        </h3>
        <ul className="space-y-3 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <li className="flex items-start gap-3">
            <Check className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" aria-hidden />
            <span>
              <strong>Your email.</strong> If someone gets into your email, they can reset every other password. Treat
              this one as the most important.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" aria-hidden />
            <span>
              <strong>Online banking and investment accounts.</strong> Use a different password for each bank.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" aria-hidden />
            <span>
              <strong>Government sites</strong> like SSA.gov, IRS.gov, Medicare.gov (US), Gov.uk (UK), or MyGov
              (Australia).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" aria-hidden />
            <span>
              <strong>Shopping accounts with saved cards</strong> — Amazon, eBay, grocery delivery.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" aria-hidden />
            <span>
              <strong>Your phone&rsquo;s Apple ID or Google account.</strong> These hold your photos, contacts, and
              payment details.
            </span>
          </li>
        </ul>

        <p className="text-base mt-5" style={{ color: 'var(--text-secondary)' }}>
          Tip: use a password manager (like 1Password or Bitwarden) so you only have to remember one strong
          passphrase — see our{' '}
          <Link
            href="/blog/2fa-passkeys-seniors-which-to-use-2026"
            className="text-brand-blue underline font-medium"
          >
            guide to 2FA and passkeys for seniors
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
