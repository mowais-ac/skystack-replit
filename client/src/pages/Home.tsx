import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import { 
  ArrowRight, Check, Shield, Users, Zap, Target, Lightbulb, Code, Rocket, 
  HeartHandshake, Award, Building2, Briefcase, Globe, Clock, Star, 
  ChevronRight, Play, CheckCircle2, TrendingUp, Layers, Database, 
  Smartphone, Cloud, Lock, Cpu, Fuel, ShoppingCart, Stethoscope, 
  Landmark, Truck, Home as HomeIcon, Settings, Send
} from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { services, businessModels, industries } from "@/lib/data";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trackLeadFormSubmission } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

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

const stats = [
  { value: "10+", label: "Years Experience", labelAr: "سنوات الخبرة" },
  { value: "500+", label: "Projects Delivered", labelAr: "مشروع منجز" },
  { value: "200+", label: "Happy Clients", labelAr: "عميل سعيد" },
  { value: "50+", label: "Team Experts", labelAr: "خبير في الفريق" },
];

const testimonials = [
  {
    quote: "SkyStack built our entire developer platform from scratch. The code quality and architecture exceeded our expectations.",
    quoteAr: "بنى سكاي ستاك منصة المطورين لدينا من الصفر. جودة الكود والبنية تجاوزت توقعاتنا.",
    author: "",
    authorAr: "",
    role: "CTO, UniCodex",
    roleAr: "المدير التقني، يوني كودكس",
    rating: 5
  },
  {
    quote: "Their AI integration expertise transformed our educational platform. Student engagement increased by 150%.",
    quoteAr: "خبرتهم في تكامل الذكاء الاصطناعي حولت منصتنا التعليمية. زادت مشاركة الطلاب بنسبة 150%.",
    author: "",
    authorAr: "",
    role: "CEO, ilmyst",
    roleAr: "الرئيس التنفيذي، إلمست",
    rating: 5
  },
  {
    quote: "SkyStack delivered our AI-powered analytics dashboard in record time. A true technology partner.",
    quoteAr: "سلم سكاي ستاك لوحة التحليلات المدعومة بالذكاء الاصطناعي في وقت قياسي. شريك تقني حقيقي.",
    author: "",
    authorAr: "",
    role: "CTO, SparkAI",
    roleAr: "المدير التقني، سبارك إيه آي",
    rating: 5
  },
  {
    quote: "The cybersecurity portal they built handles millions of threat assessments daily. Exceptional work.",
    quoteAr: "بوابة الأمن السيبراني التي بنوها تتعامل مع ملايين تقييمات التهديدات يومياً. عمل استثنائي.",
    author: "",
    authorAr: "",
    role: "CEO, BlueHat Solutions",
    roleAr: "الرئيس التنفيذي، بلو هات سوليوشنز",
    rating: 5
  },
  {
    quote: "Our booking platform now processes 10x more reservations. SkyStack modernized our entire tech stack.",
    quoteAr: "منصة الحجز لدينا الآن تعالج 10 أضعاف الحجوزات. حدث سكاي ستاك مجموعة التقنيات لدينا بالكامل.",
    author: "",
    authorAr: "",
    role: "COO, Thuraya Travel",
    roleAr: "مدير العمليات، ثريا للسفر",
    rating: 5
  }
];

const techStack = [
  { name: "React", icon: Code },
  { name: "Node.js", icon: Database },
  { name: "React Native", icon: Smartphone },
  { name: "AWS", icon: Cloud },
  { name: "PostgreSQL", icon: Database },
  { name: "TypeScript", icon: Code },
  { name: "Python", icon: Cpu },
  { name: "Docker", icon: Layers },
];

const saudiIndustries = [
  { key: "oilgas", icon: Fuel },
  { key: "retail", icon: ShoppingCart },
  { key: "healthcare", icon: Stethoscope },
  { key: "finance", icon: Landmark },
  { key: "logistics", icon: Truck },
  { key: "realestate", icon: HomeIcon },
];

const transformationItems = [
  { key: "automation", icon: Settings },
  { key: "efficiency", icon: TrendingUp },
  { key: "growth", icon: Rocket },
];

const caseStudies = [
  {
    title: "Developer Collaboration Platform",
    titleAr: "منصة تعاون المطورين",
    client: "UniCodex",
    clientAr: "يوني كودكس",
    result: "50K+ developers onboarded",
    resultAr: "50 ألف+ مطور مسجل",
    category: "Technology",
    categoryAr: "تقنية"
  },
  {
    title: "AI-Powered Learning Platform",
    titleAr: "منصة تعلم بالذكاء الاصطناعي",
    client: "ilmyst",
    clientAr: "إلمست",
    result: "150% increase in engagement",
    resultAr: "زيادة 150% في المشاركة",
    category: "EdTech",
    categoryAr: "تقنية تعليمية"
  },
  {
    title: "Enterprise Analytics Dashboard",
    titleAr: "لوحة تحليلات المؤسسات",
    client: "SparkAI",
    clientAr: "سبارك إيه آي",
    result: "Real-time insights for 100+ clients",
    resultAr: "رؤى فورية لـ 100+ عميل",
    category: "AI/Analytics",
    categoryAr: "ذكاء اصطناعي"
  },
  {
    title: "Cybersecurity Threat Portal",
    titleAr: "بوابة تهديدات الأمن السيبراني",
    client: "BlueHat Solutions",
    clientAr: "بلو هات سوليوشنز",
    result: "1M+ daily threat assessments",
    resultAr: "مليون+ تقييم تهديد يومياً",
    category: "Cybersecurity",
    categoryAr: "أمن سيبراني"
  },
  {
    title: "Travel Booking System",
    titleAr: "نظام حجز السفر",
    client: "Thuraya Travel",
    clientAr: "ثريا للسفر",
    result: "10x booking capacity increase",
    resultAr: "زيادة 10 أضعاف في سعة الحجز",
    category: "Travel",
    categoryAr: "سياحة"
  }
];

export default function Home() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    challenge: ""
  });

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const sourcePage = typeof window !== "undefined" ? window.location.href : "";
    trackLeadFormSubmission("home_lead_form", {
      name: leadForm.name,
      email: leadForm.email,
      phone: leadForm.phone,
      company: leadForm.company,
      industry: leadForm.industry,
      challenge_length: leadForm.challenge?.length || 0,
      page_url: sourcePage,
      language
    });

    setIsSubmittingLead(true);
    try {
      await apiRequest("POST", "/api/consultation-lead", {
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        company: leadForm.company,
        industry: leadForm.industry,
        message: leadForm.challenge,
        sourcePage,
        sourceContext: "Home - Free Consultation"
      });

      toast({
        title: language === "ar" ? "تم إرسال الطلب" : "Consultation Request Sent",
        description: language === "ar" ? "سنقوم بالتواصل معك قريبًا." : "Our team will contact you shortly."
      });
      setLeadForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        industry: "",
        challenge: ""
      });
    } catch (error) {
      toast({
        title: language === "ar" ? "تعذر الإرسال" : "Submission Failed",
        description: language === "ar" ? "يرجى المحاولة مرة أخرى." : "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const processSteps = [
    { key: "discovery", icon: Lightbulb, number: "01" },
    { key: "strategy", icon: Target, number: "02" },
    { key: "design", icon: Code, number: "03" },
    { key: "development", icon: Zap, number: "04" },
    { key: "launch", icon: Rocket, number: "05" },
    { key: "support", icon: HeartHandshake, number: "06" },
  ];

  const whyUsItems = [
    { key: "saudi", icon: Shield },
    { key: "enterprise", icon: Award },
    { key: "partnership", icon: HeartHandshake },
    { key: "quality", icon: Check },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <SEO 
        title="Software Development & IT Services"
        titleAr="تطوير البرمجيات وخدمات تقنية المعلومات"
        description="SkyStack helps Saudi companies build and modernize business software to automate operations and reduce manual work. Custom web apps, mobile apps, and enterprise solutions."
        descriptionAr="سكاي ستاك تساعد الشركات السعودية على بناء وتحديث برمجيات الأعمال لأتمتة العمليات وتقليل العمل اليدوي. تطبيقات ويب وجوال مخصصة وحلول مؤسسية."
        keywords="software development, web development, mobile app development, Saudi Arabia, Riyadh, enterprise software, custom software, IT services"
        keywordsAr="تطوير البرمجيات، تطوير الويب، تطوير تطبيقات الجوال، المملكة العربية السعودية، الرياض، برمجيات المؤسسات، البرمجيات المخصصة، خدمات تقنية المعلومات"
        canonicalUrl="/"
      />
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section - Premium IT Services Design */}
        <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-slate-950">
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-conic from-primary/10 via-transparent to-primary/5 rounded-full blur-3xl opacity-50" />
          </div>
          
          {/* Grid pattern overlay */}
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
                <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium text-sm mb-6 border border-white/10">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  {t("hero.badge")}
                </motion.div>
                
                <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>
                  {t("hero.title")}{" "}
                  <span className="gradient-text">{t("hero.titleHighlight")}</span>
                </motion.h1>
                
                <motion.p variants={fadeIn} className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                  {t("hero.subtitle")}
                </motion.p>
                
                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
                  <Link href="/contact-us">
                    <button className="btn-primary-gradient text-lg flex items-center justify-center gap-2 group" data-testid="button-hero-cta1">
                      {t("hero.cta1")} 
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <Link href="/services">
                    <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-md font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2" data-testid="button-hero-cta2">
                      <Play className="w-4 h-4" />
                      {t("hero.cta2")}
                    </button>
                  </Link>
                </motion.div>

              </motion.div>
            </div>
          </div>
        </section>


        {/* About Section - Enhanced Premium */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-[300px] h-[300px] bg-blue-100/50 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="section-eyebrow">{t("about.title")}</span>
                <h2 className="section-heading mt-3">{t("about.subtitle")}</h2>
                <p className="section-subheading mt-4">{t("about.text")}</p>
                
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: CheckCircle2, text: language === "ar" ? "فريق سعودي محلي ذو خبرة عالمية" : "Saudi-based team with global expertise" },
                    { icon: CheckCircle2, text: language === "ar" ? "حلول مؤسسية مخصصة" : "Custom enterprise solutions" },
                    { icon: CheckCircle2, text: language === "ar" ? "دعم على مدار الساعة" : "24/7 dedicated support" },
                    { icon: CheckCircle2, text: language === "ar" ? "منهجية أجايل للتسليم السريع" : "Agile methodology for fast delivery" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-md border border-slate-100 shadow-sm">
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-slate-700 text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-10">
                  <Link href="/about-us">
                    <button className="btn-primary-gradient" data-testid="button-learn-more">
                      {language === "ar" ? "اعرف المزيد عنا" : "Learn More About Us"}
                    </button>
                  </Link>
                  <Link href="/services/outsourcing">
                    <button className="btn-outline" data-testid="button-outsourcing-cta">
                      {language === "ar" ? "خدمات التعهيد" : "Outsourcing Services"}
                    </button>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-slate-900 p-8 lg:p-10 rounded-md shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, i) => (
                      <div key={i} className="bg-white/5 backdrop-blur p-6 rounded-md text-center border border-white/10">
                        <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                        <div className="text-slate-400 text-sm font-medium">{language === "ar" ? stat.labelAr : stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-center gap-6">
                      {techStack.slice(0, 4).map((tech, i) => (
                        <div key={i} className="text-center">
                          <tech.icon className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                          <span className="text-xs text-slate-500">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Premium Design */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px]" />
          </div>
          
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">
                {language === "ar" ? "ماذا نقدم" : "What We Do"}
              </span>
              <h2 className="section-heading mt-3 text-white">{t("services.title")}</h2>
              <p className="section-subheading mx-auto mt-4 text-slate-400">{t("services.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.slice(0, 8).map((service, index) => (
                <div key={index} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-6 hover:bg-white/10 hover:border-primary/30 transition-all duration-300" data-testid={`card-service-${index}`}>
                  <div className="icon-badge mb-5">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {language === "ar" ? service.titleAr : service.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {language === "ar" ? service.subtitleAr : service.subtitle}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/services">
                <button className="btn-primary-gradient inline-flex items-center gap-2" data-testid="button-view-all-services">
                  {language === "ar" ? "عرض جميع الخدمات" : "View All Services"} <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Outsourcing CTA Banner - Premium */}
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
                  {language === "ar" ? "وفر المال" : "Cost Savings"}
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {language === "ar" ? "وفر حتى 70% مع فرق التعهيد" : "Save Up to 70% with Outsourced Teams"}
                </h3>
                <p className="text-blue-100 text-lg leading-relaxed">
                  {language === "ar" 
                    ? "احصل على وصول لأفضل المواهب التقنية من باكستان وجنوب آسيا بتكلفة أقل."
                    : "Access top-tier tech talent from Pakistan and South Asia at a fraction of the cost."}
                </p>
              </div>
              <Link href="/services/outsourcing">
                <button className="bg-white text-primary px-8 py-4 rounded-md font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all shrink-0 inline-flex items-center gap-2" data-testid="button-outsourcing-banner">
                  {language === "ar" ? "اكتشف المزيد" : "Learn More"} <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Saudi Market Transformation - Premium */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">
                {language === "ar" ? "التحول الرقمي" : "Digital Transformation"}
              </span>
              <h2 className="section-heading mt-3">{t("transformation.title")}</h2>
              <p className="section-subheading mx-auto mt-4">{t("transformation.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {transformationItems.map((item, i) => (
                <div key={i} className="group bg-white p-8 rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300" data-testid={`card-transformation-${i}`}>
                  <div className="icon-badge-lg mb-6 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors" data-testid={`text-transformation-title-${i}`}>
                    {t(`transformation.${item.key}`)}
                  </h3>
                  <p className="text-slate-600 leading-relaxed" data-testid={`text-transformation-desc-${i}`}>
                    {t(`transformation.${item.key}Text`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Saudi Industries Section - Premium */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">
                {language === "ar" ? "الصناعات السعودية" : "Saudi Industries"}
              </span>
              <h2 className="section-heading mt-3 text-white">{t("saudiIndustries.title")}</h2>
              <p className="section-subheading mx-auto mt-4 text-slate-400">{t("saudiIndustries.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {saudiIndustries.map((industry, i) => (
                <div key={i} className="group p-6 bg-white/5 backdrop-blur-sm rounded-md border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300" data-testid={`card-saudi-industry-${i}`}>
                  <div className="flex items-start gap-4">
                    <div className="icon-badge-lg shrink-0 group-hover:shadow-primary/40">
                      <industry.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors" data-testid={`text-saudi-industry-title-${i}`}>
                        {t(`saudiIndustries.${industry.key}`)}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed" data-testid={`text-saudi-industry-desc-${i}`}>
                        {t(`saudiIndustries.${industry.key}Text`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Generation Form - Premium */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-eyebrow">
                  {language === "ar" ? "ابدأ الآن" : "Get Started"}
                </span>
                <h2 className="section-heading mt-3">{t("leadForm.title")}</h2>
                <p className="section-subheading mx-auto mt-4">{t("leadForm.subtitle")}</p>
              </div>

              <form onSubmit={handleLeadSubmit} className="bg-white rounded-md shadow-2xl p-8 lg:p-12 border border-slate-100 relative">
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-blue-400/20 rounded-full blur-2xl" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t("leadForm.name")}</label>
                    <Input 
                      placeholder={language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                      required
                      data-testid="input-lead-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t("leadForm.email")}</label>
                    <Input 
                      type="email"
                      placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your work email"}
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                      required
                      data-testid="input-lead-email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t("leadForm.phone")}</label>
                    <Input 
                      type="tel"
                      placeholder={language === "ar" ? "+966" : "+966"}
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                      required
                      data-testid="input-lead-phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t("leadForm.company")}</label>
                    <Input 
                      placeholder={language === "ar" ? "اسم شركتك" : "Your company name"}
                      value={leadForm.company}
                      onChange={(e) => setLeadForm({...leadForm, company: e.target.value})}
                      required
                      data-testid="input-lead-company"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t("leadForm.industry")}</label>
                  <Select value={leadForm.industry} onValueChange={(value) => setLeadForm({...leadForm, industry: value})}>
                    <SelectTrigger data-testid="select-lead-industry">
                      <SelectValue placeholder={language === "ar" ? "اختر القطاع" : "Select your industry"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oil-gas">{language === "ar" ? "النفط والغاز" : "Oil & Gas"}</SelectItem>
                      <SelectItem value="retail">{language === "ar" ? "التجزئة" : "Retail & E-commerce"}</SelectItem>
                      <SelectItem value="healthcare">{language === "ar" ? "الرعاية الصحية" : "Healthcare"}</SelectItem>
                      <SelectItem value="finance">{language === "ar" ? "البنوك والتمويل" : "Banking & Finance"}</SelectItem>
                      <SelectItem value="logistics">{language === "ar" ? "اللوجستيات" : "Logistics & Supply Chain"}</SelectItem>
                      <SelectItem value="realestate">{language === "ar" ? "العقارات" : "Real Estate & Construction"}</SelectItem>
                      <SelectItem value="other">{language === "ar" ? "أخرى" : "Other"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t("leadForm.challenge")}</label>
                  <Textarea 
                    placeholder={language === "ar" ? "صف التحدي الذي تواجهه..." : "Describe your biggest operational challenge..."}
                    value={leadForm.challenge}
                    onChange={(e) => setLeadForm({...leadForm, challenge: e.target.value})}
                    rows={4}
                    data-testid="textarea-lead-challenge"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="btn-primary-gradient w-full text-lg flex items-center justify-center gap-2 disabled:opacity-60"
                  data-testid="button-lead-submit"
                >
                  {isSubmittingLead
                    ? (language === "ar" ? "جاري الإرسال..." : "Sending...")
                    : t("leadForm.submit")}{" "}
                  <Send className="w-5 h-5" />
                </button>
                <p className="text-center text-sm text-slate-500 mt-4">
                  <Lock className="w-4 h-4 inline mr-1" />
                  {t("leadForm.privacy")}
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Case Studies - Premium */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">
                {language === "ar" ? "قصص النجاح" : "Success Stories"}
              </span>
              <h2 className="section-heading mt-3 text-white">
                {language === "ar" ? "مشاريع حققت نتائج استثنائية" : "Projects That Delivered Results"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudies.map((study, i) => (
                <div key={i} className="group bg-white/5 backdrop-blur-sm rounded-md p-8 border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300" data-testid={`card-casestudy-${i}`}>
                  <span className="section-eyebrow" data-testid={`text-casestudy-category-${i}`}>
                    {language === "ar" ? study.categoryAr : study.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-3 mb-2 group-hover:text-primary transition-colors" data-testid={`text-casestudy-title-${i}`}>
                    {language === "ar" ? study.titleAr : study.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6" data-testid={`text-casestudy-client-${i}`}>
                    {language === "ar" ? study.clientAr : study.client}
                  </p>
                  <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-md border border-green-500/20" data-testid={`text-casestudy-result-${i}`}>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="font-bold text-green-400">{language === "ar" ? study.resultAr : study.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us - Premium */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-blue-100/50 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">
                {language === "ar" ? "لماذا نحن" : "Why Us"}
              </span>
              <h2 className="section-heading mt-3">{t("whyUs.title")}</h2>
              <p className="section-subheading mx-auto mt-4">{t("whyUs.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUsItems.map((item, i) => (
                <div key={i} className="group text-center p-8 bg-white rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                  <div className="icon-badge-lg mx-auto mb-6 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors" data-testid={`text-whyus-${i}`}>{t(`whyUs.${item.key}`)}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{t(`whyUs.${item.key}Text`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack - Premium */}
        <section className="py-12 bg-slate-900 border-y border-slate-800">
          <div className="container-width">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              <p className="text-slate-500 font-medium text-xs uppercase tracking-[0.2em] shrink-0">
                {language === "ar" ? "التقنيات" : "Technologies"}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {techStack.map((tech, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-md border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all" data-testid={`badge-tech-${i}`}>
                    <tech.icon className="w-4 h-4 text-primary" />
                    <span className="font-medium text-slate-300 text-sm">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials - Premium */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-1/3 -right-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">
                {language === "ar" ? "آراء العملاء" : "Client Testimonials"}
              </span>
              <h2 className="section-heading mt-3 text-white">
                {language === "ar" ? "ماذا يقول عملاؤنا" : "What Our Clients Say"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="group bg-white/5 backdrop-blur-sm p-8 rounded-md border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300" data-testid={`card-testimonial-${i}`}>
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-8 text-lg" data-testid={`text-testimonial-quote-${i}`}>
                    "{language === "ar" ? testimonial.quoteAr : testimonial.quote}"
                  </p>
                  <div className="pt-6 border-t border-white/10">
                    <div className="font-bold text-white" data-testid={`text-testimonial-role-${i}`}>
                      {language === "ar" ? testimonial.roleAr : testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section - Premium */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">
                {language === "ar" ? "منهجيتنا" : "Our Process"}
              </span>
              <h2 className="section-heading mt-3">{t("process.title")}</h2>
              <p className="section-subheading mx-auto mt-4">{t("process.subtitle")}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {processSteps.map((step, i) => (
                <div key={i} className="group relative text-center bg-white p-6 rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="text-xs font-bold text-primary mb-3 tracking-wider">{step.number}</div>
                  <div className="icon-badge mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-blue-400 transition-all">
                    <step.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors" data-testid={`text-process-${i}`}>{t(`process.${step.key}`)}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pre-Built Apps Section - Premium */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-1/3 -right-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          </div>
          <div className="container-width relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="section-eyebrow">
                  {language === "ar" ? "إطلاق سريع" : "Quick Launch"}
                </span>
                <h2 className="section-heading mt-3 text-white">{t("prebuilt.title")}</h2>
                <p className="section-subheading mt-4 text-slate-400">{t("prebuilt.subtitle")}</p>
                
                <div className="flex flex-wrap gap-4 mt-6">
                  {["benefit1", "benefit2", "benefit3"].map((key, i) => (
                    <span key={i} className="inline-flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-primary" />
                      {t(`prebuilt.${key}`)}
                    </span>
                  ))}
                </div>
              </div>
              <Link href="/pre-built-apps">
                <button className="btn-primary-gradient flex items-center gap-2 group" data-testid="button-view-solutions">
                  {language === "ar" ? "عرض جميع الحلول" : "View All Solutions"} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {businessModels.slice(0, 4).map((model, index) => (
                <Link key={index} href={`/business-models/${model.slug}`}>
                  <div className="group h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-6 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                  <div className="icon-badge mb-5">
                    <model.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {language === "ar" ? model.titleAr : model.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {language === "ar" ? model.subtitleAr : model.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold mt-4">
                    {language === "ar" ? "عرض التفاصيل" : "View Details"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28">
          <div className="container-width">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-md p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">{t("cta.title")}</h2>
                <p className="text-lg lg:text-xl text-slate-300 mb-10">{t("cta.subtitle")}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact-us">
                    <button className="bg-primary text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/30" data-testid="button-cta-call">
                      {t("cta.button1")}
                    </button>
                  </Link>
                  <Link href="/pricing">
                    <button className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-white/10 transition-all" data-testid="button-cta-quote">
                      {t("cta.button2")}
                    </button>
                  </Link>
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
