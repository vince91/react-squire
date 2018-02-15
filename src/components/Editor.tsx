import * as React from "react";
import Editor from "squire-rte";
import Action from "./Action";

function testPresenceinSelection(
  editor: Editor,
  format: string,
  validation: RegExp
) {
  return validation.test(editor.getPath()) || editor.hasFormat(format);
}

function toggleAction(
  editor: Editor,
  activeFn: string,
  removeFn: string,
  format: string,
  validation: RegExp
) {
  if (testPresenceinSelection(editor, format, validation)) {
    (editor as any)[removeFn]();
  } else {
    (editor as any)[activeFn]();
    editor.focus();
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

  componentDidMount() {
    this.editor = new Editor(this.editorDiv);
  }

  componentWillUnmount() {
    this.editor.destroy();
  }

  render() {
    return (
      <div className="squire">
        <div className="squire-toolbar">
          <div className="squire-actionGroup">
            <Action onClick={this.toggleBold}>Bold</Action>
            <Action onClick={this.toggleItalic}>Italic</Action>
            <Action onClick={this.toggleUnderline}>Underline</Action>
          </div>
        </div>
        <div className="squire-editor" ref={this.setEditorDiv} />
      </div>
    );
  }
}
