import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TASKS, getTask, getDevicesForTask, CATEGORY_LABELS } from '@/lib/howto-data'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

export async function generateStaticParams() {
  return TASKS.map((t) => ({ task: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ task: string }>
}): Promise<Metadata> {
  const { task: taskSlug } = await params
  const task = getTask(taskSlug)
  if (!task) return {}

  const title = `How to ${task.name} — Pick Your Device`
  const description = `Step-by-step instructions to ${task.name.toLowerCase()} on iPhone, Samsung, Android, iPad, and more. Choose your device for personalized steps.`
  const url = `${SITE_URL}/how-to/${task.slug}`

  return {
    title,
    description,
    keywords: [
      `how to ${task.name.toLowerCase()}`,
      `${task.name.toLowerCase()} tutorial`,
      `${task.name.toLowerCase()} for seniors`,
      `${task.name.toLowerCase()} step by step`,
    ],
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'TechFor60s',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: { canonical: url },
  }
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-amber-100 text-amber-800',
  hard: 'bg-red-100 text-red-800',
}

export default async function HowToTaskPage({
  params,
}: {
  params: Promise<{ task: string }>
}) {
  const { task: taskSlug } = await params
  const task = getTask(taskSlug)
  if (!task) notFound()

  const devices = getDevicesForTask(taskSlug)

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'How-To Guides', url: `${SITE_URL}/how-to` },
    { name: task.name },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'How-To Guides', href: '/how-to' },
          { label: task.name },
        ]}
      />

      {/* Hero */}
      <section className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[task.difficulty]}`}>
            {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
            {task.estimatedTime}
          </span>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
          >
            {CATEGORY_LABELS[task.category]}
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          How to {task.name}
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Choose your device below to get step-by-step instructions written in plain English.
          Every guide is tailored to your specific phone, tablet, or computer.
        </p>
      </section>

      {/* Device Picker Grid */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Pick Your Device
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {devices.map((device) => (
            <Link
              key={device.slug}
              href={`/how-to/${task.slug}/${device.slug}`}
              className="flex flex-col items-center gap-2 rounded-xl border p-5 text-center transition-all hover:shadow-lg hover:border-brand-blue"
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
            </Link>
          ))}
        </div>
      </section>

      {/* Back to index */}
      <div className="text-center pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <Link href="/how-to" className="text-brand-blue hover:underline font-medium">
          Browse all How-To Guides
        </Link>
      </div>
    </div>
  )
}
