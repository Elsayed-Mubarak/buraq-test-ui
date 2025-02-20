import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ISelectITem } from '@/types/selectItem';
import React, { useState } from 'react';

interface Props {
    triggerName: string;
    data: ISelectITem[] | any[];
    onChange: (selectedValue: string | number) => void;
    label?: string;
    className?: string;
    footerMsg?: string;
}

function CustomSelect({ triggerName, data, label, className, footerMsg, onChange }: Props) {
    const [showSelectedItem, setShowSelectedItem] = useState<string>("");

    const handleChange = (selectedValue: string | number) => {
        setShowSelectedItem(selectedValue as string);
        onChange?.(selectedValue);
    };

    return (
        <div className={className}>
            {label && <h3 className='text-sm font-light text-nodeSettings'>{label}</h3>}
            <Select onValueChange={handleChange}>
                <SelectTrigger className='ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent capitalize'>
                    {showSelectedItem || triggerName}
                </SelectTrigger>
                <SelectContent className="bg-white">
                    {data.map((item) => (
                        <SelectItem key={item.id} value={item.value as string || item.format as string} className='capitalize text-nodeSettings'>
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {footerMsg && <p className='text-xs text-gray-500 mt-1'>{footerMsg}</p>}
        </div>
    );
}

export default CustomSelect;
