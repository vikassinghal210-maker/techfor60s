import type { MetadataRoute } from 'next'
import { getAllPostsMeta } from '@/lib/mdx'
import { SITE_URL, CATEGORIES } from '@/lib/utils'
import { CONDITIONS, getAllConditionDevicePairs } from '@/lib/accessibility-data'
import { getAllPrintableSlugs } from '@/lib/printables-data'
import { TASKS, getAllValidPairs } from '@/lib/howto-data'
import { statesData } from '@/lib/states-data'
import { cities } from '@/lib/cities-data'
import { getCarriers, PLAN_CATEGORIES, getCarrierComparisons } from '@/lib/phone-plans-data'
import { OCCASIONS, PRICE_RANGES } from '@/lib/gifts-data'
import { getAllDiscounts, DISCOUNT_CATEGORIES } from '@/lib/discounts-data'
import { getAllSupport, SUPPORT_CATEGORIES } from '@/lib/support-data'
import { ALL_ERRORS, DEVICE_CATEGORIES } from '@/lib/errors-data'
import { APPS, DEVICES, APP_GUIDES } from '@/lib/app-guides-data'
import { USE_CASES, getComparisons } from '@/lib/phones-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
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
    lastModified: now,
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
    '/tools/scam-phone-lookup',
    '/tools/scam-quiz',
    '/tools/is-this-website-safe',
    '/tools/latest-scams',
    '/tools/report-scam',
    '/tools/data-breach-checker',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const corePages = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.4 },
  ]

  const accessibilityPages = [
    { url: `${SITE_URL}/accessibility`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    ...CONDITIONS.map((c) => ({
      url: `${SITE_URL}/accessibility/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...getAllConditionDevicePairs().map((pair) => ({
      url: `${SITE_URL}/accessibility/${pair.condition}/${pair.device}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  const resourcePages = [
    { url: `${SITE_URL}/resources`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    ...getAllPrintableSlugs().map(({ slug }) => ({
      url: `${SITE_URL}/resources/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  const howToPages = [
    { url: `${SITE_URL}/how-to`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    ...TASKS.map((t) => ({
      url: `${SITE_URL}/how-to/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...getAllValidPairs().map((pair) => ({
      url: `${SITE_URL}/how-to/${pair.task}/${pair.device}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  // ── Internet by State (50 states) ──────────────────────────────────────────
  const statePages = statesData.map((s) => ({
    url: `${SITE_URL}/tools/internet-by-state/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // ── Tech Classes by City (30 cities) ──────────────────────────────────────
  const cityPages = cities.map((c) => ({
    url: `${SITE_URL}/tools/tech-classes/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // ── Phone Plans ───────────────────────────────────────────────────────────
  const carriers = getCarriers()
  const carrierComparisons = getCarrierComparisons()
  const phonePlanPages = [
    { url: `${SITE_URL}/phone-plans`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...carriers.map((c) => ({
      url: `${SITE_URL}/phone-plans/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...PLAN_CATEGORIES.map((cat) => ({
      url: `${SITE_URL}/phone-plans/best-for/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...carrierComparisons.map((c) => ({
      url: `${SITE_URL}/phone-plans/compare/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  // ── Gift Finder ───────────────────────────────────────────────────────────
  const giftPages = [
    { url: `${SITE_URL}/gifts`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    ...OCCASIONS.map((o) => ({
      url: `${SITE_URL}/gifts/${o.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...PRICE_RANGES.map((r) => ({
      url: `${SITE_URL}/gifts/budget/${r.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  // ── Senior Discounts ──────────────────────────────────────────────────────
  const discounts = getAllDiscounts()
  const discountPages = [
    { url: `${SITE_URL}/senior-discounts`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...discounts.map((d) => ({
      url: `${SITE_URL}/senior-discounts/${d.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...DISCOUNT_CATEGORIES.map((cat) => ({
      url: `${SITE_URL}/senior-discounts/category/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  // ── Tech Support Finder ───────────────────────────────────────────────────
  const supportEntries = getAllSupport()
  const supportPages = [
    { url: `${SITE_URL}/tech-support`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...supportEntries.map((s) => ({
      url: `${SITE_URL}/tech-support/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...SUPPORT_CATEGORIES.map((cat) => ({
      url: `${SITE_URL}/tech-support/category/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  // ── Error Lookup ──────────────────────────────────────────────────────────
  const errorPages = [
    { url: `${SITE_URL}/error-lookup`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...ALL_ERRORS.map((e) => ({
      url: `${SITE_URL}/error-lookup/${e.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...DEVICE_CATEGORIES.map((d) => ({
      url: `${SITE_URL}/error-lookup/device/${d.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  // ── App Guides (15 apps × 6 devices) ──────────────────────────────────────
  const appGuidePages = [
    { url: `${SITE_URL}/app-guides`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...APPS.map((app) => ({
      url: `${SITE_URL}/app-guides/${app.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...APP_GUIDES.map((g) => ({
      url: `${SITE_URL}/app-guides/${g.appSlug}/${g.deviceSlug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  // ── Phone Comparisons ─────────────────────────────────────────────────────
  const phoneComparisons = getComparisons()
  const comparePages = [
    { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...phoneComparisons.map((c) => ({
      url: `${SITE_URL}/compare/${c.slugA}-vs-${c.slugB}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...USE_CASES.map((uc) => ({
      url: `${SITE_URL}/compare/best-for/${uc.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  return [
    ...corePages,
    ...toolPages,
    ...statePages,
    ...cityPages,
    ...accessibilityPages,
    ...resourcePages,
    ...howToPages,
    ...phonePlanPages,
    ...giftPages,
    ...discountPages,
    ...supportPages,
    ...errorPages,
    ...appGuidePages,
    ...comparePages,
    ...categoryEntries,
    ...postEntries,
  ]
}
