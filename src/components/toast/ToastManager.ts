interface ToastOptions {
  duration?: number;
  type?: "info" | "success" | "warning" | "error";
  content?: string;
  shouldUseOnlyContent?: boolean;
}

class Toast {
  private element: HTMLElement;
  public readonly id: string;

  constructor(message: string, options: ToastOptions) {
    this.id = `toast-${Date.now()}`;
    this.element = this.createToastElement(message, options);
    this.show();
  }

  private createToastElement(
    message: string,
    options: ToastOptions,
  ): HTMLElement {
    const { type = "info", content, shouldUseOnlyContent } = options;
    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.id = this.id;
    const html = shouldUseOnlyContent
      ? content
      : `<p>${message}</p>${content ?? ""}`;

    toast.innerHTML = html ?? "";

    toast
      .querySelector(".toast-close")
      ?.addEventListener("click", () => this.remove());
    return toast;
  }

  show(): void {
    document.getElementById("toast-container")?.appendChild(this.element);
    setTimeout(() => this.element.classList.add("is-visible"), 10);
  }

  remove(): void {
    this.element.classList.remove("is-visible");
    setTimeout(() => this.element.remove(), 300);
  }
}

export class ToastManager {
  private container: HTMLElement | undefined;
  private toasts: Map<string, Toast> = new Map();

  constructor() {
    this.ensureContainer();
  }

  private ensureContainer(): void {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }
    this.container = container;
  }

  show(message: string, options: ToastOptions = {}): string {
    const { duration = 3000 } = options;
    const toast = new Toast(message, options);
    this.toasts.set(toast.id, toast);

    if (duration > 0) {
      setTimeout(() => this.hide(toast.id), duration);
    }

    return toast.id;
  }

  showError(message: string, options: ToastOptions = {}): string {
    const { duration = 3000 } = options;
    const toast = new Toast(message, { ...options, type: "error" });
    this.toasts.set(toast.id, toast);

    if (duration > 0) {
      setTimeout(() => this.hide(toast.id), duration);
    }

    return toast.id;
  }

  hide(id: string): void {
    const toast = this.toasts.get(id);
    if (toast) {
      toast.remove();
      this.toasts.delete(id);
    }
  }
}

// Create and export a singleton instance
export const toastManager = new ToastManager();
