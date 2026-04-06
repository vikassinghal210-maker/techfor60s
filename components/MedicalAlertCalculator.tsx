'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  RotateCcw,
  ChevronRight,
  CheckCircle,
  Check,
  X,
  Star,
  Printer,
  Shield,
  Heart,
  Phone,
  MapPin,
  Droplets,
  Bell,
  Smartphone,
  Clock,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { trackToolUsage } from '@/lib/ga-events'

// ── Types ────────────────────────────────────────────────────────────────────

interface QuizOption {
  label: string
  value: string
  icon: string
}

interface QuizStep {
  id: string
  question: string
  subtitle: string
  type: 'radio' | 'checkbox'
  options: QuizOption[]
}

interface AlertSystem {
  name: string
  slug: string
  priceMin: number
  priceMax: number
  tagline: string
  features: {
    fallDetection: boolean
    gps: boolean
    medicationReminders: boolean
    twoWayCommunication: boolean
    waterproof: boolean
    caregiverApp: boolean
    monitoring247: boolean
  }
  pros: string[]
  cons: string[]
  bestFor: string
  formFactors: string[]
}

interface ScoredSystem extends AlertSystem {
  score: number
  matchReasons: string[]
}

// ── Quiz Steps ──────────────────────────────────────────────────────────────

const steps: QuizStep[] = [
  {
    id: 'whoFor',
    question: 'Who is this medical alert system for?',
    subtitle: 'This helps us tailor our recommendations.',
    type: 'radio',
    options: [
      { label: 'Myself', value: 'myself', icon: '🧑' },
      { label: 'My parent', value: 'parent', icon: '👨‍👩‍👧' },
      { label: 'My spouse', value: 'spouse', icon: '💑' },
      { label: 'Another family member', value: 'other', icon: '👪' },
    ],
  },
  {
    id: 'livingSituation',
    question: 'What is the living situation?',
    subtitle: 'This affects which monitoring features matter most.',
    type: 'radio',
    options: [
      { label: 'Lives alone', value: 'alone', icon: '🏠' },
      { label: 'With spouse or partner', value: 'withSpouse', icon: '🏡' },
      { label: 'With family', value: 'withFamily', icon: '👨‍👩‍👧‍👦' },
      { label: 'Assisted living or retirement community', value: 'assisted', icon: '🏘️' },
    ],
  },
  {
    id: 'mobility',
    question: 'How would you describe the mobility level?',
    subtitle: 'This helps determine if GPS or fall detection is needed.',
    type: 'radio',
    options: [
      { label: 'Active and mobile', value: 'active', icon: '🚶' },
      { label: 'Mostly mobile, occasional balance issues', value: 'mostlyMobile', icon: '🤸' },
      { label: 'Uses walker or cane', value: 'walkerCane', icon: '🦯' },
      { label: 'Uses wheelchair', value: 'wheelchair', icon: '♿' },
      { label: 'Mostly homebound', value: 'homebound', icon: '🛋️' },
    ],
  },
  {
    id: 'features',
    question: 'Which features are most important?',
    subtitle: 'Select all that apply — you can pick more than one.',
    type: 'checkbox',
    options: [
      { label: 'Fall detection (automatic)', value: 'fallDetection', icon: '🛡️' },
      { label: 'GPS tracking (works outside home)', value: 'gps', icon: '📍' },
      { label: 'Medication reminders', value: 'medicationReminders', icon: '💊' },
      { label: 'Two-way communication', value: 'twoWayCommunication', icon: '📞' },
      { label: 'Waterproof (shower-safe)', value: 'waterproof', icon: '💧' },
      { label: 'Caregiver app', value: 'caregiverApp', icon: '📱' },
      { label: '24/7 monitoring center', value: 'monitoring247', icon: '🏥' },
    ],
  },
  {
    id: 'budget',
    question: 'What is the monthly budget?',
    subtitle: 'All systems have monthly fees. Some require equipment purchases too.',
    type: 'radio',
    options: [
      { label: 'Under $20/month', value: 'under20', icon: '💰' },
      { label: '$20 - $35/month', value: '20to35', icon: '💰💰' },
      { label: '$35 - $50/month', value: '35to50', icon: '💰💰💰' },
      { label: '$50+/month (premium features)', value: 'over50', icon: '✨' },
      { label: 'Not sure yet', value: 'unsure', icon: '🤔' },
    ],
  },
  {
    id: 'techComfort',
    question: 'What is the comfort level with technology?',
    subtitle: 'This helps us recommend the right form factor.',
    type: 'radio',
    options: [
      { label: 'Prefers simple button press', value: 'buttonOnly', icon: '🔴' },
      { label: 'Comfortable with a smartwatch', value: 'smartwatch', icon: '⌚' },
      { label: 'OK with smartphone app', value: 'smartphone', icon: '📱' },
      { label: 'Wants the simplest option possible', value: 'simplest', icon: '👌' },
    ],
  },
]

// ── Systems Database ────────────────────────────────────────────────────────

const systems: AlertSystem[] = [
  {
    name: 'Medical Guardian',
    slug: 'medical-guardian',
    priceMin: 29.95,
    priceMax: 49.95,
    tagline: 'Best overall medical alert system with comprehensive features and caregiver tools.',
    features: {
      fallDetection: true,
      gps: true,
      medicationReminders: false,
      twoWayCommunication: true,
      waterproof: true,
      caregiverApp: true,
      monitoring247: true,
    },
    pros: [
      'Excellent caregiver app with location sharing',
      'Multiple device options (pendant, wristband, smartwatch)',
      'Fall detection available on all plans',
      'Reliable 24/7 monitoring center',
    ],
    cons: [
      'Mid-range to premium pricing',
      'Fall detection costs extra per month',
      'Requires contract on some plans',
    ],
    bestFor: 'Best overall choice — great for families wanting peace of mind',
    formFactors: ['pendant', 'wristband', 'smartwatch'],
  },
  {
    name: 'Bay Alarm Medical',
    slug: 'bay-alarm-medical',
    priceMin: 19.95,
    priceMax: 39.95,
    tagline: 'Best value medical alert with affordable plans and no long-term contracts.',
    features: {
      fallDetection: true,
      gps: true,
      medicationReminders: false,
      twoWayCommunication: true,
      waterproof: true,
      caregiverApp: false,
      monitoring247: true,
    },
    pros: [
      'Very affordable starting price',
      'No long-term contracts required',
      'Free spouse monitoring on same plan',
      '30-day money-back guarantee',
    ],
    cons: [
      'No dedicated caregiver app',
      'Fewer device style options',
      'GPS only on mobile plan',
    ],
    bestFor: 'Best value — affordable protection without sacrificing quality',
    formFactors: ['pendant', 'wristband'],
  },
  {
    name: 'MobileHelp',
    slug: 'mobilehelp',
    priceMin: 19.95,
    priceMax: 41.95,
    tagline: 'Best for active seniors who want GPS protection at home and on the go.',
    features: {
      fallDetection: true,
      gps: true,
      medicationReminders: true,
      twoWayCommunication: true,
      waterproof: true,
      caregiverApp: false,
      monitoring247: true,
    },
    pros: [
      'Pairs with Apple Watch and smartwatches',
      'Built-in medication reminders',
      'GPS works nationwide',
      'Connect app for caregiver check-ins',
    ],
    cons: [
      'Smartwatch pairing requires separate setup',
      'Mobile device is a bit bulky',
      'Some plans require annual commitment',
    ],
    bestFor: 'Best for active seniors — GPS protection wherever you go',
    formFactors: ['pendant', 'smartwatch', 'mobile-device'],
  },
  {
    name: 'Lively (formerly GreatCall)',
    slug: 'lively',
    priceMin: 24.99,
    priceMax: 49.99,
    tagline: 'Best phone integration with the easy-to-use Jitterbug smartphone built in.',
    features: {
      fallDetection: false,
      gps: true,
      medicationReminders: false,
      twoWayCommunication: true,
      waterproof: false,
      caregiverApp: true,
      monitoring247: true,
    },
    pros: [
      'Built into the Jitterbug phone — no extra device needed',
      'Urgent Response button on phone',
      'Lively Link caregiver app included',
      'Health and safety packages available',
    ],
    cons: [
      'Requires purchasing Jitterbug phone',
      'No automatic fall detection',
      'Device is not waterproof',
      'Higher cost when phone plan is included',
    ],
    bestFor: 'Best for seniors who want an all-in-one phone and alert system',
    formFactors: ['smartphone'],
  },
  {
    name: 'Life Alert',
    slug: 'life-alert',
    priceMin: 49.95,
    priceMax: 69.95,
    tagline: 'The most recognized brand in medical alerts — "I\'ve fallen and I can\'t get up."',
    features: {
      fallDetection: false,
      gps: true,
      medicationReminders: false,
      twoWayCommunication: true,
      waterproof: true,
      caregiverApp: false,
      monitoring247: true,
    },
    pros: [
      'Most recognized and trusted brand name',
      'Own monitoring centers (not outsourced)',
      'Works at home and away',
      'Shower-safe pendant option',
    ],
    cons: [
      'Most expensive option',
      'No automatic fall detection',
      'Requires 3-year contract',
      'No caregiver app or modern features',
    ],
    bestFor: 'Most trusted brand name — ideal if brand reputation matters most',
    formFactors: ['pendant', 'wristband'],
  },
  {
    name: 'Medical Care Alert',
    slug: 'medical-care-alert',
    priceMin: 19.95,
    priceMax: 34.95,
    tagline: 'Best budget option with long battery life and straightforward pricing.',
    features: {
      fallDetection: true,
      gps: true,
      medicationReminders: false,
      twoWayCommunication: true,
      waterproof: true,
      caregiverApp: false,
      monitoring247: true,
    },
    pros: [
      'Lowest starting price available',
      'Extra-long battery life on mobile device',
      'Simple, transparent pricing',
      'No hidden fees or equipment costs',
    ],
    cons: [
      'Fewer advanced features',
      'No caregiver app',
      'Basic design and interface',
      'Limited customer support hours',
    ],
    bestFor: 'Best budget pick — reliable protection at the lowest monthly cost',
    formFactors: ['pendant', 'wristband', 'mobile-device'],
  },
  {
    name: 'GetSafe',
    slug: 'getsafe',
    priceMin: 24.95,
    priceMax: 44.95,
    tagline: 'Best for homebound seniors with voice-activated wall-mounted base station.',
    features: {
      fallDetection: true,
      gps: false,
      medicationReminders: false,
      twoWayCommunication: true,
      waterproof: true,
      caregiverApp: true,
      monitoring247: true,
    },
    pros: [
      'Voice-activated — just call out for help',
      'Wall-mounted base covers whole home',
      'Caregiver alert notifications',
      'No wearable device required (optional)',
    ],
    cons: [
      'No GPS or mobile option',
      'Only works inside the home',
      'Wall mounting may require installation help',
      'Limited to home coverage area',
    ],
    bestFor: 'Best for homebound — voice-activated help without wearing a device',
    formFactors: ['wall-mount', 'pendant'],
  },
  {
    name: 'Lifeline by Philips',
    slug: 'lifeline-philips',
    priceMin: 29.95,
    priceMax: 49.95,
    tagline: 'Best for fall risk with industry-leading AutoAlert fall detection technology.',
    features: {
      fallDetection: true,
      gps: true,
      medicationReminders: false,
      twoWayCommunication: true,
      waterproof: true,
      caregiverApp: true,
      monitoring247: true,
    },
    pros: [
      'Industry-leading AutoAlert fall detection',
      'GoSafe GPS for on-the-go protection',
      'Backed by Philips — trusted healthcare brand',
      'CareSage predictive analytics',
    ],
    cons: [
      'Premium pricing for full features',
      'Fall detection adds to monthly cost',
      'Some plans require long-term contract',
    ],
    bestFor: 'Best for fall risk — the most advanced fall detection available',
    formFactors: ['pendant', 'wristband'],
  },
]

// ── Scoring Engine ──────────────────────────────────────────────────────────

function scoreSystem(
  system: AlertSystem,
  answers: Record<string, string>,
  selectedFeatures: string[]
): ScoredSystem {
  let score = 50 // base score
  const matchReasons: string[] = []

  // Feature matching — most important factor
  const featureMap: Record<string, keyof AlertSystem['features']> = {
    fallDetection: 'fallDetection',
    gps: 'gps',
    medicationReminders: 'medicationReminders',
    twoWayCommunication: 'twoWayCommunication',
    waterproof: 'waterproof',
    caregiverApp: 'caregiverApp',
    monitoring247: 'monitoring247',
  }

  for (const feat of selectedFeatures) {
    const key = featureMap[feat]
    if (key && system.features[key]) {
      score += 12
      const labels: Record<string, string> = {
        fallDetection: 'fall detection',
        gps: 'GPS tracking',
        medicationReminders: 'medication reminders',
        twoWayCommunication: 'two-way communication',
        waterproof: 'waterproof design',
        caregiverApp: 'caregiver app',
        monitoring247: '24/7 monitoring',
      }
      matchReasons.push(`Has ${labels[feat]} you requested`)
    }
  }

  // Living situation scoring
  const living = answers.livingSituation
  if (living === 'alone') {
    if (system.features.monitoring247) {
      score += 8
      matchReasons.push('24/7 monitoring is critical for living alone')
    }
    if (system.features.fallDetection) {
      score += 6
      matchReasons.push('Fall detection important when no one else is home')
    }
  }
  if (living === 'assisted') {
    score += 3 // most systems work fine
  }

  // Mobility scoring
  const mobility = answers.mobility
  if (mobility === 'active') {
    if (system.features.gps) {
      score += 8
      matchReasons.push('GPS tracking keeps you protected on the go')
    }
  }
  if (mobility === 'mostlyMobile' || mobility === 'walkerCane') {
    if (system.features.fallDetection) {
      score += 10
      matchReasons.push('Fall detection is essential for balance concerns')
    }
  }
  if (mobility === 'homebound') {
    if (system.slug === 'getsafe') {
      score += 15
      matchReasons.push('Voice-activated base is perfect for homebound use')
    }
    if (!system.features.gps) {
      score += 3 // don't need GPS, cheaper without it
    }
  }
  if (mobility === 'wheelchair') {
    if (system.features.twoWayCommunication) {
      score += 5
    }
  }

  // Budget scoring
  const budget = answers.budget
  if (budget === 'under20') {
    if (system.priceMin <= 19.95) {
      score += 10
      matchReasons.push('Fits your budget at under $20/month')
    } else if (system.priceMin <= 25) {
      score += 3
    } else {
      score -= 10
    }
  } else if (budget === '20to35') {
    if (system.priceMin >= 19.95 && system.priceMin <= 35) {
      score += 8
      matchReasons.push('Fits comfortably within your budget range')
    } else if (system.priceMin > 40) {
      score -= 5
    }
  } else if (budget === '35to50') {
    if (system.priceMax <= 50) {
      score += 6
      matchReasons.push('Premium features within your budget')
    }
  } else if (budget === 'over50') {
    score += 4 // all options on the table
    if (system.priceMax >= 45) {
      score += 3
      matchReasons.push('Premium system with advanced features')
    }
  }
  // 'unsure' — no budget penalty

  // Tech comfort scoring
  const tech = answers.techComfort
  if (tech === 'buttonOnly' || tech === 'simplest') {
    if (system.formFactors.includes('pendant') || system.formFactors.includes('wall-mount')) {
      score += 6
      matchReasons.push('Simple one-button operation — no tech skills needed')
    }
    if (system.slug === 'lively') {
      score -= 5 // requires phone usage
    }
  }
  if (tech === 'smartwatch') {
    if (system.formFactors.includes('smartwatch')) {
      score += 10
      matchReasons.push('Offers smartwatch option for tech-comfortable users')
    }
  }
  if (tech === 'smartphone') {
    if (system.slug === 'lively') {
      score += 10
      matchReasons.push('Integrates directly with the Jitterbug smartphone')
    }
    if (system.features.caregiverApp) {
      score += 4
    }
  }

  // Who it's for — caregiver app bonus for family
  if (answers.whoFor === 'parent' || answers.whoFor === 'other') {
    if (system.features.caregiverApp) {
      score += 6
      matchReasons.push('Caregiver app lets you check in remotely')
    }
  }

  // Cap score at 100
  score = Math.min(100, Math.max(0, score))

  return { ...system, score, matchReasons }
}

function getRecommendations(
  answers: Record<string, string>,
  selectedFeatures: string[]
): ScoredSystem[] {
  const scored = systems.map((s) => scoreSystem(s, answers, selectedFeatures))
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 3)
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
  if (shouldReduceMotion) return <div className={className}>{children}</div>
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

// ── Feature Icon helper ─────────────────────────────────────────────────────

function FeatureIcon({ feature }: { feature: string }) {
  const icons: Record<string, React.ReactNode> = {
    fallDetection: <Shield className="w-4 h-4" />,
    gps: <MapPin className="w-4 h-4" />,
    medicationReminders: <Bell className="w-4 h-4" />,
    twoWayCommunication: <Phone className="w-4 h-4" />,
    waterproof: <Droplets className="w-4 h-4" />,
    caregiverApp: <Smartphone className="w-4 h-4" />,
    monitoring247: <Clock className="w-4 h-4" />,
  }
  return <>{icons[feature] || <Heart className="w-4 h-4" />}</>
}

const featureLabels: Record<string, string> = {
  fallDetection: 'Fall Detection',
  gps: 'GPS Tracking',
  medicationReminders: 'Medication Reminders',
  twoWayCommunication: 'Two-Way Communication',
  waterproof: 'Waterproof',
  caregiverApp: 'Caregiver App',
  monitoring247: '24/7 Monitoring',
}

// ── Main Component ──────────────────────────────────────────────────────────

export default function MedicalAlertCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const totalSteps = steps.length
  const progress = showResult ? 100 : Math.round((currentStep / totalSteps) * 100)

  const handleRadioAnswer = useCallback(
    (stepId: string, value: string) => {
      const newAnswers = { ...answers, [stepId]: value }
      setAnswers(newAnswers)
      if (currentStep === 0) trackToolUsage('medical-alert-calculator', 'start')
      if (currentStep < totalSteps - 1) {
        setTimeout(() => setCurrentStep((s) => s + 1), 300)
      } else {
        trackToolUsage('medical-alert-calculator', 'complete')
        setTimeout(() => setShowResult(true), 300)
      }
    },
    [answers, currentStep, totalSteps]
  )

  const handleCheckboxToggle = useCallback((value: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }, [])

  const handleCheckboxNext = useCallback(() => {
    if (currentStep === 0) trackToolUsage('medical-alert-calculator', 'start')
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      trackToolUsage('medical-alert-calculator', 'complete')
      setShowResult(true)
    }
  }, [currentStep, totalSteps])

  const handleRestart = useCallback(() => {
    setCurrentStep(0)
    setAnswers({})
    setSelectedFeatures([])
    setShowResult(false)
  }, [])

  const handleBack = useCallback(() => {
    if (showResult) {
      setShowResult(false)
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }, [currentStep, showResult])

  const recommendations = useMemo(
    () => (showResult ? getRecommendations(answers, selectedFeatures) : []),
    [showResult, answers, selectedFeatures]
  )

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            {showResult ? 'Your Recommendations' : `Step ${currentStep + 1} of ${totalSteps}`}
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
            {steps[currentStep].type === 'radio' ? (
              <RadioStepCard
                step={steps[currentStep]}
                selectedValue={answers[steps[currentStep].id]}
                onSelect={(value) => handleRadioAnswer(steps[currentStep].id, value)}
              />
            ) : (
              <CheckboxStepCard
                step={steps[currentStep]}
                selectedValues={selectedFeatures}
                onToggle={handleCheckboxToggle}
                onNext={handleCheckboxNext}
              />
            )}
          </MotionDiv>
        ) : (
          <MotionDiv motionKey="results">
            <ResultsScreen
              recommendations={recommendations}
              onRestart={handleRestart}
            />
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Radio Step Card ─────────────────────────────────────────────────────────

function RadioStepCard({
  step,
  selectedValue,
  onSelect,
}: {
  step: QuizStep
  selectedValue?: string
  onSelect: (value: string) => void
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
        {step.question}
      </h2>
      <p className="text-[var(--text-secondary)] mb-6 text-base sm:text-lg">{step.subtitle}</p>
      <div className="space-y-3">
        {step.options.map((option) => {
          const isSelected = selectedValue === option.value
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 sm:gap-4 group ${
                isSelected
                  ? 'border-brand-blue bg-brand-blue/10 shadow-md'
                  : 'border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-brand-blue/50 hover:shadow-sm'
              }`}
              aria-pressed={isSelected}
            >
              <span className="text-2xl sm:text-3xl shrink-0" aria-hidden="true">
                {option.icon}
              </span>
              <span
                className={`text-base sm:text-lg font-medium ${
                  isSelected ? 'text-brand-blue' : 'text-[var(--text-primary)] group-hover:text-brand-blue'
                } transition-colors`}
              >
                {option.label}
              </span>
              {isSelected && <CheckCircle className="w-5 h-5 text-brand-blue ml-auto shrink-0" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Checkbox Step Card ──────────────────────────────────────────────────────

function CheckboxStepCard({
  step,
  selectedValues,
  onToggle,
  onNext,
}: {
  step: QuizStep
  selectedValues: string[]
  onToggle: (value: string) => void
  onNext: () => void
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
        {step.question}
      </h2>
      <p className="text-[var(--text-secondary)] mb-6 text-base sm:text-lg">{step.subtitle}</p>
      <div className="space-y-3">
        {step.options.map((option) => {
          const isSelected = selectedValues.includes(option.value)
          return (
            <button
              key={option.value}
              onClick={() => onToggle(option.value)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 sm:gap-4 group ${
                isSelected
                  ? 'border-brand-blue bg-brand-blue/10 shadow-md'
                  : 'border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-brand-blue/50 hover:shadow-sm'
              }`}
              aria-pressed={isSelected}
              role="checkbox"
              aria-checked={isSelected}
            >
              <span className="text-2xl sm:text-3xl shrink-0" aria-hidden="true">
                {option.icon}
              </span>
              <span
                className={`text-base sm:text-lg font-medium ${
                  isSelected ? 'text-brand-blue' : 'text-[var(--text-primary)] group-hover:text-brand-blue'
                } transition-colors`}
              >
                {option.label}
              </span>
              <div
                className={`ml-auto w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                  isSelected ? 'border-brand-blue bg-brand-blue' : 'border-[var(--border-color)]'
                }`}
              >
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </div>
            </button>
          )
        })}
      </div>
      <button
        onClick={onNext}
        className="mt-6 w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-blue text-white font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        Continue
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

// ── Results Screen ──────────────────────────────────────────────────────────

function ResultsScreen({
  recommendations,
  onRestart,
}: {
  recommendations: ScoredSystem[]
  onRestart: () => void
}) {
  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <div className="space-y-8 print:space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm overflow-hidden">
        <div className="bg-brand-blue text-white p-6 sm:p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">
            Your Top 3 Recommendations
          </h2>
          <p className="text-blue-100 text-base sm:text-lg max-w-lg mx-auto">
            Based on your answers, here are the medical alert systems that best match your needs.
          </p>
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-end print:hidden">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-brand-blue hover:border-brand-blue transition-colors text-sm font-medium"
        >
          <Printer className="w-4 h-4" />
          Print Results
        </button>
      </div>

      {/* Recommendation Cards */}
      {recommendations.map((system, index) => (
        <SystemCard key={system.slug} system={system} rank={index + 1} />
      ))}

      {/* Cost Comparison Table */}
      <CostComparisonTable recommendations={recommendations} />

      {/* Questions to Ask */}
      <QuestionsChecklist />

      {/* Related Articles */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <h3
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Helpful Articles
        </h3>
        <ul className="space-y-3">
          <li>
            <Link
              href="/blog/best-medical-alert-systems-2026"
              className="flex items-center gap-2 text-brand-blue font-medium hover:underline text-base"
            >
              <ChevronRight className="w-4 h-4 shrink-0" />
              Best Medical Alert Systems for Seniors (2026 Guide)
            </Link>
          </li>
          <li>
            <Link
              href="/blog/best-fall-detection-devices-for-seniors"
              className="flex items-center gap-2 text-brand-blue font-medium hover:underline text-base"
            >
              <ChevronRight className="w-4 h-4 shrink-0" />
              Best Fall Detection Devices for Seniors
            </Link>
          </li>
          <li>
            <Link
              href="/category/health-wellness"
              className="flex items-center gap-2 text-brand-blue font-medium hover:underline text-base"
            >
              <ChevronRight className="w-4 h-4 shrink-0" />
              Browse All Health & Wellness Articles
            </Link>
          </li>
        </ul>
      </div>

      {/* Restart */}
      <div className="text-center print:hidden">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-primary)] border-2 border-[var(--border-color)] text-[var(--text-primary)] font-semibold hover:border-brand-blue hover:text-brand-blue transition-all duration-200 text-base"
        >
          <RotateCcw className="w-5 h-5" />
          Start Over
        </button>
      </div>
    </div>
  )
}

// ── System Card ─────────────────────────────────────────────────────────────

function SystemCard({ system, rank }: { system: ScoredSystem; rank: number }) {
  const starCount = system.score >= 85 ? 5 : system.score >= 70 ? 4 : system.score >= 55 ? 3 : 2

  return (
    <div
      className={`rounded-2xl border overflow-hidden shadow-sm ${
        rank === 1 ? 'border-brand-blue ring-2 ring-brand-blue/20' : 'border-[var(--border-color)]'
      }`}
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      {/* Card Header */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-white text-lg shrink-0 ${
                rank === 1 ? 'bg-brand-blue' : rank === 2 ? 'bg-blue-400' : 'bg-blue-300'
              }`}
            >
              {rank}
            </div>
            <div className="min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)]">
                {system.name}
              </h3>
              <p className="text-sm text-brand-blue font-semibold">{system.bestFor}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              ${system.priceMin} - ${system.priceMax}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">per month</div>
          </div>
        </div>

        {/* Match Score */}
        <div className="mb-4 p-4 rounded-xl bg-[var(--bg-tertiary)]">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < starCount ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {system.score}% Match
            </span>
          </div>
          {system.matchReasons.length > 0 && (
            <ul className="space-y-1">
              {system.matchReasons.slice(0, 4).map((reason, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  {reason}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-[var(--text-secondary)] mb-5 text-base leading-relaxed">
          {system.tagline}
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
          {Object.entries(system.features).map(([key, has]) => (
            <div
              key={key}
              className={`flex items-center gap-2 text-sm p-2 rounded-lg ${
                has
                  ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
                  : 'text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/30'
              }`}
            >
              {has ? <Check className="w-4 h-4 shrink-0" /> : <X className="w-4 h-4 shrink-0" />}
              <FeatureIcon feature={key} />
              <span className="truncate">{featureLabels[key]}</span>
            </div>
          ))}
        </div>

        {/* Pros & Cons */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-1">
              <Check className="w-4 h-4" /> Pros
            </h4>
            <ul className="space-y-1.5">
              {system.pros.map((pro, i) => (
                <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                  <span className="text-green-500 mt-1 shrink-0">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-1">
              <X className="w-4 h-4" /> Cons
            </h4>
            <ul className="space-y-1.5">
              {system.cons.map((con, i) => (
                <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                  <span className="text-red-500 mt-1 shrink-0">-</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Learn More Link */}
        <div className="mt-5 pt-5 border-t border-[var(--border-color)]">
          <Link
            href="/blog/best-medical-alert-systems-2026"
            className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:underline text-base"
          >
            Learn more about {system.name}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Cost Comparison Table ───────────────────────────────────────────────────

function CostComparisonTable({ recommendations }: { recommendations: ScoredSystem[] }) {
  return (
    <div
      className="rounded-2xl border overflow-hidden shadow-sm"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
    >
      <div className="p-6 sm:p-8">
        <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-blue" />
          Yearly Cost Comparison
        </h3>
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="pb-3 text-sm font-semibold text-[var(--text-secondary)] pr-4">System</th>
                <th className="pb-3 text-sm font-semibold text-[var(--text-secondary)] text-right pr-4">Low Plan/yr</th>
                <th className="pb-3 text-sm font-semibold text-[var(--text-secondary)] text-right pr-4">High Plan/yr</th>
                <th className="pb-3 text-sm font-semibold text-[var(--text-secondary)] text-right">Savings vs Most Expensive</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((sys, i) => {
                const yearlyLow = Math.round(sys.priceMin * 12 * 100) / 100
                const yearlyHigh = Math.round(sys.priceMax * 12 * 100) / 100
                const maxYearly = Math.max(...recommendations.map((r) => r.priceMax * 12))
                const savings = Math.round((maxYearly - yearlyHigh) * 100) / 100
                return (
                  <tr key={sys.slug} className="border-b border-[var(--border-color)] last:border-0">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
                            i === 0 ? 'bg-brand-blue' : i === 1 ? 'bg-blue-400' : 'bg-blue-300'
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="font-semibold text-[var(--text-primary)] text-sm sm:text-base">
                          {sys.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-right text-sm sm:text-base text-[var(--text-primary)] font-medium">
                      ${yearlyLow.toFixed(2)}
                    </td>
                    <td className="py-4 pr-4 text-right text-sm sm:text-base text-[var(--text-primary)] font-medium">
                      ${yearlyHigh.toFixed(2)}
                    </td>
                    <td className="py-4 text-right text-sm sm:text-base">
                      {savings > 0 ? (
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          Save ${savings.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-[var(--text-secondary)]">--</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          Prices shown are monthly plan costs multiplied by 12. Equipment costs, activation fees, and fall detection add-ons may vary. Always confirm current pricing directly with the provider.
        </p>
      </div>
    </div>
  )
}

// ── Questions Checklist ─────────────────────────────────────────────────────

const buyingQuestions = [
  'Is there a contract, and what is the cancellation policy?',
  'Is the equipment included or do I need to buy it separately?',
  'Does fall detection cost extra per month?',
  'What is the battery life and how do I charge it?',
  'Does it work outside my home (cellular vs. landline)?',
  'Can I test the system with a 30-day trial?',
  'What happens if I press the button accidentally?',
  'Is there a spouse or partner discount?',
  'Do they offer a lockbox option for first responders?',
  'Will the monitoring center contact my family or just 911?',
]

function QuestionsChecklist() {
  return (
    <div
      className="rounded-2xl border overflow-hidden shadow-sm"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
    >
      <div className="p-6 sm:p-8">
        <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
          Questions to Ask Before Buying
        </h3>
        <p className="text-[var(--text-secondary)] mb-5">
          Print this checklist and use it when calling or visiting a provider.
        </p>
        <div className="space-y-3">
          {buyingQuestions.map((q, i) => (
            <label
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                className="mt-1 w-5 h-5 rounded border-2 border-[var(--border-color)] accent-[#0F3460] shrink-0"
              />
              <span className="text-[var(--text-primary)] text-base leading-relaxed">{q}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
