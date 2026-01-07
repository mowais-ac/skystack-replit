import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { ArrowRight, Shield, Target, Users, Award, Globe, Lightbulb } from "lucide-react";

interface StaticContentProps {
  type: "about" | "privacy" | "terms";
}

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

  if (type === "about") {
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
                  {language === "ar" ? "من نحن" : "About Us"}
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold mt-4 mb-6" data-testid="text-about-title">{data.title}</h1>
                <p className="text-xl text-slate-300 leading-relaxed">{data.subtitle}</p>
              </div>
            </div>
          </section>

          {/* Story */}
          <section className="py-20 lg:py-28">
            <div className="container-width">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="section-heading mb-6">
                    {language === "ar" ? "قصتنا" : "Our Story"}
                  </h2>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    {language === "ar" 
                      ? "تأسست سكاي ستاك في قلب المملكة العربية السعودية برؤية واضحة: تمكين الشركات من خلال حلول تقنية مبتكرة تلبي متطلبات العصر الرقمي."
                      : "SkyStack was founded in the heart of Saudi Arabia with a clear vision: to empower businesses through innovative technology solutions that meet the demands of the digital age."}
                  </p>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    {language === "ar"
                      ? "نجمع بين الخبرة المحلية العميقة وأفضل الممارسات العالمية لتقديم حلول برمجية عالمية المستوى للمؤسسات في الشرق الأوسط وخارجه."
                      : "We combine deep local expertise with global best practices to deliver world-class software solutions for enterprises across the Middle East and beyond."}
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {language === "ar"
                      ? "فريقنا من المهندسين والمصممين والاستراتيجيين ملتزمون بدفع حدود ما هو ممكن في التكنولوجيا."
                      : "Our team of engineers, designers, and strategists are committed to pushing the boundaries of what's possible in technology."}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: language === "ar" ? "سنوات الخبرة" : "Years Experience", value: "10+" },
                    { label: language === "ar" ? "المشاريع المنجزة" : "Projects Delivered", value: "500+" },
                    { label: language === "ar" ? "العملاء السعداء" : "Happy Clients", value: "200+" },
                    { label: language === "ar" ? "خبراء الفريق" : "Team Experts", value: "50+" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-slate-50 p-8 rounded-md text-center">
                      <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-slate-600 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="py-20 lg:py-28 bg-slate-50">
            <div className="container-width">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-md border border-slate-100">
                  <Target className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">
                    {language === "ar" ? "رؤيتنا" : "Our Vision"}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {language === "ar"
                      ? "أن نكون الشريك التقني الأول للمؤسسات في المنطقة، ندفع التحول الرقمي ونمكّن النمو المستدام."
                      : "To be the leading technology partner for enterprises in the region, driving digital transformation and enabling sustainable growth."}
                  </p>
                </div>
                <div className="bg-white p-10 rounded-md border border-slate-100">
                  <Lightbulb className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">
                    {language === "ar" ? "مهمتنا" : "Our Mission"}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {language === "ar"
                      ? "تمكين المؤسسات بحلول رقمية مبتكرة وقابلة للتوسع وآمنة تحقق نتائج أعمال قابلة للقياس."
                      : "To empower enterprises with innovative, scalable, and secure digital solutions that drive measurable business outcomes."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20 lg:py-28">
            <div className="container-width">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="section-heading">
                  {language === "ar" ? "قيمنا" : "Our Values"}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Award, title: language === "ar" ? "التميز" : "Excellence", text: language === "ar" ? "لا نقبل بأقل من الأفضل" : "We never settle for less than the best" },
                  { icon: Shield, title: language === "ar" ? "الشفافية" : "Transparency", text: language === "ar" ? "التواصل المفتوح أساس عملنا" : "Open communication is key to our process" },
                  { icon: Lightbulb, title: language === "ar" ? "الابتكار" : "Innovation", text: language === "ar" ? "نبقى في المقدمة لتكون أنت كذلك" : "We stay ahead so you don't have to" },
                  { icon: Users, title: language === "ar" ? "الشراكة" : "Partnership", text: language === "ar" ? "نجاحك هو نجاحنا" : "Your success is our success" },
                ].map((value, i) => (
                  <div key={i} className="text-center p-6 bg-slate-50 rounded-md">
                    <value.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold text-slate-900 mb-2">{value.title}</h4>
                    <p className="text-slate-600 text-sm">{value.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Global Delivery */}
          <section className="py-20 lg:py-28 bg-slate-900 text-white">
            <div className="container-width text-center">
              <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                {language === "ar" ? "تواجد سعودي، تسليم عالمي" : "Saudi Presence, Global Delivery"}
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
                {language === "ar"
                  ? "مقرنا في الرياض، نخدم العملاء في جميع أنحاء الشرق الأوسط وأوروبا وأمريكا الشمالية."
                  : "Headquartered in Riyadh, we serve clients across the Middle East, Europe, and North America."}
              </p>
              <Link href="/contact-us">
                <button className="btn-primary inline-flex items-center gap-2" data-testid="button-about-cta">
                  {language === "ar" ? "تواصل معنا" : "Get in Touch"} <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
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
