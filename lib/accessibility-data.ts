// ── Accessibility Settings Data ───────────────────────────────────────────────
// Device-specific accessibility settings for various conditions

export interface Condition {
  slug: string
  name: string
  icon: string
  description: string
  color: string
}

export interface AccessDevice {
  slug: string
  name: string
  brand: string
  icon: string
}

export interface AccessSetting {
  name: string
  path: string
  description: string
}

export interface AccessGuide {
  conditionSlug: string
  deviceSlug: string
  intro: string
  settings: AccessSetting[]
  tip: string
}

export const CONDITIONS: Condition[] = [
  {
    slug: 'low-vision',
    name: 'Low Vision',
    icon: '👁️',
    description: 'Settings to make text larger, increase contrast, and use magnification for people with reduced vision.',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  },
  {
    slug: 'hearing-loss',
    name: 'Hearing Loss',
    icon: '👂',
    description: 'Settings for visual alerts, captions, hearing aid compatibility, and sound amplification.',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  },
  {
    slug: 'arthritis',
    name: 'Arthritis / Limited Dexterity',
    icon: '🤲',
    description: 'Settings to make touch easier, reduce the need for precise tapping, and enable voice control.',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  },
  {
    slug: 'tremors',
    name: 'Tremors',
    icon: '🖐️',
    description: 'Settings to reduce accidental taps, slow down touch response, and stabilize interactions.',
    color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
  },
  {
    slug: 'macular-degeneration',
    name: 'Macular Degeneration',
    icon: '🔍',
    description: 'Specialized settings for central vision loss including zoom, color filters, and screen reader options.',
    color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
  },
  {
    slug: 'colorblindness',
    name: 'Color Blindness',
    icon: '🎨',
    description: 'Color filter settings to adjust screen colors for different types of color vision deficiency.',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  },
]

export const ACCESS_DEVICES: AccessDevice[] = [
  { slug: 'iphone', name: 'iPhone', brand: 'Apple', icon: '📱' },
  { slug: 'ipad', name: 'iPad', brand: 'Apple', icon: '📲' },
  { slug: 'android', name: 'Android Phone', brand: 'Various', icon: '🤖' },
  { slug: 'windows', name: 'Windows PC', brand: 'Microsoft', icon: '💻' },
  { slug: 'mac', name: 'Mac / MacBook', brand: 'Apple', icon: '🖥️' },
  { slug: 'chromebook', name: 'Chromebook', brand: 'Google', icon: '💻' },
]

// ── Guides ───────────────────────────────────────────────────────────────────

const GUIDES: AccessGuide[] = [
  // LOW VISION
  {
    conditionSlug: 'low-vision', deviceSlug: 'iphone',
    intro: 'The iPhone has excellent built-in features for people with low vision. These settings will make everything on your screen larger, clearer, and easier to read.',
    settings: [
      { name: 'Increase Text Size', path: 'Settings → Accessibility → Display & Text Size → Larger Text → turn ON → slide to comfortable size', description: 'Makes all text throughout iOS larger and easier to read.' },
      { name: 'Bold Text', path: 'Settings → Accessibility → Display & Text Size → Bold Text → turn ON', description: 'Makes text thicker and easier to see against backgrounds.' },
      { name: 'Increase Contrast', path: 'Settings → Accessibility → Display & Text Size → Increase Contrast → turn ON', description: 'Makes buttons and text stand out more clearly.' },
      { name: 'Zoom', path: 'Settings → Accessibility → Zoom → turn ON. Double-tap with 3 fingers to zoom in/out.', description: 'Acts like a magnifying glass for your entire screen.' },
      { name: 'Display Zoom', path: 'Settings → Display & Brightness → Display Zoom → Larger Text', description: 'Makes app icons and interface elements bigger.' },
      { name: 'Smart Invert Colors', path: 'Settings → Accessibility → Display & Text Size → Smart Invert → turn ON', description: 'Reverses colors for better contrast while keeping photos normal.' },
      { name: 'Speak Screen', path: 'Settings → Accessibility → Spoken Content → Speak Screen → turn ON. Swipe down with 2 fingers to hear screen read aloud.', description: 'Your iPhone will read anything on screen to you.' },
    ],
    tip: 'Ask Siri to change settings by voice: "Hey Siri, make the text bigger" or "Hey Siri, turn on zoom."',
  },
  {
    conditionSlug: 'low-vision', deviceSlug: 'ipad',
    intro: 'The iPad\'s larger screen combined with these accessibility settings makes it one of the best devices for people with low vision.',
    settings: [
      { name: 'Increase Text Size', path: 'Settings → Accessibility → Display & Text Size → Larger Text → turn ON → slide to preferred size', description: 'Enlarges text across all apps.' },
      { name: 'Bold Text', path: 'Settings → Accessibility → Display & Text Size → Bold Text → turn ON', description: 'Makes all text thicker and more readable.' },
      { name: 'Zoom', path: 'Settings → Accessibility → Zoom → turn ON. Double-tap with 3 fingers to magnify.', description: 'Magnifies any part of the screen like a digital magnifying glass.' },
      { name: 'Increase Contrast', path: 'Settings → Accessibility → Display & Text Size → Increase Contrast → turn ON', description: 'Improves visibility of buttons and text.' },
      { name: 'Reduce Transparency', path: 'Settings → Accessibility → Display & Text Size → Reduce Transparency → turn ON', description: 'Makes backgrounds solid instead of see-through for clearer reading.' },
      { name: 'Spoken Content', path: 'Settings → Accessibility → Spoken Content → Speak Screen → ON', description: 'Swipe down with two fingers to have the iPad read the screen aloud.' },
    ],
    tip: 'The iPad\'s larger screen naturally makes everything easier to see. Combined with text size and zoom, it\'s ideal for low vision.',
  },
  {
    conditionSlug: 'low-vision', deviceSlug: 'android',
    intro: 'Android phones have powerful accessibility features for low vision. These settings work on Samsung, Google Pixel, Motorola, and most Android phones.',
    settings: [
      { name: 'Increase Font Size', path: 'Settings → Accessibility → Font Size (or Settings → Display → Font Size) → slide to largest', description: 'Makes all text bigger throughout the phone.' },
      { name: 'Display Size', path: 'Settings → Accessibility → Display Size → slide to largest', description: 'Makes everything on screen larger including icons and buttons.' },
      { name: 'Bold Text', path: 'Settings → Accessibility → Bold Text → turn ON', description: 'Makes text thicker and easier to read.' },
      { name: 'High Contrast Text', path: 'Settings → Accessibility → High Contrast Text → turn ON', description: 'Adds outlines to text for better readability.' },
      { name: 'Magnification', path: 'Settings → Accessibility → Magnification → turn ON. Triple-tap to zoom in/out.', description: 'Turns your screen into a magnifying glass.' },
      { name: 'Color Inversion', path: 'Settings → Accessibility → Color Inversion → turn ON', description: 'Reverses screen colors for higher contrast.' },
      { name: 'Select to Speak', path: 'Settings → Accessibility → Select to Speak → turn ON. Tap the accessibility button then tap text to hear it.', description: 'Reads selected text aloud to you.' },
    ],
    tip: 'On Samsung phones, look in Settings → Accessibility → Visibility Enhancements for additional low vision tools.',
  },
  {
    conditionSlug: 'low-vision', deviceSlug: 'windows',
    intro: 'Windows 11 includes a comprehensive set of accessibility features for people with low vision.',
    settings: [
      { name: 'Make Text Bigger', path: 'Settings → Accessibility → Text Size → slide to preferred size', description: 'Increases text size across Windows.' },
      { name: 'Magnifier', path: 'Settings → Accessibility → Magnifier → turn ON (or press Windows key + Plus)', description: 'A built-in magnifying glass that follows your cursor.' },
      { name: 'High Contrast Theme', path: 'Settings → Accessibility → Contrast Themes → select a high contrast theme', description: 'Changes all colors to high contrast for better visibility.' },
      { name: 'Increase Mouse Pointer Size', path: 'Settings → Accessibility → Mouse Pointer → increase Size slider', description: 'Makes the mouse cursor bigger and easier to find.' },
      { name: 'Narrator', path: 'Settings → Accessibility → Narrator → turn ON', description: 'Reads everything on screen aloud.' },
      { name: 'Night Light', path: 'Settings → System → Display → Night Light → turn ON', description: 'Reduces blue light and can help with screen glare.' },
    ],
    tip: 'Quick shortcut: Press Windows key + Plus key anytime to instantly open the Magnifier.',
  },
  {
    conditionSlug: 'low-vision', deviceSlug: 'mac',
    intro: 'macOS has excellent built-in accessibility for low vision, with smooth zoom and screen reader capabilities.',
    settings: [
      { name: 'Increase Text Size', path: 'System Settings → Accessibility → Display → Text Size → increase', description: 'Makes text larger across macOS.' },
      { name: 'Zoom', path: 'System Settings → Accessibility → Zoom → turn ON. Use Ctrl + scroll to zoom.', description: 'Magnifies your entire screen or a portion of it.' },
      { name: 'Increase Contrast', path: 'System Settings → Accessibility → Display → Increase Contrast → turn ON', description: 'Makes buttons and borders more visible.' },
      { name: 'Reduce Transparency', path: 'System Settings → Accessibility → Display → Reduce Transparency → turn ON', description: 'Makes backgrounds solid for clearer reading.' },
      { name: 'Cursor Size', path: 'System Settings → Accessibility → Display → Pointer Size → increase', description: 'Makes the mouse pointer larger and easier to find.' },
      { name: 'Hover Text', path: 'System Settings → Accessibility → Zoom → Hover Text → turn ON. Hold Command to see enlarged text under cursor.', description: 'Shows a large preview of text under your mouse pointer.' },
    ],
    tip: 'Press Ctrl + Option + Cmd + 8 to quickly invert screen colors for better contrast.',
  },
  {
    conditionSlug: 'low-vision', deviceSlug: 'chromebook',
    intro: 'Chromebooks have built-in accessibility features that help people with low vision use the web and apps more comfortably.',
    settings: [
      { name: 'Increase Display Size', path: 'Settings → Device → Display → change display size to larger', description: 'Makes everything on screen bigger.' },
      { name: 'Full-Screen Magnifier', path: 'Settings → Accessibility → Display → Full-Screen Magnifier → turn ON', description: 'Magnifies the entire screen. Use Ctrl + Alt + scroll to zoom.' },
      { name: 'Docked Magnifier', path: 'Settings → Accessibility → Display → Docked Magnifier → turn ON', description: 'Shows a magnified view at the top of the screen.' },
      { name: 'High Contrast Mode', path: 'Settings → Accessibility → Display → High Contrast Mode → turn ON', description: 'Inverts colors for better visibility.' },
      { name: 'Large Mouse Cursor', path: 'Settings → Accessibility → Cursor → Large Mouse Cursor → turn ON', description: 'Makes the cursor bigger and easier to see.' },
      { name: 'Select-to-Speak', path: 'Settings → Accessibility → Text-to-Speech → Select-to-Speak → turn ON', description: 'Select text and have it read aloud.' },
    ],
    tip: 'In Chrome browser, press Ctrl + Plus to zoom into any webpage. Ctrl + Minus to zoom out. Ctrl + 0 to reset.',
  },

  // HEARING LOSS
  {
    conditionSlug: 'hearing-loss', deviceSlug: 'iphone',
    intro: 'The iPhone has excellent features for people with hearing loss, including hearing aid support, visual alerts, and live captions.',
    settings: [
      { name: 'LED Flash for Alerts', path: 'Settings → Accessibility → Audio/Visual → LED Flash for Alerts → turn ON', description: 'The camera flash blinks when you get a call or notification.' },
      { name: 'Pair Hearing Aids', path: 'Settings → Accessibility → Hearing Devices → pair your MFi hearing aids', description: 'Connect Bluetooth hearing aids directly to your iPhone for calls, music, and more.' },
      { name: 'Live Captions', path: 'Settings → Accessibility → Live Captions → turn ON', description: 'Shows real-time captions for phone calls, FaceTime, and media.' },
      { name: 'Vibration', path: 'Settings → Sounds & Haptics → make sure vibration is ON for Ring and Silent modes', description: 'Feel vibrations for calls and notifications even when you can\'t hear them.' },
      { name: 'Sound Recognition', path: 'Settings → Accessibility → Sound Recognition → turn ON → select sounds (doorbell, fire alarm, etc.)', description: 'Your iPhone listens for important sounds and alerts you with a notification.' },
      { name: 'Mono Audio', path: 'Settings → Accessibility → Audio/Visual → Mono Audio → turn ON', description: 'Combines left and right audio channels so you don\'t miss sounds in one ear.' },
    ],
    tip: 'Sound Recognition is incredibly useful — it can alert you to doorbells, smoke alarms, and even someone calling your name.',
  },
  {
    conditionSlug: 'hearing-loss', deviceSlug: 'ipad',
    intro: 'The iPad offers the same hearing accessibility features as iPhone, with the advantage of a larger screen for captions.',
    settings: [
      { name: 'LED Flash for Alerts', path: 'Settings → Accessibility → Audio/Visual → LED Flash for Alerts → turn ON', description: 'Screen flashes for notifications.' },
      { name: 'Live Captions', path: 'Settings → Accessibility → Live Captions → turn ON', description: 'Real-time subtitles for any audio playing on your iPad.' },
      { name: 'Hearing Devices', path: 'Settings → Accessibility → Hearing Devices → pair your hearing aids', description: 'Connect hearing aids for streaming audio directly from iPad.' },
      { name: 'Mono Audio', path: 'Settings → Accessibility → Audio/Visual → Mono Audio → turn ON', description: 'Routes all audio to both channels for single-ear hearing loss.' },
      { name: 'Sound Recognition', path: 'Settings → Accessibility → Sound Recognition → turn ON', description: 'Alerts you to doorbells, alarms, and other important sounds.' },
    ],
    tip: 'When watching videos, turn on subtitles in the video player. Most streaming apps have a CC (closed captions) button.',
  },
  {
    conditionSlug: 'hearing-loss', deviceSlug: 'android',
    intro: 'Android phones include several features to help people with hearing loss stay connected and aware.',
    settings: [
      { name: 'Flash Notification', path: 'Settings → Accessibility → Flash Notification → turn ON', description: 'Camera flash or screen blinks for calls and notifications.' },
      { name: 'Live Caption', path: 'Settings → Accessibility → Live Caption → turn ON', description: 'Automatic captions for any audio playing on your phone.' },
      { name: 'Sound Amplifier', path: 'Settings → Accessibility → Sound Amplifier → turn ON', description: 'Uses your phone\'s microphone and earbuds to amplify sounds around you.' },
      { name: 'Hearing Aid Compatibility', path: 'Settings → Accessibility → Hearing Aids → pair your hearing aids', description: 'Connect Bluetooth hearing aids to your Android phone.' },
      { name: 'Mono Audio', path: 'Settings → Accessibility → Mono Audio → turn ON', description: 'Combines audio channels for single-ear hearing.' },
      { name: 'Vibration Strength', path: 'Settings → Sounds and Vibration → Vibration Intensity → increase', description: 'Stronger vibrations so you feel notifications.' },
    ],
    tip: 'Google\'s Live Transcribe app (free) can show real-time transcriptions of conversations — great for face-to-face communication.',
  },
  {
    conditionSlug: 'hearing-loss', deviceSlug: 'windows',
    intro: 'Windows 11 includes features for hearing accessibility including live captions and visual notifications.',
    settings: [
      { name: 'Live Captions', path: 'Settings → Accessibility → Captions → Live Captions → turn ON (or Windows + Ctrl + L)', description: 'Real-time captions for any audio on your computer.' },
      { name: 'Flash Screen for Notifications', path: 'Settings → Accessibility → Audio → Flash my screen during audio notifications', description: 'Screen flashes instead of playing a sound.' },
      { name: 'Mono Audio', path: 'Settings → Accessibility → Audio → Mono Audio → turn ON', description: 'Combines stereo to mono for single-ear hearing.' },
      { name: 'Caption Style', path: 'Settings → Accessibility → Captions → customize text size, color, and background', description: 'Make captions larger and more visible.' },
    ],
    tip: 'Press Windows + Ctrl + L to quickly toggle Live Captions on or off at any time.',
  },
  {
    conditionSlug: 'hearing-loss', deviceSlug: 'mac',
    intro: 'macOS includes hearing accessibility features including live captions and visual alerts.',
    settings: [
      { name: 'Flash Screen for Alerts', path: 'System Settings → Accessibility → Audio → Flash the screen when an alert sound occurs → turn ON', description: 'Screen flashes instead of playing alert sounds.' },
      { name: 'Live Captions', path: 'System Settings → Accessibility → Live Captions → turn ON', description: 'Automatic captions for audio and video.' },
      { name: 'Hearing Aids', path: 'System Settings → Accessibility → Hearing → pair hearing aids via Bluetooth', description: 'Connect hearing aids to your Mac.' },
      { name: 'Always Show Captions', path: 'System Settings → Accessibility → Captions → Prefer Closed Captions → turn ON', description: 'Automatically shows captions when available.' },
    ],
    tip: 'When on a FaceTime call, turn on Live Captions to see real-time transcription of what the other person is saying.',
  },
  {
    conditionSlug: 'hearing-loss', deviceSlug: 'chromebook',
    intro: 'Chromebooks include hearing accessibility features to help you stay connected.',
    settings: [
      { name: 'Live Caption', path: 'Settings → Accessibility → Audio → Live Caption → turn ON', description: 'Real-time captions for any audio.' },
      { name: 'Mono Audio', path: 'Settings → Accessibility → Audio → Mono Audio → turn ON', description: 'Combines audio channels.' },
      { name: 'Startup Sound', path: 'Settings → Accessibility → Audio → enable visual alerts', description: 'Visual indicators for system sounds.' },
    ],
    tip: 'Use Google Meet with built-in captions for video calls with automatic transcription.',
  },

  // ARTHRITIS
  {
    conditionSlug: 'arthritis', deviceSlug: 'iphone',
    intro: 'These settings reduce the need for precise finger movements and make your iPhone easier to use with stiff or painful joints.',
    settings: [
      { name: 'AssistiveTouch', path: 'Settings → Accessibility → Touch → AssistiveTouch → turn ON', description: 'Adds an on-screen button for common actions without complex gestures.' },
      { name: 'Slow Haptic Touch', path: 'Settings → Accessibility → Touch → Haptic Touch → Slow', description: 'Requires a longer press before menus appear, reducing accidental activations.' },
      { name: 'Back Tap', path: 'Settings → Accessibility → Touch → Back Tap → set Double Tap and Triple Tap shortcuts', description: 'Tap the back of your phone to trigger actions — no precise screen tapping needed.' },
      { name: 'Voice Control', path: 'Settings → Accessibility → Voice Control → turn ON', description: 'Control your entire iPhone by voice — "tap Send", "scroll down", "go home".' },
      { name: 'Reachability', path: 'Settings → Accessibility → Touch → Reachability → turn ON. Swipe down on the bottom edge.', description: 'Brings the top of the screen down so you can reach it with one hand.' },
      { name: 'Siri', path: 'Settings → Siri & Search → Listen for "Hey Siri" → turn ON', description: 'Use voice for calls, texts, reminders, and more without touching the screen.' },
    ],
    tip: 'Voice Control is a game-changer for arthritis. Say "show numbers" to see numbers on every tappable item, then say the number to tap it.',
  },
  {
    conditionSlug: 'arthritis', deviceSlug: 'ipad',
    intro: 'The iPad\'s larger screen is naturally easier for people with arthritis. These settings make it even better.',
    settings: [
      { name: 'AssistiveTouch', path: 'Settings → Accessibility → Touch → AssistiveTouch → turn ON', description: 'On-screen menu for common actions without complex gestures.' },
      { name: 'Slow Haptic Touch', path: 'Settings → Accessibility → Touch → Haptic Touch → Slow', description: 'Prevents accidental long-press menus.' },
      { name: 'Voice Control', path: 'Settings → Accessibility → Voice Control → turn ON', description: 'Control your iPad entirely by voice.' },
      { name: 'External Keyboard', path: 'Connect a Bluetooth keyboard for typing instead of the on-screen keyboard', description: 'Physical keys can be easier than tapping glass.' },
      { name: 'Apple Pencil', path: 'Use Apple Pencil for more precise tapping (easier to grip than a finger)', description: 'A stylus gives you a more comfortable grip for screen interactions.' },
    ],
    tip: 'Consider getting a stand for your iPad so you don\'t have to hold it — reducing strain on your hands and wrists.',
  },
  {
    conditionSlug: 'arthritis', deviceSlug: 'android',
    intro: 'Android offers several features to make the phone easier to use with limited hand mobility.',
    settings: [
      { name: 'Touch & Hold Delay', path: 'Settings → Accessibility → Touch & Hold Delay → Long', description: 'Requires a longer press to trigger actions, reducing accidental touches.' },
      { name: 'Voice Access', path: 'Settings → Accessibility → Voice Access → turn ON', description: 'Control your phone entirely by voice — "tap Search", "scroll down".' },
      { name: 'Google Assistant', path: 'Say "Hey Google" to make calls, send texts, and control your phone by voice', description: 'Hands-free control for common tasks.' },
      { name: 'Increase Touch Target Size', path: 'Settings → Display → Display Size → increase to make buttons bigger', description: 'Larger buttons are easier to tap accurately.' },
      { name: 'Power Button Menu', path: 'Settings → Accessibility → Accessibility Menu → turn ON', description: 'Adds a floating button with shortcuts to common actions.' },
    ],
    tip: 'A phone case with a ring grip or pop socket makes the phone much easier to hold with arthritic hands.',
  },
  {
    conditionSlug: 'arthritis', deviceSlug: 'windows',
    intro: 'Windows offers several features to reduce reliance on precise mouse and keyboard movements.',
    settings: [
      { name: 'Voice Typing', path: 'Press Windows + H to start voice typing anywhere', description: 'Dictate text instead of typing.' },
      { name: 'Sticky Keys', path: 'Settings → Accessibility → Keyboard → Sticky Keys → turn ON', description: 'Press Ctrl, Alt, Shift one at a time instead of holding them together.' },
      { name: 'Mouse Keys', path: 'Settings → Accessibility → Mouse → Mouse Keys → turn ON', description: 'Move the mouse cursor using the number pad on your keyboard.' },
      { name: 'Increase Mouse Pointer Size', path: 'Settings → Accessibility → Mouse Pointer → increase size', description: 'Larger pointer is easier to see and position.' },
      { name: 'Click Lock', path: 'Settings → Bluetooth & Devices → Mouse → Additional Settings → Click Lock → turn ON', description: 'Highlight text and drag without holding the mouse button down.' },
    ],
    tip: 'A trackball mouse or vertical mouse can be much more comfortable for arthritic hands than a standard mouse.',
  },
  {
    conditionSlug: 'arthritis', deviceSlug: 'mac',
    intro: 'macOS includes features to make computer use more comfortable with limited hand mobility.',
    settings: [
      { name: 'Voice Control', path: 'System Settings → Accessibility → Voice Control → turn ON', description: 'Control your Mac entirely by voice.' },
      { name: 'Dictation', path: 'System Settings → Keyboard → Dictation → turn ON. Press Fn Fn to start dictating.', description: 'Speak instead of typing.' },
      { name: 'Sticky Keys', path: 'System Settings → Accessibility → Keyboard → Sticky Keys → turn ON', description: 'Press modifier keys sequentially instead of simultaneously.' },
      { name: 'Slow Keys', path: 'System Settings → Accessibility → Keyboard → Slow Keys → turn ON', description: 'Requires keys to be held longer, preventing accidental presses.' },
      { name: 'Pointer Size', path: 'System Settings → Accessibility → Display → Pointer Size → increase', description: 'Makes the cursor larger and easier to position.' },
    ],
    tip: 'macOS Voice Control is very powerful. Say "show grid" to overlay a numbered grid, then say the grid number to click precisely.',
  },
  {
    conditionSlug: 'arthritis', deviceSlug: 'chromebook',
    intro: 'Chromebooks offer accessibility features to help users with limited hand mobility.',
    settings: [
      { name: 'Voice Typing', path: 'Press Search + D to start voice typing', description: 'Dictate text instead of typing.' },
      { name: 'Sticky Keys', path: 'Settings → Accessibility → Keyboard → Sticky Keys → turn ON', description: 'Press key combinations one key at a time.' },
      { name: 'On-Screen Keyboard', path: 'Settings → Accessibility → Keyboard → On-Screen Keyboard → turn ON', description: 'Large on-screen keys that may be easier than physical keys.' },
      { name: 'Auto-Click', path: 'Settings → Accessibility → Cursor → Auto-Click → turn ON', description: 'Automatically clicks when you stop moving the cursor — no physical click needed.' },
      { name: 'Large Cursor', path: 'Settings → Accessibility → Cursor → Large Mouse Cursor → turn ON', description: 'Bigger cursor is easier to position.' },
    ],
    tip: 'Auto-Click is particularly helpful — just hover your cursor over something and it clicks automatically.',
  },

  // TREMORS
  {
    conditionSlug: 'tremors', deviceSlug: 'iphone',
    intro: 'These settings help prevent accidental taps and make the iPhone more forgiving of unsteady hand movements.',
    settings: [
      { name: 'Haptic Touch — Slow', path: 'Settings → Accessibility → Touch → Haptic Touch → Slow', description: 'Requires a longer, more deliberate press to trigger actions.' },
      { name: 'Shake to Undo — OFF', path: 'Settings → Accessibility → Touch → Shake to Undo → turn OFF', description: 'Prevents accidental undo when your hand shakes.' },
      { name: 'AssistiveTouch', path: 'Settings → Accessibility → Touch → AssistiveTouch → turn ON', description: 'Provides large on-screen buttons for actions that normally require precise gestures.' },
      { name: 'Voice Control', path: 'Settings → Accessibility → Voice Control → turn ON', description: 'Bypass touch entirely — control everything by voice.' },
      { name: 'Touch Accommodations', path: 'Settings → Accessibility → Touch → Touch Accommodations → turn ON → set Hold Duration', description: 'Ignores brief, accidental touches and requires a deliberate press.' },
    ],
    tip: 'Touch Accommodations with Hold Duration is the most important setting for tremors. Start with 0.20 seconds and adjust up if needed.',
  },
  {
    conditionSlug: 'tremors', deviceSlug: 'android',
    intro: 'Android offers settings to handle accidental inputs from tremors and make the phone easier to control.',
    settings: [
      { name: 'Touch & Hold Delay', path: 'Settings → Accessibility → Touch & Hold Delay → Long', description: 'Requires longer deliberate touches to trigger actions.' },
      { name: 'Voice Access', path: 'Settings → Accessibility → Voice Access → turn ON', description: 'Control your phone by voice to avoid touch entirely.' },
      { name: 'Increase Touch Target', path: 'Settings → Display → Display Size → Largest', description: 'Makes all buttons and tap targets bigger and easier to hit.' },
      { name: 'Ignore Repeated Touches', path: 'Settings → Accessibility → Interaction Controls → adjust touch sensitivity', description: 'Ignores rapid repeated taps that happen during tremors.' },
    ],
    tip: 'A phone stand or case with a grip can help stabilize the phone and reduce the impact of tremors.',
  },
  {
    conditionSlug: 'tremors', deviceSlug: 'ipad', intro: 'The iPad\'s larger screen is naturally more forgiving of tremors. These settings make it even better.', settings: [
      { name: 'Touch Accommodations', path: 'Settings → Accessibility → Touch → Touch Accommodations → turn ON', description: 'Set hold duration to ignore accidental brief touches.' },
      { name: 'Shake to Undo — OFF', path: 'Settings → Accessibility → Touch → Shake to Undo → OFF', description: 'Prevents accidental undos.' },
      { name: 'AssistiveTouch', path: 'Settings → Accessibility → Touch → AssistiveTouch → turn ON', description: 'Large buttons replace precise gestures.' },
      { name: 'Voice Control', path: 'Settings → Accessibility → Voice Control → turn ON', description: 'Complete voice-based control.' },
      { name: 'Apple Pencil', path: 'Use Apple Pencil for more precise, stabilized input', description: 'A stylus provides a steadier grip point.' },
    ], tip: 'Consider using a sturdy iPad stand on a table — it eliminates the need to hold the device.', },
  {
    conditionSlug: 'tremors', deviceSlug: 'windows', intro: 'Windows includes settings to help with unsteady mouse movements and accidental key presses.', settings: [
      { name: 'Filter Keys', path: 'Settings → Accessibility → Keyboard → Filter Keys → turn ON', description: 'Ignores brief or repeated keystrokes from tremors.' },
      { name: 'Mouse Pointer Speed', path: 'Settings → Bluetooth & Devices → Mouse → Pointer Speed → lower it', description: 'Slower pointer movement is easier to control.' },
      { name: 'Snap To', path: 'Settings → Bluetooth & Devices → Mouse → Additional → Pointer Options → Snap To → turn ON', description: 'Pointer automatically jumps to buttons in dialog boxes.' },
      { name: 'Voice Typing', path: 'Windows + H to dictate instead of typing', description: 'Bypass the keyboard entirely.' },
    ], tip: 'A trackball mouse stays stationary while you move the ball — much easier to use with tremors than a regular mouse.', },
  {
    conditionSlug: 'tremors', deviceSlug: 'mac', intro: 'macOS offers settings to accommodate tremors and reduce accidental inputs.', settings: [
      { name: 'Slow Keys', path: 'System Settings → Accessibility → Keyboard → Slow Keys → turn ON', description: 'Requires keys to be held briefly before registering — filters accidental presses.' },
      { name: 'Pointer Speed', path: 'System Settings → Mouse → Tracking Speed → lower it', description: 'Slower pointer movement for more controlled cursor positioning.' },
      { name: 'Spring-Loading Delay', path: 'System Settings → Accessibility → Pointer Control → Spring-Loading Delay → Long', description: 'Prevents accidental folder opening when hovering.' },
      { name: 'Voice Control', path: 'System Settings → Accessibility → Voice Control → turn ON', description: 'Control your Mac by voice.' },
    ], tip: 'Dictation (Fn Fn) lets you type by speaking — great for avoiding keyboard difficulties.',
  },
  {
    conditionSlug: 'tremors', deviceSlug: 'chromebook', intro: 'Chromebook settings to help manage tremor-related input difficulties.', settings: [
      { name: 'Auto-Click', path: 'Settings → Accessibility → Cursor → Auto-Click → turn ON', description: 'Clicks automatically when cursor stops — no physical click needed.' },
      { name: 'Slow Mouse Speed', path: 'Settings → Device → Mouse → reduce pointer speed', description: 'Slower cursor movement for better control.' },
      { name: 'Sticky Keys', path: 'Settings → Accessibility → Keyboard → Sticky Keys → turn ON', description: 'Press key combos one key at a time.' },
      { name: 'Voice Typing', path: 'Press Search + D to dictate', description: 'Speak instead of typing.' },
    ], tip: 'Auto-Click combined with slower pointer speed makes a Chromebook much more manageable with tremors.',
  },

  // MACULAR DEGENERATION
  {
    conditionSlug: 'macular-degeneration', deviceSlug: 'iphone', intro: 'Macular degeneration affects central vision. These settings help by magnifying content and providing audio alternatives.', settings: [
      { name: 'Zoom', path: 'Settings → Accessibility → Zoom → turn ON. Double-tap 3 fingers to zoom.', description: 'Magnifies the screen to compensate for central vision loss.' },
      { name: 'VoiceOver', path: 'Settings → Accessibility → VoiceOver → turn ON', description: 'Full screen reader that describes everything on screen by voice.' },
      { name: 'Larger Text', path: 'Settings → Accessibility → Display & Text Size → Larger Text → maximum size', description: 'Maximum text enlargement.' },
      { name: 'Color Filters', path: 'Settings → Accessibility → Display & Text Size → Color Filters → turn ON → try different options', description: 'Adjust colors to improve visibility with your specific vision.' },
      { name: 'Reduce White Point', path: 'Settings → Accessibility → Display & Text Size → Reduce White Point → turn ON', description: 'Reduces brightness of bright colors that can cause glare.' },
      { name: 'Speak Screen', path: 'Settings → Accessibility → Spoken Content → Speak Screen → ON', description: 'Swipe down with 2 fingers to hear the entire screen read aloud.' },
    ], tip: 'Start with Zoom and Speak Screen before trying VoiceOver. VoiceOver changes how touch works, so it takes practice.',
  },
  {
    conditionSlug: 'macular-degeneration', deviceSlug: 'android', intro: 'Android offers magnification and screen reading features that help compensate for central vision loss.', settings: [
      { name: 'Magnification', path: 'Settings → Accessibility → Magnification → turn ON. Triple-tap to zoom.', description: 'Magnifies the screen to see details your central vision misses.' },
      { name: 'TalkBack', path: 'Settings → Accessibility → TalkBack → turn ON', description: 'Full screen reader — the phone speaks everything on screen.' },
      { name: 'Maximum Font Size', path: 'Settings → Accessibility → Font Size → slide to maximum', description: 'Largest possible text.' },
      { name: 'Maximum Display Size', path: 'Settings → Accessibility → Display Size → maximum', description: 'Everything on screen as large as possible.' },
      { name: 'Color Inversion', path: 'Settings → Accessibility → Color Inversion → turn ON', description: 'May help with contrast for some types of macular degeneration.' },
      { name: 'Select to Speak', path: 'Settings → Accessibility → Select to Speak → turn ON', description: 'Tap text to hear it read aloud — easier than TalkBack to learn.' },
    ], tip: 'Select to Speak is a gentler alternative to TalkBack — you tap what you want read instead of having everything spoken.',
  },
  {
    conditionSlug: 'macular-degeneration', deviceSlug: 'ipad', intro: 'The iPad\'s larger screen combined with zoom makes it one of the best devices for macular degeneration.', settings: [
      { name: 'Zoom', path: 'Settings → Accessibility → Zoom → turn ON', description: 'Magnify the large iPad screen even further.' },
      { name: 'VoiceOver', path: 'Settings → Accessibility → VoiceOver → turn ON', description: 'Complete screen reader for audio navigation.' },
      { name: 'Maximum Text Size', path: 'Settings → Accessibility → Display & Text Size → Larger Text → maximum', description: 'Combined with iPad\'s screen size, text becomes very large.' },
      { name: 'Color Filters', path: 'Settings → Accessibility → Display & Text Size → Color Filters', description: 'Adjust colors for your specific vision needs.' },
      { name: 'Speak Screen', path: 'Settings → Accessibility → Spoken Content → Speak Screen → ON', description: 'Have the iPad read entire pages to you.' },
    ], tip: 'Many people with macular degeneration find the iPad (especially iPad Pro) to be their most usable device due to the large screen.',
  },
  { conditionSlug: 'macular-degeneration', deviceSlug: 'windows', intro: 'Windows provides powerful magnification and screen reading tools for central vision loss.', settings: [
    { name: 'Magnifier', path: 'Windows + Plus to open. Windows + Plus/Minus to zoom in/out.', description: 'Built-in magnifying glass that follows your cursor.' },
    { name: 'Narrator', path: 'Settings → Accessibility → Narrator → turn ON', description: 'Full screen reader that describes everything on screen.' },
    { name: 'High Contrast', path: 'Settings → Accessibility → Contrast Themes → select a theme', description: 'High contrast colors improve visibility.' },
    { name: 'Text Size', path: 'Settings → Accessibility → Text Size → increase to 200%+', description: 'Makes all Windows text much larger.' },
  ], tip: 'The Magnifier in "Lens" mode creates a movable magnifying window you can position over whatever you\'re reading.', },
  { conditionSlug: 'macular-degeneration', deviceSlug: 'mac', intro: 'macOS includes smooth zoom and VoiceOver for people with macular degeneration.', settings: [
    { name: 'Zoom', path: 'System Settings → Accessibility → Zoom → turn ON. Ctrl + scroll to zoom.', description: 'Smooth screen magnification that follows your cursor.' },
    { name: 'VoiceOver', path: 'System Settings → Accessibility → VoiceOver → turn ON (or Cmd + F5)', description: 'Complete screen reader for voice navigation.' },
    { name: 'Hover Text', path: 'System Settings → Accessibility → Zoom → Hover Text → ON', description: 'Hold Cmd to see enlarged text preview under cursor.' },
    { name: 'Increase Contrast', path: 'System Settings → Accessibility → Display → Increase Contrast → ON', description: 'Makes edges and text more visible.' },
  ], tip: 'Cmd + F5 is the quickest way to toggle VoiceOver on and off as needed.', },
  { conditionSlug: 'macular-degeneration', deviceSlug: 'chromebook', intro: 'Chromebook offers magnification and text-to-speech for macular degeneration.', settings: [
    { name: 'Full-Screen Magnifier', path: 'Settings → Accessibility → Display → Full-Screen Magnifier → ON', description: 'Magnifies the entire screen.' },
    { name: 'ChromeVox', path: 'Settings → Accessibility → Text-to-Speech → ChromeVox → ON', description: 'Built-in screen reader for Chromebooks.' },
    { name: 'Select-to-Speak', path: 'Settings → Accessibility → Text-to-Speech → Select-to-Speak → ON', description: 'Select text to hear it read aloud.' },
    { name: 'High Contrast', path: 'Settings → Accessibility → Display → High Contrast Mode → ON', description: 'Inverts colors for better visibility.' },
  ], tip: 'Use Ctrl + Alt + Brightness keys to quickly zoom in and out.', },

  // COLORBLINDNESS
  {
    conditionSlug: 'colorblindness', deviceSlug: 'iphone', intro: 'The iPhone can adjust screen colors for different types of color vision deficiency.', settings: [
      { name: 'Color Filters', path: 'Settings → Accessibility → Display & Text Size → Color Filters → turn ON → select your type (Red/Green for Protanopia/Deuteranopia, Blue/Yellow for Tritanopia)', description: 'Shifts screen colors to ones you can distinguish.' },
      { name: 'Color Filter Intensity', path: 'Adjust the intensity slider to find the most comfortable level', description: 'Fine-tune how much the colors shift.' },
      { name: 'Accessibility Shortcut', path: 'Settings → Accessibility → Accessibility Shortcut → Color Filters', description: 'Triple-click the side button to quickly toggle color filters on/off.' },
    ], tip: 'Triple-click shortcut lets you quickly toggle color filters — useful when showing your screen to others.', },
  {
    conditionSlug: 'colorblindness', deviceSlug: 'android', intro: 'Android phones can adjust display colors for different types of color blindness.', settings: [
      { name: 'Color Correction', path: 'Settings → Accessibility → Color Correction → turn ON → select your type (Deuteranomaly, Protanomaly, or Tritanomaly)', description: 'Adjusts screen colors for your specific type of color vision.' },
      { name: 'Color Inversion', path: 'Settings → Accessibility → Color Inversion → try turning ON', description: 'Some people find inverted colors easier to distinguish.' },
      { name: 'Extra Dim', path: 'Settings → Accessibility → Extra Dim → turn ON if bright colors are problematic', description: 'Reduces overall screen brightness beyond the normal minimum.' },
    ], tip: 'Android\'s color correction works system-wide, including in photos and videos.', },
  { conditionSlug: 'colorblindness', deviceSlug: 'ipad', intro: 'The iPad offers the same color filter options as iPhone.', settings: [
    { name: 'Color Filters', path: 'Settings → Accessibility → Display & Text Size → Color Filters → ON → select type', description: 'Adjusts colors for your type of color vision.' },
    { name: 'Intensity Slider', path: 'Adjust the filter intensity to your preference', description: 'Fine-tune the color shift.' },
    { name: 'Accessibility Shortcut', path: 'Settings → Accessibility → Accessibility Shortcut → Color Filters', description: 'Triple-click home/side button to toggle.' },
  ], tip: 'Color Filters on iPad work with all content including videos and photos.', },
  { conditionSlug: 'colorblindness', deviceSlug: 'windows', intro: 'Windows 11 includes color filters for different types of color blindness.', settings: [
    { name: 'Color Filters', path: 'Settings → Accessibility → Color Filters → turn ON → select Red-green or Blue-yellow', description: 'Adjusts all screen colors for your type of color vision.' },
    { name: 'Keyboard Shortcut', path: 'Windows + Ctrl + C to toggle color filters on/off', description: 'Quick toggle without going to settings.' },
  ], tip: 'Press Windows + Ctrl + C to instantly toggle color filters — great for switching between normal and adjusted views.', },
  { conditionSlug: 'colorblindness', deviceSlug: 'mac', intro: 'macOS includes color filter options for color vision deficiency.', settings: [
    { name: 'Color Filters', path: 'System Settings → Accessibility → Display → Color Filters → turn ON → select filter type', description: 'Adjusts screen colors for your type of color blindness.' },
    { name: 'Filter Intensity', path: 'Adjust the intensity slider', description: 'Control how strong the color adjustment is.' },
  ], tip: 'macOS color filters work with all content on your screen.', },
  { conditionSlug: 'colorblindness', deviceSlug: 'chromebook', intro: 'Chromebook offers a color correction feature for color blindness.', settings: [
    { name: 'Color Correction', path: 'Settings → Accessibility → Display → Color Correction → turn ON → select filter type', description: 'Adjusts screen colors for your color vision type.' },
    { name: 'High Contrast Mode', path: 'Settings → Accessibility → Display → High Contrast Mode', description: 'Can help distinguish elements that rely on color.' },
  ], tip: 'Chrome browser extensions like "Color Enhancer" can provide additional color correction for web content.', },
]

// ── Lookup Functions ─────────────────────────────────────────────────────────

export function getCondition(slug: string): Condition | undefined {
  return CONDITIONS.find(c => c.slug === slug)
}

export function getAccessDevice(slug: string): AccessDevice | undefined {
  return ACCESS_DEVICES.find(d => d.slug === slug)
}

export function getGuide(conditionSlug: string, deviceSlug: string): AccessGuide | undefined {
  return GUIDES.find(g => g.conditionSlug === conditionSlug && g.deviceSlug === deviceSlug)
}

export function getGuidesForCondition(conditionSlug: string): AccessGuide[] {
  return GUIDES.filter(g => g.conditionSlug === conditionSlug)
}

export function getGuidesForDevice(deviceSlug: string): AccessGuide[] {
  return GUIDES.filter(g => g.deviceSlug === deviceSlug)
}

export function getAllConditionDevicePairs(): { condition: string; device: string }[] {
  return GUIDES.map(g => ({ condition: g.conditionSlug, device: g.deviceSlug }))
}
