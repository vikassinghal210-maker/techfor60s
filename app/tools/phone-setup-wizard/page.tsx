import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import PhoneSetupWizard from '@/components/PhoneSetupWizard'

const PAGE_URL = `${SITE_URL}/tools/phone-setup-wizard`

export const metadata: Metadata = {
  title: 'Phone Setup Wizard — Make Any Phone Easier to Use for Seniors',
  description:
    'Free personalized phone accessibility guide. Answer 4 simple questions and get step-by-step settings to make any iPhone, iPad, Samsung, or Android phone easier to see, hear, and use.',
  keywords: [
    'phone setup for seniors',
    'make phone easier to use',
    'phone accessibility settings',
    'iphone accessibility for elderly',
    'samsung easy mode',
    'make text bigger on phone',
    'phone settings for arthritis',
    'phone settings for low vision',
    'set up phone for elderly parent',
    'senior phone setup guide',
    'assistive touch iphone',
    'android accessibility settings',
    'make phone louder for hearing loss',
    'simplify phone for seniors',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Phone Setup Wizard — Make Any Phone Easier to Use',
    description:
      'Get a personalized step-by-step guide to make any phone easier to see, hear, and tap. Free tool designed for seniors and their families.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Phone Setup Wizard for Seniors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phone Setup Wizard — Make Any Phone Easier to Use',
    description: 'Get a personalized guide to make any phone easier to see, hear, and tap.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'What phones does this setup wizard support?',
    answer:
      'Our wizard provides specific instructions for iPhone, iPad, Samsung Galaxy, and Google Pixel devices. We also include general Android settings that work on most other Android phones. If you are not sure what phone you have, select "Not sure" and we will show settings for both iPhone and Android.',
  },
  {
    question: 'Will changing these settings break my phone?',
    answer:
      'No, none of these changes are permanent. Every setting can be turned off the same way you turned it on. If you do not like a change, just go back to that setting and switch it off. Your phone will not be harmed in any way.',
  },
  {
    question: 'Can I use this tool if I am setting up someone else\'s phone?',
    answer:
      'Yes! In fact, that is one of the most common uses. In step 4, select whether you are helping a parent, grandparent, spouse, or client. The guide will be written so you can follow along together or even email it to a family member to set up later.',
  },
  {
    question: 'How do I share this guide with a family member?',
    answer:
      'After completing the wizard, click the "Copy Guide to Clipboard" button. This copies a plain-text version of all the settings. You can then paste it into an email, text message, or note to share with anyone who needs it. You can also use the "Print This Guide" button to create a paper copy.',
  },
  {
    question: 'What is Assistive Access on iPhone?',
    answer:
      'Assistive Access is a feature introduced in iOS 17 that completely simplifies the iPhone interface. It replaces the regular home screen with very large buttons for Phone, Messages, Camera, and a few chosen apps. It is ideal for people with cognitive challenges or anyone who finds the regular iPhone interface too complicated.',
  },
  {
    question: 'What is Easy Mode on Samsung phones?',
    answer:
      'Easy Mode is a Samsung feature that simplifies the home screen with larger icons, bigger text, and a simpler layout. It keeps all the phone\'s features but makes them much easier to find and use. You can turn it on in Settings > Display > Easy mode.',
  },
]

export default function PhoneSetupWizardPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Phone Setup Wizard' },
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
              name: 'Phone Setup Wizard',
              description: 'A free interactive tool that generates personalized phone accessibility settings based on your device, conditions, and needs. Supports iPhone, iPad, Samsung, Google Pixel, and other Android devices.',
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
          { label: 'Phone Setup Wizard' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Phone Setup Wizard
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Answer 4 simple questions and get a <strong>personalized step-by-step guide</strong> to make
          any phone or tablet easier to see, hear, and use. Works for iPhones, iPads, Samsung Galaxy,
          Google Pixel, and other Android devices.
        </p>
      </section>

      {/* Tool */}
      <section className="mb-12">
        <PhoneSetupWizard />
      </section>

      {/* Why Accessibility Settings Matter */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Why These Settings Matter
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Easier to See',
              desc: 'Larger text, bolder fonts, and higher contrast make reading comfortable without squinting or reaching for reading glasses.',
            },
            {
              title: 'Easier to Hear',
              desc: 'Sound amplification, live captions, and flash alerts ensure you never miss a call, message, or important notification.',
            },
            {
              title: 'Easier to Tap',
              desc: 'Touch accommodations and assistive menus mean you do not need precise finger movements to use your phone.',
            },
            {
              title: 'Simpler to Navigate',
              desc: 'Easy Mode and Assistive Access strip away complexity, leaving just the apps and features you actually use.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border p-5"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
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
                <span className="ml-2 text-brand-blue transition-transform group-open:rotate-180">&#x25BE;</span>
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
          Related Guides & Tools
        </h2>
        <ul className="space-y-3">
          <li>
            <Link href="/accessibility" className="text-brand-blue hover:underline font-medium">
              Complete Phone Accessibility Guide →
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-make-text-bigger-on-phone" className="text-brand-blue hover:underline font-medium">
              How to Make Text Bigger on Any Phone →
            </Link>
          </li>
          <li>
            <Link href="/blog/setting-up-iphone-for-elderly-parent" className="text-brand-blue hover:underline font-medium">
              Setting Up an iPhone for an Elderly Parent →
            </Link>
          </li>
          <li>
            <Link href="/tools/device-quiz" className="text-brand-blue hover:underline font-medium">
              Which Device Should I Buy? Quiz →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
