'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  RotateCcw,
  ChevronRight,
  CheckCircle,
  XCircle,
  Shield,
  Phone,
  AlertTriangle,
  Copy,
  Check,
  Lock,
} from 'lucide-react'
import { trackToolUsage, trackQuizComplete } from '@/lib/ga-events'

// ── Types ────────────────────────────────────────────────────────────────────

interface Scenario {
  id: number
  icon: string
  caller: string
  setup: string
  details: string[]
  isScam: boolean
  explanation: string
  redFlags?: string[]
  safeSignals?: string[]
}

// ── Scenario Data ───────────────────────────────────────────────────────────

const scenarios: Scenario[] = [
  {
    id: 1,
    icon: '👵',
    caller: 'Your "Grandchild"',
    setup:
      'You receive a frantic phone call. The caller says: "Grandma, it\'s me! I\'m in jail and I need you to send $3,000 for bail right away. Please don\'t tell Mom and Dad - they\'ll be so angry!"',
    details: [
      'The voice sounds upset and slightly muffled',
      'They call you "Grandma" but never say their own name',
      'They beg you not to tell anyone else',
      'They want you to send money via gift cards or wire transfer',
    ],
    isScam: true,
    explanation:
      'This is the classic "Grandparent Scam." Scammers use AI voice cloning or simply pretend to be upset to disguise their voice. They rely on your love and urgency to get money fast.',
    redFlags: [
      'Never uses their own name - waits for YOU to say it',
      'Demands secrecy from other family members',
      'Wants payment via gift cards or wire transfer (untraceable)',
      'Creates extreme urgency so you cannot think clearly',
    ],
  },
  {
    id: 2,
    icon: '🏦',
    caller: 'Your "Bank"',
    setup:
      'A call comes in from what appears to be your bank\'s phone number. The caller says: "This is the fraud department. We\'ve detected a suspicious $2,400 charge on your account. I need to verify your account number and PIN to stop it."',
    details: [
      'The caller ID shows your bank\'s name',
      'They know your name and that you have an account there',
      'They ask you to confirm your full account number',
      'They say it is urgent and the charge will go through if you wait',
    ],
    isScam: true,
    explanation:
      'Banks will NEVER ask for your PIN or full account number over the phone. Caller ID can be easily spoofed (faked). If concerned, hang up and call the number on the back of your card.',
    redFlags: [
      'Asks for your PIN - a real bank NEVER needs this',
      'Requests full account number over the phone',
      'Creates urgency to prevent you from thinking',
      'Caller ID can be faked (this is called "spoofing")',
    ],
  },
  {
    id: 3,
    icon: '🏥',
    caller: "Your Doctor's Office",
    setup:
      'You receive a call from a number you recognize. The receptionist says: "Hi, this is Sarah from Dr. Johnson\'s office. I\'m calling to confirm your appointment this Thursday at 2:30 PM. Can you confirm you will be there?"',
    details: [
      'They identify themselves by name and the doctor\'s name',
      'They are confirming an appointment YOU already made',
      'They only ask you to confirm yes or no',
      'They do not ask for any payment or personal information',
    ],
    isScam: false,
    explanation:
      'This is a legitimate call. Doctor\'s offices routinely call to confirm upcoming appointments. They already have your information on file and only need a simple yes or no.',
    safeSignals: [
      'They identify the specific doctor and their name',
      'Confirming an appointment YOU already scheduled',
      'No request for payment or personal information',
      'Simple yes/no confirmation is all they need',
    ],
  },
  {
    id: 4,
    icon: '⚖️',
    caller: 'The "IRS"',
    setup:
      'You receive an aggressive voicemail: "This is Agent Williams from the Internal Revenue Service. You owe $8,500 in back taxes. If you do not call back and pay immediately, a warrant will be issued for your arrest today."',
    details: [
      'The caller sounds very official and threatening',
      'They threaten immediate arrest',
      'They demand payment by phone right away',
      'They leave a callback number that is not on the IRS website',
    ],
    isScam: true,
    explanation:
      'The IRS NEVER threatens arrest over the phone. They always contact you first by mail. They never demand immediate payment by phone, gift card, or wire transfer.',
    redFlags: [
      'Threatens arrest - the IRS does NOT do this by phone',
      'Demands immediate payment',
      'The real IRS always contacts you by postal mail first',
      'Government agencies never ask for gift card payments',
    ],
  },
  {
    id: 5,
    icon: '💊',
    caller: 'Your Pharmacy',
    setup:
      'You get a call from your local pharmacy. The caller says: "Hello, this is CVS Pharmacy on Main Street. Your prescription for your blood pressure medication is ready for pickup. It will be available until the end of the week."',
    details: [
      'They mention the specific pharmacy location you use',
      'They reference a medication you actually take',
      'They do not ask for any personal or payment information',
      'They simply let you know your prescription is ready',
    ],
    isScam: false,
    explanation:
      'This is a normal pharmacy notification call. They already have your prescription information on file and are simply letting you know it is ready. No personal information is requested.',
    safeSignals: [
      'References your specific pharmacy location',
      'Mentions a prescription you are actually expecting',
      'No request for personal or financial information',
      'Simple notification with no urgency or pressure',
    ],
  },
  {
    id: 6,
    icon: '👨‍👩‍👧',
    caller: 'Your Grandchild',
    setup:
      'Your grandchild calls from their usual number while visiting for the weekend. They say: "Hey Grandma! I\'m almost at your house. What\'s the WiFi password again? I want to video call Mom when I get there."',
    details: [
      'It is from their known phone number',
      'They are expected to visit this weekend',
      'They ask for the WiFi password (not money or personal info)',
      'The request makes sense given the situation',
    ],
    isScam: false,
    explanation:
      'This is a real call from your grandchild. The call comes from their known number, during an expected visit, and the request (WiFi password) is perfectly normal and harmless.',
    safeSignals: [
      'Call comes from their known, saved phone number',
      'The visit was already planned and expected',
      'Asking for WiFi password is a normal, harmless request',
      'No urgency, secrecy, or request for money',
    ],
  },
  {
    id: 7,
    icon: '💻',
    caller: '"Microsoft" Tech Support',
    setup:
      'Your phone rings and the caller says: "Hello, I am calling from Microsoft Windows Support. Our system has detected a dangerous virus on your computer. I need you to go to your computer right now and let me connect remotely to fix it."',
    details: [
      'They claim to be from Microsoft',
      'They say they detected a virus on YOUR specific computer',
      'They want remote access to your computer',
      'They create urgency by saying your files are at risk',
    ],
    isScam: true,
    explanation:
      'Microsoft NEVER calls you about viruses. They have no way to detect problems on your personal computer. This scam tries to get remote access to steal your information or install real malware.',
    redFlags: [
      'Microsoft never makes unsolicited calls about viruses',
      'No company can remotely detect viruses on your computer',
      'Requesting remote access is a major red flag',
      'Creates false urgency about your files being at risk',
    ],
  },
  {
    id: 8,
    icon: '🔌',
    caller: 'Your Utility Company',
    setup:
      'You receive a call from your electric company. The caller says: "This is Pacific Gas & Electric. We are calling to let you know there will be planned maintenance in your neighborhood next Tuesday from 9 AM to 1 PM. You may experience a brief power outage."',
    details: [
      'They identify the correct utility company for your area',
      'They are giving advance notice of scheduled work',
      'They do not ask for any payment or personal information',
      'The information is about a future event, not an emergency',
    ],
    isScam: false,
    explanation:
      'Utility companies routinely call customers to notify them about planned maintenance. This is a courtesy call with no request for money or personal information.',
    safeSignals: [
      'Advance notice of planned work (no surprise emergency)',
      'No request for payment or personal information',
      'Simply providing information, not asking for action',
      'You can verify by calling the number on your bill',
    ],
  },
]

// ── Score Assessment ────────────────────────────────────────────────────────

function getAssessment(score: number, total: number) {
  const pct = (score / total) * 100
  if (pct === 100)
    return {
      level: 'Excellent',
      color: '#16a34a',
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      message:
        'You have a sharp eye for scams! You correctly identified every scenario. Share what you know with friends and family to help protect them too.',
    }
  if (pct >= 75)
    return {
      level: 'Good',
      color: '#2563eb',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      message:
        'You have strong scam awareness! Review the scenarios you missed to sharpen your skills even further.',
    }
  if (pct >= 50)
    return {
      level: 'Moderate Risk',
      color: '#d97706',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      message:
        'You caught some scams but missed a few. This is very common - scammers are getting more sophisticated. Review the red flags below to strengthen your defenses.',
    }
  return {
    level: 'High Risk',
    color: '#dc2626',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    message:
      'Scammers are using advanced tricks that can fool anyone. The good news: now that you have seen these patterns, you will be much better prepared. Review the red flags carefully and consider sharing this quiz with family.',
  }
}

// ── Safe Word Suggestions ───────────────────────────────────────────────────

const safeWordTips = [
  'Pick a word or phrase only your family would know (like a childhood pet\'s name or a family inside joke)',
  'Avoid anything that could be found on social media',
  'Make it easy to remember but hard to guess',
  'Agree that anyone calling about an emergency MUST say the safe word',
  'Change it once a year, like when you change your clocks',
]

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

// ── Main Component ──────────────────────────────────────────────────────────

export default function VoiceScamSimulator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, boolean>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [safeWord, setSafeWord] = useState('')
  const [copied, setCopied] = useState(false)

  const totalSteps = scenarios.length
  const progress = showResult ? 100 : Math.round((currentStep / totalSteps) * 100)
  const score = Object.entries(answers).filter(
    ([id, answer]) => scenarios[Number(id)].isScam !== answer
  ).length
  // The answer stored is what user picked: true = "Real", false = "AI Scam"
  // Correct when: user picks "Real" and it IS real, OR user picks "Scam" and it IS scam
  const correctCount = Object.entries(answers).filter(([id, userSaidReal]) => {
    const scenario = scenarios[Number(id)]
    return scenario.isScam ? !userSaidReal : userSaidReal
  }).length

  const handleAnswer = useCallback(
    (userSaidReal: boolean) => {
      const newAnswers = { ...answers, [currentStep]: userSaidReal }
      setAnswers(newAnswers)
      setShowFeedback(true)

      if (currentStep === 0) trackToolUsage('voice-scam-simulator', 'start')
    },
    [answers, currentStep]
  )

  const handleNext = useCallback(() => {
    setShowFeedback(false)
    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep((s) => s + 1), 100)
    } else {
      const finalCorrect = Object.entries({ ...answers }).filter(([id, userSaidReal]) => {
        const scenario = scenarios[Number(id)]
        return scenario.isScam ? !userSaidReal : userSaidReal
      }).length
      trackQuizComplete('voice-scam-simulator', `${finalCorrect}/${totalSteps}`)
      setTimeout(() => setShowResult(true), 100)
    }
  }, [currentStep, totalSteps, answers])

  const handleRestart = useCallback(() => {
    setCurrentStep(0)
    setAnswers({})
    setShowFeedback(false)
    setShowResult(false)
    setSafeWord('')
    setCopied(false)
  }, [])

  const handleCopyResults = useCallback(() => {
    const assessment = getAssessment(correctCount, totalSteps)
    const text = `I scored ${correctCount}/${totalSteps} on the AI Voice Scam Quiz at TechFor60s! My risk level: ${assessment.level}. Test your scam awareness too!`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [correctCount, totalSteps])

  const currentScenario = scenarios[currentStep]
  const userAnswer = answers[currentStep]
  const isCorrect =
    userAnswer !== undefined
      ? currentScenario.isScam
        ? !userAnswer
        : userAnswer
      : undefined

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Stats Banner */}
      <div
        className="rounded-xl border p-4 mb-6 flex flex-col sm:flex-row gap-4"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold text-brand-blue">$4.89B</div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Lost to elder fraud in 2024
          </div>
        </div>
        <div
          className="hidden sm:block w-px"
          style={{ backgroundColor: 'var(--border-color)' }}
        />
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold text-brand-blue">3 seconds</div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Of audio to clone a voice with AI
          </div>
        </div>
        <div
          className="hidden sm:block w-px"
          style={{ backgroundColor: 'var(--border-color)' }}
        />
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold text-brand-blue">850%</div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Rise in AI voice scams since 2022
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            {showResult ? 'Your Results' : `Scenario ${currentStep + 1} of ${totalSteps}`}
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

      {/* Quiz Content */}
      <AnimatePresence mode="wait">
        {!showResult ? (
          <MotionDiv motionKey={`scenario-${currentStep}-${showFeedback ? 'fb' : 'q'}`}>
            {!showFeedback ? (
              <ScenarioCard
                scenario={currentScenario}
                onAnswer={handleAnswer}
              />
            ) : (
              <FeedbackCard
                scenario={currentScenario}
                userSaidReal={userAnswer}
                isCorrect={!!isCorrect}
                onNext={handleNext}
                isLast={currentStep === totalSteps - 1}
              />
            )}
          </MotionDiv>
        ) : (
          <MotionDiv motionKey="result">
            <ResultScreen
              correctCount={correctCount}
              totalSteps={totalSteps}
              answers={answers}
              safeWord={safeWord}
              setSafeWord={setSafeWord}
              copied={copied}
              onCopyResults={handleCopyResults}
              onRestart={handleRestart}
            />
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Scenario Card ───────────────────────────────────────────────────────────

function ScenarioCard({
  scenario,
  onAnswer,
}: {
  scenario: Scenario
  onAnswer: (userSaidReal: boolean) => void
}) {
  return (
    <div
      className="rounded-2xl border shadow-sm overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
    >
      {/* Scenario Header */}
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl" aria-hidden="true">
            {scenario.icon}
          </span>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-brand-blue" />
            <span
              className="text-sm font-semibold uppercase tracking-wide"
              style={{ color: 'var(--text-secondary)' }}
            >
              Incoming call from: {scenario.caller}
            </span>
          </div>
        </div>

        <p
          className="text-lg leading-relaxed mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {scenario.setup}
        </p>

        {/* Details to analyze */}
        <div
          className="rounded-xl border p-4 mb-6"
          style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
        >
          <h3
            className="text-sm font-semibold uppercase tracking-wide mb-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            What You Notice:
          </h3>
          <ul className="space-y-2">
            {scenario.details.map((detail, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-base leading-relaxed"
                style={{ color: 'var(--text-primary)' }}
              >
                <span className="mt-1 text-brand-blue shrink-0">-</span>
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* Answer Buttons */}
        <p
          className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Is this call real, or an AI scam?
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onAnswer(true)}
            className="p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 text-center hover:shadow-md font-semibold text-lg"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <span style={{ color: 'var(--text-primary)' }}>Real Call</span>
          </button>
          <button
            onClick={() => onAnswer(false)}
            className="p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 text-center hover:shadow-md font-semibold text-lg"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <span style={{ color: 'var(--text-primary)' }}>AI Scam</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Feedback Card ───────────────────────────────────────────────────────────

function FeedbackCard({
  scenario,
  userSaidReal,
  isCorrect,
  onNext,
  isLast,
}: {
  scenario: Scenario
  userSaidReal: boolean
  isCorrect: boolean
  onNext: () => void
  isLast: boolean
}) {
  return (
    <div
      className="rounded-2xl border shadow-sm overflow-hidden"
      style={{ borderColor: 'var(--border-color)' }}
    >
      {/* Result Header */}
      <div
        className="p-6 sm:p-8 text-center text-white"
        style={{ backgroundColor: isCorrect ? '#16a34a' : '#dc2626' }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-3">
          {isCorrect ? (
            <CheckCircle className="w-8 h-8" />
          ) : (
            <XCircle className="w-8 h-8" />
          )}
        </div>
        <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
          {isCorrect ? 'Correct!' : 'Not Quite'}
        </h3>
        <p className="text-lg opacity-90 mt-1">
          This was {scenario.isScam ? 'an AI SCAM' : 'a REAL call'}.
          {!isCorrect && (
            <span> You said it was {userSaidReal ? 'real' : 'a scam'}.</span>
          )}
        </p>
      </div>

      {/* Explanation */}
      <div className="p-6 sm:p-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <p
          className="text-lg leading-relaxed mb-5"
          style={{ color: 'var(--text-primary)' }}
        >
          {scenario.explanation}
        </p>

        {/* Red Flags or Safe Signals */}
        {scenario.redFlags && (
          <div className="rounded-xl border p-4 mb-5 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-red-700 dark:text-red-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Red Flags to Remember
            </h4>
            <ul className="space-y-2">
              {scenario.redFlags.map((flag, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-base text-red-800 dark:text-red-200"
                >
                  <XCircle className="w-4 h-4 mt-1 shrink-0" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        )}

        {scenario.safeSignals && (
          <div className="rounded-xl border p-4 mb-5 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Signs This Was Legitimate
            </h4>
            <ul className="space-y-2">
              {scenario.safeSignals.map((signal, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-base text-green-800 dark:text-green-200"
                >
                  <CheckCircle className="w-4 h-4 mt-1 shrink-0" />
                  {signal}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={onNext}
          className="w-full p-4 rounded-xl bg-brand-blue text-white font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          {isLast ? 'See Your Results' : 'Next Scenario'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// ── Result Screen ───────────────────────────────────────────────────────────

function ResultScreen({
  correctCount,
  totalSteps,
  answers,
  safeWord,
  setSafeWord,
  copied,
  onCopyResults,
  onRestart,
}: {
  correctCount: number
  totalSteps: number
  answers: Record<number, boolean>
  safeWord: string
  setSafeWord: (v: string) => void
  copied: boolean
  onCopyResults: () => void
  onRestart: () => void
}) {
  const assessment = getAssessment(correctCount, totalSteps)

  return (
    <div
      className="rounded-2xl border shadow-sm overflow-hidden"
      style={{ borderColor: 'var(--border-color)' }}
    >
      {/* Score Header */}
      <div className="p-6 sm:p-8 text-center text-white" style={{ backgroundColor: assessment.color }}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-3">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-2">
          {correctCount} out of {totalSteps}
        </h2>
        <p className="text-xl font-semibold opacity-90">Scam Awareness: {assessment.level}</p>
      </div>

      <div className="p-6 sm:p-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        {/* Assessment Message */}
        <div className={`rounded-xl border p-4 mb-6 ${assessment.bg} ${assessment.border}`}>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            {assessment.message}
          </p>
        </div>

        {/* Answer Review */}
        <h3
          className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Your Answers
        </h3>
        <div className="space-y-2 mb-8">
          {scenarios.map((scenario, i) => {
            const userSaidReal = answers[i]
            const correct = scenario.isScam ? !userSaidReal : userSaidReal
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg border"
                style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}
              >
                <span className="text-xl shrink-0" aria-hidden="true">
                  {scenario.icon}
                </span>
                <span className="flex-1 text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
                  {scenario.caller}
                </span>
                <span className="text-sm font-medium shrink-0" style={{ color: 'var(--text-secondary)' }}>
                  {scenario.isScam ? 'Scam' : 'Real'}
                </span>
                {correct ? (
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                )}
              </div>
            )
          })}
        </div>

        {/* Family Safe Word Generator */}
        <div
          className="rounded-xl border p-5 mb-6"
          style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-brand-blue" />
            <h3
              className="text-lg font-bold font-[family-name:var(--font-heading)]"
              style={{ color: 'var(--text-primary)' }}
            >
              Create a Family Safe Word
            </h3>
          </div>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
            The best defense against voice cloning scams is a secret word or phrase that only your family
            knows. If someone calls claiming to be a family member in trouble, ask for the safe word first.
          </p>

          <input
            type="text"
            value={safeWord}
            onChange={(e) => setSafeWord(e.target.value)}
            placeholder="Type your family safe word here..."
            className="w-full p-4 rounded-xl border text-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          />

          <div className="mt-4">
            <h4
              className="text-sm font-semibold uppercase tracking-wide mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Tips for Choosing a Safe Word
            </h4>
            <ul className="space-y-1">
              {safeWordTips.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span className="text-brand-blue shrink-0">-</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Share / Copy Results */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={onCopyResults}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white font-semibold hover:opacity-90 transition-opacity text-base"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Share Your Score
              </>
            )}
          </button>
          <button
            onClick={onRestart}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 font-semibold hover:text-brand-blue hover:border-brand-blue transition-all text-base"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>

        {/* Key Takeaways */}
        <div className="rounded-xl border p-5 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <h3 className="text-base font-semibold text-amber-800 dark:text-amber-200 mb-3">
            3 Golden Rules to Remember
          </h3>
          <ol className="space-y-2 text-base text-amber-700 dark:text-amber-300">
            <li className="flex items-start gap-2">
              <span className="font-bold shrink-0">1.</span>
              <span>
                <strong>Hang up and call back.</strong> If someone claims to be family, your bank, or the
                government, hang up and call them directly using a number you trust.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold shrink-0">2.</span>
              <span>
                <strong>Never send money under pressure.</strong> Legitimate organizations will never
                demand immediate payment by gift card, wire transfer, or cryptocurrency.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold shrink-0">3.</span>
              <span>
                <strong>Use your family safe word.</strong> Before acting on any emergency call from a
                loved one, ask for the safe word you agreed on.
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
