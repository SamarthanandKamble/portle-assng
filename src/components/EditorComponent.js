import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorComponent = () => {
  const [editorState, setEditorState] = useState(() => {
    // Load content from local storage on initial render
    const savedContent = localStorage.getItem("editorContent");
    return savedContent
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
      : EditorState.createEmpty();
  });

  useEffect(() => {
    // Save content to local storage on editor state change
    const contentState = editorState.getCurrentContent();
    localStorage.setItem(
      "editorContent",
      JSON.stringify(convertToRaw(contentState))
    );
  }, [editorState]);

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <DraftEditor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: ["inline", "blockType", "list"],
          inline: {
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "superscript",
              "subscript",
            ],
          },
          blockType: { options: ["Normal", "H1"] },
        }}
      />
    </div>
  );
};

export default EditorComponent;
