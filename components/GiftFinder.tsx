'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { RotateCcw, Star, ChevronRight, Heart, Gift, DollarSign, Cpu, Sparkles } from 'lucide-react'
import Image from 'next/image'
import {
  OCCASIONS,
  PRICE_RANGES,
  TECH_LEVELS,
  INTERESTS,
  filterGifts,
  type GiftProduct,
} from '@/lib/gifts-data'

// ── Types ────────────────────────────────────────────────────────────────────

type Step = 'occasion' | 'budget' | 'techLevel' | 'interests' | 'results'

interface Selections {
  occasion: string
  priceRange: string
  techLevel: string
  interests: string[]
}

// ── Animations ───────────────────────────────────────────────────────────────

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35 },
  }),
}

// ── Stars Component ──────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

// ── Progress Bar ─────────────────────────────────────────────────────────────

const STEPS: { key: Step; label: string; icon: typeof Gift }[] = [
  { key: 'occasion', label: 'Occasion', icon: Gift },
  { key: 'budget', label: 'Budget', icon: DollarSign },
  { key: 'techLevel', label: 'Tech Level', icon: Cpu },
  { key: 'interests', label: 'Interests', icon: Heart },
  { key: 'results', label: 'Results', icon: Sparkles },
]

function ProgressBar({ currentStep }: { currentStep: Step }) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep)
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8">
      {STEPS.map((step, i) => {
        const Icon = step.icon
        const isActive = i === currentIndex
        const isComplete = i < currentIndex
        return (
          <div key={step.key} className="flex items-center gap-1 sm:gap-2">
            <div
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-brand-blue text-white shadow-md'
                  : isComplete
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ gift, index }: { gift: GiftProduct; index: number }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial={shouldReduce ? 'visible' : 'hidden'}
      animate="visible"
      className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative aspect-square bg-[var(--bg-tertiary)]">
        <Image
          src={gift.thumbnail}
          alt={gift.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-3 right-3 bg-brand-blue text-white text-sm font-bold px-3 py-1 rounded-full shadow">
          {gift.price}
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-[var(--text-primary)] font-[family-name:var(--font-heading)] text-base sm:text-lg leading-tight">
            {gift.name}
          </h3>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <StarRating rating={gift.rating} />
          <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded-full">
            Senior-friendly: {gift.seniorFriendly}/5
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mb-3 leading-relaxed">
          {gift.description}
        </p>
        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <Heart className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
            {gift.whyGreat}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function GiftFinder() {
  const shouldReduce = useReducedMotion()
  const [step, setStep] = useState<Step>('occasion')
  const [selections, setSelections] = useState<Selections>({
    occasion: '',
    priceRange: '',
    techLevel: '',
    interests: [],
  })
  const [results, setResults] = useState<GiftProduct[]>([])

  const reset = useCallback(() => {
    setStep('occasion')
    setSelections({ occasion: '', priceRange: '', techLevel: '', interests: [] })
    setResults([])
  }, [])

  const selectOccasion = (slug: string) => {
    setSelections((prev) => ({ ...prev, occasion: slug }))
    setStep('budget')
  }

  const selectBudget = (slug: string) => {
    setSelections((prev) => ({ ...prev, priceRange: slug }))
    setStep('techLevel')
  }

  const selectTechLevel = (slug: string) => {
    setSelections((prev) => ({ ...prev, techLevel: slug }))
    setStep('interests')
  }

  const toggleInterest = (slug: string) => {
    setSelections((prev) => {
      const current = prev.interests
      if (current.includes(slug)) {
        return { ...prev, interests: current.filter((i) => i !== slug) }
      }
      if (current.length >= 3) return prev
      return { ...prev, interests: [...current, slug] }
    })
  }

  const showResults = () => {
    const filtered = filterGifts({
      occasion: selections.occasion,
      priceRange: selections.priceRange,
      techLevel: selections.techLevel,
      interests: selections.interests.length > 0 ? selections.interests : undefined,
    })
    setResults(filtered)
    setStep('results')
  }

  const goBack = () => {
    if (step === 'budget') setStep('occasion')
    else if (step === 'techLevel') setStep('budget')
    else if (step === 'interests') setStep('techLevel')
    else if (step === 'results') setStep('interests')
  }

  const transition = shouldReduce
    ? { duration: 0 }
    : { duration: 0.35, ease: 'easeInOut' as const }

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressBar currentStep={step} />

      <AnimatePresence mode="wait">
        {/* ── Step 1: Occasion ─────────────────────────────────────────────── */}
        {step === 'occasion' && (
          <motion.div
            key="occasion"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
                Who is this gift for?
              </h2>
              <p className="text-[var(--text-secondary)]">
                Pick the occasion and we will find the perfect tech gift.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {OCCASIONS.map((occ) => (
                <button
                  key={occ.slug}
                  onClick={() => selectOccasion(occ.slug)}
                  className="flex flex-col items-center gap-2 p-4 sm:p-6 rounded-2xl border-2 border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-brand-blue hover:shadow-md transition-all duration-200 text-center group"
                >
                  <span className="text-3xl sm:text-4xl" aria-hidden="true">
                    {occ.emoji}
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-[var(--text-primary)] group-hover:text-brand-blue transition-colors">
                    {occ.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Budget ───────────────────────────────────────────────── */}
        {step === 'budget' && (
          <motion.div
            key="budget"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
                What is your budget?
              </h2>
              <p className="text-[var(--text-secondary)]">
                There are wonderful gifts at every price point.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range.slug}
                  onClick={() => selectBudget(range.slug)}
                  className="flex flex-col items-center gap-2 p-4 sm:p-6 rounded-2xl border-2 border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-brand-blue hover:shadow-md transition-all duration-200 group"
                >
                  <DollarSign className="w-6 h-6 text-[var(--text-muted)] group-hover:text-brand-blue transition-colors" />
                  <span className="font-semibold text-sm sm:text-base text-[var(--text-primary)] group-hover:text-brand-blue transition-colors">
                    {range.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={goBack}
                className="text-sm text-[var(--text-muted)] hover:text-brand-blue transition-colors underline"
              >
                Go back
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Tech Level ───────────────────────────────────────────── */}
        {step === 'techLevel' && (
          <motion.div
            key="techLevel"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
                How techy are they?
              </h2>
              <p className="text-[var(--text-secondary)]">
                This helps us recommend gifts they will actually enjoy using.
              </p>
            </div>
            <div className="grid gap-4 max-w-2xl mx-auto">
              {TECH_LEVELS.map((level) => (
                <button
                  key={level.slug}
                  onClick={() => selectTechLevel(level.slug)}
                  className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl border-2 border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-brand-blue hover:shadow-md transition-all duration-200 text-left group"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Cpu className="w-5 h-5 text-[var(--text-muted)] group-hover:text-brand-blue transition-colors" />
                  </div>
                  <div>
                    <span className="font-bold text-base sm:text-lg text-[var(--text-primary)] group-hover:text-brand-blue transition-colors block mb-1">
                      {level.label}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)]">
                      {level.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={goBack}
                className="text-sm text-[var(--text-muted)] hover:text-brand-blue transition-colors underline"
              >
                Go back
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 4: Interests ────────────────────────────────────────────── */}
        {step === 'interests' && (
          <motion.div
            key="interests"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
                What do they enjoy?
              </h2>
              <p className="text-[var(--text-secondary)]">
                Select up to 3 interests to personalize the results, or skip this step.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-6">
              {INTERESTS.map((interest) => {
                const selected = selections.interests.includes(interest.slug)
                return (
                  <button
                    key={interest.slug}
                    onClick={() => toggleInterest(interest.slug)}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 font-medium text-sm sm:text-base transition-all duration-200 ${
                      selected
                        ? 'border-brand-blue bg-blue-50 dark:bg-blue-950/30 text-brand-blue shadow-md'
                        : 'border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-brand-blue hover:shadow-sm'
                    }`}
                  >
                    {selected && <Heart className="w-4 h-4 fill-brand-blue" />}
                    {interest.label}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={showResults}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-brand-blue text-white font-semibold text-base hover:opacity-90 transition-opacity shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                Show Gift Ideas
              </button>
              <button
                onClick={goBack}
                className="text-sm text-[var(--text-muted)] hover:text-brand-blue transition-colors underline"
              >
                Go back
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Results ──────────────────────────────────────────────────────── */}
        {step === 'results' && (
          <motion.div
            key="results"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
                {results.length > 0
                  ? `We found ${results.length} perfect gift${results.length === 1 ? '' : 's'}!`
                  : 'No exact matches found'}
              </h2>
              <p className="text-[var(--text-secondary)]">
                {results.length > 0
                  ? 'Here are our top recommendations based on your selections.'
                  : 'Try broadening your filters - go back and adjust your selections.'}
              </p>
            </div>

            {results.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {results.map((gift, i) => (
                  <ProductCard key={gift.slug} gift={gift} index={i} />
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-brand-blue text-brand-blue font-semibold hover:bg-brand-blue hover:text-white transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Start Over
              </button>
              <button
                onClick={goBack}
                className="text-sm text-[var(--text-muted)] hover:text-brand-blue transition-colors underline"
              >
                Adjust interests
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
