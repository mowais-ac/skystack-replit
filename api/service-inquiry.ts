import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const serviceInquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  company: z.string().optional(),
  serviceName: z.string(),
  projectType: z.string(),
  budget: z.string(),
  timeline: z.string(),
  message: z.string().optional()
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
    const data = serviceInquirySchema.parse(req.body);
    
    await sendToSlack(
      `New Service Inquiry: ${data.serviceName}`,
      [
        { type: "mrkdwn", text: `*Name:*\n${data.name}` },
        { type: "mrkdwn", text: `*Email:*\n${data.email}` },
        { type: "mrkdwn", text: `*Phone:*\n${data.phone}` },
        { type: "mrkdwn", text: `*Company:*\n${data.company || "Not provided"}` },
        { type: "mrkdwn", text: `*Service:*\n${data.serviceName}` },
        { type: "mrkdwn", text: `*Project Type:*\n${data.projectType}` },
        { type: "mrkdwn", text: `*Budget:*\n${data.budget}` },
        { type: "mrkdwn", text: `*Timeline:*\n${data.timeline}` }
      ],
      data.message ? `*Project Details:*\n${data.message}` : undefined
    );
    
    res.status(201).json({ success: true, message: "Inquiry sent successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid input", details: error.errors });
    } else {
      console.error("Service inquiry error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
