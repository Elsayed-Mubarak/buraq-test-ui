import ToolTip from "@/components/shared/ToolTip"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import useCreateTemplateStore from "@/stores/useCreateTemplate"
import { Check, Link2, Trash2, X } from "lucide-react"
import Image from "next/image"
import { useState, useRef, KeyboardEvent, ChangeEvent } from "react"
import toast from "react-hot-toast"

type BtnType = {
    id: string
    type: "quick-reply" | "url" | "call",
    label: string,
    value?: string,
}
type Props = {
    btn: BtnType,
    errorsObject: any;
    setErrorsObject: any
}

export default function URLButton({ btn, errorsObject, setErrorsObject }: Props) {
    const {
        removeButton,
        updateButton,
        variables
    } = useCreateTemplateStore();
    const [link, setLink] = useState('')
    const [isOpenAddLink, setIsOpenAddLink] = useState(false)
    const [addVariable, setAddVariable] = useState(false)
    const [validURL, setValidURL] = useState(false)
    // const containerRef = useOutsideClick(() => setIsOpenAddLink(false))
    const variableRef = useOutsideClick(() => setAddVariable(false))
    const inputRef = useRef<HTMLInputElement>(null)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const newText = e.target.value;
        const cursorPosition = e.target.selectionStart ?? 0; // Ensure cursorPosition is not null
        setLink(newText);

        const hashMatches = Array.from(newText.matchAll(/#/g));
        const hashIndices = hashMatches.map(match => match.index ?? 0);

        if (hashIndices.length > 0) {
            const isCursorAfterHash = hashIndices.some((index) => cursorPosition === index + 1);

            if (isCursorAfterHash) {
                setAddVariable(true);
            } else if (hashIndices.some((index) => index + 1 < newText.length && newText[index + 1] !== "#")) {
                setAddVariable(false);
            } else if (hashIndices.every((index) => cursorPosition <= index)) {
                setAddVariable(false);
            }
        } else {
            setAddVariable(false);
        }

        // Validate URL
        const urlRegex = /^(ftp|http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:[0-9]+)?(\/\S*)?$/;
        setValidURL(urlRegex.test(newText));

        if (newText.length > 0) {
            setErrorsObject((prevErrors: any) => ({
                ...prevErrors,
                buttonsError: prevErrors.buttonsError.filter((btnId: string) => btnId !== btn.id),
            }));
        }
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (!inputRef.current) return;
        const input = inputRef.current;

        setTimeout(() => {
            const cursorPosition = input.selectionStart ?? 0;
            const text = input.value;

            if (e.key === "Backspace" && cursorPosition > 0) {
                const beforeCursor = text.substring(0, cursorPosition);
                const afterCursor = text.substring(cursorPosition);

                const variableMatch = beforeCursor.match(/\{\{[^}]+\}\}$/);

                if (variableMatch) {
                    e.preventDefault();

                    const newText =
                        text.substring(0, beforeCursor.length - variableMatch[0].length) + afterCursor;

                    setLink(newText);

                    setTimeout(() => {
                        const newCursorPos = cursorPosition - variableMatch[0].length;
                        input.setSelectionRange(newCursorPos, newCursorPos);
                        input.focus();
                    }, 0);

                    return;
                }
            }

            const matches = Array.from(text.matchAll(/#/g));
            const hashIndices = matches.map((match) => match.index ?? 0);

            if (hashIndices.length > 0) {
                const isCursorAfterHash = hashIndices.some((index) => cursorPosition === index + 1);

                if (isCursorAfterHash) {
                    setAddVariable(true);
                } else if (hashIndices.some((index) => index + 1 < text.length && text[index + 1] !== "#")) {
                    setAddVariable(false);
                } else if (hashIndices.every((index) => cursorPosition <= index)) {
                    setAddVariable(false);
                }
            } else {
                setAddVariable(false);
            }
        }, 0);
    }

    function handleInsertVariable(variableName: string) {
        if (!inputRef.current) return;

        const input = inputRef.current;
        const start = input.selectionStart ?? 0;
        const end = input.selectionEnd ?? 0;

        // Ensure we insert the variable correctly
        let newText = link;
        let newCursorPos = start;

        // Prevent adding multiple variables
        const variablePattern = /\{\{[^}]+\}\}/g;
        if (variablePattern.test(link)) {
            toast.error("A variable is already added. You can only insert one variable.");
            return;
        }

        const beforeCursor = link.substring(0, start);
        const lastHashIndex = beforeCursor.lastIndexOf("#");

        if (lastHashIndex !== -1) {
            // Insert variable and a space after it
            const insertedText = `{{${variableName}}} `; // Notice the space at the end
            newText = link.substring(0, lastHashIndex) + insertedText + link.substring(end);

            // Move cursor after the inserted variable and space
            newCursorPos = lastHashIndex + insertedText.length;
        } else {
            // If no # found, just insert at the cursor position
            const insertedText = `{{${variableName}}} `;
            newText = link.substring(0, start) + insertedText + link.substring(end);
            newCursorPos = start + insertedText.length;
        }

        // Update state with the new text
        setLink(newText);
        setAddVariable(false);

        // Ensure cursor moves after the variable and space
        setTimeout(() => {
            input.focus();
            input.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    }



    function handleUpdateLink() {
        if (!validURL) return;
        updateButton(btn.id, "value", link);
        setIsOpenAddLink(false);
    }
    return (
        <div className="relative group flex items-center justify-center  rounded-lg h-10 px-10 bg-primary-500">
            {isOpenAddLink &&
                <div
                    // ref={containerRef} 
                    className="flex items-center gap-2 bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)] rounded-sm p-2 absolute w-full z-[999] bottom-[calc(100%+10px)]">
                    <input
                        value={link}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        type="url"
                        ref={inputRef}
                        className={`flex-1 outline-none focus:outline-none rounded-md px-2 py-1 border ${!validURL ? 'border-[#f00]' : "border-primary-50"} `} />
                    <div className="flex items-center gap-1">
                        <button onClick={() => handleUpdateLink()} className="flex items-center justify-center text-white rounded-md bg-primary-500 h-10 w-10 ">
                            <Check size={24} />
                        </button>
                        <button onClick={() => setIsOpenAddLink(false)} className="flex items-center justify-center text-[#637178] rounded-md bg-[#f3f3f3] h-10 w-10 ">
                            <X size={24} />
                        </button>
                    </div>
                </div>}
            {addVariable && (
                <div ref={variableRef} className="absolute z-[99] w-full top-[-10px] bg-white shadow-[0px_0px_11px_rgba(0,0,0,0.4)] max-h-[220px] overflow-y-auto">
                    {variables.map((item: any) => (
                        <div
                            key={item._id}
                            onClick={() => handleInsertVariable(item.variableName)}
                            className="flex items-center justify-between text-sm px-2 py-2 hover:bg-[#f3f3f3] cursor-pointer">
                            <span className="text-secondary-50">{item.variableName}</span>
                            <span className="text-[#808080]">{item.type}</span>
                        </div>
                    ))}
                </div>
            )}
            <div className="absolute left-3 flex items-center">
                <span onClick={() => setIsOpenAddLink(true)} className="cursor-pointer rounded-lg w-8 h-10 flex items-center justify-center ">
                    <Link2 size={24} className="text-white" />
                </span>
                {(!btn.label || errorsObject.buttonsError.includes(btn.id)) && <span className="rounded-lg w-8 h-10 flex items-center justify-center ">
                    <ToolTip title="This field cannot be empty">
                        <Image src="/warning.svg" width={20} height={20} alt="warning" />
                    </ToolTip>
                </span>}
            </div>
            <input maxLength={20} value={btn.label} onChange={(e) => updateButton(btn.id, 'label', e.target.value)} type="text" className="block bg-transparent w-full text-white text-sm outline-none border-none text-center" />
            <span onClick={() => removeButton(btn.id)} className="flex items-center justify-center opacity-0 absolute top-0 group-hover:opacity-100 w-8  h-10 cursor-pointer text-[#808080] hover:opacity-100 hover:text-[#f00]  -right-8">
                <Trash2 className="w-5 h-5 text-inherit" />
            </span>
        </div>
    )
}