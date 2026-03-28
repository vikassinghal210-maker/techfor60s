import Fuse from 'fuse.js'
import type { PostMeta } from '@/types'

export interface SearchResult {
  slug: string
  title: string
  excerpt: string
  category: string
  readingTime: string
  difficulty?: string
}

export function createSearchIndex(posts: PostMeta[]) {
  const searchData: SearchResult[] = posts.map(p => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    readingTime: p.readingTime,
    difficulty: p.difficulty,
  }))

  const fuse = new Fuse(searchData, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'excerpt', weight: 1 },
      { name: 'category', weight: 0.5 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
  })

  return { fuse, searchData }
}
