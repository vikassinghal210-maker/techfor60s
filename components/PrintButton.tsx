'use client'

import { trackDownload } from '@/lib/ga-events'

export default function PrintButton() {
  return (
    <button
      onClick={() => {
        trackDownload(document.title)
        window.print()
      }}
      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-lg font-medium hover:opacity-90 transition-opacity print:hidden"
    >
      🖨️ Print This Guide
    </button>
  )
}
