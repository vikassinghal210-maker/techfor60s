'use client'

import { useState, useMemo } from 'react'
import {
  Shield,
  Search,
  AlertTriangle,
  CheckCircle,
  Database,
  Lock,
  CreditCard,
  Mail,
  Eye,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowUpDown,
} from 'lucide-react'

// ── Breach Data ─────────────────────────────────────────────────────────────

interface Breach {
  company: string
  date: string
  year: number
  records: number
  recordsDisplay: string
  dataTypes: string[]
  description: string
  whatToDo: string[]
}

const BREACHES: Breach[] = [
  {
    company: 'National Public Data',
    date: 'August 2024',
    year: 2024,
    records: 2900000000,
    recordsDisplay: '2.9 Billion',
    dataTypes: ['names', 'SSNs', 'addresses', 'phone numbers'],
    description:
      'A massive breach of a background check company exposed billions of records including Social Security numbers, names, and addresses of people across the US, UK, and Canada.',
    whatToDo: [
      'Freeze your credit at all three bureaus (Equifax, Experian, TransUnion)',
      'Monitor your credit reports for unauthorized accounts',
      'File an IRS Identity Protection PIN to prevent tax fraud',
      'Consider identity theft protection services',
    ],
  },
  {
    company: 'Yahoo',
    date: 'August 2013',
    year: 2013,
    records: 3000000000,
    recordsDisplay: '3 Billion',
    dataTypes: ['emails', 'passwords', 'security questions', 'names'],
    description:
      'The largest data breach in history affected all 3 billion Yahoo user accounts. Stolen data included names, email addresses, phone numbers, dates of birth, and hashed passwords.',
    whatToDo: [
      'Change your Yahoo password and any accounts using the same password',
      'Update your security questions everywhere',
      'Enable two-factor authentication on Yahoo',
      'Watch for phishing emails using your leaked information',
    ],
  },
  {
    company: 'LinkedIn',
    date: 'June 2021',
    year: 2021,
    records: 700000000,
    recordsDisplay: '700 Million',
    dataTypes: ['emails', 'phone numbers', 'names', 'professional info'],
    description:
      'Data scraped from LinkedIn profiles was posted for sale, including email addresses, phone numbers, geolocation records, and professional details of nearly all LinkedIn members.',
    whatToDo: [
      'Be extra cautious of targeted phishing emails referencing your job',
      'Tighten LinkedIn privacy settings',
      'Do not click links in unexpected LinkedIn messages',
      'Change your LinkedIn password',
    ],
  },
  {
    company: 'Ticketmaster',
    date: 'May 2024',
    year: 2024,
    records: 560000000,
    recordsDisplay: '560 Million',
    dataTypes: ['names', 'emails', 'addresses', 'partial credit cards', 'phone numbers'],
    description:
      'A breach of Ticketmaster&apos;s parent company Live Nation exposed the personal data of over 560 million customers, including partial payment information and order history.',
    whatToDo: [
      'Monitor credit card statements for unauthorized charges',
      'Change your Ticketmaster password',
      'Be cautious of fake Ticketmaster emails or calls',
      'Consider a credit monitoring service',
    ],
  },
  {
    company: 'Facebook / Meta',
    date: 'April 2021',
    year: 2021,
    records: 533000000,
    recordsDisplay: '533 Million',
    dataTypes: ['phone numbers', 'emails', 'names', 'locations', 'dates of birth'],
    description:
      'Personal data of 533 million Facebook users from 106 countries was posted in a hacking forum. Data included phone numbers, full names, locations, and email addresses.',
    whatToDo: [
      'Be alert for scam calls and texts to your phone number',
      'Review and tighten your Facebook privacy settings',
      'Enable two-factor authentication on Facebook',
      'Do not answer calls from unknown numbers',
    ],
  },
  {
    company: 'Marriott',
    date: 'November 2018',
    year: 2018,
    records: 500000000,
    recordsDisplay: '500 Million',
    dataTypes: ['names', 'emails', 'passport numbers', 'credit cards', 'addresses'],
    description:
      'The Starwood guest reservation database was breached, exposing up to 500 million guest records including passport numbers and encrypted credit card numbers.',
    whatToDo: [
      'Check credit card statements from the affected period',
      'If your passport was exposed, consider getting a replacement',
      'Change your Marriott Bonvoy password',
      'Watch for suspicious travel bookings in your name',
    ],
  },
  {
    company: 'Twitter / X',
    date: 'January 2023',
    year: 2023,
    records: 200000000,
    recordsDisplay: '200 Million',
    dataTypes: ['emails', 'names', 'usernames'],
    description:
      'Email addresses associated with approximately 200 million Twitter/X accounts were leaked and posted on a hacking forum after a vulnerability was exploited.',
    whatToDo: [
      'Change your Twitter/X password',
      'Enable two-factor authentication',
      'Watch for phishing emails pretending to be from Twitter',
      'Do not click suspicious links in DMs',
    ],
  },
  {
    company: 'Equifax',
    date: 'September 2017',
    year: 2017,
    records: 147000000,
    recordsDisplay: '147 Million',
    dataTypes: ['SSNs', 'names', 'dates of birth', 'addresses', 'credit cards'],
    description:
      'One of the most damaging breaches in history. Equifax, a major credit bureau, exposed Social Security numbers, birth dates, and addresses of 147 million Americans.',
    whatToDo: [
      'Freeze your credit at all three bureaus immediately',
      'Check if you are eligible for the Equifax settlement',
      'File an IRS Identity Protection PIN',
      'Monitor your credit report for new accounts you did not open',
    ],
  },
  {
    company: 'Change Healthcare',
    date: 'February 2024',
    year: 2024,
    records: 100000000,
    recordsDisplay: '100+ Million',
    dataTypes: ['SSNs', 'health records', 'insurance info', 'names', 'addresses'],
    description:
      'A ransomware attack on Change Healthcare, a major health payment processor, exposed sensitive medical and personal data of over 100 million Americans.',
    whatToDo: [
      'Monitor your health insurance statements for fraudulent claims',
      'Place a fraud alert on your credit reports',
      'Watch for letters from your healthcare provider about the breach',
      'Consider freezing your credit',
    ],
  },
  {
    company: 'Capital One',
    date: 'July 2019',
    year: 2019,
    records: 100000000,
    recordsDisplay: '100 Million',
    dataTypes: ['SSNs', 'names', 'addresses', 'credit scores', 'bank account numbers'],
    description:
      'A former employee of a cloud company exploited a misconfigured firewall to access Capital One credit card applications and accounts.',
    whatToDo: [
      'Check your Capital One account for suspicious activity',
      'Freeze your credit if your SSN was exposed',
      'Capital One offered free credit monitoring — check if you are eligible',
      'Change your Capital One password',
    ],
  },
  {
    company: 'Anthem',
    date: 'February 2015',
    year: 2015,
    records: 78000000,
    recordsDisplay: '78 Million',
    dataTypes: ['SSNs', 'names', 'dates of birth', 'addresses', 'employment info'],
    description:
      'The second-largest health insurer in the US was breached, exposing Social Security numbers and personal data of nearly 80 million current and former members and employees.',
    whatToDo: [
      'Monitor your health insurance for fraudulent claims',
      'Freeze your credit at all three bureaus',
      'File an IRS Identity Protection PIN',
      'Be alert for phishing emails about health insurance',
    ],
  },
  {
    company: 'MOVEit',
    date: 'May 2023',
    year: 2023,
    records: 77000000,
    recordsDisplay: '77 Million',
    dataTypes: ['SSNs', 'names', 'financial data', 'health records'],
    description:
      'A vulnerability in the MOVEit file transfer software was exploited by the Clop ransomware group, affecting thousands of organizations and tens of millions of individuals worldwide.',
    whatToDo: [
      'Check if any companies you do business with were affected',
      'Monitor your credit reports and bank statements',
      'Watch for notification letters from affected companies',
      'Freeze your credit if your SSN was exposed',
    ],
  },
  {
    company: 'AT&T',
    date: 'March 2024',
    year: 2024,
    records: 73000000,
    recordsDisplay: '73 Million',
    dataTypes: ['SSNs', 'names', 'emails', 'addresses', 'phone numbers', 'dates of birth'],
    description:
      'AT&T disclosed that personal data of approximately 73 million current and former customers was leaked onto the dark web, including encrypted passcodes and Social Security numbers.',
    whatToDo: [
      'Change your AT&T account passcode immediately',
      'Freeze your credit at all three bureaus',
      'AT&T offered free credit monitoring — check your email',
      'Monitor your phone account for unauthorized changes',
    ],
  },
  {
    company: 'TransUnion',
    date: 'March 2022',
    year: 2022,
    records: 58000000,
    recordsDisplay: '58 Million',
    dataTypes: ['SSNs', 'names', 'dates of birth', 'credit information'],
    description:
      'The credit bureau TransUnion South Africa was breached, with attackers claiming to have obtained personal and credit data of tens of millions of consumers.',
    whatToDo: [
      'Freeze your credit at all three bureaus',
      'Monitor your credit reports closely',
      'Place a fraud alert on your credit file',
      'Watch for new accounts opened in your name',
    ],
  },
  {
    company: 'Uber',
    date: 'September 2022',
    year: 2022,
    records: 57000000,
    recordsDisplay: '57 Million',
    dataTypes: ['emails', 'names', 'phone numbers'],
    description:
      'A teenage hacker gained access to Uber&apos;s internal systems through social engineering. This followed a 2016 breach that Uber had previously covered up, affecting 57 million riders and drivers.',
    whatToDo: [
      'Change your Uber password',
      'Enable two-factor authentication on your Uber account',
      'Monitor your email for phishing attempts',
      'Review your Uber account for unauthorized rides or charges',
    ],
  },
  {
    company: 'Home Depot',
    date: 'September 2014',
    year: 2014,
    records: 56000000,
    recordsDisplay: '56 Million',
    dataTypes: ['credit cards', 'debit cards', 'emails'],
    description:
      'Hackers used custom-built malware on Home Depot&apos;s self-checkout systems to steal payment card data from 56 million customers over a five-month period.',
    whatToDo: [
      'Check credit and debit card statements from mid-2014',
      'If you used a card at Home Depot during that period, request a replacement',
      'Monitor your credit reports',
      'Watch for unauthorized charges',
    ],
  },
  {
    company: 'Target',
    date: 'December 2013',
    year: 2013,
    records: 40000000,
    recordsDisplay: '40 Million',
    dataTypes: ['credit cards', 'debit cards', 'names', 'addresses', 'phone numbers'],
    description:
      'During the holiday shopping season, hackers installed malware on Target&apos;s payment systems, stealing credit and debit card data from 40 million shoppers.',
    whatToDo: [
      'If you shopped at Target in late 2013, check old statements',
      'Cards used during that period should have been replaced',
      'Monitor credit reports for any long-term effects',
      'Be cautious of phishing emails referencing Target',
    ],
  },
  {
    company: 'T-Mobile',
    date: 'January 2023',
    year: 2023,
    records: 37000000,
    recordsDisplay: '37 Million',
    dataTypes: ['names', 'emails', 'phone numbers', 'dates of birth', 'addresses'],
    description:
      'T-Mobile disclosed that a bad actor accessed personal data of approximately 37 million postpaid and prepaid customer accounts through an exploited API.',
    whatToDo: [
      'Change your T-Mobile account PIN and password',
      'Enable extra security features on your T-Mobile account',
      'Watch for SIM swap fraud — call T-Mobile if your phone stops working',
      'Be cautious of calls or texts claiming to be from T-Mobile',
    ],
  },
  {
    company: 'Xfinity',
    date: 'October 2023',
    year: 2023,
    records: 35900000,
    recordsDisplay: '35.9 Million',
    dataTypes: ['usernames', 'passwords', 'names', 'dates of birth', 'SSNs', 'security questions'],
    description:
      'Comcast&apos;s Xfinity division was breached through the Citrix Bleed vulnerability, exposing usernames, hashed passwords, and for some customers, Social Security numbers.',
    whatToDo: [
      'Change your Xfinity password immediately',
      'Reset your security questions',
      'Enable two-factor authentication',
      'If your SSN was exposed, freeze your credit',
    ],
  },
  {
    company: 'LastPass',
    date: 'August 2022',
    year: 2022,
    records: 25000000,
    recordsDisplay: '25 Million',
    dataTypes: ['encrypted passwords', 'emails', 'names', 'vault data'],
    description:
      'The popular password manager was breached, and attackers obtained copies of customer vault data. While vaults were encrypted, weak master passwords could potentially be cracked.',
    whatToDo: [
      'Change your LastPass master password immediately',
      'Change all passwords stored in your LastPass vault',
      'Consider switching to a different password manager',
      'Enable two-factor authentication everywhere',
    ],
  },
  {
    company: 'MGM Resorts',
    date: 'September 2023',
    year: 2023,
    records: 10000000,
    recordsDisplay: '10 Million',
    dataTypes: ['SSNs', 'passport numbers', 'names', 'dates of birth', 'driver licenses'],
    description:
      'A social engineering attack on MGM Resorts shut down casino operations and exposed personal data of millions of loyalty program members, costing the company over $100 million.',
    whatToDo: [
      'Change your MGM Rewards password',
      'If your SSN or passport was exposed, freeze credit and consider replacement',
      'Monitor your bank and credit card statements',
      'Be alert for phishing emails about MGM or casino rewards',
    ],
  },
  {
    company: 'Cash App',
    date: 'April 2022',
    year: 2022,
    records: 8200000,
    recordsDisplay: '8.2 Million',
    dataTypes: ['names', 'brokerage account numbers', 'portfolio values', 'stock trading activity'],
    description:
      'A former Cash App employee accessed reports containing customer investing data after leaving the company. The breach exposed brokerage information for 8.2 million users.',
    whatToDo: [
      'Review your Cash App Investing account for unauthorized trades',
      'Change your Cash App PIN and password',
      'Enable security lock on Cash App',
      'Monitor your investment accounts for suspicious activity',
    ],
  },
  {
    company: '23andMe',
    date: 'October 2023',
    year: 2023,
    records: 6900000,
    recordsDisplay: '6.9 Million',
    dataTypes: ['genetic data', 'names', 'dates of birth', 'locations', 'ancestry info'],
    description:
      'Hackers used credential stuffing to access 23andMe accounts and scraped genetic ancestry data. The breach was especially sensitive due to the nature of DNA and health-related data.',
    whatToDo: [
      'Change your 23andMe password',
      'Enable two-factor authentication',
      'Consider deleting your genetic data from the platform',
      'Be aware that genetic data cannot be changed like a password',
    ],
  },
  {
    company: 'HealthEC',
    date: 'October 2023',
    year: 2023,
    records: 4500000,
    recordsDisplay: '4.5 Million',
    dataTypes: ['SSNs', 'health records', 'insurance info', 'names', 'dates of birth'],
    description:
      'HealthEC, a health management solutions provider, suffered a breach exposing patient data including Social Security numbers, medical records, and insurance details.',
    whatToDo: [
      'Monitor your health insurance for fraudulent claims',
      'Freeze your credit if your SSN was exposed',
      'Watch for notification letters from your healthcare provider',
      'Be cautious of calls claiming to be from your doctor or insurer',
    ],
  },
  {
    company: 'Roku',
    date: 'March 2024',
    year: 2024,
    records: 576000,
    recordsDisplay: '576,000',
    dataTypes: ['emails', 'passwords', 'payment methods'],
    description:
      'Roku disclosed two credential stuffing incidents where attackers used stolen credentials from other breaches to access customer accounts and make unauthorized purchases.',
    whatToDo: [
      'Change your Roku password immediately',
      'Enable two-factor authentication on Roku',
      'Check your account for unauthorized purchases or subscriptions',
      'Remove saved payment methods and re-add them',
    ],
  },
]

// All unique data types for filtering
const ALL_DATA_TYPES = Array.from(
  new Set(BREACHES.flatMap((b) => b.dataTypes))
).sort()

// ── Component ───────────────────────────────────────────────────────────────

type SortField = 'date' | 'records'
type SortDir = 'asc' | 'desc'

export default function DataBreachChecker() {
  // Section A — email check
  const [email, setEmail] = useState('')
  const [emailChecked, setEmailChecked] = useState(false)

  // Section B — breach database
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('')
  const [sortField, setSortField] = useState<SortField>('records')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  // Section C — checklist
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})

  // ── Section A logic ─────────────────────────────────────────────────────

  function handleEmailCheck(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) {
      setEmailChecked(true)
    }
  }

  // ── Section B logic ─────────────────────────────────────────────────────

  const filteredBreaches = useMemo(() => {
    let list = [...BREACHES]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter((b) => b.company.toLowerCase().includes(q))
    }

    if (filterType) {
      list = list.filter((b) => b.dataTypes.includes(filterType))
    }

    list.sort((a, b) => {
      if (sortField === 'date') {
        return sortDir === 'desc' ? b.year - a.year : a.year - b.year
      }
      return sortDir === 'desc' ? b.records - a.records : a.records - b.records
    })

    return list
  }, [searchQuery, filterType, sortField, sortDir])

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  // ── Section C logic ─────────────────────────────────────────────────────

  const checklistItems = [
    {
      id: 'passwords',
      label: 'Change passwords on affected accounts',
      detail:
        'Use a unique, strong password for each account. A password manager can help you keep track of them all.',
    },
    {
      id: '2fa',
      label: 'Enable two-factor authentication (2FA)',
      detail:
        'This adds an extra layer of security. Even if someone has your password, they cannot get in without the second code.',
    },
    {
      id: 'credit-reports',
      label: 'Check your credit reports',
      detail:
        'Visit AnnualCreditReport.com to get free credit reports from Equifax, Experian, and TransUnion. Look for accounts you did not open.',
    },
    {
      id: 'fraud-alert',
      label: 'Place a fraud alert on your credit',
      detail:
        'Call one of the three credit bureaus — they are required to notify the other two. A fraud alert lasts one year and is free.',
    },
    {
      id: 'credit-freeze',
      label: 'Consider a credit freeze',
      detail:
        'A credit freeze prevents anyone from opening new credit in your name. You can temporarily lift it when you need to apply for credit.',
    },
    {
      id: 'bank-monitor',
      label: 'Monitor bank and credit card statements',
      detail:
        'Review your statements weekly for any charges you do not recognize. Report suspicious transactions to your bank immediately.',
    },
    {
      id: 'hibp',
      label: 'Check HaveIBeenPwned.com for your email',
      detail:
        'This free, trusted website checks if your email address appeared in any known data breaches. Bookmark it and check periodically.',
    },
  ]

  function toggleCheck(id: string) {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const completedCount = Object.values(checklist).filter(Boolean).length

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="space-y-12">
      {/* ── Section A: Check Your Email ──────────────────────────────── */}
      <section
        className="rounded-xl border p-6 sm:p-8"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-7 h-7 text-brand-blue flex-shrink-0" />
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)]"
            style={{ color: 'var(--text-primary)' }}
          >
            Check Your Email
          </h2>
        </div>

        <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          Enter your email address below to learn about data breaches and what steps to take.
          This tool is <strong>educational only</strong> — for a real breach check, we recommend
          the trusted, free service linked below.
        </p>

        <form onSubmit={handleEmailCheck} className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: 'var(--text-secondary)' }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailChecked(false)
              }}
              placeholder="you@example.com"
              required
              className="w-full pl-10 pr-4 py-3 text-lg rounded-lg border outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              aria-label="Email address"
            />
          </div>
          <button
            type="submit"
            className="bg-brand-blue text-white px-6 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Check
          </button>
        </form>

        {emailChecked && (
          <div
            className="rounded-lg border p-5 space-y-4"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  We cannot check your email from this page
                </p>
                <p className="text-lg leading-relaxed mt-1" style={{ color: 'var(--text-secondary)' }}>
                  For your privacy and security, we do not store or transmit your email address.
                  To find out if <strong>{email}</strong> has been involved in a data breach, use the
                  free, trusted tool below:
                </p>
              </div>
            </div>

            <a
              href={`https://haveibeenpwned.com/account/${encodeURIComponent(email)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Shield className="w-5 h-5" />
              Check on HaveIBeenPwned.com
              <ExternalLink className="w-4 h-4" />
            </a>

            <div
              className="rounded-lg p-4 mt-2"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                <Eye className="w-5 h-5 inline mr-2" />
                What is HaveIBeenPwned.com?
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                HaveIBeenPwned (HIBP) is a free, widely trusted website created by security expert
                Troy Hunt. It checks if your email address appears in any known data breaches.
                It is recommended by governments, banks, and cybersecurity professionals worldwide.
                The site does not store your email or share it with anyone.
              </p>
            </div>

            <div
              className="rounded-lg p-4 border"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                <Lock className="w-5 h-5 inline mr-2" />
                If your email was in a breach:
              </p>
              <ul className="space-y-2 text-lg" style={{ color: 'var(--text-secondary)' }}>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Change the password for that account right away</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Change the password anywhere else you used the same one</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Turn on two-factor authentication if available</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Watch for suspicious emails or calls related to the breached service</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* ── Section B: Major Data Breaches ───────────────────────────── */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-7 h-7 text-brand-blue flex-shrink-0" />
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)]"
            style={{ color: 'var(--text-primary)' }}
          >
            Major Data Breaches
          </h2>
        </div>

        <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          Browse {BREACHES.length} of the largest known data breaches. Search by company name,
          filter by the type of data exposed, and click any breach card to learn more and see
          what steps to take.
        </p>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: 'var(--text-secondary)' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company name..."
              className="w-full pl-10 pr-4 py-3 text-lg rounded-lg border outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              aria-label="Search breaches by company name"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="py-3 px-4 text-lg rounded-lg border outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            aria-label="Filter by type of data exposed"
          >
            <option value="">All data types</option>
            {ALL_DATA_TYPES.map((dt) => (
              <option key={dt} value={dt}>
                {dt.charAt(0).toUpperCase() + dt.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sort buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => toggleSort('records')}
            className="flex items-center gap-1 text-base font-medium px-3 py-1.5 rounded-lg border hover:opacity-80 transition-opacity"
            style={{
              borderColor: 'var(--border-color)',
              color: sortField === 'records' ? 'var(--text-primary)' : 'var(--text-secondary)',
              backgroundColor: sortField === 'records' ? 'var(--bg-secondary)' : 'transparent',
            }}
          >
            <ArrowUpDown className="w-4 h-4" />
            Records {sortField === 'records' && (sortDir === 'desc' ? '↓' : '↑')}
          </button>
          <button
            onClick={() => toggleSort('date')}
            className="flex items-center gap-1 text-base font-medium px-3 py-1.5 rounded-lg border hover:opacity-80 transition-opacity"
            style={{
              borderColor: 'var(--border-color)',
              color: sortField === 'date' ? 'var(--text-primary)' : 'var(--text-secondary)',
              backgroundColor: sortField === 'date' ? 'var(--bg-secondary)' : 'transparent',
            }}
          >
            <ArrowUpDown className="w-4 h-4" />
            Date {sortField === 'date' && (sortDir === 'desc' ? '↓' : '↑')}
          </button>
        </div>

        {/* Results count */}
        <p className="text-base mb-4" style={{ color: 'var(--text-secondary)' }}>
          Showing {filteredBreaches.length} of {BREACHES.length} breaches
        </p>

        {/* Breach cards */}
        <div className="space-y-3">
          {filteredBreaches.length === 0 && (
            <p className="text-lg py-8 text-center" style={{ color: 'var(--text-secondary)' }}>
              No breaches found matching your search. Try a different company name or filter.
            </p>
          )}
          {filteredBreaches.map((breach, i) => {
            const isExpanded = expandedIndex === i
            return (
              <div
                key={breach.company + breach.year}
                className="rounded-xl border overflow-hidden transition-all"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  aria-expanded={isExpanded}
                  aria-label={`${breach.company} breach details`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span
                        className="text-lg font-bold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {breach.company}
                      </span>
                      <span className="text-base" style={{ color: 'var(--text-secondary)' }}>
                        {breach.date}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                      <span className="text-base font-semibold text-red-500">
                        {breach.recordsDisplay} records
                      </span>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {breach.dataTypes.join(', ')}
                      </span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-secondary)' }} />
                  ) : (
                    <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-secondary)' }} />
                  )}
                </button>

                {isExpanded && (
                  <div
                    className="px-5 pb-5 border-t"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    <p className="text-lg leading-relaxed mt-4 mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {breach.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {breach.dataTypes.map((dt) => (
                        <span
                          key={dt}
                          className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full border"
                          style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                        >
                          {dt === 'credit cards' || dt === 'debit cards' || dt === 'partial credit cards' ? (
                            <CreditCard className="w-3.5 h-3.5" />
                          ) : dt === 'passwords' || dt === 'encrypted passwords' ? (
                            <Lock className="w-3.5 h-3.5" />
                          ) : dt === 'emails' ? (
                            <Mail className="w-3.5 h-3.5" />
                          ) : dt === 'SSNs' ? (
                            <Shield className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                          {dt}
                        </span>
                      ))}
                    </div>

                    <div
                      className="rounded-lg p-4"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <p className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                        <Shield className="w-5 h-5 inline mr-2 text-brand-blue" />
                        What to do if you were affected:
                      </p>
                      <ul className="space-y-2">
                        {breach.whatToDo.map((step, si) => (
                          <li
                            key={si}
                            className="flex items-start gap-2 text-lg"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Section C: What To Do After a Data Breach ────────────────── */}
      <section
        className="rounded-xl border p-6 sm:p-8"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-7 h-7 text-brand-blue flex-shrink-0" />
          <h2
            className="text-2xl font-bold font-[family-name:var(--font-heading)]"
            style={{ color: 'var(--text-primary)' }}
          >
            What To Do After a Data Breach
          </h2>
        </div>

        <p className="text-lg leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>
          Use this interactive checklist to make sure you have taken the most important steps
          to protect yourself. Check off each item as you complete it.
        </p>

        <p className="text-base font-semibold mb-6 text-brand-blue">
          {completedCount} of {checklistItems.length} steps completed
        </p>

        {/* Progress bar */}
        <div
          className="w-full h-3 rounded-full mb-6 overflow-hidden"
          style={{ backgroundColor: 'var(--border-color)' }}
        >
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-300"
            style={{ width: `${(completedCount / checklistItems.length) * 100}%` }}
          />
        </div>

        <div className="space-y-3">
          {checklistItems.map((item) => (
            <label
              key={item.id}
              className="flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <input
                type="checkbox"
                checked={checklist[item.id] || false}
                onChange={() => toggleCheck(item.id)}
                className="mt-1 w-5 h-5 rounded accent-blue-600 flex-shrink-0"
              />
              <div>
                <span
                  className={`text-lg font-semibold ${
                    checklist[item.id] ? 'line-through opacity-60' : ''
                  }`}
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.label}
                </span>
                <p className="text-base mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.detail}
                </p>
              </div>
            </label>
          ))}
        </div>

        {completedCount === checklistItems.length && (
          <div className="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <p className="text-lg font-semibold text-green-700 dark:text-green-400">
              Great job! You have completed all the recommended steps to protect yourself.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
