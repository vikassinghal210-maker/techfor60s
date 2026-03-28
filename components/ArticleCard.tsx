'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Clock, BookOpen } from 'lucide-react'
import type { PostMeta } from '@/types'
import { formatDate, getCategoryInfo } from '@/lib/utils'

interface ArticleCardProps {
  post: PostMeta
  variant?: 'grid' | 'list' | 'compact'
  index?: number
}

export default function ArticleCard({ post, variant = 'grid', index = 0 }: ArticleCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const category = getCategoryInfo(post.category)

  if (variant === 'compact') {
    return (
      <Link href={`/blog/${post.slug}`} className="group block no-underline">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          className="card p-4 flex gap-4 items-start group-hover:border-brand-blue/30"
        >
          {post.thumbnail && (
            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
              <Image
                src={post.thumbnail}
                alt={post.thumbnailAlt ?? post.title}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[var(--text-primary)] leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-[var(--text-muted)]">
              <Clock className="w-3 h-3" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </motion.div>
      </Link>
    )
  }

  if (variant === 'list') {
    return (
      <Link href={`/blog/${post.slug}`} className="group block no-underline">
        <motion.article
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          className="card overflow-hidden flex flex-col sm:flex-row group-hover:border-brand-blue/30"
        >
          {post.thumbnail && (
            <div className="relative w-full sm:w-64 h-48 sm:h-auto shrink-0">
              <Image
                src={post.thumbnail}
                alt={post.thumbnailAlt ?? post.title}
                fill
                sizes="(max-width: 640px) 100vw, 256px"
                className="object-cover"
              />
            </div>
          )}
          <div className="p-5 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full text-white ${category.color}`}>
                {category.label}
              </span>
              {post.difficulty && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue dark:bg-blue-900/30">
                  {post.difficulty}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] leading-snug mb-2 group-hover:text-brand-blue transition-colors">
              {post.title}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm line-clamp-2 mb-3">{post.excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    )
  }

  // Grid variant (default)
  return (
    <Link href={`/blog/${post.slug}`} className="group block no-underline">
      <motion.article
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        whileHover={shouldReduceMotion ? {} : { y: -4 }}
        className="card overflow-hidden h-full flex flex-col"
      >
        {post.thumbnail && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={post.thumbnail}
              alt={post.thumbnailAlt ?? post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full text-white ${category.color} shadow-sm`}>
                {category.label}
              </span>
            </div>
          </div>
        )}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            {post.difficulty && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue dark:bg-blue-900/30 flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {post.difficulty}
              </span>
            )}
            {post.estimatedTime && (
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.estimatedTime}
              </span>
            )}
          </div>
          <h2 className="font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] leading-snug mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-[var(--text-secondary)] text-sm line-clamp-2 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
