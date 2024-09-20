/// <reference path="../.astro/types.d.ts" />

interface Window {
  modalController: {
    show: (id: string) => void;
    hide: (id: string) => void;
  };
}
