export interface CityResource {
  name: string
  type: 'library' | 'community-center' | 'nonprofit' | 'online'
  description: string
  website: string
  free: boolean
}

export interface CityLibrary {
  name: string
  description: string
}

export interface CityData {
  slug: string
  name: string
  region: string
  country: 'US' | 'UK'
  resources: CityResource[]
  libraries: CityLibrary[]
  tips: string[]
  nearby: string[]
}

export const cities: CityData[] = [
  // ── US Cities ──────────────────────────────────────────────────────────────
  {
    slug: 'new-york',
    name: 'New York',
    region: 'New York, NY',
    country: 'US',
    resources: [
      { name: 'OATS (Older Adults Technology Services)', type: 'nonprofit', description: 'One of the largest senior tech training programs in the US. Offers free classes on smartphones, tablets, internet safety, and telehealth across all five boroughs.', website: '#', free: true },
      { name: 'NYC Department for the Aging — Tech Programs', type: 'community-center', description: 'City-funded digital literacy programs at senior centers throughout Manhattan, Brooklyn, Queens, the Bronx, and Staten Island.', website: '#', free: true },
      { name: 'Senior Planet', type: 'nonprofit', description: 'Free tech classes both in-person at their Exploration Center in Chelsea and online. Covers everything from basic computer skills to social media and creative arts.', website: '#', free: true },
      { name: 'Older Adults Technology Services at Selfhelp', type: 'nonprofit', description: 'Partners with community centers across New York City to provide hands-on tech training for seniors of all skill levels.', website: '#', free: true },
      { name: 'Brooklyn Public Library TechConnect', type: 'library', description: 'Free one-on-one tech help sessions and group classes covering email, video calling, online banking, and smartphone basics.', website: '#', free: true },
    ],
    libraries: [
      { name: 'New York Public Library', description: 'Offers TechConnect one-on-one sessions, computer basics workshops, and digital literacy classes at branches across Manhattan, the Bronx, and Staten Island.' },
      { name: 'Brooklyn Public Library', description: 'Regular tech help sessions for seniors including tablet tutoring, internet basics, and e-reader instruction at dozens of branch locations.' },
      { name: 'Queens Public Library', description: 'Provides Mail-a-Book for homebound seniors plus in-branch tech workshops on using smartphones, setting up email, and video calling family.' },
    ],
    tips: [
      'Many senior centers in NYC offer drop-in tech help hours — call your local center to ask about their schedule.',
      'The NYC ConnectAll program provides free or low-cost internet access for qualifying seniors.',
      'OATS/Senior Planet classes fill up fast — register early at seniorplanet.org for the best selection.',
    ],
    nearby: ['boston', 'philadelphia'],
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    region: 'California, CA',
    country: 'US',
    resources: [
      { name: 'City of LA Department of Aging — Digital Literacy', type: 'community-center', description: 'Free tech training at multipurpose senior centers across Los Angeles, covering tablets, smartphones, and internet basics.', website: '#', free: true },
      { name: 'AARP TEK (Technology Education and Knowledge)', type: 'nonprofit', description: 'Free hands-on technology workshops for adults 50+ at various LA locations, teaching smartphone photography, social media, and online safety.', website: '#', free: true },
      { name: 'Human-I-T', type: 'nonprofit', description: 'Provides refurbished computers and tablets to low-income seniors, along with digital literacy training and affordable internet plans.', website: '#', free: true },
      { name: 'St. Barnabas Senior Services', type: 'nonprofit', description: 'Technology classes and one-on-one tutoring for older adults in the LA area, including help with telehealth and staying connected with family.', website: '#', free: true },
      { name: 'EveryoneOn — LA Chapter', type: 'nonprofit', description: 'Connects seniors with low-cost internet service and free digital literacy resources in underserved Los Angeles neighborhoods.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Los Angeles Public Library', description: 'Offers free computer classes at 73 branch locations, including beginner-friendly sessions on email, web browsing, and using library e-resources.' },
      { name: 'LA County Library', description: 'Provides tech help appointments and group classes on using devices, navigating the internet, and avoiding online scams at branches countywide.' },
    ],
    tips: [
      'LA has an extensive network of senior centers with free tech programs — check laaging.org for locations nearest you.',
      'The Affordable Connectivity Program can help qualifying LA seniors get discounted internet service.',
      'Many LA libraries lend tablets and hotspots you can take home to practice between classes.',
    ],
    nearby: ['san-diego', 'san-jose', 'phoenix'],
  },
  {
    slug: 'chicago',
    name: 'Chicago',
    region: 'Illinois, IL',
    country: 'US',
    resources: [
      { name: 'Chicago Department of Family & Support Services — Senior Tech', type: 'community-center', description: 'Free technology classes at regional senior centers throughout Chicago, teaching basic computer skills, email, and video calling.', website: '#', free: true },
      { name: 'Aspire — Digital Inclusion', type: 'nonprofit', description: 'Offers digital skills training for older adults on the South and West sides of Chicago, including one-on-one tutoring and small group classes.', website: '#', free: true },
      { name: 'Chicago Connected', type: 'community-center', description: 'City program offering free high-speed internet and digital skills training for qualifying households, including senior residents.', website: '#', free: true },
      { name: 'National Able Network — Senior Tech Classes', type: 'nonprofit', description: 'Provides workforce and digital literacy programs for older adults looking to learn new technology skills.', website: '#', free: true },
      { name: 'Catholic Charities of Chicago — Tech for Seniors', type: 'nonprofit', description: 'Volunteer-led technology tutoring for older adults at various parish and community locations across the Chicagoland area.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Chicago Public Library', description: 'Free Cyber Navigator program offers one-on-one tech help at every branch. Staff can assist with smartphones, tablets, email setup, and more.' },
      { name: 'Suburban Library System', description: 'Many suburban Chicago libraries offer dedicated senior tech classes and drop-in help sessions throughout Cook and DuPage counties.' },
    ],
    tips: [
      'Ask about the Chicago Public Library Cyber Navigator program — they offer personalized tech help at every branch, completely free.',
      'Many Chicago Park District senior programs now include basic technology training alongside other activities.',
      'The CTA offers reduced-fare transit for seniors 65+, making it easier to attend classes around the city.',
    ],
    nearby: ['nashville', 'denver'],
  },
  {
    slug: 'houston',
    name: 'Houston',
    region: 'Texas, TX',
    country: 'US',
    resources: [
      { name: 'BakerRipley — Digital Inclusion', type: 'nonprofit', description: 'One of Houston\'s largest social service nonprofits offering free digital literacy classes for seniors, including bilingual (English/Spanish) options.', website: '#', free: true },
      { name: 'Houston Area Agency on Aging', type: 'community-center', description: 'Coordinates technology programs at senior activity centers across the greater Houston area, teaching basics of smartphones and internet use.', website: '#', free: true },
      { name: 'Comp-U-Dopt', type: 'nonprofit', description: 'Provides refurbished computers and free digital literacy training to underserved communities, including seniors in the Houston metro area.', website: '#', free: true },
      { name: 'AARP Houston Chapter — TEK Workshops', type: 'nonprofit', description: 'Regular free workshops teaching older adults how to use tablets, smartphones, social media, and online safety tools.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Houston Public Library', description: 'Offers free Computer Basics classes and Technology Petting Zoo events where seniors can try different devices with staff guidance at branches citywide.' },
      { name: 'Harris County Public Library', description: 'Provides tech classes and one-on-one help sessions for seniors at library branches throughout Harris County.' },
    ],
    tips: [
      'BakerRipley offers tech classes in both English and Spanish — great for bilingual seniors.',
      'Houston summers are hot — look for air-conditioned library and senior center classes to stay comfortable while learning.',
      'Harris Health System offers telehealth tutorials specifically for seniors managing chronic health conditions.',
    ],
    nearby: ['san-antonio', 'dallas', 'austin'],
  },
  {
    slug: 'phoenix',
    name: 'Phoenix',
    region: 'Arizona, AZ',
    country: 'US',
    resources: [
      { name: 'City of Phoenix Human Services — Senior Tech', type: 'community-center', description: 'Free computer and technology classes at Phoenix senior centers, covering basics like email, web browsing, and using a smartphone.', website: '#', free: true },
      { name: 'Arizona SciTech Festival — Senior Programs', type: 'community-center', description: 'Annual events and year-round programs that include technology demonstrations and hands-on learning sessions for older adults.', website: '#', free: true },
      { name: 'Maricopa County Senior Services', type: 'community-center', description: 'Technology assistance programs for adults 60+ at senior centers in the Phoenix metropolitan area, including tablet and smartphone classes.', website: '#', free: true },
      { name: 'AARP Phoenix — TEK Workshops', type: 'nonprofit', description: 'Free technology workshops for adults 50+ covering online safety, social media basics, and smartphone photography.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Phoenix Public Library', description: 'Offers regular Tech Tuesdays and computer basics classes for seniors, plus one-on-one help sessions by appointment at many branches.' },
      { name: 'Maricopa County Library District', description: 'Provides digital literacy workshops and device help sessions at branches across the greater Phoenix area.' },
    ],
    tips: [
      'Phoenix senior centers often have morning tech classes — take advantage of cooler hours, especially in summer.',
      'The Valley Metro reduced-fare program helps seniors get to tech classes affordably across the metro area.',
      'Many Phoenix libraries now lend hotspots and tablets — ask about their tech lending programs.',
    ],
    nearby: ['los-angeles', 'las-vegas', 'denver'],
  },
  {
    slug: 'philadelphia',
    name: 'Philadelphia',
    region: 'Pennsylvania, PA',
    country: 'US',
    resources: [
      { name: 'PHLConnectED', type: 'community-center', description: 'City of Philadelphia program providing free internet and devices to qualifying residents, with digital skills training for seniors.', website: '#', free: true },
      { name: 'Philadelphia Corporation for Aging (PCA)', type: 'nonprofit', description: 'Coordinates tech training programs at senior centers across Philadelphia, from basic computer skills to online health management.', website: '#', free: true },
      { name: 'AARP Philadelphia — TEK Workshops', type: 'nonprofit', description: 'Regular free hands-on technology workshops for adults 50+ at community locations throughout the Philadelphia area.', website: '#', free: true },
      { name: 'Drexel University — Digital Literacy Partnership', type: 'nonprofit', description: 'Community outreach program offering technology education to seniors in partnership with Philadelphia community organizations.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Free Library of Philadelphia', description: 'One of the nation\'s oldest library systems, offering free computer classes, tech help appointments, and digital literacy programs at 54 locations.' },
      { name: 'Philadelphia Hot Spots Program', description: 'Library branches serve as digital literacy hubs with free WiFi, computer access, and staff trained to help seniors navigate technology.' },
    ],
    tips: [
      'The Free Library of Philadelphia offers some of the best free tech training in the country — check their events calendar regularly.',
      'PCA maintains a helpline for seniors needing tech assistance — call them to find classes near your neighborhood.',
      'SEPTA Key Senior fare cards make it affordable to travel to tech classes across the city.',
    ],
    nearby: ['new-york', 'boston'],
  },
  {
    slug: 'san-antonio',
    name: 'San Antonio',
    region: 'Texas, TX',
    country: 'US',
    resources: [
      { name: 'San Antonio Digital Inclusion Alliance', type: 'nonprofit', description: 'City-wide initiative offering free digital literacy training for seniors, including bilingual programs in English and Spanish.', website: '#', free: true },
      { name: 'Alamo Area Agency on Aging', type: 'community-center', description: 'Technology training programs at senior activity centers across the San Antonio region, covering smartphones, tablets, and internet basics.', website: '#', free: true },
      { name: 'SA Digital Connects', type: 'community-center', description: 'City program providing free WiFi access and digital skills workshops for older adults at community centers and public spaces.', website: '#', free: true },
      { name: 'AARP San Antonio — TEK Workshops', type: 'nonprofit', description: 'Free technology education workshops for adults 50+ covering online safety, video calling, and smartphone basics.', website: '#', free: true },
    ],
    libraries: [
      { name: 'San Antonio Public Library', description: 'Offers Bibliotech lending of tablets, free computer classes, and one-on-one tech help at branches across the city.' },
      { name: 'Bexar County BiblioTech', description: 'The nation\'s first all-digital public library, providing free device loans, internet access, and digital literacy programs for seniors.' },
    ],
    tips: [
      'BiblioTech is a unique all-digital library — they lend tablets and e-readers for free, perfect for seniors wanting to practice at home.',
      'Many San Antonio programs offer bilingual tech help in English and Spanish.',
      'VIA Metropolitan Transit offers discounted fares for seniors to reach tech class locations.',
    ],
    nearby: ['houston', 'austin', 'dallas'],
  },
  {
    slug: 'san-diego',
    name: 'San Diego',
    region: 'California, CA',
    country: 'US',
    resources: [
      { name: 'San Diego Futures Foundation', type: 'nonprofit', description: 'Offers free digital literacy classes for seniors including computer basics, internet safety, and using smartphones and tablets effectively.', website: '#', free: true },
      { name: 'Serving Seniors', type: 'nonprofit', description: 'Provides technology workshops and one-on-one tutoring at senior centers in downtown San Diego and surrounding neighborhoods.', website: '#', free: true },
      { name: 'San Diego County Aging & Independence Services', type: 'community-center', description: 'Coordinates technology programs at senior centers throughout San Diego County, from coastal to inland communities.', website: '#', free: true },
      { name: 'OASIS San Diego', type: 'nonprofit', description: 'Lifelong learning programs for adults 50+ including technology courses on tablets, smartphones, and staying safe online.', website: '#', free: true },
    ],
    libraries: [
      { name: 'San Diego Public Library', description: 'Offers free tech help sessions and computer classes at 36 branch locations, including beginner-friendly senior programs.' },
      { name: 'San Diego County Library', description: 'Provides digital literacy workshops, device help sessions, and free WiFi at branches across the county.' },
    ],
    tips: [
      'San Diego Futures Foundation is one of the best free tech training providers in Southern California — check their class schedule online.',
      'Many OASIS classes can be attended in person or via Zoom, giving you flexibility to learn from home.',
      'The San Diego MTS Senior Pass makes transit to classes easy and affordable.',
    ],
    nearby: ['los-angeles', 'phoenix'],
  },
  {
    slug: 'dallas',
    name: 'Dallas',
    region: 'Texas, TX',
    country: 'US',
    resources: [
      { name: 'City of Dallas Senior Services — Tech Programs', type: 'community-center', description: 'Free technology classes at Dallas senior activity centers, covering computer basics, internet use, and staying connected with family online.', website: '#', free: true },
      { name: 'Dallas Area Agency on Aging', type: 'community-center', description: 'Coordinates digital inclusion programs for seniors across Dallas County, connecting older adults with technology training resources.', website: '#', free: true },
      { name: 'AARP Dallas — TEK Workshops', type: 'nonprofit', description: 'Regular free workshops helping adults 50+ learn smartphones, tablets, social media, and online safety at DFW locations.', website: '#', free: true },
      { name: 'United Way of Metropolitan Dallas — Tech Access', type: 'nonprofit', description: 'Connects seniors with digital literacy programs, affordable internet options, and device access across the Dallas-Fort Worth metroplex.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Dallas Public Library', description: 'Offers free computer classes and tech help at 29 branch locations, with dedicated senior-friendly sessions covering email, web browsing, and device basics.' },
      { name: 'Plano Public Library', description: 'Provides regular technology classes for seniors in the northern Dallas suburbs, including smartphone and tablet workshops.' },
    ],
    tips: [
      'Dallas Public Library branches often have morning tech help hours specifically for seniors — call your nearest branch to ask.',
      'DART offers a reduced-fare program for seniors 65+, making it easy to reach classes across the metroplex.',
      'The DFW area has many retirement communities that partner with local nonprofits for on-site tech classes.',
    ],
    nearby: ['houston', 'san-antonio', 'austin'],
  },
  {
    slug: 'san-jose',
    name: 'San Jose',
    region: 'California, CA',
    country: 'US',
    resources: [
      { name: 'City of San Jose Digital Inclusion Program', type: 'community-center', description: 'Provides free digital literacy training and internet access to seniors, with classes in multiple languages including English, Spanish, and Vietnamese.', website: '#', free: true },
      { name: 'Sacred Heart Community Service — Tech Lab', type: 'nonprofit', description: 'Free computer lab and digital skills training for underserved community members including seniors in the San Jose area.', website: '#', free: true },
      { name: 'AARP Silicon Valley — TEK Workshops', type: 'nonprofit', description: 'Free hands-on technology workshops for adults 50+ in the heart of the tech capital, covering smartphones, apps, and online safety.', website: '#', free: true },
      { name: 'Sourcewise (formerly Council on Aging)', type: 'nonprofit', description: 'Connects Santa Clara County seniors with technology programs, including digital skills classes and one-on-one tech support.', website: '#', free: true },
    ],
    libraries: [
      { name: 'San Jose Public Library', description: 'Offers extensive free tech classes at 25 branch locations, including beginner computer skills, smartphone help, and digital literacy in multiple languages.' },
      { name: 'Santa Clara County Library District', description: 'Provides technology workshops and device help sessions for seniors throughout Santa Clara County.' },
    ],
    tips: [
      'San Jose is in the heart of Silicon Valley — many local tech companies sponsor free senior digital literacy events.',
      'The San Jose Public Library offers tech classes in English, Spanish, Vietnamese, and Chinese — ask about multilingual options.',
      'VTA offers senior discounts for transit across the valley, making it easy to reach any library branch or community center.',
    ],
    nearby: ['san-francisco', 'san-diego', 'los-angeles'],
  },
  {
    slug: 'austin',
    name: 'Austin',
    region: 'Texas, TX',
    country: 'US',
    resources: [
      { name: 'Austin Free-Net', type: 'nonprofit', description: 'Provides free digital literacy training for seniors and other underserved Austin residents, with classes on computer basics and internet safety.', website: '#', free: true },
      { name: 'AGE of Central Texas', type: 'nonprofit', description: 'Offers technology programs for older adults including computer basics, smartphone tutorials, and social media workshops at their activity centers.', website: '#', free: true },
      { name: 'City of Austin — Digital Inclusion', type: 'community-center', description: 'City-wide program connecting seniors with free digital skills training, affordable internet, and device access across Austin.', website: '#', free: true },
      { name: 'Goodwill Central Texas — Digital Literacy', type: 'nonprofit', description: 'Free computer classes and job training programs that include technology skills for older adults re-entering the workforce or simply staying connected.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Austin Public Library', description: 'Offers free Technology Training classes at branches across the city, including beginner-friendly sessions on email, smartphones, and online safety.' },
      { name: 'Travis County Community Libraries', description: 'Provides digital literacy workshops and tech help at branch locations serving the greater Austin area.' },
    ],
    tips: [
      'Austin Free-Net has been providing free tech training for over 25 years — they are one of the most experienced programs in Texas.',
      'The Austin Public Library central location has dedicated tech help staff available most days.',
      'Capital Metro offers reduced fares for seniors, making it easy to attend classes around Austin.',
    ],
    nearby: ['san-antonio', 'houston', 'dallas'],
  },
  {
    slug: 'jacksonville',
    name: 'Jacksonville',
    region: 'Florida, FL',
    country: 'US',
    resources: [
      { name: 'ElderSource — Tech Training', type: 'nonprofit', description: 'Area agency on aging serving Northeast Florida seniors with technology workshops, digital literacy classes, and device assistance.', website: '#', free: true },
      { name: 'City of Jacksonville Senior Services', type: 'community-center', description: 'Free technology classes at senior centers across Jacksonville, covering basic computer skills, smartphones, and internet safety.', website: '#', free: true },
      { name: 'United Way of Northeast Florida — Digital Access', type: 'nonprofit', description: 'Connects Jacksonville seniors with digital literacy programs, affordable internet, and technology training resources.', website: '#', free: true },
      { name: 'AARP Jacksonville — TEK Workshops', type: 'nonprofit', description: 'Free technology workshops for adults 50+ covering tablets, smartphones, social media, and staying safe online.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Jacksonville Public Library', description: 'Offers free computer basics classes and one-on-one tech help at 21 branch locations, with staff trained to assist seniors with devices.' },
      { name: 'Beaches Branch Library', description: 'Popular location for senior tech programs, including smartphone workshops and internet basics classes.' },
    ],
    tips: [
      'Jacksonville is geographically the largest city in the US — check for tech classes at the senior center or library branch nearest you.',
      'ElderSource maintains a helpline that can connect you with the right tech training program for your needs.',
      'JTA offers reduced fares for seniors on buses and the Skyway monorail.',
    ],
    nearby: ['miami', 'nashville'],
  },
  {
    slug: 'san-francisco',
    name: 'San Francisco',
    region: 'California, CA',
    country: 'US',
    resources: [
      { name: 'SF Connected — Senior Digital Literacy', type: 'community-center', description: 'City of San Francisco program offering free technology training at senior centers and community hubs across the city.', website: '#', free: true },
      { name: 'Little Brothers — Friends of the Elderly SF', type: 'nonprofit', description: 'Volunteer-led tech tutoring for isolated seniors, including help with video calling, smartphones, and staying connected with loved ones.', website: '#', free: true },
      { name: 'OASIS San Francisco', type: 'nonprofit', description: 'Lifelong learning programs for adults 50+ including technology courses on tablets, smartphones, online safety, and social media.', website: '#', free: true },
      { name: 'Self-Help for the Elderly', type: 'nonprofit', description: 'Provides culturally sensitive tech training for San Francisco\'s diverse senior population, with classes in English, Chinese, and other languages.', website: '#', free: true },
      { name: 'SFDigitalEquity', type: 'community-center', description: 'City initiative ensuring all San Franciscans have access to technology and digital skills training, with targeted senior programs.', website: '#', free: true },
    ],
    libraries: [
      { name: 'San Francisco Public Library', description: 'Offers free Tech Help sessions, computer basics classes, and device workshops at the Main Library and 27 branch locations across the city.' },
      { name: 'The Mix at SFPL', description: 'The library\'s technology and learning center providing hands-on workshops and drop-in tech help sessions.' },
    ],
    tips: [
      'Self-Help for the Elderly offers tech classes in Chinese and other languages — a great resource for multilingual seniors in SF.',
      'SFPL Tech Help sessions are available without an appointment at most branches — just walk in during scheduled hours.',
      'Muni offers free transit for seniors 65+ with a valid Clipper card, making it easy to reach tech classes anywhere in the city.',
    ],
    nearby: ['san-jose', 'los-angeles'],
  },
  {
    slug: 'seattle',
    name: 'Seattle',
    region: 'Washington, WA',
    country: 'US',
    resources: [
      { name: 'Seattle Digital Equity Initiative', type: 'community-center', description: 'City program providing free digital skills training, affordable internet, and device access for seniors and other underserved residents.', website: '#', free: true },
      { name: 'Sound Generations — Tech Training', type: 'nonprofit', description: 'Area agency on aging serving King County seniors with technology workshops, including help with smartphones, tablets, and telehealth.', website: '#', free: true },
      { name: 'Senior Center of West Seattle — Tech Classes', type: 'community-center', description: 'Weekly technology classes taught by patient volunteers, covering everything from basic email to video calling grandchildren.', website: '#', free: true },
      { name: 'AARP Washington — TEK Workshops', type: 'nonprofit', description: 'Free technology workshops for adults 50+ at Seattle-area locations, covering online safety, social media, and smartphone basics.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Seattle Public Library', description: 'Offers free Tech Help appointments, computer basics classes, and device workshops at the Central Library and 26 branch locations.' },
      { name: 'King County Library System', description: 'Provides extensive digital literacy programs including senior-focused tech classes at 50 branches across the greater Seattle area.' },
    ],
    tips: [
      'The Seattle Public Library\'s Tech Help program lets you book one-on-one sessions with a patient tech tutor — great for personalized learning.',
      'Many Seattle senior centers offer rainy-day tech workshops during the wet months — a perfect way to stay active indoors.',
      'King County Metro offers ORCA LIFT reduced fares for qualifying seniors.',
    ],
    nearby: ['portland', 'san-francisco'],
  },
  {
    slug: 'denver',
    name: 'Denver',
    region: 'Colorado, CO',
    country: 'US',
    resources: [
      { name: 'Denver Human Services — Senior Tech Programs', type: 'community-center', description: 'Free technology classes at Denver senior centers, covering computer basics, email, internet safety, and using smartphones.', website: '#', free: true },
      { name: 'Denver Area Agency on Aging', type: 'community-center', description: 'Coordinates technology training and digital inclusion programs for seniors across the Denver metropolitan area.', website: '#', free: true },
      { name: 'AARP Colorado — TEK Workshops', type: 'nonprofit', description: 'Free hands-on technology workshops for adults 50+ at Denver-area locations, covering tablets, smartphones, and online safety.', website: '#', free: true },
      { name: 'Project Angel Heart — Tech for Seniors', type: 'nonprofit', description: 'Partners with local organizations to provide technology training for homebound and chronically ill seniors in the Denver area.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Denver Public Library', description: 'Offers free technology classes and one-on-one help sessions at 26 branch locations, with dedicated senior-friendly programs.' },
      { name: 'Arapahoe Library District', description: 'Provides tech help and digital literacy workshops for seniors in the southern Denver suburbs.' },
    ],
    tips: [
      'Denver Public Library ideaLAB spaces have hands-on technology you can try with staff guidance — great for exploring new devices.',
      'RTD offers a senior discount bus and rail pass for getting to tech classes across the Denver metro.',
      'Many Denver recreation centers offer tech classes alongside their senior programming — check denvergov.org.',
    ],
    nearby: ['phoenix', 'las-vegas', 'chicago'],
  },
  {
    slug: 'boston',
    name: 'Boston',
    region: 'Massachusetts, MA',
    country: 'US',
    resources: [
      { name: 'City of Boston — Age Strong Commission Tech Programs', type: 'community-center', description: 'Free technology training for Boston seniors at community centers and senior sites, covering tablets, smartphones, and internet basics.', website: '#', free: true },
      { name: 'Tech Goes Home', type: 'nonprofit', description: 'Award-winning program providing free devices, internet access, and digital skills training for underserved Boston residents including seniors.', website: '#', free: true },
      { name: 'Boston Senior Home Care — Tech Training', type: 'nonprofit', description: 'Partners with local organizations to provide technology workshops for homebound and community-dwelling seniors across Boston.', website: '#', free: true },
      { name: 'AARP Massachusetts — TEK Workshops', type: 'nonprofit', description: 'Free technology workshops for adults 50+ at Boston-area locations, teaching smartphone basics, online safety, and social media.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Boston Public Library', description: 'One of the nation\'s first public libraries, offering free tech classes, computer access, and digital literacy programs at 25 branch locations.' },
      { name: 'Minuteman Library Network', description: 'Consortium of 41 libraries in the Boston suburbs offering coordinated tech training programs for seniors.' },
    ],
    tips: [
      'Tech Goes Home is one of the best digital inclusion programs in the country — they provide a free device if you complete their training course.',
      'The MBTA offers senior CharlieCard discounts, making it easy to reach tech classes throughout Greater Boston.',
      'Many Boston university students volunteer as tech tutors for seniors — ask at your local senior center about volunteer programs.',
    ],
    nearby: ['new-york', 'philadelphia'],
  },
  {
    slug: 'nashville',
    name: 'Nashville',
    region: 'Tennessee, TN',
    country: 'US',
    resources: [
      { name: 'Nashville Public Library — Digital Literacy', type: 'library', description: 'Extensive digital literacy programming for seniors, including one-on-one tech help, group classes, and device lending programs.', website: '#', free: true },
      { name: 'Tennessee Commission on Aging — Tech Access', type: 'community-center', description: 'State-funded technology programs connecting Nashville seniors with digital skills training and device access.', website: '#', free: true },
      { name: 'AARP Tennessee — TEK Workshops', type: 'nonprofit', description: 'Free technology workshops for adults 50+ at Nashville-area locations, covering smartphones, social media, and online safety.', website: '#', free: true },
      { name: 'United Way of Greater Nashville — Tech Training', type: 'nonprofit', description: 'Connects Nashville seniors with digital literacy programs and affordable internet options through community partnerships.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Nashville Public Library', description: 'Award-winning library system offering free Studio NPL tech classes, digital media workshops, and one-on-one help at branches across Davidson County.' },
      { name: 'Williamson County Public Library', description: 'Offers technology classes and device help for seniors in the Nashville suburbs south of the city.' },
    ],
    tips: [
      'Nashville Public Library\'s Studio NPL spaces offer hands-on tech experiences — including recording studios and 3D printers alongside basic computer classes.',
      'WeGo Public Transit offers reduced fares for seniors 65+ with a valid ID.',
      'Many Nashville churches and community groups offer free tech mentoring for seniors — check local bulletin boards and community newsletters.',
    ],
    nearby: ['chicago', 'jacksonville'],
  },
  {
    slug: 'portland',
    name: 'Portland',
    region: 'Oregon, OR',
    country: 'US',
    resources: [
      { name: 'Free Geek', type: 'nonprofit', description: 'Unique Portland nonprofit offering free refurbished computers, tech classes, and volunteering opportunities where seniors learn by doing.', website: '#', free: true },
      { name: 'Multnomah County Aging, Disability & Veterans Services', type: 'community-center', description: 'Coordinates technology programs for Portland-area seniors, connecting older adults with digital skills training and device access.', website: '#', free: true },
      { name: 'Portland Community College — Senior Tech Classes', type: 'community-center', description: 'Affordable and free technology courses for older adults, including computer basics, internet safety, and smartphone skills.', website: '#', free: true },
      { name: 'AARP Oregon — TEK Workshops', type: 'nonprofit', description: 'Free technology workshops for adults 50+ at Portland locations, covering online safety, social media, and device basics.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Multnomah County Library', description: 'Offers free tech help and computer classes at 19 branch locations, with patient staff trained to help seniors with any device or tech question.' },
      { name: 'Clackamas County Library', description: 'Provides digital literacy workshops and one-on-one tech appointments for seniors in the Portland suburbs.' },
    ],
    tips: [
      'Free Geek is a Portland institution — volunteer for a few hours and you can earn a free refurbished computer to take home.',
      'TriMet offers Honored Citizen fares for seniors 65+, making it affordable to reach tech classes across the metro.',
      'Portland\'s many coffee shops have free WiFi — great for practicing your new tech skills after class.',
    ],
    nearby: ['seattle', 'san-francisco'],
  },
  {
    slug: 'las-vegas',
    name: 'Las Vegas',
    region: 'Nevada, NV',
    country: 'US',
    resources: [
      { name: 'Clark County Social Service — Senior Tech Programs', type: 'community-center', description: 'Free technology classes at senior centers across the Las Vegas valley, covering basic computer skills, smartphones, and internet safety.', website: '#', free: true },
      { name: 'HELP of Southern Nevada — Digital Literacy', type: 'nonprofit', description: 'Connects seniors with technology training, affordable internet options, and device access in the Las Vegas area.', website: '#', free: true },
      { name: 'Nevada Senior Services', type: 'nonprofit', description: 'Provides technology workshops and digital inclusion programs for seniors in Southern Nevada, including one-on-one tutoring.', website: '#', free: true },
      { name: 'AARP Nevada — TEK Workshops', type: 'nonprofit', description: 'Free technology workshops for adults 50+ at Las Vegas locations, covering tablets, smartphones, and online safety.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Las Vegas-Clark County Library District', description: 'Offers free computer classes and tech help at 25 branch locations across the valley, with beginner-friendly sessions for seniors.' },
      { name: 'Henderson Libraries', description: 'Provides digital literacy programs and device assistance for seniors in the Henderson area south of Las Vegas.' },
    ],
    tips: [
      'Las Vegas-Clark County Library District has some of the best free tech training in Nevada — check their online calendar for senior-specific classes.',
      'RTC Southern Nevada offers reduced transit fares for seniors, making it easy to reach classes anywhere in the valley.',
      'Many Las Vegas resort communities offer resident tech classes — check with your HOA or community center.',
    ],
    nearby: ['phoenix', 'los-angeles', 'denver'],
  },
  {
    slug: 'miami',
    name: 'Miami',
    region: 'Florida, FL',
    country: 'US',
    resources: [
      { name: 'Alliance for Aging — Tech Training', type: 'nonprofit', description: 'Area agency on aging serving Miami-Dade and Monroe County seniors with technology workshops, including bilingual English/Spanish programs.', website: '#', free: true },
      { name: 'Miami-Dade County Parks — Senior Tech Programs', type: 'community-center', description: 'Free technology classes at senior activity centers throughout Miami-Dade County, covering smartphones, tablets, and internet basics.', website: '#', free: true },
      { name: 'Urban League of Greater Miami — Digital Inclusion', type: 'nonprofit', description: 'Digital literacy programs for underserved Miami residents including seniors, with device access and internet connectivity support.', website: '#', free: true },
      { name: 'AARP Florida — TEK Workshops', type: 'nonprofit', description: 'Free technology workshops for adults 50+ at Miami-area locations, teaching online safety, video calling, and smartphone use.', website: '#', free: true },
      { name: 'Miami Lighthouse for the Blind — Tech Access', type: 'nonprofit', description: 'Specialized technology training for seniors with vision impairment, including accessible device setup and screen reader instruction.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Miami-Dade Public Library System', description: 'Offers free computer classes and tech help at 49 branch locations, with many programs available in English, Spanish, and Haitian Creole.' },
      { name: 'Broward County Library', description: 'Provides digital literacy workshops and device assistance for seniors in the greater Miami-Fort Lauderdale area.' },
    ],
    tips: [
      'Many Miami tech programs are offered in English, Spanish, and Haitian Creole — ask about multilingual options.',
      'Miami-Dade Transit offers reduced fares and free rides for seniors during off-peak hours.',
      'Florida\'s Department of Elder Affairs can connect you with local tech programs statewide — call their helpline for personalized recommendations.',
    ],
    nearby: ['jacksonville'],
  },
  // ── UK Cities ──────────────────────────────────────────────────────────────
  {
    slug: 'london',
    name: 'London',
    region: 'England, UK',
    country: 'UK',
    resources: [
      { name: 'Age UK London — Digital Skills', type: 'nonprofit', description: 'Free technology classes for older adults across London boroughs, covering tablets, smartphones, internet safety, and video calling.', website: '#', free: true },
      { name: 'Good Things Foundation — Learn My Way', type: 'nonprofit', description: 'National digital inclusion charity offering free online courses and in-person support at community centres throughout London.', website: '#', free: true },
      { name: 'AbilityNet — Tech Support for Older People', type: 'nonprofit', description: 'Free technology support for older and disabled adults, including home visits from trained volunteers who help with device setup and troubleshooting.', website: '#', free: true },
      { name: 'Barclays Digital Eagles', type: 'community-center', description: 'Free digital skills sessions at Barclays branches across London, teaching online banking, internet basics, and staying safe online.', website: '#', free: true },
      { name: 'London Borough Digital Inclusion Hubs', type: 'community-center', description: 'Many London boroughs run dedicated digital inclusion programmes at libraries and community centres — check your local council website.', website: '#', free: true },
    ],
    libraries: [
      { name: 'London Borough Libraries', description: 'Each of London\'s 32 boroughs operates a library network offering free computer access, WiFi, and digital skills classes for older residents.' },
      { name: 'British Library — Digital Learning', description: 'The national library in King\'s Cross offers free digital skills workshops and access to technology resources for all ages.' },
      { name: 'Idea Store (Tower Hamlets)', description: 'Modern library and learning centres in East London offering free technology courses including beginner-friendly classes for seniors.' },
    ],
    tips: [
      'The Freedom Pass gives free travel on buses and Tube for London residents aged 66+, making it easy to attend tech classes anywhere in the capital.',
      'Age UK London operates in nearly every borough — call their helpline to find the nearest digital skills class to you.',
      'Many London libraries now lend tablets and offer free WiFi — ask your local branch about their technology lending programme.',
    ],
    nearby: ['bristol', 'birmingham'],
  },
  {
    slug: 'birmingham',
    name: 'Birmingham',
    region: 'England, UK',
    country: 'UK',
    resources: [
      { name: 'Age UK Birmingham & Sandwell — Digital Skills', type: 'nonprofit', description: 'Free technology classes for older adults in Birmingham, covering tablets, smartphones, video calling, and internet safety.', website: '#', free: true },
      { name: 'Birmingham Voluntary Service Council — Digital Inclusion', type: 'nonprofit', description: 'Coordinates digital skills programmes for older adults across Birmingham, linking seniors with local technology training providers.', website: '#', free: true },
      { name: 'Barclays Digital Eagles — Birmingham', type: 'community-center', description: 'Free digital skills sessions at Birmingham Barclays branches, covering online banking, internet basics, and device help.', website: '#', free: true },
      { name: 'Good Things Foundation — Birmingham Centres', type: 'nonprofit', description: 'Network of Online Centres across Birmingham offering free digital skills support for older adults and other learners.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Library of Birmingham', description: 'One of the largest public libraries in Europe, offering free computer access, digital skills workshops, and one-to-one tech help sessions.' },
      { name: 'Birmingham Community Libraries', description: 'Network of branch libraries across the city offering free technology classes and drop-in digital help sessions for seniors.' },
    ],
    tips: [
      'The Library of Birmingham is a world-class facility with excellent free tech support — well worth a visit even from the suburbs.',
      'National Express West Midlands offers concessionary bus passes for seniors, making it easy to reach classes across the city.',
      'Birmingham has a strong network of community centres offering digital skills — contact Birmingham Voluntary Service Council for a list near you.',
    ],
    nearby: ['london', 'manchester', 'leeds'],
  },
  {
    slug: 'manchester',
    name: 'Manchester',
    region: 'England, UK',
    country: 'UK',
    resources: [
      { name: 'Age UK Manchester — Digital Skills', type: 'nonprofit', description: 'Free technology workshops for older adults in Manchester, covering smartphones, tablets, internet safety, and video calling.', website: '#', free: true },
      { name: 'Manchester Digital Inclusion Network', type: 'community-center', description: 'City-wide partnership connecting older adults with free digital skills training at community venues across Manchester.', website: '#', free: true },
      { name: 'Good Things Foundation — Manchester Centres', type: 'nonprofit', description: 'Headquartered in the North of England, Good Things Foundation supports Online Centres across Greater Manchester offering free digital skills help.', website: '#', free: true },
      { name: 'Barclays Digital Eagles — Manchester', type: 'community-center', description: 'Free digital skills sessions at Manchester Barclays branches, teaching internet basics, online banking, and device help.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Manchester Central Library', description: 'Beautiful Victorian library offering free computer access, digital skills classes, and tech help sessions for all ages.' },
      { name: 'Manchester Community Libraries', description: 'Branch libraries across the city offering regular technology workshops and drop-in digital help for older residents.' },
    ],
    tips: [
      'Manchester\'s bus network is extensive and seniors with a National Bus Pass can travel free — great for reaching tech classes across the city.',
      'Manchester Central Library has been beautifully refurbished and offers some of the best free tech training in the North West.',
      'Many Manchester community centres run evening and weekend tech classes — handy if you have daytime commitments.',
    ],
    nearby: ['liverpool', 'leeds', 'birmingham'],
  },
  {
    slug: 'glasgow',
    name: 'Glasgow',
    region: 'Scotland, UK',
    country: 'UK',
    resources: [
      { name: 'Age Scotland — Digital Skills Glasgow', type: 'nonprofit', description: 'Free technology classes for older adults in Glasgow, covering tablets, smartphones, video calling, and internet safety.', website: '#', free: true },
      { name: 'Glasgow Life — Digital Inclusion', type: 'community-center', description: 'Glasgow\'s culture and sport charity offering free digital skills workshops at community facilities across the city.', website: '#', free: true },
      { name: 'Connecting Scotland', type: 'community-center', description: 'Scottish Government programme providing free devices, data, and digital skills support to digitally excluded people including older adults.', website: '#', free: true },
      { name: 'Good Things Foundation Scotland', type: 'nonprofit', description: 'Network of Online Centres across Glasgow offering free digital skills support for older adults.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Glasgow Life Libraries', description: 'Network of 33 public libraries offering free computer access, WiFi, and digital skills support for older residents.' },
      { name: 'Mitchell Library', description: 'Glasgow\'s largest public library offering free technology workshops and extensive digital resources.' },
    ],
    tips: [
      'The Connecting Scotland programme may provide a free tablet or laptop with data if you qualify — ask at your local library.',
      'Glasgow seniors can use the National Entitlement Card for free bus travel across Scotland.',
      'Glasgow Life runs free tech sessions in community halls and sports centres as well as libraries — check their website for the full schedule.',
    ],
    nearby: ['edinburgh', 'belfast'],
  },
  {
    slug: 'liverpool',
    name: 'Liverpool',
    region: 'England, UK',
    country: 'UK',
    resources: [
      { name: 'Age UK Liverpool & Sefton — Digital Skills', type: 'nonprofit', description: 'Free technology classes for older adults in Liverpool, covering basic computer skills, tablets, and internet safety.', website: '#', free: true },
      { name: 'Liverpool City Council — Digital Inclusion', type: 'community-center', description: 'Council-funded digital inclusion programmes at community centres and libraries across Liverpool for older residents.', website: '#', free: true },
      { name: 'Good Things Foundation — Liverpool Centres', type: 'nonprofit', description: 'Network of Online Centres across Liverpool offering free digital skills training for older adults and other learners.', website: '#', free: true },
      { name: 'Barclays Digital Eagles — Liverpool', type: 'community-center', description: 'Free digital skills sessions at Liverpool Barclays branches, covering online banking, internet basics, and device help.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Liverpool Central Library', description: 'Stunning refurbished library offering free computer access, WiFi, and regular technology workshops for all ages.' },
      { name: 'Liverpool Community Libraries', description: 'Branch libraries across the city offering digital skills classes and drop-in tech help sessions.' },
    ],
    tips: [
      'Liverpool Central Library is a beautiful Grade II listed building with excellent free tech facilities — well worth a visit.',
      'Merseytravel offers concessionary travel for seniors on buses, trains, and ferries across the Liverpool City Region.',
      'Many Liverpool community centres and churches run informal tech help sessions — ask around your local area.',
    ],
    nearby: ['manchester', 'birmingham', 'leeds'],
  },
  {
    slug: 'edinburgh',
    name: 'Edinburgh',
    region: 'Scotland, UK',
    country: 'UK',
    resources: [
      { name: 'Age Scotland — Digital Skills Edinburgh', type: 'nonprofit', description: 'Free technology workshops for older adults in Edinburgh, teaching tablet, smartphone, and internet skills.', website: '#', free: true },
      { name: 'Edinburgh Voluntary Organisations\' Council — Digital Inclusion', type: 'nonprofit', description: 'Coordinates digital skills programmes for older adults across Edinburgh through a network of voluntary organisations.', website: '#', free: true },
      { name: 'Connecting Scotland — Edinburgh', type: 'community-center', description: 'Scottish Government programme offering free devices, data, and digital support to eligible older adults in Edinburgh.', website: '#', free: true },
      { name: 'Barclays Digital Eagles — Edinburgh', type: 'community-center', description: 'Free digital skills workshops at Edinburgh Barclays branches, covering online banking and internet basics.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Edinburgh City Libraries', description: 'Network of 28 public libraries offering free computer access, WiFi, and digital skills workshops for all residents.' },
      { name: 'Edinburgh Central Library', description: 'Located on George IV Bridge, offering free tech help sessions and digital skills classes.' },
    ],
    tips: [
      'Edinburgh City Libraries run regular Digital Drop-in sessions where you can get free one-to-one tech help.',
      'The National Entitlement Card provides free bus travel for seniors across Scotland — use it to reach tech classes around Edinburgh.',
      'Edinburgh\'s compact city centre means many tech class locations are within walking distance of each other.',
    ],
    nearby: ['glasgow', 'manchester'],
  },
  {
    slug: 'bristol',
    name: 'Bristol',
    region: 'England, UK',
    country: 'UK',
    resources: [
      { name: 'Age UK Bristol — Digital Inclusion', type: 'nonprofit', description: 'Free technology classes for older adults in Bristol, covering tablets, smartphones, email, and video calling.', website: '#', free: true },
      { name: 'Bristol Digital Inclusion Network', type: 'community-center', description: 'Partnership of organisations working to improve digital skills across Bristol, with targeted programmes for older adults.', website: '#', free: true },
      { name: 'Good Things Foundation — Bristol Centres', type: 'nonprofit', description: 'Online Centres across Bristol offering free digital skills support for older adults and other learners.', website: '#', free: true },
      { name: 'We Are Digital — Bristol', type: 'nonprofit', description: 'Provides free digital skills training and device support for older and vulnerable adults in the Bristol area.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Bristol Central Library', description: 'Offers free computer access, WiFi, and regular digital skills workshops at the central location and branch libraries.' },
      { name: 'Bristol Community Libraries', description: 'Network of branch libraries offering technology classes and drop-in digital help sessions for older residents.' },
    ],
    tips: [
      'Bristol has a vibrant community of digital inclusion organisations — the Bristol Digital Inclusion Network can help you find the right programme.',
      'First Bus offers concessionary fares for seniors across the Bristol area.',
      'Many Bristol community centres run daytime tech sessions specifically designed for retired adults.',
    ],
    nearby: ['london', 'cardiff', 'birmingham'],
  },
  {
    slug: 'leeds',
    name: 'Leeds',
    region: 'England, UK',
    country: 'UK',
    resources: [
      { name: 'Age UK Leeds — Digital Skills', type: 'nonprofit', description: 'Free technology workshops for older adults in Leeds, covering tablets, smartphones, internet safety, and staying connected online.', website: '#', free: true },
      { name: '100% Digital Leeds', type: 'community-center', description: 'Leeds City Council initiative aiming to make Leeds the most digitally inclusive city in the UK, with targeted programmes for older residents.', website: '#', free: true },
      { name: 'Good Things Foundation — Leeds Centres', type: 'nonprofit', description: 'Online Centres across Leeds offering free digital skills training and support for older adults.', website: '#', free: true },
      { name: 'Barclays Digital Eagles — Leeds', type: 'community-center', description: 'Free digital skills sessions at Leeds Barclays branches, covering online banking, internet basics, and device assistance.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Leeds Central Library', description: 'Offers free computer access, WiFi, and regular technology workshops at the city centre location and branch libraries across Leeds.' },
      { name: 'Leeds Community Libraries', description: 'Network of branch libraries offering digital skills classes and drop-in tech help for older residents.' },
    ],
    tips: [
      'The 100% Digital Leeds initiative has produced excellent resources and can connect you with local tech support — search for it online or ask at your library.',
      'West Yorkshire Metro offers concessionary bus travel for seniors across the Leeds area.',
      'Leeds has numerous community centres in every ward offering free or low-cost digital skills classes.',
    ],
    nearby: ['manchester', 'birmingham', 'liverpool'],
  },
  {
    slug: 'cardiff',
    name: 'Cardiff',
    region: 'Wales, UK',
    country: 'UK',
    resources: [
      { name: 'Age Cymru — Digital Skills Cardiff', type: 'nonprofit', description: 'Free technology classes for older adults in Cardiff, covering tablets, smartphones, internet safety, and video calling.', website: '#', free: true },
      { name: 'Digital Communities Wales', type: 'community-center', description: 'Welsh Government programme supporting digital inclusion for older adults across Cardiff and Wales, offering training and device access.', website: '#', free: true },
      { name: 'Good Things Foundation — Cardiff Centres', type: 'nonprofit', description: 'Online Centres in Cardiff offering free digital skills support for older adults and other learners.', website: '#', free: true },
      { name: 'Cardiff Council — Community Hubs Digital Skills', type: 'community-center', description: 'Free digital skills sessions at Cardiff\'s community hubs and libraries, designed to help residents of all ages get online.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Cardiff Central Library', description: 'Modern city centre library offering free computer access, WiFi, and regular digital skills workshops for all ages.' },
      { name: 'Cardiff Community Hubs', description: 'Combined library and community centres across the city offering technology classes and drop-in digital help.' },
    ],
    tips: [
      'Digital Communities Wales can connect you with free one-to-one tech support — they have coordinators covering all parts of Cardiff.',
      'Cardiff Bus offers concessionary fares for seniors across the city and surrounding area.',
      'Cardiff\'s community hubs combine library services with community activities — a great one-stop shop for tech classes and social connection.',
    ],
    nearby: ['bristol', 'birmingham'],
  },
  {
    slug: 'belfast',
    name: 'Belfast',
    region: 'Northern Ireland, UK',
    country: 'UK',
    resources: [
      { name: 'Age NI — Digital Skills Belfast', type: 'nonprofit', description: 'Free technology classes for older adults in Belfast, covering tablets, smartphones, internet safety, and staying connected with family online.', website: '#', free: true },
      { name: 'Libraries NI — Digital Skills', type: 'library', description: 'Northern Ireland\'s library service offering free digital skills training at branches across Belfast, from basic computer skills to online safety.', website: '#', free: true },
      { name: 'Good Things Foundation — Belfast Centres', type: 'nonprofit', description: 'Online Centres in Belfast offering free digital skills support for older adults and other learners.', website: '#', free: true },
      { name: 'NOW Group — Digital Skills', type: 'nonprofit', description: 'Belfast-based charity providing inclusive digital skills training, including programmes designed for older adults.', website: '#', free: true },
    ],
    libraries: [
      { name: 'Belfast Central Library', description: 'The largest library in Northern Ireland, offering free computer access, WiFi, and regular digital skills workshops.' },
      { name: 'Libraries NI Belfast Branches', description: 'Network of public libraries across Belfast offering technology classes and digital help sessions for older residents.' },
    ],
    tips: [
      'Libraries NI is one of the best resources for free tech training in Northern Ireland — every branch offers some form of digital support.',
      'Translink Metro offers senior SmartPasses for free bus and rail travel across Northern Ireland.',
      'Belfast has a strong community and voluntary sector — many local groups run informal tech help sessions for older adults.',
    ],
    nearby: ['glasgow', 'edinburgh'],
  },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug)
}

export function getNearbyCities(slug: string): CityData[] {
  const city = getCityBySlug(slug)
  if (!city) return []
  return city.nearby
    .map((s) => getCityBySlug(s))
    .filter((c): c is CityData => c !== undefined)
}

export function getUSCities(): CityData[] {
  return cities.filter((c) => c.country === 'US')
}

export function getUKCities(): CityData[] {
  return cities.filter((c) => c.country === 'UK')
}
