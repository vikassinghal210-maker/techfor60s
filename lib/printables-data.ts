export interface PrintableSection {
  heading: string
  items: string[]
}

export interface Printable {
  slug: string
  title: string
  description: string
  icon: string
  category: string
  content: PrintableSection[]
}

export const PRINTABLES: Printable[] = [
  {
    slug: 'zoom-cheat-sheet',
    title: 'Zoom Video Calls Cheat Sheet',
    description:
      'A printable quick-reference for Zoom — joining calls, muting, using the camera, chatting, and screen sharing.',
    icon: '📹',
    category: 'Video Calls',
    content: [
      {
        heading: 'Joining & Leaving a Call',
        items: [
          'Click the Zoom link in your email or message — it opens automatically',
          'If asked, click "Open Zoom" or "Launch Meeting"',
          'You may need to enter a Meeting ID and Passcode (check your invite)',
          'To leave: click the red "Leave" button in the bottom-right corner',
        ],
      },
      {
        heading: 'Mute & Unmute',
        items: [
          'Look at the bottom-left corner for the microphone icon',
          'Click the microphone to mute yourself (a red line appears)',
          'Click it again to unmute so others can hear you',
          'Tip: Stay muted when you are not speaking to reduce background noise',
        ],
      },
      {
        heading: 'Camera (Video)',
        items: [
          'The camera icon is next to the microphone at the bottom-left',
          'Click it to turn your video on or off',
          'Make sure you are facing a light source (window or lamp) so people can see you clearly',
        ],
      },
      {
        heading: 'Chat',
        items: [
          'Click the "Chat" button at the bottom of the screen',
          'A panel opens on the right — type your message and press Enter',
          'You can send messages to everyone or select a specific person',
        ],
      },
      {
        heading: 'Screen Sharing',
        items: [
          'Click the green "Share Screen" button at the bottom',
          'Choose which window or your entire screen to share',
          'Click "Stop Share" (red button at the top) when you are done',
        ],
      },
      {
        heading: 'Gallery View vs. Speaker View',
        items: [
          'Click "View" in the top-right corner to switch views',
          'Gallery View shows everyone in a grid — good for group calls',
          'Speaker View zooms in on whoever is talking',
        ],
      },
      {
        heading: 'Troubleshooting',
        items: [
          'No sound? Check that your speakers are not muted on your computer/phone',
          'Others cannot hear you? Make sure you clicked Unmute in Zoom',
          'Video not working? Check if another app is using your camera',
          'Bad connection? Turn off your camera to save bandwidth',
          'Still stuck? Leave the meeting and rejoin using the same link',
        ],
      },
    ],
  },
  {
    slug: 'whatsapp-cheat-sheet',
    title: 'WhatsApp Quick Reference Guide',
    description:
      'A printable guide covering WhatsApp basics — messages, photos, voice messages, video calls, and group chats.',
    icon: '💬',
    category: 'Messaging',
    content: [
      {
        heading: 'Sending a Text Message',
        items: [
          'Open WhatsApp and tap the "Chats" tab at the bottom',
          'Tap an existing conversation or tap the new-message icon (pencil or chat bubble)',
          'Type your message in the text box at the bottom',
          'Tap the green Send arrow to send',
        ],
      },
      {
        heading: 'Sending Photos & Videos',
        items: [
          'Open a chat and tap the paperclip icon (Android) or the + icon (iPhone)',
          'Choose "Camera" to take a new photo, or "Gallery/Photos" to pick an existing one',
          'Add a caption if you like, then tap Send',
        ],
      },
      {
        heading: 'Voice Messages',
        items: [
          'In a chat, tap and hold the microphone icon on the right side',
          'Speak your message while holding the button',
          'Release to send — swipe left to cancel if you change your mind',
        ],
      },
      {
        heading: 'Making Video & Voice Calls',
        items: [
          'Open the chat with the person you want to call',
          'Tap the phone icon for a voice call or the camera icon for a video call (top-right)',
          'To end the call, tap the red hang-up button',
        ],
      },
      {
        heading: 'Group Chats',
        items: [
          'Tap the three dots (Android) or "Chats" tab (iPhone), then "New Group"',
          'Select the contacts you want to add and tap the arrow',
          'Give your group a name (e.g., "Family Chat") and tap the checkmark',
          'To leave a group: open it, tap the group name at the top, scroll down, tap "Exit Group"',
        ],
      },
      {
        heading: 'Useful Settings',
        items: [
          'Change text size: Settings > Chats > Font Size',
          'Turn read receipts on/off: Settings > Privacy > Read Receipts',
          'Back up your chats: Settings > Chats > Chat Backup',
          'Block a contact: open their chat, tap their name, scroll down, tap "Block"',
        ],
      },
    ],
  },
  {
    slug: 'is-this-a-scam-checklist',
    title: 'Is This a Scam? Checklist',
    description:
      'A printable checklist of red flags to help you spot scam emails, texts, and phone calls before you fall victim.',
    icon: '🛡️',
    category: 'Safety',
    content: [
      {
        heading: 'Urgency & Pressure',
        items: [
          '⬜ Does it say you must act RIGHT NOW or something bad will happen?',
          '⬜ Does it threaten to close your account, arrest you, or fine you?',
          '⬜ Does it create panic (e.g., "Your account has been compromised!")?',
        ],
      },
      {
        heading: 'Requests for Personal Information',
        items: [
          '⬜ Does it ask for your password, PIN, or bank account number?',
          '⬜ Does it ask for your Social Security number or National Insurance number?',
          '⬜ Does it ask you to verify personal details by clicking a link?',
          '⬜ Remember: Banks and government agencies will NEVER ask for passwords by email or text',
        ],
      },
      {
        heading: 'Too Good to Be True',
        items: [
          '⬜ Does it promise free money, prizes, or gifts you never entered for?',
          '⬜ Does it offer an unbelievable deal or discount?',
          '⬜ Does it say you have won a lottery or inheritance from a stranger?',
        ],
      },
      {
        heading: 'Unknown or Suspicious Sender',
        items: [
          '⬜ Is the email from someone you do not recognise?',
          '⬜ Does the email address look strange (e.g., amazon-support@gmail.com instead of @amazon.com)?',
          '⬜ Is it a text from an unknown number claiming to be your bank or a delivery service?',
        ],
      },
      {
        heading: 'Poor Grammar & Spelling',
        items: [
          '⬜ Are there obvious spelling mistakes or awkward phrasing?',
          '⬜ Does it mix formal and informal language oddly?',
          '⬜ Does the company name look slightly wrong (e.g., "Arnazon" instead of "Amazon")?',
        ],
      },
      {
        heading: 'Suspicious Links & Attachments',
        items: [
          '⬜ Does it ask you to click a link? (Hover over it — does the web address look legitimate?)',
          '⬜ Does it include an unexpected attachment?',
          '⬜ Does the link go to a website that does NOT match the company it claims to be from?',
        ],
      },
      {
        heading: 'What to Do',
        items: [
          'If you checked ANY box above — it is very likely a scam',
          'Do NOT click any links or download attachments',
          'Do NOT reply or call back the number provided',
          'Contact the real company directly using the number on their official website',
          'Report the scam: forward phishing emails to reportphishing@apwg.org',
          'Tell a family member or friend — talking it through helps',
        ],
      },
    ],
  },
  {
    slug: 'emergency-contacts-template',
    title: 'Emergency Contacts & Important Numbers',
    description:
      'A printable template to fill in your essential contacts — family, doctors, pharmacy, insurance, and emergency services.',
    icon: '📞',
    category: 'Safety',
    content: [
      {
        heading: 'Emergency Services',
        items: [
          'Emergency (Police/Fire/Ambulance): 911 (US) / 999 (UK) / 112 (EU)',
          'Poison Control: 1-800-222-1222 (US)',
          'Non-Emergency Police: ____________________',
        ],
      },
      {
        heading: 'Family Contacts',
        items: [
          'Name: ____________________ Phone: ____________________ Relationship: ____________________',
          'Name: ____________________ Phone: ____________________ Relationship: ____________________',
          'Name: ____________________ Phone: ____________________ Relationship: ____________________',
          'Name: ____________________ Phone: ____________________ Relationship: ____________________',
        ],
      },
      {
        heading: 'Medical Contacts',
        items: [
          'Primary Doctor: ____________________ Phone: ____________________',
          'Specialist: ____________________ Phone: ____________________',
          'Dentist: ____________________ Phone: ____________________',
          'Pharmacy: ____________________ Phone: ____________________',
          'Health Insurance: ____________________ Policy #: ____________________',
        ],
      },
      {
        heading: 'Neighbours & Friends',
        items: [
          'Name: ____________________ Phone: ____________________ Address: ____________________',
          'Name: ____________________ Phone: ____________________ Address: ____________________',
        ],
      },
      {
        heading: 'Utilities & Services',
        items: [
          'Electric Company: ____________________ Phone: ____________________',
          'Gas Company: ____________________ Phone: ____________________',
          'Water Company: ____________________ Phone: ____________________',
          'Internet/Phone Provider: ____________________ Phone: ____________________',
          'Home Insurance: ____________________ Policy #: ____________________',
        ],
      },
      {
        heading: 'Other Important Numbers',
        items: [
          'Bank: ____________________ Phone: ____________________',
          'Landlord/Building Manager: ____________________ Phone: ____________________',
          'Place of Worship: ____________________ Phone: ____________________',
          'Taxi/Ride Service: ____________________ Phone: ____________________',
        ],
      },
    ],
  },
  {
    slug: 'password-tracker',
    title: 'Password Tracker Sheet',
    description:
      'A printable password tracker to record your accounts safely — with columns for website, username, password hint, and notes.',
    icon: '🔑',
    category: 'Safety',
    content: [
      {
        heading: 'Important: Keep This Sheet Safe!',
        items: [
          'Store this sheet in a locked drawer or safe — never leave it in plain sight',
          'Write a PASSWORD HINT, not the actual password (e.g., "pet name + house number")',
          'If someone finds this sheet, they should not be able to guess your passwords',
          'Consider using a password manager app as a digital alternative',
        ],
      },
      {
        heading: 'Account 1',
        items: [
          'Website/App: ____________________',
          'Username or Email: ____________________',
          'Password Hint: ____________________',
          'Date Created/Changed: ____________________',
          'Notes: ____________________',
        ],
      },
      {
        heading: 'Account 2',
        items: [
          'Website/App: ____________________',
          'Username or Email: ____________________',
          'Password Hint: ____________________',
          'Date Created/Changed: ____________________',
          'Notes: ____________________',
        ],
      },
      {
        heading: 'Account 3',
        items: [
          'Website/App: ____________________',
          'Username or Email: ____________________',
          'Password Hint: ____________________',
          'Date Created/Changed: ____________________',
          'Notes: ____________________',
        ],
      },
      {
        heading: 'Account 4',
        items: [
          'Website/App: ____________________',
          'Username or Email: ____________________',
          'Password Hint: ____________________',
          'Date Created/Changed: ____________________',
          'Notes: ____________________',
        ],
      },
      {
        heading: 'Account 5',
        items: [
          'Website/App: ____________________',
          'Username or Email: ____________________',
          'Password Hint: ____________________',
          'Date Created/Changed: ____________________',
          'Notes: ____________________',
        ],
      },
      {
        heading: 'Account 6',
        items: [
          'Website/App: ____________________',
          'Username or Email: ____________________',
          'Password Hint: ____________________',
          'Date Created/Changed: ____________________',
          'Notes: ____________________',
        ],
      },
      {
        heading: 'Password Tips',
        items: [
          'Use at least 12 characters — longer is stronger',
          'Mix uppercase letters, lowercase letters, numbers, and symbols',
          'Never reuse the same password on multiple sites',
          'Change passwords every 6-12 months for important accounts',
          'Enable two-factor authentication (2FA) wherever possible',
        ],
      },
    ],
  },
  {
    slug: 'wifi-troubleshooting-flowchart',
    title: 'WiFi Not Working? Follow These Steps',
    description:
      'A printable step-by-step troubleshooting guide to fix WiFi problems on your phone, tablet, or computer.',
    icon: '📶',
    category: 'Troubleshooting',
    content: [
      {
        heading: 'Step 1: Is WiFi Turned On?',
        items: [
          'On your phone/tablet: Go to Settings > WiFi and make sure the toggle is ON',
          'On your computer: Look for the WiFi icon in the bottom-right (Windows) or top-right (Mac)',
          'If WiFi was off, turn it on and wait 10 seconds. Connected? You are done!',
          'If WiFi is on but not working, go to Step 2',
        ],
      },
      {
        heading: 'Step 2: Toggle Airplane Mode',
        items: [
          'Turn Airplane Mode ON, wait 10 seconds, then turn it OFF',
          'On iPhone: Settings > Airplane Mode, or swipe down from top-right',
          'On Android: Swipe down from top of screen, tap the airplane icon',
          'On computer: Skip this step and go to Step 3',
          'Did this fix it? Great! If not, go to Step 3',
        ],
      },
      {
        heading: 'Step 3: Restart Your Device',
        items: [
          'Turn your phone, tablet, or computer completely OFF',
          'Wait 30 seconds',
          'Turn it back ON and check WiFi again',
          'Still not working? Go to Step 4',
        ],
      },
      {
        heading: 'Step 4: Restart Your Router',
        items: [
          'Find your WiFi router (the box with blinking lights, usually near your front door or living room)',
          'Unplug the power cable from the back of the router',
          'Wait 60 seconds (a full minute)',
          'Plug it back in and wait 2-3 minutes for the lights to settle',
          'Try connecting to WiFi again. Working? Wonderful! If not, go to Step 5',
        ],
      },
      {
        heading: 'Step 5: Forget and Reconnect to the Network',
        items: [
          'Go to Settings > WiFi on your device',
          'Tap on your WiFi network name',
          'Tap "Forget This Network" or "Forget"',
          'Now tap your WiFi network name again and re-enter the password',
          'Tip: Your WiFi password is often on a sticker on the bottom of your router',
          'Still not working? Go to Step 6',
        ],
      },
      {
        heading: 'Step 6: Check if the Problem Is Your Provider',
        items: [
          'Ask someone else in your home if their WiFi is working — if nobody has WiFi, the problem is your provider',
          'Check your internet provider\'s website (on your phone using mobile data) for outage reports',
          'Call your internet provider\'s support line (the number is on your bill)',
          'They can check for outages in your area and walk you through further steps',
        ],
      },
      {
        heading: 'Quick Reference: Common WiFi Passwords',
        items: [
          'Check the sticker on the bottom or back of your router',
          'Look for "WiFi Key", "WPA Key", "Wireless Password", or "Network Key"',
          'If you changed the password and forgot it, you may need to reset the router (small button on the back)',
          'After a reset, the password goes back to what is printed on the sticker',
        ],
      },
    ],
  },
]

export function getPrintable(slug: string): Printable | undefined {
  return PRINTABLES.find((p) => p.slug === slug)
}

export function getAllPrintableSlugs(): { slug: string }[] {
  return PRINTABLES.map((p) => ({ slug: p.slug }))
}
