"use client"
import Button from "@/components/live-chat/Button";
import { useChatStore } from "@/stores/useChatStore";
import webSocketSingleton from "@/service/socket";
import { useRouter } from 'next/navigation'

type Props = {}

export default function JoinConversation({ }: Props) {
    const router = useRouter()
    const selectedConversation = useChatStore((state) => state.selectedConversation);

    function handleJoinConversation() {
        webSocketSingleton.joinConversation(selectedConversation._id);
        // router.push('/dashboard/live-chat')
    }
    return (
        <div className="p-4 flex flex-col  items-center">
            <div className="text-sm mb-1 text-secondary-50">This conversation is not assigned to you.</div>
            <p className="text-[12px] mb-3 text-[#808080]">To send a message, click the button below.</p>
            <Button
                type=""
                onClick={(e: any) => {
                    e.preventDefault();
                    handleJoinConversation();
                }}
            >Join Conversation</Button>
        </div>
    )
}