"use client"
import Chat from "@/components/live-chat/Chat";
import { useChatStore } from "@/stores/useChatStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Page() {
  const queryClient = useQueryClient();
  const unassignedConversations = useChatStore((state) => state.activeconversations.unassigned);
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
    if (unassignedConversations.length > 0) setSelectedConversation(unassignedConversations[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => {
      queryClient.cancelQueries({ queryKey: ["active-conversations"] });
      setSelectedConversation(null);
    };
  }, [queryClient, setSelectedConversation]);

  return <Chat conversations={unassignedConversations} isLoading={isActiveChatLoading} />;
}
