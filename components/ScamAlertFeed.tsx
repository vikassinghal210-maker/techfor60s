'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ShieldAlert,
  Phone,
  Mail,
  MessageSquare,
  Globe,
  Users,
  Search,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Shield,
  Filter,
} from 'lucide-react'

type Severity = 'High' | 'Medium' | 'Low'
type Category = 'Phone' | 'Email' | 'Text' | 'Online' | 'In-person'

interface ScamAlert {
  id: number
  title: string
  description: string
  date: string
  severity: Severity
  category: Category
  tip: string
  blogLink?: string
}

const SCAM_ALERTS: ScamAlert[] = [
  {
    id: 1,
    title: 'Fake SSA Calls Threatening Arrest',
    description:
      'Scammers call pretending to be from the Social Security Administration, claiming your Social Security number has been suspended due to suspicious activity. They threaten arrest or legal action unless you pay immediately via gift cards or wire transfer. The real SSA will never call you to threaten benefits or demand payment.',
    date: '2026-03-28',
    severity: 'High',
    category: 'Phone',
    tip: 'Hang up immediately. The SSA will never threaten you by phone. Call the real SSA at 1-800-772-1213 to verify.',
    blogLink: '/blog/phone-scams-targeting-seniors',
  },
  {
    id: 2,
    title: 'Amazon Order Confirmation Phishing',
    description:
      'You receive an email that looks like it comes from Amazon, confirming an expensive order you never placed. The email urges you to click a link to "cancel" the order, which leads to a fake website designed to steal your login credentials and credit card information.',
    date: '2026-03-25',
    severity: 'High',
    category: 'Email',
    tip: 'Do not click any links in the email. Log into your Amazon account directly by typing amazon.com in your browser to check your orders.',
    blogLink: '/blog/how-to-spot-scam-emails',
  },
  {
    id: 3,
    title: 'Medicare Card Replacement Scam',
    description:
      'Callers pose as Medicare representatives, claiming you need a new Medicare card. They ask for your Medicare number, Social Security number, and banking details to "process" the new card. This information is then used for identity theft and fraudulent billing.',
    date: '2026-03-22',
    severity: 'High',
    category: 'Phone',
    tip: 'Medicare will never call you to ask for your personal information. If you need a new card, call 1-800-MEDICARE (1-800-633-4227) directly.',
    blogLink: '/blog/phone-scams-targeting-seniors',
  },
  {
    id: 4,
    title: 'Fake Package Delivery Texts',
    description:
      'A text message claims a package could not be delivered and asks you to click a link to reschedule delivery or pay a small fee. The link leads to a phishing site that steals your personal and financial information.',
    date: '2026-03-20',
    severity: 'Medium',
    category: 'Text',
    tip: 'Do not click the link. If you are expecting a package, check the tracking number on the official carrier website (USPS, UPS, or FedEx) instead.',
  },
  {
    id: 5,
    title: 'AI Voice Cloning Grandparent Scam',
    description:
      'Scammers use artificial intelligence to clone a family member&apos;s voice, then call grandparents pretending to be their grandchild in an emergency — such as being in jail or having a car accident. They beg for money and plead with you not to tell anyone else in the family.',
    date: '2026-03-18',
    severity: 'High',
    category: 'Phone',
    tip: 'Always verify by calling the family member back on their known phone number. Set up a secret family code word that only real family members would know.',
    blogLink: '/blog/phone-scams-targeting-seniors',
  },
  {
    id: 6,
    title: 'Facebook Marketplace Payment Scam',
    description:
      'When buying or selling on Facebook Marketplace, scammers send fake payment confirmations or overpay with a fraudulent check and ask you to refund the difference. They may also ask to pay outside the platform using Zelle or wire transfer.',
    date: '2026-03-15',
    severity: 'Medium',
    category: 'Online',
    tip: 'Only accept payments through the platform. Never refund an overpayment — it is almost always a scam. Meet in person at a public place for local sales.',
    blogLink: '/blog/what-is-cyber-crime-guide-for-seniors',
  },
  {
    id: 7,
    title: 'Fake Geek Squad Renewal Email',
    description:
      'An email claims your Geek Squad or Best Buy subscription is about to auto-renew for a large amount (often $300-$500). It urges you to call a phone number to cancel. The number connects you to a scammer who asks for remote access to your computer and your banking information.',
    date: '2026-03-12',
    severity: 'High',
    category: 'Email',
    tip: 'Do not call the number in the email. If you have a Geek Squad subscription, check your account at bestbuy.com directly or call the number on your original receipt.',
    blogLink: '/blog/how-to-spot-scam-emails',
  },
  {
    id: 8,
    title: 'Utility Company Shut-off Threat',
    description:
      'You receive a call claiming to be from your electric, gas, or water company, saying your service will be shut off within the hour unless you make an immediate payment — often by gift card or cryptocurrency. Real utility companies give written notice before disconnection.',
    date: '2026-03-10',
    severity: 'Medium',
    category: 'Phone',
    tip: 'Hang up and call the number on your utility bill directly. Real companies send written notices and never demand gift card payments.',
  },
  {
    id: 9,
    title: 'Romance Scam via Dating Apps',
    description:
      'Scammers create fake profiles on dating sites and apps, building emotional relationships over weeks or months. Once trust is established, they ask for money for emergencies, travel to meet you, or investment opportunities. They always have excuses for why they cannot meet in person.',
    date: '2026-03-08',
    severity: 'High',
    category: 'Online',
    tip: 'Never send money to someone you have not met in person. Be suspicious if they avoid video calls or always cancel plans to meet. Ask a trusted friend for their opinion.',
    blogLink: '/blog/what-is-cyber-crime-guide-for-seniors',
  },
  {
    id: 10,
    title: 'Fake Lottery Winner Notification',
    description:
      'An email or letter congratulates you on winning a lottery or sweepstakes you never entered. To claim your prize, you must pay taxes, fees, or provide bank details. Legitimate lotteries never ask winners to pay upfront fees.',
    date: '2026-03-05',
    severity: 'Medium',
    category: 'Email',
    tip: 'You cannot win a lottery you did not enter. Never pay fees to claim a prize. Delete the email or throw away the letter.',
    blogLink: '/blog/how-to-spot-scam-emails',
  },
  {
    id: 11,
    title: 'IRS Tax Refund Phishing Email',
    description:
      'An email pretending to be from the IRS claims you have an unclaimed tax refund. It asks you to click a link and enter personal information including your Social Security number and bank details. The IRS never initiates contact by email about refunds.',
    date: '2026-03-02',
    severity: 'High',
    category: 'Email',
    tip: 'The IRS will never email you about a refund. Check your refund status at irs.gov/refunds or call 1-800-829-1040.',
    blogLink: '/blog/how-to-spot-scam-emails',
  },
  {
    id: 12,
    title: 'Zelle/Venmo Unauthorized Payment Text',
    description:
      'A text message claims someone is trying to send you money through Zelle or Venmo, or that there has been unauthorized activity on your account. It asks you to click a link or call a number to verify. The link steals your banking credentials.',
    date: '2026-02-28',
    severity: 'High',
    category: 'Text',
    tip: 'Do not click any links. Open your banking app directly to check for any real issues. Call your bank using the number on the back of your card.',
  },
  {
    id: 13,
    title: 'Fake Bank Fraud Alert Text',
    description:
      'You receive a text that appears to be from your bank, warning about a suspicious transaction on your account. It asks you to reply with "YES" or "NO" or click a link to verify the charge. Responding connects you with scammers who steal your account details.',
    date: '2026-02-25',
    severity: 'High',
    category: 'Text',
    tip: 'Never respond to unexpected fraud alert texts. Call your bank directly using the number on the back of your debit or credit card.',
  },
  {
    id: 14,
    title: 'Tech Support Pop-up Scam',
    description:
      'A scary pop-up appears on your computer screen warning that your computer has been infected with a virus. It displays a phone number to call for "Microsoft" or "Apple" support. Calling the number connects you to scammers who charge for fake repairs and install malware.',
    date: '2026-02-20',
    severity: 'Medium',
    category: 'Online',
    tip: 'Close the pop-up by pressing Alt+F4 (Windows) or Command+Q (Mac). Real tech companies never show pop-ups with phone numbers. Run your regular antivirus scan instead.',
    blogLink: '/blog/what-is-cyber-crime-guide-for-seniors',
  },
  {
    id: 15,
    title: 'Charity Donation Scam After Disaster',
    description:
      'After natural disasters or tragic events, scammers create fake charities to collect donations. They use names similar to real charities and pressure you to donate immediately by phone, often asking for gift cards or wire transfers.',
    date: '2026-02-15',
    severity: 'Medium',
    category: 'Phone',
    tip: 'Donate only to established charities you know. Verify any charity at give.org or charitynavigator.org before donating. Never donate by gift card.',
  },
  {
    id: 16,
    title: 'Investment/Crypto Scam on Social Media',
    description:
      'Ads or messages on social media promise guaranteed high returns from cryptocurrency or other investments. They show fake testimonials and screenshots of earnings. Victims are asked to invest small amounts first, see fake profits, then lose everything when they invest more.',
    date: '2026-02-10',
    severity: 'High',
    category: 'Online',
    tip: 'No legitimate investment guarantees returns. Be skeptical of unsolicited investment advice on social media. Consult a licensed financial advisor before investing.',
    blogLink: '/blog/what-is-cyber-crime-guide-for-seniors',
  },
  {
    id: 17,
    title: 'Fake Prescription Drug Discount',
    description:
      'Emails advertise heavily discounted prescription medications from online pharmacies. These may be counterfeit drugs that are ineffective or dangerous. The websites also collect your financial and health information for identity theft.',
    date: '2026-02-05',
    severity: 'Medium',
    category: 'Email',
    tip: 'Only buy medications from licensed pharmacies. Verify online pharmacies at pharmacy.nabp.net. Talk to your doctor about legitimate discount programs.',
  },
  {
    id: 18,
    title: 'Home Repair/Contractor Scam',
    description:
      'Someone knocks on your door offering home repairs at a low price, often claiming they noticed damage to your roof or driveway. They demand a large upfront payment, do poor quality work or none at all, and disappear. Some also use the visit to scout your home for theft.',
    date: '2026-01-30',
    severity: 'Medium',
    category: 'In-person',
    tip: 'Never hire door-to-door contractors. Get at least three written estimates from licensed, insured contractors. Never pay more than a small deposit upfront.',
  },
  {
    id: 19,
    title: 'Fake Jury Duty Threat',
    description:
      'A caller claims to be from the local courthouse, saying you missed jury duty and there is a warrant for your arrest. They offer to "resolve" the issue if you pay a fine immediately, usually by gift card or wire transfer. Real courts send notices by mail, not phone calls.',
    date: '2026-01-25',
    severity: 'Medium',
    category: 'Phone',
    tip: 'Hang up. Courts notify you about jury duty by mail, not by phone. If concerned, call your local courthouse directly using the number from their official website.',
  },
  {
    id: 20,
    title: 'Gift Card Payment Demand',
    description:
      'A caller posing as a government agent, utility company, or even a family member demands you buy gift cards (iTunes, Google Play, Amazon) and read the numbers over the phone as a form of payment. No legitimate business or government agency accepts gift cards as payment.',
    date: '2026-01-20',
    severity: 'High',
    category: 'Phone',
    tip: 'No real business or government agency asks for gift card payments. If someone demands gift cards, it is always a scam. Hang up immediately.',
    blogLink: '/blog/phone-scams-targeting-seniors',
  },
  {
    id: 21,
    title: 'Fake Shipping Fee Text from USPS',
    description:
      'A text message claims to be from USPS, saying your package requires a small shipping fee before delivery. The link leads to a convincing fake USPS website that steals your credit card information.',
    date: '2026-01-15',
    severity: 'Medium',
    category: 'Text',
    tip: 'USPS does not send texts asking for payment. Track packages only at usps.com. Delete the text and do not click any links.',
  },
  {
    id: 22,
    title: 'Fake Anti-Virus Software Email',
    description:
      'An email warns that your computer is at risk and offers a free or discounted anti-virus program. Downloading the software actually installs malware that steals your personal information or locks your files for ransom.',
    date: '2026-01-10',
    severity: 'High',
    category: 'Email',
    tip: 'Only download security software from well-known companies (Norton, McAfee, Bitdefender) by going to their official website directly. Never click download links in emails.',
    blogLink: '/blog/how-to-spot-scam-emails',
  },
]

const CATEGORY_OPTIONS = ['All', 'Phone', 'Email', 'Text', 'Online', 'In-person'] as const

const categoryIcons: Record<Category, typeof Phone> = {
  Phone: Phone,
  Email: Mail,
  Text: MessageSquare,
  Online: Globe,
  'In-person': Users,
}

const severityColors: Record<Severity, { bg: string; text: string; border: string }> = {
  High: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', border: 'border-red-300 dark:border-red-700' },
  Medium: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-300 dark:border-amber-700' },
  Low: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', border: 'border-green-300 dark:border-green-700' },
}

function formatAlertDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ScamAlertFeed() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filteredAlerts = useMemo(() => {
    return SCAM_ALERTS.filter((alert) => {
      const matchesCategory = activeCategory === 'All' || alert.category === activeCategory
      const matchesSearch =
        searchQuery.trim() === '' ||
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <div
          className="flex items-center gap-3 rounded-xl border px-4 py-3"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <Search size={22} style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Search scam alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-lg outline-none placeholder:text-gray-400"
            style={{ color: 'var(--text-primary)' }}
            aria-label="Search scam alerts"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={18} style={{ color: 'var(--text-secondary)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            Filter by type:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-base font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-brand-blue text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              style={
                activeCategory !== cat
                  ? { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }
                  : undefined
              }
              aria-pressed={activeCategory === cat}
            >
              {cat === 'All' ? 'All Scams' : `${cat} Scams`}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-base mb-4" style={{ color: 'var(--text-secondary)' }}>
        Showing {filteredAlerts.length} of {SCAM_ALERTS.length} alerts
      </p>

      {/* Alert Cards */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div
            className="rounded-xl border p-8 text-center"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
          >
            <ShieldAlert size={48} className="mx-auto mb-4" style={{ color: 'var(--text-secondary)' }} />
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              No scam alerts match your search. Try a different keyword or category.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isExpanded = expandedId === alert.id
            const CategoryIcon = categoryIcons[alert.category]
            const severity = severityColors[alert.severity]

            return (
              <div
                key={alert.id}
                className="rounded-xl border overflow-hidden transition-shadow hover:shadow-md"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
              >
                {/* Card Header — always visible */}
                <button
                  onClick={() => toggleExpand(alert.id)}
                  className="w-full text-left p-5 flex items-start gap-4 cursor-pointer"
                  aria-expanded={isExpanded}
                  aria-controls={`alert-details-${alert.id}`}
                >
                  {/* Severity icon */}
                  <div className="flex-shrink-0 mt-1">
                    {alert.severity === 'High' ? (
                      <AlertTriangle size={28} className="text-red-500" />
                    ) : (
                      <Shield size={28} className="text-amber-500" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <h3
                      className="text-lg font-semibold leading-snug mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {alert.title}
                    </h3>

                    {/* Tags row */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Severity badge */}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${severity.bg} ${severity.text} ${severity.border} border`}
                      >
                        {alert.severity} Risk
                      </span>

                      {/* Category badge */}
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm font-medium border"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-secondary)',
                          borderColor: 'var(--border-color)',
                        }}
                      >
                        <CategoryIcon size={14} />
                        {alert.category}
                      </span>

                      {/* Date */}
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {formatAlertDate(alert.date)}
                      </span>
                    </div>
                  </div>

                  {/* Expand/collapse icon */}
                  <div className="flex-shrink-0 mt-1" style={{ color: 'var(--text-secondary)' }}>
                    {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>

                {/* Card Details — expanded */}
                {isExpanded && (
                  <div
                    id={`alert-details-${alert.id}`}
                    className="px-5 pb-5 border-t"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    {/* Description */}
                    <div className="mt-4 mb-4">
                      <h4 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                        How This Scam Works
                      </h4>
                      <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {alert.description}
                      </p>
                    </div>

                    {/* Protection tip */}
                    <div
                      className="rounded-lg border p-4 mb-4"
                      style={{
                        backgroundColor: 'rgba(34, 197, 94, 0.08)',
                        borderColor: 'rgba(34, 197, 94, 0.3)',
                      }}
                    >
                      <h4 className="text-base font-semibold mb-1 text-green-700 dark:text-green-400 flex items-center gap-2">
                        <Shield size={18} />
                        How to Protect Yourself
                      </h4>
                      <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {alert.tip}
                      </p>
                    </div>

                    {/* Blog link */}
                    {alert.blogLink && (
                      <Link
                        href={alert.blogLink}
                        className="inline-flex items-center gap-1 text-brand-blue hover:underline font-medium text-base"
                      >
                        Read our full guide on this type of scam →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Bottom tip */}
      <div
        className="mt-8 rounded-xl border p-6 text-center"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <ShieldAlert size={32} className="mx-auto mb-3 text-brand-blue" />
        <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          Think You&apos;ve Been Scammed?
        </p>
        <p className="text-base leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
          Report it to the FTC at{' '}
          <a
            href="https://reportfraud.ftc.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue hover:underline font-medium"
          >
            reportfraud.ftc.gov
          </a>{' '}
          or call <strong>1-877-382-4357</strong>. The sooner you report, the better your chances of recovering losses.
        </p>
        <Link
          href="/tools/scam-checker"
          className="inline-block mt-2 px-6 py-3 bg-brand-blue text-white rounded-xl font-semibold text-base hover:opacity-90 transition-opacity"
        >
          Check a Suspicious Message →
        </Link>
      </div>
    </div>
  )
}
