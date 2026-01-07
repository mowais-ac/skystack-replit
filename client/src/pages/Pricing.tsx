import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Check, X } from "lucide-react";
import { Link } from "wouter";

const plans = [
  {
    name: "Startup",
    price: "Custom",
    description: "Perfect for MVPs and early-stage products.",
    features: [
      "Custom Design System",
      "Mobile-Responsive Layout",
      "Basic SEO Optimization",
      "CMS Integration",
      "2 Weeks Post-Launch Support",
    ],
    missing: ["Advanced Analytics", "Custom API Integrations", "SLA Guarantee"],
    popular: false
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Scalable solutions for high-growth businesses.",
    features: [
      "Advanced UX/UI Research",
      "Custom Backend Architecture",
      "Third-party API Integrations",
      "Automated CI/CD Pipelines",
      "Advanced Security Audits",
      "3 Months Post-Launch Support"
    ],
    missing: [],
    popular: true
  },
  {
    name: "Dedicated Team",
    price: "Retainer",
    description: "Your own full-stack team on a monthly basis.",
    features: [
      "Full-time Senior Developers",
      "Dedicated Project Manager",
      "Daily Standups",
      "Flexible Roadmap",
      "Direct Slack Access",
      "Priority SLA Support"
    ],
    missing: [],
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container-width text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold font-display mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Every project is unique. We offer flexible engagement models to match your specific needs and budget.
          </p>
        </div>

        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative bg-white rounded-2xl p-8 border ${
                  plan.popular ? "border-primary shadow-2xl scale-105 z-10" : "border-slate-200 shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-2xl font-bold font-display mb-2">{plan.name}</h3>
                <p className="text-slate-500 mb-6 min-h-[50px]">{plan.description}</p>
                <div className="text-3xl font-bold text-slate-900 mb-8">{plan.price}</div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-600">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-slate-700 text-sm">{feat}</span>
                    </li>
                  ))}
                  {plan.missing.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3 opacity-50">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                        <X className="w-3 h-3" />
                      </div>
                      <span className="text-slate-500 text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/contact-us">
                  <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                    plan.popular ? "btn-primary" : "btn-secondary bg-slate-50"
                  }`}>
                    Get Started
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
