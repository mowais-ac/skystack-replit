import { services, businessModels } from "@/lib/data";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

interface ServicesListProps {
  type: "service" | "businessModel";
}

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-slate-900 text-white pt-40 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          </div>
          
          <div className="container-width relative z-10">
            <div className="max-w-3xl">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                {isService ? t("nav.services") : t("nav.solutions")}
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold mt-4 mb-6" data-testid="text-list-title">{title}</h1>
              <p className="text-xl text-slate-300 leading-relaxed">{subtitle}</p>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container-width">
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
        
        {/* CTA */}
        <section className="py-20 lg:py-28 bg-white text-center">
          <div className="container-width">
            <h2 className="section-heading mb-6">
              {language === "ar" ? "لا ترى ما تحتاجه؟" : "Don't see what you need?"}
            </h2>
            <p className="text-slate-600 mb-10 max-w-2xl mx-auto text-lg">
              {language === "ar" 
                ? "نحن متخصصون في تطوير البرمجيات المخصصة. تواصل معنا لمناقشة متطلباتك الفريدة."
                : "We specialize in custom software development. Contact us to discuss your unique requirements."}
            </p>
            <Link href="/contact-us">
              <button className="btn-primary inline-flex items-center gap-2" data-testid="button-contact-team">
                {language === "ar" ? "تواصل مع فريقنا" : "Contact Our Team"} <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
