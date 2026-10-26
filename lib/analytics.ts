export const ANALYTICS_EVENTS = {
  appointmentSuccess: "appointment-form-success",
  instagramClick: "contact-instagram-click",
  phoneClick: "contact-phone-click",
  whatsappClick: "contact-whatsapp-click",
} as const;

type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

declare global {
  interface Window {
    umami?: {
      track: (eventName: AnalyticsEvent) => void;
    };
  }
}

export function trackAnalyticsEvent(eventName: AnalyticsEvent) {
  window.umami?.track(eventName);
}
