import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.solutions": "Solutions",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact Us",
    "nav.getQuote": "Get a Quote",
    "nav.allServices": "All Services",
    "nav.preBuiltApps": "Pre-Built Apps",
    "nav.businessModels": "Business Models",
    
    "hero.badge": "Saudi-Based Technology Partner",
    "hero.title": "Enterprise Digital Solutions",
    "hero.titleHighlight": "That Drive Growth",
    "hero.subtitle": "We design and develop high-performance software solutions for enterprises across the Middle East and beyond. From custom applications to digital transformation.",
    "hero.cta1": "Get a Free Consultation",
    "hero.cta2": "View Our Services",
    
    "about.title": "Who We Are",
    "about.subtitle": "Your Trusted Technology Partner",
    "about.text": "SkyStack is a Saudi-based technology company delivering world-class software solutions. We combine local expertise with global best practices to help businesses thrive in the digital age.",
    "about.mission": "Our Mission",
    "about.missionText": "To empower enterprises with innovative, scalable, and secure digital solutions that drive measurable business outcomes.",
    
    "services.title": "Our Core Services",
    "services.subtitle": "Comprehensive digital solutions tailored to your business needs.",
    
    "industries.title": "Industries We Serve",
    "industries.subtitle": "Specialized solutions for diverse sectors across the region.",
    
    "whyUs.title": "Why Choose SkyStack",
    "whyUs.subtitle": "The partnership advantage that sets us apart.",
    "whyUs.saudi": "Saudi Presence, Global Delivery",
    "whyUs.saudiText": "Local understanding with international expertise",
    "whyUs.enterprise": "Enterprise-Grade Architecture",
    "whyUs.enterpriseText": "Scalable, secure, and built to last",
    "whyUs.partnership": "Long-Term Partnership",
    "whyUs.partnershipText": "We grow with you beyond project delivery",
    "whyUs.quality": "Uncompromising Quality",
    "whyUs.qualityText": "Excellence in every line of code",
    
    "process.title": "How We Work",
    "process.subtitle": "A proven methodology for successful project delivery.",
    "process.discovery": "Discovery",
    "process.discoveryText": "Understanding your business goals and requirements",
    "process.strategy": "Strategy",
    "process.strategyText": "Defining the roadmap and technical approach",
    "process.design": "Design",
    "process.designText": "Creating intuitive user experiences",
    "process.development": "Development",
    "process.developmentText": "Building with modern technologies",
    "process.launch": "Launch",
    "process.launchText": "Deploying with rigorous testing",
    "process.support": "Support",
    "process.supportText": "Ongoing maintenance and optimization",
    
    "prebuilt.title": "Pre-Built Solutions",
    "prebuilt.subtitle": "Accelerate your time to market with our ready-to-launch platforms.",
    "prebuilt.benefit1": "Faster Time-to-Market",
    "prebuilt.benefit2": "Proven Architecture",
    "prebuilt.benefit3": "Cost-Effective",
    "prebuilt.cta": "Request Demo",
    
    "cta.title": "Let's Build Your Product",
    "cta.subtitle": "Partner with us to transform your vision into reality. Schedule a strategy call with our experts.",
    "cta.button1": "Schedule a Strategy Call",
    "cta.button2": "Get a Free Quote",
    
    "footer.tagline": "Building the future of digital business in the Middle East and beyond.",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.legal": "Legal",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms & Conditions",
    
    "contact.title": "Contact Us",
    "contact.subtitle": "Let's discuss how we can help transform your business.",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.company": "Company Name",
    "contact.message": "Your Message",
    "contact.submit": "Send Message",
    "contact.location": "Riyadh, Saudi Arabia",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.services": "خدماتنا",
    "nav.solutions": "الحلول",
    "nav.pricing": "الأسعار",
    "nav.contact": "اتصل بنا",
    "nav.getQuote": "احصل على عرض سعر",
    "nav.allServices": "جميع الخدمات",
    "nav.preBuiltApps": "التطبيقات الجاهزة",
    "nav.businessModels": "نماذج الأعمال",
    
    "hero.badge": "شريكك التقني في السعودية",
    "hero.title": "حلول رقمية مؤسسية",
    "hero.titleHighlight": "تدفع النمو",
    "hero.subtitle": "نقوم بتصميم وتطوير حلول برمجية عالية الأداء للمؤسسات في الشرق الأوسط وخارجه. من التطبيقات المخصصة إلى التحول الرقمي.",
    "hero.cta1": "احصل على استشارة مجانية",
    "hero.cta2": "استعرض خدماتنا",
    
    "about.title": "من نحن",
    "about.subtitle": "شريكك التقني الموثوق",
    "about.text": "سكاي ستاك هي شركة تقنية سعودية تقدم حلولاً برمجية عالمية المستوى. نجمع بين الخبرة المحلية وأفضل الممارسات العالمية لمساعدة الشركات على الازدهار في العصر الرقمي.",
    "about.mission": "مهمتنا",
    "about.missionText": "تمكين المؤسسات بحلول رقمية مبتكرة وقابلة للتوسع وآمنة تحقق نتائج أعمال قابلة للقياس.",
    
    "services.title": "خدماتنا الأساسية",
    "services.subtitle": "حلول رقمية شاملة مصممة لتلبية احتياجات عملك.",
    
    "industries.title": "القطاعات التي نخدمها",
    "industries.subtitle": "حلول متخصصة لقطاعات متنوعة في المنطقة.",
    
    "whyUs.title": "لماذا تختار سكاي ستاك",
    "whyUs.subtitle": "ميزة الشراكة التي تميزنا.",
    "whyUs.saudi": "تواجد سعودي، تسليم عالمي",
    "whyUs.saudiText": "فهم محلي مع خبرة دولية",
    "whyUs.enterprise": "بنية مؤسسية",
    "whyUs.enterpriseText": "قابلة للتوسع وآمنة ومبنية لتدوم",
    "whyUs.partnership": "شراكة طويلة الأمد",
    "whyUs.partnershipText": "ننمو معك بعد تسليم المشروع",
    "whyUs.quality": "جودة لا تتنازل",
    "whyUs.qualityText": "التميز في كل سطر برمجي",
    
    "process.title": "كيف نعمل",
    "process.subtitle": "منهجية مثبتة لتسليم المشاريع بنجاح.",
    "process.discovery": "الاكتشاف",
    "process.discoveryText": "فهم أهداف عملك ومتطلباتك",
    "process.strategy": "الاستراتيجية",
    "process.strategyText": "تحديد خارطة الطريق والنهج التقني",
    "process.design": "التصميم",
    "process.designText": "إنشاء تجارب مستخدم بديهية",
    "process.development": "التطوير",
    "process.developmentText": "البناء بتقنيات حديثة",
    "process.launch": "الإطلاق",
    "process.launchText": "النشر مع اختبار دقيق",
    "process.support": "الدعم",
    "process.supportText": "صيانة وتحسين مستمر",
    
    "prebuilt.title": "الحلول الجاهزة",
    "prebuilt.subtitle": "سرّع وقت وصولك للسوق مع منصاتنا الجاهزة للإطلاق.",
    "prebuilt.benefit1": "وقت أسرع للسوق",
    "prebuilt.benefit2": "بنية مثبتة",
    "prebuilt.benefit3": "فعالة من حيث التكلفة",
    "prebuilt.cta": "اطلب عرض توضيحي",
    
    "cta.title": "لنبني منتجك",
    "cta.subtitle": "شاركنا لتحويل رؤيتك إلى واقع. جدول مكالمة استراتيجية مع خبرائنا.",
    "cta.button1": "جدول مكالمة استراتيجية",
    "cta.button2": "احصل على عرض سعر مجاني",
    
    "footer.tagline": "نبني مستقبل الأعمال الرقمية في الشرق الأوسط وخارجه.",
    "footer.quickLinks": "روابط سريعة",
    "footer.services": "الخدمات",
    "footer.legal": "قانوني",
    "footer.contact": "اتصل",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "الشروط والأحكام",
    
    "contact.title": "اتصل بنا",
    "contact.subtitle": "دعنا نناقش كيف يمكننا المساعدة في تحويل عملك.",
    "contact.name": "الاسم الكامل",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "رقم الهاتف",
    "contact.company": "اسم الشركة",
    "contact.message": "رسالتك",
    "contact.submit": "إرسال الرسالة",
    "contact.location": "الرياض، المملكة العربية السعودية",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || "en";
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
