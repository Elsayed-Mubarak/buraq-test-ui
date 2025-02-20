import useAppearanceStore from '@/stores/useAppearanceStore';
import { formatFileSize } from '@/utils/formatFileSize';
import { ImageIcon, X } from 'lucide-react';
import React, { useRef, useState } from 'react'

type Props = {}

export default function BotIcon({ }: Props) {

    const {
        botIcon, botIconName,
        setBotIconName,
        deleteBotIcon,
        setBotIcon,
    } = useAppearanceStore()

    // const [botIconName, setBotIconName] = useState<string>("icon-64.png");
    // const [botIcon, setBotIcon] = useState<File | null>(null);
    // const [botIconPreview, setBotIconPreview] = useState<string | null>(null);

    const botIconRef = useRef<HTMLInputElement | null>(null);

    function handleBotIconChange(e: any) {
        const file = e.target.files[0];
        if (file) {
            setBotIcon(file);
        }
    }

    function handleDeleteBotIcon() {
        deleteBotIcon();
        if (botIconRef.current) {
            botIconRef.current.value = "";
        }
    }
    return (
        <div className="mb-8">
            <p className="text-sm text-secondary-50 mb-1">Bot Icon</p>
            <div className="">
                <div className="h-[64px] flex items-center p-3 w-full border bg-[#f8f8f8] border-[#e4e4e4] rounded-lg">

                    {(botIconName && !botIcon) && <div className="flex items-center gap-2">
                        <span onClick={() => setBotIconName("")} className="w-[26px] h-[26px] flex items-center justify-center rounded-full border-[2px] border-[#B8BEC1]">
                            <X size={16} className="cursor-pointer text-[#6d6d6d] text-sm" />
                        </span>
                        <span className="text-sm text-secondary-50">{botIconName}</span>
                    </div>}

                    {(!botIcon && !botIconName) && <label htmlFor="image" className="w-full h-full cursor-pointer flex items-center gap-5">
                        <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                            <ImageIcon size={20} className="text-primary-500" />
                        </span>
                        <p className="text-sm text-[#6d6d6d]">Upload an Image</p>
                    </label>}

                    {(botIcon) && <div className="w-full h-full text-sm flex items-center justify-between">
                        <div className='max-w-[100px]'>
                            <div className="text-secondary-50 truncate">{botIcon.name}</div>
                            <span className="text-xs text-[#808080]">{formatFileSize(botIcon.size)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-green-600 p-1 rounded-full bg-green-200">Uploaded</div>
                            <span onClick={handleDeleteBotIcon} className="cursor-pointer">
                                <X size={16} />
                            </span>
                        </div>
                    </div>}

                    <input onChange={handleBotIconChange} type="file" name="image" id="image" className="hidden" accept="image/*" />
                </div>
                <span className="text-[11px] text-[#808080]">Recommended image size is 512 x 512</span>
            </div>
        </div>
    )
}