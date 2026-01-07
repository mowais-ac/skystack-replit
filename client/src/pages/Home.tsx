import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Check, Shield, Users, Zap, Target, Lightbulb, Code, Rocket, HeartHandshake, Award } from "lucide-react";
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
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
          </div>

          <div className="container-width">
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
              
              <motion.h1 variants={fadeIn} className="text-4xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.1] mb-8">
                {t("hero.title")}{" "}
                <span className="text-primary">{t("hero.titleHighlight")}</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                {t("hero.subtitle")}
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact-us">
                  <button className="btn-primary flex items-center justify-center gap-2 text-base lg:text-lg px-8 py-4" data-testid="button-hero-cta1">
                    {t("hero.cta1")} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/services">
                  <button className="btn-secondary text-base lg:text-lg px-8 py-4" data-testid="button-hero-cta2">
                    {t("hero.cta2")}
                  </button>
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeIn} className="mt-16 flex flex-wrap gap-6 items-center text-slate-500 text-sm">
                <span className="font-semibold text-slate-700">Trusted by:</span>
                <span className="trust-badge">Enterprise Clients</span>
                <span className="trust-badge">Saudi Vision 2030</span>
                <span className="trust-badge">ISO Certified</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-primary font-semibold tracking-wider uppercase text-sm">{t("about.title")}</span>
                <h2 className="section-heading mt-2">{t("about.subtitle")}</h2>
                <p className="section-subheading mt-4">{t("about.text")}</p>
                
                <div className="mt-8 p-6 bg-slate-50 rounded-md border-l-4 border-primary">
                  <h4 className="font-semibold text-slate-900 mb-2">{t("about.mission")}</h4>
                  <p className="text-slate-600">{t("about.missionText")}</p>
                </div>

                <Link href="/about-us">
                  <button className="btn-outline mt-8" data-testid="button-learn-more">
                    Learn More About Us
                  </button>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Years Experience", value: "10+" },
                  { label: "Projects Delivered", value: "500+" },
                  { label: "Happy Clients", value: "200+" },
                  { label: "Team Experts", value: "50+" },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-50 p-8 rounded-md text-center">
                    <div className="text-4xl lg:text-5xl font-bold text-primary mb-2" data-testid={`text-stat-${i}`}>{stat.value}</div>
                    <div className="text-slate-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">What We Do</span>
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
                  baseUrl="/services"
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/services">
                <button className="btn-primary inline-flex items-center gap-2" data-testid="button-view-all-services">
                  View All Services <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Sectors</span>
              <h2 className="section-heading mt-2">{t("industries.title")}</h2>
              <p className="section-subheading mx-auto mt-4">{t("industries.subtitle")}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {industries.map((industry, i) => (
                <div key={i} className="text-center p-6 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                  <industry.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-slate-900" data-testid={`text-industry-${i}`}>
                    {language === "ar" ? industry.titleAr : industry.title}
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    {language === "ar" ? industry.descriptionAr : industry.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 lg:py-28 bg-slate-900 text-white">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Why Us</span>
              <h2 className="section-heading mt-2 text-white">{t("whyUs.title")}</h2>
              <p className="text-slate-400 text-lg mt-4">{t("whyUs.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUsItems.map((item, i) => (
                <div key={i} className="bg-slate-800/50 p-8 rounded-md border border-slate-700 hover:border-primary/50 transition-colors">
                  <item.icon className="w-10 h-10 text-primary mb-6" />
                  <h4 className="text-xl font-semibold mb-3" data-testid={`text-whyus-${i}`}>{t(`whyUs.${item.key}`)}</h4>
                  <p className="text-slate-400">{t(`whyUs.${item.key}Text`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Our Process</span>
              <h2 className="section-heading mt-2">{t("process.title")}</h2>
              <p className="section-subheading mx-auto mt-4">{t("process.subtitle")}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {processSteps.map((step, i) => (
                <div key={i} className="relative text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-xs text-primary font-bold mb-1">{step.number}</div>
                  <h4 className="font-semibold text-slate-900" data-testid={`text-process-${i}`}>{t(`process.${step.key}`)}</h4>
                  <p className="text-sm text-slate-500 mt-1">{t(`process.${step.key}Text`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pre-Built Apps Section */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container-width">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-primary font-semibold tracking-wider uppercase text-sm">Quick Launch</span>
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
                  View All Solutions <ArrowRight className="w-5 h-5" />
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
                  baseUrl="/business-models"
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28">
          <div className="container-width">
            <div className="bg-primary rounded-md p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">{t("cta.title")}</h2>
                <p className="text-lg lg:text-xl text-blue-100 mb-10">{t("cta.subtitle")}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact-us">
                    <button className="bg-white text-primary px-8 py-4 rounded-md font-semibold text-lg hover:bg-blue-50 transition-all" data-testid="button-cta-call">
                      {t("cta.button1")}
                    </button>
                  </Link>
                  <Link href="/pricing">
                    <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-white/10 transition-all" data-testid="button-cta-quote">
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
