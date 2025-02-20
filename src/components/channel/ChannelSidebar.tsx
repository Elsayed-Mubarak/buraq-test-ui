"use client";

import { ChannelLinks } from "@/constants/settings/whatsapp-config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LiaAngleDownSolid } from "react-icons/lia";

type Props = {}

export default function ChannelSidebar({ }: Props) {
    const [open, setOpen] = useState<string[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        ChannelLinks.map((link) => {
            if (link.subLink && link.subLink.some((subLink) => pathname === subLink.link)) {
                setOpen((prev) => (prev.includes(link.label) ? prev : [...prev, link.label]));
            }
        });
    }, [pathname]);

    const handleOpenSubLinks = (label: string) => {
        setOpen((prev) =>
            prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
        );
    };

    const isActiveLink = (link: string, subLinks?: { label: string; link: string }[]) => {
        if (pathname === link) return true;
        if (subLinks) {
            return subLinks.some((subLink) => pathname === subLink.link);
        }
        return false;
    };
    return (
        <div className="fixed top-0 left-16 h-full w-[230px] overflow-x-hidden overflow-y-auto bg-[#f3f3f3] border border-[#f3f3f3] px-[5px]">
            <div className="text-secondary-50 text-2xl font-semibold font-barlow mx-3 mt-3 mb-9">Channels</div>
            <div className="flex flex-col ms-[18px]">
                <aside className="flex flex-col gap-4">
                    {ChannelLinks.map((link) =>
                        link.subLink ? (
                            <div
                                key={link.label}
                                className={`text-base cursor-pointer text-secondary-50`}
                            >
                                <div
                                    className={`flex items-center gap-1 hover:text-primary-500 ${isActiveLink(link.link, link.subLink) && "text-primary-500"
                                        }`}
                                    onClick={() => handleOpenSubLinks(link.label)}
                                >
                                    <p>{link.label}</p>
                                    <LiaAngleDownSolid
                                        className={`h-3 w-3 transform ${open.includes(link.label) && "rotate-180"
                                            }`}
                                    />
                                </div>
                                {open.includes(link.label) && (
                                    <div className="flex flex-col gap-2 text-sm mt-3 ps-4">
                                        {link.subLink.map((subLink) => (
                                            <Link
                                                prefetch
                                                key={subLink.label}
                                                href={subLink.link}
                                                className={`hover:text-primary-500 ${pathname === subLink.link ? "text-primary-500" : ""}`}
                                            >
                                                {subLink.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                prefetch
                                key={link.label}
                                href={link.link}
                                className={`text-base cursor-pointer hover:text-primary-500 text-secondary-50 ${isActiveLink(link.link) && "text-primary-500"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        )
                    )}
                </aside>
            </div>
        </div>
    )
}
