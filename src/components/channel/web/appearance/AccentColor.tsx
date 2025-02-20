import useAppearanceStore from '@/stores/useAppearanceStore';
import React, { useEffect, useState } from 'react'

type Props = {}

export default function AccentColor({ }: Props) {
    const { accentColor, setAccentColor } = useAppearanceStore()

    return (
        <div className="group mb-8 relative w-[120px]">
            <label htmlFor="header-text" className="group-focus-within:text-primary-500 text-sm text-secondary-50">Accent Color</label>
            <input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} type="text" className="block text-black h-[34px] p-2 w-full hover:border-primary-500 text-sm rounded-lg border border-[#e4e4e4] focus:outline-none focus:border-primary-500" id="header-text" />
            <div className="absolute top-[53%] right-2">
                <div className="relative w-[20px] h-[20px]  bg-blue-800 overflow-hidden rounded-full">
                    <input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} type="color" className="cursor-pointer absolute -top-2 -left-2 w-[200%] h-[200%]  outline-none  border-0 " />
                </div>
            </div>
        </div>
    )
}