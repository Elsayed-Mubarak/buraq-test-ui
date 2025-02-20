import { format } from "date-fns";
import useTeammatesStore from "@/stores/settings/useTeamates.store";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { LuLoaderCircle } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
    id: string;
    name: string;
}

function TeammatesLogs({ id, name }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const { logs, getTeammtesLogs } = useTeammatesStore();

    const handleFetchLogs = async () => {
        try {
            setIsOpen((prev) => !prev);
            setLoading(true);
            await getTeammtesLogs(id);
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <button
                type="button"
                className={`text-[14px] font-light text-blue-500 hover:underline capitalize`}
                onClick={handleFetchLogs}
            >
                Logs
            </button>
            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full w-[375px] bg-[#f3f3f3] px-6 py-6 overflow-y-auto border-l border-gray-200 shadow-lg z-[100] text-gray-500
                ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base text-nodeSettings">
                        Audit log history
                    </h2>
                    <button onClick={() => setIsOpen(false)}>
                        <IoCloseOutline className="text-gray-500 hover:text-gray-700 w-5 h-5" />
                    </button>
                </div>

                {/* Subtitle */}
                <p className="text-sm text-nodeSettings mb-4 font-light">
                    You are viewing the audit log of {name} for the last 90 days.
                </p>

                {/* Logs */}
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <LuLoaderCircle className="text-blue-700 h-10 w-10 animate-spin" />
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {logs?.logs?.map((log: any, index: any) => (
                            <li
                                key={index}
                                className="flex gap-2 text-sm text-nodeSettings p-2 pb-3 border-b border-black/10"
                            >
                                {log.action === "LOGOUT" && <span>Offline at</span>}
                                {log.action === "LOGIN" && <span>Available at</span>}
                                {format(new Date(log.updatedAt), "dd-MMM-yy, hh:mm a")}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default TeammatesLogs;
