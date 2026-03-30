'use client'

import { useState, useRef } from 'react'
import {
  Globe,
  Phone,
  Mail,
  ShoppingCart,
  Heart,
  TrendingUp,
  UserX,
  Building2,
  Monitor,
  HelpCircle,
  DollarSign,
  ShieldAlert,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Printer,
  ExternalLink,
  Square,
  CheckSquare,
} from 'lucide-react'

/* ─── types ─── */
type Country = 'us' | 'uk' | 'ca' | 'au'
type ScamType =
  | 'phone'
  | 'email_text'
  | 'online_purchase'
  | 'romance'
  | 'investment'
  | 'identity_theft'
  | 'government_impersonation'
  | 'tech_support'
  | 'other'
type MoneyLost = 'yes' | 'no' | 'shared_info'

interface ReportingAgency {
  name: string
  handles: string
  howToReport: string
  url?: string
  phone?: string
  responseTime: string
}

/* ─── data ─── */
const COUNTRIES: { value: Country; label: string; icon: string }[] = [
  { value: 'us', label: 'United States', icon: '🇺🇸' },
  { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
  { value: 'ca', label: 'Canada', icon: '🇨🇦' },
  { value: 'au', label: 'Australia', icon: '🇦🇺' },
]

const SCAM_TYPES: { value: ScamType; label: string; Icon: typeof Phone }[] = [
  { value: 'phone', label: 'Phone call', Icon: Phone },
  { value: 'email_text', label: 'Email or text message', Icon: Mail },
  { value: 'online_purchase', label: 'Online purchase', Icon: ShoppingCart },
  { value: 'romance', label: 'Romance scam', Icon: Heart },
  { value: 'investment', label: 'Investment scam', Icon: TrendingUp },
  { value: 'identity_theft', label: 'Identity theft', Icon: UserX },
  { value: 'government_impersonation', label: 'Government impersonation', Icon: Building2 },
  { value: 'tech_support', label: 'Tech support scam', Icon: Monitor },
  { value: 'other', label: 'Other / not sure', Icon: HelpCircle },
]

const MONEY_OPTIONS: { value: MoneyLost; label: string }[] = [
  { value: 'yes', label: 'Yes, I lost money' },
  { value: 'no', label: 'No, I did not lose money' },
  { value: 'shared_info', label: 'I shared personal info but no money was taken' },
]

function getAgencies(country: Country, scamType: ScamType): ReportingAgency[] {
  const agencies: ReportingAgency[] = []

  if (country === 'us') {
    agencies.push({
      name: 'Federal Trade Commission (FTC)',
      handles: 'All types of scams, fraud, and deceptive business practices',
      howToReport: 'File a report online at ReportFraud.ftc.gov. You can also call.',
      url: 'https://reportfraud.ftc.gov',
      phone: '1-877-382-4357',
      responseTime: 'You will receive a confirmation. The FTC uses reports to build cases but does not resolve individual complaints.',
    })
    agencies.push({
      name: 'FBI Internet Crime Complaint Center (IC3)',
      handles: 'Internet-based fraud, including email scams, online purchases, and investment scams',
      howToReport: 'File a complaint online at ic3.gov.',
      url: 'https://www.ic3.gov',
      responseTime: 'Reports are reviewed by analysts. You may be contacted if your case is selected for investigation.',
    })
    if (scamType === 'government_impersonation') {
      agencies.push({
        name: 'Social Security Administration Office of the Inspector General',
        handles: 'Scams involving Social Security numbers or people pretending to be from the SSA',
        howToReport: 'Report online or call the OIG hotline.',
        url: 'https://oig.ssa.gov/report',
        phone: '1-800-269-0271',
        responseTime: 'Reports are investigated by federal agents. You may receive follow-up contact.',
      })
    }
    if (scamType === 'phone') {
      agencies.push({
        name: 'Federal Communications Commission (FCC)',
        handles: 'Unwanted phone calls, robocalls, caller ID spoofing, and phone scams',
        howToReport: 'File a complaint online at the FCC Consumer Complaint Center.',
        url: 'https://consumercomplaints.fcc.gov',
        phone: '1-888-225-5322',
        responseTime: 'The FCC tracks patterns and takes enforcement action. Individual resolution is not typical.',
      })
    }
    agencies.push({
      name: 'Your State Attorney General',
      handles: 'State-level consumer protection, local scams, and business fraud',
      howToReport: 'Search "[your state] attorney general consumer complaint" to find your state office and file online or by phone.',
      url: 'https://www.naag.org/find-my-ag/',
      responseTime: 'Response times vary by state. Many offices follow up within 2 to 4 weeks.',
    })
  }

  if (country === 'uk') {
    agencies.push({
      name: 'Action Fraud',
      handles: 'All types of fraud and cybercrime in England, Wales, and Northern Ireland',
      howToReport: 'Report online at actionfraud.police.uk or call the helpline.',
      url: 'https://www.actionfraud.police.uk',
      phone: '0300 123 2040',
      responseTime: 'You will receive a crime reference number. Cases are assessed and may be referred to local police.',
    })
    agencies.push({
      name: 'Citizens Advice',
      handles: 'Free guidance on scams, consumer rights, and next steps to protect yourself',
      howToReport: 'Visit citizensadvice.org.uk or call the consumer helpline.',
      url: 'https://www.citizensadvice.org.uk',
      phone: '0808 223 1133',
      responseTime: 'Immediate advice available online. Phone wait times vary.',
    })
    if (scamType === 'phone' || scamType === 'email_text') {
      agencies.push({
        name: 'Forward Scam Texts to 7726',
        handles: 'Scam text messages and suspicious SMS',
        howToReport: 'Forward the scam text message to 7726 (which spells SPAM). Your mobile provider will investigate.',
        responseTime: 'Your provider may follow up by text to ask for the sender number.',
      })
    }
  }

  if (country === 'ca') {
    agencies.push({
      name: 'Canadian Anti-Fraud Centre (CAFC)',
      handles: 'All types of fraud, scams, and identity theft in Canada',
      howToReport: 'Report online at antifraudcentre-centreantifraude.ca or call the toll-free number.',
      url: 'https://www.antifraudcentre-centreantifraude.ca',
      phone: '1-888-495-8501',
      responseTime: 'You will receive a confirmation. Reports are analyzed for patterns and shared with law enforcement.',
    })
  }

  if (country === 'au') {
    agencies.push({
      name: 'Scamwatch (ACCC)',
      handles: 'All types of scams targeting Australians, including phone, email, and online scams',
      howToReport: 'Report online at scamwatch.gov.au.',
      url: 'https://www.scamwatch.gov.au',
      responseTime: 'Reports are used to warn the community and disrupt scams. You may not receive individual follow-up.',
    })
    agencies.push({
      name: 'ReportCyber (Australian Cyber Security Centre)',
      handles: 'Cybercrime including hacking, identity theft, and online fraud',
      howToReport: 'Report online at cyber.gov.au.',
      url: 'https://www.cyber.gov.au/report-and-recover/report',
      responseTime: 'Serious incidents may be referred to law enforcement. You will receive a reference number.',
    })
  }

  return agencies
}

function getMoneyLostSteps(): string[] {
  return [
    'Contact your bank or credit card company immediately and tell them the transaction was fraudulent. Ask to reverse or dispute the charge.',
    'Place a fraud alert on your credit file by contacting one of the three credit bureaus: Equifax (1-800-525-6285), Experian (1-888-397-3742), or TransUnion (1-800-680-7289). One call covers all three.',
    'Consider placing a credit freeze to prevent new accounts from being opened in your name.',
    'Keep records of all communications related to the scam — screenshots, emails, phone numbers, and transaction details.',
    'If you paid with a gift card, contact the gift card company immediately with the card number and receipt.',
    'If you sent a wire transfer, contact the wire transfer company (Western Union, MoneyGram) to report the fraud and request a reversal.',
  ]
}

function getSharedInfoSteps(): string[] {
  return [
    'Change your passwords immediately on any accounts that may be affected. Use strong, unique passwords for each account.',
    'Enable two-factor authentication on your email, banking, and social media accounts.',
    'Place a fraud alert on your credit report by calling one of the three credit bureaus.',
    'Monitor your bank and credit card statements closely for any unauthorized transactions over the next several months.',
    'Consider signing up for a free credit monitoring service to be alerted to any new activity.',
    'If you shared your Social Security number (US), contact the SSA and consider an identity theft report at IdentityTheft.gov.',
    'Be alert for follow-up scams — scammers sometimes target the same person again pretending to help with the first scam.',
  ]
}

/* ─── component ─── */
export default function ReportScamWizard() {
  const [step, setStep] = useState(1)
  const [country, setCountry] = useState<Country | null>(null)
  const [scamType, setScamType] = useState<ScamType | null>(null)
  const [moneyLost, setMoneyLost] = useState<MoneyLost | null>(null)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const resultsRef = useRef<HTMLDivElement>(null)

  const totalSteps = 4

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handlePrint = () => {
    window.print()
  }

  const goNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const goBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const startOver = () => {
    setStep(1)
    setCountry(null)
    setScamType(null)
    setMoneyLost(null)
    setCheckedItems(new Set())
  }

  const canProceed =
    (step === 1 && country !== null) ||
    (step === 2 && scamType !== null) ||
    (step === 3 && moneyLost !== null)

  const agencies = country && scamType ? getAgencies(country, scamType) : []

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-2">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div
              className="h-2 rounded-full flex-1 transition-colors"
              style={{
                backgroundColor: s <= step ? 'var(--brand-blue, #0F3460)' : 'var(--border-color, #e5e7eb)',
              }}
            />
          </div>
        ))}
      </div>
      <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
        Step {Math.min(step, totalSteps)} of {totalSteps}
      </p>

      {/* ─── Step 1: Country ─── */}
      {step === 1 && (
        <div>
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            <Globe className="inline-block mr-2 mb-1" size={28} />
            What country are you in?
          </h2>
          <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            This helps us show you the correct reporting agencies for your location.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {COUNTRIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCountry(c.value)}
                className="rounded-xl border p-5 text-left text-lg font-medium transition-all cursor-pointer"
                style={{
                  borderColor: country === c.value ? 'var(--brand-blue, #0F3460)' : 'var(--border-color, #e5e7eb)',
                  backgroundColor: country === c.value ? 'var(--bg-highlight, #EBF0F9)' : 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  borderWidth: country === c.value ? '2px' : '1px',
                }}
              >
                <span className="mr-3 text-2xl">{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── Step 2: Scam type ─── */}
      {step === 2 && (
        <div>
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            <ShieldAlert className="inline-block mr-2 mb-1" size={28} />
            What type of scam was it?
          </h2>
          <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Select the option that best describes what happened. If you&apos;re not sure, choose &quot;Other / not sure&quot; at the bottom.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {SCAM_TYPES.map((s) => {
              const IconComp = s.Icon
              return (
                <button
                  key={s.value}
                  onClick={() => setScamType(s.value)}
                  className="rounded-xl border p-5 text-left text-lg font-medium transition-all cursor-pointer flex items-center gap-3"
                  style={{
                    borderColor: scamType === s.value ? 'var(--brand-blue, #0F3460)' : 'var(--border-color, #e5e7eb)',
                    backgroundColor: scamType === s.value ? 'var(--bg-highlight, #EBF0F9)' : 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderWidth: scamType === s.value ? '2px' : '1px',
                  }}
                >
                  <IconComp size={22} style={{ color: 'var(--brand-blue, #0F3460)' }} />
                  {s.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ─── Step 3: Money lost? ─── */}
      {step === 3 && (
        <div>
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            <DollarSign className="inline-block mr-2 mb-1" size={28} />
            Did you lose money?
          </h2>
          <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            This helps us include the right recovery steps in your personalized plan.
          </p>
          <div className="space-y-3">
            {MONEY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setMoneyLost(opt.value)}
                className="rounded-xl border p-5 text-left text-lg font-medium transition-all cursor-pointer w-full"
                style={{
                  borderColor: moneyLost === opt.value ? 'var(--brand-blue, #0F3460)' : 'var(--border-color, #e5e7eb)',
                  backgroundColor: moneyLost === opt.value ? 'var(--bg-highlight, #EBF0F9)' : 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  borderWidth: moneyLost === opt.value ? '2px' : '1px',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── Step 4: Results ─── */}
      {step === 4 && country && scamType && moneyLost && (
        <div ref={resultsRef}>
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            <CheckCircle className="inline-block mr-2 mb-1" size={28} style={{ color: '#16a34a' }} />
            Your Personalized Reporting Plan
          </h2>
          <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Based on your answers, here are the steps you should take. Check off each item as you complete it.
          </p>

          {/* Reporting agencies */}
          <div className="space-y-4 mb-8">
            <h3
              className="text-xl font-bold font-[family-name:var(--font-heading)]"
              style={{ color: 'var(--text-primary)' }}
            >
              Report the Scam To:
            </h3>
            {agencies.map((agency, i) => {
              const checkId = `agency-${i}`
              const isChecked = checkedItems.has(checkId)
              return (
                <div
                  key={i}
                  className="rounded-xl border p-5"
                  style={{
                    borderColor: 'var(--border-color, #e5e7eb)',
                    backgroundColor: isChecked ? 'var(--bg-highlight, #EBF0F9)' : 'var(--bg-secondary)',
                    opacity: isChecked ? 0.8 : 1,
                  }}
                >
                  <button
                    onClick={() => toggleCheck(checkId)}
                    className="flex items-start gap-3 w-full text-left cursor-pointer"
                  >
                    {isChecked ? (
                      <CheckSquare size={24} className="mt-0.5 shrink-0" style={{ color: '#16a34a' }} />
                    ) : (
                      <Square size={24} className="mt-0.5 shrink-0" style={{ color: 'var(--text-secondary)' }} />
                    )}
                    <div className="flex-1">
                      <h4
                        className="text-lg font-semibold mb-1"
                        style={{
                          color: 'var(--text-primary)',
                          textDecoration: isChecked ? 'line-through' : 'none',
                        }}
                      >
                        {agency.name}
                      </h4>
                    </div>
                  </button>
                  <div className="ml-9 mt-2 space-y-2">
                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <strong>What they handle:</strong> {agency.handles}
                    </p>
                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <strong>How to report:</strong> {agency.howToReport}
                    </p>
                    {agency.url && (
                      <p>
                        <a
                          href={agency.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-blue hover:underline font-medium inline-flex items-center gap-1"
                        >
                          Visit website <ExternalLink size={16} />
                        </a>
                      </p>
                    )}
                    {agency.phone && (
                      <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        <strong>Phone:</strong>{' '}
                        <a href={`tel:${agency.phone.replace(/[^0-9+]/g, '')}`} className="text-brand-blue hover:underline font-medium">
                          {agency.phone}
                        </a>
                      </p>
                    )}
                    <p className="leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <strong>What to expect:</strong> {agency.responseTime}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Money lost steps */}
          {moneyLost === 'yes' && (
            <div className="mb-8">
              <h3
                className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
                style={{ color: 'var(--brand-red, #E94560)' }}
              >
                <DollarSign className="inline-block mr-2 mb-1" size={24} />
                Because You Lost Money — Take These Steps:
              </h3>
              <div className="space-y-3">
                {getMoneyLostSteps().map((stepText, i) => {
                  const checkId = `money-${i}`
                  const isChecked = checkedItems.has(checkId)
                  return (
                    <button
                      key={i}
                      onClick={() => toggleCheck(checkId)}
                      className="flex items-start gap-3 w-full text-left rounded-xl border p-4 cursor-pointer"
                      style={{
                        borderColor: 'var(--border-color, #e5e7eb)',
                        backgroundColor: isChecked ? 'var(--bg-highlight, #EBF0F9)' : 'var(--bg-secondary)',
                        opacity: isChecked ? 0.8 : 1,
                      }}
                    >
                      {isChecked ? (
                        <CheckSquare size={22} className="mt-0.5 shrink-0" style={{ color: '#16a34a' }} />
                      ) : (
                        <Square size={22} className="mt-0.5 shrink-0" style={{ color: 'var(--text-secondary)' }} />
                      )}
                      <span
                        className="leading-relaxed text-lg"
                        style={{
                          color: 'var(--text-primary)',
                          textDecoration: isChecked ? 'line-through' : 'none',
                        }}
                      >
                        {stepText}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Shared info steps */}
          {(moneyLost === 'shared_info' || moneyLost === 'yes') && (
            <div className="mb-8">
              <h3
                className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
                style={{ color: 'var(--brand-blue, #0F3460)' }}
              >
                <ShieldAlert className="inline-block mr-2 mb-1" size={24} />
                {moneyLost === 'yes'
                  ? 'Also Protect Your Personal Information:'
                  : 'Because You Shared Personal Information — Protect Yourself:'}
              </h3>
              <div className="space-y-3">
                {getSharedInfoSteps().map((stepText, i) => {
                  const checkId = `info-${i}`
                  const isChecked = checkedItems.has(checkId)
                  return (
                    <button
                      key={i}
                      onClick={() => toggleCheck(checkId)}
                      className="flex items-start gap-3 w-full text-left rounded-xl border p-4 cursor-pointer"
                      style={{
                        borderColor: 'var(--border-color, #e5e7eb)',
                        backgroundColor: isChecked ? 'var(--bg-highlight, #EBF0F9)' : 'var(--bg-secondary)',
                        opacity: isChecked ? 0.8 : 1,
                      }}
                    >
                      {isChecked ? (
                        <CheckSquare size={22} className="mt-0.5 shrink-0" style={{ color: '#16a34a' }} />
                      ) : (
                        <Square size={22} className="mt-0.5 shrink-0" style={{ color: 'var(--text-secondary)' }} />
                      )}
                      <span
                        className="leading-relaxed text-lg"
                        style={{
                          color: 'var(--text-primary)',
                          textDecoration: isChecked ? 'line-through' : 'none',
                        }}
                      >
                        {stepText}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Print + Start over */}
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-lg font-medium cursor-pointer transition-colors hover:opacity-80"
              style={{
                borderColor: 'var(--brand-blue, #0F3460)',
                color: 'var(--brand-blue, #0F3460)',
                backgroundColor: 'transparent',
              }}
            >
              <Printer size={20} />
              Print This Page
            </button>
            <button
              onClick={startOver}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-lg font-medium cursor-pointer transition-colors hover:opacity-90"
              style={{
                backgroundColor: 'var(--brand-blue, #0F3460)',
                color: '#fff',
              }}
            >
              Start Over
            </button>
          </div>
        </div>
      )}

      {/* Navigation buttons (steps 1-3) */}
      {step < 4 && (
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={goBack}
            disabled={step === 1}
            className="inline-flex items-center gap-1 rounded-xl px-5 py-3 text-lg font-medium cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              color: 'var(--text-secondary)',
              backgroundColor: 'transparent',
            }}
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <button
            onClick={goNext}
            disabled={!canProceed}
            className="inline-flex items-center gap-1 rounded-xl px-6 py-3 text-lg font-medium cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              backgroundColor: canProceed ? 'var(--brand-blue, #0F3460)' : 'var(--border-color, #e5e7eb)',
              color: canProceed ? '#fff' : 'var(--text-secondary)',
            }}
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
