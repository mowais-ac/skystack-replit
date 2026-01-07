import { Database, Monitor, Search, Layers, ShoppingCart, UserCheck, Shield, BarChart, FileText, Code } from "lucide-react";

export interface ServiceItem {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
}

export const services: ServiceItem[] = [
  {
    slug: "custom-mobile-app-development",
    title: "Custom Mobile App Development",
    subtitle: "Native iOS & Android Applications",
    description: "Build high-performance, scalable mobile applications tailored to your business needs.",
    icon: Monitor,
    problem: "Off-the-shelf mobile solutions lack the flexibility and performance required for enterprise-grade applications.",
    solution: "We engineer bespoke native and cross-platform mobile apps using React Native and Swift, ensuring peak performance and seamless user experiences.",
    features: ["Cross-platform compatibility", "Offline-first architecture", "Real-time synchronization", "Biometric security"],
    techStack: ["React Native", "Swift", "Kotlin", "Firebase", "Node.js"]
  },
  {
    slug: "web-development",
    title: "Enterprise Web Development",
    subtitle: "Scalable SaaS Platforms",
    description: "Modern, responsive web applications built with the latest technologies.",
    icon: Database,
    problem: "Legacy web systems are slow, insecure, and difficult to scale as user bases grow.",
    solution: "Our team builds progressive web apps (PWAs) and single-page applications (SPAs) that load instantly and scale infinitely on cloud infrastructure.",
    features: ["Server-side rendering (SSR)", "API-first design", "Automated CI/CD pipelines", "Microservices architecture"],
    techStack: ["React", "Next.js", "TypeScript", "PostgreSQL", "AWS"]
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    subtitle: "Intelligent Business Automation",
    description: "Integrate predictive analytics and AI models into your workflows.",
    icon: Search,
    problem: "Businesses sit on mountains of data but lack the tools to extract actionable insights or automate complex decisions.",
    solution: "We implement custom ML models and LLM integrations to automate customer support, predict trends, and optimize operations.",
    features: ["Natural Language Processing", "Computer Vision", "Predictive Analytics", "Chatbot Integration"],
    techStack: ["Python", "TensorFlow", "OpenAI API", "LangChain", "Pinecone"]
  },
  {
    slug: "blockchain-development",
    title: "Blockchain Solutions",
    subtitle: "Decentralized & Secure",
    description: "Smart contracts, dApps, and enterprise blockchain integration.",
    icon: Shield,
    problem: "Trust and transparency issues in multi-party transactions create friction and high operational costs.",
    solution: "Our blockchain experts develop secure smart contracts and decentralized ledgers to automate trust and reduce intermediaries.",
    features: ["Smart Contract Auditing", "DeFi Protocols", "NFT Marketplaces", "Private Consortium Chains"],
    techStack: ["Solidity", "Ethereum", "Web3.js", "Hardhat", "Polygon"]
  }
];

export const businessModels: ServiceItem[] = [
  {
    slug: "hq-trivia-clone",
    title: "Live Trivia Game Platform",
    subtitle: "HQ Trivia Style App Development",
    description: "A scalable platform for live, interactive game shows with massive concurrency.",
    icon: Layers,
    problem: "Handling 100,000+ concurrent users with sub-second latency for live interactions is technically challenging.",
    solution: "We use WebSocket clusters and Redis for real-time state management to deliver lag-free live gaming experiences.",
    features: ["Real-time Leaderboards", "Live Video Streaming", "Cash Prize Payouts", "Push Notifications"],
    techStack: ["WebSockets", "Redis", "Node.js", "AWS Lambda", "React Native"]
  },
  {
    slug: "food-delivery-platform",
    title: "On-Demand Delivery App",
    subtitle: "UberEats / DoorDash Clone",
    description: "Complete ecosystem for customers, drivers, and restaurant partners.",
    icon: ShoppingCart,
    problem: "Coordinating three-sided marketplaces (users, drivers, vendors) requires complex logistics algorithms.",
    solution: "Our solution includes intelligent route optimization, real-time tracking, and automated dispatching systems.",
    features: ["Live GPS Tracking", "Order Management System", "Driver Wallet", "Restaurant Analytics Dashboard"],
    techStack: ["Google Maps API", "Stripe Connect", "MongoDB", "Express", "Flutter"]
  },
  {
    slug: "dating-app-platform",
    title: "Social Discovery App",
    subtitle: "Tinder / Bumble Clone",
    description: "Swipe-based matching algorithm with premium subscription features.",
    icon: UserCheck,
    problem: "User retention depends on high-quality matches and engaging real-time communication features.",
    solution: "We build sophisticated matching algorithms based on location and preferences, coupled with secure in-app messaging.",
    features: ["Geolocation Matching", "In-app Video Chat", "Premium Subscriptions", "Profile Verification"],
    techStack: ["PostGIS", "WebRTC", "Socket.io", "React Native", "AWS S3"]
  },
  {
    slug: "fintech-wallet",
    title: "Digital Wallet Solution",
    subtitle: "Venmo / CashApp Clone",
    description: "Secure peer-to-peer payments and banking integration.",
    icon: BarChart,
    problem: "Regulatory compliance and transaction security are massive barriers to entry in fintech.",
    solution: "Our banking-grade architecture includes KYC verification, fraud detection, and PCI-DSS compliant payment processing.",
    features: ["P2P Transfers", "QR Code Payments", "Virtual Cards", "Transaction History"],
    techStack: ["Plaid API", "Stripe", "Node.js", "PostgreSQL", "Docker"]
  }
];
