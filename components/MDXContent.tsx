'use client'

import { useEffect, useRef } from 'react'

interface MDXContentProps {
  html: string
}

export default function MDXContent({ html }: MDXContentProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    // Add smooth scroll behavior to anchor links
    const links = ref.current.querySelectorAll('a[href^="#"]')
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const id = link.getAttribute('href')?.slice(1)
        if (id) {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })
  }, [html])

  return (
    <div
      ref={ref}
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
