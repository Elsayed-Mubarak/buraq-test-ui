import { Input } from "@/components/ui/input"
import { useEffect } from "react"

type Props = {
    label: string,
    value: any,
    setValue: any,
    field: any
    error?: boolean
}

export default function InputField({ label, value, setValue, field, error }: Props) {


    if (value === undefined || value === null) return null;
    return (
        <div className="group max-w-[340px] mb-6 relative">
            <label htmlFor="" className={`group-focus-within:text-primary-500 text-sm  block mb-1 ${error ? "text-[#f00]" : "text-secondary-50"}`}>{label}</label>
            <Input id="" className={`focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus:border-transparent hover:border-primary-500 focus:border-primary-500 shadow-none ${error ? "border-[#f00]" : ""}`} value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, [field]: e.target.value }))} />
            {error && <span className="absolute top-[105%] text-[#f00] text-[11px]">this field is required</span>}
        </div>
    )
}