import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, ChevronDown, ChevronUp, AlertCircle, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";

const LOGO_URL = "https://www.skystack.sa/logo-white-circle.png";
const WHATSAPP_LINK = "https://wa.me/966537430455";
const WEBSITE_URL = "https://skystack.sa";

interface EmailSubjectLine {
  subject: string;
  subjectAr: string;
  preview: string;
  previewAr: string;
}

interface ServiceTemplate {
  id: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  problem: string;
  problemAr: string;
  solution: string;
  solutionAr: string;
  features: string[];
  featuresAr: string[];
  benefits: string[];
  benefitsAr: string[];
  techStack: string[];
  slug: string;
  ctaText: string;
  ctaTextAr: string;
  stat1: { value: string; label: string; labelAr: string };
  stat2: { value: string; label: string; labelAr: string };
  stat3: { value: string; label: string; labelAr: string };
  subjectLines: EmailSubjectLine[];
}

const generateEmailTemplate = (lang: 'en' | 'ar', content: {
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
}) => {
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  const align = isRtl ? 'right' : 'left';
  const alignOpp = isRtl ? 'left' : 'right';
  const fontFamily = isRtl ? "'Segoe UI', Tahoma, 'Arial', sans-serif" : "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  
  const labels = {
    technologyPartner: isRtl ? 'شريك التقنية' : 'Technology Partner',
    theChallenge: isRtl ? 'التحدي' : 'The Challenge',
    ourSolution: isRtl ? 'حلنا' : 'Our Solution',
    whatYouGet: isRtl ? 'ما ستحصل عليه' : 'What You Get',
    whyChoose: isRtl ? 'لماذا تختار سكاي ستاك' : 'Why Choose SkyStack',
    techWeUse: isRtl ? 'التقنيات التي نستخدمها' : 'Technologies We Use',
    freeConsultation: isRtl ? 'استشارة مجانية' : 'Free Consultation',
    readyToStart: isRtl ? 'مستعد للبدء؟' : 'Ready to Get Started?',
    bookConsultation: isRtl ? 'احجز استشارة مجانية لمدة 30 دقيقة مع خبرائنا. سنحلل متطلباتك ونقدم لك عرضًا مفصلاً.' : 'Book a free 30-minute consultation with our experts. We\'ll analyze your requirements and provide a detailed proposal.',
    whatsappUs: isRtl ? 'تواصل عبر واتساب' : 'WhatsApp Us Now',
    orCall: isRtl ? 'أو اتصل بنا:' : 'Or call us:',
    tagline: isRtl ? 'نساعد الشركات السعودية على بناء برمجيات أفضل' : 'Helping Saudi companies build better software',
    riyadh: isRtl ? 'سكاي ستاك للتقنية | الرياض، المملكة العربية السعودية' : 'SkyStack Technology | Riyadh, Saudi Arabia',
    howWeWork: isRtl ? 'كيف نعمل' : 'How We Work',
    ourProcess: isRtl ? 'عمليتنا المُثبتة' : 'Our Proven Process',
    step1Title: isRtl ? 'الاكتشاف' : 'Discovery',
    step1Desc: isRtl ? 'نفهم أهدافك ومتطلباتك' : 'We understand your goals & requirements',
    step2Title: isRtl ? 'الاستراتيجية' : 'Strategy',
    step2Desc: isRtl ? 'نضع خطة تقنية مفصلة' : 'We create a detailed tech roadmap',
    step3Title: isRtl ? 'التطوير' : 'Development',
    step3Desc: isRtl ? 'نبني ونختبر بمنهجية أجايل' : 'We build & test with agile methodology',
    step4Title: isRtl ? 'الإطلاق' : 'Launch',
    step4Desc: isRtl ? 'ننشر ونقدم دعماً مستمراً' : 'We deploy & provide ongoing support',
    clientSuccess: isRtl ? 'قصص نجاح عملائنا' : 'Client Success Stories',
    testimonialQuote: isRtl ? 'بنى سكاي ستاك منصة المطورين لدينا من الصفر. جودة الكود والبنية تجاوزت توقعاتنا.' : 'SkyStack built our entire developer platform from scratch. The code quality and architecture exceeded our expectations.',
    testimonialRole: isRtl ? 'المدير التقني، يوني كودكس' : 'CTO, UniCodex',
    caseStudies: isRtl ? 'مشاريع مختارة' : 'Featured Projects',
    caseStudy1Client: 'ilmyst',
    caseStudy1Title: isRtl ? 'منصة تعلم بالذكاء الاصطناعي' : 'AI-Powered Learning Platform',
    caseStudy1Result: isRtl ? 'زيادة 150% في المشاركة' : '150% engagement increase',
    caseStudy2Client: 'SparkAI',
    caseStudy2Title: isRtl ? 'لوحة تحليلات المؤسسات' : 'Enterprise Analytics Dashboard',
    caseStudy2Result: isRtl ? 'رؤى فورية لـ 100+ عميل' : 'Real-time insights for 100+ clients',
    caseStudy3Client: 'BlueHat Solutions',
    caseStudy3Title: isRtl ? 'بوابة الأمن السيبراني' : 'Cybersecurity Threat Portal',
    caseStudy3Result: isRtl ? 'مليون+ تقييم تهديد يومياً' : '1M+ daily threat assessments',
    caseStudy4Client: 'Thuraya Travel',
    caseStudy4Title: isRtl ? 'نظام حجز السفر' : 'Travel Booking System',
    caseStudy4Result: isRtl ? 'زيادة 10 أضعاف في سعة الحجز' : '10x booking capacity increase',
    ourGuarantee: isRtl ? 'ضماناتنا' : 'Our Guarantee',
    guarantee1: isRtl ? 'ضمان جودة 100%' : '100% Quality Guarantee',
    guarantee2: isRtl ? 'التسليم في الوقت المحدد' : 'On-Time Delivery',
    guarantee3: isRtl ? 'حماية الملكية الفكرية' : 'Full IP Protection',
    guarantee4: isRtl ? 'دعم بعد الإطلاق' : 'Post-Launch Support',
    trustedBy: isRtl ? 'موثوق من الشركات الرائدة' : 'Trusted by Leading Companies',
    industries: isRtl ? 'الصناعات التي نخدمها' : 'Industries We Serve',
  };

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${content.tagline} - SkyStack</title>
  <style>
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .mobile-padding { padding: 16px 12px !important; }
      .mobile-padding-header { padding: 12px 12px !important; }
      .mobile-padding-hero { padding: 12px 12px 20px !important; }
      .stat-cell { display: block !important; width: 100% !important; border-right: none !important; border-left: none !important; border-bottom: 1px solid rgba(255,255,255,0.2) !important; padding: 10px 16px !important; }
      .stat-cell-last { border-bottom: none !important; }
      .mobile-h1 { font-size: 20px !important; line-height: 1.3 !important; }
      .mobile-h3 { font-size: 16px !important; }
      .mobile-text { font-size: 14px !important; }
      .mobile-text-sm { font-size: 12px !important; }
      .logo-header { width: 120px !important; }
      .logo-footer { width: 100px !important; }
      .benefit-cell { display: block !important; width: 100% !important; padding: 6px 0 !important; text-align: center !important; }
      .tech-badge { display: inline-block !important; margin: 2px !important; }
      .cta-button { padding: 12px 24px !important; font-size: 14px !important; }
      .section-padding { padding: 20px 12px !important; }
      .section-padding-sm { padding: 0 12px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: ${fontFamily}; background-color: #f1f5f9; -webkit-font-smoothing: antialiased; direction: ${dir};">
  <div style="display: none; max-height: 0; overflow: hidden;">${content.description}</div>
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 20px 12px;" class="mobile-padding">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" class="email-container" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);">
          
          <!-- Hero Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%); padding: 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 16px 24px 12px;" class="mobile-padding-header">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="${align}">
                          <img src="${LOGO_URL}" alt="SkyStack" width="200" class="logo-header" style="display: block; border: 0;" />
                        </td>
                        <td align="${alignOpp}">
                          <span style="color: #34d399; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;" class="mobile-text-sm">${content.subtitle}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 24px 28px; text-align: ${align};" class="mobile-padding-hero">
                    <p style="margin: 0 0 8px; color: #34d399; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;" class="mobile-text-sm">${content.title}</p>
                    <h1 style="margin: 0 0 12px; color: #ffffff; font-size: 26px; font-weight: 700; line-height: 1.3;" class="mobile-h1">${content.tagline}</h1>
                    <p style="margin: 0 0 16px; color: #94a3b8; font-size: 15px; line-height: 1.6;" class="mobile-text">${content.description}</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td style="border-radius: 6px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); box-shadow: 0 4px 14px 0 rgba(0, 60, 255, 0.4);">
                          <a href="${WEBSITE_URL}/services/${content.slug}" class="cta-button" style="display: inline-block; padding: 12px 28px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px;">${content.ctaText}</a>
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
                  <td width="33.33%" class="stat-cell" style="padding: 14px 12px; text-align: center; border-${isRtl ? 'left' : 'right'}: 1px solid rgba(255,255,255,0.2);">
                    <p style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">${content.stat1.value}</p>
                    <p style="margin: 2px 0 0; color: rgba(255,255,255,0.8); font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">${content.stat1.label}</p>
                  </td>
                  <td width="33.33%" class="stat-cell" style="padding: 14px 12px; text-align: center; border-${isRtl ? 'left' : 'right'}: 1px solid rgba(255,255,255,0.2);">
                    <p style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">${content.stat2.value}</p>
                    <p style="margin: 2px 0 0; color: rgba(255,255,255,0.8); font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">${content.stat2.label}</p>
                  </td>
                  <td width="33.33%" class="stat-cell stat-cell-last" style="padding: 14px 12px; text-align: center;">
                    <p style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">${content.stat3.value}</p>
                    <p style="margin: 2px 0 0; color: rgba(255,255,255,0.8); font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">${content.stat3.label}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Problem Section -->
          <tr>
            <td style="padding: 24px 24px 16px;" class="section-padding">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 16px; background: linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%); border-radius: 8px; border-${isRtl ? 'right' : 'left'}: 3px solid #ef4444; text-align: ${align};" class="mobile-padding">
                    <p style="margin: 0 0 4px; color: #dc2626; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">${labels.theChallenge}</p>
                    <p style="margin: 0; color: #374151; font-size: 13px; line-height: 1.6;" class="mobile-text">${content.problem}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Solution Section -->
          <tr>
            <td style="padding: 0 24px 24px;" class="section-padding-sm">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 16px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-radius: 8px; border-${isRtl ? 'right' : 'left'}: 3px solid #22c55e; text-align: ${align};" class="mobile-padding">
                    <p style="margin: 0 0 4px; color: #16a34a; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">${labels.ourSolution}</p>
                    <p style="margin: 0; color: #374151; font-size: 13px; line-height: 1.6;" class="mobile-text">${content.solution}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Features Section -->
          <tr>
            <td style="padding: 0 24px 24px; text-align: ${align};" class="section-padding-sm">
              <h3 style="margin: 0 0 12px; color: #0f172a; font-size: 16px; font-weight: 700;" class="mobile-h3">${labels.whatYouGet}</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${content.features.map(feature => `
                <tr>
                  <td style="padding: 6px 0; border-bottom: 1px solid #e2e8f0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="24" style="vertical-align: top;">
                          <div style="width: 18px; height: 18px; background: linear-gradient(135deg, #34d399 0%, #10b981 100%); border-radius: 50%; text-align: center; line-height: 18px; color: #ffffff; font-size: 11px; font-weight: 700;">&#10003;</div>
                        </td>
                        <td style="padding-${isRtl ? 'right' : 'left'}: 8px;">
                          <p style="margin: 0; color: #0f172a; font-size: 13px; font-weight: 500;" class="mobile-text">${feature}</p>
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
            <td style="background-color: #f8fafc; padding: 24px;" class="section-padding">
              <h3 style="margin: 0 0 14px; color: #0f172a; font-size: 16px; font-weight: 700; text-align: center;" class="mobile-h3">${labels.whyChoose}</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  ${content.benefits.slice(0, 3).map(benefit => `
                  <td width="33.33%" class="benefit-cell" style="padding: 0 6px; text-align: center; vertical-align: top;">
                    <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); border-radius: 8px; margin: 0 auto 8px; line-height: 36px; color: #ffffff; font-size: 16px;">&#9733;</div>
                    <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 12px; line-height: 1.4;" class="mobile-text">${benefit}</p>
                  </td>`).join('')}
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Process Section -->
          <tr>
            <td style="padding: 24px; background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);" class="section-padding">
              <p style="margin: 0 0 4px; color: #003cff; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; text-align: center;">${labels.howWeWork}</p>
              <h3 style="margin: 0 0 16px; color: #0f172a; font-size: 16px; font-weight: 700; text-align: center;" class="mobile-h3">${labels.ourProcess}</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="25%" class="benefit-cell" style="padding: 0 4px; text-align: center; vertical-align: top;">
                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); border-radius: 50%; margin: 0 auto 6px; line-height: 32px; color: #ffffff; font-size: 14px; font-weight: 700;">1</div>
                    <p style="margin: 0 0 2px; color: #0f172a; font-weight: 700; font-size: 11px;">${labels.step1Title}</p>
                    <p style="margin: 0; color: #64748b; font-size: 10px; line-height: 1.3;">${labels.step1Desc}</p>
                  </td>
                  <td width="25%" class="benefit-cell" style="padding: 0 4px; text-align: center; vertical-align: top;">
                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); border-radius: 50%; margin: 0 auto 6px; line-height: 32px; color: #ffffff; font-size: 14px; font-weight: 700;">2</div>
                    <p style="margin: 0 0 2px; color: #0f172a; font-weight: 700; font-size: 11px;">${labels.step2Title}</p>
                    <p style="margin: 0; color: #64748b; font-size: 10px; line-height: 1.3;">${labels.step2Desc}</p>
                  </td>
                  <td width="25%" class="benefit-cell" style="padding: 0 4px; text-align: center; vertical-align: top;">
                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); border-radius: 50%; margin: 0 auto 6px; line-height: 32px; color: #ffffff; font-size: 14px; font-weight: 700;">3</div>
                    <p style="margin: 0 0 2px; color: #0f172a; font-weight: 700; font-size: 11px;">${labels.step3Title}</p>
                    <p style="margin: 0; color: #64748b; font-size: 10px; line-height: 1.3;">${labels.step3Desc}</p>
                  </td>
                  <td width="25%" class="benefit-cell" style="padding: 0 4px; text-align: center; vertical-align: top;">
                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #34d399 0%, #10b981 100%); border-radius: 50%; margin: 0 auto 6px; line-height: 32px; color: #ffffff; font-size: 14px; font-weight: 700;">4</div>
                    <p style="margin: 0 0 2px; color: #0f172a; font-weight: 700; font-size: 11px;">${labels.step4Title}</p>
                    <p style="margin: 0; color: #64748b; font-size: 10px; line-height: 1.3;">${labels.step4Desc}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Testimonial Section -->
          <tr>
            <td style="padding: 24px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);" class="section-padding">
              <p style="margin: 0 0 10px; color: #34d399; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; text-align: center;">${labels.clientSuccess}</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center; padding: 0 12px;">
                    <div style="font-size: 32px; color: #003cff; line-height: 1; margin-bottom: 8px;">"</div>
                    <p style="margin: 0 0 12px; color: #e2e8f0; font-size: 14px; line-height: 1.6; font-style: italic;" class="mobile-text">${labels.testimonialQuote}</p>
                    <p style="margin: 0; color: #34d399; font-weight: 700; font-size: 12px;">${labels.testimonialRole}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Case Studies Section -->
          <tr>
            <td style="padding: 24px; background-color: #ffffff;" class="section-padding">
              <h3 style="margin: 0 0 16px; color: #0f172a; font-size: 14px; font-weight: 700; text-align: center;" class="mobile-h3">${labels.caseStudies}</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="50%" class="benefit-cell" style="padding: 6px; vertical-align: top;">
                    <div style="background: #f8fafc; border-radius: 6px; padding: 12px; border-left: 3px solid #003cff;">
                      <p style="margin: 0 0 2px; color: #003cff; font-size: 10px; font-weight: 700;">${labels.caseStudy1Client}</p>
                      <p style="margin: 0 0 4px; color: #0f172a; font-size: 11px; font-weight: 600;">${labels.caseStudy1Title}</p>
                      <p style="margin: 0; color: #16a34a; font-size: 10px; font-weight: 600;">${labels.caseStudy1Result}</p>
                    </div>
                  </td>
                  <td width="50%" class="benefit-cell" style="padding: 6px; vertical-align: top;">
                    <div style="background: #f8fafc; border-radius: 6px; padding: 12px; border-left: 3px solid #003cff;">
                      <p style="margin: 0 0 2px; color: #003cff; font-size: 10px; font-weight: 700;">${labels.caseStudy2Client}</p>
                      <p style="margin: 0 0 4px; color: #0f172a; font-size: 11px; font-weight: 600;">${labels.caseStudy2Title}</p>
                      <p style="margin: 0; color: #16a34a; font-size: 10px; font-weight: 600;">${labels.caseStudy2Result}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="50%" class="benefit-cell" style="padding: 6px; vertical-align: top;">
                    <div style="background: #f8fafc; border-radius: 6px; padding: 12px; border-left: 3px solid #34d399;">
                      <p style="margin: 0 0 2px; color: #003cff; font-size: 10px; font-weight: 700;">${labels.caseStudy3Client}</p>
                      <p style="margin: 0 0 4px; color: #0f172a; font-size: 11px; font-weight: 600;">${labels.caseStudy3Title}</p>
                      <p style="margin: 0; color: #16a34a; font-size: 10px; font-weight: 600;">${labels.caseStudy3Result}</p>
                    </div>
                  </td>
                  <td width="50%" class="benefit-cell" style="padding: 6px; vertical-align: top;">
                    <div style="background: #f8fafc; border-radius: 6px; padding: 12px; border-left: 3px solid #34d399;">
                      <p style="margin: 0 0 2px; color: #003cff; font-size: 10px; font-weight: 700;">${labels.caseStudy4Client}</p>
                      <p style="margin: 0 0 4px; color: #0f172a; font-size: 11px; font-weight: 600;">${labels.caseStudy4Title}</p>
                      <p style="margin: 0; color: #16a34a; font-size: 10px; font-weight: 600;">${labels.caseStudy4Result}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Guarantee Section -->
          <tr>
            <td style="padding: 24px; background-color: #ffffff;" class="section-padding">
              <h3 style="margin: 0 0 14px; color: #0f172a; font-size: 16px; font-weight: 700; text-align: center;" class="mobile-h3">${labels.ourGuarantee}</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="25%" class="benefit-cell" style="padding: 0 4px; text-align: center; vertical-align: top;">
                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 6px; margin: 0 auto 6px; line-height: 32px; font-size: 14px;">&#128176;</div>
                    <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 10px; line-height: 1.3;">${labels.guarantee1}</p>
                  </td>
                  <td width="25%" class="benefit-cell" style="padding: 0 4px; text-align: center; vertical-align: top;">
                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 6px; margin: 0 auto 6px; line-height: 32px; font-size: 14px;">&#9202;</div>
                    <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 10px; line-height: 1.3;">${labels.guarantee2}</p>
                  </td>
                  <td width="25%" class="benefit-cell" style="padding: 0 4px; text-align: center; vertical-align: top;">
                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border-radius: 6px; margin: 0 auto 6px; line-height: 32px; font-size: 14px;">&#128274;</div>
                    <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 10px; line-height: 1.3;">${labels.guarantee3}</p>
                  </td>
                  <td width="25%" class="benefit-cell" style="padding: 0 4px; text-align: center; vertical-align: top;">
                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 6px; margin: 0 auto 6px; line-height: 32px; font-size: 14px;">&#128736;</div>
                    <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 10px; line-height: 1.3;">${labels.guarantee4}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Industries Section -->
          <tr>
            <td style="padding: 20px 24px; background-color: #f8fafc;" class="section-padding">
              <h3 style="margin: 0 0 10px; color: #0f172a; font-size: 12px; font-weight: 700; text-align: center;">${labels.industries}</h3>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto; text-align: center;" width="100%">
                <tr>
                  <td style="text-align: center;">
                    ${[
                      isRtl ? 'التجزئة' : 'Retail',
                      isRtl ? 'الرعاية الصحية' : 'Healthcare',
                      isRtl ? 'المالية' : 'Finance',
                      isRtl ? 'اللوجستيات' : 'Logistics',
                      isRtl ? 'العقارات' : 'Real Estate',
                      isRtl ? 'التعليم' : 'Education'
                    ].map(industry => `<span style="display: inline-block; padding: 4px 10px; background-color: #ffffff; color: #475569; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 10px; font-weight: 500; margin: 2px;">${industry}</span>`).join('')}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Tech Stack -->
          <tr>
            <td style="padding: 20px 24px;" class="section-padding">
              <h3 style="margin: 0 0 10px; color: #0f172a; font-size: 12px; font-weight: 700; text-align: center;">${labels.techWeUse}</h3>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto; text-align: center;" width="100%">
                <tr>
                  <td style="text-align: center;">
                  ${content.techStack.slice(0, 6).map(tech => `<span class="tech-badge" style="display: inline-block; padding: 4px 10px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); color: #1d4ed8; border-radius: 4px; font-size: 11px; font-weight: 600; margin: 2px;">${tech}</span>`).join('')}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CTA Section -->
          <tr>
            <td style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); padding: 28px 24px;" class="section-padding">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 4px; color: #34d399; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">${labels.freeConsultation}</p>
                    <h3 style="margin: 0 0 8px; color: #ffffff; font-size: 20px; font-weight: 700;" class="mobile-h1">${labels.readyToStart}</h3>
                    <p style="margin: 0 0 16px; color: #94a3b8; font-size: 13px; line-height: 1.5;" class="mobile-text">${labels.bookConsultation}</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                      <tr>
                        <td style="border-radius: 6px; background: linear-gradient(135deg, #34d399 0%, #10b981 100%); box-shadow: 0 4px 14px 0 rgba(52, 211, 153, 0.4);">
                          <a href="${WHATSAPP_LINK}" class="cta-button" style="display: inline-block; padding: 12px 28px; color: #0f172a; text-decoration: none; font-weight: 700; font-size: 14px;">${labels.whatsappUs}</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 12px 0 0; color: #64748b; font-size: 11px;">${labels.orCall} <a href="tel:+966537430455" style="color: #34d399; text-decoration: none;">+966 53 743 0455</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #020617; padding: 20px 24px;" class="section-padding">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center; padding-bottom: 12px; border-bottom: 1px solid #1e293b;">
                    <img src="${LOGO_URL}" alt="SkyStack" width="120" class="logo-footer" style="display: inline-block; border: 0;" />
                    <p style="margin: 6px 0 0; color: #64748b; font-size: 11px;" class="mobile-text-sm">${labels.tagline}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px; text-align: center;">
                    <p style="margin: 0 0 4px; color: #94a3b8; font-size: 11px;" class="mobile-text-sm">
                      <a href="${WHATSAPP_LINK}" style="color: #34d399; text-decoration: none; font-weight: 600;">+966 53 743 0455</a> &nbsp;|&nbsp;
                      <a href="mailto:info@skystack.sa" style="color: #94a3b8; text-decoration: none;">info@skystack.sa</a>
                    </p>
                    <p style="margin: 6px 0 0; color: #475569; font-size: 10px;">
                      ${labels.riyadh}<br>
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
};

const serviceTemplates: ServiceTemplate[] = [
  {
    id: "outsourcing",
    title: "Staff Augmentation",
    titleAr: "تعزيز الكوادر",
    subtitle: "Technology Partner",
    subtitleAr: "شريك التقنية",
    tagline: "Cut Development Costs by 60%",
    taglineAr: "خفّض تكاليف التطوير بنسبة 60%",
    description: "Access pre-vetted Saudi developers ready to deploy within 48 hours. Same timezone, seamless integration, enterprise-grade delivery.",
    descriptionAr: "احصل على مطورين سعوديين معتمدين وجاهزين للعمل خلال 48 ساعة. نفس المنطقة الزمنية، تكامل سلس، وجودة مؤسسية.",
    problem: "Local senior developers cost SAR 35,000-50,000/month. Recruitment takes 3-6 months. High turnover means constant retraining. Your projects stall while you search.",
    problemAr: "المطورون المحليون يكلفون 35,000-50,000 ريال شهرياً. التوظيف يستغرق 3-6 أشهر. معدل دوران مرتفع يعني تدريب مستمر. مشاريعك تتوقف أثناء البحث.",
    solution: "Our pool of 150+ senior engineers across all tech stacks. Same timezone collaboration. Dedicated project managers. Full IP protection. Scale up or down instantly.",
    solutionAr: "مجموعتنا تضم أكثر من 150 مهندساً خبيراً في جميع التقنيات. نعمل في نفس منطقتك الزمنية. مديرو مشاريع متخصصون. حماية كاملة للملكية الفكرية. توسيع أو تقليص فوري.",
    features: ["Dedicated team members", "Same timezone overlap", "Direct communication", "Agile methodology", "Full IP protection", "Flexible scaling"],
    featuresAr: ["أعضاء فريق متخصصون", "العمل في نفس المنطقة الزمنية", "تواصل مباشر", "منهجية أجايل", "حماية كاملة للملكية الفكرية", "مرونة في التوسع"],
    benefits: ["60% cost reduction", "48-hour deployment", "Zero HR overhead"],
    benefitsAr: ["توفير 60% من التكاليف", "نشر خلال 48 ساعة", "بدون أعباء موارد بشرية"],
    techStack: ["React", "Node.js", "Python", "AWS", "Kubernetes", "Various"],
    slug: "outsourcing",
    ctaText: "Get Your Free Team Assessment",
    ctaTextAr: "احصل على تقييم فريقك المجاني",
    stat1: { value: "150+", label: "Engineers Available", labelAr: "مهندس متاح" },
    stat2: { value: "48hrs", label: "Deployment Time", labelAr: "وقت النشر" },
    stat3: { value: "60%", label: "Cost Savings", labelAr: "توفير في التكاليف" },
    subjectLines: [
      {
        subject: "Reduce Your Development Costs by 60% - Ready in 48 Hours",
        subjectAr: "خفّض تكاليف التطوير بنسبة 60% - جاهز خلال 48 ساعة",
        preview: "Access pre-vetted Saudi developers. Same timezone, enterprise-grade quality.",
        previewAr: "احصل على مطورين سعوديين معتمدين. نفس المنطقة الزمنية، جودة مؤسسية."
      },
      {
        subject: "Stop Paying SAR 50K/Month for Developers - Here's How",
        subjectAr: "توقف عن دفع 50 ألف ريال شهرياً للمطورين - إليك كيف",
        preview: "Get senior engineers at 60% less cost. Deploy within 48 hours.",
        previewAr: "احصل على مهندسين خبراء بتكلفة أقل 60%. نشر خلال 48 ساعة."
      },
      {
        subject: "Your Next Developer Could Be Ready in 48 Hours",
        subjectAr: "مطورك القادم يمكن أن يكون جاهزاً خلال 48 ساعة",
        preview: "Skip the 6-month hiring process. Access 150+ pre-vetted engineers now.",
        previewAr: "تخطى عملية التوظيف التي تستغرق 6 أشهر. احصل على 150+ مهندس معتمد الآن."
      },
      {
        subject: "Why Saudi Companies Are Switching to Staff Augmentation",
        subjectAr: "لماذا تتحول الشركات السعودية إلى تعزيز الكوادر",
        preview: "Save 60% on development costs while scaling your team instantly.",
        previewAr: "وفر 60% من تكاليف التطوير بينما توسع فريقك فوراً."
      },
      {
        subject: "The Hidden Cost of Hiring Local Developers (And How to Avoid It)",
        subjectAr: "التكلفة الخفية لتوظيف المطورين المحليين (وكيفية تجنبها)",
        preview: "Discover how staff augmentation saves time and money for Saudi businesses.",
        previewAr: "اكتشف كيف يوفر تعزيز الكوادر الوقت والمال للشركات السعودية."
      },
      {
        subject: "150+ Senior Engineers Ready to Join Your Team",
        subjectAr: "150+ مهندس خبير جاهز للانضمام لفريقك",
        preview: "Same timezone, seamless integration, full IP protection. Start in 48 hours.",
        previewAr: "نفس المنطقة الزمنية، تكامل سلس، حماية كاملة للملكية الفكرية. ابدأ خلال 48 ساعة."
      },
      {
        subject: "Cut Your Development Budget Without Cutting Quality",
        subjectAr: "قلل ميزانية التطوير دون تقليل الجودة",
        preview: "Enterprise-grade developers at 60% less cost. See how it works.",
        previewAr: "مطورون على مستوى المؤسسات بتكلفة أقل 60%. شاهد كيف يعمل."
      },
      {
        subject: "The 48-Hour Solution to Your Developer Shortage",
        subjectAr: "الحل خلال 48 ساعة لنقص المطورين لديك",
        preview: "No more 6-month hiring cycles. Get senior engineers deployed in 2 days.",
        previewAr: "لا مزيد من دورات التوظيف التي تستغرق 6 أشهر. احصل على مهندسين خبراء خلال يومين."
      },
      {
        subject: "How We Helped a Saudi Company Save SAR 300K/Year on Development",
        subjectAr: "كيف ساعدنا شركة سعودية على توفير 300 ألف ريال سنوياً في التطوير",
        preview: "Real results from staff augmentation. Read the case study.",
        previewAr: "نتائج حقيقية من تعزيز الكوادر. اقرأ دراسة الحالة."
      },
      {
        subject: "Your Competitors Are Scaling Faster - Here's Their Secret",
        subjectAr: "منافسوك يتوسعون أسرع - هذا سرهم",
        preview: "Staff augmentation is helping Saudi companies move 10x faster. Learn how.",
        previewAr: "تعزيز الكوادر يساعد الشركات السعودية على التحرك أسرع 10 مرات. تعلم كيف."
      }
    ]
  },
  {
    id: "all-services",
    title: "Software Development",
    titleAr: "تطوير البرمجيات",
    subtitle: "Technology Partner",
    subtitleAr: "شريك التقنية",
    tagline: "Automate Your Operations. Reduce Manual Work.",
    taglineAr: "أتمتة عملياتك. تقليل العمل اليدوي.",
    description: "We help Saudi companies build and modernize business software. From mobile apps to enterprise platforms, we deliver technology that drives real results.",
    descriptionAr: "نساعد الشركات السعودية على بناء وتحديث برمجيات الأعمال. من تطبيقات الجوال إلى المنصات المؤسسية، نقدم تقنية تحقق نتائج حقيقية.",
    problem: "Your legacy systems are slow, hard to maintain, and can't handle growth. Security vulnerabilities put your data at risk. Poor user experience frustrates customers.",
    problemAr: "أنظمتك القديمة بطيئة، صعبة الصيانة، ولا تستوعب النمو. ثغرات أمنية تعرض بياناتك للخطر. تجربة مستخدم سيئة تحبط العملاء.",
    solution: "End-to-end software solutions with modern technology. Mobile apps, web platforms, enterprise systems - all built with scalability, security, and user experience in mind.",
    solutionAr: "حلول برمجية شاملة بتقنيات حديثة. تطبيقات جوال، منصات ويب، أنظمة مؤسسية - كلها مبنية مع مراعاة التوسع والأمان وتجربة المستخدم.",
    features: ["Mobile App Development", "Web Development", "On-Demand Platforms", "E-Commerce Solutions", "UI/UX Design", "Tech Consulting"],
    featuresAr: ["تطوير تطبيقات الجوال", "تطوير الويب", "منصات حسب الطلب", "حلول التجارة الإلكترونية", "تصميم واجهة المستخدم", "استشارات تقنية"],
    benefits: ["150+ Projects Delivered", "50+ Enterprise Clients", "8+ Years Experience"],
    benefitsAr: ["150+ مشروع منجز", "50+ عميل مؤسسي", "8+ سنوات خبرة"],
    techStack: ["React", "React Native", "Node.js", "AWS", "PostgreSQL", "Flutter"],
    slug: "services",
    ctaText: "Book a Free Consultation",
    ctaTextAr: "احجز استشارة مجانية",
    stat1: { value: "150+", label: "Projects Delivered", labelAr: "مشروع منجز" },
    stat2: { value: "50+", label: "Enterprise Clients", labelAr: "عميل مؤسسي" },
    stat3: { value: "8+", label: "Years Experience", labelAr: "سنوات خبرة" },
    subjectLines: [
      {
        subject: "Transform Your Business with Custom Software Solutions",
        subjectAr: "حوّل أعمالك بحلول برمجية مخصصة",
        preview: "From mobile apps to enterprise platforms - we deliver technology that drives real results.",
        previewAr: "من تطبيقات الجوال إلى المنصات المؤسسية - نقدم تقنية تحقق نتائج حقيقية."
      },
      {
        subject: "150+ Projects Delivered: How We Help Saudi Companies Succeed",
        subjectAr: "150+ مشروع منجز: كيف نساعد الشركات السعودية على النجاح",
        preview: "Enterprise-grade software development. See our proven track record.",
        previewAr: "تطوير برمجيات على مستوى المؤسسات. شاهد سجلنا المُثبت."
      },
      {
        subject: "Stop Struggling with Legacy Systems - Modernize Now",
        subjectAr: "توقف عن المعاناة مع الأنظمة القديمة - حدّث الآن",
        preview: "We help Saudi companies build and modernize business software that scales.",
        previewAr: "نساعد الشركات السعودية على بناء وتحديث برمجيات الأعمال القابلة للتوسع."
      },
      {
        subject: "The Complete Guide to Software Development in Saudi Arabia",
        subjectAr: "الدليل الكامل لتطوير البرمجيات في المملكة العربية السعودية",
        preview: "Everything you need to know about building software for your business.",
        previewAr: "كل ما تحتاج معرفته عن بناء البرمجيات لأعمالك."
      },
      {
        subject: "Why 50+ Enterprise Clients Trust SkyStack for Their Software",
        subjectAr: "لماذا يثق 50+ عميل مؤسسي بسكاي ستاك لبرمجياتهم",
        preview: "8+ years of experience delivering world-class software solutions.",
        previewAr: "8+ سنوات من الخبرة في تقديم حلول برمجيات عالمية المستوى."
      },
      {
        subject: "From Idea to Launch: Your Software Development Partner",
        subjectAr: "من الفكرة إلى الإطلاق: شريكك في تطوير البرمجيات",
        preview: "End-to-end software solutions tailored to your business needs.",
        previewAr: "حلول برمجية شاملة مصممة لاحتياجات أعمالك."
      },
      {
        subject: "How to Choose the Right Software Development Partner",
        subjectAr: "كيفية اختيار شريك تطوير البرمجيات المناسب",
        preview: "Key factors to consider when building software for your Saudi business.",
        previewAr: "عوامل رئيسية يجب مراعاتها عند بناء البرمجيات لعملك السعودي."
      },
      {
        subject: "The Real Cost of Building Software In-House vs Outsourcing",
        subjectAr: "التكلفة الحقيقية لبناء البرمجيات داخلياً مقابل الاستعانة بمصادر خارجية",
        preview: "A detailed comparison to help you make the right decision.",
        previewAr: "مقارنة مفصلة لمساعدتك على اتخاذ القرار الصحيح."
      },
      {
        subject: "5 Signs Your Business Needs Custom Software Development",
        subjectAr: "5 علامات تشير إلى أن عملك يحتاج تطوير برمجيات مخصصة",
        preview: "Is it time to modernize your technology stack? Find out here.",
        previewAr: "هل حان الوقت لتحديث البنية التقنية لديك؟ اكتشف هنا."
      },
      {
        subject: "Success Story: How We Helped a Saudi Company Scale 10x",
        subjectAr: "قصة نجاح: كيف ساعدنا شركة سعودية على التوسع 10 مرات",
        preview: "Real results from our software development approach. Read the case study.",
        previewAr: "نتائج حقيقية من نهجنا في تطوير البرمجيات. اقرأ دراسة الحالة."
      }
    ]
  },
  {
    id: "mobile-app",
    title: "Mobile App Development",
    titleAr: "تطوير تطبيقات الجوال",
    subtitle: "Native iOS & Android",
    subtitleAr: "iOS و Android أصلي",
    tagline: "Launch Your Mobile App in 12 Weeks",
    taglineAr: "أطلق تطبيقك في 12 أسبوع",
    description: "Build high-performance mobile applications that your customers love. Native iOS and Android apps with cross-platform efficiency.",
    descriptionAr: "ابنِ تطبيقات جوال عالية الأداء يحبها عملاؤك. تطبيقات iOS و Android أصلية بكفاءة منصات متعددة.",
    problem: "Your customers expect seamless mobile experiences. Off-the-shelf apps don't fit your unique business processes. Building in-house is expensive and takes forever.",
    problemAr: "عملاؤك يتوقعون تجارب جوال سلسة. التطبيقات الجاهزة لا تناسب عملياتك الفريدة. البناء الداخلي مكلف ويستغرق وقتاً طويلاً.",
    solution: "We build custom mobile apps using React Native and Flutter that launch 40% faster than traditional development. Offline mode, real-time sync, biometric security.",
    solutionAr: "نبني تطبيقات مخصصة باستخدام React Native و Flutter تُطلق أسرع بـ40% من التطوير التقليدي. وضع عدم اتصال، مزامنة فورية، أمان بيومتري.",
    features: ["Native iOS & Android from single codebase", "Offline-first architecture", "Real-time push notifications", "Biometric authentication", "In-app analytics dashboard", "Backend API integration"],
    featuresAr: ["iOS و Android أصلي من كود واحد", "بنية تعمل بدون اتصال أولاً", "إشعارات فورية", "مصادقة بيومترية", "لوحة تحليلات داخلية", "تكامل مع واجهات برمجية"],
    benefits: ["40% faster time-to-market", "Enterprise-grade security", "Ongoing support & updates"],
    benefitsAr: ["وصول أسرع للسوق بـ40%", "أمان على مستوى المؤسسات", "دعم وتحديثات مستمرة"],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "AWS"],
    slug: "custom-mobile-app-development",
    ctaText: "Get a Free App Estimate",
    ctaTextAr: "احصل على تقدير مجاني للتطبيق",
    stat1: { value: "12 Wks", label: "Avg Launch Time", labelAr: "متوسط وقت الإطلاق" },
    stat2: { value: "50+", label: "Apps Delivered", labelAr: "تطبيق تم تسليمه" },
    stat3: { value: "4.8", label: "App Store Rating", labelAr: "تقييم المتجر" },
    subjectLines: [
      {
        subject: "Launch Your Mobile App in 12 Weeks - Here's How",
        subjectAr: "أطلق تطبيقك الجوال في 12 أسبوع - إليك كيف",
        preview: "Native iOS and Android apps with cross-platform efficiency. 50+ apps delivered.",
        previewAr: "تطبيقات iOS و Android أصلية بكفاءة منصات متعددة. 50+ تطبيق تم تسليمه."
      },
      {
        subject: "Your Customers Expect Mobile Apps - Are You Ready?",
        subjectAr: "عملاؤك يتوقعون تطبيقات جوال - هل أنت جاهز؟",
        preview: "Build high-performance mobile applications that your customers love.",
        previewAr: "ابنِ تطبيقات جوال عالية الأداء يحبها عملاؤك."
      },
      {
        subject: "Native vs Cross-Platform: Which Mobile Strategy is Right for You?",
        subjectAr: "الأصلي مقابل منصات متعددة: أي استراتيجية جوال مناسبة لك؟",
        preview: "Expert guidance on choosing the right mobile development approach.",
        previewAr: "إرشادات خبيرة حول اختيار نهج تطوير الجوال المناسب."
      },
      {
        subject: "How to Build a Mobile App That Gets 4.8 Stars",
        subjectAr: "كيف تبني تطبيق جوال يحصل على 4.8 نجمة",
        preview: "Learn from our 50+ successful app launches. Get the blueprint.",
        previewAr: "تعلم من 50+ إطلاق تطبيق ناجح. احصل على المخطط."
      },
      {
        subject: "The Complete Mobile App Development Guide for Saudi Businesses",
        subjectAr: "دليل تطوير تطبيقات الجوال الكامل للشركات السعودية",
        preview: "Everything you need to know about building mobile apps in Saudi Arabia.",
        previewAr: "كل ما تحتاج معرفته عن بناء تطبيقات الجوال في المملكة العربية السعودية."
      },
      {
        subject: "Why Your Business Needs a Mobile App in 2024",
        subjectAr: "لماذا يحتاج عملك تطبيق جوال في 2024",
        preview: "98% smartphone penetration in Saudi Arabia. Don't miss the opportunity.",
        previewAr: "98% انتشار الهواتف الذكية في المملكة. لا تفوت الفرصة."
      },
      {
        subject: "From Concept to App Store: Your 12-Week Roadmap",
        subjectAr: "من المفهوم إلى متجر التطبيقات: خارطة طريقك لـ 12 أسبوع",
        preview: "Step-by-step guide to launching your mobile app successfully.",
        previewAr: "دليل خطوة بخطوة لإطلاق تطبيقك الجوال بنجاح."
      },
      {
        subject: "Mobile App Development: What It Really Costs (And How to Save)",
        subjectAr: "تطوير تطبيقات الجوال: التكلفة الحقيقية (وكيفية التوفير)",
        preview: "Breakdown of mobile app development costs and how to optimize your budget.",
        previewAr: "تفصيل تكاليف تطوير تطبيقات الجوال وكيفية تحسين ميزانيتك."
      },
      {
        subject: "5 Mobile App Features That Drive User Engagement",
        subjectAr: "5 ميزات تطبيق جوال تحفز تفاعل المستخدمين",
        preview: "Learn which features make mobile apps successful in the Saudi market.",
        previewAr: "تعلم الميزات التي تجعل تطبيقات الجوال ناجحة في السوق السعودي."
      },
      {
        subject: "Case Study: How We Built a 4.8-Star App in 10 Weeks",
        subjectAr: "دراسة حالة: كيف بنينا تطبيق 4.8 نجمة في 10 أسابيع",
        preview: "Real example of successful mobile app development. Read the full story.",
        previewAr: "مثال حقيقي لتطوير تطبيق جوال ناجح. اقرأ القصة الكاملة."
      }
    ]
  },
  {
    id: "web-dev",
    title: "Web Development",
    titleAr: "تطوير الويب",
    subtitle: "Enterprise Web Apps",
    subtitleAr: "تطبيقات ويب مؤسسية",
    tagline: "Modern Web Apps That Scale With Your Business",
    taglineAr: "تطبيقات ويب حديثة تنمو مع أعمالك",
    description: "Enterprise-grade web applications, customer portals, and admin dashboards built with cutting-edge technology for performance and scalability.",
    descriptionAr: "تطبيقات ويب مؤسسية، بوابات عملاء، ولوحات تحكم مبنية بأحدث التقنيات للأداء والتوسع.",
    problem: "Your legacy web systems are slow, hard to maintain, and can't handle growth. Security vulnerabilities put your data at risk. Poor user experience frustrates customers.",
    problemAr: "أنظمة الويب القديمة بطيئة، صعبة الصيانة، ولا تستوعب النمو. ثغرات أمنية تعرض بياناتك للخطر. تجربة مستخدم سيئة تحبط العملاء.",
    solution: "Modern Progressive Web Apps and Single Page Applications using React and Next.js. Instant loading, scales to millions of users, automated CI/CD pipelines.",
    solutionAr: "تطبيقات ويب تقدمية وتطبيقات صفحة واحدة باستخدام React و Next.js. تحميل فوري، تتوسع لملايين المستخدمين، أنابيب CI/CD آلية.",
    features: ["Server-side rendering for SEO", "API-first microservices architecture", "Real-time dashboards", "Role-based access control", "Automated testing & CI/CD", "Cloud-native deployment"],
    featuresAr: ["عرض من الخادم لتحسين SEO", "بنية خدمات مصغرة API-first", "لوحات تحكم فورية", "تحكم بالوصول حسب الدور", "اختبار آلي و CI/CD", "نشر سحابي أصلي"],
    benefits: ["99.9% uptime guarantee", "Scales to 1M+ users", "SEO-optimized"],
    benefitsAr: ["ضمان تشغيل 99.9%", "يتوسع لأكثر من مليون مستخدم", "محسّن لمحركات البحث"],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    slug: "custom-web-development",
    ctaText: "Start Your Web Project",
    ctaTextAr: "ابدأ مشروع الويب الخاص بك",
    stat1: { value: "99.9%", label: "Uptime", labelAr: "وقت التشغيل" },
    stat2: { value: "<2s", label: "Load Time", labelAr: "وقت التحميل" },
    stat3: { value: "100+", label: "Web Apps Built", labelAr: "تطبيق ويب مبني" },
    subjectLines: [
      {
        subject: "Modern Web Apps That Scale to Millions of Users",
        subjectAr: "تطبيقات ويب حديثة تتوسع لملايين المستخدمين",
        preview: "Enterprise-grade web applications with 99.9% uptime and <2s load time.",
        previewAr: "تطبيقات ويب مؤسسية مع 99.9% وقت تشغيل و<2 ثانية وقت تحميل."
      },
      {
        subject: "Is Your Website Losing Customers? Here's Why (And How to Fix It)",
        subjectAr: "هل موقعك يفقد العملاء؟ إليك السبب (وكيفية إصلاحه)",
        preview: "Slow websites cost businesses millions. Modernize your web platform now.",
        previewAr: "المواقع البطيئة تكلف الشركات الملايين. حدّث منصة الويب الخاصة بك الآن."
      },
      {
        subject: "The Complete Guide to Enterprise Web Development",
        subjectAr: "الدليل الكامل لتطوير الويب المؤسسي",
        preview: "Everything you need to know about building scalable web applications.",
        previewAr: "كل ما تحتاج معرفته عن بناء تطبيقات ويب قابلة للتوسع."
      },
      {
        subject: "100+ Web Apps Built: What We Learned About Success",
        subjectAr: "100+ تطبيق ويب مبني: ما تعلمناه عن النجاح",
        preview: "Key insights from building enterprise web applications for Saudi companies.",
        previewAr: "رؤى رئيسية من بناء تطبيقات ويب مؤسسية للشركات السعودية."
      },
      {
        subject: "Why 99.9% Uptime Matters for Your Business",
        subjectAr: "لماذا 99.9% وقت تشغيل مهم لأعمالك",
        preview: "Every minute of downtime costs money. Learn how to achieve maximum uptime.",
        previewAr: "كل دقيقة من التوقف تكلف المال. تعلم كيفية تحقيق أقصى وقت تشغيل."
      },
      {
        subject: "From Legacy Systems to Modern Web Apps: A Transformation Guide",
        subjectAr: "من الأنظمة القديمة إلى تطبيقات الويب الحديثة: دليل التحول",
        preview: "Step-by-step guide to modernizing your web infrastructure.",
        previewAr: "دليل خطوة بخطوة لتحديث البنية التحتية للويب الخاصة بك."
      },
      {
        subject: "Web Development Costs: What You Should Really Expect",
        subjectAr: "تكاليف تطوير الويب: ما يجب أن تتوقعه حقاً",
        preview: "Transparent breakdown of web development pricing and timelines.",
        previewAr: "تفصيل شفاف لتسعير وجداول تطوير الويب."
      },
      {
        subject: "5 Web Development Trends Shaping 2024",
        subjectAr: "5 اتجاهات تطوير ويب تشكل 2024",
        preview: "Stay ahead with the latest web development technologies and practices.",
        previewAr: "ابقَ في المقدمة مع أحدث تقنيات وممارسات تطوير الويب."
      },
      {
        subject: "Customer Portals That Actually Work: A Case Study",
        subjectAr: "بوابات عملاء تعمل فعلاً: دراسة حالة",
        preview: "How we built a customer portal that increased engagement by 300%.",
        previewAr: "كيف بنينا بوابة عملاء زادت التفاعل بنسبة 300%."
      },
      {
        subject: "The Secret to Building Web Apps That Load in Under 2 Seconds",
        subjectAr: "سر بناء تطبيقات ويب تحمل في أقل من ثانيتين",
        preview: "Performance optimization techniques that actually work. Learn our approach.",
        previewAr: "تقنيات تحسين الأداء التي تعمل فعلاً. تعلم نهجنا."
      }
    ]
  },
  {
    id: "on-demand",
    title: "On-Demand Platforms",
    titleAr: "منصات حسب الطلب",
    subtitle: "Uber-like Apps",
    subtitleAr: "تطبيقات مثل أوبر",
    tagline: "Build Your Own Uber-Style Platform",
    taglineAr: "ابنِ منصتك الخاصة على غرار أوبر",
    description: "Complete on-demand service platforms connecting customers, service providers, and administrators with real-time logistics and intelligent dispatching.",
    descriptionAr: "منصات خدمات حسب الطلب كاملة تربط العملاء ومقدمي الخدمات والمسؤولين بلوجستيات فورية وتوزيع ذكي.",
    problem: "Building multi-sided marketplaces is complex. You need real-time GPS tracking, intelligent dispatching, split payments, and coordination between customers, drivers, and vendors.",
    problemAr: "بناء أسواق متعددة الأطراف معقد. تحتاج تتبع GPS فوري، توزيع ذكي، مدفوعات مقسمة، وتنسيق بين العملاء والسائقين والبائعين.",
    solution: "Our battle-tested on-demand platform includes real-time GPS tracking, AI-powered dispatching, multi-payment processing, and separate apps for all user types.",
    solutionAr: "منصتنا المُختبرة تشمل تتبع GPS فوري، توزيع ذكي بالذكاء الاصطناعي، معالجة مدفوعات متعددة، وتطبيقات منفصلة لجميع أنواع المستخدمين.",
    features: ["Real-time GPS tracking", "AI-powered dispatching", "Multi-payment gateway", "Driver/provider wallets", "Rating & review system", "Admin analytics dashboard"],
    featuresAr: ["تتبع GPS فوري", "توزيع ذكي بالذكاء الاصطناعي", "بوابات دفع متعددة", "محافظ للسائقين ومقدمي الخدمات", "نظام التقييمات والمراجعات", "لوحة تحليلات للمسؤولين"],
    benefits: ["Proven architecture", "Scales to 100K+ orders/day", "24/7 support"],
    benefitsAr: ["بنية مُثبتة وموثوقة", "يتوسع لأكثر من 100 ألف طلب يومياً", "دعم على مدار الساعة"],
    techStack: ["React Native", "Node.js", "MongoDB", "Redis", "Socket.io", "Google Maps"],
    slug: "on-demand-app-development",
    ctaText: "Launch Your Platform",
    ctaTextAr: "أطلق منصتك",
    stat1: { value: "10 Wks", label: "To Launch", labelAr: "للإطلاق" },
    stat2: { value: "100K+", label: "Daily Orders", labelAr: "طلب يومي" },
    stat3: { value: "15+", label: "Platforms Built", labelAr: "منصة مبنية" },
    subjectLines: [
      {
        subject: "Build Your Own Uber-Style Platform in 10 Weeks",
        subjectAr: "ابنِ منصتك الخاصة على غرار أوبر في 10 أسابيع",
        preview: "Complete on-demand platform with real-time GPS, AI dispatching, and multi-payment support.",
        previewAr: "منصة حسب الطلب كاملة مع GPS فوري وتوزيع ذكي بالذكاء الاصطناعي ودعم مدفوعات متعددة."
      },
      {
        subject: "The Complete Guide to Building On-Demand Service Platforms",
        subjectAr: "الدليل الكامل لبناء منصات الخدمات حسب الطلب",
        preview: "Learn how to build multi-sided marketplaces that scale to 100K+ daily orders.",
        previewAr: "تعلم كيفية بناء أسواق متعددة الأطراف تتوسع لأكثر من 100 ألف طلب يومياً."
      },
      {
        subject: "How We Built 15+ On-Demand Platforms (And What We Learned)",
        subjectAr: "كيف بنينا 15+ منصة حسب الطلب (وما تعلمناه)",
        preview: "Key insights from building Uber-like platforms for Saudi businesses.",
        previewAr: "رؤى رئيسية من بناء منصات على غرار أوبر للشركات السعودية."
      },
      {
        subject: "Real-Time GPS Tracking: The Secret to On-Demand Success",
        subjectAr: "تتبع GPS فوري: سر نجاح الخدمات حسب الطلب",
        preview: "Discover how intelligent logistics make or break on-demand platforms.",
        previewAr: "اكتشف كيف تجعل اللوجستيات الذكية منصات حسب الطلب تنجح أو تفشل."
      },
      {
        subject: "From Idea to Launch: Your 10-Week On-Demand Platform Roadmap",
        subjectAr: "من الفكرة إلى الإطلاق: خارطة طريق منصتك حسب الطلب لـ 10 أسابيع",
        preview: "Step-by-step guide to launching your on-demand service platform.",
        previewAr: "دليل خطوة بخطوة لإطلاق منصة الخدمات حسب الطلب الخاصة بك."
      },
      {
        subject: "Why On-Demand Platforms Are Booming in Saudi Arabia",
        subjectAr: "لماذا تزدهر منصات حسب الطلب في المملكة العربية السعودية",
        preview: "Market insights and opportunities in the Saudi on-demand economy.",
        previewAr: "رؤى السوق والفرص في الاقتصاد السعودي حسب الطلب."
      },
      {
        subject: "The Technology Stack Behind Successful On-Demand Platforms",
        subjectAr: "البنية التقنية وراء منصات حسب الطلب الناجحة",
        preview: "Learn which technologies power platforms that handle 100K+ orders daily.",
        previewAr: "تعلم التقنيات التي تشغل المنصات التي تتعامل مع أكثر من 100 ألف طلب يومياً."
      },
      {
        subject: "Case Study: How We Built a Food Delivery Platform in 8 Weeks",
        subjectAr: "دراسة حالة: كيف بنينا منصة توصيل طعام في 8 أسابيع",
        preview: "Real example of rapid on-demand platform development. Read the full story.",
        previewAr: "مثال حقيقي لتطوير منصة حسب الطلب السريع. اقرأ القصة الكاملة."
      },
      {
        subject: "Multi-Payment Processing: Essential for On-Demand Success",
        subjectAr: "معالجة مدفوعات متعددة: ضرورية لنجاح الخدمات حسب الطلب",
        preview: "Why supporting multiple payment methods is critical for on-demand platforms.",
        previewAr: "لماذا دعم طرق دفع متعددة أمر بالغ الأهمية لمنصات حسب الطلب."
      },
      {
        subject: "Scale Your On-Demand Platform to 100K+ Daily Orders",
        subjectAr: "وسّع منصتك حسب الطلب لأكثر من 100 ألف طلب يومياً",
        preview: "Architecture patterns and best practices for scaling on-demand services.",
        previewAr: "أنماط البنية وأفضل الممارسات لتوسيع الخدمات حسب الطلب."
      }
    ]
  },
  {
    id: "clone-app",
    title: "Clone App Development",
    titleAr: "تطوير تطبيقات مستنسخة",
    subtitle: "White-Label Solutions",
    subtitleAr: "حلول وايت ليبل",
    tagline: "Launch 3X Faster with Proven Templates",
    taglineAr: "أطلق أسرع 3 مرات بقوالب مثبتة",
    description: "Production-ready app templates that can be fully customized to match your brand. Skip months of development and go to market faster.",
    descriptionAr: "قوالب تطبيقات جاهزة للإنتاج يمكن تخصيصها بالكامل لتناسب علامتك التجارية. تخطى أشهر التطوير واذهب للسوق أسرع.",
    problem: "Building from scratch takes 12-18 months and costs hundreds of thousands. Your competitors are moving faster. The market opportunity may have passed.",
    problemAr: "البناء من الصفر يستغرق 12-18 شهراً ويكلف مئات الآلاف. منافسوك يتحركون أسرع. فرصة السوق قد تضيع.",
    solution: "Our white-label solutions are production-ready and battle-tested. Customize the UI, integrate your brand, and launch in weeks instead of years.",
    solutionAr: "حلولنا جاهزة ومُختبرة. خصّص واجهة المستخدم، وأضف علامتك التجارية، وأطلق في أسابيع بدلاً من سنوات.",
    features: ["Fully customizable UI/branding", "Pre-built user authentication", "Payment integration ready", "Admin dashboard included", "Scalable cloud infrastructure", "Documentation & training"],
    featuresAr: ["واجهة مستخدم قابلة للتخصيص بالكامل", "نظام مصادقة مستخدمين جاهز", "جاهز لتكامل الدفع", "لوحة تحكم مضمّنة", "بنية سحابية قابلة للتوسع", "توثيق وتدريب"],
    benefits: ["70% cost reduction", "8-week deployment", "Proven architecture"],
    benefitsAr: ["توفير 70% من التكاليف", "إطلاق خلال 8 أسابيع", "بنية مُثبتة وموثوقة"],
    techStack: ["React Native", "React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    slug: "clone-app-development",
    ctaText: "See Available Templates",
    ctaTextAr: "شاهد القوالب المتاحة",
    stat1: { value: "8 Wks", label: "To Launch", labelAr: "للإطلاق" },
    stat2: { value: "70%", label: "Cost Savings", labelAr: "توفير في التكاليف" },
    stat3: { value: "20+", label: "Templates", labelAr: "قالب" },
    subjectLines: [
      {
        subject: "Launch Your App 3X Faster with White-Label Solutions",
        subjectAr: "أطلق تطبيقك أسرع 3 مرات بحلول وايت ليبل",
        preview: "Production-ready templates. Save 70% on costs and launch in 8 weeks.",
        previewAr: "قوالب جاهزة للإنتاج. وفر 70% من التكاليف وأطلق خلال 8 أسابيع."
      },
      {
        subject: "Skip 12-18 Months of Development - Launch in 8 Weeks",
        subjectAr: "تخطى 12-18 شهراً من التطوير - أطلق خلال 8 أسابيع",
        preview: "Proven app templates that can be fully customized to match your brand.",
        previewAr: "قوالب تطبيقات مُثبتة يمكن تخصيصها بالكامل لتناسب علامتك التجارية."
      },
      {
        subject: "20+ Production-Ready App Templates Available Now",
        subjectAr: "20+ قالب تطبيق جاهز للإنتاج متاح الآن",
        preview: "From Uber clones to e-commerce platforms - find your perfect template.",
        previewAr: "من استنساخ أوبر إلى منصات التجارة الإلكترونية - ابحث عن القالب المثالي."
      },
      {
        subject: "The Real Cost of Building Apps from Scratch (And the Alternative)",
        subjectAr: "التكلفة الحقيقية لبناء التطبيقات من الصفر (والبديل)",
        preview: "Why white-label solutions save time and money without sacrificing quality.",
        previewAr: "لماذا توفر حلول وايت ليبل الوقت والمال دون التضحية بالجودة."
      },
      {
        subject: "How to Go to Market 3X Faster Than Your Competitors",
        subjectAr: "كيف تذهب للسوق أسرع 3 مرات من منافسيك",
        preview: "The secret weapon successful startups use to launch faster.",
        previewAr: "السلاح السري الذي تستخدمه الشركات الناشئة الناجحة لإطلاق أسرع."
      },
      {
        subject: "White-Label vs Custom Development: Which is Right for You?",
        subjectAr: "وايت ليبل مقابل التطوير المخصص: أيهما مناسب لك؟",
        preview: "A detailed comparison to help you make the right decision for your business.",
        previewAr: "مقارنة مفصلة لمساعدتك على اتخاذ القرار الصحيح لأعمالك."
      },
      {
        subject: "Case Study: How We Launched an App in 6 Weeks Using Templates",
        subjectAr: "دراسة حالة: كيف أطلقنا تطبيقاً في 6 أسابيع باستخدام القوالب",
        preview: "Real example of rapid app development. Read the full story.",
        previewAr: "مثال حقيقي لتطوير تطبيق سريع. اقرأ القصة الكاملة."
      },
      {
        subject: "Customize Your App Template: What's Possible?",
        subjectAr: "خصص قالب تطبيقك: ما الممكن؟",
        preview: "Learn how much you can customize white-label solutions to match your brand.",
        previewAr: "تعلم كم يمكنك تخصيص حلول وايت ليبل لتناسب علامتك التجارية."
      },
      {
        subject: "The Hidden Costs of Building Apps from Scratch",
        subjectAr: "التكاليف الخفية لبناء التطبيقات من الصفر",
        preview: "Beyond development: discover all the costs you might not be considering.",
        previewAr: "بعد التطوير: اكتشف جميع التكاليف التي قد لا تفكر فيها."
      },
      {
        subject: "From Template to Launch: Your 8-Week Roadmap",
        subjectAr: "من القالب إلى الإطلاق: خارطة طريقك لـ 8 أسابيع",
        preview: "Step-by-step guide to customizing and launching your white-label app.",
        previewAr: "دليل خطوة بخطوة لتخصيص وإطلاق تطبيق وايت ليبل الخاص بك."
      }
    ]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    titleAr: "تصميم واجهة المستخدم",
    subtitle: "User-Centered Design",
    subtitleAr: "تصميم محوره المستخدم",
    tagline: "Design That Converts Visitors to Customers",
    taglineAr: "تصميم يحوّل الزوار إلى عملاء",
    description: "Research-backed UI/UX design that creates intuitive, beautiful interfaces. Increase conversions, reduce support tickets, and delight your users.",
    descriptionAr: "تصميم UI/UX مدعوم بالبحث يخلق واجهات بديهية وجميلة. زد التحويلات، قلل تذاكر الدعم، وأسعد مستخدميك.",
    problem: "Your product works but users struggle with it. High bounce rates, abandoned carts, and constant support requests indicate poor UX.",
    problemAr: "منتجك يعمل لكن المستخدمين يعانون معه. معدلات ارتداد عالية، سلات متروكة، وطلبات دعم مستمرة تشير لتجربة مستخدم سيئة.",
    solution: "Our design team conducts user research, creates data-driven wireframes, and delivers pixel-perfect designs tested with real users.",
    solutionAr: "فريق التصميم لدينا يُجري أبحاث المستخدمين، ويُنشئ نماذج أولية مبنية على البيانات، ويُقدم تصاميم دقيقة مُختبرة مع مستخدمين حقيقيين.",
    features: ["User research & personas", "Interactive prototypes", "Usability testing", "Design system creation", "Accessibility compliance (WCAG)", "Developer handoff files"],
    featuresAr: ["أبحاث المستخدمين وتحليل الشخصيات", "نماذج أولية تفاعلية", "اختبار قابلية الاستخدام", "إنشاء نظام تصميم متكامل", "الامتثال لمعايير الوصول (WCAG)", "ملفات جاهزة للمطورين"],
    benefits: ["Increase conversions 40%+", "Reduce support tickets", "Faster development"],
    benefitsAr: ["زيادة التحويلات بأكثر من 40%", "تقليل طلبات الدعم", "تسريع عملية التطوير"],
    techStack: ["Figma", "Adobe XD", "Principle", "InVision", "Zeplin", "Maze"],
    slug: "ui-ux-design-services",
    ctaText: "Book a Design Audit",
    ctaTextAr: "احجز مراجعة تصميم",
    stat1: { value: "40%+", label: "Conversion Lift", labelAr: "زيادة التحويلات" },
    stat2: { value: "200+", label: "Projects", labelAr: "مشروع" },
    stat3: { value: "5 Days", label: "First Concepts", labelAr: "المفاهيم الأولى" },
    subjectLines: [
      {
        subject: "Increase Conversions by 40%+ with Better UI/UX Design",
        subjectAr: "زد التحويلات بأكثر من 40% بتصميم UI/UX أفضل",
        preview: "Research-backed design that converts visitors to customers. 200+ projects delivered.",
        previewAr: "تصميم مدعوم بالبحث يحول الزوار إلى عملاء. 200+ مشروع منجز."
      },
      {
        subject: "Is Poor UX Costing You Customers? Here's How to Fix It",
        subjectAr: "هل تجربة المستخدم السيئة تكلفك العملاء؟ إليك كيفية إصلاحها",
        preview: "High bounce rates and abandoned carts? Learn how good design solves these problems.",
        previewAr: "معدلات ارتداد عالية وسلات متروكة؟ تعلم كيف يحل التصميم الجيد هذه المشاكل."
      },
      {
        subject: "The Complete Guide to UI/UX Design for Saudi Businesses",
        subjectAr: "الدليل الكامل لتصميم UI/UX للشركات السعودية",
        preview: "Everything you need to know about creating designs that convert in the Saudi market.",
        previewAr: "كل ما تحتاج معرفته عن إنشاء تصاميم تحول في السوق السعودي."
      },
      {
        subject: "From Wireframe to Launch: Your 5-Day Design Process",
        subjectAr: "من النموذج الأولي إلى الإطلاق: عملية التصميم الخاصة بك لـ 5 أيام",
        preview: "See how we deliver pixel-perfect designs in just 5 days.",
        previewAr: "شاهد كيف نقدم تصاميم دقيقة في 5 أيام فقط."
      },
      {
        subject: "Why User Research Matters (And How to Do It Right)",
        subjectAr: "لماذا يهم بحث المستخدم (وكيفية القيام به بشكل صحيح)",
        preview: "Learn how understanding your users leads to better design decisions.",
        previewAr: "تعلم كيف يؤدي فهم مستخدميك إلى قرارات تصميم أفضل."
      },
      {
        subject: "Design Systems: The Secret to Consistent, Scalable Products",
        subjectAr: "أنظمة التصميم: سر المنتجات المتسقة والقابلة للتوسع",
        preview: "How design systems help teams build faster and maintain consistency.",
        previewAr: "كيف تساعد أنظمة التصميم الفرق على البناء أسرع والحفاظ على الاتساق."
      },
      {
        subject: "Accessibility in Design: Why WCAG Compliance Matters",
        subjectAr: "إمكانية الوصول في التصميم: لماذا يهم الامتثال لـ WCAG",
        preview: "Learn how accessible design expands your market and improves UX for everyone.",
        previewAr: "تعلم كيف يوسع التصميم القابل للوصول سوقك ويحسن تجربة المستخدم للجميع."
      },
      {
        subject: "Case Study: How Better Design Increased Sales by 300%",
        subjectAr: "دراسة حالة: كيف زاد التصميم الأفضل المبيعات بنسبة 300%",
        preview: "Real results from redesigning a Saudi e-commerce platform. Read the full story.",
        previewAr: "نتائج حقيقية من إعادة تصميم منصة تجارة إلكترونية سعودية. اقرأ القصة الكاملة."
      },
      {
        subject: "Mobile-First Design: Why It's Essential in 2024",
        subjectAr: "التصميم الذي يعطي أولوية للجوال: لماذا هو ضروري في 2024",
        preview: "With 98% smartphone penetration in Saudi Arabia, mobile-first is no longer optional.",
        previewAr: "مع 98% انتشار الهواتف الذكية في المملكة، التصميم الذي يعطي أولوية للجوال لم يعد اختيارياً."
      },
      {
        subject: "The ROI of Good Design: What 200+ Projects Taught Us",
        subjectAr: "عائد الاستثمار من التصميم الجيد: ما تعلمناه من 200+ مشروع",
        preview: "Key insights on how design impacts business metrics and user satisfaction.",
        previewAr: "رؤى رئيسية حول كيف يؤثر التصميم على مقاييس الأعمال ورضا المستخدمين."
      }
    ]
  },
  {
    id: "consulting",
    title: "Technology Consulting",
    titleAr: "الاستشارات التقنية",
    subtitle: "Strategic IT Advisory",
    subtitleAr: "استشارات تقنية استراتيجية",
    tagline: "Strategic Technology Roadmap for Growth",
    taglineAr: "خارطة طريق تقنية استراتيجية للنمو",
    description: "Expert guidance on technology strategy, architecture decisions, and digital transformation. Align your tech investments with business goals.",
    descriptionAr: "إرشادات خبيرة حول استراتيجية التقنية، قرارات البنية، والتحول الرقمي. وائم استثماراتك التقنية مع أهداف الأعمال.",
    problem: "Technology decisions are risky. Wrong choices lead to wasted budgets, failed projects, and technical debt. You need an experienced partner.",
    problemAr: "القرارات التقنية محفوفة بالمخاطر. الخيارات الخاطئة تؤدي لميزانيات ضائعة، مشاريع فاشلة، وديون تقنية. تحتاج شريكاً خبيراً.",
    solution: "Our consultants bring 50+ years of combined experience. We help you define a technology roadmap, evaluate vendors, and build internal capabilities.",
    solutionAr: "مستشارونا يمتلكون أكثر من 50 سنة خبرة مجتمعة. نساعدك في وضع خارطة طريق تقنية، وتقييم الموردين، وبناء القدرات الداخلية.",
    features: ["Technology stack assessment", "Architecture design review", "Vendor evaluation & selection", "Digital transformation roadmap", "Team training & enablement", "Ongoing advisory retainer"],
    featuresAr: ["تقييم البنية التقنية", "مراجعة التصميم المعماري", "تقييم واختيار الموردين", "خارطة طريق التحول الرقمي", "تدريب وتمكين الفريق", "استشارات مستمرة"],
    benefits: ["Avoid costly mistakes", "Accelerate decisions", "Reduce technical debt"],
    benefitsAr: ["تجنب الأخطاء المكلفة", "تسريع اتخاذ القرارات", "تقليل الديون التقنية"],
    techStack: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Various"],
    slug: "technology-consulting-services",
    ctaText: "Schedule Strategy Call",
    ctaTextAr: "جدول مكالمة استراتيجية",
    stat1: { value: "50+", label: "Years Experience", labelAr: "سنة خبرة" },
    stat2: { value: "30+", label: "Enterprises", labelAr: "مؤسسة" },
    stat3: { value: "SAR 10M+", label: "Savings Delivered", labelAr: "توفير محقق" },
    subjectLines: [
      {
        subject: "Avoid Costly Tech Mistakes: Get Expert Technology Consulting",
        subjectAr: "تجنب أخطاء تقنية مكلفة: احصل على استشارات تقنية خبيرة",
        preview: "50+ years of combined experience. We've helped 30+ enterprises save SAR 10M+.",
        previewAr: "50+ سنة خبرة مجتمعة. ساعدنا 30+ مؤسسة على توفير أكثر من 10 ملايين ريال."
      },
      {
        subject: "The Technology Roadmap Your Business Needs in 2024",
        subjectAr: "خارطة الطريق التقنية التي يحتاجها عملك في 2024",
        preview: "Strategic guidance on technology decisions that align with your business goals.",
        previewAr: "إرشادات استراتيجية حول قرارات التقنية التي تتماشى مع أهداف أعمالك."
      },
      {
        subject: "How to Choose the Right Technology Stack (Without the Risk)",
        subjectAr: "كيفية اختيار البنية التقنية المناسبة (بدون المخاطرة)",
        preview: "Expert guidance on selecting technologies that scale with your business.",
        previewAr: "إرشادات خبيرة حول اختيار التقنيات التي تتوسع مع أعمالك."
      },
      {
        subject: "Digital Transformation: Where to Start?",
        subjectAr: "التحول الرقمي: من أين تبدأ؟",
        preview: "A practical guide to digital transformation for Saudi businesses.",
        previewAr: "دليل عملي للتحول الرقمي للشركات السعودية."
      },
      {
        subject: "The Real Cost of Wrong Technology Decisions",
        subjectAr: "التكلفة الحقيقية لقرارات التقنية الخاطئة",
        preview: "Learn how poor tech choices lead to wasted budgets and failed projects.",
        previewAr: "تعلم كيف تؤدي خيارات التقنية السيئة لميزانيات ضائعة ومشاريع فاشلة."
      },
      {
        subject: "Cloud Migration Strategy: A Step-by-Step Guide",
        subjectAr: "استراتيجية الهجرة السحابية: دليل خطوة بخطوة",
        preview: "Expert advice on migrating to the cloud safely and efficiently.",
        previewAr: "نصائح خبيرة حول الهجرة إلى السحابة بأمان وكفاءة."
      },
      {
        subject: "Vendor Evaluation: How to Choose the Right Tech Partner",
        subjectAr: "تقييم الموردين: كيفية اختيار شريك التقنية المناسب",
        preview: "Framework for evaluating and selecting technology vendors.",
        previewAr: "إطار عمل لتقييم واختيار موردي التقنية."
      },
      {
        subject: "Case Study: How We Saved a Company SAR 2M in Tech Costs",
        subjectAr: "دراسة حالة: كيف وفرنا لشركة 2 مليون ريال في التكاليف التقنية",
        preview: "Real example of strategic technology consulting. Read the full story.",
        previewAr: "مثال حقيقي للاستشارات التقنية الاستراتيجية. اقرأ القصة الكاملة."
      },
      {
        subject: "Building Internal Tech Capabilities: A Strategic Approach",
        subjectAr: "بناء القدرات التقنية الداخلية: نهج استراتيجي",
        preview: "Learn how to build and train internal teams for long-term success.",
        previewAr: "تعلم كيفية بناء وتدريب الفرق الداخلية للنجاح طويل المدى."
      },
      {
        subject: "Technology Audit: Is Your Current Stack Holding You Back?",
        subjectAr: "تدقيق التقنية: هل البنية الحالية تعيقك؟",
        preview: "Comprehensive assessment of your technology infrastructure and recommendations.",
        previewAr: "تقييم شامل للبنية التحتية التقنية الخاصة بك والتوصيات."
      }
    ]
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    titleAr: "التسويق الرقمي",
    subtitle: "Growth Marketing",
    subtitleAr: "تسويق النمو",
    tagline: "Data-Driven Marketing That Delivers ROI",
    taglineAr: "تسويق مبني على البيانات يحقق عائد استثمار",
    description: "Comprehensive digital marketing strategies that increase visibility, drive qualified traffic, and convert visitors into paying customers.",
    descriptionAr: "استراتيجيات تسويق رقمي شاملة تزيد الظهور، تجلب زيارات مؤهلة، وتحول الزوار إلى عملاء دافعين.",
    problem: "You're spending on ads but not seeing results. Your competitors rank higher on Google. Social media engagement is flat.",
    problemAr: "تنفق على الإعلانات لكن لا ترى نتائج. منافسوك يتصدرون جوجل. التفاعل على وسائل التواصل ثابت.",
    solution: "Integrated marketing strategies across SEO, paid advertising, social media, and content. Our tech background means we implement tracking and automation.",
    solutionAr: "استراتيجيات تسويق متكاملة عبر SEO، الإعلانات المدفوعة، وسائل التواصل، والمحتوى. خلفيتنا التقنية تعني تطبيق تتبع وأتمتة.",
    features: ["SEO & content strategy", "Google & Meta Ads management", "Social media marketing", "Marketing automation", "Conversion rate optimization", "Analytics & reporting"],
    featuresAr: ["استراتيجية SEO والمحتوى", "إدارة إعلانات جوجل وميتا", "تسويق وسائل التواصل", "أتمتة التسويق", "تحسين معدل التحويل", "تحليلات وتقارير"],
    benefits: ["Measurable ROI", "Qualified leads", "Brand awareness"],
    benefitsAr: ["عائد استثمار قابل للقياس", "عملاء محتملون مؤهلون", "وعي بالعلامة التجارية"],
    techStack: ["Google Analytics", "Google Ads", "Meta Ads", "HubSpot", "SEMrush", "Mailchimp"],
    slug: "digital-marketing-services",
    ctaText: "Get a Free Marketing Audit",
    ctaTextAr: "احصل على مراجعة تسويقية مجانية",
    stat1: { value: "3X", label: "Avg ROI", labelAr: "متوسط عائد الاستثمار" },
    stat2: { value: "50+", label: "Campaigns", labelAr: "حملة" },
    stat3: { value: "1M+", label: "Leads Generated", labelAr: "عميل محتمل" },
    subjectLines: [
      {
        subject: "Stop Wasting Money on Ads That Don't Work",
        subjectAr: "توقف عن إهدار المال على إعلانات لا تعمل",
        preview: "Data-driven marketing that delivers 3X ROI. 50+ successful campaigns, 1M+ leads generated.",
        previewAr: "تسويق مبني على البيانات يحقق 3 أضعاف عائد الاستثمار. 50+ حملة ناجحة، أكثر من مليون عميل محتمل."
      },
      {
        subject: "Why Your Competitors Rank Higher on Google (And How to Beat Them)",
        subjectAr: "لماذا يتصدر منافسوك جوجل (وكيفية التغلب عليهم)",
        preview: "SEO strategies that actually work for Saudi businesses. Get your free audit.",
        previewAr: "استراتيجيات SEO تعمل فعلاً للشركات السعودية. احصل على مراجعتك المجانية."
      },
      {
        subject: "The Complete Digital Marketing Guide for Saudi Businesses",
        subjectAr: "الدليل الكامل للتسويق الرقمي للشركات السعودية",
        preview: "Everything you need to know about digital marketing in the Saudi market.",
        previewAr: "كل ما تحتاج معرفته عن التسويق الرقمي في السوق السعودي."
      },
      {
        subject: "How We Generated 1M+ Leads for Our Clients",
        subjectAr: "كيف ولدنا أكثر من مليون عميل محتمل لعملائنا",
        preview: "Proven strategies for lead generation that work in the Saudi market.",
        previewAr: "استراتيجيات مُثبتة لتوليد العملاء المحتملين تعمل في السوق السعودي."
      },
      {
        subject: "Marketing Automation: The Secret to Scaling Your Business",
        subjectAr: "أتمتة التسويق: سر توسيع أعمالك",
        preview: "Learn how automation helps you reach more customers with less effort.",
        previewAr: "تعلم كيف تساعدك الأتمتة على الوصول لمزيد من العملاء بجهد أقل."
      },
      {
        subject: "Social Media Marketing: What Works in Saudi Arabia",
        subjectAr: "التسويق عبر وسائل التواصل: ما الذي يعمل في المملكة العربية السعودية",
        preview: "Platform-specific strategies for engaging Saudi audiences effectively.",
        previewAr: "استراتيجيات خاصة بالمنصة لإشراك الجماهير السعودية بفعالية."
      },
      {
        subject: "Conversion Rate Optimization: Turn More Visitors into Customers",
        subjectAr: "تحسين معدل التحويل: حوّل المزيد من الزوار إلى عملاء",
        preview: "Data-driven techniques to improve your website's conversion rate.",
        previewAr: "تقنيات مبنية على البيانات لتحسين معدل تحويل موقعك."
      },
      {
        subject: "Case Study: How We Increased ROI by 300% for a Saudi Company",
        subjectAr: "دراسة حالة: كيف زدنا عائد الاستثمار بنسبة 300% لشركة سعودية",
        preview: "Real results from our digital marketing approach. Read the full story.",
        previewAr: "نتائج حقيقية من نهجنا في التسويق الرقمي. اقرأ القصة الكاملة."
      },
      {
        subject: "Google Ads vs Meta Ads: Which Should You Use?",
        subjectAr: "إعلانات جوجل مقابل إعلانات ميتا: أيهما يجب أن تستخدم؟",
        preview: "Expert guidance on choosing the right advertising platform for your business.",
        previewAr: "إرشادات خبيرة حول اختيار منصة الإعلانات المناسبة لأعمالك."
      },
      {
        subject: "Free Marketing Audit: Discover What's Holding You Back",
        subjectAr: "مراجعة تسويقية مجانية: اكتشف ما يعيقك",
        preview: "Get a comprehensive analysis of your current marketing efforts and recommendations.",
        previewAr: "احصل على تحليل شامل لجهودك التسويقية الحالية والتوصيات."
      }
    ]
  },
  {
    id: "offshore",
    title: "Offshore Development",
    titleAr: "التطوير الخارجي",
    subtitle: "Dedicated Teams",
    subtitleAr: "فرق متخصصة",
    tagline: "Scale Your Team Without the Overhead",
    taglineAr: "وسّع فريقك بدون أعباء",
    description: "Dedicated development teams that integrate seamlessly with your organization. Same timezone, full IP protection, enterprise delivery standards.",
    descriptionAr: "فرق تطوير متخصصة تتكامل بسلاسة مع مؤسستك. نفس المنطقة الزمنية، حماية كاملة للملكية الفكرية، معايير تسليم مؤسسية.",
    problem: "Local developers cost SAR 35-50K/month and take 6 months to hire. High turnover means constant retraining. Project timelines slip.",
    problemAr: "المطورون المحليون يكلفون 35-50 ألف ريال/شهر ويستغرقون 6 أشهر للتوظيف. معدل دوران مرتفع يعني تدريب مستمر. الجداول الزمنية تنزلق.",
    solution: "Our offshore development centers provide pre-vetted engineers who integrate with your team. We handle recruiting, HR, and management.",
    solutionAr: "مراكز التطوير لدينا توفر مهندسين مُعتمدين يندمجون مع فريقك بسلاسة. نتولى التوظيف والموارد البشرية والإدارة.",
    features: ["Dedicated team members", "Same timezone overlap", "Direct communication", "Agile methodology", "Full IP protection", "Flexible scaling"],
    featuresAr: ["أعضاء فريق متخصصون", "العمل في نفس المنطقة الزمنية", "تواصل مباشر", "منهجية أجايل", "حماية كاملة للملكية الفكرية", "مرونة في التوسع"],
    benefits: ["60% cost reduction", "48-hour deployment", "Zero HR overhead"],
    benefitsAr: ["توفير 60% من التكاليف", "نشر خلال 48 ساعة", "بدون أعباء موارد بشرية"],
    techStack: ["React", "Node.js", "Python", "AWS", "Kubernetes", "Various"],
    slug: "offshore-office-services",
    ctaText: "Build Your Team",
    ctaTextAr: "ابنِ فريقك",
    stat1: { value: "60%", label: "Cost Savings", labelAr: "توفير في التكاليف" },
    stat2: { value: "150+", label: "Engineers", labelAr: "مهندس" },
    stat3: { value: "48hrs", label: "To Deploy", labelAr: "للنشر" },
    subjectLines: [
      {
        subject: "Scale Your Development Team Without the Overhead",
        subjectAr: "وسّع فريق التطوير الخاص بك بدون أعباء",
        preview: "Dedicated offshore teams. Save 60% on costs, deploy in 48 hours.",
        previewAr: "فرق خارجية متخصصة. وفر 60% من التكاليف، انشر خلال 48 ساعة."
      },
      {
        subject: "The Offshore Development Model That Actually Works",
        subjectAr: "نموذج التطوير الخارجي الذي يعمل فعلاً",
        preview: "Learn how dedicated offshore teams integrate seamlessly with your organization.",
        previewAr: "تعلم كيف تندمج الفرق الخارجية المتخصصة بسلاسة مع مؤسستك."
      },
      {
        subject: "150+ Engineers Ready to Join Your Team",
        subjectAr: "150+ مهندس جاهز للانضمام لفريقك",
        preview: "Pre-vetted developers across all tech stacks. Same timezone, full IP protection.",
        previewAr: "مطورون مُعتمدون عبر جميع البنى التقنية. نفس المنطقة الزمنية، حماية كاملة للملكية الفكرية."
      },
      {
        subject: "Why Offshore Development Makes Sense for Saudi Companies",
        subjectAr: "لماذا التطوير الخارجي منطقي للشركات السعودية",
        preview: "Cost savings, faster deployment, and access to global talent pool.",
        previewAr: "توفير في التكاليف، نشر أسرع، وإمكانية الوصول لمجموعة مواهب عالمية."
      },
      {
        subject: "The Complete Guide to Offshore Development",
        subjectAr: "الدليل الكامل للتطوير الخارجي",
        preview: "Everything you need to know about working with offshore development teams.",
        previewAr: "كل ما تحتاج معرفته عن العمل مع فرق التطوير الخارجية."
      },
      {
        subject: "How to Manage Offshore Teams Effectively",
        subjectAr: "كيفية إدارة الفرق الخارجية بفعالية",
        preview: "Best practices for communication, collaboration, and project management.",
        previewAr: "أفضل الممارسات للتواصل والتعاون وإدارة المشاريع."
      },
      {
        subject: "Offshore vs Local: Which Development Model is Right for You?",
        subjectAr: "الخارجي مقابل المحلي: أي نموذج تطوير مناسب لك؟",
        preview: "A detailed comparison to help you make the right decision.",
        previewAr: "مقارنة مفصلة لمساعدتك على اتخاذ القرار الصحيح."
      },
      {
        subject: "Case Study: How Offshore Development Saved a Company SAR 500K",
        subjectAr: "دراسة حالة: كيف وفر التطوير الخارجي لشركة 500 ألف ريال",
        preview: "Real example of cost savings and efficiency gains. Read the full story.",
        previewAr: "مثال حقيقي لتوفير التكاليف وزيادة الكفاءة. اقرأ القصة الكاملة."
      },
      {
        subject: "IP Protection in Offshore Development: What You Need to Know",
        subjectAr: "حماية الملكية الفكرية في التطوير الخارجي: ما تحتاج معرفته",
        preview: "Learn how to protect your intellectual property when working with offshore teams.",
        previewAr: "تعلم كيفية حماية ملكيتك الفكرية عند العمل مع فرق خارجية."
      },
      {
        subject: "From Hiring to Deployment: Your 48-Hour Offshore Team Setup",
        subjectAr: "من التوظيف إلى النشر: إعداد فريقك الخارجي خلال 48 ساعة",
        preview: "See how quickly you can get started with dedicated offshore development teams.",
        previewAr: "شاهد كيف يمكنك البدء بسرعة مع فرق التطوير الخارجية المتخصصة."
      }
    ]
  },
  {
    id: "food-delivery",
    title: "Food Delivery Platform",
    titleAr: "منصة توصيل الطعام",
    subtitle: "UberEats Clone",
    subtitleAr: "مثل أوبر إيتس",
    tagline: "Launch Your Food Delivery App in 8 Weeks",
    taglineAr: "أطلق تطبيق توصيل الطعام في 8 أسابيع",
    description: "Complete food delivery ecosystem for customers, drivers, and restaurant partners. Intelligent logistics, real-time tracking, and seamless payments.",
    descriptionAr: "نظام توصيل طعام كامل للعملاء والسائقين وشركاء المطاعم. لوجستيات ذكية، تتبع فوري، ومدفوعات سلسة.",
    problem: "The food delivery market is booming but building a platform from scratch takes 18+ months. You need customer apps, driver apps, restaurant dashboards, and complex logistics.",
    problemAr: "سوق توصيل الطعام مزدهر لكن بناء منصة من الصفر يستغرق 18+ شهراً. تحتاج تطبيقات عملاء، تطبيقات سائقين، لوحات مطاعم، ولوجستيات معقدة.",
    solution: "Our white-label food delivery platform is production-ready with 50+ features. Customize the branding, integrate local payment gateways, and launch in 8 weeks.",
    solutionAr: "منصة توصيل الطعام الجاهزة تتضمن أكثر من 50 ميزة. خصّص علامتك التجارية، وادمج بوابات الدفع المحلية، وأطلق خلال 8 أسابيع.",
    features: ["Customer, Driver & Restaurant apps", "Live GPS order tracking", "Intelligent route optimization", "Multiple payment gateways", "Promo codes & loyalty", "Real-time analytics"],
    featuresAr: ["تطبيقات للعملاء والسائقين والمطاعم", "تتبع GPS مباشر للطلبات", "تحسين المسار الذكي", "بوابات دفع متعددة", "أكواد ترويجية وبرامج ولاء", "تحليلات فورية"],
    benefits: ["8-week launch", "Proven at scale", "Local payment support"],
    benefitsAr: ["إطلاق خلال 8 أسابيع", "مُثبت على نطاق واسع", "دعم وسائل الدفع المحلية"],
    techStack: ["React Native", "Node.js", "MongoDB", "Redis", "Google Maps", "Stripe"],
    slug: "food-delivery-app-development",
    ctaText: "Launch Your Delivery App",
    ctaTextAr: "أطلق تطبيق التوصيل",
    stat1: { value: "8 Wks", label: "To Launch", labelAr: "للإطلاق" },
    stat2: { value: "10+", label: "Platforms Built", labelAr: "منصة مبنية" },
    stat3: { value: "1M+", label: "Orders Processed", labelAr: "طلب معالج" },
    subjectLines: [
      {
        subject: "Launch Your Food Delivery App in 8 Weeks",
        subjectAr: "أطلق تطبيق توصيل الطعام في 8 أسابيع",
        preview: "Complete food delivery platform with 50+ features. 10+ platforms built, 1M+ orders processed.",
        previewAr: "منصة توصيل طعام كاملة مع 50+ ميزة. 10+ منصات مبنية، أكثر من مليون طلب معالج."
      },
      {
        subject: "The Complete Food Delivery Platform Guide",
        subjectAr: "دليل منصة توصيل الطعام الكامل",
        preview: "Everything you need to know about building a food delivery business in Saudi Arabia.",
        previewAr: "كل ما تحتاج معرفته عن بناء أعمال توصيل الطعام في المملكة العربية السعودية."
      },
      {
        subject: "How to Build a Food Delivery App That Actually Works",
        subjectAr: "كيف تبني تطبيق توصيل طعام يعمل فعلاً",
        preview: "Learn from 10+ successful food delivery platforms. Get the blueprint.",
        previewAr: "تعلم من 10+ منصة توصيل طعام ناجحة. احصل على المخطط."
      },
      {
        subject: "Food Delivery Market in Saudi Arabia: Opportunities & Challenges",
        subjectAr: "سوق توصيل الطعام في المملكة: الفرص والتحديات",
        preview: "Market insights and strategies for entering the food delivery space.",
        previewAr: "رؤى السوق واستراتيجيات دخول مجال توصيل الطعام."
      },
      {
        subject: "Real-Time GPS Tracking: Essential for Food Delivery Success",
        subjectAr: "تتبع GPS فوري: ضروري لنجاح توصيل الطعام",
        preview: "How intelligent logistics make or break food delivery platforms.",
        previewAr: "كيف تجعل اللوجستيات الذكية منصات توصيل الطعام تنجح أو تفشل."
      },
      {
        subject: "From Restaurant to Customer: Building the Complete Food Delivery Ecosystem",
        subjectAr: "من المطعم إلى العميل: بناء نظام توصيل طعام كامل",
        preview: "Learn how to connect customers, drivers, and restaurants seamlessly.",
        previewAr: "تعلم كيفية ربط العملاء والسائقين والمطاعم بسلاسة."
      },
      {
        subject: "Case Study: How We Built a Food Delivery Platform in 6 Weeks",
        subjectAr: "دراسة حالة: كيف بنينا منصة توصيل طعام في 6 أسابيع",
        preview: "Real example of rapid food delivery platform development. Read the full story.",
        previewAr: "مثال حقيقي لتطوير منصة توصيل طعام سريع. اقرأ القصة الكاملة."
      },
      {
        subject: "Payment Integration for Food Delivery: What You Need to Know",
        subjectAr: "تكامل الدفع لتوصيل الطعام: ما تحتاج معرفته",
        preview: "Learn how to integrate local payment gateways for Saudi food delivery platforms.",
        previewAr: "تعلم كيفية دمج بوابات الدفع المحلية لمنصات توصيل الطعام السعودية."
      },
      {
        subject: "Promo Codes & Loyalty Programs: Boost Your Food Delivery Business",
        subjectAr: "أكواد ترويجية وبرامج ولاء: عزز أعمال توصيل الطعام الخاصة بك",
        preview: "Strategies for customer retention and engagement in food delivery.",
        previewAr: "استراتيجيات للاحتفاظ بالعملاء والتفاعل في توصيل الطعام."
      },
      {
        subject: "Scale Your Food Delivery Platform to 1M+ Orders",
        subjectAr: "وسّع منصة توصيل الطعام الخاصة بك لأكثر من مليون طلب",
        preview: "Architecture patterns and best practices for scaling food delivery services.",
        previewAr: "أنماط البنية وأفضل الممارسات لتوسيع خدمات توصيل الطعام."
      }
    ]
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    titleAr: "منصة التجارة الإلكترونية",
    subtitle: "Online Marketplace",
    subtitleAr: "سوق إلكتروني",
    tagline: "Build a Scalable Online Marketplace",
    taglineAr: "ابنِ سوقاً إلكترونياً قابلاً للتوسع",
    description: "Comprehensive e-commerce solutions from single-vendor stores to multi-vendor marketplaces. Inventory, payments, shipping, and analytics included.",
    descriptionAr: "حلول تجارة إلكترونية شاملة من متاجر بائع واحد إلى أسواق متعددة البائعين. المخزون، المدفوعات، الشحن، والتحليلات مضمنة.",
    problem: "Off-the-shelf platforms like Shopify have limitations. You need custom features, multi-vendor support, or complex pricing rules.",
    problemAr: "المنصات الجاهزة مثل شوبيفاي لها قيود. تحتاج ميزات مخصصة، دعم متعدد البائعين، أو قواعد تسعير معقدة.",
    solution: "We build custom e-commerce platforms tailored to your business. Multi-vendor marketplaces, B2B wholesale portals, subscription commerce - whatever your model.",
    solutionAr: "نبني منصات تجارة إلكترونية مخصصة لأعمالك. أسواق متعددة البائعين، بوابات البيع بالجملة B2B، والتجارة بالاشتراك - أي نموذج تريده.",
    features: ["Multi-vendor marketplace", "Advanced product catalog", "Multiple payment gateways", "Inventory management", "Shipping integration", "Analytics & reporting"],
    featuresAr: ["سوق متعدد البائعين", "كتالوج منتجات متقدم", "بوابات دفع متعددة", "إدارة المخزون", "تكامل مع شركات الشحن", "تحليلات وتقارير"],
    benefits: ["Custom features", "Unlimited scalability", "No transaction fees"],
    benefitsAr: ["ميزات مخصصة", "قابلية توسع غير محدودة", "بدون رسوم على المعاملات"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe", "Elasticsearch"],
    slug: "ecommerce-app-development",
    ctaText: "Build Your Store",
    ctaTextAr: "ابنِ متجرك",
    stat1: { value: "SAR 50M+", label: "GMV Processed", labelAr: "حجم معاملات معالج" },
    stat2: { value: "25+", label: "Stores Built", labelAr: "متجر مبني" },
    stat3: { value: "99.9%", label: "Uptime", labelAr: "وقت التشغيل" },
    subjectLines: [
      {
        subject: "Build a Scalable E-Commerce Platform That Grows With You",
        subjectAr: "ابنِ منصة تجارة إلكترونية قابلة للتوسع تنمو معك",
        preview: "Custom e-commerce solutions. 25+ stores built, SAR 50M+ GMV processed, 99.9% uptime.",
        previewAr: "حلول تجارة إلكترونية مخصصة. 25+ متجر مبني، أكثر من 50 مليون ريال حجم معاملات معالج، 99.9% وقت تشغيل."
      },
      {
        subject: "Why Shopify Isn't Enough: When You Need Custom E-Commerce",
        subjectAr: "لماذا شوبيفاي لا يكفي: متى تحتاج تجارة إلكترونية مخصصة",
        preview: "Learn when off-the-shelf platforms fall short and custom solutions make sense.",
        previewAr: "تعلم متى تفشل المنصات الجاهزة وتكون الحلول المخصصة منطقية."
      },
      {
        subject: "Multi-Vendor Marketplaces: The Complete Guide",
        subjectAr: "أسواق متعددة البائعين: الدليل الكامل",
        preview: "Everything you need to know about building marketplaces like Amazon or Noon.",
        previewAr: "كل ما تحتاج معرفته عن بناء أسواق مثل أمازون أو نون."
      },
      {
        subject: "E-Commerce in Saudi Arabia: Market Trends & Opportunities",
        subjectAr: "التجارة الإلكترونية في المملكة: اتجاهات السوق والفرص",
        preview: "Insights into the growing Saudi e-commerce market and how to succeed.",
        previewAr: "رؤى في السوق السعودي للتجارة الإلكترونية المتنامي وكيفية النجاح."
      },
      {
        subject: "B2B E-Commerce: Building Wholesale Portals That Work",
        subjectAr: "تجارة B2B الإلكترونية: بناء بوابات جملة تعمل",
        preview: "Learn how to build e-commerce platforms for B2B transactions.",
        previewAr: "تعلم كيفية بناء منصات تجارة إلكترونية لمعاملات B2B."
      },
      {
        subject: "Inventory Management: The Backbone of Successful E-Commerce",
        subjectAr: "إدارة المخزون: العمود الفقري للتجارة الإلكترونية الناجحة",
        preview: "How proper inventory management systems drive e-commerce success.",
        previewAr: "كيف تدفع أنظمة إدارة المخزون المناسبة نجاح التجارة الإلكترونية."
      },
      {
        subject: "Payment Gateways for Saudi E-Commerce: What You Need to Know",
        subjectAr: "بوابات الدفع للتجارة الإلكترونية السعودية: ما تحتاج معرفته",
        preview: "Learn about local payment methods and how to integrate them.",
        previewAr: "تعرف على طرق الدفع المحلية وكيفية دمجها."
      },
      {
        subject: "Case Study: How We Built an E-Commerce Platform Processing SAR 10M Monthly",
        subjectAr: "دراسة حالة: كيف بنينا منصة تجارة إلكترونية تعالج 10 ملايين ريال شهرياً",
        preview: "Real example of successful e-commerce development. Read the full story.",
        previewAr: "مثال حقيقي لتطوير تجارة إلكترونية ناجح. اقرأ القصة الكاملة."
      },
      {
        subject: "Subscription Commerce: The Future of E-Commerce",
        subjectAr: "التجارة بالاشتراك: مستقبل التجارة الإلكترونية",
        preview: "Learn how subscription models are transforming e-commerce in Saudi Arabia.",
        previewAr: "تعلم كيف تحول نماذج الاشتراك التجارة الإلكترونية في المملكة."
      },
      {
        subject: "E-Commerce Analytics: Make Data-Driven Decisions",
        subjectAr: "تحليلات التجارة الإلكترونية: اتخذ قرارات مبنية على البيانات",
        preview: "How analytics and reporting help you optimize your e-commerce platform.",
        previewAr: "كيف تساعد التحليلات والتقارير على تحسين منصة التجارة الإلكترونية الخاصة بك."
      }
    ]
  },
  {
    id: "elearning",
    title: "E-Learning Platform",
    titleAr: "منصة التعلم الإلكتروني",
    subtitle: "Online Education",
    subtitleAr: "التعليم عبر الإنترنت",
    tagline: "Create Your Online Learning Academy",
    taglineAr: "أنشئ أكاديميتك التعليمية عبر الإنترنت",
    description: "Comprehensive learning management system with video courses, live classes, assessments, and certifications. Engage students and track progress.",
    descriptionAr: "نظام إدارة تعلم شامل مع دورات فيديو، فصول مباشرة، تقييمات، وشهادات. اجذب الطلاب وتتبع التقدم.",
    problem: "You want to monetize your expertise but existing LMS platforms are limited. You need custom branding, specific features, or integration with existing systems.",
    problemAr: "تريد تحقيق دخل من خبرتك لكن منصات LMS الموجودة محدودة. تحتاج علامة تجارية مخصصة، ميزات محددة، أو تكامل مع أنظمتك.",
    solution: "We build custom e-learning platforms with video hosting, live streaming, interactive quizzes, progress tracking, and certificate generation.",
    solutionAr: "نبني منصات تعليم إلكتروني مخصصة تشمل استضافة الفيديو، البث المباشر، الاختبارات التفاعلية، تتبع التقدم، وإصدار الشهادات.",
    features: ["Video course hosting", "Live class streaming", "Quizzes & assessments", "Progress tracking", "Certificate generation", "Payment & subscriptions"],
    featuresAr: ["استضافة دورات الفيديو", "بث الفصول المباشرة", "اختبارات وتقييمات", "تتبع تقدم الطلاب", "إصدار الشهادات", "الدفع والاشتراكات"],
    benefits: ["Unlimited students", "Your branding", "Full ownership"],
    benefitsAr: ["عدد طلاب غير محدود", "علامتك التجارية الخاصة", "ملكية كاملة"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "AWS S3", "WebRTC", "Stripe"],
    slug: "elearning-app-development",
    ctaText: "Build Your Academy",
    ctaTextAr: "ابنِ أكاديميتك",
    stat1: { value: "100K+", label: "Students Served", labelAr: "طالب خُدم" },
    stat2: { value: "15+", label: "Platforms Built", labelAr: "منصة مبنية" },
    stat3: { value: "4.9", label: "Avg Rating", labelAr: "متوسط التقييم" },
    subjectLines: [
      {
        subject: "Create Your Online Learning Academy",
        subjectAr: "أنشئ أكاديميتك التعليمية عبر الإنترنت",
        preview: "Custom e-learning platforms. 15+ platforms built, 100K+ students served, 4.9 avg rating.",
        previewAr: "منصات تعليم إلكتروني مخصصة. 15+ منصة مبنية، أكثر من 100 ألف طالب خُدم، 4.9 متوسط تقييم."
      },
      {
        subject: "Monetize Your Expertise: Build an Online Learning Platform",
        subjectAr: "حقق دخل من خبرتك: ابنِ منصة تعلم عبر الإنترنت",
        preview: "Turn your knowledge into a profitable online education business.",
        previewAr: "حوّل معرفتك إلى أعمال تعليم عبر الإنترنت مربحة."
      },
      {
        subject: "The Complete Guide to E-Learning Platform Development",
        subjectAr: "الدليل الكامل لتطوير منصات التعلم الإلكتروني",
        preview: "Everything you need to know about building online learning platforms.",
        previewAr: "كل ما تحتاج معرفته عن بناء منصات التعلم عبر الإنترنت."
      },
      {
        subject: "Why Existing LMS Platforms Fall Short (And What to Do About It)",
        subjectAr: "لماذا تفشل منصات LMS الموجودة (وماذا تفعل حيال ذلك)",
        preview: "Learn when you need a custom e-learning platform vs off-the-shelf solutions.",
        previewAr: "تعلم متى تحتاج منصة تعلم إلكتروني مخصصة مقابل الحلول الجاهزة."
      },
      {
        subject: "Video Course Hosting: Best Practices for E-Learning",
        subjectAr: "استضافة دورات الفيديو: أفضل الممارسات للتعلم الإلكتروني",
        preview: "Learn how to deliver high-quality video courses that engage students.",
        previewAr: "تعلم كيفية تقديم دورات فيديو عالية الجودة تجذب الطلاب."
      },
      {
        subject: "Live Classes & Interactive Learning: Engage Your Students",
        subjectAr: "الفصول المباشرة والتعلم التفاعلي: اجذب طلابك",
        preview: "How live streaming and interactive features improve learning outcomes.",
        previewAr: "كيف يحسن البث المباشر والميزات التفاعلية نتائج التعلم."
      },
      {
        subject: "E-Learning in Saudi Arabia: Market Opportunities",
        subjectAr: "التعليم الإلكتروني في المملكة: فرص السوق",
        preview: "Insights into the growing online education market in Saudi Arabia.",
        previewAr: "رؤى في سوق التعليم عبر الإنترنت المتنامي في المملكة العربية السعودية."
      },
      {
        subject: "Progress Tracking & Certificates: Motivate Your Students",
        subjectAr: "تتبع التقدم والشهادات: حفز طلابك",
        preview: "How progress tracking and certification systems improve student engagement.",
        previewAr: "كيف تحسن أنظمة تتبع التقدم والشهادات تفاعل الطلاب."
      },
      {
        subject: "Case Study: How We Built an E-Learning Platform with 50K Students",
        subjectAr: "دراسة حالة: كيف بنينا منصة تعلم إلكتروني مع 50 ألف طالب",
        preview: "Real example of successful e-learning platform development. Read the full story.",
        previewAr: "مثال حقيقي لتطوير منصة تعلم إلكتروني ناجح. اقرأ القصة الكاملة."
      },
      {
        subject: "Payment & Subscriptions: Monetize Your E-Learning Platform",
        subjectAr: "الدفع والاشتراكات: حقق دخل من منصة التعلم الإلكتروني الخاصة بك",
        preview: "Learn how to set up payment systems and subscription models for your courses.",
        previewAr: "تعلم كيفية إعداد أنظمة الدفع ونماذج الاشتراك لدوراتك."
      }
    ]
  },
  {
    id: "personal-website",
    title: "Personal Website",
    titleAr: "موقع شخصي",
    subtitle: "Personal Brand",
    subtitleAr: "العلامة الشخصية",
    tagline: "Your Professional Personal Website — Just $2,000",
    taglineAr: "موقعك الشخصي الاحترافي — فقط 2,000 دولار",
    description: "Get a stunning, custom-designed personal website that showcases your expertise, attracts clients, and builds your brand. Ready in 7 days. Includes $1,150+ in free analytics addons.",
    descriptionAr: "احصل على موقع شخصي مذهل ومصمم خصيصاً يعرض خبرتك، يجذب العملاء، ويبني علامتك التجارية. جاهز خلال 7 أيام. يشمل إضافات تحليلات مجانية بقيمة 1,150+ دولار.",
    problem: "You don't have a professional online presence. Potential clients Google you and find nothing — or worse, an outdated LinkedIn profile. You're losing credibility and business every day.",
    problemAr: "ليس لديك حضور رقمي احترافي. العملاء المحتملون يبحثون عنك في جوجل ولا يجدون شيئاً — أو الأسوأ، ملف لينكدإن قديم. تخسر المصداقية والعملاء كل يوم.",
    solution: "A custom-designed personal website built in 7 days for $2,000. Mobile responsive, SEO optimized, blazing fast. Up to 5 pages, contact forms, social media integration, full code ownership, plus $1,150+ in free analytics tools (GA4, Hotjar, Mixpanel, GTM, Search Console & more).",
    solutionAr: "موقع شخصي مصمم خصيصاً يُبنى خلال 7 أيام بـ 2,000 دولار. متجاوب مع الجوال، محسّن لمحركات البحث، سريع البرق. حتى 5 صفحات، نماذج اتصال، تكامل وسائل التواصل، وملكية كاملة للكود، بالإضافة إلى أدوات تحليلات مجانية بقيمة 1,150+ دولار.",
    features: ["Custom premium design — no templates", "Mobile responsive on all devices", "SEO optimization built-in", "Contact forms with email alerts", "Social media integration", "Google Analytics 4 + Mixpanel + Hotjar", "Google Tag Manager pre-configured", "Search Console & Bing Webmaster Tools", "Meta Pixel for retargeting", "Core Web Vitals optimization", "1 month free post-launch support", "Full source code ownership"],
    featuresAr: ["تصميم مخصص فاخر — بدون قوالب", "متجاوب مع جميع الأجهزة", "تحسين محركات البحث مدمج", "نماذج اتصال مع تنبيهات البريد", "تكامل وسائل التواصل الاجتماعي", "Google Analytics 4 + Mixpanel + Hotjar", "Google Tag Manager مُعدّ مسبقاً", "Search Console و Bing Webmaster Tools", "Meta Pixel لإعادة الاستهداف", "تحسين Core Web Vitals", "شهر دعم مجاني بعد الإطلاق", "ملكية كاملة للكود المصدري"],
    benefits: ["7-day delivery", "60% cheaper than agencies", "100% code ownership", "$1,150+ in free analytics tools"],
    benefitsAr: ["تسليم خلال 7 أيام", "أرخص 60% من الوكالات", "ملكية كاملة 100% للكود", "أدوات تحليلات مجانية بقيمة 1,150+ دولار"],
    techStack: ["React", "Next.js", "Tailwind CSS", "Vercel", "TypeScript", "Framer Motion"],
    slug: "personal-website",
    ctaText: "Get Your Website — $2,000",
    ctaTextAr: "احصل على موقعك — 2,000 دولار",
    stat1: { value: "$2K", label: "Fixed Price", labelAr: "سعر ثابت" },
    stat2: { value: "7", label: "Days Delivery", labelAr: "أيام للتسليم" },
    stat3: { value: "5", label: "Custom Pages", labelAr: "صفحات مخصصة" },
    subjectLines: [
      {
        subject: "Your Professional Personal Website — Ready in 7 Days for $2,000 + $1,150 in Free Tools",
        subjectAr: "موقعك الشخصي الاحترافي — جاهز خلال 7 أيام بـ 2,000 دولار + أدوات مجانية بقيمة 1,150 دولار",
        preview: "Custom design, mobile ready, SEO optimized. Plus free GA4, Hotjar, Mixpanel & more.",
        previewAr: "تصميم مخصص، جاهز للجوال، محسّن لمحركات البحث. بالإضافة إلى GA4 و Hotjar و Mixpanel مجاناً."
      },
      {
        subject: "93% of People Google You Before Doing Business — What Do They Find?",
        subjectAr: "93% من الأشخاص يبحثون عنك في جوجل قبل التعامل معك — ماذا يجدون؟",
        preview: "A professional personal website costs just $2,000. Custom designed in 7 days. Free analytics included.",
        previewAr: "الموقع الشخصي الاحترافي يكلف فقط 2,000 دولار. مصمم خصيصاً خلال 7 أيام. تحليلات مجانية مشمولة."
      },
      {
        subject: "Stop Losing Clients Because You Don't Have a Website",
        subjectAr: "توقف عن خسارة العملاء لأنك لا تملك موقعاً إلكترونياً",
        preview: "Get a stunning personal website for $2,000 — 60% less than agencies charge.",
        previewAr: "احصل على موقع شخصي مذهل بـ 2,000 دولار — أرخص 60% من الوكالات."
      },
      {
        subject: "Your Personal Website: Custom Design, 7 Days, $2,000. Done.",
        subjectAr: "موقعك الشخصي: تصميم مخصص، 7 أيام، 2,000 دولار. تم.",
        preview: "No templates. No monthly fees. Full code ownership. Let's build your online presence.",
        previewAr: "بدون قوالب. بدون رسوم شهرية. ملكية كاملة للكود. لنبني حضورك الرقمي."
      },
      {
        subject: "Why Pay $5,000+ When You Can Get the Same Quality for $2,000?",
        subjectAr: "لماذا تدفع 5,000+ دولار عندما يمكنك الحصول على نفس الجودة بـ 2,000 دولار؟",
        preview: "Custom personal website. React/Next.js. SEO. Mobile ready. Launch in 7 days. Free analytics suite.",
        previewAr: "موقع شخصي مخصص. React/Next.js. تحسين محركات البحث. جاهز للجوال. إطلاق خلال 7 أيام. باقة تحليلات مجانية."
      },
      {
        subject: "Your Competitors Have a Website. Do You?",
        subjectAr: "منافسوك لديهم موقع إلكتروني. هل لديك؟",
        preview: "Stand out online with a custom personal website. Just $2,000. Ready in 7 days. Free analytics tools included.",
        previewAr: "تميز عبر الإنترنت بموقع شخصي مخصص. فقط 2,000 دولار. جاهز خلال 7 أيام. أدوات تحليلات مجانية."
      },
      {
        subject: "From Zero to Online Presence in 7 Days — Here's How",
        subjectAr: "من الصفر إلى الحضور الرقمي خلال 7 أيام — إليك كيف",
        preview: "We build stunning personal websites for professionals. $2,000 all-inclusive.",
        previewAr: "نبني مواقع شخصية مذهلة للمحترفين. 2,000 دولار شاملة كل شيء."
      },
      {
        subject: "A Personal Website That Actually Gets You Clients",
        subjectAr: "موقع شخصي يجلب لك العملاء فعلاً",
        preview: "Not just pretty — conversion-optimized. Custom design, SEO, lead capture. $2,000.",
        previewAr: "ليس جميلاً فقط — محسّن للتحويل. تصميم مخصص، SEO، التقاط العملاء. 2,000 دولار."
      },
      {
        subject: "The $2,000 Investment That Pays for Itself",
        subjectAr: "الاستثمار بقيمة 2,000 دولار الذي يدفع ثمنه بنفسه",
        preview: "One new client from your website pays for it many times over. Get started today.",
        previewAr: "عميل جديد واحد من موقعك يدفع ثمنه عدة مرات. ابدأ اليوم."
      },
      {
        subject: "Free Discovery Call: Let's Design Your Personal Website",
        subjectAr: "مكالمة استكشافية مجانية: لنصمم موقعك الشخصي",
        preview: "Book a 30-min call to discuss your vision. We'll create 2 custom design concepts.",
        previewAr: "احجز مكالمة 30 دقيقة لمناقشة رؤيتك. سننشئ مفهومين تصميميين مخصصين."
      }
    ]
  }
];

interface TemplateBlockProps {
  title: string;
  html: string;
  lang: 'en' | 'ar';
  onLanguageToggle?: () => void;
}

interface SubjectLinesBlockProps {
  subjectLines: EmailSubjectLine[];
  lang: 'en' | 'ar';
}

function SubjectLinesBlock({ subjectLines, lang }: SubjectLinesBlockProps) {
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();

  const copySubjectLine = async (subject: string, preview: string) => {
    try {
      const text = `Subject: ${subject}\nPreview: ${preview}`;
      await navigator.clipboard.writeText(text);
      toast({
        title: lang === 'ar' ? "تم النسخ!" : "Copied!",
        description: lang === 'ar' ? "تم نسخ السطر الموضوع والنص المعاين" : "Subject line and preview text copied",
      });
    } catch (err) {
      toast({
        title: lang === 'ar' ? "فشل النسخ" : "Failed to copy",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mb-6 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {lang === 'ar' ? 'عناوين البريد الإلكتروني للنشر على LinkedIn' : 'Email Subject Lines for LinkedIn Outreach'}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
            {expanded ? (lang === 'ar' ? "إخفاء" : "Hide") : (lang === 'ar' ? "إظهار" : "Show")}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {lang === 'ar' 
            ? 'اختر من هذه العناوين الجذابة لاستخدامها في حملاتك التسويقية على LinkedIn'
            : 'Choose from these attractive subject lines for your LinkedIn outreach campaigns'}
        </p>
      </CardHeader>
      {expanded && (
        <CardContent>
          <div className="space-y-4">
            {subjectLines.map((item, idx) => {
              const subject = lang === 'ar' ? item.subjectAr : item.subject;
              const preview = lang === 'ar' ? item.previewAr : item.preview;
              return (
                <div key={idx} className="border rounded-lg p-4 bg-white dark:bg-slate-900 hover:border-primary transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                        {lang === 'ar' ? 'الموضوع:' : 'Subject:'}
                      </p>
                      <p className="font-semibold text-base mb-3">{subject}</p>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                        {lang === 'ar' ? 'النص المعاين:' : 'Preview Text:'}
                      </p>
                      <p className="text-sm text-muted-foreground">{preview}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copySubjectLine(subject, preview)}
                      className="flex-shrink-0"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      {lang === 'ar' ? 'نسخ' : 'Copy'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function TemplateBlock({ title, html, lang, onLanguageToggle }: TemplateBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      toast({
        title: lang === 'ar' ? "تم النسخ!" : "Copied!",
        description: lang === 'ar' ? `تم نسخ القالب ${title}` : `${title} template copied to clipboard`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: lang === 'ar' ? "فشل النسخ" : "Failed to copy",
        description: lang === 'ar' ? "يرجى المحاولة مرة أخرى" : "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
        <CardTitle className="text-lg">{title} {lang === 'ar' ? '(عربي)' : '(English)'}</CardTitle>
        <div className="flex gap-2">
          {onLanguageToggle && (
            <Button
              variant="outline"
              size="sm"
              onClick={onLanguageToggle}
              data-testid="button-toggle-language"
            >
              <Languages className="h-4 w-4 mr-2" />
              {lang === 'ar' ? 'English' : 'عربي'}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            data-testid={`button-expand-${title.toLowerCase().replace(/\s+/g, '-')}-${lang}`}
          >
            {expanded ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
            {expanded ? (lang === 'ar' ? "إخفاء الكود" : "Hide Code") : (lang === 'ar' ? "إظهار الكود" : "Show Code")}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={copyToClipboard}
            data-testid={`button-copy-${title.toLowerCase().replace(/\s+/g, '-')}-${lang}`}
          >
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? (lang === 'ar' ? "تم النسخ!" : "Copied!") : (lang === 'ar' ? "نسخ HTML" : "Copy HTML")}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 border rounded-lg overflow-hidden bg-white">
          <iframe
            srcDoc={html}
            title={title}
            className="w-full min-h-[1400px] border-0"
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

function ServiceTemplateSection({ service }: { service: ServiceTemplate }) {
  const [selectedLang, setSelectedLang] = useState<'en' | 'ar'>('en');
  
  const enContent = {
    title: service.title,
    subtitle: service.subtitle,
    tagline: service.tagline,
    description: service.description,
    problem: service.problem,
    solution: service.solution,
    features: service.features,
    benefits: service.benefits,
    techStack: service.techStack,
    slug: service.slug,
    ctaText: service.ctaText,
    stat1: { value: service.stat1.value, label: service.stat1.label },
    stat2: { value: service.stat2.value, label: service.stat2.label },
    stat3: { value: service.stat3.value, label: service.stat3.label },
  };
  
  const arContent = {
    title: service.titleAr,
    subtitle: service.subtitleAr,
    tagline: service.taglineAr,
    description: service.descriptionAr,
    problem: service.problemAr,
    solution: service.solutionAr,
    features: service.featuresAr,
    benefits: service.benefitsAr,
    techStack: service.techStack,
    slug: service.slug,
    ctaText: service.ctaTextAr,
    stat1: { value: service.stat1.value, label: service.stat1.labelAr },
    stat2: { value: service.stat2.value, label: service.stat2.labelAr },
    stat3: { value: service.stat3.value, label: service.stat3.labelAr },
  };

  const currentContent = selectedLang === 'en' ? enContent : arContent;
  const currentTitle = selectedLang === 'en' ? service.title : service.titleAr;

  return (
    <div className="max-w-[800px] mx-auto">
      <SubjectLinesBlock subjectLines={service.subjectLines} lang={selectedLang} />
      <TemplateBlock
        title={currentTitle}
        html={generateEmailTemplate(selectedLang, currentContent)}
        lang={selectedLang}
        onLanguageToggle={() => setSelectedLang(selectedLang === 'en' ? 'ar' : 'en')}
      />
    </div>
  );
}

// Brand Awareness Template Interface
interface BrandAwarenessTemplate {
  id: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  mainContent: string;
  mainContentAr: string;
  highlights: string[];
  highlightsAr: string[];
  ctaText: string;
  ctaTextAr: string;
  ctaLink?: string;
  stat1?: { value: string; label: string; labelAr: string };
  stat2?: { value: string; label: string; labelAr: string };
  stat3?: { value: string; label: string; labelAr: string };
  subjectLines: EmailSubjectLine[];
}

// Generate Brand Awareness Email Template
const generateBrandAwarenessTemplate = (lang: 'en' | 'ar', content: {
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  mainContent: string;
  highlights: string[];
  ctaText: string;
  ctaLink?: string;
  stat1?: { value: string; label: string };
  stat2?: { value: string; label: string };
  stat3?: { value: string; label: string };
}) => {
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  const align = isRtl ? 'right' : 'left';
  const alignOpp = isRtl ? 'left' : 'right';
  const fontFamily = isRtl ? "'Segoe UI', Tahoma, 'Arial', sans-serif" : "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  
  const labels = {
    freeConsultation: isRtl ? 'استشارة مجانية' : 'Free Consultation',
    readyToStart: isRtl ? 'مستعد للبدء؟' : 'Ready to Get Started?',
    bookConsultation: isRtl ? 'احجز استشارة مجانية لمدة 30 دقيقة مع خبرائنا. سنحلل متطلباتك ونقدم لك عرضًا مفصلاً.' : 'Book a free 30-minute consultation with our experts. We\'ll analyze your requirements and provide a detailed proposal.',
    whatsappUs: isRtl ? 'تواصل عبر واتساب' : 'WhatsApp Us Now',
    orCall: isRtl ? 'أو اتصل بنا:' : 'Or call us:',
    tagline: isRtl ? 'نساعد الشركات السعودية على بناء برمجيات أفضل' : 'Helping Saudi companies build better software',
    riyadh: isRtl ? 'سكاي ستاك للتقنية | الرياض، المملكة العربية السعودية' : 'SkyStack Technology | Riyadh, Saudi Arabia',
    whyChoose: isRtl ? 'لماذا سكاي ستاك' : 'Why SkyStack',
    learnMore: isRtl ? 'اعرف المزيد' : 'Learn More',
    visitWebsite: isRtl ? 'زيارة الموقع' : 'Visit Website',
  };

  const ctaUrl = content.ctaLink || WEBSITE_URL;

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${content.tagline} - SkyStack</title>
  <style>
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .mobile-padding { padding: 16px 12px !important; }
      .mobile-padding-header { padding: 12px 12px !important; }
      .mobile-padding-hero { padding: 12px 12px 20px !important; }
      .stat-cell { display: block !important; width: 100% !important; border-right: none !important; border-left: none !important; border-bottom: 1px solid rgba(255,255,255,0.2) !important; padding: 10px 16px !important; }
      .stat-cell-last { border-bottom: none !important; }
      .mobile-h1 { font-size: 20px !important; line-height: 1.3 !important; }
      .mobile-h3 { font-size: 16px !important; }
      .mobile-text { font-size: 14px !important; }
      .mobile-text-sm { font-size: 12px !important; }
      .logo-header { width: 120px !important; }
      .logo-footer { width: 100px !important; }
      .highlight-cell { display: block !important; width: 100% !important; padding: 6px 0 !important; text-align: center !important; }
      .cta-button { padding: 12px 24px !important; font-size: 14px !important; }
      .section-padding { padding: 20px 12px !important; }
      .section-padding-sm { padding: 0 12px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: ${fontFamily}; background-color: #f1f5f9; -webkit-font-smoothing: antialiased; direction: ${dir};">
  <div style="display: none; max-height: 0; overflow: hidden;">${content.description}</div>
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 20px 12px;" class="mobile-padding">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" class="email-container" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);">
          
          <!-- Hero Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%); padding: 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 16px 24px 12px;" class="mobile-padding-header">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="${align}">
                          <img src="${LOGO_URL}" alt="SkyStack" width="200" class="logo-header" style="display: block; border: 0;" />
                        </td>
                        <td align="${alignOpp}">
                          <span style="color: #34d399; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;" class="mobile-text-sm">${content.subtitle}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 24px 28px; text-align: ${align};" class="mobile-padding-hero">
                    <p style="margin: 0 0 8px; color: #34d399; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;" class="mobile-text-sm">${content.title}</p>
                    <h1 style="margin: 0 0 12px; color: #ffffff; font-size: 26px; font-weight: 700; line-height: 1.3;" class="mobile-h1">${content.tagline}</h1>
                    <p style="margin: 0 0 16px; color: #94a3b8; font-size: 15px; line-height: 1.6;" class="mobile-text">${content.description}</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td style="border-radius: 6px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); box-shadow: 0 4px 14px 0 rgba(0, 60, 255, 0.4);">
                          <a href="${ctaUrl}" class="cta-button" style="display: inline-block; padding: 12px 28px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px;">${content.ctaText}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          ${content.stat1 && content.stat2 && content.stat3 ? `<!-- Stats Bar -->
          <tr>
            <td style="background-color: #003cff; padding: 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="33.33%" class="stat-cell" style="padding: 14px 12px; text-align: center; border-${isRtl ? 'left' : 'right'}: 1px solid rgba(255,255,255,0.2);">
                    <p style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">${content.stat1.value}</p>
                    <p style="margin: 2px 0 0; color: rgba(255,255,255,0.8); font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">${content.stat1.label}</p>
                  </td>
                  <td width="33.33%" class="stat-cell" style="padding: 14px 12px; text-align: center; border-${isRtl ? 'left' : 'right'}: 1px solid rgba(255,255,255,0.2);">
                    <p style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">${content.stat2.value}</p>
                    <p style="margin: 2px 0 0; color: rgba(255,255,255,0.8); font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">${content.stat2.label}</p>
                  </td>
                  <td width="33.33%" class="stat-cell stat-cell-last" style="padding: 14px 12px; text-align: center;">
                    <p style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">${content.stat3.value}</p>
                    <p style="margin: 2px 0 0; color: rgba(255,255,255,0.8); font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">${content.stat3.label}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>` : ''}
          
          <!-- Main Content Section -->
          <tr>
            <td style="padding: 24px; text-align: ${align};" class="section-padding">
              <div style="color: #374151; font-size: 15px; line-height: 1.8;" class="mobile-text">
                ${content.mainContent.split('\n\n').map(p => `<p style="margin: 0 0 16px; color: #374151; font-size: 15px; line-height: 1.8;">${p}</p>`).join('')}
              </div>
            </td>
          </tr>
          
          ${content.highlights && content.highlights.length > 0 ? `<!-- Highlights Section -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px;" class="section-padding">
              <h3 style="margin: 0 0 14px; color: #0f172a; font-size: 16px; font-weight: 700; text-align: center;" class="mobile-h3">${labels.whyChoose}</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                ${content.highlights.map((highlight, idx) => {
                  const itemsPerRow = Math.min(3, content.highlights.length);
                  const width = Math.floor(100 / itemsPerRow);
                  const isLastInRow = (idx + 1) % itemsPerRow === 0;
                  return `
                  <td width="${width}%" class="highlight-cell" style="padding: 0 6px; text-align: center; vertical-align: top; ${!isLastInRow ? `border-${isRtl ? 'left' : 'right'}: 1px solid #e2e8f0;` : ''}">
                    <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); border-radius: 8px; margin: 0 auto 8px; line-height: 36px; color: #ffffff; font-size: 16px;">&#9733;</div>
                    <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 12px; line-height: 1.4;" class="mobile-text">${highlight}</p>
                  </td>`;
                }).join('')}
                </tr>
              </table>
            </td>
          </tr>` : ''}
          
          <!-- CTA Section -->
          <tr>
            <td style="background: linear-gradient(135deg, #020617 0%, #0f172a 100%); padding: 28px 24px;" class="section-padding">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 4px; color: #34d399; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">${labels.freeConsultation}</p>
                    <h3 style="margin: 0 0 8px; color: #ffffff; font-size: 20px; font-weight: 700;" class="mobile-h1">${labels.readyToStart}</h3>
                    <p style="margin: 0 0 16px; color: #94a3b8; font-size: 13px; line-height: 1.5;" class="mobile-text">${labels.bookConsultation}</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                      <tr>
                        <td style="border-radius: 6px; background: linear-gradient(135deg, #34d399 0%, #10b981 100%); box-shadow: 0 4px 14px 0 rgba(52, 211, 153, 0.4);">
                          <a href="${WHATSAPP_LINK}" class="cta-button" style="display: inline-block; padding: 12px 28px; color: #0f172a; text-decoration: none; font-weight: 700; font-size: 14px;">${labels.whatsappUs}</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 12px 0 0; color: #64748b; font-size: 11px;">${labels.orCall} <a href="tel:+966537430455" style="color: #34d399; text-decoration: none;">+966 53 743 0455</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #020617; padding: 20px 24px;" class="section-padding">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center; padding-bottom: 12px; border-bottom: 1px solid #1e293b;">
                    <img src="${LOGO_URL}" alt="SkyStack" width="120" class="logo-footer" style="display: inline-block; border: 0;" />
                    <p style="margin: 6px 0 0; color: #64748b; font-size: 11px;" class="mobile-text-sm">${labels.tagline}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px; text-align: center;">
                    <p style="margin: 0 0 4px; color: #94a3b8; font-size: 11px;" class="mobile-text-sm">
                      <a href="${WHATSAPP_LINK}" style="color: #34d399; text-decoration: none; font-weight: 600;">+966 53 743 0455</a> &nbsp;|&nbsp;
                      <a href="mailto:info@skystack.sa" style="color: #94a3b8; text-decoration: none;">info@skystack.sa</a>
                    </p>
                    <p style="margin: 6px 0 0; color: #475569; font-size: 10px;">
                      ${labels.riyadh}<br>
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
};

// Brand Awareness Templates
const brandAwarenessTemplates: BrandAwarenessTemplate[] = [
  {
    id: "welcome-intro",
    title: "Welcome to SkyStack",
    titleAr: "مرحباً بك في سكاي ستاك",
    subtitle: "Brand Awareness",
    subtitleAr: "الوعي بالعلامة التجارية",
    tagline: "Your Trusted Technology Partner in Saudi Arabia",
    taglineAr: "شريكك الموثوق في التقنية في المملكة العربية السعودية",
    description: "We help Saudi companies build better software. From mobile apps to enterprise platforms, we deliver technology solutions that drive real business results.",
    descriptionAr: "نساعد الشركات السعودية على بناء برمجيات أفضل. من تطبيقات الجوال إلى المنصات المؤسسية، نقدم حلول تقنية تحقق نتائج أعمال حقيقية.",
    mainContent: "Welcome to SkyStack!\n\nWe're thrilled to have you join our community of innovative Saudi companies transforming their businesses through technology.\n\nAt SkyStack, we believe that every Saudi business deserves world-class software solutions. Whether you're a startup looking to launch your first app, or an enterprise seeking to modernize your systems, we're here to help you succeed.\n\nOur team of 150+ experienced engineers brings years of expertise in cutting-edge technologies, from React and Node.js to cloud infrastructure and AI-powered solutions. We've successfully delivered 150+ projects, helping companies across industries reduce costs, increase efficiency, and achieve their digital transformation goals.\n\nWhat makes us different? We're not just developers—we're your strategic technology partners. We take the time to understand your business, your challenges, and your vision, then build solutions that truly make a difference.",
    mainContentAr: "مرحباً بك في سكاي ستاك!\n\nنحن متحمسون لانضمامك إلى مجتمعنا من الشركات السعودية المبتكرة التي تحول أعمالها من خلال التقنية.\n\nفي سكاي ستاك، نؤمن أن كل شركة سعودية تستحق حلول برمجيات عالمية المستوى. سواء كنت شركة ناشئة تبحث عن إطلاق تطبيقك الأول، أو مؤسسة تسعى لتحديث أنظمتك، نحن هنا لمساعدتك على النجاح.\n\nفريقنا المكون من أكثر من 150 مهندساً خبيراً يجلب سنوات من الخبرة في أحدث التقنيات، من React و Node.js إلى البنية التحتية السحابية والحلول المدعومة بالذكاء الاصطناعي. لقد أنجزنا بنجاح أكثر من 150 مشروعاً، مما ساعد الشركات عبر الصناعات على تقليل التكاليف وزيادة الكفاءة وتحقيق أهداف التحول الرقمي.\n\nما الذي يميزنا؟ نحن لسنا مجرد مطورين—نحن شركاؤك الاستراتيجيون في التقنية. نأخذ الوقت لفهم أعمالك وتحدياتك ورؤيتك، ثم نبني حلولاً تحدث فرقاً حقيقياً.",
    highlights: ["150+ Projects Delivered", "50+ Enterprise Clients", "8+ Years Experience"],
    highlightsAr: ["150+ مشروع منجز", "50+ عميل مؤسسي", "8+ سنوات خبرة"],
    ctaText: "Explore Our Services",
    ctaTextAr: "اكتشف خدماتنا",
    ctaLink: WEBSITE_URL + "/services",
    stat1: { value: "150+", label: "Projects", labelAr: "مشروع" },
    stat2: { value: "50+", label: "Clients", labelAr: "عميل" },
    stat3: { value: "8+", label: "Years", labelAr: "سنة" },
    subjectLines: [
      {
        subject: "Welcome to SkyStack: Your Trusted Technology Partner",
        subjectAr: "مرحباً بك في سكاي ستاك: شريكك الموثوق في التقنية",
        preview: "We help Saudi companies build better software. 150+ projects, 50+ clients, 8+ years of excellence.",
        previewAr: "نساعد الشركات السعودية على بناء برمجيات أفضل. 150+ مشروع، 50+ عميل، 8+ سنوات من التميز."
      },
      {
        subject: "Meet SkyStack: Transforming Saudi Businesses Through Technology",
        subjectAr: "تعرف على سكاي ستاك: تحويل الشركات السعودية من خلال التقنية",
        preview: "From mobile apps to enterprise platforms - we deliver solutions that drive real results.",
        previewAr: "من تطبيقات الجوال إلى المنصات المؤسسية - نقدم حلولاً تحقق نتائج حقيقية."
      },
      {
        subject: "Why 50+ Saudi Companies Trust SkyStack for Their Software",
        subjectAr: "لماذا يثق 50+ شركة سعودية بسكاي ستاك لبرمجياتهم",
        preview: "Learn what makes us different and how we help businesses succeed.",
        previewAr: "تعلم ما يميزنا وكيف نساعد الشركات على النجاح."
      },
      {
        subject: "Your Strategic Technology Partner in Saudi Arabia",
        subjectAr: "شريكك الاستراتيجي في التقنية في المملكة العربية السعودية",
        preview: "We're not just developers—we're your partners in digital transformation.",
        previewAr: "لسنا مجرد مطورين—نحن شركاؤك في التحول الرقمي."
      },
      {
        subject: "150+ Projects Delivered: Success Stories from SkyStack",
        subjectAr: "150+ مشروع منجز: قصص نجاح من سكاي ستاك",
        preview: "Discover how we've helped Saudi companies achieve their digital goals.",
        previewAr: "اكتشف كيف ساعدنا الشركات السعودية على تحقيق أهدافها الرقمية."
      },
      {
        subject: "Building Better Software for Saudi Companies",
        subjectAr: "بناء برمجيات أفضل للشركات السعودية",
        preview: "Our mission: empower every Saudi business with world-class software solutions.",
        previewAr: "مهمتنا: تمكين كل شركة سعودية بحلول برمجيات عالمية المستوى."
      },
      {
        subject: "From Startup to Enterprise: We Help You Scale",
        subjectAr: "من الشركة الناشئة إلى المؤسسة: نساعدك على التوسع",
        preview: "Whether you're launching your first app or modernizing systems, we're here to help.",
        previewAr: "سواء كنت تطلق تطبيقك الأول أو تحدث الأنظمة، نحن هنا للمساعدة."
      },
      {
        subject: "8+ Years of Excellence in Software Development",
        subjectAr: "8+ سنوات من التميز في تطوير البرمجيات",
        preview: "Experience, expertise, and commitment to helping Saudi businesses thrive.",
        previewAr: "خبرة وخبرة والتزام بمساعدة الشركات السعودية على الازدهار."
      },
      {
        subject: "Join 50+ Companies Transforming Their Business with SkyStack",
        subjectAr: "انضم إلى 50+ شركة تحول أعمالها مع سكاي ستاك",
        preview: "Be part of a community of innovative Saudi companies driving digital transformation.",
        previewAr: "كن جزءاً من مجتمع الشركات السعودية المبتكرة التي تقود التحول الرقمي."
      },
      {
        subject: "Technology Solutions That Drive Real Business Results",
        subjectAr: "حلول تقنية تحقق نتائج أعمال حقيقية",
        preview: "See how our approach to software development delivers measurable impact.",
        previewAr: "شاهد كيف يقدم نهجنا في تطوير البرمجيات تأثيراً قابلاً للقياس."
      }
    ]
  },
  {
    id: "company-story",
    title: "Our Story & Values",
    titleAr: "قصتنا وقيمنا",
    subtitle: "Brand Awareness",
    subtitleAr: "الوعي بالعلامة التجارية",
    tagline: "Building the Future of Software in Saudi Arabia",
    taglineAr: "بناء مستقبل البرمجيات في المملكة العربية السعودية",
    description: "Learn about SkyStack's mission, vision, and commitment to helping Saudi businesses thrive in the digital age.",
    descriptionAr: "تعرف على مهمة ورؤية والتزام سكاي ستاك بمساعدة الشركات السعودية على الازدهار في العصر الرقمي.",
    mainContent: "Our Story\n\nFounded in 2016, SkyStack began with a simple mission: to help Saudi companies build better software. We saw that many businesses were struggling with outdated technology, high development costs, and lack of local expertise. We decided to change that.\n\nOur Vision\n\nWe envision a future where every Saudi business has access to world-class software solutions that drive growth, efficiency, and innovation. We're building a technology ecosystem that empowers Saudi companies to compete globally while staying true to local values and culture.\n\nOur Values\n\n• Excellence: We never settle for good enough. Every line of code, every design decision, every project is executed with precision and care.\n• Integrity: We build trust through transparency, honesty, and delivering on our promises.\n• Innovation: We stay ahead of the curve, continuously learning and adopting the latest technologies to solve complex business challenges.\n• Partnership: We don't just build software—we build lasting relationships. Your success is our success.\n• Local Focus: We understand the Saudi market, culture, and business landscape like no one else.\n\nToday, SkyStack is proud to be one of the leading software development companies in Saudi Arabia, trusted by enterprises, startups, and government organizations alike.",
    mainContentAr: "قصتنا\n\nتأسست سكاي ستاك في عام 2016 بمهمة بسيطة: مساعدة الشركات السعودية على بناء برمجيات أفضل. رأينا أن العديد من الشركات تكافح مع التقنيات القديمة وتكاليف التطوير العالية ونقص الخبرة المحلية. قررنا تغيير ذلك.\n\nرؤيتنا\n\nنتخيل مستقبلاً حيث يكون لكل شركة سعودية إمكانية الوصول إلى حلول برمجيات عالمية المستوى تحفز النمو والكفاءة والابتكار. نحن نبني نظاماً بيئياً تقنياً يمكّن الشركات السعودية من المنافسة عالمياً مع البقاء مخلصين للقيم والثقافة المحلية.\n\nقيمنا\n\n• التميز: لا نرضى أبداً بما هو جيد بما فيه الكفاية. كل سطر كود، كل قرار تصميم، كل مشروع يُنفذ بدقة وعناية.\n• النزاهة: نبني الثقة من خلال الشفافية والأمانة والوفاء بوعودنا.\n• الابتكار: نظل في المقدمة، نتعلم باستمرار ونتبنى أحدث التقنيات لحل تحديات الأعمال المعقدة.\n• الشراكة: لا نبني البرمجيات فقط—نبني علاقات دائمة. نجاحك هو نجاحنا.\n• التركيز المحلي: نفهم السوق السعودي والثقافة ومشهد الأعمال مثل لا أحد آخر.\n\nاليوم، تفخر سكاي ستاك بأن تكون واحدة من الشركات الرائدة في تطوير البرمجيات في المملكة العربية السعودية، موثوقة من قبل المؤسسات والشركات الناشئة والمنظمات الحكومية على حد سواء.",
    highlights: ["Excellence First", "Trusted Partner", "Local Expertise"],
    highlightsAr: ["التميز أولاً", "شريك موثوق", "خبرة محلية"],
    ctaText: "Learn More About Us",
    ctaTextAr: "اعرف المزيد عنا",
    ctaLink: WEBSITE_URL + "/about-us",
    subjectLines: [
      {
        subject: "The Story Behind SkyStack: Building the Future of Software in Saudi Arabia",
        subjectAr: "القصة وراء سكاي ستاك: بناء مستقبل البرمجيات في المملكة",
        preview: "Learn about our mission, vision, and commitment to helping Saudi businesses thrive.",
        previewAr: "تعرف على مهمتنا ورؤيتنا والتزامنا بمساعدة الشركات السعودية على الازدهار."
      },
      {
        subject: "Excellence, Integrity, Innovation: The Values That Drive Us",
        subjectAr: "التميز، النزاهة، الابتكار: القيم التي تحفزنا",
        preview: "Discover the core values that guide everything we do at SkyStack.",
        previewAr: "اكتشف القيم الأساسية التي توجه كل ما نقوم به في سكاي ستاك."
      },
      {
        subject: "From 2016 to Today: SkyStack's Journey",
        subjectAr: "من 2016 إلى اليوم: رحلة سكاي ستاك",
        preview: "How we started with a simple mission and became a leading software development company.",
        previewAr: "كيف بدأنا بمهمة بسيطة وأصبحنا شركة رائدة في تطوير البرمجيات."
      },
      {
        subject: "Why Local Expertise Matters in Software Development",
        subjectAr: "لماذا الخبرة المحلية مهمة في تطوير البرمجيات",
        preview: "Understanding the Saudi market, culture, and business landscape like no one else.",
        previewAr: "فهم السوق السعودي والثقافة ومشهد الأعمال مثل لا أحد آخر."
      },
      {
        subject: "Partnership Over Projects: Our Approach to Client Success",
        subjectAr: "الشراكة على المشاريع: نهجنا لنجاح العملاء",
        preview: "We don't just build software—we build lasting relationships. Your success is our success.",
        previewAr: "لا نبني البرمجيات فقط—نبني علاقات دائمة. نجاحك هو نجاحنا."
      },
      {
        subject: "Innovation at SkyStack: Staying Ahead of the Curve",
        subjectAr: "الابتكار في سكاي ستاك: البقاء في المقدمة",
        preview: "How we continuously learn and adopt the latest technologies to solve complex challenges.",
        previewAr: "كيف نتعلم باستمرار ونتبنى أحدث التقنيات لحل التحديات المعقدة."
      },
      {
        subject: "Trust Through Transparency: Our Commitment to Integrity",
        subjectAr: "الثقة من خلال الشفافية: التزامنا بالنزاهة",
        preview: "Building trust through transparency, honesty, and delivering on our promises.",
        previewAr: "بناء الثقة من خلال الشفافية والأمانة والوفاء بوعودنا."
      },
      {
        subject: "Excellence in Every Line of Code: Our Quality Promise",
        subjectAr: "التميز في كل سطر كود: وعدنا بالجودة",
        preview: "We never settle for good enough. Every project is executed with precision and care.",
        previewAr: "لا نرضى أبداً بما هو جيد بما فيه الكفاية. كل مشروع يُنفذ بدقة وعناية."
      },
      {
        subject: "Empowering Saudi Companies to Compete Globally",
        subjectAr: "تمكين الشركات السعودية للمنافسة عالمياً",
        preview: "Our vision: a technology ecosystem that helps Saudi businesses compete globally.",
        previewAr: "رؤيتنا: نظام بيئي تقني يساعد الشركات السعودية على المنافسة عالمياً."
      },
      {
        subject: "Leading Software Development in Saudi Arabia: Our Story",
        subjectAr: "الريادة في تطوير البرمجيات في المملكة: قصتنا",
        preview: "Proud to be one of the leading software development companies trusted by enterprises and startups.",
        previewAr: "نفخر بأن نكون واحدة من الشركات الرائدة في تطوير البرمجيات الموثوقة من المؤسسات والشركات الناشئة."
      }
    ]
  },
  {
    id: "industry-insights",
    title: "Industry Insights",
    titleAr: "رؤى الصناعة",
    subtitle: "Brand Awareness",
    subtitleAr: "الوعي بالعلامة التجارية",
    tagline: "Stay Ahead with Latest Technology Trends",
    taglineAr: "ابقَ في المقدمة مع أحدث اتجاهات التقنية",
    description: "Discover key insights and trends shaping the future of software development in Saudi Arabia and beyond.",
    descriptionAr: "اكتشف الرؤى والاتجاهات الرئيسية التي تشكل مستقبل تطوير البرمجيات في المملكة العربية السعودية وخارجها.",
    mainContent: "The Digital Transformation Landscape in Saudi Arabia\n\nSaudi Arabia is experiencing unprecedented digital transformation. Vision 2030 has accelerated the adoption of technology across all sectors, creating massive opportunities for businesses willing to innovate.\n\nKey Trends We're Seeing:\n\n1. Cloud-First Strategy\nMost enterprises are migrating to cloud infrastructure, reducing costs by up to 40% while improving scalability and security.\n\n2. AI and Machine Learning\nSaudi companies are increasingly leveraging AI for process automation, customer insights, and predictive analytics.\n\n3. Mobile-First Approach\nWith smartphone penetration at 98%, businesses that prioritize mobile experiences see 2-3x higher engagement rates.\n\n4. API-Driven Architecture\nMicroservices and API-first development enable faster time-to-market and easier system integration.\n\n5. Cybersecurity Focus\nAs digital adoption grows, investing in robust security measures is no longer optional—it's essential.\n\nWhat This Means for Your Business\n\nThese trends aren't just buzzwords—they represent real opportunities to transform your operations, reduce costs, and deliver better customer experiences. The companies that act now will have a significant competitive advantage.\n\nAt SkyStack, we help businesses navigate these trends and implement the right technologies at the right time. Our team stays current with industry developments so you don't have to.",
    mainContentAr: "مشهد التحول الرقمي في المملكة العربية السعودية\n\nتشهد المملكة العربية السعودية تحولاً رقمياً غير مسبوق. رؤية 2030 تسارعت اعتماد التقنية عبر جميع القطاعات، مما يخلق فرصاً ضخمة للشركات الراغبة في الابتكار.\n\nالاتجاهات الرئيسية التي نراها:\n\n1. استراتيجية السحابة أولاً\nمعظم المؤسسات تهاجر إلى البنية التحتية السحابية، مما يقلل التكاليف بنسبة تصل إلى 40% مع تحسين قابلية التوسع والأمان.\n\n2. الذكاء الاصطناعي والتعلم الآلي\nتستفيد الشركات السعودية بشكل متزايد من الذكاء الاصطناعي لأتمتة العمليات ورؤى العملاء والتحليلات التنبؤية.\n\n3. نهج الجوال أولاً\nمع انتشار الهواتف الذكية بنسبة 98%، الشركات التي تعطي أولوية لتجارب الجوال ترى معدلات تفاعل أعلى بمقدار 2-3 مرات.\n\n4. البنية المدعومة بواجهات برمجية\nالخدمات المصغرة والتطوير الذي يعطي أولوية للواجهات البرمجية يتيحان وقتاً أسرع للوصول للسوق وتكامل أسهل للأنظمة.\n\n5. التركيز على الأمن السيبراني\nمع نمو الاعتماد الرقمي، الاستثمار في تدابير أمنية قوية لم يعد اختيارياً—إنه أساسي.\n\nماذا يعني هذا لأعمالك\n\nهذه الاتجاهات ليست مجرد كلمات طنانة—إنها تمثل فرصاً حقيقية لتحويل عملياتك وتقليل التكاليف وتقديم تجارب عملاء أفضل. الشركات التي تعمل الآن ستحصل على ميزة تنافسية كبيرة.\n\nفي سكاي ستاك، نساعد الشركات على التنقل في هذه الاتجاهات وتنفيذ التقنيات المناسبة في الوقت المناسب. فريقنا يبقى على اطلاع بالتطورات الصناعية حتى لا تضطر أنت.",
    highlights: ["Cloud Migration", "AI Integration", "Mobile Optimization"],
    highlightsAr: ["الهجرة السحابية", "تكامل الذكاء الاصطناعي", "تحسين الجوال"],
    ctaText: "Get Technology Consultation",
    ctaTextAr: "احصل على استشارة تقنية",
    ctaLink: WEBSITE_URL + "/services/technology-consulting-services",
    subjectLines: [
      {
        subject: "5 Technology Trends Shaping Saudi Arabia in 2024",
        subjectAr: "5 اتجاهات تقنية تشكل المملكة في 2024",
        preview: "Cloud migration, AI integration, mobile-first - discover what's driving digital transformation.",
        previewAr: "الهجرة السحابية، تكامل الذكاء الاصطناعي، الجوال أولاً - اكتشف ما يدفع التحول الرقمي."
      },
      {
        subject: "Digital Transformation in Saudi Arabia: What You Need to Know",
        subjectAr: "التحول الرقمي في المملكة: ما تحتاج معرفته",
        preview: "Key insights into how Vision 2030 is accelerating technology adoption across sectors.",
        previewAr: "رؤى رئيسية حول كيف تسرع رؤية 2030 اعتماد التقنية عبر القطاعات."
      },
      {
        subject: "Cloud-First Strategy: Why 40% Cost Reduction is Possible",
        subjectAr: "استراتيجية السحابة أولاً: لماذا تقليل 40% من التكاليف ممكن",
        preview: "Learn how cloud migration is helping Saudi enterprises reduce costs and improve scalability.",
        previewAr: "تعلم كيف تساعد الهجرة السحابية المؤسسات السعودية على تقليل التكاليف وتحسين قابلية التوسع."
      },
      {
        subject: "AI and Machine Learning: The Future of Saudi Business",
        subjectAr: "الذكاء الاصطناعي والتعلم الآلي: مستقبل الأعمال السعودية",
        preview: "How Saudi companies are leveraging AI for automation, insights, and predictive analytics.",
        previewAr: "كيف تستفيد الشركات السعودية من الذكاء الاصطناعي للأتمتة والرؤى والتحليلات التنبؤية."
      },
      {
        subject: "Mobile-First: Why 98% Smartphone Penetration Changes Everything",
        subjectAr: "الجوال أولاً: لماذا 98% انتشار الهواتف الذكية يغير كل شيء",
        preview: "Businesses prioritizing mobile see 2-3x higher engagement. Here's how to capitalize.",
        previewAr: "الشركات التي تعطي أولوية للجوال ترى تفاعلاً أعلى 2-3 مرات. إليك كيفية الاستفادة."
      },
      {
        subject: "API-Driven Architecture: Building for Scale and Speed",
        subjectAr: "البنية المدعومة بواجهات برمجية: بناء للتوسع والسرعة",
        preview: "How microservices and API-first development enable faster time-to-market.",
        previewAr: "كيف تتيح الخدمات المصغرة والتطوير الذي يعطي أولوية للواجهات البرمجية وقتاً أسرع للوصول للسوق."
      },
      {
        subject: "Cybersecurity: No Longer Optional in 2024",
        subjectAr: "الأمن السيبراني: لم يعد اختيارياً في 2024",
        preview: "As digital adoption grows, robust security measures are essential. Learn what to prioritize.",
        previewAr: "مع نمو الاعتماد الرقمي، تدابير الأمان القوية ضرورية. تعلم ما يجب إعطاؤه أولوية."
      },
      {
        subject: "Technology Trends: What Saudi Companies Are Investing In",
        subjectAr: "اتجاهات التقنية: ما تستثمر فيه الشركات السعودية",
        preview: "Insights into the technologies and strategies driving business growth in Saudi Arabia.",
        previewAr: "رؤى في التقنيات والاستراتيجيات التي تحفز نمو الأعمال في المملكة."
      },
      {
        subject: "The Competitive Advantage: Acting on Technology Trends Now",
        subjectAr: "الميزة التنافسية: التصرف على اتجاهات التقنية الآن",
        preview: "Companies that act on these trends now will have significant competitive advantage.",
        previewAr: "الشركات التي تتصرف على هذه الاتجاهات الآن ستحصل على ميزة تنافسية كبيرة."
      },
      {
        subject: "Stay Ahead: Expert Insights on Technology Trends",
        subjectAr: "ابقَ في المقدمة: رؤى خبيرة حول اتجاهات التقنية",
        preview: "Our team stays current with industry developments so you don't have to.",
        previewAr: "فريقنا يبقى على اطلاع بالتطورات الصناعية حتى لا تضطر أنت."
      }
    ]
  },
  {
    id: "educational-resource",
    title: "Free Resources & Guides",
    titleAr: "موارد ودلائل مجانية",
    subtitle: "Brand Awareness",
    subtitleAr: "الوعي بالعلامة التجارية",
    tagline: "Expert Knowledge to Help You Succeed",
    taglineAr: "معرفة خبيرة لمساعدتك على النجاح",
    description: "Access our library of free guides, best practices, and expert insights to accelerate your digital transformation journey.",
    descriptionAr: "اطلع على مكتبتنا من الدلائل المجانية وأفضل الممارسات والرؤى الخبيرة لتسريع رحلة التحول الرقمي الخاصة بك.",
    mainContent: "Empower Your Team with Expert Knowledge\n\nAt SkyStack, we believe in sharing knowledge. Over the years, we've helped hundreds of companies navigate complex technology decisions, and we want to make that expertise accessible to you.\n\nWhat You'll Get:\n\n📚 Comprehensive Guides\nStep-by-step guides covering everything from choosing the right tech stack to implementing DevOps best practices.\n\n💡 Best Practices\nLearn from our 150+ projects: proven methodologies, architecture patterns, and development workflows that actually work.\n\n🔍 Case Studies\nReal examples from real companies. See how others have successfully transformed their businesses.\n\n📊 Checklists & Templates\nPractical tools you can use immediately: architecture decision frameworks, project planning templates, and security audit checklists.\n\n🎓 Webinars & Workshops\nJoin our regular sessions where our experts share insights on the latest technologies and trends.\n\nPopular Resources:\n\n• The Complete Guide to Choosing Your Tech Stack\n• Mobile App Development: Native vs Cross-Platform\n• Cloud Migration Checklist for Saudi Businesses\n• API-First Architecture: A Practical Guide\n• Security Best Practices for Modern Web Apps\n\nAll our resources are designed with the Saudi market in mind, considering local regulations, cultural nuances, and business practices.",
    mainContentAr: "مكن فريقك بالمعرفة الخبيرة\n\nفي سكاي ستاك، نؤمن بمشاركة المعرفة. على مر السنين، ساعدنا مئات الشركات على التنقل في قرارات التقنية المعقدة، ونريد أن نجعل هذه الخبرة متاحة لك.\n\nما ستحصل عليه:\n\n📚 دلائل شاملة\nدلائل خطوة بخطوة تغطي كل شيء من اختيار البنية التقنية المناسبة إلى تنفيذ أفضل ممارسات DevOps.\n\n💡 أفضل الممارسات\nتعلم من 150+ مشروعاً لدينا: منهجيات مُثبتة وأنماط معمارية وتدفقات عمل تطوير تعمل بالفعل.\n\n🔍 دراسات الحالة\nأمثلة حقيقية من شركات حقيقية. شاهد كيف نجح آخرون في تحويل أعمالهم.\n\n📊 قوائم التحقق والقوالب\nأدوات عملية يمكنك استخدامها فوراً: أطر قرارات البنية وقوالب تخطيط المشاريع وقوائم تدقيق الأمان.\n\n🎓 الندوات والدورات\nانضم إلى جلساتنا المنتظمة حيث يشارك خبراؤنا رؤى حول أحدث التقنيات والاتجاهات.\n\nالموارد الشائعة:\n\n• الدليل الكامل لاختيار البنية التقنية الخاصة بك\n• تطوير تطبيقات الجوال: الأصلية مقابل منصات متعددة\n• قائمة التحقق للهجرة السحابية للشركات السعودية\n• البنية التي تعطي أولوية لواجهات برمجية: دليل عملي\n• أفضل ممارسات الأمان لتطبيقات الويب الحديثة\n\nجميع مواردنا مصممة مع مراعاة السوق السعودي، مع الأخذ في الاعتبار اللوائح المحلية والفروقات الثقافية وممارسات الأعمال.",
    highlights: ["Free Guides", "Expert Insights", "Practical Tools"],
    highlightsAr: ["دلائل مجانية", "رؤى خبيرة", "أدوات عملية"],
    ctaText: "Browse Resources",
    ctaTextAr: "تصفح الموارد",
    ctaLink: WEBSITE_URL,
    subjectLines: [
      {
        subject: "Free Resources to Accelerate Your Digital Transformation",
        subjectAr: "موارد مجانية لتسريع التحول الرقمي الخاص بك",
        preview: "Comprehensive guides, best practices, and expert insights - all free.",
        previewAr: "دلائل شاملة وأفضل الممارسات ورؤى خبيرة - كلها مجانية."
      },
      {
        subject: "Expert Knowledge: Free Guides from 150+ Projects",
        subjectAr: "معرفة خبيرة: دلائل مجانية من 150+ مشروع",
        preview: "Learn from our proven methodologies and architecture patterns that actually work.",
        previewAr: "تعلم من منهجياتنا المُثبتة وأنماط البنية التي تعمل فعلاً."
      },
      {
        subject: "The Complete Guide to Choosing Your Tech Stack (Free Download)",
        subjectAr: "الدليل الكامل لاختيار البنية التقنية (تحميل مجاني)",
        preview: "Step-by-step guide to making the right technology decisions for your business.",
        previewAr: "دليل خطوة بخطوة لاتخاذ قرارات التقنية الصحيحة لأعمالك."
      },
      {
        subject: "Case Studies: Real Examples from Real Companies",
        subjectAr: "دراسات الحالة: أمثلة حقيقية من شركات حقيقية",
        preview: "See how others have successfully transformed their businesses with technology.",
        previewAr: "شاهد كيف نجح آخرون في تحويل أعمالهم بالتقنية."
      },
      {
        subject: "Practical Tools: Checklists & Templates You Can Use Today",
        subjectAr: "أدوات عملية: قوائم تحقق وقوالب يمكنك استخدامها اليوم",
        preview: "Architecture decision frameworks, project planning templates, and security audit checklists.",
        previewAr: "أطر قرارات البنية وقوالب تخطيط المشاريع وقوائم تدقيق الأمان."
      },
      {
        subject: "Join Our Webinars: Learn from Technology Experts",
        subjectAr: "انضم إلى ندواتنا: تعلم من خبراء التقنية",
        preview: "Regular sessions where our experts share insights on latest technologies and trends.",
        previewAr: "جلسات منتظمة حيث يشارك خبراؤنا رؤى حول أحدث التقنيات والاتجاهات."
      },
      {
        subject: "Best Practices from 150+ Successful Projects",
        subjectAr: "أفضل الممارسات من 150+ مشروع ناجح",
        preview: "Proven methodologies, architecture patterns, and development workflows.",
        previewAr: "منهجيات مُثبتة وأنماط معمارية وتدفقات عمل تطوير."
      },
      {
        subject: "Free Resource: Mobile App Development Guide for Saudi Businesses",
        subjectAr: "مورد مجاني: دليل تطوير تطبيقات الجوال للشركات السعودية",
        preview: "Market trends, user preferences, and best practices tailored for Saudi market.",
        previewAr: "اتجاهات السوق وتفضيلات المستخدمين وأفضل الممارسات المصممة للسوق السعودي."
      },
      {
        subject: "Cloud Migration Checklist: Free Download",
        subjectAr: "قائمة التحقق للهجرة السحابية: تحميل مجاني",
        preview: "Comprehensive checklist to help Saudi businesses migrate to the cloud successfully.",
        previewAr: "قائمة تحقق شاملة لمساعدة الشركات السعودية على الهجرة إلى السحابة بنجاح."
      },
      {
        subject: "Empower Your Team: Free Expert Knowledge",
        subjectAr: "مكن فريقك: معرفة خبيرة مجانية",
        preview: "We believe in sharing knowledge. Access our library of free guides and resources.",
        previewAr: "نؤمن بمشاركة المعرفة. اطلع على مكتبتنا من الدلائل والموارد المجانية."
      }
    ]
  },
  {
    id: "newsletter-update",
    title: "Monthly Newsletter",
    titleAr: "النشرة الشهرية",
    subtitle: "Brand Awareness",
    subtitleAr: "الوعي بالعلامة التجارية",
    tagline: "Stay Updated with SkyStack News & Insights",
    taglineAr: "ابقَ على اطلاع بأخبار ورؤى سكاي ستاك",
    description: "Your monthly digest of technology trends, company updates, and valuable insights to help your business grow.",
    descriptionAr: "ملخصك الشهري لاتجاهات التقنية وتحديثات الشركة ورؤى قيمة لمساعدة عملك على النمو.",
    mainContent: "Welcome to Our Monthly Newsletter\n\nThank you for staying connected with SkyStack! This month, we're excited to share some great updates and insights.\n\n📢 Company Updates\n\n• New Office Opening: We're expanding our presence in Riyadh with a new development center.\n• Team Growth: Welcomed 25 new engineers to our team across mobile, web, and cloud specializations.\n• New Service: Launching our AI/ML consulting practice to help businesses leverage artificial intelligence.\n\n💡 Industry Insights\n\nThis month, we've seen significant interest in:\n• Cloud migration projects (up 40% from last quarter)\n• Mobile app development for B2B platforms\n• AI-powered automation solutions\n• Cybersecurity assessments and implementations\n\n🎯 Success Story\n\nWe're proud to share that one of our clients, a leading retail chain, achieved a 60% reduction in operational costs after implementing our custom ERP solution. Read the full case study on our website.\n\n📚 Featured Resource\n\nThis month's featured guide: \"The Complete Guide to Mobile App Development in Saudi Arabia.\" Learn about market trends, user preferences, and best practices specifically tailored for the Saudi market. Download it for free on our website.\n\n🔮 What's Next\n\nKeep an eye out for our upcoming webinar on \"Digital Transformation Strategies for 2024\" featuring insights from industry leaders. Registration opens next week!",
    mainContentAr: "مرحباً بك في نشرتنا الشهرية\n\nشكراً لبقائك متصلاً بسكاي ستاك! هذا الشهر، نحن متحمسون لمشاركة بعض التحديثات والرؤى الرائعة.\n\n📢 تحديثات الشركة\n\n• افتتاح مكتب جديد: نتوسع في الرياض بمركز تطوير جديد.\n• نمو الفريق: رحبنا بـ 25 مهندساً جديداً لفريقنا عبر تخصصات الجوال والويب والسحابة.\n• خدمة جديدة: إطلاق ممارسة الاستشارات في الذكاء الاصطناعي/التعلم الآلي لمساعدة الشركات على الاستفادة من الذكاء الاصطناعي.\n\n💡 رؤى الصناعة\n\nهذا الشهر، رأينا اهتماماً كبيراً في:\n• مشاريع الهجرة السحابية (زيادة 40% من الربع الأخير)\n• تطوير تطبيقات الجوال لمنصات B2B\n• حلول الأتمتة المدعومة بالذكاء الاصطناعي\n• تقييمات وتنفيذات الأمن السيبراني\n\n🎯 قصة نجاح\n\nنفخر بمشاركة أن أحد عملائنا، سلسلة بيع بالتجزئة رائدة، حققت تقليلاً بنسبة 60% في التكاليف التشغيلية بعد تنفيذ حل ERP المخصص لدينا. اقرأ دراسة الحالة الكاملة على موقعنا.\n\n📚 مورد مميز\n\nدليل هذا الشهر المميز: \"الدليل الكامل لتطوير تطبيقات الجوال في المملكة العربية السعودية.\" تعرف على اتجاهات السوق وتفضيلات المستخدمين وأفضل الممارسات المصممة خصيصاً للسوق السعودي. حمّله مجاناً على موقعنا.\n\n🔮 ما التالي\n\nاحترس من ندوتنا القادمة حول \"استراتيجيات التحول الرقمي لعام 2024\" والتي تضم رؤى من قادة الصناعة. التسجيل يفتح الأسبوع القادم!",
    highlights: ["Latest Updates", "Industry Trends", "Free Resources"],
    highlightsAr: ["أحدث التحديثات", "اتجاهات الصناعة", "موارد مجانية"],
    ctaText: "Visit Our Website",
    ctaTextAr: "زيارة موقعنا",
    ctaLink: WEBSITE_URL,
    stat1: { value: "150+", label: "Projects", labelAr: "مشروع" },
    stat2: { value: "50+", label: "Clients", labelAr: "عميل" },
    stat3: { value: "8+", label: "Years", labelAr: "سنة" },
    subjectLines: [
      {
        subject: "SkyStack Monthly Newsletter: Technology Trends & Company Updates",
        subjectAr: "النشرة الشهرية لسكاي ستاك: اتجاهات التقنية وتحديثات الشركة",
        preview: "Your monthly digest of technology trends, company updates, and valuable insights.",
        previewAr: "ملخصك الشهري لاتجاهات التقنية وتحديثات الشركة ورؤى قيمة."
      },
      {
        subject: "What's New at SkyStack: Monthly Updates & Insights",
        subjectAr: "ما الجديد في سكاي ستاك: تحديثات ورؤى شهرية",
        preview: "Company updates, industry insights, success stories, and featured resources.",
        previewAr: "تحديثات الشركة ورؤى الصناعة وقصص النجاح والموارد المميزة."
      },
      {
        subject: "This Month at SkyStack: Growth, Trends & Success Stories",
        subjectAr: "هذا الشهر في سكاي ستاك: النمو والاتجاهات وقصص النجاح",
        preview: "Stay updated with our latest developments and industry insights.",
        previewAr: "ابقَ على اطلاع بأحدث تطوراتنا ورؤى الصناعة."
      },
      {
        subject: "Technology Trends This Month: What's Driving Digital Transformation",
        subjectAr: "اتجاهات التقنية هذا الشهر: ما يدفع التحول الرقمي",
        preview: "Key trends we're seeing: cloud migration, AI, mobile-first, and more.",
        previewAr: "الاتجاهات الرئيسية التي نراها: الهجرة السحابية والذكاء الاصطناعي والجوال أولاً والمزيد."
      },
      {
        subject: "Success Story: How We Helped a Client Save 60% on Costs",
        subjectAr: "قصة نجاح: كيف ساعدنا عميلاً على توفير 60% من التكاليف",
        preview: "Real results from our custom ERP solution. Read the full case study.",
        previewAr: "نتائج حقيقية من حل ERP المخصص لدينا. اقرأ دراسة الحالة الكاملة."
      },
      {
        subject: "Featured Resource: Free Guide to Mobile App Development in Saudi Arabia",
        subjectAr: "مورد مميز: دليل مجاني لتطوير تطبيقات الجوال في المملكة",
        preview: "This month's featured guide with market trends and best practices.",
        previewAr: "دليل هذا الشهر المميز مع اتجاهات السوق وأفضل الممارسات."
      },
      {
        subject: "Upcoming Webinar: Digital Transformation Strategies for 2024",
        subjectAr: "ندوة قادمة: استراتيجيات التحول الرقمي لعام 2024",
        preview: "Join our webinar featuring insights from industry leaders. Registration opens soon!",
        previewAr: "انضم إلى ندوتنا التي تضم رؤى من قادة الصناعة. التسجيل يفتح قريباً!"
      },
      {
        subject: "Team Growth & New Services: SkyStack Monthly Update",
        subjectAr: "نمو الفريق وخدمات جديدة: تحديث سكاي ستاك الشهري",
        preview: "25 new engineers joined, new office opening, and AI/ML consulting service launch.",
        previewAr: "25 مهندس جديد انضم، افتتاح مكتب جديد، وإطلاق خدمة استشارات الذكاء الاصطناعي/التعلم الآلي."
      },
      {
        subject: "Industry Insights: What Saudi Companies Are Investing In",
        subjectAr: "رؤى الصناعة: ما تستثمر فيه الشركات السعودية",
        preview: "Cloud migration up 40%, B2B mobile apps, AI automation, and cybersecurity focus.",
        previewAr: "الهجرة السحابية زادت 40%، تطبيقات B2B الجوال، أتمتة الذكاء الاصطناعي، والتركيز على الأمن السيبراني."
      },
      {
        subject: "Stay Connected: Your Monthly Technology Digest",
        subjectAr: "ابقَ متصلاً: ملخصك الشهري للتقنية",
        preview: "Thank you for staying connected with SkyStack! Here's what's new this month.",
        previewAr: "شكراً لبقائك متصلاً بسكاي ستاك! إليك ما الجديد هذا الشهر."
      }
    ]
  }
];

// Brand Awareness Template Section Component
function BrandAwarenessTemplateSection({ template }: { template: BrandAwarenessTemplate }) {
  const [selectedLang, setSelectedLang] = useState<'en' | 'ar'>('en');
  
  const enContent = {
    title: template.title,
    subtitle: template.subtitle,
    tagline: template.tagline,
    description: template.description,
    mainContent: template.mainContent,
    highlights: template.highlights,
    ctaText: template.ctaText,
    ctaLink: template.ctaLink,
    stat1: template.stat1 ? { value: template.stat1.value, label: template.stat1.label } : undefined,
    stat2: template.stat2 ? { value: template.stat2.value, label: template.stat2.label } : undefined,
    stat3: template.stat3 ? { value: template.stat3.value, label: template.stat3.label } : undefined,
  };
  
  const arContent = {
    title: template.titleAr,
    subtitle: template.subtitleAr,
    tagline: template.taglineAr,
    description: template.descriptionAr,
    mainContent: template.mainContentAr,
    highlights: template.highlightsAr,
    ctaText: template.ctaTextAr,
    ctaLink: template.ctaLink,
    stat1: template.stat1 ? { value: template.stat1.value, label: template.stat1.labelAr } : undefined,
    stat2: template.stat2 ? { value: template.stat2.value, label: template.stat2.labelAr } : undefined,
    stat3: template.stat3 ? { value: template.stat3.value, label: template.stat3.labelAr } : undefined,
  };

  const currentContent = selectedLang === 'en' ? enContent : arContent;
  const currentTitle = selectedLang === 'en' ? template.title : template.titleAr;

  return (
    <div className="max-w-[800px] mx-auto">
      <SubjectLinesBlock subjectLines={template.subjectLines} lang={selectedLang} />
      <TemplateBlock
        title={currentTitle}
        html={generateBrandAwarenessTemplate(selectedLang, currentContent)}
        lang={selectedLang}
        onLanguageToggle={() => setSelectedLang(selectedLang === 'en' ? 'ar' : 'en')}
      />
    </div>
  );
}

// ─── Cold Outreach Text Messages ──────────────────────────────────
interface TextMessage {
  id: string;
  text: string;
  textAr: string;
  type: "linkedin" | "whatsapp" | "sms" | "cold-email" | "follow-up";
}

interface TextMessageGroup {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  messages: TextMessage[];
}

const coldOutreachMessages: TextMessageGroup[] = [
  // ── 1. IT Staff Outsourcing ──
  {
    id: "outsourcing",
    title: "IT Staff Outsourcing",
    titleAr: "التعهيد التقني",
    description: "Messages for promoting IT outsourcing and dedicated team services — save up to 70%.",
    descriptionAr: "رسائل لترويج خدمات التعهيد التقني والفرق المخصصة — وفّر حتى 70%.",
    messages: [
      { id: "out-1", type: "linkedin", text: "Hi [Name], I noticed you're scaling your tech team. We help Saudi companies save up to 70% on development costs with dedicated offshore engineers — same quality, fraction of the cost. Would you be open to a quick chat?", textAr: "مرحباً [الاسم]، لاحظت أنك توسّع فريقك التقني. نساعد الشركات السعودية على توفير حتى 70% من تكاليف التطوير مع مهندسين مخصصين — نفس الجودة، بجزء من التكلفة. هل تحب نتكلم سريعاً؟" },
      { id: "out-2", type: "whatsapp", text: "Hey [Name]! SkyStack here 👋 We provide dedicated developers for Saudi companies at 70% less than local hiring. Full-stack, mobile, QA, DevOps — you name it. Can I send you our pricing sheet?", textAr: "مرحباً [الاسم]! هنا SkyStack 👋 نوفر مطورين مخصصين للشركات السعودية بتكلفة أقل 70% من التوظيف المحلي. Full-stack، جوال، QA، DevOps — سمّه نوفره. أرسل لك قائمة الأسعار؟" },
      { id: "out-3", type: "cold-email", text: "Subject: Save 70% on your dev team costs\n\nHi [Name],\n\nHiring senior developers in Riyadh costs ~$20,000/month. Through SkyStack's outsourcing service, the same caliber talent is ~$6,500/month.\n\nWe handle recruitment, HR, infrastructure, and daily standups — you get a fully dedicated team.\n\n15-minute call this week?\n\nBest,\nSkyStack Team", textAr: "الموضوع: وفّر 70% من تكاليف فريقك التقني\n\nمرحباً [الاسم]،\n\nتوظيف مطور كبير في الرياض يكلف ~20,000 دولار/شهر. من خلال خدمة التعهيد في SkyStack، نفس مستوى الكفاءة بـ ~6,500 دولار/شهر.\n\nنتولى التوظيف والموارد البشرية والبنية التحتية والاجتماعات اليومية — تحصل على فريق مخصص بالكامل.\n\nمكالمة 15 دقيقة هذا الأسبوع؟\n\nتحياتي،\nفريق SkyStack" },
      { id: "out-4", type: "linkedin", text: "Hi [Name], quick question — are you satisfied with the ROI on your current development team? We've helped 100+ companies cut tech costs by 70% without sacrificing quality. Happy to share how. Let me know!", textAr: "مرحباً [الاسم]، سؤال سريع — هل أنت راضٍ عن العائد من فريقك التقني الحالي؟ ساعدنا 100+ شركة على تقليل تكاليف التقنية بنسبة 70% بدون التضحية بالجودة. يسعدني أشاركك الطريقة!" },
      { id: "out-5", type: "whatsapp", text: "Hi [Name], what if you could add 3 senior developers to your team next week — without the headache of hiring? That's what we do at SkyStack. Want to see available profiles?", textAr: "مرحباً [الاسم]، ماذا لو تقدر تضيف 3 مطورين كبار لفريقك الأسبوع القادم — بدون صداع التوظيف؟ هذا اللي نسويه في SkyStack. تحب تشوف ملفات المتاحين؟" },
      { id: "out-6", type: "sms", text: "SkyStack: Looking to scale your tech team? Get dedicated developers at 70% less than local hiring. Visit skystack.sa/services/outsourcing or reply YES for details.", textAr: "SkyStack: تبي توسّع فريقك التقني؟ احصل على مطورين مخصصين بتكلفة أقل 70%. زر skystack.sa/services/outsourcing أو رد بـ نعم للتفاصيل." },
      { id: "out-7", type: "follow-up", text: "Hi [Name], following up on my previous message. I know hiring is painful — we take that off your plate entirely. Recruitment, onboarding, management — all handled. Just your dedicated team, ready to deliver. Worth a 10-min call?", textAr: "مرحباً [الاسم]، أتابع رسالتي السابقة. أعرف إن التوظيف صعب — نتولى كل شيء عنك. التوظيف، التأهيل، الإدارة — كلها مغطاة. بس فريقك المخصص، جاهز للتسليم. تستاهل مكالمة 10 دقائق؟" },
      { id: "out-8", type: "linkedin", text: "Hi [Name], I came across your company's recent job postings for developers. Before you go through months of recruiting, consider this: SkyStack provides pre-vetted developers in under 2 weeks at 70% lower cost. Interested?", textAr: "مرحباً [الاسم]، شفت إعلانات التوظيف الأخيرة لشركتك عن مطورين. قبل ما تدخل في أشهر من التوظيف، فكّر في هذا: SkyStack يوفر مطورين مؤهلين خلال أسبوعين بتكلفة أقل 70%. مهتم؟" },
      { id: "out-9", type: "cold-email", text: "Subject: Your dev team, but 70% cheaper\n\nHi [Name],\n\nQuick math:\n• Local senior dev: $20K/month\n• SkyStack dedicated dev: $6.5K/month\n• Your savings: $162K/year per developer\n\nSame timezone overlap. Daily standups. Direct Slack access.\n\n100+ Saudi companies trust us. Can we be #101?\n\nBook a free call: skystack.sa\n\nBest,\nSkyStack", textAr: "الموضوع: فريقك التقني، بس أرخص 70%\n\nمرحباً [الاسم]،\n\nحساب سريع:\n• مطور كبير محلي: 20 ألف $/شهر\n• مطور مخصص من SkyStack: 6,500 $/شهر\n• توفيرك: 162 ألف $/سنة لكل مطور\n\nنفس ساعات العمل. اجتماعات يومية. وصول مباشر عبر Slack.\n\n100+ شركة سعودية تثق فينا. نقدر نكون رقم 101؟\n\nاحجز مكالمة مجانية: skystack.sa\n\nتحياتي،\nSkyStack" },
      { id: "out-10", type: "whatsapp", text: "Hi [Name], SkyStack here. We just helped [similar company type] build a 5-person dev team in 10 days — saving them $650K/year vs. local hiring. Happy to show you how we can do the same for you. Free consultation, no strings attached 🤝", textAr: "مرحباً [الاسم]، SkyStack هنا. للتو ساعدنا [نوع شركة مشابه] ببناء فريق تقني من 5 أشخاص في 10 أيام — وفّرنا لهم 650 ألف $/سنة مقارنة بالتوظيف المحلي. يسعدني أوريك كيف نسوي نفس الشيء لك. استشارة مجانية بدون أي التزام 🤝" },
    ]
  },
  // ── 2. Mobile App Development ──
  {
    id: "mobile-app",
    title: "Mobile App Development",
    titleAr: "تطوير تطبيقات الجوال",
    description: "Messages for promoting custom mobile app development services (iOS & Android).",
    descriptionAr: "رسائل لترويج خدمات تطوير تطبيقات الجوال المخصصة (iOS و Android).",
    messages: [
      { id: "mob-1", type: "linkedin", text: "Hi [Name], I see you're in [industry]. Many businesses in your space are winning customers with custom mobile apps. We've built 100+ apps for Saudi companies — from MVPs to enterprise solutions. Would love to share some relevant examples. Open to a quick call?", textAr: "مرحباً [الاسم]، أشوف إنك في مجال [الصناعة]. كثير من الشركات في مجالك تكسب عملاء بتطبيقات جوال مخصصة. بنينا 100+ تطبيق لشركات سعودية — من MVPs لحلول مؤسسية. أحب أشاركك أمثلة مناسبة. تحب نتكلم؟" },
      { id: "mob-2", type: "whatsapp", text: "Hi [Name]! 📱 Got an app idea? We turn ideas into live iOS & Android apps in 8-12 weeks. Free consultation + detailed proposal. Check our portfolio: skystack.sa — or reply here and I'll send you case studies!", textAr: "مرحباً [الاسم]! 📱 عندك فكرة تطبيق؟ نحوّل الأفكار لتطبيقات iOS و Android جاهزة خلال 8-12 أسبوع. استشارة مجانية + عرض تفصيلي. شوف أعمالنا: skystack.sa — أو رد هنا وأرسل لك دراسات حالة!" },
      { id: "mob-3", type: "cold-email", text: "Subject: Your app idea → live in 8 weeks\n\nHi [Name],\n\nEvery week we talk to founders who've been sitting on a great app idea for months. Sound familiar?\n\nAt SkyStack, we take you from concept to App Store in 8-12 weeks:\n✅ Native iOS & Android (or cross-platform)\n✅ UI/UX design included\n✅ Post-launch support\n✅ Full source code ownership\n\nLet's turn your idea into reality. Free discovery call?\n\nBest,\nSkyStack Team", textAr: "الموضوع: فكرة تطبيقك → جاهزة خلال 8 أسابيع\n\nمرحباً [الاسم]،\n\nكل أسبوع نتكلم مع مؤسسين عندهم فكرة تطبيق رائعة من أشهر. يشبهك؟\n\nفي SkyStack، ناخذك من الفكرة للمتجر خلال 8-12 أسبوع:\n✅ iOS و Android أصلي (أو عبر المنصات)\n✅ تصميم UI/UX مشمول\n✅ دعم بعد الإطلاق\n✅ ملكية كاملة للكود المصدري\n\nخلنا نحوّل فكرتك لواقع. مكالمة استكشافية مجانية؟\n\nتحياتي،\nفريق SkyStack" },
      { id: "mob-4", type: "linkedin", text: "Hi [Name], did you know 73% of Saudi consumers prefer mobile apps over websites for purchases? If you don't have an app yet, you're leaving money on the table. We build custom apps in 8-12 weeks. Let's chat!", textAr: "مرحباً [الاسم]، هل تعلم أن 73% من المستهلكين السعوديين يفضلون التطبيقات على المواقع للشراء؟ إذا ما عندك تطبيق، أنت تترك فلوس على الطاولة. نبني تطبيقات مخصصة في 8-12 أسبوع. خلنا نتكلم!" },
      { id: "mob-5", type: "whatsapp", text: "Hey [Name] 👋 We just launched an app for a [similar industry] company that got 10K downloads in the first month. Want to see what we could build for you? I can send the case study right now.", textAr: "مرحباً [الاسم] 👋 للتو أطلقنا تطبيق لشركة في [صناعة مشابهة] حصل 10 آلاف تحميل في أول شهر. تبي تشوف إيش نقدر نبني لك؟ أقدر أرسل لك دراسة الحالة الحين." },
      { id: "mob-6", type: "sms", text: "Build your custom mobile app with SkyStack 📱 iOS & Android | 8-12 weeks | Full ownership. Book a free consultation: skystack.sa or WhatsApp +966 53 743 0455", textAr: "ابنِ تطبيقك المخصص مع SkyStack 📱 iOS و Android | 8-12 أسبوع | ملكية كاملة. احجز استشارة مجانية: skystack.sa أو واتساب +966 53 743 0455" },
      { id: "mob-7", type: "follow-up", text: "Hi [Name], circling back — I know building an app can feel overwhelming. That's exactly why we handle everything: design, development, testing, and launch. You focus on your business, we handle the tech. Can I show you our process in a 15-min call?", textAr: "مرحباً [الاسم]، أرجع أتابع — أعرف إن بناء تطبيق ممكن يكون مرهق. لهذا بالضبط نتولى كل شيء: التصميم، التطوير، الاختبار، والإطلاق. ركّز على عملك، نحن نتولى التقنية. أقدر أوريك عمليتنا في مكالمة 15 دقيقة؟" },
      { id: "mob-8", type: "linkedin", text: "Hi [Name], I help businesses like yours launch mobile apps. Quick question: if you had an app that could [solve specific pain point for their industry], how much revenue could that generate? Let me show you what's possible — no commitment.", textAr: "مرحباً [الاسم]، أساعد شركات مثلك تطلق تطبيقات جوال. سؤال سريع: لو عندك تطبيق يقدر [يحل مشكلة معينة لصناعتهم]، كم إيراد ممكن يولّد؟ خلني أوريك الممكن — بدون أي التزام." },
      { id: "mob-9", type: "cold-email", text: "Subject: [Company Name] + Mobile App = 💰\n\nHi [Name],\n\nI looked at [Company Name] and immediately saw 3 ways a mobile app could drive more revenue for you:\n\n1. [Specific opportunity based on their business]\n2. Push notifications for re-engagement (3x higher retention)\n3. Streamlined ordering/booking for customers\n\nWe've built similar apps for [industry] companies. Can I share the results?\n\n10 min, no pitch — just value.\n\nBest,\nSkyStack", textAr: "الموضوع: [اسم الشركة] + تطبيق جوال = 💰\n\nمرحباً [الاسم]،\n\nشفت [اسم الشركة] وعلى طول لاحظت 3 طرق تطبيق جوال يقدر يزيد إيراداتك:\n\n1. [فرصة محددة بناءً على عملهم]\n2. إشعارات فورية لإعادة التفاعل (3 أضعاف الاحتفاظ)\n3. طلب/حجز سلس للعملاء\n\nبنينا تطبيقات مشابهة لشركات في [الصناعة]. أقدر أشاركك النتائج؟\n\n10 دقائق، بدون عرض بيع — بس قيمة.\n\nتحياتي،\nSkyStack" },
      { id: "mob-10", type: "whatsapp", text: "Hi [Name]! Quick question — have you explored having a mobile app for [company name]? We're running a free app consultation this month for Saudi businesses. No obligation, just a roadmap + cost estimate. Interested? 🚀", textAr: "مرحباً [الاسم]! سؤال سريع — فكرت في تطبيق جوال لـ [اسم الشركة]؟ نسوي استشارات تطبيقات مجانية هذا الشهر للشركات السعودية. بدون التزام، بس خارطة طريق + تقدير تكلفة. مهتم؟ 🚀" },
    ]
  },
  // ── 3. Web Application Development ──
  {
    id: "web-dev",
    title: "Web Application Development",
    titleAr: "تطوير تطبيقات الويب",
    description: "Messages for promoting custom web application and SaaS development.",
    descriptionAr: "رسائل لترويج تطوير تطبيقات الويب المخصصة ومنصات SaaS.",
    messages: [
      { id: "web-1", type: "linkedin", text: "Hi [Name], is your business still running on spreadsheets and manual processes? We build custom web apps that automate operations and save 20+ hours/week. Would love to show you what's possible for [their industry]. Quick chat?", textAr: "مرحباً [الاسم]، عملك لسا يشتغل على جداول بيانات وعمليات يدوية؟ نبني تطبيقات ويب مخصصة تؤتمت العمليات وتوفّر 20+ ساعة/أسبوع. أحب أوريك الممكن لـ [صناعتهم]. نتكلم سريع؟" },
      { id: "web-2", type: "whatsapp", text: "Hi [Name]! 💻 Need a web app? Dashboard, CRM, marketplace, booking system — we build it all. React, Next.js, Node.js — modern tech stack. From idea to launch in 6-12 weeks. Free consultation at skystack.sa!", textAr: "مرحباً [الاسم]! 💻 تحتاج تطبيق ويب؟ لوحة تحكم، CRM، سوق إلكتروني، نظام حجز — نبني كل شيء. React، Next.js، Node.js — أحدث التقنيات. من الفكرة للإطلاق خلال 6-12 أسبوع. استشارة مجانية على skystack.sa!" },
      { id: "web-3", type: "cold-email", text: "Subject: Replace your spreadsheets with a custom web app\n\nHi [Name],\n\nManaging [business process] manually? You're not alone — but you don't have to.\n\nWe build custom web applications that:\n✅ Automate repetitive tasks\n✅ Provide real-time dashboards and analytics\n✅ Scale with your business\n✅ Integrate with your existing tools\n\nOur clients typically see 40-60% efficiency gains.\n\nWorth a 15-minute discovery call?\n\nBest,\nSkyStack Team", textAr: "الموضوع: استبدل جداولك بتطبيق ويب مخصص\n\nمرحباً [الاسم]،\n\nتدير [عملية تجارية] يدوياً؟ مو لوحدك — بس ما تحتاج تستمر كذا.\n\nنبني تطبيقات ويب مخصصة:\n✅ أتمتة المهام المتكررة\n✅ لوحات تحكم وتحليلات فورية\n✅ تتوسع مع عملك\n✅ تتكامل مع أدواتك الحالية\n\nعملاؤنا عادةً يشوفون تحسن 40-60% في الكفاءة.\n\nتستاهل مكالمة استكشافية 15 دقيقة؟\n\nتحياتي،\nفريق SkyStack" },
      { id: "web-4", type: "linkedin", text: "Hi [Name], we just built a custom [CRM/dashboard/portal] for a company in [their industry] that reduced their operations time by 50%. Your company could benefit from something similar. Happy to share the case study!", textAr: "مرحباً [الاسم]، للتو بنينا [CRM/لوحة تحكم/بوابة] مخصصة لشركة في [صناعتهم] قللت وقت عملياتهم بنسبة 50%. شركتك ممكن تستفيد من شيء مشابه. يسعدني أشارك دراسة الحالة!" },
      { id: "web-5", type: "whatsapp", text: "Hey [Name] 👋 Question: what's the one task your team spends the most time on every week? We build web apps that automate exactly that. Let me show you how — free consultation, no pressure!", textAr: "مرحباً [الاسم] 👋 سؤال: إيش المهمة اللي فريقك يقضي فيها أكثر وقت كل أسبوع؟ نبني تطبيقات ويب تؤتمت بالضبط هذا الشيء. خلني أوريك كيف — استشارة مجانية، بدون ضغط!" },
      { id: "web-6", type: "sms", text: "Custom web apps for Saudi businesses 💻 Dashboards, portals, SaaS platforms — built with modern tech. From $5K. Free consultation: skystack.sa | WhatsApp: +966 53 743 0455", textAr: "تطبيقات ويب مخصصة للشركات السعودية 💻 لوحات تحكم، بوابات، منصات SaaS — بأحدث التقنيات. من 5 آلاف $. استشارة مجانية: skystack.sa | واتساب: +966 53 743 0455" },
      { id: "web-7", type: "follow-up", text: "Hi [Name], just wanted to share — we recently helped a [industry] company build an internal web app that saved them 30 hours/week on manual reporting. Their ROI was positive within 2 months. I think the same is possible for [their company]. Shall I explain how?", textAr: "مرحباً [الاسم]، حبيت أشارك — مؤخراً ساعدنا شركة في [الصناعة] تبني تطبيق ويب داخلي وفّر لهم 30 ساعة/أسبوع من التقارير اليدوية. العائد كان إيجابي خلال شهرين. أعتقد نفس الشيء ممكن لـ [شركتهم]. أشرح كيف؟" },
      { id: "web-8", type: "linkedin", text: "Hi [Name], I noticed [their company] is growing fast — congrats! 🎉 Growing companies often outgrow their tools. If you need a custom dashboard, CRM, or internal tool, we can build it in weeks, not months. Let me know if you'd like to explore this.", textAr: "مرحباً [الاسم]، لاحظت إن [شركتهم] تنمو بسرعة — مبروك! 🎉 الشركات النامية عادةً تتجاوز أدواتها. إذا تحتاج لوحة تحكم مخصصة، CRM، أو أداة داخلية، نقدر نبنيها في أسابيع مو أشهر. عطني خبر إذا تحب تستكشف." },
      { id: "web-9", type: "cold-email", text: "Subject: A web app that pays for itself in 60 days\n\nHi [Name],\n\nOur clients' average ROI timeline: 60 days.\n\nThat's how fast a custom web application starts paying for itself through:\n→ Automated workflows (no more manual data entry)\n→ Real-time analytics (decisions in minutes, not days)\n→ Customer self-service portals (reduce support load 50%)\n\nI'd love to map out what this could look like for [Company Name]. 15 minutes?\n\nBest,\nSkyStack Team", textAr: "الموضوع: تطبيق ويب يدفع تكلفته في 60 يوم\n\nمرحباً [الاسم]،\n\nمتوسط وقت العائد لعملائنا: 60 يوم.\n\nهذي سرعة ما يبدأ تطبيق ويب مخصص يدفع تكلفته من خلال:\n→ سير عمل آلي (بدون إدخال بيانات يدوي)\n→ تحليلات فورية (قرارات في دقائق مو أيام)\n→ بوابات خدمة ذاتية للعملاء (تقليل الدعم 50%)\n\nأحب أرسم لك كيف يكون هذا لـ [اسم الشركة]. 15 دقيقة؟\n\nتحياتي،\nفريق SkyStack" },
      { id: "web-10", type: "whatsapp", text: "Hi [Name], we specialize in building web apps for Saudi businesses — think custom dashboards, inventory systems, client portals, HR platforms. Whatever process is eating up your team's time, we can automate it. Chat? 🤝", textAr: "مرحباً [الاسم]، متخصصين في بناء تطبيقات ويب للشركات السعودية — لوحات تحكم مخصصة، أنظمة مخزون، بوابات عملاء، منصات موارد بشرية. أي عملية تاخذ وقت فريقك، نقدر نؤتمتها. نتكلم؟ 🤝" },
    ]
  },
  // ── 4. Personal Website Package ($2,000) ──
  {
    id: "personal-website",
    title: "Personal Website — $2,000",
    titleAr: "الموقع الشخصي — 2,000 دولار",
    description: "Messages for promoting the $2,000 personal website package with free analytics add-ons.",
    descriptionAr: "رسائل لترويج باقة الموقع الشخصي بـ 2,000 دولار مع إضافات تحليلات مجانية.",
    messages: [
      { id: "pw-1", type: "linkedin", text: "Hi [Name], I see you're a [profession/consultant/expert]. Did you know that professionals with a personal website get 3x more inbound leads? We build stunning personal websites for $2,000 — delivered in just 7 days, with $1,150+ in free analytics tools. Interested?", textAr: "مرحباً [الاسم]، أشوف إنك [مهنة/مستشار/خبير]. هل تعلم أن المحترفين اللي عندهم موقع شخصي يحصلون 3 أضعاف العملاء المحتملين؟ نبني مواقع شخصية مذهلة بـ 2,000 دولار — تسليم خلال 7 أيام، مع أدوات تحليلات مجانية بقيمة 1,150+ دولار. مهتم؟" },
      { id: "pw-2", type: "whatsapp", text: "Hi [Name]! 🌐 Your online presence matters. We build professional personal websites for just $2,000:\n\n✅ 5 custom pages\n✅ Mobile responsive\n✅ SEO optimized\n✅ Ready in 7 days\n✅ FREE: Google Analytics, Hotjar, Mixpanel & more ($1,150+ value)\n\nWant to see examples? 👀", textAr: "مرحباً [الاسم]! 🌐 تواجدك الإلكتروني مهم. نبني مواقع شخصية احترافية بـ 2,000 دولار فقط:\n\n✅ 5 صفحات مخصصة\n✅ متجاوب مع الجوال\n✅ محسّن لمحركات البحث\n✅ جاهز في 7 أيام\n✅ مجاناً: Google Analytics، Hotjar، Mixpanel والمزيد (قيمة 1,150+ دولار)\n\nتبي تشوف أمثلة؟ 👀" },
      { id: "pw-3", type: "cold-email", text: "Subject: Your professional website — ready in 7 days for $2,000\n\nHi [Name],\n\nAs a [profession], your website is your digital business card. But most professionals either:\n❌ Don't have one\n❌ Have an outdated one\n❌ Paid too much for one\n\nOur Personal Website Package: $2,000\n• 5 custom-designed pages\n• Mobile responsive + SEO optimized\n• Contact form + lead capture\n• Full source code ownership\n• FREE analytics suite ($1,150+ value)\n• Delivered in 7 days\n\nSee examples at skystack.sa/services/personal-website\n\nBest,\nSkyStack Team", textAr: "الموضوع: موقعك الاحترافي — جاهز في 7 أيام بـ 2,000 دولار\n\nمرحباً [الاسم]،\n\nكـ [مهنة]، موقعك هو بطاقتك الرقمية. لكن أغلب المحترفين:\n❌ ما عندهم موقع\n❌ موقعهم قديم\n❌ دفعوا كثير لموقعهم\n\nباقة الموقع الشخصي: 2,000 دولار\n• 5 صفحات مصممة خصيصاً\n• متجاوب مع الجوال + محسّن لـ SEO\n• نموذج تواصل + جمع عملاء\n• ملكية كاملة للكود المصدري\n• حزمة تحليلات مجانية (قيمة 1,150+ دولار)\n• تسليم خلال 7 أيام\n\nشوف أمثلة على skystack.sa/services/personal-website\n\nتحياتي،\nفريق SkyStack" },
      { id: "pw-4", type: "linkedin", text: "Hi [Name], quick thought — you're doing great work as a [profession], but when someone Googles your name, what do they find? A professional website makes you look credible and brings leads to you. We build them for $2,000, delivered in 7 days. Shall I show you?", textAr: "مرحباً [الاسم]، فكرة سريعة — شغلك ممتاز كـ [مهنة]، بس لما أحد يبحث اسمك في Google، إيش يلاقي؟ موقع احترافي يعطيك مصداقية ويجيب لك عملاء. نبنيها بـ 2,000 دولار، تسليم في 7 أيام. أوريك؟" },
      { id: "pw-5", type: "whatsapp", text: "Hey [Name] 👋 I noticed you don't have a personal website yet. In 2024+, that's like not having a business card. For just $2,000, you get a stunning website + FREE analytics tools (Google Analytics, Hotjar, Mixpanel, Tag Manager & more). Ready in 7 days! Interested?", textAr: "مرحباً [الاسم] 👋 لاحظت ما عندك موقع شخصي لسا. في 2024+، هذا مثل ما يكون عندك بطاقة عمل. بـ 2,000 دولار فقط، تحصل على موقع مذهل + أدوات تحليلات مجانية (Google Analytics، Hotjar، Mixpanel، Tag Manager والمزيد). جاهز في 7 أيام! مهتم؟" },
      { id: "pw-6", type: "sms", text: "🌐 Professional website for $2,000 | 7-day delivery | Mobile responsive | SEO optimized | FREE analytics ($1,150+ value). Visit skystack.sa/services/personal-website or WhatsApp +966 53 743 0455", textAr: "🌐 موقع احترافي بـ 2,000$ | تسليم 7 أيام | متجاوب مع الجوال | محسّن SEO | تحليلات مجانية (قيمة 1,150+$). زر skystack.sa/services/personal-website أو واتساب +966 53 743 0455" },
      { id: "pw-7", type: "follow-up", text: "Hi [Name], just wanted to follow up — we only have 3 slots available this month for our $2,000 personal website package (7-day delivery). If you're even slightly interested, let me send you some examples. No pressure at all 🙏", textAr: "مرحباً [الاسم]، حبيت أتابع — عندنا بس 3 أماكن متاحة هذا الشهر لباقة الموقع الشخصي بـ 2,000 دولار (تسليم 7 أيام). إذا عندك أي اهتمام، خلني أرسل لك أمثلة. بدون أي ضغط 🙏" },
      { id: "pw-8", type: "linkedin", text: "Hi [Name], I help professionals like you build their digital presence. One website. $2,000. 7 days. That includes 5 custom pages, mobile design, SEO, lead capture, and $1,150+ in free analytics tools. No hidden costs, no maintenance fees. Want the details?", textAr: "مرحباً [الاسم]، أساعد محترفين مثلك يبنون تواجدهم الرقمي. موقع واحد. 2,000 دولار. 7 أيام. يشمل 5 صفحات مخصصة، تصميم جوال، SEO، جمع عملاء، وأدوات تحليلات مجانية بقيمة 1,150+ دولار. بدون تكاليف مخفية. تبي التفاصيل؟" },
      { id: "pw-9", type: "cold-email", text: "Subject: Your competitors have websites. You should too.\n\nHi [Name],\n\nI looked up some [profession]s in your area. Most have professional websites that rank on Google and bring them leads automatically.\n\nImagine:\n• A client Googles \"best [profession] in [city]\"\n• Your website shows up with testimonials, services, and a contact form\n• They fill it out → you get a new lead\n\nWe build this for you for $2,000 in 7 days. Including free analytics setup worth $1,150+.\n\nInterested? Reply or visit: skystack.sa/services/personal-website\n\nBest,\nSkyStack", textAr: "الموضوع: منافسينك عندهم مواقع. أنت كمان لازم.\n\nمرحباً [الاسم]،\n\nبحثت عن [مهنة] في منطقتك. أغلبهم عندهم مواقع احترافية تظهر في Google وتجيب لهم عملاء تلقائياً.\n\nتخيّل:\n• عميل يبحث \"أفضل [مهنة] في [المدينة]\"\n• موقعك يظهر مع شهادات، خدمات، ونموذج تواصل\n• يعبيه → تحصل عميل جديد\n\nنبني هذا لك بـ 2,000 دولار في 7 أيام. مع إعداد تحليلات مجاني بقيمة 1,150+ دولار.\n\nمهتم؟ رد أو زر: skystack.sa/services/personal-website\n\nتحياتي،\nSkyStack" },
      { id: "pw-10", type: "whatsapp", text: "Hi [Name], here's what $2,000 gets you:\n\n🎨 5 beautifully designed pages\n📱 Perfect on mobile & desktop\n🔍 SEO so clients find YOU\n📊 Free: GA4, Hotjar, Mixpanel, Tag Manager\n⚡ Speed optimized (Core Web Vitals)\n📅 Delivered in 7 days\n💻 You own everything\n\nZero risk. 100% satisfaction. Want to start? 🚀", textAr: "مرحباً [الاسم]، هذا اللي تحصل عليه بـ 2,000 دولار:\n\n🎨 5 صفحات مصممة بجمال\n📱 مثالي على الجوال والكمبيوتر\n🔍 SEO عشان العملاء يلاقونك\n📊 مجاناً: GA4، Hotjar، Mixpanel، Tag Manager\n⚡ سرعة محسّنة (Core Web Vitals)\n📅 تسليم في 7 أيام\n💻 أنت تملك كل شيء\n\nصفر مخاطرة. 100% رضا. تبي نبدأ؟ 🚀" },
    ]
  },
  // ── 5. UI/UX Design ──
  {
    id: "ui-ux",
    title: "UI/UX Design",
    titleAr: "تصميم UI/UX",
    description: "Messages for promoting UI/UX design and product design services.",
    descriptionAr: "رسائل لترويج خدمات تصميم UI/UX وتصميم المنتجات.",
    messages: [
      { id: "ux-1", type: "linkedin", text: "Hi [Name], does your app or website convert visitors into customers? Bad UX costs businesses 35% of potential revenue. We redesign digital products to maximize conversions. Want a free UX audit of your platform?", textAr: "مرحباً [الاسم]، هل تطبيقك أو موقعك يحوّل الزوار لعملاء؟ تجربة المستخدم السيئة تكلف الشركات 35% من الإيرادات المحتملة. نعيد تصميم المنتجات الرقمية لزيادة التحويلات. تبي تقييم UX مجاني لمنصتك؟" },
      { id: "ux-2", type: "whatsapp", text: "Hi [Name]! 🎨 If your app looks outdated or users are dropping off, a UI/UX redesign can increase conversions by 200%+. We do full design sprints in 2-4 weeks. Want to see before/after examples?", textAr: "مرحباً [الاسم]! 🎨 إذا تطبيقك يبان قديم أو المستخدمين يطلعون، إعادة تصميم UI/UX ممكن تزيد التحويلات بنسبة 200%+. نسوي جولات تصميم كاملة في 2-4 أسابيع. تبي تشوف أمثلة قبل وبعد؟" },
      { id: "ux-3", type: "cold-email", text: "Subject: Your app's design is costing you customers\n\nHi [Name],\n\nI took a quick look at [their app/website]. Here's what I noticed:\n\n• [Specific UX issue 1]\n• [Specific UX issue 2]\n• [Specific UX issue 3]\n\nThese are fixable — and fixing them typically increases conversions by 30-50%.\n\nWe offer a free UX audit. No strings attached. Want one?\n\nBest,\nSkyStack Design Team", textAr: "الموضوع: تصميم تطبيقك يكلفك عملاء\n\nمرحباً [الاسم]،\n\nألقيت نظرة سريعة على [تطبيقهم/موقعهم]. هذا اللي لاحظته:\n\n• [مشكلة UX محددة 1]\n• [مشكلة UX محددة 2]\n• [مشكلة UX محددة 3]\n\nهذي قابلة للإصلاح — وإصلاحها عادةً يزيد التحويلات بنسبة 30-50%.\n\nنقدم تقييم UX مجاني. بدون أي شروط. تبي واحد؟\n\nتحياتي،\nفريق تصميم SkyStack" },
      { id: "ux-4", type: "linkedin", text: "Hi [Name], every great product starts with great design. We've designed 100+ digital products — apps, dashboards, and platforms — for Saudi companies. If you're building or redesigning anything, I'd love to share our portfolio. Interested?", textAr: "مرحباً [الاسم]، كل منتج عظيم يبدأ بتصميم عظيم. صممنا 100+ منتج رقمي — تطبيقات، لوحات تحكم، ومنصات — لشركات سعودية. إذا تبني أو تعيد تصميم أي شيء، أحب أشاركك معرض أعمالنا. مهتم؟" },
      { id: "ux-5", type: "whatsapp", text: "Hey [Name] 👋 Fun fact: users form an opinion about your app in 0.05 seconds. First impressions matter! We design beautiful, intuitive interfaces that users love. Free consultation — WhatsApp me back or visit skystack.sa 🎨", textAr: "مرحباً [الاسم] 👋 معلومة: المستخدمين يكوّنون رأيهم عن تطبيقك في 0.05 ثانية. الانطباع الأول مهم! نصمم واجهات جميلة وبديهية يحبها المستخدمين. استشارة مجانية — رد هنا أو زر skystack.sa 🎨" },
      { id: "ux-6", type: "sms", text: "Better UX = More revenue 🎨 Get a FREE UX audit of your app/website from SkyStack's design experts. Visit skystack.sa or WhatsApp +966 53 743 0455", textAr: "تجربة مستخدم أفضل = إيرادات أكثر 🎨 احصل على تقييم UX مجاني لتطبيقك/موقعك من خبراء تصميم SkyStack. زر skystack.sa أو واتساب +966 53 743 0455" },
      { id: "ux-7", type: "follow-up", text: "Hi [Name], following up on the UX audit I offered. Just to give you context: we recently redesigned a [industry] app and their user retention went from 25% to 68%. That's the power of good design. Still interested?", textAr: "مرحباً [الاسم]، أتابع عرض تقييم UX. للمعلومية: مؤخراً أعدنا تصميم تطبيق [صناعة] واحتفاظ المستخدمين ارتفع من 25% لـ 68%. هذي قوة التصميم الجيد. لسا مهتم؟" },
      { id: "ux-8", type: "linkedin", text: "Hi [Name], I'm curious — when was the last time you got user feedback on your app's design? We run design sprints that validate ideas with real users before a single line of code is written. Saves months and thousands of dollars. Want to learn more?", textAr: "مرحباً [الاسم]، فضولي — متى آخر مرة حصلت على آراء المستخدمين عن تصميم تطبيقك؟ نسوي جولات تصميم تتحقق من الأفكار مع مستخدمين حقيقيين قبل كتابة أي كود. توفّر أشهر وآلاف الدولارات. تبي تعرف أكثر؟" },
      { id: "ux-9", type: "cold-email", text: "Subject: Free UX audit for [Company Name]\n\nHi [Name],\n\nI'd like to offer you something: a free, no-obligation UX audit of [their product].\n\nWe'll analyze:\n• User flow efficiency\n• Conversion bottlenecks\n• Mobile responsiveness\n• Accessibility compliance\n• Visual hierarchy and consistency\n\nYou'll get a detailed report with actionable improvements.\n\nInterested? Just reply \"Yes\" and we'll get started.\n\nBest,\nSkyStack Design Team", textAr: "الموضوع: تقييم UX مجاني لـ [اسم الشركة]\n\nمرحباً [الاسم]،\n\nأحب أقدم لك شيء: تقييم UX مجاني بدون أي التزام لـ [منتجهم].\n\nسنحلل:\n• كفاءة مسار المستخدم\n• عقبات التحويل\n• التجاوب مع الجوال\n• الامتثال لإمكانية الوصول\n• التسلسل البصري والاتساق\n\nستحصل على تقرير مفصل مع تحسينات قابلة للتنفيذ.\n\nمهتم؟ بس رد \"نعم\" ونبدأ.\n\nتحياتي،\nفريق تصميم SkyStack" },
      { id: "ux-10", type: "whatsapp", text: "Hi [Name], your product might be amazing, but if the design doesn't communicate that — users won't know. We make digital products look and feel world-class. 100+ projects delivered. Want to see our portfolio? 🎨", textAr: "مرحباً [الاسم]، منتجك ممكن يكون مذهل، بس إذا التصميم ما يوصّل هذا — المستخدمين ما يعرفون. نخلي المنتجات الرقمية تبان وتحس عالمية. 100+ مشروع منجز. تبي تشوف أعمالنا؟ 🎨" },
    ]
  },
  // ── 6. E-commerce Solutions ──
  {
    id: "ecommerce",
    title: "E-commerce Solutions",
    titleAr: "حلول التجارة الإلكترونية",
    description: "Messages for promoting custom e-commerce and marketplace development.",
    descriptionAr: "رسائل لترويج تطوير التجارة الإلكترونية والأسواق الرقمية المخصصة.",
    messages: [
      { id: "ec-1", type: "linkedin", text: "Hi [Name], Saudi e-commerce hit $12B+ last year and it's growing 25% annually. If you're selling products/services but don't have a custom online store, you're leaving money on the table. We build e-commerce platforms that convert. Let's talk!", textAr: "مرحباً [الاسم]، التجارة الإلكترونية السعودية تجاوزت 12 مليار $ العام الماضي وتنمو 25% سنوياً. إذا تبيع منتجات/خدمات بدون متجر إلكتروني مخصص، أنت تترك فلوس. نبني منصات تجارة إلكترونية تحوّل. خلنا نتكلم!" },
      { id: "ec-2", type: "whatsapp", text: "Hi [Name]! 🛒 Ready to sell online? We build custom e-commerce platforms with:\n\n✅ Beautiful product pages\n✅ Secure payment gateway (Mada, STC Pay, cards)\n✅ Inventory management\n✅ Arabic + English support\n✅ Mobile-first design\n\nFree consultation — reply here! 🚀", textAr: "مرحباً [الاسم]! 🛒 جاهز تبيع أونلاين؟ نبني منصات تجارة إلكترونية مخصصة مع:\n\n✅ صفحات منتجات جميلة\n✅ بوابة دفع آمنة (مدى، STC Pay، بطاقات)\n✅ إدارة المخزون\n✅ دعم عربي + إنجليزي\n✅ تصميم موبايل أولاً\n\nاستشارة مجانية — رد هنا! 🚀" },
      { id: "ec-3", type: "cold-email", text: "Subject: Your products deserve a better online store\n\nHi [Name],\n\nI see [Company] has great products. But is your online presence converting as well as it should?\n\nWe build custom e-commerce platforms that:\n✅ Increase conversion rates by 40%+\n✅ Support Mada, STC Pay, Apple Pay\n✅ Handle Arabic & English seamlessly\n✅ Integrate with your inventory/ERP\n✅ Are optimized for Saudi customers\n\nLet me show you what a modern store could look like for [Company].\n\nBest,\nSkyStack Team", textAr: "الموضوع: منتجاتك تستحق متجر إلكتروني أفضل\n\nمرحباً [الاسم]،\n\nأشوف [الشركة] عندها منتجات رائعة. بس هل تواجدك الإلكتروني يحوّل بالشكل المطلوب؟\n\nنبني منصات تجارة إلكترونية مخصصة:\n✅ زيادة معدل التحويل بنسبة 40%+\n✅ دعم مدى، STC Pay، Apple Pay\n✅ عربي وإنجليزي بسلاسة\n✅ تكامل مع المخزون/ERP\n✅ محسّنة للعملاء السعوديين\n\nخلني أوريك كيف يكون متجر حديث لـ [الشركة].\n\nتحياتي،\nفريق SkyStack" },
      { id: "ec-4", type: "linkedin", text: "Hi [Name], we recently built an e-commerce platform for a [similar business type] that increased their online sales by 3x in the first quarter. I think [Company] could achieve similar results. Open to hearing how?", textAr: "مرحباً [الاسم]، مؤخراً بنينا منصة تجارة إلكترونية لـ [نوع عمل مشابه] زادت مبيعاتهم الإلكترونية 3 أضعاف في أول ربع. أعتقد [الشركة] تقدر تحقق نتائج مشابهة. تحب تسمع كيف؟" },
      { id: "ec-5", type: "whatsapp", text: "Hey [Name] 👋 Selling on Instagram/WhatsApp only? A custom e-commerce site can automate your orders, track inventory, and process payments 24/7 — while you sleep! We build them for Saudi businesses. Let me show you 🛒", textAr: "مرحباً [الاسم] 👋 تبيع على انستقرام/واتساب بس؟ متجر إلكتروني مخصص يقدر يؤتمت طلباتك، يتابع المخزون، ويعالج المدفوعات 24/7 — وأنت نايم! نبنيها للشركات السعودية. خلني أوريك 🛒" },
      { id: "ec-6", type: "sms", text: "Launch your online store with SkyStack 🛒 Custom e-commerce | Mada & STC Pay | Arabic + English | Mobile-first. Free consultation: skystack.sa | +966 53 743 0455", textAr: "أطلق متجرك الإلكتروني مع SkyStack 🛒 تجارة إلكترونية مخصصة | مدى و STC Pay | عربي + إنجليزي | موبايل أولاً. استشارة مجانية: skystack.sa | +966 53 743 0455" },
      { id: "ec-7", type: "follow-up", text: "Hi [Name], just a thought — Black Friday, Ramadan sales, National Day... big revenue opportunities are coming. If your online store isn't ready, you're missing out. We can build or upgrade your platform before the next big season. Chat?", textAr: "مرحباً [الاسم]، مجرد فكرة — الجمعة البيضاء، تخفيضات رمضان، اليوم الوطني... فرص إيرادات كبيرة قادمة. إذا متجرك مو جاهز، أنت تفوّت. نقدر نبني أو نطوّر منصتك قبل الموسم الكبير القادم. نتكلم؟" },
      { id: "ec-8", type: "linkedin", text: "Hi [Name], I noticed [Company] doesn't have an online store yet. With Saudi consumers spending $12B+ online, every day without an e-commerce platform is lost revenue. We specialize in building Saudi-optimized stores. 15 minutes for a roadmap?", textAr: "مرحباً [الاسم]، لاحظت [الشركة] ما عندها متجر إلكتروني لسا. مع إنفاق المستهلكين السعوديين 12+ مليار $ أونلاين، كل يوم بدون منصة تجارة إلكترونية هو إيراد ضائع. متخصصين في بناء متاجر محسّنة للسعودية. 15 دقيقة لخارطة طريق؟" },
      { id: "ec-9", type: "cold-email", text: "Subject: From Instagram DMs to automated orders in 4 weeks\n\nHi [Name],\n\nI see [Company] is active on social media. That's great! But are you still:\n• Taking orders via DMs?\n• Tracking inventory in spreadsheets?\n• Processing payments manually?\n\nA custom e-commerce platform automates all of this. Your customers order → payment processes → inventory updates → shipping triggers. All automatic.\n\nWe can build this in 4-8 weeks. Free consultation?\n\nBest,\nSkyStack", textAr: "الموضوع: من رسائل انستقرام لطلبات آلية في 4 أسابيع\n\nمرحباً [الاسم]،\n\nأشوف [الشركة] نشيطة على السوشيال ميديا. ممتاز! بس لسا:\n• تاخذ طلبات عبر الرسائل؟\n• تتابع المخزون في جداول بيانات؟\n• تعالج المدفوعات يدوياً؟\n\nمنصة تجارة إلكترونية مخصصة تؤتمت كل هذا. عميلك يطلب → الدفع يُعالج → المخزون يُحدّث → الشحن يبدأ. كلها تلقائي.\n\nنقدر نبنيها في 4-8 أسابيع. استشارة مجانية؟\n\nتحياتي،\nSkyStack" },
      { id: "ec-10", type: "whatsapp", text: "Hi [Name], if you're selling online using Salla or Shopify but want something fully custom — with your own branding, features, and full control — we can build it. Own your platform, own your data, own your growth. Interested? 💪", textAr: "مرحباً [الاسم]، إذا تبيع أونلاين على سلة أو Shopify بس تبي شيء مخصص بالكامل — بعلامتك التجارية، ميزاتك، وتحكم كامل — نقدر نبنيه. امتلك منصتك، بياناتك، ونموك. مهتم؟ 💪" },
    ]
  },
  // ── 7. Food Delivery & On-demand Apps ──
  {
    id: "food-delivery",
    title: "Food Delivery & On-Demand Apps",
    titleAr: "تطبيقات التوصيل والخدمات عند الطلب",
    description: "Messages for food delivery, ride-hailing, and on-demand service app development.",
    descriptionAr: "رسائل لتطوير تطبيقات توصيل الطعام، النقل، والخدمات عند الطلب.",
    messages: [
      { id: "fd-1", type: "linkedin", text: "Hi [Name], I see you're in the food/restaurant business. Want your own delivery app like HungerStation or Jahez — but with YOUR brand, YOUR data, and zero commission fees? We build white-label delivery apps. Let's talk!", textAr: "مرحباً [الاسم]، أشوف إنك في مجال المطاعم/الأغذية. تبي تطبيق توصيل خاص فيك مثل هنقرستيشن أو جاهز — بس بعلامتك التجارية، بياناتك، وصفر عمولات؟ نبني تطبيقات توصيل بعلامتك. خلنا نتكلم!" },
      { id: "fd-2", type: "whatsapp", text: "Hi [Name]! 🍕 Tired of paying 30% commission to delivery apps? Build your own delivery platform:\n\n✅ Customer app (iOS + Android)\n✅ Driver tracking app\n✅ Restaurant dashboard\n✅ Real-time GPS tracking\n✅ Online payments\n\nKeep 100% of your revenue. Want a demo?", textAr: "مرحباً [الاسم]! 🍕 تعبت من دفع 30% عمولة لتطبيقات التوصيل؟ ابنِ منصة التوصيل الخاصة فيك:\n\n✅ تطبيق عملاء (iOS + Android)\n✅ تطبيق تتبع سائقين\n✅ لوحة تحكم المطعم\n✅ تتبع GPS فوري\n✅ مدفوعات إلكترونية\n\nاحتفظ بـ 100% من إيراداتك. تبي عرض توضيحي؟" },
      { id: "fd-3", type: "cold-email", text: "Subject: Stop paying 30% commission to delivery apps\n\nHi [Name],\n\nIf you're a restaurant doing $50K/month through HungerStation or Jahez, you're paying $15K/month in commissions. That's $180K/year!\n\nFor a fraction of that cost, you can have your own branded delivery app:\n• Customer app with real-time tracking\n• Driver management system\n• Admin dashboard with analytics\n• Push notifications for re-engagement\n• Zero commission fees — ever.\n\nROI? Usually within 3-4 months.\n\nWorth a conversation?\n\nBest,\nSkyStack Team", textAr: "الموضوع: توقف عن دفع 30% عمولة لتطبيقات التوصيل\n\nمرحباً [الاسم]،\n\nإذا عندك مطعم يسوي 50 ألف $/شهر عبر هنقرستيشن أو جاهز، أنت تدفع 15 ألف $/شهر عمولات. هذي 180 ألف $/سنة!\n\nبجزء من هذي التكلفة، يكون عندك تطبيق توصيل بعلامتك:\n• تطبيق عملاء مع تتبع فوري\n• نظام إدارة سائقين\n• لوحة تحكم مع تحليلات\n• إشعارات فورية لإعادة التفاعل\n• صفر عمولات — أبداً.\n\nالعائد؟ عادةً خلال 3-4 أشهر.\n\nتستاهل محادثة؟\n\nتحياتي،\nفريق SkyStack" },
      { id: "fd-4", type: "linkedin", text: "Hi [Name], the on-demand economy is booming in Saudi Arabia. Whether it's food, grocery, laundry, or home services — we build the complete platform (customer app + provider app + admin). Proven templates, fast delivery. Interested?", textAr: "مرحباً [الاسم]، اقتصاد الخدمات عند الطلب يزدهر في السعودية. سواء طعام، بقالة، غسيل، أو خدمات منزلية — نبني المنصة الكاملة (تطبيق عميل + تطبيق مزود + لوحة تحكم). قوالب مجربة، تسليم سريع. مهتم؟" },
      { id: "fd-5", type: "whatsapp", text: "Hey [Name] 👋 Got an idea for an on-demand service app? Like Uber but for [service]? We've built 50+ on-demand apps. Customer app, provider app, admin panel — the whole ecosystem. Let me show you a live demo!", textAr: "مرحباً [الاسم] 👋 عندك فكرة لتطبيق خدمات عند الطلب؟ مثل أوبر بس لـ [خدمة]؟ بنينا 50+ تطبيق خدمات عند الطلب. تطبيق عميل، تطبيق مزود، لوحة تحكم — النظام الكامل. خلني أوريك عرض حي!" },
      { id: "fd-6", type: "sms", text: "Own your delivery platform 🍕 Stop paying 30% commission. Customer app + driver app + dashboard. SkyStack: skystack.sa | WhatsApp +966 53 743 0455", textAr: "امتلك منصة التوصيل 🍕 توقف عن دفع 30% عمولة. تطبيق عملاء + تطبيق سائقين + لوحة تحكم. SkyStack: skystack.sa | واتساب +966 53 743 0455" },
      { id: "fd-7", type: "follow-up", text: "Hi [Name], I calculated that if your restaurant saves just $10K/month in delivery commissions, our app pays for itself in under 6 months — and then it's pure profit. Want me to run the numbers for your specific case?", textAr: "مرحباً [الاسم]، حسبت إنه لو مطعمك يوفّر بس 10 آلاف $/شهر من عمولات التوصيل، التطبيق يدفع تكلفته في أقل من 6 أشهر — وبعدها كلها ربح صافي. تبي أحسب الأرقام لحالتك المحددة؟" },
      { id: "fd-8", type: "linkedin", text: "Hi [Name], I work with restaurant chains looking to break free from third-party delivery apps. Our white-label solution gives you: your brand, your customers, your data, your profits. 100% ownership. Let me explain how.", textAr: "مرحباً [الاسم]، أشتغل مع سلاسل مطاعم تبي تتحرر من تطبيقات التوصيل الخارجية. حلنا بالعلامة البيضاء يعطيك: علامتك، عملاءك، بياناتك، أرباحك. ملكية 100%. خلني أشرح كيف." },
      { id: "fd-9", type: "cold-email", text: "Subject: Your own HungerStation — without the 30% cut\n\nHi [Name],\n\nWhat if I told you that for the same amount you pay in annual delivery commissions, you could own your own delivery platform?\n\nOur white-label solution includes:\n📱 Branded customer app (iOS + Android)\n🚗 Driver app with live GPS\n📊 Admin dashboard with full analytics\n💳 Integrated payments (Mada, STC Pay, cards)\n📢 Push notification marketing\n\nLaunch in 4-8 weeks. Own it forever.\n\nBook a free demo: skystack.sa\n\nBest,\nSkyStack", textAr: "الموضوع: تطبيقك الخاص مثل هنقرستيشن — بدون حصة الـ 30%\n\nمرحباً [الاسم]،\n\nماذا لو قلت لك إنه بنفس المبلغ اللي تدفعه سنوياً عمولات توصيل، تقدر تمتلك منصة التوصيل الخاصة فيك؟\n\nحلنا بالعلامة البيضاء يشمل:\n📱 تطبيق عملاء بعلامتك (iOS + Android)\n🚗 تطبيق سائقين مع GPS حي\n📊 لوحة تحكم مع تحليلات كاملة\n💳 مدفوعات متكاملة (مدى، STC Pay، بطاقات)\n📢 تسويق بالإشعارات الفورية\n\nإطلاق خلال 4-8 أسابيع. امتلكه للأبد.\n\nاحجز عرض مجاني: skystack.sa\n\nتحياتي،\nSkyStack" },
      { id: "fd-10", type: "whatsapp", text: "Hi [Name], we built a delivery app for [similar restaurant chain] and they saved $200K/year in commission fees. Their customers now order directly from them. Want me to show you their story? 🍔", textAr: "مرحباً [الاسم]، بنينا تطبيق توصيل لـ [سلسلة مطاعم مشابهة] ووفّروا 200 ألف $/سنة من العمولات. عملاءهم الحين يطلبون منهم مباشرة. تبي أوريك قصتهم؟ 🍔" },
    ]
  },
  // ── 8. E-learning Platforms ──
  {
    id: "elearning",
    title: "E-Learning Platforms",
    titleAr: "منصات التعليم الإلكتروني",
    description: "Messages for promoting LMS and e-learning platform development.",
    descriptionAr: "رسائل لترويج تطوير منصات التعليم الإلكتروني وأنظمة إدارة التعلم.",
    messages: [
      { id: "el-1", type: "linkedin", text: "Hi [Name], I see you're in education/training. The Saudi e-learning market is growing 20%+ annually. We build custom LMS platforms that help educators and trainers monetize their knowledge. Would love to share some success stories. Open to chat?", textAr: "مرحباً [الاسم]، أشوف إنك في مجال التعليم/التدريب. سوق التعليم الإلكتروني السعودي ينمو 20%+ سنوياً. نبني منصات تعليم إلكتروني مخصصة تساعد المعلمين والمدربين على تحقيق دخل من معرفتهم. أحب أشاركك قصص نجاح. تحب نتكلم؟" },
      { id: "el-2", type: "whatsapp", text: "Hi [Name]! 📚 Want to build your own Udemy/Coursera-style platform? We build custom e-learning platforms with:\n\n✅ Course builder & management\n✅ Video streaming & quizzes\n✅ Student progress tracking\n✅ Certificate generation\n✅ Payment gateway\n✅ Arabic + English support\n\nFree consultation! Reply here 🎓", textAr: "مرحباً [الاسم]! 📚 تبي تبني منصتك مثل Udemy/Coursera؟ نبني منصات تعليم إلكتروني مخصصة مع:\n\n✅ بناء وإدارة الدورات\n✅ بث فيديو واختبارات\n✅ تتبع تقدم الطلاب\n✅ إنشاء شهادات\n✅ بوابة دفع\n✅ دعم عربي + إنجليزي\n\nاستشارة مجانية! رد هنا 🎓" },
      { id: "el-3", type: "cold-email", text: "Subject: Turn your expertise into a profitable online academy\n\nHi [Name],\n\nYou have expertise worth sharing — and charging for. An online academy lets you:\n\n✅ Sell courses globally 24/7\n✅ Build recurring revenue\n✅ Scale without limits\n✅ Track student progress\n✅ Issue certificates automatically\n\nWe build custom e-learning platforms for Saudi educators and institutions. Your brand, your rules, your revenue.\n\nReady to explore this? 15-minute call?\n\nBest,\nSkyStack Team", textAr: "الموضوع: حوّل خبرتك لأكاديمية أونلاين مربحة\n\nمرحباً [الاسم]،\n\nعندك خبرة تستحق المشاركة — والدفع مقابلها. أكاديمية أونلاين تمكنك:\n\n✅ بيع دورات عالمياً 24/7\n✅ بناء إيرادات متكررة\n✅ توسّع بلا حدود\n✅ تتبع تقدم الطلاب\n✅ إصدار شهادات تلقائياً\n\nنبني منصات تعليم إلكتروني مخصصة للمعلمين والمؤسسات السعودية. علامتك، قواعدك، إيراداتك.\n\nجاهز تستكشف؟ مكالمة 15 دقيقة؟\n\nتحياتي،\nفريق SkyStack" },
      { id: "el-4", type: "linkedin", text: "Hi [Name], I help training companies and educators build their own e-learning platforms. Imagine having your own branded academy with video courses, quizzes, certificates, and payments — all custom-built. Worth exploring?", textAr: "مرحباً [الاسم]، أساعد شركات التدريب والمعلمين يبنون منصات التعليم الإلكتروني الخاصة فيهم. تخيّل عندك أكاديمية بعلامتك مع دورات فيديو، اختبارات، شهادات، ومدفوعات — كلها مبنية خصيصاً. تستحق الاستكشاف؟" },
      { id: "el-5", type: "whatsapp", text: "Hey [Name] 👋 If you're teaching courses in-person, imagine scaling to 1,000+ students online. No venue costs. No scheduling headaches. Just your content + our platform. We build custom LMS solutions. Want to see a demo? 📚", textAr: "مرحباً [الاسم] 👋 إذا تقدم دورات حضورية، تخيّل توصل لـ 1,000+ طالب أونلاين. بدون تكاليف مقر. بدون صداع جدولة. بس محتواك + منصتنا. نبني حلول LMS مخصصة. تبي تشوف عرض؟ 📚" },
      { id: "el-6", type: "sms", text: "Build your online academy with SkyStack 📚 Custom LMS | Video courses | Certificates | Payments | Arabic + English. Free consultation: skystack.sa | +966 53 743 0455", textAr: "ابنِ أكاديميتك الأونلاين مع SkyStack 📚 LMS مخصص | دورات فيديو | شهادات | مدفوعات | عربي + إنجليزي. استشارة مجانية: skystack.sa | +966 53 743 0455" },
      { id: "el-7", type: "follow-up", text: "Hi [Name], one of our e-learning clients went from 50 students/month to 500+ after launching their custom platform. The key? A seamless user experience, Arabic content support, and automated certificate delivery. Can we replicate this for you?", textAr: "مرحباً [الاسم]، أحد عملائنا في التعليم الإلكتروني انتقل من 50 طالب/شهر لـ 500+ بعد إطلاق منصتهم المخصصة. السر؟ تجربة مستخدم سلسة، دعم محتوى عربي، وتسليم شهادات تلقائي. نقدر نسوي نفس الشيء لك؟" },
      { id: "el-8", type: "linkedin", text: "Hi [Name], with Vision 2030's focus on education and training, Saudi Arabia is the biggest e-learning market in the region. We've built platforms for educational institutions, training companies, and individual educators. Let me show you what's possible.", textAr: "مرحباً [الاسم]، مع تركيز رؤية 2030 على التعليم والتدريب، السعودية أكبر سوق تعليم إلكتروني في المنطقة. بنينا منصات لمؤسسات تعليمية، شركات تدريب، ومعلمين أفراد. خلني أوريك الممكن." },
      { id: "el-9", type: "cold-email", text: "Subject: Your knowledge is worth millions — here's how to monetize it\n\nHi [Name],\n\nTop educators in Saudi Arabia are earning $10K-$50K/month from online courses. The difference between them and you? They have a platform.\n\nWe build custom e-learning platforms that include:\n📹 HD video course hosting\n📝 Interactive quizzes & assignments\n📜 Automatic certificate generation\n💳 Built-in payment processing\n📊 Analytics & student tracking\n📱 Mobile-friendly design\n🇸🇦 Full Arabic support\n\nLet's build yours. Free consultation?\n\nBest,\nSkyStack", textAr: "الموضوع: معرفتك تساوي ملايين — هذي طريقة تحقيق الدخل منها\n\nمرحباً [الاسم]،\n\nأفضل المعلمين في السعودية يكسبون 10-50 ألف $/شهر من الدورات الأونلاين. الفرق بينهم وبينك؟ عندهم منصة.\n\nنبني منصات تعليم إلكتروني مخصصة تشمل:\n📹 استضافة دورات فيديو HD\n📝 اختبارات وواجبات تفاعلية\n📜 إنشاء شهادات تلقائي\n💳 معالجة مدفوعات مدمجة\n📊 تحليلات وتتبع الطلاب\n📱 تصميم متوافق مع الجوال\n🇸🇦 دعم عربي كامل\n\nخلنا نبني منصتك. استشارة مجانية؟\n\nتحياتي،\nSkyStack" },
      { id: "el-10", type: "whatsapp", text: "Hi [Name], we built an e-learning platform for a Saudi training company that now generates $30K/month in passive revenue from online courses. They started with just 5 courses. Want to hear their story? 🎓", textAr: "مرحباً [الاسم]، بنينا منصة تعليم إلكتروني لشركة تدريب سعودية الحين تولّد 30 ألف $/شهر إيراد سلبي من الدورات الأونلاين. بدأوا بـ 5 دورات بس. تبي تسمع قصتهم؟ 🎓" },
    ]
  },
  // ── 9. IT Consulting & Digital Marketing ──
  {
    id: "consulting",
    title: "IT Consulting & Strategy",
    titleAr: "الاستشارات التقنية والاستراتيجية",
    description: "Messages for promoting IT consulting, digital transformation, and technology strategy services.",
    descriptionAr: "رسائل لترويج خدمات الاستشارات التقنية والتحول الرقمي والاستراتيجية التقنية.",
    messages: [
      { id: "con-1", type: "linkedin", text: "Hi [Name], many Saudi companies waste 30-40% of their IT budget on the wrong tools and solutions. As IT consultants, we help businesses align technology with business goals. Free 30-minute strategy session — interested?", textAr: "مرحباً [الاسم]، كثير من الشركات السعودية تهدر 30-40% من ميزانيتها التقنية على أدوات وحلول خاطئة. كمستشارين تقنيين، نساعد الشركات على مواءمة التقنية مع أهداف العمل. جلسة استراتيجية مجانية 30 دقيقة — مهتم؟" },
      { id: "con-2", type: "whatsapp", text: "Hi [Name]! 🎯 Struggling with digital transformation? We help Saudi businesses:\n\n✅ Choose the right tech stack\n✅ Build a digital roadmap\n✅ Reduce IT costs by 30-50%\n✅ Modernize legacy systems\n✅ Align IT with business goals\n\nFree strategy session — book at skystack.sa 💡", textAr: "مرحباً [الاسم]! 🎯 تواجه صعوبة في التحول الرقمي؟ نساعد الشركات السعودية:\n\n✅ اختيار الحزمة التقنية المناسبة\n✅ بناء خارطة طريق رقمية\n✅ تقليل تكاليف IT بنسبة 30-50%\n✅ تحديث الأنظمة القديمة\n✅ مواءمة IT مع أهداف العمل\n\nجلسة استراتيجية مجانية — احجز على skystack.sa 💡" },
      { id: "con-3", type: "cold-email", text: "Subject: Is your IT strategy costing you money?\n\nHi [Name],\n\nQuick question: when was the last time you reviewed your technology strategy?\n\nMost companies we consult find they're:\n• Paying for tools they don't fully use\n• Running on outdated systems that slow teams down\n• Missing automation opportunities worth $100K+/year\n• Not leveraging cloud efficiencies\n\nWe offer a free IT assessment that identifies exactly where you're losing money — and how to fix it.\n\n30-minute call? No obligation.\n\nBest,\nSkyStack Consulting", textAr: "الموضوع: هل استراتيجيتك التقنية تكلفك فلوس؟\n\nمرحباً [الاسم]،\n\nسؤال سريع: متى آخر مرة راجعت استراتيجيتك التقنية؟\n\nأغلب الشركات اللي نستشيرها نلاقي إنهم:\n• يدفعون لأدوات ما يستخدمونها بالكامل\n• يشتغلون على أنظمة قديمة تبطئ الفرق\n• يفوّتون فرص أتمتة بقيمة 100 ألف+$/سنة\n• ما يستفيدون من كفاءات السحابة\n\nنقدم تقييم IT مجاني يحدد بالضبط وين تخسر فلوس — وكيف تصلحها.\n\nمكالمة 30 دقيقة؟ بدون التزام.\n\nتحياتي،\nاستشارات SkyStack" },
      { id: "con-4", type: "linkedin", text: "Hi [Name], with Vision 2030 driving digital transformation across Saudi Arabia, companies that don't modernize get left behind. We provide hands-on IT consulting — not PowerPoint presentations, but actionable roadmaps and implementation. Let's connect!", textAr: "مرحباً [الاسم]، مع رؤية 2030 اللي تدفع التحول الرقمي في كل السعودية، الشركات اللي ما تتحدث تتخلف. نقدم استشارات IT عملية — مو عروض PowerPoint، بل خرائط طريق وتنفيذ حقيقي. خلنا نتواصل!" },
      { id: "con-5", type: "whatsapp", text: "Hey [Name] 👋 We recently helped a Saudi company save $250K/year by consolidating their tech stack and automating manual processes. Took us 4 weeks to assess and 3 months to implement. Want to explore similar savings for [Company]?", textAr: "مرحباً [الاسم] 👋 مؤخراً ساعدنا شركة سعودية توفّر 250 ألف $/سنة بتوحيد حزمتهم التقنية وأتمتة العمليات اليدوية. أخذنا 4 أسابيع للتقييم و3 أشهر للتنفيذ. تبي تستكشف توفيرات مشابهة لـ [الشركة]؟" },
      { id: "con-6", type: "sms", text: "Free IT Assessment 🎯 Find out where your business is losing money on tech. 30-min strategy session with SkyStack experts. Book: skystack.sa | +966 53 743 0455", textAr: "تقييم IT مجاني 🎯 اكتشف وين عملك يخسر فلوس على التقنية. جلسة استراتيجية 30 دقيقة مع خبراء SkyStack. احجز: skystack.sa | +966 53 743 0455" },
      { id: "con-7", type: "follow-up", text: "Hi [Name], I shared a message about our IT consulting services recently. Just wanted to add — we also help with Vision 2030 compliance, ZATCA integration, and cloud migration. These are top priorities for Saudi businesses right now. Can we discuss?", textAr: "مرحباً [الاسم]، شاركت رسالة عن خدماتنا الاستشارية مؤخراً. حبيت أضيف — كمان نساعد في التوافق مع رؤية 2030، تكامل هيئة الزكاة والضريبة والجمارك، والهجرة السحابية. هذي أولويات الشركات السعودية الحين. نقدر نتكلم؟" },
      { id: "con-8", type: "linkedin", text: "Hi [Name], I'm curious: what's the biggest technology challenge facing [Company Name] right now? I ask because we specialize in solving exactly those kinds of problems for Saudi businesses. Sometimes a fresh perspective makes all the difference.", textAr: "مرحباً [الاسم]، فضولي: إيش أكبر تحدي تقني تواجهه [اسم الشركة] الحين؟ أسأل لأننا متخصصين في حل بالضبط هذي المشاكل للشركات السعودية. أحياناً نظرة جديدة تسوي كل الفرق." },
      { id: "con-9", type: "cold-email", text: "Subject: 3 quick wins to cut your IT costs this quarter\n\nHi [Name],\n\nBased on working with 100+ Saudi companies, here are 3 things almost every company can do right now:\n\n1. Audit your SaaS subscriptions — most companies pay for 30% more licenses than they use\n2. Automate your top 3 manual processes — usually saves 20+ hours/week\n3. Move to cloud-native — reduces infrastructure costs by 40%+\n\nWant a customized assessment for [Company Name]? It's free.\n\n30 minutes. Actionable insights. Zero pitch.\n\nBest,\nSkyStack Consulting", textAr: "الموضوع: 3 مكاسب سريعة لتقليل تكاليفك التقنية هذا الربع\n\nمرحباً [الاسم]،\n\nبناءً على العمل مع 100+ شركة سعودية، هذي 3 أشياء تقريباً كل شركة تقدر تسويها الحين:\n\n1. راجع اشتراكات SaaS — أغلب الشركات تدفع لـ 30% رخص أكثر مما يستخدمون\n2. أتمت أهم 3 عمليات يدوية — عادةً توفّر 20+ ساعة/أسبوع\n3. انتقل للسحابة — تقلل تكاليف البنية التحتية بنسبة 40%+\n\nتبي تقييم مخصص لـ [اسم الشركة]؟ مجاني.\n\n30 دقيقة. رؤى عملية. صفر عرض بيع.\n\nتحياتي،\nاستشارات SkyStack" },
      { id: "con-10", type: "whatsapp", text: "Hi [Name], honest question: does your team spend more time on tech problems than actual work? That's a sign you need a tech strategy overhaul. We do free assessments — find the leaks, plug them, and watch efficiency soar. Book at skystack.sa 🎯", textAr: "مرحباً [الاسم]، سؤال صريح: فريقك يقضي وقت أكثر على مشاكل التقنية أكثر من العمل الفعلي؟ هذي علامة إنك تحتاج إعادة هيكلة استراتيجيتك التقنية. نسوي تقييمات مجانية — نلاقي التسريبات، نسدها، ونشوف الكفاءة ترتفع. احجز على skystack.sa 🎯" },
    ]
  },
  // ── 10. Clone Apps / White-Label Solutions ──
  {
    id: "clone-apps",
    title: "Clone Apps & White-Label Solutions",
    titleAr: "تطبيقات مستنسخة وحلول العلامة البيضاء",
    description: "Messages for pre-built clone apps (Uber, Airbnb, etc.) customized for your brand.",
    descriptionAr: "رسائل لتطبيقات مستنسخة جاهزة (أوبر، Airbnb، إلخ) مخصصة بعلامتك التجارية.",
    messages: [
      { id: "cl-1", type: "linkedin", text: "Hi [Name], why build from scratch when you can launch in weeks? We have white-label solutions for ride-hailing, food delivery, marketplaces, booking platforms, and more. Your brand, your customization, fraction of the development cost. Interested?", textAr: "مرحباً [الاسم]، ليش تبني من الصفر لما تقدر تطلق في أسابيع؟ عندنا حلول علامة بيضاء لتطبيقات النقل، توصيل الطعام، الأسواق، منصات الحجز، والمزيد. علامتك، تخصيصك، بجزء من تكلفة التطوير. مهتم؟" },
      { id: "cl-2", type: "whatsapp", text: "Hi [Name]! 🚀 Want to launch your own app like Uber, Airbnb, or HungerStation? Our white-label solutions are ready-made and fully customizable:\n\n📱 Your brand & colors\n⚡ Launch in 2-4 weeks (not months!)\n💰 Save 70% vs custom development\n🔧 Fully customizable features\n\nWhich type of app are you thinking about?", textAr: "مرحباً [الاسم]! 🚀 تبي تطلق تطبيقك مثل أوبر، Airbnb، أو هنقرستيشن؟ حلولنا بالعلامة البيضاء جاهزة ومخصصة بالكامل:\n\n📱 علامتك وألوانك\n⚡ إطلاق في 2-4 أسابيع (مو أشهر!)\n💰 وفّر 70% مقارنة بالتطوير المخصص\n🔧 ميزات قابلة للتخصيص بالكامل\n\nأي نوع تطبيق تفكر فيه؟" },
      { id: "cl-3", type: "cold-email", text: "Subject: Launch your app in 2 weeks — not 6 months\n\nHi [Name],\n\nBuilding an app from scratch takes 4-6 months and costs $50K-$200K. Or...\n\nYou can use our white-label solution:\n✅ Proven, tested codebase\n✅ Customized to your brand\n✅ Launch in 2-4 weeks\n✅ 70% less than custom development\n✅ Full source code ownership\n\nAvailable platforms:\n• Ride-hailing (like Uber/Careem)\n• Food delivery (like HungerStation)\n• Marketplace (like Amazon)\n• Booking (like Airbnb)\n• On-demand services\n\nWhich one interests you?\n\nBest,\nSkyStack Team", textAr: "الموضوع: أطلق تطبيقك في أسبوعين — مو 6 أشهر\n\nمرحباً [الاسم]،\n\nبناء تطبيق من الصفر ياخذ 4-6 أشهر ويكلف 50-200 ألف دولار. أو...\n\nتقدر تستخدم حلنا بالعلامة البيضاء:\n✅ كود مجرب ومختبر\n✅ مخصص بعلامتك\n✅ إطلاق في 2-4 أسابيع\n✅ أقل 70% من التطوير المخصص\n✅ ملكية كاملة للكود المصدري\n\nالمنصات المتاحة:\n• نقل (مثل أوبر/كريم)\n• توصيل طعام (مثل هنقرستيشن)\n• سوق إلكتروني (مثل أمازون)\n• حجز (مثل Airbnb)\n• خدمات عند الطلب\n\nأيها يهمك؟\n\nتحياتي،\nفريق SkyStack" },
      { id: "cl-4", type: "linkedin", text: "Hi [Name], great startup idea but worried about the development time and cost? Our white-label app solutions let you validate your business model in weeks, not months. Start small, scale fast. Would you like to see available templates?", textAr: "مرحباً [الاسم]، فكرة شركة ناشئة رائعة بس قلقان من وقت وتكلفة التطوير؟ حلولنا بالعلامة البيضاء تمكنك من التحقق من نموذج عملك في أسابيع مو أشهر. ابدأ صغير، وسّع بسرعة. تحب تشوف القوالب المتاحة؟" },
      { id: "cl-5", type: "whatsapp", text: "Hey [Name] 👋 Quick question: if you could launch an app like [Uber/HungerStation/Airbnb] with YOUR brand in just 2-4 weeks, would that interest you? We've done it for 50+ companies. Let me show you how! 🚀", textAr: "مرحباً [الاسم] 👋 سؤال سريع: لو تقدر تطلق تطبيق مثل [أوبر/هنقرستيشن/Airbnb] بعلامتك في بس 2-4 أسابيع، هل يهمك؟ سويناها لـ 50+ شركة. خلني أوريك كيف! 🚀" },
      { id: "cl-6", type: "sms", text: "Launch your app in weeks, not months 🚀 White-label solutions: Ride-hailing, Delivery, Marketplace, Booking. 70% cheaper. SkyStack: skystack.sa | +966 53 743 0455", textAr: "أطلق تطبيقك في أسابيع مو أشهر 🚀 حلول علامة بيضاء: نقل، توصيل، سوق، حجز. أرخص 70%. SkyStack: skystack.sa | +966 53 743 0455" },
      { id: "cl-7", type: "follow-up", text: "Hi [Name], I reached out about our white-label app solutions. Just to clarify — these aren't basic templates. They're production-ready apps with 100+ features, admin panels, payment integrations, and push notifications. All customizable. Want a live demo?", textAr: "مرحباً [الاسم]، تواصلت معك عن حلول التطبيقات بالعلامة البيضاء. للتوضيح — هذي مو قوالب بسيطة. تطبيقات جاهزة للإنتاج مع 100+ ميزة، لوحات تحكم، تكاملات دفع، وإشعارات فورية. كلها قابلة للتخصيص. تبي عرض حي؟" },
      { id: "cl-8", type: "linkedin", text: "Hi [Name], for startups, speed to market is everything. Our clone app solutions let you launch a fully functional app in 2-4 weeks at 70% lower cost than building from scratch. You own the code, you own the business. Smart investment?", textAr: "مرحباً [الاسم]، للشركات الناشئة، سرعة الوصول للسوق هي كل شيء. حلول تطبيقاتنا المستنسخة تمكنك تطلق تطبيق كامل في 2-4 أسابيع بتكلفة أقل 70% من البناء من الصفر. أنت تملك الكود، أنت تملك العمل. استثمار ذكي؟" },
      { id: "cl-9", type: "cold-email", text: "Subject: Your competitors took 6 months to build their app. You can do it in 2 weeks.\n\nHi [Name],\n\nTrue story: a client came to us wanting a ride-hailing app. Their competitor spent $150K and 6 months building theirs.\n\nOur client launched in 3 weeks for $25K. Same features. Same quality. They're now profitable.\n\nHow? White-label solutions. Proven code, customized for your brand.\n\nAvailable now for: delivery, ride-hailing, marketplace, booking, e-learning.\n\nLet's discuss which fits your vision.\n\nBest,\nSkyStack", textAr: "الموضوع: منافسينك أخذوا 6 أشهر يبنون تطبيقهم. أنت تقدر تسويه في أسبوعين.\n\nمرحباً [الاسم]،\n\nقصة حقيقية: عميل جانا يبي تطبيق نقل. منافسه صرف 150 ألف $ و6 أشهر يبني تطبيقه.\n\nعميلنا أطلق في 3 أسابيع بـ 25 ألف $. نفس الميزات. نفس الجودة. الحين مربح.\n\nكيف؟ حلول العلامة البيضاء. كود مجرب، مخصص بعلامتك.\n\nمتاح الحين لـ: توصيل، نقل، سوق، حجز، تعليم إلكتروني.\n\nخلنا نناقش أي واحد يناسب رؤيتك.\n\nتحياتي،\nSkyStack" },
      { id: "cl-10", type: "whatsapp", text: "Hi [Name], real numbers: Custom app from scratch = $50K-$200K + 6 months. Our white-label = $15K-$30K + 2-4 weeks. Same end result. Full ownership. Which would you choose? 😊 Happy to show you our options!", textAr: "مرحباً [الاسم]، أرقام حقيقية: تطبيق مخصص من الصفر = 50-200 ألف $ + 6 أشهر. علامتنا البيضاء = 15-30 ألف $ + 2-4 أسابيع. نفس النتيجة النهائية. ملكية كاملة. أيهم تختار؟ 😊 يسعدني أوريك خياراتنا!" },
    ]
  },
  // ── 11. General / All Services ──
  {
    id: "general",
    title: "General — SkyStack Introduction",
    titleAr: "عام — تعريف SkyStack",
    description: "General introduction messages about SkyStack's full range of services.",
    descriptionAr: "رسائل تعريفية عامة عن جميع خدمات SkyStack.",
    messages: [
      { id: "gen-1", type: "linkedin", text: "Hi [Name], I'm with SkyStack — a Saudi tech company that helps businesses build better software. Whether it's a mobile app, web platform, or a dedicated dev team, we've got you covered. What's your biggest tech challenge right now?", textAr: "مرحباً [الاسم]، أنا من SkyStack — شركة تقنية سعودية تساعد الشركات تبني برمجيات أفضل. سواء تطبيق جوال، منصة ويب، أو فريق تطوير مخصص، نغطيك. إيش أكبر تحدي تقني عندك الحين؟" },
      { id: "gen-2", type: "whatsapp", text: "Hi [Name]! 👋 SkyStack here — Saudi Arabia's technology partner.\n\nWe help businesses with:\n📱 Mobile App Development\n💻 Web Applications\n🎨 UI/UX Design\n👥 IT Staff Outsourcing (save 70%)\n🌐 Personal Websites ($2,000)\n🛒 E-commerce & Marketplaces\n\n100+ projects delivered. Free consultation at skystack.sa 🚀", textAr: "مرحباً [الاسم]! 👋 SkyStack هنا — شريكك التقني في السعودية.\n\nنساعد الشركات في:\n📱 تطوير تطبيقات الجوال\n💻 تطبيقات الويب\n🎨 تصميم UI/UX\n👥 التعهيد التقني (وفّر 70%)\n🌐 المواقع الشخصية (2,000$)\n🛒 التجارة الإلكترونية والأسواق\n\n100+ مشروع منجز. استشارة مجانية على skystack.sa 🚀" },
      { id: "gen-3", type: "cold-email", text: "Subject: The tech partner Saudi businesses trust\n\nHi [Name],\n\nI'll keep this short: SkyStack helps Saudi businesses build world-class software.\n\n✅ 100+ projects delivered\n✅ Mobile, web, enterprise solutions\n✅ Save up to 70% on dev costs\n✅ 7-day to 12-week delivery\n✅ Bilingual (Arabic + English)\n\nWhether you need an app, a website, or a full engineering team — we've got you.\n\nFree 30-minute consultation. No strings attached.\n\nBest,\nSkyStack Team\nskystack.sa | +966 53 743 0455", textAr: "الموضوع: الشريك التقني اللي تثق فيه الشركات السعودية\n\nمرحباً [الاسم]،\n\nراح أختصر: SkyStack تساعد الشركات السعودية تبني برمجيات عالمية المستوى.\n\n✅ 100+ مشروع منجز\n✅ حلول جوال، ويب، ومؤسسية\n✅ وفّر حتى 70% من تكاليف التطوير\n✅ تسليم من 7 أيام لـ 12 أسبوع\n✅ ثنائي اللغة (عربي + إنجليزي)\n\nسواء تحتاج تطبيق، موقع، أو فريق هندسة كامل — نغطيك.\n\nاستشارة مجانية 30 دقيقة. بدون أي شروط.\n\nتحياتي،\nفريق SkyStack\nskystack.sa | +966 53 743 0455" },
      { id: "gen-4", type: "linkedin", text: "Hi [Name], I noticed we're in the same network. I lead business development at SkyStack, a Saudi tech company. We help businesses — from startups to enterprises — build custom software that drives growth. Would love to connect and learn about your tech needs!", textAr: "مرحباً [الاسم]، لاحظت إننا في نفس الشبكة. أدير تطوير الأعمال في SkyStack، شركة تقنية سعودية. نساعد الشركات — من الناشئة للمؤسسات — تبني برمجيات مخصصة تدفع النمو. أحب نتواصل وأعرف عن احتياجاتك التقنية!" },
      { id: "gen-5", type: "whatsapp", text: "Hey [Name] 👋 If you're a business owner looking for a tech partner — not just a vendor — SkyStack is it. We treat every project like it's our own. 100+ happy clients. Let me know how we can help!", textAr: "مرحباً [الاسم] 👋 إذا أنت صاحب عمل تبحث عن شريك تقني — مو بس مزود خدمة — SkyStack هو الخيار. نتعامل مع كل مشروع كأنه مشروعنا. 100+ عميل سعيد. عطني خبر كيف نقدر نساعدك!" },
      { id: "gen-6", type: "sms", text: "SkyStack 🇸🇦 Saudi's tech partner. Mobile apps, web apps, outsourcing, websites. 100+ projects. Free consultation: skystack.sa | WhatsApp +966 53 743 0455", textAr: "SkyStack 🇸🇦 شريك التقنية في السعودية. تطبيقات جوال، ويب، تعهيد، مواقع. 100+ مشروع. استشارة مجانية: skystack.sa | واتساب +966 53 743 0455" },
      { id: "gen-7", type: "follow-up", text: "Hi [Name], I reached out before about SkyStack's services. I understand you might be busy, so here's the short version: we build software that helps your business grow. 100+ Saudi companies trust us. When you're ready, I'm here. No rush! 🤝", textAr: "مرحباً [الاسم]، تواصلت معك قبل عن خدمات SkyStack. أفهم إنك ممكن تكون مشغول، فهذي النسخة المختصرة: نبني برمجيات تساعد عملك ينمو. 100+ شركة سعودية تثق فينا. لما تكون جاهز، أنا هنا. بدون استعجال! 🤝" },
      { id: "gen-8", type: "linkedin", text: "Hi [Name], congrats on [recent achievement/post/milestone]! 🎉 I work at SkyStack and we help companies at your stage with technology solutions. Whether you need to build an app, automate operations, or scale your team — we do it all. Open to connecting?", textAr: "مرحباً [الاسم]، مبروك على [إنجاز/منشور/معلم حديث]! 🎉 أشتغل في SkyStack ونساعد شركات في مرحلتك بحلول تقنية. سواء تبي تبني تطبيق، تؤتمت عمليات، أو توسّع فريقك — نسوي كل شيء. منفتح للتواصل؟" },
      { id: "gen-9", type: "cold-email", text: "Subject: What if technology wasn't your bottleneck?\n\nHi [Name],\n\nMost growing businesses hit a wall: they know technology can accelerate growth, but they don't know where to start or who to trust.\n\nThat's where SkyStack comes in. We're a Saudi-based tech company that has helped 100+ businesses:\n\n🚀 Launch mobile apps that users love\n💻 Build web platforms that scale\n👥 Hire dedicated developers at 70% less\n🌐 Create professional websites in 7 days\n🎨 Design interfaces that convert\n\nOne call. 30 minutes. We'll give you a clear tech roadmap.\n\nBest,\nSkyStack Team", textAr: "الموضوع: ماذا لو التقنية ما كانت عقبتك؟\n\nمرحباً [الاسم]،\n\nأغلب الشركات النامية توصل لجدار: يعرفون إن التقنية تقدر تسرّع النمو، بس ما يعرفون من وين يبدأون أو مين يثقون.\n\nهنا يجي دور SkyStack. شركة تقنية سعودية ساعدت 100+ شركة:\n\n🚀 إطلاق تطبيقات جوال يحبها المستخدمين\n💻 بناء منصات ويب تتوسع\n👥 توظيف مطورين مخصصين بتكلفة أقل 70%\n🌐 إنشاء مواقع احترافية في 7 أيام\n🎨 تصميم واجهات تحوّل\n\nمكالمة واحدة. 30 دقيقة. نعطيك خارطة طريق تقنية واضحة.\n\nتحياتي،\nفريق SkyStack" },
      { id: "gen-10", type: "whatsapp", text: "Hi [Name], here's a snapshot of what SkyStack can do for you:\n\n💡 Got an idea? → We build it (8-12 weeks)\n📱 Need an app? → iOS + Android, from $10K\n👥 Need devs? → Dedicated team, save 70%\n🌐 Need a website? → $2,000, 7 days\n🛒 Selling online? → Custom e-commerce\n📚 Teaching? → E-learning platform\n\nAll from one trusted Saudi partner. Which one speaks to you? 🤝", textAr: "مرحباً [الاسم]، هذي لمحة عن اللي SkyStack يقدر يسوي لك:\n\n💡 عندك فكرة؟ → نبنيها (8-12 أسبوع)\n📱 تحتاج تطبيق؟ → iOS + Android، من 10 آلاف $\n👥 تحتاج مطورين؟ → فريق مخصص، وفّر 70%\n🌐 تحتاج موقع؟ → 2,000$، 7 أيام\n🛒 تبيع أونلاين؟ → تجارة إلكترونية مخصصة\n📚 تعلّم؟ → منصة تعليم إلكتروني\n\nكلها من شريك سعودي واحد موثوق. أيها يتكلم لك؟ 🤝" },
    ]
  },
];

// ─── TextMessages Display Components ──────────────────────────────
const messageTypeLabels: Record<string, { en: string; ar: string; color: string }> = {
  "linkedin": { en: "LinkedIn", ar: "LinkedIn", color: "bg-blue-100 text-blue-800 border-blue-200" },
  "whatsapp": { en: "WhatsApp", ar: "WhatsApp", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  "sms": { en: "SMS", ar: "رسالة نصية", color: "bg-purple-100 text-purple-800 border-purple-200" },
  "cold-email": { en: "Cold Email", ar: "بريد بارد", color: "bg-orange-100 text-orange-800 border-orange-200" },
  "follow-up": { en: "Follow-up", ar: "متابعة", color: "bg-amber-100 text-amber-800 border-amber-200" },
};

function TextMessageCard({ message, lang }: { message: TextMessage; lang: 'en' | 'ar' }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const text = lang === "ar" ? message.textAr : message.text;
  const typeInfo = messageTypeLabels[message.type];

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: lang === "ar" ? "تم النسخ!" : "Copied!",
        description: lang === "ar" ? "تم نسخ الرسالة" : "Message copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: lang === "ar" ? "فشل النسخ" : "Failed to copy", variant: "destructive" });
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-slate-900 hover:border-primary/40 transition-colors group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${typeInfo.color}`}>
          {lang === "ar" ? typeInfo.ar : typeInfo.en}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={copyText}
          className="opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0"
        >
          {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
          {copied ? (lang === "ar" ? "تم!" : "Done!") : (lang === "ar" ? "نسخ" : "Copy")}
        </Button>
      </div>
      <p className={`text-sm leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-slate-300 ${lang === "ar" ? "text-right font-[Tahoma]" : ""}`}>
        {text}
      </p>
    </div>
  );
}

function TextMessagesGroupSection({ group }: { group: TextMessageGroup }) {
  const [selectedLang, setSelectedLang] = useState<"en" | "ar">("en");
  const [filter, setFilter] = useState<string>("all");
  const { toast } = useToast();

  const filteredMessages = filter === "all"
    ? group.messages
    : group.messages.filter(m => m.type === filter);

  const copyAll = async () => {
    const allTexts = filteredMessages
      .map((m, i) => {
        const text = selectedLang === "ar" ? m.textAr : m.text;
        const typeLabel = selectedLang === "ar" ? messageTypeLabels[m.type].ar : messageTypeLabels[m.type].en;
        return `--- ${i + 1}. [${typeLabel}] ---\n${text}`;
      })
      .join("\n\n");
    try {
      await navigator.clipboard.writeText(allTexts);
      toast({
        title: selectedLang === "ar" ? "تم النسخ!" : "All Copied!",
        description: selectedLang === "ar" ? `تم نسخ ${filteredMessages.length} رسالة` : `${filteredMessages.length} messages copied`,
      });
    } catch {
      toast({ title: selectedLang === "ar" ? "فشل النسخ" : "Failed", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-[800px] mx-auto">
      {/* Header */}
      <Card className="mb-6 border-slate-200 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <CardTitle className="text-xl">
                {selectedLang === "ar" ? group.titleAr : group.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedLang === "ar" ? group.descriptionAr : group.description}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {selectedLang === "ar" ? `${filteredMessages.length} رسالة` : `${filteredMessages.length} messages`}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedLang(selectedLang === "en" ? "ar" : "en")}>
                <Languages className="h-4 w-4 mr-2" />
                {selectedLang === "ar" ? "English" : "عربي"}
              </Button>
              <Button variant="default" size="sm" onClick={copyAll}>
                <Copy className="h-4 w-4 mr-2" />
                {selectedLang === "ar" ? "نسخ الكل" : "Copy All"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: selectedLang === "ar" ? "الكل" : "All" },
              { value: "linkedin", label: "LinkedIn" },
              { value: "whatsapp", label: "WhatsApp" },
              { value: "cold-email", label: selectedLang === "ar" ? "بريد بارد" : "Cold Email" },
              { value: "follow-up", label: selectedLang === "ar" ? "متابعة" : "Follow-up" },
              { value: "sms", label: selectedLang === "ar" ? "رسالة نصية" : "SMS" },
            ].map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors border ${
                  filter === f.value
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-slate-600 border-slate-200 hover:border-primary/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <TextMessageCard key={msg.id} message={msg} lang={selectedLang} />
        ))}
      </div>
    </div>
  );
}

// Categorize templates
const templateCategories = {
  services: {
    label: "Services",
    description: "Custom development services for your business needs",
    templates: serviceTemplates.filter(t => 
      ["all-services", "mobile-app", "web-dev", "on-demand", "ui-ux", "consulting", "marketing"].includes(t.id)
    )
  },
  solutions: {
    label: "Solutions",
    description: "Pre-built white-label applications ready to customize",
    templates: serviceTemplates.filter(t => 
      ["clone-app", "food-delivery", "ecommerce", "elearning"].includes(t.id)
    )
  },
  outsourcing: {
    label: "Outsourcing",
    description: "Staff augmentation and dedicated team services",
    templates: serviceTemplates.filter(t => 
      ["outsourcing", "offshore"].includes(t.id)
    )
  },
  packages: {
    label: "Packages",
    description: "Fixed-price package marketing templates for specific product offerings",
    templates: serviceTemplates.filter(t => 
      ["personal-website"].includes(t.id)
    )
  },
  "brand-awareness": {
    label: "Brand Awareness",
    description: "Top-of-funnel marketing templates for brand recognition and engagement",
    templates: brandAwarenessTemplates
  },
  "cold-outreach": {
    label: "Cold Outreach",
    description: "Ready-to-use text messages for LinkedIn, WhatsApp, SMS, cold emails, and follow-ups",
    templates: coldOutreachMessages
  }
};

export default function EmailTemplates() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Email Campaign Templates"
        titleAr="قوالب حملات البريد الإلكتروني"
        description="Professional HTML email templates for your paid marketing campaigns. Bilingual English and Arabic templates ready to use."
        descriptionAr="قوالب بريد إلكتروني HTML احترافية لحملاتك التسويقية المدفوعة. قوالب ثنائية اللغة بالإنجليزية والعربية جاهزة للاستخدام."
        keywords="email templates, marketing emails, HTML email templates, bilingual email templates"
        keywordsAr="قوالب البريد الإلكتروني، رسائل تسويقية، قوالب بريد HTML، قوالب بريد ثنائية اللغة"
        canonicalUrl="/email-templates"
        noIndex={true}
      />
      <div className="container mx-auto px-4 py-12 max-w-[1200px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4" data-testid="text-page-title">Email Campaign Templates</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Professional HTML email templates for your paid marketing campaigns. Each template includes English and Arabic versions.
          </p>
          
          <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
            <CardContent className="flex items-start gap-3 pt-6">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Before using these templates:</p>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>1. Test emails in multiple email clients (Gmail, Outlook, Apple Mail)</li>
                  <li>2. Customize stats and content to match your actual data</li>
                  <li>3. Arabic templates are RTL-ready</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Category Tabs */}
        <Tabs defaultValue="outsourcing" className="w-full">
          <TabsList className="h-auto gap-2 mb-6 bg-muted/50 p-1">
            {Object.entries(templateCategories).map(([key, category]) => (
              <TabsTrigger 
                key={key} 
                value={key}
                data-testid={`tab-category-${key}`}
                className="px-6 py-3 text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.label}
                <span className="ml-2 text-xs opacity-70">({category.templates.length})</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(templateCategories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <div className="mb-6">
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              
              {key === "cold-outreach" ? (
                /* Cold Outreach Text Messages */
                <Tabs defaultValue={(category.templates[0] as TextMessageGroup)?.id} className="w-full">
                  <TabsList className="flex flex-wrap h-auto gap-2 mb-6 bg-transparent">
                    {(category.templates as TextMessageGroup[]).map((group) => (
                      <TabsTrigger 
                        key={group.id} 
                        value={group.id}
                        data-testid={`tab-outreach-${group.id}`}
                        className="px-4 data-[state=active]:bg-slate-800 data-[state=active]:text-white"
                      >
                        {group.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {(category.templates as TextMessageGroup[]).map((group) => (
                    <TabsContent key={group.id} value={group.id}>
                      <TextMessagesGroupSection group={group} />
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                /* Email Templates (Services, Solutions, etc.) */
                <Tabs defaultValue={category.templates[0]?.id} className="w-full">
                  <TabsList className="flex flex-wrap h-auto gap-2 mb-6 bg-transparent">
                    {category.templates.map((template) => (
                      <TabsTrigger 
                        key={template.id} 
                        value={template.id}
                        data-testid={`tab-${template.id}`}
                        className="px-4 data-[state=active]:bg-slate-800 data-[state=active]:text-white"
                      >
                        {key === "brand-awareness" 
                          ? (template as BrandAwarenessTemplate).title 
                          : (template as ServiceTemplate).title}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {category.templates.map((template) => (
                    <TabsContent key={template.id} value={template.id}>
                      {key === "brand-awareness" ? (
                        <BrandAwarenessTemplateSection template={template as BrandAwarenessTemplate} />
                      ) : (
                        <ServiceTemplateSection service={template as ServiceTemplate} />
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
