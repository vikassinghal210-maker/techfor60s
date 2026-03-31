// ── How-To Device Matrix Data ─────────────────────────────────────────────────
// Structured data for 50 tasks across 18 devices (~500+ valid combinations)

import {
  EXPANSION_DEVICES,
  EXPANSION_TASKS,
  EXPANSION_CATEGORY_LABELS,
  EXPANSION_CATEGORY_ICONS,
  EXPANSION_INSTRUCTIONS,
} from './howto-expansion'

export interface Device {
  slug: string
  name: string
  brand: string
  os: string
  icon: string
}

export interface Task {
  slug: string
  name: string
  category: 'basics' | 'communication' | 'camera' | 'settings' | 'safety' | 'apps' | 'troubleshooting' | 'smart-home'
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: string
}

export interface Instruction {
  steps: string[]
  tip: string
}

// ── Devices ───────────────────────────────────────────────────────────────────

export const DEVICES: Device[] = [
  { slug: 'iphone-16', name: 'iPhone 16 / 16 Plus', brand: 'Apple', os: 'iOS', icon: '📱' },
  { slug: 'iphone-15', name: 'iPhone 15 / 14', brand: 'Apple', os: 'iOS', icon: '📱' },
  { slug: 'iphone-se', name: 'iPhone SE', brand: 'Apple', os: 'iOS', icon: '📱' },
  { slug: 'ipad', name: 'iPad / iPad Air', brand: 'Apple', os: 'iPadOS', icon: '📲' },
  { slug: 'samsung-galaxy-s25', name: 'Samsung Galaxy S25 / S24', brand: 'Samsung', os: 'Android', icon: '📱' },
  { slug: 'samsung-galaxy-a', name: 'Samsung Galaxy A16 / A36', brand: 'Samsung', os: 'Android', icon: '📱' },
  { slug: 'google-pixel', name: 'Google Pixel 9 / 8', brand: 'Google', os: 'Android', icon: '📱' },
  { slug: 'motorola', name: 'Motorola Moto G / Edge', brand: 'Motorola', os: 'Android', icon: '📱' },
  { slug: 'android-generic', name: 'Android Phone (Any)', brand: 'Various', os: 'Android', icon: '🤖' },
  { slug: 'iphone-generic', name: 'iPhone (Any)', brand: 'Apple', os: 'iOS', icon: '🍎' },
  { slug: 'windows-pc', name: 'Windows Computer', brand: 'Microsoft', os: 'Windows', icon: '💻' },
  { slug: 'mac', name: 'Mac / MacBook', brand: 'Apple', os: 'macOS', icon: '🖥️' },
  ...EXPANSION_DEVICES,
]

// ── Tasks ─────────────────────────────────────────────────────────────────────

export const TASKS: Task[] = [
  { slug: 'take-screenshot', name: 'Take a Screenshot', category: 'basics', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'change-font-size', name: 'Change the Font Size', category: 'settings', difficulty: 'easy', estimatedTime: '2 min' },
  { slug: 'turn-off-notifications', name: 'Turn Off Notifications', category: 'settings', difficulty: 'easy', estimatedTime: '2 min' },
  { slug: 'connect-bluetooth', name: 'Connect a Bluetooth Device', category: 'settings', difficulty: 'medium', estimatedTime: '3 min' },
  { slug: 'connect-wifi', name: 'Connect to WiFi', category: 'basics', difficulty: 'easy', estimatedTime: '2 min' },
  { slug: 'set-alarm', name: 'Set an Alarm', category: 'basics', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'send-text-message', name: 'Send a Text Message', category: 'communication', difficulty: 'easy', estimatedTime: '2 min' },
  { slug: 'make-video-call', name: 'Make a Video Call', category: 'communication', difficulty: 'medium', estimatedTime: '3 min' },
  { slug: 'take-photo', name: 'Take a Photo', category: 'camera', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'record-video', name: 'Record a Video', category: 'camera', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'share-photo', name: 'Share a Photo', category: 'camera', difficulty: 'easy', estimatedTime: '2 min' },
  { slug: 'set-wallpaper', name: 'Set the Wallpaper', category: 'settings', difficulty: 'easy', estimatedTime: '2 min' },
  { slug: 'turn-on-flashlight', name: 'Turn On the Flashlight', category: 'basics', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'check-storage', name: 'Check Storage Space', category: 'settings', difficulty: 'easy', estimatedTime: '2 min' },
  { slug: 'update-software', name: 'Update the Software', category: 'settings', difficulty: 'medium', estimatedTime: '5 min' },
  { slug: 'clear-cache', name: 'Clear the Cache', category: 'troubleshooting', difficulty: 'medium', estimatedTime: '3 min' },
  { slug: 'block-phone-number', name: 'Block a Phone Number', category: 'safety', difficulty: 'easy', estimatedTime: '2 min' },
  { slug: 'set-emergency-contacts', name: 'Set Emergency Contacts', category: 'safety', difficulty: 'medium', estimatedTime: '3 min' },
  { slug: 'turn-on-do-not-disturb', name: 'Turn On Do Not Disturb', category: 'settings', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'change-ringtone', name: 'Change the Ringtone', category: 'settings', difficulty: 'easy', estimatedTime: '2 min' },
  { slug: 'download-app', name: 'Download an App', category: 'apps', difficulty: 'easy', estimatedTime: '2 min' },
  { slug: 'delete-app', name: 'Delete an App', category: 'apps', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'force-restart', name: 'Force Restart the Device', category: 'troubleshooting', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'enable-dark-mode', name: 'Enable Dark Mode', category: 'settings', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'adjust-brightness', name: 'Adjust the Brightness', category: 'settings', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'set-up-voicemail', name: 'Set Up Voicemail', category: 'communication', difficulty: 'medium', estimatedTime: '5 min' },
  { slug: 'use-voice-assistant', name: 'Use the Voice Assistant', category: 'basics', difficulty: 'easy', estimatedTime: '2 min' },
  { slug: 'turn-off-location', name: 'Turn Off Location Services', category: 'safety', difficulty: 'easy', estimatedTime: '2 min' },
  { slug: 'enable-two-factor-auth', name: 'Enable Two-Factor Authentication', category: 'safety', difficulty: 'hard', estimatedTime: '5 min' },
  { slug: 'check-battery-health', name: 'Check Battery Health', category: 'settings', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'transfer-photos-to-computer', name: 'Transfer Photos to a Computer', category: 'camera', difficulty: 'medium', estimatedTime: '5 min' },
  { slug: 'set-up-email', name: 'Set Up Email', category: 'communication', difficulty: 'medium', estimatedTime: '5 min' },
  { slug: 'change-password', name: 'Change Your Password', category: 'safety', difficulty: 'medium', estimatedTime: '3 min' },
  { slug: 'turn-on-wifi-calling', name: 'Turn On WiFi Calling', category: 'communication', difficulty: 'medium', estimatedTime: '2 min' },
  { slug: 'pair-airpods-earbuds', name: 'Pair AirPods or Earbuds', category: 'basics', difficulty: 'medium', estimatedTime: '3 min' },
  { slug: 'scan-qr-code', name: 'Scan a QR Code', category: 'basics', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'use-magnifier', name: 'Use the Magnifier', category: 'basics', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'set-medication-reminder', name: 'Set a Medication Reminder', category: 'basics', difficulty: 'medium', estimatedTime: '3 min' },
  { slug: 'enable-emergency-sos', name: 'Enable Emergency SOS', category: 'safety', difficulty: 'medium', estimatedTime: '3 min' },
  { slug: 'back-up-phone', name: 'Back Up Your Phone', category: 'safety', difficulty: 'medium', estimatedTime: '5 min' },
  ...EXPANSION_TASKS,
]

// ── Category Labels ───────────────────────────────────────────────────────────

export const CATEGORY_LABELS: Record<string, string> = {
  basics: 'Basics',
  communication: 'Communication',
  camera: 'Camera & Photos',
  settings: 'Settings',
  safety: 'Safety & Security',
  apps: 'Apps',
  troubleshooting: 'Troubleshooting',
  ...EXPANSION_CATEGORY_LABELS,
}

export const CATEGORY_ICONS: Record<string, string> = {
  basics: '📌',
  communication: '💬',
  camera: '📷',
  settings: '⚙️',
  safety: '🔒',
  apps: '📦',
  troubleshooting: '🔧',
  ...EXPANSION_CATEGORY_ICONS,
}

// ── Helper: device group shortcuts ────────────────────────────────────────────

const iOS_FACE_ID = ['iphone-16', 'iphone-15'] // Face ID iPhones
const iOS_ALL = ['iphone-16', 'iphone-15', 'iphone-se', 'iphone-generic']
const iPAD = ['ipad']
const SAMSUNG = ['samsung-galaxy-s25', 'samsung-galaxy-a']
const ANDROID_ALL = ['samsung-galaxy-s25', 'samsung-galaxy-a', 'google-pixel', 'motorola', 'android-generic']
const PHONES = [...iOS_ALL, ...ANDROID_ALL, ...iPAD]
const COMPUTERS = ['windows-pc', 'mac']
const ALL_DEVICES = [...PHONES, ...COMPUTERS]

// ── Instructions Database ─────────────────────────────────────────────────────

const INSTRUCTIONS: Record<string, Record<string, Instruction>> = {
  // ─── 1. take-screenshot ────────────────────────────────────────────────
  'take-screenshot': {
    'iphone-16': {
      steps: [
        'Press the side button and the volume up button at the same time.',
        'Release both buttons quickly.',
        'A small preview appears in the bottom-left corner of the screen.',
        'Tap the preview to edit the screenshot, or swipe it away to save it.',
        'Find your screenshot in the Photos app under Albums > Screenshots.',
      ],
      tip: 'You can also ask Siri: "Take a screenshot" and it will do it for you.',
    },
    'iphone-15': {
      steps: [
        'Press the side button and the volume up button at the same time.',
        'Release both buttons quickly.',
        'A small preview appears in the bottom-left corner.',
        'Tap the preview to crop or mark it up, or swipe it away.',
        'Open the Photos app and go to Albums > Screenshots to find it.',
      ],
      tip: 'If you press too long, you may accidentally activate Siri or the power-off screen. Press quickly.',
    },
    'iphone-se': {
      steps: [
        'Press the Home button and the side button at the same time.',
        'Release both buttons quickly.',
        'You will see a flash on the screen and hear a shutter sound.',
        'A preview appears in the bottom-left corner. Tap it to edit or swipe away.',
        'Find the screenshot in Photos > Albums > Screenshots.',
      ],
      tip: 'Make sure you press both buttons at exactly the same time, otherwise you may lock the screen.',
    },
    'ipad': {
      steps: [
        'If your iPad has a Home button: press the Home button and the top button together.',
        'If your iPad has no Home button: press the top button and a volume button together.',
        'Release both buttons quickly.',
        'A preview appears in the corner. Tap to edit or swipe to save.',
        'Find your screenshot in Photos > Albums > Screenshots.',
      ],
      tip: 'On iPad, you can also swipe from the bottom-left corner with an Apple Pencil to take a screenshot.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Press the side button and the volume down button at the same time.',
        'Release both buttons quickly.',
        'The screen will flash to confirm the screenshot was taken.',
        'A toolbar appears at the bottom with options to edit, share, or scroll capture.',
        'Find the screenshot in the Gallery app under Albums > Screenshots.',
      ],
      tip: 'You can also swipe the edge of your palm across the screen to take a screenshot. Enable this in Settings > Advanced features > Palm swipe to capture.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Press the side button and the volume down button at the same time.',
        'Release both buttons quickly.',
        'The screen will flash to confirm.',
        'A small toolbar appears at the bottom. Tap the pencil icon to edit.',
        'Find your screenshot in Gallery > Albums > Screenshots.',
      ],
      tip: 'If the buttons feel hard to press together, try the palm swipe method: swipe the edge of your hand across the screen.',
    },
    'google-pixel': {
      steps: [
        'Press the power button and the volume down button at the same time.',
        'Release both buttons quickly after the screen flashes.',
        'A preview appears at the bottom of the screen.',
        'Tap the preview to edit, share, or delete.',
        'Find the screenshot in Google Photos or the Files app.',
      ],
      tip: 'On Pixel phones, you can also say "Hey Google, take a screenshot" to do it hands-free.',
    },
    'motorola': {
      steps: [
        'Press the power button and the volume down button at the same time.',
        'Hold for about one second, then release.',
        'The screen flashes to confirm the screenshot.',
        'A notification appears. Tap it to edit or share.',
        'Find the screenshot in the Photos app or Gallery.',
      ],
      tip: 'Some Motorola phones let you take a screenshot with three fingers. Swipe down on the screen with three fingers at once.',
    },
    'android-generic': {
      steps: [
        'Press the power button and the volume down button at the same time.',
        'Hold for about one second, then release.',
        'The screen should flash or show a brief animation.',
        'Look for a notification or preview at the bottom of the screen.',
        'Find the screenshot in your Gallery or Photos app under Screenshots.',
      ],
      tip: 'If the button method does not work, try pulling down the notification shade and looking for a Screenshot button in the quick tiles.',
    },
    'iphone-generic': {
      steps: [
        'If your iPhone has Face ID: press the side button and volume up button together.',
        'If your iPhone has a Home button: press the Home button and side button together.',
        'Release both buttons quickly.',
        'A preview appears in the bottom-left corner.',
        'Tap the preview to edit, or swipe it away to save to Photos.',
      ],
      tip: 'Not sure which iPhone you have? If there is a round button on the front, you have a Home button model.',
    },
    'windows-pc': {
      steps: [
        'Press the Windows key and the Print Screen key at the same time.',
        'The screen dims briefly to confirm the screenshot.',
        'The image is saved automatically to your Pictures > Screenshots folder.',
        'To capture just one window, press Alt + Print Screen instead.',
        'Open the Screenshots folder in File Explorer to find your image.',
      ],
      tip: 'You can also press Windows + Shift + S to open the Snipping Tool, which lets you select exactly what part of the screen to capture.',
    },
    'mac': {
      steps: [
        'Press Command + Shift + 3 to capture the entire screen.',
        'A thumbnail preview appears in the bottom-right corner.',
        'Click the thumbnail to edit, or wait for it to save automatically.',
        'The screenshot is saved to your Desktop by default.',
        'To capture just part of the screen, press Command + Shift + 4 and drag to select an area.',
      ],
      tip: 'Press Command + Shift + 5 to open the full screenshot toolbar with more options, including screen recording.',
    },
  },

  // ─── 2. change-font-size ───────────────────────────────────────────────
  'change-font-size': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap "Display & Brightness".',
        'Tap "Text Size".',
        'Drag the slider to the right to make text bigger.',
        'Go back and tap "Accessibility" > "Display & Text Size" for even larger text options.',
      ],
      tip: 'Turn on "Bold Text" in Display & Brightness to make all text easier to read.',
    },
    'iphone-15': {
      steps: [
        'Open the Settings app.',
        'Tap "Display & Brightness".',
        'Tap "Text Size".',
        'Move the slider to the right for larger text.',
        'For extra-large text, go to Settings > Accessibility > Display & Text Size > Larger Text.',
      ],
      tip: 'Enable "Bold Text" for thicker, more readable letters.',
    },
    'iphone-se': {
      steps: [
        'Open the Settings app.',
        'Tap "Display & Brightness".',
        'Tap "Text Size".',
        'Drag the slider to the right for bigger text.',
        'For even larger sizes, go to Settings > Accessibility > Display & Text Size > Larger Text.',
      ],
      tip: 'The iPhone SE has a smaller screen, so increasing font size makes a big difference in readability.',
    },
    'ipad': {
      steps: [
        'Open the Settings app.',
        'Tap "Display & Brightness".',
        'Tap "Text Size".',
        'Move the slider to the right for bigger text.',
        'For the largest sizes, go to Settings > Accessibility > Display & Text Size > Larger Text.',
      ],
      tip: 'On iPad, you can also pinch to zoom in most apps for a quick size boost.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap "Display".',
        'Tap "Font size and style".',
        'Drag the slider to the right to increase the font size.',
        'You can also turn on "Bold font" for easier reading.',
      ],
      tip: 'Use "Screen zoom" in Display settings to make everything on screen larger, not just text.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open the Settings app.',
        'Tap "Display".',
        'Tap "Font size and style".',
        'Move the slider to the right for bigger text.',
        'Toggle on "Bold font" if you want thicker letters.',
      ],
      tip: 'If text is still too small, also try increasing "Screen zoom" in the Display settings.',
    },
    'google-pixel': {
      steps: [
        'Open the Settings app.',
        'Tap "Display".',
        'Tap "Font size".',
        'Move the slider to the right to make text bigger.',
        'Preview the change in the sample text at the top of the screen.',
      ],
      tip: 'Pixel phones also have a "Display size" option that makes everything larger, including icons.',
    },
    'motorola': {
      steps: [
        'Open the Settings app.',
        'Tap "Display".',
        'Tap "Font size".',
        'Drag the slider to the right for larger text.',
        'The preview at the top shows you how text will look.',
      ],
      tip: 'Also check "Display size" to enlarge icons and buttons along with the text.',
    },
    'android-generic': {
      steps: [
        'Open the Settings app.',
        'Tap "Display" (or "Display & Brightness").',
        'Look for "Font size" or "Text size".',
        'Drag the slider to the right to increase the size.',
        'Look for a separate "Display size" or "Screen zoom" option to make everything bigger.',
      ],
      tip: 'The exact menu names vary by phone brand, but the font size setting is always in the Display section.',
    },
    'iphone-generic': {
      steps: [
        'Open the Settings app.',
        'Tap "Display & Brightness".',
        'Tap "Text Size".',
        'Drag the slider to the right for bigger text.',
        'For extra-large text, go to Settings > Accessibility > Display & Text Size > Larger Text.',
      ],
      tip: 'Turn on "Bold Text" in Display & Brightness for thicker, more readable text.',
    },
    'windows-pc': {
      steps: [
        'Click the Start button and open Settings.',
        'Click "System".',
        'Click "Display".',
        'Find "Scale" and choose a larger percentage (such as 125% or 150%).',
        'The change applies immediately. Everything on screen will be bigger.',
      ],
      tip: 'In most web browsers, you can also press Ctrl and + (plus) to zoom in on a web page.',
    },
    'mac': {
      steps: [
        'Click the Apple menu in the top-left corner.',
        'Choose "System Settings".',
        'Click "Displays".',
        'Select a "Larger Text" resolution option.',
        'The change takes effect right away.',
      ],
      tip: 'In most Mac apps, press Command and + (plus) to zoom in. This works in Safari, Mail, and many others.',
    },
  },

  // ─── 3. turn-off-notifications ─────────────────────────────────────────
  'turn-off-notifications': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap "Notifications".',
        'Scroll down and tap the app you want to silence.',
        'Turn off "Allow Notifications" at the top.',
        'Repeat for any other apps you want to silence.',
      ],
      tip: 'To silence all notifications at once, turn on Do Not Disturb from the Control Center.',
    },
    'iphone-15': {
      steps: [
        'Open the Settings app.',
        'Tap "Notifications".',
        'Tap the name of the app you want to turn off.',
        'Switch off "Allow Notifications".',
        'Go back and repeat for other noisy apps.',
      ],
      tip: 'You can also long-press a notification when it appears and tap "Turn Off" to quickly silence that app.',
    },
    'iphone-se': {
      steps: [
        'Open the Settings app.',
        'Tap "Notifications".',
        'Find and tap the app you want to silence.',
        'Turn off "Allow Notifications".',
        'Press the back arrow and repeat for other apps.',
      ],
      tip: 'Swipe left on a notification in your Notification Center and tap "Manage" for quick options.',
    },
    'ipad': {
      steps: [
        'Open the Settings app.',
        'Tap "Notifications".',
        'Tap the app you want to silence.',
        'Switch off "Allow Notifications".',
        'Repeat for other apps as needed.',
      ],
      tip: 'On iPad, notifications appear at the top of the screen. Swipe down from the top-left corner to see them all.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap "Notifications".',
        'Tap "App notifications".',
        'Find the app and turn off its toggle.',
        'Repeat for other apps you want to silence.',
      ],
      tip: 'Long-press any notification that appears and tap "Turn off notifications" for a quick shortcut.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open the Settings app.',
        'Tap "Notifications".',
        'Tap "App notifications".',
        'Tap the toggle next to any app to turn off its notifications.',
        'Repeat for all the apps you want to silence.',
      ],
      tip: 'When a notification pops up, you can swipe it to the left and tap the gear icon to go straight to that app\'s notification settings.',
    },
    'google-pixel': {
      steps: [
        'Open the Settings app.',
        'Tap "Notifications".',
        'Tap "App notifications".',
        'Find the app and turn off its toggle.',
        'Repeat for any other noisy apps.',
      ],
      tip: 'Pixel phones show a "Manage" button on notifications. Tap it to quickly turn off that app\'s alerts.',
    },
    'motorola': {
      steps: [
        'Open the Settings app.',
        'Tap "Notifications" (or "Apps & notifications").',
        'Tap "App notifications".',
        'Find the app and switch off its notification toggle.',
        'Repeat for other apps.',
      ],
      tip: 'Pull down the notification shade, long-press a notification, and tap "Turn off" for a quick way to silence an app.',
    },
    'android-generic': {
      steps: [
        'Open the Settings app.',
        'Tap "Notifications" or "Apps & notifications".',
        'Tap "App notifications".',
        'Find the app and turn off its toggle.',
        'Repeat for each app you want to silence.',
      ],
      tip: 'Most Android phones let you long-press a notification to quickly manage that app\'s alerts.',
    },
    'iphone-generic': {
      steps: [
        'Open the Settings app.',
        'Tap "Notifications".',
        'Tap the app you want to silence.',
        'Turn off "Allow Notifications".',
        'Go back and repeat for other apps.',
      ],
      tip: 'You can turn on Do Not Disturb in Control Center to temporarily silence all notifications.',
    },
    'windows-pc': {
      steps: [
        'Click the Start button and open Settings.',
        'Click "System".',
        'Click "Notifications".',
        'Turn off "Notifications" at the top to silence everything.',
        'Or scroll down and turn off notifications for specific apps.',
      ],
      tip: 'Click the bell icon in the bottom-right corner of your taskbar to quickly toggle Focus Assist, which silences notifications.',
    },
    'mac': {
      steps: [
        'Click the Apple menu and choose "System Settings".',
        'Click "Notifications".',
        'Click on an app in the list.',
        'Turn off "Allow Notifications".',
        'Repeat for other apps.',
      ],
      tip: 'Hold the Option key and click the date/time in the menu bar to quickly turn on Do Not Disturb.',
    },
  },

  // ─── 4. connect-bluetooth ──────────────────────────────────────────────
  'connect-bluetooth': {
    'iphone-16': {
      steps: [
        'Make sure the Bluetooth device you want to connect is turned on and in pairing mode.',
        'Open the Settings app on your iPhone.',
        'Tap "Bluetooth".',
        'Make sure Bluetooth is turned on (the toggle should be green).',
        'Wait for your device to appear under "Other Devices".',
        'Tap the name of the device to connect.',
      ],
      tip: 'If the device does not appear, try turning it off and on again, or move it closer to your iPhone.',
    },
    'iphone-15': {
      steps: [
        'Put your Bluetooth device into pairing mode (check its instructions).',
        'Open Settings on your iPhone.',
        'Tap "Bluetooth".',
        'Make sure the Bluetooth toggle is on.',
        'Your device should appear under "Other Devices". Tap it.',
        'Wait a moment for the connection to complete.',
      ],
      tip: 'Most Bluetooth devices have a button you hold down for a few seconds to enter pairing mode.',
    },
    'iphone-se': {
      steps: [
        'Turn on your Bluetooth device and put it in pairing mode.',
        'Open Settings.',
        'Tap "Bluetooth".',
        'Make sure Bluetooth is on.',
        'Tap the device name when it appears in the list.',
        'You will see "Connected" next to the device name when successful.',
      ],
      tip: 'If you have trouble, restart your iPhone and try again.',
    },
    'ipad': {
      steps: [
        'Put your Bluetooth device into pairing mode.',
        'Open Settings on your iPad.',
        'Tap "Bluetooth".',
        'Toggle Bluetooth on if it is not already.',
        'Tap the device name when it appears under "Other Devices".',
        'Wait for "Connected" to appear next to the name.',
      ],
      tip: 'iPads can connect to Bluetooth keyboards, speakers, headphones, and many other accessories.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Put your Bluetooth device into pairing mode.',
        'Open Settings on your Samsung phone.',
        'Tap "Connections".',
        'Tap "Bluetooth" and make sure it is turned on.',
        'Your device will appear under "Available devices". Tap it.',
        'Wait for the connection to complete.',
      ],
      tip: 'You can also swipe down from the top of the screen and long-press the Bluetooth icon to quickly access settings.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Turn on your Bluetooth device and put it in pairing mode.',
        'Open Settings.',
        'Tap "Connections".',
        'Tap "Bluetooth" and toggle it on.',
        'Tap the device name when it appears.',
        'The status will change to "Connected".',
      ],
      tip: 'If you do not see the device, tap "Scan" to search again.',
    },
    'google-pixel': {
      steps: [
        'Put your Bluetooth device into pairing mode.',
        'Open Settings.',
        'Tap "Connected devices".',
        'Tap "Pair new device".',
        'Wait for your device to appear in the list.',
        'Tap the device name to connect.',
      ],
      tip: 'Google Pixel phones have a "Fast Pair" feature that shows a pop-up when compatible devices are nearby.',
    },
    'motorola': {
      steps: [
        'Put your Bluetooth device into pairing mode.',
        'Open Settings.',
        'Tap "Connected devices".',
        'Tap "Pair new device" (or "Bluetooth").',
        'Tap the device name when it appears.',
        'Wait until you see "Connected".',
      ],
      tip: 'Keep the Bluetooth device within a few feet of your phone while pairing.',
    },
    'android-generic': {
      steps: [
        'Put your Bluetooth device into pairing mode.',
        'Open Settings on your phone.',
        'Tap "Bluetooth" or "Connected devices" (varies by phone).',
        'Turn on Bluetooth if it is not already on.',
        'Tap "Pair new device" or wait for the device to appear.',
        'Tap the device name to connect.',
      ],
      tip: 'If the device does not appear, make sure it is in pairing mode and within a few feet of your phone.',
    },
    'iphone-generic': {
      steps: [
        'Put your Bluetooth device into pairing mode.',
        'Open Settings.',
        'Tap "Bluetooth".',
        'Make sure Bluetooth is on.',
        'Tap the device name when it appears under "Other Devices".',
        'Wait for "Connected" to appear.',
      ],
      tip: 'If the device was previously connected to another phone, you may need to "forget" it on that phone first.',
    },
    'windows-pc': {
      steps: [
        'Put your Bluetooth device into pairing mode.',
        'Click the Start button and open Settings.',
        'Click "Bluetooth & devices".',
        'Make sure Bluetooth is turned on.',
        'Click "Add device" then choose "Bluetooth".',
        'Select your device from the list and click "Connect".',
      ],
      tip: 'Not all desktop computers have Bluetooth built in. You may need a USB Bluetooth adapter.',
    },
    'mac': {
      steps: [
        'Put your Bluetooth device into pairing mode.',
        'Click the Apple menu and choose "System Settings".',
        'Click "Bluetooth".',
        'Make sure Bluetooth is on.',
        'Your device will appear in the list. Click "Connect" next to it.',
        'Wait for the status to change to "Connected".',
      ],
      tip: 'Click the Bluetooth icon in the menu bar for quick access to your Bluetooth settings.',
    },
  },

  // ─── 5. connect-wifi ───────────────────────────────────────────────────
  'connect-wifi': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap "Wi-Fi".',
        'Make sure the Wi-Fi toggle is turned on (green).',
        'Tap the name of your WiFi network from the list.',
        'Type in the WiFi password and tap "Join".',
        'A checkmark will appear next to the network name when connected.',
      ],
      tip: 'The WiFi password is usually on a sticker on the bottom or back of your router.',
    },
    'iphone-15': {
      steps: [
        'Open the Settings app.',
        'Tap "Wi-Fi".',
        'Turn on Wi-Fi if it is off.',
        'Tap your network name.',
        'Enter the password and tap "Join".',
        'You will see a checkmark and the WiFi icon in the status bar.',
      ],
      tip: 'WiFi passwords are case-sensitive. Make sure you type capital and lowercase letters correctly.',
    },
    'iphone-se': {
      steps: [
        'Open the Settings app.',
        'Tap "Wi-Fi".',
        'Toggle Wi-Fi on.',
        'Tap your network name.',
        'Enter the WiFi password and tap "Join".',
      ],
      tip: 'If you cannot find your network, make sure your router is turned on and you are close enough to it.',
    },
    'ipad': {
      steps: [
        'Open the Settings app.',
        'Tap "Wi-Fi".',
        'Turn on Wi-Fi if needed.',
        'Tap your network name from the list.',
        'Type the password and tap "Join".',
        'A checkmark appears when connected.',
      ],
      tip: 'If your iPad is WiFi-only (no cellular), you need WiFi to use the internet.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap "Connections".',
        'Tap "Wi-Fi" and turn it on.',
        'Tap your network name from the list.',
        'Enter the password and tap "Connect".',
      ],
      tip: 'You can also swipe down from the top of the screen and long-press the WiFi icon to see available networks.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open the Settings app.',
        'Tap "Connections".',
        'Tap "Wi-Fi" and toggle it on.',
        'Tap your network name.',
        'Type the password and tap "Connect".',
      ],
      tip: 'If you see a lock icon next to a network name, it requires a password.',
    },
    'google-pixel': {
      steps: [
        'Open the Settings app.',
        'Tap "Network & internet".',
        'Tap "Internet".',
        'Tap your WiFi network name.',
        'Enter the password and tap "Connect".',
      ],
      tip: 'Pixel phones can share your WiFi password with nearby Pixel phones using Nearby Share.',
    },
    'motorola': {
      steps: [
        'Open the Settings app.',
        'Tap "Network & internet" (or "Wi-Fi").',
        'Tap "Internet" or "Wi-Fi".',
        'Tap your WiFi network name.',
        'Enter the password and tap "Connect".',
      ],
      tip: 'Make sure you are within range of your WiFi router. The closer you are, the stronger the signal.',
    },
    'android-generic': {
      steps: [
        'Open the Settings app.',
        'Tap "Wi-Fi" or "Network & internet".',
        'Turn on Wi-Fi if it is off.',
        'Tap your network name.',
        'Enter the password and tap "Connect".',
      ],
      tip: 'If your WiFi is slow, try moving closer to the router or restarting the router.',
    },
    'iphone-generic': {
      steps: [
        'Open the Settings app.',
        'Tap "Wi-Fi".',
        'Make sure Wi-Fi is on.',
        'Tap your network name.',
        'Type the password and tap "Join".',
      ],
      tip: 'If your WiFi keeps disconnecting, try forgetting the network and reconnecting.',
    },
    'windows-pc': {
      steps: [
        'Click the WiFi icon in the bottom-right corner of the taskbar.',
        'Click the arrow next to the WiFi icon to see available networks.',
        'Click your network name.',
        'Click "Connect".',
        'Enter the WiFi password and click "Next".',
        'You will see "Connected" under your network name.',
      ],
      tip: 'If you do not see the WiFi icon, your computer may not have a wireless adapter. Desktop computers often need a USB WiFi adapter.',
    },
    'mac': {
      steps: [
        'Click the WiFi icon in the top-right menu bar.',
        'Click your WiFi network name from the list.',
        'Type the password when asked.',
        'Click "Join".',
        'The WiFi icon will fill in to show you are connected.',
      ],
      tip: 'If the WiFi icon shows an exclamation mark, you are connected to the network but do not have internet access. Try restarting your router.',
    },
  },

  // ─── 6. set-alarm ──────────────────────────────────────────────────────
  'set-alarm': {
    'iphone-16': {
      steps: [
        'Open the Clock app.',
        'Tap the "Alarm" tab at the bottom.',
        'Tap the + button in the top-right corner.',
        'Scroll the hour and minute wheels to set your time.',
        'Choose which days to repeat (optional).',
        'Tap "Save" in the top-right corner.',
      ],
      tip: 'You can also say "Hey Siri, set an alarm for 7 AM" to do this hands-free.',
    },
    'iphone-15': {
      steps: [
        'Open the Clock app.',
        'Tap "Alarm" at the bottom.',
        'Tap the + button.',
        'Set the time using the scroll wheels.',
        'Choose repeat days if you want.',
        'Tap "Save".',
      ],
      tip: 'To change an existing alarm, tap "Edit" in the top-left corner, then tap the alarm you want to change.',
    },
    'iphone-se': {
      steps: [
        'Open the Clock app.',
        'Tap the "Alarm" tab.',
        'Tap the + button.',
        'Set your desired time.',
        'Tap "Save".',
      ],
      tip: 'Make sure your phone is not on Silent Mode if you want to hear the alarm. The switch on the side of the phone controls this.',
    },
    'ipad': {
      steps: [
        'Open the Clock app.',
        'Tap "Alarm".',
        'Tap the + button.',
        'Set the time.',
        'Choose a sound and repeat days if you like.',
        'Tap "Save".',
      ],
      tip: 'iPad alarms only work when the iPad is awake or in sleep mode. Make sure the iPad is charged.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Clock app.',
        'Tap the "Alarm" tab.',
        'Tap the + button to add a new alarm.',
        'Set the hour and minutes.',
        'Choose which days to repeat.',
        'Tap "Save".',
      ],
      tip: 'Samsung phones let you set a gradual alarm volume that starts quiet and gets louder.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open the Clock app.',
        'Tap "Alarm".',
        'Tap the + button.',
        'Set the time.',
        'Choose repeat days if needed.',
        'Tap "Save".',
      ],
      tip: 'You can also say "Hey Bixby, set an alarm for 8 AM" if Bixby is set up.',
    },
    'google-pixel': {
      steps: [
        'Open the Clock app.',
        'Tap the "Alarm" tab.',
        'Tap the + button.',
        'Set the time.',
        'Toggle on the days you want it to repeat.',
        'The alarm is saved automatically.',
      ],
      tip: 'Say "Hey Google, set an alarm for 7 AM" to set one quickly.',
    },
    'motorola': {
      steps: [
        'Open the Clock app.',
        'Tap "Alarm".',
        'Tap the + button.',
        'Set the time.',
        'Choose repeat days.',
        'Tap "OK" or "Save".',
      ],
      tip: 'Make sure your phone volume is turned up so you can hear the alarm.',
    },
    'android-generic': {
      steps: [
        'Open the Clock app.',
        'Tap "Alarm" or the alarm clock icon.',
        'Tap the + button to create a new alarm.',
        'Set the hour and minutes.',
        'Choose which days to repeat (optional).',
        'Tap "Save" or "OK".',
      ],
      tip: 'Check that Do Not Disturb mode allows alarms to still ring. Go to Settings > Sound > Do Not Disturb.',
    },
    'iphone-generic': {
      steps: [
        'Open the Clock app.',
        'Tap "Alarm" at the bottom.',
        'Tap the + button.',
        'Set the time.',
        'Tap "Save".',
      ],
      tip: 'You can say "Hey Siri, set an alarm for 7 AM" without even opening the app.',
    },
    'windows-pc': {
      steps: [
        'Click the Start button.',
        'Type "Clock" and open the Clock app.',
        'Click "Alarm" on the left side.',
        'Click the + button to add a new alarm.',
        'Set the time and click "Save".',
        'Keep your computer on for the alarm to ring.',
      ],
      tip: 'Windows alarms only work when your computer is awake, not in sleep mode.',
    },
    'mac': {
      steps: [
        'Open the Clock app (macOS Ventura or later).',
        'Click "Alarm".',
        'Click the + button.',
        'Set the time.',
        'Click "Save".',
      ],
      tip: 'If your Mac does not have the Clock app, you can ask Siri: "Set an alarm for 8 AM."',
    },
  },

  // ─── 7. send-text-message ──────────────────────────────────────────────
  'send-text-message': {
    'iphone-16': {
      steps: [
        'Open the Messages app (green icon with a white speech bubble).',
        'Tap the compose button (pencil icon) in the top-right corner.',
        'Type the person\'s name or phone number in the "To" field.',
        'Tap in the message area at the bottom.',
        'Type your message.',
        'Tap the blue send button (arrow pointing up).',
      ],
      tip: 'Blue bubbles mean the message is going to another iPhone user (iMessage). Green bubbles mean it is a regular text message.',
    },
    'iphone-15': {
      steps: [
        'Open the Messages app.',
        'Tap the compose button in the top-right.',
        'Enter the person\'s name or number.',
        'Type your message at the bottom.',
        'Tap the blue send arrow.',
      ],
      tip: 'To send a photo in a text, tap the + button next to the message box and choose "Photos".',
    },
    'iphone-se': {
      steps: [
        'Open the Messages app.',
        'Tap the pencil icon to start a new message.',
        'Type the name or phone number.',
        'Type your message.',
        'Tap the send button.',
      ],
      tip: 'If the keyboard is hard to use, try turning your phone sideways for a bigger keyboard.',
    },
    'ipad': {
      steps: [
        'Open the Messages app.',
        'Tap the compose button (pencil icon).',
        'Type the person\'s name, email, or phone number.',
        'Type your message.',
        'Tap the send button.',
      ],
      tip: 'iPad Messages works best with iMessage (other Apple users). For regular texting, you need an iPhone linked to your iPad.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Messages app (speech bubble icon).',
        'Tap the compose button (pencil or + icon).',
        'Type the person\'s name or phone number.',
        'Tap the text field at the bottom.',
        'Type your message.',
        'Tap the send button (arrow icon).',
      ],
      tip: 'Samsung Messages can also send photos and videos. Tap the paperclip or + icon to attach a file.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open the Messages app.',
        'Tap the compose button.',
        'Enter the person\'s name or number.',
        'Type your message.',
        'Tap send.',
      ],
      tip: 'If you use Google Messages, you can send texts from your computer too at messages.google.com.',
    },
    'google-pixel': {
      steps: [
        'Open the Messages app.',
        'Tap "Start chat" or the compose button.',
        'Enter the phone number or contact name.',
        'Type your message.',
        'Tap the send arrow.',
      ],
      tip: 'Google Messages supports RCS, which is like iMessage for Android. It works automatically with other Android users.',
    },
    'motorola': {
      steps: [
        'Open the Messages app.',
        'Tap the compose button (+ or pencil icon).',
        'Type the person\'s name or number.',
        'Write your message.',
        'Tap the send button.',
      ],
      tip: 'Make sure you have cell service (not just WiFi) to send regular text messages.',
    },
    'android-generic': {
      steps: [
        'Open the Messages app (usually has a chat bubble icon).',
        'Tap the compose or new message button.',
        'Type the phone number or select a contact.',
        'Write your message.',
        'Tap the send button.',
      ],
      tip: 'Most Android phones use Google Messages by default. You can also use it on your computer at messages.google.com.',
    },
    'iphone-generic': {
      steps: [
        'Open the Messages app.',
        'Tap the compose button (pencil icon).',
        'Enter the person\'s name or number.',
        'Type your message.',
        'Tap the blue send arrow.',
      ],
      tip: 'You can ask Siri to send a text: "Hey Siri, text [name] and say I will be there at 3."',
    },
  },

  // ─── 8. make-video-call ────────────────────────────────────────────────
  'make-video-call': {
    'iphone-16': {
      steps: [
        'Open the FaceTime app.',
        'Tap "New FaceTime" at the top.',
        'Type the person\'s name, phone number, or email.',
        'Tap the green "FaceTime" button to start a video call.',
        'Wait for the other person to answer.',
        'Tap the red button to end the call.',
      ],
      tip: 'FaceTime works with other Apple users. For Android or Windows friends, use Zoom, WhatsApp, or Google Meet instead.',
    },
    'iphone-15': {
      steps: [
        'Open the FaceTime app.',
        'Tap "New FaceTime".',
        'Enter the person\'s name or number.',
        'Tap the green FaceTime button.',
        'Wait for them to answer.',
        'Tap the red button when finished.',
      ],
      tip: 'Make sure you are on WiFi for the best video call quality.',
    },
    'iphone-se': {
      steps: [
        'Open the FaceTime app.',
        'Tap "New FaceTime".',
        'Enter the contact.',
        'Tap the green video call button.',
        'Wait for an answer.',
        'Tap red to hang up.',
      ],
      tip: 'The iPhone SE has a smaller screen. Prop it up on something so you do not have to hold it during the call.',
    },
    'ipad': {
      steps: [
        'Open the FaceTime app.',
        'Tap "New FaceTime".',
        'Type the person\'s name, email, or phone number.',
        'Tap the green "FaceTime" button.',
        'The iPad\'s larger screen is great for video calls.',
        'Tap the red button to end the call.',
      ],
      tip: 'Use a stand or prop up your iPad so the camera is at eye level for the most natural look.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Google Meet app (or install it from the Play Store).',
        'Tap "New meeting" or "Join with a code".',
        'To call a contact, open the Phone app and tap the video icon next to their name.',
        'Wait for them to accept.',
        'Tap the red phone button to end the call.',
      ],
      tip: 'Samsung phones also support video calls through WhatsApp, which is very popular and free.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Google Meet or WhatsApp.',
        'In WhatsApp: open a chat and tap the video camera icon at the top.',
        'In Google Meet: tap "New meeting" to create a call.',
        'Share the link with the person you want to call.',
        'Tap the red button to hang up.',
      ],
      tip: 'WhatsApp video calls work great on slower connections and use less data than other apps.',
    },
    'google-pixel': {
      steps: [
        'Open the Google Meet app.',
        'Tap "New meeting" to start a call.',
        'Share the meeting link with the person you want to call.',
        'Or open Google Duo/Meet from your contacts list.',
        'Wait for them to join.',
        'Tap the red button to end the call.',
      ],
      tip: 'Google Pixel phones have excellent front cameras that make video calls look clear.',
    },
    'motorola': {
      steps: [
        'Open Google Meet (pre-installed) or download WhatsApp.',
        'In Google Meet, tap "New meeting".',
        'Share the link or tap "Add others".',
        'Wait for the other person to join.',
        'Tap the red button to end the call.',
      ],
      tip: 'Make sure your camera and microphone permissions are turned on for the app.',
    },
    'android-generic': {
      steps: [
        'Open Google Meet, WhatsApp, or Zoom.',
        'Start a new call or meeting.',
        'Enter the person\'s name or share a meeting link.',
        'Wait for them to answer.',
        'Tap the red button to end the call.',
      ],
      tip: 'Google Meet is free and pre-installed on most Android phones. WhatsApp is another popular free option.',
    },
    'iphone-generic': {
      steps: [
        'Open FaceTime.',
        'Tap "New FaceTime".',
        'Enter the person\'s name or number.',
        'Tap the green FaceTime button.',
        'Wait for them to answer.',
        'Tap red to hang up.',
      ],
      tip: 'FaceTime only works with other Apple users. For others, use WhatsApp, Zoom, or Google Meet.',
    },
    'windows-pc': {
      steps: [
        'Open a web browser (like Chrome or Edge).',
        'Go to meet.google.com or zoom.us.',
        'Click "New meeting" or "Host a meeting".',
        'Allow access to your camera and microphone when asked.',
        'Share the meeting link with the person you want to call.',
        'Click the red hang-up button when finished.',
      ],
      tip: 'Make sure your webcam is not covered and your microphone is not muted before starting.',
    },
    'mac': {
      steps: [
        'Open the FaceTime app from the Dock or Applications folder.',
        'Click "New FaceTime".',
        'Enter the person\'s name, email, or phone number.',
        'Click the green FaceTime button.',
        'Wait for them to answer.',
        'Click the red button to end the call.',
      ],
      tip: 'You can also use FaceTime links to call people on Android or Windows through their web browser.',
    },
  },

  // ─── 9. take-photo ─────────────────────────────────────────────────────
  'take-photo': {
    'iphone-16': {
      steps: [
        'Open the Camera app (or swipe left from the lock screen).',
        'Make sure "Photo" mode is selected at the bottom.',
        'Point the camera at what you want to photograph.',
        'Tap the large white circle button to take the photo.',
        'The photo is saved automatically to the Photos app.',
      ],
      tip: 'Tap on the screen where you want the camera to focus. A yellow square will appear showing the focus point.',
    },
    'iphone-15': {
      steps: [
        'Open the Camera app.',
        'Make sure you are in "Photo" mode.',
        'Aim the camera at your subject.',
        'Tap the white shutter button.',
        'Your photo is saved to Photos automatically.',
      ],
      tip: 'Hold the phone steady with both hands for the sharpest photos.',
    },
    'iphone-se': {
      steps: [
        'Open the Camera app.',
        'Point the camera at your subject.',
        'Tap the white shutter button at the bottom.',
        'The photo saves to your Photos app.',
      ],
      tip: 'Clean the camera lens with a soft cloth for clearer pictures.',
    },
    'ipad': {
      steps: [
        'Open the Camera app.',
        'Make sure "Photo" is selected.',
        'Hold the iPad steady and point it at your subject.',
        'Tap the white shutter button.',
        'Find your photo in the Photos app.',
      ],
      tip: 'Hold the iPad with both hands to keep it steady. iPads are larger and harder to hold still than phones.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Camera app.',
        'Make sure "Photo" mode is selected at the bottom.',
        'Point the camera at your subject.',
        'Tap the large round shutter button.',
        'Your photo is saved to the Gallery app.',
      ],
      tip: 'Tap the 0.5x, 1x, or 2x buttons to zoom in or out before taking the photo.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open the Camera app.',
        'Make sure you are in Photo mode.',
        'Aim the camera.',
        'Tap the shutter button.',
        'Check the photo in the Gallery app.',
      ],
      tip: 'In low light, the camera may automatically switch to Night mode for brighter photos.',
    },
    'google-pixel': {
      steps: [
        'Open the Camera app.',
        'Make sure "Camera" (photo mode) is selected.',
        'Point the camera at what you want to capture.',
        'Tap the white shutter button.',
        'Find your photo in Google Photos.',
      ],
      tip: 'Pixel phones have excellent cameras. Use "Night Sight" mode in low light for the best results.',
    },
    'motorola': {
      steps: [
        'Open the Camera app.',
        'Point the camera at your subject.',
        'Tap the shutter button.',
        'The photo saves automatically.',
        'Open the Gallery or Photos app to see it.',
      ],
      tip: 'Double-twist your wrist to quickly open the camera, even when the phone is locked.',
    },
    'android-generic': {
      steps: [
        'Open the Camera app.',
        'Make sure you are in Photo mode.',
        'Point the camera at your subject.',
        'Tap the shutter button (large circle).',
        'Find your photo in the Gallery or Photos app.',
      ],
      tip: 'Most Android phones let you press the volume button to take a photo as well.',
    },
    'iphone-generic': {
      steps: [
        'Open the Camera app.',
        'Make sure "Photo" is selected.',
        'Aim the camera.',
        'Tap the white shutter button.',
        'Your photo saves to Photos automatically.',
      ],
      tip: 'Press the volume up button on the side of the phone to take a photo instead of tapping the screen.',
    },
    'windows-pc': {
      steps: [
        'Click the Start button.',
        'Type "Camera" and open the Camera app.',
        'Make sure "Photo" mode is selected (camera icon).',
        'Click the round shutter button.',
        'Find your photos in the Camera Roll folder inside Pictures.',
      ],
      tip: 'Your computer needs a webcam to take photos. Most laptops have one built in above the screen.',
    },
    'mac': {
      steps: [
        'Open the Photo Booth app from the Applications folder.',
        'You will see yourself on screen.',
        'Click the red camera button to take a photo.',
        'The photo appears at the bottom of the Photo Booth window.',
        'Right-click the photo to save it or share it.',
      ],
      tip: 'Photo Booth also has fun effects and filters you can try.',
    },
  },

  // ─── 10. record-video ──────────────────────────────────────────────────
  'record-video': {
    'iphone-16': {
      steps: [
        'Open the Camera app.',
        'Swipe to "Video" mode at the bottom.',
        'Point the camera at what you want to record.',
        'Tap the red record button to start.',
        'Tap the red button again to stop recording.',
        'Your video is saved to the Photos app.',
      ],
      tip: 'Hold your phone horizontally (sideways) for a wider, more cinematic video.',
    },
    'iphone-15': {
      steps: [
        'Open the Camera app.',
        'Swipe to "Video" mode.',
        'Aim the camera.',
        'Tap the red record button.',
        'Tap it again to stop.',
        'Find the video in Photos.',
      ],
      tip: 'Videos take up a lot of storage. Check your storage space if you record often.',
    },
    'iphone-se': {
      steps: [
        'Open the Camera app.',
        'Swipe to "Video".',
        'Tap the red button to start recording.',
        'Tap it again to stop.',
        'The video saves to Photos.',
      ],
      tip: 'You can also hold down the shutter button in Photo mode to quickly record a short video.',
    },
    'ipad': {
      steps: [
        'Open the Camera app.',
        'Select "Video" mode.',
        'Hold the iPad steady.',
        'Tap the red button to record.',
        'Tap again to stop.',
        'Find it in Photos.',
      ],
      tip: 'Use both hands or prop the iPad on a surface for a steady video.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Camera app.',
        'Tap "Video" at the bottom.',
        'Point the camera at your subject.',
        'Tap the red record button.',
        'Tap it again to stop recording.',
        'Find the video in your Gallery.',
      ],
      tip: 'Samsung phones can record in slow motion. Swipe through the modes to find "Slow motion".',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open the Camera app.',
        'Swipe to "Video" mode.',
        'Tap the red button to start.',
        'Tap again to stop.',
        'Check the Gallery app for your video.',
      ],
      tip: 'Switch to the front camera by tapping the rotate icon if you want to record yourself.',
    },
    'google-pixel': {
      steps: [
        'Open the Camera app.',
        'Swipe to "Video".',
        'Tap the record button.',
        'Tap again to stop.',
        'Find the video in Google Photos.',
      ],
      tip: 'Pixel phones have excellent video stabilization, so your videos look smooth even if your hand shakes.',
    },
    'motorola': {
      steps: [
        'Open the Camera app.',
        'Swipe to Video mode.',
        'Tap the red button to start recording.',
        'Tap it again to stop.',
        'The video is saved to your Gallery.',
      ],
      tip: 'Make sure you have enough storage space before recording long videos.',
    },
    'android-generic': {
      steps: [
        'Open the Camera app.',
        'Switch to Video mode (swipe or tap "Video").',
        'Tap the record button to start.',
        'Tap it again to stop.',
        'Find the video in your Gallery or Photos app.',
      ],
      tip: 'Turn your phone sideways for a wider video that looks better on TV screens.',
    },
    'iphone-generic': {
      steps: [
        'Open the Camera app.',
        'Swipe to "Video" mode.',
        'Tap the red button to record.',
        'Tap again to stop.',
        'Your video is saved in Photos.',
      ],
      tip: 'Hold the phone sideways (landscape) for wider videos.',
    },
    'windows-pc': {
      steps: [
        'Open the Camera app from the Start menu.',
        'Click the video camera icon to switch to video mode.',
        'Click the record button to start.',
        'Click it again to stop.',
        'Find videos in the Camera Roll folder inside Pictures.',
      ],
      tip: 'Make sure your webcam is not blocked or covered before recording.',
    },
    'mac': {
      steps: [
        'Open Photo Booth or QuickTime Player.',
        'In QuickTime, go to File > New Movie Recording.',
        'Click the red record button to start.',
        'Click it again to stop.',
        'Save the file when prompted.',
      ],
      tip: 'QuickTime Player gives you more control over video quality than Photo Booth.',
    },
  },

  // ─── 11. share-photo ───────────────────────────────────────────────────
  'share-photo': {
    'iphone-16': {
      steps: [
        'Open the Photos app.',
        'Tap the photo you want to share.',
        'Tap the share button (square with an arrow pointing up).',
        'Choose how to share: Messages, Mail, AirDrop, or another app.',
        'Follow the prompts to select the person and send.',
      ],
      tip: 'Use AirDrop to instantly share photos with nearby Apple devices without using data.',
    },
    'iphone-15': {
      steps: [
        'Open Photos.',
        'Tap the photo.',
        'Tap the share button.',
        'Pick a sharing method.',
        'Enter the person\'s name and send.',
      ],
      tip: 'To share multiple photos, tap "Select" in the top-right, choose your photos, then tap the share button.',
    },
    'iphone-se': {
      steps: [
        'Open Photos.',
        'Tap a photo.',
        'Tap the share button (square with arrow).',
        'Choose Messages, Mail, or another app.',
        'Send it.',
      ],
      tip: 'Sending many photos at once over text may take a while. WiFi is faster than cellular data.',
    },
    'ipad': {
      steps: [
        'Open the Photos app.',
        'Tap the photo.',
        'Tap the share button.',
        'Choose your sharing method.',
        'Enter the contact and send.',
      ],
      tip: 'AirDrop is the fastest way to send photos to another Apple device in the same room.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Gallery app.',
        'Tap the photo you want to share.',
        'Tap the "Share" button at the bottom.',
        'Choose how to share: Messages, WhatsApp, Email, or Nearby Share.',
        'Select the person and send.',
      ],
      tip: 'Use "Nearby Share" to send photos to other Android devices nearby without using data.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Gallery.',
        'Tap the photo.',
        'Tap "Share".',
        'Pick a sharing app.',
        'Send it.',
      ],
      tip: 'WhatsApp is a very popular way to share photos because it compresses them automatically.',
    },
    'google-pixel': {
      steps: [
        'Open Google Photos.',
        'Tap the photo.',
        'Tap the "Share" icon at the bottom.',
        'Choose Messages, Gmail, Nearby Share, or another app.',
        'Enter the contact and send.',
      ],
      tip: 'Google Photos lets you create shared albums so family can add and view photos together.',
    },
    'motorola': {
      steps: [
        'Open the Photos or Gallery app.',
        'Tap the photo.',
        'Tap the share icon.',
        'Pick a sharing method.',
        'Send it.',
      ],
      tip: 'If the photo file is too large to send by text, try sharing it through email or Google Photos instead.',
    },
    'android-generic': {
      steps: [
        'Open your Gallery or Google Photos app.',
        'Tap the photo.',
        'Tap the share button.',
        'Choose a sharing method.',
        'Enter the recipient and send.',
      ],
      tip: 'Most share menus show your recent contacts at the top for quick sharing.',
    },
    'iphone-generic': {
      steps: [
        'Open Photos.',
        'Tap the photo.',
        'Tap the share button.',
        'Choose how to share.',
        'Send it.',
      ],
      tip: 'You can share a photo by iMessage, email, AirDrop, or save it to a shared album.',
    },
    'windows-pc': {
      steps: [
        'Open File Explorer and navigate to your Pictures folder.',
        'Right-click the photo you want to share.',
        'Choose "Share".',
        'Pick an app or person to send it to.',
        'You can also open your email and attach the photo.',
      ],
      tip: 'You can also drag and drop a photo directly into an email to attach it.',
    },
    'mac': {
      steps: [
        'Open the Photos app.',
        'Click the photo.',
        'Click the share button (square with arrow) in the toolbar.',
        'Choose AirDrop, Mail, Messages, or another option.',
        'Follow the prompts to send.',
      ],
      tip: 'AirDrop lets you send photos instantly to iPhones and iPads in the same room.',
    },
  },

  // ─── 12. set-wallpaper ─────────────────────────────────────────────────
  'set-wallpaper': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap "Wallpaper".',
        'Tap "Add New Wallpaper".',
        'Choose a photo from your library or a built-in wallpaper.',
        'Adjust the position by pinching and dragging.',
        'Tap "Add" in the top-right, then "Set as Wallpaper Pair".',
      ],
      tip: 'You can set different wallpapers for your Lock Screen and Home Screen.',
    },
    'iphone-15': {
      steps: [
        'Open Settings.',
        'Tap "Wallpaper".',
        'Tap "Add New Wallpaper".',
        'Browse the options or choose a photo.',
        'Adjust the image as needed.',
        'Tap "Add" then "Set as Wallpaper Pair".',
      ],
      tip: 'Long-press on the Lock Screen to quickly customize your wallpaper without going to Settings.',
    },
    'iphone-se': {
      steps: [
        'Open Settings.',
        'Tap "Wallpaper".',
        'Tap "Add New Wallpaper".',
        'Pick a photo or a built-in design.',
        'Adjust and tap "Add".',
      ],
      tip: 'Choose a simple, uncluttered wallpaper so your app icons are easy to see.',
    },
    'ipad': {
      steps: [
        'Open Settings.',
        'Tap "Wallpaper".',
        'Tap "Add New Wallpaper".',
        'Choose a photo or design.',
        'Adjust the image.',
        'Tap "Add" then "Set as Wallpaper Pair".',
      ],
      tip: 'iPad wallpapers look best when you use a high-resolution image.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap "Wallpaper and style".',
        'Tap "Change wallpapers".',
        'Choose a built-in wallpaper or pick from your Gallery.',
        'Tap "Set" and choose Home screen, Lock screen, or both.',
      ],
      tip: 'Samsung offers animated wallpapers too. Look for "Live wallpapers" in the wallpaper gallery.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Settings.',
        'Tap "Wallpaper and style".',
        'Tap "Change wallpapers".',
        'Pick an image.',
        'Choose to set it on the Home screen, Lock screen, or both.',
      ],
      tip: 'Long-press on an empty spot on the Home screen and tap "Wallpaper" for a shortcut.',
    },
    'google-pixel': {
      steps: [
        'Long-press on an empty area of the Home screen.',
        'Tap "Wallpaper & style".',
        'Browse the categories or tap "My photos".',
        'Select an image.',
        'Tap the checkmark to set it.',
      ],
      tip: 'Pixel phones offer a "Daily wallpaper" feature that changes your wallpaper automatically.',
    },
    'motorola': {
      steps: [
        'Long-press on an empty area of the Home screen.',
        'Tap "Wallpapers".',
        'Choose from built-in options or your photos.',
        'Set it for the Home screen, Lock screen, or both.',
      ],
      tip: 'A darker wallpaper can help save battery on phones with OLED screens.',
    },
    'android-generic': {
      steps: [
        'Long-press on an empty area of the Home screen.',
        'Tap "Wallpaper" (or go to Settings > Wallpaper).',
        'Browse the options or choose from your photos.',
        'Set it on the Home screen, Lock screen, or both.',
      ],
      tip: 'Choose a photo of family or pets to personalize your phone.',
    },
    'iphone-generic': {
      steps: [
        'Open Settings.',
        'Tap "Wallpaper".',
        'Tap "Add New Wallpaper".',
        'Pick an image.',
        'Adjust and tap "Add".',
      ],
      tip: 'You can have multiple wallpapers and switch between them by long-pressing the Lock Screen.',
    },
    'windows-pc': {
      steps: [
        'Right-click on an empty area of the Desktop.',
        'Click "Personalize".',
        'Click "Background".',
        'Choose "Picture" and click "Browse photos".',
        'Select an image and click "Choose picture".',
      ],
      tip: 'You can set a slideshow to automatically rotate through multiple wallpapers.',
    },
    'mac': {
      steps: [
        'Click the Apple menu.',
        'Choose "System Settings".',
        'Click "Wallpaper".',
        'Choose a built-in wallpaper or click "Add Photo" to use your own.',
        'The wallpaper changes immediately.',
      ],
      tip: 'macOS offers "Dynamic Desktop" wallpapers that change from day to night automatically.',
    },
  },

  // ─── 13. turn-on-flashlight ────────────────────────────────────────────
  'turn-on-flashlight': {
    'iphone-16': {
      steps: [
        'From the Lock Screen or Home Screen, swipe down from the top-right corner.',
        'This opens the Control Center.',
        'Tap the flashlight icon (it looks like a small flashlight).',
        'The flashlight turns on immediately.',
        'Tap it again to turn it off.',
      ],
      tip: 'You can also say "Hey Siri, turn on the flashlight" to do it hands-free.',
    },
    'iphone-15': {
      steps: [
        'Swipe down from the top-right corner to open Control Center.',
        'Tap the flashlight icon.',
        'Tap again to turn it off.',
      ],
      tip: 'On the Lock Screen, you can also press and hold the flashlight icon in the bottom-left corner.',
    },
    'iphone-se': {
      steps: [
        'Swipe up from the bottom of the screen to open Control Center.',
        'Tap the flashlight icon.',
        'Tap it again to turn off.',
      ],
      tip: 'The flashlight uses the camera flash on the back of the phone.',
    },
    'ipad': {
      steps: [
        'Swipe down from the top-right corner to open Control Center.',
        'Tap the flashlight icon.',
        'Tap it again to turn it off.',
      ],
      tip: 'Not all iPads have a flashlight. Older models without a rear flash do not have this feature.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Swipe down from the top of the screen to open the notification shade.',
        'Swipe down again to see the full Quick Settings panel.',
        'Tap the "Flashlight" tile.',
        'Tap it again to turn it off.',
      ],
      tip: 'You can also say "Hey Bixby, turn on the flashlight" or "Hey Google, flashlight on."',
    },
    'samsung-galaxy-a': {
      steps: [
        'Swipe down from the top of the screen twice.',
        'Look for the Flashlight icon in the Quick Settings.',
        'Tap it to turn on.',
        'Tap again to turn off.',
      ],
      tip: 'If you do not see the Flashlight tile, tap the pencil icon to edit your Quick Settings and add it.',
    },
    'google-pixel': {
      steps: [
        'Swipe down from the top of the screen twice.',
        'Tap the "Flashlight" tile.',
        'Tap again to turn off.',
      ],
      tip: 'Say "Hey Google, turn on the flashlight" for hands-free control.',
    },
    'motorola': {
      steps: [
        'Swipe down from the top of the screen twice.',
        'Tap the Flashlight tile.',
        'Tap again to turn off.',
      ],
      tip: 'On many Motorola phones, you can shake the phone twice (chop gesture) to toggle the flashlight.',
    },
    'android-generic': {
      steps: [
        'Swipe down from the top of the screen.',
        'Swipe down again to see more Quick Settings tiles.',
        'Tap the "Flashlight" tile.',
        'Tap it again to turn it off.',
      ],
      tip: 'If the Flashlight tile is not visible, look for an edit button to add it to your Quick Settings.',
    },
    'iphone-generic': {
      steps: [
        'Open Control Center (swipe down from top-right on newer iPhones, swipe up from bottom on older ones).',
        'Tap the flashlight icon.',
        'Tap again to turn it off.',
      ],
      tip: 'Ask Siri to turn the flashlight on or off for a hands-free option.',
    },
  },

  // ─── 14. check-storage ─────────────────────────────────────────────────
  'check-storage': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap "General".',
        'Tap "iPhone Storage".',
        'Wait a moment for the storage information to load.',
        'You will see a colored bar showing how your storage is used.',
        'Scroll down to see which apps use the most space.',
      ],
      tip: 'Tap any app in the list to see options for offloading it (which frees space but keeps your data).',
    },
    'iphone-15': {
      steps: [
        'Open Settings.',
        'Tap "General".',
        'Tap "iPhone Storage".',
        'Wait for it to load.',
        'Review the storage breakdown.',
      ],
      tip: 'Photos and videos usually take up the most space. Consider using iCloud Photos to free up room.',
    },
    'iphone-se': {
      steps: [
        'Open Settings.',
        'Tap "General".',
        'Tap "iPhone Storage".',
        'See how much space is used and available.',
      ],
      tip: 'The iPhone SE often has less storage than other models. Check regularly to avoid running out.',
    },
    'ipad': {
      steps: [
        'Open Settings.',
        'Tap "General".',
        'Tap "iPad Storage".',
        'View the storage breakdown.',
        'Scroll down to see apps sorted by size.',
      ],
      tip: 'Downloaded movies and shows from streaming apps can take up a lot of space on iPad.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap "Battery and device care".',
        'Tap "Storage".',
        'View the breakdown of used and available space.',
        'Tap any category to see details.',
      ],
      tip: 'Samsung phones offer a "Clean now" option that removes unnecessary files automatically.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Settings.',
        'Tap "Battery and device care".',
        'Tap "Storage".',
        'See your storage usage.',
        'Tap categories to find what is using the most space.',
      ],
      tip: 'Delete old photos and videos you have already backed up to free the most space.',
    },
    'google-pixel': {
      steps: [
        'Open Settings.',
        'Tap "Storage".',
        'See the total and available storage.',
        'Tap categories like "Images" or "Apps" for details.',
      ],
      tip: 'Google Pixel users get free storage for photos in Google Photos (at slightly reduced quality).',
    },
    'motorola': {
      steps: [
        'Open Settings.',
        'Tap "Storage".',
        'View the breakdown.',
        'Tap categories to see what is using space.',
      ],
      tip: 'Some Motorola phones have an SD card slot. You can move photos and apps to the SD card.',
    },
    'android-generic': {
      steps: [
        'Open Settings.',
        'Tap "Storage" (or "Battery and device care" > "Storage").',
        'See how much space is used.',
        'Tap categories to learn more.',
      ],
      tip: 'If storage is nearly full, start by clearing old downloads, photos, and videos.',
    },
    'iphone-generic': {
      steps: [
        'Open Settings.',
        'Tap "General".',
        'Tap "iPhone Storage".',
        'Review the storage usage.',
      ],
      tip: 'Apple recommends keeping at least 1 GB of free space for your iPhone to run smoothly.',
    },
    'windows-pc': {
      steps: [
        'Click the Start button.',
        'Open Settings.',
        'Click "System".',
        'Click "Storage".',
        'See the breakdown of what is using disk space.',
        'Click "Temporary files" to clean up files you do not need.',
      ],
      tip: 'Turn on Storage Sense to have Windows automatically free up space by deleting temporary files.',
    },
    'mac': {
      steps: [
        'Click the Apple menu.',
        'Choose "About This Mac".',
        'Click "More Info" then "Storage Settings".',
        'View the colored bar showing storage usage.',
        'Click categories to see recommendations for freeing space.',
      ],
      tip: 'Enable "Optimize Mac Storage" in iCloud settings to automatically keep older files in the cloud.',
    },
  },

  // ─── 15. update-software ───────────────────────────────────────────────
  'update-software': {
    'iphone-16': {
      steps: [
        'Connect your iPhone to WiFi.',
        'Open the Settings app.',
        'Tap "General".',
        'Tap "Software Update".',
        'If an update is available, tap "Download and Install".',
        'Enter your passcode if asked.',
        'Wait for the update to finish. Your phone will restart.',
      ],
      tip: 'Plug in your charger before starting an update. Updates can drain the battery.',
    },
    'iphone-15': {
      steps: [
        'Make sure you are connected to WiFi.',
        'Open Settings.',
        'Tap "General".',
        'Tap "Software Update".',
        'Tap "Download and Install" if available.',
        'Wait for the update to complete.',
      ],
      tip: 'You can turn on "Automatic Updates" so your phone updates itself overnight.',
    },
    'iphone-se': {
      steps: [
        'Connect to WiFi and plug in your charger.',
        'Open Settings > General > Software Update.',
        'Tap "Download and Install".',
        'Enter your passcode.',
        'Wait for the restart.',
      ],
      tip: 'Updates improve security and fix bugs. Always keep your phone up to date.',
    },
    'ipad': {
      steps: [
        'Connect to WiFi.',
        'Open Settings > General > Software Update.',
        'Tap "Download and Install".',
        'Enter your passcode.',
        'Wait for the update to complete.',
      ],
      tip: 'Make sure your iPad has at least 50% battery or is plugged in before updating.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Connect to WiFi.',
        'Open the Settings app.',
        'Tap "Software update".',
        'Tap "Download and install".',
        'If an update is available, follow the on-screen instructions.',
        'Your phone will restart when the update is done.',
      ],
      tip: 'Samsung phones get security updates monthly. Check for updates regularly.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Connect to WiFi.',
        'Open Settings.',
        'Tap "Software update".',
        'Tap "Download and install".',
        'Follow the prompts.',
      ],
      tip: 'Software updates are free and improve your phone\'s performance and security.',
    },
    'google-pixel': {
      steps: [
        'Connect to WiFi.',
        'Open Settings.',
        'Tap "System".',
        'Tap "System update".',
        'Tap "Check for update".',
        'Download and install if one is available.',
      ],
      tip: 'Pixel phones are among the first to receive Android updates, usually on the first Monday of each month.',
    },
    'motorola': {
      steps: [
        'Connect to WiFi.',
        'Open Settings.',
        'Tap "System" (or "About phone").',
        'Tap "System updates" (or "Software update").',
        'Tap "Check for updates".',
        'Download and install if available.',
      ],
      tip: 'Motorola updates may arrive later than other brands. Be patient if one is not available yet.',
    },
    'android-generic': {
      steps: [
        'Connect to WiFi.',
        'Open Settings.',
        'Look for "System" or "Software update".',
        'Tap "System update" or "Check for updates".',
        'Download and install if available.',
      ],
      tip: 'Updates keep your phone secure. If no update is showing, your phone may already be up to date.',
    },
    'iphone-generic': {
      steps: [
        'Connect to WiFi.',
        'Open Settings > General > Software Update.',
        'Tap "Download and Install" if available.',
        'Enter your passcode.',
        'Wait for the update.',
      ],
      tip: 'Enable "Automatic Updates" in Software Update settings to stay up to date without thinking about it.',
    },
    'windows-pc': {
      steps: [
        'Click the Start button.',
        'Open Settings.',
        'Click "Windows Update".',
        'Click "Check for updates".',
        'If updates are found, click "Download & install".',
        'Restart your computer when prompted.',
      ],
      tip: 'Windows often installs updates when you shut down or restart. Let it finish. Do not turn off the power.',
    },
    'mac': {
      steps: [
        'Click the Apple menu.',
        'Choose "System Settings".',
        'Click "General" then "Software Update".',
        'If an update is available, click "Update Now".',
        'Enter your password and wait for the restart.',
      ],
      tip: 'Back up your Mac using Time Machine before major updates, just to be safe.',
    },
  },

  // ─── 16. clear-cache ───────────────────────────────────────────────────
  'clear-cache': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap "General".',
        'Tap "iPhone Storage".',
        'Tap the app whose cache you want to clear.',
        'Tap "Offload App" to remove the app but keep its data.',
        'Reinstall the app from the App Store for a fresh start.',
      ],
      tip: 'For Safari, go to Settings > Safari > Clear History and Website Data to clear the browser cache.',
    },
    'iphone-15': {
      steps: [
        'Open Settings > General > iPhone Storage.',
        'Tap an app to see its size.',
        'Tap "Offload App" to clear cached data.',
        'For Safari: Settings > Safari > Clear History and Website Data.',
      ],
      tip: 'iPhones do not have a one-tap "clear all cache" button, but offloading apps is the best approach.',
    },
    'iphone-se': {
      steps: [
        'Open Settings > General > iPhone Storage.',
        'Tap the app you want to clear.',
        'Tap "Offload App".',
        'Reinstall it from the App Store.',
      ],
      tip: 'Clearing the Safari cache can speed up web browsing noticeably.',
    },
    'ipad': {
      steps: [
        'Open Settings > General > iPad Storage.',
        'Tap an app.',
        'Tap "Offload App" to remove cached data.',
        'For Safari: Settings > Safari > Clear History and Website Data.',
      ],
      tip: 'Streaming apps like Netflix store a lot of cached data. Offloading them can free up significant space.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap "Apps".',
        'Tap the app whose cache you want to clear.',
        'Tap "Storage".',
        'Tap "Clear cache".',
      ],
      tip: 'Clearing the cache does not delete your personal data or logins. It just removes temporary files.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Settings.',
        'Tap "Apps".',
        'Tap the app.',
        'Tap "Storage".',
        'Tap "Clear cache".',
      ],
      tip: 'If an app is acting up, clearing its cache often fixes the problem.',
    },
    'google-pixel': {
      steps: [
        'Open Settings.',
        'Tap "Apps".',
        'Tap the app you want to clear.',
        'Tap "Storage & cache".',
        'Tap "Clear cache".',
      ],
      tip: 'Do not tap "Clear storage" unless you want to delete all the app\'s data including your settings.',
    },
    'motorola': {
      steps: [
        'Open Settings.',
        'Tap "Apps" (or "Apps & notifications").',
        'Tap the app.',
        'Tap "Storage".',
        'Tap "Clear cache".',
      ],
      tip: 'Clearing cache for social media apps like Facebook can free up hundreds of megabytes.',
    },
    'android-generic': {
      steps: [
        'Open Settings.',
        'Tap "Apps" or "Applications".',
        'Tap the app you want to clear.',
        'Tap "Storage".',
        'Tap "Clear cache".',
      ],
      tip: 'This is safe to do and will not delete your account or personal information.',
    },
    'iphone-generic': {
      steps: [
        'Open Settings > General > iPhone Storage.',
        'Tap the app.',
        'Tap "Offload App" to clear its cache.',
        'Reinstall from the App Store.',
      ],
      tip: 'For Safari: go to Settings > Safari > Clear History and Website Data.',
    },
    'windows-pc': {
      steps: [
        'Click the Start button.',
        'Type "Disk Cleanup" and open it.',
        'Select your main drive (usually C:).',
        'Check "Temporary files" and "Thumbnails".',
        'Click "OK" then "Delete Files".',
      ],
      tip: 'You can also go to Settings > System > Storage > Temporary files for a more modern way to clear cache.',
    },
    'mac': {
      steps: [
        'Open Finder.',
        'Click "Go" in the menu bar, then "Go to Folder".',
        'Type ~/Library/Caches and press Enter.',
        'Select cache folders and move them to the Trash.',
        'Empty the Trash.',
      ],
      tip: 'For Safari cache specifically, go to Safari > Settings > Privacy > Manage Website Data.',
    },
  },

  // ─── 17. block-phone-number ────────────────────────────────────────────
  'block-phone-number': {
    'iphone-16': {
      steps: [
        'Open the Phone app.',
        'Tap "Recents" at the bottom.',
        'Tap the "i" icon next to the number you want to block.',
        'Scroll down and tap "Block this Caller".',
        'Tap "Block Contact" to confirm.',
      ],
      tip: 'Blocked callers will go straight to voicemail. They will not know they are blocked.',
    },
    'iphone-15': {
      steps: [
        'Open the Phone app.',
        'Go to "Recents".',
        'Tap the "i" icon next to the number.',
        'Scroll down and tap "Block this Caller".',
        'Confirm by tapping "Block Contact".',
      ],
      tip: 'To see all your blocked numbers, go to Settings > Phone > Blocked Contacts.',
    },
    'iphone-se': {
      steps: [
        'Open the Phone app and go to Recents.',
        'Tap the "i" next to the caller.',
        'Tap "Block this Caller".',
        'Confirm.',
      ],
      tip: 'You can also block someone from the Messages app or FaceTime.',
    },
    'ipad': {
      steps: [
        'Open the FaceTime app.',
        'Find the caller in your recent calls.',
        'Tap the "i" icon.',
        'Tap "Block this Caller".',
        'Confirm.',
      ],
      tip: 'iPad blocking works for FaceTime and Messages, since iPads do not receive regular phone calls.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Phone app.',
        'Tap "Recents".',
        'Tap and hold the number you want to block.',
        'Tap "Block number".',
        'Confirm by tapping "Block".',
      ],
      tip: 'Samsung phones have a built-in spam filter. Go to Phone > three dots > Settings > Caller ID and spam protection.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open the Phone app.',
        'Go to Recents.',
        'Long-press the number.',
        'Tap "Block number".',
        'Confirm.',
      ],
      tip: 'You can unblock a number by going to Phone > Settings > Block numbers.',
    },
    'google-pixel': {
      steps: [
        'Open the Phone app.',
        'Tap "Recents".',
        'Tap the number, then tap "Block/report spam".',
        'Tap "Block" to confirm.',
      ],
      tip: 'Pixel phones automatically screen suspected spam calls. Look for "Suspected spam caller" labels.',
    },
    'motorola': {
      steps: [
        'Open the Phone app.',
        'Go to call history.',
        'Tap and hold the number.',
        'Tap "Block number".',
        'Confirm.',
      ],
      tip: 'Install the Google Phone app from the Play Store for better spam call filtering.',
    },
    'android-generic': {
      steps: [
        'Open the Phone app.',
        'Go to your recent calls.',
        'Tap and hold the number you want to block.',
        'Tap "Block" or "Block number".',
        'Confirm the action.',
      ],
      tip: 'The exact steps may vary slightly by phone brand, but blocking is always found in the Phone app.',
    },
    'iphone-generic': {
      steps: [
        'Open the Phone app.',
        'Go to Recents.',
        'Tap the "i" next to the number.',
        'Tap "Block this Caller".',
        'Confirm.',
      ],
      tip: 'Turn on "Silence Unknown Callers" in Settings > Phone to automatically silence calls from unknown numbers.',
    },
    'windows-pc': {
      steps: [
        'Open the Phone Link app (if connected to your phone).',
        'Find the number in recent calls.',
        'Right-click and choose "Block".',
        'For landline phones, contact your phone provider to block numbers.',
      ],
      tip: 'Most phone carriers offer free call blocking services. Check your carrier\'s website.',
    },
    'mac': {
      steps: [
        'Open the FaceTime app.',
        'Find the caller in your recent calls.',
        'Right-click (or Control-click) the number.',
        'Choose "Block this Caller".',
      ],
      tip: 'Blocking someone on your Mac also blocks them on your iPhone if both use the same Apple ID.',
    },
  },

  // ─── 18. set-emergency-contacts ────────────────────────────────────────
  'set-emergency-contacts': {
    'iphone-16': {
      steps: [
        'Open the Health app.',
        'Tap your profile picture in the top-right corner.',
        'Tap "Medical ID".',
        'Tap "Edit".',
        'Scroll down to "Emergency Contacts" and tap "Add Emergency Contact".',
        'Select a contact and choose their relationship to you.',
        'Tap "Done" to save.',
      ],
      tip: 'Emergency contacts can be reached even when your phone is locked, from the Emergency SOS screen.',
    },
    'iphone-15': {
      steps: [
        'Open the Health app.',
        'Tap your profile icon.',
        'Tap "Medical ID".',
        'Tap "Edit".',
        'Add emergency contacts.',
        'Tap "Done".',
      ],
      tip: 'Fill out your Medical ID with allergies and medications too. First responders can see this information.',
    },
    'iphone-se': {
      steps: [
        'Open the Health app.',
        'Tap your profile.',
        'Tap "Medical ID" > "Edit".',
        'Add emergency contacts.',
        'Tap "Done".',
      ],
      tip: 'Make sure "Show When Locked" is turned on so emergency contacts are visible from the lock screen.',
    },
    'ipad': {
      steps: [
        'Open the Health app (if available, or the Contacts app).',
        'In Contacts, tap your own name at the top.',
        'Tap "Edit" and add emergency contact information in the Notes field.',
        'For a full Medical ID, set it up on your iPhone and it syncs to iPad.',
      ],
      tip: 'iPad does not have a full Medical ID feature. Set it up on an iPhone and it syncs via iCloud.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap "Safety and emergency".',
        'Tap "Emergency contacts".',
        'Tap "Add member".',
        'Select the contacts you want to add.',
        'Tap "Done".',
      ],
      tip: 'Also set up "Emergency SOS" in the same menu so your phone can automatically contact them in an emergency.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Settings.',
        'Tap "Safety and emergency".',
        'Tap "Emergency contacts".',
        'Tap "Add member".',
        'Choose your contacts.',
      ],
      tip: 'Samsung phones can also share your location with emergency contacts when SOS is triggered.',
    },
    'google-pixel': {
      steps: [
        'Open the Settings app.',
        'Tap "Safety & emergency".',
        'Tap "Emergency contacts".',
        'Tap "Add contact".',
        'Select the person from your contacts.',
      ],
      tip: 'Pixel phones also have a "Car crash detection" feature that can automatically call emergency services.',
    },
    'motorola': {
      steps: [
        'Open Settings.',
        'Tap "Safety & emergency" (or "About phone" > "Emergency information").',
        'Tap "Emergency contacts".',
        'Add your contacts.',
      ],
      tip: 'Also fill in medical information like blood type and allergies.',
    },
    'android-generic': {
      steps: [
        'Open Settings.',
        'Search for "Emergency" in the search bar.',
        'Tap "Emergency contacts" or "Emergency information".',
        'Add your emergency contacts.',
      ],
      tip: 'The location of this setting varies by phone brand. Using the search bar in Settings is the fastest way to find it.',
    },
    'iphone-generic': {
      steps: [
        'Open the Health app.',
        'Tap your profile icon.',
        'Tap "Medical ID" > "Edit".',
        'Add emergency contacts.',
        'Tap "Done".',
      ],
      tip: 'Keep "Show When Locked" enabled so first responders can see your emergency contacts.',
    },
    'windows-pc': {
      steps: [
        'Open the Settings app.',
        'Click "Accounts".',
        'Click "Your info".',
        'There is no built-in emergency contacts feature on Windows.',
        'Create a text file called "Emergency Contacts" on your Desktop with your emergency info.',
      ],
      tip: 'Consider also carrying a physical card in your wallet with emergency contact information.',
    },
    'mac': {
      steps: [
        'Open the Contacts app.',
        'Click your own contact card.',
        'Click "Edit".',
        'Add emergency contacts with the "related name" field.',
        'This syncs to your iPhone\'s Medical ID if you have one.',
      ],
      tip: 'The Medical ID feature works best when set up directly on an iPhone.',
    },
  },

  // ─── 19. turn-on-do-not-disturb ────────────────────────────────────────
  'turn-on-do-not-disturb': {
    'iphone-16': {
      steps: [
        'Swipe down from the top-right corner to open Control Center.',
        'Tap the Focus button (it looks like a crescent moon).',
        'Tap "Do Not Disturb".',
        'Choose how long: 1 hour, until evening, or until you turn it off.',
      ],
      tip: 'You can let calls from your Favorites contacts come through even in Do Not Disturb mode.',
    },
    'iphone-15': {
      steps: [
        'Swipe down from the top-right corner.',
        'Tap the Focus (moon) icon.',
        'Tap "Do Not Disturb".',
        'Choose a duration.',
      ],
      tip: 'Set a schedule so Do Not Disturb turns on automatically at bedtime.',
    },
    'iphone-se': {
      steps: [
        'Swipe up from the bottom to open Control Center.',
        'Tap the moon icon.',
        'Do Not Disturb is now on.',
      ],
      tip: 'A moon icon appears in the status bar when Do Not Disturb is active.',
    },
    'ipad': {
      steps: [
        'Swipe down from the top-right corner.',
        'Tap the Focus (moon) icon.',
        'Tap "Do Not Disturb".',
      ],
      tip: 'Do Not Disturb on iPad silences notifications but still shows them on screen when you look.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Swipe down from the top of the screen twice.',
        'Tap "Do not disturb" in the Quick Settings.',
        'Tap it again to turn it off later.',
      ],
      tip: 'Long-press the Do Not Disturb tile to set exceptions for alarm sounds and favorite contacts.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Swipe down from the top twice.',
        'Tap "Do not disturb".',
        'It turns on immediately.',
      ],
      tip: 'You can schedule Do Not Disturb to turn on and off automatically at certain times.',
    },
    'google-pixel': {
      steps: [
        'Swipe down from the top twice.',
        'Tap "Do Not Disturb".',
        'It is now active.',
      ],
      tip: 'Pixel phones let you set Do Not Disturb to allow alarms and important notifications through.',
    },
    'motorola': {
      steps: [
        'Swipe down from the top twice.',
        'Tap the "Do Not Disturb" tile.',
        'Tap again when you want to turn it off.',
      ],
      tip: 'Check that alarms are still allowed. Go to Settings > Sound > Do Not Disturb to configure exceptions.',
    },
    'android-generic': {
      steps: [
        'Swipe down from the top of the screen twice.',
        'Look for "Do Not Disturb" in the Quick Settings tiles.',
        'Tap it to turn on.',
        'Tap again to turn off.',
      ],
      tip: 'Make sure your alarms are set as exceptions so they still wake you up.',
    },
    'iphone-generic': {
      steps: [
        'Open Control Center.',
        'Tap the moon (Focus) icon.',
        'Tap "Do Not Disturb".',
      ],
      tip: 'Repeated calls from the same person within 3 minutes will still come through, in case of emergencies.',
    },
    'windows-pc': {
      steps: [
        'Click the bell icon in the bottom-right corner of the taskbar.',
        'Click "Focus" (or "Focus assist" on older versions).',
        'Choose "Priority only" or "Alarms only".',
      ],
      tip: 'Windows Focus mode can also be scheduled to turn on automatically during certain hours.',
    },
    'mac': {
      steps: [
        'Click the Control Center icon in the top-right menu bar.',
        'Click "Focus".',
        'Click "Do Not Disturb".',
      ],
      tip: 'Hold the Option key and click the date/time in the menu bar as a quick shortcut.',
    },
  },

  // ─── 20. change-ringtone ───────────────────────────────────────────────
  'change-ringtone': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap "Sounds & Haptics".',
        'Tap "Ringtone".',
        'Browse the list of available ringtones.',
        'Tap any ringtone to preview it.',
        'The selected ringtone is set automatically when you tap it.',
      ],
      tip: 'You can buy more ringtones from the iTunes Store, or set a custom ringtone for specific contacts.',
    },
    'iphone-15': {
      steps: [
        'Open Settings.',
        'Tap "Sounds & Haptics".',
        'Tap "Ringtone".',
        'Tap a ringtone to preview and select it.',
      ],
      tip: 'To set a unique ringtone for a specific person, open their contact card and tap "Ringtone".',
    },
    'iphone-se': {
      steps: [
        'Open Settings.',
        'Tap "Sounds & Haptics" (or "Sounds").',
        'Tap "Ringtone".',
        'Choose a ringtone.',
      ],
      tip: 'Make sure the "Ringer and Alerts" volume slider is turned up so you can hear it.',
    },
    'ipad': {
      steps: [
        'Open Settings.',
        'Tap "Sounds".',
        'Tap "Ringtone" (this changes the FaceTime ring sound).',
        'Choose a tone.',
      ],
      tip: 'iPads do not receive phone calls directly, but this changes the FaceTime call sound.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap "Sounds and vibration".',
        'Tap "Ringtone".',
        'Browse and tap a ringtone to preview it.',
        'Tap "Save" or the back arrow to confirm.',
      ],
      tip: 'Samsung lets you use any MP3 file as a ringtone. Tap "+" to add a custom sound.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Settings.',
        'Tap "Sounds and vibration".',
        'Tap "Ringtone".',
        'Pick a ringtone.',
        'Tap "Save".',
      ],
      tip: 'You can set different ringtones for different contacts in the Contacts app.',
    },
    'google-pixel': {
      steps: [
        'Open Settings.',
        'Tap "Sound & vibration".',
        'Tap "Phone ringtone".',
        'Choose a ringtone.',
        'Tap "OK".',
      ],
      tip: 'Pixel phones come with a nice selection of ringtones. "The Big Adventure" is a popular choice.',
    },
    'motorola': {
      steps: [
        'Open Settings.',
        'Tap "Sound" (or "Sound & vibration").',
        'Tap "Phone ringtone".',
        'Choose a ringtone.',
        'Tap "OK" to save.',
      ],
      tip: 'You can download free ringtone apps from the Google Play Store for more options.',
    },
    'android-generic': {
      steps: [
        'Open Settings.',
        'Tap "Sound" or "Sound & vibration".',
        'Tap "Ringtone" or "Phone ringtone".',
        'Select a ringtone.',
        'Tap "OK" or "Save".',
      ],
      tip: 'Turn the volume up to preview ringtones properly while choosing.',
    },
    'iphone-generic': {
      steps: [
        'Open Settings.',
        'Tap "Sounds & Haptics".',
        'Tap "Ringtone".',
        'Tap a ringtone to select it.',
      ],
      tip: 'The selected ringtone plays a preview immediately when you tap it.',
    },
  },

  // ─── 21. download-app ──────────────────────────────────────────────────
  'download-app': {
    'iphone-16': {
      steps: [
        'Open the App Store (blue icon with a white "A").',
        'Tap the "Search" tab at the bottom.',
        'Type the name of the app you want.',
        'Tap the app in the search results.',
        'Tap "Get" (or the price) to download.',
        'Confirm with Face ID, Touch ID, or your Apple ID password.',
      ],
      tip: 'Free apps show "Get" instead of a price. Tap it and confirm to download.',
    },
    'iphone-15': {
      steps: [
        'Open the App Store.',
        'Tap "Search" at the bottom.',
        'Type the app name.',
        'Tap the app.',
        'Tap "Get" and confirm.',
      ],
      tip: 'Be careful of apps with similar names. Check the developer name and reviews before downloading.',
    },
    'iphone-se': {
      steps: [
        'Open the App Store.',
        'Tap "Search".',
        'Type the app name.',
        'Tap the app in results.',
        'Tap "Get" and use Touch ID or your password.',
      ],
      tip: 'After downloading, the app icon appears on your Home Screen.',
    },
    'ipad': {
      steps: [
        'Open the App Store.',
        'Tap "Search".',
        'Type the app name.',
        'Tap the app.',
        'Tap "Get" to download.',
      ],
      tip: 'Some apps are "iPhone only" and may not look great on the iPad\'s larger screen.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Google Play Store (colorful triangle icon).',
        'Tap the search bar at the top.',
        'Type the app name.',
        'Tap the app in the results.',
        'Tap "Install".',
        'The app downloads and installs automatically.',
      ],
      tip: 'Look for the green "Verified" badge on apps to ensure they are safe.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open the Google Play Store.',
        'Search for the app.',
        'Tap the app.',
        'Tap "Install".',
        'Wait for it to download.',
      ],
      tip: 'Samsung phones also have the Galaxy Store for Samsung-exclusive apps.',
    },
    'google-pixel': {
      steps: [
        'Open the Google Play Store.',
        'Tap the search bar.',
        'Type the app name.',
        'Tap the app.',
        'Tap "Install".',
      ],
      tip: 'Google Play Protect scans all apps for safety. You will see a shield icon confirming protection.',
    },
    'motorola': {
      steps: [
        'Open the Google Play Store.',
        'Search for the app.',
        'Tap the app in results.',
        'Tap "Install".',
        'Find the app on your Home Screen or in the app drawer.',
      ],
      tip: 'Free apps say "Install." If you see a price, the app costs money.',
    },
    'android-generic': {
      steps: [
        'Open the Google Play Store.',
        'Tap the search bar.',
        'Type the app name and search.',
        'Tap the app.',
        'Tap "Install".',
      ],
      tip: 'Only download apps from the Google Play Store to keep your phone safe.',
    },
    'iphone-generic': {
      steps: [
        'Open the App Store.',
        'Tap "Search".',
        'Type the app name.',
        'Tap the app.',
        'Tap "Get" and confirm.',
      ],
      tip: 'Only download apps from the official App Store. Apple reviews every app for safety.',
    },
    'windows-pc': {
      steps: [
        'Click the Start button.',
        'Open the Microsoft Store.',
        'Type the app name in the search bar.',
        'Click the app in the results.',
        'Click "Get" or "Install".',
        'The app downloads and installs automatically.',
      ],
      tip: 'You can also download programs from websites, but the Microsoft Store is the safest option.',
    },
    'mac': {
      steps: [
        'Open the App Store from the Dock.',
        'Click the search bar.',
        'Type the app name.',
        'Click the app.',
        'Click "Get" then "Install".',
        'Sign in with your Apple ID if asked.',
      ],
      tip: 'Mac App Store apps are reviewed by Apple, making them the safest option.',
    },
  },

  // ─── 22. delete-app ────────────────────────────────────────────────────
  'delete-app': {
    'iphone-16': {
      steps: [
        'Find the app on your Home Screen.',
        'Press and hold the app icon until a menu appears.',
        'Tap "Remove App".',
        'Tap "Delete App".',
        'Tap "Delete" to confirm.',
      ],
      tip: 'Deleting an app removes it and its data. You can re-download it from the App Store anytime.',
    },
    'iphone-15': {
      steps: [
        'Long-press the app icon.',
        'Tap "Remove App".',
        'Tap "Delete App".',
        'Confirm by tapping "Delete".',
      ],
      tip: 'Some built-in Apple apps cannot be deleted, but you can hide them from your Home Screen.',
    },
    'iphone-se': {
      steps: [
        'Press and hold the app icon.',
        'Tap "Remove App".',
        'Tap "Delete App".',
        'Confirm.',
      ],
      tip: 'If the icons start wiggling, tap the minus (-) icon on the app to delete it.',
    },
    'ipad': {
      steps: [
        'Long-press the app icon.',
        'Tap "Remove App".',
        'Tap "Delete App".',
        'Tap "Delete".',
      ],
      tip: 'You can also delete apps from Settings > General > iPad Storage.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Find the app on your Home Screen or in the app drawer.',
        'Press and hold the app icon.',
        'Tap "Uninstall".',
        'Tap "OK" to confirm.',
      ],
      tip: 'Some pre-installed Samsung apps cannot be deleted, but you can "Disable" them.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Long-press the app icon.',
        'Tap "Uninstall".',
        'Tap "OK".',
      ],
      tip: 'You can also uninstall from Settings > Apps. Tap the app, then "Uninstall".',
    },
    'google-pixel': {
      steps: [
        'Long-press the app icon.',
        'Drag it to "Uninstall" at the top of the screen.',
        'Or tap "App info" then "Uninstall".',
        'Confirm.',
      ],
      tip: 'Pixel phones let you "Archive" apps too, which saves your data but frees up space.',
    },
    'motorola': {
      steps: [
        'Long-press the app icon.',
        'Tap "Uninstall" or drag to "Uninstall".',
        'Confirm.',
      ],
      tip: 'If you do not see "Uninstall," the app is a system app and can only be disabled.',
    },
    'android-generic': {
      steps: [
        'Long-press the app icon.',
        'Tap "Uninstall" (or drag to "Uninstall" at the top).',
        'Confirm by tapping "OK".',
      ],
      tip: 'You can always re-download deleted apps from the Google Play Store.',
    },
    'iphone-generic': {
      steps: [
        'Long-press the app icon.',
        'Tap "Remove App".',
        'Tap "Delete App".',
        'Confirm.',
      ],
      tip: 'Purchased apps can be re-downloaded for free from the App Store.',
    },
    'windows-pc': {
      steps: [
        'Click the Start button.',
        'Open Settings.',
        'Click "Apps".',
        'Click "Installed apps".',
        'Find the app, click the three dots next to it.',
        'Click "Uninstall" and confirm.',
      ],
      tip: 'Some Windows system apps cannot be uninstalled, but you can uninstall most third-party programs.',
    },
    'mac': {
      steps: [
        'Open Finder.',
        'Go to the Applications folder.',
        'Find the app you want to delete.',
        'Drag it to the Trash.',
        'Empty the Trash to fully remove it.',
      ],
      tip: 'Apps from the App Store can also be deleted by long-pressing them in Launchpad.',
    },
  },

  // ─── 23. force-restart ─────────────────────────────────────────────────
  'force-restart': {
    'iphone-16': {
      steps: [
        'Quickly press and release the volume up button.',
        'Quickly press and release the volume down button.',
        'Press and hold the side button until the Apple logo appears.',
        'Release the side button.',
        'Wait for the phone to restart fully.',
      ],
      tip: 'A force restart does not erase any data. It is safe to do when your phone is frozen.',
    },
    'iphone-15': {
      steps: [
        'Press and release volume up quickly.',
        'Press and release volume down quickly.',
        'Hold the side button until you see the Apple logo.',
        'Release and wait.',
      ],
      tip: 'This works even if the screen is completely frozen or black.',
    },
    'iphone-se': {
      steps: [
        'Press and release volume up quickly.',
        'Press and release volume down quickly.',
        'Hold the side button (or top button on older SE) until the Apple logo appears.',
        'Release and wait.',
      ],
      tip: 'If your iPhone SE has a Home button, the steps are the same as above for newer SE models.',
    },
    'ipad': {
      steps: [
        'If your iPad has no Home button: press and release volume up, then volume down, then hold the top button.',
        'If your iPad has a Home button: hold both the Home button and top button together until the Apple logo appears.',
        'Release when you see the logo.',
        'Wait for it to restart.',
      ],
      tip: 'Force restarting fixes most frozen or unresponsive iPad issues.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Press and hold the side button and volume down button at the same time.',
        'Keep holding for about 10 seconds.',
        'The screen will go black and the Samsung logo will appear.',
        'Release the buttons and wait for it to restart.',
      ],
      tip: 'If the phone is completely frozen, this is the only way to restart it.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Hold the side button and volume down button together.',
        'Keep holding for about 10 seconds.',
        'Wait for the Samsung logo.',
        'Release and let it restart.',
      ],
      tip: 'Your data is safe. A force restart does not delete anything.',
    },
    'google-pixel': {
      steps: [
        'Press and hold the power button for about 30 seconds.',
        'The phone will vibrate and restart.',
        'If that does not work, hold the power button and volume up button together for 10 seconds.',
        'Wait for the Google logo to appear.',
      ],
      tip: 'Pixel phones sometimes need a longer button hold than other phones.',
    },
    'motorola': {
      steps: [
        'Press and hold the power button and volume down button together.',
        'Hold for about 10-15 seconds.',
        'The phone will restart.',
        'Release when you see the Motorola logo.',
      ],
      tip: 'If the phone still will not restart, let the battery drain completely, then charge and try again.',
    },
    'android-generic': {
      steps: [
        'Press and hold the power button and volume down button at the same time.',
        'Hold for 10-15 seconds.',
        'Wait for the phone to vibrate or show the manufacturer logo.',
        'Release and let it restart.',
      ],
      tip: 'This method works on most Android phones. If it does not work, check your phone\'s manual.',
    },
    'iphone-generic': {
      steps: [
        'Press and release volume up.',
        'Press and release volume down.',
        'Hold the side button until the Apple logo appears.',
        'Release and wait for restart.',
      ],
      tip: 'This process is the same for iPhone 8 and later. Older models use different button combinations.',
    },
    'windows-pc': {
      steps: [
        'If the computer is frozen, press and hold the power button for about 10 seconds.',
        'The computer will shut off.',
        'Wait a few seconds.',
        'Press the power button again to turn it back on.',
      ],
      tip: 'Only use the power button method when the computer is completely frozen and nothing else works.',
    },
    'mac': {
      steps: [
        'Press and hold the power button (or Touch ID button) for about 10 seconds.',
        'The screen will go black.',
        'Wait a few seconds.',
        'Press the power button again to turn the Mac back on.',
      ],
      tip: 'On newer MacBooks, the power button is the Touch ID button in the top-right corner of the keyboard.',
    },
  },

  // ─── 24. enable-dark-mode ──────────────────────────────────────────────
  'enable-dark-mode': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap "Display & Brightness".',
        'Under Appearance, tap "Dark".',
        'The screen will immediately switch to dark colors.',
      ],
      tip: 'Set it to "Automatic" to switch between light and dark based on the time of day.',
    },
    'iphone-15': {
      steps: [
        'Open Settings.',
        'Tap "Display & Brightness".',
        'Tap "Dark" under Appearance.',
      ],
      tip: 'Dark mode can reduce eye strain at night and save battery on iPhones with OLED screens.',
    },
    'iphone-se': {
      steps: [
        'Open Settings.',
        'Tap "Display & Brightness".',
        'Choose "Dark".',
      ],
      tip: 'The iPhone SE LCD screen does not save battery in dark mode, but it is still easier on the eyes at night.',
    },
    'ipad': {
      steps: [
        'Open Settings.',
        'Tap "Display & Brightness".',
        'Tap "Dark".',
      ],
      tip: 'Use "Automatic" to have dark mode turn on at sunset and off at sunrise.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap "Display".',
        'Tap "Dark" under the Light/Dark options.',
      ],
      tip: 'Samsung OLED screens look great in dark mode and it saves significant battery life.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Settings.',
        'Tap "Display".',
        'Tap "Dark".',
      ],
      tip: 'You can also swipe down from the top and tap the Dark Mode quick tile.',
    },
    'google-pixel': {
      steps: [
        'Open Settings.',
        'Tap "Display".',
        'Tap "Dark theme" and toggle it on.',
      ],
      tip: 'Pixel phones with OLED screens get noticeably better battery life in dark mode.',
    },
    'motorola': {
      steps: [
        'Open Settings.',
        'Tap "Display".',
        'Toggle on "Dark theme".',
      ],
      tip: 'Dark mode makes text white on a black background, which many people find easier to read at night.',
    },
    'android-generic': {
      steps: [
        'Open Settings.',
        'Tap "Display".',
        'Look for "Dark theme" or "Dark mode" and turn it on.',
      ],
      tip: 'Many individual apps also have their own dark mode setting inside the app.',
    },
    'iphone-generic': {
      steps: [
        'Open Settings.',
        'Tap "Display & Brightness".',
        'Choose "Dark".',
      ],
      tip: 'You can also ask Siri: "Turn on dark mode."',
    },
    'windows-pc': {
      steps: [
        'Click Start and open Settings.',
        'Click "Personalization".',
        'Click "Colors".',
        'Under "Choose your mode," select "Dark".',
      ],
      tip: 'Choose "Custom" to have dark mode for Windows menus but keep apps in light mode, or vice versa.',
    },
    'mac': {
      steps: [
        'Click the Apple menu.',
        'Choose "System Settings".',
        'Click "Appearance".',
        'Choose "Dark".',
      ],
      tip: 'Choose "Auto" to switch between light and dark based on time of day.',
    },
  },

  // ─── 25. adjust-brightness ─────────────────────────────────────────────
  'adjust-brightness': {
    'iphone-16': {
      steps: [
        'Swipe down from the top-right corner to open Control Center.',
        'Find the brightness slider (the sun icon).',
        'Drag the slider up to increase brightness.',
        'Drag it down to decrease brightness.',
      ],
      tip: 'Turn on "Auto-Brightness" in Settings > Accessibility > Display & Text Size so your phone adjusts automatically.',
    },
    'iphone-15': {
      steps: [
        'Swipe down from the top-right corner.',
        'Drag the brightness slider up or down.',
      ],
      tip: 'Lower brightness at night to reduce eye strain and save battery.',
    },
    'iphone-se': {
      steps: [
        'Swipe up from the bottom to open Control Center.',
        'Drag the brightness slider.',
      ],
      tip: 'You can also adjust brightness in Settings > Display & Brightness.',
    },
    'ipad': {
      steps: [
        'Swipe down from the top-right corner.',
        'Drag the brightness slider up or down.',
      ],
      tip: 'iPad brightness auto-adjusts in most conditions. Manual control is best for reading.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Swipe down from the top of the screen.',
        'Find the brightness slider at the top of the notification shade.',
        'Drag it left (dimmer) or right (brighter).',
      ],
      tip: 'The "Adaptive brightness" feature learns your preferences over time.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Swipe down from the top of the screen.',
        'Drag the brightness slider left or right.',
      ],
      tip: 'Turn on "Adaptive brightness" so the phone adjusts for you.',
    },
    'google-pixel': {
      steps: [
        'Swipe down from the top of the screen.',
        'Drag the brightness slider.',
      ],
      tip: 'Pixel phones have "Adaptive brightness" that learns your preferred brightness in different environments.',
    },
    'motorola': {
      steps: [
        'Swipe down from the top of the screen.',
        'Drag the brightness slider.',
      ],
      tip: 'Enable Auto-Brightness in Settings > Display to let the phone adjust for you.',
    },
    'android-generic': {
      steps: [
        'Swipe down from the top of the screen.',
        'Find the brightness slider (usually near the top).',
        'Drag it left or right.',
      ],
      tip: 'Most Android phones have an auto-brightness option in Settings > Display.',
    },
    'iphone-generic': {
      steps: [
        'Open Control Center.',
        'Drag the brightness slider up or down.',
      ],
      tip: 'If you can barely see the screen in bright sunlight, drag the slider all the way up.',
    },
    'windows-pc': {
      steps: [
        'Click the battery or notification icon in the bottom-right taskbar.',
        'Find the brightness slider.',
        'Drag it left or right.',
        'On a desktop monitor, use the buttons on the monitor itself.',
      ],
      tip: 'Laptops have brightness control in the taskbar. Desktop monitors have physical buttons.',
    },
    'mac': {
      steps: [
        'Use the brightness keys on your keyboard (usually F1 to dim, F2 to brighten).',
        'Or go to System Settings > Displays and drag the brightness slider.',
      ],
      tip: 'Enable "True Tone" in Display settings to have the screen color temperature adjust to your environment.',
    },
  },

  // ─── 26. set-up-voicemail ──────────────────────────────────────────────
  'set-up-voicemail': {
    'iphone-16': {
      steps: [
        'Open the Phone app.',
        'Tap "Voicemail" at the bottom-right.',
        'Tap "Set Up Now".',
        'Create a voicemail password and enter it twice.',
        'Choose "Default" greeting or "Custom".',
        'If Custom, tap "Record" and say your greeting, then tap "Save".',
      ],
      tip: 'Visual Voicemail on iPhones lets you read transcriptions of your messages without listening to them.',
    },
    'iphone-15': {
      steps: [
        'Open the Phone app.',
        'Tap "Voicemail".',
        'Tap "Set Up Now".',
        'Set a password.',
        'Record your greeting.',
        'Tap "Save".',
      ],
      tip: 'Keep your greeting short and clear. State your name so callers know they reached the right person.',
    },
    'iphone-se': {
      steps: [
        'Open the Phone app.',
        'Tap "Voicemail".',
        'Tap "Set Up Now".',
        'Create a password.',
        'Record a greeting or use the default.',
      ],
      tip: 'If "Set Up Now" does not appear, your carrier may not support Visual Voicemail. Call your carrier for help.',
    },
    'ipad': {
      steps: [
        'iPad does not have voicemail since it does not make phone calls.',
        'Set up voicemail on your iPhone instead.',
        'If you use a WiFi calling app on iPad, check that app\'s settings.',
      ],
      tip: 'Voicemail is a phone-only feature. Use your iPhone to manage voicemail.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Phone app.',
        'Tap and hold the "1" key on the dial pad.',
        'This calls your voicemail system.',
        'Follow the voice prompts to set up your greeting and password.',
        'Press the prompted numbers to save your greeting.',
      ],
      tip: 'You can also set up Visual Voicemail through your carrier\'s app (like My Verizon or T-Mobile app).',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open the Phone app.',
        'Hold the "1" key to dial voicemail.',
        'Follow the automated prompts.',
        'Record your greeting when instructed.',
        'Set a password.',
      ],
      tip: 'Contact your mobile carrier if the voicemail setup does not start automatically.',
    },
    'google-pixel': {
      steps: [
        'Open the Phone app.',
        'Tap the three dots menu.',
        'Tap "Settings" then "Voicemail".',
        'Or hold the "1" key to call your voicemail.',
        'Follow the prompts to set up your greeting.',
      ],
      tip: 'Google Pixel phones can automatically screen and transcribe voicemail messages.',
    },
    'motorola': {
      steps: [
        'Open the Phone app.',
        'Press and hold the "1" key.',
        'Follow the voice prompts to set up.',
        'Create a password and record your greeting.',
      ],
      tip: 'Your carrier controls voicemail. If you have trouble, call them for assistance.',
    },
    'android-generic': {
      steps: [
        'Open the Phone app.',
        'Press and hold the number "1" on the keypad.',
        'This dials your voicemail system.',
        'Follow the automated instructions.',
        'Set up your password and record a greeting.',
      ],
      tip: 'Voicemail setup depends on your mobile carrier. Call your carrier if you need help.',
    },
    'iphone-generic': {
      steps: [
        'Open the Phone app.',
        'Tap "Voicemail" at the bottom.',
        'Tap "Set Up Now".',
        'Create a password.',
        'Record your greeting or use the default.',
        'Tap "Save".',
      ],
      tip: 'Your voicemail password is different from your phone passcode. Remember it in case you need to call in.',
    },
  },

  // ─── 27. use-voice-assistant ───────────────────────────────────────────
  'use-voice-assistant': {
    'iphone-16': {
      steps: [
        'Say "Hey Siri" or press and hold the side button.',
        'Wait for the colorful circle to appear at the bottom.',
        'Speak your request clearly (for example: "What is the weather today?").',
        'Siri will respond with an answer or perform the action.',
      ],
      tip: 'You can ask Siri to call people, send texts, set reminders, get directions, and much more.',
    },
    'iphone-15': {
      steps: [
        'Say "Hey Siri" or hold the side button.',
        'Wait for the Siri animation.',
        'Say what you need.',
        'Siri responds.',
      ],
      tip: 'Speak naturally. You do not need to use special commands. Just ask as if talking to a person.',
    },
    'iphone-se': {
      steps: [
        'Say "Hey Siri" or hold the Home button (or side button).',
        'Wait for Siri to activate.',
        'Speak your request.',
      ],
      tip: 'If "Hey Siri" is not working, go to Settings > Siri & Search and turn it on.',
    },
    'ipad': {
      steps: [
        'Say "Hey Siri" or hold the top button (or Home button).',
        'Wait for the Siri animation.',
        'Ask your question or give a command.',
      ],
      tip: 'Siri on iPad can control smart home devices, play music, and answer questions.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Say "Hey Google" or press and hold the side button.',
        'Wait for the Google Assistant to appear.',
        'Speak your request.',
        'Google Assistant responds.',
      ],
      tip: 'Samsung phones also have Bixby (hold the side button if configured). Most people prefer Google Assistant.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Say "Hey Google".',
        'Wait for the Google Assistant screen.',
        'Ask your question.',
      ],
      tip: 'To switch from Bixby to Google Assistant, go to Settings > Apps > Choose default apps > Digital assistant.',
    },
    'google-pixel': {
      steps: [
        'Say "Hey Google" or squeeze the bottom of the phone (on older Pixels).',
        'Wait for Google Assistant to activate.',
        'Speak your request clearly.',
      ],
      tip: 'Google Assistant can identify songs, translate languages, and control smart home devices.',
    },
    'motorola': {
      steps: [
        'Say "Hey Google".',
        'Wait for Google Assistant to appear.',
        'Ask your question or give a command.',
      ],
      tip: 'You can also type to Google Assistant if you prefer not to speak out loud.',
    },
    'android-generic': {
      steps: [
        'Say "Hey Google" to wake the voice assistant.',
        'Wait for it to activate.',
        'Speak your request clearly.',
        'The assistant responds with answers or actions.',
      ],
      tip: 'Google Assistant works on all Android phones. Say "Hey Google" at any time.',
    },
    'iphone-generic': {
      steps: [
        'Say "Hey Siri" or hold the side button.',
        'Wait for Siri to activate.',
        'Speak your request.',
      ],
      tip: 'Try asking Siri: "What can you do?" for a list of helpful features.',
    },
    'windows-pc': {
      steps: [
        'Click the Start button or press the Windows key.',
        'Type your question in the search bar.',
        'Or say "Hey Cortana" if Cortana is enabled.',
        'Windows will show you results or answer your question.',
      ],
      tip: 'Windows 11 integrates Copilot, an AI assistant. Click the Copilot icon in the taskbar to try it.',
    },
    'mac': {
      steps: [
        'Say "Hey Siri" or click the Siri icon in the menu bar.',
        'Wait for Siri to appear.',
        'Speak your request.',
      ],
      tip: 'Siri on Mac can open apps, search files, check the weather, and control system settings.',
    },
  },

  // ─── 28. turn-off-location ─────────────────────────────────────────────
  'turn-off-location': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap "Privacy & Security".',
        'Tap "Location Services".',
        'Toggle off "Location Services" at the top to turn off all location access.',
        'Or tap individual apps to change their location permission.',
      ],
      tip: 'Keep location on for Maps and Find My, but turn it off for apps that do not need it.',
    },
    'iphone-15': {
      steps: [
        'Open Settings.',
        'Tap "Privacy & Security".',
        'Tap "Location Services".',
        'Toggle it off, or adjust per app.',
      ],
      tip: 'Choosing "While Using the App" is a good middle ground for apps that need occasional location access.',
    },
    'iphone-se': {
      steps: [
        'Open Settings.',
        'Tap "Privacy & Security" > "Location Services".',
        'Turn it off or adjust by app.',
      ],
      tip: 'Turning off location for social media apps prevents them from tracking where you go.',
    },
    'ipad': {
      steps: [
        'Open Settings.',
        'Tap "Privacy & Security".',
        'Tap "Location Services".',
        'Toggle off or adjust per app.',
      ],
      tip: 'WiFi-only iPads can still use approximate location based on your WiFi network.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap "Location".',
        'Toggle off the switch at the top.',
        'Or tap "App permissions" to control per app.',
      ],
      tip: 'You can also turn off location quickly from the Quick Settings by swiping down twice.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Settings.',
        'Tap "Location".',
        'Toggle it off.',
      ],
      tip: 'Turning off location saves battery too, since the GPS sensor will stop running.',
    },
    'google-pixel': {
      steps: [
        'Open Settings.',
        'Tap "Location".',
        'Toggle off "Use location".',
        'Or tap "App access to location" for individual control.',
      ],
      tip: 'Pixel phones show a small arrow in the status bar when an app is using your location.',
    },
    'motorola': {
      steps: [
        'Open Settings.',
        'Tap "Location".',
        'Toggle off the location switch.',
      ],
      tip: 'You can quickly toggle location from the Quick Settings panel.',
    },
    'android-generic': {
      steps: [
        'Open Settings.',
        'Tap "Location".',
        'Turn off the main location toggle.',
        'Or manage permissions for individual apps.',
      ],
      tip: 'Keep location on for navigation apps like Google Maps, and turn it off for everything else.',
    },
    'iphone-generic': {
      steps: [
        'Open Settings > Privacy & Security > Location Services.',
        'Toggle off Location Services.',
        'Or adjust settings for each app.',
      ],
      tip: 'You can set each app to "Never," "While Using," or "Always" for location access.',
    },
    'windows-pc': {
      steps: [
        'Click Start and open Settings.',
        'Click "Privacy & security".',
        'Click "Location".',
        'Toggle off "Location services".',
      ],
      tip: 'Desktop computers typically do not have GPS, but websites can still estimate your location from your IP address.',
    },
    'mac': {
      steps: [
        'Click the Apple menu.',
        'Choose "System Settings".',
        'Click "Privacy & Security".',
        'Click "Location Services".',
        'Toggle it off or manage per app.',
      ],
      tip: 'Find My Mac needs location services to work. Keep it on if you want to locate a lost Mac.',
    },
  },

  // ─── 29. enable-two-factor-auth ────────────────────────────────────────
  'enable-two-factor-auth': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap your name at the top (Apple Account).',
        'Tap "Sign-In & Security".',
        'Tap "Two-Factor Authentication".',
        'If not already on, tap "Turn On Two-Factor Authentication".',
        'Follow the prompts to verify your phone number.',
        'Enter the verification code sent to your phone.',
      ],
      tip: 'Two-factor authentication is one of the best ways to keep your accounts safe from hackers.',
    },
    'iphone-15': {
      steps: [
        'Open Settings.',
        'Tap your name at the top.',
        'Tap "Sign-In & Security".',
        'Tap "Two-Factor Authentication".',
        'Follow the prompts.',
      ],
      tip: 'Once enabled, you will receive a code on your trusted devices whenever someone tries to sign in to your Apple ID.',
    },
    'iphone-se': {
      steps: [
        'Open Settings.',
        'Tap your name.',
        'Tap "Sign-In & Security" > "Two-Factor Authentication".',
        'Turn it on and follow the prompts.',
      ],
      tip: 'Write down your Recovery Key and keep it somewhere safe, in case you lose access to your phone.',
    },
    'ipad': {
      steps: [
        'Open Settings.',
        'Tap your name at the top.',
        'Tap "Sign-In & Security".',
        'Tap "Two-Factor Authentication".',
        'Follow the setup steps.',
      ],
      tip: 'Two-factor works across all your Apple devices. Set it up once and it protects everything.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap your Samsung account at the top.',
        'Tap "Security and privacy".',
        'Tap "Two-step verification".',
        'Toggle it on.',
        'Choose to receive codes by text message or authenticator app.',
        'Follow the setup prompts.',
      ],
      tip: 'Also enable two-factor on your Google account: go to myaccount.google.com on your phone\'s browser.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Settings.',
        'Tap your Samsung account.',
        'Tap "Security and privacy".',
        'Tap "Two-step verification".',
        'Turn it on and follow the steps.',
      ],
      tip: 'Use an authenticator app instead of SMS for stronger security.',
    },
    'google-pixel': {
      steps: [
        'Open the Settings app.',
        'Tap "Google".',
        'Tap "Manage your Google Account".',
        'Tap "Security".',
        'Tap "2-Step Verification".',
        'Follow the prompts to set it up.',
      ],
      tip: 'Google offers multiple verification methods: phone prompt, text message, or security key.',
    },
    'motorola': {
      steps: [
        'Open a web browser or the Google app.',
        'Go to myaccount.google.com.',
        'Tap "Security".',
        'Tap "2-Step Verification".',
        'Follow the setup steps.',
      ],
      tip: 'Two-factor authentication prevents someone from accessing your account even if they know your password.',
    },
    'android-generic': {
      steps: [
        'Open Settings.',
        'Tap "Google" (or go to myaccount.google.com).',
        'Tap "Security".',
        'Tap "2-Step Verification".',
        'Follow the prompts.',
      ],
      tip: 'Enable two-factor authentication on your email, bank, and social media accounts for the best protection.',
    },
    'iphone-generic': {
      steps: [
        'Open Settings.',
        'Tap your name at the top.',
        'Tap "Sign-In & Security".',
        'Tap "Two-Factor Authentication".',
        'Follow the prompts.',
      ],
      tip: 'Two-factor keeps your Apple ID safe even if someone guesses your password.',
    },
    'windows-pc': {
      steps: [
        'Open a web browser.',
        'Go to account.microsoft.com.',
        'Sign in and click "Security".',
        'Click "Advanced security options".',
        'Click "Turn on" under Two-step verification.',
        'Follow the prompts.',
      ],
      tip: 'The Microsoft Authenticator app is free and works well for two-factor authentication.',
    },
    'mac': {
      steps: [
        'Click the Apple menu.',
        'Choose "System Settings".',
        'Click your name at the top.',
        'Click "Sign-In & Security".',
        'Click "Two-Factor Authentication" and follow the prompts.',
      ],
      tip: 'Once enabled, verification codes appear automatically on your Mac when you sign in on a new device.',
    },
  },

  // ─── 30. check-battery-health ──────────────────────────────────────────
  // NOTE: Not applicable to windows-pc and mac (desktops don't have batteries in the same way)
  'check-battery-health': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap "Battery".',
        'Tap "Battery Health & Charging".',
        'Look at "Maximum Capacity" — this shows how much charge your battery can hold compared to new.',
        'Anything above 80% is considered healthy.',
      ],
      tip: 'To preserve battery health, avoid letting your phone drop below 20% regularly.',
    },
    'iphone-15': {
      steps: [
        'Open Settings.',
        'Tap "Battery".',
        'Tap "Battery Health & Charging".',
        'Check the "Maximum Capacity" percentage.',
      ],
      tip: 'If maximum capacity is below 80%, consider getting the battery replaced at an Apple Store.',
    },
    'iphone-se': {
      steps: [
        'Open Settings.',
        'Tap "Battery".',
        'Tap "Battery Health & Charging".',
        'Review the capacity percentage.',
      ],
      tip: 'The iPhone SE has a smaller battery than other iPhones, so health management is extra important.',
    },
    'ipad': {
      steps: [
        'Open Settings.',
        'Tap "Battery".',
        'Tap "Battery Health".',
        'View the maximum capacity.',
      ],
      tip: 'iPads generally maintain battery health longer than iPhones because they are charged less frequently.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap "Battery and device care".',
        'Tap "Battery".',
        'Tap "Battery usage" to see consumption details.',
        'Use the Samsung Members app for a diagnostic battery health check.',
      ],
      tip: 'Samsung\'s "Protect battery" feature limits charging to 85% to preserve long-term health.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Settings.',
        'Tap "Battery and device care".',
        'Tap "Battery".',
        'View your battery usage.',
        'Open Samsung Members app for a detailed battery health report.',
      ],
      tip: 'Enable "Adaptive battery" to help your phone learn which apps to limit in the background.',
    },
    'google-pixel': {
      steps: [
        'Open Settings.',
        'Tap "Battery".',
        'View the battery percentage and usage details.',
        'For detailed health info, use the "Device diagnostics" in Settings > About phone.',
      ],
      tip: 'Pixel phones have "Adaptive charging" that slows down charging at night to preserve battery health.',
    },
    'motorola': {
      steps: [
        'Open Settings.',
        'Tap "Battery".',
        'View battery usage and remaining charge.',
        'Motorola does not show a specific health percentage, but usage patterns indicate battery condition.',
      ],
      tip: 'If your phone drains much faster than it used to, the battery may need replacement.',
    },
    'android-generic': {
      steps: [
        'Open Settings.',
        'Tap "Battery".',
        'View the battery level and usage details.',
        'Some phones show a "Battery health" option here.',
      ],
      tip: 'If your battery drains very quickly or the phone shuts off unexpectedly, the battery may need service.',
    },
    'iphone-generic': {
      steps: [
        'Open Settings.',
        'Tap "Battery".',
        'Tap "Battery Health & Charging".',
        'Check "Maximum Capacity".',
      ],
      tip: 'Apple will replace your battery for a fee if it falls below 80% and your phone is under warranty.',
    },
  },

  // ─── 31. transfer-photos-to-computer ───────────────────────────────────
  'transfer-photos-to-computer': {
    'iphone-16': {
      steps: [
        'Connect your iPhone to the computer with a USB cable (Lightning or USB-C).',
        'Tap "Trust This Computer" on your iPhone if asked.',
        'On Windows: open File Explorer and look for "Apple iPhone" under devices.',
        'On Mac: open the Photos app, your iPhone will appear in the sidebar.',
        'Select the photos you want and import them.',
        'Disconnect the cable when done.',
      ],
      tip: 'You can also use iCloud Photos to automatically sync all photos to your Mac or PC without a cable.',
    },
    'iphone-15': {
      steps: [
        'Connect your iPhone with a USB cable.',
        'Tap "Trust This Computer" on the phone.',
        'On Windows: use File Explorer or the Photos app.',
        'On Mac: use the Photos app.',
        'Import the photos.',
      ],
      tip: 'AirDrop is the fastest wireless way to transfer photos from iPhone to Mac.',
    },
    'iphone-se': {
      steps: [
        'Plug your iPhone into the computer with a USB cable.',
        'Trust the computer if prompted.',
        'Open File Explorer (Windows) or Photos (Mac).',
        'Import your photos.',
      ],
      tip: 'iCloud Photos keeps everything synced automatically if you enable it.',
    },
    'ipad': {
      steps: [
        'Connect the iPad to your computer with a USB cable.',
        'Tap "Trust This Computer" on the iPad.',
        'Open File Explorer (Windows) or Photos (Mac).',
        'Find the iPad in the sidebar.',
        'Import your photos.',
      ],
      tip: 'The iPad uses either a Lightning or USB-C cable depending on the model.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Connect your Samsung phone to the computer with a USB-C cable.',
        'On the phone, swipe down the notification shade and tap the USB notification.',
        'Change the USB mode to "File transfer" (MTP).',
        'On the computer, open File Explorer.',
        'Navigate to the phone > DCIM folder.',
        'Copy the photos to your computer.',
      ],
      tip: 'Samsung Smart Switch software makes transferring files even easier. Download it from samsung.com.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Connect with a USB cable.',
        'Change USB mode to "File transfer" in the notification.',
        'Open File Explorer on the computer.',
        'Go to the phone > DCIM > Camera folder.',
        'Copy photos to your computer.',
      ],
      tip: 'You can also email photos to yourself or upload them to Google Photos for wireless transfer.',
    },
    'google-pixel': {
      steps: [
        'Connect the Pixel to your computer with a USB-C cable.',
        'On the phone, tap the USB notification and select "File transfer".',
        'Open File Explorer on your computer.',
        'Navigate to the Pixel > DCIM folder.',
        'Copy photos to your computer.',
      ],
      tip: 'Google Photos automatically backs up your photos. You can download them from photos.google.com on any computer.',
    },
    'motorola': {
      steps: [
        'Connect with a USB cable.',
        'Select "File transfer" mode on the phone.',
        'Open File Explorer on the computer.',
        'Browse to the phone > DCIM folder.',
        'Copy the photos you want.',
      ],
      tip: 'If your computer does not recognize the phone, try a different USB cable or port.',
    },
    'android-generic': {
      steps: [
        'Connect your phone to the computer with a USB cable.',
        'On the phone, tap the USB notification and choose "File transfer".',
        'Open File Explorer on the computer.',
        'Find the phone and navigate to the DCIM folder.',
        'Copy photos to your computer.',
      ],
      tip: 'Google Photos at photos.google.com is the easiest wireless way to access your photos from any computer.',
    },
    'iphone-generic': {
      steps: [
        'Connect your iPhone to the computer with a USB cable.',
        'Trust the computer if asked.',
        'Use File Explorer (Windows) or Photos (Mac) to import.',
      ],
      tip: 'iCloud Photos syncs everything automatically between your iPhone and Mac.',
    },
    'windows-pc': {
      steps: [
        'Connect your phone to the Windows PC with a USB cable.',
        'Open File Explorer.',
        'Click on the phone under "This PC".',
        'Navigate to the DCIM or Photos folder.',
        'Select photos, right-click, and choose "Copy".',
        'Paste them into a folder on your computer.',
      ],
      tip: 'The Windows Photos app has a built-in import feature. Open it and click "Import" at the top.',
    },
    'mac': {
      steps: [
        'Connect your phone to the Mac with a USB cable.',
        'Open the Photos app on your Mac.',
        'Your phone appears in the sidebar.',
        'Click "Import All New Items" or select specific photos.',
        'Wait for the import to complete.',
      ],
      tip: 'For Android phones on Mac, use the Android File Transfer app or transfer wirelessly via Google Photos.',
    },
  },

  // ─── 32. set-up-email ──────────────────────────────────────────────────
  'set-up-email': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap "Mail".',
        'Tap "Accounts".',
        'Tap "Add Account".',
        'Choose your email provider (Google, Yahoo, Outlook, etc.).',
        'Enter your email address and password.',
        'Tap "Next" and wait for verification.',
        'Tap "Save".',
      ],
      tip: 'Once set up, open the Mail app to read and send emails.',
    },
    'iphone-15': {
      steps: [
        'Open Settings > Mail > Accounts.',
        'Tap "Add Account".',
        'Select your provider.',
        'Enter credentials.',
        'Tap "Save".',
      ],
      tip: 'You can add multiple email accounts and see them all in the Mail app.',
    },
    'iphone-se': {
      steps: [
        'Open Settings > Mail > Accounts > Add Account.',
        'Choose your email provider.',
        'Sign in.',
        'Tap "Save".',
      ],
      tip: 'The iPhone Mail app supports Gmail, Yahoo, Outlook, and most other email services.',
    },
    'ipad': {
      steps: [
        'Open Settings > Mail > Accounts > Add Account.',
        'Select your email provider.',
        'Enter your email and password.',
        'Tap "Save".',
        'Open the Mail app to start using it.',
      ],
      tip: 'The iPad\'s larger screen makes reading and writing emails much more comfortable.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Gmail app (or Samsung Email app).',
        'Tap your profile icon.',
        'Tap "Add another account".',
        'Choose the account type (Google, Outlook, Yahoo, etc.).',
        'Enter your email and password.',
        'Follow the prompts to complete setup.',
      ],
      tip: 'Gmail is usually the best email app on Samsung phones. It supports all major email services.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open the Gmail app.',
        'Tap your profile icon.',
        'Tap "Add another account".',
        'Choose the type and sign in.',
      ],
      tip: 'Turn on notifications for email so you do not miss important messages.',
    },
    'google-pixel': {
      steps: [
        'Open the Gmail app.',
        'Your Google account email is already set up.',
        'To add another account, tap your profile icon.',
        'Tap "Add another account".',
        'Choose the provider and sign in.',
      ],
      tip: 'Gmail organizes your email into tabs: Primary, Social, and Promotions.',
    },
    'motorola': {
      steps: [
        'Open the Gmail app.',
        'Tap your profile icon.',
        'Tap "Add another account".',
        'Select the email provider.',
        'Enter your email and password.',
      ],
      tip: 'If you prefer a simpler email app, try "Microsoft Outlook" from the Play Store.',
    },
    'android-generic': {
      steps: [
        'Open the Gmail app.',
        'Tap your profile icon.',
        'Tap "Add another account".',
        'Choose the email type.',
        'Enter your credentials.',
      ],
      tip: 'Gmail supports Google, Yahoo, Outlook, and most IMAP email accounts.',
    },
    'iphone-generic': {
      steps: [
        'Open Settings > Mail > Accounts > Add Account.',
        'Choose your provider.',
        'Sign in.',
        'Tap "Save".',
      ],
      tip: 'If your email provider is not listed, choose "Other" and enter the settings manually.',
    },
    'windows-pc': {
      steps: [
        'Click the Start button.',
        'Open the Mail app (or Outlook).',
        'Click "Add account".',
        'Choose your email provider.',
        'Enter your email and password.',
        'Click "Done" when setup is complete.',
      ],
      tip: 'Microsoft Outlook is the most full-featured email app on Windows. Mail is simpler but works well.',
    },
    'mac': {
      steps: [
        'Open the Mail app.',
        'If it is your first time, it will ask you to add an account.',
        'Choose your provider (Google, iCloud, Yahoo, etc.).',
        'Enter your email and password.',
        'Click "Sign In" and follow the prompts.',
      ],
      tip: 'You can also add email accounts in System Settings > Internet Accounts.',
    },
  },

  // ─── 33. change-password ───────────────────────────────────────────────
  'change-password': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap your name at the top.',
        'Tap "Sign-In & Security".',
        'Tap "Change Password".',
        'Enter your current passcode.',
        'Type your new password twice.',
        'Tap "Change".',
      ],
      tip: 'Use a strong password with at least 12 characters, mixing letters, numbers, and symbols.',
    },
    'iphone-15': {
      steps: [
        'Open Settings.',
        'Tap your name.',
        'Tap "Sign-In & Security".',
        'Tap "Change Password".',
        'Enter current passcode, then new password.',
      ],
      tip: 'iCloud Keychain can suggest strong passwords and remember them for you.',
    },
    'iphone-se': {
      steps: [
        'Open Settings > [Your Name] > Sign-In & Security > Change Password.',
        'Enter your passcode.',
        'Create a new password.',
        'Tap "Change".',
      ],
      tip: 'Never use the same password for your email and your Apple ID.',
    },
    'ipad': {
      steps: [
        'Open Settings.',
        'Tap your name.',
        'Tap "Sign-In & Security" > "Change Password".',
        'Enter your passcode.',
        'Set a new password.',
      ],
      tip: 'Password changes sync across all devices signed in with the same Apple ID.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap your Samsung account at the top.',
        'Tap "Security and privacy".',
        'Tap "Password".',
        'Enter your current password.',
        'Type a new password and confirm it.',
        'Tap "Save" or "Done".',
      ],
      tip: 'Also change your Google account password at myaccount.google.com > Security.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Settings.',
        'Tap your Samsung account.',
        'Tap "Security and privacy".',
        'Tap "Password" and follow the prompts.',
      ],
      tip: 'Use Samsung Pass to remember passwords securely with your fingerprint.',
    },
    'google-pixel': {
      steps: [
        'Open Settings.',
        'Tap "Google".',
        'Tap "Manage your Google Account".',
        'Tap "Security".',
        'Tap "Password" and sign in.',
        'Enter a new password.',
      ],
      tip: 'Google will notify you if your password appears in a data breach. Change it immediately if alerted.',
    },
    'motorola': {
      steps: [
        'Open a browser and go to myaccount.google.com.',
        'Tap "Security".',
        'Tap "Password".',
        'Sign in and enter a new password.',
      ],
      tip: 'Change your password every 6 months for better security.',
    },
    'android-generic': {
      steps: [
        'Open Settings.',
        'Tap "Google" (or go to myaccount.google.com).',
        'Tap "Security".',
        'Tap "Password".',
        'Enter your current password and set a new one.',
      ],
      tip: 'A good password has at least 12 characters and does not include your name, birthday, or common words.',
    },
    'iphone-generic': {
      steps: [
        'Open Settings.',
        'Tap your name at the top.',
        'Tap "Sign-In & Security" > "Change Password".',
        'Enter your passcode.',
        'Set a new password.',
      ],
      tip: 'Use a password manager to keep track of your passwords safely.',
    },
    'windows-pc': {
      steps: [
        'Click Start and open Settings.',
        'Click "Accounts".',
        'Click "Sign-in options".',
        'Click "Password" and then "Change".',
        'Enter your current password.',
        'Type your new password and confirm.',
        'Click "Finish".',
      ],
      tip: 'If you use a Microsoft account, you may be directed to change your password online at account.microsoft.com.',
    },
    'mac': {
      steps: [
        'Click the Apple menu.',
        'Choose "System Settings".',
        'Click your name at the top.',
        'Click "Sign-In & Security".',
        'Click "Change Password".',
        'Enter your current password and set a new one.',
      ],
      tip: 'Use a mix of uppercase, lowercase, numbers, and symbols for the strongest passwords.',
    },
  },

  // ─── 34. turn-on-wifi-calling ──────────────────────────────────────────
  // Not applicable to windows-pc and mac
  'turn-on-wifi-calling': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap "Phone".',
        'Tap "Wi-Fi Calling".',
        'Toggle on "Wi-Fi Calling on This iPhone".',
        'Enter your emergency address if prompted.',
        'Tap "Save".',
      ],
      tip: 'WiFi Calling lets you make phone calls over WiFi when cell signal is weak, like inside large buildings.',
    },
    'iphone-15': {
      steps: [
        'Open Settings.',
        'Tap "Phone".',
        'Tap "Wi-Fi Calling".',
        'Turn on "Wi-Fi Calling on This iPhone".',
        'Enter your address if asked.',
      ],
      tip: 'Call quality over WiFi is often just as good or better than regular cell calls.',
    },
    'iphone-se': {
      steps: [
        'Open Settings > Phone > Wi-Fi Calling.',
        'Turn on Wi-Fi Calling.',
        'Enter your emergency address.',
      ],
      tip: 'Your carrier must support WiFi Calling for this to work. Most major carriers do.',
    },
    'ipad': {
      steps: [
        'Open Settings > FaceTime.',
        'Look for "Wi-Fi Calling" or "Calls from iPhone".',
        'Toggle it on.',
        'Your iPad can receive and make calls through your iPhone\'s plan.',
      ],
      tip: 'Both your iPhone and iPad must be on the same WiFi network and Apple ID for this to work.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap "Connections".',
        'Tap "Wi-Fi Calling".',
        'Toggle it on.',
        'Follow any carrier-specific prompts.',
      ],
      tip: 'WiFi Calling is especially useful if you have poor cell signal at home but good WiFi.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Settings.',
        'Tap "Connections".',
        'Tap "Wi-Fi Calling".',
        'Turn it on.',
      ],
      tip: 'Not all carriers and plans support WiFi Calling. Contact your carrier if the option is missing.',
    },
    'google-pixel': {
      steps: [
        'Open Settings.',
        'Tap "Network & internet".',
        'Tap "Calls & SMS".',
        'Tap your carrier name.',
        'Toggle on "Wi-Fi calling".',
      ],
      tip: 'Pixel phones seamlessly switch between WiFi and cellular calls without dropping.',
    },
    'motorola': {
      steps: [
        'Open Settings.',
        'Tap "Network & internet" (or "Connections").',
        'Look for "Wi-Fi Calling" and tap it.',
        'Toggle it on.',
      ],
      tip: 'If you do not see a WiFi Calling option, your carrier or phone model may not support it.',
    },
    'android-generic': {
      steps: [
        'Open Settings.',
        'Look for "Wi-Fi Calling" under Network, Connections, or Phone settings.',
        'Toggle it on.',
        'Follow any carrier prompts.',
      ],
      tip: 'The location of this setting varies by phone brand. Search for "WiFi Calling" in Settings.',
    },
    'iphone-generic': {
      steps: [
        'Open Settings > Phone > Wi-Fi Calling.',
        'Turn on Wi-Fi Calling.',
        'Enter your address if prompted.',
      ],
      tip: 'WiFi Calling uses your existing phone number. The person you call will not see any difference.',
    },
  },

  // ─── 35. pair-airpods-earbuds ──────────────────────────────────────────
  'pair-airpods-earbuds': {
    'iphone-16': {
      steps: [
        'Open the AirPods case next to your iPhone (keep the AirPods inside).',
        'A setup animation appears on your iPhone screen.',
        'Tap "Connect".',
        'Wait for the pairing to complete.',
        'Tap "Done".',
      ],
      tip: 'AirPods pair automatically with all your Apple devices once set up on one device.',
    },
    'iphone-15': {
      steps: [
        'Open the AirPods case near your iPhone.',
        'The pairing screen appears automatically.',
        'Tap "Connect".',
        'Tap "Done" when paired.',
      ],
      tip: 'For non-Apple earbuds, put them in pairing mode and connect via Settings > Bluetooth.',
    },
    'iphone-se': {
      steps: [
        'Open the AirPods case near the phone.',
        'Follow the on-screen prompt and tap "Connect".',
        'For other earbuds, go to Settings > Bluetooth and select the device.',
      ],
      tip: 'Make sure your earbuds are charged before pairing.',
    },
    'ipad': {
      steps: [
        'Open the AirPods case near your iPad.',
        'The pairing popup appears.',
        'Tap "Connect".',
        'For other earbuds, use Settings > Bluetooth.',
      ],
      tip: 'If your AirPods are already paired with your iPhone, they automatically work with your iPad too.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Put your earbuds in pairing mode (usually hold a button on the case or earbuds).',
        'Open Settings on your Samsung phone.',
        'Tap "Connections".',
        'Tap "Bluetooth".',
        'Tap the earbuds name when it appears.',
        'Wait for "Connected" to show.',
      ],
      tip: 'Samsung Galaxy Buds pair instantly with Samsung phones when you open the case nearby.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Put earbuds in pairing mode.',
        'Open Settings > Connections > Bluetooth.',
        'Tap the earbuds name.',
        'Wait for connection.',
      ],
      tip: 'For Samsung Galaxy Buds, download the Galaxy Wearable app for extra features.',
    },
    'google-pixel': {
      steps: [
        'Put earbuds in pairing mode.',
        'A Fast Pair popup may appear on your Pixel. Tap "Connect".',
        'If no popup, go to Settings > Connected devices > Pair new device.',
        'Tap the earbuds name.',
      ],
      tip: 'Pixel phones support Google Fast Pair for supported earbuds, making pairing almost instant.',
    },
    'motorola': {
      steps: [
        'Put earbuds in pairing mode.',
        'Open Settings > Connected devices > Pair new device.',
        'Tap the earbuds name.',
        'Wait for connection.',
      ],
      tip: 'Keep the earbuds close to the phone during pairing for the best connection.',
    },
    'android-generic': {
      steps: [
        'Put your earbuds or AirPods into pairing mode.',
        'Open Settings > Bluetooth (or Connected devices).',
        'Tap "Pair new device".',
        'Select the earbuds from the list.',
        'Wait for "Connected".',
      ],
      tip: 'AirPods work with Android phones too, but you lose some features like automatic ear detection.',
    },
    'iphone-generic': {
      steps: [
        'For AirPods: open the case near your iPhone and tap "Connect".',
        'For other earbuds: put them in pairing mode, then go to Settings > Bluetooth.',
        'Tap the earbuds name.',
        'Wait for connection.',
      ],
      tip: 'If earbuds do not appear, press and hold the pairing button on them until the light blinks.',
    },
    'windows-pc': {
      steps: [
        'Put your earbuds in pairing mode.',
        'Click Start > Settings > Bluetooth & devices.',
        'Click "Add device" > "Bluetooth".',
        'Select your earbuds from the list.',
        'Click "Connect".',
      ],
      tip: 'Your Windows PC needs Bluetooth hardware to pair wireless earbuds. Most laptops have it built in.',
    },
    'mac': {
      steps: [
        'For AirPods: open the case near your Mac. Click "Connect" when the popup appears.',
        'For other earbuds: put them in pairing mode.',
        'Go to System Settings > Bluetooth.',
        'Click "Connect" next to the earbuds name.',
      ],
      tip: 'AirPods switch automatically between your Mac and iPhone based on which device is playing audio.',
    },
  },

  // ─── 36. scan-qr-code ─────────────────────────────────────────────────
  'scan-qr-code': {
    'iphone-16': {
      steps: [
        'Open the Camera app.',
        'Point the camera at the QR code.',
        'Hold the phone steady until a notification appears at the top.',
        'Tap the notification to open the link.',
      ],
      tip: 'You do not need a special app. The built-in Camera app scans QR codes automatically.',
    },
    'iphone-15': {
      steps: [
        'Open the Camera app.',
        'Aim at the QR code.',
        'Tap the banner that appears at the top.',
      ],
      tip: 'Make sure the QR code is well-lit and your camera lens is clean for the best results.',
    },
    'iphone-se': {
      steps: [
        'Open the Camera app.',
        'Point it at the QR code.',
        'Tap the yellow notification at the top.',
      ],
      tip: 'The Camera app on all iPhones with iOS 11 or later can scan QR codes.',
    },
    'ipad': {
      steps: [
        'Open the Camera app.',
        'Point the iPad camera at the QR code.',
        'Tap the notification that appears.',
      ],
      tip: 'Hold the iPad steady. The larger device can be harder to position over small QR codes.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Camera app.',
        'Point it at the QR code.',
        'A popup appears with the QR code content.',
        'Tap the popup to open the link.',
      ],
      tip: 'You can also swipe down twice and tap the "QR Scanner" Quick Settings tile.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open the Camera app.',
        'Point at the QR code.',
        'Tap the popup to follow the link.',
      ],
      tip: 'If the camera does not scan, go to Camera Settings and turn on "Scan QR codes".',
    },
    'google-pixel': {
      steps: [
        'Open the Camera app.',
        'Point it at the QR code.',
        'Tap the link that appears on screen.',
      ],
      tip: 'Google Lens in the Camera app can also identify text, plants, products, and more.',
    },
    'motorola': {
      steps: [
        'Open the Camera app.',
        'Point it at the QR code.',
        'Tap the popup notification.',
      ],
      tip: 'If scanning does not work, download "Google Lens" from the Play Store as an alternative.',
    },
    'android-generic': {
      steps: [
        'Open the Camera app.',
        'Point it at the QR code.',
        'If a popup appears, tap it.',
        'If not, try downloading Google Lens from the Play Store.',
      ],
      tip: 'Most modern Android phones scan QR codes automatically through the Camera app.',
    },
    'iphone-generic': {
      steps: [
        'Open the Camera app.',
        'Point at the QR code.',
        'Tap the notification that appears.',
      ],
      tip: 'No special app needed. The built-in Camera works for all QR codes.',
    },
    'windows-pc': {
      steps: [
        'Open a web browser.',
        'Go to webqr.com or a similar QR code reader website.',
        'Allow camera access or upload an image of the QR code.',
        'The website will decode the QR code.',
      ],
      tip: 'If you have the QR code as an image file, you can drag and drop it into an online reader.',
    },
    'mac': {
      steps: [
        'If the QR code is on screen, take a screenshot of it.',
        'Open the image in Preview.',
        'You can also use an online QR reader like webqr.com.',
        'On newer macOS, the Camera app or Visual Look Up may recognize QR codes.',
      ],
      tip: 'iPhones are generally easier for scanning QR codes than Macs.',
    },
  },

  // ─── 37. use-magnifier ─────────────────────────────────────────────────
  'use-magnifier': {
    'iphone-16': {
      steps: [
        'Open the Magnifier app (search for it or find it in Utilities).',
        'Point the camera at the small text or object.',
        'Use the slider at the bottom to zoom in.',
        'Tap the freeze button (circle) to freeze the image for easier reading.',
      ],
      tip: 'Add Magnifier to Control Center for quick access: Settings > Control Center > Add Magnifier.',
    },
    'iphone-15': {
      steps: [
        'Open the Magnifier app.',
        'Point your camera at what you want to magnify.',
        'Drag the zoom slider to get closer.',
        'Tap the circle to freeze the image.',
      ],
      tip: 'Magnifier has brightness and contrast controls to help read text in poor lighting.',
    },
    'iphone-se': {
      steps: [
        'Open the Magnifier app.',
        'Aim the camera.',
        'Use the slider to zoom.',
        'Tap to freeze the image.',
      ],
      tip: 'Triple-click the Home button to open Magnifier quickly if you set it up as an Accessibility Shortcut.',
    },
    'ipad': {
      steps: [
        'Open the Magnifier app.',
        'Point the iPad camera at the object.',
        'Use the zoom slider.',
        'Tap the freeze button.',
      ],
      tip: 'The iPad\'s larger screen makes Magnifier especially useful for reading small print.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Camera app.',
        'Pinch to zoom in on small text.',
        'For a dedicated magnifier, download "Magnifier" from the Play Store.',
        'Or go to Settings > Accessibility > Magnification and turn it on.',
      ],
      tip: 'With Magnification turned on, triple-tap the screen to zoom in on anything.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Go to Settings > Accessibility > Magnification.',
        'Turn on "Magnification shortcut".',
        'Triple-tap the screen to zoom in.',
        'Pinch with two fingers to adjust zoom level.',
      ],
      tip: 'This works on any screen, not just the camera. Great for reading small text in apps.',
    },
    'google-pixel': {
      steps: [
        'Go to Settings > Accessibility > Magnification.',
        'Turn on the magnification shortcut.',
        'Triple-tap the screen to activate.',
        'Drag two fingers to move around the zoomed view.',
      ],
      tip: 'You can also download a Magnifier app from the Play Store for camera-based magnification.',
    },
    'motorola': {
      steps: [
        'Go to Settings > Accessibility > Magnification.',
        'Turn it on.',
        'Triple-tap the screen to zoom in.',
        'Triple-tap again to zoom out.',
      ],
      tip: 'This accessibility feature is built into all Android phones and works on any screen.',
    },
    'android-generic': {
      steps: [
        'Open Settings > Accessibility > Magnification.',
        'Turn on the feature.',
        'Triple-tap the screen to zoom in.',
        'Triple-tap again to zoom out.',
      ],
      tip: 'For camera-based magnification, search "Magnifier" in the Google Play Store.',
    },
    'iphone-generic': {
      steps: [
        'Open the Magnifier app.',
        'Point the camera at small text.',
        'Use the zoom slider.',
        'Tap to freeze the image.',
      ],
      tip: 'Magnifier is one of the most useful accessibility features for reading medicine labels, menus, and more.',
    },
    'windows-pc': {
      steps: [
        'Press the Windows key and the + (plus) key at the same time.',
        'The Magnifier opens and zooms in on the screen.',
        'Use Windows key + plus to zoom in more.',
        'Use Windows key + minus to zoom out.',
        'Press Windows key + Esc to close the Magnifier.',
      ],
      tip: 'You can also find Magnifier in Start > Accessibility, or search for it.',
    },
    'mac': {
      steps: [
        'Go to System Settings > Accessibility > Zoom.',
        'Turn on "Use keyboard shortcuts to zoom".',
        'Press Option + Command + = (equals) to zoom in.',
        'Press Option + Command + - (minus) to zoom out.',
      ],
      tip: 'Hold the Control key and scroll with two fingers on the trackpad for a quick zoom.',
    },
  },

  // ─── 38. set-medication-reminder ───────────────────────────────────────
  'set-medication-reminder': {
    'iphone-16': {
      steps: [
        'Open the Health app.',
        'Tap the "Browse" tab at the bottom.',
        'Tap "Medications".',
        'Tap "Add a Medication".',
        'Search for and select your medication.',
        'Set the schedule (time of day and frequency).',
        'Tap "Done" to save. You will receive reminders at the scheduled times.',
      ],
      tip: 'The Health app can also track when you take your medication and alert you if you miss a dose.',
    },
    'iphone-15': {
      steps: [
        'Open the Health app.',
        'Tap "Browse" > "Medications".',
        'Tap "Add a Medication".',
        'Enter the medication name and schedule.',
        'Tap "Done".',
      ],
      tip: 'You can add multiple medications with different schedules.',
    },
    'iphone-se': {
      steps: [
        'Open the Health app.',
        'Go to Browse > Medications.',
        'Add your medication.',
        'Set the time and frequency.',
        'Save it.',
      ],
      tip: 'Make sure notifications are on for the Health app so you receive the reminders.',
    },
    'ipad': {
      steps: [
        'Open the Health app (if available) or use the Clock app.',
        'In the Clock app, set a recurring alarm for each medication time.',
        'Label the alarm with the medication name.',
        'Set it to repeat daily.',
      ],
      tip: 'The full Medications feature in the Health app may not be available on all iPads. Use alarms as an alternative.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Samsung Health app.',
        'Tap "Medications" (or find it in the Health section).',
        'Tap "Add medication".',
        'Enter the medication name.',
        'Set the dosage and schedule.',
        'Save it. You will get reminders at the right times.',
      ],
      tip: 'If Samsung Health does not have a Medications section, use the Clock app to set recurring alarms.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open the Clock app.',
        'Tap "Alarm".',
        'Create a new alarm for your medication time.',
        'Label it with the medication name.',
        'Set it to repeat on the days you need.',
        'Tap "Save".',
      ],
      tip: 'Create separate alarms for each medication if you take them at different times.',
    },
    'google-pixel': {
      steps: [
        'Say "Hey Google, remind me to take my medication every day at 8 AM."',
        'Or open the Clock app and set a recurring alarm.',
        'Label the alarm with the medication name.',
        'Set it to repeat daily.',
      ],
      tip: 'Google Assistant reminders pop up on your screen with a notification you can dismiss or snooze.',
    },
    'motorola': {
      steps: [
        'Open the Clock app.',
        'Create a new alarm.',
        'Set the time for your medication.',
        'Label it clearly.',
        'Set it to repeat daily.',
        'Save it.',
      ],
      tip: 'You can also download the "Medisafe" app from the Play Store for a full medication tracking solution.',
    },
    'android-generic': {
      steps: [
        'Open the Clock app.',
        'Create a new alarm at your medication time.',
        'Label it with the medication name.',
        'Set it to repeat every day (or specific days).',
        'Save the alarm.',
      ],
      tip: 'Apps like "Medisafe" or "MyTherapy" offer more advanced medication reminders with tracking.',
    },
    'iphone-generic': {
      steps: [
        'Open the Health app.',
        'Go to Browse > Medications.',
        'Add your medication.',
        'Set the schedule.',
        'Tap "Done".',
      ],
      tip: 'The Health app sends notifications when it is time to take your medication.',
    },
    'windows-pc': {
      steps: [
        'Open the Clock app from the Start menu.',
        'Click "Alarm".',
        'Create a new alarm for your medication time.',
        'Name it with the medication name.',
        'Set it to repeat daily.',
        'Keep your computer on for alarms to work.',
      ],
      tip: 'For more reliable medication reminders, use your phone instead. Computer alarms only work when the PC is on.',
    },
    'mac': {
      steps: [
        'Open the Reminders app.',
        'Click "+" to create a new reminder.',
        'Type your medication name.',
        'Click the "i" icon and set the date, time, and repeat schedule.',
        'Click "Done".',
      ],
      tip: 'Reminders syncs across all your Apple devices, so you will get alerts on your iPhone too.',
    },
  },

  // ─── 39. enable-emergency-sos ──────────────────────────────────────────
  'enable-emergency-sos': {
    'iphone-16': {
      steps: [
        'Open the Settings app.',
        'Tap "Emergency SOS".',
        'Make sure "Call with Hold and Release" is turned on.',
        'Optionally turn on "Call Quietly" to avoid the countdown alarm.',
        'Set up your emergency contacts in the Health app if you have not already.',
      ],
      tip: 'To use Emergency SOS, press and hold the side button and a volume button together. A countdown starts and calls 911.',
    },
    'iphone-15': {
      steps: [
        'Open Settings.',
        'Tap "Emergency SOS".',
        'Enable "Call with Hold and Release".',
        'Optionally set up Crash Detection.',
      ],
      tip: 'iPhone 15 models also have Crash Detection that can automatically call emergency services after a car accident.',
    },
    'iphone-se': {
      steps: [
        'Open Settings.',
        'Tap "Emergency SOS".',
        'Turn on "Call with Hold and Release".',
        'Set up emergency contacts in Health app.',
      ],
      tip: 'On iPhone SE, press the side button 5 times rapidly to trigger Emergency SOS.',
    },
    'ipad': {
      steps: [
        'Open Settings.',
        'Tap "Emergency SOS".',
        'Turn on "Call with Hold and Release".',
        'Note: iPad needs WiFi or cellular to make emergency calls.',
      ],
      tip: 'WiFi-only iPads can only call emergency services if connected to WiFi. Cellular iPads work like phones.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap "Safety and emergency".',
        'Tap "Emergency SOS".',
        'Toggle it on.',
        'Choose your emergency actions (call, message, share location).',
        'To trigger: press the side button 5 times quickly.',
      ],
      tip: 'Samsung SOS can also share your location with your emergency contacts automatically.',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Settings.',
        'Tap "Safety and emergency".',
        'Tap "Emergency SOS".',
        'Turn it on.',
        'Press the side button 5 times quickly to use it.',
      ],
      tip: 'Practice the 5-press trigger so you remember how to do it in an actual emergency.',
    },
    'google-pixel': {
      steps: [
        'Open Settings.',
        'Tap "Safety & emergency".',
        'Tap "Emergency SOS".',
        'Toggle it on.',
        'Choose what happens: play alarm, call 911, share location.',
        'Trigger: press the power button 5 times quickly.',
      ],
      tip: 'Pixel phones can also detect car crashes and automatically call emergency services.',
    },
    'motorola': {
      steps: [
        'Open Settings.',
        'Tap "Safety & emergency".',
        'Tap "Emergency SOS".',
        'Turn it on.',
        'The trigger is pressing the power button 5 times.',
      ],
      tip: 'Make sure Emergency SOS has the correct phone number for your country.',
    },
    'android-generic': {
      steps: [
        'Open Settings.',
        'Search for "Emergency SOS".',
        'Turn it on.',
        'Configure the trigger (usually pressing the power button 5 times).',
        'Set up your emergency actions.',
      ],
      tip: 'Most Android phones have Emergency SOS. The exact location in settings varies by brand.',
    },
    'iphone-generic': {
      steps: [
        'Open Settings.',
        'Tap "Emergency SOS".',
        'Enable "Call with Hold and Release".',
        'Set up emergency contacts in the Health app.',
      ],
      tip: 'Emergency SOS works even when your phone is locked.',
    },
  },

  // ─── 40. back-up-phone ─────────────────────────────────────────────────
  'back-up-phone': {
    'iphone-16': {
      steps: [
        'Make sure you are connected to WiFi.',
        'Open the Settings app.',
        'Tap your name at the top.',
        'Tap "iCloud".',
        'Tap "iCloud Backup".',
        'Turn on "Back Up This iPhone".',
        'Tap "Back Up Now" to start an immediate backup.',
      ],
      tip: 'iCloud backups happen automatically every night when your phone is charging and on WiFi.',
    },
    'iphone-15': {
      steps: [
        'Connect to WiFi.',
        'Open Settings > [Your Name] > iCloud > iCloud Backup.',
        'Turn on iCloud Backup.',
        'Tap "Back Up Now".',
      ],
      tip: 'Apple gives you 5 GB of free iCloud storage. You may need to buy more for a full backup.',
    },
    'iphone-se': {
      steps: [
        'Connect to WiFi.',
        'Go to Settings > [Your Name] > iCloud > iCloud Backup.',
        'Turn it on.',
        'Tap "Back Up Now".',
      ],
      tip: 'You can also back up to a computer using Finder (Mac) or iTunes (Windows).',
    },
    'ipad': {
      steps: [
        'Connect to WiFi.',
        'Open Settings > [Your Name] > iCloud > iCloud Backup.',
        'Toggle on.',
        'Tap "Back Up Now".',
      ],
      tip: 'iPad backups can be large. Make sure you have enough iCloud storage.',
    },
    'samsung-galaxy-s25': {
      steps: [
        'Open the Settings app.',
        'Tap your Samsung account at the top.',
        'Tap "Samsung Cloud".',
        'Tap "Back up data".',
        'Choose what to back up.',
        'Tap "Back up now".',
      ],
      tip: 'Also back up to Google: Settings > Google > Backup and turn on "Google One Backup".',
    },
    'samsung-galaxy-a': {
      steps: [
        'Open Settings.',
        'Tap "Accounts and backup".',
        'Tap "Back up data" (Samsung Cloud or Google).',
        'Select items to back up.',
        'Tap "Back up now".',
      ],
      tip: 'Use both Samsung Cloud and Google Backup for double protection.',
    },
    'google-pixel': {
      steps: [
        'Open Settings.',
        'Tap "System".',
        'Tap "Backup".',
        'Make sure "Backup by Google One" is turned on.',
        'Tap "Back up now".',
      ],
      tip: 'Google backs up your contacts, apps, and settings automatically. Photos are backed up through Google Photos.',
    },
    'motorola': {
      steps: [
        'Open Settings.',
        'Tap "System" (or "Google").',
        'Tap "Backup".',
        'Turn on Google Backup.',
        'Tap "Back up now".',
      ],
      tip: 'Google Backup is free and includes contacts, apps, and settings.',
    },
    'android-generic': {
      steps: [
        'Open Settings.',
        'Tap "System" or "Google".',
        'Tap "Backup".',
        'Make sure backup is turned on.',
        'Tap "Back up now".',
      ],
      tip: 'Back up your photos separately using Google Photos, as the system backup does not always include all photos.',
    },
    'iphone-generic': {
      steps: [
        'Connect to WiFi.',
        'Go to Settings > [Your Name] > iCloud > iCloud Backup.',
        'Turn on iCloud Backup.',
        'Tap "Back Up Now".',
      ],
      tip: 'Regular backups protect your photos, messages, and settings in case your phone is lost or damaged.',
    },
    'windows-pc': {
      steps: [
        'Click Start and open Settings.',
        'Click "Accounts".',
        'Click "Windows backup".',
        'Turn on "Remember my preferences" and other backup options.',
        'For full backups, use File History: Settings > System > Storage > Advanced > Backup options.',
        'Connect an external hard drive for local backup.',
      ],
      tip: 'OneDrive automatically backs up your Desktop, Documents, and Pictures folders to the cloud.',
    },
    'mac': {
      steps: [
        'Connect an external hard drive to your Mac.',
        'Click the Apple menu and choose "System Settings".',
        'Click "General" then "Time Machine".',
        'Click "Add Backup Disk" and select your drive.',
        'Time Machine begins backing up automatically.',
      ],
      tip: 'Time Machine backs up everything on your Mac and lets you go back in time to recover files.',
    },
  },
}

// ── Merge expansion instructions ─────────────────────────────────────────────

for (const [taskSlug, deviceMap] of Object.entries(EXPANSION_INSTRUCTIONS)) {
  if (!INSTRUCTIONS[taskSlug]) {
    INSTRUCTIONS[taskSlug] = {}
  }
  Object.assign(INSTRUCTIONS[taskSlug], deviceMap)
}

// ── Public API ─────────────────────────────────────────────────────────────────

export function getDevice(slug: string): Device | undefined {
  return DEVICES.find((d) => d.slug === slug)
}

export function getTask(slug: string): Task | undefined {
  return TASKS.find((t) => t.slug === slug)
}

export function getInstruction(taskSlug: string, deviceSlug: string): Instruction | null {
  return INSTRUCTIONS[taskSlug]?.[deviceSlug] ?? null
}

export function getDevicesForTask(taskSlug: string): Device[] {
  const taskInstructions = INSTRUCTIONS[taskSlug]
  if (!taskInstructions) return []
  return DEVICES.filter((d) => d.slug in taskInstructions)
}

export function getTasksForDevice(deviceSlug: string): Task[] {
  return TASKS.filter((t) => INSTRUCTIONS[t.slug]?.[deviceSlug])
}

export function getAllValidPairs(): Array<{ task: string; device: string }> {
  const pairs: Array<{ task: string; device: string }> = []
  for (const taskSlug of Object.keys(INSTRUCTIONS)) {
    for (const deviceSlug of Object.keys(INSTRUCTIONS[taskSlug])) {
      pairs.push({ task: taskSlug, device: deviceSlug })
    }
  }
  return pairs
}

export function getTasksByCategory(): Record<string, Task[]> {
  const map: Record<string, Task[]> = {}
  for (const task of TASKS) {
    if (!map[task.category]) map[task.category] = []
    map[task.category].push(task)
  }
  return map
}
