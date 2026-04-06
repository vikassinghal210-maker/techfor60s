import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import VoiceScamSimulator from '@/components/VoiceScamSimulator'

const PAGE_URL = `${SITE_URL}/tools/voice-scam-simulator`

export const metadata: Metadata = {
  title: 'AI Voice Clone Scam Quiz — Can You Spot the Fake Call?',
  description:
    'Test your ability to spot AI voice cloning scams with this free interactive quiz. 8 realistic scenarios, instant feedback, and a family safe word generator. Designed for seniors.',
  keywords: [
    'ai voice scam quiz',
    'voice cloning scam test',
    'grandparent scam simulator',
    'ai voice clone scam',
    'phone scam quiz for seniors',
    'voice cloning awareness',
    'spot a scam call',
    'grandparent scam awareness',
    'ai scam detection quiz',
    'elder fraud prevention',
    'family safe word',
    'voice scam red flags',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'AI Voice Clone Scam Quiz — Can You Spot the Fake Call?',
    description:
      'Test your ability to spot AI voice cloning scams. 8 realistic scenarios with instant feedback and a family safe word generator.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('AI Voice Clone Scam Quiz')}`,
        width: 1200,
        height: 630,
        alt: 'AI Voice Clone Scam Quiz for Seniors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Voice Clone Scam Quiz — Can You Spot the Fake Call?',
    description:
      'Test your ability to spot AI voice cloning scams. 8 realistic scenarios with instant feedback.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'What is AI voice cloning and how do scammers use it?',
    answer:
      'AI voice cloning uses artificial intelligence to create a near-perfect copy of someone\'s voice from just a few seconds of audio. Scammers find voice samples from social media videos, voicemail greetings, or phone calls, then use AI tools to generate realistic fake calls pretending to be your loved ones asking for money.',
  },
  {
    question: 'How much audio does AI need to clone a voice?',
    answer:
      'Modern AI voice cloning tools can create a convincing voice clone from as little as 3 seconds of audio. This means a short social media video, a voicemail greeting, or even a brief phone conversation can give scammers enough material to clone your voice or a family member\'s voice.',
  },
  {
    question: 'What is a family safe word and how does it protect against voice scams?',
    answer:
      'A family safe word is a secret word or phrase that only your family members know. When someone calls claiming to be a relative in an emergency, you ask them for the safe word. Since scammers — even with cloned voices — will not know this word, it is a simple and effective way to verify the caller\'s identity.',
  },
  {
    question: 'What should I do if I receive a suspicious call from a "family member"?',
    answer:
      'Hang up immediately and call the family member directly using the phone number you have saved for them — not any number the caller gave you. Ask for your family safe word. Contact other family members to verify the story. Never send money, gift cards, or share financial information based on an urgent phone call.',
  },
  {
    question: 'How much money do seniors lose to phone scams each year?',
    answer:
      'According to the FBI\'s Internet Crime Complaint Center, adults over 60 lost $4.89 billion to fraud in 2024, with phone-based scams including AI voice cloning being one of the fastest-growing categories. The grandparent scam alone accounts for hundreds of millions in losses annually.',
  },
]

export default function VoiceScamSimulatorPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Voice Scam Simulator' },
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
              name: 'AI Voice Clone Scam Quiz',
              description:
                'An interactive quiz that tests your ability to identify AI voice cloning scams through 8 realistic phone call scenarios with instant educational feedback.',
              url: PAGE_URL,
              category: 'SecurityApplication',
            })
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Voice Scam Simulator' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          AI Voice Clone Scam Quiz
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Scammers can now clone anyone&apos;s voice using just 3 seconds of audio. They use this
          technology to impersonate your grandchildren, your bank, and even government agencies.{' '}
          <strong>Can you tell the difference between a real call and a scam?</strong> Take this
          quiz to find out and learn the warning signs that could save you thousands.
        </p>
      </section>

      {/* Tool */}
      <section className="mb-12">
        <VoiceScamSimulator />
      </section>

      {/* How AI Voice Cloning Works */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          How AI Voice Cloning Works
        </h2>
        <div className="space-y-4">
          {[
            {
              step: '1',
              title: 'Scammers Find Voice Samples',
              desc: 'They search social media, YouTube, TikTok, and even voicemail greetings for recordings of your loved ones. Just a few seconds of audio is enough.',
            },
            {
              step: '2',
              title: 'AI Creates a Voice Clone',
              desc: 'Using freely available AI tools, they feed the audio into software that learns the person\'s voice patterns, tone, and speech habits in minutes.',
            },
            {
              step: '3',
              title: 'They Call You With the Fake Voice',
              desc: 'The scammer calls you using the cloned voice, often with a spoofed caller ID. They create an urgent emergency to make you act before you can think clearly.',
            },
            {
              step: '4',
              title: 'They Pressure You to Send Money',
              desc: 'Under time pressure, they ask you to wire money, buy gift cards, or send cryptocurrency. These payment methods are nearly impossible to trace or recover.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-4 rounded-xl border p-5"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-blue text-white font-bold text-lg shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Protection Tips */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          5 Ways to Protect Yourself
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Create a Family Safe Word',
              desc: 'Choose a secret word or phrase that only your family knows. Anyone calling about an emergency must say it first.',
            },
            {
              title: 'Always Hang Up and Call Back',
              desc: 'If you receive an urgent call, hang up and dial your family member directly using the number saved in your phone.',
            },
            {
              title: 'Never Send Money Under Pressure',
              desc: 'No legitimate situation requires you to immediately send gift cards, wire money, or use cryptocurrency.',
            },
            {
              title: 'Limit Voice Samples Online',
              desc: 'Set social media profiles to private. Be cautious about posting videos or voice recordings publicly.',
            },
            {
              title: 'Report Scam Attempts',
              desc: 'Report scams to the FTC at reportfraud.ftc.gov and your local police. This helps protect others too.',
            },
          ].map((tip) => (
            <div
              key={tip.title}
              className="rounded-xl border p-5"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {tip.title}
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {tip.desc}
              </p>
            </div>
          ))}
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
                <span className="ml-2 text-brand-blue transition-transform group-open:rotate-180">
                  ▾
                </span>
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
          Related Safety Tools & Guides
        </h2>
        <ul className="space-y-3">
          <li>
            <Link
              href="/tools/scam-checker"
              className="text-brand-blue hover:underline font-medium"
            >
              Is This a Scam? Message Checker Tool →
            </Link>
          </li>
          <li>
            <Link
              href="/category/safety-security"
              className="text-brand-blue hover:underline font-medium"
            >
              Browse All Safety & Security Articles →
            </Link>
          </li>
          <li>
            <Link
              href="/how-to/enable-two-factor-auth/iphone-generic"
              className="text-brand-blue hover:underline font-medium"
            >
              How to Enable Two-Factor Authentication →
            </Link>
          </li>
          <li>
            <Link
              href="/how-to/block-phone-number/iphone-generic"
              className="text-brand-blue hover:underline font-medium"
            >
              How to Block Unwanted Phone Numbers →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
