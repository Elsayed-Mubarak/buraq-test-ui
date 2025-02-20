"use client"
import { ChevronLeft, ChevronRight } from "lucide-react";
type Props = {
    isSideOpen: boolean;
    setIsSideOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SidebarToggle({ isSideOpen, setIsSideOpen }: Props) {
    return (
        <div onClick={() => setIsSideOpen(!isSideOpen)} className={`${isSideOpen ? "left-[227px] peer-hover:opacity-100 opacity-0" : "left-[4px] peer-hover:left-[227px]"}  text-[#808080] hover:bg-primary-500 hover:opacity-100 hover:text-white border bg-white border-primary-50 cursor-pointer w-6 h-6 rounded-full absolute top-[50%] transition-all duration-300  flex items-center justify-center z-[51] shadow-md `}>
            {
                isSideOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />
            }
        </div>
    )
}