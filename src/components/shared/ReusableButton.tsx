"use client"
import { Button } from "@/components/ui/button"
type Props = {
    onClick: () => void,
    children: React.ReactNode,
    disabled?: boolean
    className?: string
}

export default function ResuableButton({ onClick, children, disabled, className }: Props) {
    return (
        <Button disabled={disabled} onClick={onClick} className={`${disabled ? "cursor-not-allowed bg-[#f3f3f3] text-[#808080]" : "text-white cursor-pointer bg-primary-500 flex"}  rounded-lg hover:bg-primary-600 transition-all duration-200 h-9 px-5 items-center ${className}`}>{children}</Button>
    )
}