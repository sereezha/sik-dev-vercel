import type { AnalyticsAdapter } from "./types";

export class Analytics {
  private analytics: AnalyticsAdapter;

  constructor(adapter: AnalyticsAdapter) {
    this.analytics = adapter;
  }

  initialize() {
    if (!this.analytics.initialize) {
      throw new Error('"initialize" method is not implemented');
    }

    this.analytics.initialize();
  }

  track(event: string, options?: Record<string, string | number | string[]>) {
    if (!this.analytics.track) {
      throw new Error('"track" method is not implemented');
    }

    this.analytics.track(event, options);
  }

  trackDynamic(event: string, value: string | number) {
    if (!this.analytics.trackDynamic) {
      throw new Error('"trackDynamic" method is not implemented');
    }

    this.analytics.trackDynamic(event, value);
  }
}
