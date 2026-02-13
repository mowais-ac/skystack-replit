import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight, Check, Shield, Zap, Globe, Smartphone, Search, Palette,
  Rocket, Star, Clock, ChevronRight, Send, Lock, Users, Award,
  MessageCircle, Layers, Code, HeartHandshake, CheckCircle2, Sparkles,
  Monitor, Mail, Phone, TrendingUp, Eye, Target, Loader2
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { trackLeadFormSubmission } from "@/lib/analytics";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const packageFeatures = [
  {
    icon: Palette,
    title: "Custom Premium Design",
    description: "Stunning, unique design tailored to your personal brand. No templates — 100% custom crafted."
  },
  {
    icon: Smartphone,
    title: "Fully Responsive",
    description: "Looks perfect on desktop, tablet, and mobile. Optimized for every screen size."
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Built-in SEO best practices so people find you on Google. Meta tags, structured data, and more."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Under 2-second load time with optimized images, lazy loading, and modern performance techniques."
  },
  {
    icon: Shield,
    title: "SSL & Security",
    description: "Free SSL certificate, security headers, and protection against common web vulnerabilities."
  },
  {
    icon: Mail,
    title: "Contact Form & Lead Capture",
    description: "Professional contact forms with email notifications and optional CRM integration."
  },
  {
    icon: Globe,
    title: "Domain & Hosting Setup",
    description: "We handle domain configuration, DNS setup, and reliable hosting deployment."
  },
  {
    icon: Code,
    title: "Clean, Modern Code",
    description: "Built with React/Next.js — modern, maintainable, and easy to update in the future."
  }
];

const freeAddons = [
  {
    icon: Eye,
    title: "Google Analytics 4",
    description: "Full GA4 setup with custom events, conversion tracking, and audience insights dashboard.",
    value: "$200"
  },
  {
    icon: Target,
    title: "Hotjar Heatmaps",
    description: "Heatmaps, session recordings, and user behavior analytics to see exactly how visitors interact.",
    value: "$150"
  },
  {
    icon: TrendingUp,
    title: "Mixpanel Analytics",
    description: "Advanced product analytics with user funnels, retention analysis, and custom event tracking.",
    value: "$200"
  },
  {
    icon: Layers,
    title: "Google Tag Manager",
    description: "GTM container setup with all marketing tags pre-configured. Easy to add future tracking pixels.",
    value: "$150"
  },
  {
    icon: Search,
    title: "Google Search Console",
    description: "Full Search Console setup with sitemap submission, indexing requests, and performance monitoring.",
    value: "$100"
  },
  {
    icon: Globe,
    title: "Bing Webmaster Tools",
    description: "Bing Webmaster setup for additional search engine visibility and SEO insights.",
    value: "$50"
  },
  {
    icon: Rocket,
    title: "Meta Pixel (Facebook)",
    description: "Facebook/Instagram pixel installed and configured for retargeting and conversion tracking.",
    value: "$100"
  },
  {
    icon: Monitor,
    title: "Speed & Core Web Vitals",
    description: "PageSpeed optimization to score 90+ on Google Lighthouse. Core Web Vitals compliance included.",
    value: "$200"
  }
];

const whatsIncluded = [
  "Up to 5 custom-designed pages",
  "Professional copywriting guidance",
  "High-quality image sourcing & optimization",
  "Blog/articles section (optional)",
  "Social media integration",
  "Google Analytics 4 + Mixpanel setup",
  "Hotjar heatmaps & session recording",
  "Google Tag Manager configured",
  "Search Console & Webmaster Tools",
  "WhatsApp chat widget",
  "Contact form with email alerts",
  "Meta Pixel for retargeting",
  "1 month free support after launch",
  "Full source code ownership",
  "Performance & Core Web Vitals optimization",
  "Cross-browser testing"
];

const perfectFor = [
  {
    icon: Users,
    title: "Professionals & Consultants",
    description: "Showcase your expertise, experience, and services to attract new clients."
  },
  {
    icon: Sparkles,
    title: "Freelancers & Creatives",
    description: "Build a stunning portfolio to display your work and win more projects."
  },
  {
    icon: Target,
    title: "Entrepreneurs & Founders",
    description: "Establish credibility and create a professional online presence for your brand."
  },
  {
    icon: Award,
    title: "Executives & Leaders",
    description: "Position yourself as an industry thought leader with a polished digital identity."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "We learn about your goals, brand, and target audience in a 30-minute call.",
    duration: "Day 1"
  },
  {
    number: "02",
    title: "Design Concept",
    description: "We create 2 unique design concepts for your review and feedback.",
    duration: "Days 2-3"
  },
  {
    number: "03",
    title: "Development",
    description: "We build your site with clean code, animations, and all features.",
    duration: "Days 4-6"
  },
  {
    number: "04",
    title: "Review & Launch",
    description: "Final review, revisions, analytics setup, and launch. Your site goes live!",
    duration: "Day 7"
  }
];

const faqs = [
  {
    q: "What's included in the $2,000 package?",
    a: "You get up to 5 custom-designed pages, mobile responsiveness, SEO optimization, contact forms, social media integration, and full source code ownership. Plus $1,150+ worth of free addons: Google Analytics 4, Hotjar, Mixpanel, Google Tag Manager, Search Console, Bing Webmaster Tools, Meta Pixel, and Core Web Vitals optimization. No hidden costs."
  },
  {
    q: "How long does it take to build?",
    a: "Most personal websites are completed within 7 business days from the discovery call. We follow a streamlined process to deliver fast without compromising quality."
  },
  {
    q: "Can I update the website myself after launch?",
    a: "Absolutely! We can integrate a headless CMS (like Sanity or Strapi) so you can update content easily. We also provide training and documentation."
  },
  {
    q: "Do I own the website and code?",
    a: "Yes, 100%. You get full ownership of all code, design files, and assets. It's your website — we just build it for you."
  },
  {
    q: "What if I need more than 5 pages?",
    a: "Additional pages can be added at $150-200 per page. We're flexible and happy to customize the package to your needs."
  },
  {
    q: "Do you handle domain and hosting?",
    a: "Yes! We help you choose and register a domain, set up hosting, and configure everything. Hosting typically costs $5-20/month depending on your needs."
  },
  {
    q: "What technologies do you use?",
    a: "We build with React/Next.js for blazing performance, Tailwind CSS for beautiful design, and deploy on Vercel or AWS for maximum reliability and speed."
  },
  {
    q: "Is there ongoing support after launch?",
    a: "You get 1 month of free support post-launch. After that, we offer affordable monthly maintenance plans starting at $50/month."
  }
];

const portfolioExamples = [
  {
    title: "Executive Portfolio",
    category: "Professional",
    description: "Clean, authoritative design for C-level executives",
    gradient: "from-slate-900 to-blue-900"
  },
  {
    title: "Creative Portfolio",
    category: "Designer",
    description: "Bold, visual-first layout for creative professionals",
    gradient: "from-purple-900 to-pink-800"
  },
  {
    title: "Consultant Website",
    category: "Business",
    description: "Conversion-focused design for service providers",
    gradient: "from-emerald-900 to-teal-800"
  },
  {
    title: "Personal Brand",
    category: "Influencer",
    description: "Engaging, content-rich platform for thought leaders",
    gradient: "from-orange-900 to-red-800"
  }
];

export default function PersonalWebsite() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentWebsite: "",
    profession: "",
    goals: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, email, and phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    trackLeadFormSubmission("personal_website_landing", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      profession: formData.profession,
      has_current_website: !!formData.currentWebsite,
      goals_length: formData.goals?.length || 0
    });

    try {
      const res = await fetch("/api/personal-website-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      toast({
        title: "Request Received! 🎉",
        description: "We'll contact you within 2 hours to schedule your free discovery call.",
        variant: "default"
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        currentWebsite: "",
        profession: "",
        goals: ""
      });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or contact us on WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("get-started-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <SEO
        title="Professional Personal Website — $2,000 | SkyStack"
        titleAr="موقع شخصي احترافي — 2,000 دولار | سكاي ستاك"
        description="Get a stunning, custom-designed personal website for $2,000. Mobile responsive, SEO optimized, blazing fast. Ready in 7 days. $1,150+ in free analytics addons included."
        descriptionAr="احصل على موقع شخصي مذهل ومصمم خصيصاً بـ 2,000 دولار. متجاوب مع الجوال، محسن لمحركات البحث، سريع البرق. جاهز خلال 7 أيام. إضافات تحليلات مجانية بقيمة 1,150+ دولار."
        keywords="personal website, portfolio website, professional website, custom website design, personal branding, website development"
        keywordsAr="موقع شخصي، موقع بورتفوليو، موقع احترافي، تصميم موقع مخصص، علامة تجارية شخصية"
        canonicalUrl="/personal-website"
      />
      <Navigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-conic from-primary/10 via-transparent to-primary/5 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />

          <div className="container-width relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
              >
                <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-sm text-emerald-400 font-medium text-sm mb-6 border border-emerald-500/30">
                  <Sparkles className="w-4 h-4" />
                  Limited Offer — Only $2,000
                </motion.div>

                <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>
                  Your Professional{" "}
                  <span className="gradient-text">Personal Website</span>{" "}
                  in 7 Days
                </motion.h1>

                <motion.p variants={fadeIn} className="text-lg lg:text-xl text-slate-300 mb-4 leading-relaxed max-w-2xl mx-auto">
                  Stand out online with a stunning, custom-designed website that showcases your expertise, attracts clients, and builds your personal brand.
                </motion.p>

                <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400 mb-8">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Custom Design</span>
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Mobile Ready</span>
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> SEO Built-in</span>
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> 7-Day Delivery</span>
                </motion.div>

                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
                  <button onClick={scrollToForm} className="btn-primary-gradient text-lg flex items-center justify-center gap-2 group">
                    Get Started — $2,000
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a href="https://wa.me/966537430455?text=Hi!%20I'm%20interested%20in%20the%20Personal%20Website%20package%20($2,000)" target="_blank" rel="noopener noreferrer">
                    <button className="bg-[#25D366]/20 backdrop-blur-sm text-[#25D366] border border-[#25D366]/30 px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#25D366]/30 transition-all flex items-center justify-center gap-2 w-full">
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp
                    </button>
                  </a>
                </motion.div>

                {/* Price Anchor */}
                <motion.div variants={fadeIn} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-6 max-w-lg mx-auto">
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                      <div className="text-sm text-slate-400 line-through">$5,000+</div>
                      <div className="text-xs text-slate-500">Agency Price</div>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="text-center">
                      <div className="text-3xl font-bold gradient-text">$2,000</div>
                      <div className="text-xs text-emerald-400 font-medium">Your Price — Save 60%</div>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="text-center">
                      <div className="text-sm text-white font-semibold">7 Days</div>
                      <div className="text-xs text-slate-500">Delivery Time</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-primary py-4">
          <div className="container-width">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center text-white">
              {[
                { value: "100+", label: "Websites Delivered" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "7 Days", label: "Average Delivery" },
                { value: "10+", label: "Years Experience" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-xl lg:text-2xl font-bold">{stat.value}</div>
                  <div className="text-blue-100 text-xs lg:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-[300px] h-[300px] bg-blue-100/50 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">What You Get</span>
              <h2 className="section-heading mt-3">Everything You Need for a <span className="gradient-text">Powerful</span> Online Presence</h2>
              <p className="section-subheading mx-auto mt-4">
                A complete, professional personal website — designed, developed, and deployed. No compromises.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packageFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group bg-white p-6 rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="icon-badge mb-5 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included Checklist + CTA */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
          </div>
          <div className="container-width relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="section-eyebrow">Full Package Details</span>
                <h2 className="section-heading mt-3 text-white">
                  All This for <span className="gradient-text">$2,000</span>
                </h2>
                <p className="section-subheading mt-4 text-slate-400">
                  No hidden fees. No surprises. Everything you need to launch your professional online presence.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {whatsIncluded.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-md border border-white/10"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-primary to-blue-700 rounded-md p-10 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-6">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      Best Value
                    </div>
                    <h3 className="text-3xl font-bold mb-2">Personal Website</h3>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-5xl font-bold">$2,000</span>
                      <span className="text-blue-200 line-through text-lg">$5,000</span>
                    </div>
                    <p className="text-blue-100 mb-6 leading-relaxed">
                      One-time payment. No monthly fees. No subscriptions. You own everything.
                    </p>

                    <ul className="space-y-3 mb-8">
                      {[
                        "Up to 5 custom pages",
                        "7-day delivery",
                        "2 design revisions included",
                        "$1,150+ in free analytics addons",
                        "1 month free support",
                        "Full code ownership"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-emerald-300" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button onClick={scrollToForm} className="w-full bg-white text-primary py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                      Claim This Offer <ArrowRight className="w-5 h-5" />
                    </button>

                    <p className="text-center text-sm text-blue-200 mt-4 flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" /> Secure checkout. No payment required now.
                    </p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Free Addons Section */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="section-eyebrow">🎁 Free Bonus</span>
              <h2 className="section-heading mt-3">
                <span className="gradient-text">$1,150+</span> in Free Analytics & Marketing Tools
              </h2>
              <p className="section-subheading mx-auto mt-4">
                Every personal website comes with a complete analytics and marketing stack — set up and configured at no extra cost.
              </p>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200">
                <Sparkles className="w-4 h-4" />
                All included FREE with your $2,000 package
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {freeAddons.map((addon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group bg-white p-6 rounded-md border border-slate-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 relative"
                >
                  <div className="absolute -top-2 -right-2">
                    <span className="inline-flex items-center px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-sm">
                      FREE
                    </span>
                  </div>
                  <div className="w-14 h-14 rounded-md bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:shadow-emerald-200/50 transition-all">
                    <addon.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                    {addon.title}
                  </h4>
                  <div className="text-xs font-semibold text-slate-400 line-through mb-2">
                    Worth {addon.value}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {addon.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button onClick={scrollToForm} className="btn-primary-gradient inline-flex items-center gap-2 group">
                Get Everything for $2,000 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Who Is This For */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">Who Is This For</span>
              <h2 className="section-heading mt-3">Built for <span className="gradient-text">Ambitious</span> Professionals</h2>
              <p className="section-subheading mx-auto mt-4">
                Whether you're a consultant, freelancer, entrepreneur, or executive — this package is designed to elevate your online presence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {perfectFor.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="group text-center p-8 bg-white rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="icon-badge-lg mx-auto mb-6 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Showcase */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">Design Styles</span>
              <h2 className="section-heading mt-3 text-white">Every Design Is <span className="gradient-text">Unique</span></h2>
              <p className="section-subheading mx-auto mt-4 text-slate-400">
                We don't use templates. Every website is custom-designed to match your personality and brand.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolioExamples.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-md border border-white/10 hover:border-primary/40 transition-all duration-300"
                >
                  <div className={`h-48 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                    <Monitor className="w-16 h-16 text-white/20 group-hover:text-white/40 transition-colors" />
                  </div>
                  <div className="p-6 bg-white/5 backdrop-blur-sm">
                    <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">{item.category}</span>
                    <h4 className="text-lg font-bold text-white mt-1 mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">Our Process</span>
              <h2 className="section-heading mt-3">From Idea to Launch in <span className="gradient-text">7 Days</span></h2>
              <p className="section-subheading mx-auto mt-4">
                A proven, streamlined process that delivers results fast without cutting corners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="group relative bg-white p-8 rounded-md border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-xs font-bold text-primary mb-3 tracking-wider">{step.number}</div>
                  <div className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium mb-4">
                    <Clock className="w-3 h-3" /> {step.duration}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{step.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                      <ChevronRight className="w-6 h-6 text-primary/40" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof / Urgency */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-blue-700" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div className="container-width relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium mb-4">
                  <TrendingUp className="w-4 h-4" />
                  Why Wait?
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Your Competitors Already Have a Website. Do You?
                </h3>
                <p className="text-blue-100 text-lg leading-relaxed">
                  93% of people check someone's online presence before doing business. A professional personal website is no longer optional — it's essential.
                </p>
              </div>
              <button onClick={scrollToForm} className="bg-white text-primary px-8 py-4 rounded-md font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all shrink-0 inline-flex items-center gap-2">
                Get My Website <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">Why Choose Us</span>
              <h2 className="section-heading mt-3">SkyStack vs <span className="gradient-text">Other Options</span></h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-md border border-slate-200 max-w-4xl mx-auto">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-4 font-semibold text-slate-900 w-1/3">Feature</th>
                    <th className="text-center p-4 font-semibold text-slate-400">DIY (Wix/WordPress)</th>
                    <th className="text-center p-4 font-semibold text-slate-400">Agency ($5K+)</th>
                    <th className="text-center p-4 font-semibold text-primary bg-primary/5">SkyStack ($2K)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { feature: "Custom Design", diy: false, agency: true, skystack: true },
                    { feature: "Mobile Responsive", diy: true, agency: true, skystack: true },
                    { feature: "SEO Optimization", diy: false, agency: true, skystack: true },
                    { feature: "Fast Performance", diy: false, agency: true, skystack: true },
                    { feature: "Affordable Price", diy: true, agency: false, skystack: true },
                    { feature: "Ready in 7 Days", diy: true, agency: false, skystack: true },
                    { feature: "Free Analytics Suite", diy: false, agency: false, skystack: true },
                    { feature: "Full Code Ownership", diy: false, agency: false, skystack: true },
                    { feature: "Free Post-Launch Support", diy: false, agency: false, skystack: true },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="p-4 text-slate-700 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">
                        {row.diy ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-slate-300">✕</span>}
                      </td>
                      <td className="p-4 text-center">
                        {row.agency ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-slate-300">✕</span>}
                      </td>
                      <td className="p-4 text-center bg-primary/5">
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-1/3 -right-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
          </div>
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">Client Love</span>
              <h2 className="section-heading mt-3 text-white">What Our Clients Say</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "SkyStack delivered my personal website in just 5 days. The design blew me away — it perfectly captures my brand. Plus they set up all my analytics for free!",
                  role: "CEO, Tech Startup",
                  rating: 5
                },
                {
                  quote: "I was spending $200/month on a WordPress site that looked generic. SkyStack built me a custom site for a one-time fee. Best investment I've made.",
                  role: "Management Consultant",
                  rating: 5
                },
                {
                  quote: "The attention to detail is incredible. From animations to mobile experience — everything is polished. My clients are impressed every time.",
                  role: "Independent Advisor",
                  rating: 5
                }
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white/5 backdrop-blur-sm p-8 rounded-md border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="pt-6 border-t border-white/10">
                    <div className="font-bold text-white">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="container-width relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">FAQ</span>
              <h2 className="section-heading mt-3">Got Questions? We've Got <span className="gradient-text">Answers</span></h2>
            </div>

            <div className="max-w-3xl mx-auto grid gap-6">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-6 rounded-md border border-slate-100 hover:shadow-md transition-all"
                >
                  <h4 className="font-bold text-slate-900 mb-3">{faq.q}</h4>
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section id="get-started-form" className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-primary/15 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
          </div>
          <div className="container-width relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-eyebrow">Get Started</span>
                <h2 className="section-heading mt-3 text-white">Ready to Build Your <span className="gradient-text">Personal Website</span>?</h2>
                <p className="section-subheading mx-auto mt-4 text-slate-400">
                  Fill out this quick form and we'll schedule a free discovery call within 2 hours. No pressure, no commitment.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-2xl p-8 lg:p-12 border border-slate-100 relative">
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-blue-400/20 rounded-full blur-2xl" />

                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
                    <Sparkles className="w-4 h-4" />
                    Free Discovery Call — No Payment Required
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                    <Input
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone / WhatsApp *</label>
                    <Input
                      type="tel"
                      placeholder="+966 5XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Current Website (if any)</label>
                    <Input
                      placeholder="https://yoursite.com"
                      value={formData.currentWebsite}
                      onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Profession / Industry</label>
                  <Select value={formData.profession} onValueChange={(value) => setFormData({ ...formData, profession: value })}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your profession" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultant">Consultant / Advisor</SelectItem>
                      <SelectItem value="freelancer">Freelancer / Creative</SelectItem>
                      <SelectItem value="entrepreneur">Entrepreneur / Founder</SelectItem>
                      <SelectItem value="executive">Executive / C-Level</SelectItem>
                      <SelectItem value="professional">Professional (Doctor, Lawyer, etc.)</SelectItem>
                      <SelectItem value="coach">Coach / Trainer</SelectItem>
                      <SelectItem value="influencer">Content Creator / Influencer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-slate-700 mb-2">What do you want your website to achieve?</label>
                  <Textarea
                    placeholder="Tell us about your goals... (e.g., attract clients, showcase portfolio, build personal brand)"
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-gradient w-full text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Get My Free Discovery Call <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                  <p className="text-sm text-slate-500 flex items-center gap-1.5">
                    <Lock className="w-4 h-4" />
                    Your info is 100% secure & private
                  </p>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    We respond within 2 hours
                  </p>
                </div>
              </form>

              {/* WhatsApp Alternative */}
              <div className="mt-8 text-center">
                <p className="text-slate-400 mb-4">Or reach us directly:</p>
                <a
                  href="https://wa.me/966537430455?text=Hi!%20I'm%20interested%20in%20the%20Personal%20Website%20package%20($2,000)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-md font-bold hover:bg-[#20BD5A] transition-all shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-28">
          <div className="container-width">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-md p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -ml-48 -mb-48" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Don't Let a Missing Website Cost You Clients
                </h2>
                <p className="text-lg lg:text-xl text-slate-300 mb-4">
                  Every day without a professional website is a missed opportunity. Get yours for just $2,000.
                </p>
                <p className="text-sm text-slate-400 mb-10">
                  ✓ Custom design &nbsp;&nbsp; ✓ 7-day delivery &nbsp;&nbsp; ✓ Full ownership &nbsp;&nbsp; ✓ $1,150+ free addons
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={scrollToForm} className="bg-primary text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                    Start My Website <ArrowRight className="w-5 h-5" />
                  </button>
                  <a href="https://wa.me/966537430455?text=Hi!%20I'm%20interested%20in%20the%20Personal%20Website%20package%20($2,000)" target="_blank" rel="noopener noreferrer">
                    <button className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 w-full">
                      <Phone className="w-5 h-5" />
                      Talk to Us
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
