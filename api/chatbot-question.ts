import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const chatbotQuestionSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  question: z.string().min(1)
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
    const data = chatbotQuestionSchema.parse(req.body);

    await sendToSlack(
      "❓ Chatbot — Unmatched Question (Needs Follow-up)",
      [
        { type: "mrkdwn", text: `*Name:*\n${data.name}` },
        { type: "mrkdwn", text: `*Email:*\n${data.email}` },
        { type: "mrkdwn", text: `*Phone:*\n${data.phone}` }
      ],
      `*Question:*\n${data.question}`
    );

    res.status(201).json({ success: true, message: "Question forwarded" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid input", details: error.errors });
    } else {
      console.error("Chatbot question error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
