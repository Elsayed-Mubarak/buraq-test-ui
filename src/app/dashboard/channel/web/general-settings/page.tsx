"use client"
import CookiesSetting from "@/components/channel/web/generalSettings/CookiesSetting"
import PlaySoundSettings from "@/components/channel/web/generalSettings/PlaySoundSettings"
import RefreshPageSetting from "@/components/channel/web/generalSettings/RefreshPageSetting"
import TypeSpeedSlider from "@/components/channel/web/generalSettings/TypeSpeedSlider"
import ReusableCheckbox from "@/components/shared/ReusableCheckbox"
import ReusableButton from "@/components/shared/ReusableButton"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getWebGeneralSettings, updateWebGeneralSettings } from "@/service/webConfigurationsServices"
import SpinnerFull from "@/components/shared/SpinnerFull"
import toast from "react-hot-toast"

type Props = {}

export default function GeneralSettingsPage({ }: Props) {
    const queryClient = useQueryClient()
    const [enableTypeSpeed, setEnableTypeSpeed] = useState(true)
    const [typeSpeed, setTypeSpeed] = useState(60)

    const [removeBranding, setRemoveBranding] = useState(false)
    const [showHistoricalChats, setShowHistoricalChats] = useState(true)
    const [onPageRefresh, setOnPageRefresh] = useState<"start-new-chat" | "retain-existing-chat">("retain-existing-chat")
    const [cookieSetting, setCookieSetting] = useState<"always-added" | "manually-added">("always-added")

    const [playSound, setPlaySound] = useState(true)
    const [soundType, setSoundType] = useState<"classic" | "modern">("classic")

    const [stopBounceAnimation, setStopBounceAnimation] = useState(true)

    const [collectFeedback, setCollectFeedback] = useState(true)
    const [feedbackQuestion, setFeedbackQuestion] = useState("Overall, how would you rate your chat experience?")


    const { data, isLoading } = useQuery({
        queryKey: ["webConfigurations-generalSettings"],
        queryFn: getWebGeneralSettings
    })

    const { mutate: updateSettings, isPending } = useMutation({
        mutationFn: updateWebGeneralSettings,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["webConfigurations-generalSettings"] })
            toast.success("Your settings has been updated successfully")
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })

    useEffect(() => {
        if (data) {
            setEnableTypeSpeed(data.enableTypingSpeed)
            setTypeSpeed(data.typingSpeed)
            setRemoveBranding(data.removeBranding)
            setShowHistoricalChats(data.showHistoricalChats)
            setOnPageRefresh(data.onPageRefresh)
            setCookieSetting(data.cookieSetting)
            setPlaySound(data.playSound)
            setSoundType(data.soundType)
            setStopBounceAnimation(data.stopBounceAnimation)
            setCollectFeedback(data.collectFeedback)
            setFeedbackQuestion(data.feedbackQuestion)

        }
    }, [data])


    function handleUpdateSettings() {
        updateSettings({
            enableTypingSpeed: enableTypeSpeed,
            typingSpeed: typeSpeed,
            removeBranding: removeBranding,
            showHistoricalChats: showHistoricalChats,
            onPageRefresh: onPageRefresh,
            cookieSetting: cookieSetting,
            playSound: playSound,
            soundType: soundType,
            stopBounceAnimation: stopBounceAnimation,
            collectFeedback: collectFeedback,
            feedbackQuestion: feedbackQuestion
        })
    }

    if (isLoading) return <SpinnerFull />
    return (
        <div className="py-4 px-14">
            <div className="text-secondary-50  font-semibold font-barlow text-2xl mb-8">General Settings</div>
            <TypeSpeedSlider
                enableTypeSpeed={enableTypeSpeed}
                setEnableTypeSpeed={setEnableTypeSpeed}
                typeSpeed={typeSpeed}
                setTypeSpeed={setTypeSpeed}
            />
            <div>
                <ReusableCheckbox disabled size="small" label="Remove 'powered by' branding" labelColor="#092445" isChecked={removeBranding} setIsChecked={() => { }} />
            </div>
            <div>
                <ReusableCheckbox size="small" label="Show the list of historical chats" labelColor="#092445" isChecked={showHistoricalChats} setIsChecked={setShowHistoricalChats} />
            </div>
            <RefreshPageSetting onPageRefresh={onPageRefresh} setOnPageRefresh={setOnPageRefresh} />
            <CookiesSetting cookieSetting={cookieSetting} setCookieSetting={setCookieSetting} />
            <PlaySoundSettings soundType={soundType} setSoundType={setSoundType} playSound={playSound} setPlaySound={setPlaySound} />
            <div>
                <ReusableCheckbox size="small" label="Stop bouncing animation of the chat widget" labelColor="#092445" isChecked={stopBounceAnimation} setIsChecked={setStopBounceAnimation} />
            </div>
            <div className="mb-7">
                <ReusableCheckbox size="small" label="Collect CSAT survey when the chat ends" labelColor="#092445" isChecked={collectFeedback} setIsChecked={setCollectFeedback} />
                {collectFeedback && <div className="group ml-7">
                    <label className="group-focus-within:text-primary-500  text-sm text-secondary-50 block mb-1">Question to ask while collecting feedback</label>
                    <textarea onChange={(e) => { setFeedbackQuestion(e.target.value) }} value={feedbackQuestion} className="rounded-lg p-2 w-[365px] h-[70px] resize-none hover:border-primary-500 text-sm block focus:outline-none focus:border-primary-500  border border-[#e4e4e4]">
                    </textarea>
                </div>}
            </div>
            <div className="w-[400px] py-[30px] border-t border-[#e4e4e4]">
                <ReusableButton disabled={isPending} onClick={handleUpdateSettings}>
                    {isPending ? <span className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-primary-600 text-primary-600"></span> : "Save"}
                </ReusableButton>
            </div>
        </div>
    )
}