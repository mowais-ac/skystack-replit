import { Link } from "wouter";
import { ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { engagementModels } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { SEO } from "@/components/SEO";

export default function BusinessModels() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <SEO 
        title="Business Models & Engagement"
        titleAr="نماذج الأعمال والتعاون"
        description="Choose the right engagement model for your project. Fixed price, time & materials, or dedicated team options available for Saudi businesses."
        descriptionAr="اختر نموذج التعاون المناسب لمشروعك. خيارات السعر الثابت أو الوقت والمواد أو الفريق المخصص متاحة للشركات السعودية."
        keywords="business models, engagement models, fixed price development, dedicated team, software outsourcing Saudi Arabia"
        keywordsAr="نماذج الأعمال، نماذج التعاون، تطوير بسعر ثابت، فريق مخصص، الاستعانة بمصادر خارجية للبرمجيات السعودية"
        canonicalUrl="/business-models"
      />
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-slate-900 text-white pt-40 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          </div>
          
          <div className="container-width relative z-10">
            <div className="max-w-3xl">
              <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">
                {language === "ar" ? "نماذج التعاون" : "Engagement Models"}
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold mt-4 mb-6">
                {language === "ar" ? "نماذج الأعمال" : "Business Models"}
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                {language === "ar" 
                  ? "اختر نموذج التعاون الذي يناسب مشروعك وميزانيتك ومتطلباتك."
                  : "Choose the engagement model that best fits your project scope, budget, and requirements."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/contact-us">
                  <button className="btn-primary-gradient inline-flex items-center justify-center gap-2" data-testid="button-hero-consultation">
                    {language === "ar" ? "احجز استشارة مجانية" : "Book Free Consultation"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <a href="https://wa.me/966537430455" target="_blank" rel="noopener noreferrer">
                  <button className="bg-white/10 border border-white/20 px-6 py-3 rounded-md font-semibold inline-flex items-center gap-2 hover:bg-white/20 transition-all" data-testid="button-hero-whatsapp">
                    <MessageCircle className="w-4 h-4" />
                    {language === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Models Grid */}
        <section className="py-20 lg:py-28">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {engagementModels.map((model, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-md p-8 hover:shadow-lg hover:border-primary/30 transition-all">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mb-6">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3" data-testid={`text-model-title-${i}`}>
                    {language === "ar" ? model.titleAr : model.title}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {language === "ar" ? model.descriptionAr : model.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {(language === "ar" ? model.featuresAr : model.features).map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="section-heading">
                {language === "ar" ? "مقارنة نماذج التعاون" : "Model Comparison"}
              </h2>
              <p className="section-subheading mx-auto mt-4">
                {language === "ar" 
                  ? "اختر النموذج المناسب لمشروعك"
                  : "Choose the right model for your project needs"}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-md border border-slate-200">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-4 font-semibold text-slate-900">
                      {language === "ar" ? "المعيار" : "Criteria"}
                    </th>
                    {engagementModels.map((model, i) => (
                      <th key={i} className="text-center p-4 font-semibold text-slate-900">
                        {language === "ar" ? model.titleAr : model.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { en: "Scope Flexibility", ar: "مرونة النطاق", values: ["Fixed", "Flexible", "Highly Flexible"] },
                    { en: "Budget Control", ar: "التحكم بالميزانية", values: ["Predictable", "Variable", "Variable"] },
                    { en: "Timeline", ar: "الجدول الزمني", values: ["Fixed", "Long-term", "Agile"] },
                    { en: "Communication", ar: "التواصل", values: ["Milestone-based", "Daily/Weekly", "Continuous"] },
                    { en: "Best For", ar: "الأفضل لـ", values: ["Clear requirements", "Ongoing projects", "Evolving scope"] },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0">
                      <td className="p-4 font-medium text-slate-700">
                        {language === "ar" ? row.ar : row.en}
                      </td>
                      {row.values.map((value, j) => (
                        <td key={j} className="p-4 text-center text-slate-600">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28">
          <div className="container-width text-center">
            <h2 className="section-heading mb-6">
              {language === "ar" ? "هل أنت مستعد للبدء؟" : "Ready to Get Started?"}
            </h2>
            <p className="section-subheading mx-auto mb-10">
              {language === "ar" 
                ? "تحدث مع خبرائنا لتحديد أفضل نموذج تعاون لمشروعك."
                : "Talk to our experts to determine the best engagement model for your project."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-us">
                <button className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2" data-testid="button-contact-cta">
                  {language === "ar" ? "تواصل معنا" : "Contact Us"} <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <a href="tel:+966537430455">
                <button className="bg-slate-900 text-white text-lg px-10 py-4 rounded-md inline-flex items-center gap-2 hover:bg-slate-800 transition-all" data-testid="button-call-cta">
                  <Phone className="w-5 h-5" />
                  {language === "ar" ? "اتصل الآن" : "Call Now"}
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
