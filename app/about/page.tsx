import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { organizationJsonLd, breadcrumbJsonLd, aboutPageJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: `About ${SITE_NAME} — Tech Guides for Adults Over 60`,
  description: `${SITE_NAME} helps adults over 60 learn technology with simple, jargon-free guides written and tested by real people. Our mission is to make tech accessible for everyone.`,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/about`,
    title: `About ${SITE_NAME} — Tech Guides for Adults Over 60`,
    description: `Simple, jargon-free technology guides for adults over 60. Learn smartphones, tablets, apps, and online safety at your own pace.`,
    siteName: SITE_NAME,
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'About' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd()) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-6">
          About {SITE_NAME}
        </h1>

        <div className="prose prose-lg max-w-none">
          <p>
            Welcome to <strong>{SITE_NAME}</strong> — a website built specifically for adults
            over 60 who want to learn technology without the confusion, jargon, or pressure.
          </p>

          <h2>Our Mission</h2>
          <p>
            Technology should make life easier, not harder. We believe that age should never be
            a barrier to using a smartphone, making a video call to your grandchildren, or
            staying safe online.
          </p>
          <p>
            Every guide on this site is written in plain English, with clear step-by-step
            instructions and real screenshots. We personally test every tip and tool we recommend
            before publishing — if it is confusing, we rewrite it until it is not.
          </p>

          <h2>Who Writes Our Guides</h2>
          <p>
            Our content team includes tech educators, consumer technology journalists, and
            accessibility specialists who focus exclusively on making technology approachable
            for older adults. Our writers have backgrounds in adult education, digital literacy
            training, and senior care technology.
          </p>
          <p>
            Every guide is reviewed by at least two team members before publication — one for
            technical accuracy and one for clarity and readability. We test every instruction on
            the actual devices and apps mentioned.
          </p>

          <h2>What We Cover</h2>
          <ul>
            <li><strong>How-To Guides</strong> — Step-by-step tutorials for phones, tablets, and apps</li>
            <li><strong>Product Reviews</strong> — Honest reviews of gadgets designed for seniors</li>
            <li><strong>Safety &amp; Security</strong> — How to spot scams and protect your information</li>
            <li><strong>Tech Explained</strong> — Simple explanations of WiFi, Bluetooth, cloud storage, and more</li>
            <li><strong>Free Tools</strong> — Interactive tools including a scam checker, password tester, device quiz, and WiFi troubleshooter</li>
            <li><strong>Accessibility</strong> — Guides for vision, hearing, and mobility challenges across all major devices</li>
          </ul>

          <h2>Our Editorial Standards</h2>
          <p>
            We only recommend products we have evaluated ourselves. When we include affiliate links,
            we disclose them clearly. Our editorial opinions are never influenced by advertisers.
          </p>
          <p>
            All statistics and claims in our safety guides are sourced from official organizations
            including the FBI Internet Crime Complaint Center (IC3), the Federal Trade Commission (FTC),
            and the AARP Fraud Watch Network. We link directly to these sources whenever possible.
          </p>
          <p>
            Our content is reviewed quarterly for accuracy and updated when products, features,
            or security threats change. Articles display their most recent update date so you
            always know how current the information is.
          </p>

          <h2>Contact Us</h2>
          <p>
            Have a question or suggestion? We would love to hear from you.
            Visit our <a href="/contact">contact page</a> to get in touch.
          </p>
        </div>
      </div>
    </>
  )
}
