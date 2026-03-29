import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import PrintButton from '@/components/PrintButton'
import { getPrintable, getAllPrintableSlugs } from '@/lib/printables-data'

export async function generateStaticParams() {
  return getAllPrintableSlugs()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const printable = getPrintable(slug)
  if (!printable) return {}

  const title = `${printable.title} — Free Printable Guide`
  const description = printable.description
  const url = `${SITE_URL}/resources/${slug}`

  return {
    title,
    description,
    keywords: [
      `${printable.title.toLowerCase()} printable`,
      `${printable.category.toLowerCase()} guide for seniors`,
      'printable tech guide seniors',
      'free tech cheat sheet',
    ],
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      siteName: 'TechFor60s',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: { canonical: url },
  }
}

export default async function PrintablePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const printable = getPrintable(slug)

  if (!printable) notFound()

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Printable Resources', url: `${SITE_URL}/resources` },
    { name: printable.title },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Print-optimized styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              nav, footer, header, .print\\:hidden { display: none !important; }
              body { font-size: 14pt; line-height: 1.6; color: #000 !important; background: #fff !important; }
              h1 { font-size: 22pt !important; }
              h2 { font-size: 16pt !important; page-break-after: avoid; }
              ul, ol { page-break-inside: avoid; }
              a { color: #000 !important; text-decoration: none !important; }
              .card, section { border: none !important; box-shadow: none !important; }
            }
          `,
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <div className="print:hidden">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Printable Resources', href: '/resources' },
            { label: printable.title },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4 print:hidden">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-muted)',
            }}
          >
            {printable.category}
          </span>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-muted)',
            }}
          >
            Printable Guide
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {printable.icon} {printable.title}
        </h1>
        <p
          className="text-lg leading-relaxed mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          {printable.description}
        </p>
        <PrintButton />
      </section>

      {/* Content sections */}
      {printable.content.map((section, sectionIndex) => (
        <section key={sectionIndex} className="mb-8">
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {section.heading}
          </h2>
          <ul className="space-y-2.5">
            {section.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="flex gap-3 text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-blue print:bg-black" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* Bottom print button */}
      <div className="mt-10 mb-6 text-center print:hidden">
        <PrintButton />
      </div>

      {/* Footer */}
      <div
        className="text-center pt-6 border-t print:hidden"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <p className="mb-4 text-sm" style={{ color: 'var(--text-muted)' }}>
          From{' '}
          <Link href="/" className="text-brand-blue hover:underline">
            TechFor60s.com
          </Link>{' '}
          — Technology Made Simple for Seniors
        </p>
        <Link
          href="/resources"
          className="text-brand-blue hover:underline font-medium"
        >
          Browse all Printable Guides
        </Link>
      </div>

      {/* Print-only footer */}
      <div className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
        <p>
          Downloaded from TechFor60s.com — Free tech guides for seniors
        </p>
      </div>
    </div>
  )
}
