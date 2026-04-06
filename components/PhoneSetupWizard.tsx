'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  RotateCcw,
  Smartphone,
  Tablet,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Copy,
  Check,
  Printer,
  Eye,
  Ear,
  Hand,
  Brain,
  Palette,
  Sparkles,
  Volume2,
  Maximize,
  Layout,
  HelpCircle,
  Heart,
  User,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { trackToolUsage } from '@/lib/ga-events'

// ── Types ────────────────────────────────────────────────────────────────────

interface SettingItem {
  name: string
  path: string
  description: string
  recommended: 'ON' | 'Optional'
}

interface SettingCategory {
  title: string
  icon: string
  settings: SettingItem[]
}

type DeviceType = 'iphone' | 'ipad' | 'samsung' | 'pixel' | 'other-android' | 'not-sure'
type Condition =
  | 'low-vision'
  | 'hearing-loss'
  | 'arthritis'
  | 'tremors'
  | 'color-blindness'
  | 'memory'
  | 'none'
type Priority = 'text-bigger' | 'sounds-louder' | 'easier-tap' | 'simplify' | 'all'
type SetupPerson = 'self' | 'parent' | 'spouse' | 'caregiver'

// ── Wizard Data ──────────────────────────────────────────────────────────────

const deviceOptions: { label: string; value: DeviceType; icon: React.ReactNode }[] = [
  { label: 'iPhone', value: 'iphone', icon: <Smartphone className="w-6 h-6" /> },
  { label: 'iPad', value: 'ipad', icon: <Tablet className="w-6 h-6" /> },
  { label: 'Samsung Galaxy', value: 'samsung', icon: <Smartphone className="w-6 h-6" /> },
  { label: 'Google Pixel', value: 'pixel', icon: <Smartphone className="w-6 h-6" /> },
  { label: 'Other Android', value: 'other-android', icon: <Smartphone className="w-6 h-6" /> },
  { label: 'Not sure', value: 'not-sure', icon: <HelpCircle className="w-6 h-6" /> },
]

const conditionOptions: { label: string; value: Condition; icon: React.ReactNode; desc: string }[] = [
  { label: 'Low vision', value: 'low-vision', icon: <Eye className="w-5 h-5" />, desc: 'Difficulty seeing small text or icons' },
  { label: 'Hearing loss', value: 'hearing-loss', icon: <Ear className="w-5 h-5" />, desc: 'Hard to hear calls, alerts, or media' },
  { label: 'Arthritis or limited hand mobility', value: 'arthritis', icon: <Hand className="w-5 h-5" />, desc: 'Difficult to tap small buttons or type' },
  { label: 'Tremors', value: 'tremors', icon: <Hand className="w-5 h-5" />, desc: 'Shaky hands make tapping hard' },
  { label: 'Color blindness', value: 'color-blindness', icon: <Palette className="w-5 h-5" />, desc: 'Some colors are hard to tell apart' },
  { label: 'Memory concerns', value: 'memory', icon: <Brain className="w-5 h-5" />, desc: 'Forgetting steps or getting confused' },
  { label: 'None - just want it easier to use', value: 'none', icon: <Sparkles className="w-5 h-5" />, desc: 'General ease-of-use improvements' },
]

const priorityOptions: { label: string; value: Priority; icon: React.ReactNode }[] = [
  { label: 'Making text and icons bigger', value: 'text-bigger', icon: <Maximize className="w-5 h-5" /> },
  { label: 'Making sounds louder and clearer', value: 'sounds-louder', icon: <Volume2 className="w-5 h-5" /> },
  { label: 'Making the phone easier to hold and tap', value: 'easier-tap', icon: <Hand className="w-5 h-5" /> },
  { label: 'Simplifying the screen (fewer options)', value: 'simplify', icon: <Layout className="w-5 h-5" /> },
  { label: 'All of the above', value: 'all', icon: <Sparkles className="w-5 h-5" /> },
]

const setupPersonOptions: { label: string; value: SetupPerson; icon: React.ReactNode }[] = [
  { label: "I'm setting up my own phone", value: 'self', icon: <User className="w-5 h-5" /> },
  { label: "I'm helping a parent or grandparent", value: 'parent', icon: <Users className="w-5 h-5" /> },
  { label: "I'm helping a spouse", value: 'spouse', icon: <Heart className="w-5 h-5" /> },
  { label: "I'm a caregiver or professional", value: 'caregiver', icon: <User className="w-5 h-5" /> },
]

// ── Settings Database ────────────────────────────────────────────────────────

function getIsApple(device: DeviceType): boolean {
  return device === 'iphone' || device === 'ipad'
}

function getIsAndroid(device: DeviceType): boolean {
  return device === 'samsung' || device === 'pixel' || device === 'other-android'
}

function generateGuide(
  device: DeviceType,
  conditions: Condition[],
  priority: Priority,
  setupPerson: SetupPerson
): SettingCategory[] {
  const isApple = getIsApple(device)
  const isAndroid = getIsAndroid(device)
  const isSamsung = device === 'samsung'
  const isNotSure = device === 'not-sure'

  // If "not sure", show both
  const showApple = isApple || isNotSure
  const showAndroid = isAndroid || isNotSure

  const hasCondition = (c: Condition) => conditions.includes(c) || conditions.includes('none')
  const wantsAll = priority === 'all'

  const categories: SettingCategory[] = []

  // ── Low Vision / Text Bigger ────────────────────────────────────────
  if (hasCondition('low-vision') || priority === 'text-bigger' || wantsAll) {
    if (showApple) {
      const settings: SettingItem[] = [
        {
          name: 'Increase Text Size',
          path: 'Settings > Display & Brightness > Text Size',
          description: 'Drag the slider to the right to make all text larger across your phone. You will see the change immediately.',
          recommended: 'ON',
        },
        {
          name: 'Bold Text',
          path: 'Settings > Accessibility > Display & Text Size > Bold Text',
          description: 'Makes all text thicker and easier to read. Your phone will briefly restart to apply this.',
          recommended: 'ON',
        },
        {
          name: 'Zoom',
          path: 'Settings > Accessibility > Zoom',
          description: 'Lets you magnify any part of the screen. Double-tap with three fingers to zoom in and out.',
          recommended: 'ON',
        },
        {
          name: 'Increase Contrast',
          path: 'Settings > Accessibility > Display & Text Size > Increase Contrast',
          description: 'Makes text stand out more against backgrounds, making everything easier to read.',
          recommended: 'ON',
        },
        {
          name: 'Speak Selection',
          path: 'Settings > Accessibility > Spoken Content > Speak Selection',
          description: 'Select any text and your phone will read it aloud to you. Very helpful for small print.',
          recommended: 'Optional',
        },
        {
          name: 'VoiceOver',
          path: 'Settings > Accessibility > VoiceOver',
          description: 'Your phone reads everything on screen aloud and lets you navigate by touch. Best for very low vision. Takes practice to learn.',
          recommended: 'Optional',
        },
      ]

      if (device === 'iphone' || isNotSure) {
        settings.push({
          name: 'Assistive Access (iOS 17+)',
          path: 'Settings > Accessibility > Assistive Access',
          description: 'A simplified mode with large buttons and fewer options. Ideal for people who find the regular interface overwhelming.',
          recommended: 'Optional',
        })
      }

      categories.push({
        title: isNotSure ? 'iPhone/iPad - Vision Settings' : `${device === 'ipad' ? 'iPad' : 'iPhone'} - Vision Settings`,
        icon: '👁️',
        settings,
      })
    }

    if (showAndroid) {
      const settings: SettingItem[] = [
        {
          name: 'Font Size and Style',
          path: isSamsung
            ? 'Settings > Accessibility > Visibility > Font size and style'
            : 'Settings > Display > Font size',
          description: 'Drag the slider to the largest setting. All text on your phone will become much bigger.',
          recommended: 'ON',
        },
        {
          name: 'Screen Zoom / Display Size',
          path: isSamsung
            ? 'Settings > Display > Screen zoom'
            : 'Settings > Display > Display size',
          description: 'Makes everything bigger - icons, buttons, and text. Set it to the largest comfortable level.',
          recommended: 'ON',
        },
      ]

      if (isSamsung) {
        settings.push({
          name: 'High Contrast Fonts',
          path: 'Settings > Accessibility > Visibility > High contrast fonts',
          description: 'Makes text bolder with stronger outlines so it stands out more against any background.',
          recommended: 'ON',
        })
        settings.push({
          name: 'Easy Mode',
          path: 'Settings > Display > Easy mode',
          description: 'Completely simplifies your home screen with bigger icons, bigger text, and a simpler layout. Highly recommended.',
          recommended: 'ON',
        })
      }

      settings.push({
        name: 'TalkBack',
        path: isSamsung
          ? 'Settings > Accessibility > TalkBack'
          : 'Settings > Accessibility > TalkBack',
        description: 'Your phone reads everything aloud and lets you navigate by touch. Best for very low vision. Takes practice to learn.',
        recommended: 'Optional',
      })

      if (device === 'pixel') {
        settings.push({
          name: 'Magnification',
          path: 'Settings > Accessibility > Magnification',
          description: 'Triple-tap the screen to zoom in on any area. Great for reading fine print.',
          recommended: 'ON',
        })
      }

      categories.push({
        title: isNotSure
          ? 'Android - Vision Settings'
          : `${isSamsung ? 'Samsung' : device === 'pixel' ? 'Google Pixel' : 'Android'} - Vision Settings`,
        icon: '👁️',
        settings,
      })
    }
  }

  // ── Hearing Loss / Sounds Louder ────────────────────────────────────
  if (hasCondition('hearing-loss') || priority === 'sounds-louder' || wantsAll) {
    if (showApple) {
      categories.push({
        title: isNotSure ? 'iPhone/iPad - Hearing Settings' : `${device === 'ipad' ? 'iPad' : 'iPhone'} - Hearing Settings`,
        icon: '🔊',
        settings: [
          {
            name: 'Headphone Accommodations',
            path: 'Settings > Accessibility > Audio & Visual > Headphone Accommodations',
            description: 'Amplifies soft sounds and adjusts audio frequencies. Works with AirPods and other headphones.',
            recommended: 'ON',
          },
          {
            name: 'Sound Recognition',
            path: 'Settings > Accessibility > Sound Recognition',
            description: 'Your phone listens for important sounds (doorbell, smoke alarm, baby crying) and sends you a notification.',
            recommended: 'ON',
          },
          {
            name: 'Subtitles & Captioning',
            path: 'Settings > Accessibility > Subtitles & Captioning',
            description: 'Turns on captions for videos and media so you can read along while watching.',
            recommended: 'ON',
          },
          {
            name: 'LED Flash for Alerts',
            path: 'Settings > Accessibility > Audio & Visual > LED Flash for Alerts',
            description: 'The camera flash blinks when you get a notification, so you never miss an alert even in noisy environments.',
            recommended: 'ON',
          },
        ],
      })
    }

    if (showAndroid) {
      const settings: SettingItem[] = []

      if (isSamsung) {
        settings.push({
          name: 'Sound Amplifier',
          path: 'Settings > Accessibility > Hearing > Sound amplifier',
          description: 'Boosts sounds around you through your headphones. Great for conversations and TV.',
          recommended: 'ON',
        })
      }

      settings.push(
        {
          name: 'Live Caption',
          path: isSamsung
            ? 'Settings > Accessibility > Hearing > Live Caption'
            : 'Settings > Accessibility > Live Caption',
          description: 'Automatically adds captions to any audio playing on your phone - videos, calls, even voice messages.',
          recommended: 'ON',
        },
        {
          name: 'Flash Notification',
          path: isSamsung
            ? 'Settings > Accessibility > Hearing > Flash notification'
            : 'Settings > Accessibility > Flash notifications',
          description: 'The screen or camera flash blinks when you get a notification.',
          recommended: 'ON',
        }
      )

      categories.push({
        title: isNotSure
          ? 'Android - Hearing Settings'
          : `${isSamsung ? 'Samsung' : device === 'pixel' ? 'Google Pixel' : 'Android'} - Hearing Settings`,
        icon: '🔊',
        settings,
      })
    }
  }

  // ── Arthritis / Tremors / Easier Tap ────────────────────────────────
  if (hasCondition('arthritis') || hasCondition('tremors') || priority === 'easier-tap' || wantsAll) {
    if (showApple) {
      categories.push({
        title: isNotSure ? 'iPhone/iPad - Mobility Settings' : `${device === 'ipad' ? 'iPad' : 'iPhone'} - Mobility Settings`,
        icon: '✋',
        settings: [
          {
            name: 'AssistiveTouch',
            path: 'Settings > Accessibility > Touch > AssistiveTouch',
            description: 'Adds a floating button on screen for common actions like Home, Volume, and Screenshot. No need to press physical buttons.',
            recommended: 'ON',
          },
          {
            name: 'Touch Accommodations',
            path: 'Settings > Accessibility > Touch > Touch Accommodations',
            description: 'Adjusts how the screen responds to your touch. You can set a hold duration so accidental taps are ignored.',
            recommended: 'ON',
          },
          {
            name: 'Back Tap',
            path: 'Settings > Accessibility > Touch > Back Tap',
            description: 'Double or triple-tap the back of your phone to perform actions like taking a screenshot or opening an app.',
            recommended: 'Optional',
          },
          {
            name: 'Slow Side Button Click Speed',
            path: 'Settings > Accessibility > Side Button > Click speed > Slow',
            description: 'Gives you more time to double-click or triple-click the side button. Much easier if you have tremors.',
            recommended: 'ON',
          },
        ],
      })
    }

    if (showAndroid) {
      const settings: SettingItem[] = [
        {
          name: 'Touch and Hold Delay',
          path: isSamsung
            ? 'Settings > Accessibility > Interaction > Touch settings > Touch and hold delay'
            : 'Settings > Accessibility > Touch & hold delay',
          description: 'Set to "Long" so you need to press and hold longer before the phone registers it. Prevents accidental taps.',
          recommended: 'ON',
        },
      ]

      if (isSamsung) {
        settings.push({
          name: 'Assistant Menu',
          path: 'Settings > Accessibility > Interaction > Assistant menu',
          description: 'Adds a floating button for common actions. No need to swipe or use gestures - just tap the menu.',
          recommended: 'ON',
        })
      }

      settings.push({
        name: 'Interaction Controls',
        path: isSamsung
          ? 'Settings > Accessibility > Interaction > Interaction control'
          : 'Settings > Accessibility > Switch Access',
        description: 'Lets you block certain screen areas from responding to touch, preventing accidental taps on areas you do not want to press.',
        recommended: 'Optional',
      })

      categories.push({
        title: isNotSure
          ? 'Android - Mobility Settings'
          : `${isSamsung ? 'Samsung' : device === 'pixel' ? 'Google Pixel' : 'Android'} - Mobility Settings`,
        icon: '✋',
        settings,
      })
    }
  }

  // ── Color Blindness ─────────────────────────────────────────────────
  if (hasCondition('color-blindness')) {
    if (showApple) {
      categories.push({
        title: isNotSure ? 'iPhone/iPad - Color Filters' : `${device === 'ipad' ? 'iPad' : 'iPhone'} - Color Filters`,
        icon: '🎨',
        settings: [
          {
            name: 'Color Filters',
            path: 'Settings > Accessibility > Display & Text Size > Color Filters',
            description: 'Choose a filter that matches your type of color blindness (red/green, blue/yellow, or grayscale). Colors will be adjusted so you can tell them apart.',
            recommended: 'ON',
          },
          {
            name: 'Differentiate Without Color',
            path: 'Settings > Accessibility > Display & Text Size > Differentiate Without Color',
            description: 'Replaces colors with shapes or labels so you do not have to rely on color alone to understand what is on screen.',
            recommended: 'ON',
          },
        ],
      })
    }

    if (showAndroid) {
      categories.push({
        title: isNotSure ? 'Android - Color Correction' : `${isSamsung ? 'Samsung' : 'Android'} - Color Correction`,
        icon: '🎨',
        settings: [
          {
            name: 'Color Correction',
            path: isSamsung
              ? 'Settings > Accessibility > Visibility > Color correction'
              : 'Settings > Accessibility > Color correction',
            description: 'Choose your type of color blindness and the phone adjusts all colors so you can see the difference.',
            recommended: 'ON',
          },
          {
            name: 'High Contrast Text',
            path: isSamsung
              ? 'Settings > Accessibility > Visibility > High contrast fonts'
              : 'Settings > Accessibility > Text and display > High contrast text',
            description: 'Makes text stand out more so it is easier to read regardless of background colors.',
            recommended: 'ON',
          },
        ],
      })
    }
  }

  // ── Memory Concerns / Simplify ──────────────────────────────────────
  if (hasCondition('memory') || priority === 'simplify' || wantsAll) {
    if (showApple) {
      const settings: SettingItem[] = [
        {
          name: 'Assistive Access (iOS 17+)',
          path: 'Settings > Accessibility > Assistive Access',
          description: 'A completely simplified mode with very large buttons for Phone, Messages, Camera, and a few chosen apps. The simplest way to use an iPhone.',
          recommended: 'ON',
        },
        {
          name: 'Guided Access',
          path: 'Settings > Accessibility > Guided Access',
          description: 'Locks the phone to a single app so nothing confusing happens from accidental taps. Triple-click the side button to start or stop.',
          recommended: 'Optional',
        },
        {
          name: 'Reduce Motion',
          path: 'Settings > Accessibility > Motion > Reduce Motion',
          description: 'Stops animations and moving effects that can be distracting or disorienting.',
          recommended: 'ON',
        },
      ]

      categories.push({
        title: isNotSure ? 'iPhone/iPad - Simplification' : `${device === 'ipad' ? 'iPad' : 'iPhone'} - Simplification`,
        icon: '🧠',
        settings,
      })
    }

    if (showAndroid) {
      const settings: SettingItem[] = []

      if (isSamsung) {
        settings.push({
          name: 'Easy Mode',
          path: 'Settings > Display > Easy mode',
          description: 'The best starting point. Gives you a simple home screen with big icons and only the apps you need.',
          recommended: 'ON',
        })
      }

      settings.push(
        {
          name: 'Pin an App',
          path: isSamsung
            ? 'Settings > Security > App pinning'
            : 'Settings > Security > App pinning',
          description: 'Locks the phone to one app at a time, preventing confusion from accidental navigation.',
          recommended: 'Optional',
        },
        {
          name: 'Remove Unused Apps',
          path: 'Long-press any app > Uninstall (or App Info > Uninstall)',
          description: 'Fewer apps on the screen means less confusion. Remove any apps that are not used regularly.',
          recommended: 'ON',
        }
      )

      categories.push({
        title: isNotSure ? 'Android - Simplification' : `${isSamsung ? 'Samsung' : 'Android'} - Simplification`,
        icon: '🧠',
        settings,
      })
    }
  }

  return categories
}

// ── Generate plain text for copying ──────────────────────────────────────────

function generatePlainText(categories: SettingCategory[], setupPerson: SetupPerson): string {
  const personLabel =
    setupPerson === 'self'
      ? 'your'
      : setupPerson === 'parent'
        ? "your parent's/grandparent's"
        : setupPerson === 'spouse'
          ? "your spouse's"
          : "your client's"

  let text = `PERSONALIZED PHONE SETUP GUIDE\n`
  text += `Setting up ${personLabel} phone for easier use\n`
  text += `Generated by TechFor60s.com/tools/phone-setup-wizard\n\n`

  for (const category of categories) {
    text += `━━━ ${category.title} ━━━\n\n`
    for (let i = 0; i < category.settings.length; i++) {
      const s = category.settings[i]
      text += `${i + 1}. ${s.name} [${s.recommended === 'ON' ? 'Recommended' : 'Optional'}]\n`
      text += `   Go to: ${s.path}\n`
      text += `   ${s.description}\n\n`
    }
  }

  text += `\n---\nGenerated at TechFor60s.com - Simple tech help for seniors\n`
  return text
}

// ── Motion Wrapper ───────────────────────────────────────────────────────────

function MotionDiv({
  children,
  motionKey,
  className,
}: {
  children: React.ReactNode
  motionKey: string
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      key={motionKey}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function PhoneSetupWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [device, setDevice] = useState<DeviceType | null>(null)
  const [conditions, setConditions] = useState<Condition[]>([])
  const [priority, setPriority] = useState<Priority | null>(null)
  const [setupPerson, setSetupPerson] = useState<SetupPerson | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [copied, setCopied] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]))

  const totalSteps = 4
  const progress = showResult ? 100 : Math.round((currentStep / totalSteps) * 100)

  const guide = useMemo(() => {
    if (!device || conditions.length === 0 || !priority || !setupPerson) return []
    return generateGuide(device, conditions, priority, setupPerson)
  }, [device, conditions, priority, setupPerson])

  const handleDeviceSelect = useCallback((value: DeviceType) => {
    setDevice(value)
    trackToolUsage('phone-setup-wizard', 'start')
    setTimeout(() => setCurrentStep(1), 300)
  }, [])

  const handleConditionToggle = useCallback((value: Condition) => {
    setConditions((prev) => {
      if (value === 'none') return ['none']
      const withoutNone = prev.filter((c) => c !== 'none')
      if (withoutNone.includes(value)) {
        return withoutNone.filter((c) => c !== value)
      }
      return [...withoutNone, value]
    })
  }, [])

  const handleConditionsNext = useCallback(() => {
    if (conditions.length > 0) {
      setCurrentStep(2)
    }
  }, [conditions])

  const handlePrioritySelect = useCallback((value: Priority) => {
    setPriority(value)
    setTimeout(() => setCurrentStep(3), 300)
  }, [])

  const handleSetupPersonSelect = useCallback((value: SetupPerson) => {
    setSetupPerson(value)
    trackToolUsage('phone-setup-wizard', 'complete')
    setTimeout(() => setShowResult(true), 300)
  }, [])

  const handleRestart = useCallback(() => {
    setCurrentStep(0)
    setDevice(null)
    setConditions([])
    setPriority(null)
    setSetupPerson(null)
    setShowResult(false)
    setCopied(false)
    setExpandedSections(new Set([0]))
  }, [])

  const handleBack = useCallback(() => {
    if (showResult) {
      setShowResult(false)
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }, [currentStep, showResult])

  const toggleSection = useCallback((index: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }, [])

  const handleCopy = useCallback(async () => {
    if (!device || !setupPerson) return
    const text = generatePlainText(guide, setupPerson)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }, [guide, device, setupPerson])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const stepLabels = ['Your Device', 'Conditions', 'Priority', 'Who Is Setting Up']

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {showResult ? 'Your Personalized Guide' : `Step ${currentStep + 1} of ${totalSteps}: ${stepLabels[currentStep]}`}
          </span>
          <span className="text-sm font-medium text-brand-blue">{progress}%</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <motion.div
            className="h-full rounded-full bg-brand-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Back Button */}
      {(currentStep > 0 || showResult) && (
        <button
          onClick={handleBack}
          className="mb-4 text-sm text-brand-blue hover:underline flex items-center gap-1 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          {showResult ? 'Back to previous step' : 'Back to previous step'}
        </button>
      )}

      {/* Wizard Content */}
      <AnimatePresence mode="wait">
        {!showResult ? (
          <>
            {currentStep === 0 && (
              <MotionDiv motionKey="step-device">
                <DeviceStep selectedDevice={device} onSelect={handleDeviceSelect} />
              </MotionDiv>
            )}
            {currentStep === 1 && (
              <MotionDiv motionKey="step-conditions">
                <ConditionsStep
                  selectedConditions={conditions}
                  onToggle={handleConditionToggle}
                  onNext={handleConditionsNext}
                />
              </MotionDiv>
            )}
            {currentStep === 2 && (
              <MotionDiv motionKey="step-priority">
                <PriorityStep selectedPriority={priority} onSelect={handlePrioritySelect} />
              </MotionDiv>
            )}
            {currentStep === 3 && (
              <MotionDiv motionKey="step-person">
                <SetupPersonStep selectedPerson={setupPerson} onSelect={handleSetupPersonSelect} />
              </MotionDiv>
            )}
          </>
        ) : (
          <MotionDiv motionKey="results">
            <ResultsView
              guide={guide}
              setupPerson={setupPerson!}
              device={device!}
              expandedSections={expandedSections}
              onToggleSection={toggleSection}
              onCopy={handleCopy}
              onPrint={handlePrint}
              onRestart={handleRestart}
              copied={copied}
            />
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Step 1: Device Selection ─────────────────────────────────────────────────

function DeviceStep({
  selectedDevice,
  onSelect,
}: {
  selectedDevice: DeviceType | null
  onSelect: (value: DeviceType) => void
}) {
  return (
    <div
      className="rounded-2xl border p-6 sm:p-8 shadow-sm"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
    >
      <h2
        className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        What device are you setting up?
      </h2>
      <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
        Select the phone or tablet you want to make easier to use.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {deviceOptions.map((option) => {
          const isSelected = selectedDevice === option.value
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 group ${
                isSelected
                  ? 'border-brand-blue bg-brand-blue/10 shadow-md'
                  : 'border-[var(--border-color)] hover:border-brand-blue/50 hover:shadow-sm'
              }`}
              style={!isSelected ? { backgroundColor: 'var(--bg-primary)' } : undefined}
              aria-pressed={isSelected}
            >
              <span className={`shrink-0 ${isSelected ? 'text-brand-blue' : ''}`} style={!isSelected ? { color: 'var(--text-secondary)' } : undefined}>
                {option.icon}
              </span>
              <span
                className={`text-base sm:text-lg font-medium transition-colors ${
                  isSelected ? 'text-brand-blue' : 'group-hover:text-brand-blue'
                }`}
                style={!isSelected ? { color: 'var(--text-primary)' } : undefined}
              >
                {option.label}
              </span>
              {isSelected && <CheckCircle className="w-5 h-5 text-brand-blue ml-auto shrink-0" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 2: Conditions ───────────────────────────────────────────────────────

function ConditionsStep({
  selectedConditions,
  onToggle,
  onNext,
}: {
  selectedConditions: Condition[]
  onToggle: (value: Condition) => void
  onNext: () => void
}) {
  return (
    <div
      className="rounded-2xl border p-6 sm:p-8 shadow-sm"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
    >
      <h2
        className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        Do any of these apply?
      </h2>
      <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
        Select all that apply. This helps us recommend the right settings.
      </p>
      <div className="space-y-3">
        {conditionOptions.map((option) => {
          const isSelected = selectedConditions.includes(option.value)
          return (
            <button
              key={option.value}
              onClick={() => onToggle(option.value)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 sm:gap-4 group ${
                isSelected
                  ? 'border-brand-blue bg-brand-blue/10 shadow-md'
                  : 'border-[var(--border-color)] hover:border-brand-blue/50 hover:shadow-sm'
              }`}
              style={!isSelected ? { backgroundColor: 'var(--bg-primary)' } : undefined}
              aria-pressed={isSelected}
            >
              <span
                className={`shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                  isSelected ? 'border-brand-blue bg-brand-blue' : 'border-[var(--border-color)]'
                }`}
              >
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </span>
              <span className={`shrink-0 ${isSelected ? 'text-brand-blue' : ''}`} style={!isSelected ? { color: 'var(--text-secondary)' } : undefined}>
                {option.icon}
              </span>
              <div className="flex-1 min-w-0">
                <span
                  className={`text-base sm:text-lg font-medium block transition-colors ${
                    isSelected ? 'text-brand-blue' : 'group-hover:text-brand-blue'
                  }`}
                  style={!isSelected ? { color: 'var(--text-primary)' } : undefined}
                >
                  {option.label}
                </span>
                <span className="text-sm block mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  {option.desc}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Continue Button */}
      <div className="mt-6">
        <button
          onClick={onNext}
          disabled={selectedConditions.length === 0}
          className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
            selectedConditions.length > 0
              ? 'bg-brand-blue text-white hover:opacity-90 shadow-md'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// ── Step 3: Priority ─────────────────────────────────────────────────────────

function PriorityStep({
  selectedPriority,
  onSelect,
}: {
  selectedPriority: Priority | null
  onSelect: (value: Priority) => void
}) {
  return (
    <div
      className="rounded-2xl border p-6 sm:p-8 shadow-sm"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
    >
      <h2
        className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        What matters most right now?
      </h2>
      <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
        Pick the one improvement that would make the biggest difference.
      </p>
      <div className="space-y-3">
        {priorityOptions.map((option) => {
          const isSelected = selectedPriority === option.value
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 sm:gap-4 group ${
                isSelected
                  ? 'border-brand-blue bg-brand-blue/10 shadow-md'
                  : 'border-[var(--border-color)] hover:border-brand-blue/50 hover:shadow-sm'
              }`}
              style={!isSelected ? { backgroundColor: 'var(--bg-primary)' } : undefined}
              aria-pressed={isSelected}
            >
              <span className={`shrink-0 ${isSelected ? 'text-brand-blue' : ''}`} style={!isSelected ? { color: 'var(--text-secondary)' } : undefined}>
                {option.icon}
              </span>
              <span
                className={`text-base sm:text-lg font-medium transition-colors ${
                  isSelected ? 'text-brand-blue' : 'group-hover:text-brand-blue'
                }`}
                style={!isSelected ? { color: 'var(--text-primary)' } : undefined}
              >
                {option.label}
              </span>
              {isSelected && <CheckCircle className="w-5 h-5 text-brand-blue ml-auto shrink-0" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 4: Who Is Setting Up ────────────────────────────────────────────────

function SetupPersonStep({
  selectedPerson,
  onSelect,
}: {
  selectedPerson: SetupPerson | null
  onSelect: (value: SetupPerson) => void
}) {
  return (
    <div
      className="rounded-2xl border p-6 sm:p-8 shadow-sm"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
    >
      <h2
        className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        Who is setting this up?
      </h2>
      <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
        This helps us tailor the language in your guide.
      </p>
      <div className="space-y-3">
        {setupPersonOptions.map((option) => {
          const isSelected = selectedPerson === option.value
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 sm:gap-4 group ${
                isSelected
                  ? 'border-brand-blue bg-brand-blue/10 shadow-md'
                  : 'border-[var(--border-color)] hover:border-brand-blue/50 hover:shadow-sm'
              }`}
              style={!isSelected ? { backgroundColor: 'var(--bg-primary)' } : undefined}
              aria-pressed={isSelected}
            >
              <span className={`shrink-0 ${isSelected ? 'text-brand-blue' : ''}`} style={!isSelected ? { color: 'var(--text-secondary)' } : undefined}>
                {option.icon}
              </span>
              <span
                className={`text-base sm:text-lg font-medium transition-colors ${
                  isSelected ? 'text-brand-blue' : 'group-hover:text-brand-blue'
                }`}
                style={!isSelected ? { color: 'var(--text-primary)' } : undefined}
              >
                {option.label}
              </span>
              {isSelected && <CheckCircle className="w-5 h-5 text-brand-blue ml-auto shrink-0" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Results View ─────────────────────────────────────────────────────────────

function ResultsView({
  guide,
  setupPerson,
  device,
  expandedSections,
  onToggleSection,
  onCopy,
  onPrint,
  onRestart,
  copied,
}: {
  guide: SettingCategory[]
  setupPerson: SetupPerson
  device: DeviceType
  expandedSections: Set<number>
  onToggleSection: (index: number) => void
  onCopy: () => void
  onPrint: () => void
  onRestart: () => void
  copied: boolean
}) {
  const personMessage =
    setupPerson === 'self'
      ? 'Here are the settings to make your phone easier to use.'
      : setupPerson === 'parent'
        ? "Here are the settings to set up for your parent or grandparent's phone."
        : setupPerson === 'spouse'
          ? "Here are the settings to set up for your spouse's phone."
          : 'Here are the recommended settings for your client.'

  const deviceLabel =
    device === 'iphone'
      ? 'iPhone'
      : device === 'ipad'
        ? 'iPad'
        : device === 'samsung'
          ? 'Samsung Galaxy'
          : device === 'pixel'
            ? 'Google Pixel'
            : device === 'other-android'
              ? 'Android'
              : 'iPhone & Android'

  return (
    <div
      className="rounded-2xl border shadow-sm overflow-hidden print:shadow-none print:border-gray-300"
      style={{ borderColor: 'var(--border-color)' }}
    >
      {/* Header */}
      <div className="bg-brand-blue text-white p-6 sm:p-8 text-center print:bg-white print:text-black print:border-b-2 print:border-brand-blue">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4 print:bg-gray-100">
          <Smartphone className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">
          Your {deviceLabel} Setup Guide
        </h2>
        <p className="text-blue-100 text-base sm:text-lg max-w-lg mx-auto print:text-gray-600">
          {personMessage}
        </p>
      </div>

      {/* Action Buttons */}
      <div
        className="flex flex-wrap gap-3 p-4 sm:p-6 border-b print:hidden"
        style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}
      >
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-blue text-white font-semibold hover:opacity-90 transition-all text-base"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {copied ? 'Copied!' : 'Copy Guide to Clipboard'}
        </button>
        <button
          onClick={onPrint}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-semibold hover:border-brand-blue hover:text-brand-blue transition-all text-base"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        >
          <Printer className="w-5 h-5" />
          Print This Guide
        </button>
      </div>

      {/* Settings Categories */}
      <div className="p-4 sm:p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        {guide.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              No specific settings matched your selections. Try going back and adjusting your choices.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {guide.map((category, catIndex) => (
              <div
                key={catIndex}
                className="rounded-xl border overflow-hidden print:break-inside-avoid"
                style={{ borderColor: 'var(--border-color)' }}
              >
                {/* Category Header */}
                <button
                  onClick={() => onToggleSection(catIndex)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:opacity-80 transition-opacity print:pointer-events-none"
                  style={{ backgroundColor: 'var(--bg-primary)' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {category.icon}
                    </span>
                    <h3
                      className="text-lg sm:text-xl font-bold font-[family-name:var(--font-heading)]"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {category.title}
                    </h3>
                    <span
                      className="text-sm px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
                    >
                      {category.settings.length} settings
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 print:hidden ${
                      expandedSections.has(catIndex) ? 'rotate-180' : ''
                    }`}
                    style={{ color: 'var(--text-secondary)' }}
                  />
                </button>

                {/* Settings List */}
                <AnimatePresence initial={false}>
                  {(expandedSections.has(catIndex) || typeof window !== 'undefined' && window.matchMedia?.('print')?.matches) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden print:!h-auto print:!opacity-100"
                    >
                      <div className="p-4 sm:p-5 space-y-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                        {category.settings.map((setting, setIndex) => (
                          <div
                            key={setIndex}
                            className="flex gap-4 print:break-inside-avoid"
                          >
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue text-white font-bold text-sm shrink-0 mt-0.5">
                              {setIndex + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4
                                  className="font-semibold text-base sm:text-lg"
                                  style={{ color: 'var(--text-primary)' }}
                                >
                                  {setting.name}
                                </h4>
                                <span
                                  className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${
                                    setting.recommended === 'ON'
                                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                  }`}
                                >
                                  {setting.recommended === 'ON' ? 'Recommended' : 'Optional'}
                                </span>
                              </div>
                              <p
                                className="text-sm font-mono px-3 py-1.5 rounded-lg mb-2 break-all"
                                style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
                              >
                                {setting.path}
                              </p>
                              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {setting.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        {/* Helpful Tip */}
        <div
          className="mt-6 p-4 rounded-xl border bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
        >
          <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-1">
            Helpful Tip
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            {setupPerson === 'self'
              ? 'Take your time with each setting. You can always come back and turn something off if you do not like it. None of these changes are permanent.'
              : 'Walk through each setting together and explain what it does. Let the person try it out and decide what feels right. You can always adjust later.'}
          </p>
        </div>

        {/* Related Links */}
        <div className="mt-6 print:hidden">
          <h3
            className="text-lg font-bold font-[family-name:var(--font-heading)] mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Related Guides
          </h3>
          <div className="space-y-2">
            <Link
              href="/accessibility"
              className="flex items-center gap-2 p-3 rounded-lg transition-colors text-brand-blue font-medium text-sm sm:text-base"
              style={{ backgroundColor: 'transparent' }}
            >
              <ChevronRight className="w-4 h-4 shrink-0" />
              Complete Accessibility Guide
            </Link>
            <Link
              href="/blog/how-to-make-text-bigger-on-phone"
              className="flex items-center gap-2 p-3 rounded-lg transition-colors text-brand-blue font-medium text-sm sm:text-base"
            >
              <ChevronRight className="w-4 h-4 shrink-0" />
              How to Make Text Bigger on Any Phone
            </Link>
            <Link
              href="/blog/setting-up-iphone-for-elderly-parent"
              className="flex items-center gap-2 p-3 rounded-lg transition-colors text-brand-blue font-medium text-sm sm:text-base"
            >
              <ChevronRight className="w-4 h-4 shrink-0" />
              Setting Up an iPhone for an Elderly Parent
            </Link>
          </div>
        </div>

        {/* Restart Button */}
        <div className="mt-8 text-center print:hidden">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-semibold hover:border-brand-blue hover:text-brand-blue transition-all duration-200 text-base"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', backgroundColor: 'var(--bg-primary)' }}
          >
            <RotateCcw className="w-5 h-5" />
            Start Over with New Settings
          </button>
        </div>
      </div>
    </div>
  )
}
