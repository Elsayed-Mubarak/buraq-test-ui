import ReusableCheckbox from "@/components/shared/ReusableCheckbox"
import ToolTip from "@/components/shared/ToolTip";
import Radio from '@mui/material/Radio';
import { Info } from "lucide-react";
import { useState } from "react";
type Props = {
    cookieSetting: "always-added" | "manually-added"
    setCookieSetting: any
}



export default function CookiesSetting({ cookieSetting,
    setCookieSetting }: Props) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCookieSetting(event.target.value);
    };
    return (
        <div>
            <div className="flex items-center gap-1">
                <ReusableCheckbox disabled={true} size="small" label="Cookie setting" labelColor="#092445" isChecked={true} setIsChecked={() => { }} />
                <ToolTip title="Cookie setting">
                    <Info size={16} className="text-[#565656] ml-[-8px]" />
                </ToolTip>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center">
                    <Radio
                        checked={cookieSetting === 'always-added'}
                        onChange={handleChange}
                        value="always-added"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'always-added' }}
                        sx={{
                            color: "#343de6",
                            '&.Mui-checked': {
                                color: "#343de6",
                            },
                        }}
                    />
                    <span className="text-sm text-secondary-50">Always added</span>
                </div>
                <div className="flex items-center">
                    <Radio
                        checked={cookieSetting === 'manually-added'}
                        onChange={handleChange}
                        value="manually-added"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'manually-added' }}
                        sx={{
                            color: "#343de6",
                            '&.Mui-checked': {
                                color: "#343de6",
                            },
                        }}
                    />
                    <span className="text-sm text-secondary-50">Manually added</span>
                </div>
            </div>
        </div>
    )
}