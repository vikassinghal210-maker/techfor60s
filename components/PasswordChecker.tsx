'use client'

import { useState, useMemo } from 'react'
import { Eye, EyeOff, RefreshCw, Copy, Check, ShieldCheck, ShieldAlert } from 'lucide-react'

function analyzePassword(pw: string) {
  const checks = {
    length: pw.length >= 12,
    uppercase: /[A-Z]/.test(pw),
    lowercase: /[a-z]/.test(pw),
    numbers: /[0-9]/.test(pw),
    special: /[^A-Za-z0-9]/.test(pw),
    noCommon: !/(password|123456|qwerty|abc123|letmein|welcome|admin|login)/i.test(pw),
    noRepeats: !/(.)\1{2,}/.test(pw),
  }

  const score = Object.values(checks).filter(Boolean).length
  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak'
  let label = ''
  let color = ''
  let bgColor = ''

  if (score <= 2 || pw.length < 6) {
    strength = 'weak'
    label = 'Weak — Easy to Guess'
    color = 'text-red-600'
    bgColor = 'bg-red-500'
  } else if (score <= 4) {
    strength = 'fair'
    label = 'Fair — Could Be Better'
    color = 'text-amber-600'
    bgColor = 'bg-amber-500'
  } else if (score <= 5) {
    strength = 'good'
    label = 'Good — Pretty Strong'
    color = 'text-blue-600'
    bgColor = 'bg-blue-500'
  } else {
    strength = 'strong'
    label = 'Strong — Well Done!'
    color = 'text-green-600'
    bgColor = 'bg-green-500'
  }

  const pct = Math.min(100, Math.round((score / 7) * 100))

  return { checks, score, strength, label, color, bgColor, pct }
}

const ADJECTIVES = ['Happy', 'Lucky', 'Brave', 'Sunny', 'Gentle', 'Clever', 'Bright', 'Swift', 'Calm', 'Kind', 'Proud', 'Wise', 'Bold', 'Warm', 'Cool']
const NOUNS = ['Tiger', 'Eagle', 'River', 'Garden', 'Mountain', 'Ocean', 'Forest', 'Sunset', 'Bridge', 'Meadow', 'Castle', 'Cloud', 'Maple', 'Willow', 'Harbor']

function generatePassword(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)]
  const num = Math.floor(Math.random() * 90) + 10
  const specials = ['!', '@', '#', '$', '&', '*']
  const spec = specials[Math.floor(Math.random() * specials.length)]
  return `${adj}${noun}${num}${spec}`
}

const CHECK_LABELS: Record<string, string> = {
  length: 'At least 12 characters long',
  uppercase: 'Has uppercase letters (A-Z)',
  lowercase: 'Has lowercase letters (a-z)',
  numbers: 'Has numbers (0-9)',
  special: 'Has special characters (!@#$)',
  noCommon: 'Not a commonly used password',
  noRepeats: 'No repeated characters (aaa)',
}

export default function PasswordChecker() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [generated, setGenerated] = useState('')
  const [copied, setCopied] = useState(false)

  const analysis = useMemo(() => password ? analyzePassword(password) : null, [password])

  const handleGenerate = () => {
    const pw = generatePassword()
    setGenerated(pw)
    setCopied(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generated)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input')
      input.value = generated
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-8">
      {/* Password Input */}
      <div>
        <label
          htmlFor="pw-input"
          className="block text-lg font-semibold mb-3 font-[family-name:var(--font-heading)]"
          style={{ color: 'var(--text-primary)' }}
        >
          Type or paste a password to check:
        </label>
        <div className="relative max-w-lg">
          <input
            id="pw-input"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter a password..."
            className="w-full rounded-xl border p-4 pr-14 text-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
            style={{ color: 'var(--text-muted)' }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
          </button>
        </div>
        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
          Your password never leaves your device — it is checked right here in your browser.
        </p>
      </div>

      {/* Strength Result */}
      {analysis && password.length > 0 && (
        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            {analysis.strength === 'strong' ? (
              <ShieldCheck className={`w-8 h-8 ${analysis.color}`} />
            ) : (
              <ShieldAlert className={`w-8 h-8 ${analysis.color}`} />
            )}
            <h3 className={`text-xl font-bold font-[family-name:var(--font-heading)] ${analysis.color}`}>
              {analysis.label}
            </h3>
          </div>

          {/* Strength Bar */}
          <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 mb-6 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${analysis.bgColor}`}
              style={{ width: `${analysis.pct}%` }}
            />
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            {Object.entries(analysis.checks).map(([key, passed]) => (
              <div key={key} className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${passed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                  {passed ? '✓' : ''}
                </span>
                <span
                  className="text-base"
                  style={{ color: passed ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  {CHECK_LABELS[key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Password Generator */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <h3
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          Need a Strong Password?
        </h3>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
          We&apos;ll create a memorable, strong password for you. It combines two words
          with a number and symbol — easy to remember, hard to guess.
        </p>
        <button
          onClick={handleGenerate}
          className="px-6 py-3 rounded-xl bg-brand-blue text-white text-lg font-semibold flex items-center gap-2 hover:opacity-90"
        >
          <RefreshCw className="w-5 h-5" /> Generate Password
        </button>

        {generated && (
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <code
              className="text-xl font-mono px-4 py-3 rounded-lg border"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            >
              {generated}
            </code>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              {copied ? <><Check className="w-4 h-4 text-green-600" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
            </button>
          </div>
        )}
      </div>

      {/* Tips */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <h3
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Password Safety Tips
        </h3>
        <ul className="space-y-3 text-lg" style={{ color: 'var(--text-secondary)' }}>
          <li className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            <span><strong>Use different passwords</strong> for each website. If one is stolen, the others stay safe.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            <span><strong>Use a password manager</strong> (like 1Password or Bitwarden) to remember them all for you.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            <span><strong>Never share passwords</strong> via email, text, or phone. Legitimate companies will never ask for your password.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            <span><strong>Turn on two-factor authentication</strong> when available — it adds an extra layer of protection.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            <span><strong>Write it down safely</strong> if needed — keep the paper in a secure place (not on a sticky note on your monitor).</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
