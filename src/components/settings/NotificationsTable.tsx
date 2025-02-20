"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useCookies } from 'react-cookie';
import { Loader2 } from "lucide-react";

interface NotificationSettings {
    email: boolean;
    browser: boolean;
    sound: string;
}

// Default settings to manage state
const DEFAULT_SETTINGS: Record<string, NotificationSettings> = {
    "chat.assigned.to.you": { email: false, browser: false, sound: "hollow" },
    "chat.unassigned": { email: false, browser: false, sound: "hollow" },
    "new.message.from.a.chat.assigned.to.you": { email: false, browser: false, sound: "hollow" },
    "SLA.breached": { email: false, browser: false, sound: "hollow" },
    "weekly.report": { email: false, browser: false, sound: "not applicable" },
    "outbound.campaign.completion": { email: false, browser: false, sound: "not applicable" },
    "ai.model.training.completion": { email: false, browser: false, sound: "not applicable" },
};

export default function NotificationsTable() {
    const [cookies, setCookie, removeCookie] = useCookies(['en-notfi']);
    const [enableNotfication, setEnableNotification] = useState(false);
    const [data, setData] = useState<Record<string, NotificationSettings>>(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        cookies["en-notfi"] ? setEnableNotification(true) : setEnableNotification(false)
    }, [cookies])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get("/notification/get");
                const updatedData = { ...DEFAULT_SETTINGS, ...res.data.notifications[0].settings };
                setData(updatedData);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };
        fetchData();
    }, []);

    const handleCheckboxChange = (checked: boolean, key: string, field: "email" | "browser") => {
        setData((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                [field]: checked,
            },
        }));
    };

    const handleChangeSound = (key: string, sound: string) => {
        setData((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                sound: sound,
            },
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axiosInstance.patch("/notification/settings", { settings: data });

            if (res.status === 200) {
                toast.success("Notification settings have been saved!");
            }
        } catch (error) {
            console.error("Error saving settings:", error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <div className="mt-6 pr-[7%] h-[640px]">
                <div className="h-full w-full overflow-auto rounded-lg">
                    <Table className="border-b text-sm text-nodeSettings">
                        <TableHeader className="bg-[#f3f3f3] text-secondary-50">
                            <TableRow>
                                <TableHead className="w-[45%]" />
                                <TableHead className="w-[45%]">Event</TableHead>
                                <TableHead className="w-[14%]">Email</TableHead>
                                <TableHead className="w-[14%]">Browser</TableHead>
                                <TableHead className="w-[27%]">Sound</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Hardcoded Table Rows */}
                            <TableRow className="border-b-0">
                                <TableCell className="text-lg font-bold">Live Chat</TableCell>
                                <TableCell>Chat assigned to you</TableCell>
                                <TableCell>
                                    <Checkbox
                                        className="border-[#6d6d6d] text-white data-[state=checked]:bg-primary-500"
                                        checked={data["chat.assigned.to.you"].email}
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "chat.assigned.to.you", "email")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        className={"border-[#6d6d6d] text-white data-[state=checked]:bg-primary-500"}
                                        disabled={!enableNotfication}
                                        checked={data["chat.assigned.to.you"].browser}
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "chat.assigned.to.you", "browser")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue="hollow"
                                        onValueChange={(val) => handleChangeSound("chat.assigned.to.you", val)}
                                        value={data["chat.assigned.to.you"].sound}
                                    >
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Hollow" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hollow">Hollow</SelectItem>
                                            <SelectItem value="zapSplat">ZapSplat</SelectItem>
                                            <SelectItem value="bell">Bell</SelectItem>
                                            <SelectItem value="no-sound">No sound</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>

                            <TableRow className="border-b-0">
                                <TableCell />
                                <TableCell>Chat unassigned</TableCell>
                                <TableCell>
                                    <Checkbox
                                        className="border-[#6d6d6d] text-white data-[state=checked]:bg-primary-500"
                                        checked={data["chat.unassigned"].email}
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "chat.unassigned", "email")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        className="border-[#6d6d6d] text-white data-[state=checked]:bg-primary-500"
                                        checked={data["chat.unassigned"].browser}
                                        disabled={!enableNotfication}
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "chat.unassigned", "browser")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue="hollow"
                                        onValueChange={(val) => handleChangeSound("chat.unassigned", val)}
                                        value={data["chat.unassigned"].sound}
                                    >
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Hollow" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hollow">Hollow</SelectItem>
                                            <SelectItem value="zapSplat">ZapSplat</SelectItem>
                                            <SelectItem value="bell">Bell</SelectItem>
                                            <SelectItem value="no-sound">No sound</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>

                            <TableRow className="border-b-0">
                                <TableCell />
                                <TableCell>New message from a chat assigned to you</TableCell>
                                <TableCell>
                                    <Checkbox
                                        className="border-[#6d6d6d] text-white data-[state=checked]:bg-primary-500"
                                        checked={data["new.message.from.a.chat.assigned.to.you"].email}
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "new.message.from.a.chat.assigned.to.you", "email")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        className="border-[#6d6d6d] text-white data-[state=checked]:bg-primary-500"
                                        checked={data["new.message.from.a.chat.assigned.to.you"].browser}
                                        disabled={!enableNotfication}
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "new.message.from.a.chat.assigned.to.you", "browser")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue="hollow"
                                        onValueChange={(val) => handleChangeSound("new.message.from.a.chat.assigned.to.you", val)}
                                        value={data["new.message.from.a.chat.assigned.to.you"].sound}
                                    >
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Hollow" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hollow">Hollow</SelectItem>
                                            <SelectItem value="zapSplat">ZapSplat</SelectItem>
                                            <SelectItem value="bell">Bell</SelectItem>
                                            <SelectItem value="no-sound">No sound</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>

                            <TableRow className="border-b">
                                <TableCell />
                                <TableCell>SLA breached by anyone</TableCell>
                                <TableCell>
                                    <Checkbox
                                        className="border-[#6d6d6d] text-white data-[state=checked]:bg-primary-500"
                                        checked={data["SLA.breached"].email}
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "SLA.breached", "email")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        className="border-[#6d6d6d] text-white data-[state=checked]:bg-primary-500"
                                        checked={data["SLA.breached"].browser}
                                        disabled={!enableNotfication}
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "SLA.breached", "browser")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue="hollow"
                                        onValueChange={(val) => handleChangeSound("SLA.breached", val)}
                                        value={data["SLA.breached"].sound}
                                    >
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Hollow" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hollow">Hollow</SelectItem>
                                            <SelectItem value="zapSplat">ZapSplat</SelectItem>
                                            <SelectItem value="bell">Bell</SelectItem>
                                            <SelectItem value="no-sound">No sound</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>

                            {/* GENERAL */}
                            <TableRow className="border-b-0">
                                <TableCell className="text-lg font-bold">General</TableCell>
                                <TableCell>Weekly report</TableCell>
                                <TableCell>
                                    <Checkbox
                                        className="border-[#6d6d6d] text-white data-[state=checked]:bg-primary-500"
                                        checked={data["weekly.report"].email}
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "weekly.report", "email")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        className="border-[#6d6d6d] text-white data-[state=checked]:bg-primary-500"
                                        checked={data["weekly.report"].browser}
                                        disabled
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "weekly.report", "browser")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select defaultValue="not applicable">
                                        <SelectTrigger className="w-[150px] disabled:bg-gray-100 disabled:text-nodeSettings" disabled>
                                            <SelectValue placeholder="Hollow" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="not applicable">Not applicable</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>

                            <TableRow className="border-b-0">
                                <TableCell />
                                <TableCell>Outbound campaign completion</TableCell>
                                <TableCell>
                                    <Checkbox
                                        className="border-[#6d6d6d] text-white data-[state=checked]:bg-primary-500"
                                        checked={data["outbound.campaign.completion"].email}
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "outbound.campaign.completion", "email")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        className="border-[#6d6d6d] text-white data-[state=checked]:bg-primary-500"
                                        checked={data["outbound.campaign.completion"].browser}
                                        disabled
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "outbound.campaign.completion", "browser")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select defaultValue="not applicable" disabled>
                                        <SelectTrigger className="w-[150px] disabled:bg-gray-100 disabled:text-nodeSettings">
                                            <SelectValue placeholder="Hollow" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="not applicable">Not applicable</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell />
                                <TableCell>AI model training completion</TableCell>
                                <TableCell>
                                    <Checkbox
                                        className="border-[#6d6d6d] text-white data-[state=checked]:bg-primary-500"
                                        checked={data["ai.model.training.completion"].email}
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "ai.model.training.completion", "email")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        className="border-[#6d6d6d] text-white data-[state=checked]:bg-primary-500"
                                        checked={data["ai.model.training.completion"].browser}
                                        disabled
                                        onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "ai.model.training.completion", "browser")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select defaultValue="not applicable" disabled>
                                        <SelectTrigger className="w-[150px] disabled:bg-gray-100 disabled:text-nodeSettings">
                                            <SelectValue placeholder="Hollow" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="not applicable">Not applicable</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </div>
            </div>

            <Button
                onClick={handleSubmit} className="bg-primary-500 rounded-lg text-white h-9 px-5"
                disabled={loading}
            >
                {loading ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
        </>
    );
}
