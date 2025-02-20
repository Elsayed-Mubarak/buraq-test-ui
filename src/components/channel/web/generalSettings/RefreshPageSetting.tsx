import ReusableCheckbox from "@/components/shared/ReusableCheckbox"
import Radio from '@mui/material/Radio';
import { useState } from "react";
type Props = {
    onPageRefresh: "start-new-chat" | "retain-existing-chat"
    setOnPageRefresh: any
}

export default function RefreshPageSetting({ onPageRefresh,
    setOnPageRefresh }: Props) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnPageRefresh(event.target.value);
    };
    return (
        <div>
            <ReusableCheckbox disabled={true} size="small" label="On page refresh" labelColor="#092445" isChecked={true} setIsChecked={() => { }} />
            <div className="flex items-center gap-2">
                <div className="flex items-center">
                    <Radio
                        checked={onPageRefresh === 'start-new-chat'}
                        onChange={handleChange}
                        value="start-new-chat"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'start-new-chat' }}
                        sx={{
                            color: "#343de6",
                            '&.Mui-checked': {
                                color: "#343de6",
                            },
                        }}
                    />
                    <span className="text-sm text-secondary-50">Start new chat</span>
                </div>
                <div className="flex items-center">
                    <Radio
                        checked={onPageRefresh === 'retain-existing-chat'}
                        onChange={handleChange}
                        value="retain-existing-chat"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'retain-existing-chat' }}
                        sx={{
                            color: "#343de6",
                            '&.Mui-checked': {
                                color: "#343de6",
                            },
                        }}
                    />
                    <span className="text-sm text-secondary-50">Retain existing chat</span>
                </div>
            </div>
        </div>
    )
}