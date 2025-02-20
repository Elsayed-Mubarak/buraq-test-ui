"use client";
import Chat from "@/components/live-chat/Chat";
import { useChatStore } from "../../../stores/useChatStore";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Page() {
  const queryClient = useQueryClient();
  const youConversations = useChatStore((state) => state.activeconversations.you);
  const setSelectedConversation = useChatStore((state) => state.setSelectedConversation);
  const fetchActiveConversations = useChatStore(state => state.fetchActiveConversations);
  const setActiveConversations = useChatStore(state => state.setActiveConversations);

  const { data: storeConversations, isLoading: isActiveChatLoading } = useQuery({
    queryKey: ["active-conversations"],
    queryFn: fetchActiveConversations,
  });

  useEffect(() => {
    if (storeConversations) setActiveConversations(storeConversations);
  }, [storeConversations, setActiveConversations]);

  useEffect(() => {
    if (youConversations?.length > 0) setSelectedConversation(youConversations[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    return () => {
      queryClient.cancelQueries({ queryKey: ["active-conversations"] });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);
  return <Chat conversations={youConversations} isLoading={isActiveChatLoading} />;
}
