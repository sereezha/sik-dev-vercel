/// <reference path="../.astro/types.d.ts" />

export {};

declare global {
  interface Window {
    modalController: {
      show: (id: string) => void;
      hide: (id: string) => void;
    };
  }
}
