import useAppearanceStore from '@/stores/useAppearanceStore';
import React, { useState } from 'react'

type Props = {}

export default function CustomeStyleSheet({ }: Props) {
    const { customeStyleSheet, setCustomeStyleSheet } = useAppearanceStore()
    return (
        <div className="mb-8">
            <label htmlFor="header-text" className="text-sm text-secondary-50">CSS (Custome Style Sheet)</label>
            <div className="w-full h-[120px]">
                <textarea value={customeStyleSheet} onChange={(e) => setCustomeStyleSheet(e.target.value)} className="w-full h-full text-black focus:outline-none resize-none py-2 px-3 text-sm rounded-sm border border-[#808080]"></textarea>
            </div>
        </div>
    )
}