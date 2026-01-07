import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, Check, Shield, Users, Zap, Target, Lightbulb, Code, Rocket, 
  HeartHandshake, Award, Building2, Briefcase, Globe, Clock, Star, 
  ChevronRight, Play, CheckCircle2, TrendingUp, Layers, Database, 
  Smartphone, Cloud, Lock, Cpu
} from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { services, businessModels, industries } from "@/lib/data";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
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
        {/* Hero Section - Enhanced */}
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20 text-white">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="container-width relative z-10">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-4xl"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-medium text-sm mb-8 border border-white/20 backdrop-blur-sm">
                <Shield className="w-4 h-4 text-primary" />
                {t("hero.badge")}
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-8">
                {t("hero.title")}{" "}
                <span className="text-primary">{t("hero.titleHighlight")}</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg lg:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
                {t("hero.subtitle")}
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact-us">
                  <button className="bg-primary text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2" data-testid="button-hero-cta1">
                    {t("hero.cta1")} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/services">
                  <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-md font-semibold text-lg hover:bg-white/20 transition-all" data-testid="button-hero-cta2">
                    {t("hero.cta2")}
                  </button>
                </Link>
              </motion.div>

              {/* Stats in hero */}
              <motion.div variants={fadeIn} className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-white/10">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-3xl lg:text-4xl font-bold text-primary mb-1" data-testid={`text-stat-${i}`}>{stat.value}</div>
                    <div className="text-slate-400 text-sm">{language === "ar" ? stat.labelAr : stat.label}</div>
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
        <section className="py-20 lg:py-28 bg-white">
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
        <section className="py-20 lg:py-28 bg-slate-50">
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

        {/* Industries Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                {language === "ar" ? "القطاعات" : "Sectors"}
              </span>
              <h2 className="section-heading mt-2">{t("industries.title")}</h2>
              <p className="section-subheading mx-auto mt-4">{t("industries.subtitle")}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {industries.map((industry, i) => (
                <div key={i} className="group text-center p-6 bg-slate-50 rounded-md hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
                  <industry.icon className="w-10 h-10 text-primary group-hover:text-white mx-auto mb-4 transition-colors" />
                  <h4 className="font-semibold group-hover:text-white transition-colors" data-testid={`text-industry-${i}`}>
                    {language === "ar" ? industry.titleAr : industry.title}
                  </h4>
                  <p className="text-sm text-slate-500 group-hover:text-blue-100 mt-1 transition-colors">
                    {language === "ar" ? industry.descriptionAr : industry.description}
                  </p>
                </div>
              ))}
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
        <section className="py-20 lg:py-28 bg-white">
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
        <section className="py-20 lg:py-28 bg-slate-50">
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
