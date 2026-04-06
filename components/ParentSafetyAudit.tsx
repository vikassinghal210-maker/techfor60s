'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  RotateCcw,
  ChevronRight,
  CheckCircle,
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  Heart,
} from 'lucide-react'
import Link from 'next/link'
import { trackToolUsage, trackQuizComplete } from '@/lib/ga-events'

// ── Types ────────────────────────────────────────────────────────────────────

interface Step {
  id: string
  title: string
  subtitle: string
  type: 'radio' | 'checkbox'
  options: { label: string; value: string; icon: string }[]
}

type Priority = 'critical' | 'important' | 'recommended'

interface Recommendation {
  priority: Priority
  title: string
  description: string
  link?: { label: string; href: string }
}

interface AuditResult {
  score: number
  level: 'Critical' | 'Needs Attention' | 'Good' | 'Excellent'
  color: string
  recommendations: Recommendation[]
}

// ── Step Data ────────────────────────────────────────────────────────────────

const steps: Step[] = [
  {
    id: 'living',
    title: 'What is your parent\'s living situation?',
    subtitle: 'This helps us understand their daily safety needs.',
    type: 'radio',
    options: [
      { label: 'Lives alone', value: 'alone', icon: '🏠' },
      { label: 'With spouse or partner', value: 'spouse', icon: '👫' },
      { label: 'With family members', value: 'family', icon: '👨‍👩‍👧' },
      { label: 'Assisted living facility', value: 'assisted', icon: '🏥' },
    ],
  },
  {
    id: 'tech',
    title: 'What technology does your parent currently use?',
    subtitle: 'Select all that apply.',
    type: 'checkbox',
    options: [
      { label: 'Smartphone', value: 'smartphone', icon: '📱' },
      { label: 'Basic phone (flip or button phone)', value: 'basic-phone', icon: '📞' },
      { label: 'Tablet', value: 'tablet', icon: '📲' },
      { label: 'Laptop or desktop computer', value: 'computer', icon: '💻' },
      { label: 'Smart speaker (Alexa, Google Home)', value: 'smart-speaker', icon: '🔊' },
      { label: 'Medical alert device', value: 'medical-alert', icon: '🚨' },
      { label: 'Smart home devices', value: 'smart-home', icon: '🏡' },
      { label: 'None of these', value: 'none', icon: '❌' },
    ],
  },
  {
    id: 'health',
    title: 'Does your parent have any of these health concerns?',
    subtitle: 'Select all that apply. This helps us prioritize recommendations.',
    type: 'checkbox',
    options: [
      { label: 'Low vision or vision problems', value: 'low-vision', icon: '👁️' },
      { label: 'Hearing loss', value: 'hearing-loss', icon: '👂' },
      { label: 'Mobility issues or arthritis', value: 'mobility', icon: '🦴' },
      { label: 'Memory concerns', value: 'memory', icon: '🧠' },
      { label: 'Fall risk', value: 'fall-risk', icon: '⚠️' },
      { label: 'None of these', value: 'none', icon: '✅' },
    ],
  },
  {
    id: 'checkin',
    title: 'How often do you check in with your parent?',
    subtitle: 'Including calls, texts, video chats, or visits.',
    type: 'radio',
    options: [
      { label: 'Daily', value: 'daily', icon: '📅' },
      { label: 'A few times a week', value: 'few-times', icon: '📆' },
      { label: 'About once a week', value: 'weekly', icon: '🗓️' },
      { label: 'Less often than weekly', value: 'less-often', icon: '⏳' },
    ],
  },
  {
    id: 'safety',
    title: 'Which safety measures are already in place?',
    subtitle: 'Select all that apply.',
    type: 'checkbox',
    options: [
      { label: 'Location sharing enabled', value: 'location-sharing', icon: '📍' },
      { label: 'Emergency contacts set up on phone', value: 'emergency-contacts', icon: '🆘' },
      { label: 'Scam protection or call blocking', value: 'scam-protection', icon: '🛡️' },
      { label: 'Password manager', value: 'password-manager', icon: '🔐' },
      { label: 'Two-factor authentication', value: 'two-factor', icon: '🔑' },
      { label: 'Medical info on phone (Medical ID)', value: 'medical-info', icon: '🏥' },
      { label: 'None of these', value: 'none', icon: '❌' },
    ],
  },
]

// ── Scoring Engine ──────────────────────────────────────────────────────────

function calculateResult(answers: Record<string, string | string[]>): AuditResult {
  const living = answers.living as string
  const tech = (answers.tech as string[]) || []
  const health = (answers.health as string[]) || []
  const checkin = answers.checkin as string
  const safety = (answers.safety as string[]) || []

  const hasSmartphone = tech.includes('smartphone')
  const hasMedicalAlert = tech.includes('medical-alert')
  const hasNoTech = tech.includes('none') || tech.length === 0
  const livesAlone = living === 'alone'
  const hasMemory = health.includes('memory')
  const hasFallRisk = health.includes('fall-risk')
  const hasLowVision = health.includes('low-vision')
  const hasScamProtection = safety.includes('scam-protection')
  const hasLocationSharing = safety.includes('location-sharing')
  const hasEmergencyContacts = safety.includes('emergency-contacts')
  const hasPasswordManager = safety.includes('password-manager')
  const hasTwoFactor = safety.includes('two-factor')
  const hasMedicalInfo = safety.includes('medical-info')
  const hasNoSafety = safety.includes('none') || safety.length === 0
  const infrequentCheckin = checkin === 'weekly' || checkin === 'less-often'

  let score = 50 // Base score
  const recommendations: Recommendation[] = []

  // ── Living situation scoring ──
  if (living === 'assisted') score += 15
  else if (living === 'family') score += 10
  else if (living === 'spouse') score += 5
  // alone = no bonus

  // ── Tech scoring ──
  if (hasSmartphone) score += 8
  if (hasMedicalAlert) score += 8
  if (tech.includes('smart-speaker')) score += 3
  if (tech.includes('smart-home')) score += 3
  if (hasNoTech) score -= 15

  // ── Safety measures scoring ──
  if (hasLocationSharing) score += 5
  if (hasEmergencyContacts) score += 5
  if (hasScamProtection) score += 4
  if (hasPasswordManager) score += 4
  if (hasTwoFactor) score += 4
  if (hasMedicalInfo) score += 4
  if (hasNoSafety) score -= 10

  // ── Check-in frequency scoring ──
  if (checkin === 'daily') score += 8
  else if (checkin === 'few-times') score += 5
  else if (checkin === 'weekly') score += 0
  else score -= 5

  // ── Health deductions ──
  if (health.includes('none') || health.length === 0) score += 5
  else {
    health.forEach((h) => {
      if (h !== 'none') score -= 3
    })
  }

  // ── CRITICAL recommendations ──
  if (livesAlone && !hasMedicalAlert) {
    score -= 10
    recommendations.push({
      priority: 'critical',
      title: 'Set Up a Medical Alert System',
      description:
        'Your parent lives alone without a medical alert device. This is the single most important safety measure for seniors living independently. A medical alert lets them call for help with the push of a button.',
      link: { label: 'Best Medical Alert Systems for 2026', href: '/blog/best-medical-alert-systems-2026' },
    })
  }

  if (hasFallRisk && !hasMedicalAlert) {
    score -= 8
    recommendations.push({
      priority: 'critical',
      title: 'Get a Fall Detection Device',
      description:
        'With fall risk concerns and no medical alert, your parent is vulnerable. Modern fall detection devices can automatically call for help even if your parent is unable to press a button.',
      link: { label: 'Best Fall Detection Devices for Seniors', href: '/blog/best-fall-detection-devices-for-seniors' },
    })
  }

  if (hasMemory && !hasScamProtection) {
    score -= 8
    recommendations.push({
      priority: 'critical',
      title: 'Enable Scam Protection Immediately',
      description:
        'Memory concerns combined with no scam protection creates a serious vulnerability. Scammers specifically target seniors with cognitive challenges. Set up call blocking and educate your parent on common scams.',
      link: { label: 'Use Our Free Scam Checker Tool', href: '/tools/scam-checker' },
    })
  }

  if (hasNoTech && livesAlone) {
    recommendations.push({
      priority: 'critical',
      title: 'Get a Basic Communication Device',
      description:
        'Your parent lives alone with no technology. At minimum, they need a phone or medical alert device for emergencies. Even a simple flip phone can be a lifeline.',
      link: { label: 'Setting Up a Phone for an Elderly Parent', href: '/blog/setting-up-iphone-for-elderly-parent' },
    })
  }

  if (livesAlone && infrequentCheckin && !hasLocationSharing) {
    score -= 5
    recommendations.push({
      priority: 'critical',
      title: 'Set Up Location Sharing or Increase Check-ins',
      description:
        'Your parent lives alone and you check in infrequently without location sharing. If something happens, it could be days before anyone notices. Location sharing gives you peace of mind between calls.',
      link: { label: 'How to Share Location with Family', href: '/blog/how-to-share-location-with-family-safety' },
    })
  }

  // ── IMPORTANT recommendations ──
  if (!hasEmergencyContacts && hasSmartphone) {
    recommendations.push({
      priority: 'important',
      title: 'Set Up Emergency Contacts on Their Phone',
      description:
        'Their smartphone can display emergency contacts and medical info even when locked. First responders check for this. It takes just 5 minutes to set up.',
      link: { label: 'How to Set Up Emergency Contacts', href: '/blog/how-to-set-up-emergency-contacts-on-phone' },
    })
  }

  if (hasLowVision && hasSmartphone) {
    recommendations.push({
      priority: 'important',
      title: 'Configure Accessibility Settings',
      description:
        'Your parent has vision concerns. Their phone has built-in features like larger text, high contrast, voice control, and screen readers that can make a huge difference.',
      link: { label: 'Setting Up Phone for Elderly Parent', href: '/blog/setting-up-iphone-for-elderly-parent' },
    })
  }

  if (!hasScamProtection && !hasMemory) {
    recommendations.push({
      priority: 'important',
      title: 'Set Up Scam Protection',
      description:
        'Seniors are the #1 target for scammers, losing billions each year. Set up call blocking, enable spam filters, and teach your parent how to spot scam messages.',
      link: { label: 'Use Our Free Scam Checker Tool', href: '/tools/scam-checker' },
    })
  }

  if (!hasLocationSharing && hasSmartphone && !livesAlone) {
    recommendations.push({
      priority: 'important',
      title: 'Enable Location Sharing',
      description:
        'Location sharing lets family members know your parent is safe without calling. Apps like Find My (iPhone) or Google Maps make this easy to set up.',
      link: { label: 'How to Share Location with Family', href: '/blog/how-to-share-location-with-family-safety' },
    })
  }

  if (livesAlone && !tech.includes('smart-speaker') && !tech.includes('smart-home')) {
    recommendations.push({
      priority: 'important',
      title: 'Consider Remote Monitoring Devices',
      description:
        'Smart home sensors, video doorbells, and activity monitors can help you keep an eye on your parent without being intrusive. Many work automatically with no effort from your parent.',
      link: { label: 'Remote Monitoring Devices for Elderly Parents', href: '/blog/remote-monitoring-devices-for-elderly-parents' },
    })
  }

  // ── RECOMMENDED ──
  if (!hasPasswordManager) {
    recommendations.push({
      priority: 'recommended',
      title: 'Set Up a Password Manager',
      description:
        'Password reuse is one of the biggest security risks for seniors. A password manager keeps all their accounts secure with one easy-to-remember master password.',
      link: { label: 'Check Password Security', href: '/tools/password-checker' },
    })
  }

  if (!hasTwoFactor) {
    recommendations.push({
      priority: 'recommended',
      title: 'Enable Two-Factor Authentication',
      description:
        'Two-factor authentication adds an extra layer of protection to email, banking, and social media accounts. It stops hackers even if they get your parent\'s password.',
    })
  }

  if (!hasMedicalInfo && hasSmartphone) {
    recommendations.push({
      priority: 'recommended',
      title: 'Add Medical Info to Their Phone',
      description:
        'The Medical ID feature on smartphones shows allergies, medications, blood type, and emergency contacts from the lock screen. First responders rely on this.',
      link: { label: 'How to Set Up Emergency Contacts', href: '/blog/how-to-set-up-emergency-contacts-on-phone' },
    })
  }

  // Clamp score
  score = Math.max(0, Math.min(100, score))

  // Determine level
  let level: AuditResult['level']
  let color: string
  if (score <= 30) {
    level = 'Critical'
    color = '#dc2626'
  } else if (score <= 55) {
    level = 'Needs Attention'
    color = '#f59e0b'
  } else if (score <= 80) {
    level = 'Good'
    color = '#22c55e'
  } else {
    level = 'Excellent'
    color = '#16a34a'
  }

  return { score, level, color, recommendations }
}

// ── Motion Wrapper ──────────────────────────────────────────────────────────

function MotionDiv({
  children,
  motionKey,
  className,
}: {
  children: React.ReactNode
  motionKey: string
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      key={motionKey}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Priority Config ─────────────────────────────────────────────────────────

const priorityConfig: Record<Priority, { label: string; bgClass: string; textClass: string; borderClass: string; Icon: typeof AlertTriangle }> = {
  critical: {
    label: 'CRITICAL — Set Up Immediately',
    bgClass: 'bg-red-50 dark:bg-red-900/20',
    textClass: 'text-red-800 dark:text-red-200',
    borderClass: 'border-red-200 dark:border-red-800',
    Icon: ShieldAlert,
  },
  important: {
    label: 'IMPORTANT — Set Up This Week',
    bgClass: 'bg-amber-50 dark:bg-amber-900/20',
    textClass: 'text-amber-800 dark:text-amber-200',
    borderClass: 'border-amber-200 dark:border-amber-800',
    Icon: AlertTriangle,
  },
  recommended: {
    label: 'RECOMMENDED — Nice to Have',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    textClass: 'text-blue-800 dark:text-blue-200',
    borderClass: 'border-blue-200 dark:border-blue-800',
    Icon: ShieldCheck,
  },
}

// ── Main Component ──────────────────────────────────────────────────────────

export default function ParentSafetyAudit() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [showResult, setShowResult] = useState(false)
  const [copied, setCopied] = useState(false)

  const totalSteps = steps.length
  const progress = showResult ? 100 : Math.round((currentStep / totalSteps) * 100)
  const currentStepData = steps[currentStep]

  const handleRadioAnswer = useCallback(
    (stepId: string, value: string) => {
      const newAnswers = { ...answers, [stepId]: value }
      setAnswers(newAnswers)

      if (currentStep === 0) trackToolUsage('parent-safety-audit', 'start')

      if (currentStep < totalSteps - 1) {
        setTimeout(() => setCurrentStep((s) => s + 1), 300)
      } else {
        const result = calculateResult(newAnswers)
        trackQuizComplete('parent-safety-audit', `${result.level}-${result.score}`)
        setTimeout(() => setShowResult(true), 300)
      }
    },
    [answers, currentStep, totalSteps],
  )

  const handleCheckboxToggle = useCallback(
    (stepId: string, value: string) => {
      const current = (answers[stepId] as string[]) || []

      let updated: string[]
      if (value === 'none') {
        updated = current.includes('none') ? [] : ['none']
      } else {
        const withoutNone = current.filter((v) => v !== 'none')
        updated = withoutNone.includes(value)
          ? withoutNone.filter((v) => v !== value)
          : [...withoutNone, value]
      }

      setAnswers({ ...answers, [stepId]: updated })
    },
    [answers],
  )

  const handleCheckboxNext = useCallback(() => {
    if (currentStep === 0) trackToolUsage('parent-safety-audit', 'start')

    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      const result = calculateResult(answers)
      trackQuizComplete('parent-safety-audit', `${result.level}-${result.score}`)
      setShowResult(true)
    }
  }, [answers, currentStep, totalSteps])

  const handleBack = useCallback(() => {
    if (showResult) {
      setShowResult(false)
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }, [currentStep, showResult])

  const handleRestart = useCallback(() => {
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
    setCopied(false)
  }, [])

  const result = useMemo(
    () => (showResult ? calculateResult(answers) : null),
    [showResult, answers],
  )

  const handleCopyReport = useCallback(() => {
    if (!result) return
    const lines = [
      `Is My Parent OK? — Safety Audit Report`,
      `Safety Score: ${result.score}/100 (${result.level})`,
      '',
      ...result.recommendations.map(
        (r) => `[${r.priority.toUpperCase()}] ${r.title}: ${r.description}`,
      ),
      '',
      `Generated at techfor60s.com/tools/parent-safety-audit`,
    ]
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }, [result])

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            {showResult ? 'Your Results' : `Step ${currentStep + 1} of ${totalSteps}`}
          </span>
          <span className="text-sm font-medium text-brand-blue">{progress}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-brand-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Back Button */}
      {(currentStep > 0 || showResult) && (
        <button
          onClick={handleBack}
          className="mb-4 text-sm text-brand-blue hover:underline flex items-center gap-1 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to previous step
        </button>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        {!showResult ? (
          <MotionDiv motionKey={`step-${currentStep}`}>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
                {currentStepData.title}
              </h2>
              <p className="text-[var(--text-secondary)] mb-6">{currentStepData.subtitle}</p>

              <div className="space-y-3">
                {currentStepData.options.map((option) => {
                  const isRadio = currentStepData.type === 'radio'
                  const selectedValues = isRadio
                    ? [answers[currentStepData.id] as string]
                    : ((answers[currentStepData.id] as string[]) || [])
                  const isSelected = selectedValues.includes(option.value)

                  return (
                    <button
                      key={option.value}
                      onClick={() =>
                        isRadio
                          ? handleRadioAnswer(currentStepData.id, option.value)
                          : handleCheckboxToggle(currentStepData.id, option.value)
                      }
                      className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 sm:gap-4 group min-h-[44px] ${
                        isSelected
                          ? 'border-brand-blue bg-brand-blue/10 shadow-md'
                          : 'border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-brand-blue/50 hover:shadow-sm'
                      }`}
                      aria-pressed={isSelected}
                    >
                      {/* Checkbox / Radio indicator */}
                      <span
                        className={`shrink-0 w-6 h-6 rounded-${isRadio ? 'full' : 'md'} border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-brand-blue bg-brand-blue'
                            : 'border-[var(--border-color)]'
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </span>
                      <span className="text-2xl shrink-0" aria-hidden="true">
                        {option.icon}
                      </span>
                      <span
                        className={`text-base sm:text-lg font-medium transition-colors ${
                          isSelected
                            ? 'text-brand-blue'
                            : 'text-[var(--text-primary)] group-hover:text-brand-blue'
                        }`}
                      >
                        {option.label}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Next button for checkbox steps */}
              {currentStepData.type === 'checkbox' && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleCheckboxNext}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white font-semibold hover:bg-brand-blue/90 transition-colors text-base min-h-[44px]"
                  >
                    {currentStep < totalSteps - 1 ? 'Next Step' : 'See Results'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </MotionDiv>
        ) : (
          result && (
            <MotionDiv motionKey="result">
              <ResultScreen
                result={result}
                onRestart={handleRestart}
                onCopyReport={handleCopyReport}
                copied={copied}
              />
            </MotionDiv>
          )
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Score Gauge ─────────────────────────────────────────────────────────────

function ScoreGauge({ score, color, level }: { score: number; color: string; level: string }) {
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="var(--border-color)"
            strokeWidth="8"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold font-[family-name:var(--font-heading)]"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-[var(--text-secondary)]">out of 100</span>
        </div>
      </div>
      <div
        className="mt-3 px-4 py-1.5 rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {level}
      </div>
    </div>
  )
}

// ── Result Screen ───────────────────────────────────────────────────────────

function ResultScreen({
  result,
  onRestart,
  onCopyReport,
  copied,
}: {
  result: AuditResult
  onRestart: () => void
  onCopyReport: () => void
  copied: boolean
}) {
  const groupedRecs: Record<Priority, Recommendation[]> = {
    critical: [],
    important: [],
    recommended: [],
  }
  result.recommendations.forEach((r) => groupedRecs[r.priority].push(r))

  const LevelIcon = result.level === 'Critical' || result.level === 'Needs Attention' ? ShieldAlert : ShieldCheck

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm overflow-hidden">
      {/* Header with Score */}
      <div className="bg-brand-blue text-white p-6 sm:p-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-4">
          <LevelIcon className="w-7 h-7" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">
          Safety Audit Results
        </h2>
        <p className="text-blue-100 text-base sm:text-lg max-w-lg mx-auto">
          Here&apos;s how your parent&apos;s current safety setup looks, with personalized recommendations.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* Score Gauge */}
        <div className="flex justify-center mb-8">
          <ScoreGauge score={result.score} color={result.color} level={result.level} />
        </div>

        {/* Score explanation */}
        <div
          className="rounded-xl border p-4 mb-8 text-center"
          style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}
        >
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {result.level === 'Critical' &&
              'Your parent has significant safety gaps that should be addressed as soon as possible. The good news: the most impactful changes are simple to set up.'}
            {result.level === 'Needs Attention' &&
              'Your parent has some important safety gaps. Addressing the critical items below will make a big difference in their daily safety.'}
            {result.level === 'Good' &&
              'Your parent has a solid safety foundation! A few more improvements would give you even greater peace of mind.'}
            {result.level === 'Excellent' &&
              'Great job! Your parent has excellent safety measures in place. Review the suggestions below to stay ahead of any potential issues.'}
          </p>
        </div>

        {/* Recommendations by priority */}
        {(['critical', 'important', 'recommended'] as Priority[]).map((priority) => {
          const recs = groupedRecs[priority]
          if (recs.length === 0) return null
          const config = priorityConfig[priority]
          const { Icon } = config

          return (
            <div key={priority} className="mb-6">
              <div className={`flex items-center gap-2 mb-3 ${config.textClass}`}>
                <Icon className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wide">{config.label}</h3>
              </div>
              <div className="space-y-3">
                {recs.map((rec, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border p-4 sm:p-5 ${config.bgClass} ${config.borderClass}`}
                  >
                    <h4 className={`font-semibold text-base sm:text-lg mb-1 ${config.textClass}`}>
                      {rec.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-2">
                      {rec.description}
                    </p>
                    {rec.link && (
                      <Link
                        href={rec.link.href}
                        className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
                      >
                        {rec.link.label}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* No recommendations */}
        {result.recommendations.length === 0 && (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-lg font-semibold text-[var(--text-primary)]">
              Everything looks great!
            </p>
            <p className="text-[var(--text-secondary)]">
              Your parent has strong safety measures in place. Keep up the excellent work!
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onCopyReport}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white font-semibold hover:bg-brand-blue/90 transition-all duration-200 text-base min-h-[44px]"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Copied!' : 'Share This Report'}
          </button>
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-primary)] border-2 border-[var(--border-color)] text-[var(--text-primary)] font-semibold hover:border-brand-blue hover:text-brand-blue transition-all duration-200 text-base min-h-[44px]"
          >
            <RotateCcw className="w-5 h-5" />
            Start Over
          </button>
        </div>

        {/* Reassuring note */}
        <div className="mt-8 rounded-xl border p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <div className="flex gap-3">
            <Heart className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                You&apos;re a caring family member
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
                The fact that you&apos;re taking this assessment shows how much you care. Even small
                steps make a big difference. Start with the highest-priority items and work
                through the list gradually — you don&apos;t have to do everything at once.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
