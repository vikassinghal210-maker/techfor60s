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
    alternates: { canonical: url },
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
      '@type': 'Person',
      name: post.author,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
        width: 250,
        height: 60,
      },
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
    name: SITE_NAME,
    url: SITE_URL,
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
