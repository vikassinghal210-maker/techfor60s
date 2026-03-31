import type { MetadataRoute } from 'next'
import { getAllPostsMeta } from '@/lib/mdx'
import { SITE_URL, CATEGORIES } from '@/lib/utils'
import { CONDITIONS, ACCESS_DEVICES, getAllConditionDevicePairs } from '@/lib/accessibility-data'
import { getAllPrintableSlugs } from '@/lib/printables-data'
import { TASKS, getAllValidPairs } from '@/lib/howto-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta()

  const postEntries = posts
    .filter((p) => !p.noindex)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.lastModified ?? post.date,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  const categoryEntries = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const toolPages = [
    '/tools',
    '/tools/device-quiz',
    '/tools/iphone-cheat-sheet',
    '/tools/android-cheat-sheet',
    '/tools/internet-speed-calculator',
    '/tools/internet-by-state',
    '/tools/tech-classes',
    '/tools/scam-checker',
    '/tools/cord-cutting-calculator',
    '/tools/phone-plan-calculator',
    '/tools/wifi-troubleshooter',
    '/tools/password-checker',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const corePages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
  ]

  const accessibilityPages = [
    { url: `${SITE_URL}/accessibility`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    ...CONDITIONS.map((c) => ({
      url: `${SITE_URL}/accessibility/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...getAllConditionDevicePairs().map((pair) => ({
      url: `${SITE_URL}/accessibility/${pair.condition}/${pair.device}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  const resourcePages = [
    { url: `${SITE_URL}/resources`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    ...getAllPrintableSlugs().map((slug) => ({
      url: `${SITE_URL}/resources/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  const howToPages = [
    { url: `${SITE_URL}/how-to`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    ...TASKS.map((t) => ({
      url: `${SITE_URL}/how-to/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...getAllValidPairs().map((pair) => ({
      url: `${SITE_URL}/how-to/${pair.task}/${pair.device}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  return [...corePages, ...toolPages, ...accessibilityPages, ...resourcePages, ...howToPages, ...categoryEntries, ...postEntries]
}
