import { VscBold } from "react-icons/vsc";
import { HiOutlineItalic } from "react-icons/hi2";
import { GoListUnordered, GoListOrdered } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";

interface ToolbarEditorProps {
    toggleInlineStyle: (style: string) => void;
    isActiveInlineStyle: (style: string) => boolean;
    toggleBlockStyle: (blockType: string) => void;
    isActiveBlockStyle: (blockType: string) => boolean;
    toggleEmojiPicker: () => void;
    showToolbar?: boolean;
}

const ToolbarEditor: React.FC<ToolbarEditorProps> = ({
    toggleInlineStyle,
    isActiveInlineStyle,
    toggleBlockStyle,
    isActiveBlockStyle,
    toggleEmojiPicker,
    showToolbar = false,
}) => {
    if (!showToolbar) return null;

    return (
        <div className="flex items-center px-3 py-2 border-b bg-[#f3f3f3] gap-1">
            <button
                onClick={() => toggleInlineStyle("BOLD")}
                className={`text-gray-700 hover:text-black p-1 hover:bg-slate-200 rounded font-bold ${isActiveInlineStyle("BOLD") && "bg-gray-300"}`}
            >
                <VscBold />
            </button>

            <button
                onClick={() => toggleInlineStyle("ITALIC")}
                className={`text-gray-700 hover:text-black p-1 hover:bg-slate-200 rounded italic ${isActiveInlineStyle("ITALIC") && "bg-gray-300"}`}
            >
                <HiOutlineItalic />
            </button>

            <button
                onClick={() => toggleBlockStyle("unordered-list-item")}
                className={`text-gray-700 hover:text-black p-1 hover:bg-slate-200 rounded ${isActiveBlockStyle("unordered-list-item") && "bg-gray-300"}`}
            >
                <GoListUnordered />
            </button>

            <button
                onClick={() => toggleBlockStyle("ordered-list-item")}
                className={`text-gray-700 hover:text-black p-1 hover:bg-slate-200 rounded ${isActiveBlockStyle("ordered-list-item") && "bg-gray-300"}`}
            >
                <GoListOrdered />
            </button>

            <button
                onClick={toggleEmojiPicker}
                className="ml-auto text-gray-700 hover:text-black p-1"
            >
                <BsEmojiSmile />
            </button>
        </div>
    );
};

export default ToolbarEditor;
