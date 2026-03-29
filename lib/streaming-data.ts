// ── Streaming Service Data ────────────────────────────────────────────────────

export interface StreamingService {
  slug: string
  name: string
  monthlyPrice: number
  annualPrice?: number
  hasAds: boolean
  adFreePrice?: number
  channels: string[]
  features: string[]
  bestFor: string
  url: string
}

export const STREAMING_SERVICES: StreamingService[] = [
  {
    slug: 'netflix',
    name: 'Netflix',
    monthlyPrice: 6.99,
    hasAds: true,
    adFreePrice: 15.49,
    channels: ['Netflix Originals'],
    features: ['Huge movie & TV library', 'Award-winning originals', 'Easy to use', 'Download shows to watch offline', 'Multiple profiles'],
    bestFor: 'Movies, TV dramas, and documentaries',
    url: 'https://www.netflix.com',
  },
  {
    slug: 'hulu',
    name: 'Hulu',
    monthlyPrice: 7.99,
    hasAds: true,
    adFreePrice: 17.99,
    channels: ['ABC', 'NBC', 'Fox', 'FX', 'Hulu Originals'],
    features: ['Next-day TV episodes', 'Live TV option available', 'Great TV show library', 'Bundleable with Disney+'],
    bestFor: 'Watching current TV shows the next day',
    url: 'https://www.hulu.com',
  },
  {
    slug: 'disney-plus',
    name: 'Disney+',
    monthlyPrice: 7.99,
    hasAds: true,
    adFreePrice: 13.99,
    channels: ['Disney', 'Pixar', 'Marvel', 'Star Wars', 'National Geographic'],
    features: ['Family-friendly content', 'Classic Disney movies', 'Download for offline', 'GroupWatch feature'],
    bestFor: 'Family movies and watching with grandchildren',
    url: 'https://www.disneyplus.com',
  },
  {
    slug: 'amazon-prime',
    name: 'Amazon Prime Video',
    monthlyPrice: 8.99,
    annualPrice: 139,
    hasAds: true,
    adFreePrice: 11.98,
    channels: ['Amazon Originals', 'MGM'],
    features: ['Included with Prime membership', 'Free shipping on Amazon', 'Large rental library', 'Thursday Night Football'],
    bestFor: 'People who already shop on Amazon',
    url: 'https://www.amazon.com/prime',
  },
  {
    slug: 'youtube-tv',
    name: 'YouTube TV',
    monthlyPrice: 72.99,
    hasAds: true,
    channels: ['ABC', 'CBS', 'NBC', 'Fox', 'ESPN', 'CNN', 'HGTV', 'Food Network', '100+ channels'],
    features: ['Live TV with unlimited DVR', 'All major networks', 'Sports channels', 'No contracts', 'Watch on any device'],
    bestFor: 'Replacing cable TV completely — live sports, news, and shows',
    url: 'https://tv.youtube.com',
  },
  {
    slug: 'sling-tv',
    name: 'Sling TV',
    monthlyPrice: 40.00,
    hasAds: true,
    channels: ['ESPN', 'CNN', 'HGTV', 'Food Network', 'AMC', 'TNT', 'TBS'],
    features: ['Cheapest live TV option', 'Customizable channel packs', '50 hours DVR', 'No contracts'],
    bestFor: 'Budget-friendly live TV with sports and news',
    url: 'https://www.sling.com',
  },
  {
    slug: 'peacock',
    name: 'Peacock',
    monthlyPrice: 7.99,
    hasAds: true,
    adFreePrice: 13.99,
    channels: ['NBC', 'Bravo', 'Peacock Originals'],
    features: ['NBC shows next day', 'Classic TV shows', 'Sunday Night Football', 'Some free content'],
    bestFor: 'NBC fans and classic TV show lovers',
    url: 'https://www.peacocktv.com',
  },
  {
    slug: 'paramount-plus',
    name: 'Paramount+',
    monthlyPrice: 5.99,
    hasAds: true,
    adFreePrice: 11.99,
    channels: ['CBS', 'BET', 'Comedy Central', 'MTV', 'Nickelodeon', 'Paramount Originals'],
    features: ['CBS shows live and next-day', 'NFL on CBS', 'Classic movies', 'Star Trek franchise'],
    bestFor: 'CBS viewers and classic movie fans',
    url: 'https://www.paramountplus.com',
  },
  {
    slug: 'fubo',
    name: 'Fubo',
    monthlyPrice: 79.99,
    hasAds: true,
    channels: ['ABC', 'CBS', 'NBC', 'Fox', 'ESPN', 'beIN Sports', '180+ channels'],
    features: ['Best for live sports', '1000 hours DVR', '180+ channels', 'Multiview for sports'],
    bestFor: 'Sports fans who want extensive live sports coverage',
    url: 'https://www.fubo.tv',
  },
]

export function getService(slug: string): StreamingService | undefined {
  return STREAMING_SERVICES.find(s => s.slug === slug)
}

export function getServicesByPrice(): StreamingService[] {
  return [...STREAMING_SERVICES].sort((a, b) => a.monthlyPrice - b.monthlyPrice)
}
