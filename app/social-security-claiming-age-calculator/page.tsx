import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import SSClaimCalculatorClient from './calculator'

const PAGE_URL = `${SITE_URL}/social-security-claiming-age-calculator`

export const metadata: Metadata = {
  title: 'Social Security Claiming Age Calculator — Compare 62, FRA & 70',
  description:
    'Free Social Security claiming-age calculator for US seniors. Compare monthly and lifetime benefits at ages 62, 66, 67 (FRA), and 70 using official SSA reduction and delayed-credit formulas. See your break-even age.',
  keywords: [
    'social security claiming age calculator',
    'when to claim social security',
    'social security break even calculator',
    'claim at 62 vs 67 vs 70',
    'social security full retirement age calculator',
    'primary insurance amount',
    'delayed retirement credits',
    'social security for seniors',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Social Security Claiming Age Calculator — 62 vs FRA vs 70',
    description:
      'Enter your birth year, Full-Retirement-Age benefit (PIA), and life-expectancy assumption. See side-by-side monthly and lifetime benefits plus your break-even age.',
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=Social+Security+Claiming+Age+Calculator&category=Money+%26+Retirement`,
        width: 1200,
        height: 630,
        alt: 'Social Security Claiming Age Calculator — TechFor60s',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Security Claiming Age Calculator — 62 vs FRA vs 70',
    description:
      'Compare monthly and lifetime Social Security benefits by claim age, using official SSA formulas.',
    site: '@TechFor60s',
  },
  alternates: { canonical: PAGE_URL },
}

const faqItems = [
  {
    question: 'What is Full Retirement Age (FRA)?',
    answer:
      'FRA is the age at which you get 100% of your calculated Social Security benefit, known as your Primary Insurance Amount (PIA). For anyone born in 1960 or later, FRA is 67. For those born 1943–1954 it was 66, and it slides up two months per birth year in between.',
  },
  {
    question: 'How much less do I get if I claim at 62?',
    answer:
      'If your FRA is 67, claiming at 62 reduces your monthly benefit by exactly 30%. You will receive 70% of your PIA for life. If your FRA is 66, the reduction at 62 is 25%. Social Security uses 5/9 of 1% per month for the first 36 months early and 5/12 of 1% for each additional month.',
  },
  {
    question: 'How much more do I get if I wait until 70?',
    answer:
      'Each month you delay past FRA earns a delayed retirement credit of 2/3 of 1% — that is 8% per year. If your FRA is 67, waiting to 70 boosts your benefit by 24% (three years × 8%). There is no additional credit for waiting past 70, so 70 is the latest you should claim.',
  },
  {
    question: 'What is the break-even age?',
    answer:
      'The break-even age is the point where the total money you have received from claiming late equals what you would have received from claiming early. Most people with an FRA of 67 break even around age 82–83 when comparing 62 vs 70. If you expect to live past that age, delaying pays more in total.',
  },
  {
    question: 'Is this calculator official?',
    answer:
      'No. This is an informational estimator built for educational use. It applies SSA&rsquo;s official reduction and delayed-credit formulas to the numbers you enter. It does not include cost-of-living adjustments, taxes, spousal or survivor benefits, Medicare premiums, or working while collecting. For an official estimate based on your actual earnings record, log in at SSA.gov/myaccount.',
  },
]

export default function SSClaimCalculatorPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Social Security Claiming Age Calculator' },
  ]

  const related = [
    {
      href: '/blog/social-security-claim-timing-62-67-70-2026',
      title: 'Social Security: Claim at 62, 67, or 70? — 2026 Timing Guide',
    },
    {
      href: '/blog/medicare-annual-notice-of-change-2026-walkthrough',
      title: 'Medicare Annual Notice of Change — 2026 Walkthrough',
    },
    {
      href: '/blog/mymedicare-gov-account-setup-2026',
      title: 'Setting Up Your MyMedicare.gov Account — 2026 Guide',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
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
              name: 'Social Security Claiming Age Calculator',
              description:
                'Free Social Security claiming-age calculator. Enter birth year, Primary Insurance Amount, and life expectancy to compare monthly and cumulative benefits at ages 62, 66, 67 (FRA), and 70, with a break-even analysis.',
              url: PAGE_URL,
              category: 'FinanceApplication',
            })
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Social Security Claiming Age Calculator' },
        ]}
      />

      {/* Hero */}
      <header className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Social Security Claiming Age Calculator
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          The single biggest retirement decision for most Americans is <em>when</em> to start taking Social Security.
          Claiming at 62 gives you money sooner — but forever-smaller cheques. Waiting to 70 means bigger cheques — if
          you live long enough. Enter three simple numbers below to see both sides, side by side.
        </p>
      </header>

      {/* Tool */}
      <section className="mb-14">
        <SSClaimCalculatorClient />
      </section>

      {/* Explainer — ~400 words */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          How Social Security claim age really works
        </h2>

        <div className="space-y-5 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <p>
            Your monthly Social Security cheque is built from one core number: your{' '}
            <strong>Primary Insurance Amount (PIA)</strong>. PIA is what you get if you start benefits exactly at your{' '}
            <strong>Full Retirement Age (FRA)</strong>. For everyone born in 1960 or later, FRA is 67. Earlier
            generations had FRA anywhere from 65 (born 1937) to 66 and 10 months (born 1959). You can look up your PIA
            at{' '}
            <a
              href="https://www.ssa.gov/myaccount/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue underline"
            >
              SSA.gov/myaccount
            </a>{' '}
            — it is listed as your &ldquo;full retirement age benefit&rdquo;.
          </p>

          <p>
            <strong>Claim early (as young as 62) and your cheque shrinks, permanently.</strong> Social Security reduces
            your benefit by 5/9 of 1% for each of the first 36 months you claim before FRA, and 5/12 of 1% for every
            month beyond that. For an FRA of 67, claiming at 62 means 60 months early — that is a 30% cut. You would
            get 70% of your PIA for life, not just until you hit 67.
          </p>

          <p>
            <strong>Claim late (up to 70) and your cheque grows.</strong> For every month you wait past FRA, Social
            Security adds a <em>delayed retirement credit</em> of 2/3 of 1% — that is 8% per year. If your FRA is 67
            and you wait until 70, you get 124% of your PIA for the rest of your life. After 70 there is no further
            increase, which is why 70 is the latest anyone should claim.
          </p>

          <p>
            The million-dollar question is the <strong>break-even age</strong>: the point at which total money
            received from delaying catches up with the money you&rsquo;d have banked by claiming sooner. For most
            people with an FRA of 67, the break-even between claiming at 62 and claiming at 70 lands around
            age 82–83. Live longer than that and delaying wins. Die sooner and claiming earlier wins — which is why
            health history and family longevity matter so much for this decision.
          </p>

          <p>
            A few things this calculator does <em>not</em> factor in: cost-of-living adjustments (COLA), federal taxes
            on benefits, Medicare Part B premiums that come out of your cheque, spousal and survivor strategies, and
            the earnings test if you are still working before FRA. Those can swing the answer by thousands of dollars.
            Use this tool to get the shape of the decision, then run your own numbers with a financial advisor before
            filing.
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
          Related retirement guides
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
