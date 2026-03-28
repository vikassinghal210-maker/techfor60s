import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { cache } from 'react'
import type { Post, PostMeta, TOCItem, PostFrontmatter } from '@/types'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

function ensureContentDir() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true })
  }
}

function _getAllSlugs(): string[] {
  ensureContentDir()
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.(mdx|md)$/, ''))
}

export const getAllSlugs = cache(_getAllSlugs)

export function getRawPost(slug: string): { frontmatter: PostFrontmatter; content: string } | null {
  ensureContentDir()
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`)
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null

  if (!filePath) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    frontmatter: data as PostFrontmatter,
    content,
  }
}

export function extractTOC(content: string): TOCItem[] {
  const headingRegex = /^#{2,3}\s+(.+)$/gm
  const toc: TOCItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[0].startsWith('###') ? 3 : 2
    const text = match[1].replace(/[*_`]/g, '').trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '')

    toc.push({ id, text, level })
  }

  return toc
}

function _getAllPostsMeta(): PostMeta[] {
  const slugs = getAllSlugs()

  const posts: PostMeta[] = slugs
    .map((slug) => {
      const raw = getRawPost(slug)
      if (!raw) return null

      const stats = readingTime(raw.content)

      return {
        slug,
        ...raw.frontmatter,
        readingTime: stats.text,
        category: raw.frontmatter.category ?? 'general',
        tags: raw.frontmatter.tags ?? [],
        keywords: raw.frontmatter.keywords ?? [],
        thumbnail: raw.frontmatter.thumbnail ?? '/images/placeholder.jpg',
        excerpt: raw.frontmatter.excerpt ?? '',
        author: raw.frontmatter.author ?? 'TechFor60s Team',
      } as PostMeta
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export const getAllPostsMeta = cache(_getAllPostsMeta)

function _getPostBySlug(slug: string): Post | null {
  const raw = getRawPost(slug)
  if (!raw) return null

  const stats = readingTime(raw.content)
  const toc = extractTOC(raw.content)

  return {
    slug,
    ...raw.frontmatter,
    readingTime: stats.text,
    content: raw.content,
    toc,
    category: raw.frontmatter.category ?? 'general',
    tags: raw.frontmatter.tags ?? [],
    keywords: raw.frontmatter.keywords ?? [],
    thumbnail: raw.frontmatter.thumbnail ?? '/images/placeholder.jpg',
    excerpt: raw.frontmatter.excerpt ?? '',
    author: raw.frontmatter.author ?? 'TechFor60s Team',
  }
}

export const getPostBySlug = cache(_getPostBySlug)

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.category === category)
}

function _getRelatedPosts(
  currentSlug: string,
  category: string,
  tags: string[] = [],
  limit = 4,
): PostMeta[] {
  const allPosts = getAllPostsMeta()
  const others = allPosts.filter((p) => p.slug !== currentSlug)

  const sameCategoryPosts = others
    .filter((p) => p.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (sameCategoryPosts.length >= limit) {
    return sameCategoryPosts.slice(0, limit)
  }

  const result = [...sameCategoryPosts]
  const usedSlugs = new Set(result.map((p) => p.slug))

  if (tags.length > 0 && result.length < limit) {
    const tagSet = new Set(tags.map((t) => t.toLowerCase()))
    const tagMatches = others
      .filter((p) => !usedSlugs.has(p.slug) && p.category !== category)
      .map((p) => {
        const shared = (p.tags ?? []).filter((t) => tagSet.has(t.toLowerCase())).length
        return { post: p, shared }
      })
      .filter((x) => x.shared > 0)
      .sort((a, b) => b.shared - a.shared || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())

    for (const { post } of tagMatches) {
      if (result.length >= limit) break
      result.push(post)
      usedSlugs.add(post.slug)
    }
  }

  if (result.length < limit) {
    const remaining = others
      .filter((p) => !usedSlugs.has(p.slug))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    for (const post of remaining) {
      if (result.length >= limit) break
      result.push(post)
    }
  }

  return result
}

export const getRelatedPosts = cache(_getRelatedPosts)

export function getFeaturedPost(): PostMeta | undefined {
  const all = getAllPostsMeta()
  return all.find((p) => p.featured) ?? all[0]
}
