import React, { useState } from 'react'
import { IView } from './modals/CreateViewModal';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronDown } from 'lucide-react';

type Props = {
    viewsFields: IView[] | undefined;
    field: string
    setField: any
    operator: string
    setOperator: any
    operatorArray: any
    setOperatorArray: any
}

export default function FieldAndOperator({ viewsFields, field, operator, setField, setOperator, setOperatorArray, operatorArray }: Props) {
    const [open, setOpen] = useState(false)
    const [openOperator, setOpenOperator] = useState(false)
    function handleSelectField(field: IView) {
        if (field.key == "Date") {
            setField(field?.key)
            setOperatorArray(["is within"])
            setOperator("is within")
            setOpen(false)
            return
        }
        setField(field?.key)
        setOperator(field.operators[0])
        setOperatorArray(field.operators)
        setOpen(false)
    }
    function handleSelectValue(value: string) {
        setOperator(value)
        setOpenOperator(false)
    }

    return (
        <div className='grid grid-cols-[155px_160px] w-[335px] gap-4'>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button className={`w-[155px] flex items-center justify-between p-2 h-8 text-sm border  rounded-lg text-[#3a3a3a] ${open ? "border-primary-500" : "border-primary-50"}`}>
                        <span>{field}</span>
                        <ChevronDown className={`w-4 h-4 transition-all duration-200 ${open ? 'rotate-180' : ''}`} />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="bg-white w-[155px] z-[9999] p-0">
                    <div className='p-3 w-[155px] border-b border-primary-50'>
                        <input
                            type="text"
                            placeholder='Search...'
                            className='w-full h-[30px] rounded-lg border border-[#e4e4e4] hover:border-primary-500 focus:border-primary-500 focus:shadow-[#e9e9fd_0px_0px_0px_2px] focus:outline-none py-[2px] px-2 text-sm text-black' />
                    </div>
                    <div className='h-[250px] overflow-y-auto'>
                        {viewsFields && viewsFields.map((item, index) => <div
                            onClick={() => handleSelectField(item)}
                            key={index}
                            className='flex items-center justify-between py-2 px-3 bg-white cursor-pointer text-secondary-50 text-sm hover:bg-[#f3f3f3]'>
                            <span>{item.key}</span>
                            {item.key === field && <span><Check className='text-primary-500 w-4 h-4' /></span>}
                        </div>)}
                    </div>
                </PopoverContent>
            </Popover>
            {field !== "Date" && <Popover open={openOperator} onOpenChange={setOpenOperator}>
                <PopoverTrigger asChild>
                    <button className={`w-[160px] flex items-center justify-between p-2 h-8 text-sm border  rounded-lg text-[#3a3a3a] ${openOperator ? "border-primary-500" : "border-primary-50"}`}>
                        <span>{operator}</span>
                        <ChevronDown className={`w-4 h-4 transition-all duration-200 ${openOperator ? 'rotate-180' : ''}`} />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="bg-white w-[160px] z-[9999] p-0">
                    <div className='max-h-[250px] overflow-y-auto'>
                        {operatorArray && operatorArray.map((item: any, index: number) =>
                            <div
                                onClick={() => handleSelectValue(item)}
                                key={index}
                                className='flex items-center justify-between py-2 px-3 bg-white cursor-pointer text-secondary-50 text-sm hover:bg-[#f3f3f3]'>
                                <span>{item}</span>
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>}
            {field === "Date" && <div>
                <button className={`w-[160px] bg-[#f3f3f3] flex items-center justify-between p-2 h-8 text-sm border  rounded-lg text-[#6d6d6d] border-primary-50 cursor-default`}>
                    <span>is within</span>
                    <ChevronDown className={`w-4 h-4`} />
                </button>
            </div>}
        </div>
    )
}