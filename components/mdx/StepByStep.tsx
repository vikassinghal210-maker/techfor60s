'use client'

interface StepProps {
  number?: number
  title: string
  children: React.ReactNode
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="relative pl-12 pb-8 last:pb-0">
      {/* Connecting line */}
      <div className="absolute left-[18px] top-10 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800 last:hidden" />
      {/* Step number */}
      <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-bold shadow-sm">
        {number}
      </div>
      {/* Content */}
      <div>
        <h4 className="font-semibold text-[var(--text-primary)] text-base mb-2 mt-0.5">
          {title}
        </h4>
        <div className="text-[var(--text-secondary)] text-sm leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  )
}

interface StepByStepProps {
  children: React.ReactNode
}

export default function StepByStep({ children }: StepByStepProps) {
  // Auto-number steps
  let stepNumber = 0
  const numberedChildren = Array.isArray(children)
    ? children.map((child) => {
        if (child && typeof child === 'object' && 'type' in child && (child.type === Step || child.type?.displayName === 'Step')) {
          stepNumber++
          return { ...child, props: { ...child.props, number: child.props.number ?? stepNumber } }
        }
        return child
      })
    : children

  return (
    <div className="my-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 sm:p-6">
      {numberedChildren}
    </div>
  )
}
