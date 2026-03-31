'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { RotateCcw, ChevronRight, ChevronLeft, CheckCircle, Wifi, Zap, DollarSign, MapPin } from 'lucide-react'
import Link from 'next/link'
import { statesData } from '@/lib/states-data'

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
  multiSelect?: boolean
}

// ── Steps ────────────────────────────────────────────────────────────────────

const steps: Step[] = [
  {
    id: 'people',
    question: 'How many people use the internet in your home?',
    subtitle: 'Count everyone who connects to your WiFi, including guests who visit often.',
    options: [
      { label: 'Just me', value: '1', icon: '👤' },
      { label: '2 people', value: '2', icon: '👥' },
      { label: '3 to 4 people', value: '3-4', icon: '👨‍👩‍👦' },
      { label: '5 or more', value: '5+', icon: '👨‍👩‍👧‍👦' },
    ],
  },
  {
    id: 'activities',
    question: 'What do you mainly use the internet for?',
    subtitle: 'Select all that apply. Tap each one that matches.',
    multiSelect: true,
    options: [
      { label: 'Email & browsing', value: 'email', icon: '📧' },
      { label: 'Video calls (Zoom / FaceTime)', value: 'video-calls', icon: '📹' },
      { label: 'Streaming TV (Netflix / YouTube)', value: 'streaming', icon: '📺' },
      { label: 'Online shopping', value: 'shopping', icon: '🛒' },
      { label: 'Social media', value: 'social', icon: '💬' },
      { label: 'Smart home devices', value: 'smart-home', icon: '🏠' },
      { label: 'Online banking', value: 'banking', icon: '🏦' },
    ],
  },
  {
    id: 'devices',
    question: 'How many devices connect to your WiFi?',
    subtitle: 'Think about phones, tablets, laptops, smart TVs, and smart speakers.',
    options: [
      { label: '1 to 2 devices', value: '1-2', icon: '📱' },
      { label: '3 to 5 devices', value: '3-5', icon: '📱💻' },
      { label: '6 to 10 devices', value: '6-10', icon: '📱💻🖥️' },
      { label: 'More than 10', value: '10+', icon: '📱💻🖥️📺' },
    ],
  },
  {
    id: 'extras',
    question: 'Do you do any of these?',
    subtitle: 'Select all that apply. It is okay if none of these match.',
    multiSelect: true,
    options: [
      { label: 'Work from home', value: 'wfh', icon: '💼' },
      { label: 'Download large files', value: 'downloads', icon: '📥' },
      { label: 'Gaming', value: 'gaming', icon: '🎮' },
      { label: 'Upload videos or photos', value: 'uploads', icon: '📤' },
    ],
  },
  {
    id: 'state',
    question: 'Which state do you live in?',
    subtitle: 'We will show you internet plans available in your area.',
    options: [], // handled specially with a dropdown
  },
]

// ── Calculation ──────────────────────────────────────────────────────────────

interface SpeedResult {
  speed: number
  tier: string
  explanation: string[]
  practicalMeaning: string
  costRange: string
  stateSlug: string
  stateName: string
  overpaying: boolean
}

function calculateSpeed(answers: Record<string, string | string[]>): SpeedResult {
  const people = answers.people as string
  const activities = (answers.activities as string[]) || []
  const devices = answers.devices as string
  const extras = (answers.extras as string[]) || []
  const stateValue = answers.state as string

  // Base speed per person
  let personCount = 1
  if (people === '2') personCount = 2
  else if (people === '3-4') personCount = 3.5
  else if (people === '5+') personCount = 5

  let baseMbps = personCount * 10
  const reasons: string[] = []

  reasons.push(`${personCount === 3.5 ? '3-4' : personCount} ${personCount === 1 ? 'person' : 'people'} in your home needs about ${Math.round(baseMbps)} Mbps as a starting point`)

  // Activities
  if (activities.includes('video-calls')) {
    const videoAdd = Math.min(personCount, 3) * 10
    baseMbps += videoAdd
    reasons.push(`Video calls (Zoom, FaceTime) need an extra ${Math.round(videoAdd)} Mbps to stay smooth and clear`)
  }

  if (activities.includes('streaming')) {
    const streamAdd = Math.min(personCount, 3) * 10
    baseMbps += streamAdd
    reasons.push(`Streaming TV in HD needs about ${Math.round(streamAdd)} Mbps for your household`)
  }

  if (activities.includes('smart-home')) {
    baseMbps += 5
    reasons.push('Smart home devices (speakers, thermostats, cameras) add about 5 Mbps')
  }

  // Light activities don't add much
  if (activities.includes('email') || activities.includes('shopping') || activities.includes('social') || activities.includes('banking')) {
    baseMbps += 5
  }

  // Devices
  if (devices === '6-10') {
    baseMbps += 10
    reasons.push('With 6-10 devices connected, you need extra bandwidth so nothing slows down')
  } else if (devices === '10+') {
    baseMbps += 20
    reasons.push('With 10+ devices, you need a good amount of extra bandwidth')
  }

  // Extras
  if (extras.includes('wfh')) {
    baseMbps += 25
    reasons.push('Working from home needs a reliable extra 25 Mbps for video meetings and file sharing')
  }

  if (extras.includes('downloads')) {
    baseMbps += 15
    reasons.push('Downloading large files adds about 15 Mbps to keep things fast')
  }

  if (extras.includes('gaming')) {
    baseMbps += 15
    reasons.push('Online gaming needs about 15 Mbps for a lag-free experience')
  }

  if (extras.includes('uploads')) {
    baseMbps += 10
    reasons.push('Uploading videos and photos needs about 10 Mbps extra')
  }

  // Buffer multiplier
  const buffered = Math.round(baseMbps * 1.5)

  // Round to nearest 25
  const recommended = Math.ceil(buffered / 25) * 25

  // Tier
  let tier = 'Light'
  if (recommended >= 300) tier = 'Very Heavy'
  else if (recommended >= 100) tier = 'Heavy'
  else if (recommended >= 25) tier = 'Moderate'

  // Practical meaning
  let practicalMeaning = ''
  if (recommended <= 25) {
    practicalMeaning = 'This is enough for one person to browse the web, check email, and do occasional video calls. Think of it like a quiet road with just one car — everything moves along smoothly.'
  } else if (recommended <= 100) {
    practicalMeaning = 'This is enough for a couple of people to stream TV, make video calls, and browse the web at the same time. Think of it like a two-lane road — there is room for everyone without slowing down.'
  } else if (recommended <= 300) {
    practicalMeaning = 'This handles a busy household where multiple people are streaming, video calling, and working online at the same time. Think of it like a four-lane highway — plenty of room for everyone.'
  } else {
    practicalMeaning = 'This is for a very active household with many devices and heavy internet use. Think of it like a six-lane highway — even during rush hour, everything keeps moving fast.'
  }

  // Cost estimate
  let costRange = ''
  if (recommended <= 25) costRange = '$20 - $40/month'
  else if (recommended <= 100) costRange = '$40 - $60/month'
  else if (recommended <= 300) costRange = '$50 - $80/month'
  else costRange = '$70 - $100+/month'

  // State
  const stateData = statesData.find((s) => s.slug === stateValue)
  const stateName = stateData?.name || 'your state'
  const stateSlug = stateData?.slug || ''

  return {
    speed: recommended,
    tier,
    explanation: reasons,
    practicalMeaning,
    costRange,
    stateSlug,
    stateName,
    overpaying: recommended < 100,
  }
}

// ── Component ────────────────────────────────────────────────────────────────

export default function SpeedCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [result, setResult] = useState<SpeedResult | null>(null)
  const [selectedState, setSelectedState] = useState('')
  const shouldReduceMotion = useReducedMotion()

  const totalSteps = steps.length
  const progress = result ? 100 : ((currentStep) / totalSteps) * 100

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -40 },
        transition: { duration: 0.3 },
      }

  const handleSingleSelect = useCallback(
    (stepId: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [stepId]: value }))
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1)
      }
    },
    [currentStep, totalSteps]
  )

  const handleMultiSelect = useCallback(
    (stepId: string, value: string) => {
      setAnswers((prev) => {
        const current = (prev[stepId] as string[]) || []
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value]
        return { ...prev, [stepId]: updated }
      })
    },
    []
  )

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Calculate result
      const finalAnswers = { ...answers, state: selectedState }
      setResult(calculateSpeed(finalAnswers))
    }
  }, [currentStep, totalSteps, answers, selectedState])

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const handleReset = useCallback(() => {
    setCurrentStep(0)
    setAnswers({})
    setResult(null)
    setSelectedState('')
  }, [])

  const canProceed = () => {
    const step = steps[currentStep]
    if (step.id === 'state') return selectedState !== ''
    if (step.multiSelect) return true // multi-select can proceed even empty
    return !!answers[step.id]
  }

  // ── Result Screen ────────────────────────────────────────────────────────

  if (result) {
    const tierColors: Record<string, string> = {
      Light: 'text-emerald-600',
      Moderate: 'text-blue-600',
      Heavy: 'text-amber-600',
      'Very Heavy': 'text-red-600',
    }

    return (
      <motion.div
        {...(shouldReduceMotion ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } })}
        className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-6 sm:p-8"
      >
        {/* Main result */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Your Results Are Ready
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
            You need approximately
          </h2>
          <p className="text-5xl sm:text-6xl font-bold text-brand-blue mb-2">
            {result.speed} Mbps
          </p>
          <p className={`text-lg font-semibold ${tierColors[result.tier] || 'text-blue-600'}`}>
            {result.tier} Usage
          </p>
        </div>

        {/* Practical meaning */}
        <div
          className="rounded-xl p-5 sm:p-6 mb-6"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
        >
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-brand-blue" />
            What This Means in Plain English
          </h3>
          <p className="text-[var(--text-secondary)] leading-relaxed text-base">
            {result.practicalMeaning}
          </p>
        </div>

        {/* Why this speed */}
        <div
          className="rounded-xl p-5 sm:p-6 mb-6"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
        >
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Why We Recommend This Speed
          </h3>
          <ul className="space-y-2">
            {result.explanation.map((reason, i) => (
              <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)] text-sm sm:text-base">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                {reason}
              </li>
            ))}
            <li className="flex items-start gap-3 text-[var(--text-secondary)] text-sm sm:text-base italic">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
              We added a 50% buffer so your internet stays fast even during busy times
            </li>
          </ul>
        </div>

        {/* Cost estimate */}
        <div
          className="rounded-xl p-5 sm:p-6 mb-6"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
        >
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            Estimated Monthly Cost
          </h3>
          <p className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            {result.costRange}
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Actual prices vary by provider and location. Many providers offer senior discounts or low-income programs that can reduce your bill.
          </p>
        </div>

        {/* Overpaying callout */}
        {result.overpaying && (
          <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 sm:p-6 mb-6">
            <h3 className="text-lg font-bold text-amber-800 mb-2">
              You Might Be Overpaying
            </h3>
            <p className="text-amber-700 text-sm sm:text-base leading-relaxed">
              Many internet providers push plans with 200-500 Mbps speeds, but your household only
              needs about {result.speed} Mbps. If you are paying for more speed than you need, you
              could save $20-40 per month by switching to a lower-tier plan. Call your provider and
              ask what plans are available at {result.speed} Mbps or lower.
            </p>
          </div>
        )}

        {/* State link */}
        {result.stateSlug && (
          <div
            className="rounded-xl p-5 sm:p-6 mb-6 border border-[var(--border-color)]"
          >
            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-blue" />
              Plans Available in {result.stateName}
            </h3>
            <p className="text-[var(--text-secondary)] mb-4 text-sm sm:text-base">
              See which internet providers serve {result.stateName}, compare prices, and find
              senior discounts and low-income programs in your area.
            </p>
            <Link
              href={`/tools/internet-by-state/${result.stateSlug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
            >
              See Plans in {result.stateName}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Start over */}
        <div className="text-center pt-4">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] font-medium hover:bg-[var(--bg-tertiary)] transition-colors text-sm sm:text-base"
          >
            <RotateCcw className="w-4 h-4" />
            Start Over
          </button>
        </div>
      </motion.div>
    )
  }

  // ── Quiz Steps ────────────────────────────────────────────────────────────

  const step = steps[currentStep]
  const isMultiSelect = step.multiSelect
  const isStateStep = step.id === 'state'
  const selectedMulti = (answers[step.id] as string[]) || []

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] overflow-hidden">
      {/* Progress bar */}
      <div className="h-2 bg-[var(--bg-tertiary)]">
        <motion.div
          className="h-full bg-brand-blue rounded-r-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Step indicator */}
      <div className="px-6 pt-5 pb-2">
        <p className="text-sm font-medium text-[var(--text-muted)]">
          Step {currentStep + 1} of {totalSteps}
        </p>
      </div>

      {/* Question */}
      <div className="px-6 pb-6">
        <AnimatePresence mode="wait">
          <motion.div key={step.id} {...motionProps}>
            <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
              {step.question}
            </h2>
            <p className="text-[var(--text-secondary)] mb-6 text-sm sm:text-base">
              {step.subtitle}
            </p>

            {/* State dropdown */}
            {isStateStep ? (
              <div className="mb-6">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-lg cursor-pointer focus:border-brand-blue focus:outline-none transition-colors appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23666\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: '48px' }}
                  aria-label="Select your state"
                >
                  <option value="">Choose your state...</option>
                  {statesData.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              /* Option buttons */
              <div className="grid gap-3 sm:grid-cols-2">
                {step.options.map((option) => {
                  const isSelected = isMultiSelect
                    ? selectedMulti.includes(option.value)
                    : answers[step.id] === option.value

                  return (
                    <button
                      key={option.value}
                      onClick={() =>
                        isMultiSelect
                          ? handleMultiSelect(step.id, option.value)
                          : handleSingleSelect(step.id, option.value)
                      }
                      className={`flex items-center gap-3 p-4 sm:p-5 rounded-xl border-2 text-left transition-all text-base sm:text-lg font-medium ${
                        isSelected
                          ? 'border-brand-blue bg-blue-50 text-brand-blue shadow-sm'
                          : 'border-[var(--border-color)] text-[var(--text-primary)] hover:border-brand-blue hover:bg-[var(--bg-tertiary)]'
                      }`}
                      aria-pressed={isSelected}
                    >
                      {option.icon && (
                        <span className="text-2xl" aria-hidden="true">
                          {option.icon}
                        </span>
                      )}
                      <span>{option.label}</span>
                      {isSelected && isMultiSelect && (
                        <CheckCircle className="w-5 h-5 ml-auto text-brand-blue shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border-color)]">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-[var(--text-secondary)] font-medium hover:bg-[var(--bg-tertiary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {(isMultiSelect || isStateStep) && (
            <button
              onClick={handleNext}
              disabled={isStateStep && !canProceed()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {currentStep === totalSteps - 1 ? 'See My Results' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
