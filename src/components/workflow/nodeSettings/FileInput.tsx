import { ChangeEvent } from "react";
import { Label } from "../../../app/dashboard/components/ui/label";

function FileInput({ rowId, value, handleChange, placeholder }: {
    rowId: string,
    value: string | undefined,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string
}) {
    return (
        <Label htmlFor={`file_input_${rowId}`} className="cursor-pointer">
            <div className="bg-gray-100 p-4 flex items-center justify-start gap-7 rounded-md border border-slate-300">
                <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path fill="#343de6" d="M750.933 981.333H256c-72.533 0-128-55.467-128-128V384c0-12.8 4.267-21.333 12.8-29.867L430.933 55.466c8.533-8.533 17.067-12.8 29.867-12.8h290.133c72.533 0 128 55.467 128 128v682.667c0 72.533-55.467 128-128 128zm-537.6-580.266v452.267c0 25.6 17.067 42.667 42.667 42.667h494.933c25.6 0 42.667-17.067 42.667-42.667V170.667c0-25.6-17.067-42.667-42.667-42.667H477.866L213.333 401.067z"></path><path fill="#ffffff" d="M170.667 426.667H512V85.334h-42.667L170.666 384.001v42.667z"></path><path fill="#343de6" d="M512 469.333H170.667c-25.6 0-42.667-17.067-42.667-42.667v-42.667c0-12.8 4.267-21.333 12.8-29.867L439.467 55.465c8.533-8.533 17.067-12.8 29.867-12.8h42.667c25.6 0 42.667 17.067 42.667 42.667v341.333c0 25.6-17.067 42.667-42.667 42.667zM230.4 384h238.933V145.067L230.4 384z"></path></svg>
                </div>
                <input
                    type="file"
                    id={`file_input_${rowId}`}
                    onChange={handleChange}
                    className="hidden"
                />
                <p className="text-gray-500 text-sm font-semibold tracking-wider">{value?.slice(0, 20) || placeholder || "Upload JSON file"}</p>
            </div>
        </Label>
    )
}

export default FileInput