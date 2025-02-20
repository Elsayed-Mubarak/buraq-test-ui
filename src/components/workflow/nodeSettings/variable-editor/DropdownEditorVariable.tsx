import React, { useEffect, useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { MdChat } from "react-icons/md";

interface DropdownEditorProps {
    showDropdown: boolean;
    dropdownPosition: [number, number];
    variables: any[];
    handleInsertVariable: (item: any) => void;
}

function DropdownEditorVariable({ dropdownPosition, handleInsertVariable, showDropdown, variables }: DropdownEditorProps) {
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const dropdownRef = useRef<HTMLUListElement>(null);

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
        if (!showDropdown || variables.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) => {
                    const nextIndex = (prev + 1) % variables.length;
                    return nextIndex;
                });
                break;

            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => {
                    const nextIndex = (prev - 1 + variables.length) % variables.length;
                    return nextIndex;
                });
                break;

            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < variables.length) {
                    handleInsertVariable(variables[selectedIndex]); // Call the function with the selected item
                }
                break;

            case "Escape":
                e.preventDefault();
                setSelectedIndex(-1); // Clear selection
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        if (showDropdown) {
            window.addEventListener("keydown", handleKeyDown);

            // Set focus on the dropdown when it is shown
            // if (dropdownRef.current) {
            //     dropdownRef.current.focus();
            // }
        } else {
            setSelectedIndex(-1); // Reset selection when the dropdown is hidden
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showDropdown, selectedIndex, variables]);

    useEffect(() => {
        scrollToSelected();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIndex]);

    return (
        showDropdown && (
            <ul
                id="dropdown-variable"
                ref={dropdownRef}
                tabIndex={-1} // Makes the dropdown focusable
                className="absolute z-50 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none list-none w-full max-w-xs overflow-hidden h-[150px] overflow-y-auto"
                style={{ left: dropdownPosition[0], top: dropdownPosition[1] }}
            >
                {variables.map((item, index) => (
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
        )
    );
}

export default DropdownEditorVariable;
