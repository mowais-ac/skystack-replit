declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  eventParams: Record<string, any> = {}
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
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
}
