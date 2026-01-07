import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { services, businessModels } from "@/lib/data";
import logo from "@assets/logo_1767806484099.png";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container-width flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <img src={logo} alt="Company Logo" className="h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-slate-700">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/about-us" className="hover:text-primary transition-colors">About</Link>
          
          {/* Services Dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-primary transition-colors py-2">
              Services <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 w-64">
              <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 overflow-hidden">
                <Link href="/services" className="block px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-primary font-bold">All Services</Link>
                <div className="h-px bg-slate-100 my-1"></div>
                {services.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="block px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-primary text-sm truncate">
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Solutions Dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-primary transition-colors py-2">
              Solutions <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 w-64">
              <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 overflow-hidden">
                <Link href="/pre-built-apps" className="block px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-primary font-bold">Pre-Built Apps</Link>
                <div className="h-px bg-slate-100 my-1"></div>
                {businessModels.map((m) => (
                  <Link key={m.slug} href={`/business-models/${m.slug}`} className="block px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-primary text-sm truncate">
                    {m.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link href="/contact-us">
            <button className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 font-semibold flex items-center gap-2">
              <Phone className="w-4 h-4" /> Get a Quote
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 bg-white z-40 lg:hidden overflow-y-auto"
          >
            <div className="p-6 flex flex-col gap-6 text-lg font-medium">
              <Link href="/" className="border-b border-slate-100 pb-4">Home</Link>
              <Link href="/about-us" className="border-b border-slate-100 pb-4">About Us</Link>
              
              <div className="space-y-3 border-b border-slate-100 pb-4">
                <div className="text-slate-400 text-sm uppercase tracking-wider font-bold">Services</div>
                {services.map(s => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="block pl-2 text-base text-slate-600">
                    {s.title}
                  </Link>
                ))}
              </div>

              <div className="space-y-3 border-b border-slate-100 pb-4">
                <div className="text-slate-400 text-sm uppercase tracking-wider font-bold">Solutions</div>
                {businessModels.map(m => (
                  <Link key={m.slug} href={`/business-models/${m.slug}`} className="block pl-2 text-base text-slate-600">
                    {m.title}
                  </Link>
                ))}
              </div>

              <Link href="/pricing" className="border-b border-slate-100 pb-4">Pricing</Link>
              
              <Link href="/contact-us" className="bg-primary text-white text-center py-4 rounded-xl font-bold mt-4">
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
