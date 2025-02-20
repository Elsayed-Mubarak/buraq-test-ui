"use client"
import LiveChatSideBar from "./LiveChatSideBar";
import { useEffect, useState } from "react";
import SidebarToggle from "./SidebarToggle";

type Props = {
    children: React.ReactNode;
}

export default function LiveChatLayout({ children }: Props) {
    const [isSideOpen, setIsSideOpen] = useState<boolean>(true);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1440) {
                setIsSideOpen(true);
            }
            //  else {
            //     setIsSideOpen(false);
            // }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div className={`${isSideOpen && "2xl:ps-[240px]"
            } ps-[17px] min-h-screen grid grid-cols-[357px_1fr] duration-300 w-full relative`}>
            <LiveChatSideBar isSideOpen={isSideOpen} />
            <SidebarToggle isSideOpen={isSideOpen} setIsSideOpen={setIsSideOpen} />
            {children}
        </div>
    )
}