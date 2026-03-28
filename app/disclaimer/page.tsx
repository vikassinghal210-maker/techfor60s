import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: `Affiliate disclosure and disclaimer for ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/disclaimer` },
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Disclaimer' }]} />

      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-6">
        Disclaimer &amp; Affiliate Disclosure
      </h1>

      <div className="prose prose-lg max-w-none">
        <h2>Affiliate Disclosure</h2>
        <p>
          {SITE_NAME} is a participant in the Amazon Services LLC Associates Program
          and other affiliate programs. This means we may earn a commission when you
          click on product links and make a purchase. This comes at no additional cost
          to you.
        </p>

        <h2>Editorial Independence</h2>
        <p>
          Our reviews and recommendations are based on our own research and testing.
          We only recommend products we believe will genuinely help our readers.
          Affiliate partnerships do not influence our editorial content.
        </p>

        <h2>Accuracy</h2>
        <p>
          We make every effort to ensure the information on this site is accurate
          and up to date. However, technology changes rapidly and we cannot guarantee
          that every guide reflects the very latest software updates. If you spot
          an error, please <a href="/contact">let us know</a>.
        </p>
      </div>
    </div>
  )
}
