"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import ReusableButton from "@/components/shared/ReusableButton"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getWebTriggerConditions, updateWebTriggerConditions } from "@/service/webConfigurationsServices"
import SpinnerFull from "@/components/shared/SpinnerFull"
import toast from "react-hot-toast"
type Props = {}

type actions = "auto-open-bot" | "show-popup-message" | "do-nothing"
export default function BotTriggersPage({ }: Props) {
    const queryClient = useQueryClient()
    const [newUserConfig, setNewUserConfig] = useState<actions>("do-nothing")
    const [returningUserConfig, setReturningUserConfig] = useState<actions>("do-nothing")
    const [returningValue, setReturningValue] = useState<number>(14);

    const { data, isLoading } = useQuery({
        queryKey: ['bot-triggers'],
        queryFn: getWebTriggerConditions
    })

    const { mutate: updateBotTriggers, isPending } = useMutation({
        mutationFn: updateWebTriggerConditions,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bot-triggers'] })
            toast.success('Bot Triggers settings updated successfully')
        },
        onError: (error: any) => {
            console.log('error')
            toast.error(error)
        }
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue === '' || (Number(inputValue) <= 180 && inputValue.length <= 3)) {
            setReturningValue(Number(inputValue));
        }
    };

    function handleUpdateBotTriggers() {
        const data = {
            newUser: newUserConfig,
            returnUser: {
                actions: returningUserConfig,
                duration: returningValue
            }
        }
        updateBotTriggers(data)
    }

    useEffect(() => {
        if (data) {
            setNewUserConfig(data.newUser)
            setReturningUserConfig(data.returnUser?.actions)
            setReturningValue(data.returnUser?.duration)
        }
    }, [data])


    if (isLoading) return <SpinnerFull />
    return (
        <div className="pl-14 pt-4 max-w-[800px]">
            <div>
                <div className="text-secondary-50 font-semibold text-lg">New User Configuration</div>
                <p className="text-[13px] text-[#808080]">New user is a website visitor landing on your website for the first time</p>
            </div>
            <div className="pt-7 pb-6 border-b-[3px] border-[#cdcdcd]">
                <p className="text-[13px] text-[#808080] mb-1">What should the chatbot do when a new user lands on your website?</p>
                <Select value={newUserConfig} onValueChange={(value) => setNewUserConfig(value as actions)}>
                    <SelectTrigger className="w-[240px] h-8 text-secondary-50 hover:border-primary-500 focus:border-primary-500 focus:ring-0 focus:ring-offset-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-[240] bg-white p-0">
                        <SelectGroup>
                            <SelectItem className="text-secondary-50 py-1 px-4 cursor-pointer hover:bg-[#f3f3f3]" value="auto-open-bot">auto open bot</SelectItem>
                            <SelectItem className="text-secondary-50 py-1 px-4 cursor-pointer hover:bg-[#f3f3f3]" value="show-popup-message">show pop-up message</SelectItem>
                            <SelectItem className="text-secondary-50 py-1 px-4 cursor-pointer hover:bg-[#f3f3f3]" value="do-nothing">do nothing</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="pt-7 pb-6 border-b-[3px] border-[#cdcdcd]">
                <div className="text-secondary-50 font-semibold text-lg">Returning User Configuration</div>
                <p className="text-[13px] text-[#808080]">A returning user is a website visitor who lands on your website again after a certain period of time</p>
                <p className="text-[13px] text-[#808080] pt-7 pb-1">Returning visitor is one who has visited website in the last</p>
                <div className="flex items-center gap-4">
                    <input
                        value={returningValue}
                        onChange={handleChange}
                        max="180"
                        type="number"
                        placeholder="00"
                        className="w-[80px] p-2 h-10 text-black hover:border-primary-500 border border-[#e4e4e4] focus:outline-none focus:border-primary-500 rounded-lg text-sm" />
                    <div className="flex items-center gap-1">
                        <span className="text-sm text-secondary-50">days</span>
                        <span className="text-[13px] text-[#808080] italic">( Days should be in the range of 1-180 )</span>
                    </div>
                </div>
                <p className="text-[13px] text-[#808080] mb-1 pt-6">What should the chatbot do when a returning user lands on your website?</p>
                <Select value={returningUserConfig} onValueChange={(value) => setReturningUserConfig(value as actions)}>
                    <SelectTrigger className="w-[240px] h-8 text-secondary-50 hover:border-primary-500 focus:border-primary-500 focus:ring-0 focus:ring-offset-0">
                        <SelectValue defaultValue="do-nothing" />
                    </SelectTrigger>
                    <SelectContent className="w-[240] bg-white p-0">
                        <SelectGroup>
                            <SelectItem className="text-secondary-50 py-1 px-4 cursor-pointer hover:bg-[#f3f3f3]" value="auto-open-bot">auto open bot</SelectItem>
                            <SelectItem className="text-secondary-50 py-1 px-4 cursor-pointer hover:bg-[#f3f3f3]" value="show-popup-message">show pop-up message</SelectItem>
                            <SelectItem className="text-secondary-50 py-1 px-4 cursor-pointer hover:bg-[#f3f3f3]" value="do-nothing">do nothing</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="my-8">
                <ReusableButton disabled={isPending} onClick={handleUpdateBotTriggers}>
                    {isPending ? <span className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-primary-600 text-primary-600"></span> : "Save Configuration"}
                </ReusableButton>
            </div>
        </div>
    )
}