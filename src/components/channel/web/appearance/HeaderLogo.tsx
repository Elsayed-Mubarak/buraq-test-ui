import useAppearanceStore from '@/stores/useAppearanceStore';
import { formatFileSize } from '@/utils/formatFileSize';
import { ImageIcon, X } from 'lucide-react';
import React, { useRef, useState } from 'react'

type Props = {}

export default function HeaderLogo({ }: Props) {

    const { headerLogo, headerLogoName, deleteHeaderLogo, setHeaderLogo, setHeaderLogoName } = useAppearanceStore()

    const headerLogoRef = useRef<HTMLInputElement | null>(null);
    function handleHeaderLogoChange(e: any) {
        const file = e.target.files[0];
        if (file) {
            setHeaderLogo(file);
        }
    }

    function handleDeleteHeaderLogo() {
        deleteHeaderLogo()
        if (headerLogoRef.current) {
            headerLogoRef.current.value = "";
        }
    }
    return (
        <div className="mb-8">
            <p className="text-sm text-secondary-50 mb-1">Header Logo</p>
            <div>
                <div className="h-[64px] flex items-center p-3 w-full border bg-[#f8f8f8] border-[#e4e4e4] rounded-lg">
                    {(headerLogoName && !headerLogo) && <div className="flex items-center gap-2">
                        <span onClick={() => setHeaderLogoName("")} className="w-[26px] h-[26px] flex items-center justify-center rounded-full border-[2px] border-[#B8BEC1]">
                            <X size={16} className="cursor-pointer text-[#6d6d6d] text-sm" />
                        </span>
                        <span className="text-sm text-secondary-50">{headerLogoName}</span>
                    </div>}

                    {(!headerLogo && !headerLogoName) && <label htmlFor="headerLogo" className="w-full h-full cursor-pointer flex items-center gap-5">
                        <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                            <ImageIcon size={20} className="text-primary-500" />
                        </span>
                        <p className="text-sm text-[#6d6d6d]">Upload an Image</p>
                    </label>}

                    {(headerLogo) && <div className="w-full h-full text-sm flex items-center justify-between">
                        <div className='max-w-[100px]'>
                            <div className="text-secondary-50 truncate">{headerLogo.name}</div>
                            <span className="text-xs text-[#808080]">{formatFileSize(headerLogo.size)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-green-600 p-1 rounded-full bg-green-200">Uploaded</div>
                            <span onClick={handleDeleteHeaderLogo} className="cursor-pointer">
                                <X size={16} />
                            </span>
                        </div>
                    </div>}

                    <input onChange={handleHeaderLogoChange} ref={headerLogoRef} type="file" name="headerLogo" id="headerLogo" className="hidden" accept="image/*" />
                </div>
                <span className="text-[11px] text-[#808080]">Recommended image size is 512 x 512</span>
            </div>
        </div>
    )
}