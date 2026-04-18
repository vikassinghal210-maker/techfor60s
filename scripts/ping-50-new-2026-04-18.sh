#!/bin/bash
# IndexNow ping for 50 new techfor60s URLs (2026-04-18).
# Hits api.indexnow.org directly — protocol-public key.

set -e

INDEXNOW_KEY="283a0d9f13302e4a28e4226f1a260841"
SITE_URL="https://techfor60s.com"

PAYLOAD=$(cat <<EOF
{
  "host": "techfor60s.com",
  "key": "${INDEXNOW_KEY}",
  "keyLocation": "${SITE_URL}/${INDEXNOW_KEY}.txt",
  "urlList": [
    "${SITE_URL}/blog/irs-impersonation-scam-how-to-spot-2026",
    "${SITE_URL}/blog/social-security-administration-phone-scam-guide",
    "${SITE_URL}/blog/grandparent-scam-ai-voice-clone-2026-guide",
    "${SITE_URL}/blog/medicare-prescription-cap-2100-scam-2026",
    "${SITE_URL}/blog/medicare-card-replacement-scam-guide-2026",
    "${SITE_URL}/blog/hmrc-tax-rebate-scam-uk-seniors-guide",
    "${SITE_URL}/blog/ato-tax-refund-scam-australia-seniors",
    "${SITE_URL}/blog/zelle-venmo-paypal-refund-scam-guide",
    "${SITE_URL}/blog/tech-support-popup-scam-microsoft-apple-2026",
    "${SITE_URL}/blog/amazon-order-confirmation-phishing-scam",
    "${SITE_URL}/blog/romance-scam-red-flags-seniors-2026",
    "${SITE_URL}/blog/crypto-investment-scam-seniors-guide",
    "${SITE_URL}/blog/utility-shutoff-scam-electric-gas-water",
    "${SITE_URL}/blog/whatsapp-android-to-iphone-chat-transfer-2026",
    "${SITE_URL}/blog/whatsapp-dual-accounts-iphone-setup-seniors",
    "${SITE_URL}/blog/whatsapp-dropped-old-phones-2026-what-to-do",
    "${SITE_URL}/blog/gmail-ai-summary-seniors-use-or-turn-off",
    "${SITE_URL}/blog/iphone-senior-mode-accessibility-setup-2026",
    "${SITE_URL}/blog/android-samsung-easy-mode-2026-setup",
    "${SITE_URL}/blog/facebook-privacy-settings-seniors-2026-checklist",
    "${SITE_URL}/blog/8-apps-seniors-can-delete-right-now-2026",
    "${SITE_URL}/blog/5-apps-every-senior-needs-nothing-more-2026",
    "${SITE_URL}/blog/why-your-phone-feels-slow-4-fixes-seniors",
    "${SITE_URL}/blog/stop-5-annoying-iphone-behaviors-seniors-2026",
    "${SITE_URL}/blog/stop-5-annoying-android-behaviors-seniors-2026",
    "${SITE_URL}/blog/vpn-vs-incognito-vs-private-dns-plain-english",
    "${SITE_URL}/blog/what-is-the-cloud-really-5-minute-guide",
    "${SITE_URL}/blog/2fa-passkeys-seniors-which-to-use-2026",
    "${SITE_URL}/blog/end-to-end-encryption-3-sentences-seniors",
    "${SITE_URL}/blog/cookies-cache-history-plain-english-seniors",
    "${SITE_URL}/blog/medicare-annual-notice-of-change-2026-walkthrough",
    "${SITE_URL}/blog/social-security-claim-timing-62-67-70-2026",
    "${SITE_URL}/blog/mymedicare-gov-account-setup-2026",
    "${SITE_URL}/blog/aarp-membership-2026-worth-it-analysis",
    "${SITE_URL}/blog/uk-state-pension-2026-forecast-check-guide",
    "${SITE_URL}/blog/uk-pension-credit-2026-who-qualifies-how-to-apply",
    "${SITE_URL}/blog/australia-age-pension-mygov-2026-walkthrough",
    "${SITE_URL}/blog/centrelink-online-for-seniors-2026-guide",
    "${SITE_URL}/blog/medicare-telehealth-2026-whats-covered-walkthrough",
    "${SITE_URL}/blog/teladoc-mdlive-amwell-comparison-seniors-2026",
    "${SITE_URL}/blog/nhs-app-for-over-60s-2026-complete-guide",
    "${SITE_URL}/blog/myhealth-record-australia-seniors-2026-walkthrough",
    "${SITE_URL}/blog/blood-pressure-smartwatch-accuracy-2026",
    "${SITE_URL}/blog/continuous-glucose-monitor-seniors-otc-guide",
    "${SITE_URL}/blog/goodrx-vs-amazon-pharmacy-vs-mark-cuban-seniors",
    "${SITE_URL}/blog/power-outage-home-medical-device-backup-guide",
    "${SITE_URL}/blog/emergency-sos-iphone-android-setup-seniors",
    "${SITE_URL}/scam-message-checker",
    "${SITE_URL}/password-checker",
    "${SITE_URL}/social-security-claiming-age-calculator"
  ]
}
EOF
)

echo "Submitting 50 URLs to IndexNow..."
HTTP_CODE=$(curl -sS -o /tmp/indexnow_t60_resp.txt -w "%{http_code}" -X POST https://api.indexnow.org/indexnow \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$PAYLOAD")

echo ""
echo "HTTP $HTTP_CODE"
cat /tmp/indexnow_t60_resp.txt 2>/dev/null || true
echo ""
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "202" ]; then
  echo "Done — 50 URLs submitted."
else
  echo "WARN — IndexNow $HTTP_CODE (check response)."
fi
