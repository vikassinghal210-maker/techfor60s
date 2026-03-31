// ── Phone Plan Data for Senior Phone Plan Comparator ────────────────────────

export interface PhonePlan {
  slug: string
  carrier: string
  carrierSlug: string
  planName: string
  price: string
  priceNum: number
  data: string
  dataNum: number // GB, -1 for unlimited
  talkText: string
  network: string
  seniorSpecific: boolean
  aarpDiscount: boolean
  contractRequired: boolean
  hearingAidCompatible: boolean
  internationalCalling: string
  hotspot: string
  familyPlan: boolean
  perLineWithFamily: string | null
  pros: string[]
  cons: string[]
  bestFor: string
}

export interface Carrier {
  slug: string
  name: string
  logo: string // placeholder path
}

export interface PlanCategory {
  slug: string
  label: string
  description: string
}

export interface CarrierComparison {
  slug: string
  carrier1Slug: string
  carrier2Slug: string
  carrier1Name: string
  carrier2Name: string
}

// ── Plan Categories ─────────────────────────────────────────────────────────

export const PLAN_CATEGORIES: PlanCategory[] = [
  {
    slug: 'cheapest',
    label: 'Best Cheap Plans',
    description:
      'Phone plans under $30/month that still deliver reliable service for everyday calls, texts, and light browsing.',
  },
  {
    slug: 'unlimited-data',
    label: 'Best Unlimited Data Plans',
    description:
      'Never worry about running out of data. These unlimited plans let you browse, stream, and video-call without limits.',
  },
  {
    slug: 'senior-specific',
    label: 'Best Senior-Specific Plans',
    description:
      'Plans designed specifically for people 55 and older, with discounted pricing and simplified options.',
  },
  {
    slug: 'no-contract',
    label: 'Best No-Contract Plans',
    description:
      'No long-term commitment required. Cancel or switch anytime without penalty fees.',
  },
  {
    slug: 'family-plans',
    label: 'Best Family Plans',
    description:
      'Save money by sharing a plan with your spouse or family members. Per-line costs drop significantly.',
  },
  {
    slug: 'hearing-aid-compatible',
    label: 'Best Hearing-Aid Compatible Plans',
    description:
      'Carriers and plans that work well with hearing aids, with phones rated M3/T3 or higher.',
  },
  {
    slug: 'international-calling',
    label: 'Best International Calling Plans',
    description:
      'Stay in touch with family abroad. These plans include free or affordable international calls.',
  },
]

// ── All Phone Plans ─────────────────────────────────────────────────────────

const plans: PhonePlan[] = [
  // ── T-Mobile 55+ Plans ──────────────────────────────────────────────────
  {
    slug: 't-mobile-essentials-55-plus',
    carrier: 'T-Mobile',
    carrierSlug: 't-mobile',
    planName: 'Essentials 55+',
    price: '$27.50/mo per line',
    priceNum: 27.5,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'T-Mobile 5G & 4G LTE',
    seniorSpecific: true,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'Unlimited texting to 215+ countries',
    hotspot: '3G-speed hotspot',
    familyPlan: true,
    perLineWithFamily: '$27.50/line (2 lines)',
    pros: [
      'Very affordable for unlimited data',
      'Includes 5G at no extra cost',
      'No annual contract required',
      'Taxes and fees included in price',
    ],
    cons: [
      'Data may slow during congestion',
      'Only available for 55+ customers',
      'Requires 2 lines for best pricing',
      'Hotspot speeds are limited to 3G',
    ],
    bestFor: 'Couples 55+ who want affordable unlimited data on T-Mobile\'s network',
  },
  {
    slug: 't-mobile-go5g-55-plus',
    carrier: 'T-Mobile',
    carrierSlug: 't-mobile',
    planName: 'Go5G 55+',
    price: '$40/mo per line',
    priceNum: 40,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'T-Mobile 5G & 4G LTE',
    seniorSpecific: true,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'Mexico & Canada included',
    hotspot: '5GB high-speed',
    familyPlan: true,
    perLineWithFamily: '$40/line (2 lines)',
    pros: [
      'Higher-priority data than Essentials',
      '5GB of high-speed hotspot included',
      'Includes Apple TV+ subscription',
      'Roaming in Mexico & Canada at no extra cost',
    ],
    cons: [
      'More expensive than Essentials 55+',
      'Requires 2 lines minimum',
      'Only for customers 55 and older',
      'Limited hotspot data',
    ],
    bestFor: 'Active seniors who travel to Mexico or Canada and want reliable 5G',
  },
  {
    slug: 't-mobile-go5g-plus-55',
    carrier: 'T-Mobile',
    carrierSlug: 't-mobile',
    planName: 'Go5G Plus 55+',
    price: '$55/mo per line',
    priceNum: 55,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'T-Mobile 5G & 4G LTE',
    seniorSpecific: true,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: '15+ high-speed data countries',
    hotspot: '50GB high-speed',
    familyPlan: true,
    perLineWithFamily: '$55/line (2 lines)',
    pros: [
      'Highest priority 5G data',
      '50GB high-speed hotspot',
      'International high-speed data in 15+ countries',
      'Includes Netflix Standard with ads',
    ],
    cons: [
      'Most expensive T-Mobile 55+ plan',
      'May be more than most seniors need',
      'Requires 2 lines for senior pricing',
      'Price adds up for premium features',
    ],
    bestFor: 'Tech-savvy seniors who stream heavily and travel internationally',
  },

  // ── Consumer Cellular ───────────────────────────────────────────────────
  {
    slug: 'consumer-cellular-talk',
    carrier: 'Consumer Cellular',
    carrierSlug: 'consumer-cellular',
    planName: 'Talk',
    price: '$20/mo',
    priceNum: 20,
    data: 'None',
    dataNum: 0,
    talkText: 'Unlimited talk & text',
    network: 'AT&T & T-Mobile networks',
    seniorSpecific: true,
    aarpDiscount: true,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'None',
    hotspot: 'None',
    familyPlan: true,
    perLineWithFamily: '$15/line (2+ lines)',
    pros: [
      'Lowest-cost plan from a senior-focused carrier',
      'AARP members save 5% monthly',
      'US-based customer support',
      'No contract or activation fees',
    ],
    cons: [
      'No data included at all',
      'Cannot browse the internet or use apps',
      'Limited to calls and texts only',
      'Need to upgrade for any online features',
    ],
    bestFor: 'Seniors who only need a phone for calls and texts, nothing else',
  },
  {
    slug: 'consumer-cellular-talk-text-1gb',
    carrier: 'Consumer Cellular',
    carrierSlug: 'consumer-cellular',
    planName: 'Talk, Text & Data (1GB)',
    price: '$25/mo',
    priceNum: 25,
    data: '1GB',
    dataNum: 1,
    talkText: 'Unlimited talk & text',
    network: 'AT&T & T-Mobile networks',
    seniorSpecific: true,
    aarpDiscount: true,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'None',
    hotspot: 'None',
    familyPlan: true,
    perLineWithFamily: '$20/line (2+ lines)',
    pros: [
      'Affordable entry-level data plan',
      'AARP discount available',
      'Enough data for light email and browsing',
      'Excellent customer service reputation',
    ],
    cons: [
      '1GB runs out quickly with photos or video',
      'No hotspot capability',
      'Overage charges if you exceed data',
      'Not enough for streaming or video calls',
    ],
    bestFor: 'Light users who occasionally check email or look something up online',
  },
  {
    slug: 'consumer-cellular-talk-text-5gb',
    carrier: 'Consumer Cellular',
    carrierSlug: 'consumer-cellular',
    planName: 'Talk, Text & Data (5GB)',
    price: '$30/mo',
    priceNum: 30,
    data: '5GB',
    dataNum: 5,
    talkText: 'Unlimited talk & text',
    network: 'AT&T & T-Mobile networks',
    seniorSpecific: true,
    aarpDiscount: true,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'None',
    hotspot: 'None',
    familyPlan: true,
    perLineWithFamily: '$25/line (2+ lines)',
    pros: [
      'Good balance of data and affordability',
      'Enough for daily email, social media, and maps',
      'AARP members save 5%',
      'Easy to upgrade if you need more',
    ],
    cons: [
      'Heavy streaming will use it up fast',
      'No hotspot feature',
      'Taxes and fees are extra',
      'International calling not included',
    ],
    bestFor: 'Moderate users who browse, check social media, and use maps daily',
  },
  {
    slug: 'consumer-cellular-talk-text-10gb',
    carrier: 'Consumer Cellular',
    carrierSlug: 'consumer-cellular',
    planName: 'Talk, Text & Data (10GB)',
    price: '$35/mo',
    priceNum: 35,
    data: '10GB',
    dataNum: 10,
    talkText: 'Unlimited talk & text',
    network: 'AT&T & T-Mobile networks',
    seniorSpecific: true,
    aarpDiscount: true,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'None',
    hotspot: 'None',
    familyPlan: true,
    perLineWithFamily: '$30/line (2+ lines)',
    pros: [
      'Plenty of data for most seniors',
      'Can handle video calls and some streaming',
      'AARP discount brings it under $34/mo',
      'No contract lock-in',
    ],
    cons: [
      'Still not unlimited — need to watch usage',
      'No hotspot',
      'Taxes and fees extra',
      'Streaming video at high quality will eat data',
    ],
    bestFor: 'Active users who video-call grandkids and stream music regularly',
  },
  {
    slug: 'consumer-cellular-unlimited',
    carrier: 'Consumer Cellular',
    carrierSlug: 'consumer-cellular',
    planName: 'Unlimited Talk, Text & Data',
    price: '$50/mo',
    priceNum: 50,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'AT&T & T-Mobile networks',
    seniorSpecific: true,
    aarpDiscount: true,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'None',
    hotspot: '10GB',
    familyPlan: true,
    perLineWithFamily: '$45/line (2+ lines)',
    pros: [
      'Never worry about data limits',
      'Includes 10GB of hotspot',
      'AARP discount available',
      'Stream and browse without counting gigabytes',
    ],
    cons: [
      'More expensive than lower tiers',
      'Data may slow after 50GB in a month',
      'International calling costs extra',
      'Taxes and fees are extra',
    ],
    bestFor: 'Seniors who want worry-free data with the support Consumer Cellular is known for',
  },

  // ── Verizon 55+ ─────────────────────────────────────────────────────────
  {
    slug: 'verizon-unlimited-welcome-55-plus',
    carrier: 'Verizon',
    carrierSlug: 'verizon',
    planName: 'Unlimited Welcome 55+',
    price: '$30/mo per line',
    priceNum: 30,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'Verizon 5G & 4G LTE',
    seniorSpecific: true,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'Mexico & Canada calling included',
    hotspot: 'None',
    familyPlan: true,
    perLineWithFamily: '$30/line (2 lines)',
    pros: [
      'Verizon\'s most reliable network at a discount',
      'Unlimited data with no overage worries',
      'Includes 5G access',
      'Available in areas T-Mobile may not cover',
    ],
    cons: [
      'No hotspot included',
      'Data can be deprioritized during busy times',
      'Requires 2 lines for the 55+ pricing',
      'Premium features (like Disney+) cost extra',
    ],
    bestFor: 'Couples who live in areas with strong Verizon coverage and want dependable service',
  },
  {
    slug: 'verizon-unlimited-plus-55',
    carrier: 'Verizon',
    carrierSlug: 'verizon',
    planName: 'Unlimited Plus 55+',
    price: '$40/mo per line',
    priceNum: 40,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'Verizon 5G & 4G LTE',
    seniorSpecific: true,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'Mexico & Canada included',
    hotspot: '30GB high-speed',
    familyPlan: true,
    perLineWithFamily: '$40/line (2 lines)',
    pros: [
      '30GB of high-speed hotspot',
      'Premium network priority',
      'Includes Disney+ and Hulu bundle',
      'Excellent rural and suburban coverage',
    ],
    cons: [
      'More expensive than Welcome 55+',
      'Must be 55+ to qualify',
      'Limited to 2 lines only',
      'Premium price for premium features',
    ],
    bestFor: 'Seniors who need hotspot for a tablet and want Verizon\'s best network experience',
  },

  // ── Lively (Jitterbug) ─────────────────────────────────────────────────
  {
    slug: 'lively-basic',
    carrier: 'Lively',
    carrierSlug: 'lively',
    planName: 'Lively Basic',
    price: '$15/mo',
    priceNum: 15,
    data: 'None',
    dataNum: 0,
    talkText: '300 minutes, unlimited text',
    network: 'Verizon 4G LTE',
    seniorSpecific: true,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'None',
    hotspot: 'None',
    familyPlan: false,
    perLineWithFamily: null,
    pros: [
      'Most affordable plan for occasional callers',
      'Works with the simple Jitterbug phone',
      'Built-in urgent response button',
      'Hearing-aid compatible phones designed for seniors',
    ],
    cons: [
      'Only 300 minutes per month',
      'No data or internet access',
      'Phone selection is very limited',
      'Minutes can run out quickly for chatty users',
    ],
    bestFor: 'Seniors who want the simplest possible phone for occasional calls',
  },
  {
    slug: 'lively-unlimited',
    carrier: 'Lively',
    carrierSlug: 'lively',
    planName: 'Lively Unlimited',
    price: '$40/mo',
    priceNum: 40,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'Verizon 4G LTE',
    seniorSpecific: true,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'None',
    hotspot: 'None',
    familyPlan: false,
    perLineWithFamily: null,
    pros: [
      'Unlimited everything on Verizon\'s network',
      'Jitterbug phones are extremely easy to use',
      'Urgent response button included',
      'Large buttons and simplified menus',
    ],
    cons: [
      'No hotspot capability',
      'Phone options are basic',
      'No international calling',
      'More expensive than some competitors for basic phones',
    ],
    bestFor: 'Seniors who need an easy-to-use phone with large buttons and unlimited calling',
  },

  // ── Mint Mobile ─────────────────────────────────────────────────────────
  {
    slug: 'mint-mobile-5gb',
    carrier: 'Mint Mobile',
    carrierSlug: 'mint-mobile',
    planName: '5GB Plan',
    price: '$15/mo',
    priceNum: 15,
    data: '5GB',
    dataNum: 5,
    talkText: 'Unlimited talk & text',
    network: 'T-Mobile 5G & 4G LTE',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'Free calls to Mexico & Canada',
    hotspot: '5GB (shared with data)',
    familyPlan: true,
    perLineWithFamily: '$15/line',
    pros: [
      'Extremely affordable at $15/month',
      'Runs on T-Mobile\'s fast 5G network',
      '5GB is plenty for light-to-moderate use',
      'Free hotspot included',
    ],
    cons: [
      'Must pay 3-12 months upfront for best price',
      'Renewal price may be higher',
      'No in-store customer support',
      'Setup requires some tech comfort',
    ],
    bestFor: 'Budget-conscious seniors comfortable with online account management',
  },
  {
    slug: 'mint-mobile-15gb',
    carrier: 'Mint Mobile',
    carrierSlug: 'mint-mobile',
    planName: '15GB Plan',
    price: '$20/mo',
    priceNum: 20,
    data: '15GB',
    dataNum: 15,
    talkText: 'Unlimited talk & text',
    network: 'T-Mobile 5G & 4G LTE',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'Free calls to Mexico & Canada',
    hotspot: '15GB (shared with data)',
    familyPlan: true,
    perLineWithFamily: '$20/line',
    pros: [
      'Great value for 15GB of data',
      '5G speeds included at no extra cost',
      'Plenty of data for streaming and video calls',
      'Hotspot included at no additional cost',
    ],
    cons: [
      'Upfront payment for 3+ months required',
      'Customer service is online/phone only',
      'Not the best for heavy daily streamers',
      'May need tech help for initial SIM setup',
    ],
    bestFor: 'Moderate data users who want an unbeatable price-to-data ratio',
  },
  {
    slug: 'mint-mobile-20gb',
    carrier: 'Mint Mobile',
    carrierSlug: 'mint-mobile',
    planName: '20GB Plan',
    price: '$25/mo',
    priceNum: 25,
    data: '20GB',
    dataNum: 20,
    talkText: 'Unlimited talk & text',
    network: 'T-Mobile 5G & 4G LTE',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'Free calls to Mexico & Canada',
    hotspot: '20GB (shared with data)',
    familyPlan: true,
    perLineWithFamily: '$25/line',
    pros: [
      '20GB covers most people comfortably',
      'Very competitive pricing',
      'Full 5G access included',
      'Good for video calling and music streaming',
    ],
    cons: [
      'Prepaid billing (3-12 months upfront)',
      'No physical stores for support',
      'Not truly unlimited',
      'Setup requires inserting a SIM card',
    ],
    bestFor: 'Seniors who watch videos and video-call regularly but don\'t need unlimited',
  },
  {
    slug: 'mint-mobile-unlimited',
    carrier: 'Mint Mobile',
    carrierSlug: 'mint-mobile',
    planName: 'Unlimited Plan',
    price: '$30/mo',
    priceNum: 30,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'T-Mobile 5G & 4G LTE',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'Free calls to Mexico & Canada',
    hotspot: '10GB high-speed',
    familyPlan: true,
    perLineWithFamily: '$30/line',
    pros: [
      'Cheapest truly unlimited plan available',
      '10GB of high-speed hotspot',
      'Full T-Mobile 5G network access',
      'No annual contract required',
    ],
    cons: [
      'Must prepay 3-12 months',
      'Data slows after 40GB',
      'No in-person customer support',
      'Requires comfort with online setup',
    ],
    bestFor: 'Seniors who want unlimited data at the absolute lowest cost possible',
  },

  // ── AT&T ────────────────────────────────────────────────────────────────
  {
    slug: 'att-value-plus',
    carrier: 'AT&T',
    carrierSlug: 'att',
    planName: 'Value Plus',
    price: '$50/mo',
    priceNum: 50,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'AT&T 5G & 4G LTE',
    seniorSpecific: false,
    aarpDiscount: true,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'Mexico & Canada included',
    hotspot: '5GB high-speed',
    familyPlan: true,
    perLineWithFamily: '$33.99/line (4 lines)',
    pros: [
      'AARP members get monthly discount',
      'Reliable AT&T network coverage',
      '5GB of hotspot data included',
      'Good multi-line family pricing',
    ],
    cons: [
      'More expensive than budget carriers',
      'Data may slow during network congestion',
      'Better deals available at T-Mobile for 55+',
      'Taxes and fees are extra',
    ],
    bestFor: 'AARP members who prefer AT&T\'s network reliability',
  },
  {
    slug: 'att-unlimited-starter',
    carrier: 'AT&T',
    carrierSlug: 'att',
    planName: 'Unlimited Starter',
    price: '$65/mo',
    priceNum: 65,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'AT&T 5G & 4G LTE',
    seniorSpecific: false,
    aarpDiscount: true,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'Mexico & Canada included',
    hotspot: 'None',
    familyPlan: true,
    perLineWithFamily: '$35/line (4 lines)',
    pros: [
      'Full AT&T unlimited experience',
      '5G included at no extra charge',
      'Significant family plan discounts',
      'Strong nationwide coverage',
    ],
    cons: [
      'Expensive for a single line',
      'No hotspot included at this tier',
      'Lower priority data during congestion',
      'Cheaper alternatives exist for similar features',
    ],
    bestFor: 'Families who want AT&T coverage and can split costs across 4 lines',
  },

  // ── Spectrum Mobile ─────────────────────────────────────────────────────
  {
    slug: 'spectrum-mobile-unlimited',
    carrier: 'Spectrum Mobile',
    carrierSlug: 'spectrum-mobile',
    planName: 'Unlimited',
    price: '$30/mo',
    priceNum: 30,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'Verizon 5G & 4G LTE',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'None',
    hotspot: '5GB high-speed',
    familyPlan: true,
    perLineWithFamily: '$30/line',
    pros: [
      'Runs on Verizon\'s reliable network',
      'Very affordable unlimited plan',
      'No extra taxes or fees',
      'Good option if you already have Spectrum internet',
    ],
    cons: [
      'Requires Spectrum internet service',
      'No senior-specific discounts',
      'Limited to Verizon coverage area',
      'Cannot subscribe without Spectrum home internet',
    ],
    bestFor: 'Seniors who already have Spectrum internet and want to bundle savings',
  },
  {
    slug: 'spectrum-mobile-by-the-gig',
    carrier: 'Spectrum Mobile',
    carrierSlug: 'spectrum-mobile',
    planName: 'By the Gig (1GB)',
    price: '$14/mo per GB',
    priceNum: 14,
    data: '1GB',
    dataNum: 1,
    talkText: 'Unlimited talk & text',
    network: 'Verizon 5G & 4G LTE',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'None',
    hotspot: 'Included in data allowance',
    familyPlan: true,
    perLineWithFamily: '$14/line per GB',
    pros: [
      'Only pay for data you actually use',
      'Unlimited talk and text included',
      'Runs on Verizon\'s network',
      'Great for very light data users',
    ],
    cons: [
      'Requires Spectrum internet at home',
      'Costs add up quickly if you use more data',
      'Must track your usage carefully',
      'Not cost-effective for moderate-to-heavy users',
    ],
    bestFor: 'Very light data users who have Spectrum internet and want the lowest possible bill',
  },

  // ── Visible ─────────────────────────────────────────────────────────────
  {
    slug: 'visible-basic',
    carrier: 'Visible',
    carrierSlug: 'visible',
    planName: 'Visible',
    price: '$25/mo',
    priceNum: 25,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'Verizon 5G & 4G LTE',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'None',
    hotspot: '5GB high-speed',
    familyPlan: false,
    perLineWithFamily: null,
    pros: [
      'Unlimited data on Verizon for just $25',
      'Taxes and fees included in price',
      'No contract, cancel anytime',
      '5GB of hotspot data included',
    ],
    cons: [
      'Online-only customer support',
      'Data may slow during peak hours',
      'No physical stores for help',
      'Requires self-service account management',
    ],
    bestFor: 'Tech-comfortable seniors who want Verizon quality at a rock-bottom price',
  },
  {
    slug: 'visible-plus',
    carrier: 'Visible',
    carrierSlug: 'visible',
    planName: 'Visible+',
    price: '$45/mo',
    priceNum: 45,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'Verizon 5G Ultra Wideband',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: '30+ countries included',
    hotspot: '50GB high-speed',
    familyPlan: false,
    perLineWithFamily: null,
    pros: [
      'Premium Verizon 5G Ultra Wideband access',
      '50GB of high-speed hotspot',
      'International calling to 30+ countries',
      'All taxes and fees included',
    ],
    cons: [
      'Pricier than the basic Visible plan',
      'Online-only support',
      'Ultra Wideband only in select areas',
      'No in-person customer assistance',
    ],
    bestFor: 'Seniors with family overseas who want top-tier Verizon performance',
  },

  // ── Google Fi ───────────────────────────────────────────────────────────
  {
    slug: 'google-fi-flexible',
    carrier: 'Google Fi',
    carrierSlug: 'google-fi',
    planName: 'Flexible',
    price: '$20/mo + $10/GB',
    priceNum: 20,
    data: 'Pay per GB ($10/GB)',
    dataNum: 0,
    talkText: 'Unlimited talk & text',
    network: 'T-Mobile & US Cellular',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: '200+ destinations at low rates',
    hotspot: 'Included in data usage',
    familyPlan: true,
    perLineWithFamily: '$15/line + $10/GB',
    pros: [
      'Only pay for data you actually use',
      'Bill is capped at $60/mo per line',
      'Works in 200+ countries automatically',
      'Great for travelers — same rates abroad',
    ],
    cons: [
      'Data costs can add up unexpectedly',
      'Customer support is mostly online',
      'Need a compatible phone',
      'Base price is not the lowest available',
    ],
    bestFor: 'Seniors who travel internationally or use very little data month-to-month',
  },
  {
    slug: 'google-fi-simply-unlimited',
    carrier: 'Google Fi',
    carrierSlug: 'google-fi',
    planName: 'Simply Unlimited',
    price: '$35/mo',
    priceNum: 35,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'T-Mobile 5G & 4G LTE',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'Texts from 200+ countries',
    hotspot: '5GB high-speed',
    familyPlan: true,
    perLineWithFamily: '$25/line (4 lines)',
    pros: [
      'Simple, predictable monthly bill',
      'International texting from 200+ countries',
      '5G included at no extra cost',
      'Good family plan pricing',
    ],
    cons: [
      'No international data included',
      'Online-only customer support',
      'Phone compatibility requirements',
      'Hotspot limited to 5GB',
    ],
    bestFor: 'Seniors who want a simple unlimited plan with international texting ability',
  },

  // ── Straight Talk ───────────────────────────────────────────────────────
  {
    slug: 'straight-talk-silver',
    carrier: 'Straight Talk',
    carrierSlug: 'straight-talk',
    planName: 'Silver Unlimited',
    price: '$30/mo',
    priceNum: 30,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'Verizon, T-Mobile, or AT&T',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'None',
    hotspot: '5GB high-speed',
    familyPlan: false,
    perLineWithFamily: null,
    pros: [
      'Pick your preferred network (Verizon, T-Mobile, or AT&T)',
      'Available at Walmart — easy to find and buy',
      'No credit check required',
      'Straightforward pricing, no hidden fees',
    ],
    cons: [
      'Customer service can be slow',
      'Data slows after first 5GB of high-speed',
      'No senior-specific discounts',
      'In-store support limited to Walmart',
    ],
    bestFor: 'Seniors who want to buy their plan at Walmart and keep things simple',
  },
  {
    slug: 'straight-talk-gold',
    carrier: 'Straight Talk',
    carrierSlug: 'straight-talk',
    planName: 'Gold Unlimited',
    price: '$40/mo',
    priceNum: 40,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'Verizon, T-Mobile, or AT&T',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'Mexico & Canada included',
    hotspot: '10GB high-speed',
    familyPlan: false,
    perLineWithFamily: null,
    pros: [
      '10GB of high-speed hotspot included',
      'Mexico & Canada calling',
      'Network flexibility',
      'Cloud storage included',
    ],
    cons: [
      'No family plan discounts',
      'Customer support is basic',
      'No senior discounts available',
      'Must purchase at Walmart or online',
    ],
    bestFor: 'Individuals who want solid mid-range features without carrier commitment',
  },

  // ── Cricket Wireless ────────────────────────────────────────────────────
  {
    slug: 'cricket-wireless-2gb',
    carrier: 'Cricket Wireless',
    carrierSlug: 'cricket-wireless',
    planName: '2GB Plan',
    price: '$30/mo',
    priceNum: 30,
    data: '2GB',
    dataNum: 2,
    talkText: 'Unlimited talk & text',
    network: 'AT&T 5G & 4G LTE',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'None',
    hotspot: 'None',
    familyPlan: true,
    perLineWithFamily: '$25/line (4 lines)',
    pros: [
      'Runs on AT&T\'s reliable network',
      'Many physical stores for in-person help',
      'No overage charges — data just slows down',
      'Simple flat-rate pricing',
    ],
    cons: [
      '2GB runs out quickly',
      'No hotspot feature',
      'Video streams at lower quality',
      'Better data values exist at competitors',
    ],
    bestFor: 'Seniors who value in-store support on AT&T\'s network with light data needs',
  },
  {
    slug: 'cricket-wireless-10gb',
    carrier: 'Cricket Wireless',
    carrierSlug: 'cricket-wireless',
    planName: '10GB Plan',
    price: '$40/mo',
    priceNum: 40,
    data: '10GB',
    dataNum: 10,
    talkText: 'Unlimited talk & text',
    network: 'AT&T 5G & 4G LTE',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'None',
    hotspot: 'None',
    familyPlan: true,
    perLineWithFamily: '$30/line (4 lines)',
    pros: [
      '10GB handles most daily needs well',
      'AT&T network reliability',
      'Many physical stores nationwide',
      'Data just slows — never overage fees',
    ],
    cons: [
      'No hotspot at this tier',
      'Video streaming quality is capped',
      'No international calling',
      '10GB may not last for heavy users',
    ],
    bestFor: 'Moderate users who want in-person support and AT&T coverage',
  },
  {
    slug: 'cricket-wireless-unlimited',
    carrier: 'Cricket Wireless',
    carrierSlug: 'cricket-wireless',
    planName: 'Unlimited Plan',
    price: '$55/mo',
    priceNum: 55,
    data: 'Unlimited',
    dataNum: -1,
    talkText: 'Unlimited talk & text',
    network: 'AT&T 5G & 4G LTE',
    seniorSpecific: false,
    aarpDiscount: false,
    contractRequired: false,
    hearingAidCompatible: true,
    internationalCalling: 'Mexico & Canada included',
    hotspot: '15GB high-speed',
    familyPlan: true,
    perLineWithFamily: '$32/line (5 lines)',
    pros: [
      '15GB of hotspot data',
      'Mexico & Canada calling and texting',
      'Full AT&T 5G access',
      'Physical stores for easy in-person help',
    ],
    cons: [
      'Video limited to SD quality (480p)',
      'Data deprioritized vs. AT&T postpaid',
      'Higher cost than some MVNOs',
      'No premium streaming perks',
    ],
    bestFor: 'Seniors who want unlimited data with the comfort of walk-in store support',
  },
]

// ── Helper Functions ──────────────────────────────────────────────────────

export function getAllPlans(): PhonePlan[] {
  return plans
}

export function getPlanBySlug(slug: string): PhonePlan | undefined {
  return plans.find((p) => p.slug === slug)
}

export function getPlansByCarrier(carrierSlug: string): PhonePlan[] {
  return plans.filter((p) => p.carrierSlug === carrierSlug)
}

export function getCarriers(): Carrier[] {
  const seen = new Map<string, Carrier>()
  for (const p of plans) {
    if (!seen.has(p.carrierSlug)) {
      seen.set(p.carrierSlug, {
        slug: p.carrierSlug,
        name: p.carrier,
        logo: `/images/carriers/${p.carrierSlug}.png`,
      })
    }
  }
  return Array.from(seen.values())
}

export function getPlansByCategory(categorySlug: string): PhonePlan[] {
  switch (categorySlug) {
    case 'cheapest':
      return plans.filter((p) => p.priceNum <= 30).sort((a, b) => a.priceNum - b.priceNum)
    case 'unlimited-data':
      return plans.filter((p) => p.dataNum === -1).sort((a, b) => a.priceNum - b.priceNum)
    case 'senior-specific':
      return plans.filter((p) => p.seniorSpecific)
    case 'no-contract':
      return plans.filter((p) => !p.contractRequired)
    case 'family-plans':
      return plans.filter((p) => p.familyPlan)
    case 'hearing-aid-compatible':
      return plans.filter((p) => p.hearingAidCompatible)
    case 'international-calling':
      return plans
        .filter((p) => p.internationalCalling !== 'None')
        .sort((a, b) => a.priceNum - b.priceNum)
    default:
      return []
  }
}

// ── Carrier-vs-Carrier Comparison Pairs ─────────────────────────────────

const comparisonPairs: CarrierComparison[] = [
  { slug: 'consumer-cellular-vs-t-mobile', carrier1Slug: 'consumer-cellular', carrier2Slug: 't-mobile', carrier1Name: 'Consumer Cellular', carrier2Name: 'T-Mobile' },
  { slug: 'consumer-cellular-vs-lively', carrier1Slug: 'consumer-cellular', carrier2Slug: 'lively', carrier1Name: 'Consumer Cellular', carrier2Name: 'Lively' },
  { slug: 'consumer-cellular-vs-mint-mobile', carrier1Slug: 'consumer-cellular', carrier2Slug: 'mint-mobile', carrier1Name: 'Consumer Cellular', carrier2Name: 'Mint Mobile' },
  { slug: 'consumer-cellular-vs-verizon', carrier1Slug: 'consumer-cellular', carrier2Slug: 'verizon', carrier1Name: 'Consumer Cellular', carrier2Name: 'Verizon' },
  { slug: 'consumer-cellular-vs-att', carrier1Slug: 'consumer-cellular', carrier2Slug: 'att', carrier1Name: 'Consumer Cellular', carrier2Name: 'AT&T' },
  { slug: 'consumer-cellular-vs-visible', carrier1Slug: 'consumer-cellular', carrier2Slug: 'visible', carrier1Name: 'Consumer Cellular', carrier2Name: 'Visible' },
  { slug: 't-mobile-vs-verizon', carrier1Slug: 't-mobile', carrier2Slug: 'verizon', carrier1Name: 'T-Mobile', carrier2Name: 'Verizon' },
  { slug: 't-mobile-vs-att', carrier1Slug: 't-mobile', carrier2Slug: 'att', carrier1Name: 'T-Mobile', carrier2Name: 'AT&T' },
  { slug: 't-mobile-vs-mint-mobile', carrier1Slug: 't-mobile', carrier2Slug: 'mint-mobile', carrier1Name: 'T-Mobile', carrier2Name: 'Mint Mobile' },
  { slug: 't-mobile-vs-visible', carrier1Slug: 't-mobile', carrier2Slug: 'visible', carrier1Name: 'T-Mobile', carrier2Name: 'Visible' },
  { slug: 'verizon-vs-att', carrier1Slug: 'verizon', carrier2Slug: 'att', carrier1Name: 'Verizon', carrier2Name: 'AT&T' },
  { slug: 'verizon-vs-visible', carrier1Slug: 'verizon', carrier2Slug: 'visible', carrier1Name: 'Verizon', carrier2Name: 'Visible' },
  { slug: 'verizon-vs-lively', carrier1Slug: 'verizon', carrier2Slug: 'lively', carrier1Name: 'Verizon', carrier2Name: 'Lively' },
  { slug: 'mint-mobile-vs-visible', carrier1Slug: 'mint-mobile', carrier2Slug: 'visible', carrier1Name: 'Mint Mobile', carrier2Name: 'Visible' },
  { slug: 'mint-mobile-vs-cricket-wireless', carrier1Slug: 'mint-mobile', carrier2Slug: 'cricket-wireless', carrier1Name: 'Mint Mobile', carrier2Name: 'Cricket Wireless' },
  { slug: 'att-vs-cricket-wireless', carrier1Slug: 'att', carrier2Slug: 'cricket-wireless', carrier1Name: 'AT&T', carrier2Name: 'Cricket Wireless' },
  { slug: 'lively-vs-consumer-cellular', carrier1Slug: 'lively', carrier2Slug: 'consumer-cellular', carrier1Name: 'Lively', carrier2Name: 'Consumer Cellular' },
  { slug: 'google-fi-vs-mint-mobile', carrier1Slug: 'google-fi', carrier2Slug: 'mint-mobile', carrier1Name: 'Google Fi', carrier2Name: 'Mint Mobile' },
  { slug: 'google-fi-vs-visible', carrier1Slug: 'google-fi', carrier2Slug: 'visible', carrier1Name: 'Google Fi', carrier2Name: 'Visible' },
  { slug: 'straight-talk-vs-cricket-wireless', carrier1Slug: 'straight-talk', carrier2Slug: 'cricket-wireless', carrier1Name: 'Straight Talk', carrier2Name: 'Cricket Wireless' },
  { slug: 'straight-talk-vs-mint-mobile', carrier1Slug: 'straight-talk', carrier2Slug: 'mint-mobile', carrier1Name: 'Straight Talk', carrier2Name: 'Mint Mobile' },
  { slug: 'spectrum-mobile-vs-visible', carrier1Slug: 'spectrum-mobile', carrier2Slug: 'visible', carrier1Name: 'Spectrum Mobile', carrier2Name: 'Visible' },
  { slug: 'cricket-wireless-vs-visible', carrier1Slug: 'cricket-wireless', carrier2Slug: 'visible', carrier1Name: 'Cricket Wireless', carrier2Name: 'Visible' },
  { slug: 'consumer-cellular-vs-cricket-wireless', carrier1Slug: 'consumer-cellular', carrier2Slug: 'cricket-wireless', carrier1Name: 'Consumer Cellular', carrier2Name: 'Cricket Wireless' },
  { slug: 'consumer-cellular-vs-google-fi', carrier1Slug: 'consumer-cellular', carrier2Slug: 'google-fi', carrier1Name: 'Consumer Cellular', carrier2Name: 'Google Fi' },
]

export function getCarrierComparisons(): CarrierComparison[] {
  return comparisonPairs
}

export function getComparisonBySlug(slug: string): CarrierComparison | undefined {
  return comparisonPairs.find((c) => c.slug === slug)
}
