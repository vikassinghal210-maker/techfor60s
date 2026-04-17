#!/usr/bin/env node
// Convert FAQ pattern from Eleanor's batch (**Q: ?** / A:) to techfor60s H3 format
// for the FAQ extractor in lib/seo.ts (expects ## Frequently Asked Questions + ### Question + plain answer).

import fs from 'node:fs'
import path from 'node:path'

const SLUGS = [
  'akshaya-tritiya-gold-scam-guide-2026',
  'upi-scam-guide-for-indian-seniors',
  'summer-travel-booking-scams-2026',
  'mothers-day-gifting-scams-2026',
  'aadhaar-otp-phishing-protection-guide',
  'simplify-your-phone-30-minutes-senior-guide',
  'deepfake-video-scam-detection-for-seniors',
  'password-manager-setup-walkthrough-1password-bitwarden',
  'two-factor-authentication-setup-for-seniors',
  'ai-assistant-comparison-for-seniors-2026',
  'tech-gift-setup-service-for-grandparents',
  'ios-18-5-update-what-changed-for-seniors',
  'whatsapp-april-2026-update-whats-new-for-seniors',
  'post-retirement-tech-consolidation-guide',
  'claude-ai-for-seniors-plain-english-guide',
]

const BLOG_DIR = path.join('content', 'blog')

function convert(text) {
  // 1. Rename heading: ## FAQ -> ## Frequently Asked Questions
  let out = text.replace(/^## FAQ\s*$/m, '## Frequently Asked Questions')

  // 2. Convert **Q: question?**\nA: answer blocks to ### question?\n\nanswer
  // Pattern: **Q: ... ?** on one line, next non-empty line starts with A:
  out = out.replace(
    /^\*\*Q:\s*(.+?)\*\*\s*\nA:\s*(.+?)(?=\n\n\*\*Q:|\n\n## |\n\n> |\n*$)/gms,
    (_m, q, a) => {
      const question = q.trim()
      const answer = a.trim()
      return `### ${question}\n\n${answer}`
    }
  )

  return out
}

let totalConverted = 0
let totalSkipped = 0

for (const slug of SLUGS) {
  const file = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) {
    console.log(`SKIP (missing): ${slug}`)
    totalSkipped++
    continue
  }
  const before = fs.readFileSync(file, 'utf8')
  const after = convert(before)
  if (before === after) {
    console.log(`NO-CHANGE: ${slug}`)
    totalSkipped++
    continue
  }
  fs.writeFileSync(file, after)
  const qsBefore = (before.match(/^\*\*Q:/gm) || []).length
  const qsAfter = (after.match(/^### .+\?$/gm) || []).length
  console.log(`CONVERTED: ${slug} (${qsBefore} Q blocks -> ${qsAfter} H3 questions)`)
  totalConverted++
}

console.log(`\nDone. Converted: ${totalConverted}, Skipped: ${totalSkipped}`)
