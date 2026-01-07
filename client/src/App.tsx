import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";

import Home from "@/pages/Home";
import ServicesList from "@/pages/ServicesList";
import DynamicPage from "@/pages/DynamicPage";
import ContactUs from "@/pages/ContactUs";
import Pricing from "@/pages/Pricing";
import StaticContent from "@/pages/StaticContent";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Services Routes */}
      <Route path="/services">
        <ServicesList type="service" />
      </Route>
      <Route path="/services/:slug">
        <DynamicPage type="service" />
      </Route>

      {/* Pre-Built Apps Routes */}
      <Route path="/pre-built-apps">
        <ServicesList type="businessModel" />
      </Route>
      <Route path="/business-models/:slug">
        <DynamicPage type="businessModel" />
      </Route>

      {/* Other Pages */}
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/pricing" component={Pricing} />
      
      {/* Static Pages */}
      <Route path="/about-us">
        <StaticContent type="about" />
      </Route>
      <Route path="/privacy-policy">
        <StaticContent type="privacy" />
      </Route>
      <Route path="/terms-condition">
        <StaticContent type="terms" />
      </Route>

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
