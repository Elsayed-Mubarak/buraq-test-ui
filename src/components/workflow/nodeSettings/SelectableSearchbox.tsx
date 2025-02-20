"use client";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { TfiAngleDown } from "react-icons/tfi";

interface Props {
    data: { id: string | number; name: string, value: string }[];
    onChange: (...props: any[]) => void;
    triggerName: string;
    label: string;
    defaultValues: string[];
}

function SelectableSearchbox({ data, onChange, triggerName, defaultValues, label }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [q, setQ] = useState("");
    const [values, setValues] = useState<string[]>(defaultValues);

    const handleChange = (e: any) => {
        const { checked, value } = e.target;

        setValues((prevValues) => {
            const updatedValues = checked
                ? [...prevValues, value]
                : prevValues.filter((item) => item !== value);

            onChange?.(updatedValues);
            return updatedValues;
        });

    };

    useEffect(() => {
        console.log(values);
    }, [values])

    const handleToggleSelect = () => {
        setOpen((prev) => !prev);
    };

    const filteredData = q
        ? data.filter((item) => item.name?.toLowerCase().includes(q.trim().toLowerCase()))
        : data;

    return (
        <div className="relative mt-4">

            <div
                className="flex w-full justify-between items-center border p-2 rounded-md"
                onClick={handleToggleSelect}
            >
                <p className="text-sm">{triggerName || "Select"}</p>
                <TfiAngleDown className="text-gray-500 h-3 w-3" />
            </div>

            {open && (
                <div className="rounded-md border w-full p-2 h-[300px] mt-1 overflow-y-auto">
                    {label && <p className="mb-0.5 text-sm text-nodeSettings">{label}</p>}
                    <div className="flex items-center rounded-md w-full border p-1">
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
                            className="ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent border-0 border-none h-[27px] focus:border-indigo-500
                            border-gray-300 hover:border-indigo-500 flex-1 placeholder:tex-sm placeholder:text-gray-400"
                            placeholder="Search..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-3 w-full py-4 px-1 mb-2">
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        value={item.id}
                                        type="checkbox"
                                        id={item.id.toString()}
                                        checked={values.includes(item.id as string)}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={item.id.toString()}>
                                        {item.name}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No results found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
export default SelectableSearchbox;