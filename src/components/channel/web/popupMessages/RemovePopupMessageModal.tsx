import Portal from "@/components/shared/Portal"
import ReusableButton from "@/components/shared/ReusableButton"
import ReusableCancelButton from "@/components/shared/ReusableCancelButton";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { deletePopupMessage } from "@/service/popupMessagesServices";
import { formatFileSize } from "@/utils/formatFileSize";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedPopupMessage: any
    setSelectedPopupMessage: any
}

export default function RemovePopupMessageModal({ isOpen, setIsOpen, selectedPopupMessage,
    setSelectedPopupMessage }: Props) {
    const queuryClient = useQueryClient()
    const containerRef = useOutsideClick(() => setIsOpen(false))
    const { mutate: removePopupMessage, isPending } = useMutation({
        mutationFn: deletePopupMessage,
        onSuccess: () => {
            queuryClient.invalidateQueries({ queryKey: ['popupMessages'] })
            setIsOpen(false)
            setSelectedPopupMessage(null)
            toast.success("Pop-up message deleted successfully")
        },
        onError: (error: any) => {
            console.error("Error deleting popup message:", error)
        }
    })

    useEffect(() => {
        return () => setSelectedPopupMessage(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleDeletePopupMessage() {
        removePopupMessage(selectedPopupMessage._id)
    }
    if (!isOpen) return null
    return (
        <Portal>
            <div className="fixed z-[999] flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.16)]">
                <div ref={containerRef} className="bg-white w-[480px] rounded-xl">
                    <div className="flex items-center justify-between border-b border-primary-50 py-5 px-6">
                        <div className="text-[#3a3a3a] text-xl font-semibold">Remove Pop-up Message</div>
                        <span>
                            <X className="h-6 w-6 cursor-pointer text-[#6d6d6d]" onClick={() => setIsOpen(false)} />
                        </span>
                    </div>
                    <div className="py-5 px-6">
                        <div className="text-[13px]">Are you sure you want to remove the pop-up message on {selectedPopupMessage?.include}</div>
                    </div>
                    <div className="py-5 px-6 flex items-center justify-end gap-3 border-t border-primary-50">
                        <ReusableCancelButton onClick={() => setIsOpen(false)}>Cancel</ReusableCancelButton>
                        <ReusableButton disabled={isPending} className="bg-[#f00] hover:bg-[#ed2b2b]" onClick={handleDeletePopupMessage}>Delete</ReusableButton>
                    </div>
                </div>
            </div>
        </Portal>
    )
}