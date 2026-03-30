import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import WebsiteSafetyChecker from '@/components/WebsiteSafetyChecker'

const PAGE_URL = `${SITE_URL}/tools/is-this-website-safe`

export const metadata: Metadata = {
  title: 'Is This Website Safe? — Free Website Safety Checker for Seniors',
  description:
    'Paste any website address and our free tool will check it for common scam and phishing warning signs. Designed for seniors — simple, clear, and easy to use. Your data stays completely private.',
  keywords: [
    'is this website safe',
    'website safety checker',
    'check if website is safe',
    'is this link safe',
    'website scam checker',
    'url checker',
    'safe browsing check',
    'website legitimacy checker',
    'phishing website checker',
    'is this site safe to use',
    'website safety checker for seniors',
    'how to tell if a website is safe',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Is This Website Safe? — Free Website Safety Checker',
    description:
      'Paste any website address and instantly check it for scam and phishing warning signs. Free, private, and designed for seniors.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Is This Website Safe? — Free Safety Checker')}`,
        width: 1200,
        height: 630,
        alt: 'Website Safety Checker Tool for Seniors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is This Website Safe? — Free Website Safety Checker',
    description: 'Paste any website address and instantly check for scam and phishing warning signs.',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'How does the website safety checker work?',
    answer:
      'Our tool analyzes the URL you enter for common warning signs — such as missing HTTPS encryption, suspicious domain extensions, typosquatting (fake copycat domains), phishing keywords, and look-alike character tricks. Everything runs in your browser, so the URL you enter is never sent to any server.',
  },
  {
    question: 'Is my information private when I use this tool?',
    answer:
      'Yes, completely. The website safety checker runs entirely in your web browser. The URL you enter never leaves your device — we never see, store, or share anything you type.',
  },
  {
    question: 'Can this tool catch every dangerous website?',
    answer:
      'No tool can catch every threat. Our checker identifies the most common warning signs in URLs, but sophisticated scammers constantly change their tactics. Always trust your instincts — if something feels wrong, close the website and ask a family member or friend for help.',
  },
  {
    question: 'What should I do if I already entered my information on a suspicious website?',
    answer:
      'Don\'t panic. Change your passwords immediately on any affected accounts. Contact your bank if you shared financial information such as credit card numbers or bank account details. Place a fraud alert on your credit by calling one of the three credit bureaus (Equifax, Experian, or TransUnion). You can also report the website at reportfraud.ftc.gov.',
  },
  {
    question: 'What does HTTPS mean and why does it matter?',
    answer:
      'HTTPS stands for "HyperText Transfer Protocol Secure." When a website address starts with https://, it means the connection between your browser and the website is encrypted — making it much harder for criminals to intercept your information. Look for the padlock icon next to the website address in your browser.',
  },
  {
    question: 'What is typosquatting?',
    answer:
      'Typosquatting is when scammers create a website with an address that looks almost identical to a real website — but with a small typo. For example, "amaz0n.com" (with a zero) instead of "amazon.com," or "paypa1.com" (with a number one) instead of "paypal.com." Always double-check the spelling of website addresses.',
  },
]

export default function WebsiteSafetyCheckerPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Website Safety Checker' },
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

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Website Safety Checker' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Is This Website Safe?
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Not sure if a website is safe to visit? Paste the web address (URL) below and we&apos;ll check it for
          common scam and phishing warning signs. <strong>Your information stays completely private</strong> — it
          never leaves your device.
        </p>
      </section>

      {/* Tool */}
      <section className="mb-12">
        <WebsiteSafetyChecker />
      </section>

      {/* Safety Tips */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Common Signs of Unsafe Websites
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'No HTTPS / Padlock',
              desc: 'If the website address starts with http:// instead of https://, your connection is not encrypted. Never enter passwords or credit card numbers on these sites.',
            },
            {
              title: 'Misspelled Domain Names',
              desc: 'Scammers create fake websites with addresses that look almost identical to real ones — like "g00gle.com" with zeros instead of the letter O.',
            },
            {
              title: 'Unusual Domain Extensions',
              desc: 'Be cautious with uncommon domain extensions like .xyz, .top, .click, or .buzz. While not always dangerous, scammers use these because they are cheap to register.',
            },
            {
              title: 'Very Long URLs',
              desc: 'Extremely long website addresses with many random characters are often used to hide the true destination of a link.',
            },
            {
              title: 'IP Addresses Instead of Names',
              desc: 'A legitimate website uses a proper name like "amazon.com." If the address is just numbers (like 192.168.1.1), be very cautious.',
            },
            {
              title: 'Urgent Pop-ups and Warnings',
              desc: 'Fake websites often show alarming pop-ups claiming your computer has a virus or your account has been compromised to trick you into calling a fake support number.',
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
          Related Safety Guides
        </h2>
        <ul className="space-y-3">
          <li>
            <Link href="/blog/how-to-tell-if-a-website-is-safe" className="text-brand-blue hover:underline font-medium">
              How to Tell If a Website Is Safe →
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-spot-scam-emails" className="text-brand-blue hover:underline font-medium">
              How to Spot Scam Emails →
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-shop-online-safely" className="text-brand-blue hover:underline font-medium">
              How to Shop Online Safely →
            </Link>
          </li>
          <li>
            <Link href="/tools/scam-checker" className="text-brand-blue hover:underline font-medium">
              Is This a Scam? — Message Checker Tool →
            </Link>
          </li>
          <li>
            <Link href="/category/safety-security" className="text-brand-blue hover:underline font-medium">
              Browse All Safety & Security Articles →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
