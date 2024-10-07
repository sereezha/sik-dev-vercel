export interface AnalyticsAdapter {
  initialize: () => void;
  track: (event: string, options?: Record<string, any>) => void;
  trackDynamic: (event: string, value: string | number) => void;
  trackPageView: (page: string) => void;
}
