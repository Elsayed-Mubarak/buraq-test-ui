import { ArrowLeft, ExternalLink, X } from "lucide-react"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Button from "./Button"
import { useState } from "react";
type Props = {
    channel: "whatsapp" | "sms";
    setChannel: React.Dispatch<React.SetStateAction<"whatsapp" | "sms">>;
    setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StartSmsConversation({ setOpenModel, channel, setChannel }: Props) {
    const [phone, setPhone] = useState("");
    return (
        <div className="w-[360px] rounded-xl bg-white">
            <div className="flex items-center justify-between border-b border-primary-50 px-6 py-5">
                <div className="text-xl font-semibold text-[#a3a3a3]">
                    Start Conversation
                </div>
                <span onClick={() => setOpenModel(false)}>
                    <X className="h-6 w-6 cursor-pointer" />
                </span>
            </div>
            <div className="gap-3 px-6 py-5 max-h-[60vh] h-[calc(100%-130px)] overflow-y-auto">
                <div className="pr-2">
                    <div className="mb-4">
                        <div className="mb-1 text-sm font-semibold text-black">
                            Channel
                        </div>
                        <select value={channel} onChange={(e) => setChannel(e.target.value as "whatsapp" | "sms")} className="w-full cursor-pointer rounded-lg border border-primary-50 p-2 text-sm font-semibold text-secondary-50 outline-none">
                            <option value="whatsapp">WhatsApp</option>
                            <option value="sms">SMS</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <div className="mb-1 text-sm font-semibold text-black">
                            From
                        </div>

                        <select className="w-full cursor-pointer rounded-lg border border-primary-50 p-2 text-sm font-semibold text-secondary-50 outline-none">
                            <option value="whatsapp">+966551090662</option>
                        </select>
                    </div>
                    <div className="mb-4 select-none">
                        <label htmlFor="to" className="mb-1 text-sm font-semibold text-black">
                            To
                        </label>
                        <PhoneInput
                            country={"sa"}
                            value={phone}
                            onChange={(value) => setPhone(value)}
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
                                overflowY: "auto", // Enable scrolling
                                overflowX: "hidden", // Enable scrolling
                                borderRadius: "6px",
                                border: "1px solid #e4e4e4",
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <div className="mb-1 text-sm font-semibold text-black">
                            Message
                        </div>
                        <textarea className="w-full h-[155px] resize-none rounded-lg border border-primary-50 p-2 text-sm font-semibold text-secondary-50 outline-none">

                        </textarea>
                    </div>

                </div>
            </div>
            <div className="flex items-center justify-end border-t border-primary-50 p-5">
                <Button
                    type="disable"
                    // onClick={(e: any) => handleSubmit(e)}
                    onClick={(e: any) => { }}
                >
                    <span>Start conversation</span>
                    {/* {createingConversation ? (
                        <span>Loading....</span>
                    ) : (
                        <span>Start conversation</span>
                    )} */}
                </Button>
            </div>
        </div>
    )
}