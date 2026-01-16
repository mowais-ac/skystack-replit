import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const outsourcingEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scale Your Team with SkyStack Outsourcing</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">SkyStack</h1>
                    <p style="margin: 8px 0 0; color: #34d399; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Technology Partner</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Hero Section -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 24px; font-weight: 600;">Scale Your Development Team Without the Overhead</h2>
              <p style="margin: 0 0 24px; color: #64748b; font-size: 16px; line-height: 1.6;">
                Access top-tier Saudi talent at 40-60% lower costs. Our dedicated teams integrate seamlessly with your operations, delivering enterprise-grade solutions while you focus on growth.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius: 6px; background-color: #003cff;">
                    <a href="https://skystack.sa/outsourcing" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">Explore Outsourcing Options</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Benefits Section -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 20px; background-color: #f8fafc; border-radius: 8px;">
                    <h3 style="margin: 0 0 16px; color: #0f172a; font-size: 18px;">Why Companies Choose SkyStack</h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 8px 0; color: #475569; font-size: 14px;">
                          <span style="color: #34d399; font-weight: bold;">&#10003;</span> &nbsp;40-60% cost savings vs. local hiring
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #475569; font-size: 14px;">
                          <span style="color: #34d399; font-weight: bold;">&#10003;</span> &nbsp;Vetted senior engineers ready to deploy
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #475569; font-size: 14px;">
                          <span style="color: #34d399; font-weight: bold;">&#10003;</span> &nbsp;Flexible team scaling (1-50+ developers)
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #475569; font-size: 14px;">
                          <span style="color: #34d399; font-weight: bold;">&#10003;</span> &nbsp;Same timezone collaboration
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Role Categories -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <h3 style="margin: 0 0 16px; color: #0f172a; font-size: 18px;">Available Talent Categories</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                    <div style="padding: 16px; background-color: #f0f9ff; border-radius: 6px;">
                      <p style="margin: 0; color: #0369a1; font-weight: 600; font-size: 14px;">Engineering</p>
                      <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">Full-Stack, Mobile, Backend</p>
                    </div>
                  </td>
                  <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                    <div style="padding: 16px; background-color: #f0fdf4; border-radius: 6px;">
                      <p style="margin: 0; color: #15803d; font-weight: 600; font-size: 14px;">Data & AI</p>
                      <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">ML Engineers, Data Scientists</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                    <div style="padding: 16px; background-color: #fef3c7; border-radius: 6px;">
                      <p style="margin: 0; color: #b45309; font-weight: 600; font-size: 14px;">Cloud & DevOps</p>
                      <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">AWS, Azure, Kubernetes</p>
                    </div>
                  </td>
                  <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                    <div style="padding: 16px; background-color: #fce7f3; border-radius: 6px;">
                      <p style="margin: 0; color: #be185d; font-weight: 600; font-size: 14px;">Leadership</p>
                      <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">Tech Leads, PMs, Architects</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 30px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 14px;">Ready to scale your team?</p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                      <a href="https://wa.me/966537430455" style="color: #34d399; text-decoration: none;">WhatsApp: +966 53 743 0455</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px; border-top: 1px solid #334155; margin-top: 20px;">
                    <p style="margin: 16px 0 0; color: #64748b; font-size: 12px;">
                      SkyStack Technology | Riyadh, Saudi Arabia<br>
                      <a href="https://skystack.sa" style="color: #64748b;">skystack.sa</a>
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
  <title>Transform Your Business with SkyStack</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">SkyStack</h1>
                    <p style="margin: 8px 0 0; color: #34d399; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Technology Partner</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Hero Section -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 24px; font-weight: 600;">Build & Modernize Your Business Software</h2>
              <p style="margin: 0 0 24px; color: #64748b; font-size: 16px; line-height: 1.6;">
                We help Saudi companies automate operations and reduce manual work with custom software solutions. From mobile apps to enterprise platforms, we deliver technology that drives growth.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius: 6px; background-color: #003cff;">
                    <a href="https://skystack.sa/services" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">Explore Our Services</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Services Grid -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <h3 style="margin: 0 0 20px; color: #0f172a; font-size: 18px;">Our Core Services</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                    <div style="padding: 20px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #003cff;">
                      <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 15px;">Mobile App Development</p>
                      <p style="margin: 8px 0 0; color: #64748b; font-size: 13px; line-height: 1.5;">Native iOS & Android apps with cross-platform solutions</p>
                    </div>
                  </td>
                  <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                    <div style="padding: 20px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #003cff;">
                      <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 15px;">Web Development</p>
                      <p style="margin: 8px 0 0; color: #64748b; font-size: 13px; line-height: 1.5;">Modern web apps, portals, and enterprise platforms</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                    <div style="padding: 20px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #003cff;">
                      <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 15px;">On-Demand Platforms</p>
                      <p style="margin: 8px 0 0; color: #64748b; font-size: 13px; line-height: 1.5;">Uber-like apps with real-time logistics</p>
                    </div>
                  </td>
                  <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                    <div style="padding: 20px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #003cff;">
                      <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 15px;">UI/UX Design</p>
                      <p style="margin: 8px 0 0; color: #64748b; font-size: 13px; line-height: 1.5;">User-centered design that drives engagement</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                    <div style="padding: 20px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #003cff;">
                      <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 15px;">Technology Consulting</p>
                      <p style="margin: 8px 0 0; color: #64748b; font-size: 13px; line-height: 1.5;">Strategic IT advisory for digital transformation</p>
                    </div>
                  </td>
                  <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                    <div style="padding: 20px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #003cff;">
                      <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 15px;">Digital Marketing</p>
                      <p style="margin: 8px 0 0; color: #64748b; font-size: 13px; line-height: 1.5;">Data-driven strategies for growth</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Stats Section -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f172a; border-radius: 8px;">
                <tr>
                  <td width="33%" style="padding: 24px; text-align: center;">
                    <p style="margin: 0; color: #34d399; font-size: 28px; font-weight: 700;">150+</p>
                    <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px;">Projects Delivered</p>
                  </td>
                  <td width="33%" style="padding: 24px; text-align: center; border-left: 1px solid #334155; border-right: 1px solid #334155;">
                    <p style="margin: 0; color: #34d399; font-size: 28px; font-weight: 700;">50+</p>
                    <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px;">Enterprise Clients</p>
                  </td>
                  <td width="33%" style="padding: 24px; text-align: center;">
                    <p style="margin: 0; color: #34d399; font-size: 28px; font-weight: 700;">8+</p>
                    <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px;">Years Experience</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 30px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 14px;">Ready to start your project?</p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                      <a href="https://wa.me/966537430455" style="color: #34d399; text-decoration: none;">WhatsApp: +966 53 743 0455</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px; border-top: 1px solid #334155; margin-top: 20px;">
                    <p style="margin: 16px 0 0; color: #64748b; font-size: 12px;">
                      SkyStack Technology | Riyadh, Saudi Arabia<br>
                      <a href="https://skystack.sa" style="color: #64748b;">skystack.sa</a>
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

const generateServiceEmailTemplate = (
  title: string,
  subtitle: string,
  description: string,
  problem: string,
  solution: string,
  features: string[],
  techStack: string[],
  slug: string
) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - SkyStack</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">SkyStack</h1>
                    <p style="margin: 8px 0 0; color: #34d399; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">${subtitle}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Hero Section -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 24px; font-weight: 600;">${title}</h2>
              <p style="margin: 0 0 24px; color: #64748b; font-size: 16px; line-height: 1.6;">
                ${description}
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius: 6px; background-color: #003cff;">
                    <a href="https://skystack.sa/services/${slug}" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">Learn More</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Problem/Solution Section -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 20px; background-color: #fef2f2; border-radius: 8px 8px 0 0; border-left: 4px solid #ef4444;">
                    <p style="margin: 0 0 8px; color: #b91c1c; font-weight: 600; font-size: 14px; text-transform: uppercase;">The Challenge</p>
                    <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">${problem}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; background-color: #f0fdf4; border-radius: 0 0 8px 8px; border-left: 4px solid #22c55e;">
                    <p style="margin: 0 0 8px; color: #15803d; font-weight: 600; font-size: 14px; text-transform: uppercase;">Our Solution</p>
                    <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">${solution}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Features Section -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <h3 style="margin: 0 0 16px; color: #0f172a; font-size: 18px;">Key Features</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    ${features.slice(0, 6).map(feature => `<p style="margin: 0 0 12px; color: #475569; font-size: 14px;"><span style="color: #003cff; font-weight: bold;">&#10003;</span> &nbsp;${feature}</p>`).join('')}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Tech Stack Section -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <h3 style="margin: 0 0 16px; color: #0f172a; font-size: 18px;">Technology Stack</h3>
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  ${techStack.slice(0, 6).map(tech => `<td style="padding: 4px;"><span style="display: inline-block; padding: 6px 12px; background-color: #e0e7ff; color: #3730a3; border-radius: 4px; font-size: 12px; font-weight: 500;">${tech}</span></td>`).join('')}
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CTA Section -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #003cff; border-radius: 8px;">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <h3 style="margin: 0 0 12px; color: #ffffff; font-size: 20px;">Ready to Get Started?</h3>
                    <p style="margin: 0 0 20px; color: #bfdbfe; font-size: 14px;">Let's discuss how we can help transform your business</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                      <tr>
                        <td style="border-radius: 6px; background-color: #ffffff;">
                          <a href="https://wa.me/966537430455" style="display: inline-block; padding: 12px 28px; color: #003cff; text-decoration: none; font-weight: 600; font-size: 14px;">Contact Us on WhatsApp</a>
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
            <td style="background-color: #0f172a; padding: 30px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 14px;">Have questions?</p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                      <a href="https://wa.me/966537430455" style="color: #34d399; text-decoration: none;">WhatsApp: +966 53 743 0455</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px; border-top: 1px solid #334155; margin-top: 20px;">
                    <p style="margin: 16px 0 0; color: #64748b; font-size: 12px;">
                      SkyStack Technology | Riyadh, Saudi Arabia<br>
                      <a href="https://skystack.sa" style="color: #64748b;">skystack.sa</a>
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

const serviceTemplates = [
  {
    id: "mobile-app",
    title: "Custom Mobile App Development",
    subtitle: "Native iOS & Android Applications",
    description: "Build high-performance, scalable mobile applications tailored to your business needs with native and cross-platform solutions.",
    problem: "Off-the-shelf mobile solutions lack the flexibility and performance required for enterprise-grade applications. Generic apps fail to address unique business processes and customer expectations.",
    solution: "We engineer bespoke native and cross-platform mobile apps using React Native, Flutter, and native Swift/Kotlin, ensuring peak performance, seamless user experiences, and enterprise-grade security.",
    features: ["Cross-platform compatibility", "Offline-first architecture", "Real-time synchronization", "Biometric security", "Push notifications", "In-app analytics"],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Node.js", "AWS"],
    slug: "custom-mobile-app-development"
  },
  {
    id: "web-dev",
    title: "Custom Web Development",
    subtitle: "Enterprise Web Applications & Portals",
    description: "Modern, responsive web applications built with the latest technologies for optimal performance and scalability.",
    problem: "Legacy web systems are slow, insecure, and difficult to scale as user bases grow. Outdated technology stacks create technical debt and security vulnerabilities.",
    solution: "Our team builds progressive web apps (PWAs) and single-page applications (SPAs) that load instantly and scale infinitely on cloud infrastructure with modern frameworks.",
    features: ["Server-side rendering (SSR)", "API-first design", "Automated CI/CD pipelines", "Microservices architecture", "Real-time dashboards", "Role-based access"],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    slug: "custom-web-development"
  },
  {
    id: "on-demand",
    title: "On-Demand App Development",
    subtitle: "Uber-like & Gig Economy Platforms",
    description: "Complete on-demand service platforms connecting customers, service providers, and administrators in real-time.",
    problem: "Building multi-sided marketplaces requires complex real-time logistics, payment splitting, and coordination between multiple user types.",
    solution: "Our on-demand solutions include intelligent dispatching, real-time GPS tracking, automated commission calculation, and seamless payment processing.",
    features: ["Real-time GPS tracking", "Intelligent dispatching", "Multi-payment support", "Rating & reviews", "Driver/provider wallets", "Admin analytics"],
    techStack: ["React Native", "Node.js", "MongoDB", "Redis", "Socket.io", "Google Maps API", "Stripe"],
    slug: "on-demand-app-development"
  },
  {
    id: "clone-app",
    title: "Clone App Development",
    subtitle: "White-Label Solutions",
    description: "Launch faster with proven app templates that can be customized to match your brand and business requirements.",
    problem: "Building from scratch is expensive and time-consuming. Entrepreneurs need a faster path to market without sacrificing quality.",
    solution: "Our white-label solutions provide production-ready app templates with customizable UI, integrated payment systems, and scalable architecture.",
    features: ["Fully customizable UI", "Pre-built user flows", "Payment integration", "Admin dashboard", "Scalable infrastructure", "Quick deployment"],
    techStack: ["React Native", "React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    slug: "clone-app-development"
  },
  {
    id: "ui-ux",
    title: "UI/UX Design Services",
    subtitle: "User-Centered Design",
    description: "Create intuitive, beautiful interfaces that delight users and drive engagement through research-backed design.",
    problem: "Poor user experience leads to high bounce rates, low conversion, and frustrated customers. Many products fail due to confusing interfaces.",
    solution: "Our design team conducts user research, creates wireframes and prototypes, and delivers pixel-perfect designs that align with your brand identity.",
    features: ["User research & personas", "Wireframing", "Interactive prototypes", "Design systems", "Usability testing", "Accessibility compliance"],
    techStack: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision", "Zeplin"],
    slug: "ui-ux-design-services"
  },
  {
    id: "consulting",
    title: "Technology Consulting",
    subtitle: "Strategic IT Advisory",
    description: "Expert guidance on technology strategy, architecture, and digital transformation initiatives.",
    problem: "Many organizations struggle to align technology investments with business goals, leading to wasted resources and missed opportunities.",
    solution: "Our consultants help you define a technology roadmap, select the right tools, and build internal capabilities for long-term success.",
    features: ["Technology audits", "Architecture design", "Vendor selection", "Team augmentation", "Process optimization", "Training programs"],
    techStack: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Various"],
    slug: "technology-consulting-services"
  },
  {
    id: "marketing",
    title: "Digital Marketing Services",
    subtitle: "Growth & Performance Marketing",
    description: "Data-driven marketing strategies that increase visibility, drive traffic, and convert visitors into customers.",
    problem: "Without a strategic approach to digital marketing, businesses struggle to reach their target audience and compete effectively online.",
    solution: "We create comprehensive marketing strategies including SEO, paid advertising, social media, and content marketing to drive measurable growth.",
    features: ["SEO optimization", "PPC campaigns", "Social media marketing", "Content strategy", "Email marketing", "Analytics & reporting"],
    techStack: ["Google Analytics", "Google Ads", "Meta Ads", "HubSpot", "SEMrush", "Mailchimp"],
    slug: "digital-marketing-services"
  },
  {
    id: "offshore",
    title: "Offshore Development Center",
    subtitle: "Dedicated Development Teams",
    description: "Scale your development capacity with dedicated offshore teams that work as an extension of your organization.",
    problem: "Hiring local talent is expensive and time-consuming. Companies need flexible access to skilled developers without long-term commitments.",
    solution: "Our offshore development centers provide vetted engineers who integrate with your team, follow your processes, and deliver quality code.",
    features: ["Dedicated teams", "Flexible scaling", "Same timezone overlap", "Direct communication", "IP protection", "Quality assurance"],
    techStack: ["Various", "Agile", "Scrum", "Jira", "Slack", "GitHub"],
    slug: "offshore-office-services"
  },
  {
    id: "food-delivery",
    title: "Food Delivery Platform",
    subtitle: "UberEats / DoorDash Clone",
    description: "Complete ecosystem for customers, drivers, and restaurant partners with intelligent logistics.",
    problem: "Coordinating three-sided marketplaces (users, drivers, vendors) requires complex logistics algorithms.",
    solution: "Our solution includes intelligent route optimization, real-time tracking, and automated dispatching systems.",
    features: ["Live GPS Tracking", "Order Management", "Driver Wallet", "Restaurant Dashboard", "Promo codes", "Multi-language"],
    techStack: ["Google Maps API", "Stripe Connect", "MongoDB", "Express", "React Native", "Firebase"],
    slug: "food-delivery-app-development"
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    subtitle: "Multi-vendor Marketplace",
    description: "Comprehensive e-commerce solutions from single-vendor stores to multi-vendor marketplaces.",
    problem: "Building a scalable e-commerce platform with inventory management, payments, and logistics is complex.",
    solution: "Our e-commerce solutions handle everything from product catalogs to order fulfillment with built-in analytics.",
    features: ["Product catalog", "Shopping cart", "Multiple payment gateways", "Inventory management", "Shipping integration", "Vendor dashboard"],
    techStack: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Elasticsearch", "AWS S3"],
    slug: "ecommerce-app-development"
  },
  {
    id: "elearning",
    title: "E-Learning Platform",
    subtitle: "Online Education & Courses",
    description: "Comprehensive learning management system with video courses, assessments, and certifications.",
    problem: "Educational institutions and creators need a platform to deliver courses, track progress, and engage students.",
    solution: "Our LMS provides video hosting, quizzes, progress tracking, live sessions, and certificate generation.",
    features: ["Video courses", "Live classes", "Quizzes & exams", "Progress tracking", "Certificates", "Discussion forums"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "AWS S3", "WebRTC", "Stripe"],
    slug: "elearning-app-development"
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
            className="w-full h-[500px] border-0"
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
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4" data-testid="text-page-title">Email Campaign Templates</h1>
          <p className="text-muted-foreground text-lg">
            Ready-to-use HTML email templates for your marketing campaigns. Click "Copy HTML" to copy the template code.
          </p>
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
                  html={generateServiceEmailTemplate(
                    service.title,
                    service.subtitle,
                    service.description,
                    service.problem,
                    service.solution,
                    service.features,
                    service.techStack,
                    service.slug
                  )}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
