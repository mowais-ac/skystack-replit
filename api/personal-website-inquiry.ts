import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const personalWebsiteInquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  currentWebsite: z.string().optional(),
  profession: z.string().optional(),
  goals: z.string().optional()
});

async function sendToSlack(title: string, fields: { type: string; text: string }[], additionalInfo?: string) {
  const webhookUrl = process.env.SLACK_WEBHOOK;
  if (!webhookUrl) {
    console.warn("SLACK_WEBHOOK not configured");
    return;
  }

  const blocks: any[] = [
    { type: "header", text: { type: "plain_text", text: title, emoji: false } },
    { type: "section", fields }
  ];

  if (additionalInfo) {
    blocks.push({ type: "section", text: { type: "mrkdwn", text: additionalInfo } });
  }

  blocks.push({
    type: "context",
    elements: [{ type: "mrkdwn", text: `Received at ${new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" })} (Saudi Time)` }]
  });

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
    const data = personalWebsiteInquirySchema.parse(req.body);
    
    await sendToSlack(
      "🌐 New Personal Website Inquiry — $2,000 Package",
      [
        { type: "mrkdwn", text: `*Name:*\n${data.name}` },
        { type: "mrkdwn", text: `*Email:*\n${data.email}` },
        { type: "mrkdwn", text: `*Phone:*\n${data.phone}` },
        { type: "mrkdwn", text: `*Profession:*\n${data.profession || "Not specified"}` },
        { type: "mrkdwn", text: `*Current Website:*\n${data.currentWebsite || "None"}` },
        { type: "mrkdwn", text: `*Package:*\nPersonal Website ($2,000)` }
      ],
      data.goals ? `*Goals:*\n${data.goals}` : undefined
    );
    
    res.status(201).json({ success: true, message: "Inquiry sent successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid input", details: error.errors });
    } else {
      console.error("Personal website inquiry error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
