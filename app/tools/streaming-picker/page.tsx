import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import StreamingPicker from '@/components/StreamingPicker'

const PAGE_URL = `${SITE_URL}/tools/streaming-picker`

export const metadata: Metadata = {
  title: 'Streaming Service Picker Quiz — Find the Best Services & Save Money',
  description:
    'Answer 5 simple questions and find out which streaming services are right for you. See how much you can save vs cable TV. Free tool designed for seniors.',
  keywords: [
    'best streaming service for seniors',
    'streaming service picker',
    'streaming quiz',
    'which streaming service should I get',
    'replace cable with streaming',
    'streaming services comparison',
    'cord cutting for seniors',
    'best streaming services 2026',
    'save money on cable TV',
    'streaming vs cable',
    'Netflix vs Hulu vs YouTube TV',
    'free streaming services',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Streaming Service Picker — Find the Best Services for You',
    description:
      'Answer 5 simple questions and discover which streaming services match your viewing habits. See your savings vs cable TV.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Streaming Service Picker Quiz for Seniors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Streaming Service Picker — Find the Best Services for You',
    description: 'Answer 5 questions and find the right streaming services. See how much you can save vs cable.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'What is the cheapest way to replace cable TV?',
    answer:
      'The cheapest way is to use free services like Tubi and Pluto TV, which offer thousands of movies and shows at no cost. If you want some paid content, Netflix with ads ($6.99/month) or Peacock ($7.99/month) are excellent affordable options. Most people can replace cable for under $30/month.',
  },
  {
    question: 'Can I still watch local channels without cable?',
    answer:
      'Yes! YouTube TV ($72.99/month) and Hulu + Live TV ($76.99/month) both include all your local channels (ABC, CBS, NBC, FOX). For a cheaper option, you can buy a digital antenna ($20-$40 one-time cost) to get local channels for free over the air.',
  },
  {
    question: 'Do I need a special device for streaming?',
    answer:
      'Most Smart TVs made after 2018 have streaming apps built in. If your TV does not have apps, a Roku Streaming Stick ($29.99) or Amazon Fire TV Stick ($39.99) plugs into your TV and gives you access to every streaming service. You can also watch on a tablet or smartphone.',
  },
  {
    question: 'What if I want to watch live sports without cable?',
    answer:
      'YouTube TV is the best option for sports fans — it includes ESPN, local channels for NFL and NBA games, and has an unlimited DVR. Sling TV ($40/month) is a cheaper option that includes ESPN. Amazon Prime Video also streams Thursday Night Football and some other live sports.',
  },
  {
    question: 'Are there any free streaming services?',
    answer:
      'Yes! Tubi and Pluto TV are both completely free with no account required. They have thousands of movies and TV shows and are supported by ads (like regular TV). Pluto TV even has live channels that feel just like flipping through cable. Peacock also has a free tier with some content.',
  },
  {
    question: 'Can I try streaming services before I cancel cable?',
    answer:
      'Absolutely — that is the smart approach! Most streaming services offer free trials (usually 7 days). Sign up for the services recommended by our quiz, try them for a week while you still have cable, and see if they cover everything you watch. Then cancel cable with confidence.',
  },
]

export default function StreamingPickerPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Streaming Service Picker' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: 'Streaming Service Picker Quiz',
              description: 'A free interactive quiz that recommends the best streaming services based on your viewing habits, budget, and devices. Shows potential savings vs cable TV.',
              url: PAGE_URL,
              category: 'UtilitiesApplication',
            })
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Streaming Service Picker' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Streaming Service Picker Quiz
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Not sure which streaming services are right for you? Answer 5 simple questions and
          we&apos;ll recommend the best combination for your viewing habits and budget.{' '}
          <strong>See exactly how much you could save compared to cable TV.</strong>
        </p>
      </section>

      {/* Tool */}
      <section className="mb-12">
        <StreamingPicker />
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          How This Tool Works
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              step: '1',
              title: 'Tell Us What You Watch',
              desc: 'Share your viewing preferences, must-have channels, and monthly budget.',
            },
            {
              step: '2',
              title: 'Get Personalized Picks',
              desc: 'We match your needs against 13 streaming services to find the best combination.',
            },
            {
              step: '3',
              title: 'See Your Savings',
              desc: 'Compare your recommended bundle against your cable bill and see the annual savings.',
            },
          ].map(item => (
            <div
              key={item.step}
              className="rounded-xl border p-5 text-center"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-blue text-white font-bold text-lg mb-3">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Streaming Services Overview */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Streaming Services at a Glance
        </h2>
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--border-color)' }}>
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <th className="p-3 font-semibold" style={{ color: 'var(--text-primary)' }}>Service</th>
                <th className="p-3 font-semibold" style={{ color: 'var(--text-primary)' }}>Price</th>
                <th className="p-3 font-semibold" style={{ color: 'var(--text-primary)' }}>Best For</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Netflix', price: '$6.99-$22.99/mo', bestFor: 'Movies, TV shows, documentaries' },
                { name: 'Hulu', price: '$9.99-$17.99/mo', bestFor: 'Next-day TV shows' },
                { name: 'YouTube TV', price: '$72.99/mo', bestFor: 'Full cable replacement with sports' },
                { name: 'Amazon Prime Video', price: '$8.99/mo', bestFor: 'Movies + Amazon shoppers' },
                { name: 'Disney+', price: '$9.99-$15.99/mo', bestFor: 'Family movies, grandkids' },
                { name: 'Peacock', price: 'Free-$13.99/mo', bestFor: 'NBC shows, classic TV' },
                { name: 'Tubi', price: 'Free', bestFor: 'Free movies and shows' },
                { name: 'Pluto TV', price: 'Free', bestFor: 'Free live channels, classic TV' },
                { name: 'Sling TV', price: '$40-$55/mo', bestFor: 'Budget-friendly live TV' },
                { name: 'Frndly TV', price: '$7.99-$11.99/mo', bestFor: 'Hallmark Channel fans' },
                { name: 'Philo', price: '$28/mo', bestFor: 'Lifestyle channels without sports' },
              ].map((row, i) => (
                <tr key={i} className="border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <td className="p-3 font-medium" style={{ color: 'var(--text-primary)' }}>{row.name}</td>
                  <td className="p-3" style={{ color: 'var(--text-secondary)' }}>{row.price}</td>
                  <td className="p-3" style={{ color: 'var(--text-secondary)' }}>{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border overflow-hidden"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <summary
                className="cursor-pointer list-none p-5 text-lg font-semibold flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50"
                style={{ color: 'var(--text-primary)' }}
              >
                {faq.question}
                <span className="ml-2 text-brand-blue transition-transform group-open:rotate-180">▾</span>
              </summary>
              <div className="px-5 pb-5">
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Related */}
      <section
        className="rounded-xl border p-6"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <h2
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Related Guides
        </h2>
        <ul className="space-y-3">
          <li>
            <Link href="/tools/cord-cutting-calculator" className="text-brand-blue hover:underline font-medium">
              Cord-Cutting Savings Calculator →
            </Link>
          </li>
          <li>
            <Link href="/blog/complete-guide-to-cutting-the-cord" className="text-brand-blue hover:underline font-medium">
              Complete Guide to Cutting the Cord →
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-set-up-roku-for-seniors" className="text-brand-blue hover:underline font-medium">
              How to Set Up Roku for Seniors →
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-set-up-fire-stick-for-seniors" className="text-brand-blue hover:underline font-medium">
              How to Set Up Fire Stick for Seniors →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
