'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  RotateCcw,
  ChevronRight,
  CheckCircle,
  XCircle,
  Printer,
  Heart,
  Wifi,
  Camera,
  Monitor,
  Video,
  ClipboardList,
} from 'lucide-react'
import Link from 'next/link'
import { trackToolUsage, trackQuizComplete } from '@/lib/ga-events'

// ── Types ────────────────────────────────────────────────────────────────────

interface StepOption {
  label: string
  value: string
  icon?: string
}

interface Step {
  id: string
  question: string
  subtitle: string
  options: StepOption[]
  type: 'radio' | 'checkbox'
}

interface CheckItem {
  label: string
  passed: boolean
  fix?: { text: string; href?: string }
}

type ReadinessLevel = 'ready' | 'almost' | 'needs-setup' | 'not-ready'

// ── Step Data ────────────────────────────────────────────────────────────────

const steps: Step[] = [
  {
    id: 'device',
    question: 'What device will you use for your appointment?',
    subtitle: 'Pick the device you plan to use for your video doctor visit.',
    type: 'radio',
    options: [
      { label: 'iPhone', value: 'iphone', icon: '📱' },
      { label: 'iPad', value: 'ipad', icon: '📱' },
      { label: 'Android phone', value: 'android-phone', icon: '📱' },
      { label: 'Android tablet', value: 'android-tablet', icon: '📱' },
      { label: 'Windows laptop or desktop', value: 'windows', icon: '💻' },
      { label: 'Mac', value: 'mac', icon: '💻' },
      { label: 'Chromebook', value: 'chromebook', icon: '💻' },
      { label: "I'm not sure", value: 'unsure', icon: '🤔' },
    ],
  },
  {
    id: 'internet',
    question: 'How do you connect to the internet?',
    subtitle: 'A stable connection is important for video calls.',
    type: 'radio',
    options: [
      { label: 'WiFi at home', value: 'wifi', icon: '📶' },
      { label: 'Mobile data only', value: 'mobile', icon: '📱' },
      { label: 'Both WiFi and mobile', value: 'both', icon: '✅' },
      { label: 'Not sure', value: 'unsure', icon: '🤔' },
      { label: 'No internet', value: 'none', icon: '❌' },
    ],
  },
  {
    id: 'camera',
    question: 'Does your device have a camera and microphone?',
    subtitle: 'Your doctor needs to see and hear you during the visit.',
    type: 'radio',
    options: [
      { label: 'Yes, built into my device', value: 'builtin', icon: '📷' },
      { label: 'I have an external webcam', value: 'external', icon: '🎥' },
      { label: "I'm not sure", value: 'unsure', icon: '🤔' },
      { label: "My device doesn't have one", value: 'none', icon: '❌' },
    ],
  },
  {
    id: 'experience',
    question: 'Have you made a video call before?',
    subtitle: 'This helps us know what tips to share with you.',
    type: 'radio',
    options: [
      { label: 'I use video calls regularly (FaceTime, Zoom, etc.)', value: 'regular', icon: '🌟' },
      { label: "I've done it a few times", value: 'some', icon: '👍' },
      { label: "I've never made a video call", value: 'never', icon: '🆕' },
      { label: "I'm not sure what a video call is", value: 'unsure', icon: '🤔' },
    ],
  },
  {
    id: 'platform',
    question: 'Which telehealth platform will you use?',
    subtitle: 'Select all that apply. It is okay if you are not sure yet.',
    type: 'checkbox',
    options: [
      { label: 'MyChart', value: 'mychart' },
      { label: 'Kaiser Permanente', value: 'kaiser' },
      { label: 'VA Video Connect', value: 'va' },
      { label: 'Teladoc', value: 'teladoc' },
      { label: 'MDLive', value: 'mdlive' },
      { label: 'Amwell', value: 'amwell' },
      { label: 'Doctor on Demand', value: 'doctor-on-demand' },
      { label: "My doctor's own portal", value: 'doctor-portal' },
      { label: "I don't know which one", value: 'unknown' },
      { label: "I haven't signed up yet", value: 'not-signed-up' },
    ],
  },
]

// ── Assessment Engine ────────────────────────────────────────────────────────

function getDeviceCheckText(device: string): string {
  switch (device) {
    case 'iphone':
    case 'ipad':
      return 'Open the Settings app, tap General, then About. Your device model is listed at the top.'
    case 'android-phone':
    case 'android-tablet':
      return 'Open Settings, tap About Phone (or About Tablet). Your device name and model will be shown.'
    case 'windows':
      return 'Click the Start button, type "System Information" and open it. Your device details will be shown.'
    case 'mac':
      return 'Click the Apple menu in the top-left corner, then choose "About This Mac" to see your device details.'
    case 'chromebook':
      return 'Click the clock in the bottom-right, then the gear icon. Choose "About ChromeOS" to see your device info.'
    default:
      return 'Ask a family member or friend to help you identify your device, or call your doctor\'s office for guidance.'
  }
}

function getCameraCheckText(device: string): string {
  switch (device) {
    case 'iphone':
    case 'ipad':
      return 'Open the Camera app. If you can see yourself using the front camera, your camera works. For the microphone, open Voice Memos and record a short clip.'
    case 'android-phone':
    case 'android-tablet':
      return 'Open the Camera app and switch to the front-facing camera. If you can see yourself, it works. For the microphone, try recording a short voice message.'
    case 'windows':
      return 'Open the Start menu and search for "Camera." If you see yourself on screen, your camera works. For the microphone, search for "Sound Settings" and look for the input section.'
    case 'mac':
      return 'Open FaceTime or Photo Booth. If you can see yourself, your camera works. For the microphone, go to System Settings then Sound and check the Input tab.'
    case 'chromebook':
      return 'Open the Camera app from the app launcher. If you see yourself, your camera is working. The built-in microphone should work automatically.'
    default:
      return 'Try opening any camera or video calling app. If you can see yourself on screen, your camera works.'
  }
}

function assessReadiness(
  answers: Record<string, string>,
  platformSelections: string[]
): { level: ReadinessLevel; checks: CheckItem[]; score: number } {
  const checks: CheckItem[] = []
  let passed = 0

  // Device check
  const device = answers.device
  if (device === 'unsure') {
    checks.push({
      label: 'Device compatible',
      passed: false,
      fix: {
        text: "You'll need to know what device you have. " + getDeviceCheckText('unsure'),
      },
    })
  } else {
    checks.push({ label: 'Device compatible', passed: true })
    passed++
  }

  // Internet check
  const internet = answers.internet
  if (internet === 'none') {
    checks.push({
      label: 'Internet connection sufficient',
      passed: false,
      fix: {
        text: 'You need an internet connection for telehealth. WiFi is recommended for the best video quality. Our WiFi troubleshooter can help you get started.',
        href: '/tools/wifi-troubleshooter',
      },
    })
  } else if (internet === 'unsure') {
    checks.push({
      label: 'Internet connection sufficient',
      passed: false,
      fix: {
        text: "If you can open a website on your device, you have internet. WiFi gives the best video quality. Check our WiFi troubleshooter if you're having issues.",
        href: '/tools/wifi-troubleshooter',
      },
    })
  } else {
    checks.push({ label: 'Internet connection sufficient', passed: true })
    passed++
  }

  // Camera & mic check
  const camera = answers.camera
  if (camera === 'none') {
    checks.push({
      label: 'Camera & microphone available',
      passed: false,
      fix: {
        text: 'You need a camera and microphone for video appointments. You can buy an external USB webcam with a built-in microphone for around $25-$50. Plug it in and it should work automatically.',
      },
    })
  } else if (camera === 'unsure') {
    checks.push({
      label: 'Camera & microphone available',
      passed: false,
      fix: {
        text: "Let's check if your device has a camera. " + getCameraCheckText(device),
      },
    })
  } else {
    checks.push({ label: 'Camera & microphone available', passed: true })
    passed++
  }

  // Video calling experience
  const exp = answers.experience
  if (exp === 'never' || exp === 'unsure') {
    checks.push({
      label: 'Video calling experience',
      passed: false,
      fix: {
        text: "No worries — video calling is easier than you think. Practice with a family member first using FaceTime or Zoom. Our guide to video calling apps covers everything step by step.",
        href: '/blog/best-video-calling-apps-for-seniors',
      },
    })
  } else {
    checks.push({ label: 'Video calling experience', passed: true })
    passed++
  }

  // Platform check
  const hasUnknown = platformSelections.includes('unknown')
  const hasNotSignedUp = platformSelections.includes('not-signed-up')
  const hasRealPlatform = platformSelections.some(
    (p) => p !== 'unknown' && p !== 'not-signed-up'
  )

  if (!hasRealPlatform && (hasUnknown || hasNotSignedUp || platformSelections.length === 0)) {
    checks.push({
      label: 'Platform account set up',
      passed: false,
      fix: {
        text: hasNotSignedUp
          ? "Call your doctor's office and ask which telehealth platform they use. They can help you sign up and may even walk you through a test call. Our guide to patient portals can also help."
          : "Contact your doctor's office to find out which telehealth platform they use. Once you know, they or a family member can help you create an account.",
        href: '/blog/how-to-use-medicare-portal-online',
      },
    })
  } else {
    checks.push({ label: 'Platform account set up', passed: true })
    passed++
  }

  const score = passed
  let level: ReadinessLevel
  if (score === 5) level = 'ready'
  else if (score >= 3) level = 'almost'
  else if (score >= 1) level = 'needs-setup'
  else level = 'not-ready'

  return { level, checks, score }
}

// ── Motion Wrapper ───────────────────────────────────────────────────────────

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

// ── Readiness Label ──────────────────────────────────────────────────────────

function getReadinessInfo(level: ReadinessLevel) {
  switch (level) {
    case 'ready':
      return {
        title: "You're Ready!",
        subtitle: 'Great news — you have everything you need for a telehealth appointment.',
        color: 'bg-green-600',
        emoji: '🎉',
      }
    case 'almost':
      return {
        title: 'Almost Ready!',
        subtitle: 'You are very close. Just a few small things to take care of first.',
        color: 'bg-blue-600',
        emoji: '👍',
      }
    case 'needs-setup':
      return {
        title: 'Needs Some Setup',
        subtitle: "Don't worry — we'll walk you through exactly what you need to do.",
        color: 'bg-amber-600',
        emoji: '🔧',
      }
    case 'not-ready':
      return {
        title: 'Not Ready Yet',
        subtitle: "That's okay! Follow the steps below and you'll be ready soon.",
        color: 'bg-red-600',
        emoji: '📋',
      }
  }
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function TelehealthChecker() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [platformSelections, setPlatformSelections] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const totalSteps = steps.length
  const progress = showResult ? 100 : Math.round((currentStep / totalSteps) * 100)

  const handleRadioAnswer = useCallback(
    (stepId: string, value: string) => {
      const newAnswers = { ...answers, [stepId]: value }
      setAnswers(newAnswers)

      if (currentStep === 0) trackToolUsage('telehealth-checker', 'start')
      if (currentStep < totalSteps - 1) {
        setTimeout(() => setCurrentStep((s) => s + 1), 300)
      }
    },
    [answers, currentStep, totalSteps]
  )

  const handleCheckboxToggle = useCallback(
    (value: string) => {
      setPlatformSelections((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      )
    },
    []
  )

  const handleCheckboxSubmit = useCallback(() => {
    const result = assessReadiness(answers, platformSelections)
    trackQuizComplete('telehealth-checker', result.level)
    setShowResult(true)
  }, [answers, platformSelections])

  const handleRestart = useCallback(() => {
    setCurrentStep(0)
    setAnswers({})
    setPlatformSelections([])
    setShowResult(false)
  }, [])

  const handleBack = useCallback(() => {
    if (showResult) {
      setShowResult(false)
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }, [currentStep, showResult])

  const handlePrint = useCallback(() => {
    if (typeof window !== 'undefined') window.print()
  }, [])

  const result = showResult ? assessReadiness(answers, platformSelections) : null

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

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {!showResult ? (
          <MotionDiv motionKey={`step-${currentStep}`}>
            {steps[currentStep].type === 'radio' ? (
              <RadioStepCard
                step={steps[currentStep]}
                selectedValue={answers[steps[currentStep].id]}
                onSelect={(value) => handleRadioAnswer(steps[currentStep].id, value)}
              />
            ) : (
              <CheckboxStepCard
                step={steps[currentStep]}
                selectedValues={platformSelections}
                onToggle={handleCheckboxToggle}
                onSubmit={handleCheckboxSubmit}
              />
            )}
          </MotionDiv>
        ) : (
          result && (
            <MotionDiv motionKey="result">
              <ResultCard
                result={result}
                onRestart={handleRestart}
                onPrint={handlePrint}
              />
            </MotionDiv>
          )
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Radio Step Card ──────────────────────────────────────────────────────────

function RadioStepCard({
  step,
  selectedValue,
  onSelect,
}: {
  step: Step
  selectedValue?: string
  onSelect: (value: string) => void
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
        {step.question}
      </h2>
      <p className="text-[var(--text-secondary)] mb-6">{step.subtitle}</p>

      <div className="space-y-3">
        {step.options.map((option) => {
          const isSelected = selectedValue === option.value
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 sm:gap-4 group min-h-[56px] ${
                isSelected
                  ? 'border-brand-blue bg-brand-blue/10 shadow-md'
                  : 'border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-brand-blue/50 hover:shadow-sm'
              }`}
              aria-pressed={isSelected}
            >
              {option.icon && (
                <span className="text-2xl sm:text-3xl shrink-0" aria-hidden="true">
                  {option.icon}
                </span>
              )}
              <span
                className={`text-base sm:text-lg font-medium ${
                  isSelected ? 'text-brand-blue' : 'text-[var(--text-primary)] group-hover:text-brand-blue'
                } transition-colors`}
              >
                {option.label}
              </span>
              {isSelected && (
                <CheckCircle className="w-5 h-5 text-brand-blue ml-auto shrink-0" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Checkbox Step Card ───────────────────────────────────────────────────────

function CheckboxStepCard({
  step,
  selectedValues,
  onToggle,
  onSubmit,
}: {
  step: Step
  selectedValues: string[]
  onToggle: (value: string) => void
  onSubmit: () => void
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
        {step.question}
      </h2>
      <p className="text-[var(--text-secondary)] mb-6">{step.subtitle}</p>

      <div className="space-y-3">
        {step.options.map((option) => {
          const isSelected = selectedValues.includes(option.value)
          return (
            <button
              key={option.value}
              onClick={() => onToggle(option.value)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 sm:gap-4 group min-h-[56px] ${
                isSelected
                  ? 'border-brand-blue bg-brand-blue/10 shadow-md'
                  : 'border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-brand-blue/50 hover:shadow-sm'
              }`}
              aria-pressed={isSelected}
            >
              <span
                className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'border-brand-blue bg-brand-blue'
                    : 'border-[var(--border-color)] bg-[var(--bg-primary)]'
                }`}
              >
                {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
              </span>
              <span
                className={`text-base sm:text-lg font-medium ${
                  isSelected ? 'text-brand-blue' : 'text-[var(--text-primary)] group-hover:text-brand-blue'
                } transition-colors`}
              >
                {option.label}
              </span>
            </button>
          )
        })}
      </div>

      <button
        onClick={onSubmit}
        className="mt-6 w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-blue text-white font-semibold text-lg hover:opacity-90 transition-opacity min-h-[56px]"
      >
        See My Results
      </button>
    </div>
  )
}

// ── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({
  result,
  onRestart,
  onPrint,
}: {
  result: { level: ReadinessLevel; checks: CheckItem[]; score: number }
  onRestart: () => void
  onPrint: () => void
}) {
  const info = getReadinessInfo(result.level)

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm overflow-hidden print:shadow-none print:border-gray-300">
      {/* Header */}
      <div className={`${info.color} text-white p-6 sm:p-8 text-center`}>
        <span className="text-5xl mb-4 block" aria-hidden="true">
          {info.emoji}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">
          {info.title}
        </h2>
        <p className="text-white/90 text-base sm:text-lg max-w-lg mx-auto">
          {info.subtitle}
        </p>
        <p className="mt-3 text-white/80 text-sm font-medium">
          Score: {result.score} of 5 checks passed
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* Checklist */}
        <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-brand-blue" />
          Your Readiness Checklist
        </h3>
        <div className="space-y-4 mb-8">
          {result.checks.map((check, i) => (
            <div
              key={i}
              className={`rounded-xl border p-4 sm:p-5 ${
                check.passed
                  ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                  : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
              }`}
            >
              <div className="flex items-start gap-3">
                {check.passed ? (
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p
                    className={`font-semibold text-base sm:text-lg ${
                      check.passed
                        ? 'text-green-800 dark:text-green-300'
                        : 'text-red-800 dark:text-red-300'
                    }`}
                  >
                    {check.label}
                  </p>
                  {!check.passed && check.fix && (
                    <div className="mt-2">
                      <p className="text-sm sm:text-base text-red-700 dark:text-red-300 leading-relaxed">
                        {check.fix.text}
                      </p>
                      {check.fix.href && (
                        <Link
                          href={check.fix.href}
                          className="inline-flex items-center gap-1 mt-2 text-sm font-semibold text-brand-blue hover:underline"
                        >
                          Read our helpful guide
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Telehealth Guide Link */}
        <div
          className="rounded-xl border p-5 mb-8"
          style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
        >
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2 flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand-blue" />
            Complete Telehealth Guide
          </h3>
          <p className="text-[var(--text-secondary)] mb-3 leading-relaxed">
            Our step-by-step telehealth guide covers everything from setting up your first appointment
            to troubleshooting common issues.
          </p>
          <Link
            href="/blog/telehealth-guide-for-seniors"
            className="inline-flex items-center gap-1 text-brand-blue font-semibold hover:underline"
          >
            Read the Full Telehealth Guide
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Appointment Preparation Checklist */}
        <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-brand-blue" />
          What to Prepare Before Your Appointment
        </h3>
        <div className="space-y-3 mb-8">
          {[
            { icon: Monitor, text: 'Charge your device fully (or plug it in)' },
            { icon: Wifi, text: 'Connect to WiFi and test your internet' },
            { icon: Camera, text: 'Test your camera and microphone beforehand' },
            {
              icon: ClipboardList,
              text: 'Write down your questions for the doctor',
            },
            {
              icon: Heart,
              text: 'Have your medication list or pill bottles nearby',
            },
            {
              icon: Monitor,
              text: 'Log into your telehealth app 10 minutes early',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)]"
            >
              <item.icon className="w-5 h-5 text-brand-blue shrink-0" />
              <span className="text-[var(--text-primary)] text-base">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-5 mb-8">
          <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-3">
            Tips for a Great Telehealth Visit
          </h3>
          <ul className="space-y-2 text-sm sm:text-base text-amber-700 dark:text-amber-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="shrink-0 mt-1">💡</span>
              <span>Sit facing a window or lamp so your doctor can see your face clearly.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 mt-1">🔇</span>
              <span>Find a quiet room and turn off the TV or radio.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 mt-1">🔋</span>
              <span>Charge your device or keep it plugged in during the call.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 mt-1">💊</span>
              <span>Have your medication list, insurance card, and any recent test results handy.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 mt-1">📝</span>
              <span>Write down your questions ahead of time so you do not forget anything.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 mt-1">🕐</span>
              <span>Log in 10 minutes early to troubleshoot any issues.</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 print:hidden">
          <button
            onClick={onPrint}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-blue text-white font-semibold hover:opacity-90 transition-opacity text-base min-h-[56px]"
          >
            <Printer className="w-5 h-5" />
            Print This Checklist
          </button>
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[var(--bg-primary)] border-2 border-[var(--border-color)] text-[var(--text-primary)] font-semibold hover:border-brand-blue hover:text-brand-blue transition-all duration-200 text-base min-h-[56px]"
          >
            <RotateCcw className="w-5 h-5" />
            Start Over
          </button>
        </div>
      </div>
    </div>
  )
}
