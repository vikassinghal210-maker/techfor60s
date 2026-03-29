'use client'

import { useState } from 'react'
import { DollarSign, Tv, Check, ArrowRight } from 'lucide-react'
import { STREAMING_SERVICES, type StreamingService } from '@/lib/streaming-data'

interface Recommendation {
  services: StreamingService[]
  monthlyCost: number
  yearlySavings: number
}

const CONTENT_OPTIONS = [
  { id: 'live-sports', label: 'Live Sports (NFL, NBA, etc.)' },
  { id: 'live-news', label: 'Live News (CNN, Fox News, MSNBC)' },
  { id: 'network-tv', label: 'Network TV Shows (ABC, CBS, NBC, Fox)' },
  { id: 'movies', label: 'Movies' },
  { id: 'classic-tv', label: 'Classic TV Shows' },
  { id: 'family', label: 'Family / Grandkid-Friendly Content' },
  { id: 'hgtv-food', label: 'HGTV, Food Network, Lifestyle' },
  { id: 'documentaries', label: 'Documentaries' },
]

function getRecommendations(cableBill: number, selectedContent: string[]): Recommendation {
  const needed: StreamingService[] = []

  const liveSports = selectedContent.includes('live-sports')
  const liveNews = selectedContent.includes('live-news')
  const networkTv = selectedContent.includes('network-tv')
  const movies = selectedContent.includes('movies')
  const classicTv = selectedContent.includes('classic-tv')
  const family = selectedContent.includes('family')
  const lifestyle = selectedContent.includes('hgtv-food')
  const docs = selectedContent.includes('documentaries')

  // If they need live TV (sports/news/lifestyle), recommend a live TV service
  if (liveSports || liveNews || lifestyle) {
    if (liveSports && !liveNews && !lifestyle) {
      needed.push(STREAMING_SERVICES.find(s => s.slug === 'sling-tv')!)
    } else {
      needed.push(STREAMING_SERVICES.find(s => s.slug === 'youtube-tv')!)
    }
  }

  // Add streaming services based on content preferences
  if (movies || docs) {
    needed.push(STREAMING_SERVICES.find(s => s.slug === 'netflix')!)
  }

  if (networkTv && !needed.some(s => s.slug === 'youtube-tv')) {
    needed.push(STREAMING_SERVICES.find(s => s.slug === 'hulu')!)
  }

  if (family) {
    needed.push(STREAMING_SERVICES.find(s => s.slug === 'disney-plus')!)
  }

  if (classicTv && !needed.some(s => ['hulu', 'peacock'].includes(s.slug))) {
    needed.push(STREAMING_SERVICES.find(s => s.slug === 'peacock')!)
  }

  // If nothing selected, recommend Netflix as default
  if (needed.length === 0) {
    needed.push(STREAMING_SERVICES.find(s => s.slug === 'netflix')!)
  }

  // Deduplicate
  const unique = Array.from(new Map(needed.map(s => [s.slug, s])).values())

  const monthlyCost = unique.reduce((sum, s) => sum + s.monthlyPrice, 0)
  const yearlySavings = (cableBill - monthlyCost) * 12

  return { services: unique, monthlyCost, yearlySavings }
}

export default function CordCuttingCalculator() {
  const [step, setStep] = useState(1)
  const [cableBill, setCableBill] = useState('')
  const [selectedContent, setSelectedContent] = useState<string[]>([])
  const [result, setResult] = useState<Recommendation | null>(null)

  const toggleContent = (id: string) => {
    setSelectedContent(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const handleCalculate = () => {
    const bill = parseFloat(cableBill) || 0
    setResult(getRecommendations(bill, selectedContent))
    setStep(3)
  }

  const handleReset = () => {
    setStep(1)
    setCableBill('')
    setSelectedContent([])
    setResult(null)
  }

  return (
    <div className="space-y-8">
      {/* Step 1: Cable Bill */}
      {step >= 1 && (
        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm">1</span>
            <h3 className="text-xl font-bold font-[family-name:var(--font-heading)]" style={{ color: 'var(--text-primary)' }}>
              What do you pay for cable TV each month?
            </h3>
          </div>
          <div className="flex items-center gap-3 max-w-xs">
            <DollarSign className="w-6 h-6 text-brand-blue flex-shrink-0" />
            <input
              type="number"
              value={cableBill}
              onChange={e => setCableBill(e.target.value)}
              placeholder="e.g. 150"
              min="0"
              className="w-full rounded-lg border p-3 text-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
            <span className="text-lg" style={{ color: 'var(--text-muted)' }}>/mo</span>
          </div>
          {step === 1 && cableBill && (
            <button
              onClick={() => setStep(2)}
              className="mt-4 px-6 py-3 rounded-xl bg-brand-blue text-white text-lg font-semibold flex items-center gap-2 hover:opacity-90"
            >
              Next <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* Step 2: What do you watch? */}
      {step >= 2 && (
        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm">2</span>
            <h3 className="text-xl font-bold font-[family-name:var(--font-heading)]" style={{ color: 'var(--text-primary)' }}>
              What do you like to watch? (Select all that apply)
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {CONTENT_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => toggleContent(opt.id)}
                className={`text-left rounded-lg border p-4 text-lg transition-colors ${
                  selectedContent.includes(opt.id)
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : ''
                }`}
                style={
                  selectedContent.includes(opt.id)
                    ? {}
                    : { backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }
                }
              >
                <span className="flex items-center gap-2">
                  {selectedContent.includes(opt.id) && <Check className="w-5 h-5" />}
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
          {step === 2 && (
            <button
              onClick={handleCalculate}
              className="mt-6 px-6 py-3 rounded-xl bg-brand-blue text-white text-lg font-semibold flex items-center gap-2 hover:opacity-90"
            >
              Show My Savings <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && result && (
        <div className="space-y-6">
          {/* Savings Card */}
          <div
            className={`rounded-xl border-2 p-6 sm:p-8 ${
              result.yearlySavings > 0
                ? 'bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-700'
                : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700'
            }`}
          >
            <div className="text-center">
              <p className="text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>
                {result.yearlySavings > 0 ? 'You could save approximately' : 'Your estimated streaming cost'}
              </p>
              {result.yearlySavings > 0 ? (
                <>
                  <p className="text-5xl font-bold text-green-600 font-[family-name:var(--font-heading)]">
                    ${Math.round(result.yearlySavings).toLocaleString()}
                  </p>
                  <p className="text-lg text-green-600 font-semibold mt-1">per year</p>
                  <p className="text-lg mt-3" style={{ color: 'var(--text-secondary)' }}>
                    That&apos;s <strong>${Math.round(result.yearlySavings / 12)}/month</strong> back in your pocket!
                  </p>
                </>
              ) : (
                <>
                  <p className="text-4xl font-bold font-[family-name:var(--font-heading)]" style={{ color: 'var(--text-primary)' }}>
                    ${result.monthlyCost.toFixed(2)}/mo
                  </p>
                  <p className="text-lg mt-2" style={{ color: 'var(--text-muted)' }}>
                    Streaming may cost more than your current cable for these needs. Consider keeping cable or choosing fewer services.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Comparison */}
          <div
            className="rounded-xl border p-6"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
          >
            <h3
              className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Your Cable vs. Streaming
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border-color)' }}>
                <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--text-muted)' }}>Cable TV</p>
                <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  ${parseFloat(cableBill).toFixed(2)}<span className="text-lg font-normal">/mo</span>
                </p>
              </div>
              <div className="rounded-lg border p-4 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20">
                <p className="text-sm font-semibold uppercase tracking-wide mb-1 text-green-700 dark:text-green-400">Streaming</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                  ${result.monthlyCost.toFixed(2)}<span className="text-lg font-normal">/mo</span>
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Services */}
          <div>
            <h3
              className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Recommended Services for You
            </h3>
            <div className="space-y-3">
              {result.services.map(service => (
                <div
                  key={service.slug}
                  className="rounded-xl border p-5"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Tv className="w-5 h-5 text-brand-blue" />
                        <h4 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{service.name}</h4>
                      </div>
                      <p className="text-base mb-2" style={{ color: 'var(--text-secondary)' }}>{service.bestFor}</p>
                      <ul className="space-y-1">
                        {service.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                            <Check className="w-4 h-4 text-green-600" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-bold text-brand-blue">${service.monthlyPrice}</p>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>/month</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reset */}
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
