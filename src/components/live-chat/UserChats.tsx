"use client";
import UserInfo from "./UserInfo";
import ChatArea from "./ChatArea";
import { useEffect, useState } from "react";
import { useChatStore } from "@/stores/useChatStore";
export default function UserChats() {
  const [openInfo, setOpenInfo] = useState(true);
  return (
    <div
      className={`grid max-h-screen relative overflow-hidden`}
    >
      <ChatArea openInfo={openInfo} setOpenInfo={setOpenInfo} />
      <UserInfo openInfo={openInfo} setOpenInfo={setOpenInfo} />
    </div>
  );
}
