import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, X, Send, User, Mail, Phone, ChevronRight,
  Bot, Loader2, Sparkles, ArrowRight
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { trackLeadFormSubmission } from "@/lib/analytics";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
  timestamp: Date;
}

interface QuickQuestion {
  id: string;
  text: string;
  textAr: string;
  category: string;
  answer: string;
  answerAr: string;
}

const quickQuestions: QuickQuestion[] = [
  // About SkyStack
  {
    id: "about",
    text: "What is SkyStack?",
    textAr: "ما هو SkyStack؟",
    category: "general",
    answer: "SkyStack is a Saudi-based technology company delivering world-class software solutions. We specialize in custom mobile app development, web applications, enterprise software, UI/UX design, outsourcing, and personal website packages. We combine local expertise with global best practices to help businesses thrive in the digital age.",
    answerAr: "SkyStack هي شركة تقنية سعودية تقدم حلول برمجية عالمية المستوى. نحن متخصصون في تطوير تطبيقات الجوال المخصصة، تطبيقات الويب، البرمجيات المؤسسية، تصميم UI/UX، التعهيد، وباقات المواقع الشخصية. نجمع بين الخبرة المحلية وأفضل الممارسات العالمية لمساعدة الشركات على النجاح في العصر الرقمي."
  },
  // Services
  {
    id: "services",
    text: "What services do you offer?",
    textAr: "ما الخدمات التي تقدمونها؟",
    category: "services",
    answer: "We offer a wide range of services:\n\n• Custom Mobile App Development (iOS & Android)\n• Web Application Development\n• Enterprise Software Solutions\n• UI/UX Design\n• Cloud & DevOps\n• IT Staff Outsourcing (save up to 70%)\n• Personal Website Package ($2,000)\n\nEach service is tailored to your specific business needs with dedicated project management.",
    answerAr: "نقدم مجموعة واسعة من الخدمات:\n\n• تطوير تطبيقات الجوال المخصصة (iOS و Android)\n• تطوير تطبيقات الويب\n• حلول البرمجيات المؤسسية\n• تصميم UI/UX\n• السحابة و DevOps\n• تعهيد كوادر تقنية (وفّر حتى 70%)\n• باقة الموقع الشخصي (2,000 دولار)\n\nكل خدمة مصممة حسب احتياجات عملك مع إدارة مشروع مخصصة."
  },
  // Personal Website
  {
    id: "personal-website",
    text: "Tell me about the $2,000 Personal Website package",
    textAr: "أخبرني عن باقة الموقع الشخصي بـ 2,000 دولار",
    category: "services",
    answer: "Our Personal Website package ($2,000) includes:\n\n✅ Up to 5 custom-designed pages\n✅ Mobile responsive design\n✅ SEO optimization\n✅ Contact form & lead capture\n✅ 7-day delivery\n✅ Full source code ownership\n✅ $1,150+ in FREE analytics addons:\n   - Google Analytics 4\n   - Hotjar Heatmaps\n   - Mixpanel Analytics\n   - Google Tag Manager\n   - Search Console & Bing Webmaster\n   - Meta Pixel\n   - Speed & Core Web Vitals optimization\n✅ 1 month free support after launch\n\nPerfect for professionals, consultants, freelancers, and entrepreneurs.\n\n👉 Visit /services/personal-website for full details!",
    answerAr: "باقة الموقع الشخصي (2,000 دولار) تشمل:\n\n✅ حتى 5 صفحات مصممة خصيصاً\n✅ تصميم متجاوب مع الجوال\n✅ تحسين محركات البحث (SEO)\n✅ نموذج تواصل وجمع عملاء\n✅ تسليم خلال 7 أيام\n✅ ملكية كاملة للكود المصدري\n✅ إضافات تحليلات مجانية بقيمة 1,150+ دولار:\n   - Google Analytics 4\n   - خرائط Hotjar الحرارية\n   - تحليلات Mixpanel\n   - Google Tag Manager\n   - Search Console وأدوات مشرفي المواقع\n   - Meta Pixel\n   - تحسين السرعة ومؤشرات الويب\n✅ شهر دعم مجاني بعد الإطلاق\n\nمثالي للمحترفين والمستشارين والمستقلين ورواد الأعمال.\n\n👈 زر /services/personal-website لمزيد من التفاصيل!"
  },
  // Pricing
  {
    id: "pricing",
    text: "What are your pricing plans?",
    textAr: "ما هي خطط الأسعار لديكم؟",
    category: "pricing",
    answer: "We offer flexible pricing models:\n\n📦 Startup Plan — Custom pricing for MVPs and early-stage products\n⭐ Enterprise Plan — Custom pricing for scalable solutions (Most Popular)\n👥 Dedicated Team — Monthly retainer for your own full-stack team\n🌐 Personal Website — $2,000 fixed price (7-day delivery)\n🏢 IT Outsourcing — Save up to 70% vs local hiring\n\nAll plans include dedicated project management and post-launch support. Contact us for a custom quote!",
    answerAr: "نقدم نماذج أسعار مرنة:\n\n📦 باقة الشركات الناشئة — أسعار مخصصة للمنتجات الأولية\n⭐ باقة المؤسسات — أسعار مخصصة لحلول قابلة للتوسع (الأكثر شعبية)\n👥 فريق مخصص — اشتراك شهري لفريقك الخاص\n🌐 الموقع الشخصي — 2,000 دولار سعر ثابت (تسليم 7 أيام)\n🏢 التعهيد التقني — وفّر حتى 70% مقارنة بالتوظيف المحلي\n\nجميع الباقات تشمل إدارة مشروع مخصصة ودعم بعد الإطلاق. تواصل معنا لعرض سعر مخصص!"
  },
  // Outsourcing
  {
    id: "outsourcing",
    text: "How does IT outsourcing work?",
    textAr: "كيف يعمل التعهيد التقني؟",
    category: "services",
    answer: "Our IT outsourcing service helps you save up to 70% on development costs:\n\n• Access top-tier tech talent from Pakistan & South Asia\n• Available roles: Developers, Designers, QA Engineers, DevOps, Project Managers, Data Engineers, and more\n• Dedicated team members work exclusively for you\n• Daily standups & direct Slack access\n• We handle recruitment, HR, and infrastructure\n• Flexible scaling — add or remove team members as needed\n\nExample: A Senior Full-Stack Developer costs ~$20,000/month locally vs $6,500/month through us.\n\n👉 Visit /services/outsourcing to calculate your savings!",
    answerAr: "خدمة التعهيد التقني لدينا تساعدك على توفير حتى 70% من تكاليف التطوير:\n\n• الوصول لأفضل المواهب التقنية من باكستان وجنوب آسيا\n• أدوار متاحة: مطورون، مصممون، مهندسو جودة، DevOps، مدراء مشاريع، مهندسو بيانات، والمزيد\n• أعضاء فريق مخصصون يعملون حصرياً لك\n• اجتماعات يومية ووصول مباشر عبر Slack\n• نتولى التوظيف والموارد البشرية والبنية التحتية\n• مرونة في التوسع — أضف أو أزل أعضاء الفريق حسب الحاجة\n\nمثال: مطور متكامل كبير يكلف ~20,000 دولار/شهر محلياً مقابل 6,500 دولار/شهر معنا.\n\n👈 زر /services/outsourcing لحساب توفيرك!"
  },
  // Mobile App
  {
    id: "mobile-app",
    text: "Can you build a mobile app for me?",
    textAr: "هل يمكنكم بناء تطبيق جوال لي؟",
    category: "services",
    answer: "Absolutely! We specialize in custom mobile app development:\n\n📱 Native iOS (Swift) & Android (Kotlin)\n📱 Cross-platform (React Native, Flutter)\n\nWe've built apps for various industries including:\n• Food delivery platforms\n• E-commerce marketplaces\n• Ride-hailing services\n• Healthcare & telemedicine\n• Fintech & digital wallets\n• On-demand services\n\nOur process: Discovery → Design → Development → Testing → Launch\nTimeline: Typically 2-4 months depending on complexity.\n\nWould you like to discuss your project? Contact us for a free consultation!",
    answerAr: "بالتأكيد! نحن متخصصون في تطوير تطبيقات الجوال المخصصة:\n\n📱 iOS أصلي (Swift) و Android (Kotlin)\n📱 عبر المنصات (React Native، Flutter)\n\nبنينا تطبيقات لصناعات مختلفة تشمل:\n• منصات توصيل الطعام\n• أسواق التجارة الإلكترونية\n• خدمات النقل\n• الرعاية الصحية والطب عن بُعد\n• التكنولوجيا المالية والمحافظ الرقمية\n• الخدمات عند الطلب\n\nعمليتنا: الاستكشاف → التصميم → التطوير → الاختبار → الإطلاق\nالجدول الزمني: عادة 2-4 أشهر حسب التعقيد.\n\nهل تريد مناقشة مشروعك؟ تواصل معنا لاستشارة مجانية!"
  },
  // Technologies
  {
    id: "technologies",
    text: "What technologies do you use?",
    textAr: "ما التقنيات التي تستخدمونها؟",
    category: "technical",
    answer: "We work with modern, battle-tested technologies:\n\n🖥 Frontend: React, Next.js, Vue.js, Angular, Tailwind CSS\n📱 Mobile: React Native, Flutter, Swift, Kotlin\n⚙️ Backend: Node.js, Python, Java, .NET, Go\n🗄 Databases: PostgreSQL, MongoDB, MySQL, Redis\n☁️ Cloud: AWS, Azure, Google Cloud, Vercel\n🔧 DevOps: Docker, Kubernetes, CI/CD, Terraform\n📊 Analytics: Google Analytics, Mixpanel, Hotjar\n\nWe choose the best stack for your specific project requirements.",
    answerAr: "نعمل بتقنيات حديثة ومجربة:\n\n🖥 الواجهة الأمامية: React، Next.js، Vue.js، Angular، Tailwind CSS\n📱 الجوال: React Native، Flutter، Swift، Kotlin\n⚙️ الخلفية: Node.js، Python، Java، .NET، Go\n🗄 قواعد البيانات: PostgreSQL، MongoDB، MySQL، Redis\n☁️ السحابة: AWS، Azure، Google Cloud، Vercel\n🔧 DevOps: Docker، Kubernetes، CI/CD، Terraform\n📊 التحليلات: Google Analytics، Mixpanel، Hotjar\n\nنختار أفضل حزمة تقنية لمتطلبات مشروعك."
  },
  // Timeline
  {
    id: "timeline",
    text: "How long does a project take?",
    textAr: "كم يستغرق المشروع؟",
    category: "process",
    answer: "Project timelines depend on complexity:\n\n🌐 Personal Website: 7 days\n📱 Simple Mobile App: 6-8 weeks\n📱 Complex App (Multi-platform): 3-4 months\n🏢 Enterprise Solution: 4-6 months\n🔄 MVP/Prototype: 4-6 weeks\n\nOur process is streamlined:\n1️⃣ Discovery Call (Day 1)\n2️⃣ Requirements & Planning\n3️⃣ Design Phase\n4️⃣ Development Sprints\n5️⃣ Testing & QA\n6️⃣ Deployment & Launch\n\nWe provide regular updates throughout the project.",
    answerAr: "الجداول الزمنية تعتمد على التعقيد:\n\n🌐 الموقع الشخصي: 7 أيام\n📱 تطبيق جوال بسيط: 6-8 أسابيع\n📱 تطبيق معقد (متعدد المنصات): 3-4 أشهر\n🏢 حل مؤسسي: 4-6 أشهر\n🔄 MVP/نموذج أولي: 4-6 أسابيع\n\nعمليتنا مبسطة:\n1️⃣ مكالمة استكشافية (اليوم 1)\n2️⃣ المتطلبات والتخطيط\n3️⃣ مرحلة التصميم\n4️⃣ سباقات التطوير\n5️⃣ الاختبار وضمان الجودة\n6️⃣ النشر والإطلاق\n\nنوفر تحديثات منتظمة خلال المشروع."
  },
  // Support
  {
    id: "support",
    text: "Do you offer post-launch support?",
    textAr: "هل تقدمون دعم بعد الإطلاق؟",
    category: "general",
    answer: "Yes! All our projects include post-launch support:\n\n🌐 Personal Website: 1 month free support\n📦 Startup Plan: 2 weeks post-launch support\n⭐ Enterprise Plan: 3 months post-launch support\n👥 Dedicated Team: Ongoing support included\n\nAfter the free support period, we offer affordable monthly maintenance plans starting at $50/month. This includes bug fixes, security updates, and minor feature improvements.\n\nWe also provide 24/7 emergency support for critical issues.",
    answerAr: "نعم! جميع مشاريعنا تشمل دعم بعد الإطلاق:\n\n🌐 الموقع الشخصي: شهر دعم مجاني\n📦 باقة الناشئة: أسبوعين دعم بعد الإطلاق\n⭐ باقة المؤسسات: 3 أشهر دعم بعد الإطلاق\n👥 فريق مخصص: دعم مستمر مشمول\n\nبعد فترة الدعم المجانية، نقدم خطط صيانة شهرية بأسعار معقولة تبدأ من 50 دولار/شهر. تشمل إصلاح الأخطاء، التحديثات الأمنية، وتحسينات بسيطة.\n\nنوفر أيضاً دعم طوارئ على مدار الساعة للمشاكل الحرجة."
  },
  // Location
  {
    id: "location",
    text: "Where is SkyStack located?",
    textAr: "أين يقع SkyStack؟",
    category: "general",
    answer: "SkyStack is headquartered in Riyadh, Saudi Arabia 🇸🇦\n\nWe serve clients across:\n• Saudi Arabia\n• UAE & Gulf region\n• Middle East & North Africa\n• International clients worldwide\n\nWe work in both English and Arabic, and our team is available during Saudi business hours (Sun-Thu, 9am-6pm AST) with flexibility for international clients.\n\n📞 Phone: +966 53 743 0455\n📧 Contact us through our website or WhatsApp!",
    answerAr: "مقر SkyStack في الرياض، المملكة العربية السعودية 🇸🇦\n\nنخدم عملاء في:\n• المملكة العربية السعودية\n• الإمارات ومنطقة الخليج\n• الشرق الأوسط وشمال أفريقيا\n• عملاء دوليون حول العالم\n\nنعمل باللغتين العربية والإنجليزية، وفريقنا متاح خلال ساعات العمل السعودية (الأحد-الخميس، 9ص-6م) مع مرونة للعملاء الدوليين.\n\n📞 الهاتف: +966 53 743 0455\n📧 تواصل معنا عبر الموقع أو WhatsApp!"
  },
  // Industries
  {
    id: "industries",
    text: "What industries do you serve?",
    textAr: "ما الصناعات التي تخدمونها؟",
    category: "general",
    answer: "We serve diverse industries across the region:\n\n🏗 Enterprise & Government\n🏥 Healthcare & Telemedicine\n🏦 Banking & Fintech\n🚚 Logistics & Supply Chain\n🏠 Real Estate & Construction\n🛒 E-Commerce & Retail\n🍔 Food & Delivery Services\n🚗 Transportation & Ride-hailing\n🎮 Entertainment & Gaming\n💼 Professional Services\n\nWe have deep experience in Saudi market requirements including Vision 2030 initiatives, ZATCA compliance, and local payment integrations.",
    answerAr: "نخدم صناعات متنوعة في المنطقة:\n\n🏗 المؤسسات والحكومة\n🏥 الرعاية الصحية والطب عن بُعد\n🏦 البنوك والتكنولوجيا المالية\n🚚 اللوجستيات وسلسلة التوريد\n🏠 العقارات والبناء\n🛒 التجارة الإلكترونية والتجزئة\n🍔 الطعام وخدمات التوصيل\n🚗 النقل وخدمات التوصيل\n🎮 الترفيه والألعاب\n💼 الخدمات المهنية\n\nلدينا خبرة عميقة في متطلبات السوق السعودي بما في ذلك مبادرات رؤية 2030، التوافق مع هيئة الزكاة والضريبة والجمارك، وتكاملات الدفع المحلية."
  },
  // How to start
  {
    id: "how-to-start",
    text: "How do I get started?",
    textAr: "كيف أبدأ؟",
    category: "process",
    answer: "Getting started with SkyStack is easy! Here's how:\n\n1️⃣ Schedule a Free Discovery Call — Tell us about your project\n2️⃣ Receive a Custom Proposal — We'll outline scope, timeline, and pricing\n3️⃣ Approve & Kick Off — We start building immediately\n\nYou can reach us through:\n• 📋 Contact Form: /contact-us\n• 💬 WhatsApp: +966 53 743 0455\n• 💻 This chat — we already have your details!\n\nWe typically respond within 2 hours during business hours. No commitment required for the initial consultation!",
    answerAr: "البدء مع SkyStack سهل! إليك الطريقة:\n\n1️⃣ حدد مكالمة استكشافية مجانية — أخبرنا عن مشروعك\n2️⃣ استلم عرض مخصص — نحدد النطاق والجدول الزمني والأسعار\n3️⃣ الموافقة والانطلاق — نبدأ البناء فوراً\n\nيمكنك التواصل معنا عبر:\n• 📋 نموذج التواصل: /contact-us\n• 💬 WhatsApp: +966 53 743 0455\n• 💻 هذه المحادثة — لدينا بياناتك بالفعل!\n\nنرد عادة خلال ساعتين خلال ساعات العمل. لا يتطلب التزام للاستشارة الأولية!"
  },
];

const questionCategories = [
  { id: "all", label: "All", labelAr: "الكل" },
  { id: "services", label: "Services", labelAr: "الخدمات" },
  { id: "pricing", label: "Pricing", labelAr: "الأسعار" },
  { id: "process", label: "Process", labelAr: "العملية" },
  { id: "technical", label: "Technical", labelAr: "تقني" },
  { id: "general", label: "General", labelAr: "عام" },
];

export function ChatBot() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<"details" | "chat">("details");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userInput, setUserInput] = useState("");
  const [detailsSubmitting, setDetailsSubmitting] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    interest: ""
  });
  const [showQuestions, setShowQuestions] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (phase === "chat" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, showQuestions]);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `bot-${Date.now()}`,
        type: "bot",
        text,
        timestamp: new Date()
      }]);
      setIsTyping(false);
      if (!isOpen) setHasNewMessage(true);
    }, 600 + Math.random() * 400);
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
      toast({
        title: isArabic ? "معلومات ناقصة" : "Missing Information",
        description: isArabic ? "يرجى ملء الاسم والبريد الإلكتروني ورقم الهاتف." : "Please fill in your name, email, and phone number.",
        variant: "destructive"
      });
      return;
    }

    setDetailsSubmitting(true);

    trackLeadFormSubmission("chatbot_lead", {
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
      interest: userDetails.interest
    });

    try {
      await fetch("/api/chatbot-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails)
      });
    } catch {
      // silently continue — the chat should still work
    }

    setPhase("chat");
    setDetailsSubmitting(false);

    const greeting = isArabic
      ? `مرحباً ${userDetails.name.split(" ")[0]}! 👋 أنا مساعد SkyStack الآلي. كيف يمكنني مساعدتك اليوم؟\n\nاختر سؤالاً من الأسئلة الشائعة أدناه، أو اكتب سؤالك.`
      : `Hi ${userDetails.name.split(" ")[0]}! 👋 I'm SkyStack's virtual assistant. How can I help you today?\n\nChoose from the common questions below, or type your own question.`;

    addBotMessage(greeting);
  };

  const handleQuestionClick = (question: QuickQuestion) => {
    const qText = isArabic ? question.textAr : question.text;
    const aText = isArabic ? question.answerAr : question.answer;

    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      type: "user",
      text: qText,
      timestamp: new Date()
    }]);

    setShowQuestions(false);
    addBotMessage(aText);
  };

  const handleFreeTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const text = userInput.trim();
    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      type: "user",
      text,
      timestamp: new Date()
    }]);
    setUserInput("");
    setShowQuestions(false);

    // Simple keyword matching for free text
    const lower = text.toLowerCase();
    let matched: QuickQuestion | undefined;

    if (lower.includes("price") || lower.includes("cost") || lower.includes("سعر") || lower.includes("تكلفة") || lower.includes("كم")) {
      matched = quickQuestions.find(q => q.id === "pricing");
    } else if (lower.includes("personal website") || lower.includes("موقع شخصي") || lower.includes("$2000") || lower.includes("2000")) {
      matched = quickQuestions.find(q => q.id === "personal-website");
    } else if (lower.includes("outsourc") || lower.includes("تعهيد") || lower.includes("dedicated team") || lower.includes("فريق")) {
      matched = quickQuestions.find(q => q.id === "outsourcing");
    } else if (lower.includes("mobile") || lower.includes("app") || lower.includes("تطبيق") || lower.includes("جوال") || lower.includes("ios") || lower.includes("android")) {
      matched = quickQuestions.find(q => q.id === "mobile-app");
    } else if (lower.includes("service") || lower.includes("خدم") || lower.includes("what do you") || lower.includes("ماذا تقدم")) {
      matched = quickQuestions.find(q => q.id === "services");
    } else if (lower.includes("technolog") || lower.includes("tech") || lower.includes("stack") || lower.includes("تقني") || lower.includes("react") || lower.includes("flutter")) {
      matched = quickQuestions.find(q => q.id === "technologies");
    } else if (lower.includes("time") || lower.includes("long") || lower.includes("duration") || lower.includes("وقت") || lower.includes("كم يستغرق") || lower.includes("مدة")) {
      matched = quickQuestions.find(q => q.id === "timeline");
    } else if (lower.includes("support") || lower.includes("maintain") || lower.includes("دعم") || lower.includes("صيانة")) {
      matched = quickQuestions.find(q => q.id === "support");
    } else if (lower.includes("where") || lower.includes("location") || lower.includes("riyadh") || lower.includes("saudi") || lower.includes("أين") || lower.includes("موقع") || lower.includes("الرياض")) {
      matched = quickQuestions.find(q => q.id === "location");
    } else if (lower.includes("industr") || lower.includes("sector") || lower.includes("صناع") || lower.includes("قطاع")) {
      matched = quickQuestions.find(q => q.id === "industries");
    } else if (lower.includes("start") || lower.includes("begin") || lower.includes("how to") || lower.includes("أبدأ") || lower.includes("كيف")) {
      matched = quickQuestions.find(q => q.id === "how-to-start");
    } else if (lower.includes("about") || lower.includes("skystack") || lower.includes("who") || lower.includes("ما هو") || lower.includes("من أنتم")) {
      matched = quickQuestions.find(q => q.id === "about");
    }

    if (matched) {
      addBotMessage(isArabic ? matched.answerAr : matched.answer);
    } else {
      const fallback = isArabic
        ? `شكراً لسؤالك! سيتواصل معك فريقنا قريباً على ${userDetails.email} للإجابة بالتفصيل.\n\nفي الأثناء، يمكنك:\n• اختيار سؤال من الأسئلة الشائعة\n• التواصل عبر WhatsApp: +966 53 743 0455\n• زيارة صفحة التواصل: /contact-us`
        : `Thanks for your question! Our team will reach out to you at ${userDetails.email} with a detailed response soon.\n\nIn the meantime, you can:\n• Choose from the common questions below\n• Chat on WhatsApp: +966 53 743 0455\n• Visit our contact page: /contact-us`;
      addBotMessage(fallback);

      // Send the unmatched question to Slack
      try {
        fetch("/api/chatbot-question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userDetails.name,
            email: userDetails.email,
            phone: userDetails.phone,
            question: text
          })
        });
      } catch {
        // silently fail
      }
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);
  };

  const filteredQuestions = selectedCategory === "all"
    ? quickQuestions
    : quickQuestions.filter(q => q.category === selectedCategory);

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group ${isArabic ? "right-24" : "left-6"} ${isOpen ? "bg-slate-700 hover:bg-slate-600" : "bg-primary hover:bg-primary/90"}`}
        aria-label={isArabic ? "فتح المحادثة" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 text-white" />
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
            )}
          </>
        )}
        {!isOpen && (
          <span className={`absolute ${isArabic ? "right-full mr-3" : "left-full ml-3"} bg-slate-900 text-white px-3 py-2 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
            {isArabic ? "تحدث معنا" : "Chat with us"}
          </span>
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-24 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col ${isArabic ? "right-6" : "left-6"}`}
            style={{ height: "min(600px, calc(100vh - 140px))" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-blue-700 p-4 text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{isArabic ? "مساعد SkyStack" : "SkyStack Assistant"}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs text-blue-100">{isArabic ? "متصل الآن" : "Online now"}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {phase === "details" ? (
              /* Phase 1: Collect Details */
              <div className="flex-1 overflow-y-auto p-5">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {isArabic ? "مرحباً بك! 👋" : "Welcome! 👋"}
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    {isArabic
                      ? "يرجى مشاركة بياناتك للبدء في المحادثة"
                      : "Please share your details to start chatting"}
                  </p>
                </div>

                <form onSubmit={handleDetailsSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      {isArabic ? "الاسم الكامل *" : "Full Name *"}
                    </label>
                    <div className="relative">
                      <User className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isArabic ? "right-3" : "left-3"}`} />
                      <input
                        type="text"
                        required
                        value={userDetails.name}
                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        placeholder={isArabic ? "أدخل اسمك الكامل" : "Enter your full name"}
                        className={`w-full border border-slate-200 rounded-lg py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${isArabic ? "pr-10 pl-3" : "pl-10 pr-3"}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      {isArabic ? "البريد الإلكتروني *" : "Email Address *"}
                    </label>
                    <div className="relative">
                      <Mail className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isArabic ? "right-3" : "left-3"}`} />
                      <input
                        type="email"
                        required
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                        placeholder={isArabic ? "you@example.com" : "you@example.com"}
                        className={`w-full border border-slate-200 rounded-lg py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${isArabic ? "pr-10 pl-3" : "pl-10 pr-3"}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      {isArabic ? "رقم الهاتف / WhatsApp *" : "Phone / WhatsApp *"}
                    </label>
                    <div className="relative">
                      <Phone className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isArabic ? "right-3" : "left-3"}`} />
                      <input
                        type="tel"
                        required
                        value={userDetails.phone}
                        onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                        placeholder="+966 5XX XXX XXXX"
                        className={`w-full border border-slate-200 rounded-lg py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${isArabic ? "pr-10 pl-3" : "pl-10 pr-3"}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      {isArabic ? "ما الذي يهمك؟" : "What are you interested in?"}
                    </label>
                    <select
                      value={userDetails.interest}
                      onChange={(e) => setUserDetails({ ...userDetails, interest: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white text-slate-700"
                    >
                      <option value="">{isArabic ? "اختر..." : "Select..."}</option>
                      <option value="mobile-app">{isArabic ? "تطوير تطبيق جوال" : "Mobile App Development"}</option>
                      <option value="web-app">{isArabic ? "تطوير تطبيق ويب" : "Web Application"}</option>
                      <option value="personal-website">{isArabic ? "موقع شخصي (2,000 دولار)" : "Personal Website ($2,000)"}</option>
                      <option value="outsourcing">{isArabic ? "التعهيد التقني" : "IT Outsourcing"}</option>
                      <option value="enterprise">{isArabic ? "حلول مؤسسية" : "Enterprise Solution"}</option>
                      <option value="consulting">{isArabic ? "استشارة تقنية" : "Technical Consulting"}</option>
                      <option value="other">{isArabic ? "أخرى" : "Other"}</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={detailsSubmitting}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {detailsSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        {isArabic ? "ابدأ المحادثة" : "Start Chat"}
                        <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-xs text-slate-400 mt-3">
                  {isArabic ? "🔒 بياناتك آمنة ولن يتم مشاركتها" : "🔒 Your data is secure and won't be shared"}
                </p>
              </div>
            ) : (
              /* Phase 2: Chat */
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          msg.type === "user"
                            ? "bg-primary text-white rounded-br-md"
                            : "bg-white text-slate-700 border border-slate-100 shadow-sm rounded-bl-md"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                        <div className={`text-[10px] mt-1.5 ${msg.type === "user" ? "text-blue-200" : "text-slate-400"}`}>
                          {msg.timestamp.toLocaleTimeString(isArabic ? "ar-SA" : "en-US", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Questions */}
                  {showQuestions && !isTyping && messages.length > 0 && (
                    <div className="space-y-3 pt-2">
                      {/* Category Filter */}
                      <div className="flex flex-wrap gap-1.5">
                        {questionCategories.map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors ${
                              selectedCategory === cat.id
                                ? "bg-primary text-white"
                                : "bg-white text-slate-500 border border-slate-200 hover:border-primary/30"
                            }`}
                          >
                            {isArabic ? cat.labelAr : cat.label}
                          </button>
                        ))}
                      </div>
                      {/* Questions */}
                      <div className="space-y-1.5">
                        {filteredQuestions.map(q => (
                          <button
                            key={q.id}
                            onClick={() => handleQuestionClick(q)}
                            className="w-full text-left bg-white border border-slate-100 hover:border-primary/30 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 hover:text-primary transition-all flex items-center gap-2 group shadow-sm"
                          >
                            <ChevronRight className={`w-3.5 h-3.5 text-primary/50 group-hover:text-primary shrink-0 transition-colors ${isArabic ? "rotate-180" : ""}`} />
                            <span className="flex-1">{isArabic ? q.textAr : q.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Show "Show Questions" button when questions are hidden */}
                  {!showQuestions && !isTyping && (
                    <div className="text-center pt-2">
                      <button
                        onClick={() => setShowQuestions(true)}
                        className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        {isArabic ? "عرض الأسئلة الشائعة" : "Show common questions"}
                      </button>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleFreeTextSubmit} className="p-3 border-t border-slate-100 bg-white shrink-0">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={isArabic ? "اكتب سؤالك..." : "Type your question..."}
                      className={`flex-1 border border-slate-200 rounded-full py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${isArabic ? "pr-4 pl-3" : "pl-4 pr-3"}`}
                    />
                    <button
                      type="submit"
                      disabled={!userInput.trim() || isTyping}
                      className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                    >
                      <Send className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
