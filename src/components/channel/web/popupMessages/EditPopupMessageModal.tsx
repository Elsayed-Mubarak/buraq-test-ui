import Portal from "@/components/shared/Portal"
import ReusableButton from "@/components/shared/ReusableButton"
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { updatePopupMessage } from "@/service/popupMessagesServices";
import { formatFileSize } from "@/utils/formatFileSize";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageIcon, Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "@/components/shared/EmojiPicker"
import toast from "react-hot-toast";
type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedPopupMessage: any
    setSelectedPopupMessage: any
}

export default function EditPopupMessageModal({ isOpen, setIsOpen, selectedPopupMessage,
    setSelectedPopupMessage }: Props) {
    const queryClient = useQueryClient()
    const [url, setUrl] = useState("")
    const [fileName, setFileName] = useState("")
    const [mediaFile, setMediaFile] = useState<File | null>(null)
    const [message, setMessage] = useState("")
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const containerRef = useOutsideClick(() => setIsOpen(false))
    const mediaFileRef = useRef<HTMLInputElement | null>(null);


    const { mutate: editPopupMessage, isPending } = useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => updatePopupMessage(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["popupMessages"] })
            setIsOpen(false)
            toast.success("Pop-up message updated successfully")
            setSelectedPopupMessage(null)
        },
        onError: (error) => {
            console.error("Error creating popup message:", error)
        }
    })

    function handleMediaFileChange(e: any) {
        const file = e.target.files[0];
        if (file) {
            setMediaFile(file);
        }
    }
    function handleDeleteMediaFile() {
        setMediaFile(null)
        if (mediaFileRef.current) {
            mediaFileRef.current.value = "";
        }
    };

    function handleEditPopupMessage() {
        const formData = new FormData();
        formData.append("url", url);
        formData.append("message", message);
        if (mediaFile) {
            formData.append("filename", fileName);
            formData.append("file", mediaFile);
        }
        editPopupMessage({ id: selectedPopupMessage._id, data: formData })
    }

    useEffect(() => {
        setUrl(selectedPopupMessage?.include)
        setMessage(selectedPopupMessage?.messages)
        setFileName(selectedPopupMessage?.name)
    }, [selectedPopupMessage, isOpen])


    useEffect(() => {
        return () => {
            setUrl("")
            setMessage("")
            setFileName("")
            setMediaFile(null)
            setSelectedPopupMessage(null)
            setOpenEmojiPicker(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleSelectEmoji(emoji: any) {
        setMessage(prev => prev + emoji.native)
        setOpenEmojiPicker(false)
    }
    if (!isOpen) return null
    return (
        <Portal>
            <div className="fixed z-[999] flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.16)]">
                <div ref={containerRef} className="bg-white w-[360px] rounded-xl">
                    <div className="flex items-center justify-between border-b border-primary-50 py-5 px-6">
                        <div className="text-[#3a3a3a] text-xl font-semibold">Edit Pop-up Message</div>
                        <span>
                            <X className="h-6 w-6 cursor-pointer text-[#6d6d6d]" onClick={() => setIsOpen(false)} />
                        </span>
                    </div>
                    <div className="py-5 px-6">
                        <div className="group mb-2">
                            <label className="block text-secondary-50 text-sm group-focus-within:text-primary-500" htmlFor="url">URL</label>
                            <input
                                type="text"
                                className="block w-full text-sm text-black rounded-lg bg-white p-2 border border-primary-50 focus:outline-none focus:border-primary-500 hover:border-primary-500"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://"
                            />
                            <p className="text-[#808080] text-[11px]">Enter the page URL or use regex</p>
                        </div>
                        <div className="mb-4">
                            <label className="text-secondary-50 text-sm">Message</label>
                            <div className=" relative h-[160px] border border-primary-50 rounded-lg">
                                {openEmojiPicker && <div className="absolute top-[40px] right-0 h-[290px] w-fit overflow-hidden shadow-lg rounded-lg">
                                    <EmojiPicker onEmojiSelect={handleSelectEmoji} />
                                </div>}
                                <div className="bg-[#f3f3f3] p-2 h-[40px] rounded-t-lg flex items-center justify-between">
                                    <span>B</span>
                                    <span onClick={() => setOpenEmojiPicker(prev => !prev)} className="cursor-pointer select-none"><Smile size={20} /></span>
                                </div>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="text-sm rounded-b-lg text-secondary-50 py-2 px-3 h-[118px] w-full border-none outline-none focus:outline-none resize-none bg-white"></textarea>
                            </div>
                        </div>
                        <div>
                            <label className="text-secondary-50 text-sm">Media</label>
                            <div className="h-[64px] flex items-center p-3 w-full border bg-[#f8f8f8] border-[#e4e4e4] rounded-lg">
                                {(fileName && !mediaFile) && <div className="flex items-center gap-2">
                                    <span onClick={() => setFileName("")} className="w-[26px] h-[26px] flex items-center justify-center rounded-full border-[2px] border-[#B8BEC1]">
                                        <X size={16} className="cursor-pointer text-[#6d6d6d] text-sm" />
                                    </span>
                                    <span className="text-sm text-secondary-50">{fileName}</span>
                                </div>}
                                {(!fileName && !mediaFile) && <label htmlFor="widgetIcon" className="w-full h-full cursor-pointer flex items-center gap-5">
                                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                        <ImageIcon size={20} className="text-primary-500" />
                                    </span>
                                    <p className="text-sm text-[#6d6d6d]">Upload an Image</p>
                                </label>}

                                {(!fileName && mediaFile) && <div className="w-full h-full text-sm flex items-center justify-between gap-2">
                                    <div className="max-w-[100px]">
                                        <div className="text-secondary-50 truncate">{mediaFile.name}</div>
                                        <span className="text-xs text-[#808080]">{formatFileSize(mediaFile.size)}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-green-600 p-1 text-sm rounded-full bg-green-200">Uploaded</div>
                                        <span onClick={handleDeleteMediaFile} className="cursor-pointer">
                                            <X size={16} />
                                        </span>
                                    </div>
                                </div>}

                                <input onChange={handleMediaFileChange} ref={mediaFileRef} type="file" name="widgetIcon" id="widgetIcon" className="hidden" accept="image/*" />
                            </div>
                            <p className="text-[#808080] text-[11px]">Upload an image, gif, or video with recommended size of 240 x 40</p>
                        </div>
                    </div>
                    <div className="py-5 px-6 flex items-center justify-end border-t border-primary-50">
                        <ReusableButton disabled={!url || !message || isPending} onClick={handleEditPopupMessage}>Update</ReusableButton>
                    </div>
                </div>
            </div>
        </Portal>
    )
}