import mixpanel from "mixpanel-browser";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

let mixpanelInitialized = false;

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

export function trackPageView(pageName?: string) {
  if (typeof window !== "undefined" && mixpanelInitialized) {
    trackMixpanelEvent("Page Viewed", {
      page_name: pageName || document.title,
    });
  }
}
