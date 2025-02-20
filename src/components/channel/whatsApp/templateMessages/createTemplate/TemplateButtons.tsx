import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { Fragment, useState } from "react"
import QuickReplyButton from "./QuickReplyButton";
import URLButton from "./URLButton";
import CallButton from "./CallButton";
import useCreateTemplateStore from "@/stores/useCreateTemplate";

type Props = {
    errorsObject: any;
    setErrorsObject: any
}
type ButtonType = "no-buttons" | "cta" | "quick-reply";

export default function TemplateButtons({ errorsObject, setErrorsObject }: Props) {
    const [buttonType, setButtonType] = useState<ButtonType>('no-buttons')
    const {
        buttons,
        addQuickReplyBtn,
        addURLBtn,
        addCallBtn,
        setButtons
    } = useCreateTemplateStore();

    function handleChange(value: ButtonType) {
        setButtonType(value)
        if (value === 'no-buttons') {
            setButtons()
        }
    }

    const isHaveCallBtn = buttons.some((btn) => btn.type === "call");
    const numbersOfURLBtns = buttons.filter((btn) => btn.type === "url").length;

    return (
        <div className='py-5'>
            <div className='text-lg text-secondary-50 font-semibold'>Buttons (optional)</div>
            <div className='w-[297px] mt-1 mb-3 text-sm text-[#808080]'>
                Create buttons that let customers respond to your message or take action.
            </div>
            <Select value={buttonType} onValueChange={handleChange}>
                <SelectTrigger className="w-full h-8 text-sm text-secondary-50 focus:ring-0 focus:ring-offset-0 focus:border-transparent hover:border-primary-500 focus:border-primary-500">
                    <SelectValue defaultValue="no-buttons" />
                </SelectTrigger>
                <SelectContent className='w-full bg-white text-sm p-0 py-1'>
                    <SelectGroup className='p-0'>
                        <SelectItem className='text-sm text-secondary-50 py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]' value="no-buttons">No buttons</SelectItem>
                        <SelectItem className='text-sm text-secondary-50 py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]' value="cta">Call to action</SelectItem>
                        <SelectItem className='text-sm text-secondary-50 py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]' value="quick-reply">Quick Reply</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className="flex flex-col gap-4 mt-4">
                {buttons.map((btn) => (
                    <Fragment key={btn.id}>
                        {btn.type === "quick-reply" &&
                            <QuickReplyButton
                                btn={btn}
                            />}
                        {btn.type === "url" &&
                            <URLButton
                                btn={btn}
                                errorsObject={errorsObject}
                                setErrorsObject={setErrorsObject}

                            />}
                        {btn.type === "call" &&
                            <CallButton
                                btn={btn}
                                errorsObject={errorsObject}
                                setErrorsObject={setErrorsObject}
                            />}
                    </Fragment>
                ))}
            </div>
            {(buttonType === "cta" && buttons.length < 10) && <div className="flex items-center gap-4 mt-4">
                {numbersOfURLBtns < 2 && <button onClick={addURLBtn} className="flex items-center gap-2 text-sm h-9 px-5 border border-[#cdcdcd] rounded-lg text-secondary-50 hover:bg-[#f3f3f3]">
                    <Plus size={16} />
                    <span>URL Button</span>
                </button>}
                {(!isHaveCallBtn && buttons.length < 10) && <button onClick={addCallBtn} className="flex items-center gap-2 text-sm h-9 px-5 border border-[#cdcdcd] rounded-lg text-secondary-50 hover:bg-[#f3f3f3]">
                    <Plus size={16} />
                    <span>Call Button</span>
                </button>}
            </div>}
            {(buttonType === "quick-reply" && buttons.length < 10) && <div className="flex items-center mt-4">
                <button onClick={addQuickReplyBtn} className="flex items-center gap-2 text-sm h-9 px-5 border border-[#cdcdcd] rounded-lg text-secondary-50 hover:bg-[#f3f3f3]">
                    <Plus size={16} />
                    <span>Button</span>
                </button>
            </div>}
        </div>
    )
}