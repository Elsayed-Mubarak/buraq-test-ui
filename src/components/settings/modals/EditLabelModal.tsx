import React, { useEffect, useRef, useState } from 'react'
import Portal from '@/components/shared/Portal'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { Label } from '@/components/ui/label'
import ResuableButton from '@/components/shared/ReusableButton'
import { X } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateLabel as updateLabelApi } from '@/service/labelsServices'
import toast from 'react-hot-toast'
type Props = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedLabel: any,
    setSelectedLabel: any
}

export default function EditLabelModal({ isOpen, setIsOpen, selectedLabel, setSelectedLabel }: Props) {
    const queryClient = useQueryClient();
    const containerRef = useOutsideClick(() => setIsOpen(false))
    const [name, setName] = useState<string>('')
    const [error, setError] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const { mutate: updateLabel, isPending } = useMutation({
        mutationFn: ({ labelId, name }: { labelId: string, name: string }) => updateLabelApi(labelId, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["labels"] });
            toast.success("Label updated successfully");
            setIsOpen(false)
            setName("");
            setSelectedLabel(null)
        },
        onError: (error: any) => {
            toast.error(error);
            console.log(error)
        },
    });

    function handleUpdateLabel() {
        if (!name) return
        updateLabel({ labelId: selectedLabel._id, name });
    }
    function validateName(value: string) {
        return value.trim() !== '';
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value: string = e.target.value;
        setName(value)
        setError(!validateName(value));
    }
    function handleCloseModal() {
        setIsOpen(false)
        setName('');
        setError(false);
    }
    function handleError() {
        if (!name) {
            setError(true)
        } else {
            setError(false)
        }
    }
    useEffect(() => {
        setName(selectedLabel?.name)
        if (inputRef.current) inputRef.current.focus()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    useEffect(() => {
        return () => {
            setName('')
            setError(false)
            setSelectedLabel(null)
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
                        <div className='text-[#3a3a3a] text-xl font-semibold'>Update Label</div>
                        <span onClick={handleCloseModal}>
                            <X className='h-6 w-6 cursor-pointer text-[#6d6d6d]' />
                        </span>
                    </div>
                    <div className="p-6 border-b border-primary-50">
                        <div className="group">
                            <Label className={`group-focus-within:text-primary-500 text-sm block w-full mb-1 ${error ? 'text-[#f00]' : 'text-secondary-50 '}`}>Name</Label>
                            <input
                                value={name}
                                onChange={handleChange}
                                onBlur={handleError}
                                ref={inputRef}
                                className={`p-2 hover:border-primary-500 text-sm block w-full rounded-lg border focus:outline-none border-[#e4e4e4] focus:border-primary-500 ${error ? 'border-[#f00]' : 'border-primary-500'}`} type="text"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end py-5 px-6 items-center">
                        <ResuableButton onClick={handleUpdateLabel} disabled={(!name || isPending) ? true : false}>
                            {isPending ? <span className='w-5 h-5 rounded-full animate-spin border border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite'></span> : 'Update'}
                        </ResuableButton>
                    </div>
                </div>
            </div>
        </Portal>
    )
}