"use client";
import { useChatStore } from "@/stores/useChatStore";
import Chat from "@/components/live-chat/Chat";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Page() {
  const queryClient = useQueryClient();
  const assignedConversations = useChatStore((state) => state.activeconversations.assigned);
  const setSelectedConversation = useChatStore((state) => state.setSelectedConversation);
  const fetchActiveConversations = useChatStore(state => state.fetchActiveConversations);
  const setActiveConversations = useChatStore(state => state.setActiveConversations);

  const { data: storeConversations, isLoading: isActiveChatLoading } = useQuery({
    queryKey: ["active-conversations"],
    queryFn: fetchActiveConversations,
    staleTime: 24 * 60 * 60 * 1000,
  });
  useEffect(() => {
    if (storeConversations) setActiveConversations(storeConversations);
  }, [storeConversations, setActiveConversations]);
  useEffect(() => {
    if (assignedConversations.length > 0) setSelectedConversation(assignedConversations[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    return () => {
      queryClient.cancelQueries({ queryKey: ["active-conversations"] });
      setSelectedConversation(null);
    };
  }, [queryClient, setSelectedConversation]);
  return <Chat conversations={assignedConversations} isLoading={isActiveChatLoading} />;
}
