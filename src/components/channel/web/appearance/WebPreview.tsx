import useAppearanceStore from "@/stores/useAppearanceStore"
import { ChevronLeft, Menu, Send, Smile, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Props = {}

/* eslint-disable @next/next/no-img-element */

export default function WebPreview({ }: Props) {

    const { chatInterfacePosition, headerText, hintText, accentColor, fontColor, botIconPreview, headerLogoPreview, headerLogoLink, botIconLink } = useAppearanceStore((state) => ({
        chatInterfacePosition: state.chatInterfacePosition,
        headerText: state.headerText,
        hintText: state.hintText,
        accentColor: state.accentColor,
        fontColor: state.fontColor,
        botIconPreview: state.botIconPreview,
        headerLogoPreview: state.headerLogoPreview,
        headerLogoLink: state.headerLogoLink,
        botIconLink: state.botIconLink
    }));


    return (
        <div>
            <div className="my-0 flex flex-col mx-auto w-[360px] h-[600px] shadow-[0px_3px_6px_0px_rgba(0,0,0,0.16)] rounded-lg">
                <div style={{ backgroundColor: accentColor }} className={`min-h-[50px] rounded-[10px] p-[10px] z-[120]`}>
                    <div className="flex items-center gap-2">
                        <span>
                            <ChevronLeft size={32} className="text-white" />
                        </span>
                        <div className="flex gap-[10px] items-center">
                            <div style={{ borderColor: fontColor }} className="w-[45px] h-[45px] rounded-full border  overflow-hidden">
                                {headerLogoPreview ? <img src={headerLogoPreview} width={45} height={45} alt="header logo preview" /> :
                                    <img src={headerLogoLink} width={45} height={45} alt="header logo link" />}
                            </div>
                            <span style={{ color: fontColor }} className="text-lg font-semibold">{headerText}</span>
                        </div>
                    </div>
                </div>
                <div className="px-3 flex-1 flex flex-col">
                    <div className="my-4 relative flex items-center justify-center">
                        <div className="bg-white w-fit px-2">
                            <div style={{ color: accentColor, backgroundColor: `${accentColor}30` }} className={`text-[10px]  font-semibold  rounded-md py-[3px] px-[10px]`}>Sunday, 12th January</div>
                            <div style={{ backgroundColor: `${accentColor}30` }} className="absolute left-0 top-[50%] -translate-y-1/2 w-full h-[.5px] z-[-1] "></div>
                        </div>
                    </div>
                    <div className="max-w-[85%]">
                        <div className="flex gap-3 items-end mb-2">
                            {botIconPreview ? <img src={botIconPreview} className="rounded-full" width={32} height={32} alt="bot icon preview" />
                                : <img src={botIconLink} className="rounded-full" width={32} height={32} alt="bot icon link" />}
                            <div className="py-[10px] px-3 rounded-xl rounded-bl-none text-sm text-[#464646] bg-[#f7f7f7]">
                                Hi there! 👋 Welcome to Buraq. May I know your name?
                            </div>
                        </div>
                        <div className="ml-9 mb-[2px] text-[10px] text-[#808080]">12:30</div>
                    </div>
                    <div className="max-w-[85%] self-end">
                        <div className="mb-2">
                            <div style={{ backgroundColor: accentColor, color: fontColor }} className={`py-[10px] px-3 rounded-xl rounded-br-none text-sm`}>
                                It's Specter
                            </div>
                        </div>
                        <div className="mb-[2px] text-end text-[10px] text-[#808080]">12:30</div>
                    </div>
                    <div className="max-w-[85%]">
                        <div className="flex gap-3 items-end mb-2">
                            {botIconPreview ? <img src={botIconPreview} className="rounded-full" width={32} height={32} alt="bot icon preview" />
                                : <img src={botIconLink} className="rounded-full" width={32} height={32} alt="bot icon link" />}
                            <div className="py-[10px] px-3 rounded-xl rounded-bl-none text-sm text-[#464646] bg-[#f7f7f7]">
                                Nice to meet you, Specter. How can I help you today?
                            </div>
                        </div>
                        <div className="flex items-center gap-2 ml-9">
                            <button className="rounded-[15px] text-xs h-[30px] px-3 flex items-center justify-center border border-[#d1d1d1] cursor-pointer text-[#464646] bg-[#]">Button A</button>
                            <button className="rounded-[15px] text-xs h-[30px] px-3 flex items-center justify-center border border-[#d1d1d1] cursor-pointer text-[#464646] bg-[#]">Button B</button>
                            <button className="rounded-[15px] text-xs h-[30px] px-3 flex items-center justify-center border border-[#d1d1d1] cursor-pointer text-[#464646] bg-[#]">Button C</button>
                        </div>
                        <div className="ml-9 mb-[2px] text-[10px] text-[#808080]">12:30</div>
                    </div>
                    <div className="max-w-[85%] self-end">
                        <div className="mb-2">
                            <div style={{ backgroundColor: accentColor, color: fontColor }} className={`py-[10px] px-3 rounded-xl rounded-br-none text-sm`}>
                                Button B
                            </div>
                        </div>
                        <div className="mb-[2px] text-end text-[10px] text-[#808080]">12:30</div>
                    </div>
                </div>
                <div className="mt-auto">
                    <div className="bg-[#f7f7f7] p-[10px] flex items-center gap-3">
                        <span>
                            <Menu size={24} className="text-[#727272]" />
                        </span>
                        <div className="flex-1 flex h-[50px] bg-white items-center gap-2 rounded-xl border border-[#d1d1d1] py-2 px-3">
                            <div className="flex-1 font-bold text-[#333]">{hintText}</div>
                            <div className="flex items-center gap-2">
                                <Smile size={24} className="text-[#a7a7a7]" />
                                <Send size={24} className="text-[#a7a7a7]" />
                            </div>
                        </div>
                    </div>
                    <div className="h-[34px] flex items-center justify-center bg-white text-xs text-[#464646]">
                        <div className="flex items-center gap-1 font-semibold">
                            <Image src="/powered_by.png" width={18} height={18} alt="Powered By" />
                            <span>By</span>
                            <Link href="https://buraq.ai/ar" className="text-secondary-50 font-black">Buraq AI</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`flex ${chatInterfacePosition === "right" ? "justify-end" : "justify-start"}  my-0 mx-auto w-[360px] mt-4`}>
                <div style={{ backgroundColor: accentColor }} className={`w-[60px] h-[60px] rounded-full flex items-center justify-center`}>
                    <span>
                        <X size={24} className="text-white" />
                    </span>
                </div>
            </div>
        </div>
    )
}