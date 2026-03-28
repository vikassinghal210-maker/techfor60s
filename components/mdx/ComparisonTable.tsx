'use client'

import { Star, ThumbsUp, ThumbsDown } from 'lucide-react'

interface Product {
  name: string
  rating: number
  price?: string
  pros: string[]
  cons: string[]
  verdict?: string
  badge?: string
}

interface ComparisonTableProps {
  products: Product[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
        />
      ))}
      <span className="ml-1.5 text-sm font-medium text-[var(--text-primary)]">{rating}/5</span>
    </div>
  )
}

export default function ComparisonTable({ products }: ComparisonTableProps) {
  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 relative"
        >
          {product.badge && (
            <span className="absolute -top-2.5 left-4 px-3 py-0.5 rounded-full bg-brand-blue text-white text-xs font-bold">
              {product.badge}
            </span>
          )}
          <h4 className="font-bold text-[var(--text-primary)] text-base mb-2">{product.name}</h4>
          <StarRating rating={product.rating} />
          {product.price && (
            <p className="text-brand-blue font-semibold text-sm mt-2">{product.price}</p>
          )}

          <div className="mt-4 space-y-3">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Pros</span>
              </div>
              <ul className="space-y-1">
                {product.pros.map((pro, i) => (
                  <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-1.5">
                    <span className="text-emerald-500 mt-0.5">+</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <ThumbsDown className="w-3.5 h-3.5 text-red-400" />
                <span className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-wide">Cons</span>
              </div>
              <ul className="space-y-1">
                {product.cons.map((con, i) => (
                  <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-1.5">
                    <span className="text-red-400 mt-0.5">−</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {product.verdict && (
            <p className="mt-4 pt-3 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)] italic">
              {product.verdict}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
