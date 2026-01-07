import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface StaticContentProps {
  type: "about" | "privacy" | "terms";
}

export default function StaticContent({ type }: StaticContentProps) {
  const content = {
    about: {
      title: "About Us",
      subtitle: "Innovating for a Digital World",
      text: (
        <>
          <p className="mb-6">Founded in 2020, we are a team of passionate developers, designers, and strategists dedicated to pushing the boundaries of what's possible on the web. Our mission is to empower businesses with technology that is not just functional, but transformative.</p>
          <p className="mb-6">We believe in a user-first approach, ensuring that every pixel serves a purpose and every line of code adds value. From startups to Fortune 500 companies, we've partnered with visionary leaders to build products that scale.</p>
          <h3 className="text-2xl font-bold font-display mt-8 mb-4">Our Values</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Excellence:</strong> We never settle for "good enough".</li>
            <li><strong>Transparency:</strong> Open communication is key to our process.</li>
            <li><strong>Innovation:</strong> We stay ahead of the curve so you don't have to.</li>
          </ul>
        </>
      )
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "Last Updated: October 2023",
      text: (
        <>
          <p className="mb-6">Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.</p>
          <h3 className="text-xl font-bold mt-6 mb-3">1. Information We Collect</h3>
          <p className="mb-4">We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
          <h3 className="text-xl font-bold mt-6 mb-3">2. How We Use Information</h3>
          <p className="mb-4">We use your information to provide, operate, and maintain our website, improve, personalize, and expand our website, and understand and analyze how you use our website.</p>
        </>
      )
    },
    terms: {
      title: "Terms & Conditions",
      subtitle: "Last Updated: October 2023",
      text: (
        <>
          <p className="mb-6">By accessing this website, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          <h3 className="text-xl font-bold mt-6 mb-3">1. License</h3>
          <p className="mb-4">Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.</p>
          <h3 className="text-xl font-bold mt-6 mb-3">2. Disclaimer</h3>
          <p className="mb-4">The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability.</p>
        </>
      )
    }
  };

  const data = content[type];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container-width max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold font-display mb-4">{data.title}</h1>
          <p className="text-slate-500 mb-12 text-lg">{data.subtitle}</p>
          
          <div className="prose prose-lg prose-slate max-w-none">
            {data.text}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
