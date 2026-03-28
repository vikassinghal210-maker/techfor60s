'use client'

import { AlertTriangle, Info, Lightbulb, ShieldAlert } from 'lucide-react'

const VARIANTS = {
  tip: {
    icon: Lightbulb,
    border: 'border-emerald-400 dark:border-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    title: 'Tip',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-amber-400 dark:border-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    title: 'Warning',
  },
  info: {
    icon: Info,
    border: 'border-blue-400 dark:border-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    title: 'Good to Know',
  },
  danger: {
    icon: ShieldAlert,
    border: 'border-red-400 dark:border-red-500',
    bg: 'bg-red-50 dark:bg-red-950/30',
    iconColor: 'text-red-600 dark:text-red-400',
    title: 'Important',
  },
} as const

interface CalloutProps {
  type?: keyof typeof VARIANTS
  title?: string
  children: React.ReactNode
}

export default function Callout({ type = 'tip', title, children }: CalloutProps) {
  const v = VARIANTS[type]
  const Icon = v.icon

  return (
    <div className={`my-6 rounded-xl border-l-4 ${v.border} ${v.bg} p-4 sm:p-5`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${v.iconColor}`} />
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm mb-1 ${v.iconColor}`}>
            {title ?? v.title}
          </p>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed [&>p]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
