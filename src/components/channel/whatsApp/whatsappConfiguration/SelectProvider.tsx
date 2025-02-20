import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
type Props = {
    providerDisplayed: string,
    setProviderDisplayed: any,
    providerError?: boolean,
    setPorvideError?: any
}

export default function SelectProvider({ providerDisplayed, setProviderDisplayed, providerError,
    setPorvideError }: Props) {
    function handleChange(value: "meta" | "360dialog-cloud" | "gupshup" | "twilio") {
        if (setPorvideError) setPorvideError(false)
        setProviderDisplayed(value)
    }
    return (
        <div className="relative max-w-[340px] mb-5">
            <label htmlFor="api-provider" className={`text-sm  block mb-1 ${providerError ? "text-[#f00]" : "text-secondary-50"}`}>WhatsApp Business API Provider
            </label>
            <Select value={providerDisplayed} onValueChange={handleChange}>
                <SelectTrigger className={`text-[13px] text-secondary-50 w-full select-none focus:ring-0  focus:ring-offset-0 focus:border-transparent hover:border-primary-500 focus:border-primary-500 ${providerError ? "border-[#f00]" : ""}`}>
                    <SelectValue placeholder="Select Provider" defaultValue={providerDisplayed} />
                </SelectTrigger>
                <SelectContent className="bg-white w-full p-0">
                    <SelectGroup>
                        <SelectItem className="pl-2 text-secondary-50 text-[13px] hover:bg-[#f3f3f3] cursor-pointer" value="meta">Meta</SelectItem>
                        <SelectItem className="pl-2 text-secondary-50 text-[13px] hover:bg-[#f3f3f3] cursor-pointer" value="360dialog-cloud">360dialog Cloud</SelectItem>
                        <SelectItem className="pl-2 text-secondary-50 text-[13px] hover:bg-[#f3f3f3] cursor-pointer" value="gupshup">Gupshup</SelectItem>
                        <SelectItem className="pl-2 text-secondary-50 text-[13px] hover:bg-[#f3f3f3] cursor-pointer" value="twilio">Twilio</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {providerError && <span className="absolute top-[105%] text-[#f00] text-[11px]">This filed is required</span>}
        </div>
    )
}