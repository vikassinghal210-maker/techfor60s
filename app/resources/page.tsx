import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import { PRINTABLES } from '@/lib/printables-data'

export const metadata: Metadata = {
  title: 'Free Printable Tech Guides for Seniors',
  description:
    'Download and print these simple tech guides — Zoom cheat sheets, scam checklists, WiFi troubleshooting, password trackers, and more. Designed for seniors in large, clear text.',
  keywords: [
    'printable tech guides seniors',
    'printable Zoom cheat sheet',
    'scam checklist for elderly',
    'WiFi troubleshooting guide printable',
    'password tracker printable',
    'emergency contacts template seniors',
    'WhatsApp guide for seniors',
  ],
  alternates: { canonical: `${SITE_URL}/resources` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/resources`,
    title: 'Free Printable Tech Guides for Seniors | TechFor60s',
    description:
      'Download and print these simple tech guides — Zoom cheat sheets, scam checklists, WiFi troubleshooting, and more.',
    siteName: 'TechFor60s',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Printable Tech Guides for Seniors',
    description:
      'Download and print these simple tech guides — Zoom cheat sheets, scam checklists, WiFi troubleshooting, and more.',
  },
}

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Printable Resources' },
            ])
          ),
        }}
      />

      <section className="bg-gradient-to-br from-brand-blue via-blue-700 to-blue-900 text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Free Printable Tech Guides
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Print these guides and keep them near your computer or phone for
            quick reference. Written in large, clear text — no jargon.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Printable Resources' },
          ]}
        />

        <div className="grid gap-5 sm:grid-cols-2 mt-8">
          {PRINTABLES.map((printable) => (
            <Link
              key={printable.slug}
              href={`/resources/${printable.slug}`}
              className="group card p-6 flex items-start gap-4 hover:border-brand-blue/30 no-underline transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-2xl">
                {printable.icon}
              </div>
              <div>
                <h2 className="font-semibold text-lg text-[var(--text-primary)] group-hover:text-brand-blue transition-colors mb-1">
                  {printable.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {printable.description}
                </p>
                <span
                  className="inline-block mt-2 text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {printable.category}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <section
          className="mt-12 rounded-xl p-6 border"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <h2
            className="text-xl font-bold font-[family-name:var(--font-heading)] mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            How to Print These Guides
          </h2>
          <ol
            className="list-decimal list-inside space-y-2 text-base leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            <li>Click on any guide above to open it</li>
            <li>
              Click the <strong>&quot;Print This Guide&quot;</strong> button at
              the top of the page
            </li>
            <li>
              Choose your printer and click <strong>Print</strong>
            </li>
            <li>Keep the printed sheet near your computer or phone</li>
          </ol>
        </section>

        <div
          className="text-center pt-8 mt-8 border-t"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <Link
            href="/tools"
            className="text-brand-blue hover:underline font-medium"
          >
            Explore our interactive Tech Tools
          </Link>
        </div>
      </div>
    </>
  )
}
