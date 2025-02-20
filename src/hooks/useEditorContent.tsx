import { useState } from "react";
import { EditorState } from "draft-js";

function useEditorContent(
    onChange: (value: EditorState) => void,
    initialEditorState: EditorState
) {

    const [content, setContent] = useState<EditorState>(initialEditorState);

    const handleContentChange = (state: EditorState) => {
        setContent(state);
        onChange?.(state);
    };

    const onBlur = () => {
        onChange?.(content);
    };

    return {
        content,
        handleContentChange,
        onBlur,
    };
}

export default useEditorContent;
