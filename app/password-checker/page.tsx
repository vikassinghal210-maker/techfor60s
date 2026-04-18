import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import PasswordCheckerClient from './checker'

const PAGE_URL = `${SITE_URL}/password-checker`

export const metadata: Metadata = {
  title: 'Password Strength Checker & Passphrase Generator — Free & Private',
  description:
    'Check your password strength instantly and get a senior-friendly passphrase you can actually remember. Nothing leaves your browser — we never see, save, or send what you type.',
  keywords: [
    'password strength checker',
    'is my password strong',
    'password checker',
    'strong password generator',
    'passphrase generator',
    'easy to remember password',
    'senior password safety',
    'password tester',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Password Strength Checker & Passphrase Generator',
    description:
      'Instant password strength check plus a senior-friendly passphrase generator. Your password never leaves this page.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=Password+Checker&category=Safety+%26+Security`,
        width: 1200,
        height: 630,
        alt: 'Password Checker — TechFor60s',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Strength Checker & Passphrase Generator',
    description:
      'Instant password strength check plus a senior-friendly passphrase generator. Runs entirely in your browser.',
    site: '@TechFor60s',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'Is it safe to type my password here?',
    answer:
      'Yes. The checker runs entirely inside your web browser. We do not send your password to any server, and nothing is stored or saved. As a matter of habit, though, we recommend typing a dummy version of your password — not the exact one you use for banking — just to test the pattern.',
  },
  {
    question: 'What makes a password strong?',
    answer:
      'Three things: length (12 characters or more), variety (mix of upper case, lower case, numbers, and symbols), and unpredictability (not a dictionary word, not a birthday, not one of the top 100 most-used passwords). The single biggest factor is length — a 16-character passphrase beats a short clever one every time.',
  },
  {
    question: 'Why do you suggest four-word passphrases instead of random gibberish?',
    answer:
      'A passphrase like "Maple-Harbor-Ginger-Robin-72" is both strong and something a human can actually remember. Random gibberish looks safe but people write it on sticky notes, which defeats the purpose. Length plus memorability wins.',
  },
  {
    question: 'How often should I change my passwords?',
    answer:
      'Modern security guidance (from NIST and others) says you do not need to change strong, unique passwords on a schedule. Change a password only when there is a reason: the site was breached, you shared it with someone, or it was weak to begin with. The most important habit is using a different password for every site.',
  },
  {
    question: 'Do I need a password manager?',
    answer:
      'Strongly recommended. A password manager (like 1Password, Bitwarden, or the one built into your iPhone or Android) remembers every password for you, so you only need to remember one strong passphrase. It also warns you if a site you use has been breached.',
  },
]

export default function PasswordCheckerPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Password Checker' },
  ]

  const related = [
    {
      href: '/blog/2fa-passkeys-seniors-which-to-use-2026',
      title: '2FA vs Passkeys for Seniors — Which One to Use in 2026',
    },
    {
      href: '/blog/end-to-end-encryption-3-sentences-seniors',
      title: 'End-to-End Encryption Explained in 3 Sentences',
    },
    {
      href: '/blog/irs-impersonation-scam-how-to-spot-2026',
      title: 'IRS Impersonation Scams in 2026 — How to Spot Them',
    },
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
              name: 'Password Strength Checker & Passphrase Generator',
              description:
                'Private, browser-based password strength checker with plain-English weaknesses and a senior-friendly passphrase generator.',
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
          { label: 'Password Checker' },
        ]}
      />

      {/* Hero */}
      <header className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Password Strength Checker
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Type a password below to see how strong it really is — in plain English. We will also suggest a
          senior-friendly passphrase you can actually remember. Everything runs inside your browser. Your password
          never leaves this page.
        </p>
      </header>

      {/* Tool */}
      <section className="mb-14">
        <PasswordCheckerClient />
      </section>

      {/* Explainer — ~400 words */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Why password strength matters (and what actually works)
        </h2>

        <div className="space-y-5 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <p>
            When hackers break into a website, they often walk away with millions of password hashes. Then they feed
            those hashes into a fast computer and start guessing — starting with the 100 most common passwords, then
            dictionary words, then dictionary words with &ldquo;123&rdquo; on the end. A weak password falls in
            seconds. A strong one takes longer than the age of the universe.
          </p>

          <p>
            There are only three things that make a password strong. The first is <strong>length</strong>: each extra
            character multiplies the time to guess. A 16-character password is not twice as safe as an
            8-character one — it is billions of times safer. The second is <strong>variety</strong> — mixing upper
            case, lower case, numbers, and symbols grows the pool of possibilities. The third is{' '}
            <strong>unpredictability</strong>: if your password is a dictionary word, a name, or a birth year, the
            attacker&rsquo;s software will find it before moving on to truly random guesses.
          </p>

          <p>
            That is why we recommend <strong>passphrases</strong> for seniors over random gibberish.{' '}
            &ldquo;Maple-Harbor-Ginger-Robin-72&rdquo; is 26 characters, mixes letters, a symbol, and numbers, and — most
            importantly — you can actually remember it. Random passwords like &ldquo;xF!9qLm#2vZ&rdquo; look safe, but
            people end up writing them on sticky notes, typing them wrong, and resetting them constantly. A memorable
            passphrase is far safer in real life.
          </p>

          <p>
            The biggest mistake is <strong>reusing the same password on multiple sites</strong>. When one site is
            breached, attackers try the same password on your email, your bank, and Amazon. Every site should have its
            own password. That sounds impossible to remember, which is why most security experts now recommend a{' '}
            <strong>password manager</strong> — software that remembers every password for you. Your iPhone and Android
            phone already have one built in, and apps like 1Password and Bitwarden are free or very cheap. You
            remember one strong passphrase, and it takes care of the rest.
          </p>

          <p>
            Finally, wherever it is offered, turn on <strong>two-factor authentication</strong> (2FA) or a{' '}
            <strong>passkey</strong>. Even a perfect password is no match for a scammer who tricks you on the phone.
            2FA adds a second check so a stolen password alone is not enough.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border overflow-hidden"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
            >
              <summary
                className="cursor-pointer list-none p-5 text-lg font-semibold flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50"
                style={{ color: 'var(--text-primary)' }}
              >
                <span>{faq.question}</span>
                <span className="ml-3 text-brand-blue transition-transform group-open:rotate-180" aria-hidden>
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
          Related guides
        </h2>
        <ul className="space-y-3">
          {related.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-brand-blue hover:underline font-medium text-lg">
                {item.title} →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
