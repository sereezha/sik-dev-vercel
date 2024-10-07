import A11yDialog from "a11y-dialog";
import { lockBodyScroll, unlockBodyScroll } from "src/utils/dom";

export class ModalController {
  private modals: Map<string, A11yDialog> = new Map();

  constructor() {
    document.addEventListener(
      "DOMContentLoaded",
      this.initializeModals.bind(this),
    );

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  private initializeModals() {
    document
      .querySelectorAll("[data-js-modal-container]")
      .forEach((container) => {
        const { id } = container;
        const showOnMount =
          container.getAttribute("data-js-show-on-mount") === "true";
        const isInStorage = localStorage.getItem(id);

        if (isInStorage) {
          container.remove();
          return;
        }

        if (id) {
          if (showOnMount) {
            this.show(id);
          }

          const modal = new A11yDialog(container as HTMLElement);

          modal
            .on("show", () => {
              lockBodyScroll();
            })
            .on("hide", () => {
              unlockBodyScroll();
            });

          const hideElements = container.querySelectorAll(
            "[data-js-modal-action-hide]",
          );

          if (hideElements.length > 0) {
            hideElements.forEach((hideElement) => {
              hideElement.addEventListener("click", () => {
                this.hide(id);
              });
            });
          }

          this.modals.set(id, modal);
        }
      });
  }

  public show(id: string) {
    const modal = this.modals.get(id);
    if (modal) {
      modal.show();
    } else {
      console.warn(`Modal with id "${id}" not found.`);
    }
  }

  public destroy(id: string) {
    const modal = this.modals.get(id);
    if (modal) {
      modal.destroy();
    } else {
      console.warn(`Modal with id "${id}" not found.`);
    }
  }

  public hide(id: string) {
    const modal = this.modals.get(id);
    if (modal) {
      modal.hide();
    } else {
      console.warn(`Modal with id "${id}" not found.`);
    }
  }
}
