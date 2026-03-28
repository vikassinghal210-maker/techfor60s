import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'About Us',
  description: `${SITE_NAME} helps adults over 60 learn technology with simple, jargon-free guides. Our mission is to make tech accessible for everyone.`,
  alternates: { canonical: `${SITE_URL}/about` },
}

export default function AboutPage() {
  return (
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
          instructions and real screenshots. We test everything ourselves before publishing.
        </p>

        <h2>What We Cover</h2>
        <ul>
          <li><strong>How-To Guides</strong> — Step-by-step tutorials for phones, tablets, and apps</li>
          <li><strong>Product Reviews</strong> — Honest reviews of gadgets designed for seniors</li>
          <li><strong>Safety &amp; Security</strong> — How to spot scams and protect your information</li>
          <li><strong>Tech Explained</strong> — Simple explanations of WiFi, Bluetooth, cloud storage, and more</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          Have a question or suggestion? We would love to hear from you.
          Visit our <a href="/contact">contact page</a> to get in touch.
        </p>
      </div>
    </div>
  )
}
