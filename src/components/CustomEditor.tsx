import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import useEditorContent from "@/hooks/useEditorContent";

interface Props {
    editorState: EditorState;
    handleChange: (state: EditorState) => void;
    handleKeyCommand: (command: string, state: EditorState) => "handled" | "not-handled";
    placeholder?: string;
}

function CustomEditor({ editorState, handleChange, handleKeyCommand, placeholder }: Props) {
    const { content, handleContentChange, onBlur } = useEditorContent(handleChange, editorState);

    return (
        <Editor
            editorState={content}
            onChange={handleContentChange}
            handleKeyCommand={(command, state, eventTimeStamp) => handleKeyCommand(command, state)}
            onBlur={onBlur}
            placeholder={placeholder}
        />
    );
}

export default CustomEditor;
