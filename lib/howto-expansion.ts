// ── How-To Expansion: Tablets, Chromebook, Smart Home ─────────────────────────
// Adds Samsung Tab, Amazon Fire, Chromebook, Alexa, Google Home, and Ring
// with new smart-home tasks plus existing tasks adapted for new devices.

import type { Device, Task, Instruction } from './howto-data'

// ── New Devices ──────────────────────────────────────────────────────────────

export const EXPANSION_DEVICES: Device[] = [
  { slug: 'samsung-tab', name: 'Samsung Galaxy Tab', brand: 'Samsung', os: 'Android', icon: '📲' },
  { slug: 'amazon-fire', name: 'Amazon Fire Tablet', brand: 'Amazon', os: 'Fire OS', icon: '🔥' },
  { slug: 'chromebook', name: 'Chromebook', brand: 'Various', os: 'ChromeOS', icon: '💻' },
  { slug: 'alexa', name: 'Amazon Alexa (Echo)', brand: 'Amazon', os: 'Alexa', icon: '🔊' },
  { slug: 'google-home', name: 'Google Nest / Home', brand: 'Google', os: 'Google Assistant', icon: '🏠' },
  { slug: 'ring', name: 'Ring Doorbell / Camera', brand: 'Ring', os: 'Ring App', icon: '🔔' },
]

// ── New Smart Home Tasks ─────────────────────────────────────────────────────

export const EXPANSION_TASKS: Task[] = [
  { slug: 'set-up-smart-speaker', name: 'Set Up a Smart Speaker', category: 'smart-home', difficulty: 'medium', estimatedTime: '10 min' },
  { slug: 'play-music-by-voice', name: 'Play Music by Voice', category: 'smart-home', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'set-timer-by-voice', name: 'Set a Timer by Voice', category: 'smart-home', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'control-smart-lights', name: 'Control Smart Lights', category: 'smart-home', difficulty: 'medium', estimatedTime: '5 min' },
  { slug: 'check-weather-by-voice', name: 'Check the Weather by Voice', category: 'smart-home', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'make-announcement', name: 'Make a Household Announcement', category: 'smart-home', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'set-up-doorbell-camera', name: 'Set Up a Doorbell Camera', category: 'smart-home', difficulty: 'hard', estimatedTime: '15 min' },
  { slug: 'view-camera-live', name: 'View a Live Camera Feed', category: 'smart-home', difficulty: 'easy', estimatedTime: '2 min' },
  { slug: 'answer-door-remotely', name: 'Answer the Door Remotely', category: 'smart-home', difficulty: 'easy', estimatedTime: '1 min' },
  { slug: 'set-up-smart-routine', name: 'Set Up a Smart Routine', category: 'smart-home', difficulty: 'medium', estimatedTime: '5 min' },
]

// ── New Category Entries ─────────────────────────────────────────────────────

export const EXPANSION_CATEGORY_LABELS: Record<string, string> = {
  'smart-home': 'Smart Home',
}

export const EXPANSION_CATEGORY_ICONS: Record<string, string> = {
  'smart-home': '🏠',
}

// ── Instructions for New Devices + Tasks ─────────────────────────────────────

export const EXPANSION_INSTRUCTIONS: Record<string, Record<string, Instruction>> = {

  // ═══════════════════════════════════════════════════════════════════════════
  // EXISTING TASKS — Samsung Galaxy Tab instructions
  // ═══════════════════════════════════════════════════════════════════════════

  'take-screenshot': {
    'samsung-tab': {
      steps: [
        'Open the screen you want to capture.',
        'Press the Power button and Volume Down button at the same time.',
        'Release both buttons quickly when you see a flash or hear a click.',
        'A toolbar appears at the bottom — tap the crop or edit icon if needed.',
        'Your screenshot is saved in the Gallery app under "Screenshots".',
      ],
      tip: 'You can also swipe the edge of your hand across the screen to take a screenshot. Enable this in Settings > Advanced features > Motions and gestures.',
    },
    'amazon-fire': {
      steps: [
        'Navigate to the screen you want to capture.',
        'Press and hold the Power button and Volume Down button at the same time.',
        'Release when you see the screen flash.',
        'Pull down the notification bar from the top to see your screenshot.',
        'Tap the notification to view or share your screenshot.',
      ],
      tip: 'Screenshots are saved in the Photos app. You can also find them using the Files app.',
    },
    'chromebook': {
      steps: [
        'Press Ctrl + Show Windows key (the rectangle with two lines, above the 6 key).',
        'The entire screen is captured.',
        'A notification appears in the bottom-right corner.',
        'Click the notification to open or edit the screenshot.',
        'Screenshots are saved in your Downloads folder.',
      ],
      tip: 'Press Ctrl + Shift + Show Windows to capture just a part of the screen. Draw a rectangle around what you want.',
    },
  },

  'change-font-size': {
    'samsung-tab': {
      steps: [
        'Open the Settings app (the gear icon).',
        'Tap "Display".',
        'Tap "Font size and style".',
        'Drag the slider to the right to make text larger.',
        'The change applies immediately — check if the size is comfortable for you.',
      ],
      tip: 'You can also turn on "Bold font" on the same screen to make text easier to read.',
    },
    'amazon-fire': {
      steps: [
        'Swipe down from the top of the screen and tap the gear icon to open Settings.',
        'Tap "Display".',
        'Tap "Font size".',
        'Choose a larger size — the preview at the top shows how text will look.',
        'Tap the back arrow when you are happy with the size.',
      ],
      tip: 'If you need even larger text, go to Settings > Accessibility > Font size for extra-large options.',
    },
    'chromebook': {
      steps: [
        'Click the clock area in the bottom-right corner of the screen.',
        'Click the gear icon to open Settings.',
        'Click "Appearance" in the left menu.',
        'Find "Font size" and choose a larger option from the dropdown.',
        'The change takes effect right away in your browser and system apps.',
      ],
      tip: 'You can also press Ctrl and + (plus key) to zoom in on any web page. Press Ctrl and 0 to reset.',
    },
  },

  'connect-wifi': {
    'samsung-tab': {
      steps: [
        'Open the Settings app.',
        'Tap "Connections".',
        'Tap "Wi-Fi" and make sure it is turned on (the toggle should be blue).',
        'Wait for your Wi-Fi network name to appear in the list.',
        'Tap your network name and type the password, then tap "Connect".',
      ],
      tip: 'If you do not see your network, tap "Scan" at the bottom. Make sure you are close to your router.',
    },
    'amazon-fire': {
      steps: [
        'Swipe down from the top of the screen.',
        'Tap and hold the Wi-Fi icon to open Wi-Fi settings.',
        'Make sure Wi-Fi is turned on.',
        'Tap your network name from the list.',
        'Type the Wi-Fi password and tap "Connect".',
      ],
      tip: 'Your Wi-Fi password is usually on a sticker on the bottom or back of your router.',
    },
    'chromebook': {
      steps: [
        'Click the clock area in the bottom-right corner.',
        'Click the Wi-Fi icon.',
        'Make sure Wi-Fi is turned on.',
        'Click your network name from the list.',
        'Enter the password and click "Connect".',
      ],
      tip: 'If your Chromebook keeps disconnecting from Wi-Fi, try moving closer to the router or restarting the Chromebook.',
    },
  },

  'send-text-message': {
    'samsung-tab': {
      steps: [
        'Open the Messages app (the chat bubble icon).',
        'Tap the pencil icon or "New message" button.',
        'Type the person\'s name or phone number at the top.',
        'Tap the text box at the bottom and type your message.',
        'Tap the send button (the arrow icon) to send it.',
      ],
      tip: 'If your tablet does not have a SIM card, you can use apps like WhatsApp or Google Messages on Wi-Fi instead.',
    },
    'amazon-fire': {
      steps: [
        'Open the Alexa app (it comes pre-installed on Fire tablets).',
        'Tap the chat bubble icon at the bottom.',
        'Tap the pencil icon to start a new conversation.',
        'Choose a contact from your list.',
        'Type your message and tap the send arrow.',
      ],
      tip: 'You can also use email or WhatsApp on your Fire tablet for messaging if you prefer.',
    },
  },

  'take-photo': {
    'samsung-tab': {
      steps: [
        'Open the Camera app.',
        'Hold the tablet steady and point it at what you want to photograph.',
        'Tap the round white shutter button at the bottom of the screen.',
        'You will hear a click sound and see a small preview in the corner.',
        'Tap the preview to see your photo, or keep taking more pictures.',
      ],
      tip: 'Hold the tablet with both hands to keep it steady. Tap the screen to focus on a specific area.',
    },
    'amazon-fire': {
      steps: [
        'Open the Camera app from the home screen.',
        'Point the camera at your subject.',
        'Tap the round shutter button to take the photo.',
        'The photo is saved automatically.',
        'Open the Photos app to view your pictures.',
      ],
      tip: 'Fire tablets work best for photos in good lighting. For important photos, consider using a phone instead.',
    },
  },

  'download-app': {
    'samsung-tab': {
      steps: [
        'Open the Google Play Store (the colourful triangle icon).',
        'Tap the search bar at the top.',
        'Type the name of the app you want.',
        'Tap the app in the results list.',
        'Tap the green "Install" button and wait for it to download.',
      ],
      tip: 'Only download apps from the Google Play Store to stay safe. Check the ratings and reviews before installing.',
    },
    'amazon-fire': {
      steps: [
        'Open the Amazon Appstore from the home screen.',
        'Tap the search icon and type the name of the app.',
        'Tap the app you want from the results.',
        'Tap "Get" or the download button.',
        'The app installs automatically and appears on your home screen.',
      ],
      tip: 'The Amazon Appstore has fewer apps than Google Play. If you cannot find an app, check if it is available as a web version in the Silk browser.',
    },
    'chromebook': {
      steps: [
        'Click the Launcher (the circle icon in the bottom-left corner).',
        'Click "Play Store" or "Web Store" to browse apps.',
        'Search for the app you want.',
        'Click "Install" to add it to your Chromebook.',
        'Find it in your app drawer once the installation finishes.',
      ],
      tip: 'Chromebooks can run most Android apps from the Play Store. Web apps from the Chrome Web Store also work well.',
    },
  },

  'delete-app': {
    'samsung-tab': {
      steps: [
        'Find the app on your home screen or in the app drawer.',
        'Press and hold the app icon until a menu appears.',
        'Tap "Uninstall".',
        'Tap "OK" to confirm you want to remove the app.',
        'The app is now deleted and the space is freed up.',
      ],
      tip: 'Some built-in Samsung apps cannot be deleted, but you can "Disable" them to hide them.',
    },
    'amazon-fire': {
      steps: [
        'Go to the home screen and find the app.',
        'Press and hold the app icon.',
        'Tap "Uninstall" from the menu that appears.',
        'Tap "OK" to confirm.',
        'The app is removed from your tablet.',
      ],
      tip: 'Amazon apps that came with the tablet cannot be removed, but you can remove apps you installed yourself.',
    },
    'chromebook': {
      steps: [
        'Click the Launcher (circle icon in the bottom-left).',
        'Find the app you want to remove.',
        'Right-click the app icon (or tap with two fingers on the trackpad).',
        'Click "Uninstall" or "Remove from Chrome".',
        'Confirm the removal.',
      ],
      tip: 'Removing an app does not delete your data in the cloud. You can always reinstall it later.',
    },
  },

  'adjust-brightness': {
    'samsung-tab': {
      steps: [
        'Swipe down from the top of the screen to open the Quick Settings panel.',
        'Find the brightness slider (the sun icon).',
        'Drag the slider to the right to make the screen brighter, or left to dim it.',
        'You can also tap "Adaptive brightness" to let the tablet adjust automatically.',
      ],
      tip: 'Reducing brightness saves battery life. Use adaptive brightness to let the tablet decide for you.',
    },
    'amazon-fire': {
      steps: [
        'Swipe down from the top of the screen.',
        'Find the brightness slider in the Quick Settings panel.',
        'Drag the slider to adjust the brightness.',
        'You can also turn on "Auto-Brightness" in Settings > Display.',
      ],
      tip: 'Reading in bed? Lower the brightness and turn on Blue Shade (Settings > Display > Blue Shade) to reduce eye strain.',
    },
    'chromebook': {
      steps: [
        'Find the brightness keys on the top row of your keyboard (they look like sun icons).',
        'Press the brighter sun key to increase brightness.',
        'Press the dimmer sun key to decrease brightness.',
        'You can also click the clock area and use the brightness slider.',
      ],
      tip: 'If your Chromebook has an auto-brightness setting, you can find it in Settings > Device > Display.',
    },
  },

  'enable-dark-mode': {
    'samsung-tab': {
      steps: [
        'Open the Settings app.',
        'Tap "Display".',
        'Tap "Dark mode" to turn it on.',
        'You can also tap "Dark mode settings" to schedule it for nighttime.',
      ],
      tip: 'Dark mode is easier on your eyes at night and uses less battery on tablets with OLED screens.',
    },
    'amazon-fire': {
      steps: [
        'Swipe down from the top of the screen and tap the gear icon.',
        'Tap "Display".',
        'Tap "Dark theme" to turn it on.',
        'The background of menus and some apps will turn dark.',
      ],
      tip: 'Not all apps support dark mode. The Fire tablet system menus and Amazon apps will change, but some third-party apps may stay light.',
    },
    'chromebook': {
      steps: [
        'Click the clock area in the bottom-right corner.',
        'Click the gear icon for Settings.',
        'Click "Appearance" in the left menu.',
        'Under "Theme", select "Dark".',
        'The interface and compatible web pages will switch to dark mode.',
      ],
      tip: 'Chrome browser also has a dark mode flag. Type chrome://flags in the address bar and search for "dark" to enable it for websites.',
    },
  },

  'connect-bluetooth': {
    'samsung-tab': {
      steps: [
        'Open Settings and tap "Connections".',
        'Tap "Bluetooth" and make sure it is turned on.',
        'Put your Bluetooth device (speaker, headphones, etc.) into pairing mode.',
        'Your device name will appear in the "Available devices" list.',
        'Tap the device name to connect.',
      ],
      tip: 'If the device does not appear, turn Bluetooth off and on again, or restart your tablet.',
    },
    'amazon-fire': {
      steps: [
        'Swipe down from the top and tap the gear icon for Settings.',
        'Tap "Connected Devices".',
        'Tap "Bluetooth" and make sure it is on.',
        'Put your Bluetooth accessory into pairing mode.',
        'Tap the device name when it appears in the list.',
      ],
      tip: 'Most Bluetooth headphones go into pairing mode by holding the power button for 5–7 seconds until a light flashes.',
    },
    'chromebook': {
      steps: [
        'Click the clock area in the bottom-right corner.',
        'Click the Bluetooth icon.',
        'Make sure Bluetooth is turned on.',
        'Put your device into pairing mode.',
        'Click the device name when it appears and follow any on-screen prompts.',
      ],
      tip: 'If your Bluetooth device has trouble connecting, try moving it closer to the Chromebook and removing other nearby Bluetooth connections.',
    },
  },

  'update-software': {
    'samsung-tab': {
      steps: [
        'Open Settings.',
        'Scroll down and tap "Software update".',
        'Tap "Download and install".',
        'If an update is available, tap "Install now".',
        'The tablet will restart during the update — make sure it is charged above 50%.',
      ],
      tip: 'Connect to Wi-Fi before updating to avoid using mobile data. Updates can be large.',
    },
    'amazon-fire': {
      steps: [
        'Open Settings by swiping down and tapping the gear icon.',
        'Tap "Device Options".',
        'Tap "System Updates".',
        'Tap "Check Now" to look for updates.',
        'If an update is found, tap "Download" and let it install.',
      ],
      tip: 'Fire tablets usually update automatically overnight. Keep your tablet charged and connected to Wi-Fi.',
    },
    'chromebook': {
      steps: [
        'Click the clock area in the bottom-right corner.',
        'Click the gear icon for Settings.',
        'Click "About ChromeOS" at the bottom of the left menu.',
        'Click "Check for updates".',
        'If an update is available, it downloads automatically. Click "Restart" when prompted.',
      ],
      tip: 'Chromebooks update automatically and very quickly. You will not lose your files during an update.',
    },
  },

  'force-restart': {
    'samsung-tab': {
      steps: [
        'Press and hold the Power button and Volume Down button at the same time.',
        'Hold both buttons for about 10 seconds.',
        'The screen will go dark and the Samsung logo will appear.',
        'Release the buttons and wait for the tablet to restart.',
      ],
      tip: 'A force restart does not delete any of your data. It simply turns the tablet off and on again.',
    },
    'amazon-fire': {
      steps: [
        'Press and hold the Power button for 40 seconds.',
        'The screen will go black.',
        'Release the button and wait a few seconds.',
        'Press the Power button again to turn the tablet back on.',
      ],
      tip: 'If 40 seconds seems long, count slowly to 40. This is the official Amazon method and it works even when the tablet is completely frozen.',
    },
    'chromebook': {
      steps: [
        'Press and hold the Power button for 10 seconds.',
        'The Chromebook will shut down.',
        'Wait a few seconds, then press the Power button to turn it back on.',
      ],
      tip: 'If the keyboard and trackpad are unresponsive, the power button is your best option. You will not lose saved files.',
    },
  },

  'check-storage': {
    'samsung-tab': {
      steps: [
        'Open the Settings app.',
        'Tap "Battery and device care".',
        'Tap "Storage".',
        'You will see a breakdown of what is using space (apps, images, videos, etc.).',
        'Tap any category to see details and delete what you no longer need.',
      ],
      tip: 'If your tablet has a microSD card slot, you can add a memory card for extra storage.',
    },
    'amazon-fire': {
      steps: [
        'Open Settings.',
        'Tap "Storage".',
        'You can see how much space is used and how much is free.',
        'Tap "Internal Storage" for a breakdown by category.',
        'Delete unwanted items to free up space.',
      ],
      tip: 'Amazon Fire tablets support microSD cards up to 1TB, which is great for storing books, music, and videos.',
    },
    'chromebook': {
      steps: [
        'Open the Files app from the app drawer.',
        'Click the three dots in the top-right corner.',
        'The storage usage shows at the bottom of the menu.',
        'Delete files from Downloads or other folders to free space.',
      ],
      tip: 'Chromebooks have limited local storage. Use Google Drive to store files in the cloud instead.',
    },
  },

  'set-alarm': {
    'samsung-tab': {
      steps: [
        'Open the Clock app.',
        'Tap the "Alarm" tab at the top.',
        'Tap the "+" button to add a new alarm.',
        'Set the time by scrolling the hours and minutes.',
        'Tap "Save" to set the alarm.',
      ],
      tip: 'You can name your alarm (like "Take medicine") to remind you what it is for.',
    },
    'amazon-fire': {
      steps: [
        'Say "Alexa, set an alarm for 7 AM" if your Fire tablet has Alexa enabled.',
        'Or open the Clock app from the app drawer.',
        'Tap the "+" button to add a new alarm.',
        'Set the time and tap "OK".',
      ],
      tip: 'Alexa is built into Fire tablets. Just say "Alexa" and give your command — no need to open any app.',
    },
  },

  'turn-on-flashlight': {
    'samsung-tab': {
      steps: [
        'Swipe down from the top of the screen with two fingers.',
        'Look for the "Flashlight" icon in the Quick Settings panel.',
        'Tap it once to turn the flashlight on.',
        'Tap it again to turn it off.',
      ],
      tip: 'Not all tablets have a flashlight. If yours does not, download a flashlight app that uses the screen as a light.',
    },
  },

  'block-phone-number': {
    'samsung-tab': {
      steps: [
        'Open the Phone app (if your tablet has calling features).',
        'Tap "Recents" to find the number you want to block.',
        'Tap the number, then tap the "i" icon for details.',
        'Scroll down and tap "Block number".',
        'Tap "Block" to confirm.',
      ],
      tip: 'If your tablet does not have a phone app, you can block contacts in messaging apps like WhatsApp instead.',
    },
  },

  'use-voice-assistant': {
    'samsung-tab': {
      steps: [
        'Press and hold the Home button, or say "Hi Bixby" if Bixby is set up.',
        'You can also open the Google app and tap the microphone icon.',
        'Say your question or command clearly.',
        'The assistant will show the answer on screen and read it aloud.',
      ],
      tip: 'Google Assistant tends to work better than Bixby for general questions. You can set it as your default assistant in Settings.',
    },
    'amazon-fire': {
      steps: [
        'Say "Alexa" to wake up the voice assistant.',
        'Ask your question or give a command.',
        'Alexa will respond with a voice answer and show information on screen.',
        'You can also press and hold the Home button to activate Alexa.',
      ],
      tip: 'Try saying "Alexa, what can you do?" to learn about all the things the voice assistant can help with.',
    },
    'chromebook': {
      steps: [
        'Click the Launcher (circle icon) in the bottom-left corner.',
        'Click or say "Hey Google" if Google Assistant is enabled.',
        'Type or speak your question.',
        'The assistant displays the answer in a panel.',
      ],
      tip: 'To enable "Hey Google" on your Chromebook, go to Settings > Search and Assistant > Google Assistant.',
    },
  },

  'clear-cache': {
    'samsung-tab': {
      steps: [
        'Open Settings.',
        'Tap "Apps".',
        'Tap the app that is running slowly.',
        'Tap "Storage".',
        'Tap "Clear cache" (this is safe and does not delete your data).',
      ],
      tip: 'Clearing the cache is like tidying up — it removes temporary files that can slow things down.',
    },
    'amazon-fire': {
      steps: [
        'Open Settings.',
        'Tap "Apps & Notifications".',
        'Tap "Manage All Applications".',
        'Tap the app you want to clear.',
        'Tap "Clear Cache".',
      ],
      tip: 'If an app is misbehaving, try clearing its cache first. If that does not help, try "Clear Data" (but this removes your settings in that app).',
    },
    'chromebook': {
      steps: [
        'Open Chrome browser.',
        'Click the three dots in the top-right corner.',
        'Click "Delete browsing data".',
        'Check "Cached images and files".',
        'Click "Delete data".',
      ],
      tip: 'Clearing the cache in Chrome can speed up browsing. Your saved passwords and bookmarks are not affected.',
    },
  },

  'set-wallpaper': {
    'samsung-tab': {
      steps: [
        'Press and hold on an empty area of the home screen.',
        'Tap "Wallpaper and style".',
        'Choose from the gallery or Samsung wallpapers.',
        'Select an image and tap "Set as wallpaper".',
        'Choose "Home screen", "Lock screen", or "Both".',
      ],
      tip: 'Use a photo of your family as your wallpaper — it makes your tablet feel more personal.',
    },
    'amazon-fire': {
      steps: [
        'Open Settings.',
        'Tap "Display".',
        'Tap "Wallpaper".',
        'Choose a wallpaper from the options or tap "Photos" to use your own picture.',
        'Tap "Set Wallpaper" to confirm.',
      ],
      tip: 'You can use photos stored on your tablet as wallpapers. Nature photos look great on tablet screens.',
    },
    'chromebook': {
      steps: [
        'Right-click (or two-finger tap) on the desktop.',
        'Click "Set wallpaper & style".',
        'Browse categories or click "My images" to use your own photo.',
        'Click the image you want.',
        'The wallpaper changes immediately.',
      ],
      tip: 'Turn on "Daily refresh" to get a new wallpaper every day from a category you like.',
    },
  },

  'back-up-phone': {
    'samsung-tab': {
      steps: [
        'Open Settings.',
        'Tap "Accounts and backup".',
        'Tap "Back up data" under Samsung Cloud or Google.',
        'Make sure all the items you want backed up are turned on.',
        'Tap "Back up now".',
      ],
      tip: 'Samsung Cloud and Google both offer free backup. Use both for extra safety.',
    },
    'amazon-fire': {
      steps: [
        'Open Settings.',
        'Tap "Device Options".',
        'Tap "Back Up and Restore".',
        'Turn on "Backup and Restore" to back up your apps and settings.',
        'Your purchases and Amazon content are always backed up to your Amazon account.',
      ],
      tip: 'Amazon automatically remembers your purchases. Even if you reset the tablet, you can re-download everything.',
    },
    'chromebook': {
      steps: [
        'Most Chromebook data is automatically saved to your Google account.',
        'Open the Files app and move important local files to Google Drive.',
        'Click "Google Drive" in the left panel of the Files app.',
        'Drag and drop files from Downloads to Google Drive.',
      ],
      tip: 'Chromebooks are designed to store everything in the cloud. As long as you are signed into your Google account, your data follows you to any Chromebook.',
    },
  },

  'share-photo': {
    'samsung-tab': {
      steps: [
        'Open the Gallery app and find the photo you want to share.',
        'Tap the photo to open it.',
        'Tap the Share icon (a triangle with dots or an arrow).',
        'Choose how to share: Messages, Email, WhatsApp, or other apps.',
        'Select the person and tap Send.',
      ],
      tip: 'You can select multiple photos at once by long-pressing one, then tapping others.',
    },
    'amazon-fire': {
      steps: [
        'Open the Photos app and find the photo.',
        'Tap the photo to view it full size.',
        'Tap the Share icon.',
        'Choose the app you want to share with (Email, Silk browser, etc.).',
        'Follow the prompts to send.',
      ],
      tip: 'You can also share photos through Amazon Photos, which backs them up to the cloud.',
    },
  },

  'scan-qr-code': {
    'samsung-tab': {
      steps: [
        'Open the Camera app.',
        'Point the camera at the QR code.',
        'A link or notification will appear at the top of the screen.',
        'Tap the link to open it.',
      ],
      tip: 'QR codes are common at restaurants for menus and at events for tickets. Your camera reads them automatically.',
    },
    'amazon-fire': {
      steps: [
        'Open the Camera app.',
        'Point it at the QR code.',
        'If the camera does not scan it, search for "QR Scanner" in the Amazon Appstore and install one.',
        'Open the QR scanner app and point it at the code.',
        'Tap the link that appears.',
      ],
      tip: 'Not all Fire tablet cameras support QR codes natively. A free QR scanner app from the Appstore is a reliable backup.',
    },
  },

  'turn-off-notifications': {
    'samsung-tab': {
      steps: [
        'Open Settings.',
        'Tap "Notifications".',
        'You see a list of apps with notification toggles.',
        'Turn off the toggle next to any app you want to silence.',
      ],
      tip: 'You can also long-press a notification when it appears and tap "Turn off notifications" for that app.',
    },
    'amazon-fire': {
      steps: [
        'Open Settings.',
        'Tap "Apps & Notifications".',
        'Tap "Manage All Notifications".',
        'Turn off notifications for apps you do not want to hear from.',
      ],
      tip: 'You can also swipe down, long-press a notification, and choose to block future notifications from that app.',
    },
    'chromebook': {
      steps: [
        'Click the clock area in the bottom-right corner.',
        'Click the gear icon for Settings.',
        'Click "Apps" in the left menu.',
        'Click "Notifications".',
        'Turn off notifications for specific apps.',
      ],
      tip: 'You can also click "Do not disturb" in the quick settings panel to silence all notifications temporarily.',
    },
  },

  'set-up-email': {
    'samsung-tab': {
      steps: [
        'Open the Gmail app (or the Samsung Email app).',
        'Tap "Add an account" or follow the on-screen setup.',
        'Choose your email provider (Gmail, Yahoo, Outlook, etc.).',
        'Type your email address and password.',
        'Follow the prompts to finish setup. Your emails will start loading.',
      ],
      tip: 'Gmail works with most email providers, not just Google. You can add Yahoo, Outlook, and others too.',
    },
    'amazon-fire': {
      steps: [
        'Open the Email app from the app drawer.',
        'Enter your email address and tap "Next".',
        'Enter your password.',
        'Choose your sync settings (how often to check for new emails).',
        'Tap "Done" to complete setup.',
      ],
      tip: 'If the Email app does not support your provider, you can access your email through the Silk web browser.',
    },
    'chromebook': {
      steps: [
        'Open the Chrome browser.',
        'Go to mail.google.com (or your email provider\'s website).',
        'Sign in with your email address and password.',
        'Your inbox opens in the browser — bookmark it for easy access.',
        'Gmail is also available as an app from the Play Store.',
      ],
      tip: 'On a Chromebook, webmail (Gmail, Yahoo Mail, Outlook.com) works just like a regular computer. No special app needed.',
    },
  },

  'record-video': {
    'samsung-tab': {
      steps: [
        'Open the Camera app.',
        'Swipe to "Video" mode (or tap "Video" at the bottom).',
        'Tap the red record button to start recording.',
        'Point the tablet at what you want to film, holding it steady.',
        'Tap the red button again to stop recording.',
      ],
      tip: 'Hold the tablet horizontally (sideways) for the best video quality. This makes it look like a movie instead of a narrow strip.',
    },
    'amazon-fire': {
      steps: [
        'Open the Camera app.',
        'Switch to Video mode.',
        'Tap the record button to start.',
        'Film your subject, keeping the tablet as steady as possible.',
        'Tap the stop button when you are done.',
      ],
      tip: 'Fire tablet cameras are good for casual videos. For important events, consider using a phone camera for better quality.',
    },
  },

  'change-password': {
    'chromebook': {
      steps: [
        'Open Chrome and go to myaccount.google.com.',
        'Click "Security" on the left.',
        'Under "How you sign in to Google", click "Password".',
        'Enter your current password to verify it is you.',
        'Type your new password and click "Change Password".',
      ],
      tip: 'Your Chromebook password is your Google account password. Changing it here changes it everywhere you use Google.',
    },
  },

  'turn-on-do-not-disturb': {
    'samsung-tab': {
      steps: [
        'Swipe down from the top of the screen with two fingers.',
        'Find the "Do not disturb" icon in the Quick Settings.',
        'Tap it to turn it on. A half-moon or minus icon will appear.',
        'To customize what gets through, go to Settings > Notifications > Do not disturb.',
      ],
      tip: 'You can schedule Do Not Disturb to turn on automatically at bedtime.',
    },
    'amazon-fire': {
      steps: [
        'Swipe down from the top of the screen.',
        'Tap "Do Not Disturb" in the Quick Settings.',
        'Notifications will be silenced.',
        'Tap it again to turn it off.',
      ],
      tip: 'Even with Do Not Disturb on, alarms still work unless you specifically turn them off.',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SMART HOME TASKS
  // ═══════════════════════════════════════════════════════════════════════════

  'set-up-smart-speaker': {
    'alexa': {
      steps: [
        'Plug in your Echo device and wait for the light ring to turn orange.',
        'Download the "Amazon Alexa" app on your phone or tablet.',
        'Open the Alexa app and sign in with your Amazon account.',
        'Tap "Devices" at the bottom, then tap the "+" icon.',
        'Choose "Add Device" > "Amazon Echo" and follow the on-screen steps.',
        'Connect the Echo to your Wi-Fi network when prompted.',
        'Once connected, say "Alexa, hello!" to test it.',
      ],
      tip: 'Place your Echo in a central location in your home, away from walls and windows, for the best sound and voice recognition.',
    },
    'google-home': {
      steps: [
        'Plug in your Google Nest or Home device and wait for it to chime.',
        'Download the "Google Home" app on your phone or tablet.',
        'Open the app and tap "Set up device" or the "+" icon.',
        'Choose "New device" and select your home.',
        'The app will search for your device — tap it when it appears.',
        'Connect it to your Wi-Fi and follow the on-screen instructions.',
        'Once set up, say "Hey Google, hello!" to test it.',
      ],
      tip: 'You can set up multiple Google Nest devices in different rooms and play music on all of them at once.',
    },
  },

  'play-music-by-voice': {
    'alexa': {
      steps: [
        'Say "Alexa, play some music."',
        'To play a specific song, say "Alexa, play [song name] by [artist]."',
        'To play a genre, say "Alexa, play jazz music" or "Alexa, play relaxing music."',
        'To adjust volume, say "Alexa, volume 5" (scale of 1 to 10).',
        'To stop, say "Alexa, stop."',
      ],
      tip: 'Amazon Music comes free with your Echo. For more songs, you can link Spotify, Apple Music, or other services in the Alexa app.',
    },
    'google-home': {
      steps: [
        'Say "Hey Google, play some music."',
        'For a specific song, say "Hey Google, play [song name] by [artist]."',
        'For a genre, say "Hey Google, play classical music."',
        'To change volume, say "Hey Google, set volume to 50 percent."',
        'To stop, say "Hey Google, stop."',
      ],
      tip: 'YouTube Music is the default service. You can link Spotify or other services in the Google Home app under Music settings.',
    },
  },

  'set-timer-by-voice': {
    'alexa': {
      steps: [
        'Say "Alexa, set a timer for 10 minutes."',
        'Alexa confirms by repeating the time.',
        'When the timer goes off, say "Alexa, stop" to silence it.',
        'To check remaining time, say "Alexa, how much time is left?"',
        'You can set multiple timers: "Alexa, set a pasta timer for 12 minutes."',
      ],
      tip: 'Named timers are very helpful when cooking. Say "Alexa, set an egg timer for 7 minutes" and "Alexa, set a cake timer for 30 minutes" to keep track of different items.',
    },
    'google-home': {
      steps: [
        'Say "Hey Google, set a timer for 10 minutes."',
        'Google confirms the timer.',
        'When it goes off, say "Hey Google, stop."',
        'To check time, say "Hey Google, how much time is left on my timer?"',
        'For named timers, say "Hey Google, set a tea timer for 5 minutes."',
      ],
      tip: 'Google Nest displays with screens show the timer countdown visually, which is very helpful in the kitchen.',
    },
  },

  'control-smart-lights': {
    'alexa': {
      steps: [
        'First, set up your smart light bulbs using the bulb manufacturer\'s app.',
        'Open the Alexa app and tap "Devices" > "+" > "Add Device".',
        'Choose "Light" and follow the steps to discover your bulbs.',
        'Once added, say "Alexa, turn on the living room light."',
        'You can also say "Alexa, dim the lights to 50 percent" or "Alexa, set the lights to warm white."',
      ],
      tip: 'Group lights by room in the Alexa app. Then you can say "Alexa, turn off the bedroom" to control all lights in that room at once.',
    },
    'google-home': {
      steps: [
        'Set up your smart bulbs using the manufacturer\'s app first.',
        'Open the Google Home app and tap "+" > "Set up device".',
        'Choose "Works with Google" and find your light brand.',
        'Link your account and assign lights to rooms.',
        'Say "Hey Google, turn on the kitchen light" or "Hey Google, dim the lights."',
      ],
      tip: 'You can change light colours by saying "Hey Google, set the bedroom light to blue." This works with colour-changing smart bulbs.',
    },
  },

  'check-weather-by-voice': {
    'alexa': {
      steps: [
        'Say "Alexa, what\'s the weather?"',
        'Alexa reads the current temperature and forecast.',
        'For tomorrow, say "Alexa, what\'s the weather tomorrow?"',
        'For a specific place, say "Alexa, what\'s the weather in London?"',
        'For more detail, say "Alexa, give me the weekly forecast."',
      ],
      tip: 'Set your home address in the Alexa app (Settings > Device Settings > Device Location) so Alexa gives you local weather automatically.',
    },
    'google-home': {
      steps: [
        'Say "Hey Google, what\'s the weather?"',
        'Google reads the current conditions and forecast.',
        'For later, say "Hey Google, will it rain this afternoon?"',
        'For a specific location, say "Hey Google, what\'s the weather in New York?"',
        'For extended forecasts, say "Hey Google, what\'s the weather this week?"',
      ],
      tip: 'Google is very good at answering specific weather questions like "Do I need an umbrella today?" or "What\'s the sunrise time?"',
    },
  },

  'make-announcement': {
    'alexa': {
      steps: [
        'Say "Alexa, announce that dinner is ready."',
        'Alexa plays your announcement on all Echo devices in your home.',
        'Your voice is played back, preceded by a chime.',
        'Everyone near any Echo device will hear the message.',
      ],
      tip: 'Announcements are great for calling the family to dinner or reminding everyone it is time to leave. You can also send announcements from the Alexa app when you are away from home.',
    },
    'google-home': {
      steps: [
        'Say "Hey Google, broadcast that dinner is ready."',
        'Google broadcasts your message on all Nest/Home devices.',
        'You can also say "Hey Google, tell everyone it\'s time to go."',
        'The broadcast plays on every Google device in your home.',
      ],
      tip: 'Google also has pre-set broadcasts. Try saying "Hey Google, tell everyone dinner is ready" for a friendly pre-made message.',
    },
  },

  'set-up-doorbell-camera': {
    'ring': {
      steps: [
        'Download the Ring app on your phone or tablet and create an account.',
        'Open the Ring app and tap "Set Up a Device".',
        'Choose "Doorbells" and select your Ring model.',
        'Follow the step-by-step instructions to install the doorbell at your front door.',
        'The app guides you through connecting the Ring to your Wi-Fi.',
        'Once connected, you will see a live view from your doorbell camera.',
        'Test it by pressing the doorbell button and checking that you get a notification.',
      ],
      tip: 'If you are replacing an existing wired doorbell, Ring can use that wiring for power. Otherwise, the battery version works anywhere and recharges via USB.',
    },
  },

  'view-camera-live': {
    'ring': {
      steps: [
        'Open the Ring app on your phone or tablet.',
        'Tap on your doorbell or camera device on the main screen.',
        'Tap "Live View" to see what the camera sees right now.',
        'The live feed loads in a few seconds.',
        'Tap the microphone icon to talk through the camera speaker.',
      ],
      tip: 'You can also say "Alexa, show me the front door" if you have an Echo Show or Fire TV connected to your Ring account.',
    },
    'alexa': {
      steps: [
        'Make sure your Ring account is linked in the Alexa app.',
        'Say "Alexa, show me the front door camera" (if you have an Echo Show with a screen).',
        'The live feed from your Ring camera appears on the Echo Show display.',
        'Say "Alexa, stop" to close the view.',
      ],
      tip: 'This works on any Echo device with a screen (Echo Show). On regular Echo speakers without a screen, Alexa will announce motion but cannot show video.',
    },
  },

  'answer-door-remotely': {
    'ring': {
      steps: [
        'When someone presses your Ring doorbell, you get a notification on your phone.',
        'Tap the notification to see who is at the door.',
        'Tap the microphone button to talk to the visitor.',
        'The visitor can hear you through the Ring doorbell speaker.',
        'If you do not want to answer, tap "Quick Replies" to play a pre-set message.',
      ],
      tip: 'Quick Replies let you tell delivery drivers to leave a package at the door, even when you are not home. Set these up in the Ring app under Doorbell Settings.',
    },
  },

  'set-up-smart-routine': {
    'alexa': {
      steps: [
        'Open the Alexa app on your phone or tablet.',
        'Tap "More" at the bottom, then tap "Routines".',
        'Tap the "+" icon to create a new routine.',
        'Set a trigger — for example, "When I say Alexa, good morning."',
        'Add actions — like turn on the lights, read the news, and tell the weather.',
        'Tap "Save" to activate your routine.',
        'Test it by saying your trigger phrase.',
      ],
      tip: 'A popular routine is "Good morning" — it turns on lights, reads the weather, and tells you the day\'s events. Another is "Good night" which turns everything off and sets an alarm.',
    },
    'google-home': {
      steps: [
        'Open the Google Home app.',
        'Tap "Automations" at the bottom.',
        'Tap "+" to create a new routine.',
        'Choose a starter — like a time of day, voice command, or sunrise/sunset.',
        'Add actions — such as adjust lights, play music, share weather, or read the news.',
        'Tap "Save" to activate.',
        'Test by using your trigger phrase or waiting for the scheduled time.',
      ],
      tip: 'Try the pre-built routines first (like "Good morning" and "Bedtime"). You can customise them to add your own preferences.',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Additional existing tasks for Chromebook
  // ═══════════════════════════════════════════════════════════════════════════

  'turn-off-location': {
    'chromebook': {
      steps: [
        'Click the clock area in the bottom-right corner.',
        'Click the gear icon for Settings.',
        'Click "Privacy and security".',
        'Click "Location" under Site Settings in Chrome.',
        'Turn off "Ask before accessing" or set it to "Blocked" to disable location for all sites.',
      ],
      tip: 'You can also manage location per website by clicking the lock icon in the Chrome address bar when visiting a site.',
    },
  },

  'enable-two-factor-auth': {
    'chromebook': {
      steps: [
        'Open Chrome and go to myaccount.google.com.',
        'Click "Security" on the left.',
        'Under "How you sign in to Google", click "2-Step Verification".',
        'Click "Get started" and enter your password.',
        'Choose a method: text message, Google Authenticator app, or security key.',
        'Follow the prompts to complete setup.',
      ],
      tip: 'Two-factor authentication is one of the best ways to protect your Google account. Even if someone gets your password, they cannot get in without your phone.',
    },
  },

  'transfer-photos-to-computer': {
    'samsung-tab': {
      steps: [
        'Connect your Samsung tablet to your computer using a USB cable.',
        'On the tablet, swipe down the notification bar and tap the USB notification.',
        'Choose "Transfer files" or "MTP".',
        'On your computer, open the tablet in File Explorer (Windows) or Android File Transfer (Mac).',
        'Navigate to the DCIM folder and copy your photos.',
      ],
      tip: 'You can also use Google Photos to back up wirelessly. Install Google Photos on the tablet and it uploads your pictures automatically over Wi-Fi.',
    },
    'amazon-fire': {
      steps: [
        'Connect the Fire tablet to your computer with a USB cable.',
        'On the tablet, swipe down and tap the USB notification.',
        'Choose "Transfer files".',
        'On your computer, open the tablet drive and find the Pictures or DCIM folder.',
        'Copy the photos to your computer.',
      ],
      tip: 'Amazon Photos (included with Prime) automatically backs up your pictures from the Fire tablet to the cloud. Open the Amazon Photos app to check.',
    },
  },

  'pair-airpods-earbuds': {
    'samsung-tab': {
      steps: [
        'Open Settings and tap "Connections".',
        'Tap "Bluetooth" and make sure it is on.',
        'Put your earbuds in their charging case, open the lid.',
        'Press and hold the pairing button on the earbuds case until the light flashes.',
        'Tap the earbuds name when it appears on your tablet.',
      ],
      tip: 'Samsung Galaxy Buds pair instantly with Samsung tablets. For AirPods, you need to put them in pairing mode first (press the button on the back of the case).',
    },
    'chromebook': {
      steps: [
        'Click the clock area in the bottom-right corner.',
        'Click the Bluetooth icon.',
        'Put your earbuds into pairing mode.',
        'Click the earbuds name when it appears in the list.',
        'You should hear a confirmation tone in the earbuds.',
      ],
      tip: 'Most wireless earbuds work with Chromebooks. If sound cuts out, make sure the earbuds are charged and close to the Chromebook.',
    },
  },

  'set-medication-reminder': {
    'alexa': {
      steps: [
        'Say "Alexa, set a reminder to take my medicine at 9 AM."',
        'Alexa confirms the reminder.',
        'At 9 AM, Alexa will chime and say your reminder.',
        'Say "Alexa, set a recurring reminder" to make it repeat daily.',
        'You can also manage reminders in the Alexa app under "Reminders & Alarms".',
      ],
      tip: 'You can set multiple medication reminders throughout the day. Alexa will even tell you which reminder it is when it goes off, so you know which medicine to take.',
    },
    'google-home': {
      steps: [
        'Say "Hey Google, remind me to take my medicine every day at 9 AM."',
        'Google confirms the reminder.',
        'At the scheduled time, your Nest device chimes and reads the reminder.',
        'You can manage reminders in the Google Home app or by saying "Hey Google, what are my reminders?"',
      ],
      tip: 'Google can also add reminders to your Google Calendar so you see them on your phone and tablet too.',
    },
  },

  'enable-emergency-sos': {
    'samsung-tab': {
      steps: [
        'Open Settings.',
        'Tap "Safety and emergency".',
        'Tap "SOS messages" or "Emergency SOS".',
        'Turn it on and add your emergency contacts.',
        'When activated (pressing the power button 5 times), the tablet sends an alert to your contacts.',
      ],
      tip: 'Also set up "Medical info" in the same menu so first responders can see important health information on your lock screen.',
    },
  },
}
