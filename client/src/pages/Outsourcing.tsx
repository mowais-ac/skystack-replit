import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { 
  ArrowRight, Check, Users, DollarSign, Clock, Shield, 
  Globe, TrendingUp, Building2, Calculator, Briefcase,
  GraduationCap, Award, Headphones, Code, Database, Palette, Send, Search
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";

const roleCategories = [
  {
    id: "leadership",
    name: "Delivery & Leadership",
    nameAr: "القيادة والتسليم",
    icon: Briefcase,
    roles: [
      { id: "pm", name: "Project Manager", nameAr: "مدير مشروع", avgSalary: 25000, outsourceCost: 8000 },
      { id: "product", name: "Product Manager", nameAr: "مدير منتج", avgSalary: 28000, outsourceCost: 9000 },
      { id: "scrum", name: "Scrum Master", nameAr: "سكرم ماستر", avgSalary: 22000, outsourceCost: 7000 },
      { id: "techLead", name: "Technical Lead", nameAr: "قائد تقني", avgSalary: 30000, outsourceCost: 10000 },
    ]
  },
  {
    id: "engineering",
    name: "Software Engineering",
    nameAr: "هندسة البرمجيات",
    icon: Code,
    roles: [
      { id: "frontend", name: "Frontend Developer", nameAr: "مطور واجهة أمامية", avgSalary: 15000, outsourceCost: 5000 },
      { id: "backend", name: "Backend Developer", nameAr: "مطور خلفية", avgSalary: 18000, outsourceCost: 6000 },
      { id: "fullstack", name: "Full Stack Developer", nameAr: "مطور متكامل", avgSalary: 20000, outsourceCost: 6500 },
      { id: "mobile", name: "Mobile Developer", nameAr: "مطور تطبيقات", avgSalary: 18000, outsourceCost: 6000 },
      { id: "ios", name: "iOS Developer", nameAr: "مطور iOS", avgSalary: 19000, outsourceCost: 6500 },
      { id: "android", name: "Android Developer", nameAr: "مطور أندرويد", avgSalary: 18000, outsourceCost: 6000 },
      { id: "lowcode", name: "Low-Code Developer", nameAr: "مطور لو-كود", avgSalary: 12000, outsourceCost: 4000 },
      { id: "embedded", name: "Embedded Developer", nameAr: "مطور أنظمة مدمجة", avgSalary: 20000, outsourceCost: 7000 },
    ]
  },
  {
    id: "data",
    name: "Data & Intelligence",
    nameAr: "البيانات والذكاء",
    icon: Database,
    roles: [
      { id: "dataEngineer", name: "Data Engineer", nameAr: "مهندس بيانات", avgSalary: 22000, outsourceCost: 7500 },
      { id: "mlEngineer", name: "ML Engineer", nameAr: "مهندس تعلم آلي", avgSalary: 28000, outsourceCost: 9000 },
      { id: "biAnalyst", name: "BI Analyst", nameAr: "محلل ذكاء أعمال", avgSalary: 16000, outsourceCost: 5500 },
      { id: "dataScientist", name: "Data Scientist", nameAr: "عالم بيانات", avgSalary: 26000, outsourceCost: 8500 },
    ]
  },
  {
    id: "cloud",
    name: "Cloud & Platform",
    nameAr: "السحابة والمنصات",
    icon: Globe,
    roles: [
      { id: "devops", name: "DevOps Engineer", nameAr: "مهندس DevOps", avgSalary: 22000, outsourceCost: 7500 },
      { id: "cloudArchitect", name: "Cloud Architect", nameAr: "مهندس سحابة", avgSalary: 32000, outsourceCost: 10000 },
      { id: "sre", name: "Site Reliability Engineer", nameAr: "مهندس موثوقية", avgSalary: 24000, outsourceCost: 8000 },
      { id: "platform", name: "Platform Engineer", nameAr: "مهندس منصات", avgSalary: 23000, outsourceCost: 7500 },
    ]
  },
  {
    id: "quality",
    name: "Quality & Security",
    nameAr: "الجودة والأمان",
    icon: Shield,
    roles: [
      { id: "qa", name: "QA Engineer", nameAr: "مهندس جودة", avgSalary: 12000, outsourceCost: 4000 },
      { id: "qaAutomation", name: "QA Automation", nameAr: "أتمتة الاختبارات", avgSalary: 16000, outsourceCost: 5500 },
      { id: "security", name: "Security Analyst", nameAr: "محلل أمني", avgSalary: 24000, outsourceCost: 8000 },
      { id: "penTester", name: "Penetration Tester", nameAr: "مختبر اختراق", avgSalary: 26000, outsourceCost: 8500 },
      { id: "performance", name: "Performance Engineer", nameAr: "مهندس أداء", avgSalary: 20000, outsourceCost: 6500 },
    ]
  },
  {
    id: "design",
    name: "Design & Experience",
    nameAr: "التصميم والتجربة",
    icon: Palette,
    roles: [
      { id: "designer", name: "UI/UX Designer", nameAr: "مصمم واجهات", avgSalary: 14000, outsourceCost: 4500 },
      { id: "uxResearcher", name: "UX Researcher", nameAr: "باحث تجربة مستخدم", avgSalary: 18000, outsourceCost: 6000 },
      { id: "productDesigner", name: "Product Designer", nameAr: "مصمم منتجات", avgSalary: 20000, outsourceCost: 6500 },
      { id: "graphicDesigner", name: "Graphic Designer", nameAr: "مصمم جرافيك", avgSalary: 10000, outsourceCost: 3500 },
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise Systems",
    nameAr: "أنظمة المؤسسات",
    icon: Building2,
    roles: [
      { id: "salesforce", name: "Salesforce Developer", nameAr: "مطور سيلزفورس", avgSalary: 26000, outsourceCost: 8500 },
      { id: "sap", name: "SAP Consultant", nameAr: "مستشار SAP", avgSalary: 32000, outsourceCost: 10000 },
      { id: "oracle", name: "Oracle Developer", nameAr: "مطور أوراكل", avgSalary: 28000, outsourceCost: 9000 },
      { id: "dynamics", name: "Dynamics 365", nameAr: "مطور دايناميكس", avgSalary: 25000, outsourceCost: 8000 },
    ]
  }
];

const allRoles = roleCategories.flatMap(cat => cat.roles);

const benefits = [
  {
    icon: DollarSign,
    title: "Cost Savings up to 70%",
    titleAr: "توفير يصل إلى 70%",
    description: "Significantly reduce operational costs while maintaining high-quality output.",
    descriptionAr: "خفض التكاليف التشغيلية بشكل كبير مع الحفاظ على جودة عالية."
  },
  {
    icon: Users,
    title: "Access Global Talent",
    titleAr: "الوصول للمواهب العالمية",
    description: "Tap into a vast pool of skilled professionals from emerging tech hubs.",
    descriptionAr: "الوصول إلى مجموعة واسعة من المحترفين المهرة من مراكز التقنية الناشئة."
  },
  {
    icon: Clock,
    title: "Faster Time to Market",
    titleAr: "وقت أسرع للسوق",
    description: "Scale your team quickly without lengthy hiring processes.",
    descriptionAr: "توسيع فريقك بسرعة دون عمليات توظيف طويلة."
  },
  {
    icon: Shield,
    title: "Reduced Risk",
    titleAr: "تقليل المخاطر",
    description: "Flexible engagement models with no long-term commitments.",
    descriptionAr: "نماذج تعاون مرنة دون التزامات طويلة الأمد."
  },
  {
    icon: Globe,
    title: "24/7 Productivity",
    titleAr: "إنتاجية على مدار الساعة",
    description: "Leverage time zone differences for round-the-clock development.",
    descriptionAr: "الاستفادة من فروق المناطق الزمنية للتطوير المستمر."
  },
  {
    icon: TrendingUp,
    title: "Scalable Resources",
    titleAr: "موارد قابلة للتوسع",
    description: "Easily scale up or down based on project requirements.",
    descriptionAr: "التوسع أو التقليص بسهولة حسب متطلبات المشروع."
  }
];

const whyPakistan = [
  {
    icon: GraduationCap,
    title: "Highly Educated Workforce",
    titleAr: "قوى عاملة عالية التعليم",
    description: "Over 25,000 IT graduates annually from top universities",
    descriptionAr: "أكثر من 25,000 خريج تقنية سنوياً من أفضل الجامعات"
  },
  {
    icon: Award,
    title: "English Proficiency",
    titleAr: "إتقان اللغة الإنجليزية",
    description: "Strong English communication skills for seamless collaboration",
    descriptionAr: "مهارات تواصل قوية بالإنجليزية للتعاون السلس"
  },
  {
    icon: Clock,
    title: "Favorable Time Zone",
    titleAr: "منطقة زمنية مناسبة",
    description: "GMT+5 provides good overlap with GCC and European hours",
    descriptionAr: "توقيت +5 يوفر تداخلاً جيداً مع ساعات الخليج وأوروبا"
  },
  {
    icon: Code,
    title: "Tech Expertise",
    titleAr: "خبرة تقنية",
    description: "Strong expertise in modern technologies and frameworks",
    descriptionAr: "خبرة قوية في التقنيات والأطر الحديثة"
  }
];

interface RoleSelection {
  roleId: string;
  quantity: number;
}

interface OutsourcingFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  selectedRoles: RoleSelection[];
  timeline: string;
  message: string;
}

function OutsourcingForm({ language }: { language: string }) {
  const { toast } = useToast();
  const [formRoleCounts, setFormRoleCounts] = useState<Record<string, number>>({});
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<OutsourcingFormData, 'selectedRoles'>>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      timeline: "",
      message: ""
    }
  });

  const updateFormRoleCount = (roleId: string, delta: number) => {
    setFormRoleCounts(prev => {
      const current = prev[roleId] || 0;
      const newCount = Math.max(0, Math.min(20, current + delta));
      if (newCount === 0) {
        const { [roleId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [roleId]: newCount };
    });
  };

  const totalHeadcount = Object.values(formRoleCounts).reduce((sum, count) => sum + count, 0);

  const mutation = useMutation({
    mutationFn: async (data: OutsourcingFormData) => {
      return apiRequest("POST", "/api/outsourcing-inquiry", data);
    },
    onSuccess: () => {
      toast({
        title: language === "ar" ? "تم الإرسال بنجاح" : "Inquiry Sent!",
        description: language === "ar" ? "سنتواصل معك قريباً" : "We'll get back to you shortly."
      });
      reset();
      setFormRoleCounts({});
    },
    onError: () => {
      toast({
        title: language === "ar" ? "حدث خطأ" : "Error",
        description: language === "ar" ? "يرجى المحاولة مرة أخرى" : "Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: Omit<OutsourcingFormData, 'selectedRoles'>) => {
    if (totalHeadcount === 0) {
      toast({
        title: language === "ar" ? "يرجى اختيار الأدوار" : "Please select roles",
        description: language === "ar" ? "اختر دوراً واحداً على الأقل" : "Select at least one role",
        variant: "destructive"
      });
      return;
    }
    const selectedRoles: RoleSelection[] = Object.entries(formRoleCounts).map(([roleId, quantity]) => ({
      roleId,
      quantity
    }));
    mutation.mutate({ ...data, selectedRoles });
  };

  const timelineOptions = [
    { value: "immediate", label: language === "ar" ? "فوري" : "Immediate" },
    { value: "1-month", label: language === "ar" ? "خلال شهر" : "Within 1 month" },
    { value: "3-months", label: language === "ar" ? "خلال 3 أشهر" : "Within 3 months" },
    { value: "exploring", label: language === "ar" ? "استكشاف" : "Just exploring" }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-md p-8 text-slate-900">
      <h3 className="text-2xl font-bold mb-6">
        {language === "ar" ? "احصل على عرض سعر مجاني" : "Get a Free Quote"}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <input
            {...register("name", { required: true })}
            placeholder={language === "ar" ? "الاسم *" : "Name *"}
            className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            data-testid="input-outsourcing-name"
          />
        </div>
        <div>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder={language === "ar" ? "البريد الإلكتروني *" : "Email *"}
            className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            data-testid="input-outsourcing-email"
          />
        </div>
        <div>
          <input
            {...register("phone", { required: true })}
            placeholder={language === "ar" ? "رقم الهاتف *" : "Phone *"}
            className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            data-testid="input-outsourcing-phone"
          />
        </div>
        <div>
          <input
            {...register("company")}
            placeholder={language === "ar" ? "اسم الشركة" : "Company"}
            className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            data-testid="input-outsourcing-company"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="font-semibold text-slate-700">
            {language === "ar" ? "اختر الأدوار والكميات *" : "Select Roles & Quantities *"}
          </label>
          {totalHeadcount > 0 && (
            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
              {language === "ar" ? `${totalHeadcount} موظف` : `${totalHeadcount} staff`}
            </span>
          )}
        </div>
        <div className="border border-slate-200 rounded-md max-h-64 overflow-y-auto">
          {roleCategories.map(category => (
            <div key={category.id} className="border-b border-slate-100 last:border-b-0">
              <div className="px-4 py-2 bg-slate-50 text-sm font-semibold text-slate-600 flex items-center gap-2">
                <category.icon className="w-4 h-4" />
                {language === "ar" ? category.nameAr : category.name}
              </div>
              <div className="divide-y divide-slate-100">
                {category.roles.map(role => {
                  const count = formRoleCounts[role.id] || 0;
                  return (
                    <div key={role.id} className="flex items-center justify-between px-4 py-2 hover:bg-slate-50">
                      <span className="text-sm text-slate-700">
                        {language === "ar" ? role.nameAr : role.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateFormRoleCount(role.id, -1)}
                          disabled={count === 0}
                          className="w-7 h-7 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          data-testid={`button-form-minus-${role.id}`}
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium text-slate-800">{count}</span>
                        <button
                          type="button"
                          onClick={() => updateFormRoleCount(role.id, 1)}
                          className="w-7 h-7 rounded-md bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors"
                          data-testid={`button-form-plus-${role.id}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select
          {...register("timeline", { required: true })}
          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          data-testid="select-outsourcing-timeline"
        >
          <option value="">{language === "ar" ? "الجدول الزمني *" : "Timeline *"}</option>
          {timelineOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <textarea
          {...register("message")}
          rows={1}
          placeholder={language === "ar" ? "ملاحظات إضافية" : "Additional notes"}
          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          data-testid="textarea-outsourcing-message"
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full btn-primary py-4 flex items-center justify-center gap-2"
        data-testid="button-outsourcing-submit"
      >
        {mutation.isPending ? (
          language === "ar" ? "جاري الإرسال..." : "Sending..."
        ) : (
          <>
            <Send className="w-5 h-5" />
            {language === "ar" ? "إرسال الطلب" : "Submit Request"}
          </>
        )}
      </button>
    </form>
  );
}

export default function Outsourcing() {
  const { language } = useLanguage();
  const [roleCounts, setRoleCounts] = useState<Record<string, number>>({
    fullstack: 1,
    frontend: 1,
  });
  const [roleSearch, setRoleSearch] = useState("");

  const filteredCategories = useMemo(() => {
    if (!roleSearch.trim()) return roleCategories;
    const search = roleSearch.toLowerCase();
    return roleCategories.map(cat => ({
      ...cat,
      roles: cat.roles.filter(role => 
        role.name.toLowerCase().includes(search) || 
        role.nameAr.includes(search)
      )
    })).filter(cat => cat.roles.length > 0);
  }, [roleSearch]);

  const updateRoleCount = (roleId: string, count: number) => {
    setRoleCounts(prev => {
      if (count <= 0) {
        const { [roleId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [roleId]: count };
    });
  };

  const selectedRoles = Object.keys(roleCounts);
  const totalEmployees = Object.values(roleCounts).reduce((sum, count) => sum + count, 0);
  
  // Calculate costs based on each role's individual count
  const monthlyInHouse = allRoles.reduce((sum: number, role) => {
    const count = roleCounts[role.id] || 0;
    return sum + (role.avgSalary * count * 1.35);
  }, 0);
  
  const monthlyOutsource = allRoles.reduce((sum: number, role) => {
    const count = roleCounts[role.id] || 0;
    return sum + (role.outsourceCost * count);
  }, 0);
  
  const monthlySavings = monthlyInHouse - monthlyOutsource;
  const annualSavings = monthlySavings * 12;
  const savingsPercent = monthlyInHouse > 0 ? Math.round((monthlySavings / monthlyInHouse) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="IT Outsourcing & Dedicated Teams"
        titleAr="التعهيد التقني والفرق المخصصة"
        description="Save up to 70% with world-class tech teams from Pakistan and South Asia. Build high-performing dedicated development teams at a fraction of the cost."
        descriptionAr="وفر حتى 70% مع فرق تقنية عالمية المستوى من باكستان وجنوب آسيا. ابنِ فرق تطوير مخصصة عالية الأداء بتكلفة أقل بكثير."
        keywords="IT outsourcing, dedicated teams, software outsourcing, offshore development, tech talent, Saudi Arabia outsourcing"
        keywordsAr="التعهيد التقني، فرق مخصصة، تعهيد البرمجيات، تطوير خارجي، مواهب تقنية، التعهيد السعودي"
        canonicalUrl="/services/outsourcing"
      />
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative bg-slate-950 text-white pt-40 pb-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
          
          <div className="container-width relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-semibold mb-6">
                {language === "ar" ? "حلول التعهيد" : "Outsourcing Solutions"}
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="text-outsourcing-title">
                {language === "ar" 
                  ? "وفر حتى 70% مع فرق تقنية عالمية المستوى"
                  : "Save Up to 70% with World-Class Tech Teams"}
              </h1>
              <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                {language === "ar"
                  ? "احصل على وصول لأفضل المواهب التقنية من باكستان وجنوب آسيا. نحن نساعدك على بناء فرق مخصصة عالية الأداء بتكلفة أقل بكثير."
                  : "Access top-tier tech talent from Pakistan and South Asia. We help you build high-performing dedicated teams at a fraction of the cost."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#get-quote" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2" data-testid="button-get-quote">
                  {language === "ar" ? "احصل على عرض سعر" : "Get a Quote"} <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#calculator" className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-2">
                  <Calculator className="w-5 h-5" /> {language === "ar" ? "حاسبة التوفير" : "Calculate Savings"}
                </a>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/10">
                {[
                  { value: "70%", label: language === "ar" ? "توفير التكاليف" : "Cost Savings" },
                  { value: "500+", label: language === "ar" ? "مطور متاح" : "Developers Available" },
                  { value: "48h", label: language === "ar" ? "وقت البدء" : "Onboarding Time" },
                  { value: "98%", label: language === "ar" ? "معدل الرضا" : "Satisfaction Rate" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-width">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                {language === "ar" ? "لماذا التعهيد" : "Why Outsource"}
              </span>
              <h2 className="section-heading mt-4">
                {language === "ar" ? "مزايا التعهيد مع SkyStack" : "Benefits of Outsourcing with SkyStack"}
              </h2>
              <p className="section-subheading mx-auto mt-4">
                {language === "ar"
                  ? "اكتشف كيف يمكن للتعهيد أن يحول عملياتك التقنية"
                  : "Discover how outsourcing can transform your tech operations"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="group p-8 bg-slate-50 rounded-md hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20">
                  <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <benefit.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">
                    {language === "ar" ? benefit.titleAr : benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {language === "ar" ? benefit.descriptionAr : benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section id="calculator" className="py-20 lg:py-28 bg-slate-900 text-white">
          <div className="container-width">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">
                {language === "ar" ? "حاسبة التوفير" : "Savings Calculator"}
              </span>
              <h2 className="section-heading mt-4 text-white">
                {language === "ar" ? "احسب توفيرك السنوي" : "Calculate Your Annual Savings"}
              </h2>
              <p className="text-slate-400 mt-4 text-lg">
                {language === "ar"
                  ? "اختر الأدوار وحجم الفريق لمعرفة كم يمكنك التوفير"
                  : "Select roles and team size to see how much you can save"}
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Configuration */}
                <div className="bg-slate-800 rounded-md p-8">
                  <h3 className="text-xl font-bold mb-4">
                    {language === "ar" ? "اختر الأدوار وعدد الموظفين" : "Select Roles & Employee Count"}
                  </h3>
                  
                  {/* Search Input */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={roleSearch}
                      onChange={(e) => setRoleSearch(e.target.value)}
                      placeholder={language === "ar" ? "ابحث عن دور..." : "Search roles..."}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      data-testid="input-search-roles"
                    />
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-4">
                    {language === "ar" ? "استخدم الأزرار لتعديل عدد الموظفين لكل دور" : "Use buttons to adjust employee count for each role"}
                  </p>
                  <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-2">
                    {filteredCategories.length === 0 ? (
                      <div className="text-center py-8 text-slate-400">
                        {language === "ar" ? "لا توجد أدوار مطابقة" : "No matching roles found"}
                      </div>
                    ) : filteredCategories.map(category => (
                      <div key={category.id}>
                        <div className="flex items-center gap-2 mb-2 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                          <category.icon className="w-3 h-3" />
                          {language === "ar" ? category.nameAr : category.name}
                        </div>
                        <div className="space-y-2">
                          {category.roles.map(role => {
                            const count = roleCounts[role.id] || 0;
                            const isActive = count > 0;
                            return (
                              <div
                                key={role.id}
                                className={`flex items-center justify-between p-3 rounded-md transition-all ${
                                  isActive
                                    ? "bg-primary/20 border border-primary/50"
                                    : "bg-slate-700 border border-transparent"
                                }`}
                              >
                                <span className={`text-sm font-medium ${isActive ? "text-white" : "text-slate-300"}`}>
                                  {language === "ar" ? role.nameAr : role.name}
                                </span>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => updateRoleCount(role.id, count - 1)}
                                    disabled={count === 0}
                                    className={`w-8 h-8 rounded-md flex items-center justify-center font-bold transition-colors ${
                                      count === 0 
                                        ? "bg-slate-600/50 text-slate-500 cursor-not-allowed" 
                                        : "bg-slate-600 hover:bg-slate-500 text-white"
                                    }`}
                                    data-testid={`button-decrease-${role.id}`}
                                  >
                                    -
                                  </button>
                                  <span className={`w-8 text-center font-bold ${isActive ? "text-white" : "text-slate-400"}`}>{count}</span>
                                  <button
                                    onClick={() => updateRoleCount(role.id, count + 1)}
                                    className="w-8 h-8 rounded-md bg-primary hover:bg-primary/80 flex items-center justify-center text-white font-bold transition-colors"
                                    data-testid={`button-increase-${role.id}`}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-slate-700">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">{language === "ar" ? "إجمالي الموظفين" : "Total Employees"}</span>
                      <span className="text-white font-bold">{totalEmployees}</span>
                    </div>
                  </div>
                </div>
                
                {/* Results */}
                <div className="bg-gradient-to-br from-primary to-blue-700 rounded-md p-8">
                  <h3 className="text-xl font-bold mb-6">
                    {language === "ar" ? "نتائج التوفير" : "Your Savings"}
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-white/20">
                      <span className="text-blue-100">{language === "ar" ? "التكلفة الداخلية / شهر" : "In-house Cost / Month"}</span>
                      <span className="text-2xl font-bold">{monthlyInHouse.toLocaleString()} {language === "ar" ? "ر.س" : "SAR"}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/20">
                      <span className="text-blue-100">{language === "ar" ? "تكلفة التعهيد / شهر" : "Outsource Cost / Month"}</span>
                      <span className="text-2xl font-bold">{monthlyOutsource.toLocaleString()} {language === "ar" ? "ر.س" : "SAR"}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/20">
                      <span className="text-blue-100">{language === "ar" ? "التوفير الشهري" : "Monthly Savings"}</span>
                      <span className="text-2xl font-bold text-green-300">{monthlySavings.toLocaleString()} {language === "ar" ? "ر.س" : "SAR"}</span>
                    </div>
                    
                    <div className="bg-white/10 rounded-md p-6 text-center">
                      <div className="text-sm text-blue-100 mb-2">{language === "ar" ? "التوفير السنوي" : "Annual Savings"}</div>
                      <div className="text-4xl font-bold text-white mb-2">{annualSavings.toLocaleString()} {language === "ar" ? "ر.س" : "SAR"}</div>
                      <div className="inline-block px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold">
                        {savingsPercent}% {language === "ar" ? "توفير" : "savings"}
                      </div>
                    </div>
                  </div>
                  
                  <a href="#get-quote" className="block w-full mt-6 bg-white text-primary py-4 rounded-md font-bold hover:bg-blue-50 transition-colors text-center" data-testid="button-get-started">
                    {language === "ar" ? "ابدأ التوفير الآن" : "Start Saving Now"}
                  </a>
                </div>
              </div>
              
              {/* Comparison Table */}
              <div className="mt-12 bg-slate-800 rounded-md overflow-hidden">
                <div className="p-6 border-b border-slate-700">
                  <h3 className="text-xl font-bold">
                    {language === "ar" ? "مقارنة التكاليف التفصيلية" : "Detailed Cost Comparison"}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-700/50">
                        <th className="text-left p-4 font-semibold">{language === "ar" ? "بند التكلفة" : "Cost Item"}</th>
                        <th className="text-center p-4 font-semibold">{language === "ar" ? "توظيف داخلي" : "In-House"}</th>
                        <th className="text-center p-4 font-semibold text-emerald-400">{language === "ar" ? "تعهيد SkyStack" : "SkyStack Outsourcing"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {[
                        { item: language === "ar" ? "الراتب الأساسي" : "Base Salary", inhouse: "100%", outsource: "35-45%" },
                        { item: language === "ar" ? "المزايا والتأمين" : "Benefits & Insurance", inhouse: "15-25%", outsource: language === "ar" ? "مشمول" : "Included" },
                        { item: language === "ar" ? "المساحة المكتبية" : "Office Space", inhouse: "10-15%", outsource: language === "ar" ? "غير مطلوب" : "Not Required" },
                        { item: language === "ar" ? "المعدات والبرامج" : "Equipment & Software", inhouse: "5-10%", outsource: language === "ar" ? "مشمول" : "Included" },
                        { item: language === "ar" ? "التدريب والتطوير" : "Training & Development", inhouse: "5-8%", outsource: language === "ar" ? "مشمول" : "Included" },
                        { item: language === "ar" ? "تكاليف التوظيف" : "Recruitment Costs", inhouse: "15-20%", outsource: language === "ar" ? "صفر" : "Zero" },
                      ].map((row, i) => (
                        <tr key={i}>
                          <td className="p-4 text-slate-300">{row.item}</td>
                          <td className="p-4 text-center text-slate-400">{row.inhouse}</td>
                          <td className="p-4 text-center text-emerald-400 font-semibold">{row.outsource}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Pakistan */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container-width">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                  {language === "ar" ? "مركز التميز" : "Center of Excellence"}
                </span>
                <h2 className="section-heading mt-4 mb-6">
                  {language === "ar" ? "لماذا باكستان؟" : "Why Pakistan?"}
                </h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  {language === "ar"
                    ? "تعد باكستان واحدة من أسرع مراكز التقنية نمواً في العالم، مع قوى عاملة شابة ومتعلمة ومتحمسة للتقنية."
                    : "Pakistan is one of the fastest-growing tech hubs in the world, with a young, educated, and tech-savvy workforce eager to prove their capabilities."}
                </p>
                
                <div className="space-y-6">
                  {whyPakistan.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">
                          {language === "ar" ? item.titleAr : item.title}
                        </h4>
                        <p className="text-slate-600 text-sm">
                          {language === "ar" ? item.descriptionAr : item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-md shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">
                    {language === "ar" ? "الأدوار المتاحة" : "Available Roles"}
                  </h3>
                  <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                    {allRoles.length}+ {language === "ar" ? "دور" : "roles"}
                  </span>
                </div>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {roleCategories.map(category => (
                    <div key={category.id}>
                      <div className="flex items-center gap-2 mb-2">
                        <category.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-slate-800">
                          {language === "ar" ? category.nameAr : category.name}
                        </span>
                        <span className="text-xs text-slate-400">({category.roles.length})</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.roles.map(role => (
                          <span key={role.id} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                            {language === "ar" ? role.nameAr : role.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-width">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                {language === "ar" ? "كيف نعمل" : "How It Works"}
              </span>
              <h2 className="section-heading mt-4">
                {language === "ar" ? "عملية التعهيد السلسة" : "Seamless Outsourcing Process"}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: language === "ar" ? "الاستشارة" : "Consultation",
                  description: language === "ar" 
                    ? "نناقش متطلباتك والمهارات المطلوبة"
                    : "We discuss your requirements and skill needs"
                },
                {
                  step: "02",
                  title: language === "ar" ? "اختيار الفريق" : "Team Selection",
                  description: language === "ar"
                    ? "نقدم لك مرشحين مؤهلين للاختيار"
                    : "We present qualified candidates for your selection"
                },
                {
                  step: "03",
                  title: language === "ar" ? "التأهيل" : "Onboarding",
                  description: language === "ar"
                    ? "تأهيل سريع خلال 48 ساعة"
                    : "Quick onboarding within 48 hours"
                },
                {
                  step: "04",
                  title: language === "ar" ? "البدء بالعمل" : "Start Working",
                  description: language === "ar"
                    ? "فريقك المخصص جاهز للإنتاج"
                    : "Your dedicated team is ready to deliver"
                }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container-width">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                {language === "ar" ? "آراء العملاء" : "Client Testimonials"}
              </span>
              <h2 className="section-heading mt-4">
                {language === "ar" ? "ماذا يقول عملاؤنا" : "What Our Clients Say"}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: language === "ar" 
                    ? "وفرنا أكثر من 60% من تكاليف التطوير مع الحفاظ على نفس مستوى الجودة. فريق SkyStack محترف ومتجاوب."
                    : "We saved over 60% on development costs while maintaining the same quality level. SkyStack's team is professional and responsive.",
                  author: language === "ar" ? "أحمد الراشد" : "Ahmed Al-Rashid",
                  role: language === "ar" ? "مدير تقنية المعلومات، شركة تقنية" : "CTO, Tech Company"
                },
                {
                  quote: language === "ar"
                    ? "التعاون كان سلساً للغاية. المطورون محترفون ويفهمون متطلباتنا بسرعة."
                    : "The collaboration was extremely smooth. The developers are professional and understand our requirements quickly.",
                  author: language === "ar" ? "سارة المحمد" : "Sara Al-Mohammed",
                  role: language === "ar" ? "مديرة المنتج، شركة ناشئة" : "Product Manager, Startup"
                },
                {
                  quote: language === "ar"
                    ? "أفضل قرار اتخذناه هو التعاون مع SkyStack. الآن لدينا فريق مخصص ينمو معنا."
                    : "The best decision we made was partnering with SkyStack. Now we have a dedicated team that grows with us.",
                  author: language === "ar" ? "خالد العتيبي" : "Khalid Al-Otaibi",
                  role: language === "ar" ? "الرئيس التنفيذي، منصة رقمية" : "CEO, Digital Platform"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-8 rounded-md shadow-lg">
                  <div className="text-4xl text-primary/20 mb-4">"</div>
                  <p className="text-slate-600 mb-6 leading-relaxed">{testimonial.quote}</p>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.author}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-width">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="section-heading">
                {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: language === "ar" ? "كيف تضمنون جودة العمل؟" : "How do you ensure quality?",
                  a: language === "ar"
                    ? "نختار المطورين بعناية من خلال اختبارات تقنية صارمة. كما نوفر مدير مشروع مخصص لضمان التواصل الفعال والجودة العالية."
                    : "We carefully select developers through rigorous technical tests. We also provide a dedicated project manager to ensure effective communication and high quality."
                },
                {
                  q: language === "ar" ? "ما هي فترة العقد الأدنى؟" : "What is the minimum contract period?",
                  a: language === "ar"
                    ? "نقدم عقوداً مرنة تبدأ من 3 أشهر. يمكن تمديد أو إنهاء العقد بإشعار مسبق لمدة شهر."
                    : "We offer flexible contracts starting from 3 months. Contracts can be extended or terminated with one month's notice."
                },
                {
                  q: language === "ar" ? "كيف يتم التواصل مع الفريق؟" : "How is communication handled?",
                  a: language === "ar"
                    ? "نستخدم أدوات تواصل حديثة مثل Slack وZoom. نعقد اجتماعات يومية قصيرة واجتماعات أسبوعية للمراجعة."
                    : "We use modern communication tools like Slack and Zoom. We hold daily standups and weekly review meetings."
                },
                {
                  q: language === "ar" ? "هل البيانات آمنة؟" : "Is my data secure?",
                  a: language === "ar"
                    ? "نعم، نلتزم بأعلى معايير الأمان. جميع المطورين يوقعون اتفاقيات عدم إفشاء ونستخدم بروتوكولات أمان صارمة."
                    : "Yes, we adhere to the highest security standards. All developers sign NDAs and we use strict security protocols."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-md">
                  <h4 className="font-bold text-slate-900 mb-3">{faq.q}</h4>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA with Form */}
        <section id="get-quote" className="py-20 lg:py-28 bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="container-width">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                {language === "ar" ? "هل أنت مستعد للتوفير؟" : "Ready to Start Saving?"}
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                {language === "ar"
                  ? "احجز استشارة مجانية اليوم واكتشف كيف يمكننا مساعدتك في بناء فريق تقني عالمي المستوى."
                  : "Book a free consultation today and discover how we can help you build a world-class tech team."}
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  language === "ar" ? "استشارة مجانية بدون التزام" : "Free consultation with no obligation",
                  language === "ar" ? "عرض سعر مفصل خلال 24 ساعة" : "Detailed quote within 24 hours",
                  language === "ar" ? "فريق جاهز للبدء خلال 48 ساعة" : "Team ready to start within 48 hours"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-300" />
                    <span className="text-blue-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <OutsourcingForm language={language} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
