import useAppearanceStore from '@/stores/useAppearanceStore';
import { formatFileSize } from '@/utils/formatFileSize';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react'

type Props = {}

/* eslint-disable @next/next/no-img-element */

export default function WidgetIcon({ }: Props) {
    const { widgetIconLink, widgetName, widgetIcon, setWidgetName, widgetIconPreview, setWidgetIcon, deleteWidgetIcon } = useAppearanceStore()

    const widgetIconRef = useRef<HTMLInputElement | null>(null);

    function handleWidgetIconChange(e: any) {
        const file = e.target.files[0];
        if (file) {
            setWidgetIcon(file);
        }
    }
    function handleDeleteWidgetIcon() {
        deleteWidgetIcon()
        if (widgetIconRef.current) {
            widgetIconRef.current.value = "";
        }
    };
    return (
        <div className="mt-10">
            <p className="text-sm text-secondary-50 mb-1">Widget Icon</p>
            <div className="flex gap-3">
                <div className="w-[64px] h-[64px]">
                    {widgetIconPreview ? <img src={widgetIconPreview} width={64} height={64} alt="widget preview" /> :
                        <img src={widgetIconLink} width={64} height={64} alt="widget link" />}
                </div>
                <div className="flex-1">
                    <div className="h-[64px] flex items-center p-3 w-full border bg-[#f8f8f8] border-[#e4e4e4] rounded-lg">
                        {(widgetName && !widgetIcon) && <div className="flex items-center gap-2">
                            <span onClick={() => setWidgetName("")} className="w-[26px] h-[26px] flex items-center justify-center rounded-full border-[2px] border-[#B8BEC1]">
                                <X size={16} className="cursor-pointer text-[#6d6d6d] text-sm" />
                            </span>
                            <span className="text-sm text-secondary-50">{widgetName}</span>
                        </div>}

                        {(!widgetIcon && !widgetName) && <label htmlFor="widgetIcon" className="w-full h-full cursor-pointer flex items-center gap-5">
                            <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                <ImageIcon size={20} className="text-primary-500" />
                            </span>
                            <p className="text-sm text-[#6d6d6d]">Upload an Image</p>
                        </label>}

                        {(widgetIcon) && <div className="w-full h-full text-sm flex items-center justify-between gap-2">
                            <div className="max-w-[100px]">
                                <div className="text-secondary-50 truncate">{widgetIcon.name}</div>
                                <span className="text-xs text-[#808080]">{formatFileSize(widgetIcon.size)}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-green-600 p-1 text-sm rounded-full bg-green-200">Uploaded</div>
                                <span onClick={handleDeleteWidgetIcon} className="cursor-pointer">
                                    <X size={16} />
                                </span>
                            </div>
                        </div>}

                        <input onChange={handleWidgetIconChange} ref={widgetIconRef} type="file" name="widgetIcon" id="widgetIcon" className="hidden" accept="image/*" />
                    </div>
                    <span className="text-[11px] text-[#808080]">Recommended image size is 64 x 64</span>
                </div>
            </div>
        </div>
    )
}