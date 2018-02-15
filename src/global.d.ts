declare module "squire-rte" {
  export default class Editor {
    constructor(div: HTMLDivElement);
    getPath(): any;
    hasFormat(type: string): any;
    removeBold(): void;
    removeItalic(): void;
    removeUnderline(): void;
    bold(): void;
    italic(): void;
    underline(): void;
    focus(): void;
    destroy(): void;
    [index: string]: Function;
  }
}
