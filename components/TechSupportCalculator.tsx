'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Calculator,
  Clock,
  Car,
  DollarSign,
  Heart,
  Copy,
  Check,
  ChevronRight,
  AlertTriangle,
  Minus,
  Plus,
} from 'lucide-react'
import Link from 'next/link'
import { trackToolUsage } from '@/lib/ga-events'

// ── Types ────────────────────────────────────────────────────────────────────

interface CalculatorInputs {
  hoursPerWeek: number
  hourlyValue: number | null
  travelTime: number
  visitFrequency: number
  gasCost: number
  stressLevel: 'low' | 'moderate' | 'high' | 'burnout'
}

// ── Constants ────────────────────────────────────────────────────────────────

const HOURLY_OPTIONS = [
  { label: '$15/hr', value: 15 },
  { label: '$25/hr', value: 25 },
  { label: '$35/hr', value: 35 },
  { label: '$50/hr', value: 50 },
  { label: '$75/hr', value: 75 },
  { label: '$100/hr+', value: 100 },
  { label: "I'd rather not say", value: null },
]

const TRAVEL_OPTIONS = [
  { label: 'None - I help remotely', value: 0, icon: '💻' },
  { label: '15 min each way', value: 0.5, icon: '🚗' },
  { label: '30 min each way', value: 1, icon: '🚗' },
  { label: '1 hour+ each way', value: 2, icon: '🚗' },
]

const VISIT_OPTIONS = [
  { label: 'Never', value: 0 },
  { label: 'Weekly', value: 52 },
  { label: 'Every 2 weeks', value: 26 },
  { label: 'Monthly', value: 12 },
]

const STRESS_OPTIONS: { label: string; value: CalculatorInputs['stressLevel']; icon: string }[] = [
  { label: 'Low', value: 'low', icon: '😊' },
  { label: 'Moderate', value: 'moderate', icon: '😐' },
  { label: 'High', value: 'high', icon: '😰' },
  { label: 'Burning out', value: 'burnout', icon: '🔥' },
]

const ALTERNATIVES = [
  {
    service: 'Geek Squad (Best Buy)',
    cost: '~$200/year (Total Tech)',
    what: 'Unlimited phone/chat support, in-store help',
  },
  {
    service: 'HelloTech',
    cost: '~$50-100/visit',
    what: 'In-home setup, WiFi, device help',
  },
  {
    service: 'AARP Tech Support',
    cost: '~$5/month',
    what: 'Phone support for common issues',
  },
  {
    service: 'Senior Planet (free)',
    cost: '$0',
    what: 'Free online classes and helpline',
  },
  {
    service: 'TechFor60s guides (free)',
    cost: '$0',
    what: 'Self-service guides and tools',
  },
]

// ── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedNumber({ value, prefix = '$' }: { value: number; prefix?: string }) {
  const [displayed, setDisplayed] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayed(value)
      return
    }
    const start = displayed
    const diff = value - start
    const duration = 600
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.round(start + diff * eased))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, shouldReduceMotion])

  return (
    <span>
      {prefix}
      {displayed.toLocaleString()}
    </span>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function TechSupportCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    hoursPerWeek: 3,
    hourlyValue: null,
    travelTime: 0,
    visitFrequency: 0,
    gasCost: 10,
    stressLevel: 'moderate',
  })
  const [showResults, setShowResults] = useState(false)
  const [copied, setCopied] = useState(false)
  const [tracked, setTracked] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // ── Calculations ──────────────────────────────────────────────────────────

  const effectiveRate = inputs.hourlyValue ?? 30 // fallback for "I'd rather not say"
  const annualTimeCost = Math.round(inputs.hoursPerWeek * 52 * effectiveRate)
  const annualTravelTimeCost = Math.round(
    inputs.visitFrequency * inputs.travelTime * effectiveRate
  )
  const annualGasCost = Math.round(inputs.visitFrequency * inputs.gasCost)
  const annualTravelCost = annualTravelTimeCost + annualGasCost
  const totalAnnual = annualTimeCost + annualTravelCost
  const fiveYearCost = totalAnnual * 5

  // ── Handlers ──────────────────────────────────────────────────────────────

  const updateInput = useCallback(
    <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
      setInputs((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const adjustHours = useCallback((delta: number) => {
    setInputs((prev) => ({
      ...prev,
      hoursPerWeek: Math.min(20, Math.max(0.5, +(prev.hoursPerWeek + delta).toFixed(1))),
    }))
  }, [])

  const handleCalculate = useCallback(() => {
    if (!tracked) {
      trackToolUsage('tech-support-calculator', 'calculate')
      setTracked(true)
    }
    setShowResults(true)
  }, [tracked])

  const handleCopyToClipboard = useCallback(() => {
    const text = `I spend approximately $${totalAnnual.toLocaleString()} per year providing tech support for my parent (${inputs.hoursPerWeek} hours/week). Over 5 years, that adds up to $${fiveYearCost.toLocaleString()}.\n\nHere's what professional alternatives cost:\n- Geek Squad: ~$200/year for unlimited support\n- AARP Tech Support: ~$5/month\n- Senior Planet: Free online classes\n- TechFor60s.com: Free self-service guides\n\nCalculate your own cost: https://techfor60s.com/tools/tech-support-calculator`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      trackToolUsage('tech-support-calculator', 'share')
      setTimeout(() => setCopied(false), 2500)
    })
  }, [totalAnnual, fiveYearCost, inputs.hoursPerWeek])

  // ── Recommendations ───────────────────────────────────────────────────────

  const isHighStress = inputs.stressLevel === 'high' || inputs.stressLevel === 'burnout'
  const isHighHours = inputs.hoursPerWeek >= 5

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Inputs Section */}
      <div
        className="rounded-2xl border p-6 sm:p-8 shadow-sm space-y-8"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        {/* 1. Hours per week */}
        <div>
          <label className="block text-lg font-semibold font-[family-name:var(--font-heading)] mb-1" style={{ color: 'var(--text-primary)' }}>
            <Clock className="w-5 h-5 inline-block mr-2 text-brand-blue -mt-0.5" />
            Hours per week helping with tech
          </label>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            Include phone calls, remote sessions, and in-person visits.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => adjustHours(-0.5)}
              className="w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-colors hover:border-brand-blue"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              aria-label="Decrease hours"
            >
              <Minus className="w-5 h-5" />
            </button>
            <div
              className="text-4xl font-bold text-brand-blue tabular-nums min-w-[80px] text-center"
            >
              {inputs.hoursPerWeek}
            </div>
            <button
              onClick={() => adjustHours(0.5)}
              className="w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-colors hover:border-brand-blue"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              aria-label="Increase hours"
            >
              <Plus className="w-5 h-5" />
            </button>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>hrs/week</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={20}
            step={0.5}
            value={inputs.hoursPerWeek}
            onChange={(e) => updateInput('hoursPerWeek', parseFloat(e.target.value))}
            className="w-full mt-3 h-3 rounded-full appearance-none cursor-pointer accent-[#0F3460]"
            style={{ background: `linear-gradient(to right, #0F3460 ${((inputs.hoursPerWeek - 0.5) / 19.5) * 100}%, var(--bg-tertiary) ${((inputs.hoursPerWeek - 0.5) / 19.5) * 100}%)` }}
            aria-label="Hours per week slider"
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            <span>0.5 hrs</span>
            <span>20 hrs</span>
          </div>
        </div>

        {/* 2. Hourly value */}
        <div>
          <label className="block text-lg font-semibold font-[family-name:var(--font-heading)] mb-1" style={{ color: 'var(--text-primary)' }}>
            <DollarSign className="w-5 h-5 inline-block mr-2 text-brand-blue -mt-0.5" />
            Your hourly value
          </label>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            What is your time worth? (Used to calculate the real cost of your support time.)
          </p>
          <div className="flex flex-wrap gap-2">
            {HOURLY_OPTIONS.map((opt) => {
              const isSelected = inputs.hourlyValue === opt.value
              return (
                <button
                  key={opt.label}
                  onClick={() => updateInput('hourlyValue', opt.value)}
                  className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
                      : 'hover:border-brand-blue/50'
                  }`}
                  style={
                    !isSelected
                      ? { borderColor: 'var(--border-color)', color: 'var(--text-primary)' }
                      : undefined
                  }
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 3. Travel time */}
        <div>
          <label className="block text-lg font-semibold font-[family-name:var(--font-heading)] mb-1" style={{ color: 'var(--text-primary)' }}>
            <Car className="w-5 h-5 inline-block mr-2 text-brand-blue -mt-0.5" />
            Travel time per visit
          </label>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            How long does it take to get to your parent&apos;s home and back?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TRAVEL_OPTIONS.map((opt) => {
              const isSelected = inputs.travelTime === opt.value
              return (
                <button
                  key={opt.label}
                  onClick={() => updateInput('travelTime', opt.value)}
                  className={`p-3 sm:p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3 ${
                    isSelected
                      ? 'border-brand-blue bg-brand-blue/10'
                      : 'hover:border-brand-blue/50'
                  }`}
                  style={
                    !isSelected
                      ? { borderColor: 'var(--border-color)' }
                      : undefined
                  }
                >
                  <span className="text-xl" aria-hidden="true">{opt.icon}</span>
                  <span
                    className={`text-sm font-medium ${isSelected ? 'text-brand-blue' : ''}`}
                    style={!isSelected ? { color: 'var(--text-primary)' } : undefined}
                  >
                    {opt.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 4. Visit frequency */}
        <div>
          <label className="block text-lg font-semibold font-[family-name:var(--font-heading)] mb-1" style={{ color: 'var(--text-primary)' }}>
            <Calculator className="w-5 h-5 inline-block mr-2 text-brand-blue -mt-0.5" />
            How often do you visit in person?
          </label>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            Count visits specifically for tech help.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {VISIT_OPTIONS.map((opt) => {
              const isSelected = inputs.visitFrequency === opt.value
              return (
                <button
                  key={opt.label}
                  onClick={() => updateInput('visitFrequency', opt.value)}
                  className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                    isSelected
                      ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
                      : 'hover:border-brand-blue/50'
                  }`}
                  style={
                    !isSelected
                      ? { borderColor: 'var(--border-color)', color: 'var(--text-primary)' }
                      : undefined
                  }
                >
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 5. Gas cost */}
        {inputs.visitFrequency > 0 && (
          <div>
            <label className="block text-lg font-semibold font-[family-name:var(--font-heading)] mb-1" style={{ color: 'var(--text-primary)' }}>
              <DollarSign className="w-5 h-5 inline-block mr-2 text-brand-blue -mt-0.5" />
              Gas / transport cost per visit
            </label>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>$</span>
              <input
                type="number"
                min={0}
                max={200}
                value={inputs.gasCost}
                onChange={(e) => updateInput('gasCost', Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-24 px-4 py-2.5 rounded-xl border-2 text-lg font-medium text-center focus:outline-none focus:border-brand-blue transition-colors"
                style={{
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                }}
              />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>per round trip</span>
            </div>
          </div>
        )}

        {/* 6. Stress level */}
        <div>
          <label className="block text-lg font-semibold font-[family-name:var(--font-heading)] mb-1" style={{ color: 'var(--text-primary)' }}>
            <Heart className="w-5 h-5 inline-block mr-2 text-brand-blue -mt-0.5" />
            Your stress level from tech support duties
          </label>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            Be honest - there&apos;s no judgment here.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STRESS_OPTIONS.map((opt) => {
              const isSelected = inputs.stressLevel === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => updateInput('stressLevel', opt.value)}
                  className={`p-3 sm:p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                    isSelected
                      ? 'border-brand-blue bg-brand-blue/10'
                      : 'hover:border-brand-blue/50'
                  }`}
                  style={
                    !isSelected
                      ? { borderColor: 'var(--border-color)' }
                      : undefined
                  }
                >
                  <span className="text-2xl block mb-1" aria-hidden="true">{opt.icon}</span>
                  <span
                    className={`text-sm font-medium ${isSelected ? 'text-brand-blue' : ''}`}
                    style={!isSelected ? { color: 'var(--text-primary)' } : undefined}
                  >
                    {opt.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full py-4 rounded-xl bg-brand-blue text-white text-lg font-bold font-[family-name:var(--font-heading)] transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-md"
        >
          Calculate My Hidden Costs
        </button>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {showResults && (
          <ResultsSection
            annualTimeCost={annualTimeCost}
            annualTravelCost={annualTravelCost}
            totalAnnual={totalAnnual}
            fiveYearCost={fiveYearCost}
            hoursPerWeek={inputs.hoursPerWeek}
            isHighStress={isHighStress}
            isHighHours={isHighHours}
            stressLevel={inputs.stressLevel}
            hourlyValueUnset={inputs.hourlyValue === null}
            onCopy={handleCopyToClipboard}
            copied={copied}
            shouldReduceMotion={!!shouldReduceMotion}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Results Section ──────────────────────────────────────────────────────────

function ResultsSection({
  annualTimeCost,
  annualTravelCost,
  totalAnnual,
  fiveYearCost,
  hoursPerWeek,
  isHighStress,
  isHighHours,
  stressLevel,
  hourlyValueUnset,
  onCopy,
  copied,
  shouldReduceMotion,
}: {
  annualTimeCost: number
  annualTravelCost: number
  totalAnnual: number
  fiveYearCost: number
  hoursPerWeek: number
  isHighStress: boolean
  isHighHours: boolean
  stressLevel: string
  hourlyValueUnset: boolean
  onCopy: () => void
  copied: boolean
  shouldReduceMotion: boolean
}) {
  const Wrapper = shouldReduceMotion ? 'div' : motion.div
  const wrapperProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 30 },
        transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
      }

  return (
    <Wrapper {...(wrapperProps as Record<string, unknown>)} className="mt-8 space-y-8">
      {/* Hourly value disclaimer */}
      {hourlyValueUnset && (
        <div
          className="rounded-xl border p-4 text-sm"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-secondary)',
          }}
        >
          Since you selected &quot;I&apos;d rather not say,&quot; we used $30/hr as a conservative
          estimate. The average American earns roughly $30/hr.
        </div>
      )}

      {/* Cost Breakdown */}
      <div
        className="rounded-2xl border overflow-hidden shadow-sm"
        style={{ borderColor: 'var(--border-color)' }}
      >
        {/* Total banner */}
        <div className="bg-brand-blue text-white p-6 sm:p-8 text-center">
          <p className="text-blue-100 text-sm font-medium uppercase tracking-wide mb-2">
            Your Annual Hidden Cost
          </p>
          <div className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)]">
            <AnimatedNumber value={totalAnnual} />
          </div>
          <p className="text-blue-200 mt-2">per year</p>
        </div>

        {/* Breakdown */}
        <div className="p-6 sm:p-8 space-y-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <h3
            className="text-lg font-bold font-[family-name:var(--font-heading)]"
            style={{ color: 'var(--text-primary)' }}
          >
            Cost Breakdown
          </h3>

          <div className="space-y-3">
            <div
              className="flex items-center justify-between p-4 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-blue shrink-0" />
                <div>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>Time cost</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {hoursPerWeek} hrs/week x 52 weeks
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-brand-blue">
                <AnimatedNumber value={annualTimeCost} />
              </span>
            </div>

            <div
              className="flex items-center justify-between p-4 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-brand-blue shrink-0" />
                <div>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    Travel cost
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Travel time + gas/transport
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-brand-blue">
                <AnimatedNumber value={annualTravelCost} />
              </span>
            </div>

            <div
              className="flex items-center justify-between p-4 rounded-xl border-2 border-brand-blue"
              style={{ backgroundColor: 'var(--bg-primary)' }}
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-brand-blue shrink-0" />
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Over 5 years</p>
              </div>
              <span className="text-xl font-bold text-brand-blue">
                <AnimatedNumber value={fiveYearCost} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Alternatives */}
      <div
        className="rounded-2xl border p-6 sm:p-8 shadow-sm"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <h3
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Professional Alternatives
        </h3>
        <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
          Compare your current cost with these options:
        </p>

        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderColor: 'var(--border-color)' }} className="border-b">
                <th className="text-left py-3 px-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Service
                </th>
                <th className="text-left py-3 px-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Cost
                </th>
                <th className="text-left py-3 px-2 font-semibold hidden sm:table-cell" style={{ color: 'var(--text-primary)' }}>
                  What You Get
                </th>
              </tr>
            </thead>
            <tbody>
              {ALTERNATIVES.map((alt, i) => (
                <tr
                  key={i}
                  className="border-b last:border-b-0"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <td className="py-3 px-2 font-medium" style={{ color: 'var(--text-primary)' }}>
                    {alt.service}
                  </td>
                  <td className="py-3 px-2 text-brand-blue font-semibold whitespace-nowrap">
                    {alt.cost}
                  </td>
                  <td className="py-3 px-2 hidden sm:table-cell" style={{ color: 'var(--text-secondary)' }}>
                    {alt.what}
                  </td>
                </tr>
              ))}
              <tr className="bg-brand-blue/5">
                <td className="py-3 px-2 font-bold" style={{ color: 'var(--text-primary)' }}>
                  You (current)
                </td>
                <td className="py-3 px-2 font-bold text-brand-blue whitespace-nowrap">
                  ${totalAnnual.toLocaleString()}/year
                </td>
                <td className="py-3 px-2 hidden sm:table-cell" style={{ color: 'var(--text-secondary)' }}>
                  Your time, patience, and energy
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div
        className="rounded-2xl border p-6 sm:p-8 shadow-sm"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <h3
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Our Recommendations
        </h3>

        {/* Stress / hours warning */}
        {(isHighStress || isHighHours) && (
          <div className="rounded-xl p-4 mb-5 border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                  {stressLevel === 'burnout'
                    ? 'You might be heading toward caregiver burnout'
                    : isHighStress && isHighHours
                      ? 'High hours + high stress is unsustainable'
                      : isHighStress
                        ? 'Your stress level is a concern'
                        : 'That is a significant time commitment'}
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {isHighStress && isHighHours
                    ? 'Spending ' + hoursPerWeek + ' hours per week at high stress levels can seriously affect your health and relationships. Consider hiring professional help for the most time-consuming tasks.'
                    : isHighStress
                      ? 'Even a few hours of stressful tech support takes a toll. Professional services can handle the frustrating parts while you focus on quality time.'
                      : 'At ' + hoursPerWeek + ' hours per week, that\'s the equivalent of a part-time job. Professional support could free up significant time.'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {isHighStress || isHighHours ? (
            <>
              <RecommendationLink
                href="/blog/how-to-teach-seniors-to-use-technology"
                label="How to Teach Seniors to Use Technology"
                desc="Reduce repeat questions by teaching independence"
              />
              <RecommendationLink
                href="/blog/setting-up-parents-phone-remotely"
                label="How to Set Up a Parent's Phone Remotely"
                desc="Help from anywhere without driving over"
              />
              <RecommendationLink
                href="/tools/scam-checker"
                label='Use Our "Is This a Scam?" Tool'
                desc='Eliminate "is this a scam?" calls - share this with your parent'
              />
            </>
          ) : (
            <>
              <RecommendationLink
                href="/blog/how-to-teach-seniors-to-use-technology"
                label="How to Teach Seniors to Use Technology"
                desc="Help your parent become more independent with tech"
              />
              <RecommendationLink
                href="/blog/setting-up-parents-phone-remotely"
                label="How to Set Up a Parent's Phone Remotely"
                desc="Save travel time with remote setup"
              />
              <RecommendationLink
                href="/tools/scam-checker"
                label='Share Our "Is This a Scam?" Tool'
                desc="Your parent can check suspicious messages themselves"
              />
            </>
          )}
        </div>
      </div>

      {/* Share with family */}
      <div
        className="rounded-2xl border p-6 sm:p-8 shadow-sm"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <h3
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Share This With Family
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Copy a summary to share with siblings or family members to split the responsibility.
        </p>
        <div
          className="rounded-xl border p-4 mb-4 text-sm leading-relaxed"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-secondary)',
          }}
        >
          &quot;I spend approximately <strong style={{ color: 'var(--text-primary)' }}>${totalAnnual.toLocaleString()}</strong> per year providing tech support for our parent ({hoursPerWeek} hours/week). Over 5 years, that adds up to <strong style={{ color: 'var(--text-primary)' }}>${fiveYearCost.toLocaleString()}</strong>. Here&apos;s what professional alternatives cost...&quot;
        </div>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-blue text-white font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              Copy to Clipboard
            </>
          )}
        </button>
      </div>
    </Wrapper>
  )
}

// ── Recommendation Link ──────────────────────────────────────────────────────

function RecommendationLink({
  href,
  label,
  desc,
}: {
  href: string
  label: string
  desc: string
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 p-4 rounded-xl border transition-colors hover:border-brand-blue/50"
      style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}
    >
      <ChevronRight className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-brand-blue">{label}</p>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {desc}
        </p>
      </div>
    </Link>
  )
}
