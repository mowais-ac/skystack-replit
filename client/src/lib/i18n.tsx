import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

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
    "hero.title": "Build & Modernize",
    "hero.titleHighlight": "Business Software",
    "hero.subtitle": "We help Saudi companies build and modernize business software to automate operations and reduce manual work.",
    
    "transformation.title": "Saudi Market Transformation",
    "transformation.subtitle": "Empowering Saudi businesses to embrace digital excellence",
    "transformation.automation": "Process Automation",
    "transformation.automationText": "Eliminate repetitive manual tasks and streamline workflows with intelligent automation solutions",
    "transformation.efficiency": "Operational Efficiency",
    "transformation.efficiencyText": "Reduce operational costs by up to 60% through digital transformation and smart systems",
    "transformation.growth": "Business Growth",
    "transformation.growthText": "Solutions designed to accelerate your digital transformation journey",
    
    "saudiIndustries.title": "Industries We Transform",
    "saudiIndustries.subtitle": "Specialized solutions for key Saudi market sectors",
    "saudiIndustries.oilgas": "Oil & Gas",
    "saudiIndustries.oilgasText": "Digital oilfield solutions, asset management, and predictive maintenance systems",
    "saudiIndustries.retail": "Retail & E-commerce",
    "saudiIndustries.retailText": "Omnichannel platforms, inventory automation, and customer engagement systems",
    "saudiIndustries.healthcare": "Healthcare",
    "saudiIndustries.healthcareText": "Patient management systems, telemedicine platforms, and health record digitization",
    "saudiIndustries.finance": "Banking & Finance",
    "saudiIndustries.financeText": "Digital banking solutions, fintech platforms, and regulatory compliance systems",
    "saudiIndustries.logistics": "Logistics & Supply Chain",
    "saudiIndustries.logisticsText": "Fleet management, warehouse automation, and real-time tracking solutions",
    "saudiIndustries.realestate": "Real Estate & Construction",
    "saudiIndustries.realestateText": "Property management systems, smart building solutions, and project tracking",
    
    "leadForm.title": "Start Your Digital Transformation",
    "leadForm.subtitle": "Get a free consultation and discover how we can automate your business operations",
    "leadForm.name": "Full Name",
    "leadForm.email": "Work Email",
    "leadForm.phone": "Phone Number",
    "leadForm.company": "Company Name",
    "leadForm.industry": "Industry",
    "leadForm.challenge": "What's your biggest operational challenge?",
    "leadForm.submit": "Get Free Consultation",
    "leadForm.privacy": "We respect your privacy. Your information is secure.",
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
    "hero.title": "بناء وتحديث",
    "hero.titleHighlight": "البرمجيات التجارية",
    "hero.subtitle": "نساعد الشركات السعودية في بناء وتحديث البرمجيات التجارية لأتمتة العمليات وتقليل العمل اليدوي.",
    "hero.cta1": "احصل على استشارة مجانية",
    "hero.cta2": "استعرض خدماتنا",
    
    "transformation.title": "التحول في السوق السعودي",
    "transformation.subtitle": "تمكين الشركات السعودية لتبني التميز الرقمي",
    "transformation.automation": "أتمتة العمليات",
    "transformation.automationText": "القضاء على المهام اليدوية المتكررة وتبسيط سير العمل بحلول الأتمتة الذكية",
    "transformation.efficiency": "الكفاءة التشغيلية",
    "transformation.efficiencyText": "تقليل التكاليف التشغيلية بنسبة تصل إلى 60% من خلال التحول الرقمي والأنظمة الذكية",
    "transformation.growth": "نمو الأعمال",
    "transformation.growthText": "حلول مصممة لتسريع رحلة التحول الرقمي الخاصة بك",
    
    "saudiIndustries.title": "الصناعات التي نحولها",
    "saudiIndustries.subtitle": "حلول متخصصة لقطاعات السوق السعودي الرئيسية",
    "saudiIndustries.oilgas": "النفط والغاز",
    "saudiIndustries.oilgasText": "حلول الحقول النفطية الرقمية وإدارة الأصول وأنظمة الصيانة التنبؤية",
    "saudiIndustries.retail": "التجزئة والتجارة الإلكترونية",
    "saudiIndustries.retailText": "منصات متعددة القنوات وأتمتة المخزون وأنظمة إشراك العملاء",
    "saudiIndustries.healthcare": "الرعاية الصحية",
    "saudiIndustries.healthcareText": "أنظمة إدارة المرضى ومنصات الطب عن بعد ورقمنة السجلات الصحية",
    "saudiIndustries.finance": "البنوك والتمويل",
    "saudiIndustries.financeText": "حلول البنوك الرقمية ومنصات التقنية المالية وأنظمة الامتثال التنظيمي",
    "saudiIndustries.logistics": "اللوجستيات وسلسلة التوريد",
    "saudiIndustries.logisticsText": "إدارة الأسطول وأتمتة المستودعات وحلول التتبع في الوقت الفعلي",
    "saudiIndustries.realestate": "العقارات والبناء",
    "saudiIndustries.realestateText": "أنظمة إدارة الممتلكات وحلول المباني الذكية وتتبع المشاريع",
    
    "leadForm.title": "ابدأ تحولك الرقمي",
    "leadForm.subtitle": "احصل على استشارة مجانية واكتشف كيف يمكننا أتمتة عمليات عملك",
    "leadForm.name": "الاسم الكامل",
    "leadForm.email": "البريد الإلكتروني للعمل",
    "leadForm.phone": "رقم الهاتف",
    "leadForm.company": "اسم الشركة",
    "leadForm.industry": "القطاع",
    "leadForm.challenge": "ما هو أكبر تحدٍ تشغيلي لديك؟",
    "leadForm.submit": "احصل على استشارة مجانية",
    "leadForm.privacy": "نحترم خصوصيتك. معلوماتك آمنة.",
    
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

function LanguageSelectionModal({ 
  open, 
  onSelect 
}: { 
  open: boolean; 
  onSelect: (lang: Language) => void;
}) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0" data-testid="modal-language-selection">
        <div className="bg-gradient-to-br from-primary to-blue-700 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to SkyStack</h2>
          <p className="text-blue-100">أهلاً بك في سكاي ستاك</p>
        </div>
        
        <div className="p-8">
          <p className="text-center text-slate-600 mb-6">
            Please select your preferred language<br />
            <span className="text-slate-500">يرجى اختيار لغتك المفضلة</span>
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="lg"
              className="h-24 flex-col gap-2 border-2 hover:border-primary hover:bg-primary/5"
              onClick={() => onSelect("en")}
              data-testid="button-select-english"
            >
              <span className="text-2xl">🇬🇧</span>
              <span className="font-semibold">English</span>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="h-24 flex-col gap-2 border-2 hover:border-primary hover:bg-primary/5"
              onClick={() => onSelect("ar")}
              data-testid="button-select-arabic"
            >
              <span className="text-2xl">🇸🇦</span>
              <span className="font-semibold">العربية</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [showSelector, setShowSelector] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    const hasVisited = localStorage.getItem("hasVisited");
    
    if (savedLang) {
      setLanguageState(savedLang);
    } else if (!hasVisited) {
      setShowSelector(true);
    }
    setInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    localStorage.setItem("hasVisited", "true");
    setShowSelector(false);
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.body.style.fontFamily = language === "ar" 
      ? "'Cairo', 'Inter', sans-serif" 
      : "'Inter', sans-serif";
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  if (!initialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <LanguageSelectionModal open={showSelector} onSelect={setLanguage} />
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
