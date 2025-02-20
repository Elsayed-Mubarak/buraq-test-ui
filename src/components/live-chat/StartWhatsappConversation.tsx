import { X } from "lucide-react"
import Button from "./Button"
import WhatsappTemplate from "./WhatsAppTemplate";
import StartWhatsappConversationForm from "./StartWhatsappConversationForm";

type Props = {
    channel: "whatsapp" | "sms";
    setChannel: React.Dispatch<React.SetStateAction<"whatsapp" | "sms">>;
    setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
    template: any;
    setTemplate: React.Dispatch<React.SetStateAction<any>>;
    phone: string;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    handleStartWhatsAppConversation: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isCreateingConversation: any,
    setConversationVariables: any,
    variblesErrors: any;
    setVariblesErrors: any;
}

export default function StartWhatsappConversation({
    handleStartWhatsAppConversation,
    phone,
    setPhone,
    setOpenModel,
    channel,
    setChannel,
    template,
    setTemplate,
    isCreateingConversation,
    setConversationVariables,
    variblesErrors,
    setVariblesErrors
}: Props) {
    return (
        <div className="w-[685px] rounded-xl bg-white">
            <div className="flex items-center justify-between border-b border-primary-50 px-6 py-5">
                <div className="text-xl font-semibold text-[#a3a3a3]">
                    Start Conversation
                </div>
                <span onClick={() => setOpenModel(false)}>
                    <X className="h-6 w-6 cursor-pointer" />
                </span>
            </div>
            <div className="grid grid-cols-2 gap-3 px-6 py-5 max-h-[60vh] h-[calc(100%-130px)] overflow-y-auto">
                <StartWhatsappConversationForm
                    template={template} setTemplate={setTemplate}
                    channel={channel} phone={phone} setChannel={setChannel}
                    setPhone={setPhone}
                    setConversationVariables={setConversationVariables}
                    variblesErrors={variblesErrors}
                    setVariblesErrors={setVariblesErrors}
                />
                <WhatsappTemplate template={template} />
            </div>
            <div className="flex items-center justify-end border-t border-primary-50 p-5">
                {/* <Button
                    onClick={handleStartWhatsAppConversation}
                >
                    <span>Start conversation</span>
                </Button> */}
                <Button
                    type={!phone || isCreateingConversation ? "disable" : ""}
                    onClick={handleStartWhatsAppConversation}
                >
                    {isCreateingConversation ? <div className="flex items-center justify-center h-full w-[117px]">
                        <span className="w-5 h-5 border-[3px] border-primary-500 border-t-transparent rounded-full animate-spin"></span>
                    </div> : <span>Start conversation</span>}
                </Button>
            </div>
        </div>
    )
}