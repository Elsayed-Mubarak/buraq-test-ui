"use client"
import Link from "next/link"
import { usePathname } from "next/navigation";

type Props = {}

type Link = {
    name: string;
    href: string;
}
type Links = {
    user: Link[];
    account: Link[];
    notifications: Link[];
    liveChat: Link[];
}

const links: Links = {
    user: [
        {
            name: "Profile",
            href: "/dashboard/settings/user/profile",
        },
        {
            name: "Calender",
            href: "/dashboard/settings/user/calender",
        },
    ],
    account: [
        {
            name: "Settings",
            href: "/dashboard/settings/account/settings",
        },
        {
            name: "Teams",
            href: "/dashboard/settings/account/teams",
        },
        {
            name: "Teammates",
            href: "/dashboard/settings/account/teammates",
        },
        {
            name: "Variables",
            href: "/dashboard/settings/account/variables",
        },
        {
            name: "Events",
            href: "/dashboard/settings/account/events",
        },
        {
            name: "Link Tracking",
            href: "/dashboard/settings/account/link-tracking",
        },
    ],
    notifications: [{
        name: "Notifications",
        href: "/dashboard/settings/notifications",
    }],
    liveChat: [
        {
            name: "Settings",
            href: "/dashboard/settings/live-chat",
        },
        {
            name: "Human Handover",
            href: "/dashboard/settings/human-handover",
        },
        {
            name: "Saved Replies",
            href: "/dashboard/settings/saved-replies",
        },
        {
            name: "Labels",
            href: "/dashboard/settings/labels",
        },
    ]
}

export default function SettingsSidebar({ }: Props) {
    const pathName = usePathname();
    return (
        <div className="fixed top-0 left-16 w-[230px] h-full overflow-y-auto border border-[#f3f3f3] bg-[#f3f3f3]">
            <div className="font-semibold text-2xl text-secondary-50 px-3 pt-3 pb-5">Settings</div>
            <div className="flex flex-col ps-4">
                <div className="py-4 flex flex-col gap-4">
                    <div className={`${pathName.startsWith("/dashboard/settings/user") ? "text-primary-500" : "text-secondary-50"} text-base `}>User</div>
                    <div className="flex flex-col gap-4 ps-4">
                        {links.user.map((link, index) => (
                            <Link key={index} className={`${pathName === link.href ? "text-primary-500" : "text-black"} hover:text-primary-500 text-sm`} href={link.href}>{link.name}</Link>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {links.notifications.map((link, index) => (
                        <Link prefetch key={index} className={`${pathName === link.href ? "text-primary-500" : "text-black"} hover:text-primary-500 text-base`} href={link.href}>{link.name}</Link>
                    ))}
                </div>
                <div className="py-4 flex flex-col gap-4">
                    <div className={`${pathName.startsWith("/dashboard/settings/account") ? "text-primary-500" : "text-secondary-50"} text-base `}>Account</div>
                    <div className="flex flex-col gap-4 ps-4">
                        {links.account.map((link, index) => (
                            <Link prefetch key={index} className={`${pathName === link.href ? "text-primary-500" : "text-black"} hover:text-primary-500 text-sm`} href={link.href}>{link.name}</Link>
                        ))}
                    </div>
                </div>
                <div className="pb-4 flex flex-col gap-4">
                    <div className={`${links.liveChat.some((link) => pathName === link.href)
                        ? "text-primary-500"
                        : "text-secondary-50"
                        } text-base`}>Live Chat</div>
                    <div className="flex flex-col gap-4 ps-4">
                        {links.liveChat.map((link, index) => (
                            <Link prefetch key={index} className={`${pathName === link.href ? "text-primary-500" : "text-black"} hover:text-primary-500 text-sm`} href={link.href}>{link.name}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}