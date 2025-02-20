"use client";
import { useChatStore } from "@/stores/useChatStore";
import { CheckCheck, EllipsisVertical, LogOut } from "lucide-react";
import AssingChatButton from "@/components/live-chat/AssingChatButton";
import { useAuthStore } from "@/stores/useAuthStore";
import webSocketSingleton from "@/service/socket";
import { useQuery } from "@tanstack/react-query";
import { getTeamMates, getTeams } from "@/service/chatService";
import { useEffect } from "react";
import { getInitialsCharts } from "@/utils/getInitialsCharts";

type Props = { openInfo: boolean; setOpenInfo: (value: boolean) => void };
export default function ChatNav({ openInfo, setOpenInfo }: Props) {

  const authUser = useAuthStore((state) => state.authUser);
  const selectedConversation = useChatStore(
    (state) => state.selectedConversation,
  );
  const setSelectedConversation = useChatStore(
    (state) => state.setSelectedConversation,
  );
  const allTeams = useChatStore((state) => state.teams)
  const allTeammates = useChatStore((state) => state.teamates)
  const setTeams = useChatStore((state) => state.setTeams)
  const setTeammates = useChatStore((state) => state.setTeammates)

  const { data: teamMates } = useQuery({
    queryKey: ["team-mates"],
    queryFn: getTeamMates,
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !allTeammates.length
  });

  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !allTeams.length
  });

  useEffect(() => {
    if (teams) {
      setTeams(teams)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teams])
  useEffect(() => {
    if (teamMates) {
      setTeammates(teamMates)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamMates])

  function handleCloseConversation() {
    webSocketSingleton.closeConversation(selectedConversation?._id);
  }
  return (
    <div className="flex h-[60px] items-center justify-between border-b border-primary-50 px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f3f3] text-sm font-semibold text-[#808080]">
          {getInitialsCharts(selectedConversation)}
        </div>
        <div className="font-semibold text-secondary-50">
          {selectedConversation?.contact?.name || selectedConversation?.contact?.phone || "Visitor"}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {selectedConversation?.status !== "closed" &&
          <>
            <AssingChatButton selectedConversation={selectedConversation} />
            <button
              onClick={handleCloseConversation}
              className="hover:bg-[#e4e4e4] flex items-center gap-1 rounded-md border border-primary-50 p-2 text-sm font-semibold text-[#808080]"
            >
              <span>
                <CheckCheck className="text-primary-600 h-5 w-5" />
              </span>
              <span>Close chat</span>
            </button>
          </>
        }
        <div className="cursor-pointer rounded p-2 transition-all duration-200 hover:bg-[#e4e4e4]">
          <EllipsisVertical className="h-5 w-5" />
        </div>
        <div className="cursor-pointer" onClick={() => setOpenInfo(!openInfo)}>
          <LogOut className="h-5 w-5 text-secondary-50" />
        </div>
      </div>
    </div>
  );
}
