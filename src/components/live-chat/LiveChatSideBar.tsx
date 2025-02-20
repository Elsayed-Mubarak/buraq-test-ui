"use client";

// import { useSelectedLayoutSegments } from 'next/navigation';
//   const segments = useSelectedLayoutSegments();
//   const isActive = (path) => segments.includes(path);

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCheck, CircleUserRound, Clock3, MessageSquare, UserRoundX } from "lucide-react";
import CreateConversationModal from "./CreateConversationModal";
import SidebarViews from "./views/SidebarViews";
import SidebarLabels from "./SidebarLabels";
import { useChatStore } from "@/stores/useChatStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getApprovedTemplates } from "@/service/templateServices";
import { getTeamMates } from "@/service/chatService";
const navLinks = [
  {
    name: "You",
    href: "/dashboard/live-chat",
    icon: <CircleUserRound className="h-4 w-4" />,
    countKey: "you",
  },
  {
    name: "Assigned",
    href: "/dashboard/live-chat/assigned",
    icon: <MessageSquare className="h-4 w-4" />,
    countKey: "assigned",
  },
  {
    name: "Unassigned",
    href: "/dashboard/live-chat/unassigned",
    icon: <UserRoundX className="h-4 w-4" />,
    countKey: "unassigned",
  },
];
const navLinkTwo = [
  {
    name: "Closed",
    href: "/dashboard/live-chat/closed",
    icon: <CheckCheck className="h-4 w-4" />,
  },
  {
    name: "SLA breached",
    href: "/dashboard/live-chat/sla",
    icon: <Clock3 className="h-4 w-4" />,
  },
];

type Props = {
  isSideOpen: boolean;
};
export default function LiveChatSideBar({ isSideOpen }: Props) {
  const queryClient = useQueryClient()
  const pathName = usePathname();
  const conversationCounts = useChatStore((state) => state.conversationCounts);

  return (
    <div className={`${isSideOpen ? "left-[0]" : "left-[-223px] hover:left-0"} peer duration-300 transition-all flex flex-col border-r border-primary-50 absolute top-0 w-[240px] z-[50] bg-white overflow-y-auto h-full`}>
      <div className="text-secondary-50">
        <div className="px-5 py-4 text-xl font-semibold">Live Chat</div>
      </div>
      <div className="mb-4 flex flex-1 flex-col justify-between">
        <ul className="flex flex-col gap-1 px-2 text-sm">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`${pathName === link.href
                  ? "bg-primary-100 text-primary-500"
                  : ""
                  } flex items-center justify-between gap-4 rounded-lg px-5 py-[7px] font-[500] text-secondary-50 transition-colors hover:bg-[#f3f3f3]`}
                href={link.href}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`${pathName === link.href ? "text-primary-500" : "text-[#808080]"}`}
                  >
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </div>
                <span>{conversationCounts[link.countKey]}</span>
              </Link>
            </li>
          ))}
          {navLinkTwo.map((link) => (
            <li key={link.name}>
              <Link
                className={`${pathName === link.href
                  ? "bg-primary-100 text-primary-500"
                  : ""
                  } flex items-center justify-between gap-4 rounded-lg px-5 py-[7px] font-[500] text-secondary-50 transition-colors hover:bg-[#f3f3f3]`}
                href={link.href}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`${pathName === link.href ? "text-primary-500" : "text-[#808080]"}`}
                  >
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </div>
              </Link>
            </li>
          ))}
          <SidebarViews />
          <SidebarLabels />
        </ul>
        <div className="px-4">
          <CreateConversationModal />
        </div>
      </div>
    </div>
  );
}
