import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Phone, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { services, businessModels } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import logo from "@assets/logo_1767806484099.png";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-white py-4"
      }`}
    >
      <div className="container-width flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 z-50 shrink-0">
          <img src={logo} alt="SkyStack" className="h-9 w-auto object-contain" data-testid="img-logo" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 font-medium text-sm text-slate-700">
          <Link href="/" className="hover:text-primary transition-colors" data-testid="link-home">
            {t("nav.home")}
          </Link>
          <Link href="/about-us" className="hover:text-primary transition-colors" data-testid="link-about">
            {t("nav.about")}
          </Link>
          
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-primary transition-colors py-2" data-testid="button-services-dropdown">
              {t("nav.services")} <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-72">
              <div className="bg-white rounded-md shadow-xl border border-slate-100 p-2 overflow-hidden">
                <Link href="/services" className="block px-4 py-2.5 rounded-md hover:bg-slate-50 hover:text-primary font-semibold" data-testid="link-all-services">
                  {t("nav.allServices")}
                </Link>
                <div className="h-px bg-slate-100 my-1"></div>
                {services.slice(0, 6).map((s) => (
                  <Link 
                    key={s.slug} 
                    href={`/services/${s.slug}`} 
                    className="block px-4 py-2 rounded-md hover:bg-slate-50 hover:text-primary text-sm"
                    data-testid={`link-service-${s.slug}`}
                  >
                    {language === "ar" ? s.titleAr : s.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-primary transition-colors py-2" data-testid="button-solutions-dropdown">
              {t("nav.solutions")} <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-72">
              <div className="bg-white rounded-md shadow-xl border border-slate-100 p-2 overflow-hidden">
                <Link href="/pre-built-apps" className="block px-4 py-2.5 rounded-md hover:bg-slate-50 hover:text-primary font-semibold" data-testid="link-prebuilt-apps">
                  {t("nav.preBuiltApps")}
                </Link>
                <Link href="/business-models" className="block px-4 py-2.5 rounded-md hover:bg-slate-50 hover:text-primary font-semibold" data-testid="link-business-models">
                  {t("nav.businessModels")}
                </Link>
                <div className="h-px bg-slate-100 my-1"></div>
                {businessModels.slice(0, 5).map((m) => (
                  <Link 
                    key={m.slug} 
                    href={`/business-models/${m.slug}`} 
                    className="block px-4 py-2 rounded-md hover:bg-slate-50 hover:text-primary text-sm"
                    data-testid={`link-solution-${m.slug}`}
                  >
                    {language === "ar" ? m.titleAr : m.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/services/outsourcing" className="hover:text-primary transition-colors" data-testid="link-outsourcing">
            {language === "ar" ? "التعهيد" : "Outsourcing"}
          </Link>
          <Link href="/contact-us" className="hover:text-primary transition-colors" data-testid="link-contact">
            {t("nav.contact")}
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors rounded-md hover:bg-slate-50"
            data-testid="button-language-toggle"
          >
            <Globe className="w-4 h-4" />
            {language === "en" ? "العربية" : "English"}
          </button>
          
          <Link href="/contact-us">
            <button className="bg-primary text-white px-5 py-2.5 rounded-md hover:opacity-90 transition-all shadow-lg shadow-primary/20 font-semibold flex items-center gap-2" data-testid="button-get-quote">
              <Phone className="w-4 h-4" /> {t("nav.getQuote")}
            </button>
          </Link>
        </div>

        <button 
          className="lg:hidden z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-mobile-menu"
        >
          {isOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 bg-white z-40 lg:hidden overflow-y-auto"
          >
            <div className="p-6 flex flex-col gap-4 text-base font-medium">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-3 bg-slate-100 rounded-md text-slate-700"
                data-testid="button-mobile-language"
              >
                <Globe className="w-5 h-5" />
                {language === "en" ? "العربية" : "English"}
              </button>

              <Link href="/" className="border-b border-slate-100 pb-4">{t("nav.home")}</Link>
              <Link href="/about-us" className="border-b border-slate-100 pb-4">{t("nav.about")}</Link>
              
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <div className="text-slate-400 text-xs uppercase tracking-wider font-bold">{t("nav.services")}</div>
                <Link href="/services" className="block pl-2 text-primary font-semibold">{t("nav.allServices")}</Link>
                {services.map(s => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="block pl-2 text-slate-600">
                    {language === "ar" ? s.titleAr : s.title}
                  </Link>
                ))}
              </div>

              <div className="space-y-2 border-b border-slate-100 pb-4">
                <div className="text-slate-400 text-xs uppercase tracking-wider font-bold">{t("nav.solutions")}</div>
                <Link href="/pre-built-apps" className="block pl-2 text-primary font-semibold">{t("nav.preBuiltApps")}</Link>
                {businessModels.map(m => (
                  <Link key={m.slug} href={`/business-models/${m.slug}`} className="block pl-2 text-slate-600">
                    {language === "ar" ? m.titleAr : m.title}
                  </Link>
                ))}
              </div>

              <Link href="/services/outsourcing" className="border-b border-slate-100 pb-4">{language === "ar" ? "التعهيد" : "Outsourcing"}</Link>
              
              <Link href="/contact-us" className="bg-primary text-white text-center py-4 rounded-md font-bold mt-2">
                {t("nav.getQuote")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
