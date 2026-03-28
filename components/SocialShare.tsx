'use client'

import { useState } from 'react'
import { Globe, Share2, Mail, Link2, Check, MessageCircle } from 'lucide-react'

interface SocialShareProps {
  url: string
  title: string
}

export default function SocialShare({ url, title }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Globe,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-[#1877F2] hover:text-white',
    },
    {
      name: 'X (Twitter)',
      icon: Share2,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-[#1DA1F2] hover:text-white',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-[#25D366] hover:text-white',
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=I thought you might find this helpful: ${encodedUrl}`,
      color: 'hover:bg-brand-blue hover:text-white',
    },
  ]

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input')
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-[var(--text-muted)] mr-1">Share:</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] transition-all ${link.color}`}
          aria-label={`Share on ${link.name}`}
        >
          <link.icon className="w-4 h-4" />
        </a>
      ))}
      <button
        onClick={copyLink}
        className={`w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center transition-all ${copied ? 'bg-brand-green text-white border-brand-green' : 'text-[var(--text-muted)] hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  )
}
