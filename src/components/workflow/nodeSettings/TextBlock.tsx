import { Textarea } from "@/app/dashboard/components/ui/textarea"
import { ChangeEvent } from "react";

interface Props {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>, ...props: any[]) => void;
    label?: string;
    footerMsg?: string;
    className?: string;
}


function TextBlock({ label, className, value, footerMsg, onChange }: Props) {

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e)
    }

    return (
        <div className={className}>
            {label && <h3 className="text-sm font-light text-nodeSettings mb-0.5">{label}</h3>}
            <Textarea
                value={value}
                onChange={handleChange}
                className="ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent border-gray-300 hover:border-indigo-500 resize-none"
            />
            {footerMsg && <p className="text-xs text-gray-500 mt-1">{footerMsg}</p>}
        </div>
    )
}

export default TextBlock