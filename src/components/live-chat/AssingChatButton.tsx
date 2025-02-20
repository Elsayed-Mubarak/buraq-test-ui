"use client"
import { ChevronDown, CircleUserRound } from "lucide-react"
import { useEffect, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import {
    UserCircleIcon,
} from "@heroicons/react/24/solid";

import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import ToolTip from "../shared/ToolTip";
import Image from "next/image";
import UserIcon from "../../../public/icons/UserIcon";
import webSocketSingleton from "@/service/socket";


type Props = {
    selectedConversation: any
}

export default function AssingChatButton({ selectedConversation }: Props) {
    const activeMembers = useChatStore((state) => state.activeMembers);
    const allTeams = useChatStore((state) => state.teams);
    const allTeamMates = useChatStore((state) => state.teamates);
    const authUser = useAuthStore((state) => state.authUser);
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<any>("")
    const [selecteFrom, setSelectFrom] = useState<"teamMate" | "team">("teamMate")

    function handleUnassignedConversation() {
        webSocketSingleton.unassignedConversation(selectedConversation._id);
    }

    function handleAssignConversation(teammateId: any, type: any) {
        webSocketSingleton.assignConversation(selectedConversation._id, teammateId, type);
    }

    const data: any = selecteFrom === "teamMate" ? allTeamMates : allTeams;
    useEffect(() => {
        setValue(selectedConversation?.assignedTo?._id)
    }, [selectedConversation])
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button>
                    <ToolTip title="Assign chat to teammate">
                        <div className="flex cursor-pointer items-center gap-1 rounded px-[10px] py-2 transition-all duration-200 hover:bg-[#f1f1f16a]">
                            <UserCircleIcon className="h-8 w-8 text-[#e5e7eb]" />
                            <ChevronDown className="h-5 w-5 text-[#384250]" />
                        </div>
                    </ToolTip>
                </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[250px] h-[260px] p-0 bg-white">
                <Command>
                    <CommandInput placeholder="Search..." className="h-9 my-2" />
                    <CommandList>
                        {selecteFrom === "teamMate" && <CommandEmpty>No item founded.</CommandEmpty>}
                        <CommandGroup>
                            <div className="grid text-sm grid-cols-2 pt-2 border-b border-primary-50">
                                <button onClick={() => setSelectFrom("teamMate")} className={`pb-3 ${selecteFrom === "teamMate" ? "text-primary-600 border-b border-primary-600" : "text-[#808080]"}`}>Teammates</button>
                                <button onClick={() => setSelectFrom("team")} className={`pb-3 ${selecteFrom === "team" ? "text-primary-600 border-b border-primary-600" : "text-[#808080]"}`}>Team</button>
                            </div>
                            {selecteFrom === "teamMate" && <CommandItem
                                className=" cursor-pointer hover:bg-[#f3f3f3] p-3"
                                value={undefined}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? {} : currentValue)
                                    setOpen(false)
                                    handleUnassignedConversation()
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex h-5 w-5 items-center justify-center">
                                        <UserIcon />
                                    </div>
                                    <span>
                                        None
                                    </span>
                                </div>
                                <Check
                                    className={cn(
                                        "ml-auto text-primary-600",
                                        selectedConversation?.type === "unassigned" || selectedConversation?.assignedTo === null ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>}
                            {selecteFrom === "team" && <CommandEmpty>No item founded.</CommandEmpty>}
                            {selecteFrom === "teamMate" && data?.map((teamMate: any, index: any) => (
                                <CommandItem
                                    className=" cursor-pointer hover:bg-[#f3f3f3] p-3"
                                    key={index}
                                    value={teamMate?.teammate?._id}
                                    onSelect={() => {
                                        setValue((prev: any) => {
                                            const newValue = prev === teamMate.teammate._id ? prev : teamMate.teammate._id;
                                            handleAssignConversation(newValue, "TeamMates");
                                            return newValue;
                                        });
                                        setOpen(false)
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="relative w-5 h-5 flex items-center justify-center ">
                                            <span className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ${activeMembers.includes(teamMate?.teammate?._id) ? "bg-[#13be66]" : "bg-[#808080]"}`}></span>
                                            {
                                                teamMate?.teammate?.profilePicture ? (
                                                    <Image
                                                        src={teamMate?.teammate?.profilePicture}
                                                        alt={teamMate?.teammate?.firstName}
                                                        width={16}
                                                        height={16}
                                                        className="h-4 w-4 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <UserIcon />
                                                )
                                            }
                                        </div>
                                        <span className=" text-secondary-50 truncate w-[140px]">
                                            {
                                                teamMate?.teammate?._id === authUser?._id ? "Me" : `${teamMate?.teammate?.firstName} ${teamMate?.teammate?.lastName}`
                                            }
                                        </span>
                                    </div>
                                    <Check
                                        className={cn(
                                            "ml-auto text-primary-600",
                                            value === teamMate?.teammate?._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>

                            ))}
                            {selecteFrom === "team" && data?.data?.map((team: any, index: any) => (
                                <CommandItem
                                    className=" cursor-pointer hover:bg-[#f3f3f3] p-3"
                                    key={index}
                                    value={team}
                                    onSelect={(currentValue) => {
                                        // setValue(currentValue === value ? team : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <span>
                                            <UserIcon />
                                        </span>
                                        <span className=" text-secondary-50 truncate">
                                            {team.name}
                                        </span>
                                    </div>
                                    {/* <Check
                                        className={cn(
                                            // "ml-auto text-primary-600",
                                            // value?._id === teamMate?.teammate?._id ? "opacity-100" : "opacity-0"
                                        )} */}
                                    {/* /> */}
                                </CommandItem>

                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}