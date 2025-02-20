import ReusableCheckbox from "@/components/shared/ReusableCheckbox"
import Radio from '@mui/material/Radio';
import { useState } from "react";
type Props = {
    soundType: "classic" | "modern"
    setSoundType: any
    playSound: boolean
    setPlaySound: any
}

export default function PlaySoundSettings({ soundType,
    setSoundType,
    playSound,
    setPlaySound }: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSoundType(event.target.value);
    };
    return (
        <div>
            <ReusableCheckbox size="small" label="Play sound when message is sent/received" labelColor="#092445" isChecked={playSound} setIsChecked={setPlaySound} />
            {playSound && <div className="flex items-center gap-2">
                <div className="flex items-center">
                    <Radio
                        checked={soundType === 'classic'}
                        onChange={handleChange}
                        value="classic"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'classic' }}
                        sx={{
                            color: "#343de6",
                            '&.Mui-checked': {
                                color: "#343de6",
                            },
                        }}
                    />
                    <span className="text-sm text-secondary-50">Classic</span>
                </div>
                <div className="flex items-center">
                    <Radio
                        checked={soundType === 'modern'}
                        onChange={handleChange}
                        value="modern"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'modern' }}
                        sx={{
                            color: "#343de6",
                            '&.Mui-checked': {
                                color: "#343de6",
                            },
                        }}
                    />
                    <span className="text-sm text-secondary-50">Modern</span>
                </div>
            </div>}
        </div>
    )
}