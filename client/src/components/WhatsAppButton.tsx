import { SiWhatsapp } from "react-icons/si";
import { useLanguage } from "@/lib/i18n";

const WHATSAPP_NUMBER = "966537430455";

export function WhatsAppButton() {
  const { language } = useLanguage();
  
  const message = language === "ar" 
    ? "مرحباً، أود الاستفسار عن خدماتكم"
    : "Hello, I would like to inquire about your services";
  
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      data-testid="button-whatsapp"
      aria-label={language === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
    >
      <SiWhatsapp className="w-7 h-7 text-white" />
      <span className="absolute right-full mr-3 bg-slate-900 text-white px-3 py-2 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {language === "ar" ? "تواصل معنا" : "Chat with us"}
      </span>
    </a>
  );
}
