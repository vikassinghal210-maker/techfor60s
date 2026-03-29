'use client'

import { useState } from 'react'
import { Wifi, WifiOff, ArrowRight, RotateCcw, CheckCircle } from 'lucide-react'

interface DiagnosticNode {
  id: string
  question: string
  yesNext: string
  noNext: string
}

interface FixNode {
  id: string
  title: string
  steps: string[]
  extraTip?: string
}

const QUESTIONS: Record<string, DiagnosticNode> = {
  start: {
    id: 'start',
    question: 'Can you see the WiFi icon at the top of your screen (even if it has an exclamation mark)?',
    yesNext: 'q-internet',
    noNext: 'fix-wifi-off',
  },
  'q-internet': {
    id: 'q-internet',
    question: 'Can you open a website (like google.com) in your web browser?',
    yesNext: 'q-slow',
    noNext: 'q-other-devices',
  },
  'q-slow': {
    id: 'q-slow',
    question: 'Is the internet working but very slow?',
    yesNext: 'fix-slow',
    noNext: 'fix-working',
  },
  'q-other-devices': {
    id: 'q-other-devices',
    question: 'Are other devices in your home (like a tablet or smart TV) able to connect to the internet?',
    yesNext: 'fix-device-only',
    noNext: 'fix-router',
  },
}

const FIXES: Record<string, FixNode> = {
  'fix-wifi-off': {
    id: 'fix-wifi-off',
    title: 'Your WiFi Appears to Be Turned Off',
    steps: [
      'On iPhone/iPad: Open Settings → tap WiFi → make sure the switch is turned ON (green).',
      'On Android: Swipe down from the top of the screen → look for the WiFi icon → tap it to turn it on.',
      'On a computer: Look for the WiFi icon in the bottom-right corner (Windows) or top-right (Mac) → click it → turn WiFi on.',
      'Once WiFi is on, select your home network name from the list.',
      'Enter your WiFi password if asked (this is usually on a sticker on your router).',
    ],
    extraTip: 'If you don\'t see any WiFi networks at all, try restarting your device by turning it completely off, waiting 30 seconds, then turning it back on.',
  },
  'fix-device-only': {
    id: 'fix-device-only',
    title: 'The Problem Is With This Device Only',
    steps: [
      'Turn your device completely off, wait 30 seconds, then turn it back on.',
      'Go to Settings → WiFi → tap your network name → tap "Forget This Network" (or "Forget").',
      'Now go back to Settings → WiFi → select your network again from the list.',
      'Re-enter your WiFi password (check the sticker on your router if you don\'t remember it).',
      'If it still doesn\'t work, try moving closer to your router.',
    ],
    extraTip: 'If the problem keeps happening, your device may need a software update. Go to Settings → General → Software Update (iPhone) or Settings → System → System Update (Android).',
  },
  'fix-router': {
    id: 'fix-router',
    title: 'Your Router May Need a Restart',
    steps: [
      'Find your router (the box with blinking lights, usually near where the internet cable comes into your home).',
      'Unplug the power cable from the back of the router.',
      'Wait 60 seconds (a full minute — this is important!).',
      'Plug the power cable back in.',
      'Wait 2-3 minutes for the lights to stop blinking and become steady.',
      'Try connecting to WiFi again on your device.',
    ],
    extraTip: 'If the lights on your router are red or not turning on at all, there may be an outage in your area. Call your internet provider (the number is usually on your bill or on the router itself).',
  },
  'fix-slow': {
    id: 'fix-slow',
    title: 'Your Internet Connection Is Slow',
    steps: [
      'Move closer to your router — walls and distance weaken the signal.',
      'Restart your router: unplug it, wait 60 seconds, plug it back in, wait 2-3 minutes.',
      'Close apps or browser tabs you\'re not using — they can use bandwidth.',
      'Check if someone else in your home is streaming video or downloading large files.',
      'If possible, connect with an ethernet cable (the blue/yellow cable) for faster, more reliable speed.',
    ],
    extraTip: 'If your internet is always slow, you may need a faster plan from your internet provider. Use our Internet Speed Calculator to find out how much speed you need.',
  },
  'fix-working': {
    id: 'fix-working',
    title: 'Your WiFi Appears to Be Working Fine!',
    steps: [
      'Your internet connection seems to be working normally.',
      'If a specific website isn\'t loading, the problem might be with that website — try a different one.',
      'If a specific app isn\'t working, try closing and reopening it, or check for updates.',
      'Clear your browser\'s history/cache: go to your browser\'s settings and look for "Clear browsing data."',
    ],
    extraTip: 'If you\'re still having trouble with something specific, try searching for the problem in our guides or use our Scam Checker if you received a suspicious message about your internet.',
  },
}

export default function WifiTroubleshooter() {
  const [currentNode, setCurrentNode] = useState<string>('start')
  const [history, setHistory] = useState<string[]>([])

  const isQuestion = currentNode in QUESTIONS
  const question = QUESTIONS[currentNode]
  const fix = FIXES[currentNode]

  const handleAnswer = (next: string) => {
    setHistory(prev => [...prev, currentNode])
    setCurrentNode(next)
  }

  const handleBack = () => {
    const prev = history[history.length - 1]
    if (prev) {
      setHistory(h => h.slice(0, -1))
      setCurrentNode(prev)
    }
  }

  const handleRestart = () => {
    setCurrentNode('start')
    setHistory([])
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {[...history, currentNode].map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full flex-1 max-w-12 ${
              i <= history.length ? 'bg-brand-blue' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>

      {isQuestion && question ? (
        <div
          className="rounded-xl border p-6 sm:p-8"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-start gap-4 mb-6">
            <Wifi className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
            <h3
              className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)]"
              style={{ color: 'var(--text-primary)' }}
            >
              {question.question}
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleAnswer(question.yesNext)}
              className="px-8 py-3 rounded-xl bg-green-600 text-white text-lg font-semibold hover:bg-green-700 flex items-center gap-2"
            >
              Yes <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleAnswer(question.noNext)}
              className="px-8 py-3 rounded-xl bg-red-600 text-white text-lg font-semibold hover:bg-red-700 flex items-center gap-2"
            >
              No <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : fix ? (
        <div className="space-y-6">
          <div
            className="rounded-xl border-2 p-6 sm:p-8 bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700"
          >
            <div className="flex items-start gap-4 mb-4">
              {fix.id === 'fix-working' ? (
                <CheckCircle className="w-10 h-10 text-green-600 flex-shrink-0" />
              ) : (
                <WifiOff className="w-10 h-10 text-blue-600 flex-shrink-0" />
              )}
              <h3
                className="text-2xl font-bold font-[family-name:var(--font-heading)]"
                style={{ color: 'var(--text-primary)' }}
              >
                {fix.title}
              </h3>
            </div>
            <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
              Follow these steps in order:
            </p>
            <ol className="space-y-4">
              {fix.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <p className="text-lg leading-relaxed pt-1" style={{ color: 'var(--text-secondary)' }}>
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {fix.extraTip && (
            <div
              className="rounded-xl border-l-4 border-l-brand-blue p-5"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <p className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                Extra Tip
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {fix.extraTip}
              </p>
            </div>
          )}
        </div>
      ) : null}

      {/* Navigation */}
      <div className="flex flex-wrap gap-3">
        {history.length > 0 && (
          <button
            onClick={handleBack}
            className="px-5 py-2.5 rounded-xl border text-lg font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            ← Back
          </button>
        )}
        {(history.length > 0 || !isQuestion) && (
          <button
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl border text-lg font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            <RotateCcw className="w-4 h-4" /> Start Over
          </button>
        )}
      </div>
    </div>
  )
}
