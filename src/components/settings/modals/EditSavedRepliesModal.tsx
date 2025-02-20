import React, { useEffect, useRef, useState } from 'react'
import Portal from '@/components/shared/Portal'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import toast from 'react-hot-toast'
import ResuableButton from '@/components/shared/ReusableButton'
import { File, X } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSavedReply as createSavedReplyApi } from '@/service/savedReplies'
import { Label } from '@/components/ui/label'
type Props = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedSavedReply: any
    setSelectedSavedReply: React.Dispatch<React.SetStateAction<any>>
}

export default function EditSavedRepliesModal({ isOpen, setIsOpen, selectedSavedReply, setSelectedSavedReply }: Props) {
    const queryClient = useQueryClient();
    const containerRef = useOutsideClick(() => handleCloseModal())
    const [name, setName] = useState<string>('')
    const [reply, setReply] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)
    const [nameError, setNameError] = useState(false)
    const [replyError, setReplyError] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const { mutate: updateSavedReply, isPending } = useMutation({
        mutationFn: createSavedReplyApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["saved-replies"] });
            toast.success("Saved reply created successfully");
            setIsOpen(false)
            setName("");
        },
        onError: (error: any) => {
            toast.error(error);
            console.log(error)
        },
    });

    function editSavedReply() {
        if (!name || !reply) return
        updateSavedReply({ title: name, reply });
    }
    function validateName(value: string) {
        return value.trim() !== '';
    }
    function validateReply(value: string) {
        return value.trim() !== '';
    }
    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value: string = e.target.value;
        setName(value)
        setNameError(!validateName(value));
    }
    function handleReplyChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const value: string = e.target.value;
        setReply(value)
        setReplyError(!validateReply(value));
    }
    function handleCloseModal() {
        setIsOpen(false)
        setName('');
        setReply('');
        setFile(null);
        setNameError(false);
        setReplyError(false);
    }

    function handleNameError() {
        if (!name) {
            setNameError(true)
        } else {
            setNameError(false)
        }
    }
    function handleReplyError() {
        if (!name) {
            setReplyError(true)
        } else {
            setReplyError(false)
        }
    }

    useEffect(() => {
        setName(selectedSavedReply?.title);
        setReply(selectedSavedReply?.reply);
        if (inputRef.current) inputRef.current?.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])
    useEffect(() => {
        return () => {
            if (isOpen) {
                setIsOpen(false);
            }
            setName('');
            setReply('');
            setFile(null);
            setNameError(false);
            setReplyError(false);
            setSelectedSavedReply(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!isOpen) return null
    return (
        <Portal>
            <div role="dialog"
                aria-labelledby="create-label-title" className="fixed z-[999] flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.16)]">
                <div ref={containerRef} className='w-[360px] bg-white rounded-xl'>
                    <div className='py-5 px-6 flex items-center justify-between border-b border-[#e4e4e4]'>
                        <div className='text-[#3a3a3a] text-xl font-semibold'>Update Saved Reply</div>
                        <span onClick={handleCloseModal}>
                            <X className='h-6 w-6 cursor-pointer text-[#6d6d6d]' />
                        </span>
                    </div>
                    <div className="p-6 border-b border-primary-50">
                        <div className="group mb-3">
                            <Label className={`group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1 ${nameError ? 'text-[#f00]' : ''}`}>Name</Label>
                            <input
                                value={name}
                                onChange={handleNameChange}
                                onBlur={handleNameError}
                                ref={inputRef}
                                placeholder="Mention Title"
                                className={`p-2 hover:border-primary-500 text-sm block w-full rounded-lg border border-[#e4e4e4] focus:outline-none focus:border-primary-500 ${nameError ? 'border-[#f00]' : ''}`} type="text" />

                        </div>
                        <div className="group mb-3">
                            <Label className={`group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1 ${replyError ? 'text-[#f00]' : ''}`}>Reply</Label>
                            <textarea
                                value={reply}
                                onChange={handleReplyChange}
                                onBlur={handleReplyError}
                                placeholder="Write Message"
                                className={`resize-none p-2 h-[70px] hover:border-primary-500 text-sm block w-full rounded-lg border border-[#e4e4e4] focus:outline-none focus:border-primary-500 ${replyError ? 'border-[#f00]' : ''}`} ></textarea>
                        </div>
                        <div>
                            <Label className="text-sm text-secondary-50 block w-full mb-1">Media</Label>
                            <input className="hidden" type="file" name="media" id="media" />
                            <label htmlFor="media" className="cursor-pointer p-3 h-[65px]  text-sm flex items-center gap-5 w-full bg-[#f8f8f8] rounded-lg border border-[#e4e4e4]">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <File size={20} className="text-primary-500" />
                                </div>
                                <div className="text-sm text-[#6d6d6d]">Upload an image.gif or video</div>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end py-5 px-6 items-center">
                        <ResuableButton onClick={editSavedReply} disabled={isPending || !name || !reply}>
                            {isPending ? <span className='w-5 h-5 rounded-full animate-spin border border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite'></span> : 'Update'}
                        </ResuableButton>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

