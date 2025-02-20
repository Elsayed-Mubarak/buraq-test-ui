import { Input } from "@/components/ui/input";
import React, { useState, useRef, useEffect } from "react";
import { TfiAngleDown } from "react-icons/tfi";
import CreateVaraibles from "../CreateVaraibles";
import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { FaUser } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import { useVariablesStore } from "@/stores/settings/useVariables.store";

interface Props {
    data?: any[];
    onChange: (...props: any[]) => void;
    triggerName: string;
    label?: string;
    noBorder?: boolean;
}

function VariablesDropdown({ data, onChange, triggerName, label, noBorder }: Props) {
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const { activeVariables } = useVariablesStore();
    const [open, setOpen] = useState<boolean>(false);
    const [q, setQ] = useState("");
    const [openUpwards, setOpenUpwards] = useState(false); // State to handle dropdown position

    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const handleToggleSelect = () => {
        setOpen((prev) => !prev);
    };

    const handleChange = (e: any) => {
        onChange?.(e);
        setOpen(false);
    };

    // Detect if dropdown should open upwards or downwards
    useEffect(() => {
        if (open) {
            const buttonRect = buttonRef.current?.getBoundingClientRect();
            const dropdownHeight = dropdownRef.current?.offsetHeight || 250;
            const spaceBelow = window.innerHeight - (buttonRect?.bottom || 0);

            if (spaceBelow < dropdownHeight) {
                setOpenUpwards(true);
            } else {
                setOpenUpwards(false);
            }
        }
    }, [open]);

    useEffect(() => {
        const filteredData = q
            ? (data || activeVariables)?.filter((item) =>
                item.variableName?.toLowerCase().includes(q.trim().toLowerCase())
            )
            : data || activeVariables;

        setFilteredData(filteredData);
    }, [q, data, activeVariables]);


    return (
        <>
            {/* Select Button */}
            <div
                className={`flex w-full justify-between items-center overflow-hidden p-2 rounded-md cursor-pointer ${noBorder ? "" : "border"}`}
                onClick={handleToggleSelect}
                ref={buttonRef}
            >
                <p className="text-sm truncate">{triggerName || "Select a variable"}</p>
                <TfiAngleDown className="text-gray-500 h-3 w-3" />
            </div>

            {/* Dropdown Content */}
            {open && (
                <div
                    ref={dropdownRef}
                    className={`absolute right-0 z-50 w-[300px] border rounded-md shadow-lg mt-1 p-1 bg-white
                    ${openUpwards ? "bottom-full mb-2" : "top-full mt-1"}`} // Positioning Logic
                >
                    {label && <p className="px-3 py-1 text-sm text-nodeSettings">{label}</p>}

                    {/* Search Box */}
                    <div className="sticky top-0 flex items-center bg-white px-2 rounded-md border focus:border-blue-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18px"
                            height="18px"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M15.755 14.255h-.79l-.28-.27a6.47 6.47 0 0 0 1.57-4.23 6.5 6.5 0 1 0-6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5"
                            ></path>
                        </svg>

                        <Input
                            type="search"
                            className="flex-1 border-none ring-0 outline-none placeholder:text-gray-400 text-sm px-2 rest-input"
                            placeholder="Search..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </div>

                    {/* Variables List */}
                    <div className="max-h-[250px] overflow-auto border-b rounded-md">
                        <div className="flex flex-col py-2 px-3">
                            {filteredData.length > 0 ? (
                                filteredData.map((item, idx) => (
                                    <React.Fragment key={item._id}>
                                        <label htmlFor={item._id}>
                                            <span
                                                key={item.id || idx}
                                                className="flex justify-between items-center text-sm w-full py-2 px-2 cursor-pointer hover:bg-gray-100 rounded-md"
                                            >
                                                <p className="flex items-center gap-1">
                                                    {item.type === "Contact" && <FaUser className="mr-1 text-gray-700" />}
                                                    {item.type === "Conversation" && <MdChat className="mr-1 text-gray-700" />}
                                                    <span className="text-nodeSettings font-medium truncate">{item.variableName}</span>
                                                </p>
                                                <span className="text-gray-500 text-xs whitespace-nowrap">{item.type}</span>
                                            </span>
                                        </label>
                                        <input
                                            type="radio"
                                            id={item._id}
                                            onChange={handleChange}
                                            className="hidden"
                                            value={item.variableName}
                                        />
                                    </React.Fragment>
                                ))
                            ) : (
                                <p className="text-sm text-center py-2 text-gray-500">No variables found</p>
                            )}
                        </div>
                    </div>

                    {/* Create Variables Section */}
                    <div className="sticky bottom-0 flex justify-center bg-white border-t w-full rounded-md">
                        <CreateVaraibles />
                    </div>
                </div>
            )}
        </>
    );
}

export default VariablesDropdown;
