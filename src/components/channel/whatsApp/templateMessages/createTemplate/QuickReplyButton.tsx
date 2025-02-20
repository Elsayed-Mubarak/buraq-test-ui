import ToolTip from "@/components/shared/ToolTip"
import useCreateTemplateStore from "@/stores/useCreateTemplate"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type BtnType = {
    id: string
    type: "quick-reply" | "url" | "call",
    label: string,
    value?: string,
}
type Props = {
    btn: BtnType;
}

export default function QuickReplyButton({ btn }: Props) {

    const {

        removeButton,
        updateButton,
    } = useCreateTemplateStore();
    return (
        <div className="group flex items-center justify-center relative rounded-lg h-10 px-10 bg-primary-500">
            {!btn.label && <span className="rounded-lg absolute left-0 w-10 h-10 flex items-center justify-center ">
                <ToolTip title="This field cannot be empty">
                    <Image src="/warning.svg" width={20} height={20} alt="warning" />
                </ToolTip>
            </span>}
            <input maxLength={20} value={btn.label} onChange={(e) => updateButton(btn.id, 'label', e.target.value)} type="text" className="block bg-transparent w-full text-white text-sm outline-none border-none text-center" />
            <span onClick={() => removeButton(btn.id)} className="flex items-center justify-center opacity-0 absolute top-0 group-hover:opacity-100 w-8  h-10 cursor-pointer text-[#808080] hover:opacity-100 hover:text-[#f00]  -right-8">
                <Trash2 className="w-5 h-5 text-inherit" />
            </span>
        </div>
    )
}