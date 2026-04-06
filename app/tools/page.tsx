import type { Metadata } from 'next'
import Link from 'next/link'
import { Smartphone, FileText, Wifi, MapPin, ShieldAlert, Tv, DollarSign, WifiOff, Lock, Phone, Globe, HelpCircle, Flag, Bell, Database, AudioLines, HeartPulse, Stethoscope, Activity, Monitor, Settings, Calculator } from 'lucide-react'
import { breadcrumbJsonLd } from '@/lib/seo'
import { SITE_URL } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Free Tech Tools for Seniors',
  description:
    'Interactive tools to help you choose the right device, find internet plans, locate tech classes near you, and get printable cheat sheets.',
  alternates: { canonical: `${SITE_URL}/tools` },
  openGraph: {
    title: 'Free Tech Tools for Seniors | TechFor60s',
    description:
      'Interactive tools to help you choose the right device, find internet plans, locate tech classes near you, and get printable cheat sheets.',
    url: `${SITE_URL}/tools`,
  },
}

const TOOLS = [
  {
    href: '/tools/device-quiz',
    icon: Smartphone,
    color: 'bg-blue-100 text-brand-blue dark:bg-blue-900/30',
    title: 'Which Device Is Right for You?',
    desc: 'Answer 5 simple questions and get a personalised device recommendation — phone, tablet, or e-reader.',
  },
  {
    href: '/tools/iphone-cheat-sheet',
    icon: FileText,
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30',
    title: 'iPhone Cheat Sheet',
    desc: 'A printable one-page reference for the most common iPhone tasks — calls, messages, camera, settings, and more.',
  },
  {
    href: '/tools/android-cheat-sheet',
    icon: FileText,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30',
    title: 'Android Cheat Sheet',
    desc: 'A printable one-page reference for Android phones — basics, gestures, troubleshooting, and safety tips.',
  },
  {
    href: '/tools/internet-by-state',
    icon: Wifi,
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30',
    title: 'Best Internet Plans by State',
    desc: 'Compare internet providers and senior discount plans in all 50 US states.',
  },
  {
    href: '/tools/tech-classes',
    icon: MapPin,
    color: 'bg-red-100 text-red-600 dark:bg-red-900/30',
    title: 'Free Tech Classes Near You',
    desc: 'Find free computer and smartphone classes for seniors in 30 major US and UK cities.',
  },
  {
    href: '/tools/scam-checker',
    icon: ShieldAlert,
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30',
    title: 'Is This a Scam?',
    desc: 'Paste a suspicious email or text message and instantly check it for common scam warning signs.',
  },
  {
    href: '/tools/cord-cutting-calculator',
    icon: Tv,
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30',
    title: 'Cord-Cutting Savings Calculator',
    desc: 'Find out how much you could save by switching from cable TV to streaming services.',
  },
  {
    href: '/tools/phone-plan-calculator',
    icon: DollarSign,
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30',
    title: 'Phone Plan Savings Calculator',
    desc: 'Compare your current phone bill against senior-friendly plans and see potential savings.',
  },
  {
    href: '/tools/wifi-troubleshooter',
    icon: WifiOff,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30',
    title: 'WiFi Troubleshooter',
    desc: 'WiFi not working? Answer a few yes/no questions and get step-by-step instructions to fix it.',
  },
  {
    href: '/tools/password-checker',
    icon: Lock,
    color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30',
    title: 'Password Strength Checker',
    desc: 'Check if your password is strong enough and generate memorable, secure passwords.',
  },
  {
    href: '/tools/scam-phone-lookup',
    icon: Phone,
    color: 'bg-red-100 text-red-600 dark:bg-red-900/30',
    title: 'Scam Phone Number Lookup',
    desc: 'Enter a phone number to check it against known scam patterns, spoofed government numbers, and robocall indicators.',
  },
  {
    href: '/tools/is-this-website-safe',
    icon: Globe,
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30',
    title: 'Is This Website Safe?',
    desc: 'Paste any URL and we will check it for phishing, typosquatting, suspicious domains, and other red flags.',
  },
  {
    href: '/tools/scam-quiz',
    icon: HelpCircle,
    color: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30',
    title: 'What Type of Scam Is This?',
    desc: 'Answer a few questions about what happened and we will identify the scam type and tell you exactly what to do.',
  },
  {
    href: '/tools/report-scam',
    icon: Flag,
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30',
    title: 'Report a Scam — Step by Step',
    desc: 'A guided wizard that tells you exactly where and how to report a scam based on your country and situation.',
  },
  {
    href: '/tools/latest-scams',
    icon: Bell,
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30',
    title: 'Latest Scam Alerts',
    desc: 'Stay informed with the latest scam warnings — searchable and filterable by type, severity, and category.',
  },
  {
    href: '/tools/data-breach-checker',
    icon: Database,
    color: 'bg-slate-100 text-slate-600 dark:bg-slate-900/30',
    title: 'Data Breach Checker',
    desc: 'Search 25+ major data breaches to see if your accounts may be affected, and get step-by-step protection advice.',
  },
  {
    href: '/tools/voice-scam-simulator',
    icon: AudioLines,
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30',
    title: 'AI Voice Scam Simulator',
    desc: 'Test your ability to spot AI voice cloning scams with realistic scenarios. Learn to protect yourself and create a family safe word.',
  },
  {
    href: '/tools/parent-safety-audit',
    icon: HeartPulse,
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30',
    title: 'Is My Parent OK? — Safety Audit',
    desc: 'A quick assessment for adult children worried about elderly parents\' tech safety. Get a personalized safety checklist.',
  },
  {
    href: '/tools/telehealth-readiness',
    icon: Stethoscope,
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30',
    title: 'Telehealth Readiness Checker',
    desc: 'Find out if you\'re ready for a video doctor appointment. Check your device, internet, and get setup help.',
  },
  {
    href: '/tools/medical-alert-calculator',
    icon: Activity,
    color: 'bg-red-100 text-red-600 dark:bg-red-900/30',
    title: 'Medical Alert System Finder',
    desc: 'Answer a few questions about your needs and budget to find the best medical alert system for you or your parent.',
  },
  {
    href: '/tools/streaming-picker',
    icon: Monitor,
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30',
    title: 'Streaming Service Picker',
    desc: 'Tell us what you watch and your budget — we\'ll recommend the perfect streaming bundle and show your savings vs cable.',
  },
  {
    href: '/tools/phone-setup-wizard',
    icon: Settings,
    color: 'bg-blue-100 text-brand-blue dark:bg-blue-900/30',
    title: 'Phone Setup Wizard',
    desc: 'Get a personalized accessibility setup guide for your phone based on your device and any vision, hearing, or mobility needs.',
  },
  {
    href: '/tools/tech-support-calculator',
    icon: Calculator,
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30',
    title: 'Family Tech Support Cost Calculator',
    desc: 'Calculate the hidden cost of helping your parents with tech. Compare DIY vs professional support services.',
  },
]

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Tools' },
            ])
          ),
        }}
      />

      <section className="bg-gradient-to-br from-brand-blue via-blue-700 to-blue-900 text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Free Tech Tools for Seniors
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Interactive quizzes, printable cheat sheets, and local resources — all free, all designed for you.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Tools' }]} />

        <div className="grid gap-5 sm:grid-cols-2 mt-8">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group card p-6 flex items-start gap-4 hover:border-brand-blue/30 no-underline transition-all"
            >
              <div
                className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center shrink-0`}
              >
                <tool.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-semibold text-lg text-[var(--text-primary)] group-hover:text-brand-blue transition-colors mb-1">
                  {tool.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
