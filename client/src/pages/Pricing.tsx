import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Check, X, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";

const plans = [
  {
    name: "Startup",
    nameAr: "الشركات الناشئة",
    price: "Custom",
    priceAr: "مخصص",
    description: "Perfect for MVPs and early-stage products.",
    descriptionAr: "مثالي للمنتجات الأولية والمرحلة المبكرة.",
    features: [
      "Custom Design System",
      "Mobile-Responsive Layout",
      "Basic SEO Optimization",
      "CMS Integration",
      "2 Weeks Post-Launch Support",
    ],
    featuresAr: [
      "نظام تصميم مخصص",
      "تصميم متجاوب للجوال",
      "تحسين SEO أساسي",
      "تكامل نظام إدارة المحتوى",
      "دعم لمدة أسبوعين بعد الإطلاق",
    ],
    missing: ["Advanced Analytics", "Custom API Integrations", "SLA Guarantee"],
    missingAr: ["التحليلات المتقدمة", "تكاملات API المخصصة", "ضمان SLA"],
    popular: false
  },
  {
    name: "Enterprise",
    nameAr: "المؤسسات",
    price: "Custom",
    priceAr: "مخصص",
    description: "Scalable solutions for high-growth businesses.",
    descriptionAr: "حلول قابلة للتوسع للشركات سريعة النمو.",
    features: [
      "Advanced UX/UI Research",
      "Custom Backend Architecture",
      "Third-party API Integrations",
      "Automated CI/CD Pipelines",
      "Advanced Security Audits",
      "3 Months Post-Launch Support"
    ],
    featuresAr: [
      "أبحاث UX/UI متقدمة",
      "بنية خلفية مخصصة",
      "تكاملات API طرف ثالث",
      "خطوط أنابيب CI/CD آلية",
      "تدقيق أمني متقدم",
      "دعم لمدة 3 أشهر بعد الإطلاق"
    ],
    missing: [],
    missingAr: [],
    popular: true
  },
  {
    name: "Dedicated Team",
    nameAr: "فريق مخصص",
    price: "Retainer",
    priceAr: "اشتراك شهري",
    description: "Your own full-stack team on a monthly basis.",
    descriptionAr: "فريقك الخاص بدوام كامل على أساس شهري.",
    features: [
      "Full-time Senior Developers",
      "Dedicated Project Manager",
      "Daily Standups",
      "Flexible Roadmap",
      "Direct Slack Access",
      "Priority SLA Support"
    ],
    featuresAr: [
      "مطورون كبار بدوام كامل",
      "مدير مشروع مخصص",
      "اجتماعات يومية",
      "خارطة طريق مرنة",
      "وصول مباشر عبر Slack",
      "دعم SLA ذو أولوية"
    ],
    missing: [],
    missingAr: [],
    popular: false
  }
];

export default function Pricing() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-slate-900 text-white pt-40 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          </div>
          
          <div className="container-width relative z-10 text-center">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              {language === "ar" ? "الأسعار" : "Pricing"}
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold mt-4 mb-6" data-testid="text-pricing-title">
              {language === "ar" ? "أسعار بسيطة وشفافة" : "Simple, Transparent Pricing"}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {language === "ar" 
                ? "كل مشروع فريد من نوعه. نقدم نماذج تعاون مرنة تتناسب مع احتياجاتك وميزانيتك."
                : "Every project is unique. We offer flexible engagement models to match your specific needs and budget."}
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="py-20 lg:py-28">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, i) => (
                <div 
                  key={i} 
                  className={`relative bg-white rounded-md p-8 border ${
                    plan.popular ? "border-primary shadow-xl ring-2 ring-primary/20" : "border-slate-200 shadow-lg"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {language === "ar" ? "الأكثر شعبية" : "MOST POPULAR"}
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-2" data-testid={`text-plan-name-${i}`}>
                    {language === "ar" ? plan.nameAr : plan.name}
                  </h3>
                  <p className="text-slate-500 mb-6 min-h-[50px]">
                    {language === "ar" ? plan.descriptionAr : plan.description}
                  </p>
                  <div className="text-3xl font-bold text-slate-900 mb-8">
                    {language === "ar" ? plan.priceAr : plan.price}
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {(language === "ar" ? plan.featuresAr : plan.features).map((feat, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-600">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-slate-700 text-sm">{feat}</span>
                      </li>
                    ))}
                    {(language === "ar" ? plan.missingAr : plan.missing).map((feat, j) => (
                      <li key={j} className="flex items-start gap-3 opacity-50">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                          <X className="w-3 h-3" />
                        </div>
                        <span className="text-slate-500 text-sm">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/contact-us">
                    <button 
                      className={`w-full py-3 rounded-md font-semibold transition-all ${
                        plan.popular ? "btn-primary" : "btn-secondary bg-slate-50"
                      }`}
                      data-testid={`button-plan-cta-${i}`}
                    >
                      {language === "ar" ? "ابدأ الآن" : "Get Started"}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="section-heading">
                {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: language === "ar" ? "كيف تحددون أسعار المشاريع؟" : "How do you determine project pricing?",
                  a: language === "ar" 
                    ? "نبني تقديراتنا على نطاق المشروع وتعقيده والجدول الزمني. نقدم تقديراً مفصلاً بعد جلسة الاكتشاف الأولى."
                    : "We base our estimates on project scope, complexity, and timeline. We provide a detailed estimate after the initial discovery session."
                },
                {
                  q: language === "ar" ? "ما هو الجدول الزمني النموذجي للمشروع؟" : "What is the typical project timeline?",
                  a: language === "ar"
                    ? "تتراوح المشاريع النموذجية من 4-12 أسبوعاً حسب التعقيد. يمكن إطلاق الحلول الجاهزة في غضون 2-4 أسابيع."
                    : "Typical projects range from 4-12 weeks depending on complexity. Pre-built solutions can be launched in 2-4 weeks."
                },
                {
                  q: language === "ar" ? "هل تقدمون دعم ما بعد الإطلاق؟" : "Do you offer post-launch support?",
                  a: language === "ar"
                    ? "نعم، تشمل جميع باقاتنا دعم ما بعد الإطلاق. نقدم أيضاً عقود صيانة مستمرة للشراكات طويلة الأمد."
                    : "Yes, all our packages include post-launch support. We also offer ongoing maintenance contracts for long-term partnerships."
                },
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-md border border-slate-100">
                  <h4 className="font-semibold text-slate-900 mb-2">{faq.q}</h4>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28">
          <div className="container-width text-center">
            <h2 className="section-heading mb-6">
              {language === "ar" ? "هل أنت مستعد لمناقشة مشروعك؟" : "Ready to Discuss Your Project?"}
            </h2>
            <p className="section-subheading mx-auto mb-10">
              {language === "ar" 
                ? "احصل على عرض سعر مخصص لمشروعك في غضون 24 ساعة."
                : "Get a custom quote for your project within 24 hours."}
            </p>
            <Link href="/contact-us">
              <button className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2" data-testid="button-pricing-cta">
                {language === "ar" ? "تواصل معنا" : "Contact Us"} <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
