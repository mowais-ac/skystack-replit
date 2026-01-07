import { useRoute } from "wouter";
import { services, businessModels } from "@/lib/data";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import NotFound from "./not-found";
import { ArrowRight, Check, Database, Layout, Server, Shield } from "lucide-react";
import { Link } from "wouter";

interface DynamicPageProps {
  type: "service" | "businessModel";
}

export default function DynamicPage({ type }: DynamicPageProps) {
  const [match, params] = useRoute(type === "service" ? "/services/:slug" : "/business-models/:slug");
  
  if (!match || !params) return <NotFound />;

  const collection = type === "service" ? services : businessModels;
  const item = collection.find(i => i.slug === params.slug);

  if (!item) return <NotFound />;

  const Icon = item.icon;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-slate-900 text-white pt-40 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent"></div>
          
          <div className="container-width relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-sm font-semibold mb-6 border border-primary/30">
                <Icon className="w-4 h-4" />
                {type === "service" ? "Service" : "Solution"}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold font-display mb-6">{item.title}</h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">{item.description}</p>
            </div>
          </div>
        </section>

        {/* Problem/Solution */}
        <section className="py-24">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="bg-red-50 p-10 rounded-3xl border border-red-100">
                <h3 className="text-2xl font-bold font-display text-red-900 mb-4">The Challenge</h3>
                <p className="text-lg text-slate-700 leading-relaxed">{item.problem}</p>
              </div>
              <div className="bg-green-50 p-10 rounded-3xl border border-green-100">
                <h3 className="text-2xl font-bold font-display text-green-900 mb-4">Our Solution</h3>
                <p className="text-lg text-slate-700 leading-relaxed">{item.solution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Tech */}
        <section className="py-24 bg-slate-50">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Features List */}
              <div>
                <h2 className="text-3xl font-bold font-display mb-8">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {item.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h2 className="text-3xl font-bold font-display mb-8">Technology Stack</h2>
                <div className="flex flex-wrap gap-3">
                  {item.techStack.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-semibold shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-10 bg-white p-6 rounded-2xl border border-slate-100 shadow-lg">
                  <h4 className="font-bold mb-4">Development Process</h4>
                  <div className="space-y-4">
                    {[
                      { step: "01", text: "Requirements Analysis" },
                      { step: "02", text: "Design & Prototyping" },
                      { step: "03", text: "Agile Development" },
                      { step: "04", text: "QA & Deployment" },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="font-display font-bold text-2xl text-slate-200">{s.step}</div>
                        <div className="h-px bg-slate-100 flex-grow"></div>
                        <div className="font-medium text-slate-900">{s.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container-width text-center">
            <h2 className="text-3xl font-bold font-display mb-6">Ready to build your {item.title}?</h2>
            <Link href="/contact-us">
              <button className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2">
                Get a Quote Now <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
