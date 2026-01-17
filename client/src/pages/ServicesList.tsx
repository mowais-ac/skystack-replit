import { services, businessModels } from "@/lib/data";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { 
  ArrowRight, Shield, Clock, Users, Zap, Star, Award, 
  MessageCircle, Phone, CheckCircle2, Target, Rocket, Building2, HeartHandshake
} from "lucide-react";
import { SEO } from "@/components/SEO";

interface ServicesListProps {
  type: "service" | "businessModel";
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function ServicesList({ type }: ServicesListProps) {
  const { language, t } = useLanguage();
  const isService = type === "service";
  const items = isService ? services : businessModels;
  
  const title = isService 
    ? (language === "ar" ? "خدماتنا" : "Our Services")
    : (language === "ar" ? "التطبيقات الجاهزة" : "Pre-Built Applications");
  
  const subtitle = isService 
    ? (language === "ar" ? "حلول رقمية شاملة للشركات الحديثة" : "Comprehensive digital solutions for modern businesses")
    : (language === "ar" ? "أطلق بشكل أسرع مع حلولنا الجاهزة" : "Launch faster with our white-label solution blueprints");

  const stats = [
    { value: "50+", label: language === "ar" ? "مشروع مكتمل" : "Projects Delivered", icon: Award },
    { value: "98%", label: language === "ar" ? "رضا العملاء" : "Client Satisfaction", icon: Star },
    { value: "24/7", label: language === "ar" ? "دعم فني" : "Support Available", icon: HeartHandshake },
  ];

  const benefits = isService ? [
    { icon: Shield, title: language === "ar" ? "أمان مؤسسي" : "Enterprise Security", desc: language === "ar" ? "حماية بيانات متقدمة" : "Advanced data protection" },
    { icon: Zap, title: language === "ar" ? "أداء عالي" : "High Performance", desc: language === "ar" ? "تطبيقات سريعة وموثوقة" : "Fast and reliable apps" },
    { icon: Users, title: language === "ar" ? "فريق خبراء" : "Expert Team", desc: language === "ar" ? "مطورون محترفون" : "Professional developers" },
    { icon: Clock, title: language === "ar" ? "تسليم سريع" : "Fast Delivery", desc: language === "ar" ? "التزام بالمواعيد" : "On-time commitment" },
  ] : [
    { icon: Rocket, title: language === "ar" ? "إطلاق سريع" : "Quick Launch", desc: language === "ar" ? "جاهز للتخصيص والإطلاق" : "Ready to customize & launch" },
    { icon: Target, title: language === "ar" ? "حلول مثبتة" : "Proven Solutions", desc: language === "ar" ? "تصاميم ناجحة ومختبرة" : "Battle-tested designs" },
    { icon: Shield, title: language === "ar" ? "تكلفة أقل" : "Lower Cost", desc: language === "ar" ? "توفير في التطوير" : "Save on development" },
    { icon: Zap, title: language === "ar" ? "قابل للتوسع" : "Scalable", desc: language === "ar" ? "ينمو مع أعمالك" : "Grows with your business" },
  ];

  const testimonials = [
    {
      quote: language === "ar" ? "فريق سكاي ستاك حول فكرتنا إلى منتج عالمي." : "SkyStack transformed our vision into a world-class product.",
      author: language === "ar" ? "خالد العمري" : "Khalid Al-Omari",
      role: language === "ar" ? "مدير تقنية" : "CTO",
      rating: 5
    },
    {
      quote: language === "ar" ? "احترافية عالية وجودة استثنائية في التسليم." : "High professionalism and exceptional delivery quality.",
      author: language === "ar" ? "سارة المالكي" : "Sarah Al-Malki",
      role: language === "ar" ? "مديرة منتج" : "Product Manager",
      rating: 5
    },
    {
      quote: language === "ar" ? "أفضل شريك تقني عملنا معه على الإطلاق." : "The best tech partner we've ever worked with.",
      author: language === "ar" ? "أحمد الشهري" : "Ahmed Al-Shehri",
      role: language === "ar" ? "مؤسس ستارتاب" : "Startup Founder",
      rating: 5
    }
  ];

  const seoTitle = isService ? "Our Services" : "Pre-Built Applications";
  const seoTitleAr = isService ? "خدماتنا" : "التطبيقات الجاهزة";
  const seoDescription = isService 
    ? "Comprehensive software development services including web apps, mobile apps, AI solutions, and enterprise systems for Saudi businesses."
    : "Launch faster with our white-label pre-built applications. E-commerce, healthcare, real estate, and more - ready to customize.";
  const seoDescriptionAr = isService 
    ? "خدمات تطوير برمجيات شاملة تشمل تطبيقات الويب والجوال وحلول الذكاء الاصطناعي وأنظمة المؤسسات للشركات السعودية."
    : "أطلق بشكل أسرع مع تطبيقاتنا الجاهزة. التجارة الإلكترونية والرعاية الصحية والعقارات والمزيد - جاهزة للتخصيص.";

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={seoTitle}
        titleAr={seoTitleAr}
        description={seoDescription}
        descriptionAr={seoDescriptionAr}
        keywords={isService 
          ? "software development services, web development, mobile app development, AI solutions, enterprise software, Saudi Arabia"
          : "pre-built apps, white-label solutions, e-commerce platform, healthcare app, real estate software, Saudi Arabia"}
        keywordsAr={isService 
          ? "خدمات تطوير البرمجيات، تطوير الويب، تطوير تطبيقات الجوال، حلول الذكاء الاصطناعي، برمجيات المؤسسات، السعودية"
          : "تطبيقات جاهزة، حلول وايت ليبل، منصة تجارة إلكترونية، تطبيق رعاية صحية، برمجيات عقارات، السعودية"}
        canonicalUrl={isService ? "/services" : "/pre-built-apps"}
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
            <div className="max-w-3xl mx-auto text-center">
              <motion.div {...fadeIn}>
                <span className="section-eyebrow">
                  {isService ? t("nav.services") : t("nav.solutions")}
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold mt-4 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }} data-testid="text-list-title">
                  {title}
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed mb-8">{subtitle}</p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Link href="/contact-us">
                    <button className="btn-primary-gradient flex items-center justify-center gap-2 group" data-testid="button-hero-quote">
                      {language === "ar" ? "احصل على استشارة مجانية" : "Get Free Consultation"} 
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

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                      <div className="text-slate-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="container-width">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="group text-center p-6 bg-white rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="icon-badge mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-blue-400 transition-all">
                    <benefit.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{benefit.title}</h4>
                  <p className="text-slate-500 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-width">
            <div className="text-center mb-12">
              <span className="section-eyebrow">
                {isService 
                  ? (language === "ar" ? "استكشف خدماتنا" : "Explore Our Services")
                  : (language === "ar" ? "اختر حلك" : "Choose Your Solution")}
              </span>
              <h2 className="section-heading mt-3">
                {isService 
                  ? (language === "ar" ? "خدمات تطوير البرمجيات" : "Software Development Services")
                  : (language === "ar" ? "حلول جاهزة للإطلاق" : "Ready-to-Launch Solutions")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, index) => (
                <ServiceCard 
                  key={index}
                  {...item}
                  title={language === "ar" ? item.titleAr : item.title}
                  subtitle={language === "ar" ? item.subtitleAr : item.subtitle}
                  description={language === "ar" ? item.descriptionAr : item.description}
                  baseUrl={isService ? "/services" : "/business-models"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-1/3 -right-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center mb-16">
              <span className="section-eyebrow">
                {language === "ar" ? "آراء العملاء" : "Client Testimonials"}
              </span>
              <h2 className="section-heading mt-3 text-white">
                {language === "ar" ? "ماذا يقول عملاؤنا" : "What Our Clients Say"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="group bg-white/5 backdrop-blur-sm p-8 rounded-md border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-6 text-lg">"{testimonial.quote}"</p>
                  <div className="pt-6 border-t border-white/10">
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="container-width">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-eyebrow">
                {language === "ar" ? "ابدأ الآن" : "Get Started"}
              </span>
              <h2 className="section-heading mt-3 mb-6">
                {language === "ar" ? "لا ترى ما تحتاجه؟" : "Don't see what you need?"}
              </h2>
              <p className="text-slate-600 mb-10 text-lg">
                {language === "ar" 
                  ? "نحن متخصصون في تطوير البرمجيات المخصصة. تواصل معنا لمناقشة متطلباتك الفريدة والحصول على استشارة مجانية."
                  : "We specialize in custom software development. Contact us to discuss your unique requirements and get a free consultation."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact-us">
                  <button className="btn-primary-gradient flex items-center justify-center gap-2 group" data-testid="button-contact-team">
                    {language === "ar" ? "تواصل مع فريقنا" : "Contact Our Team"} 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <a href="tel:+966537430455">
                  <button className="bg-slate-900 text-white px-8 py-4 rounded-md font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2" data-testid="button-call">
                    <Phone className="w-5 h-5" />
                    {language === "ar" ? "اتصل بنا" : "Call Us"}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
