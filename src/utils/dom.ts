import { lock, unlock } from "tua-body-scroll-lock";

export const lockBodyScroll = () => {
  lock();
};

export const unlockBodyScroll = () => {
  unlock();
};
