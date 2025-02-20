import { ChevronDown, GalleryHorizontal, RefreshCw, Search, Type } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import ReusableCheckbox from "@/components/shared/ReusableCheckbox";
type Props = {
    searchQuery: string
    setSearchQuery: (query: string) => void
    filterStatus: string[]
    setFilterStatus: any,
    onSyncTemplates: () => void
}

export default function TemplateOperations({ searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus, onSyncTemplates }: Props) {
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [requestChecked, setRequestChecked] = useState(false);
    const [approvedChecked, setApprovedChecked] = useState(false);
    const [rejectedChecked, setRejectedChecked] = useState(false);
    const [inactiveChecked, setInactiveChecked] = useState(false);

    useEffect(() => {
        setFilterStatus((prev: string[]) => {
            let updatedStatus = prev;
            if (requestChecked) {
                if (!updatedStatus.includes("requested")) {
                    updatedStatus = [...updatedStatus, "requested"];
                }
            } else {
                updatedStatus = updatedStatus.filter((item) => item !== "requested");
            }

            if (approvedChecked) {
                if (!updatedStatus.includes("approved")) {
                    updatedStatus = [...updatedStatus, "approved"];
                }
            } else {
                updatedStatus = updatedStatus.filter((item) => item !== "approved");
            }

            if (rejectedChecked) {
                if (!updatedStatus.includes("rejected")) {
                    updatedStatus = [...updatedStatus, "rejected"];
                }
            } else {
                updatedStatus = updatedStatus.filter((item) => item !== "rejected");
            }

            if (inactiveChecked) {
                if (!updatedStatus.includes("inactive")) {
                    updatedStatus = [...updatedStatus, "inactive"];
                }
            } else {
                updatedStatus = updatedStatus.filter((item) => item !== "inactive");
            }

            return updatedStatus;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestChecked, approvedChecked, rejectedChecked, inactiveChecked]);
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="relative max-w-[400px] h-9 w-full">
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="peer block w-full text-sm  h-full pl-8 border border-primary-50 rounded-lg outline-0 hover:border-primary-600 focus:border-primary-600 transition-all duration-100 focus:shadow-[#343de6_0_0_4px]"
                    type="text"
                />
                <span className="text-[#808080] peer-focus:text-primary-600">
                    <Search className="w-5 h-5 absolute top-[50%] left-2  translate-y-[-50%]" />
                </span>
            </div>
            <div className="flex items-center gap-2 relative">
                <div>
                    <Popover open={isStatusOpen} onOpenChange={() => setIsStatusOpen(!isStatusOpen)}>
                        <PopoverTrigger asChild className="w-[150px]">
                            <Button variant="outline" className="flex items-center justify-between">
                                <span className={`${filterStatus.length > 0 ? "text-secondary-50" : "text-[#808080]"}`}>
                                    {filterStatus.length > 0 ? `${filterStatus.length} status selected` : "Select status"}
                                </span>
                                <ChevronDown className={`${isStatusOpen ? "rotate-180" : ""} transition-all duration-300`} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-[200px] bg-white p-0">
                            <div className="p-3 border-b">
                                <div className="relative max-w-[400px] h-9 w-full">
                                    <input
                                        placeholder="Search..."
                                        className="peer block w-full text-sm  h-full pl-8 border border-primary-50 rounded-lg outline-0 hover:border-primary-600 focus:border-primary-600 transition-all duration-100 focus:shadow-[#343de6_0_0_4px]"
                                        type="text"
                                    />
                                    <span className="text-[#808080] peer-focus:text-primary-600">
                                        <Search className="w-4 h-4 absolute top-[50%] left-2  translate-y-[-50%]" />
                                    </span>
                                </div>
                            </div>
                            <div onClick={() => setRequestChecked(!requestChecked)} className="py-3 px-4 flex items-center gap-2 hover:bg-[#f3f3f3] cursor-pointer text-secondary-50 text-sm">
                                <ReusableCheckbox size="small" isChecked={requestChecked} setIsChecked={setRequestChecked} />
                                <span>Requested</span>
                            </div>
                            <div onClick={() => setApprovedChecked(!approvedChecked)} className="py-3 px-4 flex items-center gap-2 hover:bg-[#f3f3f3] cursor-pointer text-secondary-50 text-sm">
                                <ReusableCheckbox size="small" isChecked={approvedChecked} setIsChecked={setApprovedChecked} />
                                <span>Approved</span>
                            </div>
                            <div onClick={() => setRejectedChecked(!rejectedChecked)} className="py-3 px-4 flex items-center gap-2 hover:bg-[#f3f3f3] cursor-pointer text-secondary-50 text-sm">
                                <ReusableCheckbox size="small" isChecked={rejectedChecked} setIsChecked={setRejectedChecked} />
                                <span>Rejected</span>
                            </div>
                            <div onClick={() => setInactiveChecked(!inactiveChecked)} className="py-3 px-4 flex items-center gap-2 hover:bg-[#f3f3f3] cursor-pointer text-secondary-50 text-sm">
                                <ReusableCheckbox size="small" isChecked={inactiveChecked} setIsChecked={setInactiveChecked} />
                                <span>Inactive</span>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <Button onClick={onSyncTemplates} variant="outline" className="flex items-center text-sm w-[140px]">
                        <RefreshCw className="text-secondary-50" />
                        <span className="text-secondary-50">Sync templates</span>
                    </Button>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger asChild className="w-[120px]">
                            <Button className="flex items-center justify-between text-sm bg-primary-500 text-white transition-all duration-300 hover:bg-primary-600">
                                Add Template
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-[260px] bg-white p-0">
                            <Link href="/dashboard/channel/whatsapp/templates/create" className="flex text-sm hover:bg-[#f3f3f3] items-center gap-2 p-2">
                                <div className="w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center">
                                    <Type size={20} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-sm text-secondary-50">Text/Media template</div>
                                    <div className="text-[11px] text-[#808080]">Interactive message to get response</div>
                                </div>
                            </Link>
                            <Link href="/dashboard/channel/whatsapp/templates/create-carousel" className="flex text-sm hover:bg-[#f3f3f3] items-center gap-2 p-2">
                                <div className="w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center">
                                    <GalleryHorizontal size={20} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-sm text-secondary-50">Carousel template</div>
                                    <div className="text-[11px] text-[#808080]">Interactive message to get response</div>
                                </div>
                            </Link>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}