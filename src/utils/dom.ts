import { lock, unlock } from "tua-body-scroll-lock";

export const lockBodyScroll = () => {
  lock();
};

export const unlockBodyScroll = () => {
  unlock();
};

export const revealOnBackScroll = (element: Element) => {
  let scrollPosition = window.scrollY;

  const watchElement = () => {
    if (element.classList.contains("is-scrolling")) {
      return;
    }

    if (scrollPosition < window.scrollY) {
      element.classList.remove("is-visible");
    } else {
      element.classList.add("is-visible");
    }
    scrollPosition = window.scrollY;
  };

  watchElement();
  window.addEventListener("scroll", watchElement);
  window.addEventListener("scrollend", () => {
    element.classList.remove("is-scrolling");
  });
};
