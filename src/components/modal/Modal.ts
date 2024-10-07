import A11yDialog from "a11y-dialog";
import type { ModalIds } from "src/constants/modals";
import { lockBodyScroll, unlockBodyScroll } from "src/utils/dom";
import type { ModalAction } from "./types";

export class ModalController {
  private modals: Map<string, A11yDialog> = new Map();

  constructor() {
    document.addEventListener(
      "DOMContentLoaded",
      this.initializeModals.bind(this),
    );

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  private initializeActions(container: Element) {
    const id = container.id as ModalIds;
    const actionElements = container.querySelectorAll("[data-sh-modal-action]");
    if (actionElements.length === 0) return;

    actionElements.forEach((el) => {
      el.addEventListener("click", () => {
        const action = el.getAttribute(
          "data-sh-modal-action",
        ) as ModalAction | null;
        if (!action) return;

        this.executeMethod(id, action);
      });
    });
  }

  private renderOnMount(container: Element) {
    const id = container.id as ModalIds;

    const showOnMount =
      container.getAttribute("data-sh-modal-show-on-mount") === "true";

    if (showOnMount) {
      this.show(id);
    }
  }

  private removeModalInStorage(container: Element) {
    const id = container.id as ModalIds;
    const isInStorage = localStorage.getItem(id);
    if (isInStorage) {
      container.remove();
      return;
    }
  }

  private initializeModal(container: Element) {
    const id = container.id as ModalIds;
    if (!id) return;

    this.removeModalInStorage(container);
    this.renderOnMount(container);

    const modal = new A11yDialog(container as HTMLElement);

    modal
      .on("show", () => {
        lockBodyScroll();
      })
      .on("hide", () => {
        unlockBodyScroll();
      });

    this.initializeActions(container);

    this.modals.set(id, modal);
  }

  private initializeModals() {
    document
      .querySelectorAll("[data-sh-modal-container]")
      .forEach((container) => this.initializeModal(container));
  }

  private executeMethod(id: ModalIds, action: ModalAction) {
    const modal = this.modals.get(id);
    if (modal) {
      modal[action]();
    } else {
      console.warn(`Modal with id "${id}" not found.`);
    }
  }

  public show(id: ModalIds) {
    this.executeMethod(id, "show");
  }

  public destroy(id: ModalIds) {
    this.executeMethod(id, "destroy");
  }

  public hide(id: ModalIds) {
    this.executeMethod(id, "hide");
  }
}
