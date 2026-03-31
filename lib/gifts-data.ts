// ── Gift Product Database for TechFor60s Gift Finder ──────────────────────────

export interface GiftProduct {
  slug: string
  name: string
  price: string
  priceNum: number
  priceRange: 'under-25' | 'under-50' | 'under-100' | 'under-200' | 'over-200'
  category:
    | 'smartphones'
    | 'tablets'
    | 'smart-home'
    | 'wearables'
    | 'accessories'
    | 'entertainment'
    | 'safety'
    | 'comfort'
  occasions: string[]
  techLevel: 'non-techy' | 'beginner' | 'comfortable'
  interests: string[]
  description: string
  whyGreat: string
  thumbnail: string
  rating: number
  seniorFriendly: number
}

export interface Occasion {
  slug: string
  label: string
  emoji: string
  description: string
}

export interface PriceRange {
  slug: string
  label: string
}

export interface Interest {
  slug: string
  label: string
}

export interface TechLevel {
  slug: string
  label: string
  description: string
}

// ── Occasions ─────────────────────────────────────────────────────────────────

export const OCCASIONS: Occasion[] = [
  {
    slug: 'christmas',
    label: 'Christmas',
    emoji: '🎄',
    description:
      'The best tech gifts to put under the tree for the seniors in your life.',
  },
  {
    slug: 'birthday',
    label: 'Birthday',
    emoji: '🎂',
    description:
      'Thoughtful tech gifts that make birthdays extra special for older adults.',
  },
  {
    slug: 'mothers-day',
    label: "Mother's Day",
    emoji: '💐',
    description:
      'Show Mom you care with tech gifts that keep her connected and entertained.',
  },
  {
    slug: 'fathers-day',
    label: "Father's Day",
    emoji: '👔',
    description:
      'Practical and fun tech gifts Dad will actually use and enjoy every day.',
  },
  {
    slug: 'retirement',
    label: 'Retirement',
    emoji: '🎉',
    description:
      'Help them start this exciting new chapter with tech that opens up new possibilities.',
  },
  {
    slug: 'grandparents-day',
    label: "Grandparents' Day",
    emoji: '👴👵',
    description:
      'Tech gifts that help grandparents stay connected with the whole family.',
  },
  {
    slug: 'valentines',
    label: "Valentine's Day",
    emoji: '❤️',
    description:
      'Loving tech gifts for the special senior in your life.',
  },
  {
    slug: 'any',
    label: 'Any Occasion',
    emoji: '🎁',
    description:
      'Great tech gifts for seniors that work for any occasion or just because.',
  },
]

// ── Price Ranges ──────────────────────────────────────────────────────────────

export const PRICE_RANGES: PriceRange[] = [
  { slug: 'under-25', label: 'Under $25' },
  { slug: 'under-50', label: 'Under $50' },
  { slug: 'under-100', label: 'Under $100' },
  { slug: 'under-200', label: 'Under $200' },
  { slug: 'over-200', label: '$200 & Up' },
]

// ── Interests ─────────────────────────────────────────────────────────────────

export const INTERESTS: Interest[] = [
  { slug: 'reading', label: 'Reading' },
  { slug: 'photography', label: 'Photography' },
  { slug: 'video-calls', label: 'Video Calls' },
  { slug: 'music', label: 'Music' },
  { slug: 'gardening', label: 'Gardening' },
  { slug: 'cooking', label: 'Cooking' },
  { slug: 'fitness', label: 'Fitness' },
  { slug: 'travel', label: 'Travel' },
  { slug: 'games', label: 'Games' },
]

// ── Tech Levels ───────────────────────────────────────────────────────────────

export const TECH_LEVELS: TechLevel[] = [
  {
    slug: 'non-techy',
    label: 'Not Techy At All',
    description: 'Prefers simple devices with minimal setup and few buttons.',
  },
  {
    slug: 'beginner',
    label: 'Beginner',
    description:
      'Knows the basics like making calls and sending texts, but still learning.',
  },
  {
    slug: 'comfortable',
    label: 'Comfortable with Tech',
    description:
      'Uses a smartphone or tablet regularly and is open to trying new gadgets.',
  },
]

// ── Product Database ──────────────────────────────────────────────────────────

export const GIFTS: GiftProduct[] = [
  // ── Smartphones ─────────────────────────────────────────────────────────
  {
    slug: 'iphone-se-4',
    name: 'iPhone SE (4th Gen)',
    price: '$429',
    priceNum: 429,
    priceRange: 'over-200',
    category: 'smartphones',
    occasions: ['christmas', 'birthday', 'retirement', 'any'],
    techLevel: 'beginner',
    interests: ['photography', 'video-calls', 'travel'],
    description:
      'The most affordable iPhone with a familiar design that seniors love. It has a great camera, long battery life, and the simplicity of iOS that makes it easy for anyone to use. Face ID means no fumbling with passwords.',
    whyGreat: 'All the iPhone goodness at a price that won\'t break the bank.',
    thumbnail:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 4,
  },
  {
    slug: 'iphone-16',
    name: 'iPhone 16',
    price: '$799',
    priceNum: 799,
    priceRange: 'over-200',
    category: 'smartphones',
    occasions: ['christmas', 'birthday', 'retirement'],
    techLevel: 'comfortable',
    interests: ['photography', 'video-calls', 'travel', 'fitness'],
    description:
      'Apple\'s flagship phone with an incredible camera, bright display, and all-day battery. The large, vivid screen makes reading texts and viewing photos a joy. Crash Detection and Emergency SOS give families peace of mind.',
    whyGreat: 'The best iPhone experience with safety features the whole family appreciates.',
    thumbnail:
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 4,
  },
  {
    slug: 'samsung-galaxy-a16',
    name: 'Samsung Galaxy A16',
    price: '$199',
    priceNum: 199,
    priceRange: 'under-200',
    category: 'smartphones',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'beginner',
    interests: ['video-calls', 'photography'],
    description:
      'An excellent budget Android phone with Samsung\'s Easy Mode, which simplifies the home screen with large icons and bigger text. The big 6.7-inch display is perfect for reading, and the camera takes surprisingly good photos.',
    whyGreat: 'Samsung Easy Mode makes this the friendliest Android for beginners.',
    thumbnail:
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'google-pixel-8a',
    name: 'Google Pixel 8a',
    price: '$349',
    priceNum: 349,
    priceRange: 'over-200',
    category: 'smartphones',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'beginner',
    interests: ['photography', 'video-calls', 'travel'],
    description:
      'Google\'s mid-range phone punches well above its weight with an amazing camera powered by AI. The clean Android interface is easy to navigate, and seven years of updates mean it will last a long time.',
    whyGreat: 'The best camera in its price range and a beautifully simple interface.',
    thumbnail:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 4,
  },
  {
    slug: 'jitterbug-smart4',
    name: 'Lively Jitterbug Smart4',
    price: '$149',
    priceNum: 149,
    priceRange: 'under-200',
    category: 'smartphones',
    occasions: ['christmas', 'birthday', 'mothers-day', 'fathers-day', 'any'],
    techLevel: 'non-techy',
    interests: ['video-calls'],
    description:
      'Designed specifically for seniors with an extra-large, simple interface, big buttons, and a built-in urgent response button. No confusing app stores or complicated settings. It just works the way a phone should.',
    whyGreat: 'Built from the ground up for seniors who want simplicity above all else.',
    thumbnail:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },

  // ── Tablets ─────────────────────────────────────────────────────────────
  {
    slug: 'ipad-10th-gen',
    name: 'iPad (10th Generation)',
    price: '$349',
    priceNum: 349,
    priceRange: 'over-200',
    category: 'tablets',
    occasions: ['christmas', 'birthday', 'retirement', 'grandparents-day'],
    techLevel: 'beginner',
    interests: ['reading', 'video-calls', 'games', 'photography'],
    description:
      'The standard iPad is perfect for seniors who want a big, bright screen for video calls, reading, and browsing. The 10.9-inch display is large enough to see clearly, and the battery lasts all day.',
    whyGreat: 'The ideal tablet for FaceTiming grandkids and reading the morning news.',
    thumbnail:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 4,
  },
  {
    slug: 'amazon-fire-hd-10',
    name: 'Amazon Fire HD 10',
    price: '$139',
    priceNum: 139,
    priceRange: 'under-200',
    category: 'tablets',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'non-techy',
    interests: ['reading', 'video-calls', 'games', 'music'],
    description:
      'An incredibly affordable tablet with a big 10.1-inch screen. Perfect for streaming shows, video calls, and casual browsing. Alexa is built right in, so they can just ask for the weather, set reminders, or play music by voice.',
    whyGreat: 'Big screen entertainment and Alexa at a price that can\'t be beat.',
    thumbnail:
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 4,
  },
  {
    slug: 'samsung-galaxy-tab-a9-plus',
    name: 'Samsung Galaxy Tab A9+',
    price: '$219',
    priceNum: 219,
    priceRange: 'over-200',
    category: 'tablets',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'beginner',
    interests: ['reading', 'video-calls', 'games'],
    description:
      'A versatile Android tablet with a gorgeous 11-inch display. Samsung\'s Easy Mode works on tablets too, so you get large icons and simplified menus. Great for watching shows, video calls, and browsing.',
    whyGreat: 'Samsung Easy Mode on a beautiful large screen makes everything easy to see.',
    thumbnail:
      'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 4,
  },

  // ── E-Readers ───────────────────────────────────────────────────────────
  {
    slug: 'kindle-paperwhite',
    name: 'Kindle Paperwhite',
    price: '$149',
    priceNum: 149,
    priceRange: 'under-200',
    category: 'entertainment',
    occasions: ['christmas', 'birthday', 'mothers-day', 'retirement', 'any'],
    techLevel: 'non-techy',
    interests: ['reading'],
    description:
      'The best e-reader for seniors with its glare-free screen that reads like real paper. Adjustable font sizes from tiny to extra-large, warm light for nighttime reading, and weeks of battery life. Holds thousands of books.',
    whyGreat: 'Like holding a real book, but with adjustable text size and a built-in library.',
    thumbnail:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 5,
  },
  {
    slug: 'kindle-scribe',
    name: 'Kindle Scribe',
    price: '$339',
    priceNum: 339,
    priceRange: 'over-200',
    category: 'entertainment',
    occasions: ['christmas', 'retirement', 'birthday'],
    techLevel: 'beginner',
    interests: ['reading'],
    description:
      'A premium e-reader with a large 10.2-inch screen and included stylus for handwriting notes. The bigger display is much easier on the eyes, and you can write directly on the screen like a notebook.',
    whyGreat: 'The largest, easiest-to-read Kindle with the joy of handwritten notes.',
    thumbnail:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 4,
  },

  // ── Smart Home ──────────────────────────────────────────────────────────
  {
    slug: 'echo-show-8',
    name: 'Amazon Echo Show 8',
    price: '$149',
    priceNum: 149,
    priceRange: 'under-200',
    category: 'smart-home',
    occasions: ['christmas', 'birthday', 'grandparents-day', 'any'],
    techLevel: 'non-techy',
    interests: ['video-calls', 'music', 'cooking'],
    description:
      'A smart display that makes video calls effortless - just say "Alexa, call [name]" and you are connected. It shows the weather, plays music, displays family photos, and can even guide you through recipes step by step.',
    whyGreat: 'Video calls, music, and reminders all controlled by your voice alone.',
    thumbnail:
      'https://images.unsplash.com/photo-1543512214-318228f8b590?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 5,
  },
  {
    slug: 'echo-show-15',
    name: 'Amazon Echo Show 15',
    price: '$249',
    priceNum: 249,
    priceRange: 'over-200',
    category: 'smart-home',
    occasions: ['christmas', 'retirement', 'any'],
    techLevel: 'beginner',
    interests: ['video-calls', 'cooking', 'music'],
    description:
      'A large 15.6-inch smart display that can mount on the wall like a digital family hub. Shows calendars, reminders, family photos in a slideshow, and streams shows. The big screen makes video calls feel more natural.',
    whyGreat: 'A digital family hub that keeps schedules, photos, and video calls all in one place.',
    thumbnail:
      'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 4,
  },
  {
    slug: 'google-nest-hub-2',
    name: 'Google Nest Hub (2nd Gen)',
    price: '$99',
    priceNum: 99,
    priceRange: 'under-100',
    category: 'smart-home',
    occasions: ['christmas', 'birthday', 'grandparents-day', 'any'],
    techLevel: 'non-techy',
    interests: ['music', 'cooking', 'video-calls'],
    description:
      'A compact smart display with a 7-inch screen perfect for the kitchen or bedside table. Google Assistant answers questions, plays music, shows recipes, and can even track sleep. Doubles as a great digital photo frame.',
    whyGreat: 'The easiest smart display to set up - just plug in and start talking.',
    thumbnail:
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'google-nest-hub-max',
    name: 'Google Nest Hub Max',
    price: '$229',
    priceNum: 229,
    priceRange: 'over-200',
    category: 'smart-home',
    occasions: ['christmas', 'grandparents-day', 'any'],
    techLevel: 'beginner',
    interests: ['video-calls', 'music', 'cooking'],
    description:
      'Google\'s largest smart display with a 10-inch screen and built-in camera for video calls. Face Match recognizes who is in the room and shows personalized info. Incredible speakers make music sound wonderful.',
    whyGreat: 'The best Google video calling experience with a screen big enough to enjoy.',
    thumbnail:
      'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 4,
  },
  {
    slug: 'amazon-echo-dot-5',
    name: 'Amazon Echo Dot (5th Gen)',
    price: '$49',
    priceNum: 49,
    priceRange: 'under-50',
    category: 'smart-home',
    occasions: ['christmas', 'birthday', 'grandparents-day', 'any'],
    techLevel: 'non-techy',
    interests: ['music'],
    description:
      'The simplest way to add voice control to any room. Ask Alexa for the weather, set medication reminders, make hands-free calls, play music, or control smart plugs. No screen, no fuss, just your voice.',
    whyGreat: 'Hands-free help for under $50 - set reminders, play music, make calls.',
    thumbnail:
      'https://images.unsplash.com/photo-1512446816042-444d641267d4?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'smart-plug-2-pack',
    name: 'Amazon Smart Plug (2-Pack)',
    price: '$24',
    priceNum: 24,
    priceRange: 'under-25',
    category: 'smart-home',
    occasions: ['christmas', 'any'],
    techLevel: 'non-techy',
    interests: [],
    description:
      'Turn any lamp or appliance into a smart device. Control lights with your voice or set schedules so the porch light turns on at sunset. Works perfectly with Alexa or Google Assistant. No hub required.',
    whyGreat: 'Turn lights on and off with your voice - no more fumbling in the dark.',
    thumbnail:
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'ring-video-doorbell',
    name: 'Ring Video Doorbell',
    price: '$99',
    priceNum: 99,
    priceRange: 'under-100',
    category: 'smart-home',
    occasions: ['christmas', 'fathers-day', 'any'],
    techLevel: 'beginner',
    interests: [],
    description:
      'See and talk to visitors from your phone or Echo Show without getting up. Motion alerts let you know when someone is at the door. Adds a real sense of security, especially for seniors living alone.',
    whyGreat: 'See who is at the door without getting up - peace of mind in a doorbell.',
    thumbnail:
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 4,
  },

  // ── Wearables ───────────────────────────────────────────────────────────
  {
    slug: 'apple-watch-se',
    name: 'Apple Watch SE (2nd Gen)',
    price: '$249',
    priceNum: 249,
    priceRange: 'over-200',
    category: 'wearables',
    occasions: ['christmas', 'birthday', 'mothers-day', 'fathers-day', 'retirement'],
    techLevel: 'beginner',
    interests: ['fitness', 'travel'],
    description:
      'An affordable Apple Watch with fall detection, emergency SOS, and heart rate monitoring. It tracks walks and workouts, shows notifications on your wrist, and can even detect car crashes and call for help.',
    whyGreat: 'Fall detection and emergency SOS that could genuinely save a life.',
    thumbnail:
      'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 4,
  },
  {
    slug: 'apple-watch-ultra',
    name: 'Apple Watch Series 10',
    price: '$399',
    priceNum: 399,
    priceRange: 'over-200',
    category: 'wearables',
    occasions: ['christmas', 'retirement', 'birthday'],
    techLevel: 'comfortable',
    interests: ['fitness', 'travel'],
    description:
      'Apple\'s latest watch with the biggest, brightest display yet. Blood oxygen monitoring, ECG, temperature sensing, and sleep tracking. The thinnest Apple Watch ever is comfortable enough to wear all day and night.',
    whyGreat: 'Advanced health monitoring on your wrist with the largest, easiest-to-read display.',
    thumbnail:
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 3,
  },
  {
    slug: 'fitbit-inspire-3',
    name: 'Fitbit Inspire 3',
    price: '$99',
    priceNum: 99,
    priceRange: 'under-100',
    category: 'wearables',
    occasions: ['christmas', 'birthday', 'mothers-day', 'fathers-day', 'any'],
    techLevel: 'non-techy',
    interests: ['fitness'],
    description:
      'A slim, lightweight fitness tracker that counts steps, monitors heart rate, and tracks sleep without being complicated. The color touchscreen is easy to read, and the battery lasts up to 10 days. Works with both iPhone and Android.',
    whyGreat: 'Simple step and heart rate tracking with a 10-day battery life.',
    thumbnail:
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'fitbit-sense-2',
    name: 'Fitbit Sense 2',
    price: '$199',
    priceNum: 199,
    priceRange: 'under-200',
    category: 'wearables',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'beginner',
    interests: ['fitness'],
    description:
      'Fitbit\'s most advanced health smartwatch with stress management, ECG, skin temperature sensing, and blood oxygen monitoring. The large, bright screen is easy to read, and Google Assistant is built in for voice control.',
    whyGreat: 'Comprehensive health tracking that works seamlessly with both iPhone and Android.',
    thumbnail:
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 4,
  },

  // ── Safety ──────────────────────────────────────────────────────────────
  {
    slug: 'medical-guardian-mini',
    name: 'Medical Guardian Mini',
    price: '$149',
    priceNum: 149,
    priceRange: 'under-200',
    category: 'safety',
    occasions: ['christmas', 'mothers-day', 'fathers-day', 'any'],
    techLevel: 'non-techy',
    interests: [],
    description:
      'A discreet medical alert pendant with GPS tracking and fall detection. Press the button or let automatic fall detection call for help 24/7. Works anywhere with cellular service - no landline needed.',
    whyGreat: 'One-button access to emergency help, anywhere, anytime.',
    thumbnail:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 5,
  },
  {
    slug: 'tile-mate-4-pack',
    name: 'Tile Mate Tracker (4-Pack)',
    price: '$54',
    priceNum: 54,
    priceRange: 'under-100',
    category: 'safety',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'non-techy',
    interests: [],
    description:
      'Never lose keys, wallets, or bags again. Attach a Tile to anything you tend to misplace and find it with your phone. The loud ring makes finding lost items a breeze. Works with both iPhone and Android.',
    whyGreat: 'Stop searching for lost keys and wallets - find them with one tap.',
    thumbnail:
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'apple-airtag-4-pack',
    name: 'Apple AirTag (4-Pack)',
    price: '$99',
    priceNum: 99,
    priceRange: 'under-100',
    category: 'safety',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'beginner',
    interests: ['travel'],
    description:
      'Apple\'s tiny trackers help you find keys, bags, and even luggage while traveling. Drop one in a suitcase and track it worldwide. The whole Apple network helps locate your items. Works beautifully with iPhone.',
    whyGreat: 'Never lose luggage or keys again - the entire Apple network helps you find them.',
    thumbnail:
      'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 4,
  },

  // ── Entertainment ───────────────────────────────────────────────────────
  {
    slug: 'roku-streaming-stick-4k',
    name: 'Roku Streaming Stick 4K',
    price: '$49',
    priceNum: 49,
    priceRange: 'under-50',
    category: 'entertainment',
    occasions: ['christmas', 'birthday', 'retirement', 'any'],
    techLevel: 'non-techy',
    interests: ['music'],
    description:
      'The simplest way to stream Netflix, Hulu, and thousands of other channels on any TV. The remote has dedicated buttons for popular services - no confusing menus. Just plug it in and start watching.',
    whyGreat: 'The easiest streaming device with a remote anyone can figure out.',
    thumbnail:
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 5,
  },
  {
    slug: 'apple-tv-4k',
    name: 'Apple TV 4K',
    price: '$129',
    priceNum: 129,
    priceRange: 'under-200',
    category: 'entertainment',
    occasions: ['christmas', 'birthday', 'retirement'],
    techLevel: 'beginner',
    interests: ['music', 'fitness'],
    description:
      'The premium streaming experience with stunning picture quality and a simple Siri remote. If they have an iPhone, it works seamlessly together. Apple Fitness+ workouts are perfect for staying active at home.',
    whyGreat: 'The best streaming quality with Siri voice control and Apple Fitness+.',
    thumbnail:
      'https://images.unsplash.com/photo-1528928441742-b4ccac1bb04c?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 4,
  },
  {
    slug: 'bose-soundlink-flex',
    name: 'Bose SoundLink Flex',
    price: '$149',
    priceNum: 149,
    priceRange: 'under-200',
    category: 'entertainment',
    occasions: ['christmas', 'birthday', 'fathers-day', 'retirement', 'any'],
    techLevel: 'non-techy',
    interests: ['music'],
    description:
      'A rugged, portable Bluetooth speaker with rich, room-filling sound. Waterproof and drop-proof, so it can go anywhere - the garden, kitchen, or patio. Battery lasts 12 hours and it pairs with any phone in seconds.',
    whyGreat: 'Rich, beautiful sound anywhere in the house or garden - pairs in seconds.',
    thumbnail:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 5,
  },
  {
    slug: 'jbl-clip-4',
    name: 'JBL Clip 4',
    price: '$79',
    priceNum: 79,
    priceRange: 'under-100',
    category: 'entertainment',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'non-techy',
    interests: ['music', 'gardening'],
    description:
      'A tiny, clip-on Bluetooth speaker that attaches to a belt loop, bag, or chair. Surprisingly powerful sound for its size, waterproof, and lasts 10 hours. Perfect for listening to music while gardening or walking.',
    whyGreat: 'Clip it anywhere and enjoy music on the go - waterproof and pocket-sized.',
    thumbnail:
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5 Headphones',
    price: '$349',
    priceNum: 349,
    priceRange: 'over-200',
    category: 'entertainment',
    occasions: ['christmas', 'fathers-day', 'retirement'],
    techLevel: 'beginner',
    interests: ['music', 'travel'],
    description:
      'Industry-leading noise-canceling headphones that make music, audiobooks, and phone calls crystal clear. Incredibly comfortable for long listening sessions. Perfect for travel or tuning out a noisy environment.',
    whyGreat: 'World-class noise canceling that makes music and calls absolutely crystal clear.',
    thumbnail:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 3,
  },
  {
    slug: 'airpods-pro-2',
    name: 'Apple AirPods Pro 2',
    price: '$249',
    priceNum: 249,
    priceRange: 'over-200',
    category: 'entertainment',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'beginner',
    interests: ['music', 'travel', 'fitness'],
    description:
      'Apple\'s best earbuds with noise canceling, hearing aid features, and a hearing test built right in. They pair instantly with any Apple device. The hearing health features are a game-changer for seniors.',
    whyGreat: 'Noise canceling earbuds that double as over-the-counter hearing aids.',
    thumbnail:
      'https://images.unsplash.com/photo-1588423771073-b8903fde1c68?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 3,
  },
  {
    slug: 'digital-photo-frame-10',
    name: 'Skylight 10-inch Digital Photo Frame',
    price: '$159',
    priceNum: 159,
    priceRange: 'under-200',
    category: 'entertainment',
    occasions: ['christmas', 'birthday', 'mothers-day', 'grandparents-day', 'valentines'],
    techLevel: 'non-techy',
    interests: ['photography'],
    description:
      'Family members email photos directly to the frame - that is it. Grandma just plugs it in, connects to WiFi once, and new photos from the family appear like magic. No apps to download, no accounts to manage.',
    whyGreat: 'Family photos appear magically - just plug in and connect to WiFi.',
    thumbnail:
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 5,
  },
  {
    slug: 'aura-carver-frame',
    name: 'Aura Carver Digital Photo Frame',
    price: '$179',
    priceNum: 179,
    priceRange: 'under-200',
    category: 'entertainment',
    occasions: ['christmas', 'mothers-day', 'grandparents-day', 'valentines'],
    techLevel: 'non-techy',
    interests: ['photography'],
    description:
      'A beautiful digital frame with a widescreen display that shows two portrait photos side by side. Family members share photos through the free Aura app. Unlimited storage means every memory has a place.',
    whyGreat: 'Stunning display quality that makes family photos look like works of art.',
    thumbnail:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },

  // ── Accessories ─────────────────────────────────────────────────────────
  {
    slug: 'tablet-stand-adjustable',
    name: 'Lamicall Adjustable Tablet Stand',
    price: '$15',
    priceNum: 15,
    priceRange: 'under-25',
    category: 'accessories',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'non-techy',
    interests: ['reading', 'video-calls', 'cooking'],
    description:
      'A sturdy, adjustable stand that holds any tablet or phone at the perfect angle. No more holding the device during long video calls or propping it against a cereal box in the kitchen. Folds flat for storage.',
    whyGreat: 'Hands-free viewing at any angle - no more tired arms during video calls.',
    thumbnail:
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'phone-stand-wireless-charger',
    name: 'Anker Wireless Charging Stand',
    price: '$15',
    priceNum: 15,
    priceRange: 'under-25',
    category: 'accessories',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'non-techy',
    interests: [],
    description:
      'Just set the phone down and it charges - no fumbling with cables. The stand keeps the phone at an easy-to-see angle while charging. Perfect for a nightstand or desk. Works with any wireless charging phone.',
    whyGreat: 'No more plugging in cables - just set the phone down and it charges.',
    thumbnail:
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'large-button-remote',
    name: 'Flipper Big Button Remote',
    price: '$29',
    priceNum: 29,
    priceRange: 'under-50',
    category: 'accessories',
    occasions: ['christmas', 'birthday', 'grandparents-day', 'any'],
    techLevel: 'non-techy',
    interests: [],
    description:
      'A universal remote with only the essential buttons, all oversized and clearly labeled. Controls up to two devices (TV and cable/streaming box). No more searching through 50 buttons for the volume. Simple as it gets.',
    whyGreat: 'Only the buttons you need, big enough to see and press without frustration.',
    thumbnail:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'stylus-pen-universal',
    name: 'Meko Universal Stylus Pen (2-Pack)',
    price: '$14',
    priceNum: 14,
    priceRange: 'under-25',
    category: 'accessories',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'non-techy',
    interests: ['reading', 'games'],
    description:
      'For seniors who find touchscreens fiddly, a stylus makes tapping small buttons much easier. These work on any phone or tablet with no charging or pairing. The fine tip gives precise control.',
    whyGreat: 'Makes touchscreens easy to use for anyone who finds tapping with fingers tricky.',
    thumbnail:
      'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'magnifying-glass-led',
    name: 'MagniPros LED Magnifying Glass',
    price: '$19',
    priceNum: 19,
    priceRange: 'under-25',
    category: 'accessories',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'non-techy',
    interests: ['reading'],
    description:
      'A large 4.5-inch lens with built-in LED lights that makes reading small print, medicine labels, and menus effortless. Three brightness settings and a lightweight design for comfortable use. Battery powered.',
    whyGreat: 'Read the fine print on anything with bright, even illumination.',
    thumbnail:
      'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'ipad-keyboard-case',
    name: 'Logitech Combo Touch iPad Case',
    price: '$159',
    priceNum: 159,
    priceRange: 'under-200',
    category: 'accessories',
    occasions: ['christmas', 'retirement', 'any'],
    techLevel: 'beginner',
    interests: ['reading'],
    description:
      'A protective iPad case with a detachable backlit keyboard and built-in trackpad. Turn the iPad into a mini laptop for writing emails or browsing. The case also works as a stand at multiple angles.',
    whyGreat: 'Turn an iPad into a laptop - perfect for seniors who miss a real keyboard.',
    thumbnail:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 4,
  },
  {
    slug: 'phone-case-grip',
    name: 'OtterBox Symmetry+ with MagSafe',
    price: '$49',
    priceNum: 49,
    priceRange: 'under-50',
    category: 'accessories',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'non-techy',
    interests: [],
    description:
      'A slim but protective phone case with antimicrobial coating. The raised edges protect the screen from drops, and MagSafe compatibility means easy wireless charging. Available in attractive colors.',
    whyGreat: 'Drop protection without the bulk - keeps the phone safe and looking good.',
    thumbnail:
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'screen-magnifier',
    name: 'Phone Screen Magnifier 12"',
    price: '$22',
    priceNum: 22,
    priceRange: 'under-25',
    category: 'accessories',
    occasions: ['christmas', 'birthday', 'grandparents-day', 'any'],
    techLevel: 'non-techy',
    interests: ['reading'],
    description:
      'A folding magnifier that makes any smartphone screen appear 2-3x larger. No batteries or setup needed - just place the phone behind it. Great for watching videos, reading articles, or following along with video calls.',
    whyGreat: 'Makes any phone screen 2-3x bigger instantly - no batteries needed.',
    thumbnail:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop',
    rating: 3,
    seniorFriendly: 5,
  },

  // ── Comfort ─────────────────────────────────────────────────────────────
  {
    slug: 'robot-vacuum-roomba',
    name: 'iRobot Roomba j7+',
    price: '$599',
    priceNum: 599,
    priceRange: 'over-200',
    category: 'comfort',
    occasions: ['christmas', 'retirement', 'any'],
    techLevel: 'beginner',
    interests: [],
    description:
      'A smart robot vacuum that maps your home and avoids obstacles like pet bowls and cords. It empties itself into a base station that holds 60 days of dirt. Schedule it from your phone or just say "Alexa, vacuum."',
    whyGreat: 'Clean floors without lifting a finger - it even empties itself.',
    thumbnail:
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 4,
  },
  {
    slug: 'robot-vacuum-eufy',
    name: 'eufy RoboVac 11S',
    price: '$159',
    priceNum: 159,
    priceRange: 'under-200',
    category: 'comfort',
    occasions: ['christmas', 'retirement', 'any'],
    techLevel: 'non-techy',
    interests: [],
    description:
      'An affordable robot vacuum that is super quiet (about as loud as a microwave) and cleans hardwood and carpet effectively. One button to start, auto-returns to charge. No app or WiFi required - just press the button.',
    whyGreat: 'The simplest robot vacuum - one button, whisper-quiet, no app needed.',
    thumbnail:
      'https://images.unsplash.com/photo-1603618090554-0b9f57014a5b?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'heated-blanket-smart',
    name: 'Sunbeam Quilted Heated Blanket',
    price: '$89',
    priceNum: 89,
    priceRange: 'under-100',
    category: 'comfort',
    occasions: ['christmas', 'birthday', 'valentines', 'any'],
    techLevel: 'non-techy',
    interests: ['reading'],
    description:
      'A cozy heated blanket with 10 heat settings and auto-shutoff for safety. The controller has large, easy-to-read numbers. Machine washable and incredibly soft. Perfect for reading or watching TV on chilly evenings.',
    whyGreat: 'Stay warm and cozy with simple controls and an important auto-shutoff feature.',
    thumbnail:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'sunrise-alarm-clock',
    name: 'Philips SmartSleep Wake-Up Light',
    price: '$109',
    priceNum: 109,
    priceRange: 'under-200',
    category: 'comfort',
    occasions: ['christmas', 'birthday', 'any'],
    techLevel: 'non-techy',
    interests: [],
    description:
      'Wakes you gently with a simulated sunrise that gradually fills the room with light over 30 minutes. Much nicer than a jarring alarm. Also works as a bedside lamp with natural sunset simulation for falling asleep.',
    whyGreat: 'Wake up naturally with a gentle simulated sunrise instead of a loud alarm.',
    thumbnail:
      'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },

  // ── More Smart Home & Kitchen ──────────────────────────────────────────
  {
    slug: 'instant-pot-duo',
    name: 'Instant Pot Duo 6 Qt',
    price: '$89',
    priceNum: 89,
    priceRange: 'under-100',
    category: 'comfort',
    occasions: ['christmas', 'mothers-day', 'retirement', 'any'],
    techLevel: 'non-techy',
    interests: ['cooking'],
    description:
      'A 7-in-1 electric pressure cooker that replaces multiple kitchen appliances. Large, clearly labeled buttons make it easy to use. Makes soups, stews, rice, and yogurt with one-touch presets. The safety features are excellent.',
    whyGreat: 'One-touch cooking that turns anyone into a great chef - safe and simple.',
    thumbnail:
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 4,
  },
  {
    slug: 'garden-sensor',
    name: 'ThermoPro Indoor/Outdoor Thermometer',
    price: '$12',
    priceNum: 12,
    priceRange: 'under-25',
    category: 'comfort',
    occasions: ['christmas', 'fathers-day', 'any'],
    techLevel: 'non-techy',
    interests: ['gardening'],
    description:
      'A simple wireless thermometer with a large, high-contrast display showing indoor and outdoor temperature and humidity. Place the outdoor sensor in the garden and check conditions from inside. No app or WiFi needed.',
    whyGreat: 'See outdoor temperature from your armchair - perfect for garden planning.',
    thumbnail:
      'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'tile-slim-wallet',
    name: 'Tile Slim (Wallet Finder)',
    price: '$29',
    priceNum: 29,
    priceRange: 'under-50',
    category: 'safety',
    occasions: ['christmas', 'fathers-day', 'birthday', 'any'],
    techLevel: 'non-techy',
    interests: ['travel'],
    description:
      'Thin as a credit card, it slides right into a wallet or passport holder. Ring it from your phone to find a misplaced wallet, or use it to find your phone by pressing the Tile button twice. Three-year battery life.',
    whyGreat: 'Slides into any wallet to make losing it a thing of the past.',
    thumbnail:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'emergency-radio',
    name: 'Midland Emergency Crank Radio',
    price: '$39',
    priceNum: 39,
    priceRange: 'under-50',
    category: 'safety',
    occasions: ['christmas', 'fathers-day', 'any'],
    techLevel: 'non-techy',
    interests: [],
    description:
      'A weather radio that receives NOAA emergency alerts with multiple power options: hand crank, solar panel, or USB. Built-in flashlight and phone charger. No batteries or internet required during a power outage.',
    whyGreat: 'Stay informed during emergencies - works even when the power is out.',
    thumbnail:
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 5,
  },
  {
    slug: 'blood-pressure-monitor',
    name: 'Omron Platinum Blood Pressure Monitor',
    price: '$74',
    priceNum: 74,
    priceRange: 'under-100',
    category: 'safety',
    occasions: ['christmas', 'mothers-day', 'fathers-day', 'any'],
    techLevel: 'non-techy',
    interests: ['fitness'],
    description:
      'A clinically accurate blood pressure monitor with a large, easy-to-read display. Stores readings for two users and syncs with a smartphone app (optional). The wide-range cuff fits most arm sizes comfortably.',
    whyGreat: 'Hospital-grade accuracy at home with a display big enough to read easily.',
    thumbnail:
      'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 5,
  },
  {
    slug: 'pill-organizer-smart',
    name: 'Hero Smart Pill Dispenser',
    price: '$99',
    priceNum: 99,
    priceRange: 'under-100',
    category: 'safety',
    occasions: ['christmas', 'mothers-day', 'fathers-day', 'any'],
    techLevel: 'non-techy',
    interests: [],
    description:
      'An automatic pill dispenser that sorts, stores, and dispenses medications on schedule. Sends alerts to family members if a dose is missed. Holds up to a 90-day supply of up to 10 different medications.',
    whyGreat: 'Never miss or double up on medications - alerts the family if needed.',
    thumbnail:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    rating: 5,
    seniorFriendly: 5,
  },
  {
    slug: 'smart-lock-august',
    name: 'August Wi-Fi Smart Lock',
    price: '$179',
    priceNum: 179,
    priceRange: 'under-200',
    category: 'smart-home',
    occasions: ['christmas', 'fathers-day', 'any'],
    techLevel: 'beginner',
    interests: [],
    description:
      'A smart lock that fits over your existing deadbolt - no replacing hardware. Unlock the door with your phone, set it to auto-lock behind you, and give virtual keys to family. See who comes and goes from your phone.',
    whyGreat: 'Never fumble with keys again - the door unlocks as you approach.',
    thumbnail:
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop',
    rating: 4,
    seniorFriendly: 3,
  },
]

// ── Helper Functions ──────────────────────────────────────────────────────────

export function getGiftsByOccasion(occasionSlug: string): GiftProduct[] {
  if (occasionSlug === 'any') {
    return GIFTS
  }
  return GIFTS.filter((g) => g.occasions.includes(occasionSlug))
}

export function getGiftsByPriceRange(rangeSlug: string): GiftProduct[] {
  return GIFTS.filter((g) => g.priceRange === rangeSlug)
}

export function getGiftsByInterest(interestSlug: string): GiftProduct[] {
  return GIFTS.filter((g) => g.interests.includes(interestSlug))
}

export function getGiftsByTechLevel(levelSlug: string): GiftProduct[] {
  return GIFTS.filter((g) => g.techLevel === levelSlug)
}

export function getGiftBySlug(slug: string): GiftProduct | undefined {
  return GIFTS.find((g) => g.slug === slug)
}

export function filterGifts(filters: {
  occasion?: string
  priceRange?: string
  techLevel?: string
  interests?: string[]
}): GiftProduct[] {
  let results = [...GIFTS]

  if (filters.occasion && filters.occasion !== 'any') {
    results = results.filter((g) => g.occasions.includes(filters.occasion!))
  }

  if (filters.priceRange) {
    results = results.filter((g) => g.priceRange === filters.priceRange)
  }

  if (filters.techLevel) {
    results = results.filter((g) => g.techLevel === filters.techLevel)
  }

  if (filters.interests && filters.interests.length > 0) {
    results = results.filter((g) =>
      filters.interests!.some((interest) => g.interests.includes(interest))
    )
  }

  return results.sort((a, b) => b.rating - a.rating)
}
