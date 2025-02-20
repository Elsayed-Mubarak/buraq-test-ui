import ReusableCheckbox from '@/components/shared/ReusableCheckbox';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getViewsValues } from '@/service/viewsServices';
import { Item } from '@radix-ui/react-dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'

type Props = {
    value: string;
    setValue: any
    field: string
}

interface IAssingeeValue {
    id: string,
    firstName: string,
    lastName: string,
    _id: string,
    userName: string
}

export default function ViewValue({ field }: Props) {
    const { data: viewValues } = useQuery<IAssingeeValue[]>({
        queryKey: ["view-values", field],
        queryFn: () => getViewsValues(field),
        enabled: !!field
    })

    const [open, setOpen] = useState(false)
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const [serachQuery, setSearchQuery] = useState("")
    function handleSelectValue(value: string) {
        if (value === "all") {
            if (selectedValues.includes("all")) {
                setSelectedValues([])
            } else {
                const allValues = viewValues?.map((item: IAssingeeValue) => item._id) ?? []
                setSelectedValues([...allValues, "all", "00000", "11111", "22222"])
            }
            return
        }
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter((item: any) => item !== value))
        } else {
            setSelectedValues([...selectedValues, value])
        }
    }

    let displayedValues: IAssingeeValue[] = []
    if (viewValues && serachQuery) {
        displayedValues = viewValues.filter((item: IAssingeeValue) => item.userName.toLowerCase().includes(serachQuery.toLowerCase()))
    } else {
        displayedValues = viewValues ?? []
    }

    useEffect(() => {
        setSearchQuery("")
    }, [open])

    return (
        <div>
            <Popover open={open} onOpenChange={() => setOpen(!open)}>
                <PopoverTrigger asChild className="w-[199px]">
                    <Button variant="outline" className="flex items-center justify-between h-8 hover:bg-white">
                        <span className={`${selectedValues.length > 0 ? "text-secondary-50" : "text-[#808080]"}`}>
                            {selectedValues.length > 0 ? `${selectedValues.length} Assignee selected` : "Select"}
                        </span>
                        <ChevronDown className={`${open ? "rotate-180" : ""} transition-all duration-300`} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[199px] bg-white p-0 z-[9999]">
                    <div className='max-h-[200px] overflow-y-auto'>
                        <div className="p-3 border-b">
                            <div className="relative max-w-[199px] h-9 w-full">
                                <input
                                    value={serachQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="peer block w-full text-sm  h-full pl-8 border border-primary-50 rounded-lg outline-0 hover:border-primary-600 focus:border-primary-600"
                                    type="text"
                                />
                                <span className="text-[#808080] peer-focus:text-primary-600">
                                    <Search className="w-4 h-4 absolute top-[50%] left-2  translate-y-[-50%]" />
                                </span>
                            </div>
                        </div>
                        <div>
                            <div onClick={() => handleSelectValue("all")} className="py-3 px-4 flex items-center gap-2 hover:bg-[#f3f3f3] cursor-pointer text-secondary-50 text-sm truncate max-w-[178px">
                                <ReusableCheckbox size="small" isChecked={selectedValues.length === (viewValues?.length ?? 0) + 4} setIsChecked={() => handleSelectValue("all")} />
                                <span>Select All</span>
                            </div>
                            <div onClick={() => handleSelectValue("00000")} className="py-3 px-4 flex items-center gap-2 hover:bg-[#f3f3f3] cursor-pointer text-secondary-50 text-sm truncate max-w-[178px">
                                <ReusableCheckbox size="small" isChecked={selectedValues.includes("00000")} setIsChecked={() => handleSelectValue("00000")} />
                                <span>None</span>
                            </div>
                            {displayedValues && displayedValues.length > 0 && displayedValues.map((item: IAssingeeValue) => (
                                <div key={item._id} onClick={() => handleSelectValue(item._id)} className="py-3 px-4 flex items-center gap-2 hover:bg-[#f3f3f3] cursor-pointer text-secondary-50 text-sm truncate max-w-[178px">
                                    <ReusableCheckbox size="small" isChecked={selectedValues.includes(item._id)} setIsChecked={() => handleSelectValue(item._id)} />
                                    <span>{item.userName}</span>
                                </div>
                            ))}
                            <div onClick={() => handleSelectValue("22222")} className="py-3 px-4 flex items-center gap-2 hover:bg-[#f3f3f3] cursor-pointer text-secondary-50 text-sm truncate max-w-[178px">
                                <ReusableCheckbox size="small" isChecked={selectedValues.includes("22222")} setIsChecked={() => handleSelectValue("22222")} />
                                <span>Bot</span>
                            </div>
                            <div onClick={() => handleSelectValue("11111")} className="py-3 px-4 flex items-center gap-2 hover:bg-[#f3f3f3] cursor-pointer text-secondary-50 text-sm truncate max-w-[178px">
                                <ReusableCheckbox size="small" isChecked={selectedValues.includes("11111")} setIsChecked={() => handleSelectValue("11111")} />
                                <span>Automation</span>
                            </div>
                        </div>

                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}