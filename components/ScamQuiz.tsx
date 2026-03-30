'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  RotateCcw,
  ChevronRight,
  CheckCircle,
  ShieldAlert,
  Phone,
  Mail,
  MessageSquare,
  Users,
  AlertTriangle,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react'
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

interface ScamResult {
  scamType: string
  description: string
  howItWorks: string
  whatToDo: string[]
  relatedArticle: { label: string; href: string }
  severity: 'high' | 'medium' | 'low'
}

// ── Quiz Data ────────────────────────────────────────────────────────────────

const questions: QuizQuestion[] = [
  {
    id: 'channel',
    question: 'How did you receive this?',
    subtitle: 'Select how the suspicious contact reached you.',
    options: [
      { label: 'Phone call', value: 'phone', icon: '📞' },
      { label: 'Text message', value: 'text', icon: '💬' },
      { label: 'Email', value: 'email', icon: '📧' },
      { label: 'Social media', value: 'social', icon: '📱' },
      { label: 'Letter in the mail', value: 'mail', icon: '📬' },
      { label: 'In person', value: 'person', icon: '🧑' },
    ],
  },
  {
    id: 'claim',
    question: 'What did they claim to be?',
    subtitle: 'Who did the person or message say they were?',
    options: [
      { label: 'Government agency (IRS, SSA, Medicare)', value: 'government', icon: '🏛️' },
      { label: 'Tech company (Microsoft, Apple, Amazon)', value: 'tech', icon: '💻' },
      { label: 'Bank or financial institution', value: 'bank', icon: '🏦' },
      { label: 'Romantic interest or new friend', value: 'romance', icon: '❤️' },
      { label: 'Family member in trouble', value: 'family', icon: '👨‍👩‍👧' },
      { label: 'Prize or lottery organization', value: 'prize', icon: '🎉' },
      { label: 'Job opportunity or recruiter', value: 'job', icon: '💼' },
      { label: 'Charity or donation request', value: 'charity', icon: '🤝' },
    ],
  },
  {
    id: 'request',
    question: 'What did they ask you for?',
    subtitle: 'Select what they wanted from you.',
    options: [
      { label: 'Personal information (SSN, date of birth)', value: 'personal_info', icon: '🔑' },
      { label: 'Money or payment', value: 'money', icon: '💵' },
      { label: 'Click a link or download something', value: 'click_link', icon: '🔗' },
      { label: 'Remote access to my computer', value: 'remote_access', icon: '🖥️' },
      { label: 'Gift cards', value: 'gift_cards', icon: '🎁' },
      { label: 'Wire transfer or cryptocurrency', value: 'wire', icon: '🏧' },
      { label: 'Nothing yet — just contacted me', value: 'nothing', icon: '❓' },
    ],
  },
  {
    id: 'urgency',
    question: 'How urgent did it feel?',
    subtitle: 'Scammers often create a false sense of urgency.',
    options: [
      { label: 'Extreme — act now or face consequences', value: 'extreme', icon: '🚨' },
      { label: 'Moderate — limited time offer', value: 'moderate', icon: '⏰' },
      { label: 'No rush at all', value: 'none', icon: '😌' },
    ],
  },
  {
    id: 'threats',
    question: 'Did they threaten you?',
    subtitle: 'Threats are a major red flag for scams.',
    options: [
      { label: 'Yes — arrest or legal action', value: 'arrest', icon: '⚖️' },
      { label: 'Yes — account suspension or closure', value: 'suspension', icon: '🔒' },
      { label: 'Yes — other threats', value: 'other', icon: '⚠️' },
      { label: 'No threats', value: 'none', icon: '✅' },
    ],
  },
  {
    id: 'secrecy',
    question: 'Did they ask you to keep it secret?',
    subtitle: 'Scammers often tell you not to tell family or friends.',
    options: [
      { label: 'Yes — they told me not to tell anyone', value: 'yes', icon: '🤫' },
      { label: 'No — they did not mention secrecy', value: 'no', icon: '📢' },
    ],
  },
]

// ── Scam Identification Engine ──────────────────────────────────────────────

function identifyScam(answers: Record<string, string>): ScamResult {
  const { channel, claim, request, urgency, threats, secrecy } = answers

  // Tech Support Scam
  if (
    claim === 'tech' &&
    (request === 'remote_access' || request === 'gift_cards' || request === 'money')
  ) {
    return {
      scamType: 'Tech Support Scam',
      description:
        'This appears to be a tech support scam. Scammers pretend to be from companies like Microsoft, Apple, or Amazon to trick you into giving them access to your computer or paying for fake repairs.',
      howItWorks:
        'The scammer contacts you (often by phone or pop-up) claiming your computer has a virus or security problem. They ask for remote access to your device and then either install malware, steal your personal information, or charge you hundreds of dollars for unnecessary "repairs."',
      whatToDo: [
        'Hang up or close the pop-up immediately.',
        'Do NOT give anyone remote access to your computer.',
        'If you already gave access, disconnect from the internet and run a virus scan.',
        'Call your bank if you made any payments.',
        'Report it to the FTC at reportfraud.ftc.gov.',
      ],
      relatedArticle: {
        label: 'What Is Cyber Crime? A Complete Guide for Seniors',
        href: '/blog/what-is-cyber-crime-guide-for-seniors',
      },
      severity: 'high',
    }
  }

  // Government Impersonation Scam
  if (claim === 'government' && (threats === 'arrest' || urgency === 'extreme')) {
    return {
      scamType: 'Government Impersonation Scam',
      description:
        'This looks like a government impersonation scam. Scammers pretend to be from the IRS, Social Security Administration, or Medicare to scare you into sending money or sharing personal information.',
      howItWorks:
        'The scammer calls or emails claiming to be a government official. They may say you owe back taxes, your Social Security number has been compromised, or your benefits will be cut off. They threaten arrest or legal action to pressure you into paying immediately.',
      whatToDo: [
        'Hang up immediately. Real government agencies will NEVER threaten arrest over the phone.',
        'The IRS always contacts you by postal mail first — never by phone demanding immediate payment.',
        'Do NOT share your Social Security number.',
        'Report IRS impersonation scams to the Treasury Inspector General at 1-800-366-4484.',
        'Report other government scams at reportfraud.ftc.gov.',
      ],
      relatedArticle: {
        label: 'How to Report a Scam',
        href: '/blog/how-to-report-a-scam',
      },
      severity: 'high',
    }
  }

  // Romance Scam
  if (claim === 'romance' && (request === 'money' || request === 'wire' || request === 'gift_cards')) {
    return {
      scamType: 'Romance Scam',
      description:
        'This has the signs of a romance scam. Scammers create fake profiles on dating sites or social media, build an emotional connection over weeks or months, and then ask for money.',
      howItWorks:
        'The scammer creates an attractive fake profile and begins a relationship with you online. They shower you with attention and affection. After building trust, they claim to need money for an emergency — a medical bill, travel costs to visit you, or a business problem. They always have a reason they cannot meet in person or video call.',
      whatToDo: [
        'Stop all communication with this person.',
        'Do NOT send any more money, no matter what reason they give.',
        'Do a reverse image search on their profile photo — it is likely stolen from someone else.',
        'Report the profile to the dating site or social media platform.',
        'Report it to the FTC at reportfraud.ftc.gov.',
        'Talk to a trusted family member or friend about what happened.',
      ],
      relatedArticle: {
        label: 'How to Protect Elderly Parents from Scams',
        href: '/blog/how-to-protect-elderly-parents-from-scams',
      },
      severity: 'high',
    }
  }

  // Grandparent Scam
  if (claim === 'family' && (secrecy === 'yes' || request === 'money' || request === 'wire')) {
    return {
      scamType: 'Grandparent Scam',
      description:
        'This looks like a grandparent scam (also called a family emergency scam). Scammers call pretending to be a grandchild or other relative in trouble, begging for money and asking you to keep it secret.',
      howItWorks:
        'The scammer calls sounding panicked, saying something like "Grandma, it&apos;s me!" They claim to be in jail, in a car accident, or stuck overseas. They beg for money via wire transfer or gift cards and ask you not to tell other family members. Sometimes a second scammer pretends to be a lawyer or police officer to make it sound more believable.',
      whatToDo: [
        'Hang up and call your grandchild or family member directly at their real phone number.',
        'Ask a personal question only the real person would know.',
        'Do NOT send money, gift cards, or wire transfers.',
        'Tell other family members about the call.',
        'Report it to your local police and the FTC at reportfraud.ftc.gov.',
      ],
      relatedArticle: {
        label: 'How to Protect Elderly Parents from Scams',
        href: '/blog/how-to-protect-elderly-parents-from-scams',
      },
      severity: 'high',
    }
  }

  // Phishing Scam
  if (
    (channel === 'email' || channel === 'text') &&
    (request === 'click_link' || request === 'personal_info') &&
    (claim === 'bank' || claim === 'tech')
  ) {
    return {
      scamType: 'Phishing Scam',
      description:
        'This appears to be a phishing scam. Scammers send fake emails or texts that look like they come from a real company to trick you into clicking a dangerous link or entering your personal information.',
      howItWorks:
        'The scammer sends an email or text that looks like it is from your bank, Amazon, Netflix, or another trusted company. The message usually warns about suspicious activity or a problem with your account. It includes a link to a fake website that looks real but is designed to steal your login credentials or personal information.',
      whatToDo: [
        'Do NOT click any links in the message.',
        'Do NOT reply to the message or call any phone numbers in it.',
        'Go directly to the company&apos;s real website by typing the address in your browser.',
        'If you already clicked a link, change your passwords immediately.',
        'Forward suspicious emails to the Anti-Phishing Working Group at reportphishing@apwg.org.',
        'Report it to the FTC at reportfraud.ftc.gov.',
      ],
      relatedArticle: {
        label: 'What Is Cyber Crime? A Complete Guide for Seniors',
        href: '/blog/what-is-cyber-crime-guide-for-seniors',
      },
      severity: 'high',
    }
  }

  // Lottery / Prize Scam
  if (claim === 'prize' || (claim === 'prize' && request === 'money')) {
    return {
      scamType: 'Lottery or Prize Scam',
      description:
        'This is almost certainly a lottery or prize scam. If you did not enter a contest, you cannot win one. Legitimate prizes never require you to pay fees upfront.',
      howItWorks:
        'The scammer tells you that you have won a large prize, lottery, or sweepstakes. To "claim" your winnings, they say you need to pay taxes, processing fees, or shipping costs upfront. Once you pay, they ask for more — and the prize never arrives because it does not exist.',
      whatToDo: [
        'Ignore the message completely. You cannot win a contest you did not enter.',
        'NEVER pay money to collect a prize — that is always a scam.',
        'Do NOT share bank account numbers or personal information.',
        'Report it to the FTC at reportfraud.ftc.gov.',
        'If you received it by mail, also report it to the US Postal Inspection Service.',
      ],
      relatedArticle: {
        label: 'How to Report a Scam',
        href: '/blog/how-to-report-a-scam',
      },
      severity: 'high',
    }
  }

  // Job Scam
  if (claim === 'job') {
    return {
      scamType: 'Job or Employment Scam',
      description:
        'This has the characteristics of a job scam. Scammers post fake job listings or reach out with too-good-to-be-true opportunities to steal your personal information or money.',
      howItWorks:
        'The scammer offers a job with high pay and flexible hours, often requiring little experience. They may ask for personal information (like your Social Security number) for a "background check," ask you to pay for training or equipment upfront, or send you a fake check and ask you to wire part of it back.',
      whatToDo: [
        'Do NOT pay money for any job opportunity — legitimate employers never charge you.',
        'Do NOT share your Social Security number until you have verified the company is real.',
        'Research the company independently — look for reviews and check the Better Business Bureau.',
        'Be wary of jobs offered through text messages or social media DMs.',
        'Report fake job listings to the FTC at reportfraud.ftc.gov.',
      ],
      relatedArticle: {
        label: 'What Is Cyber Crime? A Complete Guide for Seniors',
        href: '/blog/what-is-cyber-crime-guide-for-seniors',
      },
      severity: 'medium',
    }
  }

  // Charity Scam
  if (claim === 'charity') {
    return {
      scamType: 'Charity or Donation Scam',
      description:
        'This may be a fake charity scam. Scammers exploit people&apos;s generosity by creating fake charities or impersonating real ones, especially after natural disasters or during the holidays.',
      howItWorks:
        'The scammer contacts you asking for donations to a charity that sounds legitimate. They pressure you to give immediately and may ask for payment by gift card, wire transfer, or cash — methods that are hard to trace or reverse. The money goes directly to the scammer, not to any charitable cause.',
      whatToDo: [
        'Do NOT donate on the spot — take time to research the charity first.',
        'Check the charity at give.org or charitynavigator.org before donating.',
        'Never donate via gift cards, wire transfers, or cryptocurrency.',
        'If you want to donate, go directly to the charity&apos;s official website.',
        'Report suspicious charities to your state attorney general and the FTC.',
      ],
      relatedArticle: {
        label: 'How to Protect Elderly Parents from Scams',
        href: '/blog/how-to-protect-elderly-parents-from-scams',
      },
      severity: 'medium',
    }
  }

  // Investment Scam (gift cards + wire + bank context)
  if (
    (request === 'wire' || request === 'money') &&
    claim === 'bank' &&
    urgency === 'extreme'
  ) {
    return {
      scamType: 'Investment or Banking Scam',
      description:
        'This appears to be a banking or investment scam. Scammers impersonate your bank or a financial advisor to trick you into transferring money or sharing your account details.',
      howItWorks:
        'The scammer contacts you claiming there is an urgent problem with your bank account, or offers an investment opportunity with guaranteed high returns. They create extreme urgency to prevent you from thinking clearly or verifying their claims. They may ask you to transfer money to a "safe account" that they control.',
      whatToDo: [
        'Hang up and call your bank directly using the number on the back of your card.',
        'NEVER transfer money based on a phone call or email alone.',
        'Your bank will never ask you to move money to keep it safe.',
        'Be extremely skeptical of any investment promising guaranteed returns.',
        'Report it to your bank&apos;s fraud department and the FTC at reportfraud.ftc.gov.',
      ],
      relatedArticle: {
        label: 'How to Report a Scam',
        href: '/blog/how-to-report-a-scam',
      },
      severity: 'high',
    }
  }

  // General Phishing / Link-based scam
  if (request === 'click_link') {
    return {
      scamType: 'Phishing or Malicious Link Scam',
      description:
        'This looks like a phishing attempt. The message is trying to get you to click a link that could steal your information or install harmful software on your device.',
      howItWorks:
        'The scammer sends a message with a link that looks legitimate but leads to a fake website. If you click it, you may be asked to enter personal information, or malware may be downloaded to your device without you knowing.',
      whatToDo: [
        'Do NOT click the link.',
        'Delete the message.',
        'If you already clicked it, run a virus scan on your device.',
        'Change passwords for any accounts you may have entered on the fake site.',
        'Report it to the FTC at reportfraud.ftc.gov.',
      ],
      relatedArticle: {
        label: 'What Is Cyber Crime? A Complete Guide for Seniors',
        href: '/blog/what-is-cyber-crime-guide-for-seniors',
      },
      severity: 'medium',
    }
  }

  // Gift card scam (any context)
  if (request === 'gift_cards') {
    return {
      scamType: 'Gift Card Scam',
      description:
        'Asking for payment in gift cards is one of the clearest signs of a scam. No legitimate business, government agency, or person in a real emergency will ask you to pay with gift cards.',
      howItWorks:
        'The scammer pressures you to buy gift cards (like iTunes, Google Play, or Amazon cards) and then read the numbers on the back over the phone. Once you share those numbers, the money is gone and cannot be recovered. Scammers use gift cards because they are almost impossible to trace.',
      whatToDo: [
        'STOP. Do NOT buy gift cards for anyone who asks you to pay with them.',
        'No real company or government agency accepts gift cards as payment.',
        'If you already shared gift card numbers, contact the gift card company immediately.',
        'Report it to the FTC at reportfraud.ftc.gov.',
      ],
      relatedArticle: {
        label: 'How to Report a Scam',
        href: '/blog/how-to-report-a-scam',
      },
      severity: 'high',
    }
  }

  // Default / General suspicious contact
  return {
    scamType: 'Suspicious Contact — Possible Scam',
    description:
      'Based on your answers, this contact has some warning signs that suggest it could be a scam. Even if it does not match a specific scam pattern, you should be cautious.',
    howItWorks:
      'Scammers are constantly inventing new approaches. The basic formula is always the same: gain your trust, create urgency or fear, and then ask for money or personal information. Any unexpected contact asking for something valuable should be treated with suspicion.',
    whatToDo: [
      'Do NOT share any personal information or send any money.',
      'Verify the person or organization independently — look up their real phone number or website yourself.',
      'Talk to a trusted family member or friend before taking any action.',
      'Trust your instincts — if something feels wrong, it probably is.',
      'Report suspicious contacts to the FTC at reportfraud.ftc.gov.',
    ],
    relatedArticle: {
      label: 'How to Protect Elderly Parents from Scams',
      href: '/blog/how-to-protect-elderly-parents-from-scams',
    },
    severity: 'medium',
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

export default function ScamQuiz() {
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

  const result = showResult ? identifyScam(answers) : null

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
          result && (
            <MotionDiv motionKey="result">
              <ResultCard result={result} onRestart={handleRestart} />
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
  result,
  onRestart,
}: {
  result: ScamResult
  onRestart: () => void
}) {
  const severityColors = {
    high: { bg: 'bg-red-600', headerBg: 'bg-red-600', text: 'text-white', badge: 'High Risk' },
    medium: { bg: 'bg-amber-500', headerBg: 'bg-amber-600', text: 'text-white', badge: 'Medium Risk' },
    low: { bg: 'bg-green-600', headerBg: 'bg-green-600', text: 'text-white', badge: 'Low Risk' },
  }

  const sev = severityColors[result.severity]

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm overflow-hidden">
      {/* Header */}
      <div className={`${sev.headerBg} text-white p-6 sm:p-8 text-center`}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-semibold mb-3">
          {sev.badge}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">
          {result.scamType}
        </h2>
        <p className="text-white/90 text-base sm:text-lg max-w-lg mx-auto">
          {result.description}
        </p>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8">
        {/* How It Works */}
        <div className="mb-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            How This Scam Works
          </h3>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {result.howItWorks}
          </p>
        </div>

        {/* What To Do */}
        <div className="mb-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
            What You Should Do Now
          </h3>
          <div className="space-y-3">
            {result.whatToDo.map((step, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-blue text-white font-bold text-sm shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-[var(--text-primary)] leading-relaxed text-base">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Reminder */}
        <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-1">
            Important Reminder
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
            If you have already sent money or shared personal information, contact your bank immediately and place a fraud alert on your credit by calling Equifax (1-800-525-6285), Experian (1-888-397-3742), or TransUnion (1-800-680-7289).
          </p>
        </div>

        {/* Related Article */}
        <div className="mb-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3">
            Learn More
          </h3>
          <Link
            href={result.relatedArticle.href}
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors text-brand-blue font-medium text-sm sm:text-base"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            {result.relatedArticle.label}
          </Link>
        </div>

        {/* Restart Button */}
        <div className="mt-8 text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-primary)] border-2 border-[var(--border-color)] text-[var(--text-primary)] font-semibold hover:border-brand-blue hover:text-brand-blue transition-all duration-200 text-base"
          >
            <RotateCcw className="w-5 h-5" />
            Start Over
          </button>
        </div>
      </div>
    </div>
  )
}
