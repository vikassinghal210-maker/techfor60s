// ── Telehealth Platform Guides for Seniors ──────────────────────────────────

export interface TelehealthPlatform {
  slug: string
  name: string
  shortName: string
  category: TelehealthCategory
  url: string
  appIos: string | null
  appAndroid: string | null
  description: string
  icon: string
  cost: string
  acceptsMedicare: boolean
  setupSteps: { title: string; description: string }[]
  features: string[]
  tips: string[]
  troubleshooting: { problem: string; solution: string }[]
}

export type TelehealthCategory = 'hospital-portal' | 'telehealth-service' | 'va-telehealth'

export interface TelehealthCategoryInfo {
  slug: TelehealthCategory
  label: string
  icon: string
  description: string
}

export const TELEHEALTH_CATEGORIES: TelehealthCategoryInfo[] = [
  {
    slug: 'hospital-portal',
    label: 'Hospital & Doctor Portals',
    icon: '🏥',
    description: 'Patient portals from major health systems where you can see your own doctor via video.',
  },
  {
    slug: 'telehealth-service',
    label: 'On-Demand Telehealth Services',
    icon: '📱',
    description: 'See a doctor anytime without an appointment — great for urgent but non-emergency issues.',
  },
  {
    slug: 'va-telehealth',
    label: 'VA Telehealth',
    icon: '🎖️',
    description: 'Telehealth services specifically for veterans through the VA healthcare system.',
  },
]

export const TELEHEALTH_PLATFORMS: TelehealthPlatform[] = [
  {
    slug: 'mychart',
    name: 'MyChart (Epic)',
    shortName: 'MyChart',
    category: 'hospital-portal',
    url: 'https://www.mychart.org',
    appIos: 'MyChart on App Store',
    appAndroid: 'MyChart on Google Play',
    description: 'MyChart is the most widely used patient portal in the US, connecting you to over 200 health systems. Schedule video visits with your own doctor, view test results, message your care team, and manage prescriptions.',
    icon: '🏥',
    cost: 'Free (copays may apply for visits)',
    acceptsMedicare: true,
    setupSteps: [
      { title: 'Get your activation code', description: 'Your doctor\'s office will give you an activation code (by email, letter, or at your visit). Ask at your next appointment if you don\'t have one.' },
      { title: 'Download the MyChart app', description: 'Search "MyChart" in the App Store (iPhone/iPad) or Google Play (Android). It\'s free to download.' },
      { title: 'Create your account', description: 'Open the app, tap "Sign Up," and enter your activation code. You\'ll create a username and password.' },
      { title: 'Select your health system', description: 'Search for your hospital or doctor\'s office name. Some health systems use a branded version of MyChart (like MyUCLAHealth or MyNorthwell).' },
      { title: 'Verify your identity', description: 'You may need to confirm your date of birth, phone number, or answer security questions.' },
      { title: 'Schedule a video visit', description: 'Go to "Visits" > "Schedule an Appointment" > look for "Video Visit" option. You\'ll get a reminder before your appointment.' },
    ],
    features: [
      'Video visits with your own doctor',
      'View test results and medical records',
      'Message your care team',
      'Request prescription refills',
      'Schedule appointments',
      'Pay bills online',
      'Share records with family members (proxy access)',
    ],
    tips: [
      'Ask your doctor\'s office for an activation code at your next visit',
      'If your health system uses a branded portal (like "MyUCLAHealth"), search for that name instead of "MyChart"',
      'You can give a family member proxy access to help manage your account',
      'Test your camera and microphone in the app before your first video visit',
      'Join the video visit 10 minutes early to troubleshoot any issues',
    ],
    troubleshooting: [
      { problem: 'Can\'t find my doctor\'s office in the app', solution: 'Try searching by hospital name, health system name, or city. Some offices use branded MyChart apps with different names.' },
      { problem: 'Activation code expired or not working', solution: 'Call your doctor\'s office and ask for a new activation code. They can generate one while you\'re on the phone.' },
      { problem: 'Video visit screen is black', solution: 'Make sure you\'ve allowed camera and microphone access. Go to your phone\'s Settings > MyChart > toggle Camera and Microphone ON.' },
      { problem: 'Can\'t hear the doctor', solution: 'Check that your phone isn\'t on silent mode. Turn up the volume. Try using headphones or earbuds for better audio.' },
      { problem: 'App keeps crashing', solution: 'Update the app to the latest version. If it still crashes, delete and reinstall it. Your account data won\'t be lost.' },
    ],
  },
  {
    slug: 'kaiser-permanente',
    name: 'Kaiser Permanente Patient Portal',
    shortName: 'Kaiser Permanente',
    category: 'hospital-portal',
    url: 'https://healthy.kaiserpermanente.org',
    appIos: 'Kaiser Permanente on App Store',
    appAndroid: 'Kaiser Permanente on Google Play',
    description: 'Kaiser Permanente\'s app and website let members schedule video visits, view lab results, refill prescriptions, and email their doctor — all in one place.',
    icon: '⚕️',
    cost: 'Included with Kaiser membership (copay may apply)',
    acceptsMedicare: true,
    setupSteps: [
      { title: 'Check your membership', description: 'You need to be a Kaiser Permanente member. If you have Kaiser insurance through Medicare Advantage, you\'re eligible.' },
      { title: 'Download the Kaiser Permanente app', description: 'Search "Kaiser Permanente" in the App Store or Google Play. Or visit kp.org on your computer.' },
      { title: 'Register online', description: 'Tap "Register" and enter your medical record number (on your Kaiser card) or use your name, date of birth, and email.' },
      { title: 'Create username and password', description: 'Choose a username and strong password. Write them down in a safe place.' },
      { title: 'Schedule a video visit', description: 'In the app, go to "Get Care" > "Video Visit." Choose your doctor or the next available physician.' },
    ],
    features: [
      'Video visits with your Kaiser doctor',
      'Same-day video appointments available',
      'View lab results and medical records',
      'Email your doctor directly',
      'Refill prescriptions with home delivery',
      'View and pay bills',
      'Health reminders and screenings',
    ],
    tips: [
      'Kaiser members can often get same-day video visits for urgent issues',
      'Use the "E-visit" option for simple issues like cold, flu, or rash — no video needed, just answer questions',
      'Prescription delivery is free for Kaiser members in most areas',
      'You can designate a family member to access your account and help manage appointments',
    ],
    troubleshooting: [
      { problem: 'Don\'t know my medical record number', solution: 'Check your Kaiser ID card. If you can\'t find it, call Member Services at 1-800-464-4000.' },
      { problem: 'Can\'t get a video visit with my specific doctor', solution: 'Your doctor may not have video slots available. Try "next available provider" for faster access, or call your doctor\'s office directly.' },
      { problem: 'Video quality is poor', solution: 'Move closer to your WiFi router. Close other apps on your phone. If using cellular data, try switching to WiFi.' },
      { problem: 'App says my account is locked', solution: 'Too many failed login attempts will lock your account. Call Member Services or wait 30 minutes and try again.' },
    ],
  },
  {
    slug: 'va-video-connect',
    name: 'VA Video Connect',
    shortName: 'VA Video Connect',
    category: 'va-telehealth',
    url: 'https://mobile.va.gov/app/va-video-connect',
    appIos: 'VA Video Connect on App Store',
    appAndroid: 'VA Video Connect on Google Play',
    description: 'VA Video Connect lets veterans have video appointments with VA healthcare providers from home. It works on smartphones, tablets, and computers.',
    icon: '🎖️',
    cost: 'Free for enrolled veterans',
    acceptsMedicare: false,
    setupSteps: [
      { title: 'Enroll in VA healthcare', description: 'You must be enrolled in VA healthcare. Apply at va.gov/health-care/apply or call 1-800-827-1000.' },
      { title: 'Download VA Video Connect', description: 'Search "VA Video Connect" in the App Store or Google Play. It\'s a free, separate app from the main VA app.' },
      { title: 'Test your device', description: 'Open the app and use the "Test" feature to check your camera, microphone, and internet connection before your first appointment.' },
      { title: 'Schedule a video visit', description: 'Call your VA clinic or use My HealtheVet (myhealth.va.gov) to schedule a video appointment with your provider.' },
      { title: 'Join your appointment', description: 'You\'ll receive an email with a link before your appointment. Click the link or open the app at your appointment time.' },
    ],
    features: [
      'Video visits with VA doctors and specialists',
      'Mental health counseling sessions',
      'Follow-up appointments',
      'Works on phone, tablet, or computer',
      'No cost for enrolled veterans',
      'Secure and HIPAA-compliant',
    ],
    tips: [
      'Test the app BEFORE your first appointment using the built-in test feature',
      'You\'ll get an email with a link to join — save that email',
      'Use a quiet, private room with good lighting',
      'If you don\'t have reliable internet, ask your VA clinic about "VA-to-VA" video visits from a nearby VA facility',
      'The VA also offers phone-only appointments if video is too difficult',
    ],
    troubleshooting: [
      { problem: 'Can\'t find the join link', solution: 'Check your email (including spam folder) for a message from the VA. The link usually arrives 1-2 days before your appointment.' },
      { problem: 'Video won\'t connect', solution: 'Make sure you have a strong internet connection. Try switching from WiFi to cellular data or vice versa. Close other apps.' },
      { problem: 'Doctor can\'t see or hear me', solution: 'Check that you granted the app camera and microphone permissions. On iPhone: Settings > VA Video Connect > toggle Camera and Microphone ON.' },
      { problem: 'Missed my appointment', solution: 'Call your VA clinic to reschedule. There\'s no penalty for missing a telehealth appointment.' },
    ],
  },
  {
    slug: 'teladoc',
    name: 'Teladoc Health',
    shortName: 'Teladoc',
    category: 'telehealth-service',
    url: 'https://www.teladoc.com',
    appIos: 'Teladoc on App Store',
    appAndroid: 'Teladoc on Google Play',
    description: 'Teladoc connects you with a doctor in minutes — 24/7, no appointment needed. Great for urgent issues like colds, flu, infections, rashes, and mental health support.',
    icon: '📞',
    cost: '$0-89 per visit (many insurance plans cover it)',
    acceptsMedicare: true,
    setupSteps: [
      { title: 'Check your insurance', description: 'Many Medicare Advantage plans, employer plans, and private insurance include Teladoc. Check your insurance card or call your plan.' },
      { title: 'Download the Teladoc app', description: 'Search "Teladoc" in the App Store or Google Play. You can also use teladoc.com on a computer.' },
      { title: 'Create an account', description: 'Enter your name, date of birth, address, phone number, and insurance information.' },
      { title: 'Add your medical history', description: 'List your medications, allergies, and health conditions. This helps the doctor prepare.' },
      { title: 'Request a visit', description: 'Choose "See a doctor now" for immediate availability, or schedule for a specific time. You can choose video or phone-only.' },
    ],
    features: [
      'Available 24/7, 365 days a year',
      'No appointment needed — see a doctor in minutes',
      'Video or phone-only visits',
      'Prescriptions sent to your pharmacy',
      'Mental health counseling available',
      'Dermatology (skin) consultations',
      'Average wait time under 10 minutes',
    ],
    tips: [
      'Check if your insurance covers Teladoc before your first visit — many plans offer it for free or low copay',
      'You can choose phone-only if video is too complicated',
      'Have your pharmacy name and address ready — the doctor can send prescriptions directly',
      'Keep your medication list updated in the app',
      'Teladoc doctors can\'t prescribe controlled substances (like pain medications)',
    ],
    troubleshooting: [
      { problem: 'Long wait time', solution: 'Wait times vary by time of day. Early mornings and late evenings are usually faster. You can also schedule a specific time.' },
      { problem: 'Insurance not recognized', solution: 'Try entering your Member ID exactly as shown on your card. Call your insurance to confirm Teladoc coverage.' },
      { problem: 'Need a prescription refill', solution: 'Teladoc doctors can prescribe most medications but cannot refill controlled substances. For refills, contact your regular doctor.' },
      { problem: 'Prefer phone only', solution: 'When requesting a visit, choose "Phone" instead of "Video." The doctor will call you at the number on file.' },
    ],
  },
  {
    slug: 'mdlive',
    name: 'MDLIVE',
    shortName: 'MDLIVE',
    category: 'telehealth-service',
    url: 'https://www.mdlive.com',
    appIos: 'MDLIVE on App Store',
    appAndroid: 'MDLIVE on Google Play',
    description: 'MDLIVE (now part of Evernorth/Cigna) offers on-demand video visits for urgent care, dermatology, and behavioral health. Accepted by many insurance plans.',
    icon: '💻',
    cost: '$0-82 per visit (varies by insurance)',
    acceptsMedicare: true,
    setupSteps: [
      { title: 'Check your insurance coverage', description: 'MDLIVE is included with many Cigna, Aetna, and Medicare Advantage plans. Check your benefits or call your insurance.' },
      { title: 'Download the MDLIVE app or visit mdlive.com', description: 'Available free on App Store and Google Play, or use your computer\'s web browser.' },
      { title: 'Create your account', description: 'Enter your personal details and insurance information. Add your medical history, medications, and allergies.' },
      { title: 'Choose your visit type', description: 'Select "Urgent Care" for immediate needs, "Dermatology" for skin issues, or "Behavioral Health" for counseling.' },
      { title: 'See a doctor', description: 'Choose video or phone visit. For urgent care, you can typically see a doctor within 15 minutes.' },
    ],
    features: [
      'Urgent care visits available 24/7',
      'Board-certified doctors',
      'Dermatology consultations (upload photos)',
      'Behavioral health and psychiatry',
      'Prescriptions sent to your pharmacy',
      'Video or phone visits',
    ],
    tips: [
      'Dermatology visits work differently — you upload photos of your skin concern and a dermatologist reviews them within 24 hours',
      'Behavioral health appointments are scheduled in advance, not on-demand',
      'Save your pharmacy information in your profile for faster prescription processing',
    ],
    troubleshooting: [
      { problem: 'Can\'t access through insurance', solution: 'Some plans use a custom MDLIVE portal. Check your insurance member website for a direct link.' },
      { problem: 'Doctor unavailable', solution: 'Try different times or select "next available doctor" instead of choosing a specific provider.' },
      { problem: 'Dermatology photos rejected', solution: 'Take photos in good lighting, close up, and from multiple angles. Follow the photo guide in the app.' },
    ],
  },
  {
    slug: 'amwell',
    name: 'Amwell',
    shortName: 'Amwell',
    category: 'telehealth-service',
    url: 'https://www.amwell.com',
    appIos: 'Amwell on App Store',
    appAndroid: 'Amwell on Google Play',
    description: 'Amwell offers on-demand video doctor visits for urgent care, therapy, psychiatry, and nutrition counseling. Accepted by many major insurance plans.',
    icon: '🩺',
    cost: '$0-79 per visit (varies by insurance)',
    acceptsMedicare: true,
    setupSteps: [
      { title: 'Check insurance coverage', description: 'Amwell is covered by many plans including Anthem, United Healthcare, and some Medicare Advantage plans.' },
      { title: 'Download the Amwell app', description: 'Search "Amwell" in App Store or Google Play. Also accessible at amwell.com on a computer.' },
      { title: 'Create your account', description: 'Enter your name, date of birth, state, and insurance details.' },
      { title: 'Complete your health profile', description: 'Add medications, allergies, health conditions, and your pharmacy.' },
      { title: 'Start a visit', description: 'Choose your visit type, describe your symptoms, and connect with a doctor.' },
    ],
    features: [
      'Urgent care available 7 days a week',
      'Therapy and psychiatry appointments',
      'Nutrition counseling',
      'Prescriptions sent directly to pharmacy',
      'Visit summaries saved in your account',
      'Available in most US states',
    ],
    tips: [
      'Amwell shows estimated wait times before you start — choose times with shorter waits',
      'Your visit summary is saved in the app so you can review what the doctor recommended',
      'If you need ongoing therapy, you can book recurring appointments with the same therapist',
    ],
    troubleshooting: [
      { problem: 'Service not available in my state', solution: 'Telehealth regulations vary by state. Check amwell.com for current availability in your area.' },
      { problem: 'High cost without insurance', solution: 'Without insurance, visits cost $79+. Check if your Medicare Advantage or supplemental plan covers telehealth.' },
      { problem: 'Connection dropped during visit', solution: 'The doctor will try to reconnect. If not, check your internet and rejoin. Your visit won\'t be charged again.' },
    ],
  },
  {
    slug: 'doctor-on-demand',
    name: 'Doctor on Demand (Included Health)',
    shortName: 'Doctor on Demand',
    category: 'telehealth-service',
    url: 'https://www.doctorondemand.com',
    appIos: 'Doctor on Demand on App Store',
    appAndroid: 'Doctor on Demand on Google Play',
    description: 'Doctor on Demand (now part of Included Health) provides video visits with board-certified doctors for urgent care, chronic conditions, and mental health.',
    icon: '👨‍⚕️',
    cost: '$0-75 per visit (many plans cover it)',
    acceptsMedicare: true,
    setupSteps: [
      { title: 'Check your benefits', description: 'Many employer plans and Medicare Advantage plans include Doctor on Demand. Check your insurance member portal.' },
      { title: 'Download the app', description: 'Search "Doctor on Demand" in App Store or Google Play.' },
      { title: 'Create your account', description: 'Enter personal details, insurance, medical history, and pharmacy information.' },
      { title: 'Choose your visit type', description: 'Select "Urgent Care" for same-day needs or "Behavioral Health" for therapy and psychiatry.' },
      { title: 'Connect with a doctor', description: 'Select "See a doctor now" and you\'ll be matched with an available physician within minutes.' },
    ],
    features: [
      'Same-day urgent care visits',
      'Chronic condition management',
      'Therapy and psychiatry',
      'Prescriptions and lab orders',
      'Specialist referrals',
      'Available 7 days a week',
    ],
    tips: [
      'Great for managing ongoing conditions — you can see the same doctor repeatedly',
      'Doctors can order lab work at nearby Quest Diagnostics locations',
      'Visit records can be shared with your primary care doctor',
    ],
    troubleshooting: [
      { problem: 'App merged with Included Health', solution: 'Doctor on Demand is now part of Included Health. You may need to download the "Included Health" app instead.' },
      { problem: 'Can\'t find a therapist', solution: 'Therapy appointments book up fast. Try scheduling several days in advance and be flexible with times.' },
      { problem: 'Visit was too short', solution: 'If you feel the doctor rushed, you can request a follow-up at no extra charge within the same episode of care.' },
    ],
  },
  {
    slug: 'cleveland-clinic-mychart',
    name: 'Cleveland Clinic MyChart',
    shortName: 'Cleveland Clinic',
    category: 'hospital-portal',
    url: 'https://my.clevelandclinic.org',
    appIos: 'Cleveland Clinic MyChart on App Store',
    appAndroid: 'Cleveland Clinic MyChart on Google Play',
    description: 'Cleveland Clinic\'s patient portal lets you schedule virtual visits with world-class specialists, view results, and communicate with your care team.',
    icon: '🏛️',
    cost: 'Free portal (copays apply for visits)',
    acceptsMedicare: true,
    setupSteps: [
      { title: 'Get access from Cleveland Clinic', description: 'If you\'re a Cleveland Clinic patient, you\'ll receive activation instructions by email or at your visit.' },
      { title: 'Download MyChart', description: 'Search "MyChart" in App Store/Google Play and select Cleveland Clinic when prompted for your organization.' },
      { title: 'Activate your account', description: 'Use the activation code from Cleveland Clinic to set up your username and password.' },
      { title: 'Schedule a virtual visit', description: 'Go to Visits > Schedule > filter by "Video Visit" to find available times with your doctor.' },
    ],
    features: [
      'Virtual visits with Cleveland Clinic specialists',
      'Express Care Online for minor issues',
      'Second opinions via video',
      'Test results and medical records',
      'Prescription management',
      'Appointment scheduling',
    ],
    tips: [
      'Express Care Online lets you get treated for simple issues without a full appointment',
      'Cleveland Clinic offers virtual second opinions from specialists',
      'You can share your medical records with doctors outside Cleveland Clinic',
    ],
    troubleshooting: [
      { problem: 'Don\'t have an activation code', solution: 'Call Cleveland Clinic at 216-444-2544 or ask at your next appointment.' },
      { problem: 'Can\'t schedule a video visit', solution: 'Not all departments offer video visits. Call 216-444-2200 to check availability.' },
      { problem: 'Which MyChart app to use?', solution: 'Download the standard "MyChart" app and search for "Cleveland Clinic" when it asks for your organization.' },
    ],
  },
]

// ── Helper Functions ────────────────────────────────────────────────────────

export function getAllTelehealthPlatforms(): TelehealthPlatform[] {
  return TELEHEALTH_PLATFORMS
}

export function getTelehealthBySlug(slug: string): TelehealthPlatform | undefined {
  return TELEHEALTH_PLATFORMS.find((p) => p.slug === slug)
}

export function getTelehealthByCategory(category: TelehealthCategory): TelehealthPlatform[] {
  return TELEHEALTH_PLATFORMS.filter((p) => p.category === category)
}

export function getTelehealthCategoryBySlug(slug: string): TelehealthCategoryInfo | undefined {
  return TELEHEALTH_CATEGORIES.find((c) => c.slug === slug)
}
