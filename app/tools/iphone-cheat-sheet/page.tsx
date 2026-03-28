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
  title: 'iPhone Cheat Sheet for Seniors — Free Printable Quick Reference',
  description:
    'A free, printable iPhone cheat sheet for seniors. Covers calls, texts, camera, settings, safety, gestures, and troubleshooting in large, easy-to-read text.',
  alternates: { canonical: `${SITE_URL}/tools/iphone-cheat-sheet` },
  openGraph: {
    title: 'iPhone Cheat Sheet for Seniors — Free Printable Quick Reference',
    description:
      'A free, printable iPhone cheat sheet covering calls, texts, camera, settings, safety, and more in large, easy-to-read text.',
    url: `${SITE_URL}/tools/iphone-cheat-sheet`,
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
      { label: 'Go Home', desc: 'Press the Home button, or swipe up from the bottom on newer iPhones.' },
      { label: 'Lock / Unlock', desc: 'Press the side button once to lock. Press again and swipe up to unlock.' },
      { label: 'Volume Up / Down', desc: 'Use the two buttons on the left side of your iPhone.' },
      { label: 'Take a Screenshot', desc: 'Press the side button + volume up at the same time.' },
      { label: 'Restart Your iPhone', desc: 'Hold the side button + volume down until the slider appears, then slide to power off.' },
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
      { label: 'Use the Keypad', desc: 'Tap Keypad at the bottom, dial the number, then tap the green call button.' },
      { label: 'Speaker / Mute', desc: 'During a call, tap the speaker icon for hands-free or the mute icon to mute yourself.' },
      { label: 'FaceTime Video Call', desc: 'Open the FaceTime app, tap a contact, and press the video button.' },
    ],
  },
  {
    title: 'Text Messages',
    icon: MessageSquare,
    color: 'bg-purple-100 text-purple-700',
    borderColor: 'border-purple-200',
    tips: [
      { label: 'Send a Text', desc: 'Open Messages, tap the compose icon (pencil), type a name, then type your message.' },
      { label: 'Send a Photo', desc: 'In a message, tap the + button, choose Photos, pick one, and tap Send.' },
      { label: 'Voice Message', desc: 'Hold the microphone icon in a message to record, then release to send.' },
      { label: 'Delete a Message', desc: 'Long-press the message bubble, tap More, select it, then tap the trash icon.' },
      { label: 'Read Receipts', desc: 'Blue bubbles are iMessages. Green bubbles are regular SMS texts.' },
    ],
  },
  {
    title: 'Camera & Photos',
    icon: Camera,
    color: 'bg-amber-100 text-amber-700',
    borderColor: 'border-amber-200',
    tips: [
      { label: 'Take a Photo', desc: 'Open the Camera app and tap the big white circle button.' },
      { label: 'Switch to Selfie', desc: 'Tap the camera-flip icon (two arrows) in the corner.' },
      { label: 'View Your Photos', desc: 'Open the Photos app to see all your pictures, organized by date.' },
      { label: 'Share a Photo', desc: 'Open a photo, tap the share icon (box with arrow), then choose how to send it.' },
      { label: 'Zoom In', desc: 'Pinch outward with two fingers on the camera or any photo to zoom in.' },
    ],
  },
  {
    title: 'Settings Essentials',
    icon: Settings,
    color: 'bg-slate-100 text-slate-700',
    borderColor: 'border-slate-200',
    tips: [
      { label: 'Connect to WiFi', desc: 'Go to Settings > Wi-Fi, pick your network, and enter the password.' },
      { label: 'Turn On Bluetooth', desc: 'Go to Settings > Bluetooth and toggle it on to connect wireless devices.' },
      { label: 'Adjust Brightness', desc: 'Swipe down from the top-right corner and drag the brightness slider.' },
      { label: 'Make Text Bigger', desc: 'Go to Settings > Display & Brightness > Text Size and drag the slider.' },
      { label: 'Do Not Disturb', desc: 'Go to Settings > Focus > Do Not Disturb to silence calls and alerts.' },
    ],
  },
  {
    title: 'Safety & Emergency',
    icon: Shield,
    color: 'bg-red-100 text-red-700',
    borderColor: 'border-red-200',
    tips: [
      { label: 'Emergency SOS', desc: 'Press and hold the side button + volume button for 2 seconds, then slide Emergency SOS.' },
      { label: 'Set Up Medical ID', desc: 'Open the Health app > tap your photo > Medical ID. Add allergies and emergency contacts.' },
      { label: 'Find My iPhone', desc: 'Go to Settings > [Your Name] > Find My > Find My iPhone and turn it on.' },
      { label: 'Block a Caller', desc: 'In the Phone app, tap the (i) next to a number, scroll down, and tap Block this Caller.' },
      { label: 'Silence Unknown Callers', desc: 'Go to Settings > Phone > Silence Unknown Callers to stop spam calls.' },
    ],
  },
  {
    title: 'Useful Gestures',
    icon: Hand,
    color: 'bg-teal-100 text-teal-700',
    borderColor: 'border-teal-200',
    tips: [
      { label: 'Swipe Up', desc: 'From the bottom of the screen — go to the Home screen or see recent apps.' },
      { label: 'Swipe Down', desc: 'From the top-right corner to open the Control Center (WiFi, brightness, etc.).' },
      { label: 'Pinch to Zoom', desc: 'Place two fingers on the screen and spread them apart to zoom in.' },
      { label: 'Long Press', desc: 'Press and hold an app icon to see quick options or rearrange apps.' },
      { label: 'Shake to Undo', desc: 'Gently shake your iPhone to undo the last thing you typed.' },
    ],
  },
  {
    title: 'Common Troubleshooting',
    icon: Wrench,
    color: 'bg-orange-100 text-orange-700',
    borderColor: 'border-orange-200',
    tips: [
      { label: 'Force Restart', desc: 'Press volume up, then volume down, then hold the side button until you see the Apple logo.' },
      { label: 'Free Up Storage', desc: 'Go to Settings > General > iPhone Storage to see what is using space and delete old apps.' },
      { label: 'Update iOS', desc: 'Go to Settings > General > Software Update and tap Download and Install.' },
      { label: 'Save Battery', desc: 'Turn on Low Power Mode in Settings > Battery when your battery is running low.' },
      { label: 'App Not Working', desc: 'Swipe up and hold to see recent apps, then swipe the problem app up to close it. Reopen it.' },
    ],
  },
]

export default function IPhoneCheatSheetPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'iPhone Cheat Sheet' },
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
              { label: 'iPhone Cheat Sheet' },
            ]}
          />
        </div>

        {/* Hero section */}
        <div className="print-hide text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-brand-dark mb-4">
            iPhone Cheat Sheet for Seniors
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-6">
            A free, quick-reference guide to help you use your iPhone with confidence.
            Print it out and keep it next to your phone.
          </p>
          <button
            onClick={undefined}
            className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity print-hide"
          >
            🖨️ Print this page
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
          iPhone Cheat Sheet for Seniors — {SITE_NAME}
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
              href="/blog/iphone-setup-guide-for-seniors"
              className="block p-4 rounded-lg border border-[var(--border-color)] hover:border-brand-blue transition-colors"
            >
              <span className="font-semibold text-brand-blue">iPhone Setup Guide for Seniors</span>
              <span className="block text-sm text-[var(--text-secondary)] mt-1">
                Step-by-step guide to setting up a new iPhone from scratch.
              </span>
            </Link>
            <Link
              href="/blog/how-to-facetime"
              className="block p-4 rounded-lg border border-[var(--border-color)] hover:border-brand-blue transition-colors"
            >
              <span className="font-semibold text-brand-blue">How to FaceTime</span>
              <span className="block text-sm text-[var(--text-secondary)] mt-1">
                Make video calls to family and friends with FaceTime.
              </span>
            </Link>
            <Link
              href="/blog/how-to-use-siri-guide-for-seniors"
              className="block p-4 rounded-lg border border-[var(--border-color)] hover:border-brand-blue transition-colors"
            >
              <span className="font-semibold text-brand-blue">How to Use Siri</span>
              <span className="block text-sm text-[var(--text-secondary)] mt-1">
                Use voice commands to make calls, send texts, and get answers.
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
          Free printable from {SITE_NAME} — {SITE_URL}/tools/iphone-cheat-sheet
        </div>
      </div>
    </>
  )
}
