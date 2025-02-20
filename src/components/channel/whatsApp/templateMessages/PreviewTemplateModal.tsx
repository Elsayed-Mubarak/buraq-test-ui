import Portal from "@/components/shared/Portal"
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { X } from "lucide-react";
import { useEffect } from "react";
import { ArrowLeft, List, Phone, SquareArrowOutUpRight, Undo } from "lucide-react"
import Image from "next/image";
type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedTemplate: any
    setSelectedTemplate: any
}
/* eslint-disable @next/next/no-img-element */

export default function PreviewTemplateMessageModal({ isOpen, setIsOpen, selectedTemplate,
    setSelectedTemplate }: Props) {
    const containerRef = useOutsideClick(() => setIsOpen(false))
    function handleCloseModal() {
        setIsOpen(false)
        setSelectedTemplate(null)
    }
    useEffect(() => {
        return () => setSelectedTemplate(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderIcon = (type: string) => {
        switch (type) {
            case "QUICK_REPLY":
                return <Undo className="h-4 w-4" />;
            case "URL":
                return <SquareArrowOutUpRight className="h-4 w-4" />;
            case "PHONE_NUMBER":
                return <Phone className="h-4 w-4" />;
            default:
                return null;
        }
    };
    if (!isOpen) return null
    return (
        <Portal>
            <div className="fixed z-[999] flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.16)]">
                <div ref={containerRef} className="bg-white w-[360px] rounded-xl">
                    <div className="flex items-center justify-between border-b border-primary-50 py-5 px-6">
                        <div className="text-[#3a3a3a] text-xl font-semibold">Preview Template</div>
                        <span>
                            <X className="h-6 w-6 cursor-pointer text-[#6d6d6d]" onClick={handleCloseModal} />
                        </span>
                    </div>
                    <div className="pb-[30px] pt-4" >
                        <div>
                            <div className='h-[500px] w-[300px] mx-auto bg-[url("/template_background.jpg")]'>
                                <div className='flex items-center gap-2 bg-[#075e55] h-9 px-2'>
                                    <div>
                                        <ArrowLeft className='text-white h-4 w-4' />
                                    </div>
                                    <div className='w-6 h-6 rounded-full bg-white flex items-center justify-center'>
                                        <Image src="/logo.png" alt="logo" width={20} height={20} />
                                    </div>
                                    <div className='text-white text-[12px]'>Buraq</div>
                                </div>
                                <div className="max-w-[80%] pt-1 pl-2">
                                    <div className="bg-white rounded-lg p-1 rounded-tl-none">
                                        {(selectedTemplate && selectedTemplate?.rawTemplateData) && selectedTemplate?.rawTemplateData?.components.map((component: any, index: number) => (
                                            <div key={index}>
                                                {component.type === "HEADER" && component.format === "TEXT" && <div className="text-black text-wrap p-1 break-words text-[12px] font-black">{component.text}</div>}
                                                {component.type === "HEADER" && component.format === "IMAGE" && <div className="p-1">
                                                    <img className="block w-full rounded-[3px]" src={component?.example?.header_handle[0]} alt="image" />
                                                </div>}
                                                {component.type === "HEADER" && component.format === "DOCUMENT" && <div className="p-1 text-xs bg-[#f7f7f7] w-full">
                                                    {component?.example?.header_handle[0]}
                                                </div>}
                                                {component.type === "HEADER" && component.format === "VIDEO" && <div className="p-1">
                                                    <video controls>
                                                        <source src={component?.example?.header_handle[0]} type="video/mp4" />
                                                        <source src={component?.example?.header_handle[0]} type="video/webm" />
                                                        <source src={component?.example?.header_handle[0]} type="video/ogg" />
                                                    </video>
                                                </div>}
                                                {component.type === "BODY" && <div className="p-1 text-[#000] text-[12px]">{component.text}</div>}
                                                {component.type === "FOOTER" && <div className="mt-1 text-[#808080] text-[10px]">{component.text}</div>}
                                                {component.type === "BUTTONS" && component.buttons.slice(0, 2).map((btn: any, index: any) => (
                                                    <div key={index} className="flex items-center gap-2 justify-center cursor-pointer text-[#219bc0] test-sm border-t border-[#f3f3f3] text-xs py-[6px]">
                                                        <span>
                                                            {renderIcon(btn.type)}
                                                        </span>
                                                        <span>{btn.text}</span>
                                                    </div>
                                                ))}
                                                {component.type === "BUTTONS" && component.buttons.length > 2 && <div className="flex items-center gap-2 justify-center cursor-pointer text-[#219bc0] test-sm border-t border-[#f3f3f3] text-xs py-[6px]">
                                                    <span>
                                                        <List className="h-4 w-4" />
                                                    </span>
                                                    <span>See all options</span>
                                                </div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

