'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-brand-dark" />
      )}
    </button>
  )
}
