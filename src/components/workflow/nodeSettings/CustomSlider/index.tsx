import { ChangeEvent } from 'react';
import './index.css'

interface Props {
    onChange: (...props: any[]) => void;
    value: number;
}

function CustomSlider({ value, onChange }: Props) {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
    }

    return (
        <div className="flex flex-col gap-2 my-4">
            <div className="flex items-center justify-between">
                <p className='text-sm text-gray-500'>Temprature</p>
                <p className='text-sm text-gray-500'>{value as number}</p>
            </div>
            <input
                type="range"
                className="custom-slider mt-2"
                max={1}
                min={0}
                step={0.05}
                value={value}
                onChange={handleChange}
            />
            <div className="flex justify-between w-full items-center text-xs text-gray-600">
                <span>0</span>
                <span>1</span>
            </div>
        </div>
    )
}

export default CustomSlider;