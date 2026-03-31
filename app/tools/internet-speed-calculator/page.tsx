import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import SpeedCalculator from '@/components/SpeedCalculator'

const PAGE_URL = `${SITE_URL}/tools/internet-speed-calculator`

export const metadata: Metadata = {
  title: 'How Much Internet Speed Do I Need? — Free Calculator for Seniors',
  description:
    'Answer 5 simple questions and find out exactly how much internet speed you need. Our free calculator is designed for seniors — no tech jargon, just clear answers about internet speed for video calls, streaming, and everyday use.',
  keywords: [
    'how much internet speed do I need',
    'internet speed calculator',
    'internet speed for video calls',
    'internet speed for streaming',
    'internet speed for seniors',
    'how many Mbps do I need',
    'internet speed recommendation',
    'best internet speed for home',
    'senior internet speed guide',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'How Much Internet Speed Do I Need? — Free Calculator',
    description:
      'Answer 5 simple questions and find out exactly how much internet speed your household needs. Designed for seniors — no tech jargon.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('How Much Internet Speed Do I Need?')}`,
        width: 1200,
        height: 630,
        alt: 'Internet Speed Calculator for Seniors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Internet Speed Do I Need? — Free Calculator',
    description:
      'Answer 5 simple questions and find out exactly how much internet speed you need.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'What is Mbps and why does it matter?',
    answer:
      'Mbps stands for "megabits per second." It measures how fast your internet can move information. Think of it like water pressure in a pipe — the higher the Mbps number, the faster things load. For most seniors, 25-100 Mbps is plenty for everyday tasks like email, video calls, and streaming TV shows.',
  },
  {
    question: 'How much internet speed do I need for Zoom or FaceTime?',
    answer:
      'For a clear video call on Zoom or FaceTime, you need about 10-25 Mbps. If two people in your home are on video calls at the same time, you would want at least 50 Mbps. The good news is that most modern internet plans easily cover this.',
  },
  {
    question: 'How much internet speed do I need for Netflix or YouTube?',
    answer:
      'For streaming in standard HD (which looks great on most TVs), you need about 10 Mbps per TV. For 4K ultra-high-definition, you need about 25 Mbps per TV. If you have two TVs streaming at the same time, double those numbers.',
  },
  {
    question: 'Can I have internet that is too fast?',
    answer:
      'You cannot have internet that is "too fast," but you can pay for more speed than you actually need. Many internet providers push expensive plans with 500 Mbps or even 1,000 Mbps (1 Gbps), but most households only need 50-200 Mbps. Use our calculator above to find out what you actually need and avoid overpaying.',
  },
  {
    question: 'What is the difference between download speed and upload speed?',
    answer:
      'Download speed is how fast you receive information — like loading a website, watching a video, or getting an email. Upload speed is how fast you send information — like sharing photos, making a video call, or posting on social media. Download speed is usually faster and matters more for most daily tasks. Upload speed matters most for video calls and sharing files.',
  },
]

const jsonLdFaqs = [
  {
    question: 'How much internet speed do I need for video calls?',
    answer:
      'For clear video calls on Zoom or FaceTime, you need 10-25 Mbps. If two people make video calls at the same time, 50 Mbps is recommended. Most modern internet plans cover this easily.',
  },
  {
    question: 'How much internet speed do I need for streaming Netflix?',
    answer:
      'For HD streaming, you need about 10 Mbps per device. For 4K streaming, you need 25 Mbps per device. A household with 2 TVs streaming at once should have at least 50 Mbps.',
  },
  {
    question: 'What is a good internet speed for seniors?',
    answer:
      'Most seniors need 25-100 Mbps for everyday tasks like email, video calls, and streaming TV. If you live alone and mainly use email, 25 Mbps is fine. Couples who stream and video call need closer to 50-100 Mbps.',
  },
  {
    question: 'Am I paying for too much internet speed?',
    answer:
      'Many people pay for 200-500 Mbps when they only need 50-100 Mbps. Use the free calculator on this page to find your actual need. If your current plan is much higher, call your provider to downgrade and save $20-40 per month.',
  },
]

const speedGuideData = [
  { activity: 'Email & web browsing', speed: '1-5 Mbps', description: 'Very light — any internet plan will handle this easily' },
  { activity: 'Social media (Facebook, etc.)', speed: '3-5 Mbps', description: 'Loads photos and short videos without trouble' },
  { activity: 'Online shopping & banking', speed: '3-5 Mbps', description: 'Secure pages may load a bit slower, but any plan works' },
  { activity: 'Video calls (Zoom, FaceTime)', speed: '10-25 Mbps', description: 'Higher speed keeps the video smooth and clear' },
  { activity: 'HD streaming (Netflix, YouTube)', speed: '10-25 Mbps', description: 'Per TV — multiply if more than one screen is streaming' },
  { activity: '4K streaming', speed: '25-50 Mbps', description: 'Only needed for newer 4K TVs — HD is fine for most people' },
  { activity: 'Working from home', speed: '25-50 Mbps', description: 'Video meetings plus file sharing need reliable speed' },
  { activity: 'Online gaming', speed: '15-25 Mbps', description: 'Low latency (ping) matters more than raw speed for gaming' },
]

export default function InternetSpeedCalculatorPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Tools', url: `${SITE_URL}/tools` },
              { name: 'Internet Speed Calculator', url: PAGE_URL },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(jsonLdFaqs)),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'Internet Speed Calculator' },
          ]}
        />

        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-4">
            How Much Internet Speed Do I Need?
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-2">
            Answer 5 simple questions and we will tell you exactly how much internet speed your
            household needs — in plain English, no tech jargon.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Takes about 1 minute. No sign-up required. Your answers are not stored or shared.
          </p>
        </div>

        {/* Calculator Component */}
        <SpeedCalculator />

        {/* Understanding Internet Speed */}
        <section className="mt-16 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6 text-center">
            Understanding Internet Speed
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 mb-8">
            <div
              className="rounded-xl p-5 sm:p-6 border border-[var(--border-color)]"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3">
                What Does "Mbps" Mean?
              </h3>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                Mbps stands for <strong>"megabits per second."</strong> It measures how quickly
                information travels through your internet connection. Think of it like the speed
                limit on a road — the higher the number, the faster things can move. A speed of
                50 Mbps means your internet can move 50 million tiny pieces of data every second.
              </p>
            </div>

            <div
              className="rounded-xl p-5 sm:p-6 border border-[var(--border-color)]"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-3">
                Download vs. Upload Speed
              </h3>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                <strong>Download speed</strong> is how fast you <em>receive</em> things — loading
                websites, watching videos, getting emails. <strong>Upload speed</strong> is how fast
                you <em>send</em> things — sharing photos, making video calls, posting online.
                Download speed is usually faster and matters more for everyday use. Upload speed
                matters most during video calls.
              </p>
            </div>
          </div>
        </section>

        {/* Speed Guide by Activity */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6 text-center">
            Speed Guide by Activity
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-6 max-w-2xl mx-auto">
            Here is a quick reference for how much speed each activity needs. Remember, these
            are per person — if two people are streaming at the same time, double the number.
          </p>

          <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
            <table className="w-full text-left">
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <th className="px-4 sm:px-6 py-3 text-sm font-bold text-[var(--text-primary)] border-b border-[var(--border-color)]">
                    Activity
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-sm font-bold text-[var(--text-primary)] border-b border-[var(--border-color)]">
                    Speed Needed
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-sm font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] hidden sm:table-cell">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {speedGuideData.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[var(--border-color)] last:border-b-0"
                    style={{ backgroundColor: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-tertiary)' }}
                  >
                    <td className="px-4 sm:px-6 py-3 text-sm sm:text-base text-[var(--text-primary)] font-medium">
                      {row.activity}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-sm sm:text-base text-brand-blue font-semibold whitespace-nowrap">
                      {row.speed}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-sm text-[var(--text-muted)] hidden sm:table-cell">
                      {row.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-6 text-center">
            Common Questions About Internet Speed
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden group"
              >
                <summary className="flex items-center justify-between gap-3 p-4 sm:p-5 cursor-pointer hover:bg-[var(--bg-tertiary)] transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-semibold text-[var(--text-primary)] text-sm sm:text-base pr-2">
                    {item.question}
                  </span>
                  <svg
                    className="w-5 h-5 shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="mt-12 mb-8 p-6 sm:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
            Related Guides
          </h2>
          <p className="text-[var(--text-secondary)] mb-5">
            Learn more about choosing and saving on internet service:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/tools/internet-by-state"
              className="flex items-center gap-2 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-brand-blue hover:shadow-sm transition-all text-brand-blue font-medium text-sm sm:text-base"
            >
              <span aria-hidden="true">🗺️</span>
              Internet Plans by State
            </Link>
            <Link
              href="/blog/best-internet-plans-for-seniors-2026"
              className="flex items-center gap-2 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-brand-blue hover:shadow-sm transition-all text-brand-blue font-medium text-sm sm:text-base"
            >
              <span aria-hidden="true">💰</span>
              Best Internet Plans for Seniors 2026
            </Link>
            <Link
              href="/blog/how-to-connect-to-wifi"
              className="flex items-center gap-2 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-brand-blue hover:shadow-sm transition-all text-brand-blue font-medium text-sm sm:text-base sm:col-span-2 lg:col-span-1"
            >
              <span aria-hidden="true">📶</span>
              How to Connect to WiFi
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
