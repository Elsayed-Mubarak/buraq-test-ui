import { Smile } from 'lucide-react'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useRef, useState } from 'react'
import EmojiPicker from '@/components/shared/EmojiPicker'
import ReactQuillEditor from '@/components/shared/ReactQuillEditor'
import useCreateTemplateStore from '@/stores/useCreateTemplate'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import toast from 'react-hot-toast'

type Props = {
    errorsObject: any;
    setErrorsObject: any
}

export default function TemplateBody({ errorsObject, setErrorsObject }: Props) {
    const changeBodyText = useCreateTemplateStore((state) => state.changeBodyText);
    const bodyObject = useCreateTemplateStore((state) => state.bodyObject);
    const variables = useCreateTemplateStore((state) => state.variables);
    const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref for textarea
    const [text, setText] = useState(bodyObject.value)
    const [isEmojiOpen, setIsEmojiOpen] = useState(false)
    const [addVariable, setAddVariable] = useState(false)
    const containerRef = useOutsideClick(() => setAddVariable(false))
    function handleSelectEmoji(emoji: any) {
        setIsEmojiOpen(false)
        setText(prev => prev + emoji.native)
        // changeBodyText(text);
    }

    function handleChangeText(e: any) {
        const newText = e.target.value;
        const cursorPosition = e.target.selectionStart;
        setText(newText);

        const hashIndices = [...newText.matchAll(/#/g)].map(match => match.index);

        if (hashIndices.length > 0) {
            const isCursorAfterHash = hashIndices.some(index => cursorPosition === index + 1);

            // If cursor is exactly after `#`, enable addVariable
            if (isCursorAfterHash) {
                setAddVariable(true);
            }
            // If space or any character is typed after `#`, disable addVariable
            else if (hashIndices.some(index => index + 1 < newText.length && newText[index + 1] !== "#")) {
                setAddVariable(false);
            }
            // If cursor moves away from all `#`, disable addVariable
            else if (hashIndices.every(index => cursorPosition <= index)) {
                setAddVariable(false);
            }
        } else {
            setAddVariable(false);
        }
    }

    function handleKeyDown(e: any) {
        if (!textareaRef.current) return;

        const textarea = textareaRef.current;

        setTimeout(() => {
            const cursorPosition = textarea.selectionStart;
            const text = textarea.value;

            // Handle Backspace Deletion for `{{variableName}}`
            if (e.key === "Backspace" && cursorPosition > 0) {
                const beforeCursor = text.substring(0, cursorPosition);
                const afterCursor = text.substring(cursorPosition);

                // Match `{{variableName}}` before the cursor
                const variableMatch = beforeCursor.match(/\{\{[^}]+\}\}$/);

                if (variableMatch) {
                    e.preventDefault(); // Stop default backspace behavior

                    // Remove `{{variableName}}` entirely
                    const newText =
                        text.substring(0, beforeCursor.length - variableMatch[0].length) +
                        afterCursor;

                    setText(newText);

                    // Move cursor correctly after deletion
                    setTimeout(() => {
                        const newCursorPos = cursorPosition - variableMatch[0].length;
                        textarea.setSelectionRange(newCursorPos, newCursorPos);
                        textarea.focus();
                    }, 0);

                    return;
                }
            }

            // Manage `#` Behavior
            const matches = Array.from(text.matchAll(/#/g));
            const hashIndices = matches.map(match => match.index);

            if (hashIndices.length > 0) {
                const isCursorAfterHash = hashIndices.some(index => cursorPosition === index + 1);

                if (isCursorAfterHash) {
                    setAddVariable(true);
                }
                // If space or any character is typed after `#`, disable addVariable
                else if (hashIndices.some(index => index + 1 < text.length && text[index + 1] !== "#")) {
                    setAddVariable(false);
                }
                // If cursor moves away from all `#`, disable addVariable
                else if (hashIndices.every(index => cursorPosition <= index)) {
                    setAddVariable(false);
                }
            } else {
                setAddVariable(false);
            }
        }, 0);
    }


    function handleInsertVariable(variableName: string) {
        if (!textareaRef.current) return;

        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        let newText = text;
        let newCursorPos = start;

        // Check if the variable already exists
        const variablePattern = new RegExp(`\\{\\{${variableName}\\}\\}`, "g");
        if (variablePattern.test(text)) {
            toast.error("Variable already exists, cannot add same variable again");
            return; // If variable already exists, do nothing
        }

        // Find the nearest `#` before the cursor and remove it
        const beforeCursor = text.substring(0, start);
        const lastHashIndex = beforeCursor.lastIndexOf("#");

        if (lastHashIndex !== -1) {
            // Remove `#` and insert `{{variableName}}` followed by a space
            newText = text.substring(0, lastHashIndex) + `{{${variableName}}} ` + text.substring(end);
            newCursorPos = lastHashIndex + variableName.length + 5; // Move cursor after `{{variableName}}` and space
        }

        setText(newText); // Update state immediately
        setAddVariable(false); // Close dropdown

        // Force state update to apply before next render
        setTimeout(() => {
            textarea.setSelectionRange(newCursorPos, newCursorPos);
            textarea.focus();
        }, 0);
    }




    useEffect(() => {
        changeBodyText(JSON.stringify(text));
        if (text.length > 0) setErrorsObject({ ...errorsObject, bodyError: false })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text])

    useEffect(() => {
        return () => {
            setText("");
            changeBodyText("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='py-5 border-b border-[#cdcdcd] '>
            <div className='text-lg text-secondary-50 font-semibold'>Body</div>
            <div className='w-[297px] mt-1 mb-3 text-sm text-[#808080]'>
                Enter the text for your message in the language that you’ve selected.
            </div>
            <div className={`h-[162px] w-full mb-2 relative border rounded-lg ${errorsObject.bodyError ? "border-[#f00]" : "border-primary-50"}`}>
                <Popover
                    open={isEmojiOpen}
                    onOpenChange={() => setIsEmojiOpen(!isEmojiOpen)}>
                    <PopoverTrigger asChild>
                        <button className={`${isEmojiOpen ? "text-primary-500" : "text-[#808080]"} absolute top-2 right-2 w-6 h-6 `}>
                            <Smile size={16} />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent align='end' className="w-[300] h-[250px] p-0 overflow-hidden bg-white">
                        <EmojiPicker onEmojiSelect={handleSelectEmoji} />
                    </PopoverContent>
                </Popover>
                {addVariable && <div ref={containerRef} className='absolute w-full top-20 bg-white shadow-[0px_0px_11px_rgba(0,0,0,0.33)] max-h-[220px] overflow-y-auto'>
                    {
                        variables.map((item: any) => (
                            <div
                                key={item._id}
                                onClick={() => handleInsertVariable(item.variableName)}
                                className='flex items-center justify-between text-sm px-2 py-2 hover:bg-[#f3f3f3] cursor-pointer'>
                                <span className='text-secondary-50'>{item.variableName}</span>
                                <span className='text-[#808080]'>{item.type}</span>
                            </div>
                        ))}
                </div>}
                <div className='w-full h-10 p-2 bg-[#f3f3f3] text-sm flex gap-2 rounded-t-lg  items-center'>
                    <span className='w-6 h-6 flex items-center justify-center text-[#4D5761] hover:bg-[#cdcdcd] rounded-sm cursor-pointer'>B</span>
                    <span className='w-6 h-6 flex items-center justify-center text-[#4D5761] hover:bg-[#cdcdcd] rounded-sm cursor-pointer'>I</span>
                </div>
                <textarea
                    ref={textareaRef}
                    value={text}
                    onKeyDown={handleKeyDown}
                    onChange={handleChangeText}
                    className='w-full h-[118px] whitespace-pre-wrap rounded-b-lg p-2 text-sm outline-none resize-none'></textarea>
                {/* <ReactQuillEditor value={text} setValue={setText} /> */}
            </div>
            <div className='flex items-center justify-between text-[#808080]'>
                {
                    errorsObject.bodyError ?
                        <div className='text-[11px] text-[#f00]'>this field is required</div> :
                        <div className='text-[11px]'>Body character limit is 1024 characters</div>
                }

                <span className='text-[13px]'>{bodyObject?.value && JSON.parse(bodyObject.value)?.length || 0}</span>
            </div>
        </div>
    )
}


