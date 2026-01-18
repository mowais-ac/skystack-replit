import type { VercelRequest, VercelResponse } from '@vercel/node';

async function sendToSlack(title: string, fields: { type: string; text: string }[]) {
  const webhookUrl = process.env.SLACK_WEBHOOK;
  if (!webhookUrl) {
    console.warn("SLACK_WEBHOOK not configured");
    return;
  }

  const blocks: any[] = [
    { type: "header", text: { type: "plain_text", text: title, emoji: false } },
    { type: "section", fields },
    {
      type: "context",
      elements: [{ type: "mrkdwn", text: `Received at ${new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" })} (Saudi Time)` }]
    }
  ];

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blocks })
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { language } = req.body;
    const languageDisplay = language === "ar" ? "Arabic (العربية)" : "English";
    
    await sendToSlack(
      "New Visitor Language Selection",
      [
        { type: "mrkdwn", text: `*Language Selected:*\n${languageDisplay}` },
        { type: "mrkdwn", text: `*User Agent:*\n${(req.headers["user-agent"] || "Unknown").slice(0, 100)}` }
      ]
    );
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Language notification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
