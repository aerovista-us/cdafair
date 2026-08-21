type EventValue = string | number | boolean;
type EventData = Record<string, EventValue>;
type UmamiTracker = {
  track: (eventName: string, eventData?: EventData) => void;
};

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
}

export function trackEvent(eventName: string, eventData?: EventData) {
  if (typeof window === "undefined") return;
  try {
    window.umami?.track(eventName, eventData);
  } catch {
    // Analytics must never interrupt the fair guide experience.
  }
}
