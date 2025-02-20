"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Chat from "@/components/live-chat/Chat";
import { useChatStore } from "@/stores/useChatStore";
import { useEffect } from "react";

export default function SlaPage() {
  const queryClient = useQueryClient();
  const fetchSLAConversations = useChatStore((state) => state.fetchSLAConversations);
  const slaConversations = useChatStore((state) => state.closedconversations.sla);
  const setSelectedConversation = useChatStore((state) => state.setSelectedConversation);

  useEffect(() => {
    if (slaConversations.length > 0) setSelectedConversation(slaConversations[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { data: SLAonversations, isLoading } = useQuery({
    queryKey: ["slaConversations"],
    queryFn: fetchSLAConversations,
    staleTime: 24 * 60 * 60 * 1000,
  })
  useEffect(() => {
    return () => {
      queryClient.cancelQueries({ queryKey: ["slaConversations"] });
      setSelectedConversation(null);
    };
  }, [queryClient, setSelectedConversation]);
  return <Chat conversations={slaConversations} isLoading={isLoading} />;
}
