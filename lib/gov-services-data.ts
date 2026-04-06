// ── Government Services Online Guides for Seniors ───────────────────────────

export interface GovService {
  slug: string
  name: string
  shortName: string
  category: GovServiceCategory
  url: string
  description: string
  icon: string
  difficulty: 'easy' | 'moderate' | 'complex'
  phoneNumber: string | null
  seniorTip: string
  steps: { title: string; description: string }[]
  commonTasks: { task: string; path: string }[]
  troubleshooting: { problem: string; solution: string }[]
  accessibilityNotes: string
}

export type GovServiceCategory =
  | 'benefits'
  | 'health'
  | 'taxes'
  | 'identification'
  | 'mail-shipping'
  | 'veterans'
  | 'civic'

export interface GovServiceCategoryInfo {
  slug: GovServiceCategory
  label: string
  icon: string
  description: string
}

export const GOV_SERVICE_CATEGORIES: GovServiceCategoryInfo[] = [
  {
    slug: 'benefits',
    label: 'Benefits & Social Security',
    icon: '🏛️',
    description: 'Social Security, retirement benefits, and government assistance programs.',
  },
  {
    slug: 'health',
    label: 'Health & Medicare',
    icon: '🏥',
    description: 'Medicare enrollment, coverage options, and health insurance programs.',
  },
  {
    slug: 'taxes',
    label: 'Taxes & IRS',
    icon: '📋',
    description: 'Filing taxes online, checking refunds, and IRS account management.',
  },
  {
    slug: 'identification',
    label: 'ID & Documents',
    icon: '🪪',
    description: 'Driver\'s license renewal, passport applications, and identity documents.',
  },
  {
    slug: 'mail-shipping',
    label: 'Mail & Shipping',
    icon: '📦',
    description: 'USPS services, package tracking, and mail management.',
  },
  {
    slug: 'veterans',
    label: 'Veterans Services',
    icon: '🎖️',
    description: 'VA benefits, healthcare enrollment, and veteran support services.',
  },
  {
    slug: 'civic',
    label: 'Civic & Voting',
    icon: '🗳️',
    description: 'Voter registration, jury duty, and civic participation.',
  },
]

export const GOV_SERVICES: GovService[] = [
  // ── Benefits & Social Security ──────────────────────────────────────────
  {
    slug: 'social-security-ssa-gov',
    name: 'Social Security Administration (SSA.gov)',
    shortName: 'SSA.gov',
    category: 'benefits',
    url: 'https://www.ssa.gov',
    description: 'Manage your Social Security benefits, check payment status, get benefit estimates, and request replacement cards online.',
    icon: '🏛️',
    difficulty: 'moderate',
    phoneNumber: '1-800-772-1213',
    seniorTip: 'You can do most things online without visiting an office. Create your my Social Security account first — you\'ll need it for almost everything.',
    steps: [
      { title: 'Go to ssa.gov', description: 'Type ssa.gov into your browser\'s address bar and press Enter. Bookmark this page for easy access.' },
      { title: 'Create a my Social Security account', description: 'Click "Sign In / Create Account" at the top. You\'ll need your Social Security number, a valid email address, and a US mailing address.' },
      { title: 'Verify your identity', description: 'SSA uses ID.me or Login.gov to verify who you are. You\'ll need a photo ID (driver\'s license or passport) and may need to take a selfie with your phone.' },
      { title: 'Access your dashboard', description: 'Once logged in, you can see your benefit amount, payment schedule, tax documents (1099), and personal information.' },
    ],
    commonTasks: [
      { task: 'Check monthly benefit amount', path: 'Sign in > My Home > Benefits' },
      { task: 'Get your SSA-1099 tax form', path: 'Sign in > Replacement Documents > Tax Form (SSA-1099)' },
      { task: 'Change direct deposit', path: 'Sign in > My Profile > Direct Deposit' },
      { task: 'Request replacement Social Security card', path: 'Sign in > Replacement Documents > Social Security Card' },
      { task: 'Estimate future benefits', path: 'Homepage > Retirement Estimator' },
      { task: 'Report a change of address', path: 'Sign in > My Profile > Address' },
      { task: 'Check application status', path: 'Sign in > My Home > Application Status' },
    ],
    troubleshooting: [
      { problem: 'Can\'t create an account', solution: 'You may need to verify your identity in person. Call 1-800-772-1213 or visit your local SSA office.' },
      { problem: 'Forgot password', solution: 'Click "Forgot Password" on the sign-in page. You\'ll get a reset link at your email address.' },
      { problem: 'Identity verification failed', solution: 'Try using Login.gov instead of ID.me, or vice versa. Make sure your photo ID matches your current name.' },
      { problem: 'Website is slow or not loading', solution: 'SSA.gov is busiest Monday mornings. Try again Tuesday-Friday or after 4 PM.' },
    ],
    accessibilityNotes: 'SSA.gov works with screen readers. Call 1-800-772-1213 (TTY: 1-800-325-0778) for phone assistance. In-person appointments available at local offices.',
  },
  {
    slug: 'medicare-gov',
    name: 'Medicare.gov',
    shortName: 'Medicare.gov',
    category: 'health',
    url: 'https://www.medicare.gov',
    description: 'Compare Medicare plans, check coverage, find doctors, manage prescriptions, and access your Medicare account online.',
    icon: '🏥',
    difficulty: 'moderate',
    phoneNumber: '1-800-MEDICARE (1-800-633-4227)',
    seniorTip: 'During Open Enrollment (October 15 - December 7), the site is most useful for comparing plans. Save your current drugs list before comparing.',
    steps: [
      { title: 'Go to Medicare.gov', description: 'Type medicare.gov in your browser. This is the official site — watch out for lookalike scam sites.' },
      { title: 'Create or sign into your account', description: 'Click "Log in to your Medicare account." You\'ll use your Medicare number (on your red, white, and blue card) to set up access.' },
      { title: 'Review your coverage', description: 'Your dashboard shows your current plan, coverage dates, and what\'s included.' },
      { title: 'Use the Plan Finder', description: 'Click "Find health & drug plans" to compare options. Enter your zip code and current prescriptions for personalized results.' },
    ],
    commonTasks: [
      { task: 'Compare Medicare Advantage plans', path: 'Plan Finder > Enter zip code > Compare plans' },
      { task: 'Check if your doctor accepts Medicare', path: 'Find Care > Provider directory' },
      { task: 'Look up drug coverage (formulary)', path: 'Plan Finder > Add your drugs > Compare coverage' },
      { task: 'Find your Medicare number', path: 'Log in > My Account > Medicare Number' },
      { task: 'Check claims and billing', path: 'Log in > Claims > Recent claims' },
      { task: 'Order a replacement Medicare card', path: 'Log in > My Account > Get a replacement card' },
    ],
    troubleshooting: [
      { problem: 'Don\'t know my Medicare number', solution: 'Check your red, white, and blue Medicare card. If lost, call 1-800-MEDICARE to get your number.' },
      { problem: 'Plan Finder is confusing', solution: 'Call 1-800-MEDICARE for free help from a counselor who can walk you through it by phone.' },
      { problem: 'Can\'t find my doctor in the directory', solution: 'Your doctor may be listed under a group practice name. Try searching by the practice name or call the doctor\'s office directly.' },
      { problem: 'Site is slow during Open Enrollment', solution: 'Try early morning (before 8 AM) or late evening. The site handles millions of visitors October-December.' },
    ],
    accessibilityNotes: 'Medicare.gov supports screen readers and keyboard navigation. Call 1-800-MEDICARE (TTY: 1-877-486-2048) 24/7 for phone help.',
  },
  {
    slug: 'irs-gov',
    name: 'IRS.gov — Internal Revenue Service',
    shortName: 'IRS.gov',
    category: 'taxes',
    url: 'https://www.irs.gov',
    description: 'File taxes for free, check refund status, make payments, get tax transcripts, and manage your IRS account online.',
    icon: '📋',
    difficulty: 'complex',
    phoneNumber: '1-800-829-1040',
    seniorTip: 'If your income is under $84,000, you can file federal taxes completely free through IRS Free File. VITA (Volunteer Income Tax Assistance) offers free in-person help.',
    steps: [
      { title: 'Go to irs.gov', description: 'Type irs.gov in your browser. Never click links in emails claiming to be from the IRS — the real IRS contacts you by mail.' },
      { title: 'Create an IRS Online Account', description: 'Click "Sign in to your Online Account." You\'ll verify your identity through ID.me with a photo ID and selfie.' },
      { title: 'Access your tax information', description: 'Your account shows payment history, tax records, estimated payments, and any amounts you owe.' },
      { title: 'File taxes or check refund', description: 'Use IRS Free File (irs.gov/freefile) to file, or "Where\'s My Refund?" to check status.' },
    ],
    commonTasks: [
      { task: 'Check tax refund status', path: 'irs.gov/refunds > Enter SSN, filing status, and refund amount' },
      { task: 'File taxes for free', path: 'irs.gov/freefile > Choose a Free File partner > Start return' },
      { task: 'Make a tax payment', path: 'irs.gov/payments > Direct Pay > Enter bank info' },
      { task: 'Get a tax transcript', path: 'Online Account > Tax Records > Get Transcript' },
      { task: 'Find free tax help (VITA)', path: 'irs.gov/vita > Enter zip code > Find nearest location' },
      { task: 'Set up a payment plan', path: 'irs.gov/payments > Payment Plans > Apply Online' },
    ],
    troubleshooting: [
      { problem: 'Refund is delayed', solution: 'Most refunds arrive within 21 days if you e-filed. Paper returns take 6-8 weeks. Check "Where\'s My Refund?" daily.' },
      { problem: 'ID.me verification is difficult', solution: 'You can verify by video call with an ID.me agent. Have your photo ID ready and allow 15-30 minutes.' },
      { problem: 'Got a scary letter from IRS', solution: 'Don\'t panic. Real IRS letters come by mail (never email, text, or phone threats). Verify by calling 1-800-829-1040.' },
      { problem: 'Can\'t afford to pay tax bill', solution: 'Apply for a payment plan at irs.gov/payments. The IRS offers installment agreements for almost all amounts.' },
    ],
    accessibilityNotes: 'IRS.gov supports screen readers. Call 1-800-829-1040 (TTY: 1-800-829-4059) for phone help. VITA sites offer in-person assistance.',
  },
  {
    slug: 'va-gov',
    name: 'VA.gov — Veterans Affairs',
    shortName: 'VA.gov',
    category: 'veterans',
    url: 'https://www.va.gov',
    description: 'Manage VA healthcare, disability benefits, GI Bill, prescriptions, and appointments online.',
    icon: '🎖️',
    difficulty: 'moderate',
    phoneNumber: '1-800-827-1000',
    seniorTip: 'If you served in the military, you may be eligible for healthcare and benefits even decades later. VA.gov makes it easier to apply than visiting an office.',
    steps: [
      { title: 'Go to va.gov', description: 'Type va.gov in your browser. This is the official site for all veteran services.' },
      { title: 'Create a Login.gov or ID.me account', description: 'Click "Sign in" at the top. You\'ll need a photo ID and email to verify your identity.' },
      { title: 'Access your VA dashboard', description: 'Once signed in, you can see your benefits, appointments, prescriptions, and claims all in one place.' },
      { title: 'Apply for benefits', description: 'Use the "Apply for Benefits" section to start applications for healthcare, disability, or pension.' },
    ],
    commonTasks: [
      { task: 'Schedule or manage VA appointments', path: 'Sign in > My HealtheVet > Appointments' },
      { task: 'Refill prescriptions', path: 'Sign in > My HealtheVet > Medications > Refill' },
      { task: 'Check disability claim status', path: 'Sign in > Claims and Appeals > Check status' },
      { task: 'Download VA medical records', path: 'Sign in > My HealtheVet > Medical Records' },
      { task: 'Apply for VA healthcare', path: 'va.gov/health-care/apply > Start application' },
      { task: 'Use VA Video Connect (telehealth)', path: 'Sign in > My HealtheVet > Appointments > Video visits' },
    ],
    troubleshooting: [
      { problem: 'Can\'t create an account', solution: 'Try using Login.gov first. If that fails, call 1-800-827-1000 for help getting set up.' },
      { problem: 'Don\'t know if I\'m eligible', solution: 'Most veterans who served on active duty are eligible for some benefits. Use the eligibility checker at va.gov/eligibility.' },
      { problem: 'Claim is taking too long', solution: 'Average processing is 3-6 months. Check status online. Call the White House VA Hotline (1-855-948-2311) if concerned.' },
      { problem: 'Can\'t access telehealth appointment', solution: 'Download the VA Video Connect app from App Store or Google Play. Test your camera and microphone before the appointment.' },
    ],
    accessibilityNotes: 'VA.gov is designed for accessibility with screen reader support and keyboard navigation. Call 1-800-827-1000 (TTY: 711) for help.',
  },
  {
    slug: 'usps-com',
    name: 'USPS.com — United States Postal Service',
    shortName: 'USPS.com',
    category: 'mail-shipping',
    url: 'https://www.usps.com',
    description: 'Track packages, schedule mail pickup, buy stamps, change your address, hold mail, and manage delivery preferences online.',
    icon: '📦',
    difficulty: 'easy',
    phoneNumber: '1-800-275-8777',
    seniorTip: 'You can schedule mail hold when traveling, buy stamps without going to the post office, and even print shipping labels at home.',
    steps: [
      { title: 'Go to usps.com', description: 'Type usps.com in your browser. This is the official US Postal Service website.' },
      { title: 'Create a USPS.com account', description: 'Click "Register / Sign In" at the top. You\'ll need your name, address, and email.' },
      { title: 'Sign up for Informed Delivery', description: 'This free service sends you email images of mail coming to your mailbox each day — great for knowing what to expect.' },
      { title: 'Explore services', description: 'From your dashboard, you can track packages, hold mail, change address, and buy stamps.' },
    ],
    commonTasks: [
      { task: 'Track a package', path: 'Homepage > Track > Enter tracking number' },
      { task: 'Hold mail while traveling', path: 'Sign in > Hold Mail > Select dates' },
      { task: 'Change your address', path: 'usps.com/move > Start change of address ($1.10 identity verification fee)' },
      { task: 'Buy stamps online', path: 'usps.com > Stamps & Supplies > Buy online' },
      { task: 'Schedule a package pickup', path: 'Sign in > Schedule a Pickup > Enter package details' },
      { task: 'Find a post office', path: 'usps.com > Find Locations > Enter zip code' },
    ],
    troubleshooting: [
      { problem: 'Tracking number not working', solution: 'It can take 24 hours for tracking to update after shipping. Make sure you entered the full number correctly.' },
      { problem: 'Package shows delivered but I don\'t have it', solution: 'Wait 24 hours (sometimes carriers mark early). Check with neighbors. Then file a claim at usps.com/help.' },
      { problem: 'Informed Delivery not showing my mail', solution: 'Not all mail gets scanned. It typically takes 1-2 days to set up. Make sure your address matches exactly.' },
      { problem: 'Change of address didn\'t work', solution: 'Some mail (like packages) may not forward. Allow 7-10 business days for mail forwarding to begin.' },
    ],
    accessibilityNotes: 'USPS.com supports screen readers. Call 1-800-275-8777 (TTY: 1-800-877-8339) for phone assistance.',
  },
  {
    slug: 'dmv-online-services',
    name: 'DMV Online Services',
    shortName: 'DMV Online',
    category: 'identification',
    url: 'https://www.usa.gov/motor-vehicle-services',
    description: 'Renew your driver\'s license, register your vehicle, schedule appointments, and handle DMV tasks online without waiting in line.',
    icon: '🪪',
    difficulty: 'moderate',
    phoneNumber: null,
    seniorTip: 'Most states now let you renew your license online if your photo is recent. Check your state\'s DMV website — you may not need to visit in person.',
    steps: [
      { title: 'Find your state\'s DMV website', description: 'Go to usa.gov/motor-vehicle-services to find your state\'s official DMV site. Each state has its own website and rules.' },
      { title: 'Create an online account', description: 'Most state DMVs offer online accounts. You\'ll need your driver\'s license number and personal details.' },
      { title: 'Check available online services', description: 'Many renewals, registrations, and payments can be done online. Look for "Online Services" or "eServices" on your state\'s site.' },
      { title: 'Schedule appointments if needed', description: 'For services requiring in-person visits, schedule an appointment online to skip the walk-in line.' },
    ],
    commonTasks: [
      { task: 'Renew driver\'s license', path: 'State DMV site > Online Services > License Renewal' },
      { task: 'Renew vehicle registration', path: 'State DMV site > Online Services > Vehicle Registration' },
      { task: 'Schedule a DMV appointment', path: 'State DMV site > Appointments > Schedule' },
      { task: 'Get a REAL ID', path: 'State DMV site > REAL ID > Requirements and scheduling (in-person required)' },
      { task: 'Update address on license', path: 'State DMV site > Online Services > Address Change' },
      { task: 'Request driving record', path: 'State DMV site > Online Services > Driving Record' },
    ],
    troubleshooting: [
      { problem: 'Can\'t renew online', solution: 'Some renewals require in-person visits (new photo, vision test, REAL ID). Check your state\'s eligibility rules.' },
      { problem: 'Don\'t know my state\'s DMV website', solution: 'Go to usa.gov/motor-vehicle-services for links to every state\'s DMV.' },
      { problem: 'REAL ID deadline is confusing', solution: 'The federal REAL ID deadline is May 7, 2025. You need one for domestic flights and federal buildings. Apply in person at your DMV.' },
      { problem: 'License expired — can I still drive?', solution: 'Rules vary by state. Some allow a grace period. Check your state\'s rules and renew as soon as possible.' },
    ],
    accessibilityNotes: 'Accessibility varies by state. Most state DMVs offer phone and in-person assistance. Ask about accommodations when scheduling.',
  },
  {
    slug: 'voter-registration',
    name: 'Online Voter Registration',
    shortName: 'Vote.gov',
    category: 'civic',
    url: 'https://vote.gov',
    description: 'Register to vote, check your registration status, find your polling place, and learn about absentee/mail-in voting options.',
    icon: '🗳️',
    difficulty: 'easy',
    phoneNumber: '1-866-OUR-VOTE (1-866-687-8683)',
    seniorTip: 'You can request a mail-in ballot if getting to your polling place is difficult. Many states offer permanent absentee voting for seniors.',
    steps: [
      { title: 'Go to vote.gov', description: 'Type vote.gov in your browser. This is the official US government voting resource.' },
      { title: 'Select your state', description: 'Click your state to see its specific registration rules, deadlines, and options.' },
      { title: 'Register or check your status', description: 'Most states let you register online. You\'ll need your driver\'s license or state ID number.' },
      { title: 'Find your polling place', description: 'Enter your address to find exactly where you vote and check what\'s on your ballot.' },
    ],
    commonTasks: [
      { task: 'Register to vote', path: 'vote.gov > Select state > Register online or download form' },
      { task: 'Check registration status', path: 'vote.gov > Select state > Check registration' },
      { task: 'Find your polling place', path: 'vote.gov > Select state > Find your polling place' },
      { task: 'Request absentee/mail-in ballot', path: 'vote.gov > Select state > Absentee voting' },
      { task: 'Update voter registration (address change)', path: 'vote.gov > Select state > Update registration' },
      { task: 'See what\'s on your ballot', path: 'vote.gov > Select state > Sample ballots' },
    ],
    troubleshooting: [
      { problem: 'Not sure if I\'m registered', solution: 'Use vote.gov to check your registration status. Enter your name and address to verify.' },
      { problem: 'Missed the registration deadline', solution: 'Some states allow same-day registration. Check your state\'s rules at vote.gov.' },
      { problem: 'Can\'t get to polling place', solution: 'Request an absentee/mail-in ballot. Many states also offer curbside voting for those with disabilities.' },
      { problem: 'Don\'t have required ID', solution: 'ID requirements vary by state. Vote.gov lists what each state requires. Some accept utility bills or bank statements.' },
    ],
    accessibilityNotes: 'All polling places must be accessible. Request accommodations in advance. Mail-in voting is available in most states for those who can\'t travel.',
  },
  {
    slug: 'usa-gov',
    name: 'USA.gov — Official Government Portal',
    shortName: 'USA.gov',
    category: 'benefits',
    url: 'https://www.usa.gov',
    description: 'The official starting point for all US government services. Find benefits, report fraud, get government contact information, and access any federal service.',
    icon: '🇺🇸',
    difficulty: 'easy',
    phoneNumber: '1-844-USA-GOV1 (1-844-872-4681)',
    seniorTip: 'Think of USA.gov as the "Google" for government services. If you don\'t know which website to use, start here.',
    steps: [
      { title: 'Go to usa.gov', description: 'Type usa.gov in your browser. This is the official portal for all US government information.' },
      { title: 'Use the search bar', description: 'Type what you need — like "Social Security" or "Medicare" — and USA.gov will point you to the right agency.' },
      { title: 'Browse by topic', description: 'Topics include Benefits, Health, Money, Travel, Housing, and more. Each links to the relevant agencies.' },
      { title: 'Find contact information', description: 'Need to call someone? USA.gov has phone numbers and addresses for every federal agency.' },
    ],
    commonTasks: [
      { task: 'Find government benefits you qualify for', path: 'usa.gov > Benefits > Benefit Finder' },
      { task: 'Report scams and fraud', path: 'usa.gov > Report Fraud > Choose scam type' },
      { task: 'Get a passport', path: 'usa.gov > Travel > Passports' },
      { task: 'Find government phone numbers', path: 'usa.gov > Agency Index > Select agency' },
      { task: 'Check government assistance programs', path: 'usa.gov > Benefits > Government Assistance' },
      { task: 'Find housing assistance', path: 'usa.gov > Housing > Find Housing Help' },
    ],
    troubleshooting: [
      { problem: 'Don\'t know which agency I need', solution: 'Use the USA.gov search bar or call 1-844-USA-GOV1. They\'ll direct you to the right place.' },
      { problem: 'Government website looks different than expected', solution: 'Make sure you\'re on a .gov website. Scammers create lookalike sites. Real government sites always end in .gov.' },
      { problem: 'Need help in another language', solution: 'USA.gov is available in Spanish at usa.gov/espanol. Many agencies offer phone help in other languages.' },
      { problem: 'Can\'t find a specific benefit', solution: 'Try the Benefit Finder tool — answer questions about your situation and it identifies programs you may qualify for.' },
    ],
    accessibilityNotes: 'USA.gov meets federal accessibility standards (Section 508). Available in English and Spanish. Call 1-844-USA-GOV1 for phone assistance.',
  },
  {
    slug: 'social-security-disability',
    name: 'Social Security Disability (SSDI) Online',
    shortName: 'SSDI Online',
    category: 'benefits',
    url: 'https://www.ssa.gov/disability',
    description: 'Apply for Social Security Disability benefits, check application status, appeal decisions, and manage your disability claim online.',
    icon: '♿',
    difficulty: 'complex',
    phoneNumber: '1-800-772-1213',
    seniorTip: 'Applying online is faster than visiting an office. Gather your medical records and work history before starting — the application takes 30-60 minutes.',
    steps: [
      { title: 'Go to ssa.gov/disability', description: 'This is the official starting page for disability benefits information and applications.' },
      { title: 'Check if you qualify', description: 'Review the eligibility requirements. Generally, you must have worked and paid Social Security taxes, and have a medical condition expected to last 12+ months.' },
      { title: 'Gather your documents', description: 'You\'ll need: medical records, doctors\' names and contact info, medications list, work history for the last 15 years, and your Social Security number.' },
      { title: 'Apply online', description: 'Click "Apply for Disability Benefits" and follow the step-by-step application. You can save and return later if needed.' },
    ],
    commonTasks: [
      { task: 'Apply for disability benefits', path: 'ssa.gov/disability > Apply Online' },
      { task: 'Check application status', path: 'Sign in to my Social Security > Application Status' },
      { task: 'Appeal a denied claim', path: 'ssa.gov/disability > Appeals > Request Appeal Online' },
      { task: 'Report changes (work, address, health)', path: 'Sign in > My Profile > Report Changes' },
      { task: 'Find a disability attorney', path: 'ssa.gov > Disability > Representation' },
    ],
    troubleshooting: [
      { problem: 'Application was denied', solution: 'About 65% of initial applications are denied. You have 60 days to appeal. Consider getting a disability attorney (they only get paid if you win).' },
      { problem: 'Application is taking months', solution: 'Average processing is 3-6 months. Check status online. Call 1-800-772-1213 if it\'s been more than 6 months.' },
      { problem: 'Don\'t have all medical records', solution: 'List your doctors and SSA can request records directly. Having records ready speeds up the process.' },
      { problem: 'Can\'t complete application in one sitting', solution: 'The online application auto-saves. Note your re-entry number to continue later.' },
    ],
    accessibilityNotes: 'Apply by phone at 1-800-772-1213 (TTY: 1-800-325-0778) or visit your local SSA office. In-person help available with appointment.',
  },
  {
    slug: 'medicare-part-d',
    name: 'Medicare Part D — Prescription Drug Plans',
    shortName: 'Medicare Part D',
    category: 'health',
    url: 'https://www.medicare.gov/drug-coverage-part-d',
    description: 'Compare Medicare Part D prescription drug plans, check which drugs are covered, estimate costs, and enroll online.',
    icon: '💊',
    difficulty: 'moderate',
    phoneNumber: '1-800-MEDICARE (1-800-633-4227)',
    seniorTip: 'Review your plan every year during Open Enrollment (Oct 15 - Dec 7). Plans change their drug coverage and costs annually, so last year\'s best plan may not be this year\'s.',
    steps: [
      { title: 'Go to medicare.gov/plan-compare', description: 'This is Medicare\'s official plan comparison tool for drug coverage.' },
      { title: 'Enter your zip code', description: 'Results are specific to your area since plan availability varies by location.' },
      { title: 'Add your current medications', description: 'Enter each drug you take, including dosage. This is crucial for accurate cost comparisons.' },
      { title: 'Add your preferred pharmacy', description: 'Plans have different costs at different pharmacies. Enter your usual pharmacy for accurate pricing.' },
    ],
    commonTasks: [
      { task: 'Compare drug plans in your area', path: 'medicare.gov/plan-compare > Enter zip > Drug plans' },
      { task: 'Check if your drug is covered', path: 'Plan Compare > Add drugs > See coverage' },
      { task: 'Estimate annual drug costs', path: 'Plan Compare > Compare plans > View estimated costs' },
      { task: 'Enroll in a Part D plan', path: 'Plan Compare > Select plan > Enroll' },
      { task: 'Apply for Extra Help (low-income subsidy)', path: 'ssa.gov/medicare/part-d-extra-help' },
    ],
    troubleshooting: [
      { problem: 'My drug isn\'t listed in the search', solution: 'Try the generic name instead of brand name. Ask your pharmacist for the generic name if unsure.' },
      { problem: 'Plan costs seem too high', solution: 'You may qualify for Extra Help (Low-Income Subsidy). Apply at ssa.gov or call 1-800-MEDICARE.' },
      { problem: 'Missed Open Enrollment', solution: 'You may qualify for a Special Enrollment Period due to moving, losing coverage, or other life changes. Call 1-800-MEDICARE.' },
      { problem: 'Drug costs changed mid-year', solution: 'You\'re likely in the coverage gap ("donut hole"). The gap has been shrinking — check medicare.gov for current thresholds.' },
    ],
    accessibilityNotes: 'Call 1-800-MEDICARE (TTY: 1-877-486-2048) 24/7 for phone help comparing plans. SHIP counselors offer free in-person help in every state.',
  },
  {
    slug: 'passport-application',
    name: 'US Passport Application Online',
    shortName: 'Passport Services',
    category: 'identification',
    url: 'https://travel.state.gov/content/travel/en/passports.html',
    description: 'Apply for a new passport, renew your passport, check application status, and find passport acceptance facilities near you.',
    icon: '🛂',
    difficulty: 'moderate',
    phoneNumber: '1-877-487-2778',
    seniorTip: 'Renewals can be done entirely by mail if your current passport was issued within the last 15 years and you were 16+ when it was issued. No need to visit an office.',
    steps: [
      { title: 'Go to travel.state.gov', description: 'Type travel.state.gov in your browser. This is the official State Department passport site.' },
      { title: 'Determine if you need a new passport or renewal', description: 'If your passport was issued less than 15 years ago and you were 16+, you can renew by mail. Otherwise, apply for a new one.' },
      { title: 'Fill out the application', description: 'For renewals, fill out Form DS-82 online, print it, and mail it with your old passport and a check. For new passports, fill out Form DS-11 and apply in person.' },
      { title: 'Track your application', description: 'Check status online at travel.state.gov. Processing takes 6-8 weeks (routine) or 2-3 weeks (expedited, extra fee).' },
    ],
    commonTasks: [
      { task: 'Renew a passport by mail', path: 'travel.state.gov > Renew > Form DS-82 > Mail in' },
      { task: 'Apply for a new passport', path: 'travel.state.gov > Apply > Form DS-11 > Find acceptance facility' },
      { task: 'Check application status', path: 'travel.state.gov > Check Status > Enter last name and birth date' },
      { task: 'Find a passport office near you', path: 'travel.state.gov > Acceptance Facilities > Enter zip code' },
      { task: 'Get an expedited passport', path: 'travel.state.gov > Processing Times > Expedited service ($60 extra)' },
      { task: 'Get a passport card (US borders only)', path: 'travel.state.gov > Passport Card > Apply' },
    ],
    troubleshooting: [
      { problem: 'Passport expired — do I start over?', solution: 'If expired less than 5 years and you were 16+, you can still renew by mail. Otherwise, apply as new.' },
      { problem: 'Need a passport urgently', solution: 'Expedited processing is 2-3 weeks. For travel within 14 days, schedule an appointment at a regional passport agency.' },
      { problem: 'Photo was rejected', solution: 'Common reasons: shadows, glasses, wrong background. Get a new photo at a pharmacy (CVS, Walgreens) — they know the requirements.' },
      { problem: 'Name doesn\'t match documents', solution: 'Include legal name change documents (marriage certificate, court order) with your application.' },
    ],
    accessibilityNotes: 'Call 1-877-487-2778 (TTY: 1-888-874-7793) for assistance. Passport acceptance facilities can accommodate disabilities.',
  },
  {
    slug: 'benefits-gov',
    name: 'Benefits.gov — Benefit Finder',
    shortName: 'Benefits.gov',
    category: 'benefits',
    url: 'https://www.benefits.gov',
    description: 'Find government benefits you may qualify for based on your situation. Covers over 1,000 federal, state, and local programs.',
    icon: '🔍',
    difficulty: 'easy',
    phoneNumber: null,
    seniorTip: 'Many seniors miss out on benefits they qualify for. The Benefit Finder takes 10 minutes and may find programs you didn\'t know existed — like heating assistance, food programs, or phone discounts.',
    steps: [
      { title: 'Go to benefits.gov', description: 'Type benefits.gov in your browser. This is the official government benefit finder.' },
      { title: 'Click "Start the Benefit Finder"', description: 'The questionnaire takes about 10 minutes. Answer honestly for the most accurate results.' },
      { title: 'Answer questions about your situation', description: 'Questions cover your age, income, living situation, veteran status, and any disabilities.' },
      { title: 'Review your results', description: 'The tool shows every federal and state program you may qualify for, with links to apply.' },
    ],
    commonTasks: [
      { task: 'Find all benefits you qualify for', path: 'benefits.gov > Benefit Finder > Start questionnaire' },
      { task: 'Search for specific benefits', path: 'benefits.gov > Browse by Category or State' },
      { task: 'Find food assistance (SNAP)', path: 'benefits.gov > Search "SNAP" or "food assistance"' },
      { task: 'Find heating/energy assistance', path: 'benefits.gov > Search "LIHEAP" or "energy assistance"' },
      { task: 'Find housing assistance', path: 'benefits.gov > Search "housing" or "Section 8"' },
    ],
    troubleshooting: [
      { problem: 'Results show programs I don\'t qualify for', solution: 'The tool shows programs you MAY qualify for. Each result links to detailed eligibility requirements.' },
      { problem: 'Can\'t find a specific program', solution: 'Use the search bar at the top. Try different keywords — for example, "food" instead of "SNAP".' },
      { problem: 'Don\'t want to share personal info online', solution: 'Benefits.gov doesn\'t store your answers or require an account. Your information is not saved.' },
      { problem: 'Need help applying for a benefit', solution: 'Each benefit listing includes a link to the application. Many programs also have phone numbers for application help.' },
    ],
    accessibilityNotes: 'Benefits.gov is fully accessible and works with screen readers. No phone support, but each listed benefit has its own contact information.',
  },
  {
    slug: 'lifeline-affordable-connectivity',
    name: 'Lifeline & Affordable Connectivity Programs',
    shortName: 'Phone/Internet Discounts',
    category: 'benefits',
    url: 'https://www.lifelinesupport.org',
    description: 'Get discounted or free phone service and internet through government programs for low-income seniors.',
    icon: '📱',
    difficulty: 'easy',
    phoneNumber: '1-800-234-9473',
    seniorTip: 'If you receive Medicaid, SNAP, SSI, or VA Pension, you likely qualify for a free or discounted phone and internet service. This can save $30-50 per month.',
    steps: [
      { title: 'Check if you qualify', description: 'You qualify if your income is at or below 135% of the federal poverty line, or if you participate in programs like Medicaid, SNAP, SSI, or VA Pension.' },
      { title: 'Go to lifelinesupport.org', description: 'This is the official USAC Lifeline website to check eligibility and apply.' },
      { title: 'Apply online or through a provider', description: 'You can apply directly at checklifeline.org or through participating phone/internet companies.' },
      { title: 'Choose your provider', description: 'After approval, select a phone company or internet provider that participates in Lifeline in your state.' },
    ],
    commonTasks: [
      { task: 'Check eligibility', path: 'checklifeline.org > Start application > Enter info' },
      { task: 'Apply for Lifeline discount', path: 'checklifeline.org > Apply > Upload proof of eligibility' },
      { task: 'Find participating providers in your state', path: 'lifelinesupport.org > Lifeline Providers > Select state' },
      { task: 'Recertify annually', path: 'checklifeline.org > Recertify > Confirm eligibility' },
    ],
    troubleshooting: [
      { problem: 'Application was rejected', solution: 'Common reasons: duplicate (another household member already has Lifeline) or missing proof documents. Only one Lifeline benefit per household.' },
      { problem: 'Don\'t know which provider to choose', solution: 'Compare providers in your state at lifelinesupport.org. Look for ones offering smartphones or home internet, not just minutes.' },
      { problem: 'Need to recertify but missed deadline', solution: 'Contact your provider immediately. You have a grace period before the benefit is removed.' },
      { problem: 'ACP program ended — what now?', solution: 'The Affordable Connectivity Program ended in June 2024. Lifeline still provides $9.25/month discount. Check with your provider for transition options.' },
    ],
    accessibilityNotes: 'Call 1-800-234-9473 (TTY: 1-800-877-8339) for phone application assistance. Many providers offer in-store help.',
  },
  {
    slug: 'jury-duty-response',
    name: 'Jury Duty — Online Response',
    shortName: 'Jury Duty Online',
    category: 'civic',
    url: 'https://www.uscourts.gov/services-forms/jury-service',
    description: 'Respond to a jury duty summons, request a postponement, or claim an exemption online for federal courts.',
    icon: '⚖️',
    difficulty: 'easy',
    phoneNumber: null,
    seniorTip: 'Many courts allow you to respond to jury duty online. If you\'re over a certain age (varies by state, often 70-75), you may be able to request a permanent exemption.',
    steps: [
      { title: 'Read your jury summons carefully', description: 'Your summons will include a URL and participant number for online response. Federal courts use eJuror (ejuror.uscourts.gov).' },
      { title: 'Go to the website on your summons', description: 'Each court has its own response system. Use the exact web address printed on your summons.' },
      { title: 'Enter your participant number', description: 'This unique number is on your summons. It connects your response to your case.' },
      { title: 'Complete the questionnaire', description: 'Answer questions about your availability. You can request a postponement or exemption here.' },
    ],
    commonTasks: [
      { task: 'Respond to federal jury summons', path: 'ejuror.uscourts.gov > Enter participant number > Complete questionnaire' },
      { task: 'Request a postponement', path: 'Online response > Select "Request Postponement" > Choose new date' },
      { task: 'Claim an age exemption', path: 'Online response > Exemptions > Age (check your state\'s age threshold)' },
      { task: 'Claim a medical exemption', path: 'Online response > Exemptions > Medical > Attach doctor\'s note' },
    ],
    troubleshooting: [
      { problem: 'Lost my jury summons', solution: 'Call the court listed on the summons (if you remember) or your local federal/county courthouse clerk\'s office.' },
      { problem: 'Can\'t serve due to health reasons', solution: 'Request a medical exemption online and provide a doctor\'s note. Most courts grant medical exemptions readily.' },
      { problem: 'Already served recently', solution: 'You cannot be required to serve more than once in a 2-year period for federal courts. State rules vary.' },
      { problem: 'Don\'t have internet access', solution: 'You can respond by mail using the form included with your summons, or call the court clerk\'s office.' },
    ],
    accessibilityNotes: 'Contact the court clerk for accommodations. Courts must provide reasonable accommodations for disabilities, including hearing assistance and mobility access.',
  },
  {
    slug: 'property-tax-payment',
    name: 'Property Tax Payment Online',
    shortName: 'Property Tax Online',
    category: 'taxes',
    url: 'https://www.usa.gov/property-tax',
    description: 'Pay your property taxes online, check your tax assessment, and find senior property tax exemptions in your area.',
    icon: '🏠',
    difficulty: 'moderate',
    phoneNumber: null,
    seniorTip: 'Most states and counties offer property tax exemptions or freezes for seniors. These can save hundreds or thousands of dollars per year. You must apply — they\'re not automatic.',
    steps: [
      { title: 'Find your county\'s tax website', description: 'Property taxes are managed by your county, not the federal government. Search "[your county] property tax payment" to find the right site.' },
      { title: 'Look up your property', description: 'Enter your address or parcel number to find your tax bill and assessment.' },
      { title: 'Check for senior exemptions', description: 'Look for "Senior Exemption," "Homestead Exemption," or "Senior Freeze" on your county\'s tax site.' },
      { title: 'Pay online', description: 'Most counties accept credit card, debit card, or electronic check (eCheck) payments online.' },
    ],
    commonTasks: [
      { task: 'Pay property tax online', path: 'County tax website > Pay Taxes > Enter parcel number > Pay' },
      { task: 'View your tax assessment', path: 'County assessor website > Property Search > Enter address' },
      { task: 'Apply for senior exemption', path: 'County tax website > Exemptions > Senior/Homestead > Apply' },
      { task: 'Appeal your tax assessment', path: 'County assessor > Appeals > File appeal online or by mail' },
      { task: 'Set up payment plan', path: 'County tax website > Payment Plans > Apply' },
    ],
    troubleshooting: [
      { problem: 'Don\'t know my county\'s tax website', solution: 'Search "[your county name] [your state] property tax" in Google. Look for .gov URLs.' },
      { problem: 'Assessment seems too high', solution: 'You can appeal. Compare your assessment with similar properties on the county assessor\'s site. File an appeal before the deadline.' },
      { problem: 'Missed the tax deadline', solution: 'Contact your county treasurer\'s office. Penalties accrue quickly but payment plans are usually available.' },
      { problem: 'Not sure if I qualify for senior exemption', solution: 'Requirements vary by state/county but typically include: age 62-65+, own and live in the home, income below a threshold. Call your county assessor to ask.' },
    ],
    accessibilityNotes: 'Contact your county treasurer\'s office for phone payment assistance. Many counties offer in-person help at their offices.',
  },
]

// ── Helper Functions ────────────────────────────────────────────────────────

export function getAllGovServices(): GovService[] {
  return GOV_SERVICES
}

export function getGovServiceBySlug(slug: string): GovService | undefined {
  return GOV_SERVICES.find((s) => s.slug === slug)
}

export function getGovServicesByCategory(category: GovServiceCategory): GovService[] {
  return GOV_SERVICES.filter((s) => s.category === category)
}

export function getGovCategoryBySlug(slug: string): GovServiceCategoryInfo | undefined {
  return GOV_SERVICE_CATEGORIES.find((c) => c.slug === slug)
}
