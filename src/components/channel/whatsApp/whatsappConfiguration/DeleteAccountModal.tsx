import Portal from "@/components/shared/Portal"
import ReusableCancelButton from "@/components/shared/ReusableCancelButton"
import ReusableButton from "@/components/shared/ReusableButton"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import { X } from "lucide-react"

type Props = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleDeleteAccount: () => void,
    isLoading: boolean
}

export default function DeleteAccountModal({ isOpen, setIsOpen, handleDeleteAccount, isLoading }: Props) {
    const containerRef = useOutsideClick(() => setIsOpen(false))
    if (!isOpen) return null
    return (
        <Portal>
            <div className="fixed z-[999] flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.16)]">
                <div ref={containerRef} className="bg-white w-[480px] rounded-xl">
                    <div className="flex items-center justify-between border-b border-primary-50 py-5 px-6">
                        <div className="text-[#3a3a3a] text-xl font-semibold">Delete WhatsApp Business account</div>
                        <span>
                            <X className="h-6 w-6 cursor-pointer text-[#6d6d6d]" onClick={() => setIsOpen(false)} />
                        </span>
                    </div>
                    <div className="py-5 px-6">
                        <div className="text-[13px]">Are you sure you want to remove this WhatsApp Business account this action cannot be undone </div>
                    </div>
                    <div className="py-5 px-6 flex items-center justify-end gap-3 border-t border-primary-50">
                        <ReusableCancelButton onClick={() => setIsOpen(false)}>Cancel</ReusableCancelButton>
                        <ReusableButton disabled={isLoading} className="bg-[#f00] hover:bg-[#ed2b2b]" onClick={handleDeleteAccount}>Delete</ReusableButton>
                    </div>
                </div>
            </div>
        </Portal>
    )
}