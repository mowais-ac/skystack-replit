import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Code, Layers, Users, Zap } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { services, businessModels } from "@/lib/data";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-slate-50 -z-10">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          </div>

          <div className="container-width">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.div variants={fadeIn} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
                🚀 Leading Digital Transformation Agency
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 font-display">
                Building the Future of <span className="text-primary relative inline-block">
                  Digital Business
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </motion.h1>
              <motion.p variants={fadeIn} className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                We craft high-performance websites, mobile apps, and enterprise software solutions that drive growth and innovation.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact-us">
                  <button className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4">
                    Get Started <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/services">
                  <button className="btn-secondary text-lg px-8 py-4">
                    Explore Services
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-white">
          <div className="container-width">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-display">Our Core Expertise</h2>
              <p className="text-slate-600 text-lg">Comprehensive digital solutions tailored to scale your business.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <ServiceCard 
                  key={index}
                  {...service}
                  baseUrl="/services"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Us / Stats */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="container-width relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-display">Why Industry Leaders Choose Us</h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  We don't just write code; we solve business problems. Our agile approach ensures rapid delivery without compromising on quality or security.
                </p>
                <ul className="space-y-4">
                  {[
                    "Enterprise-grade security standards",
                    "Agile development methodology",
                    "24/7 Support & Maintenance",
                    "Dedicated project managers"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg font-medium">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs">✓</div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Projects Delivered", value: "500+", icon: Layers },
                  { label: "Happy Clients", value: "200+", icon: Users },
                  { label: "Team Experts", value: "50+", icon: Code },
                  { label: "Years Experience", value: "10+", icon: Zap },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors">
                    <stat.icon className="w-8 h-8 text-primary mb-4" />
                    <div className="text-4xl font-bold mb-2 font-display">{stat.value}</div>
                    <div className="text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pre-Built Apps Teaser */}
        <section className="py-24 bg-slate-50">
          <div className="container-width">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-primary font-bold tracking-wider uppercase text-sm">Ready-to-Launch Solutions</span>
                <h2 className="text-3xl lg:text-4xl font-bold mt-2 font-display">Pre-Built Business Models</h2>
                <p className="text-slate-600 text-lg mt-4">Accelerate your time to market with our white-label app solutions.</p>
              </div>
              <Link href="/pre-built-apps">
                <button className="text-primary font-bold hover:gap-3 flex items-center gap-2 transition-all">
                  View All Solutions <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {businessModels.map((model, index) => (
                <ServiceCard 
                  key={index}
                  {...model}
                  baseUrl="/business-models"
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24">
          <div className="container-width">
            <div className="bg-primary rounded-3xl p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-display">Ready to Start Your Project?</h2>
                <p className="text-xl text-blue-100 mb-10">
                  Let's discuss how we can help transform your business with our custom digital solutions.
                </p>
                <Link href="/contact-us">
                  <button className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 hover:scale-105 transition-all shadow-lg">
                    Schedule a Consultation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
