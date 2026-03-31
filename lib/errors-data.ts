// ── Error Message Database for TechFor60s ───────────────────────────────────

export type DeviceType =
  | 'iphone'
  | 'android'
  | 'windows'
  | 'mac'
  | 'browser'
  | 'app'
  | 'wifi'

export type Severity = 'low' | 'medium' | 'high'

export interface ErrorEntry {
  slug: string
  device: DeviceType
  errorText: string
  plainMeaning: string
  severity: Severity
  steps: string[]
  prevention: string
  commonCauses: string[]
  relatedErrors: string[]
  searchTerms: string[]
}

export interface DeviceCategory {
  slug: DeviceType
  label: string
  icon: string
  count: number
}

// ── iPhone Errors (25) ──────────────────────────────────────────────────────

const iphoneErrors: ErrorEntry[] = [
  {
    slug: 'iphone-storage-almost-full',
    device: 'iphone',
    errorText: 'Storage Almost Full',
    plainMeaning:
      'Your iPhone is running out of space to save photos, apps, and messages. Think of it like a filing cabinet that is nearly stuffed — you need to clear some room.',
    severity: 'medium',
    steps: [
      'Open the Settings app (the grey gear icon on your home screen).',
      'Tap "General", then tap "iPhone Storage".',
      'Wait a moment — your phone will show which apps use the most space.',
      'Look for apps you no longer use and tap them, then tap "Delete App".',
      'Go to Photos and delete old pictures or videos you no longer need.',
      'Empty the "Recently Deleted" album in Photos — items stay there for 30 days.',
      'In Messages, delete old conversations with lots of photos or videos.',
    ],
    prevention:
      'Turn on iCloud Photos to automatically store your pictures in the cloud. Regularly delete apps you no longer use and clear old messages.',
    commonCauses: [
      'Too many photos and videos saved on the phone',
      'Apps you downloaded but never use',
      'Old text messages with lots of pictures',
      'iOS software updates that need temporary space',
    ],
    relatedErrors: ['iphone-icloud-storage-full', 'iphone-cannot-take-photo'],
    searchTerms: [
      'iPhone storage full',
      'iPhone no space',
      'iPhone memory full',
      'cannot take photo storage',
      'iPhone says storage almost full',
    ],
  },
  {
    slug: 'iphone-accessory-not-supported',
    device: 'iphone',
    errorText: 'This Accessory May Not Be Supported',
    plainMeaning:
      'Your iPhone does not recognise the cable or device you just plugged in. It might be a non-Apple charger or a damaged cable.',
    severity: 'low',
    steps: [
      'Unplug the cable or accessory from your iPhone.',
      'Check the cable for any visible damage — fraying, bent pins, or dirt.',
      'Clean the charging port on the bottom of your iPhone with a soft, dry brush.',
      'Try a different cable, preferably one that came with your iPhone or says "MFi Certified".',
      'If using a car charger or adapter, try plugging directly into a wall outlet instead.',
      'Restart your iPhone: hold the side button, slide to power off, then turn it back on.',
    ],
    prevention:
      'Use Apple-branded or MFi-certified cables and accessories. Keep your charging port clean and avoid bending cables sharply.',
    commonCauses: [
      'Using a cheap or counterfeit charging cable',
      'Dirt or lint stuck in the charging port',
      'A damaged or frayed cable',
      'An accessory that is not designed for your iPhone model',
    ],
    relatedErrors: ['iphone-not-charging', 'iphone-usb-device-not-recognized'],
    searchTerms: [
      'accessory not supported iPhone',
      'iPhone charger not working',
      'this accessory may not be supported',
      'iPhone cable error',
    ],
  },
  {
    slug: 'iphone-sim-not-provisioned',
    device: 'iphone',
    errorText: 'SIM Not Provisioned',
    plainMeaning:
      'Your SIM card is not set up properly with your phone carrier. Your phone cannot connect to the mobile network to make calls or use data.',
    severity: 'high',
    steps: [
      'Turn your iPhone off completely, then turn it back on.',
      'Remove the SIM card tray using a SIM ejector tool or a straightened paperclip.',
      'Take out the SIM card, check it for damage, and place it back in carefully.',
      'Make sure the SIM card is sitting flat and properly aligned in the tray.',
      'Push the tray back in gently until it clicks.',
      'If the error continues, call your mobile carrier (e.g., AT&T, Verizon, T-Mobile) and ask them to reprovision your SIM.',
      'Your carrier may need to send you a new SIM card — this is usually free.',
    ],
    prevention:
      'When switching phones, always contact your carrier to make sure your SIM card is activated for the new device.',
    commonCauses: [
      'A brand-new SIM card that has not been activated yet',
      'Moving a SIM card from an old phone to a new one without activating it',
      'A damaged or very old SIM card',
      'Account issues with your mobile carrier',
    ],
    relatedErrors: ['iphone-no-service', 'iphone-cellular-update-failed'],
    searchTerms: [
      'SIM not provisioned iPhone',
      'SIM card error',
      'iPhone SIM not working',
      'no SIM card installed',
    ],
  },
  {
    slug: 'iphone-no-service',
    device: 'iphone',
    errorText: 'No Service',
    plainMeaning:
      'Your iPhone cannot connect to your mobile carrier. You will not be able to make calls, send texts, or use mobile data until this is fixed.',
    severity: 'high',
    steps: [
      'Check the top of your screen — if you see "No Service", start with a restart.',
      'Turn on Airplane Mode (swipe down from top-right, tap the airplane icon), wait 30 seconds, then turn it off.',
      'Go to Settings > General > About. If a carrier update is available, install it.',
      'Go to Settings > General > Transfer or Reset iPhone > Reset > Reset Network Settings.',
      'Make sure your account is active by calling your carrier from a different phone.',
      'Try removing and reinserting your SIM card.',
      'If nothing works, visit your carrier store — they can test with a new SIM card.',
    ],
    prevention:
      'Keep your iPhone software up to date. Pay your phone bill on time to avoid service interruptions.',
    commonCauses: [
      'Being in an area with poor mobile coverage',
      'An outdated carrier settings file',
      'A loose or damaged SIM card',
      'An unpaid phone bill or suspended account',
    ],
    relatedErrors: ['iphone-sim-not-provisioned', 'iphone-cellular-update-failed', 'iphone-call-failed'],
    searchTerms: [
      'iPhone no service',
      'iPhone no signal',
      'iPhone says no service',
      'lost service on iPhone',
      'no bars on iPhone',
    ],
  },
  {
    slug: 'iphone-cannot-connect-app-store',
    device: 'iphone',
    errorText: 'Cannot Connect to App Store',
    plainMeaning:
      'Your iPhone is having trouble reaching the App Store. You will not be able to download or update apps until the connection is restored.',
    severity: 'medium',
    steps: [
      'Make sure your Wi-Fi or mobile data is working — try opening a website in Safari.',
      'Close the App Store app completely: swipe up from the bottom and swipe the App Store card away.',
      'Open the App Store again and try your download.',
      'Go to Settings > General > Date & Time and make sure "Set Automatically" is turned on.',
      'Try signing out of your Apple ID: Settings > tap your name at the top > Sign Out, then sign back in.',
      'If the problem continues, go to Settings > General > Transfer or Reset iPhone > Reset > Reset Network Settings.',
    ],
    prevention:
      'Keep your iPhone updated to the latest software. Make sure your Apple ID password is current and your payment method is valid.',
    commonCauses: [
      'Poor or no internet connection',
      'Apple servers temporarily down',
      'Incorrect date and time settings',
      'An Apple ID sign-in issue',
    ],
    relatedErrors: ['iphone-verification-required', 'iphone-icloud-storage-full'],
    searchTerms: [
      'cannot connect to App Store',
      'App Store not working iPhone',
      'unable to download apps',
      'App Store error',
    ],
  },
  {
    slug: 'iphone-disabled',
    device: 'iphone',
    errorText: 'iPhone is Disabled, Connect to iTunes',
    plainMeaning:
      'Too many wrong passcodes were entered and your iPhone has locked itself for security. This is a safety feature to protect your data.',
    severity: 'high',
    steps: [
      'Do not keep trying passcodes — each wrong attempt increases the lockout time.',
      'You will need a computer (Mac or PC) with iTunes installed, or a Mac with Finder.',
      'Connect your iPhone to the computer with a USB cable.',
      'Put your iPhone into Recovery Mode: press and quickly release Volume Up, then Volume Down, then hold the Side button until you see the recovery screen.',
      'On the computer, click "Restore" when prompted.',
      'This will erase your iPhone and install fresh software — you can restore from a backup afterward.',
      'If you have an iCloud backup, you can set up your phone and choose "Restore from iCloud Backup".',
    ],
    prevention:
      'Use a passcode you can remember. Set up Face ID or Touch ID so you rarely need to type your passcode. Make regular iCloud backups.',
    commonCauses: [
      'Entering the wrong passcode too many times',
      'A child or grandchild accidentally trying passcodes',
      'Forgetting your passcode after not using the phone for a while',
    ],
    relatedErrors: ['iphone-unable-to-activate', 'iphone-face-id-not-available'],
    searchTerms: [
      'iPhone disabled',
      'iPhone locked out',
      'connect to iTunes',
      'forgot iPhone passcode',
      'iPhone disabled connect to iTunes',
    ],
  },
  {
    slug: 'iphone-software-update-failed',
    device: 'iphone',
    errorText: 'Software Update Failed',
    plainMeaning:
      'Your iPhone tried to install a new update but something went wrong. Your phone is fine — the update just did not finish installing.',
    severity: 'medium',
    steps: [
      'Make sure you have a strong Wi-Fi connection — do not use mobile data for updates.',
      'Check that your iPhone has at least 50% battery, or plug it in to charge.',
      'Go to Settings > General > iPhone Storage and make sure you have at least 5 GB free.',
      'Go to Settings > General > Software Update and try again.',
      'If it fails again, delete the downloaded update: Settings > General > iPhone Storage > find the update file and delete it, then try downloading again.',
      'As a last resort, connect your iPhone to a computer and update through iTunes or Finder.',
    ],
    prevention:
      'Always update over Wi-Fi with your phone plugged in and at least 5 GB of free storage. Update at night when you are not using the phone.',
    commonCauses: [
      'Weak or interrupted Wi-Fi connection during the download',
      'Not enough free storage on the phone',
      'Low battery during the update',
      'Apple servers being busy right after a new update is released',
    ],
    relatedErrors: ['iphone-storage-almost-full', 'iphone-cellular-update-failed'],
    searchTerms: [
      'iPhone update failed',
      'software update failed',
      'iPhone update error',
      'cannot install update',
      'iPhone update stuck',
    ],
  },
  {
    slug: 'iphone-icloud-storage-full',
    device: 'iphone',
    errorText: 'iCloud Storage Full',
    plainMeaning:
      'Your free 5 GB of iCloud storage is used up. Your photos, backups, and files are no longer being saved to the cloud.',
    severity: 'medium',
    steps: [
      'Go to Settings > tap your name at the top > iCloud > Manage Account Storage.',
      'See what is using the most space — usually Photos and Backups.',
      'Delete old iCloud backups of devices you no longer own.',
      'Turn off iCloud backup for apps that do not need it.',
      'Consider upgrading your iCloud plan: Settings > your name > iCloud > Manage Account Storage > Change Storage Plan. The 50 GB plan is very affordable.',
      'Alternatively, move photos to your computer or a USB drive to free up space.',
    ],
    prevention:
      'Upgrading to the 50 GB iCloud plan (usually about $0.99/month) prevents this problem for most people. Regularly review what is stored in iCloud.',
    commonCauses: [
      'Years of photos and videos backed up to the free 5 GB plan',
      'Multiple device backups stored in iCloud',
      'Large app data from apps like WhatsApp or Messages',
    ],
    relatedErrors: ['iphone-storage-almost-full', 'iphone-cannot-connect-app-store'],
    searchTerms: [
      'iCloud storage full',
      'iCloud full',
      'not enough iCloud storage',
      'iCloud backup failed',
      'buy more iCloud storage',
    ],
  },
  {
    slug: 'iphone-verification-required',
    device: 'iphone',
    errorText: 'Verification Required',
    plainMeaning:
      'The App Store needs you to confirm your payment information before you can download apps, even free ones.',
    severity: 'low',
    steps: [
      'Open Settings and tap your name at the top.',
      'Tap "Payment & Shipping".',
      'You may need to enter your Apple ID password.',
      'Make sure you have a valid payment method on file — even for free apps, Apple requires one.',
      'If your card has expired, update it with a current card.',
      'Go back to the App Store and try downloading the app again.',
    ],
    prevention:
      'Keep your payment information up to date in your Apple ID settings. You will not be charged for free apps.',
    commonCauses: [
      'An expired credit or debit card on your Apple ID',
      'No payment method on file',
      'An unpaid balance on your Apple ID account',
      'Signing in on a new device for the first time',
    ],
    relatedErrors: ['iphone-cannot-connect-app-store'],
    searchTerms: [
      'verification required App Store',
      'verification required iPhone',
      'cannot download free apps',
      'App Store payment error',
    ],
  },
  {
    slug: 'iphone-cellular-update-failed',
    device: 'iphone',
    errorText: 'Cellular Update Failed',
    plainMeaning:
      'Your iPhone was not able to update the part that handles phone calls and mobile data. You may not be able to make calls until this is fixed.',
    severity: 'high',
    steps: [
      'Restart your iPhone: hold the side button, slide to power off, wait 30 seconds, then turn it back on.',
      'Go to Settings > General > About — if a carrier update appears, install it.',
      'Try toggling Airplane Mode on and off.',
      'Go to Settings > General > Transfer or Reset iPhone > Reset > Reset Network Settings.',
      'Make sure your iPhone software is up to date: Settings > General > Software Update.',
      'If the problem continues, contact Apple Support or visit an Apple Store.',
    ],
    prevention:
      'Keep your iPhone software up to date and always update over a stable Wi-Fi connection.',
    commonCauses: [
      'A software update that did not install correctly',
      'A glitch in the cellular modem firmware',
      'A network settings conflict',
    ],
    relatedErrors: ['iphone-no-service', 'iphone-sim-not-provisioned'],
    searchTerms: [
      'cellular update failed iPhone',
      'iPhone cellular not working',
      'cellular update failed after update',
    ],
  },
  {
    slug: 'iphone-face-id-not-available',
    device: 'iphone',
    errorText: 'Face ID Is Not Available',
    plainMeaning:
      'The facial recognition feature on your iPhone is not working right now. You can still unlock your phone with your passcode.',
    severity: 'medium',
    steps: [
      'Make sure nothing is covering the camera at the top of your screen (the "notch" or "Dynamic Island").',
      'Clean the front camera area gently with a soft, dry cloth.',
      'Restart your iPhone.',
      'Go to Settings > Face ID & Passcode and enter your passcode.',
      'Try tapping "Reset Face ID" and setting it up again from scratch.',
      'Make sure you are holding the phone at arm\'s length and looking directly at it.',
      'If it still does not work after a reset, the TrueDepth camera may need repair — contact Apple Support.',
    ],
    prevention:
      'Keep the front camera area clean. Avoid dropping your phone face-down, as this can damage the Face ID sensors.',
    commonCauses: [
      'Dirt or a screen protector covering the Face ID sensors',
      'A recent drop or physical damage',
      'A software glitch after an update',
      'Extreme cold weather can temporarily affect it',
    ],
    relatedErrors: ['iphone-disabled'],
    searchTerms: [
      'Face ID not working',
      'Face ID not available',
      'iPhone face unlock error',
      'Face ID stopped working',
    ],
  },
  {
    slug: 'iphone-cannot-verify-server-identity',
    device: 'iphone',
    errorText: 'Cannot Verify Server Identity',
    plainMeaning:
      'Your iPhone is having trouble confirming the security of an email or web server. This is a safety check — your phone is protecting you.',
    severity: 'low',
    steps: [
      'Tap "Continue" if you trust the server (for example, your own email provider).',
      'If you are not sure, tap "Cancel" to be safe.',
      'Go to Settings > General > Date & Time and make sure "Set Automatically" is on.',
      'Restart your iPhone.',
      'If this happens with email, go to Settings > Mail > Accounts, delete the email account, and add it again.',
      'Make sure your iPhone software is up to date.',
    ],
    prevention:
      'Keep your date and time set to automatic. Keep your iPhone updated to ensure it has the latest security certificates.',
    commonCauses: [
      'Incorrect date and time settings on your phone',
      'An email server with an expired security certificate',
      'An outdated iOS version missing new security certificates',
    ],
    relatedErrors: ['browser-connection-not-private', 'browser-certificate-error'],
    searchTerms: [
      'cannot verify server identity',
      'server identity iPhone',
      'email certificate error iPhone',
    ],
  },
  {
    slug: 'iphone-unable-to-activate',
    device: 'iphone',
    errorText: 'Unable to Activate',
    plainMeaning:
      'Your iPhone cannot complete its initial setup or reactivation. It needs to contact Apple servers to finish the process.',
    severity: 'high',
    steps: [
      'Make sure you are connected to Wi-Fi — activation requires an internet connection.',
      'Wait a few minutes and try again — Apple servers may be temporarily busy.',
      'Remove and reinsert your SIM card.',
      'Connect your iPhone to a computer and activate through iTunes or Finder.',
      'Make sure your SIM card is active with your carrier.',
      'If the phone was previously owned by someone else, they may need to remove it from their Apple ID first.',
    ],
    prevention:
      'When buying a used iPhone, always make sure the previous owner has signed out of their Apple ID and removed the device from their account.',
    commonCauses: [
      'No internet connection during setup',
      'Apple activation servers are busy',
      'The phone is still linked to a previous owner\'s Apple ID (Activation Lock)',
      'A SIM card issue',
    ],
    relatedErrors: ['iphone-sim-not-provisioned', 'iphone-disabled'],
    searchTerms: [
      'unable to activate iPhone',
      'iPhone activation error',
      'iPhone stuck on activate',
      'activation lock iPhone',
    ],
  },
  {
    slug: 'iphone-call-failed',
    device: 'iphone',
    errorText: 'Call Failed',
    plainMeaning:
      'Your iPhone tried to make a phone call but could not connect. This usually means there is a problem with your mobile signal or carrier.',
    severity: 'medium',
    steps: [
      'Check the signal bars at the top of your screen — if there are none, move to a different location.',
      'Turn Airplane Mode on and off: swipe down from the top-right and tap the airplane icon, wait 10 seconds, tap it again.',
      'Restart your iPhone.',
      'Make sure your phone plan is active and your bill is paid.',
      'Try calling a different number to rule out a problem with the other person\'s phone.',
      'Go to Settings > Phone > Wi-Fi Calling and turn it on if available — this lets you call over Wi-Fi.',
    ],
    prevention:
      'Keep Wi-Fi Calling turned on as a backup. Make sure your carrier account stays active.',
    commonCauses: [
      'Poor mobile signal in your current location',
      'Network congestion during busy times',
      'An account or billing issue with your carrier',
      'A temporary network outage in your area',
    ],
    relatedErrors: ['iphone-no-service', 'iphone-cellular-update-failed'],
    searchTerms: [
      'call failed iPhone',
      'iPhone calls not going through',
      'iPhone cannot make calls',
      'phone call dropping',
    ],
  },
  {
    slug: 'iphone-move-to-ios-error',
    device: 'iphone',
    errorText: 'Move to iOS — Unable to Migrate',
    plainMeaning:
      'The tool for transferring your data from an Android phone to your new iPhone ran into a problem. Your data has not been lost — it is still on your old phone.',
    severity: 'medium',
    steps: [
      'Make sure both phones are connected to the same Wi-Fi network.',
      'Turn off mobile data on your Android phone during the transfer.',
      'Close all open apps on both phones.',
      'On the Android phone, turn off any apps that might affect Wi-Fi (like Smart Network Switch).',
      'Restart both phones and try the Move to iOS process again.',
      'Make sure your new iPhone has enough storage for all the data being transferred.',
      'If it keeps failing, try transferring just photos and contacts, skipping large items.',
    ],
    prevention:
      'Before starting, make sure both phones are fully charged and connected to the same Wi-Fi network. Do not use either phone during the transfer.',
    commonCauses: [
      'Wi-Fi connection dropped during the transfer',
      'Not enough storage on the new iPhone',
      'Background apps interfering with the connection',
      'The phones were moved too far apart during transfer',
    ],
    relatedErrors: ['iphone-storage-almost-full'],
    searchTerms: [
      'move to iOS error',
      'transfer to iPhone failed',
      'move to iOS not working',
      'switch from Android to iPhone error',
    ],
  },
  {
    slug: 'iphone-cannot-take-photo',
    device: 'iphone',
    errorText: 'Cannot Take Photo — Not Enough Storage',
    plainMeaning:
      'Your iPhone has run out of room to save new photos. You need to free up space before the camera will work again.',
    severity: 'medium',
    steps: [
      'Go to Settings > General > iPhone Storage to see what is using your space.',
      'Delete photos and videos you no longer need — especially large videos.',
      'Open Photos > Albums > Recently Deleted and tap "Delete All" to free up that space immediately.',
      'Delete unused apps by pressing and holding their icon, then tapping "Remove App".',
      'Clear Safari data: Settings > Apps > Safari > Clear History and Website Data.',
      'After freeing space, open the Camera app and try taking a photo.',
    ],
    prevention:
      'Turn on iCloud Photos to automatically upload photos to the cloud. Regularly review and delete photos you do not need.',
    commonCauses: [
      'Phone storage completely full',
      'Large videos taking up most of the storage',
      'Recently Deleted album still holding deleted items',
    ],
    relatedErrors: ['iphone-storage-almost-full', 'iphone-icloud-storage-full'],
    searchTerms: [
      'cannot take photo iPhone',
      'iPhone camera storage full',
      'not enough storage for photo',
    ],
  },
  {
    slug: 'iphone-not-charging',
    device: 'iphone',
    errorText: 'Not Charging',
    plainMeaning:
      'Your iPhone is plugged in but the battery is not charging. This is usually a problem with the cable, adapter, or charging port.',
    severity: 'medium',
    steps: [
      'Try a different charging cable and power adapter.',
      'Check the charging port on the bottom of your iPhone for lint or debris — gently clean it with a wooden toothpick.',
      'Make sure the cable clicks firmly into the port.',
      'Try a different power outlet.',
      'Restart your iPhone while it is plugged in.',
      'If using a wireless charger, make sure your phone is centered on the charging pad.',
      'If nothing works, the charging port may need repair — visit an Apple Store.',
    ],
    prevention:
      'Keep the charging port clean. Use quality cables and avoid yanking the cable out forcefully.',
    commonCauses: [
      'Lint or debris in the charging port',
      'A damaged or worn-out cable',
      'A faulty power adapter',
      'A software glitch preventing charging',
    ],
    relatedErrors: ['iphone-accessory-not-supported'],
    searchTerms: [
      'iPhone not charging',
      'iPhone won\'t charge',
      'iPhone plugged in not charging',
      'charging port not working',
    ],
  },
  {
    slug: 'iphone-bluetooth-pairing-failed',
    device: 'iphone',
    errorText: 'Bluetooth Pairing Unsuccessful',
    plainMeaning:
      'Your iPhone could not connect to a Bluetooth device like headphones, a speaker, or your car. The two devices were not able to find each other.',
    severity: 'low',
    steps: [
      'Make sure the Bluetooth device is in "pairing mode" — check its manual for how to do this.',
      'On your iPhone, go to Settings > Bluetooth and make sure Bluetooth is turned on.',
      'If the device appears in the list, tap "Forget This Device", then try pairing again.',
      'Restart both your iPhone and the Bluetooth device.',
      'Make sure the devices are within about 3 feet (1 metre) of each other when pairing.',
      'Check that the Bluetooth device is not already connected to another phone or tablet.',
    ],
    prevention:
      'Keep your Bluetooth devices charged. When pairing, keep the devices close together and make sure no other device is trying to connect at the same time.',
    commonCauses: [
      'The Bluetooth device is not in pairing mode',
      'The device is already connected to another phone',
      'They are too far apart',
      'A software glitch on either device',
    ],
    relatedErrors: [],
    searchTerms: [
      'Bluetooth pairing failed iPhone',
      'cannot connect Bluetooth',
      'Bluetooth not working iPhone',
      'headphones won\'t connect',
    ],
  },
  {
    slug: 'iphone-touch-id-failed',
    device: 'iphone',
    errorText: 'Unable to Activate Touch ID',
    plainMeaning:
      'The fingerprint reader on your iPhone is not working. You can still use your passcode to unlock your phone.',
    severity: 'medium',
    steps: [
      'Make sure your finger and the Home button are clean and dry.',
      'Restart your iPhone.',
      'Go to Settings > Touch ID & Passcode and try deleting your fingerprints, then adding them again.',
      'When adding a fingerprint, move your finger slightly between taps to capture different angles.',
      'If Touch ID still does not work, make sure there is no screen protector covering the Home button.',
      'A hardware problem may require an Apple Store visit.',
    ],
    prevention:
      'Keep the Home button and your fingers clean and dry. Register multiple fingers in case one does not work well.',
    commonCauses: [
      'Wet or dirty fingers',
      'A dirty Home button',
      'A screen protector interfering with the sensor',
      'Hardware damage from a drop',
    ],
    relatedErrors: ['iphone-face-id-not-available', 'iphone-disabled'],
    searchTerms: [
      'Touch ID not working',
      'Touch ID failed',
      'fingerprint not working iPhone',
      'unable to activate Touch ID',
    ],
  },
  {
    slug: 'iphone-airdrop-not-working',
    device: 'iphone',
    errorText: 'AirDrop — No People Found',
    plainMeaning:
      'Your iPhone cannot find nearby Apple devices to share photos or files with. Both devices need to have AirDrop turned on.',
    severity: 'low',
    steps: [
      'On both iPhones, swipe down from the top-right to open Control Center.',
      'Press and hold the Wi-Fi/Bluetooth box, then tap AirDrop.',
      'Set AirDrop to "Everyone" on both devices (you can change it back later).',
      'Make sure Wi-Fi and Bluetooth are both turned on for both phones.',
      'Bring the phones within about 3 feet (1 metre) of each other.',
      'Turn off any VPN apps if you have them.',
    ],
    prevention:
      'Keep AirDrop set to "Contacts Only" for everyday use. Make sure the people you want to share with are in your Contacts.',
    commonCauses: [
      'AirDrop is set to "Receiving Off" on one of the devices',
      'Wi-Fi or Bluetooth is turned off',
      'The devices are too far apart',
      'A VPN app interfering with the connection',
    ],
    relatedErrors: ['iphone-bluetooth-pairing-failed'],
    searchTerms: [
      'AirDrop not working',
      'AirDrop no people found',
      'cannot AirDrop photos',
      'AirDrop not finding anyone',
    ],
  },
  {
    slug: 'iphone-mail-cannot-get-mail',
    device: 'iphone',
    errorText: 'Cannot Get Mail — The Connection to the Server Failed',
    plainMeaning:
      'Your iPhone cannot connect to your email server to check for new messages. Your old emails are usually still safe.',
    severity: 'medium',
    steps: [
      'Check that your Wi-Fi or mobile data is working — try opening a website.',
      'Close the Mail app completely and reopen it.',
      'Go to Settings > Mail > Accounts and check that your email account is still listed.',
      'Tap your email account and make sure the password is correct.',
      'Try deleting the email account and adding it again.',
      'Restart your iPhone.',
    ],
    prevention:
      'If you change your email password on a computer, remember to update it on your iPhone too. Keep your iPhone software up to date.',
    commonCauses: [
      'Changed email password not updated on iPhone',
      'Poor internet connection',
      'Email server temporarily down',
      'Incorrect email settings',
    ],
    relatedErrors: ['iphone-cannot-verify-server-identity'],
    searchTerms: [
      'cannot get mail iPhone',
      'email not working iPhone',
      'connection to server failed',
      'iPhone email error',
    ],
  },
  {
    slug: 'iphone-apps-crashing',
    device: 'iphone',
    errorText: 'App Keeps Closing Unexpectedly',
    plainMeaning:
      'An app on your iPhone keeps shutting down on its own. This is frustrating but usually easy to fix.',
    severity: 'low',
    steps: [
      'Close the app completely: swipe up from the bottom and swipe the app card away.',
      'Open the app again — sometimes this is all it takes.',
      'Check if an update is available: open the App Store, tap your profile icon at the top, and scroll down to see pending updates.',
      'If an update is available, tap "Update" next to the app.',
      'If it keeps crashing, delete the app and reinstall it from the App Store.',
      'Make sure your iPhone software is up to date: Settings > General > Software Update.',
    ],
    prevention:
      'Keep all your apps updated. Restart your iPhone once a week to keep things running smoothly.',
    commonCauses: [
      'The app needs an update',
      'A bug in the app that the developer needs to fix',
      'Low storage causing apps to misbehave',
      'An iOS update that is not compatible with the old app version',
    ],
    relatedErrors: ['iphone-storage-almost-full'],
    searchTerms: [
      'iPhone app crashing',
      'app keeps closing',
      'app crashes on iPhone',
      'app not working on iPhone',
    ],
  },
  {
    slug: 'iphone-location-services-error',
    device: 'iphone',
    errorText: 'Turn On Location Services to Allow Maps to Determine Your Location',
    plainMeaning:
      'Maps or another app needs permission to see where you are, but that feature is turned off on your phone.',
    severity: 'low',
    steps: [
      'Go to Settings > Privacy & Security > Location Services.',
      'Turn on "Location Services" at the top.',
      'Scroll down and find the app that asked (like Maps) and tap it.',
      'Choose "While Using the App" — this gives the app permission only when you are actually using it.',
      'Go back to the app and it should now be able to find your location.',
    ],
    prevention:
      'Keep Location Services turned on. You can control which apps have permission individually, so your privacy is still protected.',
    commonCauses: [
      'Location Services is turned off in Settings',
      'The specific app does not have permission',
      'Location Services were accidentally turned off',
    ],
    relatedErrors: [],
    searchTerms: [
      'location services iPhone',
      'maps not working iPhone',
      'iPhone location not working',
      'turn on location services',
    ],
  },
  {
    slug: 'iphone-siri-not-working',
    device: 'iphone',
    errorText: 'Siri Not Available — Try Again Later',
    plainMeaning:
      'Siri, your iPhone voice assistant, cannot connect to Apple servers right now. Siri needs the internet to work.',
    severity: 'low',
    steps: [
      'Make sure you are connected to Wi-Fi or mobile data.',
      'Try asking Siri again in a minute — the servers may be temporarily busy.',
      'Go to Settings > Siri & Search and turn Siri off, wait a few seconds, then turn it back on.',
      'Restart your iPhone.',
      'Check that "Hey Siri" or "Listen for Siri" is turned on in Settings > Siri & Search.',
    ],
    prevention:
      'Siri needs an internet connection to work. Make sure you have a reliable Wi-Fi or data connection when using Siri.',
    commonCauses: [
      'No internet connection',
      'Apple Siri servers temporarily down',
      'Siri accidentally turned off in Settings',
    ],
    relatedErrors: [],
    searchTerms: [
      'Siri not working',
      'Siri not available',
      'Hey Siri not responding',
      'Siri error iPhone',
    ],
  },
  {
    slug: 'iphone-screen-frozen',
    device: 'iphone',
    errorText: 'iPhone Screen Frozen / Not Responding',
    plainMeaning:
      'Your iPhone screen is not responding to touches. The phone is still on — it just needs a restart.',
    severity: 'medium',
    steps: [
      'Try pressing the side button once to see if the screen turns off and on.',
      'If the screen is completely frozen, force restart your iPhone:',
      'Quickly press and release the Volume Up button.',
      'Quickly press and release the Volume Down button.',
      'Press and hold the Side button until you see the Apple logo — then let go.',
      'Wait for your iPhone to restart — this usually takes about 30 seconds.',
      'If this happens frequently, check for a software update: Settings > General > Software Update.',
    ],
    prevention:
      'Keep your iPhone updated. Restart it once a week. Avoid filling up storage completely, as this can cause freezing.',
    commonCauses: [
      'An app crashed and froze the system',
      'Very low storage causing the phone to slow down',
      'A software bug',
      'Extreme heat or cold',
    ],
    relatedErrors: ['iphone-storage-almost-full', 'iphone-apps-crashing'],
    searchTerms: [
      'iPhone frozen',
      'iPhone screen stuck',
      'iPhone not responding to touch',
      'iPhone frozen screen',
    ],
  },
]

// ── Android Errors (25) ─────────────────────────────────────────────────────

const androidErrors: ErrorEntry[] = [
  {
    slug: 'android-unfortunately-app-stopped',
    device: 'android',
    errorText: 'Unfortunately, [App] Has Stopped',
    plainMeaning:
      'An app on your Android phone crashed. This is very common and usually fixable with a few taps.',
    severity: 'low',
    steps: [
      'Tap "OK" to close the error message.',
      'Open the app again — sometimes it works fine the second time.',
      'If it keeps happening, go to Settings > Apps, find the app, and tap "Force Stop".',
      'On the same screen, tap "Storage" then "Clear Cache".',
      'If clearing cache does not help, tap "Clear Data" (note: this may reset the app\'s settings).',
      'Check the Google Play Store for an update to the app.',
      'If nothing works, uninstall the app and reinstall it from the Play Store.',
    ],
    prevention:
      'Keep your apps updated through the Google Play Store. Restart your phone once a week.',
    commonCauses: [
      'The app has a bug that needs an update to fix',
      'Corrupted app data or cache',
      'Not enough free memory on the phone',
      'A conflict with a recent Android system update',
    ],
    relatedErrors: ['android-system-ui-stopped', 'android-settings-stopped', 'android-process-not-responding'],
    searchTerms: [
      'app has stopped Android',
      'unfortunately has stopped',
      'app keeps crashing',
      'app stopped working Android',
    ],
  },
  {
    slug: 'android-insufficient-storage',
    device: 'android',
    errorText: 'Insufficient Storage Available',
    plainMeaning:
      'Your Android phone does not have enough space to install the app or save the file. You need to free up some room.',
    severity: 'medium',
    steps: [
      'Go to Settings > Storage to see what is using your space.',
      'Delete photos and videos you no longer need — they usually take up the most space.',
      'Uninstall apps you do not use: Settings > Apps, tap the app, then "Uninstall".',
      'Clear app caches: Settings > Apps, tap each app, then "Storage" > "Clear Cache".',
      'Move photos to Google Photos — it can back them up and free space on your phone.',
      'If your phone has an SD card slot, move apps and files to the SD card.',
      'Empty your Downloads folder — open the Files app and delete old downloads.',
    ],
    prevention:
      'Use Google Photos to back up pictures automatically. Regularly delete apps and files you no longer need.',
    commonCauses: [
      'Too many photos and videos',
      'Unused apps taking up space',
      'App caches growing large over time',
      'Downloaded files piling up',
    ],
    relatedErrors: ['android-download-pending', 'android-app-not-installed'],
    searchTerms: [
      'insufficient storage Android',
      'Android storage full',
      'not enough space Android',
      'cannot install app storage',
    ],
  },
  {
    slug: 'android-play-authentication-required',
    device: 'android',
    errorText: 'Google Play — Authentication Is Required',
    plainMeaning:
      'Google Play needs you to sign in again before you can download or update apps. Your Google account needs to be verified.',
    severity: 'low',
    steps: [
      'Open the Google Play Store app.',
      'If asked to sign in, enter your Google (Gmail) email address and password.',
      'If you are already signed in but see this error, try this: go to Settings > Accounts > Google.',
      'Tap your Google account and then tap "Remove Account".',
      'Restart your phone.',
      'Go to Settings > Accounts > Add Account > Google and sign in again.',
      'Open the Play Store and try your download again.',
    ],
    prevention:
      'Keep your Google account password up to date on your phone. If you change your Gmail password on a computer, update it on your phone too.',
    commonCauses: [
      'Your Google account session expired',
      'You recently changed your Google password',
      'A Google Play Store cache issue',
      'A new security check from Google',
    ],
    relatedErrors: ['android-error-retrieving-info'],
    searchTerms: [
      'authentication required Google Play',
      'Play Store sign in error',
      'Google Play authentication',
      'cannot download apps Google Play',
    ],
  },
  {
    slug: 'android-system-ui-stopped',
    device: 'android',
    errorText: 'System UI Has Stopped',
    plainMeaning:
      'The part of Android that shows your home screen, notifications, and buttons crashed. Your phone data is safe — it just needs a restart.',
    severity: 'medium',
    steps: [
      'Tap "OK" on the error message.',
      'Restart your phone by holding the power button and tapping "Restart".',
      'If it keeps happening, go to Settings > Apps and find "System UI".',
      'Tap "Storage" then "Clear Cache".',
      'Check for a system update: Settings > System > Software Update.',
      'If the problem continues, try restarting in Safe Mode: hold the power button, then press and hold "Power Off" until "Safe Mode" appears.',
    ],
    prevention:
      'Keep your phone software up to date. Avoid installing apps from unknown sources outside the Play Store.',
    commonCauses: [
      'A recent app update conflicting with the system',
      'A bug in the Android system software',
      'Corrupted system cache',
      'A third-party launcher app causing conflicts',
    ],
    relatedErrors: ['android-unfortunately-app-stopped', 'android-process-not-responding'],
    searchTerms: [
      'System UI has stopped',
      'system UI crash Android',
      'Android system UI error',
      'home screen crashing',
    ],
  },
  {
    slug: 'android-sim-not-detected',
    device: 'android',
    errorText: 'SIM Card Not Detected',
    plainMeaning:
      'Your phone cannot find the SIM card that connects you to your mobile network. Without it, you cannot make calls or use mobile data.',
    severity: 'high',
    steps: [
      'Turn off your phone completely.',
      'Find the SIM card tray (usually on the side of the phone) and use the ejector tool or a paperclip to open it.',
      'Take out the SIM card and check it for scratches or damage.',
      'Gently clean the gold contacts with a soft, dry cloth.',
      'Place the SIM card back in carefully, making sure it is properly aligned.',
      'Turn your phone back on.',
      'If it still does not work, try the SIM card in another phone — if it does not work there either, get a new SIM from your carrier.',
    ],
    prevention:
      'Handle your SIM card carefully. Avoid removing it frequently. Keep the SIM tray clean.',
    commonCauses: [
      'The SIM card is loose or inserted incorrectly',
      'A dirty or damaged SIM card',
      'The SIM tray is not fully closed',
      'A hardware problem with the SIM card reader',
    ],
    relatedErrors: ['iphone-sim-not-provisioned', 'iphone-no-service'],
    searchTerms: [
      'SIM card not detected Android',
      'no SIM card Android',
      'SIM not recognized',
      'insert SIM card error',
    ],
  },
  {
    slug: 'android-wifi-authentication-error',
    device: 'android',
    errorText: 'Wi-Fi Authentication Error',
    plainMeaning:
      'Your phone is trying to connect to a Wi-Fi network but the password you entered is not being accepted.',
    severity: 'medium',
    steps: [
      'Make sure you are typing the Wi-Fi password exactly right — it is case-sensitive (capital and lowercase letters matter).',
      'Go to Settings > Wi-Fi, long-press on the network name, and tap "Forget Network".',
      'Tap the network name again and enter the password carefully.',
      'If you are not sure of the password, check the sticker on the bottom or back of your router.',
      'Restart your phone and your Wi-Fi router (unplug the router, wait 30 seconds, plug it back in).',
      'If using a public Wi-Fi network (like at a cafe), ask staff for the correct password.',
    ],
    prevention:
      'Write down your Wi-Fi password and keep it somewhere safe. When entering it, use the "show password" option to make sure you type it correctly.',
    commonCauses: [
      'Incorrect Wi-Fi password (check capital letters and special characters)',
      'The Wi-Fi password was recently changed',
      'A glitch in the saved network settings',
      'The router is set to a security type your phone does not support',
    ],
    relatedErrors: ['wifi-connected-no-internet', 'wifi-cant-connect'],
    searchTerms: [
      'Wi-Fi authentication error',
      'WiFi wrong password Android',
      'cannot connect to WiFi',
      'WiFi authentication problem',
    ],
  },
  {
    slug: 'android-settings-stopped',
    device: 'android',
    errorText: 'Unfortunately, Settings Has Stopped',
    plainMeaning:
      'The Settings app on your Android phone crashed. You may not be able to change settings until this is fixed.',
    severity: 'medium',
    steps: [
      'Tap "OK" on the error message.',
      'Try opening Settings again — it may work the second time.',
      'Restart your phone by holding the power button and tapping "Restart".',
      'If it keeps happening, clear the Settings app cache: go to Settings > Apps > Settings > Storage > Clear Cache.',
      'Check for a software update — this is often fixed in the next update.',
      'As a last resort, you can reset your phone settings: Settings > System > Reset Options > Reset All Settings.',
    ],
    prevention:
      'Keep your phone software updated. Avoid installing apps from unknown or untrusted sources.',
    commonCauses: [
      'A corrupted cache in the Settings app',
      'A bug in a recent Android update',
      'Conflicts with third-party apps',
    ],
    relatedErrors: ['android-system-ui-stopped', 'android-unfortunately-app-stopped'],
    searchTerms: [
      'settings has stopped Android',
      'Settings app crashing',
      'cannot open settings Android',
    ],
  },
  {
    slug: 'android-process-not-responding',
    device: 'android',
    errorText: 'Process System Isn\'t Responding',
    plainMeaning:
      'Your phone is overwhelmed and cannot keep up with everything running. This is like a traffic jam inside your phone.',
    severity: 'medium',
    steps: [
      'Tap "Wait" to give it more time — it may recover on its own.',
      'If it does not recover, tap "OK" to close the frozen process.',
      'Restart your phone.',
      'After restarting, go to Settings > Apps and uninstall any apps you recently installed that may be causing the problem.',
      'Clear the system cache: turn off the phone, then hold Power + Volume Up to enter Recovery Mode. Use volume buttons to select "Wipe Cache Partition".',
      'Make sure you have at least 1 GB of free storage.',
    ],
    prevention:
      'Do not install too many apps. Keep at least 2 GB of free storage. Restart your phone once a week.',
    commonCauses: [
      'Too many apps running at once',
      'Very low storage space',
      'A misbehaving app using too much memory',
      'An outdated Android version',
    ],
    relatedErrors: ['android-system-ui-stopped', 'android-insufficient-storage'],
    searchTerms: [
      'process system not responding',
      'Android not responding',
      'phone frozen Android',
      'Android system not responding',
    ],
  },
  {
    slug: 'android-error-retrieving-info',
    device: 'android',
    errorText: 'Error Retrieving Information from Server [DF-DFERH-01]',
    plainMeaning:
      'Google Play Store is having trouble communicating with Google servers. You cannot download or update apps right now.',
    severity: 'medium',
    steps: [
      'Open Settings > Apps > Google Play Store > Storage > Clear Cache.',
      'If that does not work, also tap "Clear Data" on the same screen.',
      'Then go to Settings > Apps > Google Play Services > Storage > Clear Cache.',
      'Go to Settings > Accounts > Google > Remove Account, then add it back.',
      'Restart your phone.',
      'Open the Play Store and try again.',
    ],
    prevention:
      'Keep Google Play Store and Google Play Services up to date. If you change your Google password, update it on your phone promptly.',
    commonCauses: [
      'Corrupted Google Play Store cache',
      'Google account sync issue',
      'A temporary Google server problem',
    ],
    relatedErrors: ['android-play-authentication-required', 'android-download-pending'],
    searchTerms: [
      'error retrieving information server',
      'DF-DFERH-01',
      'Play Store error',
      'Google Play error',
    ],
  },
  {
    slug: 'android-app-not-installed',
    device: 'android',
    errorText: 'App Not Installed',
    plainMeaning:
      'Your phone was not able to install an app. This usually means there is not enough space or the file is not compatible.',
    severity: 'low',
    steps: [
      'Make sure you have enough storage: Settings > Storage.',
      'If installing from outside the Play Store, go to Settings > Security and enable "Install Unknown Apps" for the source.',
      'If updating an existing app, try uninstalling the old version first, then install again.',
      'Clear the Google Play Store cache: Settings > Apps > Play Store > Storage > Clear Cache.',
      'Make sure the app is compatible with your Android version.',
      'Restart your phone and try again.',
    ],
    prevention:
      'Always install apps from the Google Play Store. Keep enough free storage for new apps. Keep your Android version updated.',
    commonCauses: [
      'Not enough storage space',
      'The APK file is corrupted',
      'The app is not compatible with your Android version',
      'A conflict with an older version of the same app',
    ],
    relatedErrors: ['android-insufficient-storage', 'android-download-pending'],
    searchTerms: [
      'app not installed Android',
      'cannot install app',
      'app installation failed',
      'app not installed error',
    ],
  },
  {
    slug: 'android-download-pending',
    device: 'android',
    errorText: 'Download Pending',
    plainMeaning:
      'Your app download is stuck waiting and not starting. The Play Store is waiting for something before it can begin.',
    severity: 'low',
    steps: [
      'Check your internet connection — try opening a website.',
      'If other downloads are in progress in the Play Store, wait for them to finish or cancel them.',
      'Open Settings > Apps > Google Play Store > Storage > Clear Cache.',
      'Turn off Auto-Update: in Play Store, tap your profile > Settings > Network Preferences > Auto-update apps > "Don\'t auto-update".',
      'Restart your phone and try the download again.',
      'Switch from Wi-Fi to mobile data (or vice versa) and try again.',
    ],
    prevention:
      'Keep a stable internet connection when downloading. Avoid downloading many apps at the same time.',
    commonCauses: [
      'Another download is happening in the background',
      'Poor internet connection',
      'Google Play Store cache issue',
      'Auto-update downloading other apps first',
    ],
    relatedErrors: ['android-insufficient-storage', 'android-error-retrieving-info'],
    searchTerms: [
      'download pending Play Store',
      'app stuck on download pending',
      'Play Store not downloading',
      'download won\'t start Android',
    ],
  },
  {
    slug: 'android-camera-failed',
    device: 'android',
    errorText: 'Camera Failed',
    plainMeaning:
      'The camera app on your Android phone is not working properly. This could be a temporary software issue.',
    severity: 'medium',
    steps: [
      'Close the Camera app and open it again.',
      'Restart your phone — this fixes the camera problem most of the time.',
      'Go to Settings > Apps > Camera > Storage > Clear Cache.',
      'If you are using a third-party camera app, try the built-in Camera app instead.',
      'Check if another app is using the camera (like a video call app) and close it.',
      'If nothing works, go to Settings > Apps > Camera > Storage > Clear Data.',
      'As a last resort, check for a software update: Settings > System > Software Update.',
    ],
    prevention:
      'Close camera and video apps when you are done using them. Keep your phone software updated.',
    commonCauses: [
      'Another app is using the camera in the background',
      'Corrupted camera app cache',
      'A software glitch after an update',
      'A hardware problem in rare cases',
    ],
    relatedErrors: ['android-unfortunately-app-stopped'],
    searchTerms: [
      'camera failed Android',
      'camera not working Android',
      'camera app error',
      'camera won\'t open',
    ],
  },
  {
    slug: 'android-charging-slowly',
    device: 'android',
    errorText: 'Charging Slowly',
    plainMeaning:
      'Your phone is charging but much slower than normal. It will still charge fully — it will just take longer.',
    severity: 'low',
    steps: [
      'Use the charger that came with your phone — other chargers may be slower.',
      'Make sure you are using a wall outlet, not a computer USB port (which charges much slower).',
      'Check the charging cable for damage and try a different one.',
      'Clean the charging port on your phone with a soft brush or wooden toothpick.',
      'Close all apps and turn off the screen while charging — using the phone slows charging.',
      'Turn off your phone completely while charging for the fastest charge.',
      'Avoid charging in hot environments — heat slows charging.',
    ],
    prevention:
      'Use the original charger and cable. Avoid cheap replacement chargers. Keep the charging port clean.',
    commonCauses: [
      'Using a low-power charger or computer USB port',
      'A damaged or cheap charging cable',
      'Dirty charging port',
      'Using the phone while charging',
      'High ambient temperature',
    ],
    relatedErrors: [],
    searchTerms: [
      'charging slowly Android',
      'slow charging',
      'phone charging slow',
      'charging slowly message',
    ],
  },
  {
    slug: 'android-google-keeps-stopping',
    device: 'android',
    errorText: 'Google Keeps Stopping',
    plainMeaning:
      'The Google app on your phone keeps crashing. This can affect Google Search, Google Assistant, and some other features.',
    severity: 'medium',
    steps: [
      'Go to Settings > Apps > Google > Storage > Clear Cache.',
      'If that does not work, also tap "Clear Data".',
      'Go to the Play Store, search for "Android System WebView", and update it.',
      'Also update the "Google" app from the Play Store.',
      'Restart your phone.',
      'If the problem persists, uninstall updates for the Google app: Settings > Apps > Google > three dots menu > "Uninstall Updates".',
    ],
    prevention:
      'Keep the Google app and Android System WebView updated. These updates often fix crashing issues.',
    commonCauses: [
      'A buggy Google app update',
      'Outdated Android System WebView',
      'Corrupted app cache',
      'Conflict with a recent Android system update',
    ],
    relatedErrors: ['android-unfortunately-app-stopped', 'android-system-ui-stopped'],
    searchTerms: [
      'Google keeps stopping',
      'Google app crashing',
      'Google has stopped Android',
      'Google search not working Android',
    ],
  },
  {
    slug: 'android-battery-draining-fast',
    device: 'android',
    errorText: 'Battery Draining Faster Than Normal',
    plainMeaning:
      'Your phone battery is running out much quicker than usual. An app or setting is using more power than it should.',
    severity: 'low',
    steps: [
      'Go to Settings > Battery to see which apps are using the most power.',
      'If an app you rarely use is high on the list, uninstall it or restrict its battery usage.',
      'Turn down screen brightness: Settings > Display > Brightness.',
      'Turn off Bluetooth and Wi-Fi when you are not using them.',
      'Turn off Location Services for apps that do not need it.',
      'Turn on Battery Saver mode: Settings > Battery > Battery Saver.',
      'Restart your phone — sometimes a stuck process is draining the battery.',
    ],
    prevention:
      'Keep screen brightness at a comfortable but not maximum level. Close apps you are not using. Turn on Battery Saver when your battery is low.',
    commonCauses: [
      'A misbehaving app running in the background',
      'Screen brightness set too high',
      'Location Services running constantly',
      'An old or degraded battery',
    ],
    relatedErrors: [],
    searchTerms: [
      'battery draining fast Android',
      'phone dying quickly',
      'battery life bad Android',
      'phone battery drain',
    ],
  },
  {
    slug: 'android-screen-overlay-detected',
    device: 'android',
    errorText: 'Screen Overlay Detected',
    plainMeaning:
      'Another app is drawing over your screen, which prevents you from changing certain settings. It is a security feature.',
    severity: 'low',
    steps: [
      'Look for any floating buttons, chat bubbles (like Facebook Messenger), or screen filter apps.',
      'Close or disable the app that is creating the overlay.',
      'Go to Settings > Apps > Special Access > Display Over Other Apps.',
      'Find apps that have permission to display over other apps and turn them off temporarily.',
      'Go back and try the action that triggered the error.',
      'You can re-enable the overlay apps afterward.',
    ],
    prevention:
      'When you see this error, remember it is caused by apps like chat bubbles, blue light filters, or floating widgets. Temporarily disable them when changing permissions.',
    commonCauses: [
      'Facebook Messenger chat bubbles (chat heads)',
      'Blue light filter or night mode apps',
      'Floating widget apps',
      'Screen dimming apps',
    ],
    relatedErrors: [],
    searchTerms: [
      'screen overlay detected',
      'screen overlay error',
      'display over other apps',
      'Android overlay error',
    ],
  },
  {
    slug: 'android-no-internet-connection',
    device: 'android',
    errorText: 'No Internet Connection',
    plainMeaning:
      'Your Android phone cannot connect to the internet. You will not be able to browse the web, check email, or use apps that need the internet.',
    severity: 'medium',
    steps: [
      'Check if Wi-Fi is turned on: swipe down from the top and look for the Wi-Fi icon.',
      'If Wi-Fi is on, turn it off and back on again.',
      'Try turning on mobile data if Wi-Fi is not available.',
      'Restart your phone.',
      'If using Wi-Fi, restart your router (unplug it, wait 30 seconds, plug it back in).',
      'Go to Settings > Network & Internet > Reset Wi-Fi, Mobile & Bluetooth.',
    ],
    prevention:
      'Keep your router in a central location for the best signal. Make sure your mobile data plan is active.',
    commonCauses: [
      'Wi-Fi turned off accidentally',
      'Router needs restarting',
      'Mobile data is turned off',
      'Airplane mode is turned on',
    ],
    relatedErrors: ['wifi-connected-no-internet', 'wifi-dns-not-responding'],
    searchTerms: [
      'no internet Android',
      'Android no connection',
      'phone won\'t connect to internet',
      'no internet connection error',
    ],
  },
  {
    slug: 'android-cant-send-text',
    device: 'android',
    errorText: 'Message Not Sent',
    plainMeaning:
      'Your text message did not go through. The other person did not receive it. You may need to try again.',
    severity: 'medium',
    steps: [
      'Check for signal bars at the top of your screen — you need mobile service to send texts.',
      'Tap the failed message and try to resend it.',
      'Turn Airplane Mode on and off to reset your connection.',
      'Restart your phone.',
      'If sending a picture message (MMS), make sure mobile data is turned on.',
      'Contact your carrier if the problem continues — your messaging service may need to be reactivated.',
    ],
    prevention:
      'Make sure you have mobile service before sending texts. Keep your phone plan active and paid.',
    commonCauses: [
      'No mobile signal',
      'Mobile data turned off (for picture messages)',
      'Message center number incorrect',
      'Carrier account issue',
    ],
    relatedErrors: ['iphone-no-service'],
    searchTerms: [
      'text message not sent Android',
      'cannot send text',
      'message failed to send',
      'SMS not sending',
    ],
  },
  {
    slug: 'android-phone-overheating',
    device: 'android',
    errorText: 'Phone Temperature Too High',
    plainMeaning:
      'Your phone has gotten too hot and needs to cool down. It may shut down some features to protect itself from damage.',
    severity: 'high',
    steps: [
      'Stop using your phone immediately and set it down.',
      'Remove your phone case to help it cool faster.',
      'Move the phone out of direct sunlight or hot environments.',
      'Do not put it in the refrigerator or freezer — sudden temperature changes can cause damage.',
      'Wait 10-15 minutes for it to cool down.',
      'Close all apps before using it again.',
      'If it overheats regularly, check which apps use the most battery — they are likely causing the heat.',
    ],
    prevention:
      'Avoid using your phone in direct sunlight. Close apps you are not using. Do not charge and use heavy apps at the same time.',
    commonCauses: [
      'Using the phone in direct sunlight or hot environments',
      'Running a demanding game or video app for a long time',
      'Charging while using heavy apps',
      'A misbehaving app using the processor excessively',
    ],
    relatedErrors: ['android-battery-draining-fast'],
    searchTerms: [
      'phone overheating Android',
      'phone too hot',
      'Android overheating warning',
      'phone temperature warning',
    ],
  },
  {
    slug: 'android-fingerprint-not-recognized',
    device: 'android',
    errorText: 'Fingerprint Not Recognized',
    plainMeaning:
      'Your phone could not read your fingerprint. You can always use your PIN or pattern to unlock instead.',
    severity: 'low',
    steps: [
      'Wipe your finger and the fingerprint sensor with a clean, dry cloth.',
      'Try using a different finger that you have registered.',
      'Make sure you are placing your finger flat on the sensor.',
      'If it keeps failing, go to Settings > Security > Fingerprint and delete your fingerprints, then add them again.',
      'When re-adding, move your finger slightly between taps to capture different angles.',
      'Restart your phone and try again.',
    ],
    prevention:
      'Register multiple fingers. Keep the sensor and your fingers clean and dry. Register each finger from multiple angles.',
    commonCauses: [
      'Wet or dirty finger',
      'Dirty fingerprint sensor',
      'A scratch or cut on your fingertip',
      'A screen protector covering the sensor (on in-display sensors)',
    ],
    relatedErrors: ['iphone-touch-id-failed', 'iphone-face-id-not-available'],
    searchTerms: [
      'fingerprint not recognized Android',
      'fingerprint not working',
      'cannot unlock with fingerprint',
      'fingerprint sensor error',
    ],
  },
  {
    slug: 'android-gmail-sync-error',
    device: 'android',
    errorText: 'Gmail — Sync Is Currently Experiencing Problems',
    plainMeaning:
      'Gmail cannot check for new emails right now. Your old emails are safe — new ones just are not coming through.',
    severity: 'low',
    steps: [
      'Make sure your internet connection is working.',
      'Open Gmail, tap the menu (three lines) at the top, and tap Settings.',
      'Tap your email account and make sure "Sync Gmail" is turned on.',
      'Go to phone Settings > Accounts > Google > your account and tap "Sync Now".',
      'Clear the Gmail app cache: Settings > Apps > Gmail > Storage > Clear Cache.',
      'Restart your phone.',
    ],
    prevention:
      'Keep your internet connection stable. Make sure Gmail sync is always turned on.',
    commonCauses: [
      'No internet connection',
      'Gmail sync was accidentally turned off',
      'Google servers temporarily having issues',
      'Phone storage is full, preventing sync',
    ],
    relatedErrors: ['android-no-internet-connection', 'app-email-server-not-responding'],
    searchTerms: [
      'Gmail sync error',
      'Gmail not syncing',
      'Gmail not receiving emails',
      'Gmail sync problems Android',
    ],
  },
  {
    slug: 'android-bluetooth-not-pairing',
    device: 'android',
    errorText: 'Couldn\'t Pair with Device',
    plainMeaning:
      'Your Android phone could not connect to a Bluetooth device like headphones, a speaker, or your car.',
    severity: 'low',
    steps: [
      'Make sure the Bluetooth device is in pairing mode (check its manual).',
      'On your phone, go to Settings > Bluetooth.',
      'If the device is listed, tap the settings icon next to it and tap "Forget" or "Unpair".',
      'Restart Bluetooth: turn it off, wait 10 seconds, turn it back on.',
      'Restart both your phone and the Bluetooth device.',
      'Make sure the devices are close together (within 3 feet / 1 metre).',
    ],
    prevention:
      'Keep Bluetooth devices charged. Make sure no other phone is already connected to the device.',
    commonCauses: [
      'The device is not in pairing mode',
      'Another device is already connected to it',
      'The devices are too far apart',
      'A Bluetooth software glitch',
    ],
    relatedErrors: ['iphone-bluetooth-pairing-failed'],
    searchTerms: [
      'Bluetooth not pairing Android',
      'cannot connect Bluetooth Android',
      'Bluetooth pairing failed',
      'headphones won\'t pair',
    ],
  },
  {
    slug: 'android-keyboard-stopped',
    device: 'android',
    errorText: 'Unfortunately, Keyboard Has Stopped',
    plainMeaning:
      'The keyboard app on your phone crashed. You will not be able to type until it is fixed, but a restart usually solves it.',
    severity: 'medium',
    steps: [
      'Tap "OK" on the error message.',
      'Restart your phone — this fixes the problem in most cases.',
      'If it keeps happening, go to Settings > Apps > your keyboard app (like Gboard) > Storage > Clear Cache.',
      'If clearing cache does not help, tap "Clear Data" (your custom dictionary may be reset).',
      'Update the keyboard app from the Play Store.',
      'If nothing works, go to Settings > System > Language & Input and switch to a different keyboard temporarily.',
    ],
    prevention:
      'Keep your keyboard app updated through the Play Store.',
    commonCauses: [
      'A corrupted keyboard cache',
      'A bug in a recent keyboard update',
      'Low phone memory',
    ],
    relatedErrors: ['android-unfortunately-app-stopped'],
    searchTerms: [
      'keyboard has stopped Android',
      'keyboard not working Android',
      'cannot type Android',
      'keyboard crashed',
    ],
  },
  {
    slug: 'android-mobile-data-not-working',
    device: 'android',
    errorText: 'Mobile Data Not Working',
    plainMeaning:
      'Your phone cannot connect to the internet using your mobile data plan. Wi-Fi may still work.',
    severity: 'medium',
    steps: [
      'Swipe down from the top and make sure the mobile data icon is turned on.',
      'Turn Airplane Mode on, wait 10 seconds, then turn it off.',
      'Restart your phone.',
      'Go to Settings > Network & Internet > Mobile Network and make sure "Mobile Data" is on.',
      'Check that you have not exceeded your data limit for the month.',
      'Go to Settings > Network & Internet > Mobile Network > Access Point Names and tap the three-dot menu > "Reset to Default".',
      'Contact your carrier if the problem continues.',
    ],
    prevention:
      'Monitor your data usage monthly. Keep your account active and paid. Keep your APN settings at default.',
    commonCauses: [
      'Mobile data is turned off',
      'Data limit reached',
      'APN settings changed or corrupted',
      'Carrier account issue',
    ],
    relatedErrors: ['android-no-internet-connection', 'wifi-connected-no-internet'],
    searchTerms: [
      'mobile data not working Android',
      'cellular data not working',
      '4G not working',
      'data connection failed',
    ],
  },
  {
    slug: 'android-safe-mode-enabled',
    device: 'android',
    errorText: 'Safe Mode Enabled',
    plainMeaning:
      'Your phone started in Safe Mode, which disables all third-party apps. Only the apps that came with the phone will work.',
    severity: 'low',
    steps: [
      'Don\'t worry — Safe Mode is a diagnostic tool, not a sign of serious damage.',
      'To exit Safe Mode, simply restart your phone: hold the power button and tap "Restart".',
      'If your phone keeps going back to Safe Mode, a recently installed app may be causing problems.',
      'Uninstall any apps you installed just before the problem started.',
      'If you are not sure which app is causing it, uninstall apps one at a time and restart after each.',
    ],
    prevention:
      'Only install apps from the Google Play Store. Be careful with apps that ask for unusual permissions.',
    commonCauses: [
      'The Volume Down button was held during startup',
      'A third-party app is causing your phone to crash',
      'A recent app update introduced a bug',
    ],
    relatedErrors: ['android-unfortunately-app-stopped', 'android-process-not-responding'],
    searchTerms: [
      'safe mode Android',
      'phone in safe mode',
      'how to exit safe mode',
      'Android safe mode stuck',
    ],
  },
]

// ── Windows Errors (20) ─────────────────────────────────────────────────────

const windowsErrors: ErrorEntry[] = [
  {
    slug: 'windows-blue-screen-of-death',
    device: 'windows',
    errorText: 'Your PC Ran Into a Problem and Needs to Restart',
    plainMeaning:
      'Your Windows computer had a serious error and needs to restart. The "blue screen" looks scary but usually fixes itself after restarting.',
    severity: 'high',
    steps: [
      'Wait for your computer to restart automatically — it will collect error information first.',
      'If it restarts normally, the problem may have been a one-time glitch.',
      'If it happens again, write down any error code shown on the blue screen.',
      'Make sure Windows is up to date: Settings > Windows Update > Check for Updates.',
      'If you recently installed new software or a device, try uninstalling it.',
      'Run a system check: type "cmd" in the search bar, right-click "Command Prompt", run as administrator, and type "sfc /scannow".',
      'If it keeps happening, contact a tech-savvy friend or family member for help.',
    ],
    prevention:
      'Keep Windows updated. Do not install software from untrusted websites. Make sure your computer does not overheat.',
    commonCauses: [
      'A driver or software conflict',
      'A hardware problem (like failing memory)',
      'Overheating',
      'A corrupted system file',
      'A recent Windows update that caused a conflict',
    ],
    relatedErrors: ['windows-app-not-responding', 'windows-dll-missing'],
    searchTerms: [
      'blue screen of death',
      'BSOD',
      'PC ran into a problem',
      'blue screen Windows',
      'Windows crash',
    ],
  },
  {
    slug: 'windows-update-error',
    device: 'windows',
    errorText: 'Windows Update Failed — Error Installing Updates',
    plainMeaning:
      'Windows tried to install an update but something went wrong. Your computer is still working fine — the update just did not install.',
    severity: 'medium',
    steps: [
      'Restart your computer and try the update again: Settings > Windows Update > Check for Updates.',
      'Make sure you have at least 10 GB of free space on your hard drive.',
      'Run the Windows Update troubleshooter: Settings > System > Troubleshoot > Other Troubleshooters > Windows Update.',
      'If it still fails, try pausing updates for 7 days, then resuming.',
      'Make sure you are connected to the internet with a stable connection.',
      'If nothing works, try resetting Windows Update: search for "Command Prompt", right-click it, choose "Run as administrator", and type "net stop wuauserv" then "net start wuauserv".',
    ],
    prevention:
      'Keep at least 10 GB of free space. Let your computer stay on while updates are installing. Use a stable internet connection.',
    commonCauses: [
      'Not enough disk space',
      'Internet connection interrupted during download',
      'A conflict with existing software',
      'Corrupted update files',
    ],
    relatedErrors: ['windows-not-enough-disk-space'],
    searchTerms: [
      'Windows Update failed',
      'Windows update error',
      'updates not installing',
      'Windows Update stuck',
    ],
  },
  {
    slug: 'windows-not-enough-disk-space',
    device: 'windows',
    errorText: 'Not Enough Disk Space',
    plainMeaning:
      'Your computer is running out of room to save files and programs. You need to delete some things you no longer need.',
    severity: 'medium',
    steps: [
      'Open File Explorer and check how much space is left on your C: drive.',
      'Use Disk Cleanup: search for "Disk Cleanup" in the Start menu, select your C: drive, and let it scan.',
      'Check the boxes for items you want to delete (Temporary Files, Recycle Bin, etc.) and click "OK".',
      'Empty the Recycle Bin: right-click the Recycle Bin icon on your desktop and click "Empty Recycle Bin".',
      'Uninstall programs you no longer use: Settings > Apps > Installed Apps.',
      'Move large files (like photos and videos) to an external USB drive.',
    ],
    prevention:
      'Regularly empty the Recycle Bin. Use Disk Cleanup once a month. Move photos and videos to an external drive or cloud storage.',
    commonCauses: [
      'Years of accumulated files and programs',
      'Large video or photo collections',
      'Temporary files and Windows update backups',
      'Programs you installed but no longer use',
    ],
    relatedErrors: ['windows-update-error', 'windows-blue-screen-of-death'],
    searchTerms: [
      'not enough disk space',
      'hard drive full',
      'low disk space Windows',
      'C drive full',
    ],
  },
  {
    slug: 'windows-app-not-responding',
    device: 'windows',
    errorText: 'Application Not Responding',
    plainMeaning:
      'A program on your computer has frozen and is not responding to your clicks. The rest of your computer is usually fine.',
    severity: 'low',
    steps: [
      'Wait 30 seconds — the program may recover on its own.',
      'If it does not recover, press Ctrl + Alt + Delete on your keyboard.',
      'Click "Task Manager".',
      'Find the frozen program in the list and click on it.',
      'Click "End Task" at the top.',
      'Re-open the program — any unsaved work in that program may be lost.',
      'If the program keeps freezing, check for an update or reinstall it.',
    ],
    prevention:
      'Save your work frequently (Ctrl + S). Do not open too many programs at once if your computer is slow. Keep your software updated.',
    commonCauses: [
      'The program has a bug',
      'Your computer does not have enough memory (RAM)',
      'Too many programs running at once',
      'A conflict with another program',
    ],
    relatedErrors: ['windows-blue-screen-of-death'],
    searchTerms: [
      'application not responding',
      'program not responding',
      'program frozen',
      'app frozen Windows',
      'Windows program stuck',
    ],
  },
  {
    slug: 'windows-dll-missing',
    device: 'windows',
    errorText: 'DLL File Is Missing',
    plainMeaning:
      'A file that a program needs to run is missing from your computer. Think of it like a missing ingredient in a recipe — the program cannot work without it.',
    severity: 'medium',
    steps: [
      'Write down the exact name of the missing DLL file.',
      'Restart your computer — sometimes this fixes the problem.',
      'Try reinstalling the program that is showing the error.',
      'Run Windows Update: Settings > Windows Update > Check for Updates.',
      'Run a system file check: search for "Command Prompt", right-click, choose "Run as administrator", type "sfc /scannow".',
      'IMPORTANT: Never download DLL files from random websites — this is a common way to get viruses.',
    ],
    prevention:
      'Keep Windows updated. Uninstall programs properly using Settings > Apps rather than just deleting their folder.',
    commonCauses: [
      'A program was not installed correctly',
      'A program was partially uninstalled',
      'A Windows update removed or changed the file',
      'A virus or malware deleted the file',
    ],
    relatedErrors: ['windows-blue-screen-of-death', 'windows-app-not-responding'],
    searchTerms: [
      'DLL file missing',
      'DLL not found',
      'missing DLL Windows',
      'program cannot start DLL',
    ],
  },
  {
    slug: 'windows-internet-connection-lost',
    device: 'windows',
    errorText: 'No Internet — Connected But No Internet Access',
    plainMeaning:
      'Your computer is connected to your Wi-Fi network but cannot actually reach the internet.',
    severity: 'medium',
    steps: [
      'Restart your Wi-Fi router: unplug it, wait 30 seconds, plug it back in, wait 2 minutes.',
      'Click the Wi-Fi icon in the taskbar, disconnect from your network, then reconnect.',
      'Restart your computer.',
      'Run the Network Troubleshooter: right-click the Wi-Fi icon > Troubleshoot Network Problems.',
      'Flush DNS: search for "Command Prompt", right-click, run as administrator, type "ipconfig /flushdns".',
      'If other devices can connect, try forgetting the network and reconnecting with the password.',
    ],
    prevention:
      'Restart your router once a month. Keep your computer\'s network drivers updated.',
    commonCauses: [
      'Router needs restarting',
      'DNS settings issue',
      'Internet provider is having an outage',
      'Network adapter needs updating',
    ],
    relatedErrors: ['wifi-connected-no-internet', 'wifi-dns-not-responding'],
    searchTerms: [
      'no internet Windows',
      'connected no internet',
      'WiFi connected but no internet PC',
      'computer no internet',
    ],
  },
  {
    slug: 'windows-printer-not-found',
    device: 'windows',
    errorText: 'Printer Not Found',
    plainMeaning:
      'Your computer cannot find or connect to your printer. The printer might be off, disconnected, or not set up correctly.',
    severity: 'low',
    steps: [
      'Make sure the printer is turned on and has paper.',
      'Check that the printer is connected — either by USB cable or to the same Wi-Fi network as your computer.',
      'Go to Settings > Bluetooth & Devices > Printers & Scanners.',
      'Click "Add Device" and wait for Windows to find your printer.',
      'If the printer does not appear, restart both the printer and your computer.',
      'Try unplugging the printer USB cable and plugging it back in.',
      'If it is a wireless printer, make sure it is on the same Wi-Fi network as your computer.',
    ],
    prevention:
      'Keep your printer drivers updated. Make sure the printer is on the same Wi-Fi network as your computer.',
    commonCauses: [
      'Printer is turned off',
      'USB cable is loose or disconnected',
      'Wireless printer is on a different Wi-Fi network',
      'Printer driver is not installed or outdated',
    ],
    relatedErrors: [],
    searchTerms: [
      'printer not found',
      'cannot find printer',
      'printer not working Windows',
      'add printer Windows',
    ],
  },
  {
    slug: 'windows-usb-device-not-recognized',
    device: 'windows',
    errorText: 'USB Device Not Recognized',
    plainMeaning:
      'Something you plugged into a USB port on your computer is not being detected. The computer does not know what the device is.',
    severity: 'low',
    steps: [
      'Unplug the USB device and plug it into a different USB port on your computer.',
      'Try a different USB cable if you are using one.',
      'Restart your computer with the device unplugged, then plug it in after the computer starts up.',
      'Try the device on another computer to see if it works there.',
      'Go to Device Manager (search for it in the Start menu), find the device with a yellow triangle, right-click, and choose "Update Driver".',
      'If it is a USB flash drive, try a different one — the drive itself may be damaged.',
    ],
    prevention:
      'Always use the "Safely Remove Hardware" option before unplugging USB drives. Use quality USB cables. Avoid bending USB plugs.',
    commonCauses: [
      'A faulty USB port',
      'A damaged USB cable',
      'The device needs a driver that is not installed',
      'The USB device itself is malfunctioning',
    ],
    relatedErrors: ['windows-printer-not-found'],
    searchTerms: [
      'USB device not recognized',
      'USB not working',
      'USB not detected Windows',
      'USB device error',
    ],
  },
  {
    slug: 'windows-access-denied',
    device: 'windows',
    errorText: 'Access Denied — You Don\'t Have Permission',
    plainMeaning:
      'Windows is blocking you from opening a file, folder, or program. This is a security feature — your account may not have the right permissions.',
    severity: 'low',
    steps: [
      'If you are trying to install a program, right-click the file and choose "Run as Administrator".',
      'Make sure you are logged in to an administrator account on the computer.',
      'If it is a file or folder, right-click it > Properties > Security tab > Edit, and give your user Full Control.',
      'If the file is on a USB drive, check that the drive is not write-protected.',
      'Try restarting your computer and attempting the action again.',
    ],
    prevention:
      'Use an administrator account for your daily use. Be careful about changing permissions on system folders.',
    commonCauses: [
      'You are not logged in as an administrator',
      'The file or folder is protected by the system',
      'Another program is currently using the file',
      'The file is on a read-only or write-protected drive',
    ],
    relatedErrors: [],
    searchTerms: [
      'access denied Windows',
      'don\'t have permission',
      'cannot access folder',
      'permission denied Windows',
    ],
  },
  {
    slug: 'windows-antivirus-threat-detected',
    device: 'windows',
    errorText: 'Windows Security — Threats Found',
    plainMeaning:
      'Windows detected a potentially harmful file or program on your computer. This is your computer protecting you — it has already quarantined the threat.',
    severity: 'high',
    steps: [
      'Click on the notification to open Windows Security.',
      'Review the threat — Windows will tell you what was found and where.',
      'Click "Remove" or "Quarantine" to let Windows handle it.',
      'Run a full scan: Windows Security > Virus & Threat Protection > Scan Options > Full Scan.',
      'Do not open the file that was flagged.',
      'If the threat came from a download, delete the downloaded file.',
      'Change your passwords if you think you may have entered them on a suspicious website.',
    ],
    prevention:
      'Keep Windows Security turned on at all times. Do not download files from unknown websites. Do not open email attachments from people you do not know.',
    commonCauses: [
      'Downloading a file from an untrusted website',
      'Opening a suspicious email attachment',
      'Visiting a compromised website',
      'A program bundled with unwanted software',
    ],
    relatedErrors: [],
    searchTerms: [
      'Windows virus detected',
      'threats found Windows',
      'Windows Security alert',
      'malware detected',
    ],
  },
  {
    slug: 'windows-wifi-no-networks-found',
    device: 'windows',
    errorText: 'No Wi-Fi Networks Found',
    plainMeaning:
      'Your computer cannot see any Wi-Fi networks to connect to. The Wi-Fi adapter might be turned off or having a problem.',
    severity: 'medium',
    steps: [
      'Check if Wi-Fi is turned on: click the network icon in the taskbar and make sure Wi-Fi is enabled.',
      'Some laptops have a physical Wi-Fi switch or a function key (like Fn + F2) to toggle Wi-Fi — check yours.',
      'Turn off Airplane Mode if it is on.',
      'Restart your computer.',
      'Run the Network Troubleshooter: Settings > System > Troubleshoot > Other Troubleshooters > Network Adapter.',
      'Update your Wi-Fi driver: Device Manager > Network Adapters > right-click your Wi-Fi adapter > Update Driver.',
    ],
    prevention:
      'Keep your network drivers updated. Make sure Airplane Mode is off.',
    commonCauses: [
      'Wi-Fi is turned off on the computer',
      'Airplane Mode is enabled',
      'Wi-Fi adapter driver needs updating',
      'Hardware Wi-Fi switch is off',
    ],
    relatedErrors: ['wifi-connected-no-internet', 'windows-internet-connection-lost'],
    searchTerms: [
      'no WiFi networks found Windows',
      'WiFi not showing networks',
      'laptop cannot find WiFi',
      'WiFi adapter not working',
    ],
  },
  {
    slug: 'windows-out-of-memory',
    device: 'windows',
    errorText: 'Your Computer Is Low on Memory',
    plainMeaning:
      'Your computer is running out of working memory (RAM). Too many programs are open at once and the computer is struggling to keep up.',
    severity: 'medium',
    steps: [
      'Close programs you are not using — click the X button on each window.',
      'Close browser tabs you do not need — each tab uses memory.',
      'Press Ctrl + Shift + Esc to open Task Manager.',
      'Click the "Memory" column to sort by memory usage.',
      'Select programs using a lot of memory that you do not need and click "End Task".',
      'Restart your computer to clear out all memory.',
      'If this happens often, you may need more RAM — ask a tech-savvy friend or computer shop about an upgrade.',
    ],
    prevention:
      'Close programs when you are done with them. Do not open too many browser tabs at once. Restart your computer at least once a week.',
    commonCauses: [
      'Too many programs running at the same time',
      'Too many browser tabs open',
      'A program that has a memory leak (keeps using more memory over time)',
      'Not enough RAM for the tasks you are doing',
    ],
    relatedErrors: ['windows-app-not-responding'],
    searchTerms: [
      'low on memory Windows',
      'out of memory',
      'computer running slow',
      'not enough memory Windows',
    ],
  },
  {
    slug: 'windows-startup-slow',
    device: 'windows',
    errorText: 'Windows Takes a Long Time to Start Up',
    plainMeaning:
      'Your computer is taking much longer than normal to start up and be ready to use. Too many programs are trying to start at once.',
    severity: 'low',
    steps: [
      'Press Ctrl + Shift + Esc to open Task Manager.',
      'Click the "Startup" tab.',
      'Look at the programs in the list — disable any you do not need at startup by right-clicking and choosing "Disable".',
      'Keep essentials like antivirus enabled, but disable things like Spotify, Skype, or Adobe.',
      'Restart your computer to see if it starts faster.',
      'Also make sure your hard drive has at least 10 GB of free space.',
    ],
    prevention:
      'When installing new programs, uncheck any option that says "Run at startup" or "Start when computer starts".',
    commonCauses: [
      'Too many programs set to run at startup',
      'An almost-full hard drive',
      'An aging hard drive (consider upgrading to an SSD)',
      'Too many browser extensions loading on startup',
    ],
    relatedErrors: ['windows-not-enough-disk-space', 'windows-out-of-memory'],
    searchTerms: [
      'Windows slow startup',
      'computer takes long to start',
      'PC slow to boot',
      'Windows starting slow',
    ],
  },
  {
    slug: 'windows-sound-not-working',
    device: 'windows',
    errorText: 'No Audio Output Device Installed',
    plainMeaning:
      'Your computer cannot play sound because it cannot find speakers or headphones. The audio driver or connection may have a problem.',
    severity: 'low',
    steps: [
      'Check that your speakers or headphones are plugged in properly.',
      'Make sure the volume is not muted: click the speaker icon in the taskbar.',
      'Right-click the speaker icon > Sounds > Playback — make sure the correct device is set as default.',
      'Run the Audio Troubleshooter: Settings > System > Troubleshoot > Other Troubleshooters > Playing Audio.',
      'Update audio driver: Device Manager > Sound, Video, and Game Controllers > right-click your audio device > Update Driver.',
      'Restart your computer.',
    ],
    prevention:
      'Keep audio drivers updated. Handle headphone jacks gently to avoid damage.',
    commonCauses: [
      'Speakers or headphones not plugged in',
      'Volume is muted',
      'Audio driver needs updating',
      'Wrong audio output device selected',
    ],
    relatedErrors: [],
    searchTerms: [
      'no sound Windows',
      'audio not working',
      'no audio output device',
      'speakers not working Windows',
    ],
  },
  {
    slug: 'windows-screen-flickering',
    device: 'windows',
    errorText: 'Screen Flickering or Flashing',
    plainMeaning:
      'Your computer screen is flickering or flashing. This is usually caused by an incompatible app or display driver.',
    severity: 'medium',
    steps: [
      'Press Ctrl + Shift + Esc to open Task Manager — if Task Manager flickers too, it is likely a driver issue. If not, it is likely an app.',
      'If it is a driver issue: Device Manager > Display Adapters > right-click > Update Driver.',
      'If it is an app: think about what apps you recently installed and uninstall them.',
      'Common culprits are Norton antivirus, iCloud, and IDT Audio.',
      'Try changing your display refresh rate: Settings > System > Display > Advanced Display > choose a different refresh rate.',
      'Restart your computer in Safe Mode to see if the flickering stops.',
    ],
    prevention:
      'Keep your display drivers updated. Be cautious about installing programs that modify screen behavior.',
    commonCauses: [
      'An incompatible display driver',
      'A problematic app like Norton, iCloud, or certain antivirus programs',
      'A loose monitor cable (on desktop computers)',
    ],
    relatedErrors: ['windows-blue-screen-of-death'],
    searchTerms: [
      'screen flickering Windows',
      'screen flashing',
      'display flickering',
      'monitor flickering Windows',
    ],
  },
  {
    slug: 'windows-recovery-mode',
    device: 'windows',
    errorText: 'Your PC Did Not Start Correctly',
    plainMeaning:
      'Windows could not start up normally and has entered recovery mode. Your files are most likely still safe.',
    severity: 'high',
    steps: [
      'Click "Restart" first — sometimes this fixes it and Windows will start normally.',
      'If it comes back to recovery mode, click "Troubleshoot".',
      'Try "Startup Repair" — this lets Windows try to fix itself.',
      'If that does not work, try "System Restore" to go back to a time when your computer was working.',
      'If all else fails, you may need help from a tech-savvy friend or computer repair service.',
      'Do not choose "Reset This PC" unless you have a backup of your files.',
    ],
    prevention:
      'Keep Windows updated. Run Disk Cleanup regularly. Create a system restore point before installing major software.',
    commonCauses: [
      'A failed Windows update',
      'A driver conflict',
      'A sudden power loss while Windows was running',
      'Corrupted system files',
    ],
    relatedErrors: ['windows-blue-screen-of-death'],
    searchTerms: [
      'PC did not start correctly',
      'Windows recovery mode',
      'Windows won\'t start',
      'computer won\'t boot',
    ],
  },
  {
    slug: 'windows-file-explorer-not-responding',
    device: 'windows',
    errorText: 'File Explorer Not Responding',
    plainMeaning:
      'The program you use to browse your files and folders has frozen. Your files are safe — the program just needs to be restarted.',
    severity: 'low',
    steps: [
      'Press Ctrl + Shift + Esc to open Task Manager.',
      'Find "Windows Explorer" in the list.',
      'Click on it and then click "Restart" at the top.',
      'Your desktop will briefly disappear and come back — this is normal.',
      'If it keeps happening, clear File Explorer history: open File Explorer > three dots menu > Options > Clear.',
      'Restart your computer if the problem persists.',
    ],
    prevention:
      'Avoid opening too many File Explorer windows at once. Keep your hard drive from getting too full.',
    commonCauses: [
      'Too many files in a folder',
      'A corrupted thumbnail cache',
      'A problematic shell extension from a third-party program',
      'Low disk space',
    ],
    relatedErrors: ['windows-app-not-responding'],
    searchTerms: [
      'File Explorer not responding',
      'file explorer frozen',
      'Windows Explorer crash',
      'cannot open files Windows',
    ],
  },
  {
    slug: 'windows-microphone-not-working',
    device: 'windows',
    errorText: 'Microphone Not Detected',
    plainMeaning:
      'Your computer cannot find or use your microphone. You will not be able to make voice or video calls until this is fixed.',
    severity: 'medium',
    steps: [
      'Check that your microphone is plugged in (if external) or that the built-in microphone is not blocked.',
      'Go to Settings > Privacy & Security > Microphone and make sure "Microphone Access" is turned on.',
      'Make sure the apps you want to use have microphone permission turned on.',
      'Right-click the speaker icon > Sound Settings > Input — make sure the correct microphone is selected.',
      'Click "Test" or speak to see if the microphone is picking up sound.',
      'If using a headset, make sure it is plugged into the correct port (pink port for mic, green for speakers).',
    ],
    prevention:
      'Keep microphone permissions enabled for apps you use for calls. Test your microphone before important calls.',
    commonCauses: [
      'Microphone permission is turned off',
      'Wrong microphone selected as the input device',
      'Microphone not plugged in properly',
      'Driver needs updating',
    ],
    relatedErrors: ['windows-sound-not-working'],
    searchTerms: [
      'microphone not working Windows',
      'mic not detected',
      'microphone not found',
      'can\'t hear me on Zoom',
    ],
  },
  {
    slug: 'windows-taskbar-not-working',
    device: 'windows',
    errorText: 'Taskbar Not Responding',
    plainMeaning:
      'The bar at the bottom of your screen that shows your open programs and the clock has frozen. You can usually fix this with a restart.',
    severity: 'medium',
    steps: [
      'Press Ctrl + Shift + Esc to open Task Manager.',
      'Find "Windows Explorer" in the list.',
      'Click on it and click "Restart".',
      'If you cannot open Task Manager, press Ctrl + Alt + Delete and choose "Task Manager" from there.',
      'If restarting Windows Explorer does not fix it, restart your computer.',
      'If the problem keeps happening, run "sfc /scannow" in Command Prompt (as administrator).',
    ],
    prevention:
      'Keep Windows updated. Avoid installing third-party taskbar modification tools.',
    commonCauses: [
      'A Windows Explorer glitch',
      'A corrupted system file',
      'A problematic Windows update',
      'Third-party software interfering with the taskbar',
    ],
    relatedErrors: ['windows-file-explorer-not-responding', 'windows-app-not-responding'],
    searchTerms: [
      'taskbar not working Windows',
      'taskbar frozen',
      'Start menu not working',
      'taskbar not responding',
    ],
  },
  {
    slug: 'windows-webcam-not-working',
    device: 'windows',
    errorText: 'We Can\'t Find Your Camera',
    plainMeaning:
      'Your computer cannot detect or use your camera. This may be a privacy setting or a driver issue.',
    severity: 'medium',
    steps: [
      'Check for a physical camera cover or privacy shutter on your laptop — slide it open.',
      'Go to Settings > Privacy & Security > Camera and make sure "Camera Access" is turned on.',
      'Make sure the app you want to use (like Zoom) has camera permission.',
      'If using an external webcam, unplug it and plug it back in.',
      'Open Device Manager > Cameras > right-click your camera > "Enable Device" (if disabled) or "Update Driver".',
      'Restart your computer.',
    ],
    prevention:
      'Keep camera permissions enabled for apps you trust. Make sure physical camera covers are open before video calls.',
    commonCauses: [
      'Camera privacy setting is turned off',
      'Physical camera cover is closed',
      'Camera driver needs updating',
      'Another app is already using the camera',
    ],
    relatedErrors: ['windows-microphone-not-working'],
    searchTerms: [
      'camera not working Windows',
      'webcam not found',
      'laptop camera not working',
      'can\'t find camera Windows',
    ],
  },
]

// ── Browser Errors (20) ─────────────────────────────────────────────────────

const browserErrors: ErrorEntry[] = [
  {
    slug: 'browser-connection-not-private',
    device: 'browser',
    errorText: 'Your Connection Is Not Private',
    plainMeaning:
      'Your browser is warning you that the website you are trying to visit may not be secure. This is your browser protecting you from potential data theft.',
    severity: 'high',
    steps: [
      'Do NOT enter any personal information, passwords, or credit card numbers on this page.',
      'Check the website address carefully — make sure it is spelled correctly.',
      'Try visiting the site later — the problem may be temporary on their end.',
      'If you trust this website completely (like your bank), try a different browser.',
      'Check your computer\'s date and time — if they are wrong, you will see this error. Fix them in Settings.',
      'Clear your browser\'s cache: browser settings > Privacy > Clear Browsing Data.',
      'If it is a well-known website and you see this repeatedly, it could be a problem with your internet provider.',
    ],
    prevention:
      'Keep your browser updated. Look for the padlock icon in the address bar before entering sensitive information. Always check that website addresses start with "https://".',
    commonCauses: [
      'The website\'s security certificate has expired',
      'Your computer\'s date and time are incorrect',
      'You are on a public Wi-Fi that is intercepting the connection',
      'The website has a misconfigured security certificate',
    ],
    relatedErrors: ['browser-certificate-error', 'browser-site-cant-be-reached'],
    searchTerms: [
      'your connection is not private',
      'NET::ERR_CERT',
      'website not secure',
      'privacy error Chrome',
      'this connection is not private',
    ],
  },
  {
    slug: 'browser-err-connection-refused',
    device: 'browser',
    errorText: 'ERR_CONNECTION_REFUSED',
    plainMeaning:
      'The website you are trying to visit refused your connection. The website\'s server is either down or not accepting visitors right now.',
    severity: 'low',
    steps: [
      'Wait a few minutes and try again — the website may be temporarily down.',
      'Check if the website is down for everyone by searching "is [website] down" on Google.',
      'Try a different browser (like Edge, Chrome, or Firefox).',
      'Clear your browser cache: browser settings > Privacy > Clear Browsing Data.',
      'Check if a firewall or antivirus is blocking the website.',
      'If it is a website you manage, the web server may need to be restarted.',
    ],
    prevention:
      'Keep your browser updated. If a website is frequently down, it may have reliability issues.',
    commonCauses: [
      'The website\'s server is down for maintenance',
      'The website is overloaded with visitors',
      'A firewall or antivirus is blocking the site',
      'The website has been taken offline',
    ],
    relatedErrors: ['browser-site-cant-be-reached', 'browser-dns-nxdomain'],
    searchTerms: [
      'ERR_CONNECTION_REFUSED',
      'connection refused',
      'website not loading',
      'site refused to connect',
    ],
  },
  {
    slug: 'browser-404-not-found',
    device: 'browser',
    errorText: '404 Not Found',
    plainMeaning:
      'The specific page you are looking for does not exist on this website. It may have been moved, renamed, or deleted.',
    severity: 'low',
    steps: [
      'Check the website address (URL) for typos — even one wrong letter can cause this.',
      'Try going to the website\'s home page and navigating from there.',
      'Use the website\'s search feature to find what you are looking for.',
      'If you clicked a link from an email or another website, that link may be outdated.',
      'Try searching on Google for the page title — you may find the new location.',
      'If the page existed before, try the Wayback Machine at web.archive.org.',
    ],
    prevention:
      'Bookmark important pages so you always have the correct address. Be careful when typing website addresses manually.',
    commonCauses: [
      'The page was moved or renamed',
      'A typo in the website address',
      'The page was deleted',
      'An old link that has not been updated',
    ],
    relatedErrors: ['browser-site-cant-be-reached'],
    searchTerms: [
      '404 error',
      'page not found',
      '404 not found',
      'website page missing',
    ],
  },
  {
    slug: 'browser-site-cant-be-reached',
    device: 'browser',
    errorText: 'This Site Can\'t Be Reached',
    plainMeaning:
      'Your browser cannot connect to the website at all. This could be an internet problem on your end or the website might be down.',
    severity: 'medium',
    steps: [
      'Check your internet connection — can you reach other websites like google.com?',
      'If other sites work, the problem is with that specific website — try again later.',
      'If no sites work, restart your Wi-Fi router (unplug, wait 30 seconds, plug back in).',
      'Try a different browser.',
      'Clear your browser cache and cookies.',
      'If on a work or school network, the site may be blocked by your network administrator.',
    ],
    prevention:
      'Keep your browser updated. If you have trouble with many websites, contact your internet provider.',
    commonCauses: [
      'The website is down or not working',
      'Your internet connection is not working',
      'The website address is wrong',
      'Your internet provider is blocking the site',
    ],
    relatedErrors: ['browser-err-connection-refused', 'browser-dns-nxdomain'],
    searchTerms: [
      'site can\'t be reached',
      'this site can\'t be reached',
      'website not loading',
      'ERR_CONNECTION_TIMED_OUT',
    ],
  },
  {
    slug: 'browser-too-many-redirects',
    device: 'browser',
    errorText: 'Too Many Redirects — This Page Isn\'t Working',
    plainMeaning:
      'The website keeps sending your browser in circles, like being sent back and forth between two doors. The website needs to fix this on their end.',
    severity: 'low',
    steps: [
      'Clear your browser cookies for this website: browser settings > Privacy > Clear Browsing Data > Cookies.',
      'Try opening the website in a private/incognito window.',
      'Try a different browser.',
      'If the problem is only on one website, it is likely their issue — try again later.',
      'Disable any browser extensions temporarily.',
      'Check if the website address should use "www" or not — try both versions.',
    ],
    prevention:
      'Clear your browser cookies periodically. Keep your browser updated.',
    commonCauses: [
      'Corrupted cookies for that website',
      'A misconfigured website redirect',
      'A browser extension interfering with the page',
      'Conflicting redirect rules on the website',
    ],
    relatedErrors: ['browser-site-cant-be-reached'],
    searchTerms: [
      'too many redirects',
      'ERR_TOO_MANY_REDIRECTS',
      'this page isn\'t working',
      'page redirected too many times',
    ],
  },
  {
    slug: 'browser-dns-nxdomain',
    device: 'browser',
    errorText: 'DNS_PROBE_FINISHED_NXDOMAIN',
    plainMeaning:
      'Your browser cannot find the website because the domain name does not exist or cannot be looked up. Think of it like looking up a phone number that is not in the directory.',
    severity: 'medium',
    steps: [
      'Check the website address very carefully for typos.',
      'Try typing the address again from scratch.',
      'Clear your browser cache and restart the browser.',
      'Restart your router (unplug, wait 30 seconds, plug back in).',
      'Try using a different DNS: go to your network settings and change DNS to 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare).',
      'If the website existed before, it may have been shut down or its domain expired.',
    ],
    prevention:
      'Double-check website addresses before hitting Enter. Bookmark websites you visit regularly.',
    commonCauses: [
      'A typo in the website address',
      'The website no longer exists',
      'Your DNS server is not working correctly',
      'The website\'s domain name expired',
    ],
    relatedErrors: ['browser-site-cant-be-reached', 'wifi-dns-not-responding'],
    searchTerms: [
      'DNS_PROBE_FINISHED_NXDOMAIN',
      'DNS error',
      'website doesn\'t exist',
      'DNS probe finished',
    ],
  },
  {
    slug: 'browser-certificate-error',
    device: 'browser',
    errorText: 'Certificate Error — Navigation Blocked',
    plainMeaning:
      'The website\'s security certificate has a problem. Your browser is blocking it to protect you from a potentially unsafe connection.',
    severity: 'high',
    steps: [
      'Do not enter any personal information on this website.',
      'Check your computer\'s date and time — incorrect settings cause this error.',
      'If you trust the website completely, some browsers let you click "Advanced" then "Proceed" — but only do this for websites you know well.',
      'Try a different browser to see if the error persists.',
      'Clear your browser cache and cookies.',
      'If this is your bank or another important site, contact them directly by phone.',
    ],
    prevention:
      'Keep your computer\'s date and time accurate. Keep your browser updated for the latest security certificates.',
    commonCauses: [
      'The website\'s security certificate expired',
      'Your computer\'s clock is set to the wrong date or time',
      'A man-in-the-middle attack (rare, but possible on public Wi-Fi)',
      'The website is using a self-signed certificate',
    ],
    relatedErrors: ['browser-connection-not-private'],
    searchTerms: [
      'certificate error',
      'security certificate',
      'certificate warning browser',
      'SSL certificate error',
    ],
  },
  {
    slug: 'browser-mixed-content',
    device: 'browser',
    errorText: 'Mixed Content Warning',
    plainMeaning:
      'The website is trying to load some elements (like images) over an insecure connection. This is not your fault — it is a website issue.',
    severity: 'low',
    steps: [
      'You can usually continue using the website safely.',
      'If the page is not displaying correctly, try refreshing it.',
      'Try a different browser.',
      'If you see a shield icon in the address bar, you can click it to allow mixed content (but only for trusted sites).',
      'Contact the website owner if you know them — they need to fix this on their end.',
    ],
    prevention:
      'Keep your browser updated. This is primarily a website issue, not something you can prevent.',
    commonCauses: [
      'The website loads some content over HTTP instead of HTTPS',
      'An older website that has not been fully updated to HTTPS',
      'A website using old image links',
    ],
    relatedErrors: ['browser-connection-not-private', 'browser-certificate-error'],
    searchTerms: [
      'mixed content warning',
      'mixed content blocked',
      'insecure content',
      'not fully secure',
    ],
  },
  {
    slug: 'browser-popup-blocked',
    device: 'browser',
    errorText: 'Pop-up Blocked',
    plainMeaning:
      'Your browser stopped a new window from opening. Most pop-ups are ads, but sometimes they are needed for things like signing in or downloading files.',
    severity: 'low',
    steps: [
      'Look for a pop-up notification at the top or bottom of your browser window.',
      'If you trust the website, click the notification and choose to allow pop-ups for that site.',
      'In Chrome: click the three dots > Settings > Privacy and Security > Site Settings > Pop-ups and Redirects.',
      'Add the website to the "Allowed" list if you need its pop-ups.',
      'After allowing, try the action again (like clicking the button that triggered the pop-up).',
    ],
    prevention:
      'Keep the pop-up blocker on by default — it protects you from unwanted ads. Only allow pop-ups for websites you trust.',
    commonCauses: [
      'The browser\'s built-in pop-up blocker doing its job',
      'A website needs a pop-up for login or downloads',
      'An ad-blocking extension being overly aggressive',
    ],
    relatedErrors: [],
    searchTerms: [
      'pop-up blocked',
      'popup blocked Chrome',
      'allow popups',
      'website popup not showing',
    ],
  },
  {
    slug: 'browser-cookies-required',
    device: 'browser',
    errorText: 'Cookies Required — Please Enable Cookies',
    plainMeaning:
      'The website needs your browser to accept "cookies" (small data files) to work properly. Cookies help websites remember you.',
    severity: 'low',
    steps: [
      'In Chrome: click the three dots > Settings > Privacy and Security > Cookies and Other Site Data.',
      'Make sure "Block All Cookies" is NOT selected.',
      'Choose "Block Third-Party Cookies" for a good balance of privacy and functionality.',
      'In Safari: go to Preferences > Privacy and uncheck "Block All Cookies".',
      'After changing the setting, refresh the website page.',
      'Try clearing your browser cookies if the problem continues.',
    ],
    prevention:
      'Use the "Block Third-Party Cookies" setting instead of blocking all cookies. This keeps most websites working while still protecting your privacy.',
    commonCauses: [
      'Cookies are completely blocked in your browser settings',
      'A privacy extension is blocking cookies',
      'Browser privacy settings are set too strictly',
    ],
    relatedErrors: ['browser-popup-blocked'],
    searchTerms: [
      'enable cookies',
      'cookies required',
      'cookies disabled browser',
      'turn on cookies',
    ],
  },
  {
    slug: 'browser-out-of-memory',
    device: 'browser',
    errorText: 'Aw, Snap! — Out of Memory',
    plainMeaning:
      'Your browser ran out of memory and the page crashed. This usually happens when you have too many tabs open.',
    severity: 'low',
    steps: [
      'Close tabs you are not using — each open tab uses memory.',
      'Refresh the page that crashed.',
      'Close and reopen your browser.',
      'Disable browser extensions you do not use: browser settings > Extensions.',
      'If this happens often, consider using a lighter browser or adding more RAM to your computer.',
      'Clear your browser cache: Settings > Privacy > Clear Browsing Data.',
    ],
    prevention:
      'Limit the number of open tabs to 10-15 at most. Close tabs you are done with instead of leaving them open.',
    commonCauses: [
      'Too many browser tabs open',
      'A web page using excessive memory',
      'Too many browser extensions running',
      'Not enough RAM on your computer',
    ],
    relatedErrors: ['windows-out-of-memory'],
    searchTerms: [
      'aw snap Chrome',
      'browser out of memory',
      'page crashed',
      'browser ran out of memory',
    ],
  },
  {
    slug: 'browser-flash-not-supported',
    device: 'browser',
    errorText: 'Adobe Flash Is No Longer Supported',
    plainMeaning:
      'The website is trying to use a technology called Flash that no longer works in modern browsers. The website needs to be updated.',
    severity: 'low',
    steps: [
      'Unfortunately, there is no way to use Flash content in modern browsers — it was retired in 2020.',
      'Look for an alternative version of the website that does not require Flash.',
      'If it is an old game or video, search for an HTML5 version of it.',
      'Contact the website owner and let them know their site needs updating.',
      'Some archived Flash content is available at flashpoint.archive.org.',
    ],
    prevention:
      'There is nothing you need to do — Flash was retired for security reasons. Modern websites use different technology.',
    commonCauses: [
      'An old website that was never updated beyond Flash',
      'Trying to play an old Flash game or animation',
    ],
    relatedErrors: [],
    searchTerms: [
      'Flash not supported',
      'Adobe Flash player',
      'Flash player needed',
      'Flash end of life',
    ],
  },
  {
    slug: 'browser-auto-download-blocked',
    device: 'browser',
    errorText: 'This File Was Blocked — Download May Be Dangerous',
    plainMeaning:
      'Your browser thinks the file you are trying to download might be harmful. It is protecting you from potentially dangerous files.',
    severity: 'medium',
    steps: [
      'Do NOT download the file if you are not sure where it came from.',
      'If you are sure the file is safe (for example, from a known software company), look for an option to "Keep" or "Download Anyway".',
      'Scan any downloaded file with your antivirus before opening it.',
      'Be especially careful with .exe, .bat, or .zip files from unknown sources.',
      'If the file is from a trusted source, try downloading it directly from their official website instead.',
    ],
    prevention:
      'Only download files from websites you trust. Keep your browser and antivirus up to date. Be suspicious of unexpected download prompts.',
    commonCauses: [
      'The file type is commonly used by malware (.exe, .bat)',
      'The download source is not considered trustworthy by the browser',
      'The file does not have a valid digital signature',
    ],
    relatedErrors: ['windows-antivirus-threat-detected'],
    searchTerms: [
      'download blocked Chrome',
      'file blocked download',
      'dangerous download warning',
      'Chrome blocking download',
    ],
  },
  {
    slug: 'browser-javascript-error',
    device: 'browser',
    errorText: 'A Script on This Page Is Not Responding',
    plainMeaning:
      'Part of the website\'s code is not working properly. The page may still work, but some features might not function.',
    severity: 'low',
    steps: [
      'Click "Wait" to give the page more time to load.',
      'If the page is frozen, click "Stop Script" or close the tab.',
      'Refresh the page.',
      'Try disabling browser extensions — they can interfere with website scripts.',
      'Clear your browser cache and try again.',
      'Try a different browser.',
    ],
    prevention:
      'Keep your browser updated. Disable extensions you do not use.',
    commonCauses: [
      'A bug on the website',
      'A browser extension interfering with the page',
      'An outdated browser',
      'A slow internet connection causing timeouts',
    ],
    relatedErrors: ['browser-out-of-memory'],
    searchTerms: [
      'script not responding',
      'JavaScript error',
      'page script error',
      'website not working properly',
    ],
  },
  {
    slug: 'browser-form-resubmission',
    device: 'browser',
    errorText: 'Confirm Form Resubmission',
    plainMeaning:
      'You are trying to refresh a page where you previously submitted information (like a form). Refreshing might send that information again.',
    severity: 'low',
    steps: [
      'If you do not want to send the information again, click "Cancel" or "Don\'t Resend".',
      'If you do want to send it again (for example, a failed submission), click "Continue" or "Resend".',
      'To avoid this in the future, navigate to the page using the address bar instead of refreshing.',
      'If you already submitted a purchase or payment, check your account before resending to avoid duplicate charges.',
    ],
    prevention:
      'After submitting a form (especially payments), navigate away from the page instead of refreshing it.',
    commonCauses: [
      'Pressing F5 or clicking Refresh after submitting a form',
      'The website did not redirect you properly after the form was submitted',
    ],
    relatedErrors: [],
    searchTerms: [
      'confirm form resubmission',
      'form resubmission warning',
      'resend form data',
      'duplicate submission',
    ],
  },
  {
    slug: 'browser-storage-full',
    device: 'browser',
    errorText: 'Storage Quota Exceeded',
    plainMeaning:
      'Your browser has used up its allotted space for storing website data. Clearing your browsing data will fix this.',
    severity: 'low',
    steps: [
      'Go to your browser settings > Privacy > Clear Browsing Data.',
      'Select "Cached Images and Files" and "Cookies and Other Site Data".',
      'Choose "All Time" as the time range.',
      'Click "Clear Data".',
      'Refresh the website that was showing the error.',
      'Note: You may need to log in again to websites after clearing cookies.',
    ],
    prevention:
      'Clear your browser data periodically — once a month is a good habit.',
    commonCauses: [
      'Accumulated website data over time',
      'A website storing large amounts of data in your browser',
      'Cached files building up',
    ],
    relatedErrors: ['browser-out-of-memory'],
    searchTerms: [
      'storage quota exceeded',
      'browser storage full',
      'clear browser data',
      'website storage error',
    ],
  },
  {
    slug: 'browser-password-exposed',
    device: 'browser',
    errorText: 'This Password Has Appeared in a Data Breach',
    plainMeaning:
      'Your browser has detected that a password you saved has been leaked in a known security breach. Someone else may know this password.',
    severity: 'high',
    steps: [
      'Change the password for this account immediately.',
      'Go to the website\'s settings and look for "Change Password" or "Security".',
      'Create a new, strong password that you have not used before.',
      'If you used this same password on other websites, change it there too.',
      'Consider using a password manager to create and store unique passwords.',
      'Enable two-factor authentication (2FA) on the account if available.',
    ],
    prevention:
      'Use a different password for every website. Use a password manager to help. Enable two-factor authentication wherever possible.',
    commonCauses: [
      'A website you have an account with was hacked',
      'You used the same password on multiple websites',
      'Your password was too simple or common',
    ],
    relatedErrors: [],
    searchTerms: [
      'password data breach',
      'password compromised',
      'password leaked',
      'Chrome password warning',
    ],
  },
  {
    slug: 'browser-camera-mic-blocked',
    device: 'browser',
    errorText: 'Camera/Microphone Access Blocked',
    plainMeaning:
      'The website wants to use your camera or microphone (like for a video call) but your browser is blocking it.',
    severity: 'low',
    steps: [
      'Look for a camera icon in the address bar and click it.',
      'Choose "Allow" for the website if you trust it.',
      'In Chrome: click the three dots > Settings > Privacy and Security > Site Settings > Camera (or Microphone).',
      'Find the website and change the permission from "Block" to "Allow".',
      'Refresh the page after changing permissions.',
      'Make sure your camera and microphone are not being used by another app.',
    ],
    prevention:
      'When a trusted website asks for camera or microphone access, click "Allow". You can always change it back later.',
    commonCauses: [
      'You clicked "Block" when the website first asked for permission',
      'Browser privacy settings are blocking all camera/mic access',
      'A browser extension is blocking the access',
    ],
    relatedErrors: ['windows-webcam-not-working', 'windows-microphone-not-working'],
    searchTerms: [
      'camera blocked browser',
      'microphone blocked Chrome',
      'allow camera website',
      'video call camera not working browser',
    ],
  },
  {
    slug: 'browser-notifications-blocked',
    device: 'browser',
    errorText: 'Notifications Blocked for This Site',
    plainMeaning:
      'You previously blocked this website from sending you notifications. If you want to receive them now, you need to change the setting.',
    severity: 'low',
    steps: [
      'Click the padlock or settings icon in the address bar.',
      'Find "Notifications" and change it from "Block" to "Allow".',
      'Alternatively: browser settings > Privacy > Site Settings > Notifications.',
      'Find the website and change the permission.',
      'Refresh the page.',
      'Be careful about which sites you allow notifications from — some will send you spam.',
    ],
    prevention:
      'Only allow notifications from websites you truly want to hear from, like email or messaging services.',
    commonCauses: [
      'You clicked "Block" when the site asked to send notifications',
      'The browser is set to block all notifications by default',
    ],
    relatedErrors: [],
    searchTerms: [
      'notifications blocked',
      'allow notifications Chrome',
      'website notifications not working',
      'unblock notifications',
    ],
  },
  {
    slug: 'browser-500-internal-server-error',
    device: 'browser',
    errorText: '500 Internal Server Error',
    plainMeaning:
      'The website you are trying to visit has a problem on their end. There is nothing wrong with your computer or connection.',
    severity: 'low',
    steps: [
      'Wait a few minutes and refresh the page — the website may be fixing the problem right now.',
      'Try visiting a different page on the same website.',
      'Clear your browser cache and cookies, then try again.',
      'Check if the website is down for everyone by searching "is [website] down" on Google.',
      'If it is your bank or an important service, try again later or call their customer support.',
    ],
    prevention:
      'This is a server-side error and not something you can prevent. If a website frequently shows this error, it may have reliability issues.',
    commonCauses: [
      'The website\'s server has a bug or configuration error',
      'The website is overloaded with visitors',
      'A software update on the server went wrong',
    ],
    relatedErrors: ['browser-site-cant-be-reached', 'browser-err-connection-refused'],
    searchTerms: [
      '500 error',
      'internal server error',
      '500 internal server error',
      'server error website',
    ],
  },
]

// ── WiFi Errors (15) ────────────────────────────────────────────────────────

const wifiErrors: ErrorEntry[] = [
  {
    slug: 'wifi-connected-no-internet',
    device: 'wifi',
    errorText: 'Connected, No Internet',
    plainMeaning:
      'Your device is connected to the Wi-Fi network but cannot actually reach the internet. The problem is usually with your router or internet provider.',
    severity: 'medium',
    steps: [
      'Restart your Wi-Fi router: unplug it from power, wait 30 seconds, plug it back in, and wait 2 minutes.',
      'Also restart your modem (the box from your internet provider) if it is separate from your router.',
      'On your device, turn Wi-Fi off and back on.',
      'Try "forgetting" the network and reconnecting with the password.',
      'Check if other devices in your home can connect — if not, the problem is the router or your internet provider.',
      'Call your internet provider if restarting the router does not fix it.',
    ],
    prevention:
      'Restart your router once a month for best performance. If you experience frequent outages, contact your internet provider about upgrading your equipment.',
    commonCauses: [
      'The router needs restarting',
      'Your internet provider is having an outage',
      'A DNS settings problem',
      'The router\'s connection to the internet has dropped',
    ],
    relatedErrors: ['wifi-dns-not-responding', 'wifi-limited-connectivity', 'wifi-keeps-disconnecting'],
    searchTerms: [
      'connected no internet',
      'WiFi connected but no internet',
      'WiFi connected no internet access',
      'WiFi exclamation mark',
    ],
  },
  {
    slug: 'wifi-dns-not-responding',
    device: 'wifi',
    errorText: 'DNS Server Not Responding',
    plainMeaning:
      'The system that translates website names (like google.com) into addresses is not working. Think of it like a broken phone book — your phone cannot look up where to go.',
    severity: 'medium',
    steps: [
      'Restart your router (unplug, wait 30 seconds, plug back in).',
      'Restart your device (phone, tablet, or computer).',
      'Try using a different DNS server — this sounds technical but is simple:',
      'On iPhone: Settings > Wi-Fi > tap your network > Configure DNS > Manual > add 8.8.8.8',
      'On Android: Settings > Wi-Fi > long-press your network > Modify > Advanced > change DNS to 8.8.8.8',
      'On Windows: Settings > Network > change adapter options > right-click Wi-Fi > Properties > IPv4 > use 8.8.8.8',
      'This uses Google\'s free DNS which is very reliable.',
    ],
    prevention:
      'Consider permanently setting your DNS to a reliable provider like Google (8.8.8.8) or Cloudflare (1.1.1.1).',
    commonCauses: [
      'Your internet provider\'s DNS server is having problems',
      'Your router has a DNS configuration issue',
      'A temporary internet outage',
    ],
    relatedErrors: ['wifi-connected-no-internet', 'browser-dns-nxdomain'],
    searchTerms: [
      'DNS server not responding',
      'DNS error',
      'DNS not working',
      'server DNS address could not be found',
    ],
  },
  {
    slug: 'wifi-limited-connectivity',
    device: 'wifi',
    errorText: 'Limited Connectivity',
    plainMeaning:
      'Your device has a partial connection to the Wi-Fi network but cannot use the full internet. It is like being half-connected.',
    severity: 'medium',
    steps: [
      'Restart your Wi-Fi router and modem.',
      'Turn Wi-Fi off on your device, wait 10 seconds, turn it back on.',
      'Forget the Wi-Fi network on your device and reconnect with the password.',
      'Move closer to the router — you may be too far away.',
      'Restart your device.',
      'If on Windows, run the Network Troubleshooter: Settings > System > Troubleshoot > Other Troubleshooters > Internet Connections.',
    ],
    prevention:
      'Position your router in a central location in your home. Avoid placing it behind furniture or in a closet.',
    commonCauses: [
      'Weak Wi-Fi signal',
      'Router needs restarting',
      'IP address conflict',
      'Driver issues on your computer',
    ],
    relatedErrors: ['wifi-connected-no-internet', 'wifi-ip-address-conflict'],
    searchTerms: [
      'limited connectivity',
      'limited connection WiFi',
      'limited access WiFi',
      'WiFi limited',
    ],
  },
  {
    slug: 'wifi-ip-address-conflict',
    device: 'wifi',
    errorText: 'IP Address Conflict',
    plainMeaning:
      'Two devices on your network are trying to use the same address, which is like two houses having the same street number. They cannot both work properly.',
    severity: 'medium',
    steps: [
      'Restart your Wi-Fi router — this usually reassigns addresses automatically.',
      'Restart the device showing the error.',
      'On Windows: open Command Prompt and type "ipconfig /release" then "ipconfig /renew".',
      'On iPhone: Settings > Wi-Fi > tap your network > Renew Lease.',
      'On Android: Settings > Wi-Fi > forget the network and reconnect.',
      'If the problem keeps happening, restart all devices on your network one at a time.',
    ],
    prevention:
      'Let your router assign IP addresses automatically (DHCP). If you have set any devices to use a manual/static IP address, make sure no two devices share the same address.',
    commonCauses: [
      'Two devices were assigned the same IP address',
      'A device has a manually set IP address that conflicts',
      'The router\'s DHCP server had a glitch',
    ],
    relatedErrors: ['wifi-connected-no-internet', 'wifi-limited-connectivity'],
    searchTerms: [
      'IP address conflict',
      'IP conflict',
      'duplicate IP address',
      'IP address already in use',
    ],
  },
  {
    slug: 'wifi-keeps-disconnecting',
    device: 'wifi',
    errorText: 'Wi-Fi Keeps Disconnecting',
    plainMeaning:
      'Your device keeps losing its Wi-Fi connection and reconnecting. This unstable connection makes it hard to use the internet reliably.',
    severity: 'medium',
    steps: [
      'Move closer to your Wi-Fi router.',
      'Restart your router (unplug, wait 30 seconds, plug back in).',
      'Forget the Wi-Fi network on your device and reconnect.',
      'Check if other devices also have the problem — if so, the router is the issue.',
      'On your device, check for software updates that might fix Wi-Fi bugs.',
      'If your router is old (more than 5 years), consider getting a newer one.',
      'Avoid placing the router near microwaves, baby monitors, or other electronics that can interfere.',
    ],
    prevention:
      'Place your router in a central, elevated location. Keep it away from walls, metal objects, and other electronics. Consider a mesh Wi-Fi system for larger homes.',
    commonCauses: [
      'Weak Wi-Fi signal from being too far from the router',
      'Interference from other electronics',
      'An outdated or overheating router',
      'Too many devices connected to the same network',
    ],
    relatedErrors: ['wifi-connected-no-internet', 'wifi-limited-connectivity'],
    searchTerms: [
      'WiFi keeps disconnecting',
      'WiFi dropping',
      'WiFi cutting out',
      'internet keeps dropping',
    ],
  },
  {
    slug: 'wifi-network-security-key-error',
    device: 'wifi',
    errorText: 'The Network Security Key Isn\'t Correct',
    plainMeaning:
      'The Wi-Fi password you entered is wrong. The "network security key" is just a technical term for your Wi-Fi password.',
    severity: 'low',
    steps: [
      'Check the Wi-Fi password carefully — it is case-sensitive (capital and lowercase letters matter).',
      'Look at the sticker on the bottom or back of your router for the default password.',
      'If you or someone else changed the password, try to remember or find where it was written down.',
      'On your device, tap "Show Password" if that option is available, to make sure you are typing it correctly.',
      'If you cannot remember the password, you can reset your router to factory settings (this will use the default password on the sticker).',
      'To reset the router, press and hold the tiny Reset button on the back for 10 seconds with a paperclip.',
    ],
    prevention:
      'Write down your Wi-Fi password and keep it in a safe place. If you change it, update your written copy.',
    commonCauses: [
      'Typing the password with wrong capitalisation',
      'The password was changed and the new one was not recorded',
      'Confusing similar characters like O and 0, or l and 1',
    ],
    relatedErrors: ['android-wifi-authentication-error'],
    searchTerms: [
      'network security key incorrect',
      'WiFi password wrong',
      'wrong WiFi password',
      'security key not correct',
    ],
  },
  {
    slug: 'wifi-cant-connect',
    device: 'wifi',
    errorText: 'Can\'t Connect to This Network',
    plainMeaning:
      'Your device cannot connect to the Wi-Fi network you selected. This could be a password issue, a signal problem, or a device glitch.',
    severity: 'medium',
    steps: [
      'Make sure you are within range of the Wi-Fi router.',
      'Turn Wi-Fi off on your device, wait 10 seconds, and turn it back on.',
      'Forget the network (in Wi-Fi settings, tap the network and choose "Forget") and try connecting again.',
      'Restart your device.',
      'Restart your router.',
      'Make sure the router is not at maximum capacity (most home routers support about 20-30 devices).',
      'Try connecting to a different network to rule out a device problem.',
    ],
    prevention:
      'Keep your device software up to date. Restart your router monthly. If you have many smart home devices, consider a router that supports more connections.',
    commonCauses: [
      'Saved network settings are corrupted',
      'Too many devices on the network',
      'Signal too weak',
      'A software glitch on the device or router',
    ],
    relatedErrors: ['wifi-network-security-key-error', 'wifi-keeps-disconnecting'],
    searchTerms: [
      'can\'t connect to WiFi',
      'unable to connect WiFi',
      'WiFi won\'t connect',
      'cannot join network',
    ],
  },
  {
    slug: 'wifi-slow-internet',
    device: 'wifi',
    errorText: 'Internet Connection Is Very Slow',
    plainMeaning:
      'Your internet is working but much slower than normal. Pages take a long time to load and videos keep buffering.',
    severity: 'low',
    steps: [
      'Test your speed at fast.com or speedtest.net to see how slow it actually is.',
      'Restart your router (unplug, wait 30 seconds, plug back in).',
      'Move closer to the router — walls and distance weaken the signal.',
      'Check if other people in your home are streaming videos or downloading large files — they may be using most of the bandwidth.',
      'Close apps and browser tabs you are not using.',
      'If it is consistently slow, call your internet provider — you may need a better plan or a new router.',
    ],
    prevention:
      'Position your router centrally. Consider upgrading your internet plan if your household uses multiple devices simultaneously.',
    commonCauses: [
      'Too many devices or people using the internet at the same time',
      'Being too far from the router',
      'An old or overworked router',
      'Internet provider throttling during peak hours',
    ],
    relatedErrors: ['wifi-keeps-disconnecting', 'wifi-connected-no-internet'],
    searchTerms: [
      'slow internet',
      'WiFi slow',
      'internet very slow',
      'buffering',
      'slow connection',
    ],
  },
  {
    slug: 'wifi-no-networks-available',
    device: 'wifi',
    errorText: 'No Wi-Fi Networks Found',
    plainMeaning:
      'Your device cannot find any Wi-Fi networks at all. The Wi-Fi antenna on your device may be turned off, or there are no networks in range.',
    severity: 'medium',
    steps: [
      'Make sure Wi-Fi is turned on in your device settings.',
      'Turn off Airplane Mode if it is enabled.',
      'Restart your device.',
      'Check that your Wi-Fi router is turned on and its lights are blinking.',
      'Move closer to where your router is located.',
      'If using a laptop, check for a physical Wi-Fi switch on the side.',
      'If your router is off, check that it is plugged in and the power outlet is working.',
    ],
    prevention:
      'Keep your router in a well-ventilated area so it does not overheat. Make sure it is plugged into a reliable power outlet.',
    commonCauses: [
      'Wi-Fi is turned off on the device',
      'Airplane Mode is on',
      'The router is turned off or unplugged',
      'The device is too far from any network',
    ],
    relatedErrors: ['wifi-cant-connect', 'windows-wifi-no-networks-found'],
    searchTerms: [
      'no WiFi networks found',
      'WiFi not showing',
      'cannot find WiFi',
      'no wireless networks',
    ],
  },
  {
    slug: 'wifi-forgot-password',
    device: 'wifi',
    errorText: 'Enter Password for Wi-Fi Network',
    plainMeaning:
      'Your device is asking for the Wi-Fi password, and you may not remember it. Here is how to find it.',
    severity: 'low',
    steps: [
      'Check the sticker on the bottom or back of your Wi-Fi router — the default password is usually printed there.',
      'Look for a label that says "Password", "Network Key", "WPA Key", or "Wireless Password".',
      'If you changed the password from the default, check if you wrote it down somewhere.',
      'On Windows, if you have another device already connected: Settings > Network > Wi-Fi > your network > View Password.',
      'On iPhone: Settings > Wi-Fi > tap the (i) next to your network > Password (may require Face ID).',
      'As a last resort, reset the router to factory settings by pressing the tiny reset button on the back with a paperclip for 10 seconds. This restores the default password on the sticker.',
    ],
    prevention:
      'Write your Wi-Fi password down and keep it in a safe place, like taped inside a kitchen cabinet or in your address book.',
    commonCauses: [
      'Connecting a new device for the first time',
      'The saved password was erased after a device reset',
      'Someone changed the password',
    ],
    relatedErrors: ['wifi-network-security-key-error'],
    searchTerms: [
      'forgot WiFi password',
      'WiFi password',
      'find WiFi password',
      'where is WiFi password',
      'what is my WiFi password',
    ],
  },
  {
    slug: 'wifi-5ghz-not-showing',
    device: 'wifi',
    errorText: '5GHz Wi-Fi Network Not Showing Up',
    plainMeaning:
      'Your device cannot see the faster 5GHz Wi-Fi network from your router. You may only see the slower 2.4GHz network.',
    severity: 'low',
    steps: [
      'Make sure you are close to the router — 5GHz has a shorter range than 2.4GHz.',
      'Check that your router actually broadcasts a 5GHz network (not all do).',
      'The 5GHz network may have a different name — look for your network name with "5G" or "5GHz" at the end.',
      'Check your device specifications — some older devices only support 2.4GHz.',
      'Restart your router.',
      'Log into your router settings and make sure the 5GHz band is enabled.',
    ],
    prevention:
      'When buying a router, make sure it supports dual-band (2.4GHz and 5GHz). Position it centrally for best coverage.',
    commonCauses: [
      'Device is too far from the router for 5GHz',
      'The device only supports 2.4GHz',
      '5GHz band is disabled on the router',
      'The 5GHz network has a different name',
    ],
    relatedErrors: ['wifi-slow-internet'],
    searchTerms: [
      '5GHz WiFi not showing',
      '5G WiFi missing',
      'faster WiFi not available',
      'dual band WiFi issue',
    ],
  },
  {
    slug: 'wifi-router-not-working',
    device: 'wifi',
    errorText: 'Wi-Fi Router Lights Are Off or Blinking Red',
    plainMeaning:
      'Your Wi-Fi router is not working properly. If the lights are off, it may not have power. If blinking red, it is indicating a problem.',
    severity: 'high',
    steps: [
      'Check that the router is plugged in and the power outlet is working (try plugging in something else).',
      'Unplug the router, wait 60 seconds, and plug it back in.',
      'Check all cable connections — the internet cable from the wall should be firmly connected.',
      'Wait 5 minutes after plugging back in for the router to fully restart.',
      'If lights remain red or off, check for a power switch on the router.',
      'If the internet light is red, the problem may be with your internet provider — call them.',
      'If the router is old (5+ years), it may need replacement.',
    ],
    prevention:
      'Place your router in a well-ventilated area. Avoid stacking things on top of it. Consider replacing routers older than 5 years.',
    commonCauses: [
      'Power outage or loose power cable',
      'The router overheated',
      'Internet provider outage',
      'A hardware failure in an old router',
    ],
    relatedErrors: ['wifi-connected-no-internet', 'wifi-no-networks-available'],
    searchTerms: [
      'router not working',
      'router lights off',
      'router blinking red',
      'router no power',
      'WiFi router dead',
    ],
  },
  {
    slug: 'wifi-connected-wrong-network',
    device: 'wifi',
    errorText: 'Connected to Neighbor\'s or Unknown Network',
    plainMeaning:
      'Your device automatically connected to someone else\'s Wi-Fi network instead of yours. You should disconnect and connect to your own network.',
    severity: 'low',
    steps: [
      'Go to your Wi-Fi settings and check which network you are connected to.',
      'If it is not your network, tap on it and choose "Forget" or "Disconnect".',
      'Find your own network in the list and connect to it.',
      'Make sure you know your own network name — it is usually on the sticker on your router.',
      'To prevent this from happening again, "forget" any networks that are not yours.',
    ],
    prevention:
      'Forget any Wi-Fi networks that are not yours. Your device will then only auto-connect to known, trusted networks.',
    commonCauses: [
      'Your device saved an open network and auto-connected to it',
      'Your neighbour\'s network has a stronger signal',
      'An open network with a generic name like "Free WiFi"',
    ],
    relatedErrors: ['wifi-cant-connect'],
    searchTerms: [
      'connected wrong WiFi',
      'connected to neighbor WiFi',
      'wrong network connected',
      'unknown WiFi connected',
    ],
  },
  {
    slug: 'wifi-public-wifi-login',
    device: 'wifi',
    errorText: 'Wi-Fi Connected But Browser Shows Login Page',
    plainMeaning:
      'You connected to a public Wi-Fi network (like at a cafe, library, or hotel) but need to sign in or agree to terms before you can use the internet.',
    severity: 'low',
    steps: [
      'Open your web browser (Safari, Chrome, etc.) and try visiting any website.',
      'A login or "terms and conditions" page should appear — accept the terms or enter the required information.',
      'If the login page does not appear, try typing "captive.apple.com" or "neverssl.com" in your browser.',
      'If you need a password, ask the staff at the location (hotel desk, cafe counter, etc.).',
      'After logging in, you should be able to use the internet normally.',
      'Be careful on public Wi-Fi — avoid online banking or entering passwords.',
    ],
    prevention:
      'When using public Wi-Fi, always use a VPN for security. Avoid entering sensitive information like bank details or passwords.',
    commonCauses: [
      'You are on a public Wi-Fi that requires a login',
      'The login page did not pop up automatically',
      'You need a password from the establishment',
    ],
    relatedErrors: ['wifi-connected-no-internet'],
    searchTerms: [
      'WiFi login page',
      'captive portal',
      'public WiFi not working',
      'hotel WiFi login',
      'cafe WiFi connection',
    ],
  },
  {
    slug: 'wifi-ethernet-not-working',
    device: 'wifi',
    errorText: 'Ethernet — Network Cable Unplugged',
    plainMeaning:
      'Your computer thinks the network cable (ethernet) is not connected, even though it may be plugged in. The cable or port might have an issue.',
    severity: 'medium',
    steps: [
      'Check that the ethernet cable is firmly plugged in at both ends — the computer and the router.',
      'Unplug the cable and plug it back in. You should hear a click when it is secure.',
      'Try a different ethernet cable if you have one.',
      'Try a different ethernet port on your router.',
      'Restart your computer.',
      'Update the network driver: Device Manager > Network Adapters > right-click > Update Driver.',
    ],
    prevention:
      'Handle ethernet cables gently. Do not bend them sharply or step on them. Keep a spare cable handy.',
    commonCauses: [
      'A loose or damaged ethernet cable',
      'A faulty port on the computer or router',
      'An outdated network driver',
      'The cable clip is broken and the cable keeps slipping out',
    ],
    relatedErrors: ['wifi-connected-no-internet', 'wifi-router-not-working'],
    searchTerms: [
      'ethernet not working',
      'network cable unplugged',
      'ethernet no connection',
      'wired internet not working',
    ],
  },
]

// ── App Errors (20) ─────────────────────────────────────────────────────────

const appErrors: ErrorEntry[] = [
  {
    slug: 'app-whatsapp-waiting-network',
    device: 'app',
    errorText: 'WhatsApp — Waiting for Network',
    plainMeaning:
      'WhatsApp cannot connect to the internet. Your messages will not send or receive until the connection is restored.',
    severity: 'medium',
    steps: [
      'Check that your phone has an internet connection — try opening a website.',
      'Turn Wi-Fi off and back on, or switch to mobile data.',
      'Close WhatsApp completely and reopen it.',
      'Restart your phone.',
      'Make sure WhatsApp is allowed to use mobile data: Settings > Apps > WhatsApp > Data Usage.',
      'Check if WhatsApp is down for everyone by searching "is WhatsApp down" on Google.',
    ],
    prevention:
      'Keep a stable internet connection. Make sure WhatsApp has permission to use both Wi-Fi and mobile data.',
    commonCauses: [
      'No internet connection',
      'WhatsApp does not have permission to use data',
      'WhatsApp servers are down globally',
      'A VPN interfering with the connection',
    ],
    relatedErrors: ['wifi-connected-no-internet', 'android-no-internet-connection'],
    searchTerms: [
      'WhatsApp waiting for network',
      'WhatsApp not connecting',
      'WhatsApp messages not sending',
      'WhatsApp offline',
    ],
  },
  {
    slug: 'app-facebook-session-expired',
    device: 'app',
    errorText: 'Facebook — Session Expired, Please Log In Again',
    plainMeaning:
      'Facebook logged you out for security reasons. You just need to sign back in with your email and password.',
    severity: 'low',
    steps: [
      'Tap "Log In" and enter your email address (or phone number) and password.',
      'If you do not remember your password, tap "Forgot Password" to reset it.',
      'If you have two-factor authentication, you will need your phone to get a code.',
      'After logging in, go to Settings > Security to check for any suspicious activity.',
      'If you keep getting logged out, change your password to something new and strong.',
    ],
    prevention:
      'Keep your Facebook password up to date. Enable two-factor authentication for better security. Do not share your password with anyone.',
    commonCauses: [
      'Your session timed out after a period of inactivity',
      'Facebook detected a login from a new location or device',
      'You changed your password from another device',
      'A security check by Facebook',
    ],
    relatedErrors: [],
    searchTerms: [
      'Facebook session expired',
      'Facebook logged me out',
      'Facebook login required',
      'Facebook keeps logging me out',
    ],
  },
  {
    slug: 'app-netflix-nw-2-5',
    device: 'app',
    errorText: 'Netflix — Error Code NW-2-5',
    plainMeaning:
      'Netflix cannot connect to the internet. You will not be able to stream shows or movies until the connection is fixed.',
    severity: 'medium',
    steps: [
      'Check your internet connection — try opening a website.',
      'Restart your Wi-Fi router (unplug, wait 30 seconds, plug back in).',
      'Close the Netflix app completely and reopen it.',
      'On a smart TV: unplug the TV for 30 seconds, plug it back in.',
      'If using Wi-Fi, try moving your device closer to the router.',
      'Sign out of Netflix and sign back in.',
      'If on a smart TV, check if the Netflix app needs an update.',
    ],
    prevention:
      'Netflix needs a stable internet connection. A speed of at least 5 Mbps is recommended for HD streaming.',
    commonCauses: [
      'Internet connection is down or too slow',
      'The router needs restarting',
      'DNS settings issue',
      'Netflix app needs updating',
    ],
    relatedErrors: ['wifi-connected-no-internet', 'app-netflix-streaming-error'],
    searchTerms: [
      'Netflix error NW-2-5',
      'Netflix not connecting',
      'Netflix network error',
      'Netflix won\'t load',
    ],
  },
  {
    slug: 'app-zoom-error-5003',
    device: 'app',
    errorText: 'Zoom — Error Code 5003',
    plainMeaning:
      'Zoom cannot connect to its servers. You will not be able to join or start video calls until the connection is fixed.',
    severity: 'medium',
    steps: [
      'Check your internet connection.',
      'Close Zoom completely and reopen it.',
      'Restart your device.',
      'Check if your firewall or antivirus is blocking Zoom.',
      'Try uninstalling and reinstalling the Zoom app.',
      'If on a work or school network, ask the IT department — Zoom may be blocked.',
      'Check if Zoom is experiencing outages at status.zoom.us.',
    ],
    prevention:
      'Keep the Zoom app updated. Test your connection before important meetings by joining a test call at zoom.us/test.',
    commonCauses: [
      'Firewall or antivirus blocking Zoom',
      'Internet connection issue',
      'Zoom servers are down',
      'Network restrictions (common on work/school networks)',
    ],
    relatedErrors: ['wifi-connected-no-internet'],
    searchTerms: [
      'Zoom error 5003',
      'Zoom not connecting',
      'Zoom cannot join meeting',
      'Zoom connection failed',
    ],
  },
  {
    slug: 'app-youtube-playback-error',
    device: 'app',
    errorText: 'YouTube — An Error Occurred, Please Try Again Later (Playback ID)',
    plainMeaning:
      'YouTube cannot play the video you selected. The video may have been removed or there could be a connection issue.',
    severity: 'low',
    steps: [
      'Refresh the page or close and reopen the YouTube app.',
      'Check your internet connection — try loading another video.',
      'Clear the YouTube app cache: Settings > Apps > YouTube > Storage > Clear Cache.',
      'Try lowering the video quality: tap the three dots on the video > Quality > choose a lower resolution.',
      'If on a browser, try disabling extensions and clearing the cache.',
      'Check if the video is available in your country — some videos have regional restrictions.',
    ],
    prevention:
      'Keep the YouTube app updated. If videos frequently buffer, consider upgrading your internet speed.',
    commonCauses: [
      'Slow internet connection',
      'The video was removed by the uploader',
      'YouTube app cache is corrupted',
      'Browser extensions interfering with playback',
    ],
    relatedErrors: ['wifi-slow-internet'],
    searchTerms: [
      'YouTube playback error',
      'YouTube not playing',
      'YouTube error',
      'video not loading YouTube',
    ],
  },
  {
    slug: 'app-email-server-not-responding',
    device: 'app',
    errorText: 'Email — Cannot Connect to Server',
    plainMeaning:
      'Your email app cannot reach your email server to check for new messages. Your existing emails are usually still safe.',
    severity: 'medium',
    steps: [
      'Check your internet connection — make sure Wi-Fi or mobile data is working.',
      'Close the email app and reopen it.',
      'Check if your email password was recently changed — if so, update it in the app.',
      'Try removing your email account from the app and adding it again.',
      'Check if your email provider (like Gmail or Yahoo) is having an outage.',
      'Restart your device.',
    ],
    prevention:
      'If you change your email password on a computer, remember to update it on your phone immediately.',
    commonCauses: [
      'No internet connection',
      'Email password changed but not updated on the device',
      'Email server is temporarily down',
      'Incorrect email settings',
    ],
    relatedErrors: ['iphone-mail-cannot-get-mail', 'android-gmail-sync-error'],
    searchTerms: [
      'email server not responding',
      'email not working',
      'cannot receive email',
      'email connection error',
    ],
  },
  {
    slug: 'app-spotify-offline',
    device: 'app',
    errorText: 'Spotify — You\'re Offline',
    plainMeaning:
      'Spotify cannot connect to the internet and can only play songs you have downloaded for offline use.',
    severity: 'low',
    steps: [
      'Check your internet connection.',
      'Open Spotify, tap Home, then pull down to refresh.',
      'Go to Spotify Settings and make sure "Offline Mode" is turned OFF.',
      'Close Spotify completely and reopen it.',
      'Log out of Spotify and log back in.',
      'If nothing works, uninstall and reinstall Spotify.',
    ],
    prevention:
      'Keep your internet connection stable when using Spotify. Download your favourite playlists for offline listening as a backup.',
    commonCauses: [
      'No internet connection',
      'Offline mode was accidentally turned on',
      'Spotify app glitch',
      'Your Spotify account session expired',
    ],
    relatedErrors: ['wifi-connected-no-internet'],
    searchTerms: [
      'Spotify offline error',
      'Spotify not connecting',
      'Spotify no internet',
      'Spotify won\'t play',
    ],
  },
  {
    slug: 'app-amazon-payment-declined',
    device: 'app',
    errorText: 'Amazon — Your Payment Method Was Declined',
    plainMeaning:
      'Amazon could not charge your credit or debit card. The order was not placed. Your card may have an issue.',
    severity: 'medium',
    steps: [
      'Go to Amazon > Your Account > Payment Methods and check the card on file.',
      'Make sure the card number, expiration date, and billing address are correct.',
      'Check with your bank — they may have blocked the charge for security reasons.',
      'Try a different payment method.',
      'If using a debit card, make sure you have enough funds in the account.',
      'Some banks block online purchases by default — you may need to enable online transactions.',
    ],
    prevention:
      'Keep your payment information up to date. If your card expires, update it before you need to make a purchase.',
    commonCauses: [
      'Expired credit or debit card',
      'Insufficient funds',
      'Bank fraud protection blocking the charge',
      'Incorrect billing address',
    ],
    relatedErrors: [],
    searchTerms: [
      'Amazon payment declined',
      'Amazon card declined',
      'payment method declined Amazon',
      'Amazon order failed',
    ],
  },
  {
    slug: 'app-banking-app-login-failed',
    device: 'app',
    errorText: 'Banking App — Login Failed, Please Try Again',
    plainMeaning:
      'Your banking app could not log you in. This is usually a password issue or the bank servers are busy.',
    severity: 'medium',
    steps: [
      'Double-check your username and password — make sure caps lock is not on.',
      'If you forgot your password, use the "Forgot Password" option in the app.',
      'Check your internet connection.',
      'Check if the banking app needs an update from the App Store or Play Store.',
      'Wait 15 minutes and try again — the bank\'s servers may be busy.',
      'If your account is locked after too many attempts, call your bank\'s customer service.',
      'Never share your banking password with anyone who calls you — banks do not ask for this.',
    ],
    prevention:
      'Keep your banking app updated. Remember your password or store it securely in a password manager. Enable biometric login (fingerprint or face) for easier access.',
    commonCauses: [
      'Wrong password or username',
      'Bank servers undergoing maintenance',
      'App needs updating',
      'Account locked after too many failed attempts',
    ],
    relatedErrors: [],
    searchTerms: [
      'banking app login failed',
      'bank app not working',
      'online banking error',
      'cannot log into bank app',
    ],
  },
  {
    slug: 'app-uber-gps-error',
    device: 'app',
    errorText: 'Uber/Lyft — Unable to Determine Your Location',
    plainMeaning:
      'The ride-sharing app cannot figure out where you are. It needs your location to find nearby drivers.',
    severity: 'low',
    steps: [
      'Make sure Location Services is turned on for the app.',
      'On iPhone: Settings > Privacy > Location Services > Uber/Lyft > "While Using the App".',
      'On Android: Settings > Apps > Uber/Lyft > Permissions > Location > "Allow while using app".',
      'Go outside or near a window — GPS works better with a clear view of the sky.',
      'Restart the app.',
      'If GPS is still not working, you can manually type your pickup address in the app.',
    ],
    prevention:
      'Keep Location Services turned on for ride-sharing apps. Make sure GPS is enabled in your phone settings.',
    commonCauses: [
      'Location Services turned off for the app',
      'Being inside a large building blocks GPS signal',
      'GPS or Location Services turned off system-wide',
    ],
    relatedErrors: ['iphone-location-services-error'],
    searchTerms: [
      'Uber GPS error',
      'Lyft location error',
      'ride app can\'t find location',
      'Uber unable to determine location',
    ],
  },
  {
    slug: 'app-instagram-login-error',
    device: 'app',
    errorText: 'Instagram — An Unknown Error Has Occurred',
    plainMeaning:
      'Instagram is having trouble and something went wrong. This is usually temporary.',
    severity: 'low',
    steps: [
      'Close Instagram and reopen it.',
      'Check your internet connection.',
      'Update Instagram from the App Store or Play Store.',
      'Clear the app cache (Android: Settings > Apps > Instagram > Storage > Clear Cache).',
      'Log out and log back in.',
      'If nothing works, uninstall and reinstall Instagram.',
    ],
    prevention:
      'Keep Instagram updated. Make sure you have a stable internet connection.',
    commonCauses: [
      'A temporary Instagram server issue',
      'Outdated app version',
      'Poor internet connection',
      'Corrupted app cache',
    ],
    relatedErrors: ['app-facebook-session-expired'],
    searchTerms: [
      'Instagram error',
      'Instagram not working',
      'Instagram unknown error',
      'Instagram login problem',
    ],
  },
  {
    slug: 'app-maps-no-route-found',
    device: 'app',
    errorText: 'Google Maps/Apple Maps — No Route Found',
    plainMeaning:
      'The maps app cannot find a way to get you to your destination. The address may be wrong or the route may not exist.',
    severity: 'low',
    steps: [
      'Check the address you entered for typos.',
      'Try searching for the destination name instead of the exact address.',
      'Make sure you have selected the right travel mode (driving, walking, transit).',
      'Check your internet connection — maps need data to calculate routes.',
      'Try zooming into the destination on the map and tapping it directly.',
      'If driving, make sure the destination is accessible by road.',
    ],
    prevention:
      'Double-check addresses before starting navigation. Use landmarks or business names when possible.',
    commonCauses: [
      'Incorrect address or typo',
      'The destination is in an area without mapped roads',
      'No internet connection to calculate the route',
      'Selected travel mode is not available for that route',
    ],
    relatedErrors: ['iphone-location-services-error'],
    searchTerms: [
      'no route found maps',
      'Google Maps error',
      'Maps cannot find route',
      'navigation not working',
    ],
  },
  {
    slug: 'app-skype-poor-connection',
    device: 'app',
    errorText: 'Skype/FaceTime — Poor Network Connection',
    plainMeaning:
      'Your video call quality is bad because your internet is too slow. The video may freeze and the audio may cut out.',
    severity: 'low',
    steps: [
      'Move closer to your Wi-Fi router.',
      'Ask other people in your house to pause large downloads or streaming during your call.',
      'Turn off your camera (video off) to improve audio quality.',
      'Close other apps and browser tabs that might be using bandwidth.',
      'If on Wi-Fi, try switching to mobile data (or vice versa).',
      'Consider switching to an audio-only call if video keeps freezing.',
    ],
    prevention:
      'Before an important call, test your connection. Close other apps. Sit close to your router. A wired ethernet connection (if possible) is always more reliable.',
    commonCauses: [
      'Slow internet connection',
      'Too many devices using the internet at the same time',
      'Being too far from the Wi-Fi router',
      'Network congestion during peak hours',
    ],
    relatedErrors: ['wifi-slow-internet', 'wifi-keeps-disconnecting'],
    searchTerms: [
      'Skype poor connection',
      'FaceTime bad connection',
      'video call frozen',
      'video call quality bad',
    ],
  },
  {
    slug: 'app-whatsapp-media-download-failed',
    device: 'app',
    errorText: 'WhatsApp — Download Failed, The Download Was Unable to Complete',
    plainMeaning:
      'WhatsApp could not download a photo, video, or document that someone sent you. This is usually a storage or connection issue.',
    severity: 'low',
    steps: [
      'Check your internet connection — try loading a website.',
      'Make sure your phone has enough storage space.',
      'Tap the download button on the message again to retry.',
      'Check that WhatsApp has storage permission: Settings > Apps > WhatsApp > Permissions > Storage.',
      'Clear WhatsApp cache: Settings > Apps > WhatsApp > Storage > Clear Cache.',
      'Restart your phone and try again.',
    ],
    prevention:
      'Keep enough free storage on your phone. Maintain a stable internet connection.',
    commonCauses: [
      'Not enough storage space',
      'Poor internet connection',
      'WhatsApp does not have storage permission',
      'The media file has expired (older than 30 days in some cases)',
    ],
    relatedErrors: ['app-whatsapp-waiting-network', 'android-insufficient-storage'],
    searchTerms: [
      'WhatsApp download failed',
      'WhatsApp media not downloading',
      'WhatsApp pictures not loading',
      'cannot download WhatsApp photos',
    ],
  },
  {
    slug: 'app-netflix-streaming-error',
    device: 'app',
    errorText: 'Netflix — We\'re Having Trouble Playing This Title Right Now',
    plainMeaning:
      'Netflix cannot play the specific show or movie you selected. It could be a temporary server issue or a problem with that specific title.',
    severity: 'low',
    steps: [
      'Close Netflix and reopen it.',
      'Try playing a different show or movie — if others work, the issue is with that specific title.',
      'Check your internet speed at fast.com (Netflix recommends at least 5 Mbps for HD).',
      'Sign out of Netflix and sign back in.',
      'Clear the Netflix app cache: Settings > Apps > Netflix > Storage > Clear Cache.',
      'Update the Netflix app from the App Store or Play Store.',
    ],
    prevention:
      'Keep the Netflix app updated. Make sure your internet speed is at least 5 Mbps for reliable streaming.',
    commonCauses: [
      'Netflix servers having a temporary issue',
      'Slow internet connection',
      'The title was recently removed from Netflix',
      'App cache corruption',
    ],
    relatedErrors: ['app-netflix-nw-2-5', 'wifi-slow-internet'],
    searchTerms: [
      'Netflix trouble playing',
      'Netflix not playing',
      'Netflix streaming error',
      'Netflix title error',
    ],
  },
  {
    slug: 'app-messenger-not-delivered',
    device: 'app',
    errorText: 'Facebook Messenger — Message Not Delivered',
    plainMeaning:
      'Your message on Facebook Messenger did not reach the other person. It is still on your phone and you can try sending it again.',
    severity: 'low',
    steps: [
      'Check your internet connection.',
      'Tap the undelivered message and choose "Retry" or tap the send button again.',
      'Close Messenger completely and reopen it.',
      'Check if the person you are messaging has blocked you or deactivated their account.',
      'Update the Messenger app from the App Store or Play Store.',
      'Restart your phone and try again.',
    ],
    prevention:
      'Make sure you have a stable internet connection before sending messages. Keep the Messenger app updated.',
    commonCauses: [
      'No internet connection',
      'The recipient has blocked you',
      'Messenger servers temporarily down',
      'App needs updating',
    ],
    relatedErrors: ['app-whatsapp-waiting-network', 'app-facebook-session-expired'],
    searchTerms: [
      'Messenger not delivered',
      'Facebook message not sent',
      'Messenger error',
      'message failed Messenger',
    ],
  },
  {
    slug: 'app-google-account-action-required',
    device: 'app',
    errorText: 'Google — Action Required: Verify Your Identity',
    plainMeaning:
      'Google needs to confirm it is really you using your account. This is a security feature to protect your account from unauthorized access.',
    severity: 'medium',
    steps: [
      'Tap on the notification to start the verification process.',
      'Google may ask you to enter your password, confirm a phone number, or answer a security question.',
      'If they send a code to your phone number, enter it when prompted.',
      'If you cannot complete verification, try going to accounts.google.com on a computer.',
      'If you think someone else is trying to access your account, change your password immediately.',
      'Consider enabling two-factor authentication for extra security.',
    ],
    prevention:
      'Keep your phone number and recovery email up to date in your Google account settings. Enable two-factor authentication.',
    commonCauses: [
      'Logging in from a new device or location',
      'Google detected suspicious activity on your account',
      'You have not used the account in a long time',
      'Password was recently changed',
    ],
    relatedErrors: ['app-facebook-session-expired', 'android-play-authentication-required'],
    searchTerms: [
      'Google verify identity',
      'Google action required',
      'Google security alert',
      'Google account verification',
    ],
  },
  {
    slug: 'app-alexa-not-responding',
    device: 'app',
    errorText: 'Alexa — Sorry, I\'m Having Trouble Understanding Right Now',
    plainMeaning:
      'Your Amazon Echo or Alexa device cannot understand your request. It might be a connection issue or Alexa servers may be busy.',
    severity: 'low',
    steps: [
      'Make sure your Alexa device is connected to Wi-Fi (check the Alexa app).',
      'Move closer to the device and speak clearly.',
      'Unplug the Alexa device, wait 30 seconds, and plug it back in.',
      'Check your Wi-Fi connection — restart the router if needed.',
      'Make sure the microphone is not muted (look for a red light on the device).',
      'Open the Alexa app on your phone and check for any updates.',
    ],
    prevention:
      'Keep your Alexa device near the router for a strong Wi-Fi connection. Speak clearly and at a normal volume.',
    commonCauses: [
      'Wi-Fi connection lost',
      'Amazon servers temporarily busy',
      'The microphone is muted',
      'Too much background noise',
    ],
    relatedErrors: ['wifi-connected-no-internet'],
    searchTerms: [
      'Alexa not responding',
      'Alexa having trouble',
      'Echo not working',
      'Alexa won\'t listen',
    ],
  },
  {
    slug: 'app-zoom-audio-not-working',
    device: 'app',
    errorText: 'Zoom — Others Can\'t Hear Me / I Can\'t Hear Others',
    plainMeaning:
      'The audio in your Zoom call is not working properly. Either others cannot hear you, or you cannot hear them.',
    severity: 'medium',
    steps: [
      'Make sure you tapped "Join with Computer Audio" (or "Call using Internet Audio" on phones) when joining the meeting.',
      'Check that you are not muted — look for a microphone icon with a red line through it.',
      'Check your device volume — press the volume up button.',
      'Make sure Zoom has microphone permission: phone Settings > Apps > Zoom > Permissions > Microphone.',
      'Try leaving the meeting and rejoining.',
      'If using Bluetooth headphones, make sure they are connected and the correct audio device is selected in Zoom settings.',
      'Close other apps that might be using the microphone.',
    ],
    prevention:
      'Before important meetings, test your audio at zoom.us/test. Make sure Zoom has microphone and speaker permissions.',
    commonCauses: [
      'Did not join audio when entering the meeting',
      'Microphone is muted',
      'Wrong audio device selected',
      'Zoom does not have microphone permission',
    ],
    relatedErrors: ['app-zoom-error-5003', 'windows-microphone-not-working'],
    searchTerms: [
      'Zoom audio not working',
      'Zoom no sound',
      'Zoom microphone not working',
      'can\'t hear on Zoom',
    ],
  },
  {
    slug: 'app-twitter-something-went-wrong',
    device: 'app',
    errorText: 'X (Twitter) — Something Went Wrong, Try Again',
    plainMeaning:
      'X (formerly Twitter) is having a temporary problem. The app could not load what you wanted to see.',
    severity: 'low',
    steps: [
      'Pull down on the screen to refresh.',
      'Close the app and reopen it.',
      'Check your internet connection.',
      'Check if X/Twitter is down for everyone at downdetector.com.',
      'Clear the app cache: Settings > Apps > X > Storage > Clear Cache.',
      'Update the app from the App Store or Play Store.',
    ],
    prevention:
      'Keep the app updated. This error is usually on their end and resolves itself.',
    commonCauses: [
      'X/Twitter servers experiencing issues',
      'Poor internet connection',
      'Outdated app version',
      'App cache corruption',
    ],
    relatedErrors: ['app-instagram-login-error'],
    searchTerms: [
      'Twitter something went wrong',
      'X app not working',
      'Twitter error',
      'Twitter not loading',
    ],
  },
]

// ── Mac Errors (10) ─────────────────────────────────────────────────────────

const macErrors: ErrorEntry[] = [
  {
    slug: 'mac-startup-disk-almost-full',
    device: 'mac',
    errorText: 'Your Startup Disk Is Almost Full',
    plainMeaning:
      'Your Mac\'s main storage drive is running out of space. You need to delete some files to keep your Mac running smoothly.',
    severity: 'medium',
    steps: [
      'Click the Apple menu > About This Mac > More Info > Storage Settings.',
      'Click "Manage" to see recommendations for freeing space.',
      'Enable "Store in iCloud" to move old files to the cloud automatically.',
      'Enable "Empty Trash Automatically" to delete trashed files after 30 days.',
      'Review large files and delete ones you no longer need.',
      'Move photos and videos to an external drive or iCloud Photos.',
      'Delete old applications you no longer use: open Finder > Applications, right-click unwanted apps > Move to Trash.',
    ],
    prevention:
      'Use iCloud storage to keep files in the cloud. Regularly empty the Trash. Move large files to an external drive.',
    commonCauses: [
      'Years of accumulated photos, videos, and documents',
      'Old apps and downloads',
      'Large email attachments stored locally',
      'Time Machine local snapshots',
    ],
    relatedErrors: ['iphone-storage-almost-full', 'windows-not-enough-disk-space'],
    searchTerms: [
      'startup disk full Mac',
      'Mac storage full',
      'Mac running out of space',
      'Mac disk almost full',
    ],
  },
  {
    slug: 'mac-spinning-wheel',
    device: 'mac',
    errorText: 'Application Not Responding (Spinning Rainbow Wheel)',
    plainMeaning:
      'An application on your Mac has frozen. The spinning colourful wheel (sometimes called the "spinning beach ball of death") means your Mac is struggling.',
    severity: 'low',
    steps: [
      'Wait 30 seconds — the app may recover on its own.',
      'If it does not recover, press Command + Option + Escape to open the "Force Quit" window.',
      'Select the frozen app and click "Force Quit".',
      'Re-open the app — any unsaved work may be lost.',
      'If your entire Mac is frozen, hold the power button for 10 seconds to force a shutdown.',
      'After restarting, check for macOS updates: Apple menu > System Settings > Software Update.',
    ],
    prevention:
      'Save your work frequently with Command + S. Close apps you are not using. Keep your Mac updated.',
    commonCauses: [
      'The app has a bug or is running a heavy task',
      'Not enough available memory (RAM)',
      'The Mac\'s storage is nearly full',
      'An outdated app not compatible with the latest macOS',
    ],
    relatedErrors: ['mac-startup-disk-almost-full', 'mac-out-of-memory'],
    searchTerms: [
      'Mac spinning wheel',
      'rainbow wheel Mac',
      'Mac frozen',
      'app not responding Mac',
      'beach ball of death',
    ],
  },
  {
    slug: 'mac-kernel-panic',
    device: 'mac',
    errorText: 'Your Computer Restarted Because of a Problem',
    plainMeaning:
      'Your Mac had a serious error and restarted itself. This is the Mac equivalent of a "blue screen." Your files should be safe.',
    severity: 'high',
    steps: [
      'Click "OK" on the restart message.',
      'If it happens once, it may have been a one-time glitch — continue using your Mac normally.',
      'If it happens again, check for macOS updates: Apple menu > System Settings > Software Update.',
      'If you recently installed new software or connected new hardware, try removing it.',
      'Disconnect all external devices (USB drives, printers, etc.) and see if the problem continues.',
      'If it keeps happening, reset NVRAM: shut down, then press and hold Option + Command + P + R as you turn it on, for 20 seconds.',
      'If the problem persists, contact Apple Support or visit an Apple Store.',
    ],
    prevention:
      'Keep macOS updated. Only install software from trusted sources. Avoid overheating your Mac by keeping vents clear.',
    commonCauses: [
      'A driver or software conflict',
      'A faulty external device',
      'Hardware issue (like failing RAM)',
      'A bug in macOS or an app',
    ],
    relatedErrors: ['windows-blue-screen-of-death'],
    searchTerms: [
      'kernel panic Mac',
      'Mac crashed',
      'Mac restarted because of problem',
      'Mac keeps restarting',
    ],
  },
  {
    slug: 'mac-safari-secure-connection',
    device: 'mac',
    errorText: 'Safari Can\'t Establish a Secure Connection',
    plainMeaning:
      'Safari is warning you that it cannot safely connect to the website. The website\'s security may have an issue.',
    severity: 'medium',
    steps: [
      'Check the website address for typos.',
      'Try the website in a different browser (like Chrome or Firefox).',
      'Check your Mac\'s date and time: Apple menu > System Settings > General > Date & Time > make sure "Set time automatically" is on.',
      'Clear Safari data: Safari menu > Settings > Privacy > Manage Website Data > Remove All.',
      'If you trust the website, try visiting it using "https://" at the beginning of the address.',
      'Update macOS for the latest security certificates.',
    ],
    prevention:
      'Keep macOS and Safari updated. Make sure your Mac\'s date and time are set automatically.',
    commonCauses: [
      'The website\'s security certificate has expired',
      'Incorrect date and time on your Mac',
      'Outdated macOS missing new security certificates',
      'The website has a configuration issue',
    ],
    relatedErrors: ['browser-connection-not-private', 'browser-certificate-error'],
    searchTerms: [
      'Safari secure connection error',
      'Safari can\'t establish secure connection',
      'Safari HTTPS error',
      'Safari security warning',
    ],
  },
  {
    slug: 'mac-out-of-memory',
    device: 'mac',
    errorText: 'Your System Has Run Out of Application Memory',
    plainMeaning:
      'Your Mac does not have enough working memory to run all the apps you have open. You need to close some apps.',
    severity: 'medium',
    steps: [
      'Close apps you are not using — click the red circle in the top-left corner of each window.',
      'Close browser tabs you do not need — each tab uses memory.',
      'Check which apps are using the most memory: open Activity Monitor (search for it with Spotlight) and click the "Memory" tab.',
      'Select apps using a lot of memory and click the X button to quit them.',
      'Restart your Mac to clear all memory.',
      'If this happens often, you may need a Mac with more RAM.',
    ],
    prevention:
      'Close apps when you are finished with them. Limit the number of browser tabs you have open. Restart your Mac once a week.',
    commonCauses: [
      'Too many apps running at once',
      'Too many browser tabs open',
      'An app with a memory leak',
      'Not enough RAM for the work you are doing',
    ],
    relatedErrors: ['mac-spinning-wheel', 'mac-startup-disk-almost-full'],
    searchTerms: [
      'Mac out of memory',
      'Mac application memory',
      'Mac running slow',
      'Mac needs more memory',
    ],
  },
  {
    slug: 'mac-app-damaged',
    device: 'mac',
    errorText: '"App" Is Damaged and Can\'t Be Opened',
    plainMeaning:
      'macOS thinks the app you are trying to open may be unsafe or corrupted. This is a security feature called Gatekeeper.',
    severity: 'low',
    steps: [
      'First, try re-downloading the app from the Mac App Store or the developer\'s official website.',
      'If you just downloaded it, right-click (or Control-click) the app and choose "Open" from the menu.',
      'Click "Open" in the confirmation dialog.',
      'If that does not work, go to System Settings > Privacy & Security and look for a message about the blocked app.',
      'Click "Open Anyway" if you trust the developer.',
      'Never open apps from sources you do not trust.',
    ],
    prevention:
      'Download apps from the Mac App Store whenever possible. Only download from trusted developer websites.',
    commonCauses: [
      'The app was downloaded from a third-party website',
      'The download was corrupted or incomplete',
      'macOS Gatekeeper is blocking an unverified app',
    ],
    relatedErrors: [],
    searchTerms: [
      'app is damaged Mac',
      'app can\'t be opened Mac',
      'Mac app damaged error',
      'Gatekeeper Mac',
    ],
  },
  {
    slug: 'mac-wifi-no-hardware-installed',
    device: 'mac',
    errorText: 'Wi-Fi: No Hardware Installed',
    plainMeaning:
      'Your Mac cannot detect its own Wi-Fi hardware. This usually requires a restart or, in rare cases, a repair.',
    severity: 'high',
    steps: [
      'Restart your Mac — this fixes the problem most of the time.',
      'Reset NVRAM: shut down your Mac, press the power button, and immediately hold Option + Command + P + R for 20 seconds.',
      'Reset SMC: shut down, press and hold Shift + Control + Option + Power for 10 seconds, then release all keys and turn on.',
      'If the problem continues after restarting, your Mac\'s Wi-Fi hardware may need repair.',
      'As a temporary solution, use a USB Wi-Fi adapter.',
      'Contact Apple Support or visit an Apple Store.',
    ],
    prevention:
      'Keep macOS updated. Avoid physical shocks or liquid damage to your Mac.',
    commonCauses: [
      'A software glitch that a restart will fix',
      'An NVRAM or SMC issue',
      'Physical damage to the Wi-Fi hardware',
      'A macOS update that caused a driver issue',
    ],
    relatedErrors: ['wifi-no-networks-available'],
    searchTerms: [
      'Mac WiFi no hardware installed',
      'Mac WiFi not working',
      'Mac no WiFi',
      'WiFi hardware not found Mac',
    ],
  },
  {
    slug: 'mac-time-machine-backup-failed',
    device: 'mac',
    errorText: 'Time Machine — Backup Failed',
    plainMeaning:
      'Your Mac could not complete its automatic backup. Your previous backups are still safe — the new one just did not finish.',
    severity: 'low',
    steps: [
      'Check that your backup drive is connected and turned on.',
      'Make sure there is enough space on the backup drive.',
      'Try unplugging the backup drive and plugging it back in.',
      'Go to System Settings > Time Machine and try backing up manually by clicking "Back Up Now".',
      'If using a network drive, check your Wi-Fi connection.',
      'If it keeps failing, you may need to erase the backup drive and start fresh (this deletes old backups).',
    ],
    prevention:
      'Keep your backup drive connected and with plenty of free space. Time Machine will manage space automatically, but larger drives are better.',
    commonCauses: [
      'Backup drive disconnected or turned off',
      'Not enough space on the backup drive',
      'Backup drive corrupted',
      'Network connection lost (for network backups)',
    ],
    relatedErrors: ['mac-startup-disk-almost-full'],
    searchTerms: [
      'Time Machine backup failed',
      'Time Machine error',
      'Mac backup failed',
      'Time Machine not working',
    ],
  },
  {
    slug: 'mac-bluetooth-not-available',
    device: 'mac',
    errorText: 'Bluetooth Not Available',
    plainMeaning:
      'Your Mac\'s Bluetooth is not working. You will not be able to use Bluetooth devices like wireless keyboards, mice, or headphones.',
    severity: 'medium',
    steps: [
      'Restart your Mac — this fixes Bluetooth issues most of the time.',
      'Click the Bluetooth icon in the menu bar and make sure Bluetooth is turned on.',
      'If the icon shows "Bluetooth Not Available", try resetting Bluetooth: hold Shift + Option and click the Bluetooth icon, then choose "Reset the Bluetooth Module".',
      'Delete Bluetooth preferences: open Finder, press Command + Shift + G, type "/Library/Preferences/", find "com.apple.Bluetooth.plist" and delete it, then restart.',
      'If using a wired keyboard/mouse, connect them first, then troubleshoot Bluetooth.',
      'Contact Apple Support if Bluetooth remains unavailable after all steps.',
    ],
    prevention:
      'Keep macOS updated. Restart your Mac regularly. Keep a wired mouse or keyboard as a backup.',
    commonCauses: [
      'A software glitch',
      'Corrupted Bluetooth preferences',
      'A macOS update issue',
      'Hardware problem (rare)',
    ],
    relatedErrors: ['iphone-bluetooth-pairing-failed'],
    searchTerms: [
      'Bluetooth not available Mac',
      'Mac Bluetooth not working',
      'Bluetooth unavailable Mac',
      'Mac cannot find Bluetooth',
    ],
  },
  {
    slug: 'mac-external-drive-not-showing',
    device: 'mac',
    errorText: 'External Drive Not Showing Up in Finder',
    plainMeaning:
      'You plugged in an external hard drive or USB drive but it is not appearing on your Mac. The drive might not be compatible or may need to be mounted.',
    severity: 'low',
    steps: [
      'Check that the drive is properly connected — try unplugging and plugging it back in.',
      'Try a different USB port on your Mac.',
      'Try a different USB cable.',
      'Open Finder > Settings > Sidebar and make sure "External Disks" is checked.',
      'Open Disk Utility (search with Spotlight) — the drive may appear there even if not in Finder. Select it and click "Mount".',
      'If the drive was formatted for Windows (NTFS), your Mac can read it but not write to it. You may need special software to write to it.',
    ],
    prevention:
      'Always "eject" drives properly before unplugging them. Use drives formatted as exFAT for compatibility between Mac and Windows.',
    commonCauses: [
      'The drive is not properly connected',
      'The drive needs to be manually mounted',
      'The drive format is not compatible with macOS',
      'A faulty cable or USB port',
    ],
    relatedErrors: ['windows-usb-device-not-recognized'],
    searchTerms: [
      'external drive not showing Mac',
      'USB drive not found Mac',
      'hard drive not appearing Mac',
      'Mac cannot see external drive',
    ],
  },
  {
    slug: 'mac-software-update-required',
    device: 'mac',
    errorText: 'This App Requires macOS [Version] or Later',
    plainMeaning:
      'The app you are trying to use needs a newer version of macOS than what you currently have. You may need to update your Mac.',
    severity: 'low',
    steps: [
      'Go to the Apple menu > System Settings > General > Software Update.',
      'If an update is available, click "Update Now".',
      'Make sure you have enough free disk space (at least 15 GB for major updates).',
      'Plug in your Mac to power during the update.',
      'If your Mac is too old to update, check for an older version of the app that works with your macOS.',
      'Contact the app developer to ask if an older compatible version is available.',
    ],
    prevention:
      'Keep your Mac updated to the latest macOS version. Before buying new software, check its system requirements.',
    commonCauses: [
      'Your macOS is out of date',
      'The app was recently updated to require a newer macOS',
      'Your Mac may be too old for the latest macOS',
    ],
    relatedErrors: ['mac-app-damaged'],
    searchTerms: [
      'app requires macOS update',
      'macOS version too old',
      'app not compatible Mac',
      'cannot open app Mac version',
    ],
  },
  {
    slug: 'mac-airdrop-not-finding',
    device: 'mac',
    errorText: 'AirDrop — No People Found on Mac',
    plainMeaning:
      'Your Mac cannot find nearby Apple devices to share files with. Both devices need to have AirDrop enabled and be close together.',
    severity: 'low',
    steps: [
      'Open Finder and click "AirDrop" in the sidebar.',
      'At the bottom of the window, change "Allow me to be discovered by" to "Everyone".',
      'Make sure Wi-Fi and Bluetooth are both turned on.',
      'On the other device (iPhone or another Mac), also set AirDrop to "Everyone".',
      'Make sure both devices are within about 10 feet (3 metres) of each other.',
      'If using an older Mac, it may not be compatible with newer AirDrop versions.',
    ],
    prevention:
      'Keep Wi-Fi and Bluetooth on. Set AirDrop to "Contacts Only" for everyday use.',
    commonCauses: [
      'AirDrop is set to "No One" or "Off"',
      'Wi-Fi or Bluetooth is turned off',
      'Devices are too far apart',
      'Firewall is blocking incoming connections',
    ],
    relatedErrors: ['iphone-airdrop-not-working'],
    searchTerms: [
      'AirDrop not working Mac',
      'Mac AirDrop no people found',
      'cannot AirDrop from Mac',
      'AirDrop Mac to iPhone not working',
    ],
  },
  {
    slug: 'mac-printer-offline',
    device: 'mac',
    errorText: 'Printer Is Offline',
    plainMeaning:
      'Your Mac thinks the printer is not available. The printer may be off, disconnected, or having a communication issue.',
    severity: 'low',
    steps: [
      'Make sure the printer is turned on and has paper.',
      'If using USB, check the cable is firmly connected.',
      'If wireless, make sure the printer is on the same Wi-Fi network as your Mac.',
      'Go to System Settings > Printers & Scanners and click your printer.',
      'Try removing the printer and adding it again.',
      'Restart both the printer and your Mac.',
    ],
    prevention:
      'Keep the printer on the same Wi-Fi network. Ensure it has paper and ink. Restart it if it has been idle for a long time.',
    commonCauses: [
      'Printer is turned off or in sleep mode',
      'Printer is on a different Wi-Fi network',
      'USB cable is loose',
      'Printer driver needs updating',
    ],
    relatedErrors: ['windows-printer-not-found'],
    searchTerms: [
      'printer offline Mac',
      'Mac cannot find printer',
      'printer not working Mac',
      'Mac printer error',
    ],
  },
]

// ── Additional Common Errors ────────────────────────────────────────────────

const additionalErrors: ErrorEntry[] = [
  {
    slug: 'iphone-hotspot-not-working',
    device: 'iphone',
    errorText: 'Personal Hotspot — No Devices Connected',
    plainMeaning:
      'You turned on your iPhone\'s hotspot to share internet with another device, but nothing is connecting to it.',
    severity: 'low',
    steps: [
      'Go to Settings > Personal Hotspot and make sure it is turned on.',
      'Note the Wi-Fi password shown on the screen.',
      'On the other device, look for your iPhone name in the Wi-Fi list and connect using that password.',
      'If it does not appear, turn Personal Hotspot off and back on.',
      'Try connecting via USB cable or Bluetooth instead of Wi-Fi.',
      'Restart both your iPhone and the device you want to connect.',
    ],
    prevention:
      'Keep a simple but memorable hotspot password. Make sure your mobile plan includes hotspot/tethering.',
    commonCauses: [
      'The other device is not looking for the right network name',
      'Wrong hotspot password entered',
      'Mobile carrier does not allow hotspot on your plan',
      'Too many devices already connected',
    ],
    relatedErrors: ['iphone-no-service', 'wifi-cant-connect'],
    searchTerms: [
      'iPhone hotspot not working',
      'personal hotspot no connection',
      'hotspot not connecting',
      'iPhone tethering error',
    ],
  },
  {
    slug: 'android-play-protect-warning',
    device: 'android',
    errorText: 'Google Play Protect — Harmful App Found',
    plainMeaning:
      'Google\'s security system found an app on your phone that may be dangerous. It is protecting you by alerting you.',
    severity: 'high',
    steps: [
      'Take this warning seriously — tap "Uninstall" or "Remove" if the option is shown.',
      'If you recognise the app and trust it, you can choose to keep it (but this is not recommended).',
      'Go to the Play Store > tap your profile > Play Protect to run a full scan.',
      'Review your installed apps and remove any you do not recognise.',
      'Check your phone for unusual behaviour (unexpected charges, pop-up ads).',
      'Change passwords for any sensitive accounts if you are concerned.',
    ],
    prevention:
      'Only install apps from the Google Play Store. Never install apps from links sent via text message or email.',
    commonCauses: [
      'An app was installed from outside the Play Store',
      'A previously safe app was updated with malicious code',
      'Sideloading APK files from untrusted sources',
    ],
    relatedErrors: ['windows-antivirus-threat-detected', 'android-app-not-installed'],
    searchTerms: [
      'Play Protect warning',
      'harmful app Android',
      'Google Play Protect alert',
      'dangerous app found',
    ],
  },
  {
    slug: 'windows-bluetooth-not-working',
    device: 'windows',
    errorText: 'Bluetooth Not Available',
    plainMeaning:
      'Your computer\'s Bluetooth is not working. You will not be able to connect wireless headphones, speakers, mice, or keyboards.',
    severity: 'medium',
    steps: [
      'Check if Bluetooth is turned on: Settings > Bluetooth & Devices > make sure the toggle is on.',
      'Check for a physical Bluetooth switch on your laptop.',
      'Make sure Airplane Mode is off.',
      'Restart your computer.',
      'Update the Bluetooth driver: Device Manager > Bluetooth > right-click > Update Driver.',
      'If the Bluetooth adapter is not showing in Device Manager, you may need to enable it in BIOS or your laptop\'s hardware settings.',
    ],
    prevention:
      'Keep your Bluetooth drivers updated. Make sure Airplane Mode does not turn Bluetooth off.',
    commonCauses: [
      'Bluetooth is turned off in settings',
      'Airplane Mode is on',
      'Bluetooth driver needs updating',
      'A Windows update disabled the adapter',
    ],
    relatedErrors: ['mac-bluetooth-not-available', 'iphone-bluetooth-pairing-failed'],
    searchTerms: [
      'Bluetooth not working Windows',
      'Bluetooth not available PC',
      'Windows Bluetooth error',
      'cannot connect Bluetooth Windows',
    ],
  },
  {
    slug: 'browser-403-forbidden',
    device: 'browser',
    errorText: '403 Forbidden',
    plainMeaning:
      'The website understood your request but is refusing to let you access this page. You do not have permission to view it.',
    severity: 'low',
    steps: [
      'Check the website address for typos.',
      'If you need to be logged in, try signing in first.',
      'Try clearing your browser cookies for this website.',
      'If you were previously able to access this page, your account permissions may have changed.',
      'Try accessing the website from a different network — some sites block certain IP addresses.',
      'Contact the website owner if you believe you should have access.',
    ],
    prevention:
      'Make sure you are logged in when accessing restricted content. Bookmark the correct login page.',
    commonCauses: [
      'You do not have permission to view this page',
      'Your IP address has been blocked',
      'The website requires login but you are not signed in',
      'The page is restricted to certain users',
    ],
    relatedErrors: ['browser-404-not-found', 'browser-connection-not-private'],
    searchTerms: [
      '403 forbidden',
      '403 error',
      'forbidden website',
      'access forbidden browser',
    ],
  },
  {
    slug: 'wifi-wrong-time-date',
    device: 'wifi',
    errorText: 'Secure Sites Not Loading — Date and Time Error',
    plainMeaning:
      'Secure websites (HTTPS) are not loading because your device\'s date or time is set incorrectly. Security certificates check the date to work.',
    severity: 'medium',
    steps: [
      'Check your device clock — is the date and time correct?',
      'On iPhone: Settings > General > Date & Time > turn on "Set Automatically".',
      'On Android: Settings > System > Date & Time > turn on "Automatic date & time".',
      'On Windows: Settings > Time & Language > Date & Time > turn on "Set time automatically".',
      'On Mac: System Settings > General > Date & Time > turn on "Set date and time automatically".',
      'After fixing the date and time, refresh the website.',
    ],
    prevention:
      'Always keep automatic date and time enabled on your devices. If you travel to a different time zone, your device should adjust automatically.',
    commonCauses: [
      'The device battery died and the clock reset',
      'Automatic date and time was turned off accidentally',
      'A recent timezone change was not detected',
    ],
    relatedErrors: ['browser-connection-not-private', 'browser-certificate-error'],
    searchTerms: [
      'date and time error websites',
      'clock wrong websites not loading',
      'certificate date error',
      'HTTPS not working date wrong',
    ],
  },
  {
    slug: 'app-whatsapp-storage-full',
    device: 'app',
    errorText: 'WhatsApp — Cannot Send Media, Storage Full',
    plainMeaning:
      'WhatsApp cannot send or receive photos and videos because your phone has run out of storage space.',
    severity: 'medium',
    steps: [
      'Go to WhatsApp > Settings > Storage and Data > Manage Storage.',
      'Review large files and delete ones you no longer need.',
      'Delete old group chats with many media files.',
      'Clear your phone\'s storage: delete unused apps and old photos.',
      'On Android, move WhatsApp media to an SD card if your phone has one.',
      'On iPhone, offload unused apps: Settings > General > iPhone Storage > Enable "Offload Unused Apps".',
    ],
    prevention:
      'Regularly clean up WhatsApp media. Turn off auto-download of media in WhatsApp Settings > Storage and Data.',
    commonCauses: [
      'Phone storage completely full',
      'WhatsApp media files accumulated over time',
      'Too many group chats with shared photos and videos',
    ],
    relatedErrors: ['app-whatsapp-waiting-network', 'iphone-storage-almost-full', 'android-insufficient-storage'],
    searchTerms: [
      'WhatsApp storage full',
      'WhatsApp cannot send photos',
      'WhatsApp media storage',
      'WhatsApp taking too much space',
    ],
  },
  {
    slug: 'app-gmail-attachment-failed',
    device: 'app',
    errorText: 'Gmail — Attachment Failed to Upload',
    plainMeaning:
      'Gmail could not attach the file to your email. The file may be too large or your connection may be unstable.',
    severity: 'low',
    steps: [
      'Check the file size — Gmail has a 25 MB limit for attachments.',
      'If the file is larger than 25 MB, Gmail will offer to use Google Drive instead — accept this option.',
      'Check your internet connection.',
      'Try attaching a smaller file to test if attachments work at all.',
      'Close Gmail and reopen it, then try again.',
      'Try sending the email from a computer instead of your phone.',
    ],
    prevention:
      'Compress large files or use Google Drive for files over 25 MB. Make sure you have a stable internet connection when sending attachments.',
    commonCauses: [
      'The file is larger than 25 MB',
      'Poor or unstable internet connection',
      'The file type is blocked by Gmail (like .exe files)',
      'Gmail app needs updating',
    ],
    relatedErrors: ['app-email-server-not-responding'],
    searchTerms: [
      'Gmail attachment failed',
      'cannot attach file Gmail',
      'Gmail upload failed',
      'email attachment error',
    ],
  },
  {
    slug: 'android-notifications-not-showing',
    device: 'android',
    errorText: 'Not Receiving Notifications',
    plainMeaning:
      'Your phone is not showing notification alerts for apps like WhatsApp, email, or messages. The settings may have been changed.',
    severity: 'medium',
    steps: [
      'Go to Settings > Notifications and check that notifications are enabled globally.',
      'Find the specific app and make sure its notifications are turned on.',
      'Check that Do Not Disturb mode is not enabled: Settings > Sound > Do Not Disturb.',
      'Make sure the app is not in "Battery Optimization" mode: Settings > Battery > Battery Optimization > find the app > set to "Don\'t Optimize".',
      'Check that the app has permission to run in the background.',
      'Restart your phone.',
    ],
    prevention:
      'Be careful when changing notification settings. If an app asks to disable battery optimization for notifications, allow it.',
    commonCauses: [
      'Notifications turned off for the app',
      'Do Not Disturb mode is on',
      'Battery optimization is restricting the app',
      'The app does not have permission to run in the background',
    ],
    relatedErrors: ['android-battery-draining-fast'],
    searchTerms: [
      'notifications not working Android',
      'not getting notifications',
      'no notifications Android',
      'app notifications missing',
    ],
  },
  {
    slug: 'iphone-emergency-sos-mode',
    device: 'iphone',
    errorText: 'SOS Only / Emergency Calls Only',
    plainMeaning:
      'Your iPhone can only make emergency calls (like 911). It is not connected to your normal mobile network.',
    severity: 'high',
    steps: [
      'This may be a temporary coverage issue — try moving to a different location.',
      'Turn Airplane Mode on, wait 30 seconds, then turn it off.',
      'Restart your iPhone.',
      'Check that your SIM card is properly inserted.',
      'Go to Settings > General > About to check for a carrier settings update.',
      'Contact your mobile carrier to make sure your account is active.',
      'If you are in a rural area, you may simply be outside your carrier\'s coverage zone.',
    ],
    prevention:
      'Keep your carrier account active and paid. Know your carrier\'s coverage areas if you travel to rural locations.',
    commonCauses: [
      'Outside your carrier\'s coverage area',
      'SIM card issue',
      'Carrier account suspended or expired',
      'Network outage in your area',
    ],
    relatedErrors: ['iphone-no-service', 'iphone-sim-not-provisioned'],
    searchTerms: [
      'SOS only iPhone',
      'emergency calls only',
      'iPhone SOS mode',
      'iPhone only shows SOS',
    ],
  },
  {
    slug: 'windows-windows-hello-not-working',
    device: 'windows',
    errorText: 'Windows Hello — Couldn\'t Recognize You',
    plainMeaning:
      'Windows Hello face recognition or fingerprint login could not verify your identity. You can still log in with your PIN or password.',
    severity: 'low',
    steps: [
      'Try your PIN or password to log in instead.',
      'Clean the camera lens or fingerprint reader.',
      'Make sure there is adequate lighting for face recognition.',
      'Go to Settings > Accounts > Sign-in Options > Windows Hello and set it up again.',
      'Remove your face/fingerprint data and re-enroll it.',
      'Update your camera or fingerprint reader drivers via Device Manager.',
    ],
    prevention:
      'Keep the camera and fingerprint reader clean. Enroll your face in different lighting conditions for better recognition.',
    commonCauses: [
      'Poor lighting conditions',
      'Dirty camera lens or fingerprint sensor',
      'Wearing glasses or a hat that was not worn during setup',
      'Driver issue after a Windows update',
    ],
    relatedErrors: ['iphone-face-id-not-available', 'android-fingerprint-not-recognized'],
    searchTerms: [
      'Windows Hello not working',
      'face recognition not working Windows',
      'fingerprint not working Windows',
      'Windows Hello error',
    ],
  },
  {
    slug: 'app-venmo-payment-declined',
    device: 'app',
    errorText: 'Venmo — Payment Declined',
    plainMeaning:
      'Venmo could not process your payment. There may be an issue with your linked bank account or card.',
    severity: 'medium',
    steps: [
      'Check your Venmo balance — you may not have enough funds.',
      'Go to Venmo > Settings > Payment Methods and make sure your bank or card is valid.',
      'Try a different payment method (different card or bank account).',
      'Check with your bank — they may have blocked the transaction.',
      'Make sure your Venmo account is verified with your identity.',
      'Contact Venmo support if the problem persists.',
    ],
    prevention:
      'Keep your payment methods up to date. Verify your Venmo account. Keep sufficient funds in your linked account.',
    commonCauses: [
      'Insufficient funds in Venmo balance or bank account',
      'Bank blocked the transaction for security',
      'Expired card on file',
      'Venmo spending limits reached',
    ],
    relatedErrors: ['app-amazon-payment-declined'],
    searchTerms: [
      'Venmo payment declined',
      'Venmo not working',
      'Venmo transaction failed',
      'Venmo payment error',
    ],
  },
  {
    slug: 'iphone-do-not-disturb-on',
    device: 'iphone',
    errorText: 'Not Receiving Calls or Messages (Focus / Do Not Disturb)',
    plainMeaning:
      'Your iPhone is in Do Not Disturb or Focus mode, which silences calls, messages, and notifications. People may think you are ignoring them.',
    severity: 'low',
    steps: [
      'Look for a crescent moon or Focus icon in the top status bar.',
      'Swipe down from the top-right corner to open Control Center.',
      'Tap the Focus or Do Not Disturb button to turn it off.',
      'Go to Settings > Focus to review all your Focus modes.',
      'Check if a Focus schedule is set to turn on automatically.',
      'After turning it off, check for missed calls and messages.',
    ],
    prevention:
      'Be aware of when Do Not Disturb turns on. Review Focus schedules in Settings to avoid missing important calls.',
    commonCauses: [
      'Do Not Disturb was turned on accidentally',
      'A Focus mode schedule activated automatically',
      'Sleep Focus or Driving Focus turned on',
    ],
    relatedErrors: ['iphone-call-failed'],
    searchTerms: [
      'iPhone not getting calls',
      'Do Not Disturb stuck',
      'Focus mode iPhone',
      'phone not ringing iPhone',
      'iPhone silent mode',
    ],
  },
  {
    slug: 'browser-cors-error',
    device: 'browser',
    errorText: 'Access Blocked — CORS Policy Error',
    plainMeaning:
      'The website has a technical issue preventing it from loading content properly. This is a website developer problem, not something wrong with your browser.',
    severity: 'low',
    steps: [
      'Try refreshing the page.',
      'Clear your browser cache and cookies.',
      'Try a different browser.',
      'If the website has a mobile app, try using that instead.',
      'This is ultimately a problem the website developers need to fix on their end.',
      'If it is a website you use regularly, contact them to report the issue.',
    ],
    prevention:
      'This is a server-side issue and cannot be prevented on your end. Try using the website\'s mobile app as an alternative.',
    commonCauses: [
      'The website\'s security settings are misconfigured',
      'A website update broke cross-origin resource sharing',
      'The website is trying to load content from a blocked source',
    ],
    relatedErrors: ['browser-500-internal-server-error', 'browser-javascript-error'],
    searchTerms: [
      'CORS error',
      'access blocked browser',
      'cross-origin error',
      'website blocked by CORS',
    ],
  },
  {
    slug: 'android-screen-not-rotating',
    device: 'android',
    errorText: 'Screen Not Rotating / Auto-Rotate Not Working',
    plainMeaning:
      'Your phone screen is stuck in one orientation and will not rotate when you turn the phone sideways. Auto-rotate may be turned off.',
    severity: 'low',
    steps: [
      'Swipe down from the top of the screen to open Quick Settings.',
      'Look for "Auto-Rotate" or a rotation icon and tap it to turn it on.',
      'If auto-rotate is already on, try turning it off and back on.',
      'Restart your phone.',
      'Some apps lock the screen orientation — try rotating in a different app.',
      'If nothing works, the gyroscope sensor may need calibration: search for a "Sensor Test" app in the Play Store.',
    ],
    prevention:
      'Keep auto-rotate enabled. If you prefer portrait mode, remember to enable auto-rotate when watching videos.',
    commonCauses: [
      'Auto-rotate is turned off',
      'The current app has locked the orientation',
      'A software glitch',
      'The gyroscope sensor has a problem (rare)',
    ],
    relatedErrors: [],
    searchTerms: [
      'screen not rotating Android',
      'auto rotate not working',
      'phone screen stuck',
      'screen won\'t rotate',
    ],
  },
  {
    slug: 'app-health-app-not-tracking',
    device: 'app',
    errorText: 'Apple Health / Google Fit — Steps Not Being Counted',
    plainMeaning:
      'Your health app is not recording your steps or activity. The motion sensor or app permissions may need adjusting.',
    severity: 'low',
    steps: [
      'On iPhone: go to Settings > Privacy & Security > Motion & Fitness and turn on "Fitness Tracking".',
      'On Android: go to Settings > Apps > Google Fit > Permissions and allow "Physical Activity".',
      'Make sure the Health/Fit app is not restricted by battery optimization.',
      'Carry your phone in your pocket or bag while walking — it needs to detect motion.',
      'Open the Health/Fit app and check that step counting is enabled.',
      'Restart your phone and take a short walk to test.',
    ],
    prevention:
      'Keep motion and fitness permissions enabled. Carry your phone with you during walks and exercise.',
    commonCauses: [
      'Fitness tracking permission turned off',
      'Battery optimization restricting the app',
      'Phone is not being carried (left on a table)',
      'A software bug after an update',
    ],
    relatedErrors: ['iphone-location-services-error'],
    searchTerms: [
      'steps not counting iPhone',
      'Google Fit not tracking',
      'Health app not working',
      'pedometer not working phone',
    ],
  },
  {
    slug: 'windows-clock-wrong',
    device: 'windows',
    errorText: 'Clock Is Wrong / Time Not Syncing',
    plainMeaning:
      'Your computer\'s clock is showing the wrong time. This can cause problems with websites, email, and other services.',
    severity: 'medium',
    steps: [
      'Right-click the clock in the taskbar and choose "Adjust date and time".',
      'Turn on "Set time automatically".',
      'Make sure "Set time zone automatically" is also on.',
      'Click "Sync Now" to force an immediate time sync.',
      'If the time keeps drifting, your computer\'s internal battery (CMOS battery) may need replacing — this is a small battery on the motherboard.',
      'Restart your computer after correcting the time.',
    ],
    prevention:
      'Keep automatic time sync enabled. If you travel, make sure automatic time zone is on.',
    commonCauses: [
      'Automatic time sync is turned off',
      'The CMOS battery is dead (on older computers)',
      'Time zone set incorrectly',
      'A software conflict preventing time sync',
    ],
    relatedErrors: ['wifi-wrong-time-date', 'browser-certificate-error'],
    searchTerms: [
      'Windows clock wrong',
      'computer time wrong',
      'time not syncing Windows',
      'Windows time incorrect',
    ],
  },
  {
    slug: 'app-ring-doorbell-offline',
    device: 'app',
    errorText: 'Ring Doorbell — Device Offline',
    plainMeaning:
      'Your Ring doorbell or camera is not connected to Wi-Fi and cannot send you alerts or show live video.',
    severity: 'medium',
    steps: [
      'Check your Wi-Fi router — restart it if needed.',
      'Check that the Ring device has power (wired models: check wiring; battery models: charge the battery).',
      'Open the Ring app and go to Device Health to check the signal strength.',
      'If the signal is weak, move your router closer or get a Ring Chime Pro to extend the Wi-Fi range.',
      'Press the setup button on the Ring device and reconnect it to Wi-Fi through the app.',
      'Make sure your Wi-Fi password has not changed recently.',
    ],
    prevention:
      'Keep your Ring device within strong Wi-Fi range. For battery models, recharge regularly. Use a Ring Chime Pro if the doorbell is far from the router.',
    commonCauses: [
      'Wi-Fi router lost connection or restarted',
      'Ring device battery is dead',
      'Wi-Fi password was changed',
      'Weak Wi-Fi signal at the door',
    ],
    relatedErrors: ['wifi-connected-no-internet', 'app-alexa-not-responding'],
    searchTerms: [
      'Ring doorbell offline',
      'Ring camera not working',
      'Ring device disconnected',
      'Ring app says offline',
    ],
  },
]

// ── Combined Database ───────────────────────────────────────────────────────

export const ALL_ERRORS: ErrorEntry[] = [
  ...iphoneErrors,
  ...androidErrors,
  ...windowsErrors,
  ...browserErrors,
  ...wifiErrors,
  ...appErrors,
  ...macErrors,
  ...additionalErrors,
]

// ── Device Categories ───────────────────────────────────────────────────────

function countByDevice(device: DeviceType): number {
  return ALL_ERRORS.filter((e) => e.device === device).length
}

export const DEVICE_CATEGORIES: DeviceCategory[] = [
  { slug: 'iphone', label: 'iPhone & iPad', icon: '📱', count: countByDevice('iphone') },
  { slug: 'android', label: 'Android', icon: '🤖', count: countByDevice('android') },
  { slug: 'windows', label: 'Windows PC', icon: '💻', count: countByDevice('windows') },
  { slug: 'mac', label: 'Mac', icon: '🍎', count: countByDevice('mac') },
  { slug: 'browser', label: 'Web Browser', icon: '🌐', count: countByDevice('browser') },
  { slug: 'wifi', label: 'Wi-Fi & Internet', icon: '📶', count: countByDevice('wifi') },
  { slug: 'app', label: 'Popular Apps', icon: '📲', count: countByDevice('app') },
]

// ── Helper Functions ────────────────────────────────────────────────────────

export function getAllErrors(): ErrorEntry[] {
  return ALL_ERRORS
}

export function getErrorBySlug(slug: string): ErrorEntry | undefined {
  return ALL_ERRORS.find((e) => e.slug === slug)
}

export function getErrorsByDevice(device: DeviceType): ErrorEntry[] {
  return ALL_ERRORS.filter((e) => e.device === device)
}

export function searchErrors(query: string): ErrorEntry[] {
  if (!query.trim()) return []
  const q = query.toLowerCase().trim()
  const words = q.split(/\s+/)

  return ALL_ERRORS.map((error) => {
    let score = 0
    const errorTextLower = error.errorText.toLowerCase()
    const meaningLower = error.plainMeaning.toLowerCase()

    // Exact match on error text — highest priority
    if (errorTextLower === q) score += 100
    // Error text contains the full query
    else if (errorTextLower.includes(q)) score += 60

    // Search terms match
    for (const term of error.searchTerms) {
      const termLower = term.toLowerCase()
      if (termLower === q) score += 80
      else if (termLower.includes(q)) score += 40
      else {
        // Individual word matching
        for (const word of words) {
          if (word.length >= 3 && termLower.includes(word)) score += 15
        }
      }
    }

    // Individual word matching on error text
    for (const word of words) {
      if (word.length >= 3 && errorTextLower.includes(word)) score += 20
      if (word.length >= 3 && meaningLower.includes(word)) score += 5
    }

    // Device name match
    if (error.device.includes(q) || q.includes(error.device)) score += 10

    // Common causes match
    for (const cause of error.commonCauses) {
      for (const word of words) {
        if (word.length >= 3 && cause.toLowerCase().includes(word)) score += 3
      }
    }

    return { error, score }
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.error)
}

export function getPopularErrors(): ErrorEntry[] {
  const popularSlugs = [
    'wifi-connected-no-internet',
    'iphone-storage-almost-full',
    'browser-connection-not-private',
    'android-unfortunately-app-stopped',
    'windows-blue-screen-of-death',
    'iphone-no-service',
    'iphone-icloud-storage-full',
    'wifi-keeps-disconnecting',
    'android-insufficient-storage',
    'browser-404-not-found',
    'app-whatsapp-waiting-network',
    'iphone-disabled',
    'windows-update-error',
    'android-wifi-authentication-error',
    'app-netflix-nw-2-5',
    'wifi-dns-not-responding',
    'browser-site-cant-be-reached',
    'iphone-software-update-failed',
    'mac-spinning-wheel',
    'app-zoom-error-5003',
  ]
  return popularSlugs
    .map((slug) => getErrorBySlug(slug))
    .filter((e): e is ErrorEntry => e !== undefined)
}
