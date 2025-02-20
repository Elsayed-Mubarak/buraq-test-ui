import useCreateTemplateStore from "@/stores/useCreateTemplate";
import { ArrowLeft, CornerUpLeft, List, Phone, SquareArrowOutUpRight, Undo } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react";

type Props = {}
/* eslint-disable @next/next/no-img-element */
export default function TemplatePreview({ }: Props) {
    const [imagePreview, setImagePreview] = useState<any>(null);
    const [videoPreview, setVideoPreview] = useState<any>(null);

    const {
        buttons,
        headerObject,
        bodyObject,
        footerObject
    } = useCreateTemplateStore();
    const renderIcon = (type: string) => {
        switch (type) {
            case "quick-reply":
                return <Undo className="h-4 w-4" />;
            case "url":
                return <SquareArrowOutUpRight className="h-4 w-4" />;
            case "call":
                return <Phone className="h-4 w-4" />;
            default:
                return null;
        }
    };
    useEffect(() => {
        let previewUrl: string | null = null;

        if (headerObject.type === "image" && headerObject.value) {
            previewUrl = URL.createObjectURL(headerObject.value);
            setImagePreview(previewUrl);
        } else if (headerObject.type === "video" && headerObject.value) {
            previewUrl = URL.createObjectURL(headerObject.value);
            setVideoPreview(previewUrl);
        }

        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [headerObject]);
    return (
        <div>
            <div className='mx-5 mb-5'>
                <div className='text-secondary-50 text-sm'>Preview</div>
                <div className='h-[500px] w-[300px] bg-[url("/template_background.jpg")]'>
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
                        <div className="bg-white rounded-lg rounded-tl-none">
                            {(headerObject.value && headerObject.type === "text") &&
                                <div className="text-black text-wrap p-1 break-words text-[12px] font-black">{headerObject.value}</div>
                            }
                            {(headerObject.value && headerObject.type === "image") &&
                                (<div className="p-1">
                                    <img className="block w-full rounded-[3px]" src={imagePreview} alt="image" />
                                </div>)
                            }
                            {(headerObject.value && headerObject.type === "video") &&
                                <div className="p-1">
                                    <video controls>
                                        <source src={videoPreview} type="video/mp4" />
                                        <source src={videoPreview} type="video/webm" />
                                        <source src={videoPreview} type="video/ogg" />
                                    </video>
                                </div>
                            }
                            {(headerObject.value && headerObject.type === "document") &&
                                <div className="p-1 text-xs bg-[#f7f7f7] w-full">
                                    {headerObject.value.name}
                                </div>
                            }
                            {bodyObject.value !== `""` &&
                                <div className="p-1 text-[#000] whitespace-pre-line break-all text-[12px] break-words">{bodyObject.value && JSON.parse(bodyObject.value)}</div>
                            }
                            {footerObject.value &&
                                <div className="mt-1 text-[#808080] text-[10px] break-words p-1">{footerObject.value}</div>
                            }
                            {buttons.slice(0, 2).map((btn: any) => (
                                <div key={btn.id} className="flex items-center gap-2 justify-center cursor-pointer text-[#219bc0] test-sm border-t border-[#f3f3f3] text-xs py-[6px]">
                                    <span>
                                        {renderIcon(btn.type)}
                                    </span>
                                    <span>{btn.label}</span>
                                </div>
                            ))}
                            {buttons.length > 2 && <div className="flex items-center gap-2 justify-center cursor-pointer text-[#219bc0] test-sm border-t border-[#f3f3f3] text-xs py-[6px]">
                                <span>
                                    <List className="h-4 w-4" />
                                </span>
                                <span>See all options</span>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}