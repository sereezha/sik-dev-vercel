interface Window {
  modalController: {
    show: (id: ModalIds) => void;
    hide: (id: ModalIds) => void;
    destroy: (id: ModalIds) => void;
  };
  gtag: (event: string, action: string, options?: Record<string, any>) => void;
  analyticsManager: AnalyticsManager;
  Alpine: import("alpinejs").Alpine;
}

interface Element {
  inputmask?: Inputmask.Instance;
}
