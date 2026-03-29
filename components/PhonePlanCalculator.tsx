'use client'

import { useState } from 'react'
import { DollarSign, Smartphone, ArrowRight, TrendingDown, Check } from 'lucide-react'

interface SeniorPlan {
  carrier: string
  planName: string
  monthlyPrice: number
  dataIncluded: string
  features: string[]
  bestFor: string
}

const SENIOR_PLANS: SeniorPlan[] = [
  {
    carrier: 'T-Mobile',
    planName: '55+ Essentials',
    monthlyPrice: 40,
    dataIncluded: 'Unlimited',
    features: ['Unlimited talk & text', 'Unlimited data', 'No contracts', 'Taxes included', 'Free scam call protection'],
    bestFor: 'Best overall value for unlimited data',
  },
  {
    carrier: 'T-Mobile',
    planName: '55+ Go5G',
    monthlyPrice: 50,
    dataIncluded: 'Unlimited 5G',
    features: ['Unlimited premium data', '5G access', '15GB hotspot', 'Free Netflix Basic', 'International texting'],
    bestFor: 'Seniors who stream a lot or want Netflix included',
  },
  {
    carrier: 'AT&T',
    planName: '55+ Value Plus',
    monthlyPrice: 45,
    dataIncluded: 'Unlimited',
    features: ['Unlimited talk, text & data', 'No annual contracts', '5G access', 'ActiveArmor security'],
    bestFor: 'AT&T coverage areas and existing customers',
  },
  {
    carrier: 'Consumer Cellular',
    planName: '1GB Plan',
    monthlyPrice: 20,
    dataIncluded: '1GB',
    features: ['Flexible data plans', 'No contracts', 'AARP member discount', 'Award-winning customer service', 'Risk-free guarantee'],
    bestFor: 'Light users who mainly call and text',
  },
  {
    carrier: 'Consumer Cellular',
    planName: '10GB Plan',
    monthlyPrice: 30,
    dataIncluded: '10GB',
    features: ['10GB data', 'No contracts', 'AARP member discount', 'Uses AT&T/T-Mobile network', 'Top-rated customer service'],
    bestFor: 'Moderate users who browse and email',
  },
  {
    carrier: 'Lively (Jitterbug)',
    planName: 'Unlimited',
    monthlyPrice: 40,
    dataIncluded: 'Unlimited',
    features: ['Simplified phones available', 'Urgent Response button', 'Unlimited talk & text', 'Health & safety services', 'Easy-to-use interface'],
    bestFor: 'Seniors who want the simplest possible phone experience',
  },
  {
    carrier: 'Mint Mobile',
    planName: '5GB Plan',
    monthlyPrice: 15,
    dataIncluded: '5GB',
    features: ['Uses T-Mobile network', '5GB high-speed data', 'Unlimited talk & text', 'WiFi calling', 'Free hotspot'],
    bestFor: 'Budget-conscious seniors comfortable with online setup',
  },
  {
    carrier: 'Mint Mobile',
    planName: 'Unlimited',
    monthlyPrice: 30,
    dataIncluded: 'Unlimited',
    features: ['Unlimited everything', 'Uses T-Mobile network', '10GB hotspot', 'Free international calls to Mexico/Canada'],
    bestFor: 'Best budget unlimited plan',
  },
]

export default function PhonePlanCalculator() {
  const [currentCarrier, setCurrentCarrier] = useState('')
  const [currentCost, setCurrentCost] = useState('')
  const [dataUsage, setDataUsage] = useState('')
  const [lines, setLines] = useState('1')
  const [showResults, setShowResults] = useState(false)

  const costNum = parseFloat(currentCost) || 0
  const linesNum = parseInt(lines) || 1
  const perLineCost = costNum / linesNum

  const getRecommendations = (): SeniorPlan[] => {
    let plans = [...SENIOR_PLANS]

    // Filter by data usage
    if (dataUsage === 'light') {
      plans = plans.filter(p => p.dataIncluded !== 'Unlimited 5G')
    }

    // Sort by savings (cheapest first)
    plans.sort((a, b) => a.monthlyPrice - b.monthlyPrice)

    // Only show plans cheaper than current
    plans = plans.filter(p => p.monthlyPrice < perLineCost)

    return plans.slice(0, 5)
  }

  const handleCalculate = () => {
    if (costNum > 0) setShowResults(true)
  }

  const handleReset = () => {
    setCurrentCarrier('')
    setCurrentCost('')
    setDataUsage('')
    setLines('1')
    setShowResults(false)
  }

  return (
    <div className="space-y-8">
      {!showResults ? (
        <div
          className="rounded-xl border p-6 sm:p-8"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <div className="space-y-6">
            {/* Current carrier */}
            <div>
              <label className="block text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Who is your current phone carrier?
              </label>
              <select
                value={currentCarrier}
                onChange={e => setCurrentCarrier(e.target.value)}
                className="w-full max-w-sm rounded-lg border p-3 text-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <option value="">Select...</option>
                <option value="att">AT&T</option>
                <option value="verizon">Verizon</option>
                <option value="tmobile">T-Mobile</option>
                <option value="sprint">Sprint</option>
                <option value="consumer-cellular">Consumer Cellular</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Monthly cost */}
            <div>
              <label className="block text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                How much do you pay per month? (for all lines)
              </label>
              <div className="flex items-center gap-3 max-w-xs">
                <DollarSign className="w-6 h-6 text-brand-blue flex-shrink-0" />
                <input
                  type="number"
                  value={currentCost}
                  onChange={e => setCurrentCost(e.target.value)}
                  placeholder="e.g. 85"
                  min="0"
                  className="w-full rounded-lg border p-3 text-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                />
                <span className="text-lg" style={{ color: 'var(--text-muted)' }}>/mo</span>
              </div>
            </div>

            {/* Number of lines */}
            <div>
              <label className="block text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                How many phone lines on your plan?
              </label>
              <select
                value={lines}
                onChange={e => setLines(e.target.value)}
                className="w-full max-w-xs rounded-lg border p-3 text-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <option value="1">1 line (just me)</option>
                <option value="2">2 lines (me and spouse)</option>
                <option value="3">3 lines</option>
                <option value="4">4+ lines</option>
              </select>
            </div>

            {/* Data usage */}
            <div>
              <label className="block text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                How do you mainly use your phone?
              </label>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: 'light', label: 'Calls & Texts', desc: 'Light internet use' },
                  { id: 'moderate', label: 'Browse & Email', desc: 'Regular internet use' },
                  { id: 'heavy', label: 'Stream & Video', desc: 'Lots of internet use' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setDataUsage(opt.id)}
                    className={`text-left rounded-lg border p-4 transition-colors ${
                      dataUsage === opt.id ? 'bg-brand-blue text-white border-brand-blue' : ''
                    }`}
                    style={dataUsage === opt.id ? {} : { backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    <span className="block text-lg font-semibold">{opt.label}</span>
                    <span className={`block text-sm mt-1 ${dataUsage === opt.id ? 'text-blue-100' : ''}`} style={dataUsage === opt.id ? {} : { color: 'var(--text-muted)' }}>
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!currentCost || costNum <= 0}
              className="px-6 py-3 rounded-xl bg-brand-blue text-white text-lg font-semibold flex items-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Find Cheaper Plans <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary */}
          <div
            className="rounded-xl border-2 p-6 sm:p-8 bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-700"
          >
            <div className="flex items-center gap-3 mb-3">
              <TrendingDown className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-green-700 dark:text-green-400">
                You Could Save Money!
              </h3>
            </div>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              You&apos;re currently paying <strong>${costNum.toFixed(2)}/month</strong>
              {linesNum > 1 && <> (<strong>${perLineCost.toFixed(2)}/line</strong>)</>}.
              Here are senior-friendly plans that could lower your bill:
            </p>
          </div>

          {/* Plans */}
          {getRecommendations().length > 0 ? (
            <div className="space-y-4">
              {getRecommendations().map((plan, i) => {
                const savings = perLineCost - plan.monthlyPrice
                return (
                  <div
                    key={`${plan.carrier}-${plan.planName}`}
                    className="rounded-xl border p-5 sm:p-6"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-5 h-5 text-brand-blue" />
                          <h4 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                            {plan.carrier} — {plan.planName}
                          </h4>
                        </div>
                        <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>{plan.bestFor}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-2xl font-bold text-brand-blue">${plan.monthlyPrice}</p>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>/mo per line</p>
                        {savings > 0 && (
                          <p className="text-sm font-semibold text-green-600 mt-1">
                            Save ${savings.toFixed(0)}/mo
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {plan.dataIncluded} data
                      </span>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-1">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          ) : (
            <div
              className="rounded-xl border p-6 text-center"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                It looks like you&apos;re already getting a great deal! Your per-line cost of ${perLineCost.toFixed(2)}/mo
                is competitive with senior plans.
              </p>
            </div>
          )}

          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-xl border text-lg font-semibold transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  )
}
