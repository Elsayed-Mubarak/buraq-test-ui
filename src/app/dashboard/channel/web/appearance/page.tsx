"use client"
import ChatAppearance from "@/components/channel/web/appearance/ChatAppearance"
import ResuableButton from "@/components/shared/ReusableButton"
import WidgetIcon from "@/components/channel/web/appearance/WidgetIcon"
import HeaderText from "@/components/channel/web/appearance/HeaderText"
import HeaderLogo from "@/components/channel/web/appearance/HeaderLogo"
import BotIcon from "@/components/channel/web/appearance/BotIcon"
import HintText from "@/components/channel/web/appearance/HintText"
import AccentColor from "@/components/channel/web/appearance/AccentColor"
import FontColor from "@/components/channel/web/appearance/FontColor"
import CustomeStyleSheet from "@/components/channel/web/appearance/CustomeStyleSheet"
import ChatBotIconPosition from "@/components/channel/web/appearance/ChatBotIconPosition"
import useAppearanceStore from "@/stores/useAppearanceStore"
import SpinnerFull from "@/components/shared/SpinnerFull"
import { useEffect } from "react"
import { axiosInstance } from "@/lib/axios"

export default function AppearancePage() {
    const { fetchWebAppearanceData, updateWebAppearance, isLoading, isUpdating } = useAppearanceStore((state) => ({
        fetchWebAppearanceData: state.fetchWebAppearanceData,
        updateWebAppearance: state.updateWebAppearance,
        isLoading: state.isLoading,
        isUpdating: state.isUpdating
    }));

    useEffect(() => {
        fetchWebAppearanceData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleUpdateWebAppearance() {
        updateWebAppearance()
    }

    if (isLoading) return <SpinnerFull />
    return (
        <div className="py-4 px-14">
            <div className="w-[320px]">
                <div className="text-secondary-50 font-semibold text-2xl mb-10 font-barlow">Customize your bot</div>
                <div className="pb-8 border-b border-primary-50">
                    <ResuableButton disabled={isUpdating} onClick={handleUpdateWebAppearance}>Apply changes</ResuableButton>
                </div>
                <WidgetIcon />
                <HeaderText />
                <HeaderLogo />
                <BotIcon />
                <HintText />
                <AccentColor />
                <FontColor />
                <CustomeStyleSheet />
                <ChatBotIconPosition />
                <div className="py-8 border-t border-[#e4e4e4]">
                    <ResuableButton disabled={isUpdating} onClick={handleUpdateWebAppearance}>Apply changes</ResuableButton>
                </div>
            </div>
            <ChatAppearance />
        </div>
    )
}


