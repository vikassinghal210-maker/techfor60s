import type { Metadata } from 'next'
import Link from 'next/link'
import { Smartphone, FileText, Wifi, MapPin } from 'lucide-react'
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
