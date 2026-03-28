'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100))
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  if (progress === 0) return null

  return <div className="reading-progress" style={{ width: `${progress}%` }} />
}
