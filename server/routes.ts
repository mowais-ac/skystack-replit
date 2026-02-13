import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { api } from "@shared/routes";
import { z } from "zod";

interface SlackField {
  type: string;
  text: string;
}

async function sendToSlack(title: string, fields: SlackField[], additionalInfo?: string) {
  const webhookUrl = process.env.SLACK_WEBHOOK;
  if (!webhookUrl) {
    console.warn("SLACK_WEBHOOK not configured, skipping Slack notification");
    return;
  }

  const blocks: any[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: title,
        emoji: false
      }
    },
    {
      type: "section",
      fields: fields
    }
  ];

  if (additionalInfo) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: additionalInfo
      }
    });
  }

  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `Received at ${new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" })} (Saudi Time)`
      }
    ]
  });

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks })
    });
  } catch (error) {
    console.error("Failed to send Slack notification:", error);
  }
}

const roleSelectionSchema = z.object({
  roleId: z.string(),
  quantity: z.number().int().positive().max(50)
});

const outsourcingInquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  company: z.string().optional(),
  selectedRoles: z.array(roleSelectionSchema).min(1),
  timeline: z.string(),
  message: z.string().optional()
});

const personalWebsiteInquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  currentWebsite: z.string().optional(),
  profession: z.string().optional(),
  goals: z.string().optional()
});

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

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // General contact form
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      await storage.createContactSubmission(data);
      
      await sendToSlack(
        "New Lead from SkyStack Website",
        [
          { type: "mrkdwn", text: `*Name:*\n${data.name}` },
          { type: "mrkdwn", text: `*Email:*\n${data.email}` },
          { type: "mrkdwn", text: `*Phone:*\n${data.phone}` },
          { type: "mrkdwn", text: `*Company:*\n${data.company || "Not provided"}` }
        ],
        `*Message:*\n${data.message}`
      );
      
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", details: error.errors });
      } else {
        console.error("Contact submission error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Outsourcing inquiry form
  app.post("/api/outsourcing-inquiry", async (req, res) => {
    try {
      const data = outsourcingInquirySchema.parse(req.body);
      
      const totalHeadcount = data.selectedRoles.reduce((sum, r) => sum + r.quantity, 0);
      const rolesFormatted = data.selectedRoles.map(r => `- ${r.roleId} x ${r.quantity}`).join("\n");
      
      await sendToSlack(
        "New Outsourcing Inquiry",
        [
          { type: "mrkdwn", text: `*Name:*\n${data.name}` },
          { type: "mrkdwn", text: `*Email:*\n${data.email}` },
          { type: "mrkdwn", text: `*Phone:*\n${data.phone}` },
          { type: "mrkdwn", text: `*Company:*\n${data.company || "Not provided"}` },
          { type: "mrkdwn", text: `*Total Headcount:*\n${totalHeadcount}` },
          { type: "mrkdwn", text: `*Timeline:*\n${data.timeline}` }
        ],
        `*Roles Requested:*\n${rolesFormatted}${data.message ? `\n\n*Additional Notes:*\n${data.message}` : ""}`
      );
      
      res.status(201).json({ success: true, message: "Inquiry sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", details: error.errors });
      } else {
        console.error("Outsourcing inquiry error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Service inquiry form
  app.post("/api/service-inquiry", async (req, res) => {
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
  });

  // Personal website inquiry form
  app.post("/api/personal-website-inquiry", async (req, res) => {
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
  });

  // Language selection notification
  app.post("/api/language-selected", async (req, res) => {
    try {
      const { language } = req.body;
      const languageDisplay = language === "ar" ? "Arabic (العربية)" : "English";
      
      await sendToSlack(
        "New Visitor Language Selection",
        [
          { type: "mrkdwn", text: `*Language Selected:*\n${languageDisplay}` },
          { type: "mrkdwn", text: `*User Agent:*\n${req.headers["user-agent"]?.slice(0, 100) || "Unknown"}` }
        ]
      );
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Language notification error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
