'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

interface FeedbackWidgetProps {
  slug: string
}

export default function FeedbackWidget({ slug }: FeedbackWidgetProps) {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null)

  const handleFeedback = (value: 'yes' | 'no') => {
    setFeedback(value)
    try {
      const stored = JSON.parse(localStorage.getItem('article-feedback') || '{}')
      stored[slug] = value
      localStorage.setItem('article-feedback', JSON.stringify(stored))
    } catch {
      // Ignore storage errors
    }
  }

  if (feedback) {
    return (
      <div className="card p-6 text-center">
        <p className="text-lg font-semibold text-[var(--text-primary)]">
          {feedback === 'yes' ? 'Glad this helped!' : 'Sorry about that.'}
        </p>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          {feedback === 'yes'
            ? 'Share this guide with someone who might need it too.'
            : 'We\'ll work on making our guides clearer. Thank you for the feedback.'}
        </p>
      </div>
    )
  }

  return (
    <div className="card p-6 text-center">
      <p className="text-lg font-semibold text-[var(--text-primary)] mb-4">
        Was this guide helpful?
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => handleFeedback('yes')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-brand-green text-brand-green font-semibold hover:bg-brand-green hover:text-white transition-all text-lg"
        >
          <ThumbsUp className="w-5 h-5" />
          Yes, it helped
        </button>
        <button
          onClick={() => handleFeedback('no')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-[var(--text-muted)] font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-lg"
        >
          <ThumbsDown className="w-5 h-5" />
          Not quite
        </button>
      </div>
    </div>
  )
}
