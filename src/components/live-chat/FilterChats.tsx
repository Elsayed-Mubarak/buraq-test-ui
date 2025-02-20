import { Plus } from 'lucide-react'
import React from 'react'
import ReusableCombobox from "@/components/shared/ReusableCombobox"
import ReusableCancelButton from '../shared/ReusableCancelButton'
import ReusableButton from '../shared/ReusableButton'
import FilterRow from './FilterRow'
import { useOutsideClick } from '@/hooks/useOutsideClick'

type Props = {
    openFilter: boolean;
    setOpenFilter: any;
}

export default function FilterChats({ openFilter, setOpenFilter }: Props) {
    const containerRef = useOutsideClick(() => setOpenFilter(false))

    if (!openFilter) return null;
    return (
        <div ref={containerRef} className='fixed z-[999] top-16 left-[320px] bg-white rounded-lg max-w-[800px] border border-[#e8e9ef] shadow-[1px_1px_20px_0px_rgba(0,0,0,0.16)]'>
            <div>
                <div className='pt-8 pb-4 px-8 border-b border-[#cdcdcd]'>
                    <div className="grid items-center gap-4 text-sm text-secondary-50 min-h-[45px] grid-cols-[100px_155px_160px_199px] mb-4">
                        <div className="text-end">Where</div>
                        <div>
                            <ReusableCombobox />
                        </div>
                        <div>
                            <ReusableCombobox />
                        </div>
                        <div>
                            <ReusableCombobox />
                        </div>
                    </div>
                    <FilterRow />
                    <button className="flex items-center gap-2 text-primary-500 text-sm">
                        <span><Plus size={12} /></span>
                        <span>Add condition</span>
                    </button>
                </div>
                <div className='flex items-center justify-between px-8 py-6'>
                    <div>
                        <ReusableCancelButton onClick={() => { }}>Save view</ReusableCancelButton>
                    </div>
                    <div className='flex items-center gap-4'>
                        <ReusableCancelButton onClick={() => { }}>Reset</ReusableCancelButton>
                        <ReusableButton onClick={() => { }}>Apply filter</ReusableButton>
                    </div>
                </div>
            </div>
        </div>
    )
}