import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/utils'
import { breadcrumbJsonLd } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import {
  Power,
  Phone,
  MessageSquare,
  Camera,
  Settings,
  Shield,
  Hand,
  Wrench,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Android Cheat Sheet for Seniors — Free Printable Quick Reference',
  description:
    'A free, printable Android cheat sheet for seniors. Covers calls, texts, camera, settings, safety, gestures, and troubleshooting in large, easy-to-read text. Print it and keep it by your phone.',
  keywords: [
    'android cheat sheet for seniors',
    'printable android guide',
    'android quick reference',
    'senior phone cheat sheet',
    'android tips for elderly',
    'android help for beginners',
  ],
  alternates: { canonical: `${SITE_URL}/tools/android-cheat-sheet` },
  openGraph: {
    title: 'Android Cheat Sheet for Seniors — Free Printable Quick Reference',
    description:
      'A free, printable Android cheat sheet covering calls, texts, camera, settings, safety, and more in large, easy-to-read text.',
    url: `${SITE_URL}/tools/android-cheat-sheet`,
    type: 'website',
  },
}

const sections = [
  {
    title: 'Basic Controls',
    icon: Power,
    color: 'bg-blue-100 text-blue-700',
    borderColor: 'border-blue-200',
    tips: [
      { label: 'Go Home', desc: 'Press the Home button, or swipe up from the bottom of the screen.' },
      { label: 'Go Back', desc: 'Tap the back arrow, or swipe inward from the left or right edge of the screen.' },
      { label: 'Recent Apps', desc: 'Tap the square button (or swipe up and hold) to see open apps. Swipe them away to close.' },
      { label: 'Lock / Unlock', desc: 'Press the side button once to lock. Press again and swipe up to unlock.' },
      { label: 'Volume Up / Down', desc: 'Use the rocker button on the side of your phone.' },
      { label: 'Take a Screenshot', desc: 'Press the Power button + Volume Down at the same time.' },
      { label: 'Restart Your Phone', desc: 'Hold the Power button for 3 seconds, then tap "Restart".' },
    ],
  },
  {
    title: 'Making Calls',
    icon: Phone,
    color: 'bg-green-100 text-green-700',
    borderColor: 'border-green-200',
    tips: [
      { label: 'Open the Phone App', desc: 'Tap the green phone icon on your home screen.' },
      { label: 'Call a Contact', desc: 'Tap Contacts, find the person, then tap their phone number.' },
      { label: 'Use the Keypad', desc: 'Tap the keypad icon, dial the number, then tap the green call button.' },
      { label: 'Speaker / Mute', desc: 'During a call, tap the speaker icon for hands-free or the mute icon to silence yourself.' },
      { label: 'Video Call', desc: 'Open Google Meet (or Duo) and tap a contact to start a video call.' },
      { label: 'Add a Contact', desc: 'Open the Contacts app, tap the + button, enter the name and number, then tap Save.' },
    ],
  },
  {
    title: 'Text Messages',
    icon: MessageSquare,
    color: 'bg-purple-100 text-purple-700',
    borderColor: 'border-purple-200',
    tips: [
      { label: 'Send a Text', desc: 'Open Messages (speech bubble icon), tap the pencil icon, type a name, then type your message.' },
      { label: 'Send a Photo', desc: 'In a message, tap the + or camera icon next to the text box to attach a picture.' },
      { label: 'Voice Message', desc: 'Hold the microphone icon to record your voice, then release to send.' },
      { label: 'Delete a Message', desc: 'Long-press on the message, then tap the bin or delete icon.' },
      { label: 'Group Chat', desc: 'Start a new message and add multiple contacts to create a group conversation.' },
    ],
  },
  {
    title: 'Camera & Photos',
    icon: Camera,
    color: 'bg-amber-100 text-amber-700',
    borderColor: 'border-amber-200',
    tips: [
      { label: 'Take a Photo', desc: 'Open the Camera app and tap the big round button.' },
      { label: 'Switch to Selfie', desc: 'Tap the camera-flip icon (two arrows) to use the front camera.' },
      { label: 'Record Video', desc: 'Swipe to "Video" mode, then tap the red button to start recording.' },
      { label: 'View Your Photos', desc: 'Open Google Photos (colourful pinwheel icon) to see all your pictures.' },
      { label: 'Share a Photo', desc: 'Open a photo, tap the Share icon, and choose how to send it.' },
      { label: 'Delete a Photo', desc: 'Open a photo and tap the bin icon. It goes to Trash for 30 days before being permanently removed.' },
    ],
  },
  {
    title: 'Settings Essentials',
    icon: Settings,
    color: 'bg-slate-100 text-slate-700',
    borderColor: 'border-slate-200',
    tips: [
      { label: 'Connect to WiFi', desc: 'Go to Settings > Network & Internet > WiFi. Tap your network name and enter the password.' },
      { label: 'Turn On Bluetooth', desc: 'Go to Settings > Connected Devices > Pair New Device to connect wireless headphones or speakers.' },
      { label: 'Adjust Brightness', desc: 'Swipe down from the top of the screen and drag the sun slider left or right.' },
      { label: 'Make Text Bigger', desc: 'Go to Settings > Display > Font Size and drag the slider to the right.' },
      { label: 'Do Not Disturb', desc: 'Swipe down twice from the top and tap the circle icon to silence all notifications.' },
      { label: 'Change Wallpaper', desc: 'Long-press on the home screen, then tap "Wallpaper & Style" to choose a new background.' },
    ],
  },
  {
    title: 'Safety & Emergency',
    icon: Shield,
    color: 'bg-red-100 text-red-700',
    borderColor: 'border-red-200',
    tips: [
      { label: 'Emergency SOS', desc: 'Press the Power button 5 times quickly to call emergency services.' },
      { label: 'Emergency Contacts', desc: 'Go to Settings > Safety & Emergency > Emergency Contacts to add a trusted person.' },
      { label: 'Find My Device', desc: 'Visit google.com/android/find from any browser to locate, ring, or lock a lost phone.' },
      { label: 'Block a Caller', desc: 'Open recent calls, long-press the number, and tap "Block".' },
      { label: 'Lock Screen Message', desc: 'Go to Settings > Display > Lock Screen > Add text (e.g. "If found, please call...").' },
      { label: 'Stay Safe from Scams', desc: 'Never share passwords or bank details over the phone or by text message.' },
    ],
  },
  {
    title: 'Useful Gestures',
    icon: Hand,
    color: 'bg-teal-100 text-teal-700',
    borderColor: 'border-teal-200',
    tips: [
      { label: 'Swipe Down', desc: 'From the top of the screen to open notifications and quick settings.' },
      { label: 'Swipe Up', desc: 'From the bottom of the screen to go home or open the app drawer.' },
      { label: 'Pinch to Zoom', desc: 'Place two fingers on the screen and spread them apart to zoom in on photos, maps, and web pages.' },
      { label: 'Long Press', desc: 'Press and hold an item for extra options like copy, delete, or move.' },
      { label: 'Swipe from Edge', desc: 'Swipe inward from the left edge to go back to the previous screen.' },
      { label: 'Double Tap', desc: 'Double-tap to zoom in on photos, maps, and web pages.' },
    ],
  },
  {
    title: 'Common Troubleshooting',
    icon: Wrench,
    color: 'bg-orange-100 text-orange-700',
    borderColor: 'border-orange-200',
    tips: [
      { label: 'Force Restart', desc: 'Hold the Power button + Volume Up for 10 seconds until the screen goes black, then release.' },
      { label: 'App Not Working', desc: 'Go to Settings > Apps, choose the app, and tap "Clear Cache". Then reopen the app.' },
      { label: 'Update Android', desc: 'Go to Settings > System > Software Update > Check for Updates and install if available.' },
      { label: 'Running Slowly', desc: 'Close unused apps by swiping them away in recent apps, then restart your phone.' },
      { label: 'Save Battery', desc: 'Go to Settings > Battery > Battery Saver and turn it on when your battery is running low.' },
      { label: 'Storage Full', desc: 'Delete old photos, videos, or apps you no longer use to free up space.' },
    ],
  },
]

export default function AndroidCheatSheetPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Android Cheat Sheet' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      {/* Print-only styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              /* Hide site chrome */
              header, footer, nav[aria-label="Main"], .print-hide {
                display: none !important;
              }
              /* Reset background/colors */
              body, main {
                background: white !important;
                color: black !important;
                font-size: 11pt !important;
              }
              /* Compact grid: always 2 columns */
              .cheat-grid {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 12pt !important;
              }
              .cheat-card {
                break-inside: avoid;
                border: 1pt solid #ccc !important;
                padding: 8pt !important;
                box-shadow: none !important;
              }
              .cheat-card h2 {
                font-size: 12pt !important;
                margin-bottom: 4pt !important;
              }
              .cheat-card li {
                font-size: 10pt !important;
                margin-bottom: 2pt !important;
              }
              /* Print footer with URL */
              .print-footer {
                display: block !important;
                text-align: center;
                font-size: 9pt;
                color: #666;
                margin-top: 16pt;
                border-top: 1pt solid #ccc;
                padding-top: 6pt;
              }
              /* Print header */
              .print-title {
                display: block !important;
                text-align: center;
                font-size: 16pt;
                font-weight: bold;
                margin-bottom: 8pt;
              }
            }
          `,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="print-hide">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Tools', href: '/tools' },
              { label: 'Android Cheat Sheet' },
            ]}
          />
        </div>

        {/* Hero section */}
        <div className="print-hide text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-4">
            Android Cheat Sheet for Seniors
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-6">
            A free, quick-reference guide to help you use your Android phone with confidence.
            Print it out and keep it next to your phone.
          </p>
          <button
            onClick={undefined}
            className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity print-hide"
          >
            Print This Page
          </button>
          {/* Client-side print trigger */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.currentScript.previousElementSibling.addEventListener('click', function() {
                  window.print();
                });
              `,
            }}
          />
        </div>

        {/* Print-only title (visible only when printing) */}
        <div className="print-title hidden">
          Android Cheat Sheet for Seniors — {SITE_NAME}
        </div>

        {/* Cheat sheet grid */}
        <div className="cheat-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <div
                key={section.title}
                className={`cheat-card rounded-xl border ${section.borderColor} bg-[var(--bg-primary)] shadow-sm overflow-hidden`}
              >
                <div className={`flex items-center gap-3 px-5 py-4 ${section.color}`}>
                  <Icon className="w-6 h-6 flex-shrink-0" />
                  <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">
                    {section.title}
                  </h2>
                </div>
                <ul className="px-5 py-4 space-y-3">
                  {section.tips.map((tip) => (
                    <li key={tip.label} className="text-base leading-relaxed">
                      <strong className="text-[var(--text-primary)]">{tip.label}:</strong>{' '}
                      <span className="text-[var(--text-secondary)]">{tip.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Related guides */}
        <div className="print-hide border-t border-[var(--border-color)] pt-8 mb-8">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--text-primary)] mb-4">
            Want to Learn More?
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            These step-by-step guides go deeper on the topics covered in this cheat sheet.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/blog/android-setup-guide-for-seniors"
              className="block p-4 rounded-lg border border-[var(--border-color)] hover:border-brand-blue transition-colors"
            >
              <span className="font-semibold text-brand-blue">Android Setup Guide for Seniors</span>
              <span className="block text-sm text-[var(--text-secondary)] mt-1">
                Step-by-step guide to setting up a new Android phone from scratch.
              </span>
            </Link>
            <Link
              href="/blog/how-to-use-google-assistant"
              className="block p-4 rounded-lg border border-[var(--border-color)] hover:border-brand-blue transition-colors"
            >
              <span className="font-semibold text-brand-blue">How to Use Google Assistant</span>
              <span className="block text-sm text-[var(--text-secondary)] mt-1">
                Use voice commands to make calls, send texts, and get answers hands-free.
              </span>
            </Link>
            <Link
              href="/blog/best-android-apps-for-seniors-2026"
              className="block p-4 rounded-lg border border-[var(--border-color)] hover:border-brand-blue transition-colors"
            >
              <span className="font-semibold text-brand-blue">Best Android Apps for Seniors in 2026</span>
              <span className="block text-sm text-[var(--text-secondary)] mt-1">
                Our top picks for useful, easy-to-use apps for your Android phone.
              </span>
            </Link>
            <Link
              href="/tools/device-quiz"
              className="block p-4 rounded-lg border border-[var(--border-color)] hover:border-brand-blue transition-colors"
            >
              <span className="font-semibold text-brand-blue">Which Device Is Right for You?</span>
              <span className="block text-sm text-[var(--text-secondary)] mt-1">
                Take our short quiz to find the best phone or tablet for your needs.
              </span>
            </Link>
          </div>
        </div>

        {/* Print-only footer */}
        <div className="print-footer hidden">
          Free printable from {SITE_NAME} — {SITE_URL}/tools/android-cheat-sheet
        </div>
      </div>
    </>
  )
}
