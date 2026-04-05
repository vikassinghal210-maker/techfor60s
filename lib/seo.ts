import type { Metadata } from 'next'
import type { PostMeta } from '@/types'
import { SITE_URL, SITE_NAME, slugify } from './utils'

export function generateBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — Technology Made Simple for Seniors`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      'Simple, jargon-free tech guides for adults over 60. Learn smartphones, tablets, apps, online safety, and smart home devices at your own pace.',
    keywords: [
      'tech for seniors',
      'technology for over 60s',
      'senior smartphone guide',
      'tech help for elderly',
      'simple tech tutorials',
      'senior tablet guide',
      'online safety seniors',
      'tech made simple',
    ],
    verification: {
      google: '0atSyCoQWeihdlWAhwqYgGJ1QapfkF5Yv61Go888g3E',
    },
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}/api/og?title=Technology+Made+Simple+for+Seniors`, width: 1200, height: 630, alt: 'TechFor60s — Technology Made Simple' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@TechFor60s',
    },
    alternates: {
      canonical: SITE_URL,
      languages: {
        'en-US': SITE_URL,
      },
      types: {
        'application/rss+xml': `${SITE_URL}/feed.xml`,
      },
    },
    other: {
      'theme-color': '#1e40af',
    },
  }
}

export function generateArticleMetadata(post: PostMeta, slug: string): Metadata {
  const url = `${SITE_URL}/blog/${slug}`
  const ogApiUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category ?? '')}`
  const imageUrl = post.thumbnail
    ? (post.thumbnail.startsWith('http') ? post.thumbnail : `${SITE_URL}${post.thumbnail}`)
    : ogApiUrl

  return {
    title: post.title,
    description: post.description || post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    robots: post.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description || post.excerpt,
      publishedTime: post.date,
      modifiedTime: post.lastModified ?? post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.thumbnailAlt ?? post.title }],
      siteName: SITE_NAME,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || post.excerpt,
      images: [imageUrl],
      site: '@TechFor60s',
    },
    alternates: { canonical: post.canonical ? `${SITE_URL}${post.canonical}` : url },
  }
}

export function generateCategoryMetadata(slug: string, label: string, description: string): Metadata {
  const url = `${SITE_URL}/category/${slug}`
  return {
    title: `${label} — Senior Tech Guides`,
    description,
    openGraph: {
      type: 'website',
      url,
      title: `${label} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
    },
    alternates: { canonical: url },
  }
}

// ── JSON-LD Schemas ─────────────────────────────────────────────────────────

export function articleJsonLd(post: PostMeta, slug: string, wordCount?: number) {
  const url = `${SITE_URL}/blog/${slug}`
  const imageUrl = post.thumbnail.startsWith('http')
    ? post.thumbnail
    : `${SITE_URL}${post.thumbnail}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: post.date,
    dateModified: post.lastModified ?? post.date,
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.keywords?.join(', '),
    articleSection: post.category,
    inLanguage: 'en-US',
    ...(wordCount !== undefined ? { wordCount } : {}),
  }
}

export function breadcrumbJsonLd(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function howToJsonLd(params: {
  name: string
  description: string
  steps: Array<{ name: string; text: string }>
  url: string
  totalTime?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    url: params.url,
    ...(params.totalTime ? { totalTime: params.totalTime } : {}),
    step: params.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.svg`,
      width: 250,
      height: 60,
    },
    description:
      'Simple, jargon-free technology guides for adults over 60. Learn smartphones, tablets, apps, and online safety at your own pace.',
    foundingDate: '2024',
    sameAs: ['https://twitter.com/TechFor60s'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${SITE_URL}/contact`,
    },
  }
}

export function webApplicationJsonLd(params: {
  name: string
  description: string
  url: string
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: params.name,
    url: params.url,
    description: params.description,
    applicationCategory: params.category ?? 'UtilitiesApplication',
    operatingSystem: 'Any (browser-based)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

export function itemListJsonLd(items: { name: string; url: string; position: number }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  }
}

export function extractFaqsFromMarkdown(content: string): { question: string; answer: string }[] {
  // Split on H2 boundaries to isolate the FAQ section
  const sections = content.split(/\n(?=## )/)
  const faqSection = sections.find((s) =>
    /^## (?:Frequently Asked Questions|FAQ|Common Questions|FAQs)/i.test(s)
  )
  if (!faqSection) return []

  // Split FAQ section on H3 boundaries to get individual Q&A pairs
  const parts = faqSection.split(/\n(?=### )/)
  const faqs: { question: string; answer: string }[] = []

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]
    const firstNewline = part.indexOf('\n')
    if (firstNewline === -1) continue

    // Strip the leading '### ' prefix (4 chars)
    const question = part.substring(4, firstNewline).trim()
    const answer = part
      .substring(firstNewline + 1)
      .trim()
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // strip markdown links, keep text
      .replace(/\n+/g, ' ')
      .replace(/\*\*|__|\*|_|`/g, '')
      .substring(0, 500)

    if (question && answer) {
      faqs.push({ question, answer })
    }
  }

  return faqs
}

export function extractHowToStepsFromMarkdown(
  content: string,
  title: string
): { name: string; text: string }[] | null {
  const stepPattern = /#{1,3}\s+(?:Step\s+\d+[:.—-]?\s*)(.+?)\n([\s\S]*?)(?=\n#{1,3}\s|\s*$)/gi
  const steps: { name: string; text: string }[] = []
  let match

  while ((match = stepPattern.exec(content)) !== null) {
    const name = match[1].trim()
    const text = match[2].trim().replace(/\n+/g, ' ').replace(/\*\*|__|\*|_|`/g, '').substring(0, 300)
    if (name && text) {
      steps.push({ name, text })
    }
  }

  return steps.length >= 2 ? steps : null
}

export function productReviewJsonLd(params: {
  itemName: string
  reviewBody: string
  ratingValue: number
  authorName: string
  url: string
  datePublished: string
  price?: string
  priceCurrency?: string
  brand?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: params.itemName,
    ...(params.brand ? { brand: { '@type': 'Brand', name: params.brand } } : {}),
    review: {
      '@type': 'Review',
      name: `Review of ${params.itemName}`,
      reviewBody: params.reviewBody,
      datePublished: params.datePublished,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(params.ratingValue),
        bestRating: '5',
        worstRating: '1',
      },
      author: {
        '@type': 'Person',
        name: params.authorName,
      },
    },
    ...(params.price
      ? {
          offers: {
            '@type': 'Offer',
            price: params.price,
            priceCurrency: params.priceCurrency ?? 'USD',
            availability: 'https://schema.org/InStock',
            url: params.url,
          },
        }
      : {}),
    url: params.url,
  }
}
