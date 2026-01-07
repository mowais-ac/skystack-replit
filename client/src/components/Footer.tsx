import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { useLanguage } from "@/lib/i18n";
import { services } from "@/lib/data";
import logo from "@assets/logo_1767806484099.png";

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-8">
      <div className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/">
              <img src={logo} alt="SkyStack" className="h-10 w-auto brightness-0 invert" data-testid="img-footer-logo" />
            </Link>
            <p className="text-slate-400 leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: SiInstagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a 
                  key={label} 
                  href={href} 
                  className="w-10 h-10 rounded-md bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  aria-label={label}
                  data-testid={`link-social-${label.toLowerCase()}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-6">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              <li><Link href="/about-us" className="hover:text-primary transition-colors" data-testid="link-footer-about">{t("nav.about")}</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors" data-testid="link-footer-services">{t("nav.services")}</Link></li>
              <li><Link href="/pre-built-apps" className="hover:text-primary transition-colors" data-testid="link-footer-prebuilt">{t("nav.preBuiltApps")}</Link></li>
              <li><Link href="/business-models" className="hover:text-primary transition-colors" data-testid="link-footer-business">{t("nav.businessModels")}</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors" data-testid="link-footer-pricing">{t("nav.pricing")}</Link></li>
              <li><Link href="/outsourcing" className="hover:text-primary transition-colors" data-testid="link-footer-outsourcing">{language === "ar" ? "التعهيد" : "Outsourcing"}</Link></li>
              <li><Link href="/contact-us" className="hover:text-primary transition-colors" data-testid="link-footer-contact">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-6">{t("footer.services")}</h4>
            <ul className="space-y-3">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link 
                    href={`/services/${service.slug}`} 
                    className="hover:text-primary transition-colors"
                    data-testid={`link-footer-service-${service.slug}`}
                  >
                    {language === "ar" ? service.titleAr : service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-6">{t("footer.contact")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>{t("contact.location")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span dir="ltr">+966 537 430 455</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@skystack.sa</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <h5 className="text-white font-semibold mb-3">{t("footer.legal")}</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy-policy" className="hover:text-primary transition-colors" data-testid="link-footer-privacy">{t("footer.privacy")}</Link></li>
                <li><Link href="/terms-condition" className="hover:text-primary transition-colors" data-testid="link-footer-terms">{t("footer.terms")}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} SkyStack. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
