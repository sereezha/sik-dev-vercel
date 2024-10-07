import type { AnalyticsAdapter } from '../types';
import { Analytics } from '../analytics';

class GTMAnalytics implements AnalyticsAdapter {
  private isInitialized = false;

  initialize() {
    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;
  }

  track(event: string, options?: Record<string, string | number>) {
    window.gtag?.('event', event, options);
  }

  trackDynamic(event: string, value: string | number) {
    window.gtag?.('event', event, { [event]: value });
  }

  trackPageView(page: string) {
    window.gtag?.('event', 'pageview', { page });
  }
}

export const gtmAnalytics = new Analytics(new GTMAnalytics());
