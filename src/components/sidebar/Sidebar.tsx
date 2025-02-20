"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { AiStudioIcon, AppMarketIcon, BotBuilderIcon, ChannelIcon, ChatIcon, ContactsIcon, GroupIcon, HelpDeskIcon, SettingsIcon, StatisticsIcon, UserIcon } from "../../../public/icons/mainSidebar";
import ToolTip from "@/components/shared/ToolTip";
import { LogOut, UserCircleIcon } from "lucide-react";
const Sidebar = () => {
  const router = useRouter();
  const { logout, authUser } = useAuthStore();
  const pathName = usePathname();
  const [openAiSublinks, setOpenAiSublink] = useState(false);
  const [openHelpDesk, setOpenHelpDesk] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error)
    }
    router.push("/login");
  };


  return (
    <nav className="fixed left-0 top-0 z-[104] bg-white h-full w-16 border-r border-primary-50">
      <div className="mx-auto pt-[6px] mb-10 text-center cursor-pointer">
        <Image src="/logo.png" width={35} height={29} alt="buraq logo" className="mt-4 mx-auto" />
      </div>
      <div className="flex items-center flex-col gap-3 text-center">
        <div className="w-16 cursor-pointer flex items-center justify-center select-none">
          <ToolTip title="Analytics Dashboard" placement="right">
            <Link href="/dashboard/analytics" className={`w-9 h-9 flex items-center justify-center rounded-md  hover:bg-primary-100 hover:text-secondary-50 transition-all duration-200 ${pathName.startsWith("/dashboard/analytics") ? "bg-primary-100 text-primary-500" : "text-[#6d6d6d]"}`}>
              <StatisticsIcon />
            </Link>
          </ToolTip>
        </div>
        <div className="w-16 cursor-pointer flex items-center justify-center  select-none">
          <ToolTip title="Live Chat" placement="right">
            <Link href="/dashboard/live-chat" className={`w-9 h-9 flex items-center justify-center rounded-md  hover:bg-primary-100  transition-all duration-200 ${pathName.startsWith("/dashboard/live-chat") ? "bg-primary-100 text-primary-500" : "text-[#6d6d6d] hover:text-secondary-50"}`}>
              <ChatIcon />
            </Link>
          </ToolTip>
        </div>
        <Popover open={openAiSublinks} onOpenChange={setOpenAiSublink}>
          <PopoverTrigger asChild>
            <div className="w-16 cursor-pointer flex items-center justify-center select-none">
              <ToolTip title="Ai Studio" placement="right">
                <div className={`w-9 h-9 flex items-center justify-center rounded-md  hover:bg-primary-100  transition-all duration-200 ${pathName.startsWith("/dashboard/ai-studio") ? "bg-primary-100 text-primary-500" : "text-[#6d6d6d] hover:text-secondary-50"}`}>
                  <AiStudioIcon />
                </div>
              </ToolTip>
            </div>
          </PopoverTrigger>
          <PopoverContent sideOffset={2} side="right" align="start" className="w-[235px] bg-white rounded-xl border border-primary-50 p-0 shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.04)] overflow-hidden">
            <Link href="/dashboard/ai-studio" onClick={() => setOpenAiSublink(false)} className="block py-2 px-4 text-sm hover:bg-[#f3f3f3] text-secondary-50">
              Knowledge base
            </Link>
            <Link href="/dashboard/ai-studio/custome-answer" onClick={() => setOpenAiSublink(false)} className="block py-2 px-4 text-sm hover:bg-[#f3f3f3] text-secondary-50">
              Custome answers
            </Link>
            <Link href="/dashboard/ai-studio/function-call" onClick={() => setOpenAiSublink(false)} className="block py-2 px-4 text-sm hover:bg-[#f3f3f3] text-secondary-50">
              Function call
            </Link>
          </PopoverContent>
        </Popover>
        <div className="w-16 cursor-pointer flex items-center justify-center  select-none">
          <ToolTip title="Bot Builder" placement="right">
            <Link href="/dashboard/botbuilder" className={`w-9 h-9 flex items-center justify-center rounded-md  hover:bg-primary-100  transition-all duration-200 ${pathName.startsWith("/dashboard/botbuilder") ? "bg-primary-100 text-primary-500" : "text-[#6d6d6d] hover:text-secondary-50"}`}>
              <BotBuilderIcon />
            </Link>
          </ToolTip>
        </div>
        <div className="w-16 cursor-pointer flex items-center justify-center  select-none">
          <ToolTip title="Contacts" placement="right">
            <Link href="/dashboard/contacts" className={`w-9 h-9 flex items-center justify-center rounded-md  hover:bg-primary-100  transition-all duration-200 ${pathName.startsWith("/dashboard/contacts") ? "bg-primary-100 text-primary-500" : "text-[#6d6d6d] hover:text-secondary-50"}`}>
              <ContactsIcon />
            </Link>
          </ToolTip>
        </div>
        <div className="w-16 cursor-pointer flex items-center justify-center  select-none">
          <ToolTip title="Channel Configurations" placement="right">
            <Link href="/dashboard/channel/web/appearance" className={`w-9 h-9 flex items-center justify-center rounded-md  hover:bg-primary-100  transition-all duration-200 ${pathName.startsWith("/dashboard/channel") ? "bg-primary-100 text-primary-500" : "text-[#6d6d6d] hover:text-secondary-50"}`}>
              <ChannelIcon />
            </Link>
          </ToolTip>
        </div>
        <div className="w-16 cursor-pointer flex items-center justify-center  select-none">
          <ToolTip title="App Market" placement="right">
            <Link href="/dashboard/app-market" className={`w-9 h-9 flex items-center justify-center rounded-md  hover:bg-primary-100  transition-all duration-200 ${pathName.startsWith("/dashboard/app-market") ? "bg-primary-100 text-primary-500" : "text-[#6d6d6d] hover:text-secondary-50"}`}>
              <AppMarketIcon />
            </Link>
          </ToolTip>
        </div>
      </div>
      <div className="absolute bottom-0 mx-auto w-16 mb-3 flex items-center flex-col gap-3">
        <Popover open={openHelpDesk} onOpenChange={setOpenHelpDesk}>
          <PopoverTrigger asChild>
            <div className="w-16 cursor-pointer flex items-center justify-center select-none">
              <ToolTip title="Help Desk" placement="right">
                <div className={`w-9 h-9 flex items-center justify-center rounded-md  hover:bg-primary-100 hover:text-secondary-50 transition-all duration-200 text-[#6d6d6d]`}>
                  <HelpDeskIcon />
                </div>
              </ToolTip>
            </div>
          </PopoverTrigger>
          <PopoverContent sideOffset={2} side="right" align="start" className="w-[260px] bg-white rounded-xl border border-primary-50 p-0 shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.04)] overflow-hidden">
            <Link href="https://help.buraq.ai" className="flex items-center gap-2 py-2 px-4 text-sm hover:bg-[#f3f3f3] text-secondary-50">
              <span>
                <GroupIcon />
              </span>
              <span>
                Help Articles
              </span>
            </Link>
          </PopoverContent>
        </Popover>
        <div className="w-16 cursor-pointer flex items-center justify-center select-none">
          <ToolTip title="Settings" placement="right">
            <Link href="/dashboard/settings/user/profile" className={`w-9 h-9 flex items-center justify-center rounded-md  hover:bg-primary-100 hover:text-secondary-50 transition-all duration-200 ${pathName.startsWith("/dashboard/settings") ? "bg-primary-100 text-primary-500" : "text-[#6d6d6d]"}`}>
              <SettingsIcon />
            </Link>
          </ToolTip>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <div>
              <div className="mt-3 relative cursor-pointer">
                <div>
                  <UserIcon />
                </div>
                <div className="absolute -bottom-[2px] -right-[2px] w-3 h-3 bg-[#12bc65] border border-white rounded-full"></div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent sideOffset={20} side="right" align="start" className="bg-white p-0 w-[260px]">
            <div className="flex items-center gap-2 p-4">
              <div className="relative size-8 rounded-full">
                <UserCircleIcon className="h-8 w-8 text-[#acacac]" />
                <span className="absolute bottom-0 right-0 size-2 rounded-full bg-[#12bc65]"></span>
              </div>
              <div>
                <div className="text-sm text-secondary-50">
                  {authUser?.firstName} {authUser?.lastName}
                </div>
                <p className="text-[13px] text-[#808080]">Available</p>
              </div>
            </div>
            <div className="flex justify-between border-b border-primary-50 p-3">
              <div className="text-sm text-secondary-50">Available</div>
              <Switch className="bg-[#12bc65] data-[state=checked]:bg-slate-500" />
            </div>
            <div className="flex cursor-pointer gap-2 px-4 py-3 hover:bg-[#f3f3f3]">
              <div>change language</div>
            </div>
            <div className="flex cursor-pointer gap-2 border-b border-primary-50 px-4 py-3 hover:bg-[#f3f3f3]">
              <div>account</div>
            </div>
            <div
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-3 px-4 py-3 text-[#f00] hover:bg-[#f3f3f3] hover:text-primary-500"
            >
              <LogOut className="h-5 w-5" />
              <div className="text-sm font-semibold">Logout</div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Sidebar;
