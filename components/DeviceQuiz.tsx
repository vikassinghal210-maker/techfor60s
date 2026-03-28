'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { RotateCcw, Smartphone, Tablet, ChevronRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

// ── Types ────────────────────────────────────────────────────────────────────

interface QuizOption {
  label: string
  value: string
  icon?: string
}

interface QuizQuestion {
  id: string
  question: string
  subtitle: string
  options: QuizOption[]
}

interface DeviceRecommendation {
  deviceType: string
  icon: 'phone' | 'tablet'
  tagline: string
  products: { name: string; reason: string }[]
  relatedLinks: { label: string; href: string }[]
}

// ── Quiz Data ────────────────────────────────────────────────────────────────

const questions: QuizQuestion[] = [
  {
    id: 'usage',
    question: 'What will you mainly use this device for?',
    subtitle: 'Pick the one that matters most to you.',
    options: [
      { label: 'Calling family & video chats', value: 'calling', icon: '📞' },
      { label: 'Reading & browsing the web', value: 'reading', icon: '📖' },
      { label: 'Watching videos & streaming', value: 'videos', icon: '🎬' },
      { label: 'Taking photos', value: 'photos', icon: '📷' },
      { label: 'A bit of everything', value: 'everything', icon: '🌟' },
    ],
  },
  {
    id: 'comfort',
    question: 'How comfortable are you with technology?',
    subtitle: 'Be honest - there are no wrong answers!',
    options: [
      { label: 'Brand new to all this', value: 'beginner', icon: '🌱' },
      { label: 'I know the basics', value: 'intermediate', icon: '👍' },
      { label: 'Pretty comfortable', value: 'advanced', icon: '💪' },
    ],
  },
  {
    id: 'screenSize',
    question: 'What screen size do you prefer?',
    subtitle: 'Think about what feels right in your hands.',
    options: [
      { label: 'Small - fits in my pocket', value: 'small', icon: '📱' },
      { label: 'Medium - easy to carry around', value: 'medium', icon: '📲' },
      { label: 'Large - easy to read everything', value: 'large', icon: '🖥️' },
    ],
  },
  {
    id: 'budget',
    question: "What's your budget?",
    subtitle: "There are great options at every price point.",
    options: [
      { label: 'Under $200', value: 'low', icon: '💰' },
      { label: '$200 - $500', value: 'mid', icon: '💰💰' },
      { label: '$500 - $800', value: 'high', icon: '💰💰💰' },
      { label: 'Over $800', value: 'premium', icon: '✨' },
    ],
  },
  {
    id: 'ecosystem',
    question: 'Do you already use any Apple or Google products?',
    subtitle: 'Sticking with what you know can make life easier.',
    options: [
      { label: 'Apple / iPhone', value: 'apple', icon: '🍎' },
      { label: 'Google / Android', value: 'android', icon: '🤖' },
      { label: 'Not sure', value: 'unsure', icon: '🤔' },
      { label: 'Neither - starting fresh', value: 'neither', icon: '🆕' },
    ],
  },
]

// ── Recommendation Engine ────────────────────────────────────────────────────

function getRecommendation(answers: Record<string, string>): DeviceRecommendation {
  const { usage, comfort, screenSize, budget, ecosystem } = answers

  const wantsTablet = screenSize === 'large' || usage === 'reading' || usage === 'videos'
  const prefersApple = ecosystem === 'apple'
  const prefersAndroid = ecosystem === 'android'
  const isBeginner = comfort === 'beginner'
  const lowBudget = budget === 'low'
  const midBudget = budget === 'mid'

  // iPad recommendations
  if (wantsTablet && (prefersApple || (!prefersAndroid && !lowBudget))) {
    if (budget === 'premium' || budget === 'high') {
      return {
        deviceType: 'iPad Air or iPad Pro',
        icon: 'tablet',
        tagline: 'A powerful tablet with a beautiful big screen - perfect for reading, video calls, and streaming.',
        products: [
          { name: 'iPad Air (M3)', reason: 'Lightweight with a gorgeous display. Great for video calls with family and streaming your favorite shows.' },
          { name: 'iPad (10th generation)', reason: 'The most affordable full-size iPad. Simple to use with a large, clear screen.' },
          { name: 'iPad mini', reason: 'If you want Apple quality in a more portable size that still has a bigger screen than a phone.' },
        ],
        relatedLinks: [
          { label: 'Best Tablets for Seniors in 2026', href: '/blog/best-tablets-for-seniors-2026' },
          { label: 'iPhone vs Android: Which Is Easier?', href: '/blog/iphone-vs-android-for-seniors' },
        ],
      }
    }
    return {
      deviceType: 'iPad (10th Generation)',
      icon: 'tablet',
      tagline: 'Apple\'s most affordable tablet - simple to learn, beautiful screen, and perfect for staying connected.',
      products: [
        { name: 'iPad 10th Gen (from $349)', reason: 'The best value iPad. Large screen makes reading and video calls a joy. Very easy to set up.' },
        { name: 'iPad 9th Gen (refurbished, from $229)', reason: 'Save money with a refurbished model - still works beautifully and gets software updates.' },
        { name: 'iPad mini (from $499)', reason: 'A more portable option if you want something lighter to hold while reading.' },
      ],
      relatedLinks: [
        { label: 'Best Tablets for Seniors in 2026', href: '/blog/best-tablets-for-seniors-2026' },
        { label: 'iPhone vs Android: Which Is Easier?', href: '/blog/iphone-vs-android-for-seniors' },
      ],
    }
  }

  // Android tablet recommendations
  if (wantsTablet && (prefersAndroid || lowBudget)) {
    return {
      deviceType: 'Android Tablet',
      icon: 'tablet',
      tagline: 'An affordable, easy-to-use tablet with a big screen for reading, watching, and video calls.',
      products: [
        { name: 'Samsung Galaxy Tab A9+ (from $219)', reason: 'Excellent value with a bright 11-inch screen. Samsung\'s simple interface is great for beginners.' },
        { name: 'Samsung Galaxy Tab S6 Lite (from $279)', reason: 'Comes with an S Pen for writing notes. Beautiful screen for streaming and reading.' },
        { name: 'Amazon Fire HD 10 (from $139)', reason: 'The most budget-friendly option. Perfect for reading, streaming Amazon Prime, and video calls.' },
      ],
      relatedLinks: [
        { label: 'Best Tablets for Seniors in 2026', href: '/blog/best-tablets-for-seniors-2026' },
        { label: 'Best Smartphones for Seniors', href: '/blog/best-smartphones-for-seniors-2026' },
      ],
    }
  }

  // iPhone recommendations
  if (prefersApple || (isBeginner && !prefersAndroid && !lowBudget)) {
    if (budget === 'premium' || budget === 'high') {
      return {
        deviceType: 'iPhone',
        icon: 'phone',
        tagline: 'The iPhone is known for being simple and secure - a wonderful choice for staying connected with family.',
        products: [
          { name: 'iPhone 16 (from $799)', reason: 'The latest iPhone with an amazing camera and all-day battery life. Easy to use right out of the box.' },
          { name: 'iPhone 16 Plus (from $899)', reason: 'Same great phone but with a larger screen - much easier to read text and see photos.' },
          { name: 'iPhone SE (from $429)', reason: 'If you want a smaller, more affordable iPhone that still does everything you need.' },
        ],
        relatedLinks: [
          { label: 'Best Smartphones for Seniors in 2026', href: '/blog/best-smartphones-for-seniors-2026' },
          { label: 'iPhone vs Android: Which Is Easier?', href: '/blog/iphone-vs-android-for-seniors' },
        ],
      }
    }
    return {
      deviceType: 'iPhone SE or iPhone 15',
      icon: 'phone',
      tagline: 'A reliable, easy-to-use phone that keeps things simple while staying connected to family.',
      products: [
        { name: 'iPhone SE 4th Gen (from $429)', reason: 'The most affordable new iPhone. Compact, fast, and very beginner-friendly.' },
        { name: 'iPhone 15 (from $699)', reason: 'Last year\'s model at a great price. Excellent camera and a comfortable size.' },
        { name: 'iPhone 14 (refurbished, from $449)', reason: 'A smart way to save money. Still gets all the latest updates and works perfectly.' },
      ],
      relatedLinks: [
        { label: 'Best Smartphones for Seniors in 2026', href: '/blog/best-smartphones-for-seniors-2026' },
        { label: 'iPhone vs Android: Which Is Easier?', href: '/blog/iphone-vs-android-for-seniors' },
      ],
    }
  }

  // Budget Android
  if (lowBudget || midBudget) {
    return {
      deviceType: 'Budget-Friendly Android Phone',
      icon: 'phone',
      tagline: 'A great-value phone that does everything you need without breaking the bank.',
      products: [
        { name: 'Samsung Galaxy A16 (from $199)', reason: 'Excellent battery life, clear screen, and Samsung\'s Easy Mode makes everything simple to find.' },
        { name: 'Google Pixel 8a (from $349)', reason: 'Incredible camera for the price. Google\'s clean interface is very straightforward to learn.' },
        { name: 'Motorola Moto G Power (from $179)', reason: 'Two-day battery life and a huge screen. One of the best budget phones available.' },
      ],
      relatedLinks: [
        { label: 'Best Smartphones for Seniors in 2026', href: '/blog/best-smartphones-for-seniors-2026' },
        { label: 'iPhone vs Android: Which Is Easier?', href: '/blog/iphone-vs-android-for-seniors' },
      ],
    }
  }

  // Default Android recommendation
  return {
    deviceType: 'Android Phone',
    icon: 'phone',
    tagline: 'A versatile, customizable phone with lots of choices at every price point.',
    products: [
      { name: 'Google Pixel 9 (from $799)', reason: 'The best Android camera and the simplest, cleanest interface. Gets updates for 7 years.' },
      { name: 'Samsung Galaxy S25 (from $799)', reason: 'Premium build quality with Samsung\'s helpful accessibility features and Easy Mode.' },
      { name: 'Samsung Galaxy A55 (from $379)', reason: 'A mid-range gem with a beautiful screen, great battery, and all the features most people need.' },
    ],
    relatedLinks: [
      { label: 'Best Smartphones for Seniors in 2026', href: '/blog/best-smartphones-for-seniors-2026' },
      { label: 'iPhone vs Android: Which Is Easier?', href: '/blog/iphone-vs-android-for-seniors' },
    ],
  }
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

// ── Main Component ───────────────────────────────────────────────────────────

export default function DeviceQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)

  const totalSteps = questions.length
  const progress = showResult ? 100 : Math.round((currentStep / totalSteps) * 100)

  const handleAnswer = useCallback(
    (questionId: string, value: string) => {
      const newAnswers = { ...answers, [questionId]: value }
      setAnswers(newAnswers)

      if (currentStep < totalSteps - 1) {
        setTimeout(() => setCurrentStep((s) => s + 1), 300)
      } else {
        setTimeout(() => setShowResult(true), 300)
      }
    },
    [answers, currentStep, totalSteps]
  )

  const handleRestart = useCallback(() => {
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
  }, [])

  const handleBack = useCallback(() => {
    if (showResult) {
      setShowResult(false)
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }, [currentStep, showResult])

  const recommendation = showResult ? getRecommendation(answers) : null

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            {showResult ? 'Your Results' : `Question ${currentStep + 1} of ${totalSteps}`}
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
          Back to previous question
        </button>
      )}

      {/* Quiz Content */}
      <AnimatePresence mode="wait">
        {!showResult ? (
          <MotionDiv motionKey={`question-${currentStep}`}>
            <QuestionCard
              question={questions[currentStep]}
              selectedValue={answers[questions[currentStep].id]}
              onSelect={(value) => handleAnswer(questions[currentStep].id, value)}
            />
          </MotionDiv>
        ) : (
          recommendation && (
            <MotionDiv motionKey="result">
              <ResultCard recommendation={recommendation} onRestart={handleRestart} />
            </MotionDiv>
          )
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Question Card ────────────────────────────────────────────────────────────

function QuestionCard({
  question,
  selectedValue,
  onSelect,
}: {
  question: QuizQuestion
  selectedValue?: string
  onSelect: (value: string) => void
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
        {question.question}
      </h2>
      <p className="text-[var(--text-secondary)] mb-6">{question.subtitle}</p>

      <div className="space-y-3">
        {question.options.map((option) => {
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

// ── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({
  recommendation,
  onRestart,
}: {
  recommendation: DeviceRecommendation
  onRestart: () => void
}) {
  const DeviceIcon = recommendation.icon === 'tablet' ? Tablet : Smartphone

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-brand-blue text-white p-6 sm:p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
          <DeviceIcon className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">
          We Recommend: {recommendation.deviceType}
        </h2>
        <p className="text-blue-100 text-base sm:text-lg max-w-lg mx-auto">
          {recommendation.tagline}
        </p>
      </div>

      {/* Product Suggestions */}
      <div className="p-6 sm:p-8">
        <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
          Our Top Picks for You
        </h3>
        <div className="space-y-4">
          {recommendation.products.map((product, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue text-white font-bold text-sm shrink-0 mt-0.5">
                {index + 1}
              </div>
              <div>
                <h4 className="font-semibold text-[var(--text-primary)] mb-1">{product.name}</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {product.reason}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Helpful Tips */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-1">
            Helpful Tip
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Before buying, visit a store to hold the device in your hands. Ask a staff member to show you the basics - most are happy to help!
          </p>
        </div>

        {/* Related Articles */}
        <div className="mt-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3">
            Read More
          </h3>
          <div className="space-y-2">
            {recommendation.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors text-brand-blue font-medium text-sm sm:text-base"
              >
                <ChevronRight className="w-4 h-4 shrink-0" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Restart Button */}
        <div className="mt-8 text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-primary)] border-2 border-[var(--border-color)] text-[var(--text-primary)] font-semibold hover:border-brand-blue hover:text-brand-blue transition-all duration-200 text-base"
          >
            <RotateCcw className="w-5 h-5" />
            Take the Quiz Again
          </button>
        </div>
      </div>
    </div>
  )
}
