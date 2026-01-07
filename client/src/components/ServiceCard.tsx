import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface ServiceCardProps {
  title: string;
  subtitle?: string;
  description: string;
  icon: any;
  slug: string;
  baseUrl: string;
}

export function ServiceCard({ title, subtitle, description, icon: Icon, slug, baseUrl }: ServiceCardProps) {
  const { language } = useLanguage();
  
  return (
    <div className="group bg-white rounded-md p-8 border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110" />
      
      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <Icon className="w-6 h-6" />
      </div>
      
      <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-primary transition-colors" data-testid={`text-card-title-${slug}`}>
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm text-primary font-medium mb-3">{subtitle}</p>
      )}
      <p className="text-slate-500 mb-6 leading-relaxed line-clamp-3 text-sm">{description}</p>
      
      <Link href={`${baseUrl}/${slug}`}>
        <span className="inline-flex items-center text-primary font-semibold text-sm hover:gap-2 transition-all cursor-pointer">
          {language === "ar" ? "اقرأ المزيد" : "Learn More"} 
          <ArrowRight className={`w-4 h-4 ${language === "ar" ? "mr-1 rotate-180" : "ml-1"}`} />
        </span>
      </Link>
    </div>
  );
}
