import { services, businessModels } from "@/lib/data";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { Link } from "wouter";

interface ServicesListProps {
  type: "service" | "businessModel";
}

export default function ServicesList({ type }: ServicesListProps) {
  const isService = type === "service";
  const items = isService ? services : businessModels;
  const title = isService ? "Our Services" : "Pre-Built Applications";
  const subtitle = isService 
    ? "Comprehensive digital solutions for modern businesses" 
    : "Launch faster with our white-label solution blueprints";

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-32">
        <div className="container-width mb-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold font-display mb-6">{title}</h1>
            <p className="text-xl text-slate-600">{subtitle}</p>
          </div>
        </div>

        <section className="bg-slate-50 py-20">
          <div className="container-width">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, index) => (
                <ServiceCard 
                  key={index}
                  {...item}
                  baseUrl={isService ? "/services" : "/business-models"}
                />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-white text-center">
          <div className="container-width">
            <h2 className="text-3xl font-bold font-display mb-6">Don't see what you need?</h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              We specialize in custom software development. Contact us to discuss your unique requirements.
            </p>
            <Link href="/contact-us">
              <button className="btn-primary">Contact Our Team</button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
