import React, { useEffect } from 'react'
import Portal from '@/components/shared/Portal'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import ReusableButton from '@/components/shared/ReusableButton'
import { X } from 'lucide-react'
import ReusableCancelButton from '@/components/shared/ReusableCancelButton'

type Props = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedSavedReply: any,
    setSelectedSavedReply: React.Dispatch<React.SetStateAction<any>>
    deleteSavedReply: (SavedReplyId: string) => void,
    isPending: boolean
}

export default function DeleteSavedReplyModal({ isOpen, setIsOpen, selectedSavedReply, setSelectedSavedReply, deleteSavedReply, isPending }: Props) {
    const containerRef = useOutsideClick(() => setIsOpen(false))

    function handleClose() {
        setIsOpen(false)
        setSelectedSavedReply(null)
    }

    useEffect(() => {
        return () => setSelectedSavedReply(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (!isOpen) return null
    return (
        <Portal>
            <div role="dialog"
                aria-labelledby="create-label-title" className="fixed z-[999] flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.16)]">
                <div ref={containerRef} className='w-[360px] bg-white rounded-xl'>
                    <div className='py-5 px-6 flex items-center justify-between border-b border-[#e4e4e4]'>
                        <div className='text-[#3a3a3a] text-xl font-semibold'>Delete Saved Reply</div>
                        <span onClick={handleClose}>
                            <X className='h-6 w-6 cursor-pointer text-[#6d6d6d]' />
                        </span>
                    </div>
                    <div className="p-6 border-b border-primary-50">
                        <div className='text-[13px]'>Are you sure you want to delete the saved reply titled '{selectedSavedReply?.title ?? "UnKown"}' ?</div>
                    </div>
                    <div className="flex justify-end py-5 px-6 items-center">
                        <div className='flex items-center gap-3'>
                            <ReusableCancelButton onClick={handleClose}>Cancel</ReusableCancelButton>
                            <ReusableButton className='bg-[#f00] hover:bg-[#ed2b2b]' onClick={() => deleteSavedReply(selectedSavedReply._id)} disabled={isPending}>
                                {isPending ? <span className='w-5 h-5 rounded-full animate-spin border border-solid border-[#f00] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite'></span> : 'Delete'}
                            </ReusableButton>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}