"use client";
import ChatNav from "./ChatNav";
import ChatControls from "./ChatControls";
import ChatBody from "./ChatBody";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSavedReplies,
  createSavedReply as createSavedReplyApi,
} from "@/service/savedReplies";
import toast from "react-hot-toast";
import { useChatStore } from "@/stores/useChatStore";

type Props = {
  openInfo: boolean;
  setOpenInfo: (value: boolean) => void;
};
export default function ChatArea({ openInfo, setOpenInfo }: Props) {
  const [messageContent, setMessageContent] = useState("");
  const [savedReplySearchQuery, setSavedReplySearchQuery] = useState("");
  const allSavedReplies = useChatStore((state) => state.savedReplies)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1440) {
        setOpenInfo(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const queryClient = useQueryClient();
  const { data: savedReplies } = useQuery({
    queryKey: ["saved-replies"],
    queryFn: getSavedReplies,
    enabled: !allSavedReplies.length
  });

  const { mutate: createSavedReply } = useMutation({
    mutationFn: createSavedReplyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-replies"] });
      toast.success("Save reply created successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  function addSavedReply(title: any, reply: any) {
    createSavedReply({ title, reply });
  }
  let searchedSavedReplies =
    allSavedReplies &&
    allSavedReplies.filter((reply: any) =>
      reply.title.toLowerCase().includes(savedReplySearchQuery.toLowerCase()),
    );

  useEffect(() => {
    if (savedReplies) {
      useChatStore.getState().setSavedReplies(savedReplies)
    }
  }, [savedReplies])

  return (
    <div className={`${openInfo ? "2xl:me-[357px]" : "me-0"} me-0 transition-all duration-200 grid h-screen grid-cols-1 grid-rows-[60px_1fr_auto] border-r border-primary-50`}
    >
      <ChatNav openInfo={openInfo} setOpenInfo={setOpenInfo} />
      <ChatBody addSavedReply={addSavedReply} />
      <ChatControls
        setMessageContent={setMessageContent}
        messageContent={messageContent}
        savedReplies={searchedSavedReplies}
        addSavedReply={addSavedReply}
        setSavedReplySearchQuery={setSavedReplySearchQuery}
        savedReplySearchQuery={savedReplySearchQuery}
      />
    </div>
  );
}
