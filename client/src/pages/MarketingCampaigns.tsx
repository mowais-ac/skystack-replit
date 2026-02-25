import { useState } from "react";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/lib/i18n";
import { services, businessModels } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Check, Copy, Info, Megaphone, Target, Users } from "lucide-react";

interface LeadCampaign {
  id: string;
  title: string;
  titleAr: string;
  audience: string;
  audienceAr: string;
  offer: string;
  offerAr: string;
  hook: string;
  hookAr: string;
  channels: string[];
  channelsAr: string[];
  headlineIdeas: string[];
  headlineIdeasAr: string[];
  visualIdeas: string[];
  visualIdeasAr: string[];
  cta: string;
  ctaAr: string;
  adCopy: string;
  adCopyAr: string;
}

interface CampaignCategory {
  label: string;
  labelAr: string;
  description: string;
  descriptionAr: string;
  campaigns: LeadCampaign[];
}

interface PostIdea {
  id: string;
  platform: string;
  platformAr: string;
  title: string;
  titleAr: string;
  caption: string;
  captionAr: string;
  cta: string;
  ctaAr: string;
  visual: string;
  visualAr: string;
}

type CampaignBlueprint = Omit<LeadCampaign, "id" | "title" | "titleAr">;
type PlatformCalc = {
  key: string;
  label: string;
  labelAr: string;
  split: number;
  dailyLeadTarget: number;
  dailySpend: number;
};

function FieldLabel({
  label,
  help,
}: {
  label: string;
  help: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <p className="text-sm text-slate-500">{label}</p>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" className="text-slate-400 hover:text-slate-600" aria-label={label}>
            <Info className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-sm leading-relaxed">
          {help}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

const postIdeas: PostIdea[] = [
  {
    id: "post-1",
    platform: "LinkedIn",
    platformAr: "LinkedIn",
    title: "Your Business Outgrew Manual Operations",
    titleAr: "أعمالك تجاوزت الإدارة اليدوية",
    caption:
      "If your team still runs approvals, follow-ups, and reporting manually, growth will slow down. We build systems that turn daily operations into automated workflows.",
    captionAr:
      "إذا كان فريقك لا يزال يدير الموافقات والمتابعات والتقارير يدويًا، فالنمو سيتباطأ. نحن نبني أنظمة تحول العمليات اليومية إلى سير عمل مؤتمت.",
    cta: "Book a free workflow audit",
    ctaAr: "احجز تدقيقًا مجانيًا لسير العمل",
    visual: "Before vs after process flow (manual steps vs automated pipeline).",
    visualAr: "تصميم مقارنة قبل/بعد (خطوات يدوية مقابل مسار مؤتمت).",
  },
  {
    id: "post-2",
    platform: "Instagram Carousel",
    platformAr: "كاروسيل إنستغرام",
    title: "3 Signs You Need a Custom Software Partner",
    titleAr: "3 علامات أنك تحتاج شريك برمجي",
    caption:
      "1) Teams use too many tools, 2) data is duplicated, 3) decisions are delayed. A unified platform fixes all three.",
    captionAr:
      "1) الفريق يستخدم أدوات كثيرة، 2) البيانات مكررة، 3) القرارات متأخرة. منصة موحدة تحل المشاكل الثلاث.",
    cta: "DM us for a free architecture plan",
    ctaAr: "راسلنا للحصول على خطة بنية مجانية",
    visual: "Carousel with one pain point per slide + final CTA slide.",
    visualAr: "كاروسيل: مشكلة في كل شريحة + شريحة أخيرة للدعوة للإجراء.",
  },
  {
    id: "post-3",
    platform: "Meta Ads",
    platformAr: "إعلانات Meta",
    title: "Launch Faster Without Building From Scratch",
    titleAr: "أطلق أسرع بدون بناء من الصفر",
    caption:
      "Use our pre-built app foundations to go live in weeks, not months. Keep your brand, customize your flows, and start acquiring users faster.",
    captionAr:
      "استخدم حلولنا الجاهزة للإطلاق خلال أسابيع بدلًا من أشهر. احتفظ بهويتك وخصص رحلات المستخدم وابدأ اكتساب العملاء أسرع.",
    cta: "Get launch timeline + pricing",
    ctaAr: "احصل على الجدول الزمني والتكلفة",
    visual: "Timer-based creative: Week 1 to Week 6 go-live timeline.",
    visualAr: "تصميم يعتمد على الوقت: من الأسبوع 1 إلى الأسبوع 6 حتى الإطلاق.",
  },
  {
    id: "post-4",
    platform: "LinkedIn",
    platformAr: "LinkedIn",
    title: "How We Help Teams Close More Leads",
    titleAr: "كيف نساعد الفرق على إغلاق عملاء أكثر",
    caption:
      "Speed-to-contact, lead qualification, and structured follow-up are the core of closing. Your ads bring leads, your system closes revenue.",
    captionAr:
      "سرعة التواصل وتأهيل العميل والمتابعة المنظمة هي أساس الإغلاق. الإعلانات تجلب العملاء، والنظام يحولهم إلى إيراد.",
    cta: "Request our lead closing framework",
    ctaAr: "اطلب إطار إغلاق العملاء",
    visual: "Funnel diagram: lead -> qualified -> meeting -> closed deal.",
    visualAr: "مخطط قمع: عميل محتمل -> مؤهل -> اجتماع -> صفقة مغلقة.",
  },
  {
    id: "post-5",
    platform: "Instagram Reel",
    platformAr: "ريل إنستغرام",
    title: "What Happens in the First 14 Days of a Software Project",
    titleAr: "ماذا يحدث في أول 14 يوم من مشروع برمجي",
    caption:
      "Day 1-3: discovery. Day 4-7: solution blueprint. Day 8-14: execution kickoff. Start with clarity, avoid costly rework.",
    captionAr:
      "اليوم 1-3: اكتشاف. اليوم 4-7: مخطط الحل. اليوم 8-14: بدء التنفيذ. ابدأ بوضوح وتجنب إعادة العمل المكلفة.",
    cta: "Get your 14-day kickoff plan",
    ctaAr: "احصل على خطة الانطلاق 14 يوم",
    visual: "Fast-cut reel with day-by-day milestones.",
    visualAr: "ريل سريع يعرض مراحل التنفيذ يومًا بيوم.",
  },
  {
    id: "post-6",
    platform: "LinkedIn",
    platformAr: "LinkedIn",
    title: "Stop Buying Leads. Start Building a Conversion System",
    titleAr: "توقف عن شراء العملاء فقط، وابنِ نظام تحويل",
    caption:
      "Most teams focus only on ad spend. Winning teams optimize qualification, response time, and offers. That is where close rates improve.",
    captionAr:
      "معظم الفرق تركز فقط على إنفاق الإعلانات. الفرق الناجحة تحسن التأهيل وسرعة الرد والعرض التسويقي. هنا ترتفع نسب الإغلاق.",
    cta: "Audit your funnel with our team",
    ctaAr: "دقق قمع المبيعات مع فريقنا",
    visual: "Comparison chart: high spend/low close vs optimized funnel/high close.",
    visualAr: "مقارنة: إنفاق عالي/إغلاق منخفض مقابل قمع محسن/إغلاق أعلى.",
  },
  {
    id: "post-7",
    platform: "Meta Ads",
    platformAr: "إعلانات Meta",
    title: "Need 50 Leads/Day? Start with the Right Budget Model",
    titleAr: "تريد 50 عميل يوميًا؟ ابدأ بنموذج ميزانية صحيح",
    caption:
      "Scaling lead volume needs channel mix + clear CPL assumptions + follow-up system. We help you plan all three before scaling spend.",
    captionAr:
      "رفع عدد العملاء يحتاج توزيع قنوات + افتراضات CPL واضحة + نظام متابعة. نساعدك تخطط للثلاثة قبل زيادة الإنفاق.",
    cta: "Get a custom budget plan",
    ctaAr: "احصل على خطة ميزانية مخصصة",
    visual: "Budget calculator screenshot with highlighted outputs.",
    visualAr: "تصميم من الحاسبة مع إبراز النتائج الأساسية.",
  },
  {
    id: "post-8",
    platform: "YouTube Shorts",
    platformAr: "مقاطع YouTube قصيرة",
    title: "One Dashboard vs 10 Spreadsheets",
    titleAr: "لوحة واحدة مقابل 10 جداول",
    caption:
      "When data is fragmented, decisions are slow. Centralized dashboards help leadership act faster and teams execute with confidence.",
    captionAr:
      "عندما تكون البيانات متفرقة، تصبح القرارات بطيئة. لوحة مركزية تساعد الإدارة على اتخاذ قرارات أسرع والتنفيذ بثقة.",
    cta: "Book a dashboard strategy call",
    ctaAr: "احجز مكالمة استراتيجية لوحة التحكم",
    visual: "Quick transition from spreadsheet chaos to clean dashboard UI.",
    visualAr: "انتقال سريع من فوضى الجداول إلى لوحة تحكم واضحة.",
  },
  {
    id: "post-9",
    platform: "LinkedIn",
    platformAr: "LinkedIn",
    title: "Case Style Post: From Delay to Delivery",
    titleAr: "منشور حالة: من التأخير إلى التسليم",
    caption:
      "We helped a team move from delayed releases to predictable delivery cycles by redesigning workflow and technical architecture.",
    captionAr:
      "ساعدنا فريقًا على الانتقال من إطلاقات متأخرة إلى دورات تسليم واضحة عبر إعادة تصميم سير العمل والبنية التقنية.",
    cta: "See how we can do this for your team",
    ctaAr: "شاهد كيف نطبق ذلك على فريقك",
    visual: "Timeline card with 'Before / After / Outcome' blocks.",
    visualAr: "بطاقة زمنية: قبل / بعد / النتيجة.",
  },
  {
    id: "post-10",
    platform: "Instagram Carousel",
    platformAr: "كاروسيل إنستغرام",
    title: "Your App Idea Is Not Late - Your Execution Plan Is Missing",
    titleAr: "فكرتك ليست متأخرة، خطة التنفيذ هي المفقودة",
    caption:
      "Many founders delay launch because the plan is unclear. Define offer, scope, timeline, and channel strategy - then execute.",
    captionAr:
      "الكثير من المؤسسين يؤخرون الإطلاق لأن الخطة غير واضحة. حدد العرض والنطاق والجدول واستراتيجية القنوات ثم نفّذ.",
    cta: "Get your execution roadmap",
    ctaAr: "احصل على خارطة تنفيذك",
    visual: "Roadmap graphic with 4 phases and milestone checks.",
    visualAr: "جرافيك خارطة طريق بـ 4 مراحل ونقاط إنجاز.",
  },
  {
    id: "post-11",
    platform: "Meta Ads",
    platformAr: "إعلانات Meta",
    title: "Why Most Campaigns Fail After Week 2",
    titleAr: "لماذا تفشل أغلب الحملات بعد الأسبوع الثاني",
    caption:
      "Not because of platform quality - because teams stop testing angles and creatives. Winning campaigns iterate weekly.",
    captionAr:
      "ليس بسبب جودة المنصة، بل لأن الفرق تتوقف عن اختبار الرسائل والتصاميم. الحملات الناجحة تُحسّن أسبوعيًا.",
    cta: "Use our weekly optimization checklist",
    ctaAr: "استخدم قائمة التحسين الأسبوعية",
    visual: "Checklist visual with weekly optimization routine.",
    visualAr: "تصميم قائمة مراجعة للتحسين الأسبوعي.",
  },
  {
    id: "post-12",
    platform: "LinkedIn",
    platformAr: "LinkedIn",
    title: "The 5-Minute Rule That Increases Close Rate",
    titleAr: "قاعدة 5 دقائق التي ترفع نسبة الإغلاق",
    caption:
      "Lead response time can make or break conversion. Teams that respond in under 5 minutes close more deals consistently.",
    captionAr:
      "سرعة الرد على العميل قد تصنع أو تكسر التحويل. الفرق التي ترد خلال أقل من 5 دقائق تغلق صفقات أكثر بشكل ثابت.",
    cta: "Get our lead response SOP",
    ctaAr: "احصل على SOP للاستجابة السريعة",
    visual: "Timer-based creative with response speed benchmark.",
    visualAr: "تصميم مؤقت يبرز معيار سرعة الاستجابة.",
  },
];

const serviceBlueprints: Record<string, CampaignBlueprint> = {
  "custom-mobile-app-development": {
    audience:
      "Product owners and founders launching customer-facing mobile products in KSA.",
    audienceAr:
      "مديرو المنتجات والمؤسسون الذين يطلقون تطبيقات جوال موجهة للعملاء في السعودية.",
    offer:
      "Free app architecture session + feature-priority roadmap with timeline.",
    offerAr:
      "جلسة مجانية لهندسة التطبيق + خارطة أولويات الميزات مع جدول زمني.",
    hook:
      "Most mobile apps fail from poor execution, not poor ideas. Build it right from day one.",
    hookAr:
      "أغلب تطبيقات الجوال تفشل بسبب التنفيذ وليس الفكرة. ابدأ بشكل صحيح من اليوم الأول.",
    channels: ["Meta Lead Ads", "Google UAC/Search", "TikTok Ads", "Remarketing"],
    channelsAr: ["إعلانات Meta", "Google UAC/بحث", "إعلانات TikTok", "إعادة الاستهداف"],
    headlineIdeas: [
      "Launch a mobile app users keep coming back to.",
      "From concept to App Store faster with a proven team.",
      "Build your app once - scale it across iOS and Android.",
    ],
    headlineIdeasAr: [
      "أطلق تطبيق جوال يعود إليه المستخدمون باستمرار.",
      "من الفكرة إلى المتجر بسرعة مع فريق مجرّب.",
      "ابنِ التطبيق مرة واحدة وتوسع على iOS وAndroid.",
    ],
    visualIdeas: [
      "Phone mockups showing onboarding -> action -> conversion flow",
      "Performance dashboard with retention and session metrics",
      "Creative split: unpolished app vs polished premium UX",
      "Founder quote + launch milestone timeline",
    ],
    visualIdeasAr: [
      "موك أب للهاتف يعرض رحلة المستخدم من التسجيل إلى التحويل",
      "لوحة أداء بمؤشرات الاحتفاظ والتفاعل",
      "مقارنة بصرية بين تطبيق ضعيف وتطبيق احترافي",
      "اقتباس مؤسس مع خط زمني للإطلاق",
    ],
    cta: "Get My App Roadmap",
    ctaAr: "احصل على خارطة تطبيقك",
    adCopy:
      "Planning a mobile app? Get a practical roadmap covering architecture, MVP scope, and launch timeline in one free strategy call.",
    adCopyAr:
      "تخطط لتطبيق جوال؟ احصل على خارطة عملية تشمل البنية التقنية ونطاق MVP وجدول الإطلاق في مكالمة استراتيجية مجانية.",
  },
  "custom-web-development": {
    audience:
      "Operations teams and businesses replacing legacy portals or spreadsheets.",
    audienceAr:
      "فرق التشغيل والشركات التي تستبدل البوابات القديمة أو العمل بالجداول اليدوية.",
    offer:
      "Free system audit + migration plan from legacy workflow to modern web platform.",
    offerAr:
      "تدقيق مجاني للنظام + خطة انتقال من الأنظمة القديمة إلى منصة ويب حديثة.",
    hook:
      "Legacy systems slow growth and burn budget. Modernize with measurable ROI.",
    hookAr:
      "الأنظمة القديمة تبطئ النمو وتستهلك الميزانية. حدّثها بعائد واضح.",
    channels: ["Google Search", "LinkedIn Sponsored", "YouTube B2B", "Email nurture"],
    channelsAr: ["بحث Google", "LinkedIn Sponsored", "YouTube للأعمال", "رعاية عبر البريد"],
    headlineIdeas: [
      "Replace slow legacy tools with a scalable web platform.",
      "Modern web systems that cut manual operations by design.",
      "Build once. Automate workflows for every team.",
    ],
    headlineIdeasAr: [
      "استبدل الأنظمة البطيئة بمنصة ويب قابلة للتوسع.",
      "أنظمة ويب حديثة تقلل العمل اليدوي من الأساس.",
      "ابنِ مرة واحدة وأتمت سير العمل لكل الفرق.",
    ],
    visualIdeas: [
      "Before/after process map: 10 manual steps to 3 automated steps",
      "Admin dashboard mockup with approvals, tasks, and KPIs",
      "Legacy UI screenshot contrasted with modern interface",
      "ROI creative showing time saved per month",
    ],
    visualIdeasAr: [
      "خريطة عمليات قبل/بعد: 10 خطوات يدوية إلى 3 خطوات مؤتمتة",
      "موك أب لوحة إدارة تعرض الموافقات والمهام والمؤشرات",
      "مقارنة بين واجهة قديمة وواجهة حديثة",
      "تصميم عائد استثمار يوضح الوقت الموفّر شهريًا",
    ],
    cta: "Book Modernization Audit",
    ctaAr: "احجز تدقيق التحديث",
    adCopy:
      "If your team still depends on legacy tools, you're paying with delay and rework. Book a free modernization audit and see your upgrade path.",
    adCopyAr:
      "إذا كان فريقك ما زال يعتمد على أدوات قديمة فأنت تدفع ثمن التأخير وإعادة العمل. احجز تدقيق تحديث مجاني واعرف مسار التطوير.",
  },
  "on-demand-app-development": {
    audience:
      "Entrepreneurs building marketplaces for delivery, field services, and bookings.",
    audienceAr:
      "رواد الأعمال الذين يبنون منصات حسب الطلب للتوصيل والخدمات والحجوزات.",
    offer:
      "Marketplace launch plan + dispatch and pricing model recommendation.",
    offerAr:
      "خطة إطلاق للمنصة + توصية بنموذج التسعير وتوزيع الطلبات.",
    hook:
      "On-demand growth depends on dispatch speed, user trust, and repeat orders.",
    hookAr:
      "نجاح تطبيقات حسب الطلب يعتمد على سرعة التوزيع وثقة المستخدم وتكرار الطلب.",
    channels: ["Meta Ads", "TikTok", "Google Search", "Influencer UGC"],
    channelsAr: ["إعلانات Meta", "TikTok", "بحث Google", "محتوى صناع UGC"],
    headlineIdeas: [
      "Build your on-demand platform with real-time dispatch that scales.",
      "From booking to payment in one seamless customer flow.",
      "Launch the app that connects customers and providers instantly.",
    ],
    headlineIdeasAr: [
      "ابنِ منصة حسب الطلب مع توزيع فوري قابل للتوسع.",
      "من الحجز إلى الدفع في رحلة عميل سلسة.",
      "أطلق تطبيقًا يربط العملاء بمقدمي الخدمة فورًا.",
    ],
    visualIdeas: [
      "Map-based creative with live service requests and provider routes",
      "3-sided ecosystem visual: customer, provider, admin",
      "Order lifecycle carousel: request -> dispatch -> completion",
      "Trust badges: rating, live tracking, payment protection",
    ],
    visualIdeasAr: [
      "تصميم خرائط مع طلبات مباشرة ومسارات مقدمي الخدمة",
      "تصميم النظام الثلاثي: عميل، مقدم خدمة، إدارة",
      "كاروسيل دورة الطلب: طلب -> توزيع -> إتمام",
      "شارات ثقة: تقييمات، تتبع مباشر، حماية الدفع",
    ],
    cta: "Get On-Demand Launch Plan",
    ctaAr: "احصل على خطة الإطلاق",
    adCopy:
      "Planning an on-demand app? We help you launch with smart dispatch, live tracking, and retention-focused UX from the first release.",
    adCopyAr:
      "تخطط لتطبيق حسب الطلب؟ نساعدك على الإطلاق بتوزيع ذكي وتتبع مباشر وتجربة استخدام ترفع الاحتفاظ من أول نسخة.",
  },
  "clone-app-development": {
    audience:
      "Founders who want proven business models without starting from zero.",
    audienceAr:
      "مؤسسون يريدون نموذجًا مجربًا دون بدء المشروع من الصفر.",
    offer:
      "Fast-launch blueprint with customization scope and go-live estimate.",
    offerAr:
      "مخطط إطلاق سريع مع نطاق التخصيص وتقدير وقت التشغيل.",
    hook:
      "Skip expensive trial-and-error. Start from a validated product model.",
    hookAr:
      "تجاوز التجارب المكلفة. ابدأ من نموذج منتج مثبت.",
    channels: ["Meta", "Google Search", "LinkedIn", "Retargeting"],
    channelsAr: ["Meta", "بحث Google", "LinkedIn", "إعادة الاستهداف"],
    headlineIdeas: [
      "Launch a proven app model in weeks, not months.",
      "White-label foundation. Your brand. Your growth strategy.",
      "Start with what works, then scale with custom features.",
    ],
    headlineIdeasAr: [
      "أطلق نموذج تطبيق مثبت خلال أسابيع لا أشهر.",
      "أساس White-label مع علامتك واستراتيجية نموك.",
      "ابدأ بما يعمل ثم توسع بميزات مخصصة.",
    ],
    visualIdeas: [
      "Brand customization sequence: template -> branded final product",
      "Time-to-market bar chart comparing custom build vs clone model",
      "Feature block cards with pricing anchors",
      "Launch checklist visual with completed milestones",
    ],
    visualIdeasAr: [
      "تسلسل تخصيص العلامة: قالب -> منتج نهائي بهويتك",
      "مخطط يوضح فرق وقت الإطلاق بين الصفر والحل الجاهز",
      "بطاقات ميزات مع نقاط سعر واضحة",
      "قائمة إطلاق مرئية مع مراحل مكتملة",
    ],
    cta: "See Clone Options",
    ctaAr: "استعرض خيارات الاستنساخ",
    adCopy:
      "Want to launch faster with less risk? Start from a proven app architecture and customize it for your market.",
    adCopyAr:
      "تريد الإطلاق أسرع وبمخاطر أقل؟ ابدأ من بنية تطبيق مجرّبة ثم خصصها لسوقك.",
  },
  "ui-ux-design-services": {
    audience:
      "SaaS founders and product teams facing low conversion and high drop-off.",
    audienceAr:
      "مؤسسو SaaS وفرق المنتجات التي تواجه تحويلًا منخفضًا وتسربًا عاليًا.",
    offer:
      "UX conversion audit + redesigned high-impact funnel screens.",
    offerAr:
      "تدقيق تحويل UX + إعادة تصميم الشاشات الأكثر تأثيرًا على التحويل.",
    hook:
      "Great design is not decoration - it is your conversion engine.",
    hookAr:
      "التصميم الممتاز ليس شكلاً فقط، بل محرك التحويل الحقيقي.",
    channels: ["LinkedIn", "Meta", "Dribbble/Behance traffic", "Email remarketing"],
    channelsAr: ["LinkedIn", "Meta", "زيارات Dribbble/Behance", "إعادة تسويق بالبريد"],
    headlineIdeas: [
      "Fix UX leaks and turn visits into qualified leads.",
      "Design decisions backed by user behavior, not guesswork.",
      "Ship cleaner interfaces that users trust and convert in.",
    ],
    headlineIdeasAr: [
      "أغلق تسربات UX وحوّل الزيارات إلى عملاء محتملين.",
      "قرارات تصميم مبنية على سلوك المستخدم لا التخمين.",
      "أطلق واجهات أنظف يثق بها المستخدم وتحقق تحويلًا أعلى.",
    ],
    visualIdeas: [
      "Heatmap-inspired creative highlighting click and drop points",
      "Before/after UI redesign with conversion percentage uplift",
      "User journey storyboard from confusion to completion",
      "Figma-style component system preview for credibility",
    ],
    visualIdeasAr: [
      "تصميم مستوحى من خرائط الحرارة يوضح نقاط التسرب",
      "قبل/بعد للتصميم مع نسبة تحسن التحويل",
      "لوحة رحلة المستخدم من الارتباك إلى الإتمام",
      "عرض نظام تصميم بأسلوب Figma لبناء المصداقية",
    ],
    cta: "Get UX Conversion Audit",
    ctaAr: "احصل على تدقيق UX",
    adCopy:
      "If users are dropping before conversion, the issue is likely UX. Get an actionable conversion audit and redesign priorities.",
    adCopyAr:
      "إذا كان المستخدمون يغادرون قبل التحويل فالمشكلة غالبًا في UX. احصل على تدقيق عملي وأولويات إعادة التصميم.",
  },
  "technology-consulting-services": {
    audience:
      "CEOs and CTOs making architecture, scaling, or transformation decisions.",
    audienceAr:
      "الرؤساء التنفيذيون والمديرون التقنيون الذين يتخذون قرارات البنية والتوسع والتحول.",
    offer:
      "Executive technology advisory session + 90-day action roadmap.",
    offerAr:
      "جلسة استشارية تنفيذية + خارطة عمل تقنية لمدة 90 يومًا.",
    hook:
      "Bad technology decisions are expensive. Make high-confidence moves with expert guidance.",
    hookAr:
      "القرارات التقنية الخاطئة مكلفة. اتخذ قرارات واثقة بإرشاد الخبراء.",
    channels: ["LinkedIn", "Google Search", "Webinar registration", "Email sequence"],
    channelsAr: ["LinkedIn", "بحث Google", "تسجيل ويبِنار", "تسلسل بريد"],
    headlineIdeas: [
      "Make your next tech decision with board-level confidence.",
      "Align architecture, budget, and growth in one roadmap.",
      "From technical uncertainty to clear execution priorities.",
    ],
    headlineIdeasAr: [
      "اتخذ قرارك التقني القادم بثقة على مستوى الإدارة العليا.",
      "وحّد البنية والميزانية والنمو في خارطة واحدة.",
      "من ضبابية تقنية إلى أولويات تنفيذ واضحة.",
    ],
    visualIdeas: [
      "Roadmap timeline with quarterly milestones and outcomes",
      "Decision matrix creative: cost, risk, speed, scalability",
      "Executive workshop scene with system architecture overlay",
      "KPI-based transformation dashboard concept",
    ],
    visualIdeasAr: [
      "خط زمني بخارطة طريق ومخرجات ربع سنوية",
      "مصفوفة قرار: تكلفة، مخاطر، سرعة، قابلية توسع",
      "مشهد ورشة تنفيذية مع مخطط بنية النظام",
      "تصور لوحة تحول رقمي قائمة على KPI",
    ],
    cta: "Book Advisory Session",
    ctaAr: "احجز جلسة استشارية",
    adCopy:
      "Before investing in new tools or teams, validate your strategy. Book an executive advisory session and get a 90-day execution roadmap.",
    adCopyAr:
      "قبل الاستثمار في أدوات أو فرق جديدة، تحقّق من استراتيجيتك. احجز جلسة استشارية تنفيذية واحصل على خارطة تنفيذ 90 يومًا.",
  },
};

const solutionBlueprints: Record<string, CampaignBlueprint> = {
  "hq-trivia-clone": {
    audience:
      "Media brands and creators launching interactive live engagement formats.",
    audienceAr:
      "العلامات الإعلامية وصناع المحتوى الذين يطلقون تجارب تفاعل مباشر.",
    offer:
      "Go-to-market game show plan including retention loop and prize model.",
    offerAr:
      "خطة دخول للسوق تشمل حلقة الاحتفاظ ونموذج الجوائز.",
    hook:
      "Turn passive viewers into active players with real-time engagement.",
    hookAr:
      "حوّل المشاهدين السلبيين إلى لاعبين متفاعلين في الوقت الحقيقي.",
    channels: ["TikTok", "Instagram Reels", "YouTube", "Influencer collabs"],
    channelsAr: ["TikTok", "Instagram Reels", "YouTube", "تعاون المؤثرين"],
    headlineIdeas: [
      "Build the next live trivia experience your audience waits for.",
      "Engagement, competition, and rewards in one viral format.",
      "Launch a real-time game platform that keeps users returning.",
    ],
    headlineIdeasAr: [
      "ابنِ تجربة تريفيا مباشرة ينتظرها جمهورك.",
      "تفاعل ومنافسة وجوائز في صيغة واحدة قابلة للانتشار.",
      "أطلق منصة ألعاب مباشرة تعيد المستخدمين باستمرار.",
    ],
    visualIdeas: [
      "Live host + countdown + leaderboard composite creative",
      "Winner celebration frame with prize payout visual",
      "Realtime participation counter overlay",
      "Swipe carousel: join -> play -> win",
    ],
    visualIdeasAr: [
      "تصميم مذيع مباشر + عد تنازلي + لوحة متصدرين",
      "إطار إعلان فائز مع تصور الجائزة",
      "طبقة رقمية لعدد المشاركين المباشر",
      "كاروسيل: انضم -> العب -> اربح",
    ],
    cta: "Get Live Trivia Launch Plan",
    ctaAr: "احصل على خطة إطلاق التريفيا",
    adCopy:
      "Want a high-engagement media product? Launch a live trivia platform with real-time participation, rewards, and repeat sessions.",
    adCopyAr:
      "تريد منتجًا إعلاميًا عالي التفاعل؟ أطلق منصة تريفيا مباشرة مع مشاركة لحظية وجوائز وجلسات متكررة.",
  },
  "food-delivery-app-development": {
    audience:
      "Restaurant groups, cloud kitchens, and delivery-first startups.",
    audienceAr:
      "سلاسل المطاعم والمطابخ السحابية والشركات الناشئة المعتمدة على التوصيل.",
    offer:
      "Delivery unit economics review + launch model for your city.",
    offerAr:
      "تحليل اقتصاديات التوصيل + نموذج إطلاق مناسب لمدينتك.",
    hook:
      "Own your delivery channel and stop losing margin to aggregators.",
    hookAr:
      "امتلك قناة التوصيل الخاصة بك وتوقف عن خسارة الهامش للوسطاء.",
    channels: ["Meta", "Google Search", "Snap Ads", "WhatsApp retargeting"],
    channelsAr: ["Meta", "بحث Google", "إعلانات Snapchat", "إعادة استهداف واتساب"],
    headlineIdeas: [
      "Build your own food delivery app and keep more profit.",
      "From order to doorstep with smart dispatch and live tracking.",
      "Scale restaurant delivery operations with one unified platform.",
    ],
    headlineIdeasAr: [
      "ابنِ تطبيق توصيلك الخاص واحتفظ بهامش ربح أعلى.",
      "من الطلب إلى باب العميل مع توزيع ذكي وتتبع مباشر.",
      "وسّع عمليات التوصيل عبر منصة موحدة.",
    ],
    visualIdeas: [
      "Order journey storyboard: menu -> checkout -> rider live map",
      "Margin comparison creative: aggregator vs owned app",
      "Restaurant dashboard mockup with peak-time order flow",
      "Driver fleet map with optimized route lines",
    ],
    visualIdeasAr: [
      "قصة الطلب بصريًا: قائمة -> دفع -> تتبع السائق",
      "مقارنة هامش الربح: منصة وسيطة مقابل تطبيقك الخاص",
      "موك أب لوحة مطعم مع تدفق الطلبات وقت الذروة",
      "خريطة أسطول السائقين مع مسارات محسنة",
    ],
    cta: "Plan My Delivery Platform",
    ctaAr: "خطط منصة التوصيل الخاصة بي",
    adCopy:
      "If delivery is core to your revenue, your app should be core to your strategy. Get a launch plan built around your market and margins.",
    adCopyAr:
      "إذا كان التوصيل جزءًا أساسيًا من إيراداتك، فالتطبيق يجب أن يكون جزءًا أساسيًا من استراتيجيتك. احصل على خطة إطلاق مبنية على سوقك وهوامشك.",
  },
  "ecommerce-app-development": {
    audience:
      "Retail brands and marketplaces looking to increase direct digital sales.",
    audienceAr:
      "العلامات التجارية والمتاجر التي تريد رفع المبيعات الرقمية المباشرة.",
    offer:
      "Free conversion funnel review + catalog and checkout optimization plan.",
    offerAr:
      "مراجعة مجانية لقمع التحويل + خطة تحسين الكتالوج والدفع.",
    hook:
      "Traffic is expensive. Better conversion and repeat purchase win growth.",
    hookAr:
      "الزيارات مكلفة. النمو الحقيقي يأتي من رفع التحويل وتكرار الشراء.",
    channels: ["Google Shopping/Search", "Meta Catalog Ads", "TikTok", "Email"],
    channelsAr: ["Google Shopping/بحث", "إعلانات كتالوج Meta", "TikTok", "البريد الإلكتروني"],
    headlineIdeas: [
      "Turn visits into orders with a conversion-first e-commerce platform.",
      "Build an online store optimized for repeat purchases.",
      "Launch your marketplace with scalable checkout and inventory flows.",
    ],
    headlineIdeasAr: [
      "حوّل الزيارات إلى طلبات عبر منصة تجارة تركز على التحويل.",
      "ابنِ متجرًا إلكترونيًا يحفز إعادة الشراء.",
      "أطلق سوقك الإلكتروني مع دفع ومخزون قابلين للتوسع.",
    ],
    visualIdeas: [
      "Checkout flow creative showing reduced friction steps",
      "AOV and conversion KPI cards on mobile storefront mockup",
      "Catalog grid with smart filtering and personalization",
      "Retention loop visual: first order -> loyalty -> repeat order",
    ],
    visualIdeasAr: [
      "تصميم رحلة الدفع مع تقليل خطوات الاحتكاك",
      "بطاقات KPI لقيمة السلة ومعدل التحويل على موك أب المتجر",
      "شبكة منتجات مع تصفية وتخصيص ذكي",
      "حلقة احتفاظ: أول طلب -> ولاء -> إعادة شراء",
    ],
    cta: "Optimize My E-Commerce Funnel",
    ctaAr: "حسّن قمع التجارة الإلكترونية",
    adCopy:
      "Your next revenue jump can come from better conversion, not bigger ad spend. Get a tailored e-commerce build and optimization plan.",
    adCopyAr:
      "قفزتك القادمة في الإيرادات قد تأتي من تحسين التحويل لا زيادة الإنفاق الإعلاني. احصل على خطة بناء وتحسين مخصصة.",
  },
  "car-wash-app-development": {
    audience:
      "Car wash operators and entrepreneurs launching mobile detailing services.",
    audienceAr:
      "مشغلو غسيل السيارات ورواد الأعمال الذين يطلقون خدمات متنقلة.",
    offer:
      "Local launch blueprint with service packages and subscription model.",
    offerAr:
      "مخطط إطلاق محلي يشمل الباقات ونموذج الاشتراكات.",
    hook:
      "Customers want convenience. Bring car care to their location with one tap.",
    hookAr:
      "العملاء يريدون الراحة. أوصل خدمة العناية بالسيارة لموقعهم بضغطة واحدة.",
    channels: ["Snapchat", "Instagram", "Google Maps/Search", "Retargeting"],
    channelsAr: ["Snapchat", "Instagram", "خرائط/بحث Google", "إعادة الاستهداف"],
    headlineIdeas: [
      "Launch a mobile car wash app your city will use weekly.",
      "Book, track, and pay for car care in minutes.",
      "Grow recurring revenue with car wash subscriptions.",
    ],
    headlineIdeasAr: [
      "أطلق تطبيق غسيل سيارات متنقل يستخدمه السوق أسبوعيًا.",
      "احجز وتتبع وادفع لخدمة السيارة خلال دقائق.",
      "زد الإيراد المتكرر عبر اشتراكات غسيل السيارات.",
    ],
    visualIdeas: [
      "Before/after car shine creative with time-to-service badge",
      "Home pin map showing technician arrival tracking",
      "Service package cards (basic, premium, detailing)",
      "Subscription savings comparison visual",
    ],
    visualIdeasAr: [
      "تصميم قبل/بعد للسيارة مع وقت وصول الخدمة",
      "خريطة بموقع العميل وتتبّع وصول الفني",
      "بطاقات باقات الخدمة (أساسي، بريميوم، تفصيلي)",
      "تصميم مقارنة توفير الاشتراك",
    ],
    cta: "Launch My Car Wash App",
    ctaAr: "أطلق تطبيق غسيل السيارات",
    adCopy:
      "Take your car wash business from phone calls to scalable bookings. Launch a branded app with live tracking and recurring packages.",
    adCopyAr:
      "انقل مشروع غسيل السيارات من الاتصالات العشوائية إلى حجوزات قابلة للتوسع. أطلق تطبيقًا بعلامتك مع تتبع مباشر وباقات متكررة.",
  },
  "laundry-app-development": {
    audience:
      "Laundry chains and startup operators offering pickup and delivery services.",
    audienceAr:
      "سلاسل المغاسل ورواد الأعمال الذين يقدمون الاستلام والتوصيل.",
    offer:
      "Process automation blueprint from pickup scheduling to delivery confirmation.",
    offerAr:
      "مخطط أتمتة العمليات من جدولة الاستلام إلى تأكيد التسليم.",
    hook:
      "Manual order handling creates delays and lost orders. Automate the full laundry cycle.",
    hookAr:
      "إدارة الطلبات يدويًا تسبب تأخيرًا وفقدانًا للطلبات. أتمت الدورة الكاملة للخدمة.",
    channels: ["Google Search", "Meta Local Ads", "WhatsApp", "SMS retargeting"],
    channelsAr: ["بحث Google", "إعلانات محلية Meta", "واتساب", "إعادة استهداف SMS"],
    headlineIdeas: [
      "Digitize your laundry operations from pickup to delivery.",
      "Reduce missed orders and improve service speed.",
      "Launch a laundry app designed for repeat weekly orders.",
    ],
    headlineIdeasAr: [
      "رقمن عمليات المغسلة من الاستلام حتى التسليم.",
      "قلل الطلبات المفقودة وارفع سرعة الخدمة.",
      "أطلق تطبيق غسيل مصمم للطلبات الأسبوعية المتكررة.",
    ],
    visualIdeas: [
      "Operational pipeline visual: pickup -> processing -> delivery",
      "Customer app and driver app side-by-side mockups",
      "Recurring order calendar UI concept",
      "Branch dashboard highlighting workload and SLA",
    ],
    visualIdeasAr: [
      "مسار تشغيلي بصري: استلام -> معالجة -> تسليم",
      "موك أب تطبيق العميل وتطبيق السائق جنبًا إلى جنب",
      "تصور واجهة طلبات متكررة مع تقويم",
      "لوحة فروع تعرض الأحمال ومؤشر الالتزام بالخدمة",
    ],
    cta: "Digitize My Laundry Service",
    ctaAr: "رقمن خدمة المغسلة",
    adCopy:
      "Laundry growth depends on reliable operations. Launch a platform that automates booking, processing, and delivery updates end-to-end.",
    adCopyAr:
      "نمو خدمات الغسيل يعتمد على تشغيل موثوق. أطلق منصة تؤتمت الحجز والمعالجة وتحديثات التسليم من البداية للنهاية.",
  },
  "elearning-app-development": {
    audience:
      "Education businesses, academies, and experts monetizing digital courses.",
    audienceAr:
      "شركات التعليم والأكاديميات والخبراء الذين يبيعون دورات رقمية.",
    offer:
      "Course platform growth plan with learner engagement and retention strategy.",
    offerAr:
      "خطة نمو منصة تعليم تشمل استراتيجية التفاعل والاحتفاظ بالمتعلمين.",
    hook:
      "Great courses need a platform that keeps learners engaged and progressing.",
    hookAr:
      "الدورات القوية تحتاج منصة تحافظ على تفاعل المتعلم وتقدمه.",
    channels: ["Meta", "YouTube", "Google Search", "Email funnels"],
    channelsAr: ["Meta", "YouTube", "بحث Google", "قمع البريد"],
    headlineIdeas: [
      "Launch an e-learning platform that drives completion and renewals.",
      "From recorded lessons to a full learning business.",
      "Scale your academy with certificates, quizzes, and live sessions.",
    ],
    headlineIdeasAr: [
      "أطلق منصة تعليم ترفع الإكمال وتجديد الاشتراك.",
      "من دروس مسجلة إلى مشروع تعليمي متكامل.",
      "وسّع أكاديميتك بشهادات واختبارات وجلسات مباشرة.",
    ],
    visualIdeas: [
      "Student progress dashboard with completion milestones",
      "Course journey carousel: enroll -> learn -> certify",
      "Instructor panel mockup with revenue and engagement stats",
      "Certificate unlock visual as motivational trigger",
    ],
    visualIdeasAr: [
      "لوحة تقدم المتعلم مع مراحل الإكمال",
      "كاروسيل رحلة الدورة: تسجيل -> تعلم -> شهادة",
      "موك أب لوحة المدرب مع الإيرادات ومؤشرات التفاعل",
      "تصميم فتح الشهادة كمحفز تحفيزي",
    ],
    cta: "Build My Learning Platform",
    ctaAr: "ابنِ منصتي التعليمية",
    adCopy:
      "Ready to scale your education brand? Build a platform that improves learner completion, engagement, and recurring enrollments.",
    adCopyAr:
      "جاهز لتوسيع علامتك التعليمية؟ ابنِ منصة ترفع إكمال المتعلمين وتفاعلهم وتكرار التسجيل.",
  },
};

function toLeadCampaign(
  item: { slug: string; title: string; titleAr: string },
  isSolution = false,
): LeadCampaign {
  const source = isSolution ? solutionBlueprints : serviceBlueprints;
  const blueprint = source[item.slug];

  if (blueprint) {
    return {
      id: item.slug,
      title: item.title,
      titleAr: item.titleAr,
      ...blueprint,
    };
  }

  return {
    id: item.slug,
    title: item.title,
    titleAr: item.titleAr,
    audience: "Decision-makers looking for an effective digital growth plan.",
    audienceAr: "صناع قرار يبحثون عن خطة نمو رقمية فعّالة.",
    offer: "Free strategy call with campaign direction and next-step plan.",
    offerAr: "مكالمة استراتيجية مجانية مع اتجاه الحملة وخطة التنفيذ.",
    hook: `Position ${item.title} around business outcomes and lead conversion.`,
    hookAr: `اربط ${item.titleAr} بنتائج أعمال وتحويل فعلي للعملاء المحتملين.`,
    channels: ["Google Search", "Meta", "LinkedIn"],
    channelsAr: ["بحث Google", "Meta", "LinkedIn"],
    headlineIdeas: [
      `Use ${item.title} to move from manual operations to measurable growth.`,
      `Turn interest into qualified leads with ${item.title}.`,
      "Launch with a clear value proposition and conversion-first messaging.",
    ],
    headlineIdeasAr: [
      `استخدم ${item.titleAr} للانتقال من العمل اليدوي إلى نمو قابل للقياس.`,
      `حوّل الاهتمام إلى عملاء محتملين مؤهلين عبر ${item.titleAr}.`,
      "أطلق برسالة قيمة واضحة ومحتوى يركز على التحويل.",
    ],
    visualIdeas: [
      "Outcome-focused before/after comparison visual",
      "Simple KPI card design with growth signals",
      "Problem -> solution -> result carousel",
      "Trust and proof card with one strong stat",
    ],
    visualIdeasAr: [
      "مقارنة قبل/بعد تركز على النتيجة",
      "تصميم مؤشرات أداء بسيطة مع إشارات نمو",
      "كاروسيل: المشكلة -> الحل -> النتيجة",
      "بطاقة ثقة وإثبات مع رقم قوي",
    ],
    cta: "Get My Campaign Plan",
    ctaAr: "احصل على خطة الحملة",
    adCopy:
      "Get a lead-generation plan tailored to your service and audience, with clear messaging, creative direction, and conversion-focused CTA.",
    adCopyAr:
      "احصل على خطة توليد عملاء محتملين مخصصة لخدمتك وجمهورك مع رسالة واضحة وتوجه إبداعي وCTA يركز على التحويل.",
  };
}

function campaignCategories(): Record<string, CampaignCategory> {
  const serviceCampaigns = services.slice(0, 6).map((item) => toLeadCampaign(item, false));
  const solutionCampaigns = businessModels
    .slice(0, 6)
    .map((item) => toLeadCampaign(item, true));

  const awarenessCreative: LeadCampaign[] = [
    {
      id: "awareness-transformation",
      title: "Digital Transformation Awareness",
      titleAr: "التوعية بالتحول الرقمي",
      audience: "SME owners dealing with fragmented tools and manual operations.",
      audienceAr: "أصحاب الشركات المتوسطة الذين يعانون من أدوات متفرقة وعمليات يدوية.",
      offer: "Free workflow assessment call.",
      offerAr: "مكالمة تقييم مجانية لسير العمل.",
      hook: "Manual operations are costing you growth every week.",
      hookAr: "العمليات اليدوية تكلفك فرص نمو كل أسبوع.",
      channels: ["LinkedIn", "Instagram", "YouTube Shorts"],
      channelsAr: ["LinkedIn", "Instagram", "YouTube Shorts"],
      headlineIdeas: [
        "Your business outgrew spreadsheets. Your systems should too.",
        "Stop patching tools. Build one scalable operation stack.",
        "Growth is hard. Operations should not be.",
      ],
      headlineIdeasAr: [
        "أعمالك تجاوزت الجداول اليدوية. أنظمتك يجب أن تتطور أيضًا.",
        "توقف عن ترقيع الأدوات. ابنِ نظام تشغيل موحد قابل للتوسع.",
        "النمو صعب بما يكفي. العمليات يجب أن تكون أسهل.",
      ],
      visualIdeas: [
        "Messy icons (chat, excel, tasks) transforming into one clean dashboard",
        "Comparison creative: 12 manual steps vs 3 automated steps",
        "Founder quote visual with pain point and outcome",
      ],
      visualIdeasAr: [
        "أيقونات متفرقة تتحول إلى لوحة تحكم واحدة منظمة",
        "مقارنة بصرية: 12 خطوة يدوية مقابل 3 خطوات مؤتمتة",
        "تصميم اقتباس مؤسس: المشكلة ثم النتيجة",
      ],
      cta: "Audit My Workflow",
      ctaAr: "قيّم سير عملي",
      adCopy:
        "If your team is still running key processes manually, your growth is leaking. Book a free workflow assessment.",
      adCopyAr:
        "إذا كان فريقك ما زال يدير العمليات الأساسية يدويًا، فأنت تخسر نموًا فعليًا. احجز تقييم سير عمل مجاني.",
    },
    {
      id: "awareness-speed-to-market",
      title: "Speed-To-Market Offer",
      titleAr: "عرض سرعة الإطلاق",
      audience: "Founders validating new products or service lines.",
      audienceAr: "رواد أعمال يختبرون منتجات أو خدمات جديدة.",
      offer: "Launch roadmap in 48 hours.",
      offerAr: "خارطة إطلاق خلال 48 ساعة.",
      hook: "Delayed launch means delayed revenue.",
      hookAr: "تأخير الإطلاق يعني تأخير الإيرادات.",
      channels: ["Meta Ads", "Google Search", "Retargeting"],
      channelsAr: ["إعلانات Meta", "بحث Google", "إعادة الاستهداف"],
      headlineIdeas: [
        "Ship in weeks, not quarters.",
        "Your idea is ready. Your product should be too.",
        "Launch faster with less execution risk.",
      ],
      headlineIdeasAr: [
        "أطلق خلال أسابيع وليس أرباع سنة.",
        "فكرتك جاهزة، ومنتجك يجب أن يكون كذلك.",
        "إطلاق أسرع مع مخاطر تنفيذ أقل.",
      ],
      visualIdeas: [
        "Countdown timer creative with launch milestone markers",
        "Roadmap carousel: Discovery -> Build -> Launch",
        "Fast/slow split visual with outcomes",
      ],
      visualIdeasAr: [
        "تصميم عد تنازلي مع مراحل الإطلاق",
        "كاروسيل خارطة طريق: تحليل -> تطوير -> إطلاق",
        "مقارنة بصرية بين الإطلاق السريع والبطيء",
      ],
      cta: "Get My Launch Plan",
      ctaAr: "احصل على خطة الإطلاق",
      adCopy:
        "Every month of delay costs momentum. Get a practical launch roadmap built for your budget and timeline.",
      adCopyAr:
        "كل شهر تأخير يكلفك زخمًا حقيقيًا. احصل على خارطة إطلاق عملية تناسب ميزانيتك وجدولك.",
    },
  ];

  return {
    services: {
      label: "Services",
      labelAr: "الخدمات",
      description:
        "Lead-gen creative ideas for custom software services.",
      descriptionAr: "أفكار إبداعية لتوليد العملاء لخدمات البرمجيات المخصصة.",
      campaigns: serviceCampaigns,
    },
    solutions: {
      label: "Pre-Built Solutions",
      labelAr: "الحلول الجاهزة",
      description:
        "Creative concepts focused on quick launch and lower cost.",
      descriptionAr:
        "مفاهيم إبداعية تركز على سرعة الإطلاق وخفض التكلفة.",
      campaigns: solutionCampaigns,
    },
    awareness: {
      label: "Awareness Concepts",
      labelAr: "أفكار توعوية",
      description:
        "Top-of-funnel creative ideas that still drive qualified inquiry.",
      descriptionAr: "أفكار توعوية أعلى القمع لكنها موجهة لجلب استفسارات مؤهلة.",
      campaigns: awarenessCreative,
    },
  };
}

function LeadCampaignCard({
  campaign,
  isAr,
}: {
  campaign: LeadCampaign;
  isAr: boolean;
}) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copySuggestion = async () => {
    const content = isAr
      ? `الحملة: ${campaign.titleAr}
الجمهور: ${campaign.audienceAr}
العرض: ${campaign.offerAr}
الزاوية: ${campaign.hookAr}
القنوات: ${campaign.channelsAr.join(" | ")}
أفكار عناوين:
${campaign.headlineIdeasAr.map((h) => `- ${h}`).join("\n")}
أفكار تصميم:
${campaign.visualIdeasAr.map((v) => `- ${v}`).join("\n")}
CTA: ${campaign.ctaAr}
نسخة إعلان:
${campaign.adCopyAr}`
      : `Campaign: ${campaign.title}
Audience: ${campaign.audience}
Offer: ${campaign.offer}
Hook: ${campaign.hook}
Channels: ${campaign.channels.join(" | ")}
Headline Ideas:
${campaign.headlineIdeas.map((h) => `- ${h}`).join("\n")}
Visual Ideas:
${campaign.visualIdeas.map((v) => `- ${v}`).join("\n")}
CTA: ${campaign.cta}
Ad Copy:
${campaign.adCopy}`;

    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast({
      title: isAr ? "تم نسخ الاقتراح" : "Suggestion copied",
      description: isAr
        ? "تم نسخ أفكار العناوين والتصاميم مع النص الإعلاني."
        : "Headlines, visual ideas, and ad copy are copied.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-2xl leading-snug">
            {isAr ? campaign.titleAr : campaign.title}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={copySuggestion}
            data-testid={`button-copy-campaign-${campaign.id}`}
          >
            {copied ? (
              <Check className="w-4 h-4 mr-1" />
            ) : (
              <Copy className="w-4 h-4 mr-1" />
            )}
            {isAr ? "نسخ" : "Copy"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-slate-500 uppercase mb-2">
              {isAr ? "الجمهور المستهدف" : "Target Audience"}
            </p>
            <p className="text-base leading-relaxed text-slate-700">
              {isAr ? campaign.audienceAr : campaign.audience}
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-slate-500 uppercase mb-2">
              {isAr ? "العرض" : "Lead Offer"}
            </p>
            <p className="text-base leading-relaxed text-slate-700">
              {isAr ? campaign.offerAr : campaign.offer}
            </p>
          </div>
        </div>

        <div>
          <p className="text-base font-semibold mb-2">
            {isAr ? "زاوية الرسالة" : "Message Angle"}
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            {isAr ? campaign.hookAr : campaign.hook}
          </p>
        </div>

        <div>
          <p className="text-base font-semibold mb-2">
            {isAr ? "القنوات المقترحة" : "Recommended Channels"}
          </p>
          <div className="flex flex-wrap gap-2">
            {(isAr ? campaign.channelsAr : campaign.channels).map((channel) => (
              <span
                key={channel}
                className="text-sm px-3 py-1.5 rounded-md bg-slate-100 text-slate-700"
              >
                {channel}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-base font-semibold mb-2">
            {isAr ? "أفكار عناوين للـ Creative" : "Creative Headline Ideas"}
          </p>
          <ul className="space-y-2 text-base leading-relaxed text-slate-700">
            {(isAr ? campaign.headlineIdeasAr : campaign.headlineIdeas).map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-base font-semibold mb-2">
            {isAr ? "أفكار تصميم للـ Creative" : "Creative Visual Ideas"}
          </p>
          <ul className="space-y-2 text-base leading-relaxed text-slate-700">
            {(isAr ? campaign.visualIdeasAr : campaign.visualIdeas).map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-950 text-slate-100 rounded-lg p-4">
          <p className="text-sm uppercase tracking-wide text-slate-400 mb-2">
            {isAr ? "نسخة إعلان جاهزة" : "Ready Ad Copy"}
          </p>
          <p className="text-base leading-relaxed">
            {isAr ? campaign.adCopyAr : campaign.adCopy}
          </p>
        </div>

        <div className="pt-1">
          <p className="text-sm font-semibold text-slate-500 uppercase mb-1">
            {isAr ? "الدعوة للإجراء" : "Primary CTA"}
          </p>
          <p className="text-lg font-semibold text-slate-900">
            {isAr ? campaign.ctaAr : campaign.cta}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MarketingCampaigns() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const categories = campaignCategories();
  const [qualifiedRate, setQualifiedRate] = useState(60);
  const [meetingRate, setMeetingRate] = useState(50);
  const [closeRate, setCloseRate] = useState(25);
  const [platforms, setPlatforms] = useState<PlatformCalc[]>([
    { key: "google", label: "Google Search", labelAr: "بحث Google", split: 45, dailyLeadTarget: 20, dailySpend: 3400 },
    { key: "meta", label: "Meta Ads", labelAr: "إعلانات Meta", split: 30, dailyLeadTarget: 18, dailySpend: 2100 },
    { key: "linkedin", label: "LinkedIn", labelAr: "LinkedIn", split: 15, dailyLeadTarget: 6, dailySpend: 1500 },
    { key: "remarketing", label: "Remarketing", labelAr: "إعادة الاستهداف", split: 10, dailyLeadTarget: 6, dailySpend: 700 },
  ]);

  const applySplitPreset = (preset: "balanced" | "highIntent" | "socialHeavy") => {
    const splitMap =
      preset === "balanced"
        ? { google: 45, meta: 30, linkedin: 15, remarketing: 10 }
        : preset === "highIntent"
          ? { google: 55, meta: 20, linkedin: 15, remarketing: 10 }
          : { google: 30, meta: 45, linkedin: 15, remarketing: 10 };

    setPlatforms((prev) =>
      prev.map((p) => ({
        ...p,
        split: splitMap[p.key as keyof typeof splitMap] ?? p.split,
      })),
    );
  };

  const resetCalculator = () => {
    setQualifiedRate(60);
    setMeetingRate(50);
    setCloseRate(25);
    setPlatforms([
      { key: "google", label: "Google Search", labelAr: "بحث Google", split: 45, dailyLeadTarget: 20, dailySpend: 3400 },
      { key: "meta", label: "Meta Ads", labelAr: "إعلانات Meta", split: 30, dailyLeadTarget: 18, dailySpend: 2100 },
      { key: "linkedin", label: "LinkedIn", labelAr: "LinkedIn", split: 15, dailyLeadTarget: 6, dailySpend: 1500 },
      { key: "remarketing", label: "Remarketing", labelAr: "إعادة الاستهداف", split: 10, dailyLeadTarget: 6, dailySpend: 700 },
    ]);
  };

  const updatePlatform = (
    key: string,
    field: "split" | "dailyLeadTarget" | "dailySpend",
    value: number,
  ) => {
    setPlatforms((prev) => {
      const nextValue = Number.isFinite(value) ? Math.max(0, value) : 0;
      return prev.map((p) => {
        if (p.key !== key) return p;
        if (field === "split") return { ...p, split: Math.min(100, nextValue) };
        if (field === "dailyLeadTarget") return { ...p, dailyLeadTarget: Math.min(300, nextValue) };
        return { ...p, dailySpend: Math.min(50000, nextValue) };
      });
    });
  };

  const splitTotal = platforms.reduce((sum, p) => sum + p.split, 0);
  const normalizedPlatforms = platforms.map((p) => ({
    ...p,
    normalizedShare: splitTotal > 0 ? p.split / splitTotal : 0,
  }));

  const calcRows = normalizedPlatforms.map((p) => {
    const leadsPerDay = p.dailyLeadTarget;
    const spendPerDay = p.dailySpend;
    const qualifiedPerDay = leadsPerDay * (qualifiedRate / 100);
    const meetingsPerDay = qualifiedPerDay * (meetingRate / 100);
    const closesPerDay = meetingsPerDay * (closeRate / 100);
    const impliedCpl = leadsPerDay > 0 ? spendPerDay / leadsPerDay : 0;

    return {
      ...p,
      leadsPerDay,
      spendPerDay,
      spendPerMonth: spendPerDay * 30,
      closesPerDay,
      closesPerMonth: closesPerDay * 30,
      impliedCpl,
    };
  });

  const totals = calcRows.reduce(
    (acc, row) => ({
      leadsPerDay: acc.leadsPerDay + row.leadsPerDay,
      spendPerDay: acc.spendPerDay + row.spendPerDay,
      spendPerMonth: acc.spendPerMonth + row.spendPerMonth,
      closesPerDay: acc.closesPerDay + row.closesPerDay,
      closesPerMonth: acc.closesPerMonth + row.closesPerMonth,
    }),
    { leadsPerDay: 0, spendPerDay: 0, spendPerMonth: 0, closesPerDay: 0, closesPerMonth: 0 },
  );

  const blendedCpl = totals.leadsPerDay > 0 ? totals.spendPerDay / totals.leadsPerDay : 0;
  const qualifiedLeadsPerDay = totals.leadsPerDay * (qualifiedRate / 100);
  const meetingsPerDay = qualifiedLeadsPerDay * (meetingRate / 100);
  const costPerClose = totals.closesPerDay > 0 ? totals.spendPerDay / totals.closesPerDay : 0;

  const executionSteps = [
    {
      step: "Step 1",
      stepAr: "الخطوة 1",
      title: "Offer + Funnel Setup (Days 1-3)",
      titleAr: "إعداد العرض وقمع التحويل (الأيام 1-3)",
      details: [
        "Define one primary offer: Free strategy call, audit, or roadmap.",
        "Create one landing page per campaign angle with one CTA only.",
        "Install tracking: Meta Pixel, Google Ads conversion, form events, call tracking.",
      ],
      detailsAr: [
        "حدد عرضًا رئيسيًا واحدًا: استشارة مجانية أو تدقيق أو خارطة طريق.",
        "أنشئ صفحة هبوط واحدة لكل زاوية حملة مع CTA واحد فقط.",
        "فعّل التتبع: Meta Pixel وGoogle conversion وأحداث النماذج وتتبع المكالمات.",
      ],
    },
    {
      step: "Step 2",
      stepAr: "الخطوة 2",
      title: "Launch Paid Traffic (Days 4-10)",
      titleAr: "إطلاق الزيارات المدفوعة (الأيام 4-10)",
      details: [
        "Start with 3 channels: Google Search (high intent), Meta (scale), remarketing.",
        "Run 3 creatives per angle + 2 headline variants each.",
        "Keep budgets stable for first 4-5 days before major edits.",
      ],
      detailsAr: [
        "ابدأ بـ 3 قنوات: بحث Google (نية شراء عالية)، Meta (توسع)، إعادة الاستهداف.",
        "شغل 3 تصاميم لكل زاوية + نسختي عنوان لكل تصميم.",
        "ثبّت الميزانية أول 4-5 أيام قبل أي تعديل كبير.",
      ],
    },
    {
      step: "Step 3",
      stepAr: "الخطوة 3",
      title: "Lead Qualification + Speed-to-Contact (Daily)",
      titleAr: "تأهيل العملاء + سرعة التواصل (يوميًا)",
      details: [
        "Contact new leads in under 5 minutes (critical for close rate).",
        "Use qualification script: budget, timeline, decision maker, problem urgency.",
        "Tag every lead by quality: Hot / Warm / Nurture.",
      ],
      detailsAr: [
        "تواصل مع العميل خلال أقل من 5 دقائق (عامل حاسم للتحويل).",
        "استخدم سكربت تأهيل: الميزانية، المدة، صاحب القرار، إلحاح المشكلة.",
        "صنّف كل عميل: ساخن / دافئ / متابعة.",
      ],
    },
    {
      step: "Step 4",
      stepAr: "الخطوة 4",
      title: "Daily Optimization + Weekly Scale",
      titleAr: "تحسين يومي + توسع أسبوعي",
      details: [
        "Pause high-CPL ad sets and duplicate winners with +20% budget increments.",
        "Review by funnel stage: CTR -> CPL -> Meeting Rate -> Close Rate.",
        "Scale only what produces qualified booked meetings, not cheap unqualified leads.",
      ],
      detailsAr: [
        "أوقف الحملات ذات CPL العالي وكرر الأفضل مع زيادة 20% بالميزانية.",
        "راجع القمع: CTR ثم CPL ثم نسبة حجز الاجتماعات ثم نسبة الإغلاق.",
        "وسّع فقط ما ينتج اجتماعات مؤهلة، وليس عملاء منخفضي الجودة.",
      ],
    },
  ];

  const budgetPlans = [
    {
      label: "Testing Phase (First 2 Weeks)",
      labelAr: "مرحلة الاختبار (أول أسبوعين)",
      spend: "SAR 1,125-1,875/day",
      spendAr: "1,125-1,875 ريال يوميًا",
      split: "Google 45% | Meta 40% | Remarketing 15%",
      splitAr: "Google 45% | Meta 40% | إعادة الاستهداف 15%",
      expectation: "10-20 leads/day while finding winners",
      expectationAr: "10-20 عميل يوميًا أثناء اكتشاف الحملات الأفضل",
    },
    {
      label: "Growth Phase (Week 3-6)",
      labelAr: "مرحلة النمو (الأسبوع 3-6)",
      spend: "SAR 2,625-4,500/day",
      spendAr: "2,625-4,500 ريال يوميًا",
      split: "Google 50% | Meta 35% | Remarketing 15%",
      splitAr: "Google 50% | Meta 35% | إعادة الاستهداف 15%",
      expectation: "25-40 leads/day with stronger quality filtering",
      expectationAr: "25-40 عميل يوميًا مع تحسين جودة التأهيل",
    },
    {
      label: "50 Leads/Day Target Phase",
      labelAr: "مرحلة هدف 50 عميل يوميًا",
      spend: "SAR 5,625-9,375/day (approx.)",
      spendAr: "5,625-9,375 ريال يوميًا (تقريبي)",
      split: "Google 55% | Meta 30% | Remarketing 15%",
      splitAr: "Google 55% | Meta 30% | إعادة الاستهداف 15%",
      expectation: "50+ daily leads when funnel + sales ops are mature",
      expectationAr: "50+ عميل يوميًا عند نضج القمع وفريق المبيعات",
    },
  ];

  const closingPlaybook = [
    {
      title: "First Contact Script",
      titleAr: "سكربت أول تواصل",
      text: "Use a 3-part opener: confirm their request, highlight one quick win, and offer a fixed call time.",
      textAr: "استخدم افتتاحية من 3 أجزاء: تأكيد الطلب، فائدة سريعة، واقتراح موعد اتصال محدد.",
    },
    {
      title: "Qualification in 7 Minutes",
      titleAr: "تأهيل خلال 7 دقائق",
      text: "Collect 4 essentials: business goal, current bottleneck, budget range, decision timeline.",
      textAr: "اجمع 4 عناصر أساسية: هدف العمل، المشكلة الحالية، نطاق الميزانية، زمن القرار.",
    },
    {
      title: "Close Framework",
      titleAr: "إطار الإغلاق",
      text: "Always present 2 options: fast-start package and strategic package. This increases close probability.",
      textAr: "اعرض دائمًا خيارين: باقة بداية سريعة وباقة استراتيجية. هذا يرفع احتمالية الإغلاق.",
    },
    {
      title: "Follow-up Cadence",
      titleAr: "جدول المتابعة",
      text: "Follow-up on Day 1, Day 3, Day 7, Day 14 with proof (case study, timeline, ROI snapshot).",
      textAr: "تابع في اليوم 1 و3 و7 و14 مع إثبات (دراسة حالة، جدول، لقطة عائد).",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Internal Campaign Creative Ideas"
        titleAr="أفكار إبداعية داخلية للحملات"
        description="Internal creative content ideas for lead generation campaigns."
        descriptionAr="أفكار محتوى إبداعي داخلية لحملات توليد العملاء المحتملين."
        keywords="lead generation creative ideas, campaign content ideas"
        keywordsAr="أفكار محتوى حملات، أفكار إبداعية لتوليد العملاء"
        canonicalUrl="/marketing-campaigns"
        noIndex={true}
      />

      <div className="container mx-auto px-6 lg:px-8 py-14 max-w-[1280px]">
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-5" data-testid="text-marketing-page-title">
            {isAr ? "بنك أفكار إبداعية للحملات (داخلي)" : "Internal Campaign Creative Idea Bank"}
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed mb-8 max-w-4xl">
            {isAr
              ? "هذه الصفحة داخلية فقط لإعداد محتوى الـ Creative. استخدم الأفكار هنا في تصاميم الإعلانات الموجهة لتوليد العملاء المحتملين."
              : "Internal-only page for creative graphics content. Use these ideas in lead-generation ad creatives."}
          </p>

          <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
            <CardContent className="flex items-start gap-3 pt-6">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-lg text-amber-800 dark:text-amber-200 mb-2">
                  {isAr ? "ملاحظات للفريق الإبداعي:" : "Creative team notes:"}
                </p>
                <ul className="text-base leading-relaxed text-amber-700 dark:text-amber-300 space-y-2">
                  <li>
                    {isAr
                      ? "1. كل تصميم يحمل CTA واحد واضح: حجز مكالمة أو طلب تواصل."
                      : "1. Keep one clear CTA per creative: book call or request contact."}
                  </li>
                  <li>
                    {isAr
                      ? "2. ركز على نتائج مباشرة: إطلاق أسرع، تكلفة أقل، عمل يدوي أقل."
                      : "2. Push outcome-led messages: faster launch, lower cost, less manual work."}
                  </li>
                  <li>
                    {isAr
                      ? "3. أنشئ 3 نسخ تصميمية لكل حملة لاختبار أفضل رسالة."
                      : "3. Create 3 creative variants per campaign for A/B testing."}
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {isAr ? "خطة التنفيذ خطوة بخطوة (ابدأ من هنا)" : "Step-by-Step Execution Plan (Start Here)"}
          </h2>
          <div className="grid gap-4">
            {executionSteps.map((item) => (
              <Card key={item.step} className="border-slate-200">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-md w-fit">
                      {isAr ? item.stepAr : item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3">
                        {isAr ? item.titleAr : item.title}
                      </h3>
                      <ul className="space-y-2 text-lg text-slate-700 leading-relaxed">
                        {(isAr ? item.detailsAr : item.details).map((d) => (
                          <li key={d}>- {d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {isAr ? "ميزانية واضحة للوصول إلى 50 عميل يوميًا" : "Budget Plan to Reach 50 Leads/Day"}
          </h2>
          <Card className="mb-4 border-blue-200 bg-blue-50/70">
            <CardContent className="pt-6 text-lg leading-relaxed text-blue-900">
              {isAr
                ? "مهم جدًا: الهدف 50 عميل يوميًا ممكن، لكنه يحتاج ميزانية كافية + جودة صفحة هبوط + سرعة استجابة فريق المبيعات. بدون الثلاثة، الإنفاق العالي وحده لا يكفي."
                : "Important: 50 leads/day is possible, but requires enough budget + strong landing pages + fast sales follow-up. High spend alone is not enough."}
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-3 gap-4">
            {budgetPlans.map((plan) => (
              <Card key={plan.label} className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-xl">{isAr ? plan.labelAr : plan.label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-base">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">{isAr ? "الإنفاق المقترح" : "Suggested Spend"}</p>
                    <p className="text-xl font-semibold">{isAr ? plan.spendAr : plan.spend}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">{isAr ? "توزيع القنوات" : "Channel Split"}</p>
                    <p className="text-slate-700">{isAr ? plan.splitAr : plan.split}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">{isAr ? "النتيجة المتوقعة" : "Expected Output"}</p>
                    <p className="text-slate-700">{isAr ? plan.expectationAr : plan.expectation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {isAr ? "حاسبة الميزانية والإغلاق لكل منصة" : "Platform Budget + Closing Calculator"}
          </h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            {isAr
              ? "أدخل هدف العملاء اليومي وتكلفة العميل المتوقع (CPL) لكل منصة ونسبة التوزيع. الحاسبة تعطيك الإنفاق اليومي/الشهري وعدد الصفقات المتوقعة."
              : "Enter your daily lead target, CPL per platform, and allocation split. The calculator estimates daily/monthly spend and expected closed deals."}
          </p>

          <Card className="mb-4 border-emerald-200 bg-emerald-50/70 shadow-sm">
            <CardContent className="pt-6 grid md:grid-cols-4 gap-4 text-lg">
              <div>
                <p className="text-sm text-emerald-800/80">{isAr ? "إجمالي العملاء/يوم" : "Total Leads/Day"}</p>
                <p className="font-bold text-2xl text-emerald-900">{totals.leadsPerDay.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-sm text-emerald-800/80">{isAr ? "إجمالي الإنفاق اليومي" : "Total Daily Spend"}</p>
                <p className="font-bold text-2xl text-emerald-900">SAR {totals.spendPerDay.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-sm text-emerald-800/80">{isAr ? "إجمالي الإنفاق الشهري" : "Total Monthly Spend"}</p>
                <p className="font-bold text-2xl text-emerald-900">SAR {totals.spendPerMonth.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-sm text-emerald-800/80">{isAr ? "إجمالي الصفقات/شهر" : "Total Closes/Month"}</p>
                <p className="font-bold text-2xl text-emerald-900">{totals.closesPerMonth.toFixed(1)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-4 border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">
                {isAr ? "1) إعداد نسب القمع" : "1) Set Funnel Rates"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <FieldLabel
                    label={isAr ? "نسبة التأهيل %" : "Qualified Rate %"}
                    help={
                      isAr
                        ? "نسبة العملاء الذين يعتبرون مناسبين بعد أول تواصل (مثال: ميزانية واحتياج واضح)."
                        : "Percent of incoming leads that are considered qualified after first screening."
                    }
                  />
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[qualifiedRate]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(v) => setQualifiedRate(Math.max(0, Math.min(100, v[0] ?? 0)))}
                    />
                    <span className="min-w-16 text-right text-base font-semibold">{qualifiedRate}%</span>
                  </div>
                </div>
                <div>
                  <FieldLabel
                    label={isAr ? "نسبة حجز الاجتماع %" : "Meeting Rate %"}
                    help={
                      isAr
                        ? "نسبة العملاء المؤهلين الذين يوافقون على اجتماع/مكالمة مبيعات."
                        : "Percent of qualified leads that book a sales call/meeting."
                    }
                  />
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[meetingRate]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(v) => setMeetingRate(Math.max(0, Math.min(100, v[0] ?? 0)))}
                    />
                    <span className="min-w-16 text-right text-base font-semibold">{meetingRate}%</span>
                  </div>
                </div>
                <div>
                  <FieldLabel
                    label={isAr ? "نسبة الإغلاق %" : "Close Rate %"}
                    help={
                      isAr
                        ? "نسبة الاجتماعات التي تتحول إلى صفقات فعلية."
                        : "Percent of meetings that convert into closed deals."
                    }
                  />
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[closeRate]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(v) => setCloseRate(Math.max(0, Math.min(100, v[0] ?? 0)))}
                    />
                    <span className="min-w-16 text-right text-base font-semibold">{closeRate}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-4 border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <CardTitle className="text-2xl">
                  {isAr ? "2) إعداد مستقل لكل منصة (توزيع + عملاء/يوم + إنفاق/يوم)" : "2) Independent Per-Platform Setup (Allocation + Leads/Day + Spend/Day)"}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => applySplitPreset("balanced")}>
                    {isAr ? "توزيع متوازن" : "Balanced"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => applySplitPreset("highIntent")}>
                    {isAr ? "تركيز نية شراء" : "High Intent"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => applySplitPreset("socialHeavy")}>
                    {isAr ? "تركيز سوشال" : "Social Heavy"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={resetCalculator}>
                    {isAr ? "إعادة ضبط" : "Reset"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {platforms.map((p) => {
                const effectiveShare =
                  (normalizedPlatforms.find((n) => n.key === p.key)?.normalizedShare || 0) * 100;
                return (
                  <div key={p.key} className="rounded-lg border border-slate-200 p-4 bg-white">
                    <div className="grid md:grid-cols-4 gap-4 items-end">
                      <div className="md:col-span-1">
                        <p className="text-lg font-semibold mb-1">{isAr ? p.labelAr : p.label}</p>
                        <p className="text-sm text-slate-500">
                          {isAr ? "الحصة النسبية من إجمالي التوزيع المُدخل" : "Relative share from entered allocations"}
                        </p>
                        <p className="text-xl font-bold text-slate-900">{effectiveShare.toFixed(1)}%</p>
                      </div>
                      <div>
                        <FieldLabel
                          label={isAr ? "نسبة التوزيع %" : "Allocation %"}
                          help={
                            isAr
                              ? "نسبة الميزانية المخصصة لهذه المنصة من إجمالي الميزانية."
                              : "Percent of your total ad budget allocated to this platform."
                          }
                        />
                        <div className="flex items-center gap-3">
                          <Slider
                            value={[p.split]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(v) => updatePlatform(p.key, "split", v[0] ?? 0)}
                          />
                          <span className="min-w-16 text-right text-base font-semibold">{p.split}%</span>
                        </div>
                      </div>
                      <div>
                        <FieldLabel
                          label={isAr ? "هدف العملاء/يوم" : "Lead Target/Day"}
                          help={
                            isAr
                              ? "عدد العملاء المطلوب يوميًا من هذه المنصة فقط."
                              : "How many leads you want per day from this platform only."
                          }
                        />
                        <div className="flex items-center gap-3">
                          <Slider
                            value={[p.dailyLeadTarget]}
                            min={0}
                            max={200}
                            step={1}
                            onValueChange={(v) => updatePlatform(p.key, "dailyLeadTarget", v[0] ?? 0)}
                          />
                          <span className="min-w-20 text-right text-base font-semibold">{p.dailyLeadTarget}</span>
                        </div>
                      </div>
                      <div>
                        <FieldLabel
                          label={isAr ? "الإنفاق اليومي (SAR)" : "Daily Spend (SAR)"}
                          help={
                            isAr
                              ? "الميزانية اليومية لهذه المنصة فقط."
                              : "Daily budget for this platform only."
                          }
                        />
                        <div className="flex items-center gap-3">
                          <Slider
                            value={[p.dailySpend]}
                            min={0}
                            max={20000}
                            step={50}
                            onValueChange={(v) => updatePlatform(p.key, "dailySpend", v[0] ?? 0)}
                          />
                          <span className="min-w-24 text-right text-base font-semibold">SAR {p.dailySpend}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <p className="text-sm text-slate-500">
                {isAr
                  ? `مجموع التوزيع المُدخل = ${splitTotal.toFixed(1)}%. كل منصة تعمل بشكل مستقل.`
                  : `Entered allocation total = ${splitTotal.toFixed(1)}%. Each platform works independently.`}
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <Card className="border-indigo-200 bg-indigo-50/70">
              <CardContent className="pt-5">
                <p className="text-sm text-indigo-900/80">{isAr ? "Blended CPL" : "Blended CPL"}</p>
                <p className="text-3xl font-bold text-indigo-900">SAR {blendedCpl.toFixed(1)}</p>
              </CardContent>
            </Card>
            <Card className="border-cyan-200 bg-cyan-50/70">
              <CardContent className="pt-5">
                <p className="text-sm text-cyan-900/80">{isAr ? "عملاء مؤهلون/يوم" : "Qualified Leads/Day"}</p>
                <p className="text-3xl font-bold text-cyan-900">{qualifiedLeadsPerDay.toFixed(1)}</p>
              </CardContent>
            </Card>
            <Card className="border-violet-200 bg-violet-50/70">
              <CardContent className="pt-5">
                <p className="text-sm text-violet-900/80">{isAr ? "اجتماعات/يوم" : "Meetings/Day"}</p>
                <p className="text-3xl font-bold text-violet-900">{meetingsPerDay.toFixed(1)}</p>
              </CardContent>
            </Card>
            <Card className="border-rose-200 bg-rose-50/70">
              <CardContent className="pt-5">
                <p className="text-sm text-rose-900/80">{isAr ? "تكلفة الصفقة" : "Cost per Close"}</p>
                <p className="text-3xl font-bold text-rose-900">
                  {Number.isFinite(costPerClose) ? `SAR ${costPerClose.toFixed(0)}` : "-"}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {calcRows.map((row) => (
              <Card key={row.key} className="border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center justify-between">
                    <span>{isAr ? row.labelAr : row.label}</span>
                    <span className="text-sm font-medium text-slate-500">{(row.normalizedShare * 100).toFixed(1)}%</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2.5 text-base">
                  <p>{isAr ? "Leads يوميًا:" : "Leads/day:"} <span className="font-semibold">{row.leadsPerDay.toFixed(1)}</span></p>
                  <p>{isAr ? "إنفاق يومي:" : "Daily Spend:"} <span className="font-semibold">SAR {row.spendPerDay.toFixed(0)}</span></p>
                  <p>{isAr ? "إنفاق شهري:" : "Monthly Spend:"} <span className="font-semibold">SAR {row.spendPerMonth.toFixed(0)}</span></p>
                  <p>{isAr ? "CPL الفعلي:" : "Implied CPL:"} <span className="font-semibold">SAR {row.impliedCpl.toFixed(1)}</span></p>
                  <p>{isAr ? "صفقات/يوم:" : "Closes/day:"} <span className="font-semibold">{row.closesPerDay.toFixed(2)}</span></p>
                  <p>{isAr ? "صفقات/شهر:" : "Closes/month:"} <span className="font-semibold">{row.closesPerMonth.toFixed(1)}</span></p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-bold mb-4">
            {isAr ? "نظام إغلاق العملاء (ضروري جدًا)" : "Lead Closing System (Critical)"}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {closingPlaybook.map((item) => (
              <Card key={item.title} className="border-slate-200">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {isAr ? item.titleAr : item.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-slate-700">
                    {isAr ? item.textAr : item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="mt-4 border-emerald-200 bg-emerald-50/70">
            <CardContent className="pt-6 text-lg leading-relaxed text-emerald-900">
              {isAr
                ? "قاعدة ذهبية: إذا وصلت إليك 50 عميل يوميًا ولم تُغلق بشكل جيد، المشكلة غالبًا في سرعة المتابعة والتأهيل وليس في الإعلانات."
                : "Golden rule: if you generate 50 leads/day but close poorly, the issue is usually follow-up speed and qualification, not ads."}
            </CardContent>
          </Card>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-bold mb-4">
            {isAr ? "مكتبة أفكار محتوى جاهزة للنشر" : "Ready-to-Post Content Library"}
          </h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            {isAr
              ? "12 فكرة منشور جاهزة (عنوان + نص + CTA + فكرة تصميم) لزيادة العملاء المحتملين."
              : "12 ready post ideas (title + caption + CTA + creative direction) designed for lead generation."}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {postIdeas.map((post, index) => (
              <Card key={post.id} className="border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600">
                      #{index + 1}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-primary/10 text-primary">
                      {isAr ? post.platformAr : post.platform}
                    </span>
                  </div>
                  <CardTitle className="text-xl leading-snug">
                    {isAr ? post.titleAr : post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-base">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-1">
                      {isAr ? "نص المنشور" : "Caption Angle"}
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      {isAr ? post.captionAr : post.caption}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-1">
                      {isAr ? "فكرة التصميم" : "Creative Direction"}
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      {isAr ? post.visualAr : post.visual}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-1">
                      {isAr ? "الدعوة للإجراء" : "CTA"}
                    </p>
                    <p className="font-semibold text-slate-900">
                      {isAr ? post.ctaAr : post.cta}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Tabs defaultValue="services" className="w-full">
          <TabsList className="h-auto gap-2 mb-8 bg-muted/50 p-2 rounded-xl">
            {Object.entries(categories).map(([key, category]) => (
              <TabsTrigger
                key={key}
                value={key}
                data-testid={`tab-campaign-category-${key}`}
                className="px-6 py-3.5 text-lg font-semibold rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {isAr ? category.labelAr : category.label}
                <span className="ml-2 text-sm opacity-80">
                  ({category.campaigns.length})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(categories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <div className="mb-7">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {isAr ? category.descriptionAr : category.description}
                </p>
              </div>

              <Tabs defaultValue={category.campaigns[0]?.id} className="w-full">
                <TabsList className="flex flex-wrap h-auto gap-2 mb-8 bg-transparent">
                  {category.campaigns.map((campaign) => (
                    <TabsTrigger
                      key={campaign.id}
                      value={campaign.id}
                      data-testid={`tab-campaign-${campaign.id}`}
                      className="px-4 py-2.5 text-base data-[state=active]:bg-slate-800 data-[state=active]:text-white"
                    >
                      {isAr ? campaign.titleAr : campaign.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {category.campaigns.map((campaign) => (
                  <TabsContent key={campaign.id} value={campaign.id}>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="w-4 h-4 text-primary" />
                              <p className="font-semibold text-base">
                                {isAr ? "هدف الحملة" : "Campaign Goal"}
                              </p>
                            </div>
                            <p className="text-base leading-relaxed text-muted-foreground">
                              {isAr
                                ? "زيادة العملاء المحتملين المؤهلين."
                                : "Increase qualified lead inquiries."}
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="w-4 h-4 text-primary" />
                              <p className="font-semibold text-base">
                                {isAr ? "الفئة المستهدفة" : "Persona"}
                              </p>
                            </div>
                            <p className="text-base leading-relaxed text-muted-foreground">
                              {isAr ? campaign.audienceAr : campaign.audience}
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Megaphone className="w-4 h-4 text-primary" />
                              <p className="font-semibold text-base">
                                {isAr ? "العرض" : "Offer"}
                              </p>
                            </div>
                            <p className="text-base leading-relaxed text-muted-foreground">
                              {isAr ? campaign.offerAr : campaign.offer}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <LeadCampaignCard campaign={campaign} isAr={isAr} />
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
