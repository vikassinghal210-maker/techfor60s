import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${SITE_NAME}. Learn how we collect, use, and protect your information.`,
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-6">
        Privacy Policy
      </h1>

      <div className="prose prose-lg max-w-none">
        <p><em>Last updated: March 28, 2026</em></p>

        <h2>Who We Are</h2>
        <p>
          {SITE_NAME} ({SITE_URL}) is a technology education website for adults over 60.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We use Google Analytics to understand how visitors use our site. This collects
          anonymous data such as which pages you visit, how long you stay, and what device
          you use. This helps us write better guides.
        </p>

        <h2>Cookies</h2>
        <p>
          Our site uses cookies for analytics and to remember your text size preference.
          You can disable cookies in your browser settings at any time.
        </p>

        <h2>Affiliate Links</h2>
        <p>
          Some articles contain affiliate links to products we recommend. If you purchase
          through these links, we may earn a small commission at no extra cost to you.
          This helps us keep the site running.
        </p>

        <h2>Advertising</h2>
        <p>
          We may display advertisements through Google AdSense or similar services.
          These services may use cookies to show you relevant ads.
        </p>

        <h2>Your Rights</h2>
        <p>
          You can request to see or delete any personal data we hold about you.
          Contact us at <a href="mailto:hello@techfor60s.com">hello@techfor60s.com</a>.
        </p>
      </div>
    </div>
  )
}
