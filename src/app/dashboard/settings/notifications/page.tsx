"use client"

import NotificationsTable from '@/components/settings/NotificationsTable';
import { CircleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

export default function Page() {
    const [allowBrowserNotifications, setAllowBrowserNotifications] = useState<"granted" | "denied" | "default">("default");
    const [cookies, setCookie, removeCookie] = useCookies(['en-notfi']);

    useEffect(() => {
        cookies["en-notfi"] && setAllowBrowserNotifications("granted")
    }, [cookies])


    const enableBrowserNotifications = async () => {
        if (!("Notification" in window)) {
            alert("Browser does not support notifications.");
            return;
        }

        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            new Notification("Notifications enabled!", {
                body: "You will now receive browser notifications.",
                icon: '/logo.png',
            });

            setCookie("en-notfi", permission, { path: "/" });

            setAllowBrowserNotifications("granted");
        } else if (permission === "denied") {
            setAllowBrowserNotifications("denied")
            alert("⚠ You blocked notifications. Enable them in browser settings.");
        }
    };

    return (
        <div className='py-4 px-12'>
            <div>
                <div className='text-2xl font-semibold text-secondary-50'>Notifications</div>
                <p className='mb-3 max-w-[586px] text-sm text-[#808080]'>Choose how you like to be notified when an event occurs on your account.</p>
            </div>

            {allowBrowserNotifications === "default" &&
                <button
                    className='flex items-center gap-3 rounded-md shadow-md p-4 bg-[#e9e9fd] max-w-[75%] w-fit border border-primary-500 text-sm text-[#3a3a3a]'
                    onClick={enableBrowserNotifications}
                >
                    <CircleAlert className='text-primary-500' size={16} />
                    <div>Click <span className='text-primary-500 underline cursor-pointer'>Allow</span> to start getting the browser notifications</div>
                </button>
            }
            {allowBrowserNotifications === "denied" &&
                <div className='flex items-center gap-3 rounded-md shadow-md p-4 bg-[#ff000029] max-w-[75%] w-fit border border-[#f00] text-sm text-[#f00]  '>
                    <CircleAlert size={16} />
                    <div>Browser notifications are blocked, enable it to start receiving notifications. Refer to the guide for help</div>
                </div>}
            {allowBrowserNotifications === "granted" &&
                <div className='flex items-center gap-3 rounded-md shadow-md p-4 bg-[#13be6629] max-w-[75%] w-fit border border-[#13be66] text-sm text-[#13be66]  '>
                    <CircleAlert size={16} />
                    <div>Browser notification permission is granted</div>
                </div>
            }
            <NotificationsTable />
        </div>
    )
}