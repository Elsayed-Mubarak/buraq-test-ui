import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import useCreateTemplateStore from "@/stores/useCreateTemplate"
import { Image as ImageIcon, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

type HeaderOption = {
    value: string,
    label: string
}
const headerOptions: HeaderOption[] = [
    { value: "no-header", label: "No Header" },
    { value: "text", label: "Text" },
    { value: "image", label: "Image" },
    { value: "image-dynamic", label: "Image (Dynamic)" },
    { value: "document", label: "Document" },
    { value: "document-dynamic", label: "Document (Dynamic)" },
    { value: "video", label: "Video" },
    { value: "video-dynamic", label: "Video (Dynamic)" }
]

type Props = {
}
export default function TemplateHeader({ }: Props) {
    const {
        headerObject,
        changeHeaderType,
        changeHeaderValue,
    } = useCreateTemplateStore();
    const variables = useCreateTemplateStore((state) => state.variables);
    const [headerValue, setHeaderValue] = useState<string>("no-header")
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [documentFile, setDocumentFile] = useState<File | null>(null)
    const [headerText, setHeaderText] = useState<string>(headerObject.value || "");
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [addVariable, setAddVariable] = useState(false);
    const containerRef = useOutsideClick(() => setAddVariable(false));

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    function handleChangeSelect(value: string) {
        changeHeaderType(value);
        changeHeaderValue("");
        setHeaderValue(value)
        setImageFile(null)
        setDocumentFile(null)
        setVideoFile(null)
    }

    function handleFileChange(e: any) {
        const file = e.target.files[0]
        if (file) {
            changeHeaderValue(file)
            headerValue === "image" && setImageFile(file)
            headerValue === "document" && setDocumentFile(file)
            headerValue === "video" && setVideoFile(file)
        }
    }

    function handleRemoveFile() {
        changeHeaderValue("");
        setImageFile(null);
        setDocumentFile(null);
        setVideoFile(null);
    }
    function handleChangeText(e: any) {
        const newText = e.target.value;
        const cursorPosition = e.target.selectionStart;
        setHeaderText(newText);

        const hashIndices = [...newText.matchAll(/#/g)].map(match => match.index);

        if (hashIndices.length > 0) {
            const isCursorAfterHash = hashIndices.some(index => cursorPosition === index + 1);

            if (isCursorAfterHash) {
                setAddVariable(true);
            } else if (hashIndices.some(index => index + 1 < newText.length && newText[index + 1] !== "#")) {
                setAddVariable(false);
            } else if (hashIndices.every(index => cursorPosition <= index)) {
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

            if (e.key === "Backspace" && cursorPosition > 0) {
                const beforeCursor = text.substring(0, cursorPosition);
                const afterCursor = text.substring(cursorPosition);

                const variableMatch = beforeCursor.match(/\{\{[^}]+\}\}$/);

                if (variableMatch) {
                    e.preventDefault();

                    const newText =
                        text.substring(0, beforeCursor.length - variableMatch[0].length) +
                        afterCursor;

                    setHeaderText(newText);

                    setTimeout(() => {
                        const newCursorPos = cursorPosition - variableMatch[0].length;
                        textarea.setSelectionRange(newCursorPos, newCursorPos);
                        textarea.focus();
                    }, 0);

                    return;
                }
            }

            const matches = Array.from(text.matchAll(/#/g));
            const hashIndices = matches.map(match => match.index);

            if (hashIndices.length > 0) {
                const isCursorAfterHash = hashIndices.some(index => cursorPosition === index + 1);

                if (isCursorAfterHash) {
                    setAddVariable(true);
                } else if (hashIndices.some(index => index + 1 < text.length && text[index + 1] !== "#")) {
                    setAddVariable(false);
                } else if (hashIndices.every(index => cursorPosition <= index)) {
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

        let newText = headerText;
        let newCursorPos = start;

        // Check if the variable already exists
        const variablePattern = new RegExp(`\\{\\{${variableName}\\}\\}`, "g");
        if (variablePattern.test(headerText)) {
            toast.error("Variable already exists, cannot add same variable again");
            return; // If variable already exists, do nothing
        }

        const beforeCursor = headerText.substring(0, start);
        const lastHashIndex = beforeCursor.lastIndexOf("#");

        if (lastHashIndex !== -1) {
            newText = headerText.substring(0, lastHashIndex) + `{{${variableName}}} ` + headerText.substring(end);
            newCursorPos = lastHashIndex + variableName.length + 5;
        }

        setHeaderText(newText);
        setAddVariable(false);

        setTimeout(() => {
            textarea.setSelectionRange(newCursorPos, newCursorPos);
            textarea.focus();
        }, 0);
    }

    useEffect(() => {
        changeHeaderValue(headerText);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerText]);
    useEffect(() => {
        return () => {
            headerValue === "image" && setImageFile(null)
            headerValue === "document" && setDocumentFile(null)
            headerValue === "video" && setVideoFile(null)
            setHeaderValue("no-header")
            setAddVariable(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='py-5 border-y border-[#cdcdcd]'>
            <div onClick={() => console.log(headerObject)} className='text-lg text-secondary-50 font-semibold'>Header (Optional)</div>
            <div className='w-[297px] mt-1 mb-3 text-sm text-[#808080]'>
                Add a title or choose which type of media you’ll use for this header.
            </div>
            <div>
                <Select value={headerValue} onValueChange={(value) => handleChangeSelect(value)}>
                    <SelectTrigger className="w-full h-8 text-sm text-secondary-50 focus:ring-0 focus:ring-offset-0 focus:border-transparent hover:border-primary-500 focus:border-primary-500">
                        <SelectValue defaultValue={headerValue} />
                    </SelectTrigger>
                    <SelectContent className='w-full bg-white text-sm max-h-[200px] overflow-y-auto p-0 py-1'>
                        <SelectGroup className='p-0'>
                            {headerOptions.map((option) => <SelectItem key={option.value} className='text-sm text-secondary-50 py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]' value={option.value}>{option.label}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {headerValue === "text" &&
                    <div className="relative">
                        {addVariable && (
                            <div ref={containerRef} className='absolute top-[20px] left-0 w-full bg-white shadow-[0px_0px_11px_rgba(0,0,0,0.33)] max-h-[220px] overflow-y-auto'>
                                {variables.map((item: any) => (
                                    <div
                                        key={item._id}
                                        onClick={() => handleInsertVariable(item.variableName)}
                                        className='flex items-center justify-between text-sm px-2 py-2 hover:bg-[#f3f3f3] cursor-pointer'>
                                        <span className='text-secondary-50'>{item.variableName}</span>
                                        <span className='text-[#808080]'>{item.type}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <textarea
                            ref={textareaRef}
                            onKeyDown={handleKeyDown}
                            onChange={handleChangeText}
                            value={headerObject.value}
                            maxLength={60}
                            className='h-[60px] block w-full focus:outline-none resize-none py-2 px-3 text-sm my-2 text-secondary-50 border border-primary-50 rounded-lg' >

                        </textarea>
                        <div className='flex items-center justify-between text-[#808080]'>
                            <div className='text-[11px]'>Footer character limit is 60 characters</div>
                            <span className='text-[13px]'>{headerObject.value.length}</span>
                        </div>
                    </div>
                }
                {headerValue === "image" &&
                    <>
                        <div className="h-[64px] flex items-center p-3 my-2 w-full border bg-[#f8f8f8] border-primary-50 rounded-lg">
                            {!imageFile ?
                                (<label htmlFor="image" className="w-full h-full cursor-pointer flex items-center gap-5">
                                    <span>
                                        <ImageIcon size={24} className="text-primary-500" />
                                    </span>
                                    <p className="text-sm text-[#6d6d6d]">Upload an Image</p>
                                </label>)
                                : (<div className="w-full h-full text-sm flex items-center justify-between">
                                    <div>
                                        <div className="text-secondary-50">name</div>
                                        <span className="text-xs text-[#808080]">2.3MB</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-green-600 p-1 rounded-full bg-green-200">Uploaded</div>
                                        <span onClick={handleRemoveFile} className="cursor-pointer">
                                            <X size={16} />
                                        </span>
                                    </div>
                                </div>)
                            }
                            <input type="file" name="image" id="image" className="hidden" onChange={handleFileChange} accept="image/*" />
                        </div>
                    </>
                }
                {headerValue === "document" &&
                    <>
                        <div className="h-[64px] flex items-center p-3 my-2 w-full border bg-[#f8f8f8] border-primary-50 rounded-lg">
                            {!documentFile ?
                                (<label htmlFor="document" className="w-full h-full cursor-pointer flex items-center gap-5">
                                    <span>
                                        <ImageIcon size={24} className="text-primary-500" />
                                    </span>
                                    <p className="text-sm text-[#6d6d6d]">Upload Document</p>
                                </label>)
                                : (<div className="w-full h-full text-sm flex items-center justify-between">
                                    <div>
                                        <div className="text-secondary-50">name</div>
                                        <span className="text-xs text-[#808080]">2.3MB</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-green-600 p-1 rounded-full bg-green-200">Uploaded</div>
                                        <span onClick={handleRemoveFile} className="cursor-pointer">
                                            <X size={16} />
                                        </span>
                                    </div>
                                </div>)
                            }
                            <input type="file" name="document" id="document" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                        </div>
                    </>
                }
                {headerValue === "video" &&
                    <>
                        <div className="h-[64px] flex items-center p-3 my-2 w-full border bg-[#f8f8f8] border-primary-50 rounded-lg">
                            {!videoFile ?
                                (<label htmlFor="video" className="w-full h-full cursor-pointer flex items-center gap-5">
                                    <span>
                                        <ImageIcon size={24} className="text-primary-500" />
                                    </span>
                                    <p className="text-sm text-[#6d6d6d]">Upload an Video</p>
                                </label>)
                                : (<div className="w-full h-full text-sm flex items-center justify-between">
                                    <div>
                                        <div className="text-secondary-50">name</div>
                                        <span className="text-xs text-[#808080]">2.3MB</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-green-600 p-1 rounded-full bg-green-200">Uploaded</div>
                                        <span onClick={handleRemoveFile} className="cursor-pointer">
                                            <X size={16} />
                                        </span>
                                    </div>
                                </div>)
                            }
                            <input type="file" name="video" id="video" className="hidden" onChange={handleFileChange} accept="video/*" />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}