import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight, Check, Shield, Zap, Globe, Smartphone, Search, Palette,
  Rocket, Star, Clock, ChevronRight, Send, Lock, Users, Award,
  MessageCircle, Layers, Code, HeartHandshake, CheckCircle2, Sparkles,
  Monitor, Mail, Phone, TrendingUp, Eye, Target, Loader2
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { trackLeadFormSubmission, trackLeadFormSuccess } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const packageFeatures = [
  {
    icon: Palette,
    title: "Custom Premium Design",
    titleAr: "تصميم مخصص احترافي",
    description: "Stunning, unique design tailored to your personal brand. No templates — 100% custom crafted.",
    descriptionAr: "تصميم فريد ومذهل مصمم خصيصاً لعلامتك الشخصية. بدون قوالب — مصنوع 100% حسب الطلب."
  },
  {
    icon: Smartphone,
    title: "Fully Responsive",
    titleAr: "متجاوب بالكامل",
    description: "Looks perfect on desktop, tablet, and mobile. Optimized for every screen size.",
    descriptionAr: "يظهر بشكل مثالي على الكمبيوتر والتابلت والجوال. محسّن لجميع أحجام الشاشات."
  },
  {
    icon: Search,
    title: "SEO Optimized",
    titleAr: "محسّن لمحركات البحث",
    description: "Built-in SEO best practices so people find you on Google. Meta tags, structured data, and more.",
    descriptionAr: "أفضل ممارسات SEO مدمجة ليجدك الناس على Google. وسوم ميتا وبيانات منظمة والمزيد."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    titleAr: "سرعة البرق",
    description: "Under 2-second load time with optimized images, lazy loading, and modern performance techniques.",
    descriptionAr: "وقت تحميل أقل من ثانيتين مع صور محسّنة وتحميل ذكي وتقنيات أداء حديثة."
  },
  {
    icon: Shield,
    title: "SSL & Security",
    titleAr: "SSL وحماية",
    description: "Free SSL certificate, security headers, and protection against common web vulnerabilities.",
    descriptionAr: "شهادة SSL مجانية، رؤوس أمان، وحماية ضد الثغرات الأمنية الشائعة."
  },
  {
    icon: Mail,
    title: "Contact Form & Lead Capture",
    titleAr: "نموذج تواصل وجمع عملاء",
    description: "Professional contact forms with email notifications and optional CRM integration.",
    descriptionAr: "نماذج تواصل احترافية مع إشعارات بريد إلكتروني وربط اختياري مع نظام CRM."
  },
  {
    icon: Globe,
    title: "Domain & Hosting Setup",
    titleAr: "إعداد النطاق والاستضافة",
    description: "We handle domain configuration, DNS setup, and reliable hosting deployment.",
    descriptionAr: "نتولى إعداد النطاق وDNS والنشر على استضافة موثوقة."
  },
  {
    icon: Code,
    title: "Clean, Modern Code",
    titleAr: "كود نظيف وحديث",
    description: "Built with React/Next.js — modern, maintainable, and easy to update in the future.",
    descriptionAr: "مبني بـ React/Next.js — حديث وسهل الصيانة والتحديث مستقبلاً."
  }
];

const freeAddons = [
  {
    icon: Eye,
    title: "Google Analytics 4",
    titleAr: "Google Analytics 4",
    description: "Full GA4 setup with custom events, conversion tracking, and audience insights dashboard.",
    descriptionAr: "إعداد كامل لـ GA4 مع أحداث مخصصة وتتبع التحويلات ولوحة رؤى الجمهور.",
    value: "$200"
  },
  {
    icon: Target,
    title: "Hotjar Heatmaps",
    titleAr: "خرائط Hotjar الحرارية",
    description: "Heatmaps, session recordings, and user behavior analytics to see exactly how visitors interact.",
    descriptionAr: "خرائط حرارية وتسجيلات جلسات وتحليلات سلوك المستخدم لمعرفة كيف يتفاعل الزوار.",
    value: "$150"
  },
  {
    icon: TrendingUp,
    title: "Mixpanel Analytics",
    titleAr: "تحليلات Mixpanel",
    description: "Advanced product analytics with user funnels, retention analysis, and custom event tracking.",
    descriptionAr: "تحليلات متقدمة مع قمع المستخدمين وتحليل الاحتفاظ وتتبع الأحداث المخصصة.",
    value: "$200"
  },
  {
    icon: Layers,
    title: "Google Tag Manager",
    titleAr: "Google Tag Manager",
    description: "GTM container setup with all marketing tags pre-configured. Easy to add future tracking pixels.",
    descriptionAr: "إعداد حاوية GTM مع جميع وسوم التسويق مسبقة التكوين. سهولة إضافة بيكسلات تتبع مستقبلية.",
    value: "$150"
  },
  {
    icon: Search,
    title: "Google Search Console",
    titleAr: "Google Search Console",
    description: "Full Search Console setup with sitemap submission, indexing requests, and performance monitoring.",
    descriptionAr: "إعداد كامل لـ Search Console مع إرسال خريطة الموقع وطلبات الفهرسة ومراقبة الأداء.",
    value: "$100"
  },
  {
    icon: Globe,
    title: "Bing Webmaster Tools",
    titleAr: "أدوات Bing لمشرفي المواقع",
    description: "Bing Webmaster setup for additional search engine visibility and SEO insights.",
    descriptionAr: "إعداد أدوات Bing لمشرفي المواقع لزيادة الظهور في محركات البحث ورؤى SEO.",
    value: "$50"
  },
  {
    icon: Rocket,
    title: "Meta Pixel (Facebook)",
    titleAr: "Meta Pixel (فيسبوك)",
    description: "Facebook/Instagram pixel installed and configured for retargeting and conversion tracking.",
    descriptionAr: "تثبيت وتكوين بيكسل فيسبوك/إنستغرام لإعادة الاستهداف وتتبع التحويلات.",
    value: "$100"
  },
  {
    icon: Monitor,
    title: "Speed & Core Web Vitals",
    titleAr: "السرعة ومؤشرات الويب الأساسية",
    description: "PageSpeed optimization to score 90+ on Google Lighthouse. Core Web Vitals compliance included.",
    descriptionAr: "تحسين سرعة الصفحة لتحقيق 90+ على Google Lighthouse. التوافق مع مؤشرات الويب الأساسية.",
    value: "$200"
  }
];

const whatsIncluded = [
  { en: "Up to 5 custom-designed pages", ar: "حتى 5 صفحات مصممة خصيصاً" },
  { en: "Professional copywriting guidance", ar: "إرشاد كتابة محتوى احترافي" },
  { en: "High-quality image sourcing & optimization", ar: "مصادر صور عالية الجودة وتحسينها" },
  { en: "Blog/articles section (optional)", ar: "قسم مدونة/مقالات (اختياري)" },
  { en: "Social media integration", ar: "ربط وسائل التواصل الاجتماعي" },
  { en: "Google Analytics 4 + Mixpanel setup", ar: "إعداد Google Analytics 4 + Mixpanel" },
  { en: "Hotjar heatmaps & session recording", ar: "خرائط Hotjar الحرارية وتسجيل الجلسات" },
  { en: "Google Tag Manager configured", ar: "إعداد Google Tag Manager" },
  { en: "Search Console & Webmaster Tools", ar: "Search Console وأدوات مشرفي المواقع" },
  { en: "WhatsApp chat widget", ar: "أداة محادثة WhatsApp" },
  { en: "Contact form with email alerts", ar: "نموذج تواصل مع تنبيهات بريد إلكتروني" },
  { en: "Meta Pixel for retargeting", ar: "Meta Pixel لإعادة الاستهداف" },
  { en: "1 month free support after launch", ar: "شهر دعم مجاني بعد الإطلاق" },
  { en: "Full source code ownership", ar: "ملكية كاملة للكود المصدري" },
  { en: "Performance & Core Web Vitals optimization", ar: "تحسين الأداء ومؤشرات الويب الأساسية" },
  { en: "Cross-browser testing", ar: "اختبار على جميع المتصفحات" },
];

const perfectFor = [
  {
    icon: Users,
    title: "Professionals & Consultants",
    titleAr: "المحترفون والمستشارون",
    description: "Showcase your expertise, experience, and services to attract new clients.",
    descriptionAr: "اعرض خبراتك وتجربتك وخدماتك لجذب عملاء جدد."
  },
  {
    icon: Sparkles,
    title: "Freelancers & Creatives",
    titleAr: "المستقلون والمبدعون",
    description: "Build a stunning portfolio to display your work and win more projects.",
    descriptionAr: "أنشئ معرض أعمال مذهل لعرض أعمالك والفوز بمشاريع أكثر."
  },
  {
    icon: Target,
    title: "Entrepreneurs & Founders",
    titleAr: "رواد الأعمال والمؤسسون",
    description: "Establish credibility and create a professional online presence for your brand.",
    descriptionAr: "عزّز مصداقيتك وأنشئ حضوراً رقمياً احترافياً لعلامتك التجارية."
  },
  {
    icon: Award,
    title: "Executives & Leaders",
    titleAr: "المدراء التنفيذيون والقادة",
    description: "Position yourself as an industry thought leader with a polished digital identity.",
    descriptionAr: "ضع نفسك كقائد فكري في مجالك بهوية رقمية مصقولة."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Call",
    titleAr: "مكالمة استكشافية",
    description: "We learn about your goals, brand, and target audience in a 30-minute call.",
    descriptionAr: "نتعرف على أهدافك وعلامتك التجارية وجمهورك المستهدف في مكالمة مدتها 30 دقيقة.",
    duration: "Day 1",
    durationAr: "اليوم 1"
  },
  {
    number: "02",
    title: "Design Concept",
    titleAr: "مفهوم التصميم",
    description: "We create 2 unique design concepts for your review and feedback.",
    descriptionAr: "نصمم مفهومين فريدين لمراجعتك وملاحظاتك.",
    duration: "Days 2-3",
    durationAr: "الأيام 2-3"
  },
  {
    number: "03",
    title: "Development",
    titleAr: "التطوير",
    description: "We build your site with clean code, animations, and all features.",
    descriptionAr: "نبني موقعك بكود نظيف وحركات ديناميكية وجميع المميزات.",
    duration: "Days 4-6",
    durationAr: "الأيام 4-6"
  },
  {
    number: "04",
    title: "Review & Launch",
    titleAr: "المراجعة والإطلاق",
    description: "Final review, revisions, analytics setup, and launch. Your site goes live!",
    descriptionAr: "مراجعة نهائية، تعديلات، إعداد التحليلات، والإطلاق. موقعك يصبح مباشراً!",
    duration: "Day 7",
    durationAr: "اليوم 7"
  }
];

const faqs = [
  {
    q: "What's included in the $2,000 package?",
    qAr: "ما الذي يتضمنه باقة الـ 2,000 دولار؟",
    a: "You get up to 5 custom-designed pages, mobile responsiveness, SEO optimization, contact forms, social media integration, and full source code ownership. Plus $1,150+ worth of free addons: Google Analytics 4, Hotjar, Mixpanel, Google Tag Manager, Search Console, Bing Webmaster Tools, Meta Pixel, and Core Web Vitals optimization. No hidden costs.",
    aAr: "تحصل على ما يصل إلى 5 صفحات مصممة خصيصاً، تجاوب مع الجوال، تحسين SEO، نماذج تواصل، ربط وسائل التواصل الاجتماعي، وملكية كاملة للكود المصدري. بالإضافة إلى إضافات مجانية بقيمة 1,150+ دولار: Google Analytics 4، Hotjar، Mixpanel، Google Tag Manager، Search Console، أدوات Bing لمشرفي المواقع، Meta Pixel، وتحسين مؤشرات الويب الأساسية. بدون تكاليف مخفية."
  },
  {
    q: "How long does it take to build?",
    qAr: "كم يستغرق البناء؟",
    a: "Most personal websites are completed within 7 business days from the discovery call. We follow a streamlined process to deliver fast without compromising quality.",
    aAr: "تُنجز معظم المواقع الشخصية خلال 7 أيام عمل من المكالمة الاستكشافية. نتبع عملية مبسطة للتسليم السريع دون المساومة على الجودة."
  },
  {
    q: "Can I update the website myself after launch?",
    qAr: "هل يمكنني تحديث الموقع بنفسي بعد الإطلاق؟",
    a: "Absolutely! We can integrate a headless CMS (like Sanity or Strapi) so you can update content easily. We also provide training and documentation.",
    aAr: "بالتأكيد! يمكننا دمج نظام إدارة محتوى (مثل Sanity أو Strapi) لتتمكن من تحديث المحتوى بسهولة. نوفر أيضاً التدريب والتوثيق."
  },
  {
    q: "Do I own the website and code?",
    qAr: "هل أملك الموقع والكود؟",
    a: "Yes, 100%. You get full ownership of all code, design files, and assets. It's your website — we just build it for you.",
    aAr: "نعم، 100%. تحصل على ملكية كاملة لجميع الأكواد وملفات التصميم والأصول. إنه موقعك — نحن فقط نبنيه لك."
  },
  {
    q: "What if I need more than 5 pages?",
    qAr: "ماذا لو احتجت أكثر من 5 صفحات؟",
    a: "Additional pages can be added at $150-200 per page. We're flexible and happy to customize the package to your needs.",
    aAr: "يمكن إضافة صفحات إضافية بتكلفة 150-200 دولار للصفحة. نحن مرنون وسعداء بتخصيص الباقة حسب احتياجاتك."
  },
  {
    q: "Do you handle domain and hosting?",
    qAr: "هل تتولون النطاق والاستضافة؟",
    a: "Yes! We help you choose and register a domain, set up hosting, and configure everything. Hosting typically costs $5-20/month depending on your needs.",
    aAr: "نعم! نساعدك في اختيار وتسجيل النطاق، إعداد الاستضافة، وتكوين كل شيء. تكلفة الاستضافة عادة 5-20 دولار شهرياً حسب احتياجاتك."
  },
  {
    q: "What technologies do you use?",
    qAr: "ما التقنيات التي تستخدمونها؟",
    a: "We build with React/Next.js for blazing performance, Tailwind CSS for beautiful design, and deploy on Vercel or AWS for maximum reliability and speed.",
    aAr: "نبني بـ React/Next.js لأداء فائق السرعة، Tailwind CSS لتصميم جميل، وننشر على Vercel أو AWS لأقصى موثوقية وسرعة."
  },
  {
    q: "Is there ongoing support after launch?",
    qAr: "هل هناك دعم مستمر بعد الإطلاق؟",
    a: "You get 1 month of free support post-launch. After that, we offer affordable monthly maintenance plans starting at $50/month.",
    aAr: "تحصل على شهر دعم مجاني بعد الإطلاق. بعد ذلك، نقدم خطط صيانة شهرية بأسعار معقولة تبدأ من 50 دولار شهرياً."
  }
];

const portfolioExamples = [
  {
    title: "Executive Portfolio",
    titleAr: "معرض أعمال تنفيذي",
    category: "Professional",
    categoryAr: "احترافي",
    description: "Clean, authoritative design for C-level executives",
    descriptionAr: "تصميم نظيف وموثوق للمدراء التنفيذيين",
    gradient: "from-slate-900 to-blue-900"
  },
  {
    title: "Creative Portfolio",
    titleAr: "معرض أعمال إبداعي",
    category: "Designer",
    categoryAr: "مصمم",
    description: "Bold, visual-first layout for creative professionals",
    descriptionAr: "تخطيط بصري جريء للمحترفين المبدعين",
    gradient: "from-purple-900 to-pink-800"
  },
  {
    title: "Consultant Website",
    titleAr: "موقع استشاري",
    category: "Business",
    categoryAr: "أعمال",
    description: "Conversion-focused design for service providers",
    descriptionAr: "تصميم مركّز على التحويل لمقدمي الخدمات",
    gradient: "from-emerald-900 to-teal-800"
  },
  {
    title: "Personal Brand",
    titleAr: "علامة تجارية شخصية",
    category: "Influencer",
    categoryAr: "مؤثر",
    description: "Engaging, content-rich platform for thought leaders",
    descriptionAr: "منصة غنية بالمحتوى وجذابة لقادة الفكر",
    gradient: "from-orange-900 to-red-800"
  }
];

export default function PersonalWebsite() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentWebsite: "",
    profession: "",
    goals: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: isArabic ? "معلومات ناقصة" : "Missing Information",
        description: isArabic ? "يرجى ملء الاسم والبريد الإلكتروني ورقم الهاتف." : "Please fill in your name, email, and phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    trackLeadFormSubmission("personal_website_landing", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      profession: formData.profession,
      has_current_website: !!formData.currentWebsite,
      goals_length: formData.goals?.length || 0
    });

    try {
      const res = await fetch("/api/personal-website-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }
      trackLeadFormSuccess("personal_website_landing", {
        profession: formData.profession,
        has_current_website: !!formData.currentWebsite,
        language
      });

      toast({
        title: isArabic ? "تم استلام الطلب! 🎉" : "Request Received! 🎉",
        description: isArabic ? "سنتواصل معك خلال ساعتين لتحديد موعد مكالمتك الاستكشافية المجانية." : "We'll contact you within 2 hours to schedule your free discovery call.",
        variant: "default"
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        currentWebsite: "",
        profession: "",
        goals: ""
      });
    } catch {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "حدث خطأ ما. يرجى المحاولة مرة أخرى أو التواصل معنا عبر WhatsApp." : "Something went wrong. Please try again or contact us on WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("get-started-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <SEO
        title="Professional Personal Website — $2,000 | SkyStack"
        titleAr="موقع شخصي احترافي — 2,000 دولار | سكاي ستاك"
        description="Get a stunning, custom-designed personal website for $2,000. Mobile responsive, SEO optimized, blazing fast. Ready in 7 days. $1,150+ in free analytics addons included."
        descriptionAr="احصل على موقع شخصي مذهل ومصمم خصيصاً بـ 2,000 دولار. متجاوب مع الجوال، محسن لمحركات البحث، سريع البرق. جاهز خلال 7 أيام. إضافات تحليلات مجانية بقيمة 1,150+ دولار."
        keywords="personal website, portfolio website, professional website, custom website design, personal branding, website development"
        keywordsAr="موقع شخصي، موقع بورتفوليو، موقع احترافي، تصميم موقع مخصص، علامة تجارية شخصية"
        canonicalUrl="/services/personal-website"
      />
      <Navigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-conic from-primary/10 via-transparent to-primary/5 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />

          <div className="container-width relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
              >
                <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-sm text-emerald-400 font-medium text-sm mb-6 border border-emerald-500/30">
                  <Sparkles className="w-4 h-4" />
                  {isArabic ? "عرض محدود — فقط 2,000 دولار" : "Limited Offer — Only $2,000"}
                </motion.div>

                <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6" style={{ fontFamily: isArabic ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif", letterSpacing: isArabic ? '0' : '-0.02em' }}>
                  {isArabic ? (
                    <>
                      موقعك <span className="gradient-text">الشخصي الاحترافي</span> خلال 7 أيام
                    </>
                  ) : (
                    <>
                      Your Professional{" "}
                      <span className="gradient-text">Personal Website</span>{" "}
                      in 7 Days
                    </>
                  )}
                </motion.h1>

                <motion.p variants={fadeIn} className="text-lg lg:text-xl text-slate-300 mb-4 leading-relaxed max-w-2xl mx-auto">
                  {isArabic 
                    ? "تميّز على الإنترنت بموقع مذهل ومصمم خصيصاً يعرض خبراتك ويجذب العملاء ويبني علامتك التجارية الشخصية."
                    : "Stand out online with a stunning, custom-designed website that showcases your expertise, attracts clients, and builds your personal brand."}
                </motion.p>

                <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400 mb-8">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> {isArabic ? "تصميم مخصص" : "Custom Design"}</span>
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> {isArabic ? "متوافق مع الجوال" : "Mobile Ready"}</span>
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> {isArabic ? "SEO مدمج" : "SEO Built-in"}</span>
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> {isArabic ? "تسليم 7 أيام" : "7-Day Delivery"}</span>
                </motion.div>

                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
                  <button onClick={scrollToForm} className="btn-primary-gradient text-lg flex items-center justify-center gap-2 group">
                    {isArabic ? "ابدأ الآن — 2,000 دولار" : "Get Started — $2,000"}
                    <ArrowRight className={`w-5 h-5 transition-transform ${isArabic ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`} />
                  </button>
                  <a href="https://wa.me/966537430455?text=Hi!%20I'm%20interested%20in%20the%20Personal%20Website%20package%20($2,000)" target="_blank" rel="noopener noreferrer">
                    <button className="bg-[#25D366]/20 backdrop-blur-sm text-[#25D366] border border-[#25D366]/30 px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#25D366]/30 transition-all flex items-center justify-center gap-2 w-full">
                      <MessageCircle className="w-5 h-5" />
                      {isArabic ? "تواصل عبر WhatsApp" : "Chat on WhatsApp"}
                    </button>
                  </a>
                </motion.div>

                {/* Price Anchor */}
                <motion.div variants={fadeIn} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-6 max-w-lg mx-auto">
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                      <div className="text-sm text-slate-400 line-through">$5,000+</div>
                      <div className="text-xs text-slate-500">{isArabic ? "سعر الوكالة" : "Agency Price"}</div>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="text-center">
                      <div className="text-3xl font-bold gradient-text">$2,000</div>
                      <div className="text-xs text-emerald-400 font-medium">{isArabic ? "سعرك — وفّر 60%" : "Your Price — Save 60%"}</div>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="text-center">
                      <div className="text-sm text-white font-semibold">{isArabic ? "7 أيام" : "7 Days"}</div>
                      <div className="text-xs text-slate-500">{isArabic ? "وقت التسليم" : "Delivery Time"}</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-primary py-4">
          <div className="container-width">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center text-white">
              {[
                { value: "100+", label: isArabic ? "موقع تم تسليمه" : "Websites Delivered" },
                { value: "98%", label: isArabic ? "رضا العملاء" : "Client Satisfaction" },
                { value: isArabic ? "7 أيام" : "7 Days", label: isArabic ? "متوسط التسليم" : "Average Delivery" },
                { value: "10+", label: isArabic ? "سنوات خبرة" : "Years Experience" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-xl lg:text-2xl font-bold">{stat.value}</div>
                  <div className="text-blue-100 text-xs lg:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-[300px] h-[300px] bg-blue-100/50 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">{isArabic ? "ما تحصل عليه" : "What You Get"}</span>
              <h2 className="section-heading mt-3">{isArabic ? (<>كل ما تحتاجه لحضور <span className="gradient-text">قوي</span> على الإنترنت</>) : (<>Everything You Need for a <span className="gradient-text">Powerful</span> Online Presence</>)}</h2>
              <p className="section-subheading mx-auto mt-4">
                {isArabic ? "موقع شخصي احترافي متكامل — مصمم ومطوّر ومنشور. بدون تنازلات." : "A complete, professional personal website — designed, developed, and deployed. No compromises."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packageFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group bg-white p-6 rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="icon-badge mb-5 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {isArabic ? feature.titleAr : feature.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {isArabic ? feature.descriptionAr : feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included Checklist + CTA */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
          </div>
          <div className="container-width relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="section-eyebrow">{isArabic ? "تفاصيل الباقة الكاملة" : "Full Package Details"}</span>
                <h2 className="section-heading mt-3 text-white">
                  {isArabic ? (<>كل هذا بـ <span className="gradient-text">2,000 دولار</span></>) : (<>All This for <span className="gradient-text">$2,000</span></>)}
                </h2>
                <p className="section-subheading mt-4 text-slate-400">
                  {isArabic ? "بدون رسوم مخفية. بدون مفاجآت. كل ما تحتاجه لإطلاق حضورك الرقمي الاحترافي." : "No hidden fees. No surprises. Everything you need to launch your professional online presence."}
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {whatsIncluded.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: isArabic ? 10 : -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-md border border-white/10"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-slate-300 text-sm">{isArabic ? item.ar : item.en}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-primary to-blue-700 rounded-md p-10 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-6">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {isArabic ? "أفضل قيمة" : "Best Value"}
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{isArabic ? "الموقع الشخصي" : "Personal Website"}</h3>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-5xl font-bold">$2,000</span>
                      <span className="text-blue-200 line-through text-lg">$5,000</span>
                    </div>
                    <p className="text-blue-100 mb-6 leading-relaxed">
                      {isArabic ? "دفعة واحدة. بدون رسوم شهرية. بدون اشتراكات. تملك كل شيء." : "One-time payment. No monthly fees. No subscriptions. You own everything."}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {(isArabic ? [
                        "حتى 5 صفحات مخصصة",
                        "تسليم خلال 7 أيام",
                        "مراجعتين للتصميم مشمولتين",
                        "إضافات تحليلات مجانية بقيمة 1,150+ دولار",
                        "شهر دعم مجاني",
                        "ملكية كاملة للكود"
                      ] : [
                        "Up to 5 custom pages",
                        "7-day delivery",
                        "2 design revisions included",
                        "$1,150+ in free analytics addons",
                        "1 month free support",
                        "Full code ownership"
                      ]).map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-emerald-300" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button onClick={scrollToForm} className="w-full bg-white text-primary py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                      {isArabic ? "احجز هذا العرض" : "Claim This Offer"} <ArrowRight className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
                    </button>

                    <p className="text-center text-sm text-blue-200 mt-4 flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" /> {isArabic ? "دفع آمن. لا يُطلب دفع الآن." : "Secure checkout. No payment required now."}
                    </p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Free Addons Section */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="section-eyebrow">{isArabic ? "🎁 مكافأة مجانية" : "🎁 Free Bonus"}</span>
              <h2 className="section-heading mt-3">
                {isArabic ? (<>أدوات تحليلات وتسويق مجانية بقيمة <span className="gradient-text">1,150+ دولار</span></>) : (<><span className="gradient-text">$1,150+</span> in Free Analytics & Marketing Tools</>)}
              </h2>
              <p className="section-subheading mx-auto mt-4">
                {isArabic ? "كل موقع شخصي يأتي مع حزمة تحليلات وتسويق متكاملة — يتم إعدادها وتكوينها بدون تكلفة إضافية." : "Every personal website comes with a complete analytics and marketing stack — set up and configured at no extra cost."}
              </p>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200">
                <Sparkles className="w-4 h-4" />
                {isArabic ? "كلها مشمولة مجاناً مع باقتك بـ 2,000 دولار" : "All included FREE with your $2,000 package"}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {freeAddons.map((addon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group bg-white p-6 rounded-md border border-slate-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 relative"
                >
                  <div className={`absolute -top-2 ${isArabic ? "-left-2" : "-right-2"}`}>
                    <span className="inline-flex items-center px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-sm">
                      {isArabic ? "مجاني" : "FREE"}
                    </span>
                  </div>
                  <div className="w-14 h-14 rounded-md bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:shadow-emerald-200/50 transition-all">
                    <addon.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                    {isArabic ? addon.titleAr : addon.title}
                  </h4>
                  <div className="text-xs font-semibold text-slate-400 line-through mb-2">
                    {isArabic ? `بقيمة ${addon.value}` : `Worth ${addon.value}`}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {isArabic ? addon.descriptionAr : addon.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button onClick={scrollToForm} className="btn-primary-gradient inline-flex items-center gap-2 group">
                {isArabic ? "احصل على كل شيء بـ 2,000 دولار" : "Get Everything for $2,000"} <ArrowRight className={`w-5 h-5 transition-transform ${isArabic ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Who Is This For */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">{isArabic ? "لمن هذه الباقة" : "Who Is This For"}</span>
              <h2 className="section-heading mt-3">{isArabic ? (<>مصمم للمحترفين <span className="gradient-text">الطموحين</span></>) : (<>Built for <span className="gradient-text">Ambitious</span> Professionals</>)}</h2>
              <p className="section-subheading mx-auto mt-4">
                {isArabic ? "سواء كنت مستشاراً أو مستقلاً أو رائد أعمال أو مديراً تنفيذياً — هذه الباقة مصممة لرفع حضورك الرقمي." : "Whether you're a consultant, freelancer, entrepreneur, or executive — this package is designed to elevate your online presence."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {perfectFor.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="group text-center p-8 bg-white rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="icon-badge-lg mx-auto mb-6 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{isArabic ? item.titleAr : item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{isArabic ? item.descriptionAr : item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Showcase */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">{isArabic ? "أنماط التصميم" : "Design Styles"}</span>
              <h2 className="section-heading mt-3 text-white">{isArabic ? (<>كل تصميم <span className="gradient-text">فريد</span></>) : (<>Every Design Is <span className="gradient-text">Unique</span></>)}</h2>
              <p className="section-subheading mx-auto mt-4 text-slate-400">
                {isArabic ? "لا نستخدم القوالب. كل موقع مصمم خصيصاً ليناسب شخصيتك وعلامتك التجارية." : "We don't use templates. Every website is custom-designed to match your personality and brand."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolioExamples.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-md border border-white/10 hover:border-primary/40 transition-all duration-300"
                >
                  <div className={`h-48 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                    <Monitor className="w-16 h-16 text-white/20 group-hover:text-white/40 transition-colors" />
                  </div>
                  <div className="p-6 bg-white/5 backdrop-blur-sm">
                    <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">{isArabic ? item.categoryAr : item.category}</span>
                    <h4 className="text-lg font-bold text-white mt-1 mb-1 group-hover:text-primary transition-colors">{isArabic ? item.titleAr : item.title}</h4>
                    <p className="text-slate-400 text-sm">{isArabic ? item.descriptionAr : item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">{isArabic ? "عمليتنا" : "Our Process"}</span>
              <h2 className="section-heading mt-3">{isArabic ? (<>من الفكرة إلى الإطلاق خلال <span className="gradient-text">7 أيام</span></>) : (<>From Idea to Launch in <span className="gradient-text">7 Days</span></>)}</h2>
              <p className="section-subheading mx-auto mt-4">
                {isArabic ? "عملية مثبتة ومبسطة تقدم نتائج سريعة دون التضحية بالجودة." : "A proven, streamlined process that delivers results fast without cutting corners."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="group relative bg-white p-8 rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-xs font-bold text-primary mb-3 tracking-wider">{step.number}</div>
                  <div className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium mb-4">
                    <Clock className="w-3 h-3" /> {isArabic ? step.durationAr : step.duration}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{isArabic ? step.titleAr : step.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{isArabic ? step.descriptionAr : step.description}</p>
                  {i < processSteps.length - 1 && (
                    <div className={`hidden lg:block absolute top-1/2 z-10 ${isArabic ? "-left-3" : "-right-3"}`}>
                      <ChevronRight className={`w-6 h-6 text-primary/40 ${isArabic ? "rotate-180" : ""}`} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof / Urgency */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-blue-700" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div className="container-width relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium mb-4">
                  <TrendingUp className="w-4 h-4" />
                  {isArabic ? "لماذا تنتظر؟" : "Why Wait?"}
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: isArabic ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif" }}>
                  {isArabic ? "منافسوك لديهم موقع إلكتروني بالفعل. وأنت؟" : "Your Competitors Already Have a Website. Do You?"}
                </h3>
                <p className="text-blue-100 text-lg leading-relaxed">
                  {isArabic ? "93% من الأشخاص يتحققون من الحضور الرقمي قبل التعامل تجارياً. الموقع الشخصي الاحترافي لم يعد اختيارياً — إنه ضروري." : "93% of people check someone's online presence before doing business. A professional personal website is no longer optional — it's essential."}
                </p>
              </div>
              <button onClick={scrollToForm} className="bg-white text-primary px-8 py-4 rounded-md font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all shrink-0 inline-flex items-center gap-2">
                {isArabic ? "أريد موقعي" : "Get My Website"} <ArrowRight className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">{isArabic ? "لماذا نحن" : "Why Choose Us"}</span>
              <h2 className="section-heading mt-3">{isArabic ? (<>SkyStack مقارنة بـ <span className="gradient-text">الخيارات الأخرى</span></>) : (<>SkyStack vs <span className="gradient-text">Other Options</span></>)}</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-md border border-slate-200 max-w-4xl mx-auto">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className={`${isArabic ? "text-right" : "text-left"} p-4 font-semibold text-slate-900 w-1/3`}>{isArabic ? "الميزة" : "Feature"}</th>
                    <th className="text-center p-4 font-semibold text-slate-400">{isArabic ? "DIY (Wix/WordPress)" : "DIY (Wix/WordPress)"}</th>
                    <th className="text-center p-4 font-semibold text-slate-400">{isArabic ? "وكالة (5K+ دولار)" : "Agency ($5K+)"}</th>
                    <th className="text-center p-4 font-semibold text-primary bg-primary/5">SkyStack ($2K)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { feature: isArabic ? "تصميم مخصص" : "Custom Design", diy: false, agency: true, skystack: true },
                    { feature: isArabic ? "متجاوب مع الجوال" : "Mobile Responsive", diy: true, agency: true, skystack: true },
                    { feature: isArabic ? "تحسين SEO" : "SEO Optimization", diy: false, agency: true, skystack: true },
                    { feature: isArabic ? "أداء سريع" : "Fast Performance", diy: false, agency: true, skystack: true },
                    { feature: isArabic ? "سعر معقول" : "Affordable Price", diy: true, agency: false, skystack: true },
                    { feature: isArabic ? "جاهز في 7 أيام" : "Ready in 7 Days", diy: true, agency: false, skystack: true },
                    { feature: isArabic ? "حزمة تحليلات مجانية" : "Free Analytics Suite", diy: false, agency: false, skystack: true },
                    { feature: isArabic ? "ملكية كاملة للكود" : "Full Code Ownership", diy: false, agency: false, skystack: true },
                    { feature: isArabic ? "دعم مجاني بعد الإطلاق" : "Free Post-Launch Support", diy: false, agency: false, skystack: true },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="p-4 text-slate-700 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">
                        {row.diy ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-slate-300">✕</span>}
                      </td>
                      <td className="p-4 text-center">
                        {row.agency ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-slate-300">✕</span>}
                      </td>
                      <td className="p-4 text-center bg-primary/5">
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-1/3 -right-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">{isArabic ? "آراء العملاء" : "Client Love"}</span>
              <h2 className="section-heading mt-3 text-white">{isArabic ? "ماذا يقول عملاؤنا" : "What Our Clients Say"}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: isArabic 
                    ? "سلّمني SkyStack موقعي الشخصي خلال 5 أيام فقط. التصميم أبهرني — يعكس علامتي التجارية بشكل مثالي. بالإضافة إلى إعداد جميع التحليلات مجاناً!"
                    : "SkyStack delivered my personal website in just 5 days. The design blew me away — it perfectly captures my brand. Plus they set up all my analytics for free!",
                  role: isArabic ? "مدير تنفيذي، شركة تقنية ناشئة" : "CEO, Tech Startup",
                  rating: 5
                },
                {
                  quote: isArabic
                    ? "كنت أنفق 200 دولار شهرياً على موقع WordPress يبدو عادياً. SkyStack بنى لي موقعاً مخصصاً بدفعة واحدة. أفضل استثمار قمت به."
                    : "I was spending $200/month on a WordPress site that looked generic. SkyStack built me a custom site for a one-time fee. Best investment I've made.",
                  role: isArabic ? "مستشار إداري" : "Management Consultant",
                  rating: 5
                },
                {
                  quote: isArabic
                    ? "الاهتمام بالتفاصيل مذهل. من الحركات الديناميكية إلى تجربة الجوال — كل شيء مصقول. عملائي ينبهرون في كل مرة."
                    : "The attention to detail is incredible. From animations to mobile experience — everything is polished. My clients are impressed every time.",
                  role: isArabic ? "مستشار مستقل" : "Independent Advisor",
                  rating: 5
                }
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white/5 backdrop-blur-sm p-8 rounded-md border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="pt-6 border-t border-white/10">
                    <div className="font-bold text-white">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">{isArabic ? "الأسئلة الشائعة" : "FAQ"}</span>
              <h2 className="section-heading mt-3">{isArabic ? (<>لديك أسئلة؟ لدينا <span className="gradient-text">إجابات</span></>) : (<>Got Questions? We've Got <span className="gradient-text">Answers</span></>)}</h2>
            </div>

            <div className="max-w-3xl mx-auto grid gap-6">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-6 rounded-md border border-slate-100 hover:shadow-md transition-all"
                >
                  <h4 className="font-bold text-slate-900 mb-3">{isArabic ? faq.qAr : faq.q}</h4>
                  <p className="text-slate-600 leading-relaxed">{isArabic ? faq.aAr : faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section id="get-started-form" className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-primary/15 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-eyebrow">{isArabic ? "ابدأ الآن" : "Get Started"}</span>
                <h2 className="section-heading mt-3 text-white">{isArabic ? (<>مستعد لبناء <span className="gradient-text">موقعك الشخصي</span>؟</>) : (<>Ready to Build Your <span className="gradient-text">Personal Website</span>?</>)}</h2>
                <p className="section-subheading mx-auto mt-4 text-slate-400">
                  {isArabic ? "املأ هذا النموذج السريع وسنحدد لك مكالمة استكشافية مجانية خلال ساعتين. بدون ضغط، بدون التزام." : "Fill out this quick form and we'll schedule a free discovery call within 2 hours. No pressure, no commitment."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-2xl p-8 lg:p-12 border border-slate-100 relative">
                <div className={`absolute -top-3 ${isArabic ? "-left-3" : "-right-3"} w-20 h-20 bg-primary/20 rounded-full blur-2xl`} />
                <div className={`absolute -bottom-3 ${isArabic ? "-right-3" : "-left-3"} w-16 h-16 bg-blue-400/20 rounded-full blur-2xl`} />

                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
                    <Sparkles className="w-4 h-4" />
                    {isArabic ? "مكالمة استكشافية مجانية — لا يُطلب دفع" : "Free Discovery Call — No Payment Required"}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{isArabic ? "الاسم الكامل *" : "Full Name *"}</label>
                    <Input
                      placeholder={isArabic ? "أدخل اسمك الكامل" : "Enter your full name"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{isArabic ? "البريد الإلكتروني *" : "Email Address *"}</label>
                    <Input
                      type="email"
                      placeholder={isArabic ? "you@example.com" : "you@example.com"}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{isArabic ? "الهاتف / WhatsApp *" : "Phone / WhatsApp *"}</label>
                    <Input
                      type="tel"
                      placeholder="+966 5XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{isArabic ? "الموقع الحالي (إن وجد)" : "Current Website (if any)"}</label>
                    <Input
                      placeholder="https://yoursite.com"
                      value={formData.currentWebsite}
                      onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">{isArabic ? "مهنتك / مجالك" : "Your Profession / Industry"}</label>
                  <Select value={formData.profession} onValueChange={(value) => setFormData({ ...formData, profession: value })}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={isArabic ? "اختر مهنتك" : "Select your profession"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultant">{isArabic ? "مستشار / مستشارة" : "Consultant / Advisor"}</SelectItem>
                      <SelectItem value="freelancer">{isArabic ? "مستقل / مبدع" : "Freelancer / Creative"}</SelectItem>
                      <SelectItem value="entrepreneur">{isArabic ? "رائد أعمال / مؤسس" : "Entrepreneur / Founder"}</SelectItem>
                      <SelectItem value="executive">{isArabic ? "مدير تنفيذي" : "Executive / C-Level"}</SelectItem>
                      <SelectItem value="professional">{isArabic ? "محترف (طبيب، محامي، إلخ)" : "Professional (Doctor, Lawyer, etc.)"}</SelectItem>
                      <SelectItem value="coach">{isArabic ? "مدرب / مدربة" : "Coach / Trainer"}</SelectItem>
                      <SelectItem value="influencer">{isArabic ? "صانع محتوى / مؤثر" : "Content Creator / Influencer"}</SelectItem>
                      <SelectItem value="other">{isArabic ? "أخرى" : "Other"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-slate-700 mb-2">{isArabic ? "ماذا تريد أن يحقق موقعك؟" : "What do you want your website to achieve?"}</label>
                  <Textarea
                    placeholder={isArabic ? "أخبرنا عن أهدافك... (مثل: جذب عملاء، عرض الأعمال، بناء علامة شخصية)" : "Tell us about your goals... (e.g., attract clients, showcase portfolio, build personal brand)"}
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-gradient w-full text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {isArabic ? "جاري الإرسال..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      {isArabic ? "احصل على مكالمتك الاستكشافية المجانية" : "Get My Free Discovery Call"} <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                  <p className="text-sm text-slate-500 flex items-center gap-1.5">
                    <Lock className="w-4 h-4" />
                    {isArabic ? "معلوماتك آمنة وخاصة 100%" : "Your info is 100% secure & private"}
                  </p>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {isArabic ? "نرد خلال ساعتين" : "We respond within 2 hours"}
                  </p>
                </div>
              </form>

              {/* WhatsApp Alternative */}
              <div className="mt-8 text-center">
                <p className="text-slate-400 mb-4">{isArabic ? "أو تواصل معنا مباشرة:" : "Or reach us directly:"}</p>
                <a
                  href="https://wa.me/966537430455?text=Hi!%20I'm%20interested%20in%20the%20Personal%20Website%20package%20($2,000)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-md font-bold hover:bg-[#20BD5A] transition-all shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  {isArabic ? "تواصل عبر WhatsApp" : "Chat on WhatsApp"}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-28">
          <div className="container-width">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-md p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -ml-48 -mb-48" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  {isArabic ? "لا تدع غياب موقعك يكلفك عملاء" : "Don't Let a Missing Website Cost You Clients"}
                </h2>
                <p className="text-lg lg:text-xl text-slate-300 mb-4">
                  {isArabic ? "كل يوم بدون موقع احترافي هو فرصة ضائعة. احصل على موقعك بـ 2,000 دولار فقط." : "Every day without a professional website is a missed opportunity. Get yours for just $2,000."}
                </p>
                <p className="text-sm text-slate-400 mb-10">
                  {isArabic 
                    ? "✓ تصميم مخصص \u00A0\u00A0 ✓ تسليم 7 أيام \u00A0\u00A0 ✓ ملكية كاملة \u00A0\u00A0 ✓ إضافات مجانية 1,150+ دولار"
                    : "✓ Custom design \u00A0\u00A0 ✓ 7-day delivery \u00A0\u00A0 ✓ Full ownership \u00A0\u00A0 ✓ $1,150+ free addons"}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={scrollToForm} className="bg-primary text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                    {isArabic ? "ابدأ موقعي" : "Start My Website"} <ArrowRight className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
                  </button>
                  <a href="https://wa.me/966537430455?text=Hi!%20I'm%20interested%20in%20the%20Personal%20Website%20package%20($2,000)" target="_blank" rel="noopener noreferrer">
                    <button className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 w-full">
                      <Phone className="w-5 h-5" />
                      {isArabic ? "تحدث معنا" : "Talk to Us"}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
