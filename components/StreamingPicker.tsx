'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Check,
  Tv,
  DollarSign,
  Minus,
  Plus,
  Share2,
  Monitor,
  Smartphone,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'
import { trackToolUsage } from '@/lib/ga-events'

// ── Types ────────────────────────────────────────────────────────────────────

interface StreamingServiceData {
  id: string
  name: string
  priceRange: string
  minPrice: number
  maxPrice: number
  recommendedPrice: number
  isFree: boolean
  hasLiveTV: boolean
  categories: string[]
  channels: string[]
  features: string[]
  seniorNote?: string
}

type Step = 1 | 2 | 3 | 4 | 5 | 'results'

interface Answers {
  cableBill: number
  noCable: boolean
  watchTypes: string[]
  mustHaveChannels: string[]
  budget: string
  devices: string[]
}

// ── Streaming Services Database ──────────────────────────────────────────────

const SERVICES: StreamingServiceData[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    priceRange: '$6.99-$22.99/mo',
    minPrice: 6.99,
    maxPrice: 22.99,
    recommendedPrice: 15.49,
    isFree: false,
    hasLiveTV: false,
    categories: ['movies', 'tv-shows', 'documentaries', 'reality'],
    channels: [],
    features: ['Huge movie & TV library', 'Award-winning originals', 'Download for offline', 'Multiple profiles'],
    seniorNote: 'Very easy to use with a simple interface.',
  },
  {
    id: 'hulu',
    name: 'Hulu',
    priceRange: '$9.99-$17.99/mo',
    minPrice: 9.99,
    maxPrice: 17.99,
    recommendedPrice: 9.99,
    isFree: false,
    hasLiveTV: false,
    categories: ['tv-shows', 'movies', 'reality'],
    channels: ['local-channels'],
    features: ['Next-day TV episodes', 'Current seasons of shows', 'Bundleable with Disney+'],
  },
  {
    id: 'hulu-live',
    name: 'Hulu + Live TV',
    priceRange: '$76.99/mo',
    minPrice: 76.99,
    maxPrice: 76.99,
    recommendedPrice: 76.99,
    isFree: false,
    hasLiveTV: true,
    categories: ['news', 'sports', 'tv-shows', 'movies', 'reality'],
    channels: ['local-channels', 'espn-sports', 'hgtv-food', 'cnn-fox-news'],
    features: ['90+ live channels', 'Local channels included', 'ESPN & sports', 'Unlimited DVR'],
  },
  {
    id: 'youtube-tv',
    name: 'YouTube TV',
    priceRange: '$72.99/mo',
    minPrice: 72.99,
    maxPrice: 72.99,
    recommendedPrice: 72.99,
    isFree: false,
    hasLiveTV: true,
    categories: ['news', 'sports', 'tv-shows', 'movies', 'reality', 'documentaries'],
    channels: ['local-channels', 'espn-sports', 'hgtv-food', 'cnn-fox-news'],
    features: ['100+ live channels', 'Unlimited cloud DVR', 'All major networks', 'No contracts'],
    seniorNote: 'Closest experience to cable TV. Easy channel guide.',
  },
  {
    id: 'amazon-prime',
    name: 'Amazon Prime Video',
    priceRange: '$8.99/mo or $14.99 with Prime',
    minPrice: 8.99,
    maxPrice: 14.99,
    recommendedPrice: 8.99,
    isFree: false,
    hasLiveTV: false,
    categories: ['movies', 'tv-shows', 'documentaries'],
    channels: [],
    features: ['Large movie library', 'Thursday Night Football', 'Free shipping with Prime', 'Dialog Boost for hearing'],
    seniorNote: 'Dialog Boost makes voices clearer - great if you have hearing difficulty.',
  },
  {
    id: 'disney-plus',
    name: 'Disney+',
    priceRange: '$9.99-$15.99/mo',
    minPrice: 9.99,
    maxPrice: 15.99,
    recommendedPrice: 9.99,
    isFree: false,
    hasLiveTV: false,
    categories: ['movies', 'kids', 'documentaries'],
    channels: [],
    features: ['Disney classics & Pixar', 'Marvel & Star Wars', 'National Geographic', 'Download for offline'],
    seniorNote: 'Perfect for watching with grandchildren.',
  },
  {
    id: 'peacock',
    name: 'Peacock',
    priceRange: 'Free-$13.99/mo',
    minPrice: 0,
    maxPrice: 13.99,
    recommendedPrice: 7.99,
    isFree: false,
    hasLiveTV: false,
    categories: ['tv-shows', 'movies', 'sports', 'classic-tv', 'news'],
    channels: ['pbs'],
    features: ['NBC shows next day', 'Some free content', 'Sunday Night Football', 'Classic TV shows'],
  },
  {
    id: 'paramount-plus',
    name: 'Paramount+',
    priceRange: '$7.99-$13.99/mo',
    minPrice: 7.99,
    maxPrice: 13.99,
    recommendedPrice: 7.99,
    isFree: false,
    hasLiveTV: false,
    categories: ['tv-shows', 'movies', 'sports'],
    channels: ['local-channels'],
    features: ['CBS shows live & next-day', 'NFL on CBS', 'Classic movies', 'Star Trek franchise'],
  },
  {
    id: 'tubi',
    name: 'Tubi',
    priceRange: 'Free',
    minPrice: 0,
    maxPrice: 0,
    recommendedPrice: 0,
    isFree: true,
    hasLiveTV: false,
    categories: ['movies', 'tv-shows', 'classic-tv'],
    channels: [],
    features: ['Completely free', 'Large movie library', 'Ad-supported', 'No account required'],
    seniorNote: 'No credit card needed - just start watching!',
  },
  {
    id: 'pluto-tv',
    name: 'Pluto TV',
    priceRange: 'Free',
    minPrice: 0,
    maxPrice: 0,
    recommendedPrice: 0,
    isFree: true,
    hasLiveTV: true,
    categories: ['classic-tv', 'movies', 'news'],
    channels: [],
    features: ['Completely free', 'Live channel format', 'Classic TV shows', 'Feels like regular TV'],
    seniorNote: 'Feels just like flipping through cable channels - very familiar!',
  },
  {
    id: 'sling-tv',
    name: 'Sling TV',
    priceRange: '$40-$55/mo',
    minPrice: 40,
    maxPrice: 55,
    recommendedPrice: 40,
    isFree: false,
    hasLiveTV: true,
    categories: ['news', 'sports', 'tv-shows', 'reality'],
    channels: ['espn-sports', 'hgtv-food', 'cnn-fox-news'],
    features: ['Cheapest live TV option', 'Customizable channel packs', '50 hours DVR', 'No contracts'],
  },
  {
    id: 'frndly-tv',
    name: 'Frndly TV',
    priceRange: '$7.99-$11.99/mo',
    minPrice: 7.99,
    maxPrice: 11.99,
    recommendedPrice: 7.99,
    isFree: false,
    hasLiveTV: true,
    categories: ['reality', 'tv-shows'],
    channels: ['hallmark'],
    features: ['Hallmark Channel', 'Weather Channel', 'Family-friendly channels', 'Very affordable live TV'],
    seniorNote: 'The only affordable way to get Hallmark Channel without cable.',
  },
  {
    id: 'philo',
    name: 'Philo',
    priceRange: '$28/mo',
    minPrice: 28,
    maxPrice: 28,
    recommendedPrice: 28,
    isFree: false,
    hasLiveTV: true,
    categories: ['reality', 'tv-shows', 'documentaries'],
    channels: ['hgtv-food', 'hallmark'],
    features: ['70+ channels', 'No sports (lower price)', 'HGTV & Discovery channels', 'Unlimited DVR'],
    seniorNote: 'Great if you love lifestyle channels but not sports.',
  },
]

// ── Quiz Options ─────────────────────────────────────────────────────────────

const WATCH_TYPES = [
  { id: 'news', label: 'News (local and national)', icon: '📰' },
  { id: 'sports', label: 'Sports (NFL, baseball, etc.)', icon: '🏈' },
  { id: 'movies', label: 'Movies', icon: '🎬' },
  { id: 'tv-shows', label: 'TV shows & dramas', icon: '📺' },
  { id: 'reality', label: 'Reality shows', icon: '🌟' },
  { id: 'documentaries', label: 'Documentaries', icon: '🌍' },
  { id: 'kids', label: 'Kids shows (for grandchildren)', icon: '👶' },
  { id: 'classic-tv', label: 'Classic TV & old movies', icon: '📻' },
]

const MUST_HAVE_CHANNELS = [
  { id: 'local-channels', label: 'Local channels (ABC, CBS, NBC, FOX)' },
  { id: 'espn-sports', label: 'ESPN & sports channels' },
  { id: 'hgtv-food', label: 'HGTV & Food Network' },
  { id: 'hallmark', label: 'Hallmark Channel' },
  { id: 'pbs', label: 'PBS' },
  { id: 'tcm', label: 'Turner Classic Movies' },
  { id: 'cnn-fox-news', label: 'CNN or Fox News' },
  { id: 'none', label: 'None specifically' },
]

const BUDGET_OPTIONS = [
  { id: 'free', label: 'Free only', icon: '🆓' },
  { id: 'under-15', label: 'Under $15/month', icon: '💰' },
  { id: '15-30', label: '$15-$30/month', icon: '💰💰' },
  { id: '30-50', label: '$30-$50/month', icon: '💰💰💰' },
  { id: 'whatever', label: 'Whatever it takes to replace cable', icon: '✨' },
]

const DEVICE_OPTIONS = [
  { id: 'smart-tv', label: 'Smart TV', icon: '📺' },
  { id: 'roku', label: 'Roku', icon: '🟣' },
  { id: 'fire-stick', label: 'Amazon Fire Stick', icon: '🔥' },
  { id: 'apple-tv', label: 'Apple TV', icon: '🍎' },
  { id: 'chromecast', label: 'Chromecast', icon: '📡' },
  { id: 'phone-tablet', label: 'Phone or tablet only', icon: '📱' },
  { id: 'none', label: 'None of these', icon: '❌' },
]

// ── Budget Limits ────────────────────────────────────────────────────────────

function getBudgetLimit(budget: string): number {
  switch (budget) {
    case 'free': return 0
    case 'under-15': return 15
    case '15-30': return 30
    case '30-50': return 50
    case 'whatever': return 999
    default: return 50
  }
}

// ── Recommendation Engine ────────────────────────────────────────────────────

interface RecommendationResult {
  bundle: StreamingServiceData[]
  freeOptions: StreamingServiceData[]
  monthlyCost: number
  cableBill: number
  annualSavings: number
  channelMap: { channel: string; service: string }[]
}

function getRecommendations(answers: Answers): RecommendationResult {
  const budgetLimit = getBudgetLimit(answers.budget)
  const bundle: StreamingServiceData[] = []
  let runningCost = 0

  const needsLiveTV =
    answers.mustHaveChannels.includes('local-channels') ||
    answers.mustHaveChannels.includes('espn-sports') ||
    answers.watchTypes.includes('sports') ||
    answers.watchTypes.includes('news')

  const needsHallmark = answers.mustHaveChannels.includes('hallmark')
  const needsHGTV = answers.mustHaveChannels.includes('hgtv-food')
  const needsKids = answers.watchTypes.includes('kids')
  const needsMovies = answers.watchTypes.includes('movies')
  const needsTVShows = answers.watchTypes.includes('tv-shows')
  const needsClassic = answers.watchTypes.includes('classic-tv')
  const needsDocs = answers.watchTypes.includes('documentaries')
  const needsReality = answers.watchTypes.includes('reality')

  // Helper to add service if within budget
  const addService = (id: string): boolean => {
    const svc = SERVICES.find(s => s.id === id)
    if (!svc || bundle.some(b => b.id === id)) return false
    if (runningCost + svc.recommendedPrice > budgetLimit && !svc.isFree) return false
    bundle.push(svc)
    runningCost += svc.recommendedPrice
    return true
  }

  // Free-only budget
  if (answers.budget === 'free') {
    addService('tubi')
    addService('pluto-tv')
  } else {
    // Live TV needs
    if (needsLiveTV && budgetLimit >= 40) {
      if (budgetLimit >= 72.99) {
        addService('youtube-tv')
      } else if (budgetLimit >= 40) {
        addService('sling-tv')
      }
    }

    // Hallmark specifically
    if (needsHallmark && !bundle.some(b => b.channels.includes('hallmark'))) {
      if (!addService('philo')) addService('frndly-tv')
    }

    // HGTV / lifestyle
    if (needsHGTV && !bundle.some(b => b.channels.includes('hgtv-food'))) {
      if (!addService('philo')) addService('sling-tv')
    }

    // Movies and shows
    if (needsMovies || needsDocs) addService('netflix')
    if (needsTVShows || needsReality) addService('hulu')
    if (needsKids) addService('disney-plus')
    if (needsClassic) addService('peacock')

    // If nothing matched, recommend Netflix as a great starting point
    if (bundle.length === 0) addService('netflix')

    // Always add free options as bonuses (don't count against budget)
    addService('tubi')
    addService('pluto-tv')
  }

  // Separate free from paid
  const paidBundle = bundle.filter(s => !s.isFree)
  const freeOptions = bundle.filter(s => s.isFree)

  // If paid bundle empty but not free-only, add at least one paid
  if (paidBundle.length === 0 && answers.budget !== 'free') {
    const netflix = SERVICES.find(s => s.id === 'netflix')!
    paidBundle.push(netflix)
  }

  const monthlyCost = paidBundle.reduce((sum, s) => sum + s.recommendedPrice, 0)
  const cableBill = answers.noCable ? 120 : answers.cableBill
  const annualSavings = Math.max(0, (cableBill - monthlyCost) * 12)

  // Build channel mapping
  const channelMap: { channel: string; service: string }[] = []
  const allServices = [...paidBundle, ...freeOptions]

  const channelLabels: Record<string, string> = {
    'local-channels': 'ABC, CBS, NBC, FOX',
    'espn-sports': 'ESPN & Sports',
    'hgtv-food': 'HGTV & Food Network',
    'hallmark': 'Hallmark Channel',
    'pbs': 'PBS',
    'tcm': 'Turner Classic Movies',
    'cnn-fox-news': 'CNN / Fox News',
  }

  for (const ch of answers.mustHaveChannels) {
    if (ch === 'none') continue
    const matchingSvc = allServices.find(s => s.channels.includes(ch))
    channelMap.push({
      channel: channelLabels[ch] || ch,
      service: matchingSvc?.name || 'Not available in recommended bundle',
    })
  }

  // TCM special case - not in any standard streaming
  if (answers.mustHaveChannels.includes('tcm')) {
    const tcmEntry = channelMap.find(c => c.channel === 'Turner Classic Movies')
    if (tcmEntry && tcmEntry.service === 'Not available in recommended bundle') {
      tcmEntry.service = 'Available on Sling TV (add-on) or YouTube TV'
    }
  }

  // PBS special case
  if (answers.mustHaveChannels.includes('pbs')) {
    const pbsEntry = channelMap.find(c => c.channel === 'PBS')
    if (pbsEntry && pbsEntry.service === 'Not available in recommended bundle') {
      pbsEntry.service = 'Free at pbs.org and the PBS app'
    }
  }

  return {
    bundle: paidBundle,
    freeOptions,
    monthlyCost,
    cableBill,
    annualSavings,
    channelMap,
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

export default function StreamingPicker() {
  const [step, setStep] = useState<Step>(1)
  const [answers, setAnswers] = useState<Answers>({
    cableBill: 120,
    noCable: false,
    watchTypes: [],
    mustHaveChannels: [],
    budget: '',
    devices: [],
  })
  const [result, setResult] = useState<RecommendationResult | null>(null)

  const totalSteps = 5
  const currentStepNum = step === 'results' ? totalSteps : (step as number)
  const progress = step === 'results' ? 100 : Math.round(((currentStepNum - 1) / totalSteps) * 100)

  const goNext = useCallback(() => {
    if (step === 1) {
      trackToolUsage('streaming-picker', 'start')
    }

    const nextSteps: Record<string, Step> = {
      '1': answers.noCable ? 3 : 2,
      '2': 3,
      '3': 4,
      '4': 5,
    }

    if (step === 5) {
      const rec = getRecommendations(answers)
      setResult(rec)
      setStep('results')
      trackToolUsage('streaming-picker', 'complete')
    } else {
      setStep(nextSteps[String(step)] || (((step as number) + 1) as Step))
    }
  }, [step, answers])

  const goBack = useCallback(() => {
    if (step === 'results') {
      setStep(5)
    } else if ((step as number) > 1) {
      if (step === 3 && answers.noCable) {
        setStep(1)
      } else {
        setStep(((step as number) - 1) as Step)
      }
    }
  }, [step, answers.noCable])

  const handleRestart = useCallback(() => {
    setStep(1)
    setAnswers({
      cableBill: 120,
      noCable: false,
      watchTypes: [],
      mustHaveChannels: [],
      budget: '',
      devices: [],
    })
    setResult(null)
  }, [])

  const toggleArray = (field: keyof Answers, value: string) => {
    setAnswers(prev => {
      const arr = prev[field] as string[]
      // "none" clears everything else, selecting something else clears "none"
      if (value === 'none') {
        return { ...prev, [field]: arr.includes('none') ? [] : ['none'] }
      }
      const withoutNone = arr.filter(v => v !== 'none')
      return {
        ...prev,
        [field]: withoutNone.includes(value)
          ? withoutNone.filter(v => v !== value)
          : [...withoutNone, value],
      }
    })
  }

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return true
      case 2: return answers.watchTypes.length > 0
      case 3: return answers.mustHaveChannels.length > 0
      case 4: return answers.budget !== ''
      case 5: return answers.devices.length > 0
      default: return false
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            {step === 'results' ? 'Your Results' : `Step ${currentStepNum} of ${totalSteps}`}
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
      {((step as number) > 1 || step === 'results') && (
        <button
          onClick={goBack}
          className="mb-4 text-sm text-brand-blue hover:underline flex items-center gap-1 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to previous step
        </button>
      )}

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <MotionDiv motionKey="step-1">
            <CableBillStep
              cableBill={answers.cableBill}
              noCable={answers.noCable}
              onBillChange={val => setAnswers(prev => ({ ...prev, cableBill: val }))}
              onNoCableToggle={() => setAnswers(prev => ({ ...prev, noCable: !prev.noCable }))}
              onNext={goNext}
            />
          </MotionDiv>
        )}

        {step === 2 && (
          <MotionDiv motionKey="step-2">
            <CheckboxStep
              title="What Do You Watch Most?"
              subtitle="Pick all that apply - this helps us find the right services for you."
              options={WATCH_TYPES}
              selected={answers.watchTypes}
              onToggle={val => toggleArray('watchTypes', val)}
              onNext={goNext}
              canProceed={canProceed()}
            />
          </MotionDiv>
        )}

        {step === 3 && (
          <MotionDiv motionKey="step-3">
            <CheckboxStep
              title="Must-Have Channels or Shows?"
              subtitle="Select any channels you cannot live without."
              options={MUST_HAVE_CHANNELS.map(c => ({ ...c, icon: undefined }))}
              selected={answers.mustHaveChannels}
              onToggle={val => toggleArray('mustHaveChannels', val)}
              onNext={goNext}
              canProceed={canProceed()}
            />
          </MotionDiv>
        )}

        {step === 4 && (
          <MotionDiv motionKey="step-4">
            <RadioStep
              title="What Is Your Budget for Streaming?"
              subtitle="Remember, you can always start small and add more later."
              options={BUDGET_OPTIONS}
              selected={answers.budget}
              onSelect={val => setAnswers(prev => ({ ...prev, budget: val }))}
              onNext={goNext}
              canProceed={canProceed()}
            />
          </MotionDiv>
        )}

        {step === 5 && (
          <MotionDiv motionKey="step-5">
            <CheckboxStep
              title="What Devices Do You Have?"
              subtitle="This helps us make sure your services will work on your equipment."
              options={DEVICE_OPTIONS}
              selected={answers.devices}
              onToggle={val => toggleArray('devices', val)}
              onNext={goNext}
              canProceed={canProceed()}
              nextLabel="See My Results"
            />
          </MotionDiv>
        )}

        {step === 'results' && result && (
          <MotionDiv motionKey="results">
            <ResultsScreen result={result} answers={answers} onRestart={handleRestart} />
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Cable Bill Step ──────────────────────────────────────────────────────────

function CableBillStep({
  cableBill,
  noCable,
  onBillChange,
  onNoCableToggle,
  onNext,
}: {
  cableBill: number
  noCable: boolean
  onBillChange: (val: number) => void
  onNoCableToggle: () => void
  onNext: () => void
}) {
  const adjustBill = (delta: number) => {
    onBillChange(Math.max(0, Math.min(500, cableBill + delta)))
  }

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
        How Much Do You Pay for Cable TV?
      </h2>
      <p className="text-[var(--text-secondary)] mb-8">
        This helps us calculate how much you could save by switching to streaming.
      </p>

      {!noCable && (
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => adjustBill(-10)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-primary)] flex items-center justify-center hover:border-brand-blue hover:text-brand-blue transition-colors text-[var(--text-primary)]"
            aria-label="Decrease by $10"
          >
            <Minus className="w-6 h-6" />
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <span className="text-2xl text-[var(--text-secondary)]">$</span>
              <input
                type="number"
                value={cableBill}
                onChange={e => onBillChange(Math.max(0, Math.min(500, Number(e.target.value) || 0)))}
                className="w-28 text-center text-5xl sm:text-6xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] bg-transparent border-none outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                min={0}
                max={500}
                aria-label="Monthly cable bill amount"
              />
            </div>
            <span className="text-sm text-[var(--text-secondary)]">per month</span>
          </div>
          <button
            onClick={() => adjustBill(10)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-primary)] flex items-center justify-center hover:border-brand-blue hover:text-brand-blue transition-colors text-[var(--text-primary)]"
            aria-label="Increase by $10"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* No cable checkbox */}
      <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-primary)] cursor-pointer hover:border-brand-blue/50 transition-colors mb-8">
        <div
          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
            noCable ? 'bg-brand-blue border-brand-blue' : 'border-[var(--border-color)]'
          }`}
        >
          {noCable && <Check className="w-4 h-4 text-white" />}
        </div>
        <span className="text-base sm:text-lg font-medium text-[var(--text-primary)]">
          I don&apos;t have cable
        </span>
      </label>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl bg-brand-blue text-white font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        Next Step
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

// ── Checkbox Step ────────────────────────────────────────────────────────────

function CheckboxStep({
  title,
  subtitle,
  options,
  selected,
  onToggle,
  onNext,
  canProceed,
  nextLabel = 'Next Step',
}: {
  title: string
  subtitle: string
  options: { id: string; label: string; icon?: string }[]
  selected: string[]
  onToggle: (val: string) => void
  onNext: () => void
  canProceed: boolean
  nextLabel?: string
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
        {title}
      </h2>
      <p className="text-[var(--text-secondary)] mb-6">{subtitle}</p>

      <div className="space-y-3 mb-8">
        {options.map(opt => {
          const isSelected = selected.includes(opt.id)
          return (
            <button
              key={opt.id}
              onClick={() => onToggle(opt.id)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 sm:gap-4 ${
                isSelected
                  ? 'border-brand-blue bg-brand-blue/10 shadow-md'
                  : 'border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-brand-blue/50 hover:shadow-sm'
              }`}
              aria-pressed={isSelected}
            >
              <div
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'bg-brand-blue border-brand-blue' : 'border-[var(--border-color)]'
                }`}
              >
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </div>
              {opt.icon && (
                <span className="text-2xl shrink-0" aria-hidden="true">
                  {opt.icon}
                </span>
              )}
              <span
                className={`text-base sm:text-lg font-medium ${
                  isSelected ? 'text-brand-blue' : 'text-[var(--text-primary)]'
                } transition-colors`}
              >
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>

      <button
        onClick={onNext}
        disabled={!canProceed}
        className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
          canProceed
            ? 'bg-brand-blue text-white hover:opacity-90'
            : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] cursor-not-allowed'
        }`}
      >
        {nextLabel}
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

// ── Radio Step ───────────────────────────────────────────────────────────────

function RadioStep({
  title,
  subtitle,
  options,
  selected,
  onSelect,
  onNext,
  canProceed,
}: {
  title: string
  subtitle: string
  options: { id: string; label: string; icon?: string }[]
  selected: string
  onSelect: (val: string) => void
  onNext: () => void
  canProceed: boolean
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-2">
        {title}
      </h2>
      <p className="text-[var(--text-secondary)] mb-6">{subtitle}</p>

      <div className="space-y-3 mb-8">
        {options.map(opt => {
          const isSelected = selected === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 sm:gap-4 ${
                isSelected
                  ? 'border-brand-blue bg-brand-blue/10 shadow-md'
                  : 'border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-brand-blue/50 hover:shadow-sm'
              }`}
              aria-pressed={isSelected}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'border-brand-blue' : 'border-[var(--border-color)]'
                }`}
              >
                {isSelected && <div className="w-3 h-3 rounded-full bg-brand-blue" />}
              </div>
              {opt.icon && (
                <span className="text-2xl shrink-0" aria-hidden="true">
                  {opt.icon}
                </span>
              )}
              <span
                className={`text-base sm:text-lg font-medium ${
                  isSelected ? 'text-brand-blue' : 'text-[var(--text-primary)]'
                } transition-colors`}
              >
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>

      <button
        onClick={onNext}
        disabled={!canProceed}
        className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
          canProceed
            ? 'bg-brand-blue text-white hover:opacity-90'
            : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] cursor-not-allowed'
        }`}
      >
        Next Step
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

// ── Results Screen ───────────────────────────────────────────────────────────

function ResultsScreen({
  result,
  answers,
  onRestart,
}: {
  result: RecommendationResult
  answers: Answers
  onRestart: () => void
}) {
  const hasDeviceSetupLinks =
    answers.devices.includes('roku') ||
    answers.devices.includes('fire-stick') ||
    answers.devices.includes('none')

  const showDialogBoost =
    result.bundle.some(s => s.id === 'amazon-prime') || result.freeOptions.some(s => s.id === 'amazon-prime')

  const handleShare = async () => {
    const text = `I could save $${result.annualSavings.toLocaleString()} per year by switching from cable to streaming! Find out your savings at TechFor60s.`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Streaming Savings', text, url: window.location.href })
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(text)
      alert('Savings copied to clipboard!')
    }
    trackToolUsage('streaming-picker', 'share')
  }

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm overflow-hidden">
      {/* Savings Header */}
      <div className="bg-brand-blue text-white p-6 sm:p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
          <Tv className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">
          Your Recommended Streaming Bundle
        </h2>
        {!answers.noCable && result.annualSavings > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-center gap-3 text-white/80 text-lg mb-2">
              <span>Cable: ${result.cableBill}/mo</span>
              <span>→</span>
              <span>Streaming: ${result.monthlyCost.toFixed(2)}/mo</span>
            </div>
            <div className="inline-block rounded-xl bg-green-500 text-white px-6 py-3 mt-2">
              <p className="text-sm font-medium opacity-90">You Could Save</p>
              <p className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)]">
                ${result.annualSavings.toLocaleString()}/year
              </p>
            </div>
          </div>
        )}
        {answers.noCable && (
          <p className="text-blue-100 text-lg mt-2">
            Your recommended bundle: <strong>${result.monthlyCost.toFixed(2)}/month</strong>
          </p>
        )}
      </div>

      <div className="p-6 sm:p-8">
        {/* Recommended Services */}
        {result.bundle.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-brand-blue" />
              Your Streaming Services
            </h3>
            <div className="space-y-4">
              {result.bundle.map((svc, i) => (
                <ServiceCard key={svc.id} service={svc} index={i} answers={answers} />
              ))}
            </div>
          </div>
        )}

        {/* Free Options */}
        {result.freeOptions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Free Bonus Services
            </h3>
            <div className="space-y-4">
              {result.freeOptions.map((svc, i) => (
                <ServiceCard key={svc.id} service={svc} index={i} answers={answers} isFree />
              ))}
            </div>
          </div>
        )}

        {/* Channel Mapping Table */}
        {result.channelMap.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
              Where to Find Your Favorites
            </h3>
            <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[var(--bg-tertiary)]">
                    <th className="p-4 text-sm font-semibold text-[var(--text-primary)]">Channel / Network</th>
                    <th className="p-4 text-sm font-semibold text-[var(--text-primary)]">Available On</th>
                  </tr>
                </thead>
                <tbody>
                  {result.channelMap.map((row, i) => (
                    <tr key={i} className="border-t border-[var(--border-color)]">
                      <td className="p-4 text-[var(--text-primary)] font-medium">{row.channel}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{row.service}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Dialog Boost Tip */}
        {showDialogBoost && (
          <div className="mb-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-1">
              Hearing Tip
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Amazon Prime Video has a feature called <strong>Dialog Boost</strong> that makes voices louder and
              clearer compared to background sounds. Look for it in the audio settings while watching.
            </p>
          </div>
        )}

        {/* Setup Help Links */}
        {hasDeviceSetupLinks && (
          <div className="mb-8">
            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3">
              Setup Help
            </h3>
            <div className="space-y-2">
              {answers.devices.includes('roku') && (
                <Link
                  href="/blog/how-to-set-up-roku-for-seniors"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors text-brand-blue font-medium text-sm sm:text-base"
                >
                  <ChevronRight className="w-4 h-4 shrink-0" />
                  How to Set Up Roku for Seniors
                </Link>
              )}
              {answers.devices.includes('fire-stick') && (
                <Link
                  href="/blog/how-to-set-up-fire-stick-for-seniors"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors text-brand-blue font-medium text-sm sm:text-base"
                >
                  <ChevronRight className="w-4 h-4 shrink-0" />
                  How to Set Up Fire Stick for Seniors
                </Link>
              )}
              <Link
                href="/blog/complete-guide-to-cutting-the-cord"
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors text-brand-blue font-medium text-sm sm:text-base"
              >
                <ChevronRight className="w-4 h-4 shrink-0" />
                Complete Guide to Cutting the Cord
              </Link>
            </div>
          </div>
        )}

        {/* Share + Restart */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          {!answers.noCable && result.annualSavings > 0 && (
            <button
              onClick={handleShare}
              className="flex-1 py-4 rounded-xl bg-green-600 text-white font-semibold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share My Savings
            </button>
          )}
          <button
            onClick={onRestart}
            className="flex-1 inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-[var(--bg-primary)] border-2 border-[var(--border-color)] text-[var(--text-primary)] font-semibold text-lg hover:border-brand-blue hover:text-brand-blue transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Start Over
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
  answers,
  isFree = false,
}: {
  service: StreamingServiceData
  index: number
  answers: Answers
  isFree?: boolean
}) {
  // Figure out what this service covers from the user's selections
  const covers: string[] = []
  for (const wt of answers.watchTypes) {
    if (service.categories.includes(wt)) {
      const label = WATCH_TYPES.find(w => w.id === wt)?.label
      if (label) covers.push(label)
    }
  }
  for (const ch of answers.mustHaveChannels) {
    if (ch !== 'none' && service.channels.includes(ch)) {
      const label = MUST_HAVE_CHANNELS.find(c => c.id === ch)?.label
      if (label) covers.push(label)
    }
  }

  return (
    <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm shrink-0 ${
                isFree ? 'bg-green-600' : 'bg-brand-blue'
              }`}
            >
              {isFree ? '✓' : index + 1}
            </div>
            <div>
              <h4 className="font-semibold text-lg text-[var(--text-primary)]">{service.name}</h4>
              <p className={`text-sm font-medium ${isFree ? 'text-green-600' : 'text-brand-blue'}`}>
                {service.priceRange}
              </p>
            </div>
          </div>
        </div>

        {/* What it covers */}
        {covers.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-1">
              Covers your interests:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {covers.map(c => (
                <span
                  key={c}
                  className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-brand-blue/10 text-brand-blue"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <ul className="space-y-1">
          {service.features.slice(0, 3).map(f => (
            <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
              <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>

        {/* Senior note */}
        {service.seniorNote && (
          <p className="mt-3 text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-2">
            {service.seniorNote}
          </p>
        )}
      </div>
    </div>
  )
}
