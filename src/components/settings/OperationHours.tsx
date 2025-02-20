"use client"
import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ReusableCheckbox from "@/components/shared/ReusableCheckbox";

function formatTime(value: number) {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const period = hours < 12 ? 'AM' : 'PM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${period}`;
}

interface OperationHoursProps {
    day: string;
    isChecked: boolean;
    setIsChecked: (checked: boolean) => void;
    range: number[];
    setRange: (range: number[]) => void;
    activeHumanHandover: boolean
}

export default function OperationHours({ day, isChecked, setIsChecked, range, setRange, activeHumanHandover }: OperationHoursProps) {
    const handleRangeChange = (event: Event, newValue: number | number[]) => {
        setRange(newValue as number[]);
    };

    return (
        <div>
            <div className="flex items-center gap-2">
                <div className='w-[120px]'>
                    <ReusableCheckbox
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                        label={day}
                        fontSize="14px"
                        labelColor="#092445"
                        disabled={!activeHumanHandover}
                        size="small"
                    />
                </div>
                {isChecked ? <div className="text-sm text-[#808080]">({formatTime(range[0])} - {formatTime(range[1])})</div> : <div className='text-sm text-[#808080]'>(Closed all day)</div>}
            </div>
            <div className="w-[520px] ps-8">
                {isChecked ? <Slider
                    disabled={!activeHumanHandover}
                    value={range}
                    onChange={handleRangeChange}
                    min={0}
                    max={1439}
                    step={30}
                    size="small"
                    sx={{
                        color: '#343de6',
                        '& .MuiSlider-thumb': {
                            backgroundColor: '#ffffff',
                            border: '1px solid #343de6',
                            // boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
                            '&:focus, &:hover, &.Mui-active': {
                                boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.01)',
                            },
                            '&:before': {
                                boxShadow:
                                    '0px 0px 1px 0px rgba(0,0,0,0.01)',
                            },
                        },
                        '& .MuiSlider-track': {
                            backgroundColor: `${activeHumanHandover ? '#343de6' : '#808080'} `,
                        },
                        '& .MuiSlider-rail': {
                            backgroundColor: '#808080',
                            opacity: 1,
                        },
                    }}
                /> : <div className='h-[34px]'></div>}

            </div>
        </div>
    );
}