// Import necessary components
import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

type ReusableCheckboxProps = {
    label?: string;
    fontSize?: string | number;
    labelColor?: string;
    isChecked: boolean;
    setIsChecked: (checked: boolean) => void;
    disabled?: boolean;
    size?: 'small' | 'medium';
    id?: string;
};

const ReusableCheckbox: React.FC<ReusableCheckboxProps> = ({
    label,
    fontSize = '14px',
    labelColor = 'inherit',
    isChecked,
    setIsChecked,
    disabled = false,
    size = 'medium',
    id
}) => {
    return (
        label ? (
            <FormControlLabel
                control={
                    <Checkbox
                        id={id}
                        checked={isChecked}
                        onChange={(event) => setIsChecked(event.target.checked)}
                        disabled={disabled}
                        size={size}
                        sx={{
                            color: "#343de6",
                            '&.Mui-checked': {
                                color: `${disabled ? '#cdcdcd' : '#343de6'}`,
                            },
                        }}
                    />
                }
                label={<span style={{ fontSize: fontSize, color: labelColor }}>{label}</span>}
            />
        ) : (
            <Checkbox
                id={id}
                checked={isChecked}
                onChange={(event) => setIsChecked(event.target.checked)}
                disabled={disabled}
                size={size}
                sx={{
                    color: "#343de6",
                    padding: '0',
                    '&.Mui-checked': {
                        color: `${disabled ? '#cdcdcd' : '#343de6'}`,
                    },
                }}
            />
        )
    );
};

export default ReusableCheckbox;
