"use client";
import Empty from "@/components/live-chat/Empty";
import Search from "@/components/live-chat/Search";
import ChatListCard from "./ChatListCard";
import FilterChats from "./FilterChats";
import { useState } from "react";
import { useChatStore } from "@/stores/useChatStore";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

type Props = {
  conversations: any;
  isLoading?: boolean;
};


export default function ChatList({ conversations, isLoading }: Props) {
  const [openFilter, setOpenFilter] = useState(false);
  const searchParams = useSearchParams();
  const searchedConversations = useChatStore((state) => state.searchedConversations)
  const setSearchedConversations = useChatStore((state) => state.setSearchedConversations)

  return (
    <div className="border-r border-primary-50">
      <FilterChats openFilter={openFilter} setOpenFilter={setOpenFilter} />
      <Search openFilter={openFilter} setOpenFilter={setOpenFilter} />
      {isLoading && <div className="flex items-center justify-center h-[calc(100vh-200px)] w-full"><span className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></span></div>}
      {(!isLoading && conversations?.length === 0) && <Empty extra="collapsed" text="No conversation found" />}
      <div className="p-2 h-[calc(100vh-60px)] overflow-y-auto">
        {(!isLoading && conversations?.length > 0) &&
          conversations.map((conversation: any) => (
            <ChatListCard key={conversation?._id} conversation={conversation} />
          ))
        }
      </div>
    </div>
  );
}
