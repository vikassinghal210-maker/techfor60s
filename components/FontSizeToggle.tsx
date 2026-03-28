'use client'

import { useEffect, useState } from 'react'

export default function FontSizeToggle() {
  const [isLarge, setIsLarge] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('techfor60s-large-text')
    if (stored === 'true') {
      setIsLarge(true)
      document.documentElement.classList.add('large-text')
    }
  }, [])

  function toggle() {
    const next = !isLarge
    setIsLarge(next)
    if (next) {
      document.documentElement.classList.add('large-text')
      localStorage.setItem('techfor60s-large-text', 'true')
    } else {
      document.documentElement.classList.remove('large-text')
      localStorage.setItem('techfor60s-large-text', 'false')
    }
  }

  return (
    <button
      onClick={toggle}
      className="px-3 py-1.5 text-sm font-bold border-2 border-brand-blue text-brand-blue rounded-md hover:bg-brand-blue hover:text-white transition-colors"
      aria-label={isLarge ? 'Use normal text size' : 'Use larger text size'}
      title={isLarge ? 'Normal text' : 'Larger text'}
    >
      {isLarge ? 'A' : 'A+'}
    </button>
  )
}
