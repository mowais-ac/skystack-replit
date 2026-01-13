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
  CheckCircle2, Building2, HeartHandshake
} from "lucide-react";
import { useState } from "react";

interface DynamicPageProps {
  type: "service" | "businessModel";
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

  return (
    <div className="min-h-screen flex flex-col font-sans">
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium text-sm mb-6 border border-white/10">
                  <Icon className="w-4 h-4 text-primary" />
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

        {/* Trust Bar */}
        <section className="py-4 bg-slate-900 border-y border-slate-800">
          <div className="container-width">
            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>ISO 27001</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Vision 2030</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>50+ Enterprise Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>5+ Years Experience</span>
              </div>
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

        {/* Features - Premium */}
        <section className="py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-1/3 -left-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
          </div>
          <div className="container-width relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <span className="section-eyebrow">
                  {language === "ar" ? "المميزات" : "Features"}
                </span>
                <h2 className="section-heading mt-3 text-white mb-8">
                  {language === "ar" ? "الميزات الرئيسية" : "Key Features"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-md border border-white/10 hover:border-primary/30 transition-all">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-slate-300" data-testid={`text-feature-${i}`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="section-eyebrow">
                  {language === "ar" ? "التقنيات" : "Technology"}
                </span>
                <h2 className="section-heading mt-3 text-white mb-8">
                  {language === "ar" ? "التقنيات المستخدمة" : "Technology Stack"}
                </h2>
                <div className="flex flex-wrap gap-3 mb-10">
                  {item.techStack.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-slate-300 font-medium hover:border-primary/30 transition-all">
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="font-bold text-white mb-4">
                  {language === "ar" ? "حالات الاستخدام" : "Use Cases"}
                </h3>
                <ul className="space-y-3">
                  {useCases.map((useCase, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-400">
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

        {/* Final CTA - Premium */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="container-width relative z-10 text-center">
            <span className="section-eyebrow">
              {language === "ar" ? "ابدأ الآن" : "Get Started"}
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {language === "ar" ? `هل أنت مستعد لبناء ${title}؟` : `Ready to build your ${title}?`}
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              {language === "ar" 
                ? "تواصل مع فريقنا للحصول على استشارة مجانية ومناقشة متطلبات مشروعك."
                : "Contact our team for a free consultation and discuss your project requirements."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-us">
                <button className="btn-primary-gradient flex items-center justify-center gap-2 group text-lg" data-testid="button-cta-quote">
                  {language === "ar" ? "احصل على عرض سعر مجاني" : "Get Free Quote"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href="tel:+966537430455">
                <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-md font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2" data-testid="button-cta-call">
                  <Phone className="w-5 h-5" />
                  {language === "ar" ? "اتصل بنا" : "Call Us"}
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
