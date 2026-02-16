import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/lib/i18n";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { initMixpanel, initHotjar, trackPageView } from "@/lib/analytics";

initMixpanel();
initHotjar();

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    
    // Track page view after a small delay to ensure page title is updated
    // This is important for SPAs where the title might be set asynchronously
    const timeoutId = setTimeout(() => {
      const pageTitle = document.title || "SkyStack";
      trackPageView(pageTitle, location);
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [location]);
  
  return null;
}

import Home from "@/pages/Home";
import ServicesList from "@/pages/ServicesList";
import DynamicPage from "@/pages/DynamicPage";
import ContactUs from "@/pages/ContactUs";
import Pricing from "@/pages/Pricing";
import StaticContent from "@/pages/StaticContent";
import BusinessModels from "@/pages/BusinessModels";
import Outsourcing from "@/pages/Outsourcing";
import EmailTemplates from "@/pages/EmailTemplates";
import PersonalWebsite from "@/pages/PersonalWebsite";
import BlogList from "@/pages/BlogList";
import BlogDetail from "@/pages/BlogDetail";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      <Route path="/services">
        <ServicesList type="service" />
      </Route>
      <Route path="/services/outsourcing" component={Outsourcing} />
      <Route path="/services/personal-website" component={PersonalWebsite} />
      <Route path="/services/:slug">
        <DynamicPage type="service" />
      </Route>

      <Route path="/pre-built-apps">
        <ServicesList type="businessModel" />
      </Route>
      <Route path="/business-models" component={BusinessModels} />
      <Route path="/business-models/:slug">
        <DynamicPage type="businessModel" />
      </Route>

      <Route path="/contact-us" component={ContactUs} />
      <Route path="/pricing" component={Pricing} />
      
      <Route path="/about-us">
        <StaticContent type="about" />
      </Route>
      <Route path="/privacy-policy">
        <StaticContent type="privacy" />
      </Route>
      <Route path="/terms-condition">
        <StaticContent type="terms" />
      </Route>
      
      <Route path="/email-templates" component={EmailTemplates} />
      
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogDetail} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ScrollToTop />
            <Router />
            <WhatsAppButton />
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
