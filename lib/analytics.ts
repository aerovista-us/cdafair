type EventValue = string | number | boolean;
type EventData = Record<string, EventValue>;
type QueuedEvent = { eventName: string; eventData?: EventData };
type UmamiTracker = {
  track: (eventName: string, eventData?: EventData) => void;
};

declare global {
  interface Window {
    umami?: UmamiTracker;
    __cdafairAnalyticsQueue?: QueuedEvent[];
  }
}

export function trackEvent(eventName: string, eventData?: EventData) {
  if (typeof window === "undefined") return;
  try {
    if (window.umami) {
      window.umami.track(eventName, eventData);
      return;
    }
    window.__cdafairAnalyticsQueue ||= [];
    window.__cdafairAnalyticsQueue.push({ eventName, eventData });
  } catch {
    // Analytics must never interrupt the fair guide experience.
  }
}

export function flushQueuedEvents() {
  if (typeof window === "undefined" || !window.umami) return;
  const queue = window.__cdafairAnalyticsQueue || [];
  window.__cdafairAnalyticsQueue = [];
  for (const event of queue) {
    try {
      window.umami.track(event.eventName, event.eventData);
    } catch {
      // Keep analytics isolated from the app experience.
    }
  }
}
