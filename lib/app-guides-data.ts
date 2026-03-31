// ── App Guides Data ──────────────────────────────────────────────────────────
// "How to use {app} on {device} for seniors" — 15 apps x 6 devices = 90 guides

export interface AppInfo {
  slug: string
  name: string
  category: string
  icon: string
  description: string
  website: string
  free: boolean
  seniorFriendly: number
}

export interface DeviceInfo {
  slug: string
  name: string
  icon: string
}

export interface AppGuideStep {
  title: string
  description: string
}

export interface AppGuide {
  appSlug: string
  deviceSlug: string
  downloadSteps: string[]
  setupSteps: AppGuideStep[]
  basicUsage: AppGuideStep[]
  seniorTips: string[]
  commonIssues: { problem: string; solution: string }[]
}

// ── Apps ─────────────────────────────────────────────────────────────────────

export const APPS: AppInfo[] = [
  {
    slug: 'whatsapp',
    name: 'WhatsApp',
    category: 'communication',
    icon: '💬',
    description: 'Send free text messages, voice messages, photos, and make video calls to anyone in the world.',
    website: 'https://www.whatsapp.com',
    free: true,
    seniorFriendly: 4,
  },
  {
    slug: 'zoom',
    name: 'Zoom',
    category: 'communication',
    icon: '📹',
    description: 'Join video meetings with family, friends, doctors, or community groups from anywhere.',
    website: 'https://zoom.us',
    free: true,
    seniorFriendly: 3,
  },
  {
    slug: 'facetime',
    name: 'FaceTime',
    category: 'communication',
    icon: '📞',
    description: 'Make free video and audio calls to other Apple device users with crystal-clear quality.',
    website: 'https://support.apple.com/facetime',
    free: true,
    seniorFriendly: 5,
  },
  {
    slug: 'facebook-messenger',
    name: 'Facebook Messenger',
    category: 'communication',
    icon: '💭',
    description: 'Chat with Facebook friends, send photos, and make free video calls all in one app.',
    website: 'https://www.messenger.com',
    free: true,
    seniorFriendly: 3,
  },
  {
    slug: 'facebook',
    name: 'Facebook',
    category: 'social',
    icon: '👥',
    description: 'Stay connected with family and friends, share photos, and join community groups.',
    website: 'https://www.facebook.com',
    free: true,
    seniorFriendly: 3,
  },
  {
    slug: 'instagram',
    name: 'Instagram',
    category: 'social',
    icon: '📸',
    description: 'Share photos and short videos with family and friends, and discover new content.',
    website: 'https://www.instagram.com',
    free: true,
    seniorFriendly: 3,
  },
  {
    slug: 'youtube',
    name: 'YouTube',
    category: 'social',
    icon: '▶️',
    description: 'Watch free videos on any topic — tutorials, music, news, cooking, and entertainment.',
    website: 'https://www.youtube.com',
    free: true,
    seniorFriendly: 4,
  },
  {
    slug: 'gmail',
    name: 'Gmail',
    category: 'productivity',
    icon: '📧',
    description: 'Send and receive emails for free with Google\'s reliable and easy-to-use email service.',
    website: 'https://mail.google.com',
    free: true,
    seniorFriendly: 4,
  },
  {
    slug: 'google-maps',
    name: 'Google Maps',
    category: 'productivity',
    icon: '🗺️',
    description: 'Get turn-by-turn directions, find nearby businesses, and explore places before you visit.',
    website: 'https://maps.google.com',
    free: true,
    seniorFriendly: 4,
  },
  {
    slug: 'google-photos',
    name: 'Google Photos',
    category: 'productivity',
    icon: '🖼️',
    description: 'Store, organize, and share your photos and videos with automatic backup to the cloud.',
    website: 'https://photos.google.com',
    free: true,
    seniorFriendly: 4,
  },
  {
    slug: 'amazon',
    name: 'Amazon',
    category: 'shopping',
    icon: '🛒',
    description: 'Shop for almost anything online with home delivery — from groceries to electronics.',
    website: 'https://www.amazon.com',
    free: true,
    seniorFriendly: 3,
  },
  {
    slug: 'uber-lyft',
    name: 'Uber / Lyft',
    category: 'shopping',
    icon: '🚗',
    description: 'Request a ride to anywhere — a modern taxi service you book from your phone.',
    website: 'https://www.uber.com',
    free: true,
    seniorFriendly: 3,
  },
  {
    slug: 'zelle-venmo',
    name: 'Zelle / Venmo',
    category: 'finance',
    icon: '💰',
    description: 'Send money to family and friends instantly using just their phone number or email.',
    website: 'https://www.zellepay.com',
    free: true,
    seniorFriendly: 3,
  },
  {
    slug: 'netflix',
    name: 'Netflix',
    category: 'entertainment',
    icon: '🎬',
    description: 'Watch thousands of movies, TV shows, and documentaries on demand for a monthly fee.',
    website: 'https://www.netflix.com',
    free: false,
    seniorFriendly: 4,
  },
  {
    slug: 'spotify',
    name: 'Spotify',
    category: 'entertainment',
    icon: '🎵',
    description: 'Listen to millions of songs, podcasts, and audiobooks — free with ads or ad-free with a subscription.',
    website: 'https://www.spotify.com',
    free: true,
    seniorFriendly: 3,
  },
]

// ── Devices ──────────────────────────────────────────────────────────────────

export const DEVICES: DeviceInfo[] = [
  { slug: 'iphone', name: 'iPhone', icon: '📱' },
  { slug: 'ipad', name: 'iPad', icon: '📲' },
  { slug: 'android-phone', name: 'Android Phone', icon: '🤖' },
  { slug: 'windows-pc', name: 'Windows PC', icon: '💻' },
  { slug: 'mac', name: 'Mac', icon: '🖥️' },
  { slug: 'chromebook', name: 'Chromebook', icon: '💻' },
]

// ── Category metadata ────────────────────────────────────────────────────────

export const APP_CATEGORY_LABELS: Record<string, string> = {
  communication: 'Communication',
  social: 'Social Media',
  productivity: 'Productivity',
  shopping: 'Shopping',
  finance: 'Finance',
  entertainment: 'Entertainment',
}

export const APP_CATEGORY_ICONS: Record<string, string> = {
  communication: '💬',
  social: '👥',
  productivity: '⚡',
  shopping: '🛍️',
  finance: '💳',
  entertainment: '🎭',
}

// ── Guide data for all 90 combinations ───────────────────────────────────────

export const APP_GUIDES: AppGuide[] = [
  // ─── WhatsApp ────────────────────────────────────────────────────────────
  {
    appSlug: 'whatsapp',
    deviceSlug: 'iphone',
    downloadSteps: [
      'Open the App Store (blue icon with a white "A").',
      'Tap the Search tab at the bottom right.',
      'Type "WhatsApp" and tap Search.',
      'Tap "Get" next to WhatsApp Messenger, then confirm with Face ID, Touch ID, or your Apple ID password.',
      'Wait for the app to download and install.',
    ],
    setupSteps: [
      { title: 'Open WhatsApp', description: 'Tap the green WhatsApp icon on your home screen.' },
      { title: 'Agree to the terms', description: 'Tap "Agree & Continue" to accept the terms of service.' },
      { title: 'Enter your phone number', description: 'Select your country, type your phone number, and tap "Done." WhatsApp will send you a 6-digit code via text message.' },
      { title: 'Enter the verification code', description: 'WhatsApp may detect the code automatically. If not, type the 6-digit code from the text message you received.' },
      { title: 'Set up your profile', description: 'Add your name (this is what others will see) and optionally a profile photo. Tap "Done."' },
    ],
    basicUsage: [
      { title: 'Send a message', description: 'Tap the pencil icon (top right) to start a new chat. Choose a contact from your list and type your message at the bottom. Tap the blue arrow to send.' },
      { title: 'Make a voice call', description: 'Open a chat with the person you want to call. Tap the phone icon at the top right to start a free voice call.' },
      { title: 'Make a video call', description: 'Open a chat and tap the video camera icon at the top right. Your front camera will turn on so the other person can see you.' },
      { title: 'Send a photo', description: 'In a chat, tap the "+" icon at the bottom left, then tap "Photos." Choose a photo from your library and tap the blue arrow to send.' },
      { title: 'Send a voice message', description: 'In a chat, press and hold the microphone icon on the right side. Speak your message, then release to send it.' },
    ],
    seniorTips: [
      'Increase text size: Go to iPhone Settings > Display & Brightness > Text Size and drag the slider to the right for larger text in WhatsApp.',
      'Pin important chats: Swipe right on a chat and tap the pin icon to keep your most-used conversations at the top of the list.',
      'Use voice messages when typing feels difficult — just hold the microphone button and talk.',
      'Enable read receipts (blue check marks) in Settings > Privacy so you know when your message was read.',
    ],
    commonIssues: [
      { problem: 'I am not receiving the verification code', solution: 'Make sure your phone number is correct and includes the country code. Check that your phone has a cellular signal. Try the "Call me" option instead, which will read the code to you in a phone call.' },
      { problem: 'My contacts are not showing up', solution: 'Go to iPhone Settings > WhatsApp > Contacts and make sure the toggle is turned on. Your contacts also need to have WhatsApp installed on their phones.' },
      { problem: 'Calls and video are poor quality', solution: 'Make sure you are connected to Wi-Fi for the best quality. Close other apps that might be using the internet. If on cellular data, move to an area with better signal.' },
    ],
  },
  {
    appSlug: 'whatsapp',
    deviceSlug: 'ipad',
    downloadSteps: [
      'Open the App Store on your iPad.',
      'Tap the Search tab at the bottom right.',
      'Type "WhatsApp" and tap Search.',
      'Tap "Get" next to WhatsApp Messenger and confirm with Face ID, Touch ID, or your Apple ID password.',
      'Wait for it to download and install.',
    ],
    setupSteps: [
      { title: 'Open WhatsApp', description: 'Tap the green WhatsApp icon on your home screen.' },
      { title: 'Agree to the terms', description: 'Tap "Agree & Continue" to accept the terms of service.' },
      { title: 'Link to your phone', description: 'WhatsApp on iPad works as a linked device. Open WhatsApp on your phone, go to Settings > Linked Devices > Link a Device, and scan the QR code shown on your iPad.' },
      { title: 'Wait for sync', description: 'Your messages and contacts will sync from your phone. This may take a few minutes depending on how many messages you have.' },
    ],
    basicUsage: [
      { title: 'Send a message', description: 'Tap the compose icon at the top to start a new chat. Select a contact and type your message in the text field at the bottom. Tap the send arrow.' },
      { title: 'Make a voice call', description: 'Open a conversation and tap the phone icon at the top right corner to start a free voice call.' },
      { title: 'Make a video call', description: 'Open a conversation and tap the video camera icon at the top right. The iPad\'s front camera will activate.' },
      { title: 'Send a photo', description: 'In a chat, tap the "+" button, select "Photo & Video Library," choose your photo, and tap the send arrow.' },
      { title: 'View on the big screen', description: 'The iPad\'s larger screen makes it easy to read messages. Use the sidebar on the left to switch between conversations quickly.' },
    ],
    seniorTips: [
      'The iPad\'s larger screen makes WhatsApp much easier to read than on a phone.',
      'Use Split View to have WhatsApp open alongside another app — swipe up from the bottom to see the Dock, then drag WhatsApp to one side of the screen.',
      'Connect a Bluetooth keyboard to your iPad for easier typing of longer messages.',
      'Increase text size in iPad Settings > Display & Brightness > Text Size for even larger text.',
    ],
    commonIssues: [
      { problem: 'I cannot link my iPad to WhatsApp', solution: 'Make sure WhatsApp on your phone is updated to the latest version. Both devices need to be connected to the internet. On your phone, go to WhatsApp Settings > Linked Devices and try again.' },
      { problem: 'My messages are not syncing', solution: 'Keep your phone connected to the internet and powered on. The initial sync can take several minutes. If it stalls, close and reopen WhatsApp on both devices.' },
      { problem: 'Video calls are choppy', solution: 'Connect your iPad to Wi-Fi instead of using cellular data. Close other apps that might be using bandwidth. Make sure nothing is covering the iPad\'s microphone or camera.' },
    ],
  },
  {
    appSlug: 'whatsapp',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'Open the Google Play Store (colorful triangle icon).',
      'Tap the search bar at the top.',
      'Type "WhatsApp" and tap the search icon.',
      'Tap "Install" next to WhatsApp Messenger by WhatsApp LLC.',
      'Wait for the app to download and install. Tap "Open" when done.',
    ],
    setupSteps: [
      { title: 'Open WhatsApp', description: 'Tap the green WhatsApp icon on your home screen or in your app drawer.' },
      { title: 'Agree to the terms', description: 'Tap "Agree and Continue" to accept the terms of service.' },
      { title: 'Grant permissions', description: 'WhatsApp will ask for access to your contacts, photos, and notifications. Tap "Allow" for each to get the full experience.' },
      { title: 'Enter your phone number', description: 'Select your country, enter your phone number, and tap the green arrow. WhatsApp will send a 6-digit verification code via text.' },
      { title: 'Set up your profile', description: 'Enter your name and optionally add a profile photo. Tap "Next" to finish setup.' },
    ],
    basicUsage: [
      { title: 'Send a message', description: 'Tap the green chat bubble icon at the bottom right to start a new chat. Select a contact and type your message. Tap the green arrow to send.' },
      { title: 'Make a voice call', description: 'Open a chat and tap the phone icon at the top right for a free voice call over the internet.' },
      { title: 'Make a video call', description: 'Open a chat and tap the video camera icon at the top right. Allow camera access if asked.' },
      { title: 'Send a photo', description: 'In a chat, tap the paperclip icon, then "Gallery." Choose a photo and tap the green arrow to send.' },
      { title: 'Send a voice message', description: 'Press and hold the microphone icon on the right side of the text field. Speak your message and release to send.' },
      { title: 'Create a group', description: 'Tap the three dots at the top right, then "New group." Select the contacts you want to include and give the group a name.' },
    ],
    seniorTips: [
      'Make text bigger: Go to Android Settings > Display > Font Size and choose a larger option. This makes WhatsApp text bigger too.',
      'Use voice messages instead of typing — press and hold the microphone icon and speak naturally.',
      'Star important messages by pressing and holding a message, then tapping the star icon. Find them later in Settings > Starred Messages.',
      'Turn on large keyboard: Go to Android Settings > System > Languages & Input > On-screen keyboard > your keyboard > Preferences > set to a larger size.',
    ],
    commonIssues: [
      { problem: 'I am not getting notifications', solution: 'Go to Android Settings > Apps > WhatsApp > Notifications and make sure all notifications are turned on. Also check that Battery Optimization is turned off for WhatsApp (Settings > Battery > Battery Optimization > WhatsApp > Don\'t Optimize).' },
      { problem: 'The verification code never arrives', solution: 'Wait the full 60 seconds. Make sure your phone number is correct with the country code. Try the "Call me" option which will read the code to you via a phone call. Make sure your phone has cell signal.' },
      { problem: 'WhatsApp is using too much storage', solution: 'Open WhatsApp > Settings > Storage and Data > Manage Storage. Delete large files and old media you no longer need. Turn off automatic media download to save space.' },
    ],
  },
  {
    appSlug: 'whatsapp',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'Open the Microsoft Store (shopping bag icon on your taskbar or search for it).',
      'Search for "WhatsApp" in the search bar.',
      'Click "Get" or "Install" next to WhatsApp Desktop.',
      'Wait for it to download and install.',
      'Click "Open" or find WhatsApp in your Start menu.',
    ],
    setupSteps: [
      { title: 'Open WhatsApp Desktop', description: 'Click the WhatsApp icon in your Start menu or on your desktop.' },
      { title: 'Scan the QR code', description: 'A QR code will appear on your computer screen. You need to scan this with your phone.' },
      { title: 'Link from your phone', description: 'Open WhatsApp on your phone. Go to Settings > Linked Devices > Link a Device. Point your phone camera at the QR code on your computer screen.' },
      { title: 'Wait for sync', description: 'Your messages will sync from your phone to the computer. This may take a few minutes.' },
    ],
    basicUsage: [
      { title: 'Send a message', description: 'Click the new chat icon (pencil icon) at the top of the chat list. Select a contact and type your message in the text field at the bottom. Press Enter to send.' },
      { title: 'Make a voice call', description: 'Open a conversation and click the phone icon at the top right of the chat window.' },
      { title: 'Make a video call', description: 'Open a conversation and click the video camera icon at the top right. Allow access to your webcam and microphone if prompted.' },
      { title: 'Send a file', description: 'Click the paperclip icon in the chat, then choose "Document" to send a file from your computer, or "Photos & Videos" for images.' },
      { title: 'Use keyboard shortcuts', description: 'Press Ctrl+N to start a new chat, Ctrl+Shift+M to mute a chat, and Ctrl+E to archive a conversation.' },
    ],
    seniorTips: [
      'Using WhatsApp on a computer is great because you have a full keyboard for typing longer messages.',
      'You can zoom in on the WhatsApp window by pressing Ctrl and the "+" key to make everything bigger and easier to read.',
      'Drag and drop photos from your computer directly into a chat window to share them quickly.',
      'Keep your phone charged and connected to the internet — WhatsApp Desktop needs your phone to stay linked.',
    ],
    commonIssues: [
      { problem: 'The QR code is not scanning', solution: 'Make sure your phone camera is clean and steady. Hold it about 6 inches from the screen. If the QR code expired, click "Reload QR code" on the computer. Make sure both devices are connected to the internet.' },
      { problem: 'WhatsApp Desktop keeps disconnecting', solution: 'Check that your phone is connected to the internet and has battery. In your phone\'s WhatsApp Settings > Linked Devices, make sure your computer is still listed. If not, link it again.' },
      { problem: 'I cannot hear audio during calls', solution: 'Check that your computer speakers or headphones are working. Click the sound icon in the Windows taskbar to verify volume. In WhatsApp, make sure the correct microphone and speaker are selected in call settings.' },
    ],
  },
  {
    appSlug: 'whatsapp',
    deviceSlug: 'mac',
    downloadSteps: [
      'Open the App Store on your Mac (blue icon with a white "A" in the Dock).',
      'Search for "WhatsApp" in the search bar.',
      'Click "Get" next to WhatsApp Desktop and confirm with your Apple ID password or Touch ID.',
      'Wait for the app to download and install.',
      'Open WhatsApp from your Applications folder or Launchpad.',
    ],
    setupSteps: [
      { title: 'Open WhatsApp', description: 'Click the WhatsApp icon in your Dock, Applications folder, or Launchpad.' },
      { title: 'Scan the QR code', description: 'A QR code will appear on your Mac screen.' },
      { title: 'Link from your phone', description: 'Open WhatsApp on your phone. Go to Settings > Linked Devices > Link a Device. Point your phone\'s camera at the QR code on your Mac.' },
      { title: 'Wait for sync', description: 'Your conversations will sync. This may take a few minutes depending on how many messages you have.' },
    ],
    basicUsage: [
      { title: 'Send a message', description: 'Click the compose button (pencil icon) at the top. Select a contact and type your message. Press Return to send.' },
      { title: 'Make a voice call', description: 'Open any chat and click the phone icon at the top right to start a free voice call.' },
      { title: 'Make a video call', description: 'Open a chat and click the video camera icon. Grant camera and microphone access if your Mac asks.' },
      { title: 'Send photos or files', description: 'Click the paperclip icon in the chat and choose files from your Mac. You can also drag and drop photos directly into the chat.' },
      { title: 'Search messages', description: 'Press Command+F to search through your messages. Type a word or name to find specific conversations.' },
    ],
    seniorTips: [
      'Press Command and "+" together to zoom in and make text larger, or Command and "-" to zoom out.',
      'Use the Mac\'s dictation feature: press the Fn key twice and speak your message instead of typing.',
      'Pin your most important chats by right-clicking on them and selecting "Pin Chat" so they stay at the top.',
      'WhatsApp on Mac works independently once linked — your phone does not need to stay on or connected.',
    ],
    commonIssues: [
      { problem: 'WhatsApp is not opening on my Mac', solution: 'Make sure your Mac is running macOS 10.15 or later. Check for updates in System Settings > Software Update. Try deleting and reinstalling WhatsApp from the App Store.' },
      { problem: 'I cannot scan the QR code with my phone', solution: 'Make sure WhatsApp on your phone is updated to the latest version. Clean your phone\'s camera lens. Hold the phone steady about 6 inches from the Mac screen. Try dimming the Mac screen slightly if there is too much glare.' },
      { problem: 'Notifications are not showing up', solution: 'Go to Mac System Settings > Notifications > WhatsApp and make sure "Allow Notifications" is turned on. Check that Do Not Disturb is not active by clicking the Control Center icon in the menu bar.' },
    ],
  },
  {
    appSlug: 'whatsapp',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'Open the Google Play Store from your Chromebook\'s app launcher.',
      'Search for "WhatsApp" in the search bar.',
      'Click "Install" next to WhatsApp Messenger.',
      'Wait for it to download. You can also use WhatsApp Web as an alternative.',
    ],
    setupSteps: [
      { title: 'Open WhatsApp', description: 'Click the WhatsApp icon in your app launcher or shelf.' },
      { title: 'Choose setup method', description: 'If using the Android app, enter your phone number to verify. If using WhatsApp Web (web.whatsapp.com in Chrome), scan the QR code with your phone.' },
      { title: 'Verify your number', description: 'For the Android app: enter your phone number and the 6-digit code sent via text. For WhatsApp Web: open WhatsApp on your phone > Settings > Linked Devices > Link a Device and scan the QR code.' },
      { title: 'Set up your profile', description: 'Add your name and an optional profile photo. Tap "Next" to complete setup.' },
    ],
    basicUsage: [
      { title: 'Send a message', description: 'Click the new chat icon, select a contact, type your message, and press Enter to send.' },
      { title: 'Make a voice call', description: 'Open a conversation and click the phone icon. Allow microphone access if your Chromebook asks.' },
      { title: 'Make a video call', description: 'Open a conversation and click the video icon. Allow camera and microphone access when prompted.' },
      { title: 'Send a photo', description: 'Click the attachment icon (paperclip) in a chat, choose a photo from your Chromebook\'s files, and send it.' },
      { title: 'Use the keyboard', description: 'The Chromebook\'s full keyboard makes typing messages fast and comfortable. Press Enter to send.' },
    ],
    seniorTips: [
      'If the Play Store app feels small, try WhatsApp Web at web.whatsapp.com in the Chrome browser instead — it fills the whole screen.',
      'Press Ctrl and "+" to zoom in and make everything on the screen bigger.',
      'Chromebooks are very secure — WhatsApp data is protected by Chrome OS\'s built-in security features.',
      'Use the Chromebook\'s built-in voice typing: press the microphone icon on the keyboard to dictate messages.',
    ],
    commonIssues: [
      { problem: 'WhatsApp is not available in the Play Store', solution: 'Make sure Google Play Store is enabled on your Chromebook. Go to Settings > Apps > Google Play Store and turn it on. If your Chromebook does not support Android apps, use WhatsApp Web at web.whatsapp.com instead.' },
      { problem: 'The app window is too small', solution: 'Click and drag the corner of the WhatsApp window to resize it. Alternatively, use WhatsApp Web in the Chrome browser for a full-screen experience.' },
      { problem: 'I am not getting notifications', solution: 'Check Chromebook Settings > Notifications and make sure WhatsApp notifications are allowed. If using WhatsApp Web, make sure the Chrome tab is not muted.' },
    ],
  },

  // ─── Zoom ────────────────────────────────────────────────────────────────
  {
    appSlug: 'zoom',
    deviceSlug: 'iphone',
    downloadSteps: [
      'Open the App Store on your iPhone.',
      'Tap the Search tab at the bottom right.',
      'Type "Zoom" and tap Search.',
      'Find "Zoom Workplace" by Zoom Video Communications and tap "Get."',
      'Confirm with Face ID, Touch ID, or your Apple ID password. Wait for it to install.',
    ],
    setupSteps: [
      { title: 'Open Zoom', description: 'Tap the blue Zoom icon on your home screen.' },
      { title: 'Sign up or sign in', description: 'Tap "Sign Up" to create a free account using your email address, or tap "Sign In" if you already have an account. You can also tap "Sign In with Google" or "Sign In with Apple" for easier setup.' },
      { title: 'Allow permissions', description: 'When prompted, allow Zoom to access your camera, microphone, and notifications. These are needed for video calls.' },
      { title: 'Set up your profile', description: 'Add your name and optionally a profile picture so others know who you are in meetings.' },
    ],
    basicUsage: [
      { title: 'Join a meeting', description: 'Tap "Join" on the home screen. Enter the Meeting ID number and your display name. Tap "Join." You may need to enter a passcode — check the invitation email or message you received.' },
      { title: 'Start a new meeting', description: 'Tap "New Meeting" on the home screen. Toggle "Video On" if you want others to see you. Tap "Start a Meeting" and share the meeting link with others.' },
      { title: 'Mute and unmute', description: 'During a meeting, tap anywhere on the screen to show the controls. Tap the microphone icon at the bottom left to mute or unmute yourself.' },
      { title: 'Turn camera on or off', description: 'Tap the video camera icon at the bottom to turn your camera on or off during a meeting.' },
      { title: 'Leave a meeting', description: 'Tap "Leave" in the top right corner, then confirm by tapping "Leave Meeting."' },
    ],
    seniorTips: [
      'Join 5 minutes early to test your audio and video before the meeting starts.',
      'Use "Speaker View" instead of "Gallery View" to see one person at a time — it is less overwhelming. Swipe left or right to switch views.',
      'If you hear an echo, mute yourself when you are not speaking. This also helps everyone else hear better.',
      'Write down the Meeting ID and passcode on paper before the meeting so you do not have to search for it.',
    ],
    commonIssues: [
      { problem: 'Nobody can hear me', solution: 'Make sure you are not muted — look for the microphone icon at the bottom. If it has a red line through it, tap it to unmute. Also check that Zoom has microphone permission in iPhone Settings > Zoom > Microphone.' },
      { problem: 'I cannot see the other person', solution: 'Make sure your internet connection is strong (Wi-Fi is best). The other person may have their camera turned off. You can ask them in the chat to turn their video on.' },
      { problem: 'The meeting says "invalid Meeting ID"', solution: 'Double-check the Meeting ID number — it is usually 9 to 11 digits. Make sure there are no extra spaces. If you received a link instead, tap the link directly rather than entering the ID manually.' },
    ],
  },
  {
    appSlug: 'zoom',
    deviceSlug: 'ipad',
    downloadSteps: [
      'Open the App Store on your iPad.',
      'Tap the Search tab and type "Zoom."',
      'Find "Zoom Workplace" and tap "Get."',
      'Confirm with Face ID, Touch ID, or your Apple ID password.',
      'Wait for the app to install.',
    ],
    setupSteps: [
      { title: 'Open Zoom', description: 'Tap the blue Zoom icon on your home screen.' },
      { title: 'Sign up or sign in', description: 'Create a free account with your email, or sign in with Google or Apple for quick setup.' },
      { title: 'Allow permissions', description: 'Tap "Allow" when asked for camera, microphone, and notification access.' },
      { title: 'Test your setup', description: 'Tap "New Meeting" to start a test call and check that your camera and microphone are working properly on the iPad.' },
    ],
    basicUsage: [
      { title: 'Join a meeting', description: 'Tap "Join" on the home screen. Type in the Meeting ID from your invitation and tap "Join." Enter the passcode if required.' },
      { title: 'Enjoy the big screen', description: 'The iPad\'s larger screen lets you see more participants at once. Use Gallery View to see everyone in a grid layout.' },
      { title: 'Use the chat', description: 'During a meeting, tap "More" at the bottom, then "Chat" to send text messages to other participants without interrupting the speaker.' },
      { title: 'Share your screen', description: 'Tap "Share Content" at the bottom to show others what is on your iPad — useful for showing photos or documents.' },
      { title: 'Use a stand', description: 'Prop your iPad up with a stand or case so you can see the screen hands-free during long calls.' },
    ],
    seniorTips: [
      'Use a tablet stand so your iPad stays steady during calls — it is more comfortable than holding it.',
      'The iPad\'s front camera is centered at the top, so look toward it when speaking to make eye contact with others.',
      'Connect earphones or AirPods for better audio and to avoid echo in the room.',
      'Tap the screen once to show the meeting controls, then tap "Speaker View" to focus on the person talking.',
    ],
    commonIssues: [
      { problem: 'My face appears too dark on camera', solution: 'Face a window or lamp so light shines on your face, not behind you. Avoid sitting with a bright window behind you as it creates a silhouette.' },
      { problem: 'The app closes during a meeting', solution: 'Make sure your iPad has enough battery — plug it in during long calls. Close other apps to free up memory. Update Zoom to the latest version in the App Store.' },
      { problem: 'I cannot find the meeting controls', solution: 'Tap anywhere on the screen during a meeting to show the controls at the bottom. They hide automatically after a few seconds to give you more screen space.' },
    ],
  },
  {
    appSlug: 'zoom',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'Open the Google Play Store.',
      'Search for "Zoom" in the search bar.',
      'Find "Zoom Workplace" by Zoom Video Communications.',
      'Tap "Install" and wait for the download to complete.',
      'Tap "Open" to launch Zoom.',
    ],
    setupSteps: [
      { title: 'Open Zoom', description: 'Tap the blue Zoom icon in your app drawer or on your home screen.' },
      { title: 'Sign up or sign in', description: 'Tap "Sign Up" with your email to create a free account, or use "Sign In with Google" for the quickest setup.' },
      { title: 'Grant permissions', description: 'Allow access to camera, microphone, and notifications when prompted. These are essential for video calls.' },
      { title: 'Set your profile', description: 'Add your name so meeting participants know who you are.' },
    ],
    basicUsage: [
      { title: 'Join a meeting', description: 'Tap "Join" on the main screen. Enter the Meeting ID and your display name. Tap "Join Meeting" and enter the passcode if asked.' },
      { title: 'Start a new meeting', description: 'Tap "New Meeting" to start your own video call. Tap "Start a Meeting" and share the meeting link with others by tapping "Participants" then "Invite."' },
      { title: 'Mute and unmute', description: 'Tap the screen to show controls, then tap the microphone icon at the bottom left to mute or unmute.' },
      { title: 'Switch camera', description: 'Tap the rotate camera icon at the top to switch between front and back cameras.' },
      { title: 'Leave a meeting', description: 'Tap "Leave" in the top right corner and confirm.' },
    ],
    seniorTips: [
      'Connect to Wi-Fi before joining a meeting for the best video and audio quality.',
      'Use headphones or earbuds to hear others more clearly and reduce echo.',
      'If your phone screen goes dark during a call, just tap it to wake it up — the meeting continues in the background.',
      'Ask the meeting host to send you the link via text message — you can join by simply tapping the link instead of typing the Meeting ID.',
    ],
    commonIssues: [
      { problem: 'Zoom is not using my camera', solution: 'Go to Android Settings > Apps > Zoom > Permissions and make sure Camera is set to "Allow." During the meeting, tap the video icon at the bottom to turn it on.' },
      { problem: 'Audio is cutting in and out', solution: 'Switch to Wi-Fi if you are using cellular data. Close other apps that might be using bandwidth. If the problem continues, try leaving and rejoining the meeting.' },
      { problem: 'I received a link but Zoom does not open', solution: 'Make sure Zoom is installed. If the link opens in a browser instead, copy the Meeting ID from the link and enter it manually in the Zoom app.' },
    ],
  },
  {
    appSlug: 'zoom',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'Open your web browser (Chrome, Edge, or Firefox).',
      'Go to zoom.us/download.',
      'Click "Download" under "Zoom Workplace for Windows."',
      'Open the downloaded file (ZoomInstaller.exe) and follow the installation steps.',
      'Zoom will open automatically when installation is complete.',
    ],
    setupSteps: [
      { title: 'Open Zoom', description: 'Double-click the Zoom icon on your desktop, or find it in the Start menu.' },
      { title: 'Sign in', description: 'Click "Sign In" and enter your email and password, or click "Sign In with Google" for easier access.' },
      { title: 'Test audio and video', description: 'Click your profile picture at the top right, then "Settings." Click "Audio" to test your speakers and microphone. Click "Video" to check your webcam.' },
    ],
    basicUsage: [
      { title: 'Join a meeting', description: 'Click "Join" on the home screen. Enter the Meeting ID and your name. Click "Join." Enter the passcode if required.' },
      { title: 'Start a meeting', description: 'Click "New Meeting" to start an instant video call. Click "Participants" at the bottom, then "Invite" to share the meeting link via email.' },
      { title: 'Mute and unmute', description: 'Click the microphone icon at the bottom left, or press the spacebar to temporarily unmute while holding it.' },
      { title: 'Share your screen', description: 'Click "Share Screen" at the bottom. Choose the window or your entire desktop that you want to share. Click "Share."' },
      { title: 'Use the chat', description: 'Click "Chat" at the bottom to open the meeting chat panel where you can type messages to all participants or privately to one person.' },
    ],
    seniorTips: [
      'Press the spacebar to quickly unmute when you want to speak — release it to mute again. This prevents accidental background noise.',
      'Use "Gallery View" (top right during a meeting) to see everyone, or "Speaker View" to focus on whoever is talking.',
      'Make Zoom larger: go to Settings > General > and adjust the scale setting. You can also use Ctrl+"+" to zoom in.',
      'If you have a separate webcam, position it at eye level for the most natural-looking video.',
    ],
    commonIssues: [
      { problem: 'My webcam is not working', solution: 'Make sure no other app is using the camera (close Skype, Teams, etc.). In Zoom Settings > Video, check that the correct camera is selected from the dropdown menu. If using an external webcam, try unplugging and plugging it back in.' },
      { problem: 'People say they hear an echo', solution: 'Use headphones or earbuds instead of your computer speakers. If no headphones available, reduce your speaker volume. In Zoom Settings > Audio, check "Automatically adjust microphone volume."' },
      { problem: 'Zoom says my internet is unstable', solution: 'Move closer to your Wi-Fi router. Close other programs using the internet (streaming, downloads). Turn off your camera if the connection is very slow — audio-only uses less bandwidth.' },
    ],
  },
  {
    appSlug: 'zoom',
    deviceSlug: 'mac',
    downloadSteps: [
      'Open Safari or Chrome on your Mac.',
      'Go to zoom.us/download.',
      'Click "Download" under "Zoom Workplace for macOS."',
      'Open the downloaded file and drag the Zoom icon into the Applications folder.',
      'Open Zoom from your Applications folder or Launchpad.',
    ],
    setupSteps: [
      { title: 'Open Zoom', description: 'Click the Zoom icon in your Dock, Launchpad, or Applications folder.' },
      { title: 'Grant permissions', description: 'Your Mac will ask for permission to use the camera and microphone. Click "Allow" for both — this is essential for video calls.' },
      { title: 'Sign in', description: 'Click "Sign In" and enter your credentials, or use "Sign In with Apple" or "Sign In with Google."' },
      { title: 'Test your setup', description: 'Click your profile icon at the top right, then "Settings." Check Audio and Video settings to make sure your webcam and microphone are working.' },
    ],
    basicUsage: [
      { title: 'Join a meeting', description: 'Click "Join" on the home screen. Enter the Meeting ID and your name, then click "Join." Enter the passcode if needed.' },
      { title: 'Start a new meeting', description: 'Click "New Meeting" to begin an instant video call. Share the invitation via the "Participants" > "Invite" button.' },
      { title: 'Mute and unmute', description: 'Click the microphone icon at the bottom left, or hold the spacebar to temporarily unmute.' },
      { title: 'Share your screen', description: 'Click "Share Screen," pick the window or desktop to share, and click "Share." Press "Stop Share" when finished.' },
      { title: 'Record a meeting', description: 'Click "Record" at the bottom to save the meeting to your Mac. The recording will be saved when the meeting ends.' },
    ],
    seniorTips: [
      'Use Command+"+" to zoom in on the Zoom window for larger text and controls.',
      'Connect AirPods or headphones for clearer audio and to reduce echo.',
      'The Touch Bar on older MacBooks shows Zoom controls during meetings — use it for quick mute/unmute.',
      'Close unnecessary browser tabs and apps before a meeting to keep your Mac running smoothly.',
    ],
    commonIssues: [
      { problem: 'Mac says Zoom does not have permission to use the camera', solution: 'Go to System Settings > Privacy & Security > Camera and make sure Zoom is checked. You may need to restart Zoom after granting permission.' },
      { problem: 'No sound during meetings', solution: 'Click the arrow next to the microphone icon and check that the correct speakers are selected. Also check System Settings > Sound > Output and make sure the right device is chosen.' },
      { problem: 'Zoom is running slowly on my Mac', solution: 'Close other apps, especially web browsers with many tabs. Restart your Mac if it has been on for a while. Make sure your Mac has the latest software updates installed.' },
    ],
  },
  {
    appSlug: 'zoom',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'Open the Google Play Store on your Chromebook.',
      'Search for "Zoom Workplace."',
      'Click "Install" and wait for the download.',
      'Alternatively, you can use Zoom directly in the Chrome browser by going to zoom.us and joining meetings from there.',
    ],
    setupSteps: [
      { title: 'Open Zoom', description: 'Click the Zoom icon in your app launcher, or go to zoom.us in Chrome.' },
      { title: 'Sign in or create account', description: 'Sign in with your email or use Google sign-in for quick access.' },
      { title: 'Allow permissions', description: 'Grant access to camera and microphone when prompted by your Chromebook.' },
    ],
    basicUsage: [
      { title: 'Join a meeting', description: 'Click "Join" and enter the Meeting ID and passcode. Or simply click the meeting link you received in an email.' },
      { title: 'Start a meeting', description: 'Click "New Meeting" to start your own video call. Share the link with others by clicking "Participants" > "Invite."' },
      { title: 'Use the chat', description: 'Click "Chat" at the bottom of the meeting screen to type messages to participants.' },
      { title: 'Mute yourself', description: 'Click the microphone icon at the bottom to mute/unmute, or use the keyboard shortcut Alt+A.' },
      { title: 'Leave the meeting', description: 'Click "Leave" at the bottom right and confirm.' },
    ],
    seniorTips: [
      'The Chrome browser version of Zoom works well on Chromebooks and gives you a full-screen experience.',
      'Use Ctrl+"+" to zoom in on the screen for larger text and faces.',
      'Plug in headphones for better audio and to avoid echoes.',
      'Keep your Chromebook plugged in during long meetings to avoid running out of battery.',
    ],
    commonIssues: [
      { problem: 'Zoom app is slow or freezing', solution: 'Try using Zoom in the Chrome browser at zoom.us instead of the Android app. The browser version often runs better on Chromebooks. Close other tabs and apps to free up resources.' },
      { problem: 'Camera is not working', solution: 'Check that no other app is using the camera. Go to Chromebook Settings > Privacy and Security and make sure camera access is allowed. Try restarting your Chromebook.' },
      { problem: 'I cannot hear anyone', solution: 'Click the arrow next to the microphone icon in Zoom and select the correct audio output. Also check your Chromebook volume — click the time in the bottom right and adjust the volume slider.' },
    ],
  },

  // ─── FaceTime ────────────────────────────────────────────────────────────
  {
    appSlug: 'facetime',
    deviceSlug: 'iphone',
    downloadSteps: [
      'FaceTime comes pre-installed on every iPhone — you do not need to download it.',
      'Look for the green FaceTime icon (a white video camera on a green background) on your home screen.',
      'If you cannot find it, swipe down on your home screen and search for "FaceTime."',
    ],
    setupSteps: [
      { title: 'Open FaceTime', description: 'Tap the green FaceTime icon on your home screen.' },
      { title: 'Sign in', description: 'FaceTime uses your Apple ID. If you are already signed into your iPhone, FaceTime is ready to go. If not, sign in with your Apple ID and password.' },
      { title: 'Verify your details', description: 'Go to Settings > FaceTime to check that your phone number and email address are listed under "You can be reached by FaceTime at." This is how others will find you.' },
    ],
    basicUsage: [
      { title: 'Make a video call', description: 'Open FaceTime, tap "New FaceTime," type a contact\'s name, phone number, or email, and tap the green video icon to start a video call.' },
      { title: 'Make an audio-only call', description: 'In FaceTime, tap "New FaceTime," add a contact, and tap the green phone icon instead of the video icon for audio only.' },
      { title: 'Answer a FaceTime call', description: 'When someone calls you on FaceTime, a notification appears. Tap the green "Accept" button to answer. You can choose audio or video.' },
      { title: 'Switch cameras', description: 'During a call, tap the rotate camera icon to switch between your front camera (to show your face) and back camera (to show what you see).' },
      { title: 'Create a link to share', description: 'Tap "Create Link" at the top to generate a FaceTime link you can share with anyone, even people who do not have Apple devices.' },
    ],
    seniorTips: [
      'FaceTime is the simplest way to video call between Apple devices — just tap a contact and press the video icon.',
      'Prop your phone against something sturdy so you can talk hands-free and see the other person\'s face at a comfortable distance.',
      'Use FaceTime over Wi-Fi for the clearest video quality and to save your cellular data.',
      'You can FaceTime with up to 32 people at once for family group calls.',
    ],
    commonIssues: [
      { problem: 'FaceTime is not working', solution: 'Go to Settings > FaceTime and make sure the toggle is turned on. Check that you are connected to Wi-Fi or cellular data. Restart your iPhone by holding the side button and sliding to power off.' },
      { problem: 'The person I am calling cannot receive FaceTime', solution: 'The other person also needs an Apple device (iPhone, iPad, or Mac) with FaceTime turned on. If they have an Android phone, send them a FaceTime link instead — they can join through their web browser.' },
      { problem: 'Video quality is poor', solution: 'Move closer to your Wi-Fi router or switch to a stronger connection. Make sure your camera lens is clean. Good lighting on your face makes a big difference — face a window or lamp.' },
    ],
  },
  {
    appSlug: 'facetime',
    deviceSlug: 'ipad',
    downloadSteps: [
      'FaceTime comes pre-installed on every iPad.',
      'Look for the green FaceTime icon on your home screen or in your app library.',
      'If you cannot find it, swipe down and search for "FaceTime."',
    ],
    setupSteps: [
      { title: 'Open FaceTime', description: 'Tap the green FaceTime icon.' },
      { title: 'Sign in', description: 'If you are signed into your iPad with your Apple ID, FaceTime is ready. If not, sign in when prompted.' },
      { title: 'Check your settings', description: 'Go to Settings > FaceTime to make sure it is turned on and your email and phone number are listed.' },
    ],
    basicUsage: [
      { title: 'Make a video call', description: 'Tap "New FaceTime," type a name or number, and tap the green video icon. The iPad\'s large screen makes video calls very enjoyable.' },
      { title: 'Make an audio call', description: 'Tap "New FaceTime," add a contact, and tap the green phone icon for a voice-only call.' },
      { title: 'Answer a call', description: 'When someone FaceTimes you, tap the green "Accept" button on the notification.' },
      { title: 'Use Center Stage', description: 'Newer iPads have Center Stage, which automatically keeps you centered in the frame even if you move around. It works automatically.' },
      { title: 'Share your screen', description: 'During a call, tap the screen, then tap the Share Content button to show the other person what is on your iPad screen.' },
    ],
    seniorTips: [
      'The iPad\'s large screen makes FaceTime feel like having a window to the other person — much easier to see faces than on a phone.',
      'Use an iPad stand or prop it up in the case so you can sit comfortably during long calls.',
      'Center Stage on newer iPads keeps your face in view even if you lean or move around, which is very convenient.',
      'Connect to Wi-Fi for the best video quality on your iPad.',
    ],
    commonIssues: [
      { problem: 'The front camera shows a zoomed-in view', solution: 'This might be Center Stage. Go to Settings > FaceTime and toggle Center Stage off if you prefer a fixed view. Some iPads have the camera on the long edge — make sure the iPad is in landscape orientation.' },
      { problem: 'FaceTime keeps disconnecting', solution: 'Make sure your Wi-Fi connection is stable. Move closer to your router. If on cellular, check that FaceTime is allowed to use cellular data in Settings > Cellular > FaceTime.' },
      { problem: 'No sound during calls', solution: 'Check that your iPad is not on silent mode. Increase the volume using the buttons on the side. Make sure nothing is covering the iPad\'s speakers.' },
    ],
  },
  {
    appSlug: 'facetime',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'FaceTime is not available as an app on Android phones.',
      'However, you can join FaceTime calls through your web browser when someone sends you a FaceTime link.',
      'No download or installation is needed — just use Chrome or your preferred browser.',
    ],
    setupSteps: [
      { title: 'Receive a FaceTime link', description: 'Ask the person with an Apple device to create a FaceTime link and send it to you via text message, email, or WhatsApp.' },
      { title: 'Open the link', description: 'Tap the FaceTime link you received. It will open in your web browser (Chrome works best).' },
      { title: 'Enter your name', description: 'Type your name so others in the call know who you are, then tap "Continue."' },
      { title: 'Allow permissions', description: 'Your browser will ask to use your camera and microphone. Tap "Allow" for both.' },
    ],
    basicUsage: [
      { title: 'Join the call', description: 'After entering your name and allowing permissions, tap "Join." The host on the Apple device will need to let you in.' },
      { title: 'Mute yourself', description: 'Tap the microphone icon to mute or unmute. Mute when you are not speaking to reduce background noise.' },
      { title: 'Turn camera on or off', description: 'Tap the camera icon to toggle your video on or off.' },
      { title: 'Leave the call', description: 'Tap the red "Leave" button to end the call. You can rejoin using the same link as long as the call is still active.' },
    ],
    seniorTips: [
      'Save the FaceTime link in your notes or messages so you can find it easily next time.',
      'Use Chrome browser for the best experience — other browsers may not work as well with FaceTime.',
      'Connect to Wi-Fi before joining for the best video quality.',
      'If you regularly FaceTime with someone, ask them to create a reusable link that works every time.',
    ],
    commonIssues: [
      { problem: 'The FaceTime link does not work', solution: 'Make sure you are using Chrome browser. Copy and paste the link into Chrome if it opened in another browser. The link may have expired — ask the host to create a new one.' },
      { problem: 'The host has not let me in', solution: 'After you tap "Join," the host on the Apple device must approve you. Send them a message to let them know you are waiting to be admitted.' },
      { problem: 'Video or audio quality is poor', solution: 'Switch to Wi-Fi if using cellular data. Close other apps and browser tabs. Make sure nothing is covering your phone\'s camera or microphone.' },
    ],
  },
  {
    appSlug: 'facetime',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'FaceTime does not have a Windows app.',
      'You can join FaceTime calls through your web browser when someone shares a FaceTime link with you.',
      'Use Chrome or Edge browser for the best experience.',
    ],
    setupSteps: [
      { title: 'Get a FaceTime link', description: 'Ask the person with an Apple device to create a FaceTime link and send it to you by email or message.' },
      { title: 'Open the link', description: 'Click the link to open it in Chrome or Edge browser.' },
      { title: 'Enter your name', description: 'Type your name so the other participants know who you are.' },
      { title: 'Allow camera and microphone', description: 'Your browser will request permission to use your webcam and microphone. Click "Allow."' },
    ],
    basicUsage: [
      { title: 'Join the call', description: 'Click "Join" after entering your name. Wait for the host to admit you to the call.' },
      { title: 'Mute and unmute', description: 'Click the microphone icon to toggle mute. Keep muted when not speaking.' },
      { title: 'Toggle video', description: 'Click the camera icon to turn your webcam on or off.' },
      { title: 'Leave the call', description: 'Click the red "Leave" button to end your participation.' },
    ],
    seniorTips: [
      'FaceTime on a Windows PC uses your web browser — there is no app to install, which keeps things simple.',
      'Position your webcam at eye level for the most natural look on video calls.',
      'Use headphones to prevent echo and hear the other person more clearly.',
      'Bookmark the FaceTime link in your browser for easy access to recurring calls.',
    ],
    commonIssues: [
      { problem: 'FaceTime link opens but video does not work', solution: 'Make sure you are using Chrome or Edge — Firefox and other browsers may not support FaceTime. Check that no other program is using your webcam. Try restarting your browser.' },
      { problem: 'No audio from the other person', solution: 'Check your computer volume. Click the speaker icon in the taskbar and turn up the volume. Try plugging in headphones or external speakers.' },
      { problem: 'I want to start a FaceTime call from my PC', solution: 'Unfortunately, you cannot initiate FaceTime calls from Windows. Only Apple device users can start FaceTime calls. Use Zoom or Google Meet as alternatives for starting calls from a PC.' },
    ],
  },
  {
    appSlug: 'facetime',
    deviceSlug: 'mac',
    downloadSteps: [
      'FaceTime comes pre-installed on every Mac.',
      'Find it in your Applications folder, Launchpad, or by searching with Spotlight (Command+Space and type "FaceTime").',
    ],
    setupSteps: [
      { title: 'Open FaceTime', description: 'Click the FaceTime icon in your Dock, Applications folder, or Launchpad.' },
      { title: 'Sign in', description: 'Sign in with your Apple ID if prompted. If you are already signed into your Mac, FaceTime is ready to use.' },
      { title: 'Check preferences', description: 'Go to FaceTime menu > Settings to verify your phone number and email are listed for receiving calls.' },
    ],
    basicUsage: [
      { title: 'Make a video call', description: 'Click "New FaceTime" at the top, type a name, phone number, or email, and click the green FaceTime video button.' },
      { title: 'Make an audio call', description: 'Click "New FaceTime," add a contact, and click the phone icon for an audio-only call.' },
      { title: 'Answer a call', description: 'When someone calls you, a notification appears in the top right. Click "Accept" to answer.' },
      { title: 'Create a shareable link', description: 'Click "Create Link" to generate a link you can share with anyone, including people on Android or Windows.' },
      { title: 'Use reactions', description: 'During a call, make hand gestures like a thumbs up or heart shape — your Mac camera will detect them and show animated reactions.' },
    ],
    seniorTips: [
      'FaceTime on a Mac gives you the biggest screen for video calls — perfect for seeing grandchildren or group calls.',
      'Use an external webcam at eye level if your Mac is on a desk — looking down at a laptop camera can be unflattering.',
      'Command+"+" makes the FaceTime window larger for better visibility.',
      'Close other apps during calls to keep your Mac running smoothly.',
    ],
    commonIssues: [
      { problem: 'FaceTime is not receiving calls', solution: 'Open FaceTime and make sure it says "Active" — if it says "Inactive," click "Turn On." Check System Settings > FaceTime and make sure your Apple ID is signed in.' },
      { problem: 'Camera shows a black screen', solution: 'Check that no other app (like Zoom or Photo Booth) is using the camera. If using an external webcam, make sure it is plugged in properly. Go to System Settings > Privacy & Security > Camera and make sure FaceTime is checked.' },
      { problem: 'Poor video quality on older Mac', solution: 'Close other apps to free up resources. Connect to Wi-Fi instead of cellular hotspot. An external USB webcam can provide better quality than some older built-in Mac cameras.' },
    ],
  },
  {
    appSlug: 'facetime',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'FaceTime is not available on Chromebook as an app.',
      'You can join FaceTime calls through the Chrome browser when someone sends you a link.',
      'No installation needed — it runs entirely in the browser.',
    ],
    setupSteps: [
      { title: 'Get a FaceTime link', description: 'Ask the Apple device user to create and share a FaceTime link with you.' },
      { title: 'Open in Chrome', description: 'Click or tap the link to open it in Chrome browser.' },
      { title: 'Enter your name', description: 'Type your name so others can identify you in the call.' },
      { title: 'Allow permissions', description: 'Chrome will ask for camera and microphone access. Click "Allow."' },
    ],
    basicUsage: [
      { title: 'Join the call', description: 'Click "Join" and wait for the host to let you in.' },
      { title: 'Control audio and video', description: 'Use the microphone and camera icons to toggle them on or off.' },
      { title: 'Leave the call', description: 'Click the red "Leave" button when you are done.' },
    ],
    seniorTips: [
      'FaceTime via Chrome on a Chromebook works well and requires no setup beyond opening a link.',
      'Use Ctrl+"+" to zoom in if the video call interface looks too small.',
      'Plug in headphones for better audio quality.',
      'Keep the Chrome tab in the foreground during the call — switching to another tab may pause the video.',
    ],
    commonIssues: [
      { problem: 'The link says it is not supported', solution: 'Make sure you are using the Chrome browser. FaceTime links may not work in other browsers on Chromebook. Update Chrome to the latest version.' },
      { problem: 'No video appears', solution: 'Click the camera icon in Chrome\'s address bar and make sure FaceTime is allowed to use the camera. Also check Chromebook Settings > Privacy and Security > Camera.' },
      { problem: 'I want to call someone on FaceTime from my Chromebook', solution: 'You cannot start FaceTime calls from a Chromebook. Only people with Apple devices can initiate calls. Consider using Google Meet or Zoom as alternatives you can start yourself.' },
    ],
  },

  // ─── Facebook Messenger ──────────────────────────────────────────────────
  {
    appSlug: 'facebook-messenger',
    deviceSlug: 'iphone',
    downloadSteps: [
      'Open the App Store on your iPhone.',
      'Search for "Messenger" in the Search tab.',
      'Find "Messenger" by Meta Platforms and tap "Get."',
      'Confirm with Face ID, Touch ID, or your Apple ID password.',
      'Wait for the app to install.',
    ],
    setupSteps: [
      { title: 'Open Messenger', description: 'Tap the blue Messenger icon on your home screen.' },
      { title: 'Sign in with Facebook', description: 'Tap "Continue as [Your Name]" if your Facebook account is detected, or tap "Log In" and enter your Facebook email and password.' },
      { title: 'Allow notifications', description: 'Tap "Allow" when asked about notifications so you know when new messages arrive.' },
      { title: 'Sync contacts', description: 'You can choose to sync your phone contacts so Messenger can suggest people you know. This is optional.' },
    ],
    basicUsage: [
      { title: 'Send a message', description: 'Tap the pencil icon at the top right to start a new message. Search for a friend\'s name, tap it, type your message, and tap the send arrow.' },
      { title: 'Make a voice call', description: 'Open a conversation and tap the phone icon at the top right for a free voice call.' },
      { title: 'Make a video call', description: 'Open a conversation and tap the video camera icon at the top right. Allow camera access if prompted.' },
      { title: 'Send a photo', description: 'In a chat, tap the photo icon at the bottom left to choose a picture from your phone and send it.' },
      { title: 'React to a message', description: 'Press and hold any message to see emoji reactions. Tap one to react — it is a fun way to respond without typing.' },
    ],
    seniorTips: [
      'Messenger is separate from Facebook — you can send messages here without opening the Facebook app.',
      'Tap the person\'s profile picture at the top of a chat to see options like muting, nicknaming, or changing the chat color.',
      'Use the search bar at the top to find old conversations — type a name or keyword.',
      'You can video call up to 50 people at once for family gatherings.',
    ],
    commonIssues: [
      { problem: 'I do not have a Facebook account', solution: 'You can create a Messenger account with just your phone number — you do not need a full Facebook profile. During setup, choose "Create New Account" and follow the steps.' },
      { problem: 'Notifications are not showing up', solution: 'Go to iPhone Settings > Notifications > Messenger and turn on "Allow Notifications." Also open Messenger > your profile picture > Notifications and make sure they are enabled.' },
      { problem: 'Messages are not sending', solution: 'Check your internet connection. Try closing and reopening the app. If the problem continues, update Messenger in the App Store.' },
    ],
  },
  {
    appSlug: 'facebook-messenger',
    deviceSlug: 'ipad',
    downloadSteps: [
      'Open the App Store on your iPad.',
      'Search for "Messenger."',
      'Tap "Get" next to Messenger by Meta Platforms.',
      'Confirm and wait for it to install.',
    ],
    setupSteps: [
      { title: 'Open Messenger', description: 'Tap the Messenger icon on your home screen.' },
      { title: 'Sign in', description: 'Log in with your Facebook account or phone number.' },
      { title: 'Allow permissions', description: 'Allow notifications, camera, and microphone access when prompted.' },
    ],
    basicUsage: [
      { title: 'Send a message', description: 'Tap the compose icon, find a friend, type your message, and send. The iPad\'s split view shows your chat list on the left and the conversation on the right.' },
      { title: 'Make a video call', description: 'Open any conversation and tap the video icon. The iPad\'s bigger screen makes video calls much more enjoyable.' },
      { title: 'Share photos', description: 'Tap the photo icon in a chat to pick and send pictures from your iPad.' },
      { title: 'Use group chats', description: 'Tap the compose icon, add multiple people, and name your group. Great for family conversations.' },
    ],
    seniorTips: [
      'The iPad\'s large screen shows your message list and conversation side by side, making it easy to switch between chats.',
      'Use a Bluetooth keyboard with your iPad for comfortable typing in Messenger.',
      'Tap a friend\'s profile picture to see all shared photos, links, and files from your conversations.',
      'You can send voice messages by holding the microphone icon — great when typing feels slow.',
    ],
    commonIssues: [
      { problem: 'The app is zoomed in or looks stretched', solution: 'Update Messenger to the latest version in the App Store — newer versions are optimized for iPad. Delete and reinstall if the problem persists.' },
      { problem: 'I cannot make calls', solution: 'Make sure Messenger has camera and microphone permissions in iPad Settings > Messenger. Check your internet connection — Wi-Fi is recommended for calls.' },
      { problem: 'I keep getting message requests from strangers', solution: 'Open Messenger > your profile picture > Message Delivery. Set "Others on Facebook" and "Others on Messenger" to "Don\'t receive requests" to stop unwanted messages.' },
    ],
  },
  {
    appSlug: 'facebook-messenger',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'Open the Google Play Store.',
      'Search for "Messenger."',
      'Tap "Install" next to Messenger by Meta Platforms.',
      'Wait for the download and tap "Open."',
    ],
    setupSteps: [
      { title: 'Open Messenger', description: 'Tap the blue Messenger icon.' },
      { title: 'Sign in', description: 'Log in with your Facebook email and password, or use your phone number to create an account without Facebook.' },
      { title: 'Grant permissions', description: 'Allow notifications, contacts, camera, and microphone when asked.' },
    ],
    basicUsage: [
      { title: 'Send a message', description: 'Tap the pencil icon to start a new message. Select a contact, type your message, and tap the send arrow.' },
      { title: 'Voice and video calls', description: 'Open a chat and tap the phone icon for a voice call or the video icon for a video call.' },
      { title: 'Send photos and videos', description: 'Tap the camera or gallery icon at the bottom of a chat to take or select media to send.' },
      { title: 'Use chat heads', description: 'Chat heads are floating bubbles that appear on your screen when you get a message. Tap them to quickly reply. Enable in Messenger Settings > Notifications > Show chat heads.' },
    ],
    seniorTips: [
      'Chat heads let you reply to messages while using other apps — tap the floating bubble to open the chat.',
      'Press and hold a message to see emoji reactions — a quick thumbs-up is an easy way to acknowledge a message.',
      'Use the dark mode in Messenger: tap your profile picture > toggle "Dark Mode." It is easier on your eyes at night.',
      'Send voice messages by holding the microphone icon when typing is difficult.',
    ],
    commonIssues: [
      { problem: 'Chat heads are not appearing', solution: 'Go to Messenger > your profile picture > Notifications > Show chat heads and turn it on. Also check Android Settings > Apps > Messenger > Display over other apps and enable it.' },
      { problem: 'Messenger is draining my battery', solution: 'Go to Android Settings > Apps > Messenger > Battery and set to "Optimized." Turn off background refresh if you do not need instant notifications.' },
      { problem: 'I cannot sign in without Facebook', solution: 'On the login screen, tap "Create New Account" and enter your phone number. You can use Messenger with just a phone number, without needing a Facebook profile.' },
    ],
  },
  {
    appSlug: 'facebook-messenger',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'Open the Microsoft Store from your taskbar or Start menu.',
      'Search for "Messenger."',
      'Click "Get" to download Messenger by Meta Platforms.',
      'Wait for installation and click "Open."',
      'Alternatively, go to messenger.com in your web browser.',
    ],
    setupSteps: [
      { title: 'Open Messenger', description: 'Click the Messenger icon in your Start menu, or go to messenger.com in your browser.' },
      { title: 'Sign in', description: 'Enter your Facebook email and password to log in.' },
      { title: 'Allow notifications', description: 'Click "Allow" when your browser or the app asks about desktop notifications.' },
    ],
    basicUsage: [
      { title: 'Send a message', description: 'Click the compose icon, search for a contact, type your message, and press Enter to send.' },
      { title: 'Make a video call', description: 'Open a conversation and click the video icon at the top right. Allow webcam and microphone access.' },
      { title: 'Share files', description: 'Click the "+" icon in a chat, then "File" to send documents from your computer.' },
      { title: 'Search conversations', description: 'Use the search bar at the top to find old messages by name or keyword.' },
    ],
    seniorTips: [
      'Messenger on your PC lets you type with a full keyboard — much faster than on a phone.',
      'Use Ctrl+"+" to zoom in and make text bigger in the browser version.',
      'Keep messenger.com bookmarked for quick access without installing anything.',
      'You can have multiple conversations open in separate windows — click the expand icon on any chat.',
    ],
    commonIssues: [
      { problem: 'I do not get desktop notifications', solution: 'In Chrome, click the lock icon in the address bar, then Notifications > Allow. In the Messenger app, check Settings > Notifications.' },
      { problem: 'Video calls are not working', solution: 'Make sure your webcam and microphone are plugged in and not being used by another app. In your browser, click the camera icon in the address bar to check permissions.' },
      { problem: 'Messenger is slow in the browser', solution: 'Close unnecessary browser tabs. Clear your browser cache (Ctrl+Shift+Delete). Try using the Messenger app from the Microsoft Store instead.' },
    ],
  },
  {
    appSlug: 'facebook-messenger',
    deviceSlug: 'mac',
    downloadSteps: [
      'Open the App Store on your Mac.',
      'Search for "Messenger."',
      'Click "Get" next to Messenger by Meta Platforms.',
      'Confirm with your Apple ID password or Touch ID.',
      'Alternatively, go to messenger.com in Safari or Chrome.',
    ],
    setupSteps: [
      { title: 'Open Messenger', description: 'Click the Messenger icon in your Dock or Applications folder, or visit messenger.com.' },
      { title: 'Sign in', description: 'Log in with your Facebook email and password.' },
      { title: 'Allow notifications', description: 'Grant notification permissions when prompted by your Mac.' },
    ],
    basicUsage: [
      { title: 'Send a message', description: 'Click the compose icon, find a contact, type your message, and press Return to send.' },
      { title: 'Make calls', description: 'Open a chat and click the phone or video icon to start a voice or video call.' },
      { title: 'Share files', description: 'Drag and drop files from your Mac directly into a chat window, or click the "+" icon to browse.' },
      { title: 'Search messages', description: 'Use the search bar to find past conversations, shared links, and photos.' },
    ],
    seniorTips: [
      'The Mac app keeps Messenger separate from your browser, which some people find less distracting.',
      'Use Command+"+" to make the interface larger and easier to read.',
      'You can use Mac dictation (press Fn twice) to speak your messages instead of typing.',
      'Pin important conversations by right-clicking them and choosing "Pin."',
    ],
    commonIssues: [
      { problem: 'The app keeps asking me to log in', solution: 'Make sure you are checking the "Keep me logged in" box. Clear the app cache by deleting Messenger and reinstalling from the App Store.' },
      { problem: 'Camera does not work in video calls', solution: 'Go to System Settings > Privacy & Security > Camera and make sure Messenger is checked. Close any other apps using the camera.' },
      { problem: 'Notifications are not showing', solution: 'Go to System Settings > Notifications > Messenger and turn on "Allow Notifications." Make sure you are not in Focus mode.' },
    ],
  },
  {
    appSlug: 'facebook-messenger',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'Open the Google Play Store on your Chromebook.',
      'Search for "Messenger."',
      'Click "Install" to download the Messenger app.',
      'Alternatively, go to messenger.com in Chrome for a full-screen browser experience.',
    ],
    setupSteps: [
      { title: 'Open Messenger', description: 'Click the Messenger icon in your app launcher, or go to messenger.com in Chrome.' },
      { title: 'Sign in', description: 'Enter your Facebook login credentials or phone number.' },
      { title: 'Allow permissions', description: 'Grant camera, microphone, and notification access.' },
    ],
    basicUsage: [
      { title: 'Send messages', description: 'Click compose, find a friend, type your message, and press Enter.' },
      { title: 'Make video calls', description: 'Open a chat and click the video icon. The browser version works well for calls on Chromebook.' },
      { title: 'Send and receive photos', description: 'Click the photo icon to send pictures or the "+" to attach files from your Chromebook.' },
    ],
    seniorTips: [
      'The messenger.com website in Chrome often works better than the Play Store app on Chromebooks.',
      'Use Ctrl+"+" to zoom in for larger text.',
      'Chromebooks are very secure, so your Messenger conversations are well protected.',
      'Bookmark messenger.com for one-click access.',
    ],
    commonIssues: [
      { problem: 'The app looks small or cramped', solution: 'Use messenger.com in Chrome instead — it adjusts to fill the screen. The Play Store app is designed for phone screens and may look small on a Chromebook.' },
      { problem: 'Cannot make calls', solution: 'Check that your Chromebook\'s camera and microphone are allowed for Messenger. Click the lock icon in Chrome\'s address bar to manage permissions.' },
      { problem: 'Slow performance', solution: 'Close other tabs and apps. Use the website version instead of the Android app. Make sure your Chromebook is connected to a strong Wi-Fi network.' },
    ],
  },

  // ─── Facebook ────────────────────────────────────────────────────────────
  {
    appSlug: 'facebook',
    deviceSlug: 'iphone',
    downloadSteps: [
      'Open the App Store.',
      'Search for "Facebook."',
      'Tap "Get" next to Facebook by Meta Platforms.',
      'Confirm with Face ID, Touch ID, or Apple ID password.',
      'Wait for the download to complete.',
    ],
    setupSteps: [
      { title: 'Open Facebook', description: 'Tap the blue Facebook icon on your home screen.' },
      { title: 'Log in or create account', description: 'Enter your email and password to log in. If you do not have an account, tap "Create New Account" and follow the steps — you will need your name, birthday, email, and a password.' },
      { title: 'Find friends', description: 'Facebook will suggest people you may know. You can send friend requests or skip this step.' },
      { title: 'Set up your profile', description: 'Add a profile photo (a clear picture of your face) and optionally add your hometown, workplace, and school.' },
    ],
    basicUsage: [
      { title: 'Scroll through your News Feed', description: 'The main screen shows posts from friends and pages you follow. Scroll down to see more. Tap "Like" (thumbs up) to react to posts.' },
      { title: 'Post a status update', description: 'Tap "What\'s on your mind?" at the top of the feed. Type your message, optionally add a photo, and tap "Post."' },
      { title: 'Share a photo', description: 'Tap "What\'s on your mind?" then tap "Photo/Video." Choose photos from your library and tap "Post."' },
      { title: 'Find and join groups', description: 'Tap the three-line menu, then "Groups." Search for topics that interest you — there are groups for everything from gardening to local community events.' },
      { title: 'Search for people', description: 'Tap the magnifying glass at the top. Type a person\'s name to find them and send a friend request.' },
    ],
    seniorTips: [
      'Increase text size on your iPhone (Settings > Display & Brightness > Text Size) to make Facebook easier to read.',
      'Be cautious about friend requests from strangers — only accept people you actually know.',
      'Check your privacy settings: go to Settings & Privacy > Settings > Privacy to control who can see your posts.',
      'Join local community groups to stay connected with events and neighbors in your area.',
    ],
    commonIssues: [
      { problem: 'I forgot my Facebook password', solution: 'On the login screen, tap "Forgot Password?" Enter your email or phone number and Facebook will send you a code to reset your password.' },
      { problem: 'I keep seeing ads and posts from strangers', solution: 'Tap the three dots on any post and select "Hide post" or "Snooze" to see less of that type. Go to Settings > Feed Preferences to prioritize friends and family.' },
      { problem: 'Facebook is using too much battery', solution: 'Turn off auto-play for videos: go to Settings & Privacy > Settings > Media > Autoplay and set it to "Never." Also turn off location access in iPhone Settings > Facebook > Location > Never.' },
    ],
  },
  {
    appSlug: 'facebook',
    deviceSlug: 'ipad',
    downloadSteps: [
      'Open the App Store on your iPad.',
      'Search for "Facebook."',
      'Tap "Get" and confirm the download.',
      'Wait for installation to complete.',
    ],
    setupSteps: [
      { title: 'Open Facebook', description: 'Tap the Facebook icon on your home screen.' },
      { title: 'Log in', description: 'Enter your email and password, or create a new account.' },
      { title: 'Set up your profile', description: 'Add a profile photo and cover photo to personalize your page.' },
    ],
    basicUsage: [
      { title: 'Browse your feed', description: 'Scroll through your News Feed to see posts from friends. The iPad\'s larger screen shows more content at once.' },
      { title: 'Post updates and photos', description: 'Tap "What\'s on your mind?" to share text, photos, or videos with your friends.' },
      { title: 'Use Marketplace', description: 'Tap the shop icon to browse Marketplace — buy and sell items locally, like a digital yard sale.' },
      { title: 'Watch videos', description: 'Tap the Watch tab to discover videos. The iPad\'s big screen makes watching videos much more enjoyable.' },
    ],
    seniorTips: [
      'Use the iPad in landscape mode for a wider view of Facebook that shows more content.',
      'Double-tap photos to zoom in and see details more clearly.',
      'The iPad makes Facebook Marketplace browsing very easy — great for finding deals in your area.',
      'Use Split View to have Facebook open next to another app — swipe up from the bottom to access the Dock.',
    ],
    commonIssues: [
      { problem: 'Facebook looks blurry or zoomed in', solution: 'Update Facebook to the latest version in the App Store. If the problem persists, delete and reinstall the app.' },
      { problem: 'I cannot upload photos', solution: 'Go to iPad Settings > Facebook > Photos and make sure access is set to "All Photos." Try restarting the app if photos still do not upload.' },
      { problem: 'The app freezes or crashes', solution: 'Close Facebook by swiping up from the bottom and swiping the Facebook window away. Reopen it. If the problem continues, update or reinstall the app.' },
    ],
  },
  {
    appSlug: 'facebook',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'Open the Google Play Store.',
      'Search for "Facebook."',
      'Tap "Install" next to Facebook by Meta Platforms.',
      'Wait for the download and tap "Open."',
    ],
    setupSteps: [
      { title: 'Open Facebook', description: 'Tap the Facebook icon on your home screen or in the app drawer.' },
      { title: 'Log in or sign up', description: 'Enter your email and password, or tap "Create new account" to get started.' },
      { title: 'Allow permissions', description: 'Choose which permissions to allow — notifications are recommended, but location and contacts are optional.' },
    ],
    basicUsage: [
      { title: 'Browse your News Feed', description: 'The main screen shows posts from friends and groups. Scroll down to see more. Tap the thumbs-up icon to Like a post.' },
      { title: 'Post something', description: 'Tap "What\'s on your mind?" at the top. Type your message, add photos if you want, and tap "Post."' },
      { title: 'Find and add friends', description: 'Tap the search icon at the top, type a name, and send a friend request when you find the person.' },
      { title: 'Join groups', description: 'Tap the three-line menu > Groups. Search for groups about your hobbies, local area, or interests.' },
      { title: 'Use the camera', description: 'Tap the camera icon at the top of the feed to take a photo or video and share it immediately.' },
    ],
    seniorTips: [
      'Use Facebook Lite from the Play Store if your phone runs slowly — it uses less space and data.',
      'Be cautious with links in posts — do not click on links from people you do not know, as they could be scams.',
      'Set your profile to private: Menu > Settings & Privacy > Settings > Privacy. Change "Who can see your future posts?" to "Friends."',
      'Turn on two-factor authentication for extra security: Settings > Security and Login > Two-Factor Authentication.',
    ],
    commonIssues: [
      { problem: 'Facebook is using too much data', solution: 'Disable auto-play videos: Menu > Settings & Privacy > Settings > Media > Autoplay > On Wi-Fi Only. Use Facebook Lite for lower data usage.' },
      { problem: 'I keep getting notifications for things I do not care about', solution: 'Go to Menu > Settings & Privacy > Settings > Notifications. Turn off notifications for groups, pages, and other categories you do not need.' },
      { problem: 'Facebook takes up too much storage', solution: 'Clear the cache: Android Settings > Apps > Facebook > Storage > Clear Cache. This removes temporary data without deleting your account.' },
    ],
  },
  {
    appSlug: 'facebook',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'Open your web browser (Chrome, Edge, or Firefox).',
      'Go to facebook.com in the address bar.',
      'No installation needed — Facebook works entirely in your browser.',
      'Optionally, you can install the Facebook app from the Microsoft Store.',
    ],
    setupSteps: [
      { title: 'Go to Facebook', description: 'Open your browser and go to facebook.com.' },
      { title: 'Log in', description: 'Enter your email and password, then click "Log In." If you are new, click "Create New Account."' },
      { title: 'Bookmark it', description: 'Press Ctrl+D to bookmark Facebook for easy access in the future.' },
    ],
    basicUsage: [
      { title: 'Browse your feed', description: 'The main page shows your News Feed. Scroll down to see posts from friends, groups, and pages you follow.' },
      { title: 'Post updates', description: 'Click "What\'s on your mind?" at the top to write a post. Add photos by clicking the photo/video icon.' },
      { title: 'Send messages', description: 'Click the Messenger icon (chat bubble) at the top right to send messages. Or go to messenger.com for a full messaging experience.' },
      { title: 'Browse Marketplace', description: 'Click "Marketplace" in the left sidebar to buy and sell items in your local area.' },
      { title: 'Manage your settings', description: 'Click your profile picture at the top right > Settings & Privacy > Settings to control your privacy and account.' },
    ],
    seniorTips: [
      'Use Ctrl+"+" to zoom in on Facebook and make everything bigger. Ctrl+"-" zooms out. Ctrl+0 resets to normal.',
      'Facebook on a computer gives you the full experience with all features — it is often easier to manage than the phone app.',
      'Set up two-factor authentication for extra account security in Settings > Security and Login.',
      'Click "Memories" in the left sidebar to see posts from previous years — a lovely trip down memory lane.',
    ],
    commonIssues: [
      { problem: 'Facebook looks different from what I remember', solution: 'Facebook updates its design regularly. The main features are still in the same places — your feed in the center, messages at the top right, and menu on the left.' },
      { problem: 'I cannot log in to my account', solution: 'Click "Forgot password?" on the login page. Enter your email or phone number and follow the steps to reset your password.' },
      { problem: 'The page loads slowly', solution: 'Clear your browser cache with Ctrl+Shift+Delete. Close unnecessary tabs. Make sure your internet connection is strong.' },
    ],
  },
  {
    appSlug: 'facebook',
    deviceSlug: 'mac',
    downloadSteps: [
      'Open Safari or Chrome on your Mac.',
      'Go to facebook.com.',
      'No installation needed — Facebook works in your web browser.',
      'Optionally, add it to your Dock: in Safari, click Share > Add to Dock.',
    ],
    setupSteps: [
      { title: 'Go to Facebook', description: 'Open your browser and go to facebook.com.' },
      { title: 'Log in or create account', description: 'Enter your email and password to log in, or click "Create New Account."' },
      { title: 'Bookmark for easy access', description: 'Press Command+D to bookmark Facebook, or add it to your Dock for quick access.' },
    ],
    basicUsage: [
      { title: 'Browse your News Feed', description: 'The center of the page shows posts from friends. Scroll to see more content.' },
      { title: 'Post updates and photos', description: 'Click "What\'s on your mind?" to share text, photos, or videos with your friends.' },
      { title: 'Use Messenger', description: 'Click the Messenger icon at the top right to send and receive messages.' },
      { title: 'Watch videos', description: 'Click "Watch" in the left sidebar to browse videos from friends and pages you follow.' },
    ],
    seniorTips: [
      'Press Command+"+" to zoom in on the page for larger text. Command+"-" to zoom out.',
      'Use the Mac\'s Reader mode in Safari (click the icon in the address bar) to read long Facebook articles without distractions.',
      'Set Facebook as your homepage in Safari Preferences > General for instant access when you open the browser.',
      'Use the "Save" option on posts to come back to them later — click the three dots on any post and select "Save post."',
    ],
    commonIssues: [
      { problem: 'Facebook is not loading', solution: 'Check your internet connection. Try clearing Safari\'s cache in Safari > Settings > Privacy > Manage Website Data. Restart Safari.' },
      { problem: 'Videos are not playing', solution: 'Make sure your Mac is not in Low Power Mode. Try refreshing the page. If using Safari, try Chrome instead as some videos play better there.' },
      { problem: 'I am logged out every time I close the browser', solution: 'Make sure "Block all cookies" is not enabled in Safari > Settings > Privacy. Check the "Keep me logged in" box when logging into Facebook.' },
    ],
  },
  {
    appSlug: 'facebook',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'Open Chrome browser on your Chromebook.',
      'Go to facebook.com.',
      'No installation needed — Facebook works perfectly in the Chrome browser.',
      'Optionally, install the Android app from the Google Play Store.',
    ],
    setupSteps: [
      { title: 'Go to Facebook', description: 'Open Chrome and navigate to facebook.com.' },
      { title: 'Log in', description: 'Enter your email and password to sign in, or create a new account.' },
      { title: 'Bookmark it', description: 'Press Ctrl+D to bookmark Facebook for quick access.' },
    ],
    basicUsage: [
      { title: 'Browse and interact', description: 'Scroll through your News Feed, Like posts, and leave comments just like on any computer.' },
      { title: 'Share posts and photos', description: 'Click "What\'s on your mind?" to create a post. Add photos from your Chromebook\'s files.' },
      { title: 'Use groups and Marketplace', description: 'Click "Groups" or "Marketplace" in the left sidebar to join communities or browse local deals.' },
      { title: 'Message friends', description: 'Click the Messenger icon at the top right to chat with friends.' },
    ],
    seniorTips: [
      'The Chrome browser version of Facebook works great on Chromebooks and gives you the full desktop experience.',
      'Use Ctrl+"+" to zoom in for larger text and easier reading.',
      'Chromebooks start quickly, making it easy to check Facebook anytime.',
      'Pin the Facebook tab in Chrome: right-click the tab and select "Pin" so it stays open and is always ready.',
    ],
    commonIssues: [
      { problem: 'Facebook is slow', solution: 'Close unnecessary tabs. Clear your browsing data with Ctrl+Shift+Delete. Make sure your Chromebook is updated to the latest version.' },
      { problem: 'I cannot upload photos', solution: 'When Facebook asks to upload, browse to your photos in the Files app. Photos might be in "Downloads" or "Images" folder on your Chromebook.' },
      { problem: 'Notifications are not showing on my Chromebook', solution: 'Make sure Facebook has notification permission in Chrome. Click the lock icon in the address bar > Site Settings > Notifications > Allow.' },
    ],
  },

  // ─── Instagram ───────────────────────────────────────────────────────────
  {
    appSlug: 'instagram',
    deviceSlug: 'iphone',
    downloadSteps: [
      'Open the App Store.',
      'Search for "Instagram."',
      'Tap "Get" next to Instagram by Meta Platforms.',
      'Confirm with Face ID, Touch ID, or Apple ID password.',
      'Wait for the install to complete.',
    ],
    setupSteps: [
      { title: 'Open Instagram', description: 'Tap the colorful Instagram icon on your home screen.' },
      { title: 'Create an account or log in', description: 'Tap "Create New Account" and follow the prompts — you will need an email or phone number, a username, and a password. Or tap "Log In" if you have an account.' },
      { title: 'Set up your profile', description: 'Add a profile photo, your name, and a short bio (like "Grandma of 5, love gardening").' },
      { title: 'Find people to follow', description: 'Instagram will suggest accounts. Follow friends, family, and topics you enjoy.' },
    ],
    basicUsage: [
      { title: 'Browse your feed', description: 'The main screen shows photos and videos from people you follow. Scroll down to see more. Double-tap a photo to Like it (a heart will appear).' },
      { title: 'Post a photo', description: 'Tap the "+" icon at the bottom center. Choose a photo from your library or take a new one. Add a filter if you like, write a caption, and tap "Share."' },
      { title: 'Watch Stories', description: 'Tap the circular profile pictures at the top of your feed to watch Stories — short photo or video updates that disappear after 24 hours.' },
      { title: 'Send a direct message', description: 'Tap the paper airplane icon at the top right. Select a person and type your message.' },
      { title: 'Explore and discover', description: 'Tap the magnifying glass at the bottom to explore trending content, or search for specific people and topics.' },
    ],
    seniorTips: [
      'Start by following your family members — Instagram is a lovely way to see photos of grandchildren and family events.',
      'Double-tap any photo to "Like" it. You can also tap the heart icon below the photo.',
      'Your account should be set to "Private" for safety — go to Settings > Privacy > Private Account and turn it on. Only approved people can see your posts.',
      'You do not need to post anything to enjoy Instagram — just follow and browse.',
    ],
    commonIssues: [
      { problem: 'I do not know what to post', solution: 'Start simple — share photos of your garden, pets, cooking, or walks. Family will love seeing what you are up to. There is no pressure to post regularly.' },
      { problem: 'Strangers are following me', solution: 'Switch to a private account: Settings > Privacy > Private Account. Remove followers you do not know by tapping their name > Remove.' },
      { problem: 'The text and buttons are too small', solution: 'Increase your iPhone\'s text size in Settings > Display & Brightness > Text Size. Instagram will use the larger text. Also try pinching to zoom on photos.' },
    ],
  },
  {
    appSlug: 'instagram',
    deviceSlug: 'ipad',
    downloadSteps: [
      'Open the App Store on your iPad.',
      'Search for "Instagram."',
      'Tap "Get" and confirm the download.',
      'Wait for it to install.',
    ],
    setupSteps: [
      { title: 'Open Instagram', description: 'Tap the Instagram icon on your home screen.' },
      { title: 'Log in or sign up', description: 'Log in with your existing account or create a new one.' },
      { title: 'Complete your profile', description: 'Add a profile picture and bio.' },
    ],
    basicUsage: [
      { title: 'Browse photos', description: 'Scroll through your feed to see photos from people you follow. The iPad screen makes photos look stunning.' },
      { title: 'Post photos', description: 'Tap the "+" icon to share photos from your iPad\'s library. Add a caption and filters, then tap "Share."' },
      { title: 'Watch Reels', description: 'Tap the Reels icon at the bottom to watch short entertaining videos. Swipe up for the next video.' },
      { title: 'Message friends', description: 'Tap the paper airplane icon to send direct messages.' },
    ],
    seniorTips: [
      'Instagram on iPad shows photos bigger and more beautifully than on a phone.',
      'Use the iPad\'s larger screen to enjoy Reels and Stories in greater detail.',
      'Connect the iPad to your TV with an HDMI adapter to show Instagram photos to the whole family.',
      'Set your account to Private in Settings > Privacy for more control over who sees your content.',
    ],
    commonIssues: [
      { problem: 'Instagram looks like a phone app on my iPad', solution: 'Instagram has not always had a fully optimized iPad version. Update to the latest version from the App Store. You can also use instagram.com in Safari for a better iPad experience.' },
      { problem: 'I cannot post videos', solution: 'Make sure Instagram has access to your photos and camera in iPad Settings > Instagram > Photos and Camera.' },
      { problem: 'Feed is showing too many ads', solution: 'You cannot remove ads completely, but you can tap the three dots on any ad and choose "Hide ad" to see fewer of that type.' },
    ],
  },
  {
    appSlug: 'instagram',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'Open the Google Play Store.',
      'Search for "Instagram."',
      'Tap "Install" next to Instagram by Meta Platforms.',
      'Wait for the download and tap "Open."',
    ],
    setupSteps: [
      { title: 'Open Instagram', description: 'Tap the Instagram icon on your home screen.' },
      { title: 'Create account or log in', description: 'Sign up with your email or phone number, or log in if you already have an account. You can also sign up with your Facebook account.' },
      { title: 'Set up your profile', description: 'Add a profile photo and a short bio about yourself.' },
      { title: 'Follow people', description: 'Search for family and friends. Follow accounts that interest you — cooking, gardening, travel, news.' },
    ],
    basicUsage: [
      { title: 'Browse your feed', description: 'Scroll through the main screen to see photos and videos. Double-tap to Like. Tap the speech bubble to comment.' },
      { title: 'Post a photo', description: 'Tap "+" at the bottom, choose or take a photo, apply a filter, write a caption, and tap "Share."' },
      { title: 'Watch Stories and Reels', description: 'Tap profile pictures at the top for Stories. Tap the Reels icon for short videos.' },
      { title: 'Search and discover', description: 'Tap the magnifying glass to search for people, hashtags, and topics.' },
      { title: 'Send messages', description: 'Tap the paper airplane icon to open Direct Messages and chat with friends.' },
    ],
    seniorTips: [
      'Make text bigger in Android Settings > Display > Font Size for easier reading.',
      'Keep your account private: go to Settings > Privacy > Account Privacy and turn on "Private account."',
      'You do not have to post — you can simply browse and enjoy photos from family and friends.',
      'Use Instagram Lite from the Play Store if your phone is running slowly or low on storage.',
    ],
    commonIssues: [
      { problem: 'Instagram is using too much storage', solution: 'Go to Android Settings > Apps > Instagram > Storage > Clear Cache. This removes temporary files without affecting your account.' },
      { problem: 'Photos look blurry when I post them', solution: 'Make sure you are on Wi-Fi when posting. In Instagram Settings > Account > Data Usage, turn off "Use less mobile data." Use your camera app to take the photo first, then post from your gallery for the best quality.' },
      { problem: 'I keep getting notifications', solution: 'Go to Instagram > Profile > Menu > Settings > Notifications. Turn off the types of notifications you do not want, like likes and comments from people you do not follow.' },
    ],
  },
  {
    appSlug: 'instagram',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'Open your web browser.',
      'Go to instagram.com.',
      'No download needed — Instagram works in your browser.',
      'You can also install the Instagram app from the Microsoft Store.',
    ],
    setupSteps: [
      { title: 'Go to Instagram', description: 'Open your browser and visit instagram.com.' },
      { title: 'Log in or sign up', description: 'Enter your credentials to log in, or click "Sign Up" to create a new account.' },
    ],
    basicUsage: [
      { title: 'Browse your feed', description: 'The main page shows photos and videos from people you follow. Click the heart icon to Like.' },
      { title: 'Post a photo', description: 'Click the "+" icon at the top to create a new post. Drag and drop a photo or click to select from your files.' },
      { title: 'Send messages', description: 'Click the paper airplane icon to open Direct Messages.' },
      { title: 'Search for people', description: 'Click the magnifying glass to search for accounts, hashtags, and places.' },
    ],
    seniorTips: [
      'Instagram on a computer shows photos large and clear — great for enjoying family pictures.',
      'Use Ctrl+"+" to zoom in for larger text and images.',
      'You can post photos from your computer, which is handy if you have pictures saved on your PC.',
      'Bookmark instagram.com for quick access.',
    ],
    commonIssues: [
      { problem: 'I cannot post photos from my computer', solution: 'Click the "+" icon at the top of the page. If you do not see it, try refreshing the page. You can drag and drop photos directly into the upload window.' },
      { problem: 'Instagram loads slowly', solution: 'Clear your browser cache with Ctrl+Shift+Delete. Close extra tabs. Try a different browser if the problem continues.' },
      { problem: 'Stories do not play', solution: 'Make sure your browser is up to date. Try Chrome or Edge if you are using an older browser. Check that auto-play is not disabled in your browser settings.' },
    ],
  },
  {
    appSlug: 'instagram',
    deviceSlug: 'mac',
    downloadSteps: [
      'Open Safari or Chrome on your Mac.',
      'Go to instagram.com.',
      'No download needed — Instagram works in your browser.',
    ],
    setupSteps: [
      { title: 'Visit Instagram', description: 'Open your browser and go to instagram.com.' },
      { title: 'Log in', description: 'Enter your username and password to log in, or sign up for a new account.' },
    ],
    basicUsage: [
      { title: 'Browse photos', description: 'Scroll through your feed to see posts from people you follow. Click the heart icon to Like a post.' },
      { title: 'Post from your Mac', description: 'Click the "+" icon at the top to upload photos from your Mac. Great for sharing photos from your camera.' },
      { title: 'Watch Stories and Reels', description: 'Click on profile pictures at the top for Stories. Click the Reels icon in the sidebar for short videos.' },
      { title: 'Direct messages', description: 'Click the paper airplane icon to send messages to friends.' },
    ],
    seniorTips: [
      'Press Command+"+" to zoom in for a bigger, easier-to-read view.',
      'Add instagram.com to your Dock in Safari: Share > Add to Dock for quick access.',
      'The Mac screen shows Instagram photos in beautiful quality — enjoy browsing from the comfort of your desk.',
      'Use the Mac\'s screenshot feature (Command+Shift+4) to save Instagram photos you want to keep.',
    ],
    commonIssues: [
      { problem: 'I cannot upload photos', solution: 'Click the "+" icon at the top of the page. If posting does not work in Safari, try Chrome instead.' },
      { problem: 'Instagram notifications are not showing on my Mac', solution: 'Instagram web does not support desktop notifications in all browsers. Check Safari Settings > Websites > Notifications to allow instagram.com.' },
      { problem: 'Videos do not play with sound', solution: 'Click on the video and look for the speaker icon to unmute. Check that your Mac volume is turned up.' },
    ],
  },
  {
    appSlug: 'instagram',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'Open Chrome browser and go to instagram.com.',
      'Alternatively, install the Instagram app from the Google Play Store.',
      'The website version usually works better on Chromebooks.',
    ],
    setupSteps: [
      { title: 'Open Instagram', description: 'Go to instagram.com in Chrome or open the app from your launcher.' },
      { title: 'Log in or sign up', description: 'Enter your credentials or create a new account.' },
    ],
    basicUsage: [
      { title: 'Browse and Like', description: 'Scroll through your feed and double-click photos to Like them.' },
      { title: 'Post photos', description: 'Click the "+" icon to upload photos from your Chromebook\'s files.' },
      { title: 'Watch Reels', description: 'Click the Reels tab to watch short entertaining videos.' },
      { title: 'Message friends', description: 'Click the paper airplane icon to open your messages.' },
    ],
    seniorTips: [
      'Use instagram.com in Chrome for the best experience on Chromebook — it fills the whole screen.',
      'Press Ctrl+"+" to zoom in for larger text and photos.',
      'Pin the Instagram tab in Chrome for always-ready access.',
      'Chromebooks are secure, so your account is well-protected.',
    ],
    commonIssues: [
      { problem: 'The Play Store app looks too small', solution: 'Use instagram.com in Chrome instead — it is designed for larger screens and works much better on Chromebooks.' },
      { problem: 'I cannot upload photos', solution: 'When the upload dialog appears, navigate to your Chromebook\'s Files app. Photos may be in "Downloads" or "Images."' },
      { problem: 'Page loads slowly', solution: 'Close other tabs and apps. Make sure your Chromebook is connected to strong Wi-Fi. Clear browsing data with Ctrl+Shift+Delete.' },
    ],
  },

  // ─── YouTube ─────────────────────────────────────────────────────────────
  {
    appSlug: 'youtube',
    deviceSlug: 'iphone',
    downloadSteps: [
      'Open the App Store.',
      'Search for "YouTube."',
      'Tap "Get" next to YouTube by Google.',
      'Confirm with Face ID, Touch ID, or Apple ID password.',
      'Wait for the install to finish.',
    ],
    setupSteps: [
      { title: 'Open YouTube', description: 'Tap the red YouTube icon on your home screen.' },
      { title: 'Sign in (optional)', description: 'Tap the profile icon at the top right and sign in with your Google account. This lets you subscribe to channels and save videos. You can also browse without signing in.' },
      { title: 'Allow notifications', description: 'Choose whether to allow notifications about new videos from channels you subscribe to.' },
    ],
    basicUsage: [
      { title: 'Search for videos', description: 'Tap the magnifying glass at the top and type what you want to watch — like "how to knit a scarf" or "Frank Sinatra songs." Tap a video to play it.' },
      { title: 'Subscribe to channels', description: 'Find a channel you like and tap the red "Subscribe" button below the video. New videos from that channel will appear in your feed.' },
      { title: 'Control playback', description: 'Tap the video to show controls. Tap the pause button to pause, or the full-screen icon to fill your screen. Drag the progress bar to skip forward or back.' },
      { title: 'Adjust quality', description: 'Tap the gear icon on the video, then "Quality" to choose a higher or lower resolution depending on your internet speed.' },
      { title: 'Save videos for later', description: 'Tap "Save" below a video to add it to your Watch Later list. Find it in Library > Watch Later.' },
    ],
    seniorTips: [
      'YouTube is free — you do not need a paid subscription to watch videos. YouTube Premium removes ads but is optional.',
      'Search for tutorials on anything — "how to use iPhone," "easy recipes for one," "chair exercises for seniors." There is a video for everything.',
      'Turn your phone sideways (landscape) for a bigger video view.',
      'Use YouTube\'s "Captions" feature: tap "CC" on any video to see subtitles, which helps if you have trouble hearing.',
    ],
    commonIssues: [
      { problem: 'Videos keep buffering or pausing', solution: 'Connect to Wi-Fi for smoother playback. Lower the video quality by tapping the gear icon > Quality and choosing a lower number like 480p.' },
      { problem: 'I see too many ads', solution: 'Free YouTube includes ads. You can skip most ads after 5 seconds by tapping "Skip Ad." YouTube Premium ($13.99/month) removes all ads if the ads bother you.' },
      { problem: 'I accidentally subscribed to a channel', solution: 'Go to the channel page and tap the "Subscribed" button to unsubscribe. Or go to Library > Subscriptions to manage all your subscriptions.' },
    ],
  },
  {
    appSlug: 'youtube',
    deviceSlug: 'ipad',
    downloadSteps: [
      'Open the App Store on your iPad.',
      'Search for "YouTube."',
      'Tap "Get" and confirm.',
      'Wait for installation.',
    ],
    setupSteps: [
      { title: 'Open YouTube', description: 'Tap the red YouTube icon.' },
      { title: 'Sign in', description: 'Tap the profile icon and sign in with your Google account for the best experience.' },
    ],
    basicUsage: [
      { title: 'Search and watch', description: 'Use the search bar to find videos. The iPad\'s large screen makes watching very enjoyable.' },
      { title: 'Subscribe to channels', description: 'Tap "Subscribe" on channels you enjoy to get their new videos in your feed.' },
      { title: 'Use Picture-in-Picture', description: 'Swipe up while watching a video to shrink it to a small window, so you can browse other apps while the video plays.' },
      { title: 'Cast to your TV', description: 'If you have a smart TV or Chromecast, tap the cast icon (rectangle with Wi-Fi lines) to play the video on your TV.' },
    ],
    seniorTips: [
      'Prop your iPad on a stand for comfortable hands-free viewing, like a personal mini television.',
      'Enable captions by tapping "CC" on any video — very helpful for hearing dialogue clearly.',
      'Use the iPad\'s bigger screen to follow along with exercise, cooking, or craft tutorials more easily.',
      'Download videos for offline viewing (with YouTube Premium) before trips where you might not have internet.',
    ],
    commonIssues: [
      { problem: 'Video quality is poor', solution: 'Tap the gear icon on the video and set quality to 720p or 1080p. Make sure you are on Wi-Fi for the best quality.' },
      { problem: 'YouTube drains my iPad battery quickly', solution: 'Lower the screen brightness. Turn off auto-play (tap your profile > Settings > Auto-play > Off). Connect to power during long viewing sessions.' },
      { problem: 'I cannot find my saved videos', solution: 'Tap "Library" at the bottom right, then "Watch Later" to find videos you saved.' },
    ],
  },
  {
    appSlug: 'youtube',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'YouTube usually comes pre-installed on Android phones.',
      'If not, open the Google Play Store and search for "YouTube."',
      'Tap "Install" or "Update" if it is already installed.',
    ],
    setupSteps: [
      { title: 'Open YouTube', description: 'Tap the red YouTube icon on your home screen or in the app drawer.' },
      { title: 'Sign in', description: 'If you are already signed into your Google account on your phone, YouTube is ready. If not, tap the profile icon and sign in.' },
    ],
    basicUsage: [
      { title: 'Search for videos', description: 'Tap the magnifying glass and type what you want to watch. Tap a video to play it.' },
      { title: 'Subscribe', description: 'Tap the red "Subscribe" button under any video to follow that channel.' },
      { title: 'Control playback', description: 'Tap the video for controls. Double-tap the right side to skip forward 10 seconds, or double-tap the left side to go back 10 seconds.' },
      { title: 'Share a video', description: 'Tap "Share" below a video to send it to friends via text, email, or WhatsApp.' },
      { title: 'Cast to TV', description: 'Tap the cast icon to play videos on your smart TV or Chromecast device.' },
    ],
    seniorTips: [
      'Turn your phone sideways for a bigger, full-screen video experience.',
      'Tap "CC" on any video to turn on captions for easier understanding.',
      'Use voice search: tap the microphone icon in the search bar and say what you want to watch.',
      'YouTube is great for learning — search for anything from "how to use Android phone" to "stretching exercises for seniors."',
    ],
    commonIssues: [
      { problem: 'YouTube uses too much data', solution: 'Go to your profile icon > Settings > Video quality preferences > On mobile networks and set to "Data saver." This uses less data per video.' },
      { problem: 'Ads are too frequent', solution: 'YouTube shows ads on the free version. You can skip most after 5 seconds. YouTube Premium removes ads for $13.99/month.' },
      { problem: 'Videos are not loading', solution: 'Check your internet connection. Try closing and reopening the app. Clear the YouTube cache in Android Settings > Apps > YouTube > Storage > Clear Cache.' },
    ],
  },
  {
    appSlug: 'youtube',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'Open your web browser (Chrome, Edge, or Firefox).',
      'Go to youtube.com.',
      'No installation needed — YouTube works entirely in your browser.',
    ],
    setupSteps: [
      { title: 'Go to YouTube', description: 'Open your browser and type youtube.com in the address bar.' },
      { title: 'Sign in', description: 'Click "Sign In" at the top right and enter your Google account credentials for the full experience.' },
    ],
    basicUsage: [
      { title: 'Search for videos', description: 'Type in the search bar at the top and press Enter. Click any video thumbnail to play it.' },
      { title: 'Control playback', description: 'Use the spacebar to pause/play. Press F for full screen. Use the left and right arrow keys to skip 5 seconds.' },
      { title: 'Subscribe to channels', description: 'Click "Subscribe" below any video to follow that channel.' },
      { title: 'Create playlists', description: 'Click "Save" below a video, then create a playlist to organize your favorite videos by topic.' },
      { title: 'Adjust settings', description: 'Click the gear icon on a video to change quality, playback speed, and captions.' },
    ],
    seniorTips: [
      'Press F to go full screen for the best viewing experience. Press Escape to exit full screen.',
      'Use the spacebar to quickly pause and resume videos.',
      'Turn on captions by clicking "CC" at the bottom of the video — great for hearing dialogue clearly.',
      'Use Ctrl+"+" to zoom in on the YouTube page for larger text around the video.',
    ],
    commonIssues: [
      { problem: 'Videos are blurry', solution: 'Click the gear icon on the video, then "Quality" and choose 720p or 1080p for clearer video. This requires a good internet connection.' },
      { problem: 'YouTube is slow to load', solution: 'Close other browser tabs. Clear your browser cache with Ctrl+Shift+Delete. Make sure your internet connection is strong.' },
      { problem: 'I cannot sign in', solution: 'Make sure you have a Google account. If you forgot your password, click "Forgot password?" during sign-in and follow the recovery steps.' },
    ],
  },
  {
    appSlug: 'youtube',
    deviceSlug: 'mac',
    downloadSteps: [
      'Open Safari or Chrome on your Mac.',
      'Go to youtube.com.',
      'No installation needed — YouTube works in your web browser.',
    ],
    setupSteps: [
      { title: 'Visit YouTube', description: 'Open your browser and go to youtube.com.' },
      { title: 'Sign in', description: 'Click "Sign In" at the top right and enter your Google account details.' },
    ],
    basicUsage: [
      { title: 'Search and watch', description: 'Type in the search bar and click a video to watch it. Use the spacebar to pause/play.' },
      { title: 'Full screen', description: 'Click the full-screen icon at the bottom right of the video, or press F.' },
      { title: 'Subscribe', description: 'Click "Subscribe" below videos from channels you enjoy.' },
      { title: 'Use captions', description: 'Click "CC" at the bottom of the video for subtitles.' },
    ],
    seniorTips: [
      'Press Command+"+" to zoom in on the page for bigger text.',
      'Use Picture-in-Picture: right-click the video twice and select "Enter Picture in Picture" to watch while doing other things.',
      'Add youtube.com to your Dock: in Safari, click Share > Add to Dock.',
      'The Mac\'s speakers or connected headphones make for a great listening experience for music videos and podcasts.',
    ],
    commonIssues: [
      { problem: 'Videos do not play in Safari', solution: 'Update Safari and macOS to the latest versions. Try Chrome if videos continue to have issues in Safari.' },
      { problem: 'Sound is not working', solution: 'Check your Mac volume. Click the speaker icon in the menu bar. Make sure the video is not muted — look for the speaker icon on the video player.' },
      { problem: 'YouTube is using a lot of memory', solution: 'Close other browser tabs. Try watching in a different browser. Restart your browser if it has been open for a long time.' },
    ],
  },
  {
    appSlug: 'youtube',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'Open Chrome and go to youtube.com.',
      'YouTube works perfectly in the Chrome browser.',
      'You can also install the YouTube app from the Google Play Store.',
    ],
    setupSteps: [
      { title: 'Open YouTube', description: 'Go to youtube.com in Chrome or open the YouTube app.' },
      { title: 'Sign in', description: 'You are likely already signed in with your Google account on your Chromebook. If not, click "Sign In."' },
    ],
    basicUsage: [
      { title: 'Search and watch', description: 'Type in the search bar to find videos. Click to play. Use spacebar to pause.' },
      { title: 'Full screen', description: 'Click the full-screen icon or press F for a bigger view.' },
      { title: 'Subscribe', description: 'Click "Subscribe" below videos to follow your favorite channels.' },
      { title: 'Cast to TV', description: 'Click the cast icon to play videos on your smart TV.' },
    ],
    seniorTips: [
      'Your Chromebook is always signed into Google, so YouTube knows your preferences automatically.',
      'Use Ctrl+"+" to zoom in for larger text around the video.',
      'Turn on captions with "CC" for easier understanding.',
      'Chromebooks work great with YouTube — the browser experience is smooth and fast.',
    ],
    commonIssues: [
      { problem: 'Video playback is choppy', solution: 'Lower the quality by clicking the gear icon > Quality and choosing 480p. Close other tabs and apps. Connect to a stronger Wi-Fi network.' },
      { problem: 'Sound is not working', solution: 'Click the time at the bottom right of your Chromebook and check the volume slider. Make sure the video is not muted.' },
      { problem: 'Full screen does not work', solution: 'Press F or click the full-screen icon on the video. Press Escape to exit. If it still does not work, try refreshing the page.' },
    ],
  },

  // ─── Gmail ───────────────────────────────────────────────────────────────
  {
    appSlug: 'gmail',
    deviceSlug: 'iphone',
    downloadSteps: [
      'Open the App Store.',
      'Search for "Gmail."',
      'Tap "Get" next to Gmail by Google.',
      'Confirm and wait for installation.',
    ],
    setupSteps: [
      { title: 'Open Gmail', description: 'Tap the Gmail icon (red and white envelope) on your home screen.' },
      { title: 'Sign in', description: 'Enter your Google email address and password. If you do not have a Gmail account, tap "Create account" and follow the steps — you will need to choose an email address and password.' },
      { title: 'Allow notifications', description: 'Allow notifications so you know when new emails arrive.' },
    ],
    basicUsage: [
      { title: 'Read an email', description: 'Tap any email in your inbox to read it. Tap the back arrow to return to your inbox.' },
      { title: 'Send an email', description: 'Tap the "Compose" button (pencil icon) at the bottom right. Enter the recipient\'s email address in "To," type a subject, write your message, and tap the send arrow.' },
      { title: 'Reply to an email', description: 'Open an email and tap the reply arrow at the bottom. Type your response and tap send.' },
      { title: 'Add an attachment', description: 'While composing an email, tap the paperclip icon to attach a photo or file from your iPhone.' },
      { title: 'Search your emails', description: 'Tap the search bar at the top and type a name, subject, or keyword to find specific emails.' },
    ],
    seniorTips: [
      'Star important emails by tapping the star icon next to them. Find starred emails by tapping the menu (three lines) and selecting "Starred."',
      'Delete junk by swiping right on an email, or select multiple by long-pressing and checking boxes.',
      'Set up a signature: tap the menu (three lines) > Settings > your email > Signature Settings. Type something like "Sent from my iPhone."',
      'Gmail\'s search is very powerful — if you remember even one word from an email, you can find it.',
    ],
    commonIssues: [
      { problem: 'I am not getting email notifications', solution: 'Go to iPhone Settings > Notifications > Gmail and make sure notifications are turned on. In the Gmail app, tap the menu > Settings > your account > Notifications and set to "All."' },
      { problem: 'I cannot find an email', solution: 'Check the Spam and Trash folders — the email may have been filtered there. Use the search bar to search by sender name or subject.' },
      { problem: 'Emails are not syncing', solution: 'Pull down on the inbox to refresh. Check your internet connection. Make sure you are signed in by tapping your profile picture at the top right.' },
    ],
  },
  {
    appSlug: 'gmail',
    deviceSlug: 'ipad',
    downloadSteps: [
      'Open the App Store on your iPad.',
      'Search for "Gmail."',
      'Tap "Get" and confirm.',
      'Wait for installation.',
    ],
    setupSteps: [
      { title: 'Open Gmail', description: 'Tap the Gmail icon on your home screen.' },
      { title: 'Sign in', description: 'Enter your Google account email and password, or create a new account.' },
      { title: 'Set as default (optional)', description: 'Go to iPad Settings > Gmail > Default Mail App and select Gmail to make it your default email.' },
    ],
    basicUsage: [
      { title: 'Read and reply', description: 'Tap an email to read it. The iPad shows the email list on the left and the email content on the right for easy navigation.' },
      { title: 'Compose an email', description: 'Tap the Compose button, fill in the recipient, subject, and message, then tap send.' },
      { title: 'Organize with labels', description: 'Swipe left on an email for options like Archive, Delete, or add Labels to organize.' },
      { title: 'Search', description: 'Use the search bar to find emails by sender, subject, or content.' },
    ],
    seniorTips: [
      'The iPad\'s split-screen view in Gmail shows your inbox and the selected email side by side — very convenient.',
      'Use a Bluetooth keyboard with your iPad for comfortable email writing.',
      'Tap the star next to important emails to mark them for easy finding later.',
      'Increase text size in iPad Settings > Display & Brightness > Text Size for larger email text.',
    ],
    commonIssues: [
      { problem: 'Gmail is not loading emails', solution: 'Pull down on the inbox to refresh. Check your Wi-Fi connection. Close and reopen the app.' },
      { problem: 'Attachments do not open', solution: 'Tap the attachment to download it. Some file types need additional apps to open. For documents, you may need Google Docs or a PDF reader installed.' },
      { problem: 'I cannot add another email account', solution: 'Tap the menu (three lines) > Settings > Add Account. Gmail can manage multiple email accounts, including Yahoo and Outlook.' },
    ],
  },
  {
    appSlug: 'gmail',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'Gmail comes pre-installed on most Android phones.',
      'If not installed, open the Google Play Store and search for "Gmail."',
      'Tap "Install" or "Update."',
    ],
    setupSteps: [
      { title: 'Open Gmail', description: 'Tap the Gmail icon in your app drawer or on your home screen.' },
      { title: 'Sign in', description: 'Your Google account is usually already connected. If not, add your account by tapping the menu > Settings > Add account.' },
    ],
    basicUsage: [
      { title: 'Check your inbox', description: 'Open Gmail to see your latest emails. Pull down to refresh.' },
      { title: 'Read and reply', description: 'Tap an email to read it. Tap the reply arrow to respond.' },
      { title: 'Send a new email', description: 'Tap the "+" or Compose button, enter the recipient, subject, and message, then tap send.' },
      { title: 'Attach files', description: 'While composing, tap the paperclip icon to attach photos or documents.' },
      { title: 'Delete and archive', description: 'Swipe right on an email to archive it, or swipe left to delete it.' },
    ],
    seniorTips: [
      'Use the Gmail widget on your home screen: long-press on an empty space > Widgets > Gmail. This shows your latest emails without opening the app.',
      'Enable "Undo Send": after sending an email, a brief "Undo" option appears at the bottom. Tap it if you made a mistake.',
      'Use voice to compose: tap the microphone icon on your keyboard to dictate your email instead of typing.',
      'Mark important contacts as "starred" so their emails always stand out in your inbox.',
    ],
    commonIssues: [
      { problem: 'I am not getting notifications for new emails', solution: 'Go to Gmail > Menu > Settings > your account > Notifications and set to "All." Also check Android Settings > Apps > Gmail > Notifications and make sure they are enabled.' },
      { problem: 'Gmail is using too much storage', solution: 'Delete emails with large attachments. In Gmail, search for "has:attachment larger:5M" to find large emails. Delete or archive emails you no longer need.' },
      { problem: 'Emails are going to spam', solution: 'Check the Spam folder regularly. If you find a legitimate email there, open it and tap "Report not spam." Gmail will learn to deliver similar emails to your inbox.' },
    ],
  },
  {
    appSlug: 'gmail',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'Open your web browser.',
      'Go to gmail.com.',
      'No installation needed — Gmail works in your browser.',
    ],
    setupSteps: [
      { title: 'Go to Gmail', description: 'Open Chrome, Edge, or Firefox and go to gmail.com.' },
      { title: 'Sign in', description: 'Enter your Google email and password. If you do not have an account, click "Create account."' },
      { title: 'Bookmark it', description: 'Press Ctrl+D to bookmark Gmail for easy access.' },
    ],
    basicUsage: [
      { title: 'Read emails', description: 'Click any email to read it. Click the back arrow to return to your inbox.' },
      { title: 'Compose an email', description: 'Click "Compose" at the top left. Enter the recipient, subject, and message. Click the send button.' },
      { title: 'Reply and forward', description: 'Click "Reply" to respond, or "Forward" to send the email to someone else.' },
      { title: 'Organize', description: 'Use labels and folders to organize emails. Drag emails to labels in the left sidebar, or use the label icon at the top.' },
      { title: 'Search', description: 'Use the search bar at the top to find any email by keyword, sender, or date.' },
    ],
    seniorTips: [
      'Gmail on a computer gives you the full experience with the biggest screen for reading and writing emails.',
      'Use Ctrl+"+" to zoom in for larger text.',
      'Enable the reading pane: click the gear icon > Settings > Inbox > Reading Pane to see emails without leaving your inbox.',
      'Learn keyboard shortcuts: press "?" in Gmail to see all shortcuts. "C" composes a new email, "R" replies.',
    ],
    commonIssues: [
      { problem: 'Gmail is slow', solution: 'Clear your browser cache with Ctrl+Shift+Delete. Close unnecessary tabs. Try using Gmail in a different browser.' },
      { problem: 'I cannot find the Compose button', solution: 'Look at the top left of the Gmail page — there should be a big "Compose" button. If the sidebar is collapsed, click the three-line menu first.' },
      { problem: 'Attachments fail to upload', solution: 'Make sure the file is under 25 MB. Check your internet connection. Try a different browser if the problem continues.' },
    ],
  },
  {
    appSlug: 'gmail',
    deviceSlug: 'mac',
    downloadSteps: [
      'Open Safari or Chrome on your Mac.',
      'Go to gmail.com.',
      'No installation needed — Gmail works in your web browser.',
    ],
    setupSteps: [
      { title: 'Visit Gmail', description: 'Open your browser and go to gmail.com.' },
      { title: 'Sign in', description: 'Enter your Google email address and password.' },
      { title: 'Add to Dock', description: 'In Safari, click Share > Add to Dock for quick access to Gmail.' },
    ],
    basicUsage: [
      { title: 'Read and reply', description: 'Click emails to read them. Click Reply to respond.' },
      { title: 'Compose', description: 'Click "Compose" at the top left to write a new email.' },
      { title: 'Search', description: 'Use the search bar to find any email quickly.' },
      { title: 'Organize with labels', description: 'Create labels to organize your emails into categories like "Family," "Medical," "Bills."' },
    ],
    seniorTips: [
      'Press Command+"+" to zoom in on Gmail for larger text.',
      'Use Mac Dictation (press Fn twice) to speak your emails instead of typing.',
      'Set gmail.com as your Safari homepage for instant access.',
      'Use the Gmail "Undo Send" feature — after clicking Send, you have a few seconds to click "Undo" if you spot a mistake.',
    ],
    commonIssues: [
      { problem: 'Gmail does not load in Safari', solution: 'Try clearing Safari cache in Safari > Settings > Privacy > Manage Website Data. Update Safari and macOS to the latest version. Try Chrome as an alternative.' },
      { problem: 'I cannot drag and drop attachments', solution: 'In the compose window, you can drag files from Finder directly into the email. Alternatively, click the paperclip icon to browse for files.' },
      { problem: 'Desktop notifications do not work', solution: 'In Gmail, click the gear icon > See all settings > General > Desktop Notifications and enable them. Also check Mac System Settings > Notifications for your browser.' },
    ],
  },
  {
    appSlug: 'gmail',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'Open Chrome and go to gmail.com.',
      'Gmail is already integrated into your Chromebook — you may already be signed in.',
      'You can also install the Gmail app from the Google Play Store.',
    ],
    setupSteps: [
      { title: 'Open Gmail', description: 'Click the Gmail icon in your app launcher, or go to gmail.com in Chrome.' },
      { title: 'Verify sign-in', description: 'Your Chromebook\'s Google account is usually already connected to Gmail. If not, sign in with your email and password.' },
    ],
    basicUsage: [
      { title: 'Read and reply', description: 'Click emails to read them. Click Reply to respond.' },
      { title: 'Compose new emails', description: 'Click "Compose" at the top left to write a new email.' },
      { title: 'Search', description: 'Use the search bar to find specific emails.' },
      { title: 'Manage labels', description: 'Organize your emails with labels for easy categorization.' },
    ],
    seniorTips: [
      'Gmail on Chromebook works seamlessly since both are Google products.',
      'Use Ctrl+"+" to zoom in for larger text.',
      'Set up offline access: Gmail Settings > Offline > Enable offline mail to read emails without internet.',
      'Your Chromebook\'s Google account means Gmail is always ready — no extra sign-in needed.',
    ],
    commonIssues: [
      { problem: 'Gmail notifications do not appear', solution: 'Click the lock icon in Chrome\'s address bar and allow Notifications. Also check Chromebook Settings > Notifications.' },
      { problem: 'I cannot attach files', solution: 'Click the paperclip icon in the compose window. Navigate to your Files app to find your documents or photos.' },
      { problem: 'Gmail is slow on my Chromebook', solution: 'Close unnecessary tabs. Clear browsing data with Ctrl+Shift+Delete. Restart your Chromebook if it has been on for a while.' },
    ],
  },

  // ─── Google Maps ─────────────────────────────────────────────────────────
  {
    appSlug: 'google-maps',
    deviceSlug: 'iphone',
    downloadSteps: [
      'Open the App Store.',
      'Search for "Google Maps."',
      'Tap "Get" next to Google Maps by Google.',
      'Confirm and wait for installation.',
    ],
    setupSteps: [
      { title: 'Open Google Maps', description: 'Tap the Google Maps icon on your home screen.' },
      { title: 'Allow location', description: 'Tap "Allow While Using App" when asked for location access. This lets Maps show where you are.' },
      { title: 'Sign in (optional)', description: 'Sign in with your Google account to save favorite places and get personalized recommendations.' },
    ],
    basicUsage: [
      { title: 'Search for a place', description: 'Tap the search bar at the top and type an address, business name, or category like "pharmacy near me." Tap "Search."' },
      { title: 'Get directions', description: 'Search for a destination, then tap "Directions." Choose driving, walking, or public transit. Tap "Start" for turn-by-turn navigation.' },
      { title: 'See your location', description: 'Tap the blue circle icon at the bottom right to center the map on your current location.' },
      { title: 'Explore nearby', description: 'Tap categories at the top of the screen like "Restaurants," "Gas stations," or "Pharmacies" to see nearby options.' },
      { title: 'Save a place', description: 'Search for a place, tap it, and tap "Save" to add it to your saved places for future reference.' },
    ],
    seniorTips: [
      'Use voice directions: when navigating, the app speaks turn-by-turn directions so you do not need to look at the screen while driving.',
      'Save your home address: tap "Saved" at the bottom, then set your home and work addresses. You can then just say "directions to home."',
      'Download maps for offline use before traveling: search for an area, tap the three dots, and select "Download offline map."',
      'Use the "Share location" feature to let family know where you are — tap your profile icon > Location sharing.',
    ],
    commonIssues: [
      { problem: 'My location is wrong on the map', solution: 'Make sure location services are turned on: iPhone Settings > Privacy & Security > Location Services > Google Maps > While Using. Go outside or near a window for better GPS signal.' },
      { problem: 'Navigation voice is not working', solution: 'Make sure your iPhone is not on silent mode (check the switch on the side). In Google Maps during navigation, tap the speaker icon and select the voice-on option.' },
      { problem: 'The map is hard to read', solution: 'Pinch outward with two fingers to zoom in. You can also tap the layers icon (stacked squares) and switch to "Satellite" view for a real-world photo view.' },
    ],
  },
  {
    appSlug: 'google-maps',
    deviceSlug: 'ipad',
    downloadSteps: [
      'Open the App Store on your iPad.',
      'Search for "Google Maps."',
      'Tap "Get" and confirm.',
      'Wait for installation.',
    ],
    setupSteps: [
      { title: 'Open Google Maps', description: 'Tap the Google Maps icon.' },
      { title: 'Allow location', description: 'Grant location access so Maps can show where you are.' },
      { title: 'Sign in', description: 'Sign in with your Google account for saved places and history.' },
    ],
    basicUsage: [
      { title: 'Search and navigate', description: 'Search for any address or business. Tap "Directions" and "Start" for turn-by-turn navigation.' },
      { title: 'Explore the big map', description: 'The iPad\'s large screen shows a wide map view, making it easy to explore areas visually.' },
      { title: 'Street View', description: 'Drop the little orange person icon onto a road to see a street-level photo view of the area.' },
      { title: 'Save favorite places', description: 'Tap any location and tap "Save" to bookmark it for later.' },
    ],
    seniorTips: [
      'The iPad\'s large screen makes Google Maps excellent for trip planning — see the whole route at a glance.',
      'Use Street View to virtually visit a place before you go, so you know what it looks like.',
      'Download offline maps before road trips in case you lose cell signal.',
      'Prop the iPad on your dashboard with a mount for hands-free navigation in the car.',
    ],
    commonIssues: [
      { problem: 'GPS is inaccurate on my iPad', solution: 'Wi-Fi-only iPads have less accurate GPS than cellular models. Connect to Wi-Fi for better location accuracy, or use your iPhone for navigation instead.' },
      { problem: 'Map tiles are not loading', solution: 'Check your internet connection. Try closing and reopening the app. Download offline maps for areas you visit frequently.' },
      { problem: 'Cannot get voice navigation', solution: 'Make sure your iPad is not muted. Turn up the volume. In the Maps app during navigation, tap the speaker icon to enable voice.' },
    ],
  },
  {
    appSlug: 'google-maps',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'Google Maps comes pre-installed on most Android phones.',
      'If not installed, open the Google Play Store and search for "Google Maps."',
      'Tap "Install" or "Update."',
    ],
    setupSteps: [
      { title: 'Open Google Maps', description: 'Tap the Maps icon on your home screen or in your app drawer.' },
      { title: 'Allow location', description: 'Grant location access when prompted for accurate directions and nearby search.' },
    ],
    basicUsage: [
      { title: 'Search for a place', description: 'Tap the search bar and type an address or business name. Tap a result to see it on the map.' },
      { title: 'Get directions', description: 'Tap "Directions," choose your travel mode, and tap "Start" for navigation.' },
      { title: 'Explore nearby', description: 'Tap category chips below the search bar to find restaurants, gas stations, and more near you.' },
      { title: 'Share your location', description: 'Tap your profile picture > Location sharing > Share location. Family can then see where you are in real time.' },
      { title: 'Use voice', description: 'Say "Hey Google, navigate to [place]" to start navigation hands-free.' },
    ],
    seniorTips: [
      'Use voice search: tap the microphone icon and say where you want to go. No typing needed.',
      'Share your real-time location with family members so they always know you are safe.',
      'Save your home address and frequently visited places for one-tap navigation.',
      'Download maps for offline use before traveling to areas with poor cell service.',
    ],
    commonIssues: [
      { problem: 'GPS takes a long time to find my location', solution: 'Go outside or near a window. Make sure location is set to "High accuracy" in Android Settings > Location > Mode. Restart your phone if GPS continues to be slow.' },
      { problem: 'Navigation voice is too quiet', solution: 'Turn up your phone volume during navigation. In Google Maps Settings > Navigation > Guidance volume, set it to "Louder."' },
      { problem: 'Maps is draining my battery', solution: 'Navigation uses GPS and screen, which takes power. Plug in your phone during long trips. Lower screen brightness and close other apps.' },
    ],
  },
  {
    appSlug: 'google-maps',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'Open your web browser.',
      'Go to maps.google.com.',
      'No installation needed — Google Maps works in your browser.',
    ],
    setupSteps: [
      { title: 'Go to Google Maps', description: 'Open your browser and visit maps.google.com.' },
      { title: 'Allow location (optional)', description: 'Click "Allow" when your browser asks for location access to see your current position on the map.' },
      { title: 'Sign in', description: 'Click "Sign In" at the top right for saved places and search history.' },
    ],
    basicUsage: [
      { title: 'Search for places', description: 'Type an address or business name in the search bar and press Enter.' },
      { title: 'Get directions', description: 'Click "Directions," enter your start and end points, and choose driving, transit, or walking.' },
      { title: 'Explore with Street View', description: 'Drag the little orange person icon onto any road to see a street-level photo view.' },
      { title: 'Print directions', description: 'After getting directions, click the three dots menu and select "Print" to get a paper copy for your trip.' },
      { title: 'Measure distance', description: 'Right-click on the map and select "Measure distance." Click points to measure the distance between locations.' },
    ],
    seniorTips: [
      'Print directions before a trip so you have a backup if your phone loses signal.',
      'Use Street View to virtually visit your destination before going — you will recognize the place when you arrive.',
      'Zoom in and out with your mouse scroll wheel to explore the map.',
      'Bookmark maps.google.com for quick access to directions anytime.',
    ],
    commonIssues: [
      { problem: 'The map is hard to see', solution: 'Use Ctrl+"+" to zoom in on the page. You can also use the "+" and "-" buttons on the map. Switch to Satellite view for a real-world photo view.' },
      { problem: 'Directions are not showing', solution: 'Make sure both the starting point and destination are entered correctly. Try a different browser if the route does not appear.' },
      { problem: 'Google Maps does not show my location', solution: 'Click "Allow" when the browser asks for location permission. Location on a desktop computer uses your Wi-Fi connection and may be less accurate than on a phone.' },
    ],
  },
  {
    appSlug: 'google-maps',
    deviceSlug: 'mac',
    downloadSteps: [
      'Open Safari or Chrome on your Mac.',
      'Go to maps.google.com.',
      'No installation needed.',
    ],
    setupSteps: [
      { title: 'Visit Google Maps', description: 'Open your browser and go to maps.google.com.' },
      { title: 'Allow location', description: 'Click "Allow" when asked for location access.' },
      { title: 'Sign in', description: 'Sign in with your Google account for saved places.' },
    ],
    basicUsage: [
      { title: 'Search and navigate', description: 'Type a destination in the search bar. Click "Directions" for route options.' },
      { title: 'Street View', description: 'Drag the orange person icon onto a road to explore street-level imagery.' },
      { title: 'Print directions', description: 'Click the three dots and "Print" to get paper directions before a trip.' },
      { title: 'Save places', description: 'Click the star icon on any location to save it to your favorites.' },
    ],
    seniorTips: [
      'Use Command+"+" to zoom in on the page for a bigger view.',
      'Use the Mac\'s trackpad: pinch to zoom on the map, and two-finger scroll to move around.',
      'Print directions before trips for a reliable paper backup.',
      'Add maps.google.com to your Dock for one-click access.',
    ],
    commonIssues: [
      { problem: 'Map loads slowly', solution: 'Close other browser tabs. Check your internet connection. Try a different browser.' },
      { problem: 'Location is not accurate', solution: 'Desktop location uses Wi-Fi positioning and may be off by several blocks. For accurate navigation, use your phone.' },
      { problem: 'Cannot print directions', solution: 'Click "Directions" first to generate a route. Then click the three dots menu > Print. If printing does not work, try the keyboard shortcut Command+P.' },
    ],
  },
  {
    appSlug: 'google-maps',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'Open Chrome and go to maps.google.com.',
      'Google Maps works perfectly in the Chrome browser on Chromebook.',
      'You can also install the Google Maps app from the Google Play Store.',
    ],
    setupSteps: [
      { title: 'Open Google Maps', description: 'Go to maps.google.com in Chrome or open the Maps app.' },
      { title: 'Allow location', description: 'Grant location permission for accurate results.' },
    ],
    basicUsage: [
      { title: 'Search for places', description: 'Type in the search bar to find any location or business.' },
      { title: 'Get directions', description: 'Click "Directions" to plan your route with driving, transit, or walking options.' },
      { title: 'Explore with Street View', description: 'Use the orange person icon to explore locations at street level.' },
      { title: 'Print directions', description: 'Generate a route and click Print for a paper copy.' },
    ],
    seniorTips: [
      'Google Maps on Chromebook gives you the same experience as on any computer.',
      'Use Ctrl+"+" to zoom in for a bigger map and larger text.',
      'Print directions before road trips as a backup to your phone.',
      'Your Google account syncs saved places across all your devices.',
    ],
    commonIssues: [
      { problem: 'Location is inaccurate', solution: 'Location on a Chromebook uses Wi-Fi and may not be as accurate as a phone with GPS. For precise navigation, use your phone.' },
      { problem: 'Maps loads slowly', solution: 'Close other tabs and apps. Check your Wi-Fi connection. Restart Chrome if it has been open for a long time.' },
      { problem: 'Cannot save offline maps', solution: 'Offline maps are only available in the mobile app. Install Google Maps from the Play Store to download offline maps for your Chromebook.' },
    ],
  },

  // ─── Google Photos ───────────────────────────────────────────────────────
  {
    appSlug: 'google-photos',
    deviceSlug: 'iphone',
    downloadSteps: [
      'Open the App Store.',
      'Search for "Google Photos."',
      'Tap "Get" and confirm.',
      'Wait for installation.',
    ],
    setupSteps: [
      { title: 'Open Google Photos', description: 'Tap the Google Photos icon (colorful pinwheel).' },
      { title: 'Sign in', description: 'Sign in with your Google account.' },
      { title: 'Enable backup', description: 'When asked, turn on "Back up & sync" to automatically save your photos to the cloud. This means if you ever lose your phone, your photos are safe.' },
      { title: 'Allow photo access', description: 'Grant Google Photos access to all your photos on iPhone.' },
    ],
    basicUsage: [
      { title: 'Browse your photos', description: 'The main screen shows all your photos organized by date. Scroll to browse. Tap any photo to see it full-screen.' },
      { title: 'Search your photos', description: 'Tap the search bar and type things like "beach," "Christmas," or a person\'s name. Google Photos uses AI to find matching photos.' },
      { title: 'Share photos', description: 'Open a photo, tap the share icon, and send it via text, email, or WhatsApp.' },
      { title: 'Create an album', description: 'Tap Library > "+" > Album. Name it and add photos. Share the album link with family.' },
      { title: 'Free up space', description: 'Tap your profile icon > Free up space to delete photos from your phone that are already backed up to the cloud.' },
    ],
    seniorTips: [
      'Google Photos automatically backs up your photos — if you ever lose your phone, your memories are safe in the cloud.',
      'The search feature is amazing — try searching "dog," "birthday," or a family member\'s name to find photos instantly.',
      'Create shared albums with family members so everyone can add photos to the same album.',
      'Memories appear at the top of the app — these are lovely slideshows of photos from previous years.',
    ],
    commonIssues: [
      { problem: 'Photos are not backing up', solution: 'Open Google Photos > Profile icon > Photos settings > Backup and make sure "Backup" is turned on. Connect to Wi-Fi, as backup often pauses on cellular data.' },
      { problem: 'I am running out of Google storage', solution: 'Google offers 15 GB of free storage. Delete old large files, or upgrade to Google One for more storage (starting at $1.99/month for 100 GB).' },
      { problem: 'Deleted a photo by accident', solution: 'Tap Library > Trash. Find the photo and tap "Restore." Photos stay in Trash for 60 days before being permanently deleted.' },
    ],
  },
  {
    appSlug: 'google-photos',
    deviceSlug: 'ipad',
    downloadSteps: [
      'Open the App Store on your iPad.',
      'Search for "Google Photos."',
      'Tap "Get" and confirm.',
      'Wait for installation.',
    ],
    setupSteps: [
      { title: 'Open Google Photos', description: 'Tap the Google Photos icon.' },
      { title: 'Sign in', description: 'Sign in with your Google account.' },
      { title: 'Enable backup', description: 'Turn on backup to save your iPad photos to the cloud.' },
    ],
    basicUsage: [
      { title: 'Browse photos', description: 'Scroll through your photo library organized by date. The iPad screen shows more photos at once.' },
      { title: 'Search', description: 'Use the search bar to find photos by content, location, or date.' },
      { title: 'Create albums', description: 'Tap Library > "+" to create albums and organize your photos.' },
      { title: 'Share with family', description: 'Select photos and tap share to send them, or create a shared album for ongoing sharing.' },
    ],
    seniorTips: [
      'The iPad\'s large screen makes browsing photos a wonderful experience.',
      'Use pinch-to-zoom on photos to see fine details.',
      'Create a shared family album — everyone can add their photos to it.',
      'Memories at the top show curated slideshows from your past — great for reminiscing.',
    ],
    commonIssues: [
      { problem: 'Photos are not syncing', solution: 'Check that backup is enabled in Google Photos settings. Make sure you are connected to Wi-Fi.' },
      { problem: 'Cannot find a photo', solution: 'Use the search bar — try typing the location, event, or what is in the photo. Check the Trash if you may have deleted it.' },
      { problem: 'The app is slow with many photos', solution: 'This is normal when you have thousands of photos. Give the app time to load. Make sure your iPad has enough free storage.' },
    ],
  },
  {
    appSlug: 'google-photos',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'Google Photos comes pre-installed on most Android phones.',
      'If not, open the Google Play Store and search for "Google Photos."',
      'Tap "Install" or "Update."',
    ],
    setupSteps: [
      { title: 'Open Google Photos', description: 'Tap the Google Photos icon.' },
      { title: 'Enable backup', description: 'Turn on "Back up & sync" to automatically save all your photos to the cloud.' },
    ],
    basicUsage: [
      { title: 'Browse and search', description: 'Scroll through your photos or use the search bar to find specific images.' },
      { title: 'Share photos', description: 'Select photos and tap the share icon to send via text, email, or other apps.' },
      { title: 'Edit photos', description: 'Open a photo and tap "Edit" to crop, rotate, adjust brightness, or apply filters.' },
      { title: 'Free up space', description: 'Tap profile icon > Free up space to remove phone copies of photos already backed up.' },
      { title: 'Create albums', description: 'Tap Library > Create album to organize photos by event, trip, or theme.' },
    ],
    seniorTips: [
      'Turn on automatic backup so your photos are always safe, even if your phone breaks or gets lost.',
      'Try searching "sunset," "garden," or a person\'s name to find photos without scrolling.',
      'Use "Free up space" regularly to keep your phone from running out of storage.',
      'Share albums with family — everyone can add their own photos to the album.',
    ],
    commonIssues: [
      { problem: 'Backup is stuck', solution: 'Make sure you are on Wi-Fi. Check that backup is enabled in Settings. Restart the app. If stuck for a long time, restart your phone.' },
      { problem: 'Photos are duplicated', solution: 'Google Photos may show photos from multiple folders. Go to Settings > Backup > Device folders and choose which folders to back up to avoid duplicates.' },
      { problem: 'Storage is full', solution: 'Use "Free up space" to delete local copies. Delete old screenshots and videos you do not need. Consider upgrading Google storage for more room.' },
    ],
  },
  {
    appSlug: 'google-photos',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'Open your web browser.',
      'Go to photos.google.com.',
      'No installation needed — Google Photos works in your browser.',
    ],
    setupSteps: [
      { title: 'Go to Google Photos', description: 'Visit photos.google.com in your browser.' },
      { title: 'Sign in', description: 'Sign in with your Google account to see all your backed-up photos.' },
    ],
    basicUsage: [
      { title: 'Browse photos', description: 'Scroll through your photos organized by date. Click any photo to see it full-screen.' },
      { title: 'Upload photos', description: 'Click "Upload" at the top to add photos from your computer to Google Photos.' },
      { title: 'Search', description: 'Use the search bar to find photos by content, location, date, or person.' },
      { title: 'Download photos', description: 'Click a photo, then click the three dots menu > Download to save it to your computer.' },
      { title: 'Create albums', description: 'Click Albums in the sidebar, then "Create album" to organize photos.' },
    ],
    seniorTips: [
      'Upload photos from your digital camera to Google Photos on your computer — they will then be available on all your devices.',
      'Use the powerful search: type "birthday 2024" or "Christmas" to find specific memories instantly.',
      'Download photos to your computer for printing.',
      'Use Ctrl+"+" to zoom in for larger photo thumbnails.',
    ],
    commonIssues: [
      { problem: 'Upload is slow', solution: 'Large photo libraries take time to upload. Make sure your internet connection is strong. You can close the tab and upload will continue in the background.' },
      { problem: 'Photos are not showing from my phone', solution: 'Make sure backup is enabled in the Google Photos app on your phone. Photos may take a while to appear if you just turned on backup.' },
      { problem: 'I cannot find the photo I am looking for', solution: 'Try the search bar — Google Photos is very good at searching. Check the Trash if you may have deleted it. Make sure you are signed into the correct Google account.' },
    ],
  },
  {
    appSlug: 'google-photos',
    deviceSlug: 'mac',
    downloadSteps: [
      'Open Safari or Chrome.',
      'Go to photos.google.com.',
      'No installation needed.',
    ],
    setupSteps: [
      { title: 'Visit Google Photos', description: 'Go to photos.google.com in your browser.' },
      { title: 'Sign in', description: 'Sign in with your Google account.' },
    ],
    basicUsage: [
      { title: 'Browse and search', description: 'View your photo library by date or search for specific content.' },
      { title: 'Upload from Mac', description: 'Click "Upload" to add photos from your Mac to Google Photos.' },
      { title: 'Download photos', description: 'Click any photo > three dots > Download to save to your Mac.' },
      { title: 'Create and share albums', description: 'Click Albums > Create album to organize and share photos with family.' },
    ],
    seniorTips: [
      'Import photos from your camera to your Mac, then upload them to Google Photos for cloud backup.',
      'Use Command+"+" to zoom in for bigger photo thumbnails.',
      'The search is incredibly smart — search for "dog," "beach," "food," or even colors.',
      'Share albums with family so everyone can enjoy the memories together.',
    ],
    commonIssues: [
      { problem: 'Photos from my Mac are not in Google Photos', solution: 'You need to upload them manually. Click Upload > Computer and select the photos from your Mac. They are not automatically synced like on a phone.' },
      { problem: 'Google Photos is different from Mac Photos', solution: 'Yes, these are two separate services. Mac Photos stores photos locally and in iCloud. Google Photos stores photos in Google\'s cloud. You can use both if you like.' },
      { problem: 'Download is not working', solution: 'Click the three dots menu on a photo and select "Download." If it does not start, check your Mac\'s Downloads folder and try a different browser.' },
    ],
  },
  {
    appSlug: 'google-photos',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'Open Chrome and go to photos.google.com.',
      'You may also install the Google Photos app from the Play Store.',
      'Your Chromebook\'s Google account is likely already connected.',
    ],
    setupSteps: [
      { title: 'Open Google Photos', description: 'Go to photos.google.com or open the app from your launcher.' },
      { title: 'Verify sign-in', description: 'Your Chromebook Google account should be automatically signed in.' },
    ],
    basicUsage: [
      { title: 'Browse photos', description: 'View all your backed-up photos organized by date.' },
      { title: 'Upload photos', description: 'Click Upload to add photos from your Chromebook files.' },
      { title: 'Search', description: 'Search by keyword, date, person, or location.' },
      { title: 'Share and download', description: 'Select photos to share or download to your Chromebook.' },
    ],
    seniorTips: [
      'Google Photos works seamlessly on Chromebook since both are Google products.',
      'All your phone photos appear here automatically if backup is enabled on your phone.',
      'Use Ctrl+"+" to zoom in for larger photo thumbnails.',
      'The Explore section shows you photo collages and animations Google creates automatically.',
    ],
    commonIssues: [
      { problem: 'Photos from my phone are not showing', solution: 'Make sure backup is enabled in Google Photos on your phone. Check that both devices use the same Google account.' },
      { problem: 'Cannot upload local photos', solution: 'Click Upload > Computer and navigate to your Chromebook\'s Files app to find photos.' },
      { problem: 'Running out of storage', solution: 'Check your storage at one.google.com. Delete unwanted photos or consider upgrading your Google One storage plan.' },
    ],
  },

  // ─── Amazon ──────────────────────────────────────────────────────────────
  {
    appSlug: 'amazon',
    deviceSlug: 'iphone',
    downloadSteps: [
      'Open the App Store.',
      'Search for "Amazon Shopping."',
      'Tap "Get" next to Amazon Shopping by AMZN Mobile.',
      'Confirm and wait for installation.',
    ],
    setupSteps: [
      { title: 'Open Amazon', description: 'Tap the Amazon icon on your home screen.' },
      { title: 'Sign in or create account', description: 'Tap "Already a customer? Sign In" if you have an account. Otherwise, tap "Create a new Amazon account" — you will need your name, email, and a password.' },
      { title: 'Add a payment method', description: 'Go to Your Account > Payment options and add a credit or debit card for purchases.' },
      { title: 'Set your address', description: 'Go to Your Account > Addresses and add your delivery address.' },
    ],
    basicUsage: [
      { title: 'Search for products', description: 'Tap the search bar at the top and type what you want. Browse through the results. You can also use the camera icon to scan barcodes.' },
      { title: 'Read reviews', description: 'Scroll down on any product page to read reviews from other customers. Look at the star rating and read 3-4 reviews before buying.' },
      { title: 'Add to cart and buy', description: 'Tap "Add to Cart" to save items, then tap the cart icon and "Proceed to checkout" when ready to buy. Review your order and tap "Place your order."' },
      { title: 'Track your orders', description: 'Tap the profile icon at the bottom, then "Your Orders" to see the status and delivery date of your purchases.' },
      { title: 'Return an item', description: 'Go to Your Orders, find the item, and tap "Return or Replace Items." Follow the steps to arrange a return.' },
    ],
    seniorTips: [
      'Always check the seller — "Ships from and sold by Amazon.com" is the most reliable option.',
      'Read the 1-star and 2-star reviews as well as the positive ones to get a balanced view of the product.',
      'Use "Subscribe & Save" for items you buy regularly (like vitamins or paper towels) to get a discount and automatic delivery.',
      'Enable two-factor authentication in Your Account > Login & Security for extra security on your account.',
    ],
    commonIssues: [
      { problem: 'I ordered the wrong item', solution: 'Go to Your Orders and tap the order. If it has not shipped yet, you can cancel it. If it has shipped, wait for delivery and then return it following the return process.' },
      { problem: 'My payment was declined', solution: 'Check that your credit card details are correct in Your Account > Payment options. Make sure the card has not expired and has sufficient funds. Try adding a different card.' },
      { problem: 'I am getting too many notifications', solution: 'Go to Amazon Settings > Notifications and turn off the types you do not want, like deals and recommendations.' },
    ],
  },
  {
    appSlug: 'amazon',
    deviceSlug: 'ipad',
    downloadSteps: [
      'Open the App Store on your iPad.',
      'Search for "Amazon Shopping."',
      'Tap "Get" and confirm.',
      'Wait for installation.',
    ],
    setupSteps: [
      { title: 'Open Amazon', description: 'Tap the Amazon icon.' },
      { title: 'Sign in', description: 'Log in with your existing Amazon account or create a new one.' },
      { title: 'Add payment and address', description: 'Set up your payment method and delivery address in Your Account.' },
    ],
    basicUsage: [
      { title: 'Search and browse', description: 'Use the search bar or browse categories. The iPad shows more products per row for easier browsing.' },
      { title: 'Compare products', description: 'Open multiple products and compare features, prices, and reviews side by side using the iPad\'s multitasking.' },
      { title: 'Order and track', description: 'Add items to cart, checkout, and track deliveries in Your Orders.' },
      { title: 'Use Amazon Fresh', description: 'Tap "Amazon Fresh" to order groceries for same-day or next-day delivery.' },
    ],
    seniorTips: [
      'The iPad\'s larger screen makes browsing Amazon much more comfortable — you can see product photos and details clearly.',
      'Use Split View to compare Amazon with another site or your notes.',
      'Save items to your Wish List by tapping "Add to List" to buy them later.',
      'Check for coupons — many products have a "Clip coupon" option on the product page for extra savings.',
    ],
    commonIssues: [
      { problem: 'The app is showing items not available in my area', solution: 'Check your delivery address in the app. Tap the location icon at the top to set your ZIP code for accurate results.' },
      { problem: 'Cannot zoom in on product photos', solution: 'Tap a product photo to see it larger. Pinch to zoom in on the details. Swipe to see additional photos.' },
      { problem: 'Checkout keeps failing', solution: 'Check your payment method and address. Make sure your internet connection is stable. Try closing and reopening the app.' },
    ],
  },
  {
    appSlug: 'amazon',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'Open the Google Play Store.',
      'Search for "Amazon Shopping."',
      'Tap "Install."',
      'Wait for the download and tap "Open."',
    ],
    setupSteps: [
      { title: 'Open Amazon', description: 'Tap the Amazon icon.' },
      { title: 'Sign in or create account', description: 'Sign in with your email and password, or create a new account.' },
      { title: 'Set up payment and address', description: 'Add your delivery address and payment method in Your Account settings.' },
    ],
    basicUsage: [
      { title: 'Search for products', description: 'Tap the search bar and type what you need. You can also use the camera icon to search by taking a photo of a product.' },
      { title: 'Buy items', description: 'Tap "Add to Cart" and proceed to checkout. Confirm your address and payment, then tap "Place your order."' },
      { title: 'Track deliveries', description: 'Tap the profile icon > Your Orders to see delivery status.' },
      { title: 'Scan barcodes', description: 'Tap the camera icon in the search bar and point at a product barcode to quickly find it on Amazon.' },
    ],
    seniorTips: [
      'Use the "Subscribe & Save" option for recurring purchases to get a discount.',
      'Read reviews carefully — focus on "Verified Purchase" reviews for the most honest opinions.',
      'Check "Amazon\'s Choice" badges for products that Amazon recommends based on price and reviews.',
      'Use the Amazon Assistant widget for quick access to deals.',
    ],
    commonIssues: [
      { problem: 'Prices seem different from the website', solution: 'Prices can vary. Check both the app and website for the best deal. Make sure you are looking at the same seller and size/color.' },
      { problem: 'Cannot track my package', solution: 'Go to Your Orders and tap the order. Tracking information appears once the item ships. Allow 24 hours after the shipping notification for tracking to update.' },
      { problem: 'App is crashing', solution: 'Update Amazon in the Play Store. Clear the cache in Android Settings > Apps > Amazon > Storage > Clear Cache. Restart your phone.' },
    ],
  },
  {
    appSlug: 'amazon',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'Open your web browser.',
      'Go to amazon.com.',
      'No installation needed — Amazon works in your browser.',
    ],
    setupSteps: [
      { title: 'Go to Amazon', description: 'Open your browser and visit amazon.com.' },
      { title: 'Sign in', description: 'Click "Hello, Sign in" at the top right and enter your email and password.' },
      { title: 'Set your address', description: 'Click "Deliver to" at the top left to set your location for accurate delivery estimates.' },
    ],
    basicUsage: [
      { title: 'Search and browse', description: 'Type in the search bar at the top. Browse by category using the "All" dropdown menu.' },
      { title: 'Compare products', description: 'Open products in separate tabs to compare features, prices, and reviews.' },
      { title: 'Add to cart and buy', description: 'Click "Add to Cart," then click the cart icon to check out. Review your order and click "Place your order."' },
      { title: 'Track orders', description: 'Click "Returns & Orders" at the top right to see all your orders and their delivery status.' },
    ],
    seniorTips: [
      'Amazon on a computer lets you see more products and details at once than on a phone.',
      'Use Ctrl+"+" to zoom in on product images and descriptions.',
      'Bookmark amazon.com for quick access.',
      'Check the "Today\'s Deals" section for daily discounts.',
    ],
    commonIssues: [
      { problem: 'I am worried about scams', solution: 'Only buy from sellers with high ratings. Look for "Ships from and sold by Amazon" for the most protection. Never give your password to anyone. Use a strong, unique password.' },
      { problem: 'Cannot find my order history', solution: 'Click "Returns & Orders" at the top of the page. All your past orders are listed there by date.' },
      { problem: 'Checkout page is not loading', solution: 'Clear your browser cache with Ctrl+Shift+Delete. Try a different browser. Check your internet connection.' },
    ],
  },
  {
    appSlug: 'amazon',
    deviceSlug: 'mac',
    downloadSteps: [
      'Open Safari or Chrome.',
      'Go to amazon.com.',
      'No installation needed.',
    ],
    setupSteps: [
      { title: 'Visit Amazon', description: 'Go to amazon.com in your browser.' },
      { title: 'Sign in', description: 'Click "Hello, Sign in" and enter your credentials.' },
      { title: 'Set delivery location', description: 'Click "Deliver to" at the top left to confirm your location.' },
    ],
    basicUsage: [
      { title: 'Search and shop', description: 'Use the search bar to find products. Browse categories for inspiration.' },
      { title: 'Read reviews', description: 'Scroll down on product pages to read customer reviews before buying.' },
      { title: 'Order and track', description: 'Add to cart, checkout, and track deliveries in Returns & Orders.' },
      { title: 'Use Amazon Prime', description: 'If you have Prime, enjoy free 2-day shipping on eligible items. Sign up at amazon.com/prime.' },
    ],
    seniorTips: [
      'Use Command+"+" to zoom in on product pages for larger text and images.',
      'Open multiple tabs to compare products side by side.',
      'Add amazon.com to your Safari Favorites for one-click access.',
      'Use the "Save for Later" feature in your cart to remember items you might want to buy next time.',
    ],
    commonIssues: [
      { problem: 'Amazon keeps asking me to sign in', solution: 'Make sure Safari is not set to block cookies. Go to Safari > Settings > Privacy and uncheck "Block all cookies." Check "Keep me signed in" when logging in.' },
      { problem: 'Product images are not loading', solution: 'Check your internet connection. Refresh the page. Clear Safari cache in Safari > Settings > Privacy > Manage Website Data.' },
      { problem: 'Cannot apply a gift card', solution: 'Go to Your Account > Gift Cards > Apply to Your Account. Enter the code from the back of the gift card.' },
    ],
  },
  {
    appSlug: 'amazon',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'Open Chrome and go to amazon.com.',
      'Amazon works perfectly in the Chrome browser.',
      'You can also install the Amazon app from the Google Play Store.',
    ],
    setupSteps: [
      { title: 'Open Amazon', description: 'Go to amazon.com in Chrome or open the app.' },
      { title: 'Sign in', description: 'Enter your email and password.' },
      { title: 'Set your address', description: 'Confirm your delivery location.' },
    ],
    basicUsage: [
      { title: 'Shop and browse', description: 'Search for products, browse categories, and read reviews.' },
      { title: 'Order items', description: 'Add to cart, checkout, and confirm your order.' },
      { title: 'Track packages', description: 'Click Returns & Orders to see delivery status.' },
    ],
    seniorTips: [
      'Amazon on a Chromebook gives you the full desktop shopping experience.',
      'Use Ctrl+"+" to zoom in for larger product photos and text.',
      'Bookmark amazon.com for quick access.',
      'Chromebooks are very secure for online shopping — your payment information is protected.',
    ],
    commonIssues: [
      { problem: 'Page loads slowly', solution: 'Close other tabs. Check your Wi-Fi connection. Clear browsing data with Ctrl+Shift+Delete.' },
      { problem: 'Cannot complete checkout', solution: 'Make sure your payment method and address are up to date. Try refreshing the page. Check that pop-up blockers are not interfering.' },
      { problem: 'Worried about payment security', solution: 'Chromebooks are very secure. Amazon uses encryption for all transactions. Look for the lock icon in the address bar to confirm the connection is secure.' },
    ],
  },

  // ─── Uber/Lyft ───────────────────────────────────────────────────────────
  {
    appSlug: 'uber-lyft',
    deviceSlug: 'iphone',
    downloadSteps: [
      'Open the App Store.',
      'Search for "Uber" (or "Lyft" — both work similarly).',
      'Tap "Get" and confirm.',
      'Wait for installation. You can install both apps to compare prices.',
    ],
    setupSteps: [
      { title: 'Open the app', description: 'Tap the Uber or Lyft icon on your home screen.' },
      { title: 'Create an account', description: 'Enter your phone number. You will receive a verification code via text. Enter it to continue.' },
      { title: 'Add your name and email', description: 'Enter your first name, last name, and email address.' },
      { title: 'Add a payment method', description: 'Add a credit or debit card for payment. You can also link PayPal or Apple Pay.' },
      { title: 'Allow location', description: 'Tap "Allow While Using App" for location access so the app knows where to pick you up.' },
    ],
    basicUsage: [
      { title: 'Request a ride', description: 'Open the app and type your destination in the "Where to?" bar. Choose a ride type (UberX is the standard option). Tap "Confirm" to request your ride.' },
      { title: 'Wait for your driver', description: 'The app shows your driver\'s name, photo, car model, and license plate. Wait for them at your location. The app shows how far away they are.' },
      { title: 'During the ride', description: 'You can follow the route on the map. The app shows estimated arrival time. Share your ride status with family by tapping the shield icon.' },
      { title: 'Payment is automatic', description: 'When you arrive, the fare is automatically charged to your card. No cash needed. You can tip your driver in the app.' },
    ],
    seniorTips: [
      'Always check the driver\'s photo, name, and license plate before getting in the car.',
      'Share your ride status with a family member: tap the shield icon and "Share my trip." They can track your ride in real time.',
      'Schedule rides in advance: tap the clock icon when setting your destination to book a ride for a future time.',
      'Try both Uber and Lyft — compare prices for the same trip, as one is sometimes cheaper than the other.',
    ],
    commonIssues: [
      { problem: 'I cannot find my driver', solution: 'Check the app for the car model and license plate number. Call your driver by tapping the phone icon in the app. Make sure your location pin is in the right spot — drag it if needed.' },
      { problem: 'The ride costs more than expected', solution: 'Prices increase during busy times ("surge pricing"). The app always shows the estimated fare before you confirm. Check the fare estimate and wait for a less busy time if the price is too high.' },
      { problem: 'I feel unsafe', solution: 'The app has a safety button (shield icon). You can share your trip with family, see your driver\'s verified name and photo, and call 911 directly from the app in an emergency.' },
    ],
  },
  {
    appSlug: 'uber-lyft',
    deviceSlug: 'ipad',
    downloadSteps: [
      'Open the App Store on your iPad.',
      'Search for "Uber" or "Lyft."',
      'Tap "Get" and confirm.',
      'Wait for installation.',
    ],
    setupSteps: [
      { title: 'Open the app', description: 'Tap the Uber or Lyft icon.' },
      { title: 'Sign in or create account', description: 'Enter your phone number for verification. Set up your name, email, and payment method.' },
      { title: 'Allow location', description: 'Grant location access so the app knows your pickup location.' },
    ],
    basicUsage: [
      { title: 'Request a ride', description: 'Type your destination in "Where to?" Choose your ride type and tap "Confirm."' },
      { title: 'Track your driver', description: 'Watch your driver approach on the map. The larger iPad screen makes the map easier to follow.' },
      { title: 'Share your trip', description: 'Tap the safety icon to share your ride details with a family member.' },
      { title: 'Rate your driver', description: 'After the ride, rate your driver and optionally leave a tip.' },
    ],
    seniorTips: [
      'The iPad\'s big screen makes the ride map very easy to see.',
      'Request rides from home using your iPad, then switch to tracking on your phone when you leave.',
      'Save your home address and frequently visited places for quick ride requests.',
      'Use scheduled rides for appointments — book the day before so you do not have to worry.',
    ],
    commonIssues: [
      { problem: 'Location is not accurate on iPad', solution: 'Wi-Fi-only iPads may show an inaccurate location. Manually drag the pickup pin to your exact location, or type in your address.' },
      { problem: 'The app looks like a phone version', solution: 'Uber and Lyft are primarily phone apps. On iPad they may appear zoomed in. The functionality works the same way.' },
      { problem: 'I cannot get a ride', solution: 'Rides are not available in all areas. If no drivers are found, try again in a few minutes or try the other app (Uber or Lyft).' },
    ],
  },
  {
    appSlug: 'uber-lyft',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'Open the Google Play Store.',
      'Search for "Uber" (or "Lyft").',
      'Tap "Install."',
      'Wait for the download and tap "Open."',
    ],
    setupSteps: [
      { title: 'Open the app', description: 'Tap the Uber or Lyft icon.' },
      { title: 'Create your account', description: 'Enter your phone number for verification. Add your name, email, and payment method.' },
      { title: 'Allow location', description: 'Grant location access for accurate pickup.' },
    ],
    basicUsage: [
      { title: 'Request a ride', description: 'Type your destination, choose a ride type, and confirm. The app will find a nearby driver.' },
      { title: 'Track your driver', description: 'See your driver\'s location, estimated arrival time, car details, and photo.' },
      { title: 'Share your trip', description: 'Tap the shield icon to share trip details with a trusted contact.' },
      { title: 'Pay automatically', description: 'The fare is charged to your card when you arrive. Tip through the app if you want.' },
    ],
    seniorTips: [
      'Verify the driver\'s identity: match the photo, name, and license plate before entering the vehicle.',
      'Use "Share my trip" to let family track your ride in real time.',
      'Schedule rides ahead of time for doctor appointments or airport trips.',
      'If prices are high, wait 10-15 minutes — surge pricing usually drops quickly.',
    ],
    commonIssues: [
      { problem: 'GPS is not finding my location', solution: 'Make sure location services are on (Android Settings > Location). Restart the app. If GPS is still inaccurate, type in your pickup address manually.' },
      { problem: 'Driver cancelled my ride', solution: 'This can happen if the driver is too far away or there is a problem. Simply request another ride — you will not be charged for a cancelled ride.' },
      { problem: 'I was charged incorrectly', solution: 'Open the app > Your Trips > tap the trip > Help. Report the fare issue and Uber/Lyft will review and adjust the charge if appropriate.' },
    ],
  },
  {
    appSlug: 'uber-lyft',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'Open your web browser.',
      'Go to uber.com or lyft.com.',
      'You can request rides from the website, though the phone app is more convenient for on-the-go use.',
    ],
    setupSteps: [
      { title: 'Go to the website', description: 'Visit uber.com or lyft.com in your browser.' },
      { title: 'Sign in', description: 'Click "Log in" and enter your phone number and password.' },
      { title: 'Request a ride', description: 'Use the ride request form on the homepage to enter your pickup and drop-off locations.' },
    ],
    basicUsage: [
      { title: 'Request from the website', description: 'Enter your pickup address and destination on the website. Choose a ride type and confirm.' },
      { title: 'Get the ride details', description: 'The website shows your driver\'s details once matched. You will also receive a text notification on your phone.' },
      { title: 'Track on the map', description: 'Watch your driver approach on the website map.' },
    ],
    seniorTips: [
      'Requesting a ride from your computer is useful when planning ahead — enter the addresses carefully and confirm.',
      'You can schedule rides in advance from the website for appointments and events.',
      'Print the ride confirmation for your records if needed.',
      'For the best experience, download the app on your phone — it is easier to use on the go.',
    ],
    commonIssues: [
      { problem: 'Website is not loading', solution: 'Try a different browser. Clear your cache with Ctrl+Shift+Delete. Check your internet connection.' },
      { problem: 'I prefer using a phone', solution: 'The phone app is the recommended way to use Uber and Lyft since it uses GPS for accurate pickup. Download the app on your iPhone or Android phone for the best experience.' },
      { problem: 'Cannot see ride status on computer', solution: 'After requesting, the ride status updates on the website. You will also receive text messages with driver details and arrival time.' },
    ],
  },
  {
    appSlug: 'uber-lyft',
    deviceSlug: 'mac',
    downloadSteps: [
      'Open Safari or Chrome.',
      'Go to uber.com or lyft.com.',
      'Rides can be requested from the website.',
    ],
    setupSteps: [
      { title: 'Visit the website', description: 'Go to uber.com or lyft.com in your browser.' },
      { title: 'Sign in', description: 'Log in with your phone number and password.' },
    ],
    basicUsage: [
      { title: 'Request a ride', description: 'Enter your pickup and drop-off addresses. Choose a ride type and confirm.' },
      { title: 'Track your driver', description: 'Watch the driver approach on the website map after confirming your ride.' },
      { title: 'Schedule rides', description: 'Use the schedule option to book rides in advance.' },
    ],
    seniorTips: [
      'The website works well for scheduling rides in advance from the comfort of your desk.',
      'For real-time tracking and safety features, the phone app is more convenient.',
      'Bookmark uber.com or lyft.com for quick access.',
      'Compare prices between Uber and Lyft before confirming — open both in separate tabs.',
    ],
    commonIssues: [
      { problem: 'Location shows incorrectly', solution: 'Desktop GPS is less accurate than a phone. Type in your exact address instead of relying on automatic location detection.' },
      { problem: 'I prefer to use my phone', solution: 'The phone app provides the best experience with GPS tracking and safety features. Use the Mac website for scheduling rides in advance.' },
      { problem: 'Payment failed', solution: 'Check your payment method in your account settings. Make sure your card is not expired and has sufficient funds.' },
    ],
  },
  {
    appSlug: 'uber-lyft',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'Open Chrome and go to uber.com or lyft.com.',
      'You can also install the Uber or Lyft app from the Google Play Store.',
    ],
    setupSteps: [
      { title: 'Open Uber/Lyft', description: 'Go to the website or open the app.' },
      { title: 'Sign in', description: 'Log in with your phone number and password.' },
      { title: 'Set up payment', description: 'Add a payment method if you have not already.' },
    ],
    basicUsage: [
      { title: 'Request a ride', description: 'Enter your addresses and confirm the ride.' },
      { title: 'Track the driver', description: 'Follow the driver on the map.' },
      { title: 'Schedule ahead', description: 'Book rides in advance for upcoming trips.' },
    ],
    seniorTips: [
      'The Play Store app may work better than the website on a Chromebook for requesting rides.',
      'For the best experience on the go, use your phone since it has the most accurate GPS.',
      'Schedule rides from your Chromebook at home before you need to leave.',
      'Always have the app installed on your phone as a backup for tracking during rides.',
    ],
    commonIssues: [
      { problem: 'Location is not accurate', solution: 'Type your full address manually instead of relying on GPS. Chromebook GPS is less accurate than a phone.' },
      { problem: 'App looks small on screen', solution: 'Use the website version for a full-screen experience. The Android app may look like a phone app on the Chromebook screen.' },
      { problem: 'Cannot get a ride in my area', solution: 'Uber and Lyft are not available in all areas. Check both apps — one may have drivers available when the other does not.' },
    ],
  },

  // ─── Zelle/Venmo ─────────────────────────────────────────────────────────
  {
    appSlug: 'zelle-venmo',
    deviceSlug: 'iphone',
    downloadSteps: [
      'For Zelle: Check your banking app first — most major banks have Zelle built in. If not, search "Zelle" in the App Store.',
      'For Venmo: Search "Venmo" in the App Store and tap "Get."',
      'Confirm with Face ID, Touch ID, or Apple ID password.',
      'Wait for installation.',
    ],
    setupSteps: [
      { title: 'Open the app', description: 'Open Zelle (in your banking app or the standalone Zelle app) or Venmo.' },
      { title: 'Create account or sign in', description: 'For Zelle: link your bank account by signing in with your bank credentials. For Venmo: create an account with your email and phone number, then link your bank account or debit card.' },
      { title: 'Verify your identity', description: 'Both apps will verify your identity with your phone number, email, and sometimes a photo ID for security.' },
      { title: 'Set up security', description: 'Enable Face ID or Touch ID for secure access. Set a PIN code as a backup.' },
    ],
    basicUsage: [
      { title: 'Send money', description: 'Tap "Send" and enter the person\'s email, phone number, or username. Enter the amount and add a note about what it is for. Review and confirm.' },
      { title: 'Request money', description: 'Tap "Request" and enter the person\'s details. Add the amount and a note (like "lunch last Tuesday"). They will receive a notification to pay you.' },
      { title: 'Check your balance', description: 'For Venmo, check your Venmo balance in the app. For Zelle, money goes directly into your bank account — check your bank balance.' },
      { title: 'View transaction history', description: 'See your past payments and requests in the activity or history section of the app.' },
    ],
    seniorTips: [
      'Zelle is often the safest choice because it is built into your bank app and money transfers directly between bank accounts.',
      'Never send money to strangers — Zelle and Venmo payments cannot be reversed once sent.',
      'Double-check the phone number or email before sending money to make sure it goes to the right person.',
      'Start with a small test payment to a family member to make sure everything works correctly.',
    ],
    commonIssues: [
      { problem: 'I sent money to the wrong person', solution: 'Contact your bank (for Zelle) or Venmo support immediately. Unfortunately, payments are usually final. This is why it is important to double-check the recipient before sending.' },
      { problem: 'My bank is not supported by Zelle', solution: 'Download the standalone Zelle app from the App Store and link your debit card directly. Alternatively, use Venmo which works with any bank.' },
      { problem: 'I received a suspicious request for money', solution: 'Do not pay requests from people you do not know — this is a common scam. Block and report the user. Your bank or Venmo will never ask you to send money via Zelle or Venmo.' },
    ],
  },
  {
    appSlug: 'zelle-venmo',
    deviceSlug: 'ipad',
    downloadSteps: [
      'For Zelle: check your banking app on iPad or download the Zelle app from the App Store.',
      'For Venmo: search "Venmo" in the App Store and tap "Get."',
      'Confirm and wait for installation.',
    ],
    setupSteps: [
      { title: 'Open the app', description: 'Tap the Zelle or Venmo icon.' },
      { title: 'Sign in', description: 'Log in with your existing account, or create one and link your bank.' },
      { title: 'Verify your identity', description: 'Complete identity verification with your phone number and email.' },
    ],
    basicUsage: [
      { title: 'Send money', description: 'Tap "Send," enter the recipient\'s details and amount, add a note, and confirm.' },
      { title: 'Request money', description: 'Tap "Request," enter who owes you, the amount, and a description.' },
      { title: 'View history', description: 'Check your transaction history to see past payments.' },
    ],
    seniorTips: [
      'The iPad\'s larger screen makes it easier to enter amounts and verify details before sending money.',
      'Always double-check the recipient before sending — there is no undo button.',
      'Use Zelle through your banking app for the most secure experience.',
      'Keep your iPad locked with a passcode or Face ID to protect your financial apps.',
    ],
    commonIssues: [
      { problem: 'The app does not work on my iPad', solution: 'Some financial apps are phone-only. If the iPad version is not available, use the Venmo or Zelle website in Safari instead.' },
      { problem: 'Transaction is pending', solution: 'First-time payments may take 1-3 business days to process. After that, Zelle payments are usually instant.' },
      { problem: 'I am locked out of my account', solution: 'Use the "Forgot password" option. You may need to verify your identity through your bank or email. Contact customer support if you are still locked out.' },
    ],
  },
  {
    appSlug: 'zelle-venmo',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'For Zelle: check if your banking app has Zelle built in. If not, search "Zelle" in the Play Store.',
      'For Venmo: search "Venmo" in the Google Play Store and tap "Install."',
      'Wait for the download.',
    ],
    setupSteps: [
      { title: 'Open the app', description: 'Tap the Zelle or Venmo icon.' },
      { title: 'Create account', description: 'For Zelle: link through your bank. For Venmo: create an account with your email and phone number.' },
      { title: 'Link your bank', description: 'Connect your bank account or debit card for sending and receiving money.' },
      { title: 'Verify your identity', description: 'Confirm your phone number and email. You may need to provide additional verification for larger amounts.' },
    ],
    basicUsage: [
      { title: 'Send money', description: 'Tap "Send," enter the recipient\'s phone, email, or username, add the amount and a note, then confirm.' },
      { title: 'Request money', description: 'Tap "Request" to ask someone to pay you. Enter their details and the amount.' },
      { title: 'Check balance', description: 'Zelle sends money to your bank directly. Venmo has its own balance — transfer it to your bank when needed.' },
      { title: 'Set up contacts', description: 'Save frequently used contacts for quicker payments next time.' },
    ],
    seniorTips: [
      'Use Zelle through your banking app — it is the most secure option and money goes directly to your bank.',
      'Never send money to someone you do not personally know, even if they claim to be from a company or the government.',
      'Start with a small amount to test that everything works before sending larger payments.',
      'Enable fingerprint or face unlock on your phone for extra security on payment apps.',
    ],
    commonIssues: [
      { problem: 'Payment is pending for days', solution: 'First-time payments may take 1-3 business days. After your first payment, future payments should be instant. Contact your bank or app support if it takes longer.' },
      { problem: 'Recipient says they did not receive the money', solution: 'Check that you sent to the correct phone number or email. Ask the recipient to check their Zelle or Venmo account and their spam email folder. Contact support if the payment shows as completed.' },
      { problem: 'App keeps asking me to re-verify', solution: 'This is a security feature. Make sure your phone number and email are current. Complete the verification steps when prompted.' },
    ],
  },
  {
    appSlug: 'zelle-venmo',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'Open your web browser.',
      'For Zelle: log into your bank\'s website — Zelle is often available there. Or go to zellepay.com.',
      'For Venmo: go to venmo.com.',
      'No installation needed — both work in your browser.',
    ],
    setupSteps: [
      { title: 'Go to the website', description: 'Visit your bank\'s website for Zelle, or venmo.com for Venmo.' },
      { title: 'Sign in', description: 'Log in with your bank credentials (for Zelle) or Venmo email and password.' },
      { title: 'Verify your identity', description: 'Complete any security verification steps required.' },
    ],
    basicUsage: [
      { title: 'Send money', description: 'Click "Send" and enter the recipient\'s details, amount, and a note. Confirm the payment.' },
      { title: 'Request money', description: 'Click "Request" to ask someone to send you money.' },
      { title: 'View transactions', description: 'Check your payment history and pending transactions.' },
    ],
    seniorTips: [
      'Using Zelle through your bank\'s website on a computer is very secure and easy to read on a large screen.',
      'Double-check all details on the big screen before confirming a payment.',
      'Print transaction receipts for your records using Ctrl+P.',
      'Always access your bank through the official website — type the address directly, do not click links in emails.',
    ],
    commonIssues: [
      { problem: 'Website says my browser is not supported', solution: 'Update your browser to the latest version. Try Chrome or Edge for the best compatibility.' },
      { problem: 'I am worried about security', solution: 'Always use your bank\'s official website (type the URL directly). Look for the lock icon in the address bar. Never enter financial information on a site you reached from an email link.' },
      { problem: 'Cannot send money from the website', solution: 'Some features may be limited to the mobile app. Try using the phone app for full functionality, or check with your bank\'s support.' },
    ],
  },
  {
    appSlug: 'zelle-venmo',
    deviceSlug: 'mac',
    downloadSteps: [
      'Open Safari or Chrome.',
      'For Zelle: go to your bank\'s website or zellepay.com.',
      'For Venmo: go to venmo.com.',
      'No installation needed.',
    ],
    setupSteps: [
      { title: 'Visit the website', description: 'Go to your bank\'s website for Zelle or venmo.com.' },
      { title: 'Sign in', description: 'Log in with your credentials.' },
    ],
    basicUsage: [
      { title: 'Send money', description: 'Click Send, enter recipient details and amount, confirm.' },
      { title: 'Request money', description: 'Click Request to ask for a payment.' },
      { title: 'Review transactions', description: 'View your payment history and account balance.' },
    ],
    seniorTips: [
      'Your bank\'s website is the most secure way to use Zelle on a Mac.',
      'Use Command+"+" to zoom in for larger text and buttons.',
      'Always type your bank URL directly — never click links from emails claiming to be your bank.',
      'Keep your Mac\'s software updated for the best security when doing financial transactions.',
    ],
    commonIssues: [
      { problem: 'Website keeps logging me out', solution: 'This is a security feature. Most banking websites log you out after inactivity. Check "Keep me signed in" if the option is available.' },
      { problem: 'Payment is not going through', solution: 'Check that your bank account has sufficient funds. Verify the recipient\'s details are correct. Contact your bank\'s support if the issue persists.' },
      { problem: 'Safari is blocking features', solution: 'Some banking websites work better in Chrome. Try switching browsers. In Safari Settings > Privacy, make sure "Block all cookies" is unchecked.' },
    ],
  },
  {
    appSlug: 'zelle-venmo',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'Open Chrome and go to your bank\'s website for Zelle or venmo.com for Venmo.',
      'You can also install Venmo from the Google Play Store.',
      'Zelle through your bank\'s website is the recommended option.',
    ],
    setupSteps: [
      { title: 'Open the website or app', description: 'Go to your bank\'s website or venmo.com, or open the Venmo app.' },
      { title: 'Sign in', description: 'Log in with your credentials.' },
    ],
    basicUsage: [
      { title: 'Send money', description: 'Use the Send feature to transfer money to someone using their phone number or email.' },
      { title: 'Request money', description: 'Use Request to ask someone to pay you.' },
      { title: 'Check history', description: 'View past transactions in your account.' },
    ],
    seniorTips: [
      'Chromebooks are very secure for online banking and payments.',
      'Use Ctrl+"+" to zoom in for a bigger view of amounts and details.',
      'Always go directly to your bank\'s website — never click payment links from emails or texts.',
      'Start with small test payments to make sure everything is set up correctly.',
    ],
    commonIssues: [
      { problem: 'My bank\'s website does not work well on Chromebook', solution: 'Make sure Chrome is updated. Try clearing your browsing data. If the bank website has issues, use the bank\'s mobile app from the Play Store instead.' },
      { problem: 'I am nervous about sending money online', solution: 'Start small — send $1 to a family member to test. Zelle through your bank is very safe. Always verify the recipient before sending.' },
      { problem: 'Received a suspicious payment request', solution: 'Do not pay requests from unknown people. Block and report the sender. Legitimate companies and government agencies never ask for Zelle or Venmo payments.' },
    ],
  },

  // ─── Netflix ─────────────────────────────────────────────────────────────
  {
    appSlug: 'netflix',
    deviceSlug: 'iphone',
    downloadSteps: [
      'Open the App Store.',
      'Search for "Netflix."',
      'Tap "Get" next to Netflix.',
      'Confirm and wait for installation.',
    ],
    setupSteps: [
      { title: 'Open Netflix', description: 'Tap the red Netflix icon on your home screen.' },
      { title: 'Sign in or subscribe', description: 'If you have a Netflix account, tap "Sign In" and enter your email and password. If not, visit netflix.com on your browser to create an account and choose a plan (starting around $6.99/month with ads).' },
      { title: 'Choose your profile', description: 'Select your profile or create a new one. Each person in the household can have their own profile with personalized recommendations.' },
    ],
    basicUsage: [
      { title: 'Browse and search', description: 'Scroll through categories on the home screen to discover shows and movies. Tap the magnifying glass to search for something specific.' },
      { title: 'Play a show or movie', description: 'Tap any title to see details, then tap the red "Play" button to start watching. Tap anywhere on the screen for playback controls.' },
      { title: 'Download for offline viewing', description: 'Tap the download arrow icon on a show or movie to save it for watching without internet — perfect for plane trips or areas with poor Wi-Fi.' },
      { title: 'Continue watching', description: 'Netflix remembers where you stopped. The "Continue Watching" row at the top lets you pick up right where you left off.' },
      { title: 'Adjust subtitles', description: 'While watching, tap the screen, then tap the speech bubble icon to turn on subtitles and choose the language.' },
    ],
    seniorTips: [
      'Turn on subtitles for every show: go to your Profile > Account Settings > Subtitle Appearance and set them to always show.',
      'Turn your iPhone sideways for a wider, more comfortable viewing experience.',
      'Download episodes before a trip so you can watch without internet.',
      'Use the "My List" feature — tap "+" on any title to save it to your personal list for later.',
    ],
    commonIssues: [
      { problem: 'I cannot sign up in the app', solution: 'Netflix requires you to sign up on their website (netflix.com) using your phone\'s browser. After creating an account there, you can sign in on the app.' },
      { problem: 'Video quality is poor', solution: 'Connect to Wi-Fi for the best streaming quality. Go to Netflix Settings > Video Quality and set it to "Higher" or "Auto."' },
      { problem: 'Netflix keeps buffering', solution: 'Check your internet connection. Close other apps that may be using bandwidth. If on cellular, switch to Wi-Fi for smoother playback.' },
    ],
  },
  {
    appSlug: 'netflix',
    deviceSlug: 'ipad',
    downloadSteps: [
      'Open the App Store on your iPad.',
      'Search for "Netflix."',
      'Tap "Get" and confirm.',
      'Wait for installation.',
    ],
    setupSteps: [
      { title: 'Open Netflix', description: 'Tap the Netflix icon.' },
      { title: 'Sign in', description: 'Enter your email and password. Create an account at netflix.com if you do not have one.' },
      { title: 'Choose your profile', description: 'Select or create your profile.' },
    ],
    basicUsage: [
      { title: 'Browse and watch', description: 'Scroll through categories and tap any title to watch. The iPad\'s large screen is perfect for Netflix.' },
      { title: 'Download shows', description: 'Tap the download icon to save shows for offline viewing.' },
      { title: 'Use subtitles', description: 'Tap the speech bubble icon during playback to enable subtitles.' },
      { title: 'Cast to TV', description: 'If you have an Apple TV or AirPlay-compatible smart TV, tap the AirPlay icon to watch on your big screen.' },
    ],
    seniorTips: [
      'The iPad is one of the best devices for watching Netflix — prop it up with a stand for hands-free viewing.',
      'Download shows before bed to watch in areas of your home with poor Wi-Fi.',
      'Use headphones for late-night viewing without disturbing others.',
      'Enable subtitles by default in your profile settings at netflix.com > Account > Profile > Subtitle Appearance.',
    ],
    commonIssues: [
      { problem: 'The screen goes dark while watching', solution: 'This should not happen during playback. If it does, check iPad Settings > Display & Brightness > Auto-Lock and set it to "Never" while watching.' },
      { problem: 'Downloads take up too much space', solution: 'Delete watched downloads in Netflix > Downloads. Set download quality to "Standard" instead of "Higher" to use less storage.' },
      { problem: 'AirPlay is not working', solution: 'Make sure your iPad and Apple TV/smart TV are on the same Wi-Fi network. Restart both devices if AirPlay does not appear.' },
    ],
  },
  {
    appSlug: 'netflix',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'Open the Google Play Store.',
      'Search for "Netflix."',
      'Tap "Install."',
      'Wait for the download and tap "Open."',
    ],
    setupSteps: [
      { title: 'Open Netflix', description: 'Tap the Netflix icon.' },
      { title: 'Sign in', description: 'Enter your Netflix email and password. If you need an account, sign up at netflix.com.' },
      { title: 'Choose your profile', description: 'Pick your profile or create a new one.' },
    ],
    basicUsage: [
      { title: 'Browse and watch', description: 'Scroll through categories to find something to watch. Tap a title and then "Play."' },
      { title: 'Search for shows', description: 'Tap the magnifying glass and type the name of a show, movie, actor, or genre.' },
      { title: 'Download episodes', description: 'Tap the download icon to save episodes for watching offline.' },
      { title: 'Cast to TV', description: 'Tap the cast icon (rectangle with Wi-Fi lines) to play on your smart TV or Chromecast.' },
    ],
    seniorTips: [
      'Turn your phone sideways for a wider viewing experience.',
      'Enable subtitles: tap the screen during playback, then tap the speech bubble icon.',
      'Use Chromecast to watch Netflix on your TV — tap the cast icon in the app.',
      'Set data usage limits in Netflix Settings > Cellular Data Usage if you want to save mobile data.',
    ],
    commonIssues: [
      { problem: 'Netflix is not available on my phone', solution: 'Your phone may be too old or the Android version unsupported. Update your phone to the latest Android version. If still unavailable, use Netflix in Chrome browser at netflix.com.' },
      { problem: 'Video keeps stopping', solution: 'Check your internet connection. Close other apps. Lower video quality in Netflix Settings > Cellular Data Usage. Switch to Wi-Fi if possible.' },
      { problem: 'I cannot cast to my TV', solution: 'Make sure your phone and TV/Chromecast are on the same Wi-Fi network. Restart both devices. Update the Netflix app to the latest version.' },
    ],
  },
  {
    appSlug: 'netflix',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'Open your web browser and go to netflix.com.',
      'Alternatively, install the Netflix app from the Microsoft Store.',
      'Both options work well for watching on a computer.',
    ],
    setupSteps: [
      { title: 'Go to Netflix', description: 'Open your browser and visit netflix.com, or open the Netflix app.' },
      { title: 'Sign in', description: 'Enter your email and password to log in.' },
      { title: 'Choose your profile', description: 'Click your profile to start browsing.' },
    ],
    basicUsage: [
      { title: 'Browse and watch', description: 'Scroll through categories or use the search bar. Click any title and then "Play."' },
      { title: 'Control playback', description: 'Move your mouse over the video for controls. Use the spacebar to pause/play. Press F for full screen.' },
      { title: 'Download (app only)', description: 'In the Microsoft Store app, you can download shows for offline viewing. The browser version does not support downloads.' },
      { title: 'Adjust subtitles', description: 'Click the speech bubble icon during playback to turn on subtitles.' },
    ],
    seniorTips: [
      'Press F for full-screen viewing. Press Escape to exit full screen.',
      'Use the spacebar to quickly pause and resume.',
      'Connect your computer to your TV with an HDMI cable for the biggest screen experience.',
      'The Microsoft Store app allows downloads — useful for watching on a laptop without internet.',
    ],
    commonIssues: [
      { problem: 'Video quality is poor', solution: 'Make sure your internet speed is at least 5 Mbps for HD quality. Close other applications using bandwidth. Try a different browser — Chrome and Edge work best.' },
      { problem: 'Netflix is not loading', solution: 'Clear your browser cache with Ctrl+Shift+Delete. Try a different browser. Check that your internet connection is working.' },
      { problem: 'No sound', solution: 'Check your computer volume. Click the speaker icon in the taskbar. Make sure the Netflix volume slider (in the video player) is turned up.' },
    ],
  },
  {
    appSlug: 'netflix',
    deviceSlug: 'mac',
    downloadSteps: [
      'Open Safari or Chrome.',
      'Go to netflix.com.',
      'Netflix on Mac works through the web browser — there is no separate Mac app.',
    ],
    setupSteps: [
      { title: 'Visit Netflix', description: 'Go to netflix.com in your browser.' },
      { title: 'Sign in', description: 'Enter your email and password.' },
      { title: 'Select your profile', description: 'Click your profile to start watching.' },
    ],
    basicUsage: [
      { title: 'Browse and watch', description: 'Scroll through categories or search for titles. Click "Play" to start watching.' },
      { title: 'Control playback', description: 'Move your mouse over the video for controls. Press spacebar to pause/play. Press F for full screen.' },
      { title: 'Use Picture-in-Picture', description: 'In Safari, right-click the video twice and select "Enter Picture in Picture" to watch in a small window while doing other things.' },
      { title: 'Turn on subtitles', description: 'Click the speech bubble icon during playback.' },
    ],
    seniorTips: [
      'Use Picture-in-Picture in Safari to keep watching while browsing other websites.',
      'Press Command+"+" to zoom in on the Netflix page for larger text.',
      'Connect your Mac to your TV with HDMI for a bigger viewing experience.',
      'Bookmark netflix.com or add it to your Dock for quick access.',
    ],
    commonIssues: [
      { problem: 'Netflix will not play in my browser', solution: 'Update Safari or Chrome to the latest version. Try a different browser. Check netflix.com/help for browser requirements.' },
      { problem: 'Subtitles are too small', solution: 'Go to netflix.com > Account > Profile > Subtitle Appearance and increase the font size.' },
      { problem: 'Mac overheats during streaming', solution: 'Close other applications. Make sure the Mac\'s vents are not blocked. Try lowering the video quality in your Netflix account settings.' },
    ],
  },
  {
    appSlug: 'netflix',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'Open Chrome and go to netflix.com.',
      'You can also install the Netflix app from the Google Play Store.',
      'Both options work well on Chromebook.',
    ],
    setupSteps: [
      { title: 'Open Netflix', description: 'Go to netflix.com in Chrome or open the Netflix app.' },
      { title: 'Sign in', description: 'Enter your Netflix email and password.' },
      { title: 'Choose your profile', description: 'Select your profile to start watching.' },
    ],
    basicUsage: [
      { title: 'Browse and watch', description: 'Explore categories or search for shows. Click Play to start watching.' },
      { title: 'Download (app only)', description: 'The Play Store app allows downloads for offline viewing — great for travel.' },
      { title: 'Full screen', description: 'Press F or click the full-screen icon for an immersive viewing experience.' },
      { title: 'Subtitles', description: 'Click the speech bubble icon to enable subtitles during playback.' },
    ],
    seniorTips: [
      'Install the Netflix app from the Play Store for the option to download shows offline.',
      'Press F for full screen and Escape to exit.',
      'Use Ctrl+"+" to zoom in on the Netflix page for larger text.',
      'Keep your Chromebook plugged in during long viewing sessions.',
    ],
    commonIssues: [
      { problem: 'Netflix is laggy', solution: 'Close other tabs and apps. Check your Wi-Fi connection. The Play Store app may run smoother than the browser version on some Chromebooks.' },
      { problem: 'Cannot download shows', solution: 'Downloads are only available in the Play Store app, not the browser version. Install the Netflix app from the Google Play Store.' },
      { problem: 'Audio is not working', solution: 'Check the Chromebook volume by clicking the time at the bottom right. Make sure the Netflix player volume is turned up. Try plugging in headphones.' },
    ],
  },

  // ─── Spotify ─────────────────────────────────────────────────────────────
  {
    appSlug: 'spotify',
    deviceSlug: 'iphone',
    downloadSteps: [
      'Open the App Store.',
      'Search for "Spotify."',
      'Tap "Get" next to Spotify - Music and Podcasts.',
      'Confirm and wait for installation.',
    ],
    setupSteps: [
      { title: 'Open Spotify', description: 'Tap the green Spotify icon on your home screen.' },
      { title: 'Sign up or log in', description: 'Tap "Sign up free" to create a new account with your email, or "Log in" if you have one. You can also sign up with your Apple or Google account.' },
      { title: 'Choose free or Premium', description: 'The free version has ads between songs. Spotify Premium ($10.99/month) removes ads and lets you download music. You can start free and upgrade later.' },
      { title: 'Pick your preferences', description: 'Choose some artists and genres you enjoy so Spotify can personalize your recommendations.' },
    ],
    basicUsage: [
      { title: 'Search for music', description: 'Tap "Search" at the bottom, then type a song name, artist, or genre. Tap a result to play it.' },
      { title: 'Play and control music', description: 'Tap a song to play it. Use the controls at the bottom: pause/play, skip forward/back, and volume. Tap the playing bar to see full-screen controls.' },
      { title: 'Create a playlist', description: 'Tap "Your Library," then "+" to create a playlist. Name it and add songs by searching and tapping the three dots > "Add to playlist."' },
      { title: 'Listen to podcasts', description: 'Tap "Search" and browse the podcast categories, or search for a specific podcast by name.' },
      { title: 'Discover new music', description: 'The "Home" tab shows personalized playlists like "Discover Weekly" and "Daily Mix" based on your listening habits.' },
    ],
    seniorTips: [
      'Try searching for music from your era — Spotify has classic hits from the 60s, 70s, 80s, and beyond.',
      'Use "Made for You" playlists on the Home tab — Spotify creates personalized playlists based on what you listen to.',
      'Connect to a Bluetooth speaker for better sound quality around the house.',
      'Spotify is also great for audiobooks and podcasts — search for topics that interest you.',
    ],
    commonIssues: [
      { problem: 'Music keeps stopping', solution: 'Check your internet connection. If on free Spotify, you need an internet connection to play music. Premium subscribers can download songs for offline listening.' },
      { problem: 'Too many ads on the free version', solution: 'Ads are part of the free experience. You can upgrade to Spotify Premium for ad-free listening. There is a free 1-month trial available.' },
      { problem: 'I cannot find a song', solution: 'Try searching by the song title, artist name, or even lyrics. Some very old or rare songs may not be available on Spotify.' },
    ],
  },
  {
    appSlug: 'spotify',
    deviceSlug: 'ipad',
    downloadSteps: [
      'Open the App Store on your iPad.',
      'Search for "Spotify."',
      'Tap "Get" and confirm.',
      'Wait for installation.',
    ],
    setupSteps: [
      { title: 'Open Spotify', description: 'Tap the green Spotify icon.' },
      { title: 'Sign up or log in', description: 'Create a free account or log in with your existing one.' },
      { title: 'Choose your interests', description: 'Select favorite artists and genres for personalized recommendations.' },
    ],
    basicUsage: [
      { title: 'Search and play', description: 'Use the Search tab to find songs, artists, albums, or podcasts. Tap to play.' },
      { title: 'Browse recommendations', description: 'The Home tab shows curated playlists based on your taste.' },
      { title: 'Create playlists', description: 'Go to Your Library > "+" to create playlists and organize your music.' },
      { title: 'Connect speakers', description: 'Tap the devices icon at the bottom to connect to Bluetooth speakers, smart speakers, or other devices.' },
    ],
    seniorTips: [
      'The iPad\'s bigger screen makes browsing Spotify playlists and albums more enjoyable.',
      'Connect your iPad to a Bluetooth speaker for room-filling sound.',
      'Use Spotify while doing other things on your iPad — the music plays in the background.',
      'Try the "Sleep Timer" in Settings to have music turn off after you fall asleep.',
    ],
    commonIssues: [
      { problem: 'Cannot download music', solution: 'Downloads require Spotify Premium ($10.99/month). With the free version, you need an internet connection to listen.' },
      { problem: 'Sound quality is poor', solution: 'Go to Spotify Settings > Audio Quality and set streaming quality to "Very High" (for Premium) or "High" (for free).' },
      { problem: 'Spotify is using too much storage', solution: 'Go to Spotify Settings > Storage and clear the cache. If you have downloaded songs, remove ones you no longer need.' },
    ],
  },
  {
    appSlug: 'spotify',
    deviceSlug: 'android-phone',
    downloadSteps: [
      'Open the Google Play Store.',
      'Search for "Spotify."',
      'Tap "Install."',
      'Wait for the download and tap "Open."',
    ],
    setupSteps: [
      { title: 'Open Spotify', description: 'Tap the green Spotify icon.' },
      { title: 'Sign up or log in', description: 'Create a free account or sign in. You can use your Google account for quick signup.' },
      { title: 'Choose preferences', description: 'Pick favorite artists and genres.' },
    ],
    basicUsage: [
      { title: 'Search and play', description: 'Tap Search, find music or podcasts, and tap to play.' },
      { title: 'Use the mini player', description: 'The currently playing song shows at the bottom. Tap it for full controls. Swipe it away to stop playback.' },
      { title: 'Create playlists', description: 'Tap Your Library > "+" to create a playlist. Add songs by tapping the three dots on any song > Add to Playlist.' },
      { title: 'Connect to devices', description: 'Tap the devices icon to play music through Bluetooth speakers, Chromecast, or smart speakers.' },
    ],
    seniorTips: [
      'Add a Spotify widget to your home screen: long-press on an empty space > Widgets > Spotify for quick play/pause access.',
      'Use voice search: tap the microphone icon and say the song or artist name.',
      'Try "Daily Mix" playlists — they blend your favorite music into perfect listening sessions.',
      'Set a sleep timer: tap the three dots during playback > Sleep Timer.',
    ],
    commonIssues: [
      { problem: 'Music stops when I close the app', solution: 'Spotify should play in the background. Make sure battery optimization is off for Spotify: Android Settings > Apps > Spotify > Battery > Don\'t optimize.' },
      { problem: 'The free version shuffles my playlist', solution: 'On the free mobile version, playlists play in shuffle mode. Upgrade to Premium for on-demand play in any order.' },
      { problem: 'Cannot connect to Bluetooth speaker', solution: 'Make sure Bluetooth is on: Android Settings > Bluetooth. Make sure the speaker is in pairing mode. In Spotify, tap the devices icon and select your speaker.' },
    ],
  },
  {
    appSlug: 'spotify',
    deviceSlug: 'windows-pc',
    downloadSteps: [
      'Open your web browser and go to spotify.com/download.',
      'Click "Download" for Windows.',
      'Run the downloaded file to install Spotify.',
      'Alternatively, open open.spotify.com in your browser for the web player.',
    ],
    setupSteps: [
      { title: 'Open Spotify', description: 'Click the Spotify icon on your desktop or in the Start menu.' },
      { title: 'Sign in', description: 'Log in with your email and password, or create a free account.' },
    ],
    basicUsage: [
      { title: 'Search for music', description: 'Click the search icon in the sidebar and type a song, artist, or genre name.' },
      { title: 'Play and control', description: 'Click a song to play it. Use the controls at the bottom: play/pause, skip, volume, and the progress bar.' },
      { title: 'Create playlists', description: 'Click "Create Playlist" in the sidebar. Name it and drag songs into it.' },
      { title: 'Browse recommendations', description: 'Click "Home" for personalized recommendations and curated playlists.' },
      { title: 'Connect to speakers', description: 'Click the devices icon at the bottom right to play through connected speakers.' },
    ],
    seniorTips: [
      'The desktop app lets you play any song on demand, even on the free version (the free mobile version shuffles playlists).',
      'Use Ctrl+"+" to zoom in on the Spotify interface for larger text.',
      'Drag and drop songs between playlists to organize your music.',
      'Right-click any song for options like "Add to Playlist," "Go to Artist," or "Add to Queue."',
    ],
    commonIssues: [
      { problem: 'Spotify is not making sound', solution: 'Check the volume slider at the bottom right of Spotify. Check your computer volume in the taskbar. Make sure the correct audio output is selected in your computer\'s sound settings.' },
      { problem: 'The app is running slowly', solution: 'Close other programs. In Spotify Settings, turn off "Hardware acceleration." Clear the cache in Spotify Settings > Storage.' },
      { problem: 'I cannot find the app after installing', solution: 'Search for "Spotify" in the Windows Start menu. If not found, try reinstalling from spotify.com/download.' },
    ],
  },
  {
    appSlug: 'spotify',
    deviceSlug: 'mac',
    downloadSteps: [
      'Open Safari or Chrome and go to spotify.com/download.',
      'Click "Download" for Mac.',
      'Open the downloaded file and drag Spotify to Applications.',
      'Alternatively, use the web player at open.spotify.com.',
    ],
    setupSteps: [
      { title: 'Open Spotify', description: 'Click the Spotify icon in your Dock, Applications, or Launchpad.' },
      { title: 'Sign in', description: 'Log in or create a free account.' },
    ],
    basicUsage: [
      { title: 'Search and play', description: 'Click Search, find music, and click to play. Use controls at the bottom.' },
      { title: 'Create playlists', description: 'Click "Create Playlist" in the sidebar to start organizing your music.' },
      { title: 'Browse Home', description: 'Click Home for personalized recommendations, new releases, and curated playlists.' },
      { title: 'Connect devices', description: 'Click the devices icon to play through AirPods, HomePod, or Bluetooth speakers.' },
    ],
    seniorTips: [
      'Connect Spotify to your HomePod or AirPods for easy listening around the house.',
      'Use Command+"+" to zoom in for a bigger interface.',
      'The Mac app supports AirPlay — play music through any AirPlay speaker in your home.',
      'Right-click songs for helpful options like adding to playlists or starting a radio station.',
    ],
    commonIssues: [
      { problem: 'Spotify will not open', solution: 'Try force-quitting it: right-click the Spotify icon in the Dock and select "Quit." Then reopen. If it still does not work, delete Spotify from Applications and reinstall.' },
      { problem: 'No sound through my speakers', solution: 'Check the volume in Spotify and on your Mac. Click the speaker icon in the menu bar and make sure the correct output device is selected.' },
      { problem: 'Spotify is using too much CPU', solution: 'In Spotify Settings, turn off "Hardware acceleration." Close and reopen Spotify. Make sure your Mac software is up to date.' },
    ],
  },
  {
    appSlug: 'spotify',
    deviceSlug: 'chromebook',
    downloadSteps: [
      'Open the Google Play Store on your Chromebook.',
      'Search for "Spotify."',
      'Click "Install."',
      'Alternatively, go to open.spotify.com in Chrome for the web player.',
    ],
    setupSteps: [
      { title: 'Open Spotify', description: 'Click the Spotify icon in your app launcher, or go to open.spotify.com.' },
      { title: 'Sign in', description: 'Log in with your account or create a free one.' },
    ],
    basicUsage: [
      { title: 'Search and listen', description: 'Search for songs, artists, or podcasts and click to play.' },
      { title: 'Create playlists', description: 'Create playlists to organize your favorite music.' },
      { title: 'Browse Home', description: 'Check the Home page for personalized music recommendations.' },
      { title: 'Connect speakers', description: 'Click the devices icon to play through Bluetooth speakers or Chromecast.' },
    ],
    seniorTips: [
      'The web player at open.spotify.com works great on Chromebooks and fills the full screen.',
      'Use Ctrl+"+" to zoom in for larger text.',
      'Connect your Chromebook to a Bluetooth speaker for better sound quality.',
      'Pin the Spotify tab in Chrome for always-ready access to your music.',
    ],
    commonIssues: [
      { problem: 'The Play Store app is small on screen', solution: 'Use the web player at open.spotify.com instead — it fills the whole browser window and works great on Chromebooks.' },
      { problem: 'Music stops when I switch tabs', solution: 'Music should continue playing in the background. If it stops, try using the Play Store app instead of the web player.' },
      { problem: 'Cannot connect to Bluetooth speaker', solution: 'Go to Chromebook Settings > Bluetooth and make sure it is turned on. Put your speaker in pairing mode. Select the speaker from the list of available devices.' },
    ],
  },
]

// ── Helper functions ─────────────────────────────────────────────────────────

export function getApp(slug: string): AppInfo | undefined {
  return APPS.find((a) => a.slug === slug)
}

export function getDevice(slug: string): DeviceInfo | undefined {
  return DEVICES.find((d) => d.slug === slug)
}

export function getGuide(appSlug: string, deviceSlug: string): AppGuide | undefined {
  return APP_GUIDES.find((g) => g.appSlug === appSlug && g.deviceSlug === deviceSlug)
}

export function getDevicesForApp(appSlug: string): DeviceInfo[] {
  const deviceSlugs = APP_GUIDES.filter((g) => g.appSlug === appSlug).map((g) => g.deviceSlug)
  return DEVICES.filter((d) => deviceSlugs.includes(d.slug))
}

export function getAppsForDevice(deviceSlug: string): AppInfo[] {
  const appSlugs = APP_GUIDES.filter((g) => g.deviceSlug === deviceSlug).map((g) => g.appSlug)
  return APPS.filter((a) => appSlugs.includes(a.slug))
}

export function getAppsByCategory(): Record<string, AppInfo[]> {
  const result: Record<string, AppInfo[]> = {}
  for (const app of APPS) {
    if (!result[app.category]) result[app.category] = []
    result[app.category].push(app)
  }
  return result
}

export function getAllAppGuidePairs(): { app: string; device: string }[] {
  return APP_GUIDES.map((g) => ({ app: g.appSlug, device: g.deviceSlug }))
}
