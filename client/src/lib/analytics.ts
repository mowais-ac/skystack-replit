import mixpanel from "mixpanel-browser";
import Hotjar from '@hotjar/browser';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

let mixpanelInitialized = false;
let hotjarInitialized = false;

export function initMixpanel() {
  if (typeof window !== "undefined" && !mixpanelInitialized) {
    const token = import.meta.env.VITE_MIXPANEL_TOKEN || "3d26152cded591c01548d25048e43792";
    mixpanel.init(token, {
      autocapture: true,
      record_sessions_percent: 100,
    });
    mixpanelInitialized = true;
  }
}

export function initHotjar() {
  if (typeof window !== "undefined" && !hotjarInitialized) {
    const siteId = 6629450;
    const version = 6;
    
    try {
      Hotjar.init(siteId, version);
      hotjarInitialized = true;
    } catch (error) {
      console.warn("Failed to initialize Hotjar:", error);
    }
  }
}

function getPageInfo() {
  if (typeof window === "undefined") {
    return {};
  }
  
  return {
    page_url: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
    page_referrer: document.referrer || "direct",
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    user_agent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export function trackEvent(
  eventName: string,
  eventParams: Record<string, any> = {}
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
}

export function trackMixpanelEvent(
  eventName: string,
  eventParams: Record<string, any> = {}
) {
  if (typeof window !== "undefined" && mixpanelInitialized) {
    const fullParams = {
      ...eventParams,
      ...getPageInfo(),
    };
    mixpanel.track(eventName, fullParams);
  }
}

export function trackLeadFormSubmission(
  formName: string,
  formData: Record<string, any>
) {
  const sanitizedData: Record<string, any> = {};
  
  Object.entries(formData).forEach(([key, value]) => {
    if (typeof value === "string") {
      sanitizedData[key] = value.slice(0, 100);
    } else if (Array.isArray(value)) {
      sanitizedData[key] = JSON.stringify(value).slice(0, 200);
    } else if (typeof value === "object" && value !== null) {
      sanitizedData[key] = JSON.stringify(value).slice(0, 200);
    } else {
      sanitizedData[key] = value;
    }
  });

  trackEvent("generate_lead", {
    form_name: formName,
    ...sanitizedData
  });

  trackEvent(`form_submit_${formName}`, sanitizedData);

  const mixpanelData = {
    form_name: formName,
    ...formData,
  };

  trackMixpanelEvent("Lead Form Submitted", mixpanelData);
  trackMixpanelEvent(`Form: ${formName}`, formData);
}

export function identifyUser(userId: string, traits: Record<string, any> = {}) {
  if (typeof window !== "undefined" && mixpanelInitialized) {
    mixpanel.identify(userId);
    mixpanel.people.set(traits);
  }
}

export function trackPageView(pageName?: string, pagePath?: string) {
  if (typeof window === "undefined") return;

  // Get page info - use provided values or fallback to current page info
  const pageTitle = pageName || document.title || "SkyStack";
  const path = pagePath || window.location.pathname || "/";
  const fullUrl = window.location.href;

  // Track in Google Analytics
  // Use gtag('config') to update page_path and page_title for proper tracking
  if (window.gtag && typeof window.gtag === "function") {
    try {
      window.gtag("config", "G-95H3KK9GL4", {
        page_path: path,
        page_title: pageTitle,
        page_location: fullUrl,
      });
    } catch (error) {
      console.warn("Failed to track page view in Google Analytics:", error);
    }
  }

  // Track in Mixpanel
  if (mixpanelInitialized) {
    trackMixpanelEvent("Page Viewed", {
      page_name: pageTitle,
      page_path: path,
    });
  }
}
