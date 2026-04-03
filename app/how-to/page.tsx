import type { Metadata } from 'next'
import Link from 'next/link'
import {
  DEVICES,
  TASKS,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  getAllValidPairs,
  getTasksByCategory,
} from '@/lib/howto-data'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import DevicePicker from '@/components/DevicePicker'

export const metadata: Metadata = {
  title: 'How-To Guides for Every Device — Step-by-Step Instructions',
  description:
    'Simple, step-by-step how-to guides for iPhone, Samsung, Android, iPad, Windows, and Mac. 40 common tasks explained in plain English for seniors and beginners.',
  keywords: [
    'how to guides for seniors',
    'phone instructions step by step',
    'iphone how to',
    'samsung how to',
    'android tutorials for beginners',
    'tech help for seniors',
    'device how to guides',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/how-to`,
    title: 'How-To Guides for Every Device — Step-by-Step Instructions',
    description:
      'Simple, step-by-step how-to guides for iPhone, Samsung, Android, iPad, Windows, and Mac.',
    siteName: 'TechFor60s',
  },
  alternates: { canonical: `${SITE_URL}/how-to` },
}

export default function HowToIndexPage() {
  const allPairs = getAllValidPairs()
  const validPairsArr = allPairs.map((p) => `${p.task}:${p.device}`)
  const tasksByCategory = getTasksByCategory()

  const popularTasks = TASKS.filter((t) =>
    [
      'take-screenshot',
      'change-font-size',
      'connect-wifi',
      'send-text-message',
      'take-photo',
      'download-app',
      'block-phone-number',
      'make-video-call',
    ].includes(t.slug)
  )

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'How-To Guides' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd(
              TASKS.map((task, index) => ({
                name: task.name,
                url: `${SITE_URL}/how-to/${task.slug}`,
                position: index + 1,
              }))
            )
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'How-To Guides' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          How-To Guides for Every Device
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Simple, step-by-step instructions for {TASKS.length} common tasks across {DEVICES.length} devices.
          Pick your phone, tablet, or computer, choose a task, and follow the steps.
          Every guide is written in plain English — no jargon, no confusion.
        </p>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          {allPairs.length} device-specific guides and counting.
        </p>
      </section>

      {/* Pick Your Device */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Pick Your Device
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {DEVICES.map((device) => (
            <div
              key={device.slug}
              className="flex flex-col items-center gap-2 rounded-xl border p-5 text-center"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <span className="text-3xl">{device.icon}</span>
              <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                {device.name}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {device.brand} &middot; {device.os}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular How-Tos */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Popular How-Tos
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {popularTasks.map((task) => (
            <Link
              key={task.slug}
              href={`/how-to/${task.slug}`}
              className="flex items-center gap-3 rounded-xl border p-4 transition-shadow hover:shadow-md hover:border-brand-blue"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <span className="text-2xl">{CATEGORY_ICONS[task.category]}</span>
              <div>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {task.name}
                </span>
                <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {task.estimatedTime} &middot; {task.difficulty}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by Category */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Browse by Category
        </h2>
        <div className="space-y-8">
          {Object.entries(tasksByCategory).map(([category, tasks]) => (
            <div key={category}>
              <h3
                className="text-lg font-bold font-[family-name:var(--font-heading)] mb-3 flex items-center gap-2"
                style={{ color: 'var(--text-primary)' }}
              >
                <span>{CATEGORY_ICONS[category]}</span>
                {CATEGORY_LABELS[category]}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {tasks.map((task) => (
                  <Link
                    key={task.slug}
                    href={`/how-to/${task.slug}`}
                    className="rounded-lg border px-4 py-3 transition-colors hover:border-brand-blue"
                    style={{
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span className="font-medium">{task.name}</span>
                    <span className="block text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {task.estimatedTime} &middot; {task.difficulty}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Filter (Client Component) */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Search All Guides
        </h2>
        <DevicePicker
          devices={DEVICES}
          tasks={TASKS}
          tasksByCategory={tasksByCategory}
          categoryLabels={CATEGORY_LABELS}
          categoryIcons={CATEGORY_ICONS}
          validPairs={validPairsArr}
        />
      </section>

      {/* Related Resources */}
      <section
        className="mb-10 rounded-xl p-6 border"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <h2
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          More Helpful Resources
        </h2>
        <ul className="space-y-3">
          <li>
            <Link href="/tools/device-quiz" className="text-brand-blue hover:underline font-medium">
              Which Device Is Right for You? Take the Quiz
            </Link>
            <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Not sure whether you need a tablet, smartphone, or laptop? Our quick quiz will help.
            </span>
          </li>
          <li>
            <Link href="/tools/iphone-cheat-sheet" className="text-brand-blue hover:underline font-medium">
              iPhone Cheat Sheet for Seniors
            </Link>
            <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              A one-page reference for the most common iPhone tasks.
            </span>
          </li>
          <li>
            <Link href="/tools/android-cheat-sheet" className="text-brand-blue hover:underline font-medium">
              Android Cheat Sheet for Seniors
            </Link>
            <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              A one-page reference for the most common Android tasks.
            </span>
          </li>
        </ul>
      </section>
    </div>
  )
}
