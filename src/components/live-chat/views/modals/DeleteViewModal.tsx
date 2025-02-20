import Portal from "@/components/shared/Portal"
import { X } from "lucide-react"
import ReusableButton from "@/components/shared/ReusableButton"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import ReusableCancelButton from "@/components/shared/ReusableCancelButton"
type Props = {
    openDeleteView: boolean;
    setOpenDeleteView: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateViewModal({ openDeleteView, setOpenDeleteView }: Props) {
    const deleteViewRef = useOutsideClick(() => setOpenDeleteView(false))
    if (!openDeleteView) return null;
    return (
        <Portal>
            <div className="fixed z-[999] flex items-center justify-center top-0 left-0 right-0 bottom-0 w-full h-full bg-[rgba(0,0,0,0.16)]">
                <div ref={deleteViewRef} className="bg-white max-w-[400px] w-full rounded-xl relative">
                    <div className="flex items-center justify-between py-5 px-6 border-b border-primary-50">
                        <div className="text-[#3a3a3a] text-xl font-semibold">Create View</div>
                        <button onClick={() => setOpenDeleteView(false)}>
                            <span>
                                <X className="text-[#6d6d6d]" size={24} />
                            </span>
                        </button>
                    </div>

                    <div className="py-4 text-[13px] px-6 border-b border-primary-50">
                        Are you sure you want to delete the view 'Name' ?
                    </div>
                    <div className="py-4 px-6 flex items-center gap-3 justify-end">
                        <ReusableCancelButton onClick={() => setOpenDeleteView(false)}>Cancel</ReusableCancelButton>
                        <ReusableButton className="bg-[#f00] text-white hover:bg-[#ed2b2b]" onClick={() => { }} disabled={false}>Delete</ReusableButton>
                    </div>
                </div>
            </div>
        </Portal>
    )
}