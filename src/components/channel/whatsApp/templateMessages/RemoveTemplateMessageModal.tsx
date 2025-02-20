import Portal from "@/components/shared/Portal"
import ReusableButton from "@/components/shared/ReusableButton"
import ReusableCancelButton from "@/components/shared/ReusableCancelButton";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { deleteTemplate } from "@/service/templateServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedTemplate: any
    setSelectedTemplate: any
}

export default function RemoveTemplateMessageModal({ isOpen, setIsOpen, selectedTemplate,
    setSelectedTemplate }: Props) {
    const queryClient = useQueryClient();
    const containerRef = useOutsideClick(() => setIsOpen(false))
    const { mutate: removeTemplate, isPending: isRemovePending } = useMutation({
        mutationFn: deleteTemplate,
        onSuccess: () => {
            toast.success("Template deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["allTemplates"] });
            setSelectedTemplate(null);
            setIsOpen(false);
        },
        onError: (error) => {
            console.log(error);
        }
    });

    function handleRemoveTemplate() {
        removeTemplate(selectedTemplate._id);

    }

    useEffect(() => {
        return () => setSelectedTemplate(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (!isOpen) return null
    return (
        <Portal>
            <div className="fixed z-[999] flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.16)]">
                <div ref={containerRef} className="bg-white w-[360px] rounded-xl">
                    <div className="flex items-center justify-between border-b border-primary-50 py-5 px-6">
                        <div className="text-[#3a3a3a] text-xl font-semibold">Delete Template</div>
                        <span>
                            <X className="h-6 w-6 cursor-pointer text-[#6d6d6d]" onClick={() => setIsOpen(false)} />
                        </span>
                    </div>
                    <div className="py-5 px-6">
                        <div className="text-[13px]">Are you sure you want to delete this template? This action cannot be undone.</div>
                    </div>
                    <div className="py-5 px-6 flex items-center justify-end gap-3 border-t border-primary-50">
                        <ReusableCancelButton onClick={() => setIsOpen(false)}>Cancel</ReusableCancelButton>
                        <ReusableButton disabled={isRemovePending} className="bg-[#f00] hover:bg-[#ed2b2b]" onClick={handleRemoveTemplate}>Remove</ReusableButton>
                    </div>
                </div>
            </div>
        </Portal>
    )
}