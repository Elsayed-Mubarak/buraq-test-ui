"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Chat from "@/components/live-chat/Chat";
import { useChatStore } from "@/stores/useChatStore";
import { useEffect } from "react";

export default function Page() {
  const queryClient = useQueryClient();
  const fetchClosedConversations = useChatStore((state) => state.fetchClosedConversations);
  const closedConversations = useChatStore((state) => state.closedconversations.closed);
  const setSelectedConversation = useChatStore((state) => state.setSelectedConversation);

  useEffect(() => {
    if (closedConversations.length > 0) {
      setSelectedConversation(closedConversations[0]);
    } else {
      setSelectedConversation(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { data: CLOSEDConversations, isLoading } = useQuery({
    queryKey: ["closedConversations"],
    queryFn: fetchClosedConversations,
    staleTime: 24 * 60 * 60 * 1000,
  });
  useEffect(() => {
    return () => {
      queryClient.cancelQueries({ queryKey: ["closedConversations"] });
      setSelectedConversation(null);
    };
  }, [queryClient, setSelectedConversation]);
  return <Chat conversations={closedConversations} isLoading={isLoading} />;
}
