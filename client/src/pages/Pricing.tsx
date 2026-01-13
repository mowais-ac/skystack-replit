import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Check, X, ArrowRight, Shield, Clock, Users, Zap, HeartHandshake, Award, Phone, MessageCircle } from "lucide-react";
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

const guarantees = [
  {
    icon: Shield,
    title: "Quality Guarantee",
    titleAr: "ضمان الجودة",
    description: "We stand behind our work with comprehensive quality assurance.",
    descriptionAr: "نضمن جودة عملنا مع ضمان جودة شامل."
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    titleAr: "التسليم في الموعد",
    description: "Projects delivered on schedule with milestone tracking.",
    descriptionAr: "تسليم المشاريع في الموعد المحدد مع تتبع المراحل."
  },
  {
    icon: HeartHandshake,
    title: "Satisfaction Promise",
    titleAr: "وعد الرضا",
    description: "We work until you're completely satisfied with the results.",
    descriptionAr: "نعمل حتى تكون راضياً تماماً عن النتائج."
  },
  {
    icon: Award,
    title: "Certified Experts",
    titleAr: "خبراء معتمدون",
    description: "Our team holds certifications from leading tech companies.",
    descriptionAr: "فريقنا يحمل شهادات من كبرى شركات التقنية."
  }
];

export default function Pricing() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20 text-white pt-40 pb-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container-width relative z-10 text-center">
            <span className="inline-block px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-semibold mb-6 border border-emerald-500/30">
              {language === "ar" ? "الأسعار" : "Pricing"}
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold mt-4 mb-6" data-testid="text-pricing-title">
              {language === "ar" ? "أسعار بسيطة وشفافة" : "Simple, Transparent Pricing"}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {language === "ar" 
                ? "كل مشروع فريد من نوعه. نقدم نماذج تعاون مرنة تتناسب مع احتياجاتك وميزانيتك."
                : "Every project is unique. We offer flexible engagement models to match your specific needs and budget."}
            </p>
            
            {/* Quick stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {[
                { value: "500+", label: language === "ar" ? "مشروع منجز" : "Projects Delivered" },
                { value: "98%", label: language === "ar" ? "معدل الرضا" : "Satisfaction Rate" },
                { value: "24h", label: language === "ar" ? "وقت الاستجابة" : "Response Time" },
                { value: "10+", label: language === "ar" ? "سنوات الخبرة" : "Years Experience" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-white" data-testid={`text-pricing-stat-value-${i}`}>{stat.value}</div>
                  <div className="text-slate-300 text-sm" data-testid={`text-pricing-stat-label-${i}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-20 lg:py-28">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="section-heading">
                {language === "ar" ? "اختر الباقة المناسبة" : "Choose Your Plan"}
              </h2>
              <p className="section-subheading mx-auto mt-4">
                {language === "ar"
                  ? "باقات مرنة تناسب جميع أحجام المشاريع"
                  : "Flexible packages to fit all project sizes"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, i) => (
                <div 
                  key={i} 
                  className={`relative bg-white rounded-md p-8 border transition-all hover:shadow-xl ${
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

        {/* Guarantees */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                {language === "ar" ? "ضماناتنا" : "Our Guarantees"}
              </span>
              <h2 className="section-heading mt-4">
                {language === "ar" ? "نضمن لك نجاح مشروعك" : "We Guarantee Your Project Success"}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guarantees.map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-md shadow-sm text-center hover:shadow-lg transition-shadow" data-testid={`card-guarantee-${i}`}>
                  <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-lg mb-2" data-testid={`text-guarantee-title-${i}`}>
                    {language === "ar" ? item.titleAr : item.title}
                  </h4>
                  <p className="text-slate-600 text-sm" data-testid={`text-guarantee-desc-${i}`}>
                    {language === "ar" ? item.descriptionAr : item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-width">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                  {language === "ar" ? "ما الذي تحصل عليه" : "What You Get"}
                </span>
                <h2 className="section-heading mt-4 mb-8">
                  {language === "ar" ? "مشمول في كل مشروع" : "Included in Every Project"}
                </h2>
                
                <div className="space-y-4">
                  {[
                    { text: language === "ar" ? "اجتماع اكتشاف مجاني" : "Free discovery meeting", icon: Users },
                    { text: language === "ar" ? "عرض سعر مفصل خلال 24 ساعة" : "Detailed quote within 24 hours", icon: Clock },
                    { text: language === "ar" ? "تحديثات أسبوعية منتظمة" : "Regular weekly updates", icon: MessageCircle },
                    { text: language === "ar" ? "إدارة مشروع مخصصة" : "Dedicated project management", icon: Users },
                    { text: language === "ar" ? "ضمان جودة شامل" : "Comprehensive QA testing", icon: Shield },
                    { text: language === "ar" ? "تدريب وتوثيق كامل" : "Training and documentation", icon: Award },
                    { text: language === "ar" ? "دعم ما بعد الإطلاق" : "Post-launch support", icon: HeartHandshake },
                    { text: language === "ar" ? "ملكية كاملة للكود" : "Full code ownership", icon: Zap },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-md">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-slate-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary to-blue-700 rounded-md p-10 text-white">
                <h3 className="text-2xl font-bold mb-6">
                  {language === "ar" ? "هل تحتاج مساعدة في الاختيار؟" : "Need Help Choosing?"}
                </h3>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  {language === "ar"
                    ? "تحدث مع أحد خبرائنا لمناقشة متطلباتك والحصول على توصية مخصصة."
                    : "Talk to one of our experts to discuss your requirements and get a personalized recommendation."}
                </p>
                
                <div className="space-y-4">
                  <Link href="/contact-us">
                    <button className="w-full bg-white text-primary py-4 rounded-md font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2" data-testid="button-schedule-call">
                      <Phone className="w-5 h-5" />
                      {language === "ar" ? "جدول مكالمة" : "Schedule a Call"}
                    </button>
                  </Link>
                  <a 
                    href="https://wa.me/966537430455" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] text-white py-4 rounded-md font-bold hover:bg-[#20BD5A] transition-colors flex items-center justify-center gap-2 mt-4"
                    data-testid="link-whatsapp-pricing"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {language === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
                  </a>
                </div>
                
                <p className="text-sm text-blue-200 mt-6 text-center" dir="ltr">
                  +966 537 430 455
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="section-heading">
                {language === "ar" ? "مقارنة الباقات" : "Compare Plans"}
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-md border border-slate-200 max-w-5xl mx-auto">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-4 font-semibold text-slate-900 w-1/4">
                      {language === "ar" ? "الميزة" : "Feature"}
                    </th>
                    <th className="text-center p-4 font-semibold text-slate-900">Startup</th>
                    <th className="text-center p-4 font-semibold text-primary bg-primary/5">Enterprise</th>
                    <th className="text-center p-4 font-semibold text-slate-900">Dedicated Team</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { feature: language === "ar" ? "تصميم مخصص" : "Custom Design", startup: true, enterprise: true, dedicated: true },
                    { feature: language === "ar" ? "تطوير الجوال" : "Mobile Development", startup: true, enterprise: true, dedicated: true },
                    { feature: language === "ar" ? "تكاملات API" : "API Integrations", startup: false, enterprise: true, dedicated: true },
                    { feature: language === "ar" ? "تحليلات متقدمة" : "Advanced Analytics", startup: false, enterprise: true, dedicated: true },
                    { feature: language === "ar" ? "CI/CD آلي" : "Automated CI/CD", startup: false, enterprise: true, dedicated: true },
                    { feature: language === "ar" ? "تدقيق أمني" : "Security Audit", startup: false, enterprise: true, dedicated: true },
                    { feature: language === "ar" ? "مدير مشروع مخصص" : "Dedicated PM", startup: false, enterprise: true, dedicated: true },
                    { feature: language === "ar" ? "ضمان SLA" : "SLA Guarantee", startup: false, enterprise: true, dedicated: true },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="p-4 text-slate-700 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">
                        {row.startup ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-slate-300 mx-auto" />}
                      </td>
                      <td className="p-4 text-center bg-primary/5">
                        {row.enterprise ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-slate-300 mx-auto" />}
                      </td>
                      <td className="p-4 text-center">
                        {row.dedicated ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-slate-300 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                {language === "ar" ? "أسئلة شائعة" : "FAQ"}
              </span>
              <h2 className="section-heading mt-4">
                {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto grid gap-6">
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
                {
                  q: language === "ar" ? "هل يمكنني تغيير الباقة لاحقاً؟" : "Can I change my plan later?",
                  a: language === "ar"
                    ? "نعم، نماذجنا مرنة. يمكنك الترقية أو التخفيض حسب احتياجات مشروعك المتغيرة."
                    : "Yes, our models are flexible. You can upgrade or downgrade based on your evolving project needs."
                },
                {
                  q: language === "ar" ? "ما هي طرق الدفع المتاحة؟" : "What payment methods do you accept?",
                  a: language === "ar"
                    ? "نقبل التحويل البنكي وبطاقات الائتمان. نقدم أيضاً خطط دفع مرنة للمشاريع الكبيرة."
                    : "We accept bank transfers and credit cards. We also offer flexible payment plans for larger projects."
                },
              ].map((faq, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-md" data-testid={`card-faq-${i}`}>
                  <h4 className="font-bold text-slate-900 mb-3" data-testid={`text-faq-question-${i}`}>{faq.q}</h4>
                  <p className="text-slate-600 leading-relaxed" data-testid={`text-faq-answer-${i}`}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="container-width text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              {language === "ar" ? "هل أنت مستعد لمناقشة مشروعك؟" : "Ready to Discuss Your Project?"}
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              {language === "ar" 
                ? "احصل على عرض سعر مخصص لمشروعك في غضون 24 ساعة."
                : "Get a custom quote for your project within 24 hours."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-us">
                <button className="bg-white text-primary px-10 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2" data-testid="button-pricing-cta">
                  {language === "ar" ? "تواصل معنا" : "Contact Us"} <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/outsourcing">
                <button className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-md font-bold text-lg hover:bg-white/10 transition-colors">
                  {language === "ar" ? "خدمات التعهيد" : "Outsourcing Services"}
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
