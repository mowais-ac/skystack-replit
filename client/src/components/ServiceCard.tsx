import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: any;
  slug: string;
  baseUrl: string;
}

export function ServiceCard({ title, description, icon: Icon, slug, baseUrl }: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
      
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <Icon className="w-7 h-7" />
      </div>
      
      <h3 className="text-xl font-bold mb-3 font-display text-slate-900 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-slate-500 mb-6 leading-relaxed line-clamp-3">{description}</p>
      
      <Link href={`${baseUrl}/${slug}`}>
        <span className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all cursor-pointer">
          Learn More <ArrowRight className="w-4 h-4 ml-1" />
        </span>
      </Link>
    </div>
  );
}
