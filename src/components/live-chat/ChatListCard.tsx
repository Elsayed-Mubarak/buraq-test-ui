"use client";
import { useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";
import { timeElapsed } from "@/utils/timeElapsed";
import { usePathname } from "next/navigation";
import { ChromIcon, EdgeIcon, FirefoxIcon, SafariIcon, InstagramIcon, WhatsappIcon } from "../../../public/live-chat"
import { getLastMessage } from "@/utils/getLastMessage";
import { getInitialsCharts } from "@/utils/getInitialsCharts";

const iconMap: Record<string, JSX.Element> = {
  chrome: <ChromIcon />,
  edge: <EdgeIcon />,
  firefox: <FirefoxIcon />,
  safari: <SafariIcon />,
  instagram: <InstagramIcon />,
  whatsapp: <WhatsappIcon />,
};

const getIconComponent = (iconName: string) => {
  return iconMap[iconName] || null;
};

type Props = {
  conversation: any;
};
export default function ChatListCard({ conversation }: Props) {
  const pathName = usePathname();
  const { setSelectedConversation } = useChatStore();
  const { selectedConversation } = useChatStore();

  function handleSelectConversation() {
    setSelectedConversation(conversation);
  }

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [pathName, setSelectedConversation]);

  return (
    <div
      onClick={handleSelectConversation}
      className={`${conversation?._id === selectedConversation?._id ? "bg-primary-100" : "hover:bg-[#f3f3f3]"} flex cursor-pointer justify-between gap-2 rounded-lg px-4 py-3 transition-all duration-200`}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e4e4e4] bg-white text-sm font-semibold text-[#808080]">
        {getInitialsCharts(conversation)}
      </div>
      <div className="flex-1 max-w-[254px]">
        <div className="flex items-center gap-2 text-sm font-semibold capitalize text-secondary-50">
          <div>
            {conversation?.contact?.name || conversation?.contact?.phone || "Visitor"}
          </div>
          <div>
            {getIconComponent(conversation?.channel)}
          </div>
        </div>
        <div className="text-[12px] text-[#6d6d6d]">
          {conversation.assignedTo && conversation.assignedToModel === "TeamMates" && `${conversation?.assignedTo?.firstName} ${conversation?.assignedTo?.lastName} `}
          {conversation.assignedTo && conversation.assignedToModel === "Workflow" && `Bot `}
          {conversation.assignedTo && conversation.assignedToModel === "Team" && ` `}
          &#9679; Tanta, Egypt
        </div>
        <div className="text-[13px] text-[#6d6d6d] truncate">
          {getLastMessage(conversation)}
        </div>
      </div>
      <div className="text-[11px] font-semibold">
        {timeElapsed(conversation?.updatedAt)}
      </div>
    </div>
  );
}
