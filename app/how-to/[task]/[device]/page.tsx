import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getAllValidPairs,
  getTask,
  getDevice,
  getInstruction,
  getDevicesForTask,
  getTasksForDevice,
  CATEGORY_LABELS,
} from '@/lib/howto-data'
import { SITE_URL } from '@/lib/utils'
import { breadcrumbJsonLd, howToJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

export async function generateStaticParams() {
  return getAllValidPairs()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ task: string; device: string }>
}): Promise<Metadata> {
  const { task: taskSlug, device: deviceSlug } = await params
  const task = getTask(taskSlug)
  const device = getDevice(deviceSlug)
  if (!task || !device) return {}

  const title = `How to ${task.name} on ${device.name} — Step by Step`
  const description = `Simple step-by-step instructions to ${task.name.toLowerCase()} on your ${device.name}. Written in plain English for seniors and beginners.`
  const url = `${SITE_URL}/how-to/${task.slug}/${device.slug}`

  return {
    title,
    description,
    keywords: [
      `how to ${task.name.toLowerCase()} ${device.name}`,
      `${task.name.toLowerCase()} ${device.brand}`,
      `${device.name} tutorial`,
      `${task.name.toLowerCase()} guide for seniors`,
      `${device.os} ${task.name.toLowerCase()}`,
    ],
    openGraph: {
      type: 'article',
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

export default async function HowToDevicePage({
  params,
}: {
  params: Promise<{ task: string; device: string }>
}) {
  const { task: taskSlug, device: deviceSlug } = await params
  const task = getTask(taskSlug)
  const device = getDevice(deviceSlug)
  const instruction = getInstruction(taskSlug, deviceSlug)

  if (!task || !device || !instruction) notFound()

  const otherDevices = getDevicesForTask(taskSlug).filter((d) => d.slug !== deviceSlug)
  const otherTasks = getTasksForDevice(deviceSlug).filter((t) => t.slug !== taskSlug).slice(0, 8)

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'How-To Guides', url: `${SITE_URL}/how-to` },
    { name: task.name, url: `${SITE_URL}/how-to/${task.slug}` },
    { name: device.name },
  ]

  const pageUrl = `${SITE_URL}/how-to/${task.slug}/${device.slug}`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
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
            howToJsonLd({
              name: `How to ${task.name} on ${device.name}`,
              description: `Step-by-step instructions to ${task.name.toLowerCase()} on your ${device.name}.`,
              steps: instruction.steps.map((step, i) => ({
                name: `Step ${i + 1}`,
                text: step,
              })),
              url: pageUrl,
              totalTime: `PT${task.estimatedTime.replace(' min', 'M')}`,
            })
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'How-To Guides', href: '/how-to' },
          { label: task.name, href: `/how-to/${task.slug}` },
          { label: device.name },
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
          <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
            {CATEGORY_LABELS[task.category]}
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          How to {task.name} on {device.name}
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Follow these simple steps to {task.name.toLowerCase()} on your {device.name}.
          Each step is one action — nice and easy.
        </p>
      </section>

      {/* Steps */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Step-by-Step Instructions
        </h2>
        <ol className="space-y-5">
          {instruction.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center text-lg font-bold">
                {i + 1}
              </span>
              <p
                className="text-lg leading-relaxed pt-1.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Tip Callout */}
      <section
        className="mb-10 rounded-xl p-6 border-l-4 border-l-brand-blue"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        <h3
          className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Helpful Tip
        </h3>
        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {instruction.tip}
        </p>
      </section>

      {/* Try on a Different Device */}
      {otherDevices.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Try on a Different Device
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
            Same task, different device. Pick yours below:
          </p>
          <div className="flex flex-wrap gap-3">
            {otherDevices.map((d) => (
              <Link
                key={d.slug}
                href={`/how-to/${task.slug}/${d.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors hover:bg-brand-blue hover:text-white hover:border-brand-blue"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <span>{d.icon}</span>
                {d.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* More How-Tos for This Device */}
      {otherTasks.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            More How-Tos for {device.name}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {otherTasks.map((t) => (
              <Link
                key={t.slug}
                href={`/how-to/${t.slug}/${device.slug}`}
                className="block rounded-lg border p-4 transition-shadow hover:shadow-md"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {t.name}
                </span>
                <span className="block text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  {t.estimatedTime} &middot; {t.difficulty}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Blog Articles */}
      <section
        className="mb-10 rounded-xl p-6 border"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <h2
          className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Related Articles
        </h2>
        <ul className="space-y-3">
          <li>
            <Link href="/tools/device-quiz" className="text-brand-blue hover:underline font-medium">
              Which Device Is Right for You? Take the Quiz
            </Link>
            <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Not sure which phone or tablet to get? Our quiz helps you decide.
            </span>
          </li>
          {device.os === 'iOS' || device.os === 'iPadOS' ? (
            <li>
              <Link href="/tools/iphone-cheat-sheet" className="text-brand-blue hover:underline font-medium">
                iPhone Cheat Sheet for Seniors
              </Link>
              <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                A one-page reference with all the essential iPhone tips and shortcuts.
              </span>
            </li>
          ) : device.os === 'Android' ? (
            <li>
              <Link href="/tools/android-cheat-sheet" className="text-brand-blue hover:underline font-medium">
                Android Cheat Sheet for Seniors
              </Link>
              <span className="block text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                A one-page reference with all the essential Android tips and shortcuts.
              </span>
            </li>
          ) : null}
        </ul>
      </section>

      {/* Back to index */}
      <div
        className="text-center pt-4 border-t"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <Link href="/how-to" className="text-brand-blue hover:underline font-medium">
          Browse all How-To Guides
        </Link>
      </div>
    </div>
  )
}
