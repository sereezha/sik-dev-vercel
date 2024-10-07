import { gtmAnalytics } from "./adapters/gtm";
import { Analytics } from "./analytics";

class AnalyticsManager {
  private analytics: Analytics[];

  constructor() {
    this.analytics = [gtmAnalytics];
  }

  initialize() {
    this.analytics.forEach((analytics) => analytics.initialize());
  }

  track(event: string, options?: Record<string, any>) {
    this.analytics.forEach((analytics) => analytics.track(event, options));
  }

  trackDynamic(event: string, value: string | number) {
    this.analytics.forEach((analytics) => analytics.trackDynamic(event, value));
  }
}

export default AnalyticsManager;
