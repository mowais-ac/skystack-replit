import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const LOGO_URL = "https://www.skystack.sa/logo-white-circle.png";
const WHATSAPP_LINK = "https://wa.me/966537430455";
const WEBSITE_URL = "https://skystack.sa";

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
  };

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${content.tagline} - SkyStack</title>
</head>
<body style="margin: 0; padding: 0; font-family: ${fontFamily}; background-color: #f1f5f9; -webkit-font-smoothing: antialiased; direction: ${dir};">
  <div style="display: none; max-height: 0; overflow: hidden;">${content.description}</div>
  
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
                        <td align="${align}">
                          <img src="${LOGO_URL}" alt="SkyStack" width="140" style="display: block; border: 0;" />
                        </td>
                        <td align="${alignOpp}">
                          <span style="color: #34d399; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">${content.subtitle}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 40px 50px; text-align: ${align};">
                    <p style="margin: 0 0 12px; color: #34d399; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">${content.title}</p>
                    <h1 style="margin: 0 0 20px; color: #ffffff; font-size: 32px; font-weight: 700; line-height: 1.3;">${content.tagline}</h1>
                    <p style="margin: 0 0 28px; color: #94a3b8; font-size: 17px; line-height: 1.7;">${content.description}</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="border-radius: 8px; background: linear-gradient(135deg, #003cff 0%, #0052ff 100%); box-shadow: 0 4px 14px 0 rgba(0, 60, 255, 0.4);">
                          <a href="${WEBSITE_URL}/services/${content.slug}" style="display: inline-block; padding: 16px 36px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">${content.ctaText}</a>
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
                  <td width="33.33%" style="padding: 24px 20px; text-align: center; border-${isRtl ? 'left' : 'right'}: 1px solid rgba(255,255,255,0.2);">
                    <p style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">${content.stat1.value}</p>
                    <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${content.stat1.label}</p>
                  </td>
                  <td width="33.33%" style="padding: 24px 20px; text-align: center; border-${isRtl ? 'left' : 'right'}: 1px solid rgba(255,255,255,0.2);">
                    <p style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">${content.stat2.value}</p>
                    <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${content.stat2.label}</p>
                  </td>
                  <td width="33.33%" style="padding: 24px 20px; text-align: center;">
                    <p style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">${content.stat3.value}</p>
                    <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${content.stat3.label}</p>
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
                  <td style="padding: 28px; background: linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%); border-radius: 12px; border-${isRtl ? 'right' : 'left'}: 4px solid #ef4444; text-align: ${align};">
                    <p style="margin: 0 0 8px; color: #dc2626; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">${labels.theChallenge}</p>
                    <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.7;">${content.problem}</p>
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
                  <td style="padding: 28px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-radius: 12px; border-${isRtl ? 'right' : 'left'}: 4px solid #22c55e; text-align: ${align};">
                    <p style="margin: 0 0 8px; color: #16a34a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">${labels.ourSolution}</p>
                    <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.7;">${content.solution}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Features Section -->
          <tr>
            <td style="padding: 0 40px 50px; text-align: ${align};">
              <h3 style="margin: 0 0 24px; color: #0f172a; font-size: 22px; font-weight: 700;">${labels.whatYouGet}</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${content.features.map(feature => `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="32" style="vertical-align: top;">
                          <div style="width: 24px; height: 24px; background: linear-gradient(135deg, #34d399 0%, #10b981 100%); border-radius: 50%; text-align: center; line-height: 24px; color: #ffffff; font-size: 14px; font-weight: 700;">&#10003;</div>
                        </td>
                        <td style="padding-${isRtl ? 'right' : 'left'}: 12px;">
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
              <h3 style="margin: 0 0 24px; color: #0f172a; font-size: 22px; font-weight: 700; text-align: center;">${labels.whyChoose}</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  ${content.benefits.slice(0, 3).map(benefit => `
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
              <h3 style="margin: 0 0 20px; color: #0f172a; font-size: 18px; font-weight: 700; text-align: center;">${labels.techWeUse}</h3>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  ${content.techStack.slice(0, 6).map(tech => `<td style="padding: 4px;"><span style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); color: #1d4ed8; border-radius: 6px; font-size: 13px; font-weight: 600;">${tech}</span></td>`).join('')}
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
                    <p style="margin: 0 0 8px; color: #34d399; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">${labels.freeConsultation}</p>
                    <h3 style="margin: 0 0 16px; color: #ffffff; font-size: 26px; font-weight: 700;">${labels.readyToStart}</h3>
                    <p style="margin: 0 0 28px; color: #94a3b8; font-size: 16px; line-height: 1.6;">${labels.bookConsultation}</p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                      <tr>
                        <td style="border-radius: 8px; background: linear-gradient(135deg, #34d399 0%, #10b981 100%); box-shadow: 0 4px 14px 0 rgba(52, 211, 153, 0.4);">
                          <a href="${WHATSAPP_LINK}" style="display: inline-block; padding: 18px 40px; color: #0f172a; text-decoration: none; font-weight: 700; font-size: 16px;">${labels.whatsappUs}</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 20px 0 0; color: #64748b; font-size: 13px;">${labels.orCall} <a href="tel:+966537430455" style="color: #34d399; text-decoration: none;">+966 53 743 0455</a></p>
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
                    <p style="margin: 12px 0 0; color: #64748b; font-size: 14px;">${labels.tagline}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px; text-align: center;">
                    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 14px;">
                      <a href="${WHATSAPP_LINK}" style="color: #34d399; text-decoration: none; font-weight: 600;">+966 53 743 0455</a> &nbsp;|&nbsp;
                      <a href="mailto:info@skystack.sa" style="color: #94a3b8; text-decoration: none;">info@skystack.sa</a>
                    </p>
                    <p style="margin: 12px 0 0; color: #475569; font-size: 12px;">
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
    solutionAr: "مجموعتنا من 150+ مهندس خبير في جميع التقنيات. تعاون في نفس المنطقة الزمنية. مديرو مشاريع متخصصون. حماية كاملة للملكية الفكرية. توسيع أو تقليص فوري.",
    features: ["Dedicated team members", "Same timezone overlap", "Direct communication", "Agile methodology", "Full IP protection", "Flexible scaling"],
    featuresAr: ["أعضاء فريق متخصصون", "تداخل نفس المنطقة الزمنية", "تواصل مباشر", "منهجية أجايل", "حماية كاملة للملكية الفكرية", "توسيع مرن"],
    benefits: ["60% cost reduction", "48-hour deployment", "Zero HR overhead"],
    benefitsAr: ["توفير 60% من التكاليف", "نشر خلال 48 ساعة", "صفر أعباء موارد بشرية"],
    techStack: ["React", "Node.js", "Python", "AWS", "Kubernetes", "Various"],
    slug: "outsourcing",
    ctaText: "Get Your Free Team Assessment",
    ctaTextAr: "احصل على تقييم فريقك المجاني",
    stat1: { value: "150+", label: "Engineers Available", labelAr: "مهندس متاح" },
    stat2: { value: "48hrs", label: "Deployment Time", labelAr: "وقت النشر" },
    stat3: { value: "60%", label: "Cost Savings", labelAr: "توفير في التكاليف" }
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
    stat3: { value: "8+", label: "Years Experience", labelAr: "سنوات خبرة" }
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
    stat3: { value: "4.8", label: "App Store Rating", labelAr: "تقييم المتجر" }
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
    stat3: { value: "100+", label: "Web Apps Built", labelAr: "تطبيق ويب مبني" }
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
    solutionAr: "منصتنا المختبرة تشمل تتبع GPS فوري، توزيع بالذكاء الاصطناعي، معالجة مدفوعات متعددة، وتطبيقات منفصلة لكل أنواع المستخدمين.",
    features: ["Real-time GPS tracking", "AI-powered dispatching", "Multi-payment gateway", "Driver/provider wallets", "Rating & review system", "Admin analytics dashboard"],
    featuresAr: ["تتبع GPS فوري", "توزيع بالذكاء الاصطناعي", "بوابة دفع متعددة", "محافظ للسائقين/مقدمي الخدمة", "نظام تقييم ومراجعة", "لوحة تحليلات للمسؤول"],
    benefits: ["Proven architecture", "Scales to 100K+ orders/day", "24/7 support"],
    benefitsAr: ["بنية مثبتة", "يتوسع لـ100 ألف+ طلب/يوم", "دعم 24/7"],
    techStack: ["React Native", "Node.js", "MongoDB", "Redis", "Socket.io", "Google Maps"],
    slug: "on-demand-app-development",
    ctaText: "Launch Your Platform",
    ctaTextAr: "أطلق منصتك",
    stat1: { value: "10 Wks", label: "To Launch", labelAr: "للإطلاق" },
    stat2: { value: "100K+", label: "Daily Orders", labelAr: "طلب يومي" },
    stat3: { value: "15+", label: "Platforms Built", labelAr: "منصة مبنية" }
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
    solutionAr: "حلولنا جاهزة ومختبرة. خصص واجهة المستخدم، ادمج علامتك التجارية، وأطلق في أسابيع بدلاً من سنوات.",
    features: ["Fully customizable UI/branding", "Pre-built user authentication", "Payment integration ready", "Admin dashboard included", "Scalable cloud infrastructure", "Documentation & training"],
    featuresAr: ["واجهة مستخدم قابلة للتخصيص بالكامل", "مصادقة مستخدم مبنية مسبقاً", "جاهز لتكامل الدفع", "لوحة تحكم مضمنة", "بنية سحابية قابلة للتوسع", "توثيق وتدريب"],
    benefits: ["70% cost reduction", "8-week deployment", "Proven architecture"],
    benefitsAr: ["توفير 70% من التكاليف", "نشر في 8 أسابيع", "بنية مثبتة"],
    techStack: ["React Native", "React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    slug: "clone-app-development",
    ctaText: "See Available Templates",
    ctaTextAr: "شاهد القوالب المتاحة",
    stat1: { value: "8 Wks", label: "To Launch", labelAr: "للإطلاق" },
    stat2: { value: "70%", label: "Cost Savings", labelAr: "توفير في التكاليف" },
    stat3: { value: "20+", label: "Templates", labelAr: "قالب" }
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
    solutionAr: "فريق التصميم لدينا يجري أبحاث المستخدمين، ينشئ نماذج سلكية مبنية على البيانات، ويقدم تصاميم دقيقة مختبرة مع مستخدمين حقيقيين.",
    features: ["User research & personas", "Interactive prototypes", "Usability testing", "Design system creation", "Accessibility compliance (WCAG)", "Developer handoff files"],
    featuresAr: ["بحث المستخدمين والشخصيات", "نماذج تفاعلية", "اختبار قابلية الاستخدام", "إنشاء نظام تصميم", "امتثال إمكانية الوصول (WCAG)", "ملفات تسليم المطورين"],
    benefits: ["Increase conversions 40%+", "Reduce support tickets", "Faster development"],
    benefitsAr: ["زيادة التحويلات 40%+", "تقليل تذاكر الدعم", "تطوير أسرع"],
    techStack: ["Figma", "Adobe XD", "Principle", "InVision", "Zeplin", "Maze"],
    slug: "ui-ux-design-services",
    ctaText: "Book a Design Audit",
    ctaTextAr: "احجز مراجعة تصميم",
    stat1: { value: "40%+", label: "Conversion Lift", labelAr: "زيادة التحويلات" },
    stat2: { value: "200+", label: "Projects", labelAr: "مشروع" },
    stat3: { value: "5 Days", label: "First Concepts", labelAr: "المفاهيم الأولى" }
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
    solutionAr: "مستشارونا يملكون 50+ سنة خبرة مجتمعة. نساعدك في تحديد خارطة طريق تقنية، تقييم الموردين، وبناء قدرات داخلية.",
    features: ["Technology stack assessment", "Architecture design review", "Vendor evaluation & selection", "Digital transformation roadmap", "Team training & enablement", "Ongoing advisory retainer"],
    featuresAr: ["تقييم المكدس التقني", "مراجعة تصميم البنية", "تقييم واختيار الموردين", "خارطة طريق التحول الرقمي", "تدريب وتمكين الفريق", "استشارات مستمرة"],
    benefits: ["Avoid costly mistakes", "Accelerate decisions", "Reduce technical debt"],
    benefitsAr: ["تجنب الأخطاء المكلفة", "تسريع القرارات", "تقليل الديون التقنية"],
    techStack: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Various"],
    slug: "technology-consulting-services",
    ctaText: "Schedule Strategy Call",
    ctaTextAr: "جدول مكالمة استراتيجية",
    stat1: { value: "50+", label: "Years Experience", labelAr: "سنة خبرة" },
    stat2: { value: "30+", label: "Enterprises", labelAr: "مؤسسة" },
    stat3: { value: "SAR 10M+", label: "Savings Delivered", labelAr: "توفير محقق" }
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
    stat3: { value: "1M+", label: "Leads Generated", labelAr: "عميل محتمل" }
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
    solutionAr: "مراكز التطوير الخارجية لدينا توفر مهندسين معتمدين يتكاملون مع فريقك. نتولى التوظيف والموارد البشرية والإدارة.",
    features: ["Dedicated team members", "Same timezone overlap", "Direct communication", "Agile methodology", "Full IP protection", "Flexible scaling"],
    featuresAr: ["أعضاء فريق متخصصون", "تداخل نفس المنطقة الزمنية", "تواصل مباشر", "منهجية أجايل", "حماية كاملة للملكية الفكرية", "توسيع مرن"],
    benefits: ["60% cost reduction", "48-hour deployment", "Zero HR overhead"],
    benefitsAr: ["توفير 60% من التكاليف", "نشر خلال 48 ساعة", "صفر أعباء موارد بشرية"],
    techStack: ["React", "Node.js", "Python", "AWS", "Kubernetes", "Various"],
    slug: "offshore-office-services",
    ctaText: "Build Your Team",
    ctaTextAr: "ابنِ فريقك",
    stat1: { value: "60%", label: "Cost Savings", labelAr: "توفير في التكاليف" },
    stat2: { value: "150+", label: "Engineers", labelAr: "مهندس" },
    stat3: { value: "48hrs", label: "To Deploy", labelAr: "للنشر" }
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
    solutionAr: "منصة توصيل الطعام وايت ليبل جاهزة بـ50+ ميزة. خصص العلامة التجارية، ادمج بوابات الدفع المحلية، وأطلق في 8 أسابيع.",
    features: ["Customer, Driver & Restaurant apps", "Live GPS order tracking", "Intelligent route optimization", "Multiple payment gateways", "Promo codes & loyalty", "Real-time analytics"],
    featuresAr: ["تطبيقات للعملاء والسائقين والمطاعم", "تتبع GPS مباشر للطلبات", "تحسين المسار الذكي", "بوابات دفع متعددة", "أكواد ترويجية وولاء", "تحليلات فورية"],
    benefits: ["8-week launch", "Proven at scale", "Local payment support"],
    benefitsAr: ["إطلاق في 8 أسابيع", "مثبت على نطاق واسع", "دعم الدفع المحلي"],
    techStack: ["React Native", "Node.js", "MongoDB", "Redis", "Google Maps", "Stripe"],
    slug: "food-delivery-app-development",
    ctaText: "Launch Your Delivery App",
    ctaTextAr: "أطلق تطبيق التوصيل",
    stat1: { value: "8 Wks", label: "To Launch", labelAr: "للإطلاق" },
    stat2: { value: "10+", label: "Platforms Built", labelAr: "منصة مبنية" },
    stat3: { value: "1M+", label: "Orders Processed", labelAr: "طلب معالج" }
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
    solutionAr: "نبني منصات تجارة إلكترونية مخصصة لأعمالك. أسواق متعددة البائعين، بوابات B2B بالجملة، تجارة الاشتراكات - أي نموذج تريده.",
    features: ["Multi-vendor marketplace", "Advanced product catalog", "Multiple payment gateways", "Inventory management", "Shipping integration", "Analytics & reporting"],
    featuresAr: ["سوق متعدد البائعين", "كتالوج منتجات متقدم", "بوابات دفع متعددة", "إدارة المخزون", "تكامل الشحن", "تحليلات وتقارير"],
    benefits: ["Custom features", "Unlimited scalability", "No transaction fees"],
    benefitsAr: ["ميزات مخصصة", "توسع غير محدود", "لا رسوم معاملات"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe", "Elasticsearch"],
    slug: "ecommerce-app-development",
    ctaText: "Build Your Store",
    ctaTextAr: "ابنِ متجرك",
    stat1: { value: "SAR 50M+", label: "GMV Processed", labelAr: "حجم معاملات معالج" },
    stat2: { value: "25+", label: "Stores Built", labelAr: "متجر مبني" },
    stat3: { value: "99.9%", label: "Uptime", labelAr: "وقت التشغيل" }
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
    solutionAr: "نبني منصات تعلم إلكتروني مخصصة مع استضافة فيديو، بث مباشر، اختبارات تفاعلية، تتبع التقدم، وإصدار الشهادات.",
    features: ["Video course hosting", "Live class streaming", "Quizzes & assessments", "Progress tracking", "Certificate generation", "Payment & subscriptions"],
    featuresAr: ["استضافة دورات الفيديو", "بث الفصول المباشرة", "اختبارات وتقييمات", "تتبع التقدم", "إصدار الشهادات", "الدفع والاشتراكات"],
    benefits: ["Unlimited students", "Your branding", "Full ownership"],
    benefitsAr: ["طلاب غير محدودين", "علامتك التجارية", "ملكية كاملة"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "AWS S3", "WebRTC", "Stripe"],
    slug: "elearning-app-development",
    ctaText: "Build Your Academy",
    ctaTextAr: "ابنِ أكاديميتك",
    stat1: { value: "100K+", label: "Students Served", labelAr: "طالب خُدم" },
    stat2: { value: "15+", label: "Platforms Built", labelAr: "منصة مبنية" },
    stat3: { value: "4.9", label: "Avg Rating", labelAr: "متوسط التقييم" }
  }
];

interface TemplateBlockProps {
  title: string;
  html: string;
  lang: 'en' | 'ar';
}

function TemplateBlock({ title, html, lang }: TemplateBlockProps) {
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            data-testid={`button-expand-${title.toLowerCase().replace(/\s+/g, '-')}-${lang}`}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
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

function ServiceTemplateSection({ service }: { service: ServiceTemplate }) {
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

  return (
    <div className="space-y-6">
      <TemplateBlock
        title={service.title}
        html={generateEmailTemplate('en', enContent)}
        lang="en"
      />
      <TemplateBlock
        title={service.titleAr}
        html={generateEmailTemplate('ar', arContent)}
        lang="ar"
      />
    </div>
  );
}

export default function EmailTemplates() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
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

        <Tabs defaultValue="outsourcing" className="w-full">
          <ScrollArea className="w-full whitespace-nowrap mb-6">
            <TabsList className="inline-flex w-max">
              {serviceTemplates.map((service) => (
                <TabsTrigger 
                  key={service.id} 
                  value={service.id}
                  data-testid={`tab-${service.id}`}
                  className="px-4"
                >
                  {service.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {serviceTemplates.map((service) => (
            <TabsContent key={service.id} value={service.id}>
              <ServiceTemplateSection service={service} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
