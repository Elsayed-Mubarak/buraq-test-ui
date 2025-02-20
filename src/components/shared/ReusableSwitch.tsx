// Import necessary components
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

type ReusableSwitchProps = {
    isChecked: boolean; // Controlled active state
    setIsChecked: (isChecked: boolean) => void; // Function to update active state
    disabled?: boolean; // Whether the switch is disabled
    id?: string;
};

const CustomGreenSwitch = styled(Switch)(({ theme }) => ({
    width: 36,
    height: 20,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 1,
        margin: 0,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)', // Adjusted for new dimensions
            color: '#aab4be',
            '& + .MuiSwitch-track': {
                backgroundColor: '#13BE66',
                opacity: 1,
                border: 0,
            },
            '& .MuiSwitch-thumb': {
                backgroundColor: '#fff',
                // border: '2px solid #13BE66', // Added border for checked state
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 17, // Adjusted thumb size for new dimensions
        height: 17, // Adjusted thumb size for new dimensions
        // border: '2px solid #aab4be', // Border for default state
    },
    '& .MuiSwitch-track': {
        borderRadius: 10, // Adjusted for new height
        backgroundColor: '#aab4be',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export default function ReusableSwitch({ isChecked, setIsChecked, disabled = false, id }: ReusableSwitchProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    return (
        <CustomGreenSwitch
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            id={id}
        />
    );
}
