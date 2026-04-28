import { MetadataRoute } from 'next'

const allowAll = { allow: '/', disallow: ['/api/'] }

const aiCrawlers = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'Amazonbot',
  'Bytespider',
  'cohere-ai',
  'DuckAssistBot',
  'meta-externalagent',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', ...allowAll },
      { userAgent: 'Googlebot', ...allowAll },
      { userAgent: 'Bingbot', ...allowAll },
      ...aiCrawlers.map((ua) => ({ userAgent: ua, ...allowAll })),
    ],
    sitemap: ['https://techfor60s.com/sitemap.xml'],
    host: 'https://techfor60s.com',
  }
}
