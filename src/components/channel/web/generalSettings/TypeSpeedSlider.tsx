"use client"
import Slider from '@mui/material/Slider';
import ReusableCheckbox from "@/components/shared/ReusableCheckbox"
import { useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
type Props = {
    enableTypeSpeed: any
    setEnableTypeSpeed: any
    typeSpeed: any
    setTypeSpeed: any
}
const marks = [
    {
        value: 20,
        label: 'Slow',
    },
    {
        value: 40,
        label: '',
    },
    {
        value: 60,
        label: '',
    },
    {
        value: 80,
        label: '',
    },
    {
        value: 100,
        label: 'Fast',
    },
];

const IOSSlider = styled(Slider)(({ theme }) => ({
    color: '#343de6',
    height: 3,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
        height: 16,
        width: 16,
        borderRadius: '50%',
        border: "1px solid #343de6",
        backgroundColor: '#fff',
        boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
        '&:focus, &:hover, &.Mui-active': {
            boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
        },
        '&:before': {
            boxShadow:
                '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
        },
    },
    '& .MuiSlider-valueLabel': {
        fontSize: 10,
        fontWeight: 'normal',
        top: -6,
        backgroundColor: 'unset',
        color: "#808080",
        '&::before': {
            display: 'none',
        },
        '& *': {
            background: 'transparent',
            color: '#808080',
            ...theme.applyStyles('dark', {
                color: '#fff',
            }),
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
        height: 3,
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        boxShadow: 'inset 0px 0px 4px -2px #000',
        backgroundColor: '#d0d0d0',
    },
    ...theme.applyStyles('dark', {
        color: '#343de6',
    }),
}));
export default function TypeSpeedSlider({ enableTypeSpeed,
    setEnableTypeSpeed,
    typeSpeed,
    setTypeSpeed }: Props) {
    return (
        <div className="select-none">
            <ReusableCheckbox size="small" label="Typing speed" labelColor="#092445" isChecked={enableTypeSpeed} setIsChecked={setEnableTypeSpeed} />
            {enableTypeSpeed && <div className='ml-7 w-[300px]'>
                <IOSSlider
                    min={20}
                    max={100}
                    value={typeSpeed}
                    onChange={(e, newValue) => setTypeSpeed((newValue as number))}
                    step={20}
                    marks={marks}
                />
            </div>}
        </div>
    )
}