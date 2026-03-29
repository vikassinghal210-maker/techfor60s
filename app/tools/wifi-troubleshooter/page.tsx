import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import WifiTroubleshooter from '@/components/WifiTroubleshooter'

const PAGE_URL = `${SITE_URL}/tools/wifi-troubleshooter`

export const metadata: Metadata = {
  title: 'WiFi Not Working? — Free Troubleshooter for Seniors',
  description:
    'WiFi not connecting? Follow our simple step-by-step troubleshooter to fix your internet connection. Answers a few yes/no questions and tells you exactly what to do. No tech knowledge needed.',
  keywords: [
    'wifi not working',
    'internet not connecting',
    'fix wifi connection',
    'wifi troubleshooter',
    'can\'t connect to wifi',
    'wifi problems fix',
    'internet not working fix',
    'wifi help for seniors',
    'how to fix wifi',
    'wifi diagnostic tool',
    'router not working',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'WiFi Not Working? — Free Troubleshooter',
    description: 'Answer a few simple questions and fix your WiFi connection. No tech knowledge needed.',
    siteName: SITE_NAME,
    images: [{
      url: `${SITE_URL}/api/og?title=${encodeURIComponent('WiFi Troubleshooter')}`,
      width: 1200, height: 630, alt: 'WiFi Troubleshooter',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WiFi Not Working? — Free Troubleshooter',
    description: 'Fix your WiFi in minutes with our simple step-by-step guide.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'Why does my WiFi keep disconnecting?',
    answer: 'Common causes include: being too far from the router, router overheating, too many devices connected, or interference from microwaves and baby monitors. Try moving closer to the router, restarting it, or placing it in a central location in your home.',
  },
  {
    question: 'How do I find my WiFi password?',
    answer: 'Check the sticker on the bottom or back of your router — it usually shows the default network name and password. If you or someone else changed it, check with your internet provider or the person who set up your WiFi.',
  },
  {
    question: 'Should I restart my router regularly?',
    answer: 'Restarting your router once a month is a good habit. It clears the memory and can prevent slowdowns. Simply unplug it for 60 seconds, then plug it back in and wait 2-3 minutes.',
  },
  {
    question: 'What do the lights on my router mean?',
    answer: 'A solid green or white light usually means everything is working. A blinking light means data is being sent (normal). A red, orange, or no light often means there\'s a problem — try restarting the router or calling your internet provider.',
  },
]

export default function WifiTroubleshooterPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'WiFi Troubleshooter' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }} />

      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
        { label: 'WiFi Troubleshooter' },
      ]} />

      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          WiFi Not Working?
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Don&apos;t worry — we&apos;ll help you fix it. Just answer a few simple yes or no
          questions, and we&apos;ll tell you exactly what to do. No tech knowledge needed.
        </p>
      </section>

      <section className="mb-12">
        <WifiTroubleshooter />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <details key={i} className="group rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
              <summary className="cursor-pointer list-none p-5 text-lg font-semibold flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50" style={{ color: 'var(--text-primary)' }}>
                {faq.question}
                <span className="ml-2 text-brand-blue transition-transform group-open:rotate-180">▾</span>
              </summary>
              <div className="px-5 pb-5">
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-xl border p-6" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: 'var(--text-primary)' }}>
          Related Guides
        </h2>
        <ul className="space-y-3">
          <li><Link href="/tools/internet-speed-calculator" className="text-brand-blue hover:underline font-medium">How Much Internet Speed Do I Need? →</Link></li>
          <li><Link href="/how-to/connect-wifi/iphone-generic" className="text-brand-blue hover:underline font-medium">How to Connect to WiFi on iPhone →</Link></li>
          <li><Link href="/tools/internet-by-state" className="text-brand-blue hover:underline font-medium">Compare Internet Plans in Your State →</Link></li>
        </ul>
      </section>
    </div>
  )
}
