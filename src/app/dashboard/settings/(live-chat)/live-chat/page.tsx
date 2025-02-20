"use client";

import { getLiveChatSettings, updateLiveChatSettings } from "@/service/liveChatSettingsServices";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SpinnerFull from "@/components/shared/SpinnerFull";


type Props = {}
type ChatVisibility = "all" | "assignedToTeam" | "assignedOnly"

export default function Page({ }: Props) {
    const queryClient = useQueryClient()
    const [maxConvAgentHandle, setMaxConvAgentHandle] = useState(0)
    const [SLATimer, setSLATimer] = useState(true)
    const [SLATime, setSLATime] = useState(0)
    const [closeInactiveChatTime, setCloseInactiveChatTime] = useState(0)
    const [chatVisibility, setChatVisibility] = useState<ChatVisibility>("all")
    const [includeUnassignedChats, setIncludeUnassignedChats] = useState(true)
    const [numFiledsVisible, setNumFiledsVisible] = useState(0)
    const [convCardProp, setConvCardProp] = useState({
        assignee: true,
        channel: true,
        csatRating: true,
        location: true
    })

    // for later
    const plan = "free"
    const [knowledgeBase, setKnowledgeBase] = useState("a")
    const [trainWithLiveChatTranscripts, setTrainWithLiveChatTranscripts] = useState(false)
    const [teammateChatToTrain, setTeammateChatToTrain] = useState("")


    const { data, isLoading } = useQuery({
        queryKey: ['liveChatSettings'],
        queryFn: getLiveChatSettings
    })
    const { mutate: updateChatSettings, isPending } = useMutation({
        mutationFn: updateLiveChatSettings,
        onSuccess: () => {
            toast.success("Chat settings updated successfully")
            queryClient.invalidateQueries({ queryKey: ['liveChatSettings'] })
        }
    })

    const handleMaxConvAgentHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxConvAgentHandle(parseInt(e.target.value))
    }
    const handleChatVisibility = (value: ChatVisibility) => {
        setChatVisibility(value)
    }

    const handleIncludeUnassignedChats = (value: boolean) => {
        setIncludeUnassignedChats(value)
    }

    function handleConvCardProp(value: string, checked: boolean) {
        setConvCardProp((prev) => {
            return {
                ...prev,
                [value]: checked
            }
        })
    }

    useEffect(() => {
        if (data) {
            setCloseInactiveChatTime(data.autoCloseDuration)
            setConvCardProp(data.cardProperties)
            setChatVisibility(data.chatVisibility)
            setNumFiledsVisible(data.defaultFieldsCount)
            setIncludeUnassignedChats(data.includeUnassignedChats)
            setMaxConvAgentHandle(data.maxConcurrentChats)
            setSLATime(data.slaTimerDuration)
            setSLATimer(data.slaTimerEnabled)


            // setTrainWithLiveChatTranscripts(data.trainWithLiveChats)
        }
    }, [data])


    function handleUpdateChatSettings() {
        updateChatSettings({
            autoCloseDuration: closeInactiveChatTime,
            cardProperties: convCardProp,
            chatVisibility: chatVisibility,
            defaultFieldsCount: numFiledsVisible,
            includeUnassignedChats: includeUnassignedChats,
            maxConcurrentChats: maxConvAgentHandle,
            slaTimerEnabled: SLATimer,
            slaTimerDuration: SLATime,

            // trainWithLiveChats: trainWithLiveChatTranscripts,
        })
    }


    if (isLoading) return <SpinnerFull />
    return (
        <div className="py-4 px-12">
            <div className="text-2xl font-semibold text-secondary-50 mb-12 font-barlow">Live Chat Settings</div>

            {/* Conversation */}
            <div className="border-b border-primary-50">
                <h3 className="text-xl font-semibold text-secondary-50">Conversation Threshold</h3>
                <div className="flex items-center justify-between gap-2 py-4 max-w-2xl w-full">
                    <p className="text-secondary-50">
                        Maximum conversations an agent can handle simultaneously
                    </p>
                    <input
                        value={maxConvAgentHandle}
                        onChange={handleMaxConvAgentHandle}
                        type="number"
                        className="w-[77px] h-[34px] border rest-input"
                    />
                </div>
            </div>

            {/* SLA Timer */}
            <div className="border-b border-primary-50">
                <div className="max-w-2xl w-full">
                    <div className="flex items-center justify-between gap-2 pt-2 pb-4 w-fit">
                        <Label
                            htmlFor="sla-timer"
                            className="text-lg text-secondary-50 font-light cursor-pointer"
                        >
                            SLA Timer (Service Level Agreement)
                        </Label>
                        <Switch
                            checked={SLATimer}
                            onCheckedChange={setSLATimer}
                            id="sla-timer"
                            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-[#CDCDCD]" />
                    </div>

                    <div className="flex items-center justify-between gap-2 w-full pb-2 text-sm text-secondary-50">
                        <p>Target to reply to visitor messages within this duration (in mins)</p>
                        <input
                            disabled={!SLATimer}
                            value={SLATime}
                            onChange={(e) => setSLATime(parseInt(e.target.value))}
                            type="number"
                            defaultValue={3}
                            className="w-[77px] h-[34px] border rest-input"
                        />
                    </div>
                </div>
            </div>

            {/* Auto Close Duration */}
            <div className="border-b border-primary-50">
                <h3 className="font-bold text-secondary-50 pt-2 pb-4">Auto Close Duration</h3>
                <div className="flex items-center justify-between gap-2 pb-2 text-sm text-secondary-50 max-w-2xl w-full">
                    <h3>Inactive conversations are closed after this duration (in mins)</h3>
                    <input
                        value={closeInactiveChatTime}
                        onChange={(e) => setCloseInactiveChatTime(parseInt(e.target.value))}
                        type="number"
                        className="w-[77px] h-[34px] border rest-input"
                    />
                </div>
            </div>

            {/* Chat Visibility */}
            <div className="border-b border-primary-50">
                <h3 className="font-bold text-secondary-50 pt-2 pb-4">Chat visibility</h3>
                <div>
                    <RadioGroup value={chatVisibility} onValueChange={handleChatVisibility} className="flex flex-col gap-2 max-w-sm w-full border-b pb-3">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="r1" className="text-blue-700 border size-4 border-gray-500 checked:border-blue-700" />
                            <Label htmlFor="r1">Display all chats to everyone</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="assignedToTeam" id="r2" className="text-blue-700 border size-4 border-gray-500 checked:border-blue-700" />
                            <Label htmlFor="r2">Display chats assigned to team members</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="assignedOnly" id="r3" className="text-blue-700 border size-4 border-gray-500 checked:border-blue-700" />
                            <Label htmlFor="r3">Display assigned chats only</Label>
                        </div>
                    </RadioGroup>
                    <div className="flex items-center gap-2 py-4">
                        <Checkbox
                            disabled={chatVisibility === "all"}
                            checked={chatVisibility === "all" ? true : includeUnassignedChats}
                            onCheckedChange={handleIncludeUnassignedChats}
                            id="unassigned-chats"
                            className="data-[state=checked]:bg-primary-500 data-[state=checked]:text-white"
                        />
                        <label htmlFor="unassigned-chats" className="ms-1 text-sm cursor-pointer select-none text-secondary-50">Include unassigned chats</label>
                    </div>
                </div>
            </div>

            <div className="border-b border-primary-50">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-secondary-50 pt-2 pb-4">Generate response</h3>
                    <div className="flex items-center gap-2">
                        <HoverCard>
                            <HoverCardTrigger>
                                <svg width="22px" height="22px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M15.8333 8.33333H16.6667C17.1269 8.33333 17.5 8.70641 17.5 9.16666V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333H3.33333C2.8731 18.3333 2.5 17.9602 2.5 17.5V9.16666C2.5 8.70641 2.8731 8.33333 3.33333 8.33333H4.16667V7.5C4.16667 4.27834 6.77834 1.66666 10 1.66666C13.2217 1.66666 15.8333 4.27834 15.8333 7.5V8.33333ZM14.1667 8.33333V7.5C14.1667 5.19881 12.3012 3.33333 10 3.33333C7.69882 3.33333 5.83333 5.19881 5.83333 7.5V8.33333H14.1667ZM9.16667 11.6667V15H10.8333V11.6667H9.16667Z" fill="#f1b000"></path></svg>
                            </HoverCardTrigger>
                            <HoverCardContent align="start" side="bottom" sideOffset={0} className="w-[300px] bg-secondary-50  transition-none duration-0  rounded-lg translate-y-[-60%] translate-x-6">
                                <div className="text-white text-sm flex items-center gap-1 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 3C10.3431 3 9 4.34315 9 6V9C9 9.00076 9 9.00152 9 9.00228C9.29722 8.99999 9.61798 9 9.96448 9H14.0355C14.9373 8.99999 15.6647 8.99999 16.2567 9.04038C16.8654 9.08191 17.4037 9.16948 17.9134 9.3806C19.1386 9.88807 20.1119 10.8614 20.6194 12.0866C20.8305 12.5963 20.9181 13.1346 20.9596 13.7433C21 14.3353 21 15.0627 21 15.9645V16.0355C21 16.9373 21 17.6647 20.9596 18.2567C20.9181 18.8654 20.8305 19.4037 20.6194 19.9134C20.1119 21.1386 19.1386 22.1119 17.9134 22.6194C17.4037 22.8305 16.8654 22.9181 16.2567 22.9596C15.6647 23 14.9373 23 14.0355 23H9.96448C9.06272 23 8.33531 23 7.74331 22.9596C7.13456 22.9181 6.59628 22.8305 6.08658 22.6194C4.86144 22.1119 3.88807 21.1386 3.3806 19.9134C3.16948 19.4037 3.08191 18.8654 3.04038 18.2567C2.99999 17.6647 2.99999 16.9373 3 16.0355V15.9645C2.99999 15.0627 2.99999 14.3353 3.04038 13.7433C3.08191 13.1346 3.16948 12.5963 3.3806 12.0866C3.88807 10.8614 4.86144 9.88807 6.08658 9.3806C6.38131 9.25852 6.68559 9.17776 7.00753 9.12331C7.00256 9.08291 7 9.04175 7 9V6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6C17 6.55228 16.5523 7 16 7C15.4477 7 15 6.55228 15 6C15 4.34315 13.6569 3 12 3ZM7.87945 11.0357C7.37254 11.0703 7.07734 11.135 6.85195 11.2284C6.11687 11.5328 5.53284 12.1169 5.22836 12.8519C5.135 13.0773 5.07033 13.3725 5.03574 13.8794C5.00054 14.3953 5 15.0544 5 16C5 16.9456 5.00054 17.6047 5.03574 18.1206C5.07033 18.6275 5.135 18.9227 5.22836 19.1481C5.53284 19.8831 6.11687 20.4672 6.85195 20.7716C7.07734 20.865 7.37254 20.9297 7.87945 20.9643C8.39534 20.9995 9.05443 21 10 21H14C14.9456 21 15.6047 20.9995 16.1206 20.9643C16.6275 20.9297 16.9227 20.865 17.1481 20.7716C17.8831 20.4672 18.4672 19.8831 18.7716 19.1481C18.865 18.9227 18.9297 18.6275 18.9643 18.1206C18.9995 17.6047 19 16.9456 19 16C19 15.0544 18.9995 14.3953 18.9643 13.8794C18.9297 13.3725 18.865 13.0773 18.7716 12.8519C18.4672 12.1169 17.8831 11.5328 17.1481 11.2284C16.9227 11.135 16.6275 11.0703 16.1206 11.0357C15.6047 11.0005 14.9456 11 14 11H10C9.05443 11 8.39534 11.0005 7.87945 11.0357ZM12 14C12.5523 14 13 14.4477 13 15V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V15C11 14.4477 11.4477 14 12 14Z" fill="#f1b000" />
                                    </svg>
                                    <span>Upgrade to Custom plan</span>
                                </div>
                                <p className="text-[12px] leading-none text-[#e8e8e8]">This feature is not available in your plan. Upgrade your plan to unlock it.</p>
                                <div className="flex items-center justify-end mt-1">
                                    <Button size="sm" className="bg-primary-500 h-[30px] hover:bg-primary-600 text-sm text-white">Contact us</Button>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-2 max-w-[800px] w-full">
                    <p className="text-secondary-50">Choose the knowledge base to generate responses from</p>
                    <Select disabled value={knowledgeBase} onValueChange={setKnowledgeBase}>
                        <SelectTrigger className="w-[250px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            <SelectGroup>
                                <SelectItem value="a">A</SelectItem>
                                <SelectItem value="b">B</SelectItem>
                                <SelectItem value="c">C</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="pb-4">
                    <div className="flex items-center justify-between gap-2 pt-2 pb-4 w-full max-w-[600px]">
                        <Label
                            htmlFor="train-live-chat"
                            className="text-secondary-50 cursor-pointer"
                        >
                            Train with live chat transcripts
                        </Label>
                        <Switch
                            disabled={plan === "free"}
                            id="train-live-chat"
                            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-[#CDCDCD] self-start"
                            checked={trainWithLiveChatTranscripts}
                            onCheckedChange={(value) => setTrainWithLiveChatTranscripts(value)}
                        />
                    </div>
                    {trainWithLiveChatTranscripts && (
                        <div className="flex items-center justify-between gap-2 max-w-[800px] w-full">
                            <p className="text-secondary-50">Choose the teammates whose chats are to be trained</p>
                            <Select value={teammateChatToTrain} onValueChange={setTeammateChatToTrain}>
                                <SelectTrigger className="w-[250px]">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="a">A</SelectItem>
                                        <SelectItem value="b">B</SelectItem>
                                        <SelectItem value="c">C</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
            </div>

            <div className="border-b border-primary-50 py-4">
                <h3 className="text-xl font-semibold text-secondary-50">Field Visibility</h3>
                <div className="flex items-center justify-between gap-2 py-4 max-w-2xl w-full">
                    <p className="text-secondary-50">
                        Number of fields you want to see in a list by default
                    </p>
                    <input
                        value={numFiledsVisible}
                        onChange={(e) => setNumFiledsVisible(Number(e.target.value))}
                        type="number"
                        className="w-[77px] h-[34px] border rest-input"
                    />
                </div>
            </div>


            <div className="border-b border-primary-50 py-4">
                <h3 className="font-semibold text-lg text-secondary-50">Conversation Card Properties</h3>
                <p>Select the properties you want to see in the conversation list by default</p>

                <div className="flex items-center gap-2 py-2">
                    <Checkbox
                        checked={convCardProp.assignee}
                        onCheckedChange={(checked: boolean) => handleConvCardProp('assignee', checked)}
                        id="assignee"
                        className="data-[state=checked]:bg-blue-700 data-[state=checked]:text-gray-50"
                    />
                    <label htmlFor="assignee" className="ms-1 text-sm cursor-pointer select-none text-secondary-50">Assignee</label>
                </div>
                <div className="flex items-center gap-2 py-2">
                    <Checkbox
                        checked={convCardProp.channel}
                        onCheckedChange={(checked: boolean) => handleConvCardProp('channel', checked)}
                        id="channel"
                        className="data-[state=checked]:bg-blue-700 data-[state=checked]:text-gray-50"
                    />
                    <label htmlFor="channel" className="ms-1 text-sm cursor-pointer select-none text-secondary-50">channel</label>
                </div>
                <div className="flex items-center gap-2 py-2">
                    <Checkbox
                        checked={convCardProp.csatRating}
                        onCheckedChange={(checked: boolean) => handleConvCardProp('csatRating', checked)}
                        id="csat"
                        className="data-[state=checked]:bg-blue-700 data-[state=checked]:text-gray-50"
                    />
                    <label htmlFor="csat" className="ms-1 text-sm cursor-pointer select-none text-secondary-50">CSAT Rating</label>
                </div>
                <div className="flex items-center gap-2 py-2">
                    <Checkbox
                        checked={convCardProp.location}
                        onCheckedChange={(checked: boolean) => handleConvCardProp('location', checked)}
                        id="location"
                        className="data-[state=checked]:bg-blue-700 data-[state=checked]:text-gray-50"
                    />
                    <label htmlFor="location" className="ms-1 text-sm cursor-pointer select-none text-secondary-50">Location</label>
                </div>
            </div>
            <Button disabled={isPending} onClick={handleUpdateChatSettings} className="bg-primary-500 hover:bg-primary-600 text-sm text-white my-4 rounded-lg px-5">
                {isPending ? "Saving..." : "Save"}
            </Button>
        </div>
    )
}