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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    quote: "SkyStack transformed our digital presence completely. Their team delivered beyond expectations.",
    quoteAr: "غير SkyStack حضورنا الرقمي بالكامل. فريقهم تجاوز توقعاتنا.",
    author: "Mohammed Al-Saud",
    authorAr: "محمد آل سعود",
    role: "CTO, Leading Retail Company",
    roleAr: "مدير التقنية، شركة تجزئة رائدة",
    rating: 5
  },
  {
    quote: "Professional, responsive, and truly understand enterprise requirements. Highly recommended.",
    quoteAr: "محترفون ومتجاوبون ويفهمون متطلبات المؤسسات. أوصي بهم بشدة.",
    author: "Sara Al-Rashid",
    authorAr: "سارة الراشد",
    role: "Digital Director, Healthcare Group",
    roleAr: "مديرة رقمية، مجموعة رعاية صحية",
    rating: 5
  },
  {
    quote: "The dedicated team model saved us 60% on development costs while maintaining quality.",
    quoteAr: "وفر نموذج الفريق المخصص 60% من تكاليف التطوير مع الحفاظ على الجودة.",
    author: "Khalid Al-Otaibi",
    authorAr: "خالد العتيبي",
    role: "CEO, Fintech Startup",
    roleAr: "الرئيس التنفيذي، شركة تقنية مالية",
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
  { key: "vision2030", icon: Target },
];

const caseStudies = [
  {
    title: "E-Commerce Platform",
    titleAr: "منصة تجارة إلكترونية",
    client: "Major Retail Chain",
    clientAr: "سلسلة تجزئة كبرى",
    result: "300% increase in online sales",
    resultAr: "زيادة 300% في المبيعات",
    category: "Retail",
    categoryAr: "تجزئة"
  },
  {
    title: "Banking Mobile App",
    titleAr: "تطبيق بنكي",
    client: "Regional Bank",
    clientAr: "بنك إقليمي",
    result: "1M+ active users",
    resultAr: "مليون+ مستخدم نشط",
    category: "Finance",
    categoryAr: "مالية"
  },
  {
    title: "Healthcare Portal",
    titleAr: "بوابة صحية",
    client: "Hospital Network",
    clientAr: "شبكة مستشفيات",
    result: "50% reduction in wait times",
    resultAr: "تقليل 50% في أوقات الانتظار",
    category: "Healthcare",
    categoryAr: "رعاية صحية"
  }
];

export default function Home() {
  const { t, language } = useLanguage();
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    challenge: ""
  });

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `New Lead:\nName: ${leadForm.name}\nEmail: ${leadForm.email}\nPhone: ${leadForm.phone}\nCompany: ${leadForm.company}\nIndustry: ${leadForm.industry}\nChallenge: ${leadForm.challenge}`;
    window.open(`https://wa.me/966537430455?text=${encodeURIComponent(message)}`, '_blank');
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
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section - Light & Clean */}
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
          {/* Subtle tech pattern background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23003cff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          
          {/* Soft gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-3xl" />
            <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-blue-50 rounded-full blur-3xl" />
          </div>

          <div className="container-width relative z-10">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-4xl"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 border border-primary/20">
                <Shield className="w-4 h-4" />
                {t("hero.badge")}
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl xl:text-8xl font-bold text-slate-900 leading-[1.1] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t("hero.title")}{" "}
                <span className="text-primary">{t("hero.titleHighlight")}</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                {t("hero.subtitle")}
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact-us">
                  <button className="bg-primary text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2" data-testid="button-hero-cta1">
                    {t("hero.cta1")} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/services">
                  <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-md font-semibold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm" data-testid="button-hero-cta2">
                    {t("hero.cta2")}
                  </button>
                </Link>
              </motion.div>

              {/* Stats in hero */}
              <motion.div variants={fadeIn} className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-slate-200">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-3xl lg:text-4xl font-bold text-primary mb-1" data-testid={`text-stat-${i}`}>{stat.value}</div>
                    <div className="text-slate-500 text-sm">{language === "ar" ? stat.labelAr : stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Trusted By / Partners */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container-width">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <p className="text-slate-500 font-medium text-sm uppercase tracking-wider shrink-0">
                {language === "ar" ? "موثوق من قبل الشركات الرائدة" : "Trusted by Leading Companies"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
                {[
                  "Enterprise Solutions",
                  "Saudi Vision 2030",
                  "ISO 27001 Certified",
                  "GDPR Compliant",
                  "AWS Partner"
                ].map((partner, i) => (
                  <span key={i} className="text-slate-400 font-semibold text-sm px-4 py-2 bg-slate-50 rounded-md" data-testid={`badge-partner-${i}`}>
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Enhanced */}
        <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-white">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-primary font-semibold tracking-wider uppercase text-sm">{t("about.title")}</span>
                <h2 className="section-heading mt-2">{t("about.subtitle")}</h2>
                <p className="section-subheading mt-4">{t("about.text")}</p>
                
                <div className="mt-8 space-y-4">
                  {[
                    { icon: CheckCircle2, text: language === "ar" ? "فريق سعودي محلي ذو خبرة عالمية" : "Saudi-based team with global expertise" },
                    { icon: CheckCircle2, text: language === "ar" ? "حلول مؤسسية مخصصة" : "Custom enterprise solutions" },
                    { icon: CheckCircle2, text: language === "ar" ? "دعم على مدار الساعة" : "24/7 dedicated support" },
                    { icon: CheckCircle2, text: language === "ar" ? "منهجية أجايل للتسليم السريع" : "Agile methodology for fast delivery" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-slate-600">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-10">
                  <Link href="/about-us">
                    <button className="btn-primary" data-testid="button-learn-more">
                      {language === "ar" ? "اعرف المزيد عنا" : "Learn More About Us"}
                    </button>
                  </Link>
                  <Link href="/outsourcing">
                    <button className="btn-outline" data-testid="button-outsourcing-cta">
                      {language === "ar" ? "خدمات التعهيد" : "Outsourcing Services"}
                    </button>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-blue-50 p-10 rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, i) => (
                      <div key={i} className="bg-white p-6 rounded-md shadow-sm text-center">
                        <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                        <div className="text-slate-600 text-sm font-medium">{language === "ar" ? stat.labelAr : stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                {language === "ar" ? "ماذا نقدم" : "What We Do"}
              </span>
              <h2 className="section-heading mt-2">{t("services.title")}</h2>
              <p className="section-subheading mx-auto mt-4">{t("services.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.slice(0, 8).map((service, index) => (
                <ServiceCard 
                  key={index}
                  {...service}
                  title={language === "ar" ? service.titleAr : service.title}
                  subtitle={language === "ar" ? service.subtitleAr : service.subtitle}
                  description={language === "ar" ? service.descriptionAr : service.description}
                  baseUrl="/services"
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/services">
                <button className="btn-primary inline-flex items-center gap-2" data-testid="button-view-all-services">
                  {language === "ar" ? "عرض جميع الخدمات" : "View All Services"} <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Outsourcing CTA Banner */}
        <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="container-width">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                  {language === "ar" ? "وفر حتى 70% مع فرق التعهيد" : "Save Up to 70% with Outsourced Teams"}
                </h3>
                <p className="text-blue-100 text-lg">
                  {language === "ar" 
                    ? "احصل على وصول لأفضل المواهب التقنية من باكستان وجنوب آسيا بتكلفة أقل."
                    : "Access top-tier tech talent from Pakistan and South Asia at a fraction of the cost."}
                </p>
              </div>
              <Link href="/outsourcing">
                <button className="bg-white text-primary px-8 py-4 rounded-md font-bold hover:bg-blue-50 transition-colors shrink-0 inline-flex items-center gap-2" data-testid="button-outsourcing-banner">
                  {language === "ar" ? "اكتشف المزيد" : "Learn More"} <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Saudi Market Transformation */}
        <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                {language === "ar" ? "رؤية 2030" : "Vision 2030"}
              </span>
              <h2 className="section-heading mt-2">{t("transformation.title")}</h2>
              <p className="section-subheading mx-auto mt-4">{t("transformation.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {transformationItems.map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-md shadow-sm hover:shadow-lg transition-all border border-slate-100" data-testid={`card-transformation-${i}`}>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3" data-testid={`text-transformation-title-${i}`}>
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

        {/* Saudi Industries Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                {language === "ar" ? "الصناعات السعودية" : "Saudi Industries"}
              </span>
              <h2 className="section-heading mt-2">{t("saudiIndustries.title")}</h2>
              <p className="section-subheading mx-auto mt-4">{t("saudiIndustries.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {saudiIndustries.map((industry, i) => (
                <div key={i} className="group p-8 bg-gradient-to-br from-slate-50 to-white rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300" data-testid={`card-saudi-industry-${i}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <industry.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2" data-testid={`text-saudi-industry-title-${i}`}>
                        {t(`saudiIndustries.${industry.key}`)}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed" data-testid={`text-saudi-industry-desc-${i}`}>
                        {t(`saudiIndustries.${industry.key}Text`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Generation Form */}
        <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-primary/5 via-blue-50/50 to-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                  {language === "ar" ? "ابدأ الآن" : "Get Started"}
                </span>
                <h2 className="section-heading mt-2">{t("leadForm.title")}</h2>
                <p className="section-subheading mx-auto mt-4">{t("leadForm.subtitle")}</p>
              </div>

              <form onSubmit={handleLeadSubmit} className="bg-white rounded-md shadow-xl p-8 lg:p-12 border border-slate-100">
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
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90" data-testid="button-lead-submit">
                  {t("leadForm.submit")} <Send className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-center text-sm text-slate-500 mt-4">
                  <Lock className="w-4 h-4 inline mr-1" />
                  {t("leadForm.privacy")}
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 lg:py-28 bg-slate-900 text-white">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                {language === "ar" ? "قصص النجاح" : "Success Stories"}
              </span>
              <h2 className="section-heading mt-2 text-white">
                {language === "ar" ? "مشاريع حققت نتائج استثنائية" : "Projects That Delivered Results"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((study, i) => (
                <div key={i} className="bg-slate-800 rounded-md p-8 hover:bg-slate-700 transition-colors group" data-testid={`card-casestudy-${i}`}>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider" data-testid={`text-casestudy-category-${i}`}>
                    {language === "ar" ? study.categoryAr : study.category}
                  </span>
                  <h3 className="text-xl font-bold mt-3 mb-2" data-testid={`text-casestudy-title-${i}`}>
                    {language === "ar" ? study.titleAr : study.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4" data-testid={`text-casestudy-client-${i}`}>
                    {language === "ar" ? study.clientAr : study.client}
                  </p>
                  <div className="flex items-center gap-2 text-green-400" data-testid={`text-casestudy-result-${i}`}>
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-semibold">{language === "ar" ? study.resultAr : study.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                {language === "ar" ? "لماذا نحن" : "Why Us"}
              </span>
              <h2 className="section-heading mt-2">{t("whyUs.title")}</h2>
              <p className="section-subheading mx-auto mt-4">{t("whyUs.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUsItems.map((item, i) => (
                <div key={i} className="text-center p-8 bg-slate-50 rounded-md hover:shadow-lg transition-all">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3" data-testid={`text-whyus-${i}`}>{t(`whyUs.${item.key}`)}</h4>
                  <p className="text-slate-600">{t(`whyUs.${item.key}Text`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-16 bg-slate-50 border-y border-slate-100">
          <div className="container-width">
            <div className="text-center mb-12">
              <h3 className="text-xl font-bold text-slate-900">
                {language === "ar" ? "التقنيات التي نستخدمها" : "Technologies We Use"}
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {techStack.map((tech, i) => (
                <div key={i} className="flex items-center gap-2 px-6 py-3 bg-white rounded-md shadow-sm" data-testid={`badge-tech-${i}`}>
                  <tech.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium text-slate-700">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                {language === "ar" ? "آراء العملاء" : "Client Testimonials"}
              </span>
              <h2 className="section-heading mt-2">
                {language === "ar" ? "ماذا يقول عملاؤنا" : "What Our Clients Say"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-md relative" data-testid={`card-testimonial-${i}`}>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-6 italic" data-testid={`text-testimonial-quote-${i}`}>
                    "{language === "ar" ? testimonial.quoteAr : testimonial.quote}"
                  </p>
                  <div>
                    <div className="font-bold text-slate-900" data-testid={`text-testimonial-author-${i}`}>
                      {language === "ar" ? testimonial.authorAr : testimonial.author}
                    </div>
                    <div className="text-sm text-slate-500" data-testid={`text-testimonial-role-${i}`}>
                      {language === "ar" ? testimonial.roleAr : testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-50">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                {language === "ar" ? "منهجيتنا" : "Our Process"}
              </span>
              <h2 className="section-heading mt-2">{t("process.title")}</h2>
              <p className="section-subheading mx-auto mt-4">{t("process.subtitle")}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {processSteps.map((step, i) => (
                <div key={i} className="relative text-center bg-white p-6 rounded-md shadow-sm">
                  <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-xs text-primary font-bold mb-2">{step.number}</div>
                  <h4 className="font-semibold text-slate-900 text-sm" data-testid={`text-process-${i}`}>{t(`process.${step.key}`)}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pre-Built Apps Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-width">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                  {language === "ar" ? "إطلاق سريع" : "Quick Launch"}
                </span>
                <h2 className="section-heading mt-2">{t("prebuilt.title")}</h2>
                <p className="section-subheading mt-4">{t("prebuilt.subtitle")}</p>
                
                <div className="flex flex-wrap gap-4 mt-6">
                  {["benefit1", "benefit2", "benefit3"].map((key, i) => (
                    <span key={i} className="inline-flex items-center gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-primary" />
                      {t(`prebuilt.${key}`)}
                    </span>
                  ))}
                </div>
              </div>
              <Link href="/pre-built-apps">
                <button className="text-primary font-semibold hover:gap-3 flex items-center gap-2 transition-all" data-testid="button-view-solutions">
                  {language === "ar" ? "عرض جميع الحلول" : "View All Solutions"} <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {businessModels.slice(0, 4).map((model, index) => (
                <ServiceCard 
                  key={index}
                  {...model}
                  title={language === "ar" ? model.titleAr : model.title}
                  subtitle={language === "ar" ? model.subtitleAr : model.subtitle}
                  description={language === "ar" ? model.descriptionAr : model.description}
                  baseUrl="/business-models"
                />
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
