import { type ClassValue, clsx } from 'clsx'
import type { Category } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateISO(dateString: string): string {
  return new Date(dateString).toISOString()
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…'
}

export const CATEGORIES: Category[] = [
  {
    slug: 'how-to-guides',
    label: 'How-To Guides',
    color: 'bg-emerald-600',
    description: 'Step-by-step tutorials for smartphones, tablets, apps, and everyday tech.',
  },
  {
    slug: 'product-reviews',
    label: 'Product Reviews',
    color: 'bg-blue-600',
    description: 'Honest reviews of phones, tablets, smart home devices, and gadgets for seniors.',
  },
  {
    slug: 'explainers',
    label: 'Tech Explained',
    color: 'bg-purple-600',
    description: 'Plain-English explanations of WiFi, Bluetooth, cloud storage, and more.',
  },
  {
    slug: 'safety-security',
    label: 'Safety & Security',
    color: 'bg-red-600',
    description: 'Protect yourself from scams, set strong passwords, and stay safe online.',
  },
  {
    slug: 'apps-services',
    label: 'Apps & Services',
    color: 'bg-amber-600',
    description: 'Best apps for video calls, health tracking, entertainment, and daily life.',
  },
]

export function getCategoryInfo(slug: string): Category {
  if (!slug) {
    return { slug: 'general', label: 'General', color: 'bg-gray-600', description: '' }
  }
  return (
    CATEGORIES.find((c) => c.slug === slug) ?? {
      slug,
      label: slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      color: 'bg-gray-600',
      description: '',
    }
  )
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://techfor60s.com'
export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME ?? 'TechFor60s'
