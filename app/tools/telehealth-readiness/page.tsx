import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import TelehealthChecker from '@/components/TelehealthChecker'

const PAGE_URL = `${SITE_URL}/tools/telehealth-readiness`

export const metadata: Metadata = {
  title: 'Telehealth Readiness Checker — Are You Ready for a Video Doctor Visit?',
  description:
    'Free step-by-step tool that checks if your device, internet, camera, and setup are ready for a telehealth video appointment. Designed for seniors.',
  keywords: [
    'telehealth readiness checker',
    'am I ready for telehealth',
    'video doctor visit setup',
    'telehealth for seniors',
    'telehealth device check',
    'video appointment preparation',
    'telehealth setup guide',
    'telemedicine readiness',
    'virtual doctor visit help',
    'telehealth camera check',
    'senior telehealth guide',
    'how to prepare for telehealth appointment',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Telehealth Readiness Checker — Free Tool for Seniors',
    description:
      'Check if your device, internet, and setup are ready for a video doctor appointment. Simple, free, and designed for seniors.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Telehealth Readiness Checker')}`,
        width: 1200,
        height: 630,
        alt: 'Telehealth Readiness Checker Tool for Seniors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telehealth Readiness Checker — Free Tool for Seniors',
    description: 'Check if you are ready for a video doctor appointment. Free and designed for seniors.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'What is telehealth?',
    answer:
      'Telehealth is a way to visit your doctor using a video call on your phone, tablet, or computer. Instead of going to the office, you talk to your doctor face-to-face through your screen. It is covered by most insurance plans including Medicare.',
  },
  {
    question: 'What do I need for a telehealth appointment?',
    answer:
      'You need a device with a camera and microphone (most phones, tablets, and laptops have these built in), a stable internet connection (WiFi is best), and an account on your doctor\'s telehealth platform. Our readiness checker above will tell you exactly what you need.',
  },
  {
    question: 'Is telehealth safe and private?',
    answer:
      'Yes. Telehealth platforms used by doctors are required to follow HIPAA privacy laws, the same laws that protect your information at the doctor\'s office. Your video call is encrypted, meaning no one else can listen in.',
  },
  {
    question: 'Does Medicare cover telehealth visits?',
    answer:
      'Yes. Medicare covers many types of telehealth visits including regular check-ups, mental health appointments, and specialist consultations. The cost is usually the same as an in-person visit. Check with your plan for specific coverage details.',
  },
  {
    question: 'What if I have trouble during my telehealth appointment?',
    answer:
      'If your video freezes or you lose connection, try closing the app and reopening it. If that does not work, call your doctor\'s office — they can usually continue the appointment by phone. It helps to have their phone number written down before the appointment starts.',
  },
  {
    question: 'Can I have someone with me during a telehealth visit?',
    answer:
      'Absolutely! Having a family member or caregiver sit with you during your telehealth visit is perfectly fine and often encouraged. They can help with technology, take notes, or help you remember questions to ask your doctor.',
  },
]

export default function TelehealthReadinessPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Telehealth Readiness Checker' },
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
              name: 'Telehealth Readiness Checker',
              description:
                'A free step-by-step tool that checks if your device, internet connection, camera, and telehealth platform are ready for a video doctor appointment.',
              url: PAGE_URL,
              category: 'HealthApplication',
            })
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Telehealth Readiness Checker' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Telehealth Readiness Checker
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Wondering if you are ready for a video doctor appointment? Answer a few simple questions and
          we will check your device, internet, camera, and setup. If anything needs fixing, we will show
          you exactly what to do — step by step.
        </p>
      </section>

      {/* Tool */}
      <section className="mb-12">
        <TelehealthChecker />
      </section>

      {/* How Telehealth Works */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          How a Telehealth Visit Works
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              step: '1',
              title: 'Schedule Your Appointment',
              desc: 'Call your doctor or use their patient portal to book a telehealth visit. They will send you a link or instructions.',
            },
            {
              step: '2',
              title: 'Set Up Your Space',
              desc: 'Find a quiet, well-lit room. Sit facing a window or lamp so your doctor can see you clearly.',
            },
            {
              step: '3',
              title: 'Join the Video Call',
              desc: 'Click the link your doctor sent, or open the app and log in. Join 10 minutes early to test everything.',
            },
            {
              step: '4',
              title: 'Talk to Your Doctor',
              desc: 'Discuss your health just like an in-person visit. Have your medication list and questions ready.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border p-5"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue text-white font-bold text-sm shrink-0">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
              </div>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
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
                  &#9662;
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
          Related Guides
        </h2>
        <ul className="space-y-3">
          <li>
            <Link href="/blog/telehealth-guide-for-seniors" className="text-brand-blue hover:underline font-medium">
              Complete Telehealth Guide for Seniors →
            </Link>
          </li>
          <li>
            <Link href="/blog/best-video-calling-apps-for-seniors" className="text-brand-blue hover:underline font-medium">
              Best Video Calling Apps for Seniors →
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-use-medicare-portal-online" className="text-brand-blue hover:underline font-medium">
              How to Use Your Medicare Portal Online →
            </Link>
          </li>
          <li>
            <Link href="/tools/wifi-troubleshooter" className="text-brand-blue hover:underline font-medium">
              WiFi Troubleshooter Tool →
            </Link>
          </li>
          <li>
            <Link href="/category/health-wellness" className="text-brand-blue hover:underline font-medium">
              Browse All Health & Wellness Articles →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
