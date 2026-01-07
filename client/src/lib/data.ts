import { 
  Smartphone, 
  Globe, 
  Layers, 
  Copy, 
  Palette, 
  Lightbulb, 
  TrendingUp, 
  Users,
  ShoppingCart,
  Car,
  Shirt,
  GraduationCap,
  Store,
  Gamepad2,
  MapPin,
  BarChart3,
  Sparkles,
  Coins,
  Building2,
  Rocket,
  ShoppingBag,
  Truck,
  Heart,
  Wallet,
  Utensils
} from "lucide-react";

export interface ServiceItem {
  slug: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  icon: any;
  problem: string;
  problemAr: string;
  solution: string;
  solutionAr: string;
  features: string[];
  featuresAr: string[];
  techStack: string[];
  useCases: string[];
  useCasesAr: string[];
}

export interface IndustryItem {
  title: string;
  titleAr: string;
  icon: any;
  description: string;
  descriptionAr: string;
}

export const services: ServiceItem[] = [
  {
    slug: "custom-mobile-app-development",
    title: "Custom Mobile App Development",
    titleAr: "تطوير تطبيقات الجوال المخصصة",
    subtitle: "Native iOS & Android Applications",
    subtitleAr: "تطبيقات iOS و Android الأصلية",
    description: "Build high-performance, scalable mobile applications tailored to your business needs with native and cross-platform solutions.",
    descriptionAr: "بناء تطبيقات جوال عالية الأداء وقابلة للتوسع مصممة لتلبية احتياجات عملك.",
    icon: Smartphone,
    problem: "Off-the-shelf mobile solutions lack the flexibility and performance required for enterprise-grade applications. Generic apps fail to address unique business processes and customer expectations.",
    problemAr: "الحلول الجاهزة للجوال تفتقر إلى المرونة والأداء المطلوب للتطبيقات المؤسسية.",
    solution: "We engineer bespoke native and cross-platform mobile apps using React Native, Flutter, and native Swift/Kotlin, ensuring peak performance, seamless user experiences, and enterprise-grade security.",
    solutionAr: "نقوم بتطوير تطبيقات جوال مخصصة باستخدام React Native و Flutter وSwift/Kotlin الأصلية.",
    features: ["Cross-platform compatibility", "Offline-first architecture", "Real-time synchronization", "Biometric security", "Push notifications", "In-app analytics"],
    featuresAr: ["التوافق عبر المنصات", "البنية الأولى بدون اتصال", "المزامنة في الوقت الحقيقي", "الأمان البيومتري"],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Node.js", "AWS"],
    useCases: ["Enterprise mobility", "Customer-facing apps", "Field service apps", "E-commerce mobile"],
    useCasesAr: ["تطبيقات المؤسسات", "تطبيقات العملاء", "تطبيقات الخدمة الميدانية"]
  },
  {
    slug: "custom-web-development",
    title: "Custom Web Development",
    titleAr: "تطوير الويب المخصص",
    subtitle: "Enterprise Web Applications & Portals",
    subtitleAr: "تطبيقات وبوابات الويب المؤسسية",
    description: "Modern, responsive web applications built with the latest technologies for optimal performance and scalability.",
    descriptionAr: "تطبيقات ويب حديثة وسريعة الاستجابة مبنية بأحدث التقنيات.",
    icon: Globe,
    problem: "Legacy web systems are slow, insecure, and difficult to scale as user bases grow. Outdated technology stacks create technical debt and security vulnerabilities.",
    problemAr: "أنظمة الويب القديمة بطيئة وغير آمنة وصعبة التوسع.",
    solution: "Our team builds progressive web apps (PWAs) and single-page applications (SPAs) that load instantly and scale infinitely on cloud infrastructure with modern frameworks.",
    solutionAr: "فريقنا يبني تطبيقات ويب تقدمية وتطبيقات صفحة واحدة تحمل بشكل فوري.",
    features: ["Server-side rendering (SSR)", "API-first design", "Automated CI/CD pipelines", "Microservices architecture", "Real-time dashboards", "Role-based access"],
    featuresAr: ["العرض من جانب الخادم", "التصميم الأول للـ API", "خطوط أنابيب CI/CD الآلية"],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    useCases: ["SaaS platforms", "Customer portals", "Admin dashboards", "E-commerce websites"],
    useCasesAr: ["منصات SaaS", "بوابات العملاء", "لوحات الإدارة"]
  },
  {
    slug: "on-demand-app-development",
    title: "On-Demand App Development",
    titleAr: "تطوير تطبيقات حسب الطلب",
    subtitle: "Uber-like & Gig Economy Platforms",
    subtitleAr: "منصات مثل أوبر واقتصاد العمل المؤقت",
    description: "Complete on-demand service platforms connecting customers, service providers, and administrators in real-time.",
    descriptionAr: "منصات خدمات حسب الطلب كاملة تربط العملاء ومقدمي الخدمات والمسؤولين.",
    icon: Layers,
    problem: "Building multi-sided marketplaces requires complex real-time logistics, payment splitting, and coordination between multiple user types.",
    problemAr: "بناء الأسواق متعددة الأطراف يتطلب لوجستيات معقدة في الوقت الحقيقي.",
    solution: "Our on-demand solutions include intelligent dispatching, real-time GPS tracking, automated commission calculation, and seamless payment processing.",
    solutionAr: "حلولنا حسب الطلب تشمل الإرسال الذكي والتتبع GPS في الوقت الحقيقي.",
    features: ["Real-time GPS tracking", "Intelligent dispatching", "Multi-payment support", "Rating & reviews", "Driver/provider wallets", "Admin analytics"],
    featuresAr: ["تتبع GPS في الوقت الحقيقي", "الإرسال الذكي", "دعم الدفع المتعدد"],
    techStack: ["React Native", "Node.js", "MongoDB", "Redis", "Socket.io", "Google Maps API", "Stripe"],
    useCases: ["Ride-hailing", "Food delivery", "Home services", "Healthcare on-demand"],
    useCasesAr: ["طلب السيارات", "توصيل الطعام", "الخدمات المنزلية"]
  },
  {
    slug: "clone-app-development",
    title: "Clone App Development",
    titleAr: "تطوير تطبيقات استنساخ",
    subtitle: "White-Label Solutions",
    subtitleAr: "حلول العلامة البيضاء",
    description: "Launch faster with proven app templates that can be customized to match your brand and business requirements.",
    descriptionAr: "أطلق بشكل أسرع مع قوالب تطبيقات مثبتة يمكن تخصيصها لتتناسب مع علامتك التجارية.",
    icon: Copy,
    problem: "Building from scratch is expensive and time-consuming. Entrepreneurs need a faster path to market without sacrificing quality.",
    problemAr: "البناء من الصفر مكلف ويستغرق وقتاً طويلاً.",
    solution: "Our white-label solutions provide production-ready app templates with customizable UI, integrated payment systems, and scalable architecture.",
    solutionAr: "حلولنا ذات العلامة البيضاء توفر قوالب تطبيقات جاهزة للإنتاج.",
    features: ["Fully customizable UI", "Pre-built user flows", "Payment integration", "Admin dashboard", "Scalable infrastructure", "Quick deployment"],
    featuresAr: ["واجهة مستخدم قابلة للتخصيص بالكامل", "تدفقات مستخدم مسبقة البناء", "تكامل الدفع"],
    techStack: ["React Native", "React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    useCases: ["Uber clone", "Airbnb clone", "Instagram clone", "TikTok clone"],
    useCasesAr: ["استنساخ أوبر", "استنساخ Airbnb", "استنساخ إنستغرام"]
  },
  {
    slug: "ui-ux-design-services",
    title: "UI/UX Design Services",
    titleAr: "خدمات تصميم UI/UX",
    subtitle: "User-Centered Design",
    subtitleAr: "التصميم المتمحور حول المستخدم",
    description: "Create intuitive, beautiful interfaces that delight users and drive engagement through research-backed design.",
    descriptionAr: "إنشاء واجهات بديهية وجميلة تسعد المستخدمين وتزيد التفاعل.",
    icon: Palette,
    problem: "Poor user experience leads to high bounce rates, low conversion, and frustrated customers. Many products fail due to confusing interfaces.",
    problemAr: "تجربة المستخدم السيئة تؤدي إلى معدلات ارتداد عالية وتحويل منخفض.",
    solution: "Our design team conducts user research, creates wireframes and prototypes, and delivers pixel-perfect designs that align with your brand identity.",
    solutionAr: "فريق التصميم لدينا يجري أبحاث المستخدم ويصمم نماذج أولية ويقدم تصاميم مثالية.",
    features: ["User research & personas", "Wireframing", "Interactive prototypes", "Design systems", "Usability testing", "Accessibility compliance"],
    featuresAr: ["أبحاث المستخدم والشخصيات", "الإطارات السلكية", "النماذج الأولية التفاعلية"],
    techStack: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision", "Zeplin"],
    useCases: ["Mobile app design", "Web app design", "SaaS interfaces", "Design systems"],
    useCasesAr: ["تصميم تطبيقات الجوال", "تصميم تطبيقات الويب", "واجهات SaaS"]
  },
  {
    slug: "technology-consulting-services",
    title: "Technology Consulting",
    titleAr: "الاستشارات التقنية",
    subtitle: "Strategic IT Advisory",
    subtitleAr: "الاستشارات الاستراتيجية لتقنية المعلومات",
    description: "Expert guidance on technology strategy, architecture, and digital transformation initiatives.",
    descriptionAr: "إرشادات خبراء حول استراتيجية التكنولوجيا والبنية والمبادرات الرقمية.",
    icon: Lightbulb,
    problem: "Many organizations struggle to align technology investments with business goals, leading to wasted resources and missed opportunities.",
    problemAr: "تكافح العديد من المنظمات لمواءمة استثمارات التكنولوجيا مع أهداف العمل.",
    solution: "Our consultants help you define a technology roadmap, select the right tools, and build internal capabilities for long-term success.",
    solutionAr: "يساعدك مستشارونا في تحديد خارطة طريق تقنية واختيار الأدوات المناسبة.",
    features: ["Technology audits", "Architecture design", "Vendor selection", "Team augmentation", "Process optimization", "Training programs"],
    featuresAr: ["تدقيق التكنولوجيا", "تصميم البنية", "اختيار الموردين"],
    techStack: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Various"],
    useCases: ["Digital transformation", "Cloud migration", "Legacy modernization", "Startup scaling"],
    useCasesAr: ["التحول الرقمي", "الهجرة السحابية", "تحديث الأنظمة القديمة"]
  },
  {
    slug: "digital-marketing-services",
    title: "Digital Marketing Services",
    titleAr: "خدمات التسويق الرقمي",
    subtitle: "Growth & Performance Marketing",
    subtitleAr: "التسويق للنمو والأداء",
    description: "Data-driven marketing strategies that increase visibility, drive traffic, and convert visitors into customers.",
    descriptionAr: "استراتيجيات تسويق مبنية على البيانات تزيد الظهور وتجلب الزوار وتحولهم لعملاء.",
    icon: TrendingUp,
    problem: "Without a strategic approach to digital marketing, businesses struggle to reach their target audience and compete effectively online.",
    problemAr: "بدون نهج استراتيجي للتسويق الرقمي، تكافح الشركات للوصول لجمهورها المستهدف.",
    solution: "We create comprehensive marketing strategies including SEO, paid advertising, social media, and content marketing to drive measurable growth.",
    solutionAr: "نصنع استراتيجيات تسويق شاملة تشمل SEO والإعلانات المدفوعة والتواصل الاجتماعي.",
    features: ["SEO optimization", "PPC campaigns", "Social media marketing", "Content strategy", "Email marketing", "Analytics & reporting"],
    featuresAr: ["تحسين SEO", "حملات PPC", "التسويق عبر وسائل التواصل"],
    techStack: ["Google Analytics", "Google Ads", "Meta Ads", "HubSpot", "SEMrush", "Mailchimp"],
    useCases: ["Brand awareness", "Lead generation", "E-commerce sales", "App downloads"],
    useCasesAr: ["الوعي بالعلامة التجارية", "توليد العملاء المحتملين", "مبيعات التجارة الإلكترونية"]
  },
  {
    slug: "offshore-office-services",
    title: "Offshore Development Center",
    titleAr: "مركز التطوير الخارجي",
    subtitle: "Dedicated Development Teams",
    subtitleAr: "فرق تطوير مخصصة",
    description: "Scale your development capacity with dedicated offshore teams that work as an extension of your organization.",
    descriptionAr: "وسّع قدرتك التطويرية مع فرق خارجية مخصصة تعمل كامتداد لمنظمتك.",
    icon: Users,
    problem: "Hiring local talent is expensive and time-consuming. Companies need flexible access to skilled developers without long-term commitments.",
    problemAr: "توظيف المواهب المحلية مكلف ويستغرق وقتاً. تحتاج الشركات لوصول مرن للمطورين المهرة.",
    solution: "Our offshore development centers provide vetted engineers who integrate with your team, follow your processes, and deliver quality code.",
    solutionAr: "توفر مراكز التطوير الخارجية لدينا مهندسين مدققين يندمجون مع فريقك.",
    features: ["Dedicated teams", "Flexible scaling", "Same timezone overlap", "Direct communication", "IP protection", "Quality assurance"],
    featuresAr: ["فرق مخصصة", "توسع مرن", "تداخل المنطقة الزمنية"],
    techStack: ["Various", "Agile", "Scrum", "Jira", "Slack", "GitHub"],
    useCases: ["Staff augmentation", "Project-based teams", "Maintenance teams", "Full product development"],
    useCasesAr: ["تعزيز الموظفين", "فرق المشاريع", "فرق الصيانة"]
  }
];

export const businessModels: ServiceItem[] = [
  {
    slug: "hq-trivia-clone",
    title: "Live Trivia Game Platform",
    titleAr: "منصة ألعاب التريفيا المباشرة",
    subtitle: "HQ Trivia Style App",
    subtitleAr: "تطبيق بنمط HQ Trivia",
    description: "A scalable platform for live, interactive game shows with massive concurrency and real-time prize distribution.",
    descriptionAr: "منصة قابلة للتوسع لعروض الألعاب التفاعلية المباشرة مع تزامن ضخم.",
    icon: Gamepad2,
    problem: "Handling 100,000+ concurrent users with sub-second latency for live interactions is technically challenging.",
    problemAr: "التعامل مع أكثر من 100,000 مستخدم متزامن مع زمن استجابة أقل من ثانية تحدٍ تقني.",
    solution: "We use WebSocket clusters and Redis for real-time state management to deliver lag-free live gaming experiences.",
    solutionAr: "نستخدم مجموعات WebSocket و Redis لإدارة الحالة في الوقت الحقيقي.",
    features: ["Real-time Leaderboards", "Live Video Streaming", "Cash Prize Payouts", "Push Notifications", "Anti-cheat systems", "Analytics dashboard"],
    featuresAr: ["لوحات المتصدرين في الوقت الحقيقي", "البث المباشر للفيديو", "مدفوعات الجوائز النقدية"],
    techStack: ["WebSockets", "Redis", "Node.js", "AWS Lambda", "React Native", "FFmpeg"],
    useCases: ["Entertainment apps", "Brand engagement", "Educational games", "Corporate events"],
    useCasesAr: ["تطبيقات الترفيه", "تفاعل العلامات التجارية", "الألعاب التعليمية"]
  },
  {
    slug: "food-delivery-app-development",
    title: "Food Delivery Platform",
    titleAr: "منصة توصيل الطعام",
    subtitle: "UberEats / DoorDash Clone",
    subtitleAr: "استنساخ UberEats / DoorDash",
    description: "Complete ecosystem for customers, drivers, and restaurant partners with intelligent logistics.",
    descriptionAr: "نظام بيئي كامل للعملاء والسائقين وشركاء المطاعم مع لوجستيات ذكية.",
    icon: Utensils,
    problem: "Coordinating three-sided marketplaces (users, drivers, vendors) requires complex logistics algorithms.",
    problemAr: "تنسيق الأسواق ثلاثية الأطراف يتطلب خوارزميات لوجستية معقدة.",
    solution: "Our solution includes intelligent route optimization, real-time tracking, and automated dispatching systems.",
    solutionAr: "يتضمن حلنا تحسين المسار الذكي والتتبع في الوقت الحقيقي وأنظمة الإرسال الآلي.",
    features: ["Live GPS Tracking", "Order Management", "Driver Wallet", "Restaurant Dashboard", "Promo codes", "Multi-language"],
    featuresAr: ["تتبع GPS المباشر", "إدارة الطلبات", "محفظة السائق"],
    techStack: ["Google Maps API", "Stripe Connect", "MongoDB", "Express", "React Native", "Firebase"],
    useCases: ["Food delivery startups", "Restaurant chains", "Ghost kitchens", "Grocery delivery"],
    useCasesAr: ["شركات توصيل الطعام الناشئة", "سلاسل المطاعم", "توصيل البقالة"]
  },
  {
    slug: "ecommerce-app-development",
    title: "E-Commerce Platform",
    titleAr: "منصة التجارة الإلكترونية",
    subtitle: "Multi-vendor Marketplace",
    subtitleAr: "سوق متعدد البائعين",
    description: "Comprehensive e-commerce solutions from single-vendor stores to multi-vendor marketplaces.",
    descriptionAr: "حلول تجارة إلكترونية شاملة من متاجر البائع الواحد إلى الأسواق متعددة البائعين.",
    icon: Store,
    problem: "Building a scalable e-commerce platform with inventory management, payments, and logistics is complex.",
    problemAr: "بناء منصة تجارة إلكترونية قابلة للتوسع مع إدارة المخزون والمدفوعات واللوجستيات أمر معقد.",
    solution: "Our e-commerce solutions handle everything from product catalogs to order fulfillment with built-in analytics.",
    solutionAr: "تتعامل حلول التجارة الإلكترونية لدينا مع كل شيء من كتالوجات المنتجات إلى تنفيذ الطلبات.",
    features: ["Product catalog", "Shopping cart", "Multiple payment gateways", "Inventory management", "Shipping integration", "Vendor dashboard"],
    featuresAr: ["كتالوج المنتجات", "سلة التسوق", "بوابات دفع متعددة"],
    techStack: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Elasticsearch", "AWS S3"],
    useCases: ["B2C retail", "B2B wholesale", "Marketplace platforms", "Subscription boxes"],
    useCasesAr: ["البيع بالتجزئة B2C", "الجملة B2B", "منصات السوق"]
  },
  {
    slug: "car-wash-app-development",
    title: "Car Wash Booking App",
    titleAr: "تطبيق حجز غسيل السيارات",
    subtitle: "On-Demand Car Care",
    subtitleAr: "العناية بالسيارات حسب الطلب",
    description: "Mobile car wash and detailing platform connecting customers with service providers.",
    descriptionAr: "منصة غسيل وتنظيف السيارات المتنقلة تربط العملاء بمقدمي الخدمات.",
    icon: Car,
    problem: "Traditional car wash services lack convenience. Customers want on-demand, at-location services.",
    problemAr: "تفتقر خدمات غسيل السيارات التقليدية للراحة. يريد العملاء خدمات حسب الطلب في الموقع.",
    solution: "Our platform enables customers to book mobile car wash services with real-time tracking and online payments.",
    solutionAr: "تمكّن منصتنا العملاء من حجز خدمات غسيل السيارات المتنقلة مع التتبع والدفع.",
    features: ["Service booking", "Real-time tracking", "Multiple service packages", "Subscription plans", "Provider ratings", "Push notifications"],
    featuresAr: ["حجز الخدمة", "التتبع في الوقت الحقيقي", "باقات خدمة متعددة"],
    techStack: ["React Native", "Node.js", "MongoDB", "Google Maps", "Stripe", "Firebase"],
    useCases: ["Car wash startups", "Detailing services", "Fleet management", "Corporate services"],
    useCasesAr: ["شركات غسيل السيارات الناشئة", "خدمات التفصيل", "إدارة الأسطول"]
  },
  {
    slug: "laundry-app-development",
    title: "Laundry Service Platform",
    titleAr: "منصة خدمات الغسيل",
    subtitle: "On-Demand Laundry & Dry Cleaning",
    subtitleAr: "الغسيل والتنظيف الجاف حسب الطلب",
    description: "End-to-end laundry service management with pickup, processing, and delivery tracking.",
    descriptionAr: "إدارة خدمة الغسيل الشاملة مع الاستلام والمعالجة وتتبع التوصيل.",
    icon: Shirt,
    problem: "Managing laundry logistics including pickup scheduling, processing, and delivery is operationally complex.",
    problemAr: "إدارة لوجستيات الغسيل بما في ذلك جدولة الاستلام والمعالجة والتوصيل أمر معقد تشغيلياً.",
    solution: "Our laundry platform automates the entire workflow from order placement to delivery confirmation.",
    solutionAr: "تقوم منصة الغسيل لدينا بأتمتة سير العمل بأكمله من وضع الطلب إلى تأكيد التسليم.",
    features: ["Schedule pickup", "Order tracking", "Price calculator", "Recurring orders", "Driver app", "Business dashboard"],
    featuresAr: ["جدولة الاستلام", "تتبع الطلب", "حاسبة الأسعار"],
    techStack: ["React Native", "Node.js", "PostgreSQL", "Google Maps", "Twilio", "Stripe"],
    useCases: ["Laundry startups", "Dry cleaning chains", "Hotel laundry", "Campus laundry"],
    useCasesAr: ["شركات الغسيل الناشئة", "سلاسل التنظيف الجاف", "غسيل الفنادق"]
  },
  {
    slug: "elearning-app-development",
    title: "E-Learning Platform",
    titleAr: "منصة التعلم الإلكتروني",
    subtitle: "Online Education & Courses",
    subtitleAr: "التعليم والدورات عبر الإنترنت",
    description: "Comprehensive learning management system with video courses, assessments, and certifications.",
    descriptionAr: "نظام إدارة تعلم شامل مع دورات فيديو وتقييمات وشهادات.",
    icon: GraduationCap,
    problem: "Educational institutions and creators need a platform to deliver courses, track progress, and engage students.",
    problemAr: "تحتاج المؤسسات التعليمية والمنشئون إلى منصة لتقديم الدورات وتتبع التقدم وإشراك الطلاب.",
    solution: "Our LMS provides video hosting, quizzes, progress tracking, live sessions, and certificate generation.",
    solutionAr: "يوفر نظام إدارة التعلم لدينا استضافة الفيديو والاختبارات وتتبع التقدم والجلسات المباشرة.",
    features: ["Video courses", "Live classes", "Quizzes & exams", "Progress tracking", "Certificates", "Discussion forums"],
    featuresAr: ["دورات الفيديو", "الفصول المباشرة", "الاختبارات", "تتبع التقدم"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "AWS S3", "WebRTC", "Stripe"],
    useCases: ["Online academies", "Corporate training", "K-12 education", "Skill development"],
    useCasesAr: ["الأكاديميات عبر الإنترنت", "التدريب المؤسسي", "التعليم K-12"]
  },
  {
    slug: "gojek-app-development",
    title: "Super App Platform",
    titleAr: "منصة التطبيق الفائق",
    subtitle: "Gojek-style Multi-Service App",
    subtitleAr: "تطبيق متعدد الخدمات بنمط Gojek",
    description: "All-in-one super app combining ride-hailing, delivery, payments, and more in a single platform.",
    descriptionAr: "تطبيق فائق شامل يجمع بين طلب السيارات والتوصيل والمدفوعات والمزيد في منصة واحدة.",
    icon: Layers,
    problem: "Users want a single app for multiple daily services. Managing multiple service verticals is complex.",
    problemAr: "يريد المستخدمون تطبيقاً واحداً لخدمات يومية متعددة. إدارة قطاعات خدمة متعددة أمر معقد.",
    solution: "Our super app architecture allows you to launch multiple services under one brand with shared user accounts.",
    solutionAr: "تتيح لك بنية التطبيق الفائق لدينا إطلاق خدمات متعددة تحت علامة تجارية واحدة.",
    features: ["Multiple service modules", "Unified wallet", "Single sign-on", "Cross-promotion", "Unified analytics", "Modular architecture"],
    featuresAr: ["وحدات خدمة متعددة", "محفظة موحدة", "تسجيل دخول واحد"],
    techStack: ["React Native", "Node.js", "Microservices", "Kubernetes", "Redis", "PostgreSQL"],
    useCases: ["Regional super apps", "Enterprise apps", "City services", "Lifestyle platforms"],
    useCasesAr: ["التطبيقات الفائقة الإقليمية", "تطبيقات المؤسسات", "خدمات المدن"]
  },
  {
    slug: "fintech-wallet",
    title: "Digital Wallet Solution",
    titleAr: "حل المحفظة الرقمية",
    subtitle: "Fintech Payment Platform",
    subtitleAr: "منصة الدفع المالية التقنية",
    description: "Secure peer-to-peer payments and banking integration with compliance-ready architecture.",
    descriptionAr: "مدفوعات آمنة من نظير إلى نظير وتكامل مصرفي مع بنية جاهزة للامتثال.",
    icon: Wallet,
    problem: "Regulatory compliance and transaction security are massive barriers to entry in fintech.",
    problemAr: "الامتثال التنظيمي وأمان المعاملات هي حواجز ضخمة للدخول في التكنولوجيا المالية.",
    solution: "Our banking-grade architecture includes KYC verification, fraud detection, and PCI-DSS compliant payment processing.",
    solutionAr: "تتضمن بنيتنا المصرفية التحقق من KYC وكشف الاحتيال ومعالجة الدفع المتوافقة مع PCI-DSS.",
    features: ["P2P Transfers", "QR Code Payments", "Virtual Cards", "Transaction History", "KYC verification", "Fraud detection"],
    featuresAr: ["التحويلات P2P", "مدفوعات QR", "البطاقات الافتراضية", "سجل المعاملات"],
    techStack: ["Plaid API", "Stripe", "Node.js", "PostgreSQL", "Docker", "AWS"],
    useCases: ["Neobanks", "Corporate expense", "Remittance apps", "Loyalty programs"],
    useCasesAr: ["البنوك الرقمية", "نفقات الشركات", "تطبيقات التحويلات"]
  }
];

export const industries: IndustryItem[] = [
  {
    title: "Enterprise",
    titleAr: "المؤسسات",
    icon: Building2,
    description: "Digital transformation for large organizations",
    descriptionAr: "التحول الرقمي للمنظمات الكبيرة"
  },
  {
    title: "Startups",
    titleAr: "الشركات الناشئة",
    icon: Rocket,
    description: "MVP development and rapid scaling",
    descriptionAr: "تطوير MVP والتوسع السريع"
  },
  {
    title: "E-Commerce",
    titleAr: "التجارة الإلكترونية",
    icon: ShoppingBag,
    description: "Online retail and marketplace solutions",
    descriptionAr: "حلول البيع بالتجزئة والسوق عبر الإنترنت"
  },
  {
    title: "Logistics",
    titleAr: "اللوجستيات",
    icon: Truck,
    description: "Fleet management and delivery optimization",
    descriptionAr: "إدارة الأسطول وتحسين التوصيل"
  },
  {
    title: "Healthcare",
    titleAr: "الرعاية الصحية",
    icon: Heart,
    description: "Telemedicine and health tech solutions",
    descriptionAr: "حلول التطبيب عن بعد والتقنية الصحية"
  },
  {
    title: "Fintech",
    titleAr: "التكنولوجيا المالية",
    icon: Wallet,
    description: "Payment processing and banking solutions",
    descriptionAr: "معالجة الدفع والحلول المصرفية"
  }
];

export const engagementModels = [
  {
    title: "Fixed Price",
    titleAr: "السعر الثابت",
    description: "Best for well-defined projects with clear requirements and scope.",
    descriptionAr: "الأفضل للمشاريع المحددة جيداً مع متطلبات ونطاق واضح.",
    features: ["Defined scope", "Fixed budget", "Clear deliverables", "Milestone-based payments"],
    featuresAr: ["نطاق محدد", "ميزانية ثابتة", "مخرجات واضحة", "مدفوعات المعالم"]
  },
  {
    title: "Dedicated Team",
    titleAr: "فريق مخصص",
    description: "Ideal for long-term projects requiring ongoing development and maintenance.",
    descriptionAr: "مثالي للمشاريع طويلة المدى التي تتطلب تطويراً وصيانة مستمرة.",
    features: ["Full-time resources", "Direct management", "Flexible scope", "Monthly billing"],
    featuresAr: ["موارد بدوام كامل", "إدارة مباشرة", "نطاق مرن", "فوترة شهرية"]
  },
  {
    title: "Time & Material",
    titleAr: "الوقت والمواد",
    description: "Perfect for projects with evolving requirements and iterative development.",
    descriptionAr: "مثالي للمشاريع ذات المتطلبات المتطورة والتطوير التكراري.",
    features: ["Pay as you go", "Flexible scope", "Agile development", "Transparent billing"],
    featuresAr: ["ادفع كما تذهب", "نطاق مرن", "تطوير رشيق", "فوترة شفافة"]
  }
];
