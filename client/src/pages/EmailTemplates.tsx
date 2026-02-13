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
    description: "Get a stunning, custom-designed personal website that showcases your expertise, attracts clients, and builds your brand. Ready in 14 days.",
    descriptionAr: "احصل على موقع شخصي مذهل ومصمم خصيصاً يعرض خبرتك، يجذب العملاء، ويبني علامتك التجارية. جاهز خلال 14 يوم.",
    problem: "You don't have a professional online presence. Potential clients Google you and find nothing — or worse, an outdated LinkedIn profile. You're losing credibility and business every day.",
    problemAr: "ليس لديك حضور رقمي احترافي. العملاء المحتملون يبحثون عنك في جوجل ولا يجدون شيئاً — أو الأسوأ، ملف لينكدإن قديم. تخسر المصداقية والعملاء كل يوم.",
    solution: "A custom-designed personal website built in 14 days for $2,000. Mobile responsive, SEO optimized, blazing fast. Up to 5 pages, contact forms, social media integration, and full code ownership.",
    solutionAr: "موقع شخصي مصمم خصيصاً يُبنى خلال 14 يوم بـ 2,000 دولار. متجاوب مع الجوال، محسّن لمحركات البحث، سريع البرق. حتى 5 صفحات، نماذج اتصال، تكامل وسائل التواصل، وملكية كاملة للكود.",
    features: ["Custom premium design — no templates", "Mobile responsive on all devices", "SEO optimization built-in", "Contact forms with email alerts", "Social media integration", "Google Analytics setup", "1 month free post-launch support", "Full source code ownership"],
    featuresAr: ["تصميم مخصص فاخر — بدون قوالب", "متجاوب مع جميع الأجهزة", "تحسين محركات البحث مدمج", "نماذج اتصال مع تنبيهات البريد", "تكامل وسائل التواصل الاجتماعي", "إعداد تحليلات جوجل", "شهر دعم مجاني بعد الإطلاق", "ملكية كاملة للكود المصدري"],
    benefits: ["14-day delivery", "60% cheaper than agencies", "100% code ownership"],
    benefitsAr: ["تسليم خلال 14 يوم", "أرخص 60% من الوكالات", "ملكية كاملة 100% للكود"],
    techStack: ["React", "Next.js", "Tailwind CSS", "Vercel", "TypeScript", "Framer Motion"],
    slug: "personal-website",
    ctaText: "Get Your Website — $2,000",
    ctaTextAr: "احصل على موقعك — 2,000 دولار",
    stat1: { value: "$2K", label: "Fixed Price", labelAr: "سعر ثابت" },
    stat2: { value: "14", label: "Days Delivery", labelAr: "يوم للتسليم" },
    stat3: { value: "5", label: "Custom Pages", labelAr: "صفحات مخصصة" },
    subjectLines: [
      {
        subject: "Your Professional Personal Website — Ready in 14 Days for $2,000",
        subjectAr: "موقعك الشخصي الاحترافي — جاهز خلال 14 يوم بـ 2,000 دولار",
        preview: "Custom design, mobile ready, SEO optimized. No templates, no subscriptions.",
        previewAr: "تصميم مخصص، جاهز للجوال، محسّن لمحركات البحث. بدون قوالب، بدون اشتراكات."
      },
      {
        subject: "93% of People Google You Before Doing Business — What Do They Find?",
        subjectAr: "93% من الأشخاص يبحثون عنك في جوجل قبل التعامل معك — ماذا يجدون؟",
        preview: "A professional personal website costs just $2,000. Custom designed in 14 days.",
        previewAr: "الموقع الشخصي الاحترافي يكلف فقط 2,000 دولار. مصمم خصيصاً خلال 14 يوم."
      },
      {
        subject: "Stop Losing Clients Because You Don't Have a Website",
        subjectAr: "توقف عن خسارة العملاء لأنك لا تملك موقعاً إلكترونياً",
        preview: "Get a stunning personal website for $2,000 — 60% less than agencies charge.",
        previewAr: "احصل على موقع شخصي مذهل بـ 2,000 دولار — أرخص 60% من الوكالات."
      },
      {
        subject: "Your Personal Website: Custom Design, 14 Days, $2,000. Done.",
        subjectAr: "موقعك الشخصي: تصميم مخصص، 14 يوم، 2,000 دولار. تم.",
        preview: "No templates. No monthly fees. Full code ownership. Let's build your online presence.",
        previewAr: "بدون قوالب. بدون رسوم شهرية. ملكية كاملة للكود. لنبني حضورك الرقمي."
      },
      {
        subject: "Why Pay $5,000+ When You Can Get the Same Quality for $2,000?",
        subjectAr: "لماذا تدفع 5,000+ دولار عندما يمكنك الحصول على نفس الجودة بـ 2,000 دولار؟",
        preview: "Custom personal website. React/Next.js. SEO. Mobile ready. Launch in 14 days.",
        previewAr: "موقع شخصي مخصص. React/Next.js. تحسين محركات البحث. جاهز للجوال. إطلاق خلال 14 يوم."
      },
      {
        subject: "Your Competitors Have a Website. Do You?",
        subjectAr: "منافسوك لديهم موقع إلكتروني. هل لديك؟",
        preview: "Stand out online with a custom personal website. Just $2,000. Ready in 14 days.",
        previewAr: "تميز عبر الإنترنت بموقع شخصي مخصص. فقط 2,000 دولار. جاهز خلال 14 يوم."
      },
      {
        subject: "From Zero to Online Presence in 14 Days — Here's How",
        subjectAr: "من الصفر إلى الحضور الرقمي خلال 14 يوم — إليك كيف",
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
              
              {/* Nested Template Tabs */}
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
