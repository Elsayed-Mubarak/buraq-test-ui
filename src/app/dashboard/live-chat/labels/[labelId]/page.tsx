"use client"
import Chat from "@/components/live-chat/Chat"
import { getConversationsByLabel } from "@/service/labelsServices";
import { useChatStore } from "@/stores/useChatStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
    params: { labelId: string }
}

export default function Page({ params }: Props) {
    // const setSelectedConversation = useChatStore((state) => state.setSelectedConversation);

    const { data, isLoading } = useQuery({
        queryKey: ["labelConversations", params.labelId],
        queryFn: () => getConversationsByLabel(params.labelId),
    })
    // useEffect(() => {
    //     if (data?.conversations?.length > 0) setSelectedConversation(data.conversations[0]);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [data])

    return (
        <Chat conversations={data?.conversations || []} isLoading={isLoading} />
    )
}