// Generate random alerts for the dashboard
export function generateRandomAlert() {
  const alertTypes = [
    "Phishing Email",
    "Suspicious Login",
    "Malware Detection",
    "Unusual File Access",
    "Network Scan",
    "Privilege Escalation",
    "Data Exfiltration",
    "Brute Force Attempt",
    "Ransomware Activity",
    "DDoS Attack",
    "SQL Injection",
    "Cross-Site Scripting",
    "API Key Exposure",
    "Unauthorized Access",
    "Insider Threat",
  ]

  const timeFrames = ["just now", "1 min ago", "2 min ago", "3 min ago", "5 min ago"]

  const randomId = Math.random().toString(36).substring(2, 10)
  const randomAlertType = alertTypes[Math.floor(Math.random() * alertTypes.length)]
  const randomTimeFrame = timeFrames[Math.floor(Math.random() * timeFrames.length)]

  return {
    id: randomId,
    text: randomAlertType,
    time: randomTimeFrame,
  }
}
