interface Window {
  modalController: {
    show: (id: string) => void;
    hide: (id: string) => void;
    destroy: (id: string) => void;
  };
  gtag: (event: string, action: string, options?: Record<string, any>) => void;
  analyticsManager: AnalyticsManager;
  Alpine: import("alpinejs").Alpine;
}

interface Element {
  inputmask?: Inputmask.Instance;
}
