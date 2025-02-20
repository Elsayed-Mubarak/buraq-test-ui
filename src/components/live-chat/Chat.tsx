"use client";
import Empty from "./Empty";
import ChatList from "./ChatList";
import UserChats from "./UserChats";
import { useChatStore } from "@/stores/useChatStore";

type Props = {
  conversations: any;
  isLoading?: boolean;
};
export default function Chat({ conversations, isLoading }: Props) {
  const selectedConversation = useChatStore(
    (state: any) => state.selectedConversation,
  );

  return (
    <>
      <ChatList conversations={conversations} isLoading={isLoading} />
      {isLoading &&
        (<div className="flex items-center justify-center h-[calc(100vh)] w-full">
          <span className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></span>
        </div>)}
      {(!isLoading && !selectedConversation) && <Empty text="No conversation found" />}
      {(!isLoading && selectedConversation) && <UserChats />}
    </>
  );
}
