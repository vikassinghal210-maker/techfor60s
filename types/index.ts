export interface PostFrontmatter {
  title: string
  excerpt: string
  description?: string
  date: string
  lastModified?: string
  author: string
  authorAvatar?: string
  authorBio?: string
  category: string
  tags: string[]
  thumbnail: string
  thumbnailAlt?: string
  keywords: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime?: string
  featured?: boolean
  noindex?: boolean
}

export interface Post extends PostFrontmatter {
  slug: string
  readingTime: string
  content: string
  toc: TOCItem[]
}

export interface PostMeta extends PostFrontmatter {
  slug: string
  readingTime: string
}

export interface TOCItem {
  id: string
  text: string
  level: 2 | 3
}

export interface Category {
  slug: string
  label: string
  color: string
  description: string
}

export interface AffiliateProduct {
  name: string
  image: string
  priceRange: string
  pros: string[]
  cons: string[]
  affiliateUrl: string
  rating?: number
}

export interface BreadcrumbItem {
  label: string
  href?: string
}
