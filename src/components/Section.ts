type RendererFunction<T> = (item: T) => void;

export class Section<T> {
  private renderedItems: T[];
  private renderer: RendererFunction<T>;
  private container: HTMLElement;

  constructor(
    { items, renderer }: { items: T[]; renderer: RendererFunction<T> },
    containerSelector: string,
  ) {
    this.renderedItems = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector) as HTMLElement;
  }

  renderItems(): void {
    this.renderedItems.forEach((item) => {
      this.renderer(item);
    });
  }

  addItem(element: HTMLElement): void {
    this.container.prepend(element);
  }
}
