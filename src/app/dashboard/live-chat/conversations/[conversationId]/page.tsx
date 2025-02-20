"use client"
import Chat from "@/components/live-chat/Chat";
import { getConversationById } from "@/service/chatService";
import { useChatStore } from "@/stores/useChatStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
    params: { conversationId: string }
}
export default function Page({ params }: Props) {
    // const setSelectedConversation = useChatStore((state) => state.setSelectedConversation);
    const { data: conversation, isLoading } = useQuery({
        queryKey: ["single-conversation", params.conversationId],
        queryFn: () => getConversationById(params.conversationId),
    })

    // useEffect(() => {
    //     if (conversation) setSelectedConversation(conversation);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [conversation])
    return <Chat conversations={[conversation]} isLoading={isLoading} />
}