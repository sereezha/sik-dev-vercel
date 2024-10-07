import { lock, unlock } from "tua-body-scroll-lock";

export const lockBodyScroll = () => {
  lock();
};

export const unlockBodyScroll = () => {
  unlock();
};

export const revealOnBackScroll = (options?: {
  shouldAttachScrollEndListener: boolean;
}) => {
  const elements = document.querySelectorAll("[data-sh-reveal-on-back-scroll]");

  if (elements.length <= 0) return;

  let scrollPosition = window.scrollY;

  const watchElements = () => {
    elements.forEach((element) => {
      if (element.classList.contains("is-scrolling")) {
        return;
      }

      if (scrollPosition < window.scrollY) {
        element.classList.remove("is-visible");
      } else {
        element.classList.add("is-visible");
      }
    });

    scrollPosition = window.scrollY;
  };

  watchElements();
  window.addEventListener("scroll", watchElements);

  if (options?.shouldAttachScrollEndListener) {
    window.addEventListener("scrollend", () => {
      elements.forEach((element) => {
        element.classList.remove("is-scrolling");
      });
    });
  }
};
