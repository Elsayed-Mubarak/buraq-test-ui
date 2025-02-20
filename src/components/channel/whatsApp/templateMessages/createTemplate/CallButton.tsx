import ToolTip from "@/components/shared/ToolTip"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import { Check, Phone, Trash2, X } from "lucide-react"
import Image from "next/image"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react"
import useCreateTemplateStore from "@/stores/useCreateTemplate";

type BtnType = {
    id: string
    type: "quick-reply" | "url" | "call",
    label: string,
    value?: string,
}
type Props = {
    btn: BtnType;
    errorsObject: any
    setErrorsObject: any
}

export default function CallButton({ btn, errorsObject, setErrorsObject }: Props) {
    const {
        removeButton,
        updateButton,
    } = useCreateTemplateStore();
    const [isOpenAddPhone, setIsOpenAddPhone] = useState(false)
    const [phone, setPhone] = useState('')
    const containerRef = useOutsideClick(() => setIsOpenAddPhone(false))

    function handleChange(value: any) {
        setPhone(value)
        if (phone.length > 0) {
            setErrorsObject((prevErrors: any) => ({
                ...prevErrors,
                buttonsError: prevErrors.buttonsError.filter((btnId: string) => btnId !== btn.id),
            }));
        }
    }

    return (
        <div className="relative group flex items-center justify-center  rounded-lg h-10 px-10 bg-primary-500">
            {isOpenAddPhone &&
                <div ref={containerRef} className="flex items-center gap-2 bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)] rounded-sm p-2 absolute w-full z-[999] bottom-[calc(100%+10px)]">
                    <PhoneInput
                        country={"sa"}
                        value={phone}
                        onChange={handleChange}
                        inputStyle={{
                            display: "block",
                            width: "100%",
                            color: "#000",
                            height: "35px",
                            border: "0",
                        }}
                        buttonStyle={{
                            backgroundColor: "#fff",
                            borderRadius: "6px",
                            border: "0",
                        }}
                        containerStyle={{
                            border: "1px solid #e4e4e4",
                            borderRadius: "6px"
                        }}
                        dropdownStyle={{
                            maxWidth: "280px",
                            maxHeight: "140px",
                            overflowY: "auto",
                            overflowX: "hidden",
                            borderRadius: "6px",
                            border: "1px solid #e4e4e4",
                        }}
                    />
                    <div className="flex items-center gap-1">
                        <button onClick={() => { updateButton(btn.id, 'value', `+${phone}`); setIsOpenAddPhone(false) }} className="flex items-center justify-center text-white rounded-md bg-primary-500 h-10 w-10 ">
                            <Check size={24} />
                        </button>
                        <button onClick={() => setIsOpenAddPhone(false)} className="flex items-center justify-center text-[#637178] rounded-md bg-[#f3f3f3] h-10 w-10 ">
                            <X size={24} />
                        </button>
                    </div>
                </div>}
            <div className="absolute left-3 flex items-center">
                <span onClick={() => setIsOpenAddPhone(true)} className="cursor-pointer rounded-lg w-8 h-10 flex items-center justify-center ">
                    <Phone size={20} className="text-white" />
                </span>
                {(!btn.label || errorsObject.buttonsError.includes(btn.id)) && <span className="rounded-lg w-8 h-10 flex items-center justify-center ">
                    <ToolTip title="This field cannot be empty">
                        <Image src="/warning.svg" width={20} height={20} alt="warning" />
                    </ToolTip>
                </span>}
            </div>
            <input maxLength={20} value={btn.label} onChange={(e) => updateButton(btn.id, 'label', e.target.value)} type="text" className="block bg-transparent w-full text-white text-sm outline-none border-none text-center" />
            <span onClick={() => removeButton(btn.id)} className="flex items-center justify-center opacity-0 absolute top-0 group-hover:opacity-100 w-8  h-10 cursor-pointer text-[#808080] hover:opacity-100 hover:text-[#f00]  -right-8">
                <Trash2 className="w-5 h-5 text-inherit" />
            </span>
        </div>
    )
}