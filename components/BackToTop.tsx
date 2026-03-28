'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-brand-blue text-white shadow-lg hover:bg-blue-800 transition-colors flex items-center justify-center"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
