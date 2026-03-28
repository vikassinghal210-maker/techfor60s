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

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function markdownToHtml(md: string): string {
  const lines = md.split('\n')
  const result: string[] = []
  let inCodeBlock = false
  let codeContent: string[] = []
  let inList = false
  let listType: 'ul' | 'ol' = 'ul'
  let inTable = false
  let tableRows: string[] = []

  function closeList() {
    if (inList) {
      result.push(`</${listType}>`)
      inList = false
    }
  }

  function closeTable() {
    if (inTable) {
      result.push('</tbody></table></div>')
      inTable = false
      tableRows = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        result.push(`<pre><code>${codeContent.join('\n').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`)
        codeContent = []
        inCodeBlock = false
      } else {
        closeList()
        closeTable()
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeContent.push(line)
      continue
    }

    // Table rows
    if (line.includes('|') && line.trim().startsWith('|')) {
      closeList()
      const cells = line.split('|').filter(c => c.trim() !== '').map(c => c.trim())

      // Skip separator row (|---|---|)
      if (cells.every(c => /^[-:]+$/.test(c))) continue

      if (!inTable) {
        inTable = true
        result.push('<div class="overflow-x-auto"><table>')
        result.push('<thead><tr>')
        cells.forEach(c => result.push(`<th>${inlineFormat(c)}</th>`))
        result.push('</tr></thead><tbody>')
      } else {
        result.push('<tr>')
        cells.forEach(c => result.push(`<td>${inlineFormat(c)}</td>`))
        result.push('</tr>')
      }
      continue
    } else {
      closeTable()
    }

    // Empty line
    if (line.trim() === '') {
      closeList()
      continue
    }

    // Headings
    if (line.startsWith('### ')) {
      closeList()
      const text = line.slice(4).trim()
      result.push(`<h3 id="${slugifyHeading(text)}">${inlineFormat(text)}</h3>`)
      continue
    }
    if (line.startsWith('## ')) {
      closeList()
      const text = line.slice(3).trim()
      result.push(`<h2 id="${slugifyHeading(text)}">${inlineFormat(text)}</h2>`)
      continue
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      closeList()
      result.push('<hr />')
      continue
    }

    // Unordered list
    if (/^[-*] /.test(line.trim())) {
      if (!inList || listType !== 'ul') {
        closeList()
        result.push('<ul>')
        inList = true
        listType = 'ul'
      }
      result.push(`<li>${inlineFormat(line.trim().slice(2))}</li>`)
      continue
    }

    // Ordered list
    if (/^\d+\. /.test(line.trim())) {
      if (!inList || listType !== 'ol') {
        closeList()
        result.push('<ol>')
        inList = true
        listType = 'ol'
      }
      result.push(`<li>${inlineFormat(line.trim().replace(/^\d+\.\s*/, ''))}</li>`)
      continue
    }

    // Blockquote
    if (line.startsWith('>')) {
      closeList()
      result.push(`<blockquote><p>${inlineFormat(line.slice(1).trim())}</p></blockquote>`)
      continue
    }

    // Paragraph
    closeList()
    result.push(`<p>${inlineFormat(line)}</p>`)
  }

  closeList()
  closeTable()

  return result.join('\n')
}

function inlineFormat(text: string): string {
  return text
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" class="rounded-xl" />')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}
