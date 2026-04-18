#!/bin/bash
# Post-deploy smoke tests for techfor60s 50-piece sprint (2026-04-18).
set -u

URLS=(
  "https://techfor60s.com/"
  "https://techfor60s.com/blog/irs-impersonation-scam-how-to-spot-2026"
  "https://techfor60s.com/blog/grandparent-scam-ai-voice-clone-2026-guide"
  "https://techfor60s.com/blog/whatsapp-android-to-iphone-chat-transfer-2026"
  "https://techfor60s.com/blog/social-security-claim-timing-62-67-70-2026"
  "https://techfor60s.com/blog/medicare-telehealth-2026-whats-covered-walkthrough"
  "https://techfor60s.com/scam-message-checker"
  "https://techfor60s.com/password-checker"
  "https://techfor60s.com/social-security-claiming-age-calculator"
  "https://techfor60s.com/blog/aadhaar-otp-phishing-protection-guide"
)

fails=0
echo "Smoke-testing ${#URLS[@]} URLs..."
echo ""
for url in "${URLS[@]}"; do
  code=$(curl -sS -o /dev/null -w "%{http_code}" -L --max-time 15 "$url" || echo "ERR")
  if [ "$code" = "200" ]; then
    printf "  [ OK  ] %3s  %s\n" "$code" "$url"
  else
    printf "  [FAIL ] %3s  %s\n" "$code" "$url"
    fails=$((fails + 1))
  fi
done

echo ""
if [ $fails -eq 0 ]; then
  echo "ALL ${#URLS[@]} PASS"
  exit 0
else
  echo "$fails of ${#URLS[@]} FAILED"
  exit 1
fi
