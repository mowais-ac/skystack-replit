import { useRoute, Link } from "wouter";
import { services, businessModels } from "@/lib/data";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import NotFound from "./not-found";
import { ArrowRight, Check } from "lucide-react";

interface DynamicPageProps {
  type: "service" | "businessModel";
}

export default function DynamicPage({ type }: DynamicPageProps) {
  const [match, params] = useRoute(type === "service" ? "/services/:slug" : "/business-models/:slug");
  const { language } = useLanguage();
  
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

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-slate-900 text-white pt-40 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          </div>
          
          <div className="container-width relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-sm font-medium mb-6 border border-primary/30">
                <Icon className="w-4 h-4" />
                {type === "service" 
                  ? (language === "ar" ? "خدمة" : "Service") 
                  : (language === "ar" ? "حل" : "Solution")}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4" data-testid="text-page-title">{title}</h1>
              <p className="text-lg text-primary font-medium mb-4">{subtitle}</p>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">{description}</p>
              
              <div className="mt-8">
                <Link href="/contact-us">
                  <button className="btn-primary inline-flex items-center gap-2" data-testid="button-hero-quote">
                    {language === "ar" ? "احصل على عرض سعر" : "Get a Quote"} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution */}
        <section className="py-20 lg:py-28">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-red-50 p-10 rounded-md border border-red-100">
                <h3 className="text-2xl font-bold text-red-900 mb-4">
                  {language === "ar" ? "التحدي" : "The Challenge"}
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">{problem}</p>
              </div>
              <div className="bg-green-50 p-10 rounded-md border border-green-100">
                <h3 className="text-2xl font-bold text-green-900 mb-4">
                  {language === "ar" ? "الحل" : "Our Solution"}
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">{solution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="section-heading mb-8">
                  {language === "ar" ? "الميزات الرئيسية" : "Key Features"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-md border border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-slate-700" data-testid={`text-feature-${i}`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="section-heading mb-8">
                  {language === "ar" ? "التقنيات المستخدمة" : "Technology Stack"}
                </h2>
                <div className="flex flex-wrap gap-3 mb-10">
                  {item.techStack.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-md text-slate-700 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="font-semibold text-slate-900 mb-4">
                  {language === "ar" ? "حالات الاستخدام" : "Use Cases"}
                </h3>
                <ul className="space-y-2">
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

        {/* Process */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-width">
            <h2 className="section-heading text-center mb-12">
              {language === "ar" ? "عملية التطوير" : "Development Process"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { step: "01", en: "Requirements Analysis", ar: "تحليل المتطلبات" },
                { step: "02", en: "Design & Prototyping", ar: "التصميم والنماذج" },
                { step: "03", en: "Agile Development", ar: "التطوير الرشيق" },
                { step: "04", en: "QA & Deployment", ar: "الاختبار والنشر" },
              ].map((s, i) => (
                <div key={i} className="text-center p-6 bg-slate-50 rounded-md">
                  <div className="text-3xl font-bold text-primary/20 mb-2">{s.step}</div>
                  <div className="font-semibold text-slate-900">{language === "ar" ? s.ar : s.en}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-primary text-white">
          <div className="container-width text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {language === "ar" ? `هل أنت مستعد لبناء ${title}؟` : `Ready to build your ${title}?`}
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              {language === "ar" 
                ? "تواصل مع فريقنا للحصول على عرض سعر مخصص ومناقشة متطلبات مشروعك."
                : "Contact our team for a custom quote and discuss your project requirements."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-us">
                <button className="bg-white text-primary px-10 py-4 rounded-md font-semibold text-lg hover:bg-blue-50 transition-all" data-testid="button-cta-quote">
                  {language === "ar" ? "احصل على عرض سعر الآن" : "Get a Quote Now"}
                </button>
              </Link>
              <Link href="/pricing">
                <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-md font-semibold text-lg hover:bg-white/10 transition-all" data-testid="button-cta-pricing">
                  {language === "ar" ? "عرض الأسعار" : "View Pricing"}
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
