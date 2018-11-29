import * as React from "react";
import Editor from "squire-rte";
import Action from "./Action";

function testPresenceinSelection(
  editor: Editor,
  validation: RegExp,
  tag: string,
  attributes: any = {}
) {
  console.log(
    validation.test(editor.getPath()),
    editor.hasFormat(tag, attributes)
  );
  return validation.test(editor.getPath()) || editor.hasFormat(tag, attributes);
}

function toggleAction(
  editor: Editor,
  activeFn: string,
  removeFn: string,
  format: string,
  validation: RegExp
) {
  if (testPresenceinSelection(editor, validation, format)) {
    (editor as any)[removeFn]();
  } else {
    (editor as any)[activeFn]();
    editor.focus();
  }
}

function toggleHeading(editor: Editor, size: string) {
  if (
    testPresenceinSelection(
      editor,
      new RegExp(`>SPAN.size\\[fontSize=${size}\\]>B\\b`),
      "SPAN",
      { class: "size", style: `font-size: ${size}` }
    )
  ) {
    editor.removeBold();
    editor.setFontSize();
  } else {
    editor.bold();
    editor.setFontSize(size);
  }
}

export default class Squire extends React.Component {
  editorDiv: HTMLDivElement;
  editor: Editor;

  setEditorDiv = (ref: HTMLDivElement) => {
    this.editorDiv = ref;
  };

  toggleBold = () =>
    toggleAction(this.editor, "bold", "removeBold", "B", />B\b/);

  toggleItalic = () =>
    toggleAction(this.editor, "italic", "removeItalic", "I", />I\b/);

  toggleUnderline = () =>
    toggleAction(this.editor, "underline", "removeUnderline", "U", />U\b/);

  toggleUnorderedList = () =>
    toggleAction(this.editor, "makeUnorderedList", "removeList", "UL", />UL\b/);

  toggleOrderedList = () =>
    toggleAction(this.editor, "makeOrderedList", "removeList", "OL", />OL\b/);

  toggleH1 = () => {
    toggleHeading(this.editor, "2em");
  };

  toggleH2 = () => {
    toggleHeading(this.editor, "1.5em");
  };

  toggleH3 = () => {
    toggleHeading(this.editor, "1.2em");
  };

  clearFormatting = () => {
    this.editor.removeAllFormatting();
  };

  componentDidMount() {
    this.editor = new Editor(this.editorDiv);

    this.editor.addEventListener("pathChange", () =>
      console.log(this.editor.getPath())
    );
  }

  componentWillUnmount() {
    this.editor.destroy();
  }

  render() {
    return (
      <div className="squire">
        <div className="squire-toolbar">
          <div className="squire-actionGroup">
            <Action onClick={this.toggleH1}>H1</Action>
            <Action onClick={this.toggleH2}>H2</Action>
            <Action onClick={this.toggleH3}>H3</Action>
          </div>
          <div className="squire-actionGroup">
            <Action onClick={this.toggleBold}>Bold</Action>
            <Action onClick={this.toggleItalic}>Italic</Action>
            <Action onClick={this.toggleUnderline}>Underline</Action>
          </div>
          <div className="squire-actionGroup">
            <Action onClick={this.toggleUnorderedList}>Unordered list</Action>
            <Action onClick={this.toggleOrderedList}>Ordered list</Action>
          </div>
          <div className="squire-actionGroup">
            <Action onClick={this.clearFormatting}>Clear</Action>
          </div>
        </div>
        <div className="squire-editor" ref={this.setEditorDiv} />
      </div>
    );
  }
}
