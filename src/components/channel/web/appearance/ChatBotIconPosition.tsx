import React, { useEffect, useState } from 'react'
import { ActiveLeftIcon, ActiveRightIcon, NormalLeftIcon, NormalRightIcon } from "../../../../../public/icons/webAppearance"
import useAppearanceStore from '@/stores/useAppearanceStore';


type Props = {}

export default function ChatBotIconPosition({ }: Props) {
    const { chatInterfacePosition, setChatInterfacePosition } = useAppearanceStore();
    return (
        <div className="mb-8">
            <label htmlFor="header-text" className="text-sm text-secondary-50">Chat Interface Position</label>
            <div className="flex items-center gap-3">
                <div onClick={() => setChatInterfacePosition("left")} className="flex items-end gap-1 text-sm cursor-pointer">
                    <span>
                        {chatInterfacePosition === "left" && <ActiveLeftIcon />}
                        {chatInterfacePosition === "right" && <NormalLeftIcon />}

                    </span>
                    <span>Left</span>
                </div>
                <div onClick={() => setChatInterfacePosition("right")} className="flex items-end gap-1 text-sm cursor-pointer">
                    <span>
                        {chatInterfacePosition === "left" && <NormalRightIcon />}
                        {chatInterfacePosition === "right" && <ActiveRightIcon />}
                    </span>
                    <span>Right</span>
                </div>
            </div>
        </div>
    )
}