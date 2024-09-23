import A11yDialog from "a11y-dialog";
import { lock, unlock } from "tua-body-scroll-lock";

export class ModalController {
  private dialogs: Map<string, A11yDialog> = new Map();

  constructor() {
    document.addEventListener(
      "DOMContentLoaded",
      this.initializeDialogs.bind(this),
    );

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  private initializeDialogs() {
    document
      .querySelectorAll("[data-js-modal-container]")
      .forEach((container) => {
        const id = container.id;
        const showOnMount =
          container.getAttribute("data-show-on-mount") === "true";
        const isInStorage = localStorage.getItem(id);
        if (isInStorage) {
          container.remove();
          return;
        }
        if (id) {
          const dialog = new A11yDialog(container as HTMLElement);
          dialog
            .on("show", () => {
              lock();
            })
            .on("hide", () => {
              unlock();
            });
          if (showOnMount) {
            dialog.show();
          }

          this.dialogs.set(id, dialog);
        }
      });
  }

  public show(id: string) {
    const dialog = this.dialogs.get(id);
    if (dialog) {
      dialog.show();
    } else {
      console.warn(`Modal with id "${id}" not found.`);
    }
  }

  public destroy(id: string) {
    const dialog = this.dialogs.get(id);
    if (dialog) {
      dialog.destroy();
    } else {
      console.warn(`Modal with id "${id}" not found.`);
    }
  }

  public hide(id: string) {
    const dialog = this.dialogs.get(id);
    if (dialog) {
      dialog.hide();
    } else {
      console.warn(`Modal with id "${id}" not found.`);
    }
  }
}
