/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import {
    Editor,
    EditorState,
    Modifier,
    CompositeDecorator,
    ContentState,
    RichUtils,
    DraftHandleValue,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { convertToHTML, convertFromHTML } from "draft-convert";

import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { variableStrategy } from "@/utils/variable-strategy";
import VariableTag from "./VariableTag";
import ToolbarEditor from "./ToolbarEditor";
import './index.css';
import { FaUser } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import useTextEditorStore from "@/stores/useTextEditorVariable";
import FallbackValue from "./FallbackValue";


interface DropdownEditorProps {
    value?: string;
    showToolbar?: boolean;
    onChange?: (value: string) => void;
    className?: string;
    placeholder?: string;
    message?: string;
    wordsCount?: boolean;
    asChild?: boolean;
}

export default function TextInputVariable({
    value = "",
    showToolbar = false,
    onChange,
    className,
    placeholder = "",
    message,
    asChild = false,
    wordsCount = false,
}: DropdownEditorProps) {


    const { activeVariables } = useFlowStore();
    const { openFallback } = useTextEditorStore();

    const [localValue, setLocalValue] = useState(value);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [filteredVariables, setFilteredVariables] = useState(activeVariables);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const [editorContent, setEditorContent] = React.useState(() =>
        EditorState.createEmpty()
    );

    // Prevent Enter key from adding a new line
    const handleReturn = (event: React.KeyboardEvent): "handled" | "not-handled" => {
        return "handled"; // Stops the Enter key behavior
    };


    const createDecorator = () =>
        new CompositeDecorator([
            {
                strategy: variableStrategy,
                component: (props: any) => {
                    const decoratedText = props.decoratedText.trim().replace(/\*/g, "");
                    const item = activeVariables.find(
                        (variable: any) => variable.variableName.trim() === decoratedText
                    );
                    return <VariableTag item={item}>{props.children}</VariableTag>;
                },
            },
        ]);

    const decorator = createDecorator();

    const [editorState, setEditorState] = useState(() => {
        if (value) {
            let contentState;

            if (showToolbar) {
                // Convert from HTML if showToolbar is enabled
                contentState = convertFromHTML(value);
                return EditorState.createWithContent(
                    ContentState.createFromBlockArray(contentState.getBlocksAsArray(), contentState.getEntityMap()),
                    decorator
                );
            } else {
                // Treat value as plain text when showToolbar is disabled
                contentState = ContentState.createFromText(value);
                return EditorState.createWithContent(contentState, decorator);
            }
        }

        // Default empty state
        return EditorState.createEmpty(decorator);
    });

    useEffect(() => {
        if (value !== localValue) {
            setLocalValue(value);

            let contentState;

            if (showToolbar) {
                // Convert from HTML when toolbar is enabled
                contentState = convertFromHTML(value);
                contentState = ContentState.createFromBlockArray(
                    contentState.getBlocksAsArray(),
                    contentState.getEntityMap()
                );
            } else {
                // Treat as plain text when toolbar is disabled
                contentState = ContentState.createFromText(value);
            }

            const newEditorState = EditorState.createWithContent(contentState, decorator);

            // Preserve selection state
            const currentSelection = editorState.getSelection();
            setEditorState(EditorState.forceSelection(newEditorState, currentSelection));
        }
    }, [value, showToolbar]);



    useEffect(() => {
        if (showDropdown && filteredVariables.length > 0 && selectedIndex >= 0) {
            dropdownRef.current?.focus();
        }
    }, [filteredVariables.length, selectedIndex, showDropdown]);

    useEffect(() => {
        if (showDropdown) {
            window.addEventListener("keydown", handleKeyDown);
        } else {
            setSelectedIndex(-1);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [showDropdown, selectedIndex, filteredVariables]);

    useEffect(() => {
        scrollToSelected();
    }, [selectedIndex]);

    const serializeContent = (content: ContentState) => {
        return showToolbar
            ? convertToHTML({
                styleToHTML: (style) => {
                    switch (style) {
                        case "BOLD":
                            return <strong />;
                        case "ITALIC":
                            return <em />;
                        default:
                            return null;
                    }
                },
                entityToHTML: (entity, text) => {
                    if (entity.type === "VARIABLE") {
                        return `*${entity.data.variableName}* `;
                    }
                    return text;
                },
                blockToHTML: (block) => {
                    switch (block.type) {
                        case "unordered-list-item":
                            return { start: "<ul><li>", end: "</li></ul>" };
                        case "ordered-list-item":
                            return { start: "<ol><li>", end: "</li></ol>" };
                        case "header-one":
                            return { start: "<h1>", end: "</h1>" };
                        case "header-two":
                            return { start: "<h2>", end: "</h2>" };
                        default:
                            return { start: "<p>", end: "</p>" };
                    }
                },
            })(content)
            : content.getPlainText(); // Returns plain text if toolbar is disabled
    };

    const handleChange = (state: EditorState) => {
        const content = state.getCurrentContent();
        const isEmpty = !content.hasText();

        // Serialize based on toolbar visibility
        const output = isEmpty ? "" : serializeContent(content);

        setLocalValue(output);
        onChange?.(output);

        const currentInlineStyle = editorState.getCurrentInlineStyle();
        const updatedEditorState = EditorState.setInlineStyleOverride(state, currentInlineStyle);

        setEditorState(updatedEditorState);

        const selection = updatedEditorState.getSelection();
        const blockKey = selection.getStartKey();
        const block = content.getBlockForKey(blockKey);
        const text = block.getText();
        const focusOffset = selection.getFocusOffset();

        const hashIndex = text.lastIndexOf("#");
        if (hashIndex !== -1 && focusOffset > hashIndex) {
            const searchText = text.substring(hashIndex + 1, focusOffset).toLowerCase();
            const filtered = activeVariables.filter((variable) =>
                variable.variableName.toLowerCase().includes(searchText)
            );
            setFilteredVariables(filtered);
            calculateDropdownPosition();
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };



    const calculateDropdownPosition = () => {
        const selectionRange = window.getSelection();
        if (selectionRange && selectionRange.rangeCount > 0) {
            const rangeBounds = selectionRange.getRangeAt(0).getBoundingClientRect();
            setDropdownPosition({
                left: 0 + window.scrollX,
                top: 100 + window.scrollY,
            });
        }
    };

    // @Desc    Handle click event on the variable dropdown
    const handleInsertVariable = (item: { variableName: string; type: string }) => {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const blockKey = selectionState.getStartKey();
        const block = contentState.getBlockForKey(blockKey);
        const text = block.getText();
        const focusOffset = selectionState.getFocusOffset();
        const start = text.lastIndexOf("#", focusOffset - 1);

        if (start !== -1) {
            const selectionToReplace = selectionState.merge({
                anchorOffset: start,
                focusOffset: focusOffset,
            });

            const contentStateWithEntity = contentState.createEntity(
                "VARIABLE",
                "IMMUTABLE",
                { variableName: item.variableName }
            );

            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

            const contentStateWithTag = Modifier.replaceText(
                contentState,
                selectionToReplace,
                `*${item.variableName}* `,
                editorState.getCurrentInlineStyle(),
                entityKey
            );

            const newEditorState = EditorState.push(
                editorState,
                contentStateWithTag,
                "insert-characters"
            );

            const finalEditorState = EditorState.forceSelection(
                newEditorState,
                contentStateWithTag.getSelectionAfter()
            );

            handleChange(finalEditorState);
            setShowDropdown(false);
        }
    };

    const handleKeyCommand = (command: string, editorState: EditorState): DraftHandleValue => {
        if (showDropdown && filteredVariables.length > 0 && selectedIndex >= 0 && command === "enter") {
            dropdownRef.current?.focus();
            handleInsertVariable(filteredVariables[selectedIndex]);
            setShowDropdown(false);
            return "handled";
        }

        if (command === "backspace") {
            const selection = editorState.getSelection();
            const contentState = editorState.getCurrentContent();

            if (selection.isCollapsed()) {
                const blockKey = selection.getStartKey();
                const block = contentState.getBlockForKey(blockKey);
                const text = block.getText();
                const focusOffset = selection.getFocusOffset();

                const regex = /\*\w+?\*/g;
                let match;
                while ((match = regex.exec(text)) !== null) {
                    const [matchedText] = match;
                    const start = match.index;
                    const end = start + matchedText.length;

                    if (focusOffset === end || focusOffset === end + 1) {
                        const selectionToRemove = selection.merge({
                            anchorOffset: start,
                            focusOffset: end,
                        });

                        const contentStateWithoutVariable = Modifier.removeRange(
                            contentState,
                            selectionToRemove,
                            "backward"
                        );

                        const newEditorState = EditorState.push(
                            editorState,
                            contentStateWithoutVariable,
                            "remove-range"
                        );

                        setEditorState(newEditorState);
                        handleChange(newEditorState);
                        return "handled";
                    }
                }
            }
        }

        return "not-handled";
    };

    const toggleInlineStyle = (style: string) => {
        const selection = editorState.getSelection();

        if (!selection.isCollapsed()) {
            const newEditorState = RichUtils.toggleInlineStyle(editorState, style);
            setEditorState(newEditorState);
        } else {
            const currentStyle = editorState.getCurrentInlineStyle();
            let newEditorState;
            if (currentStyle.has(style)) {
                newEditorState = EditorState.setInlineStyleOverride(
                    editorState,
                    currentStyle.remove(style)
                );
            } else {
                newEditorState = EditorState.setInlineStyleOverride(
                    editorState,
                    currentStyle.add(style)
                );
            }
            setEditorState(newEditorState);
        }
    };


    const handleFocus = () => {
        const currentInlineStyle = editorState.getCurrentInlineStyle();
        const updatedEditorState = EditorState.setInlineStyleOverride(editorState, currentInlineStyle);
        setEditorState(updatedEditorState);
    };


    const toggleBlockStyle = (blockType: string) => {
        const newEditorState = RichUtils.toggleBlockType(editorState, blockType);
        setEditorState(newEditorState);
    };

    const isActiveInlineStyle = (style: string) =>
        editorState.getCurrentInlineStyle().has(style);

    const isActiveBlockStyle = (blockType: string) => {
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        const blockKey = selection.getStartKey();
        const block = contentState.getBlockForKey(blockKey);
        return block.getType() === blockType;
    };

    const handlePickEmoji = (emojiData: EmojiClickData) => {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();

        const contentStateWithEmoji = Modifier.insertText(
            contentState,
            selectionState,
            emojiData.emoji
        );

        const newEditorState = EditorState.push(
            editorState,
            contentStateWithEmoji,
            "insert-characters"
        );

        handleChange(newEditorState);
        setShowEmojiPicker(false);
    }


    const scrollToSelected = () => {
        if (dropdownRef.current && selectedIndex >= 0) {
            const selectedElement = dropdownRef.current.children[selectedIndex] as HTMLElement;
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!showDropdown || filteredVariables.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) => {
                    const nextIndex = (prev + 1) % filteredVariables.length;
                    return nextIndex;
                });
                break;

            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => {
                    const nextIndex = (prev - 1 + filteredVariables.length) % filteredVariables.length;
                    return nextIndex;
                });
                break;

            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < filteredVariables.length) {
                    handleInsertVariable(filteredVariables[selectedIndex]);
                }
                break;

            case "Escape":
                e.preventDefault();
                setShowDropdown(false);
                setSelectedIndex(-1);
                break;

            default:
                break;
        }
    };

    return (
        <>
            <div className={`relative w-full border rounded-lg bg-white ${asChild ? "mx-0" : "mx-auto max-w-sm"}`}>
                {/* <FallbackValue /> */}

                <ToolbarEditor
                    toggleInlineStyle={toggleInlineStyle}
                    isActiveInlineStyle={isActiveInlineStyle}
                    toggleBlockStyle={toggleBlockStyle}
                    isActiveBlockStyle={isActiveBlockStyle}
                    toggleEmojiPicker={() => setShowEmojiPicker(!showEmojiPicker)}
                    showToolbar={showToolbar}
                />

                {showEmojiPicker && (
                    <div className="absolute right-8 top-14 z-[100] w-[260px]">
                        <EmojiPicker onEmojiClick={handlePickEmoji} />
                    </div>
                )}

                <div className={`${className ? className : 'px-4 py-3 min-h-[80px] text-gray-700 relative w-full overflow-y-auto'}`}>
                    <Editor
                        editorState={editorState}
                        onChange={handleChange}
                        placeholder={placeholder}
                        handleKeyCommand={handleKeyCommand}
                        onFocus={handleFocus}
                        handleReturn={handleReturn} // Disable Enter key

                    />
                </div>

                {showDropdown && filteredVariables.length > 0 && (
                    <ul
                        // id="dropdown-variable"
                        ref={dropdownRef}
                        tabIndex={-1} // Makes the dropdown focusable
                        className="w-[300px]  absolute right-0 z-50 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none list-none  overflow-hidden h-[150px] overflow-y-auto"
                    // style={{ left: dropdownPosition.left, top: dropdownPosition.top }}
                    >
                        {filteredVariables.map((item, index) => (
                            <li
                                key={item._id}
                                onClick={() => handleInsertVariable(item)}
                                className={`px-4 py-2 flex justify-between items-center text-sm text-gray-800 cursor-pointer ${selectedIndex === index ? "bg-blue-100" : "hover:bg-blue-100"
                                    }`}
                            >
                                <span className="flex items-center">
                                    {item.type === "contact" && <FaUser className="mr-2 text-blue-500" />}
                                    {item.type === "conversation" && <MdChat className="mr-2 text-green-500" />}
                                    {item.variableName}
                                </span>
                                <span className="text-gray-500">{item.type}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {message &&
                <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{message}</p>
                    <span className="text-xs text-gray-500">
                        {wordsCount && (editorState.getCurrentContent().getPlainText().length || 0)}
                    </span>
                </div>
            }
        </>
    );
}
