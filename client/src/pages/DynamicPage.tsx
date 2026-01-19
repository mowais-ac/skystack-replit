import { useRoute, Link } from "wouter";
import { services, businessModels } from "@/lib/data";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import NotFound from "./not-found";
import { motion } from "framer-motion";
import { 
  ArrowRight, Check, Shield, Clock, Users, Zap, Star, 
  MessageCircle, Phone, ChevronDown, Award, Target, Rocket,
  CheckCircle2, Building2, HeartHandshake, Smartphone, Monitor, Tablet, Bike, Send
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { trackLeadFormSubmission } from "@/lib/analytics";

interface DynamicPageProps {
  type: "service" | "businessModel";
}

interface ServiceFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceName: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

function ServiceInquiryForm({ language, serviceName }: { language: string; serviceName: string }) {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      serviceName: serviceName,
      projectType: "",
      budget: "",
      timeline: "",
      message: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: ServiceFormData) => {
      return apiRequest("POST", "/api/service-inquiry", data);
    },
    onSuccess: () => {
      toast({
        title: language === "ar" ? "تم الإرسال بنجاح" : "Inquiry Sent!",
        description: language === "ar" ? "سنتواصل معك قريباً" : "We'll get back to you shortly."
      });
      reset();
    },
    onError: () => {
      toast({
        title: language === "ar" ? "حدث خطأ" : "Error",
        description: language === "ar" ? "يرجى المحاولة مرة أخرى" : "Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: ServiceFormData) => {
    trackLeadFormSubmission("service_inquiry_form", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service_name: data.serviceName,
      project_type: data.projectType,
      budget: data.budget,
      timeline: data.timeline,
      language
    });
    mutation.mutate(data);
  };

  const projectTypeOptions = [
    { value: "new", label: language === "ar" ? "مشروع جديد" : "New Project" },
    { value: "redesign", label: language === "ar" ? "إعادة تصميم" : "Redesign/Revamp" },
    { value: "migration", label: language === "ar" ? "ترحيل نظام" : "System Migration" },
    { value: "integration", label: language === "ar" ? "تكامل" : "Integration" },
    { value: "consulting", label: language === "ar" ? "استشارة" : "Consulting" }
  ];

  const budgetOptions = [
    { value: "50k-100k", label: language === "ar" ? "50,000 - 100,000 ر.س" : "50,000 - 100,000 SAR" },
    { value: "100k-250k", label: language === "ar" ? "100,000 - 250,000 ر.س" : "100,000 - 250,000 SAR" },
    { value: "250k-500k", label: language === "ar" ? "250,000 - 500,000 ر.س" : "250,000 - 500,000 SAR" },
    { value: "500k+", label: language === "ar" ? "أكثر من 500,000 ر.س" : "500,000+ SAR" },
    { value: "discuss", label: language === "ar" ? "نناقش لاحقاً" : "Let's discuss" }
  ];

  const timelineOptions = [
    { value: "asap", label: language === "ar" ? "في أقرب وقت" : "ASAP" },
    { value: "1-month", label: language === "ar" ? "خلال شهر" : "Within 1 month" },
    { value: "3-months", label: language === "ar" ? "خلال 3 أشهر" : "Within 3 months" },
    { value: "6-months", label: language === "ar" ? "خلال 6 أشهر" : "Within 6 months" },
    { value: "flexible", label: language === "ar" ? "مرن" : "Flexible" }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-md p-8 text-slate-900">
      <h3 className="text-2xl font-bold mb-6">
        {language === "ar" ? "احصل على عرض سعر مجاني" : "Get a Free Quote"}
      </h3>
      
      <input type="hidden" {...register("serviceName")} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          {...register("name", { required: true })}
          placeholder={language === "ar" ? "الاسم *" : "Name *"}
          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          data-testid="input-service-name"
        />
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder={language === "ar" ? "البريد الإلكتروني *" : "Email *"}
          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          data-testid="input-service-email"
        />
        <input
          {...register("phone", { required: true })}
          placeholder={language === "ar" ? "رقم الهاتف *" : "Phone *"}
          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          data-testid="input-service-phone"
        />
        <input
          {...register("company")}
          placeholder={language === "ar" ? "اسم الشركة" : "Company"}
          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          data-testid="input-service-company"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          {...register("projectType", { required: true })}
          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          data-testid="select-service-projecttype"
        >
          <option value="">{language === "ar" ? "نوع المشروع *" : "Project Type *"}</option>
          {projectTypeOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select
          {...register("budget", { required: true })}
          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          data-testid="select-service-budget"
        >
          <option value="">{language === "ar" ? "الميزانية *" : "Budget *"}</option>
          {budgetOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select
          {...register("timeline", { required: true })}
          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          data-testid="select-service-timeline"
        >
          <option value="">{language === "ar" ? "الجدول الزمني *" : "Timeline *"}</option>
          {timelineOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <textarea
        {...register("message")}
        rows={3}
        placeholder={language === "ar" ? "تفاصيل المشروع" : "Project details"}
        className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
        data-testid="textarea-service-message"
      />

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full btn-primary py-4 flex items-center justify-center gap-2"
        data-testid="button-service-submit"
      >
        {mutation.isPending ? (
          language === "ar" ? "جاري الإرسال..." : "Sending..."
        ) : (
          <>
            <Send className="w-5 h-5" />
            {language === "ar" ? "إرسال الطلب" : "Submit Request"}
          </>
        )}
      </button>
    </form>
  );
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function DynamicPage({ type }: DynamicPageProps) {
  const [match, params] = useRoute(type === "service" ? "/services/:slug" : "/business-models/:slug");
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("mobile");
  
  if (!match || !params) return <NotFound />;

  const collection = type === "service" ? services : businessModels;
  const item = collection.find(i => i.slug === params.slug);

  if (!item) return <NotFound />;

  const Icon = item.icon;
  const title = language === "ar" ? item.titleAr : item.title;
  const subtitle = language === "ar" ? item.subtitleAr : item.subtitle;
  const description = language === "ar" ? item.descriptionAr : item.description;
  const problem = language === "ar" ? item.problemAr : item.problem;
  const solution = language === "ar" ? item.solutionAr : item.solution;
  const features = language === "ar" ? item.featuresAr : item.features;
  const useCases = language === "ar" ? item.useCasesAr : item.useCases;

  const stats = [
    { value: "98%", label: language === "ar" ? "رضا العملاء" : "Client Satisfaction", icon: Star },
    { value: "50+", label: language === "ar" ? "مشروع مكتمل" : "Projects Delivered", icon: Award },
    { value: "24/7", label: language === "ar" ? "دعم فني" : "Support Available", icon: HeartHandshake },
    { value: "2-4", label: language === "ar" ? "أسابيع للإطلاق" : "Weeks to Launch", icon: Rocket },
  ];

  const faqs = [
    {
      q: language === "ar" ? "كم من الوقت يستغرق التطوير؟" : "How long does development take?",
      a: language === "ar" 
        ? "يعتمد الجدول الزمني على نطاق المشروع. عادةً ما يستغرق MVP من 4-8 أسابيع، بينما قد تستغرق المشاريع الكاملة من 3-6 أشهر."
        : "Timeline depends on project scope. Typically, an MVP takes 4-8 weeks, while full-scale projects may take 3-6 months."
    },
    {
      q: language === "ar" ? "هل تقدمون دعمًا بعد الإطلاق؟" : "Do you provide post-launch support?",
      a: language === "ar"
        ? "نعم، نقدم حزم صيانة ودعم شاملة تشمل إصلاح الأخطاء، تحديثات الأمان، والتحسينات المستمرة."
        : "Yes, we offer comprehensive maintenance and support packages including bug fixes, security updates, and ongoing enhancements."
    },
    {
      q: language === "ar" ? "ما هي التقنيات التي تستخدمونها؟" : "What technologies do you use?",
      a: language === "ar"
        ? "نستخدم أحدث التقنيات بما في ذلك React، Node.js، Python، AWS، وغيرها حسب متطلبات المشروع."
        : "We use cutting-edge technologies including React, Node.js, Python, AWS, and more depending on project requirements."
    },
    {
      q: language === "ar" ? "هل يمكنكم التكامل مع الأنظمة الحالية؟" : "Can you integrate with existing systems?",
      a: language === "ar"
        ? "بالتأكيد. نحن متخصصون في دمج الحلول الجديدة مع البنية التحتية الحالية وأنظمة المؤسسات."
        : "Absolutely. We specialize in integrating new solutions with existing infrastructure and enterprise systems."
    }
  ];

  const testimonial = {
    quote: language === "ar" 
      ? "فريق سكاي ستاك حول فكرتنا إلى منتج عالمي المستوى. احترافية استثنائية وجودة عالية."
      : "SkyStack transformed our vision into a world-class product. Exceptional professionalism and quality.",
    author: language === "ar" ? "خالد العمري" : "Khalid Al-Omari",
    role: language === "ar" ? "مدير التقنية، شركة تقنية سعودية" : "CTO, Saudi Tech Company",
  };

  const benefits = [
    { icon: Shield, text: language === "ar" ? "أمان على مستوى المؤسسات" : "Enterprise-grade Security" },
    { icon: Zap, text: language === "ar" ? "أداء عالي السرعة" : "High Performance" },
    { icon: Users, text: language === "ar" ? "قابل للتوسع" : "Scalable Architecture" },
    { icon: Clock, text: language === "ar" ? "تسليم في الوقت المحدد" : "On-time Delivery" },
  ];

  const seoKeywords = type === "service" 
    ? `${item.title}, software development, ${item.slug}, Saudi Arabia, custom software`
    : `${item.title}, pre-built app, white-label, ${item.slug}, Saudi Arabia`;
  const seoKeywordsAr = type === "service" 
    ? `${item.titleAr}، تطوير البرمجيات، ${item.slug}، السعودية، برمجيات مخصصة`
    : `${item.titleAr}، تطبيق جاهز، وايت ليبل، ${item.slug}، السعودية`;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <SEO 
        title={title}
        titleAr={item.titleAr}
        description={description}
        descriptionAr={item.descriptionAr}
        keywords={seoKeywords}
        keywordsAr={seoKeywordsAr}
        canonicalUrl={type === "service" ? `/services/${item.slug}` : `/business-models/${item.slug}`}
      />
      <Navigation />
      
      <main className="flex-grow">
        {/* Premium Hero */}
        <section className="bg-slate-950 text-white pt-40 pb-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
          
          <div className="container-width relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeIn}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-sm text-emerald-400 font-medium text-sm mb-6 border border-emerald-500/30">
                  <Icon className="w-4 h-4" />
                  {type === "service" 
                    ? (language === "ar" ? "خدمة احترافية" : "Professional Service") 
                    : (language === "ar" ? "حل جاهز" : "Ready-to-Launch Solution")}
                </div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }} data-testid="text-page-title">
                  {title}
                </h1>
                <p className="text-lg text-primary font-semibold mb-4">{subtitle}</p>
                <p className="text-xl text-slate-300 leading-relaxed mb-8">{description}</p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link href="/contact-us">
                    <button className="btn-primary-gradient flex items-center justify-center gap-2 group" data-testid="button-hero-quote">
                      {language === "ar" ? "احصل على عرض سعر مجاني" : "Get Free Quote"} 
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <a href="https://wa.me/966537430455" target="_blank" rel="noopener noreferrer">
                    <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-4 rounded-md font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2" data-testid="button-whatsapp">
                      <MessageCircle className="w-5 h-5" />
                      {language === "ar" ? "واتساب" : "WhatsApp"}
                    </button>
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  {benefits.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                      <benefit.icon className="w-4 h-4 text-primary" />
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Stats Card */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="bg-white/5 backdrop-blur-xl rounded-md border border-white/10 p-8">
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, i) => (
                      <div key={i} className="text-center p-4 rounded-md bg-white/5 border border-white/5">
                        <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                        <div className="text-slate-400 text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Problem/Solution - Premium */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="container-width">
            <div className="text-center mb-16">
              <span className="section-eyebrow">
                {language === "ar" ? "التحدي والحل" : "Challenge & Solution"}
              </span>
              <h2 className="section-heading mt-3">
                {language === "ar" ? "كيف نحل مشكلتك" : "How We Solve Your Problem"}
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="group bg-gradient-to-br from-red-50 to-orange-50 p-10 rounded-md border border-red-100 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-md bg-red-100 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-red-900 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {language === "ar" ? "التحدي" : "The Challenge"}
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">{problem}</p>
              </div>
              <div className="group bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-md border border-green-100 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-md bg-green-100 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {language === "ar" ? "حلنا" : "Our Solution"}
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">{solution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section - Services Only */}
        {type === "service" && (
          <section className="py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="absolute bottom-1/3 -left-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
            </div>
            <div className="container-width relative z-10">
              <div className="text-center mb-16">
                <span className="section-eyebrow">
                  {language === "ar" ? "أعمالنا" : "Our Portfolio"}
                </span>
                <h2 className="section-heading mt-3 text-white">
                  {language === "ar" ? "مشاريع منجزة" : "Completed Projects"}
                </h2>
                <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                  {language === "ar" 
                    ? "نماذج من أعمالنا التي ساعدت عملاءنا على تحقيق أهدافهم التجارية"
                    : "Examples of our work that helped clients achieve their business goals"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: language === "ar" ? "منصة التجارة الإلكترونية" : "E-Commerce Platform",
                    category: language === "ar" ? "تجارة إلكترونية" : "E-Commerce",
                    desc: language === "ar" ? "منصة متعددة البائعين مع أكثر من 10,000 منتج" : "Multi-vendor marketplace with 10,000+ products"
                  },
                  {
                    title: language === "ar" ? "تطبيق توصيل الطعام" : "Food Delivery App",
                    category: language === "ar" ? "تطبيق جوال" : "Mobile App",
                    desc: language === "ar" ? "تطبيق iOS و Android مع تتبع GPS مباشر" : "iOS & Android app with live GPS tracking"
                  },
                  {
                    title: language === "ar" ? "نظام إدارة المخزون" : "Inventory Management",
                    category: language === "ar" ? "نظام مؤسسي" : "Enterprise System",
                    desc: language === "ar" ? "إدارة مستودعات متعددة مع تحليلات متقدمة" : "Multi-warehouse management with advanced analytics"
                  },
                  {
                    title: language === "ar" ? "بوابة العملاء" : "Customer Portal",
                    category: language === "ar" ? "تطبيق ويب" : "Web Application",
                    desc: language === "ar" ? "بوابة خدمة ذاتية للعملاء مع تكامل CRM" : "Self-service customer portal with CRM integration"
                  },
                  {
                    title: language === "ar" ? "تطبيق الصحة واللياقة" : "Health & Fitness App",
                    category: language === "ar" ? "تطبيق جوال" : "Mobile App",
                    desc: language === "ar" ? "تتبع التمارين والتغذية مع مدرب AI" : "Workout & nutrition tracking with AI coach"
                  },
                  {
                    title: language === "ar" ? "منصة الحجوزات" : "Booking Platform",
                    category: language === "ar" ? "SaaS" : "SaaS",
                    desc: language === "ar" ? "نظام حجز متكامل للخدمات المختلفة" : "Complete booking system for various services"
                  }
                ].map((project, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-white/5 backdrop-blur-sm rounded-md border border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300"
                    data-testid={`card-portfolio-${i}`}
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-blue-500/20 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-md bg-white/10 flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">{project.category}</span>
                      <h3 className="text-lg font-bold text-white mt-2 mb-2">{project.title}</h3>
                      <p className="text-slate-400 text-sm">{project.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* App Platform Tabs - Pre-built Solutions Only */}
        {type === "businessModel" && (
          <section className="py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="absolute bottom-1/3 -left-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
            </div>
            <div className="container-width relative z-10">
              <div className="text-center mb-16">
                <span className="section-eyebrow">
                  {language === "ar" ? "مكونات الحل" : "Solution Components"}
                </span>
                <h2 className="section-heading mt-3 text-white">
                  {language === "ar" ? "ما الذي يتضمنه الحل" : "What's Included"}
                </h2>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { id: "mobile", icon: Smartphone, label: language === "ar" ? "تطبيق الجوال" : "Mobile App" },
                  { id: "admin", icon: Monitor, label: language === "ar" ? "لوحة الإدارة" : "Admin Panel" },
                  { id: "website", icon: Tablet, label: language === "ar" ? "الموقع الإلكتروني" : "Website" },
                  ...(item.slug.includes("delivery") || item.slug.includes("gojek") || item.slug.includes("car-wash") || item.slug.includes("laundry") 
                    ? [{ id: "rider", icon: Bike, label: language === "ar" ? "تطبيق السائق" : "Rider App" }] 
                    : [])
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-md font-semibold transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-white"
                        : "bg-white/5 text-slate-300 border border-white/10 hover:border-primary/30"
                    }`}
                    data-testid={`button-tab-${tab.id}`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="max-w-4xl mx-auto">
                {activeTab === "mobile" && (
                  <motion.div 
                    key="mobile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-md border border-white/10 p-8">
                      <Smartphone className="w-12 h-12 text-primary mb-6" />
                      <h3 className="text-xl font-bold text-white mb-4">
                        {language === "ar" ? "تطبيق iOS & Android" : "iOS & Android App"}
                      </h3>
                      <ul className="space-y-3">
                        {[
                          language === "ar" ? "واجهة مستخدم سهلة وبديهية" : "User-friendly intuitive interface",
                          language === "ar" ? "إشعارات فورية" : "Real-time push notifications",
                          language === "ar" ? "دعم الوضع الداكن" : "Dark mode support",
                          language === "ar" ? "دعم متعدد اللغات" : "Multi-language support",
                          language === "ar" ? "تكامل الدفع الإلكتروني" : "Payment gateway integration",
                          language === "ar" ? "تسجيل دخول اجتماعي" : "Social login options"
                        ].map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-300">
                            <Check className="w-4 h-4 text-primary shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="aspect-[9/16] max-w-[280px] mx-auto bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-[2rem] border-4 border-white/10 flex items-center justify-center">
                      <Smartphone className="w-24 h-24 text-primary/50" />
                    </div>
                  </motion.div>
                )}

                {activeTab === "admin" && (
                  <motion.div 
                    key="admin"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-md border border-white/10 p-8">
                      <Monitor className="w-12 h-12 text-primary mb-6" />
                      <h3 className="text-xl font-bold text-white mb-4">
                        {language === "ar" ? "لوحة تحكم المسؤول" : "Admin Dashboard"}
                      </h3>
                      <ul className="space-y-3">
                        {[
                          language === "ar" ? "إدارة المستخدمين والصلاحيات" : "User & role management",
                          language === "ar" ? "تحليلات وتقارير شاملة" : "Comprehensive analytics & reports",
                          language === "ar" ? "إدارة الطلبات والمعاملات" : "Order & transaction management",
                          language === "ar" ? "إعدادات النظام" : "System configuration",
                          language === "ar" ? "إدارة المحتوى" : "Content management",
                          language === "ar" ? "سجلات النشاط" : "Activity logs"
                        ].map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-300">
                            <Check className="w-4 h-4 text-primary shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-md border border-white/10 flex items-center justify-center">
                      <Monitor className="w-24 h-24 text-primary/50" />
                    </div>
                  </motion.div>
                )}

                {activeTab === "website" && (
                  <motion.div 
                    key="website"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-md border border-white/10 p-8">
                      <Tablet className="w-12 h-12 text-primary mb-6" />
                      <h3 className="text-xl font-bold text-white mb-4">
                        {language === "ar" ? "الموقع الإلكتروني" : "Responsive Website"}
                      </h3>
                      <ul className="space-y-3">
                        {[
                          language === "ar" ? "تصميم متجاوب لجميع الأجهزة" : "Responsive design for all devices",
                          language === "ar" ? "تحسين محركات البحث (SEO)" : "SEO optimized",
                          language === "ar" ? "سرعة تحميل عالية" : "Fast loading speed",
                          language === "ar" ? "تكامل مع التطبيق" : "App integration",
                          language === "ar" ? "نظام إدارة المحتوى" : "Content management system",
                          language === "ar" ? "تحليلات الزوار" : "Visitor analytics"
                        ].map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-300">
                            <Check className="w-4 h-4 text-primary shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-md border border-white/10 flex items-center justify-center">
                      <Tablet className="w-24 h-24 text-primary/50" />
                    </div>
                  </motion.div>
                )}

                {activeTab === "rider" && (
                  <motion.div 
                    key="rider"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-md border border-white/10 p-8">
                      <Bike className="w-12 h-12 text-primary mb-6" />
                      <h3 className="text-xl font-bold text-white mb-4">
                        {language === "ar" ? "تطبيق السائق / مقدم الخدمة" : "Driver / Provider App"}
                      </h3>
                      <ul className="space-y-3">
                        {[
                          language === "ar" ? "استقبال الطلبات في الوقت الحقيقي" : "Real-time order receiving",
                          language === "ar" ? "التنقل GPS" : "GPS navigation",
                          language === "ar" ? "إدارة الأرباح والمحفظة" : "Earnings & wallet management",
                          language === "ar" ? "سجل الطلبات" : "Order history",
                          language === "ar" ? "حالة التوفر" : "Availability toggle",
                          language === "ar" ? "التواصل مع العملاء" : "Customer communication"
                        ].map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-300">
                            <Check className="w-4 h-4 text-primary shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="aspect-[9/16] max-w-[280px] mx-auto bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-[2rem] border-4 border-white/10 flex items-center justify-center">
                      <Bike className="w-24 h-24 text-primary/50" />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Features - Premium */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <span className="section-eyebrow">
                  {language === "ar" ? "المميزات" : "Features"}
                </span>
                <h2 className="section-heading mt-3 mb-8">
                  {language === "ar" ? "الميزات الرئيسية" : "Key Features"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-slate-700" data-testid={`text-feature-${i}`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="section-eyebrow">
                  {language === "ar" ? "التقنيات" : "Technology"}
                </span>
                <h2 className="section-heading mt-3 mb-8">
                  {language === "ar" ? "التقنيات المستخدمة" : "Technology Stack"}
                </h2>
                <div className="flex flex-wrap gap-3 mb-10">
                  {item.techStack.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-md text-slate-700 font-medium hover:border-primary/30 transition-all">
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="font-bold text-slate-900 mb-4">
                  {language === "ar" ? "حالات الاستخدام" : "Use Cases"}
                </h3>
                <ul className="space-y-3">
                  {useCases.map((useCase, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process - Premium */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="container-width">
            <div className="text-center mb-16">
              <span className="section-eyebrow">
                {language === "ar" ? "المنهجية" : "Our Approach"}
              </span>
              <h2 className="section-heading mt-3">
                {language === "ar" ? "عملية التطوير" : "Development Process"}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { step: "01", en: "Requirements Analysis", ar: "تحليل المتطلبات", icon: Target },
                { step: "02", en: "Design & Prototyping", ar: "التصميم والنماذج", icon: Zap },
                { step: "03", en: "Agile Development", ar: "التطوير الرشيق", icon: Rocket },
                { step: "04", en: "QA & Deployment", ar: "الاختبار والنشر", icon: Shield },
              ].map((s, i) => (
                <div key={i} className="group text-center p-6 bg-white rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="text-xs font-bold text-primary mb-3 tracking-wider">{s.step}</div>
                  <div className="icon-badge mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-blue-400 transition-all">
                    <s.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">{language === "ar" ? s.ar : s.en}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
          <div className="container-width relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-2xl lg:text-3xl text-white font-medium mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-bold text-white">{testimonial.author}</div>
                <div className="text-slate-400">{testimonial.role}</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <span className="section-eyebrow">
                  {language === "ar" ? "الأسئلة الشائعة" : "FAQ"}
                </span>
                <h2 className="section-heading mt-3">
                  {language === "ar" ? "أسئلة متكررة" : "Frequently Asked Questions"}
                </h2>
                <p className="section-subheading mt-4">
                  {language === "ar" 
                    ? "إجابات على الأسئلة الأكثر شيوعًا حول خدماتنا"
                    : "Answers to the most common questions about our services"}
                </p>
                
                <div className="mt-8">
                  <Link href="/contact-us">
                    <button className="btn-primary-gradient flex items-center gap-2 group" data-testid="button-faq-contact">
                      {language === "ar" ? "لديك سؤال آخر؟" : "Have another question?"} 
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-md border border-slate-100 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                      data-testid={`button-faq-${i}`}
                    >
                      <span className="font-semibold text-slate-900">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA with Form */}
        <section id="get-quote" className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="container-width relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left">
                <span className="section-eyebrow">
                  {language === "ar" ? "ابدأ الآن" : "Get Started"}
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {language === "ar" ? `هل أنت مستعد لبناء ${title}؟` : `Ready to build your ${title}?`}
                </h2>
                <p className="text-slate-400 text-lg mb-8">
                  {language === "ar" 
                    ? "تواصل مع فريقنا للحصول على استشارة مجانية ومناقشة متطلبات مشروعك."
                    : "Contact our team for a free consultation and discuss your project requirements."}
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    language === "ar" ? "استشارة مجانية بدون التزام" : "Free consultation with no obligation",
                    language === "ar" ? "عرض سعر مفصل خلال 24 ساعة" : "Detailed quote within 24 hours",
                    language === "ar" ? "فريق خبراء مخصص لمشروعك" : "Dedicated expert team for your project"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                      <Check className="w-5 h-5 text-emerald-400" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
                <a href="tel:+966537430455" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                  {language === "ar" ? "أو اتصل بنا: 966537430455+" : "Or call us: +966537430455"}
                </a>
              </div>
              
              <ServiceInquiryForm language={language} serviceName={title} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
