import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LOGO_URL = "https://www.skystack.sa/logo-white-circle.png";
const WHATSAPP_LINK = "https://wa.me/966537430455";
const WEBSITE_URL = "https://skystack.sa";

const outsourcingEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Cut Development Costs by 60% - SkyStack Outsourcing</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; -webkit-font-smoothing: antialiased;">
  <!-- Preheader Text -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    Scale your development team with vetted Saudi talent. 40-60% cost savings, same timezone collaboration.
  </div>
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);">
          
          <!-- Hero Header with Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%); padding: 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <!-- Logo Bar -->
                <tr>
                  <td style="padding: 28px 40px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <img src="${LOGO_URL}" alt="SkyStack" width="140" style="display: block; border: 0;" />
                        </td>
                        <td align="right">
                          <span style="color: #34d399; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Technology Partner</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Hero Content -->
                <tr>
                  <td style="padding: 20px 40px 50px;">
                    <p style="margin: 0 0 12px; color: #34d399; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Staff Augmentation</p>
                    <h1 style="margin: 0 0 20px; color: #ffffff; font-size: 36px; font-weight: 700; line-height: 1.2;">Cut Development Costs by <span style="color: #34d399;">60%</span></h1>
                    <p style="margin: 0 0 28px; color: #94a3b8; font-size: 18px; line-height: 1.6;">Access pre-vetted Saudi developers ready to deploy within 48 hours. Same timezone, seamless integration, enterprise-grade delivery.</p>
                    
                    <!-- Primary CTA -->
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="border-radius: 8px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); box-shadow: 0 4px 14px 0 rgba(0, 60, 255, 0.4);">
                          <a href="${WEBSITE_URL}/outsourcing" style="display: inline-block; padding: 16px 36px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">Get Your Free Team Assessment</a>
                        </td>
                        <td width="16"></td>
                        <td style="border-radius: 8px; border: 2px solid rgba(255,255,255,0.3);">
                          <a href="${WHATSAPP_LINK}" style="display: inline-block; padding: 14px 28px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">WhatsApp Us</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Stats Bar -->
          <tr>
            <td style="background-color: #003cff; padding: 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="33.33%" style="padding: 24px 20px; text-align: center; border-right: 1px solid rgba(255,255,255,0.2);">
                    <p style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">150+</p>
                    <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Engineers Available</p>
                  </td>
                  <td width="33.33%" style="padding: 24px 20px; text-align: center; border-right: 1px solid rgba(255,255,255,0.2);">
                    <p style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">48hrs</p>
                    <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Deployment Time</p>
                  </td>
                  <td width="33.33%" style="padding: 24px 20px; text-align: center;">
                    <p style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">60%</p>
                    <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Cost Savings</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- The Problem Section -->
          <tr>
            <td style="padding: 50px 40px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 28px; background: linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%); border-radius: 12px; border-left: 4px solid #ef4444;">
                    <p style="margin: 0 0 8px; color: #dc2626; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">The Problem</p>
                    <h3 style="margin: 0 0 12px; color: #0f172a; font-size: 20px; font-weight: 600;">Hiring Tech Talent in Saudi Arabia is Expensive</h3>
                    <p style="margin: 0; color: #64748b; font-size: 15px; line-height: 1.6;">Local senior developers cost SAR 35,000-50,000/month. Recruitment takes 3-6 months. High turnover means constant retraining. Your projects stall while you search.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- The Solution Section -->
          <tr>
            <td style="padding: 0 40px 50px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 28px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-radius: 12px; border-left: 4px solid #22c55e;">
                    <p style="margin: 0 0 8px; color: #16a34a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Our Solution</p>
                    <h3 style="margin: 0 0 12px; color: #0f172a; font-size: 20px; font-weight: 600;">Pre-Vetted Teams Ready in 48 Hours</h3>
                    <p style="margin: 0; color: #64748b; font-size: 15px; line-height: 1.6;">Access our pool of 150+ senior engineers across all tech stacks. Same timezone collaboration. Dedicated project managers. Full IP protection. Scale up or down instantly.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Talent Categories -->
          <tr>
            <td style="padding: 0 40px 50px;">
              <h3 style="margin: 0 0 24px; color: #0f172a; font-size: 22px; font-weight: 700; text-align: center;">Available Talent Categories</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; overflow: hidden;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 4px; color: #1d4ed8; font-size: 24px; font-weight: 700;">SAR 12-20K</p>
                          <p style="margin: 0 0 8px; color: #0f172a; font-weight: 600; font-size: 16px;">Software Engineers</p>
                          <p style="margin: 0; color: #64748b; font-size: 13px;">Full-Stack, Mobile, Backend, Frontend</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; overflow: hidden;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 4px; color: #16a34a; font-size: 24px; font-weight: 700;">SAR 16-28K</p>
                          <p style="margin: 0 0 8px; color: #0f172a; font-weight: 600; font-size: 16px;">Data & AI Specialists</p>
                          <p style="margin: 0; color: #64748b; font-size: 13px;">ML Engineers, Data Scientists, AI/LLM</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); border-radius: 12px; overflow: hidden;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 4px; color: #ca8a04; font-size: 24px; font-weight: 700;">SAR 22-32K</p>
                          <p style="margin: 0 0 8px; color: #0f172a; font-weight: 600; font-size: 16px;">Cloud & DevOps</p>
                          <p style="margin: 0; color: #64748b; font-size: 13px;">AWS, Azure, GCP, Kubernetes, SRE</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%); border-radius: 12px; overflow: hidden;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 4px; color: #a855f7; font-size: 24px; font-weight: 700;">SAR 22-30K</p>
                          <p style="margin: 0 0 8px; color: #0f172a; font-weight: 600; font-size: 16px;">Tech Leadership</p>
                          <p style="margin: 0; color: #64748b; font-size: 13px;">Tech Leads, Architects, Engineering Managers</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- How It Works -->
          <tr>
            <td style="background-color: #f8fafc; padding: 50px 40px;">
              <h3 style="margin: 0 0 32px; color: #0f172a; font-size: 22px; font-weight: 700; text-align: center;">How It Works</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="33.33%" style="padding: 0 8px; text-align: center; vertical-align: top;">
                    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); border-radius: 50%; margin: 0 auto 16px; line-height: 48px; color: #ffffff; font-weight: 700; font-size: 20px;">1</div>
                    <p style="margin: 0 0 8px; color: #0f172a; font-weight: 600; font-size: 16px;">Share Requirements</p>
                    <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Tell us your tech stack, team size, and project scope</p>
                  </td>
                  <td width="33.33%" style="padding: 0 8px; text-align: center; vertical-align: top;">
                    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); border-radius: 50%; margin: 0 auto 16px; line-height: 48px; color: #ffffff; font-weight: 700; font-size: 20px;">2</div>
                    <p style="margin: 0 0 8px; color: #0f172a; font-weight: 600; font-size: 16px;">Review Candidates</p>
                    <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Receive pre-vetted profiles within 48 hours</p>
                  </td>
                  <td width="33.33%" style="padding: 0 8px; text-align: center; vertical-align: top;">
                    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); border-radius: 50%; margin: 0 auto 16px; line-height: 48px; color: #ffffff; font-weight: 700; font-size: 20px;">3</div>
                    <p style="margin: 0 0 8px; color: #0f172a; font-weight: 600; font-size: 16px;">Start Building</p>
                    <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Onboard your team and begin delivery immediately</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Urgency CTA Section -->
          <tr>
            <td style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); padding: 50px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px; color: #34d399; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Limited Availability</p>
                    <h3 style="margin: 0 0 16px; color: #ffffff; font-size: 28px; font-weight: 700;">Book Your Free Team Assessment</h3>
                    <p style="margin: 0 0 28px; color: #94a3b8; font-size: 16px; line-height: 1.6;">Only 5 assessment slots available this week. Receive a detailed talent matching report and cost analysis.</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                      <tr>
                        <td style="border-radius: 8px; background: linear-gradient(135deg, #34d399 0%, #10b981 100%); box-shadow: 0 4px 14px 0 rgba(52, 211, 153, 0.4);">
                          <a href="${WHATSAPP_LINK}" style="display: inline-block; padding: 18px 40px; color: #0f172a; text-decoration: none; font-weight: 700; font-size: 16px;">Get Your Free Assessment Now</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #020617; padding: 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid #1e293b;">
                    <img src="${LOGO_URL}" alt="SkyStack" width="120" style="display: inline-block; border: 0;" />
                    <p style="margin: 12px 0 0; color: #64748b; font-size: 14px;">Helping Saudi companies build better software</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px; text-align: center;">
                    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 14px;">
                      <a href="${WHATSAPP_LINK}" style="color: #34d399; text-decoration: none; font-weight: 600;">+966 53 743 0455</a> &nbsp;|&nbsp;
                      <a href="mailto:info@skystack.sa" style="color: #94a3b8; text-decoration: none;">info@skystack.sa</a>
                    </p>
                    <p style="margin: 12px 0 0; color: #475569; font-size: 12px;">
                      SkyStack Technology | Riyadh, Saudi Arabia<br>
                      <a href="${WEBSITE_URL}" style="color: #475569; text-decoration: none;">skystack.sa</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const allServicesEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Transform Your Business with Custom Software - SkyStack</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; -webkit-font-smoothing: antialiased;">
  <!-- Preheader Text -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    Automate operations and reduce manual work with custom software built by Saudi's leading technology partner.
  </div>
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);">
          
          <!-- Hero Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%); padding: 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 28px 40px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <img src="${LOGO_URL}" alt="SkyStack" width="140" style="display: block; border: 0;" />
                        </td>
                        <td align="right">
                          <span style="color: #34d399; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Technology Partner</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 40px 50px;">
                    <p style="margin: 0 0 12px; color: #34d399; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Software Development</p>
                    <h1 style="margin: 0 0 20px; color: #ffffff; font-size: 34px; font-weight: 700; line-height: 1.2;">Automate Your Operations.<br><span style="color: #34d399;">Reduce Manual Work.</span></h1>
                    <p style="margin: 0 0 28px; color: #94a3b8; font-size: 18px; line-height: 1.6;">We help Saudi companies build and modernize business software. From mobile apps to enterprise platforms, we deliver technology that drives real results.</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="border-radius: 8px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); box-shadow: 0 4px 14px 0 rgba(0, 60, 255, 0.4);">
                          <a href="${WEBSITE_URL}/contact-us" style="display: inline-block; padding: 16px 36px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">Book a Free Consultation</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Stats Section -->
          <tr>
            <td style="padding: 50px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 16px; overflow: hidden;">
                <tr>
                  <td width="33.33%" style="padding: 32px 20px; text-align: center; border-right: 1px solid #334155;">
                    <p style="margin: 0; color: #34d399; font-size: 36px; font-weight: 700;">150+</p>
                    <p style="margin: 8px 0 0; color: #94a3b8; font-size: 14px;">Projects Delivered</p>
                  </td>
                  <td width="33.33%" style="padding: 32px 20px; text-align: center; border-right: 1px solid #334155;">
                    <p style="margin: 0; color: #34d399; font-size: 36px; font-weight: 700;">50+</p>
                    <p style="margin: 8px 0 0; color: #94a3b8; font-size: 14px;">Enterprise Clients</p>
                  </td>
                  <td width="33.33%" style="padding: 32px 20px; text-align: center;">
                    <p style="margin: 0; color: #34d399; font-size: 36px; font-weight: 700;">8+</p>
                    <p style="margin: 8px 0 0; color: #94a3b8; font-size: 14px;">Years Experience</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Services Section -->
          <tr>
            <td style="padding: 0 40px 50px;">
              <h3 style="margin: 0 0 8px; color: #0f172a; font-size: 24px; font-weight: 700; text-align: center;">What We Build</h3>
              <p style="margin: 0 0 32px; color: #64748b; font-size: 16px; text-align: center;">End-to-end software solutions for modern businesses</p>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #003cff;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 8px; color: #0f172a; font-weight: 700; font-size: 16px;">Mobile App Development</p>
                          <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Native iOS & Android apps with React Native and Flutter</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #003cff;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 8px; color: #0f172a; font-weight: 700; font-size: 16px;">Web Development</p>
                          <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Enterprise portals, SaaS platforms, and admin dashboards</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #003cff;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 8px; color: #0f172a; font-weight: 700; font-size: 16px;">On-Demand Platforms</p>
                          <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Uber-like apps with real-time GPS and payments</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #003cff;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 8px; color: #0f172a; font-weight: 700; font-size: 16px;">E-Commerce Solutions</p>
                          <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Multi-vendor marketplaces and online stores</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #003cff;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 8px; color: #0f172a; font-weight: 700; font-size: 16px;">UI/UX Design</p>
                          <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">User-centered design that converts visitors to customers</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #003cff;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 8px; color: #0f172a; font-weight: 700; font-size: 16px;">Tech Consulting</p>
                          <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Strategic IT advisory and digital transformation</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Process Section -->
          <tr>
            <td style="background-color: #f8fafc; padding: 50px 40px;">
              <h3 style="margin: 0 0 32px; color: #0f172a; font-size: 22px; font-weight: 700; text-align: center;">Our Process</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="25%" style="padding: 0 8px; text-align: center; vertical-align: top;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); border-radius: 50%; margin: 0 auto 12px; line-height: 40px; color: #ffffff; font-weight: 700; font-size: 16px;">1</div>
                    <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 14px;">Discovery</p>
                  </td>
                  <td width="25%" style="padding: 0 8px; text-align: center; vertical-align: top;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); border-radius: 50%; margin: 0 auto 12px; line-height: 40px; color: #ffffff; font-weight: 700; font-size: 16px;">2</div>
                    <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 14px;">Design</p>
                  </td>
                  <td width="25%" style="padding: 0 8px; text-align: center; vertical-align: top;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); border-radius: 50%; margin: 0 auto 12px; line-height: 40px; color: #ffffff; font-weight: 700; font-size: 16px;">3</div>
                    <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 14px;">Develop</p>
                  </td>
                  <td width="25%" style="padding: 0 8px; text-align: center; vertical-align: top;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); border-radius: 50%; margin: 0 auto 12px; line-height: 40px; color: #ffffff; font-weight: 700; font-size: 16px;">4</div>
                    <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 14px;">Deploy</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CTA Section -->
          <tr>
            <td style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); padding: 50px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px; color: #34d399; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Free Consultation</p>
                    <h3 style="margin: 0 0 16px; color: #ffffff; font-size: 28px; font-weight: 700;">Let's Discuss Your Project</h3>
                    <p style="margin: 0 0 28px; color: #94a3b8; font-size: 16px; line-height: 1.6;">Book a 30-minute call with our technical team. We'll analyze your requirements and provide a detailed proposal.</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                      <tr>
                        <td style="border-radius: 8px; background: linear-gradient(135deg, #34d399 0%, #10b981 100%); box-shadow: 0 4px 14px 0 rgba(52, 211, 153, 0.4);">
                          <a href="${WHATSAPP_LINK}" style="display: inline-block; padding: 18px 40px; color: #0f172a; text-decoration: none; font-weight: 700; font-size: 16px;">Schedule Your Free Call</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #020617; padding: 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid #1e293b;">
                    <img src="${LOGO_URL}" alt="SkyStack" width="120" style="display: inline-block; border: 0;" />
                    <p style="margin: 12px 0 0; color: #64748b; font-size: 14px;">Helping Saudi companies build better software</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px; text-align: center;">
                    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 14px;">
                      <a href="${WHATSAPP_LINK}" style="color: #34d399; text-decoration: none; font-weight: 600;">+966 53 743 0455</a> &nbsp;|&nbsp;
                      <a href="mailto:info@skystack.sa" style="color: #94a3b8; text-decoration: none;">info@skystack.sa</a>
                    </p>
                    <p style="margin: 12px 0 0; color: #475569; font-size: 12px;">
                      SkyStack Technology | Riyadh, Saudi Arabia<br>
                      <a href="${WEBSITE_URL}" style="color: #475569; text-decoration: none;">skystack.sa</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

interface ServiceTemplate {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  benefits: string[];
  techStack: string[];
  slug: string;
  ctaText: string;
  stat1: { value: string; label: string };
  stat2: { value: string; label: string };
  stat3: { value: string; label: string };
}

const generateServiceEmailTemplate = (service: ServiceTemplate) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${service.tagline} - SkyStack</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; -webkit-font-smoothing: antialiased;">
  <!-- Preheader -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    ${service.description}
  </div>
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);">
          
          <!-- Hero Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%); padding: 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 28px 40px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <img src="${LOGO_URL}" alt="SkyStack" width="140" style="display: block; border: 0;" />
                        </td>
                        <td align="right">
                          <span style="color: #34d399; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">${service.subtitle}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 40px 50px;">
                    <p style="margin: 0 0 12px; color: #34d399; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">${service.title}</p>
                    <h1 style="margin: 0 0 20px; color: #ffffff; font-size: 32px; font-weight: 700; line-height: 1.2;">${service.tagline}</h1>
                    <p style="margin: 0 0 28px; color: #94a3b8; font-size: 17px; line-height: 1.6;">${service.description}</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="border-radius: 8px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); box-shadow: 0 4px 14px 0 rgba(0, 60, 255, 0.4);">
                          <a href="${WEBSITE_URL}/services/${service.slug}" style="display: inline-block; padding: 16px 36px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">${service.ctaText}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Stats Bar -->
          <tr>
            <td style="background-color: #003cff; padding: 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="33.33%" style="padding: 24px 20px; text-align: center; border-right: 1px solid rgba(255,255,255,0.2);">
                    <p style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">${service.stat1.value}</p>
                    <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${service.stat1.label}</p>
                  </td>
                  <td width="33.33%" style="padding: 24px 20px; text-align: center; border-right: 1px solid rgba(255,255,255,0.2);">
                    <p style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">${service.stat2.value}</p>
                    <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${service.stat2.label}</p>
                  </td>
                  <td width="33.33%" style="padding: 24px 20px; text-align: center;">
                    <p style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">${service.stat3.value}</p>
                    <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${service.stat3.label}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Problem Section -->
          <tr>
            <td style="padding: 50px 40px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 28px; background: linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%); border-radius: 12px; border-left: 4px solid #ef4444;">
                    <p style="margin: 0 0 8px; color: #dc2626; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">The Challenge</p>
                    <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.7;">${service.problem}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Solution Section -->
          <tr>
            <td style="padding: 0 40px 50px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 28px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-radius: 12px; border-left: 4px solid #22c55e;">
                    <p style="margin: 0 0 8px; color: #16a34a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Our Solution</p>
                    <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.7;">${service.solution}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Features Section -->
          <tr>
            <td style="padding: 0 40px 50px;">
              <h3 style="margin: 0 0 24px; color: #0f172a; font-size: 22px; font-weight: 700;">What You Get</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${service.features.map((feature, i) => `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="32" style="vertical-align: top;">
                          <div style="width: 24px; height: 24px; background: linear-gradient(135deg, #34d399 0%, #10b981 100%); border-radius: 50%; text-align: center; line-height: 24px; color: #ffffff; font-size: 14px; font-weight: 700;">&#10003;</div>
                        </td>
                        <td style="padding-left: 12px;">
                          <p style="margin: 0; color: #0f172a; font-size: 15px; font-weight: 500;">${feature}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join('')}
              </table>
            </td>
          </tr>
          
          <!-- Benefits Section -->
          <tr>
            <td style="background-color: #f8fafc; padding: 50px 40px;">
              <h3 style="margin: 0 0 24px; color: #0f172a; font-size: 22px; font-weight: 700; text-align: center;">Why Choose SkyStack</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  ${service.benefits.slice(0, 3).map(benefit => `
                  <td width="33.33%" style="padding: 0 8px; text-align: center; vertical-align: top;">
                    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); border-radius: 12px; margin: 0 auto 16px; line-height: 48px; color: #ffffff; font-size: 20px;">&#9733;</div>
                    <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 15px; line-height: 1.5;">${benefit}</p>
                  </td>`).join('')}
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Tech Stack -->
          <tr>
            <td style="padding: 50px 40px;">
              <h3 style="margin: 0 0 20px; color: #0f172a; font-size: 18px; font-weight: 700; text-align: center;">Technologies We Use</h3>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  ${service.techStack.slice(0, 6).map(tech => `<td style="padding: 4px;"><span style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); color: #1d4ed8; border-radius: 6px; font-size: 13px; font-weight: 600;">${tech}</span></td>`).join('')}
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CTA Section -->
          <tr>
            <td style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); padding: 50px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px; color: #34d399; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Free Consultation</p>
                    <h3 style="margin: 0 0 16px; color: #ffffff; font-size: 26px; font-weight: 700;">Ready to Get Started?</h3>
                    <p style="margin: 0 0 28px; color: #94a3b8; font-size: 16px; line-height: 1.6;">Book a free 30-minute consultation with our experts. We'll analyze your requirements and provide a detailed proposal.</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                      <tr>
                        <td style="border-radius: 8px; background: linear-gradient(135deg, #34d399 0%, #10b981 100%); box-shadow: 0 4px 14px 0 rgba(52, 211, 153, 0.4);">
                          <a href="${WHATSAPP_LINK}" style="display: inline-block; padding: 18px 40px; color: #0f172a; text-decoration: none; font-weight: 700; font-size: 16px;">WhatsApp Us Now</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 20px 0 0; color: #64748b; font-size: 13px;">Or call us: <a href="tel:+966537430455" style="color: #34d399; text-decoration: none;">+966 53 743 0455</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #020617; padding: 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid #1e293b;">
                    <img src="${LOGO_URL}" alt="SkyStack" width="120" style="display: inline-block; border: 0;" />
                    <p style="margin: 12px 0 0; color: #64748b; font-size: 14px;">Helping Saudi companies build better software</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px; text-align: center;">
                    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 14px;">
                      <a href="${WHATSAPP_LINK}" style="color: #34d399; text-decoration: none; font-weight: 600;">+966 53 743 0455</a> &nbsp;|&nbsp;
                      <a href="mailto:info@skystack.sa" style="color: #94a3b8; text-decoration: none;">info@skystack.sa</a>
                    </p>
                    <p style="margin: 12px 0 0; color: #475569; font-size: 12px;">
                      SkyStack Technology | Riyadh, Saudi Arabia<br>
                      <a href="${WEBSITE_URL}" style="color: #475569; text-decoration: none;">skystack.sa</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const serviceTemplates: ServiceTemplate[] = [
  {
    id: "mobile-app",
    title: "Mobile App Development",
    subtitle: "Native iOS & Android",
    tagline: "Launch Your Mobile App in 12 Weeks",
    description: "Build high-performance mobile applications that your customers love. Native iOS and Android apps with cross-platform efficiency.",
    problem: "Your customers expect seamless mobile experiences. Off-the-shelf apps don't fit your unique business processes. Building in-house is expensive and takes forever. Every month without a mobile presence means lost customers to competitors.",
    solution: "We build custom mobile apps using React Native and Flutter that launch 40% faster than traditional development. Our apps support offline mode, real-time sync, biometric security, and integrate with your existing systems.",
    features: ["Native iOS & Android from single codebase", "Offline-first architecture", "Real-time push notifications", "Biometric authentication", "In-app analytics dashboard", "Backend API integration"],
    benefits: ["40% faster time-to-market", "Enterprise-grade security", "Ongoing support & updates"],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "AWS"],
    slug: "custom-mobile-app-development",
    ctaText: "Get a Free App Estimate",
    stat1: { value: "12 Wks", label: "Avg Launch Time" },
    stat2: { value: "50+", label: "Apps Delivered" },
    stat3: { value: "4.8", label: "App Store Rating" }
  },
  {
    id: "web-dev",
    title: "Web Development",
    subtitle: "Enterprise Web Apps",
    tagline: "Modern Web Apps That Scale With Your Business",
    description: "Enterprise-grade web applications, customer portals, and admin dashboards built with cutting-edge technology for performance and scalability.",
    problem: "Your legacy web systems are slow, hard to maintain, and can't handle growth. Security vulnerabilities put your data at risk. Poor user experience frustrates customers and employees alike. Technical debt is piling up.",
    solution: "We build modern Progressive Web Apps (PWAs) and Single Page Applications (SPAs) using React and Next.js. Our apps load instantly, scale to millions of users, and include automated CI/CD pipelines for continuous improvement.",
    features: ["Server-side rendering for SEO", "API-first microservices architecture", "Real-time dashboards", "Role-based access control", "Automated testing & CI/CD", "Cloud-native deployment"],
    benefits: ["99.9% uptime guarantee", "Scales to 1M+ users", "SEO-optimized"],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    slug: "custom-web-development",
    ctaText: "Start Your Web Project",
    stat1: { value: "99.9%", label: "Uptime" },
    stat2: { value: "<2s", label: "Load Time" },
    stat3: { value: "100+", label: "Web Apps Built" }
  },
  {
    id: "on-demand",
    title: "On-Demand Platforms",
    subtitle: "Uber-like Apps",
    tagline: "Build Your Own Uber-Style Platform",
    description: "Complete on-demand service platforms connecting customers, service providers, and administrators with real-time logistics and intelligent dispatching.",
    problem: "Building multi-sided marketplaces is complex. You need real-time GPS tracking, intelligent dispatching, split payments, and coordination between customers, drivers, and vendors. One wrong algorithm and the whole system fails.",
    solution: "Our battle-tested on-demand platform includes real-time GPS tracking, AI-powered dispatching, multi-payment processing, and separate apps for customers, providers, and administrators. Launch your marketplace in weeks, not years.",
    features: ["Real-time GPS tracking", "AI-powered dispatching", "Multi-payment gateway", "Driver/provider wallets", "Rating & review system", "Admin analytics dashboard"],
    benefits: ["Proven architecture", "Scales to 100K+ orders/day", "24/7 support"],
    techStack: ["React Native", "Node.js", "MongoDB", "Redis", "Socket.io", "Google Maps"],
    slug: "on-demand-app-development",
    ctaText: "Launch Your Platform",
    stat1: { value: "10 Wks", label: "To Launch" },
    stat2: { value: "100K+", label: "Daily Orders" },
    stat3: { value: "15+", label: "Platforms Built" }
  },
  {
    id: "clone-app",
    title: "Clone App Development",
    subtitle: "White-Label Solutions",
    tagline: "Launch 3X Faster with Proven Templates",
    description: "Production-ready app templates that can be fully customized to match your brand. Skip months of development and go to market faster.",
    problem: "Building from scratch takes 12-18 months and costs hundreds of thousands. Your competitors are moving faster. By the time you launch, the market opportunity may have passed. You need a faster path to market.",
    solution: "Our white-label solutions are production-ready and battle-tested. Customize the UI, integrate your brand, and launch in weeks. You get all the features of established apps without the development timeline or risk.",
    features: ["Fully customizable UI/branding", "Pre-built user authentication", "Payment integration ready", "Admin dashboard included", "Scalable cloud infrastructure", "Documentation & training"],
    benefits: ["70% cost reduction", "8-week deployment", "Proven architecture"],
    techStack: ["React Native", "React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    slug: "clone-app-development",
    ctaText: "See Available Templates",
    stat1: { value: "8 Wks", label: "To Launch" },
    stat2: { value: "70%", label: "Cost Savings" },
    stat3: { value: "20+", label: "Templates" }
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    subtitle: "User-Centered Design",
    tagline: "Design That Converts Visitors to Customers",
    description: "Research-backed UI/UX design that creates intuitive, beautiful interfaces. Increase conversions, reduce support tickets, and delight your users.",
    problem: "Your product works but users struggle with it. High bounce rates, abandoned carts, and constant support requests indicate poor UX. You're losing customers to competitors with better-designed products.",
    solution: "Our design team conducts user research, creates data-driven wireframes, and delivers pixel-perfect designs. We test with real users and iterate until your product is intuitive for everyone. Design systems ensure consistency as you scale.",
    features: ["User research & personas", "Interactive prototypes", "Usability testing", "Design system creation", "Accessibility compliance (WCAG)", "Developer handoff files"],
    benefits: ["Increase conversions 40%+", "Reduce support tickets", "Faster development"],
    techStack: ["Figma", "Adobe XD", "Principle", "InVision", "Zeplin", "Maze"],
    slug: "ui-ux-design-services",
    ctaText: "Book a Design Audit",
    stat1: { value: "40%+", label: "Conversion Lift" },
    stat2: { value: "200+", label: "Projects" },
    stat3: { value: "5 Days", label: "First Concepts" }
  },
  {
    id: "consulting",
    title: "Technology Consulting",
    subtitle: "Strategic IT Advisory",
    tagline: "Strategic Technology Roadmap for Growth",
    description: "Expert guidance on technology strategy, architecture decisions, and digital transformation. Align your tech investments with business goals.",
    problem: "Technology decisions are risky. Wrong choices lead to wasted budgets, failed projects, and technical debt. You need an experienced partner to help navigate the options and avoid costly mistakes.",
    solution: "Our consultants bring 50+ years of combined experience across industries. We help you define a technology roadmap, evaluate vendors, architect scalable systems, and build internal capabilities for long-term success.",
    features: ["Technology stack assessment", "Architecture design review", "Vendor evaluation & selection", "Digital transformation roadmap", "Team training & enablement", "Ongoing advisory retainer"],
    benefits: ["Avoid costly mistakes", "Accelerate decisions", "Reduce technical debt"],
    techStack: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Various"],
    slug: "technology-consulting-services",
    ctaText: "Schedule Strategy Call",
    stat1: { value: "50+", label: "Years Experience" },
    stat2: { value: "30+", label: "Enterprises" },
    stat3: { value: "SAR 10M+", label: "Savings Delivered" }
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    subtitle: "Growth Marketing",
    tagline: "Data-Driven Marketing That Delivers ROI",
    description: "Comprehensive digital marketing strategies that increase visibility, drive qualified traffic, and convert visitors into paying customers.",
    problem: "You're spending on ads but not seeing results. Your competitors rank higher on Google. Social media engagement is flat. You need a partner who understands both marketing and technology.",
    solution: "We create integrated marketing strategies across SEO, paid advertising, social media, and content. Our tech background means we implement tracking, automation, and optimization that most agencies can't.",
    features: ["SEO & content strategy", "Google & Meta Ads management", "Social media marketing", "Marketing automation", "Conversion rate optimization", "Analytics & reporting"],
    benefits: ["Measurable ROI", "Qualified leads", "Brand awareness"],
    techStack: ["Google Analytics", "Google Ads", "Meta Ads", "HubSpot", "SEMrush", "Mailchimp"],
    slug: "digital-marketing-services",
    ctaText: "Get a Free Marketing Audit",
    stat1: { value: "3X", label: "Avg ROI" },
    stat2: { value: "50+", label: "Campaigns" },
    stat3: { value: "1M+", label: "Leads Generated" }
  },
  {
    id: "offshore",
    title: "Offshore Development",
    subtitle: "Dedicated Teams",
    tagline: "Scale Your Team Without the Overhead",
    description: "Dedicated development teams that integrate seamlessly with your organization. Same timezone, full IP protection, enterprise delivery standards.",
    problem: "Local developers cost SAR 35-50K/month and take 6 months to hire. High turnover means constant retraining. Project timelines slip. You need access to skilled talent without the overhead.",
    solution: "Our offshore development centers provide pre-vetted engineers who integrate with your existing team. We handle recruiting, HR, office space, and management. You get a dedicated team at 40-60% lower cost.",
    features: ["Dedicated team members", "Same timezone overlap", "Direct communication", "Agile methodology", "Full IP protection", "Flexible scaling"],
    benefits: ["60% cost reduction", "48-hour deployment", "Zero HR overhead"],
    techStack: ["React", "Node.js", "Python", "AWS", "Kubernetes", "Various"],
    slug: "offshore-office-services",
    ctaText: "Build Your Team",
    stat1: { value: "60%", label: "Cost Savings" },
    stat2: { value: "150+", label: "Engineers" },
    stat3: { value: "48hrs", label: "To Deploy" }
  },
  {
    id: "food-delivery",
    title: "Food Delivery Platform",
    subtitle: "UberEats Clone",
    tagline: "Launch Your Food Delivery App in 8 Weeks",
    description: "Complete food delivery ecosystem for customers, drivers, and restaurant partners. Intelligent logistics, real-time tracking, and seamless payments.",
    problem: "The food delivery market is booming but building a platform from scratch takes 18+ months. You need customer apps, driver apps, restaurant dashboards, and complex logistics. Time-to-market is critical.",
    solution: "Our white-label food delivery platform is production-ready with 50+ features. Customize the branding, integrate local payment gateways, and launch in 8 weeks. We've built 10+ successful food delivery platforms.",
    features: ["Customer, Driver & Restaurant apps", "Live GPS order tracking", "Intelligent route optimization", "Multiple payment gateways", "Promo codes & loyalty", "Real-time analytics"],
    benefits: ["8-week launch", "Proven at scale", "Local payment support"],
    techStack: ["React Native", "Node.js", "MongoDB", "Redis", "Google Maps", "Stripe"],
    slug: "food-delivery-app-development",
    ctaText: "Launch Your Delivery App",
    stat1: { value: "8 Wks", label: "To Launch" },
    stat2: { value: "10+", label: "Platforms Built" },
    stat3: { value: "1M+", label: "Orders Processed" }
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    subtitle: "Online Marketplace",
    tagline: "Build a Scalable Online Marketplace",
    description: "Comprehensive e-commerce solutions from single-vendor stores to multi-vendor marketplaces. Inventory, payments, shipping, and analytics included.",
    problem: "Off-the-shelf platforms like Shopify have limitations. You need custom features, multi-vendor support, or complex pricing rules. Generic solutions don't fit your unique business model.",
    solution: "We build custom e-commerce platforms tailored to your business. Multi-vendor marketplaces, B2B wholesale portals, subscription commerce - whatever your model, we deliver a scalable solution.",
    features: ["Multi-vendor marketplace", "Advanced product catalog", "Multiple payment gateways", "Inventory management", "Shipping integration", "Analytics & reporting"],
    benefits: ["Custom features", "Unlimited scalability", "No transaction fees"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe", "Elasticsearch"],
    slug: "ecommerce-app-development",
    ctaText: "Build Your Store",
    stat1: { value: "SAR 50M+", label: "GMV Processed" },
    stat2: { value: "25+", label: "Stores Built" },
    stat3: { value: "99.9%", label: "Uptime" }
  },
  {
    id: "elearning",
    title: "E-Learning Platform",
    subtitle: "Online Education",
    tagline: "Create Your Online Learning Academy",
    description: "Comprehensive learning management system with video courses, live classes, assessments, and certifications. Engage students and track progress.",
    problem: "You want to monetize your expertise but existing LMS platforms are limited. You need custom branding, specific features, or integration with your existing systems. Generic solutions don't cut it.",
    solution: "We build custom e-learning platforms with video hosting, live streaming, interactive quizzes, progress tracking, and certificate generation. White-label solution that matches your brand perfectly.",
    features: ["Video course hosting", "Live class streaming", "Quizzes & assessments", "Progress tracking", "Certificate generation", "Payment & subscriptions"],
    benefits: ["Unlimited students", "Your branding", "Full ownership"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "AWS S3", "WebRTC", "Stripe"],
    slug: "elearning-app-development",
    ctaText: "Build Your Academy",
    stat1: { value: "100K+", label: "Students Served" },
    stat2: { value: "15+", label: "Platforms Built" },
    stat3: { value: "4.9", label: "Avg Rating" }
  }
];

interface TemplateBlockProps {
  title: string;
  html: string;
}

function TemplateBlock({ title, html }: TemplateBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      toast({
        title: "Copied!",
        description: `${title} template copied to clipboard`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            data-testid={`button-expand-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {expanded ? "Hide Code" : "Show Code"}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={copyToClipboard}
            data-testid={`button-copy-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied!" : "Copy HTML"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 border rounded-lg overflow-hidden bg-white">
          <iframe
            srcDoc={html}
            title={title}
            className="w-full h-[600px] border-0"
            sandbox="allow-same-origin"
          />
        </div>
        {expanded && (
          <div className="relative">
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs max-h-[400px] overflow-y-auto">
              <code>{html}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function EmailTemplates() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4" data-testid="text-page-title">Email Campaign Templates</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Professional HTML email templates for your paid marketing campaigns. Click "Copy HTML" to copy the template code.
          </p>
          
          <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
            <CardContent className="flex items-start gap-3 pt-6">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Before using these templates:</p>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>1. Upload your logo to your website and update the logo URL in each template</li>
                  <li>2. Test emails in multiple email clients (Gmail, Outlook, Apple Mail)</li>
                  <li>3. Customize stats and content to match your actual data</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="outsourcing" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="outsourcing" data-testid="tab-outsourcing">Outsourcing</TabsTrigger>
            <TabsTrigger value="all-services" data-testid="tab-all-services">All Services</TabsTrigger>
            <TabsTrigger value="individual" data-testid="tab-individual">Individual Services</TabsTrigger>
          </TabsList>

          <TabsContent value="outsourcing">
            <TemplateBlock
              title="Outsourcing Services"
              html={outsourcingEmailTemplate}
            />
          </TabsContent>

          <TabsContent value="all-services">
            <TemplateBlock
              title="All Services Overview"
              html={allServicesEmailTemplate}
            />
          </TabsContent>

          <TabsContent value="individual">
            <div className="space-y-6">
              {serviceTemplates.map((service) => (
                <TemplateBlock
                  key={service.id}
                  title={service.title}
                  html={generateServiceEmailTemplate(service)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
