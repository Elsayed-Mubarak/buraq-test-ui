"use client";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { LiaAngleRightSolid } from "react-icons/lia";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { WorkflowBotType } from "../../../../types/workflow";
import { useState } from "react";
import Link from "next/link";
import { useBotStore } from "@/stores/useBot.store";

export default function WorkflowCardMenu({ workflow, type }: { workflow: any, type: WorkflowBotType }) {
    const [isHovered, setIsHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const { deleteBot } = useBotStore();

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    const handleDelete = async (id: string) => {
        setClicked(true);
        await deleteBot(id);
        setClicked(false);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <HiOutlineDotsVertical className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white z-30 w-52 rounded-xl border" align="end">
                <DropdownMenuItem className="text-base cursor-pointer font-medium text-[#092445]"
                    asChild
                >
                    <Link href={`/dashboard/botbuilder/workflows/${workflow.id}`} prefetch>Edit</Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="text-base cursor-pointer font-medium text-[#092445] flex items-center justify-between relative"
                    onMouseEnter={type === "inbound" ? handleMouseEnter : undefined}
                    onMouseLeave={type === "inbound" ? handleMouseLeave : undefined}
                >
                    <button>Clone</button>
                    {type === "inbound" && <LiaAngleRightSolid className="w-4 h-4" strokeWidth={'1px'} />}
                </DropdownMenuItem>
                <div
                    className={`${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'} flex flex-col gap-3 items-start transition-all duration-300 bg-white 
                    rounded-lg px-4 py-2 absolute top-12 -right-52 border border-gray-200 w-52 text-sm font-semibold text-[#092445]`}
                >
                    <button>Web</button>
                    <button>Facebook Messenger</button>
                    <button>Whatsapp</button>
                    <button>SMS</button>
                    <button>Instagram</button>
                </div>
                <DropdownMenuItem className="text-base cursor-pointer font-medium text-[#092445]"
                    asChild
                >
                    <button
                        onClick={() => handleDelete(workflow._id)}
                        disabled={clicked}
                    >
                        Delete
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base cursor-pointer font-medium text-[#092445]"
                    asChild
                >
                    <button>Share</button>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base cursor-pointer font-medium text-[#092445]"
                    asChild
                >
                    <button>View clicks</button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


