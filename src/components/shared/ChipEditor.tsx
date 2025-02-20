import { useState, useRef, useEffect } from "react";

interface Props {
    value: string[];
    onChange: (updatedTags: string[]) => void;
}

const ChipEditor = ({ value, onChange }: Props) => {
    const [tags, setTags] = useState<string[]>(() => (Array.isArray(value) ? value : []));
    const [inputValue, setInputValue] = useState("");
    const [focusedTagIndex, setFocusedTagIndex] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync external `value` with local state only when necessary
    useEffect(() => {
        if (Array.isArray(value) && value !== tags) {
            setTags(value); // Only update if `value` changes
        }
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
        if ((e.key === "Enter" || e.key === " ") && inputValue.trim() && !tags.includes(inputValue.trim())) {
            e.preventDefault();
            const newTags = [...tags, inputValue.trim()];
            setTags(newTags);
            onChange(newTags);
            setInputValue("");
            setFocusedTagIndex(null);
        }

        if (e.key === "Backspace") {
            if (inputValue.trim()) return; // If typing, do not remove tag
            if (focusedTagIndex !== null && focusedTagIndex >= 0) {
                // Remove focused tag
                const newTags = tags.filter((_, i) => i !== focusedTagIndex);
                setTags(newTags);
                onChange(newTags); // Notify parent about the change
                setFocusedTagIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
            } else if (tags.length > 0) {
                // Remove last tag if no tag is focused
                const newTags = tags.slice(0, -1);
                setTags(newTags);
                onChange(newTags); // Notify parent about the change
            }
        }

        // Move focus between tags
        if (e.key === "ArrowLeft") {
            if (focusedTagIndex === null && tags.length > 0) {
                setFocusedTagIndex(tags.length - 1); // Focus last tag
            } else if (focusedTagIndex !== null && focusedTagIndex > 0) {
                setFocusedTagIndex(focusedTagIndex - 1); // Move focus left
            }
        }

        if (e.key === "ArrowRight") {
            if (focusedTagIndex !== null && focusedTagIndex < tags.length - 1) {
                setFocusedTagIndex(focusedTagIndex + 1); // Move focus right
            } else {
                setFocusedTagIndex(null); // Focus input field
            }
        }
    };

    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
        onChange(newTags); // Notify parent about the change
        setFocusedTagIndex(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="flex flex-col gap-2 mt-2">
            <div
                className="flex flex-wrap gap-2 items-start border border-gray-300 focus:border-blue-500 rounded-md p-1 h-[80px] overflow-y-auto relative"
                onClick={() => {
                    setFocusedTagIndex(null);
                    inputRef.current?.focus();
                }}
                onKeyDown={handleKeyDown}
                tabIndex={0}
            >
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className={`flex items-center px-3 py-1 rounded h-[30px] text-sm cursor-pointer 
                        ${focusedTagIndex === index ? "bg-blue-200 text-blue-700" : "bg-gray-200 text-nodeSettings"}`}
                        onClick={() => setFocusedTagIndex(index)}
                    >
                        <span>{tag}</span>
                        <button
                            className="ml-2 hover:text-blue-800"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent focus changes
                                removeTag(index);
                            }}
                        >
                            &times;
                        </button>
                    </div>
                ))}

                {/* Input Field */}
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    className="flex-grow border-none outline-none text-sm p-1 w-1"
                />

                {/* "Create" Option */}
                {inputValue && !tags.includes(inputValue) && (
                    <div className="absolute bottom-0 left-0 w-full bg-[#f3f3f3] text-xs p-3 text-nodeSettings">
                        Create "{inputValue}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChipEditor;
