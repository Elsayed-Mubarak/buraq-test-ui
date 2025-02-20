import { Button } from "@/components/ui/button"
type Props = {
    onClick: () => void,
    children: React.ReactNode,
}

export default function ReusableCancelButton({ onClick, children }: Props) {
    return (
        <Button onClick={onClick} className="border text-sm cursor-pointer border-[#cdcdcd] flex text-secondary-50 hover:bg-[#f3f3f3] bg-white rounded-lg h-9 px-5 items-center">{children}</Button>
    )
}