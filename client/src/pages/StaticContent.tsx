import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { ArrowRight, Shield, Target, Users, Award, Globe, Lightbulb, Code, Zap, Heart, Rocket, CheckCircle2, Building2, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";

interface StaticContentProps {
  type: "about" | "privacy" | "terms";
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function StaticContent({ type }: StaticContentProps) {
  const { language } = useLanguage();

  const content = {
    about: {
      title: language === "ar" ? "من نحن" : "About Us",
      subtitle: language === "ar" ? "شريكك التقني الموثوق في المملكة العربية السعودية" : "Your Trusted Technology Partner in Saudi Arabia",
    },
    privacy: {
      title: language === "ar" ? "سياسة الخصوصية" : "Privacy Policy",
      subtitle: language === "ar" ? "آخر تحديث: يناير 2026" : "Last Updated: January 2026",
    },
    terms: {
      title: language === "ar" ? "الشروط والأحكام" : "Terms & Conditions",
      subtitle: language === "ar" ? "آخر تحديث: يناير 2026" : "Last Updated: January 2026",
    }
  };

  const data = content[type];

  const stats = [
    { value: "10+", label: language === "ar" ? "سنوات الخبرة" : "Years Experience", icon: Clock },
    { value: "500+", label: language === "ar" ? "المشاريع المنجزة" : "Projects Delivered", icon: CheckCircle2 },
    { value: "200+", label: language === "ar" ? "العملاء السعداء" : "Happy Clients", icon: Building2 },
    { value: "50+", label: language === "ar" ? "خبراء الفريق" : "Team Experts", icon: Users },
  ];

  const values = [
    { 
      icon: Award, 
      title: language === "ar" ? "التميز" : "Excellence", 
      text: language === "ar" ? "نسعى للكمال في كل مشروع نقدمه" : "We strive for perfection in every project we deliver",
      gradient: "from-amber-500 to-orange-600"
    },
    { 
      icon: Shield, 
      title: language === "ar" ? "الشفافية" : "Transparency", 
      text: language === "ar" ? "التواصل المفتوح والصادق مع عملائنا" : "Open and honest communication with our clients",
      gradient: "from-emerald-500 to-teal-600"
    },
    { 
      icon: Lightbulb, 
      title: language === "ar" ? "الابتكار" : "Innovation", 
      text: language === "ar" ? "نتبنى أحدث التقنيات لحلول مستقبلية" : "Embracing cutting-edge tech for future-proof solutions",
      gradient: "from-violet-500 to-purple-600"
    },
    { 
      icon: Heart, 
      title: language === "ar" ? "الشراكة" : "Partnership", 
      text: language === "ar" ? "نجاحك هو نجاحنا ونمونا معاً" : "Your success is our success, we grow together",
      gradient: "from-rose-500 to-pink-600"
    },
  ];

  const whyUs = [
    { icon: Code, title: language === "ar" ? "خبرة تقنية عميقة" : "Deep Technical Expertise", desc: language === "ar" ? "فريق من المهندسين ذوي الخبرة في أحدث التقنيات" : "Team of engineers experienced in cutting-edge technologies" },
    { icon: Zap, title: language === "ar" ? "تسليم سريع" : "Fast Delivery", desc: language === "ar" ? "منهجية أجايل لتسليم المشاريع في الوقت المحدد" : "Agile methodology for on-time project delivery" },
    { icon: TrendingUp, title: language === "ar" ? "حلول قابلة للتوسع" : "Scalable Solutions", desc: language === "ar" ? "بنية تحتية تنمو مع نمو أعمالك" : "Infrastructure that grows with your business" },
    { icon: Globe, title: language === "ar" ? "دعم على مدار الساعة" : "24/7 Support", desc: language === "ar" ? "فريق دعم متاح دائماً لمساعدتك" : "Support team always available to help you" },
  ];

  const seoContent = {
    about: {
      title: "About Us",
      titleAr: "من نحن",
      description: "SkyStack is a leading Saudi technology company specializing in enterprise software development and digital transformation. Learn about our mission, values, and team.",
      descriptionAr: "سكاي ستاك هي شركة تقنية سعودية رائدة متخصصة في تطوير البرمجيات المؤسسية والتحول الرقمي. تعرف على مهمتنا وقيمنا وفريقنا.",
      keywords: "about SkyStack, Saudi tech company, software development company Riyadh, enterprise software Saudi Arabia",
      keywordsAr: "عن سكاي ستاك، شركة تقنية سعودية، شركة تطوير برمجيات الرياض، برمجيات المؤسسات السعودية",
      canonicalUrl: "/about-us"
    },
    privacy: {
      title: "Privacy Policy",
      titleAr: "سياسة الخصوصية",
      description: "SkyStack's privacy policy. Learn how we collect, use, and protect your personal information.",
      descriptionAr: "سياسة الخصوصية لسكاي ستاك. تعرف على كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية.",
      keywords: "privacy policy, data protection, SkyStack privacy",
      keywordsAr: "سياسة الخصوصية، حماية البيانات، خصوصية سكاي ستاك",
      canonicalUrl: "/privacy-policy"
    },
    terms: {
      title: "Terms & Conditions",
      titleAr: "الشروط والأحكام",
      description: "SkyStack's terms and conditions. Read our service agreement and usage policies.",
      descriptionAr: "الشروط والأحكام لسكاي ستاك. اقرأ اتفاقية الخدمة وسياسات الاستخدام.",
      keywords: "terms and conditions, service agreement, SkyStack terms",
      keywordsAr: "الشروط والأحكام، اتفاقية الخدمة، شروط سكاي ستاك",
      canonicalUrl: "/terms-condition"
    }
  };

  const currentSeo = seoContent[type];

  if (type === "about") {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO 
          title={currentSeo.title}
          titleAr={currentSeo.titleAr}
          description={currentSeo.description}
          descriptionAr={currentSeo.descriptionAr}
          keywords={currentSeo.keywords}
          keywordsAr={currentSeo.keywordsAr}
          canonicalUrl={currentSeo.canonicalUrl}
        />
        <Navigation />
        
        <main className="flex-grow">
          {/* Premium Hero */}
          <section className="relative min-h-[80vh] flex items-center bg-slate-950 text-white overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,60,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,60,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
              <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
              <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>
            
            <div className="container-width relative z-10 py-32">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="max-w-4xl mx-auto text-center"
              >
                <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium text-sm mb-8 border border-white/10">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  {language === "ar" ? "شريكك التقني الموثوق" : "Your Trusted Technology Partner"}
                </motion.div>
                
                <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }} data-testid="text-about-title">
                  {language === "ar" ? "نبني " : "We Build "}
                  <span className="gradient-text">{language === "ar" ? "المستقبل الرقمي" : "Digital Future"}</span>
                </motion.h1>
                
                <motion.p variants={fadeIn} className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                  {language === "ar" 
                    ? "سكاي ستاك هي شركة تقنية سعودية رائدة متخصصة في تطوير البرمجيات المؤسسية وحلول التحول الرقمي."
                    : "SkyStack is a leading Saudi technology company specializing in enterprise software development and digital transformation solutions."}
                </motion.p>

                {/* Stats in hero */}
                <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-6 text-center">
                      <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                      <div className="text-slate-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Story Section - Premium */}
          <section className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 -right-20 w-[300px] h-[300px] bg-blue-100/50 rounded-full blur-3xl" />
            </div>
            <div className="container-width relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <span className="section-eyebrow">
                    {language === "ar" ? "قصتنا" : "Our Story"}
                  </span>
                  <h2 className="section-heading mt-3 mb-6">
                    {language === "ar" ? "رحلة نحو التميز التقني" : "A Journey Towards Technical Excellence"}
                  </h2>
                  <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                    <p>
                      {language === "ar" 
                        ? "تأسست سكاي ستاك في قلب المملكة العربية السعودية برؤية واضحة: تمكين الشركات من خلال حلول تقنية مبتكرة تلبي متطلبات العصر الرقمي."
                        : "SkyStack was founded in the heart of Saudi Arabia with a clear vision: to empower businesses through innovative technology solutions that meet the demands of the digital age."}
                    </p>
                    <p>
                      {language === "ar"
                        ? "نجمع بين الخبرة المحلية العميقة وأفضل الممارسات العالمية لتقديم حلول برمجية عالمية المستوى للمؤسسات في الشرق الأوسط وخارجه."
                        : "We combine deep local expertise with global best practices to deliver world-class software solutions for enterprises across the Middle East and beyond."}
                    </p>
                    <p>
                      {language === "ar"
                        ? "فريقنا من المهندسين والمصممين والاستراتيجيين ملتزمون بدفع حدود ما هو ممكن في التكنولوجيا."
                        : "Our team of engineers, designers, and strategists are committed to pushing the boundaries of what's possible in technology."}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-8">
                    <Link href="/services">
                      <button className="btn-primary-gradient inline-flex items-center gap-2" data-testid="button-about-services">
                        {language === "ar" ? "استكشف خدماتنا" : "Explore Our Services"} <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                </div>
                
                {/* Why Choose Us Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {whyUs.map((item, i) => (
                    <div key={i} className="group bg-white p-6 rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                      <div className="icon-badge mb-4 group-hover:shadow-primary/30 transition-all">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Vision & Mission - Premium Dark */}
          <section className="py-24 lg:py-32 bg-slate-950 text-white relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,60,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,60,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
            <div className="container-width relative z-10">
              <div className="text-center mb-16">
                <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">
                  {language === "ar" ? "رؤيتنا ومهمتنا" : "Vision & Mission"}
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold mt-4 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {language === "ar" ? "نحو مستقبل رقمي أفضل" : "Towards a Better Digital Future"}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-sm p-10 rounded-md border border-white/10 hover:border-primary/40 transition-all group">
                  <div className="w-16 h-16 rounded-md bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mb-6 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {language === "ar" ? "رؤيتنا" : "Our Vision"}
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {language === "ar"
                      ? "أن نكون الشريك التقني الأول للمؤسسات في المنطقة، ندفع التحول الرقمي ونمكّن النمو المستدام من خلال حلول مبتكرة تتجاوز التوقعات."
                      : "To be the leading technology partner for enterprises in the region, driving digital transformation and enabling sustainable growth through innovative solutions that exceed expectations."}
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-10 rounded-md border border-white/10 hover:border-primary/40 transition-all group">
                  <div className="w-16 h-16 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6 group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {language === "ar" ? "مهمتنا" : "Our Mission"}
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {language === "ar"
                      ? "تمكين المؤسسات بحلول رقمية مبتكرة وقابلة للتوسع وآمنة تحقق نتائج أعمال قابلة للقياس وتدفع عجلة النمو."
                      : "To empower enterprises with innovative, scalable, and secure digital solutions that drive measurable business outcomes and accelerate growth."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values - Premium */}
          <section className="py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            </div>
            <div className="container-width relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="section-eyebrow">
                  {language === "ar" ? "قيمنا الأساسية" : "Our Core Values"}
                </span>
                <h2 className="section-heading mt-3">
                  {language === "ar" ? "المبادئ التي توجهنا" : "The Principles That Guide Us"}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, i) => (
                  <div key={i} className="group text-center p-8 bg-white rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                    <div className={`w-16 h-16 rounded-md bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl transition-all group-hover:-translate-y-1`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-primary transition-colors">{value.title}</h4>
                    <p className="text-slate-600">{value.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA - Premium */}
          <section className="py-24 lg:py-32 bg-gradient-to-r from-primary to-blue-700 text-white relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>
            <div className="container-width text-center relative z-10">
              <Globe className="w-20 h-20 text-white/80 mx-auto mb-8" />
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {language === "ar" ? "تواجد سعودي، تسليم عالمي" : "Saudi Presence, Global Delivery"}
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                {language === "ar"
                  ? "مقرنا في الرياض، نخدم العملاء في جميع أنحاء الشرق الأوسط وأوروبا وأمريكا الشمالية. فريقنا متاح على مدار الساعة لدعم أعمالك."
                  : "Headquartered in Riyadh, we serve clients across the Middle East, Europe, and North America. Our team is available 24/7 to support your business."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact-us">
                  <button className="bg-white text-primary px-8 py-4 rounded-md font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all inline-flex items-center gap-2" data-testid="button-about-cta">
                    {language === "ar" ? "تواصل معنا" : "Get in Touch"} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <a href="https://wa.me/966537430455" target="_blank" rel="noopener noreferrer">
                  <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-md font-semibold hover:bg-white/20 transition-all inline-flex items-center gap-2" data-testid="button-about-whatsapp">
                    {language === "ar" ? "واتساب" : "WhatsApp"}
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

  // Privacy & Terms pages
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={currentSeo.title}
        titleAr={currentSeo.titleAr}
        description={currentSeo.description}
        descriptionAr={currentSeo.descriptionAr}
        keywords={currentSeo.keywords}
        keywordsAr={currentSeo.keywordsAr}
        canonicalUrl={currentSeo.canonicalUrl}
      />
      <Navigation />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container-width max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4" data-testid="text-legal-title">{data.title}</h1>
          <p className="text-slate-500 mb-12 text-lg">{data.subtitle}</p>
          
          <div className="prose prose-lg prose-slate max-w-none">
            {type === "privacy" && (
              <>
                <p className="mb-6">
                  {language === "ar"
                    ? "خصوصيتك مهمة بالنسبة لنا. من سياستنا احترام خصوصيتك فيما يتعلق بأي معلومات قد نجمعها منك عبر موقعنا الإلكتروني."
                    : "Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website."}
                </p>
                <h3 className="text-xl font-bold mt-8 mb-4">
                  {language === "ar" ? "1. المعلومات التي نجمعها" : "1. Information We Collect"}
                </h3>
                <p className="mb-4">
                  {language === "ar"
                    ? "نطلب المعلومات الشخصية فقط عندما نحتاجها حقًا لتقديم خدمة لك. نجمعها بوسائل عادلة وقانونية، بمعرفتك وموافقتك."
                    : "We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent."}
                </p>
                <h3 className="text-xl font-bold mt-8 mb-4">
                  {language === "ar" ? "2. كيف نستخدم المعلومات" : "2. How We Use Information"}
                </h3>
                <p className="mb-4">
                  {language === "ar"
                    ? "نستخدم معلوماتك لتقديم وتشغيل وصيانة موقعنا، وتحسين وتخصيص وتوسيع موقعنا، وفهم وتحليل كيفية استخدامك لموقعنا."
                    : "We use your information to provide, operate, and maintain our website, improve, personalize, and expand our website, and understand and analyze how you use our website."}
                </p>
                <h3 className="text-xl font-bold mt-8 mb-4">
                  {language === "ar" ? "3. أمان البيانات" : "3. Data Security"}
                </h3>
                <p className="mb-4">
                  {language === "ar"
                    ? "نحن ملتزمون بحماية بياناتك. نستخدم مجموعة متنوعة من التدابير الأمنية لحماية معلوماتك الشخصية."
                    : "We are committed to protecting your data. We use a variety of security measures to protect your personal information."}
                </p>
              </>
            )}
            
            {type === "terms" && (
              <>
                <p className="mb-6">
                  {language === "ar"
                    ? "بالوصول إلى هذا الموقع، فإنك توافق على الالتزام بشروط الخدمة هذه وجميع القوانين واللوائح المعمول بها."
                    : "By accessing this website, you agree to be bound by these terms of service, all applicable laws and regulations."}
                </p>
                <h3 className="text-xl font-bold mt-8 mb-4">
                  {language === "ar" ? "1. الترخيص" : "1. License"}
                </h3>
                <p className="mb-4">
                  {language === "ar"
                    ? "يُمنح إذن بتنزيل نسخة واحدة مؤقتًا من المواد (المعلومات أو البرامج) على موقعنا للاستخدام الشخصي غير التجاري فقط."
                    : "Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only."}
                </p>
                <h3 className="text-xl font-bold mt-8 mb-4">
                  {language === "ar" ? "2. إخلاء المسؤولية" : "2. Disclaimer"}
                </h3>
                <p className="mb-4">
                  {language === "ar"
                    ? "المواد الموجودة على موقعنا مقدمة على أساس 'كما هي'. لا نقدم أي ضمانات صريحة أو ضمنية."
                    : "The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied."}
                </p>
                <h3 className="text-xl font-bold mt-8 mb-4">
                  {language === "ar" ? "3. القيود" : "3. Limitations"}
                </h3>
                <p className="mb-4">
                  {language === "ar"
                    ? "لن نكون مسؤولين عن أي أضرار تنشأ عن استخدام أو عدم القدرة على استخدام المواد الموجودة على موقعنا."
                    : "We shall not be held liable for any damages that arise from the use or inability to use the materials on our website."}
                </p>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
