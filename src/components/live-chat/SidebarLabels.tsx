"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import {
    getLabels,
    createLabel as createLabelApi,
    deleteLabel as deleteLabelApi,
    updateLabel as updateLabelApi
} from "@/service/labelsServices";
import { ChevronDown, Search, Tag, Pencil, Trash2, GripVertical, Check, X } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useLabelsStore } from "@/stores/useLabelsStore";
import { ILabel } from "@/types/live-chat";

type Props = {}

export default function SidebarLabels({ }: Props) {
    const pathName = usePathname()
    const queryClient = useQueryClient();
    const [openLabel, setOpenLabel] = useState(false);
    const [openAddLabel, setOpenAddLabel] = useState(false);
    const [labelContent, setLabelContent] = useState("");
    const [newLabel, setNewLabel] = useState("");
    const [editLabel, setEditLabel] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [error, setError] = useState(false);
    const [selectedLabelToEdit, setSelectedLabelToEdit] = useState<any>(null);
    const [showAllLabels, setShowAllLabels] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const labels = useLabelsStore((state) => state.labels);
    const setLabels = useLabelsStore((state) => state.setLabels);

    const { data: allLabels } = useQuery<ILabel[]>({
        queryKey: ["labels"],
        queryFn: getLabels,
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !labels.length,
    });

    const { mutate: createLabel } = useMutation({
        mutationFn: createLabelApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["labels"] });
            setLabelContent("");
        },
        onError: (err: any) => {
            toast.error(err);
            setLabelContent("");
            console.log(err)
        },
    });
    const { mutate: deleteLabel } = useMutation({
        mutationFn: deleteLabelApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["labels"] });
        },
        onError: (err) => {
            toast.error(err.message);
            console.log(err)
        },
    });
    const { mutate: updateLabel } = useMutation({
        mutationFn: ({ labelId, name }: { labelId: string, name: string }) => updateLabelApi(labelId, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["labels"] });
            setSelectedLabelToEdit(null);
            setNewLabel("");
        },
        onError: (err) => {
            toast.error(err.message);
            console.log(err)
        },
    });

    function addLabel() {
        if (!labelContent) {
            setError(true);
            return;
        }
        createLabel(labelContent);
        setError(false);
    }
    function removeLabel(labelId: string) {
        deleteLabel(labelId);
    }
    function handleUpdateLabel(name: string, labelId: string) {
        updateLabel({ labelId, name });
    }

    useEffect(() => {
        if (allLabels) {
            setLabels(allLabels);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allLabels])

    let searchLabels = labels?.filter((label: any) => label.name.toLowerCase().includes(searchQuery.toLowerCase()));
    let displayedLabels = showAllLabels ? labels : labels?.slice(0, 5);
    displayedLabels = searchQuery ? searchLabels : displayedLabels;

    return (
        <li>
            <div
                className="mt-2 flex cursor-pointer select-none items-center justify-between px-3"
            >
                <div onClick={() => setOpenLabel(!openLabel)} className="flex-1 text-sm font-semibold text-[#3a3a3a]">LABELS</div>
                <div className="flex items-center gap-2">
                    <span onClick={() => {
                        setOpenSearch((prev) => !prev);
                        setOpenLabel((prev) => prev || true);
                    }} className="flex h-9 w-7 items-center justify-center">
                        <Search className="h-4 w-4" />
                    </span>
                    <span onClick={() => setOpenLabel(!openLabel)} className="flex h-9 w-7 items-center justify-center">
                        <ChevronDown className={`${openLabel && "rotate-180"} transition-all duration-200 h-4 w-4`} />
                    </span>
                </div>
            </div>
            {openLabel && (
                <>
                    <div>
                        {openSearch && <div className="px-2 my-1">
                            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" className="border w-full border-primary-50 rounded-md py-2 px-2  text-sm text-secondary-50 caret-primary-500 outline-0" placeholder="Search..." />

                        </div>}
                        {displayedLabels &&
                            displayedLabels.map((label: any) => (
                                <Fragment key={label._id}>
                                    {editLabel && selectedLabelToEdit === label._id ? (
                                        <div className="">
                                            <div className="flex w-[calc(100%-16px)] ml-1 rounded-md border border-primary-50 items-center gap-2 px-1">
                                                <input
                                                    placeholder={label.name}
                                                    value={newLabel}
                                                    onChange={(e) => setNewLabel(e.target.value)}
                                                    type="text"
                                                    className="w-[50px] placeholder:text-primary-500 block flex-1  p-[6px] outline-0"
                                                />
                                                <div className="flex gap-1 items-center">
                                                    <span onClick={() => {
                                                        setEditLabel(false);
                                                        handleUpdateLabel(newLabel, selectedLabelToEdit);
                                                    }} className="cursor-pointer">
                                                        <Check className="h-5 w-5 text-primary-500" />
                                                    </span>
                                                    <span onClick={() => {
                                                        setNewLabel("")
                                                        setEditLabel(false)
                                                    }} className="cursor-pointer">
                                                        <X className="h-4 w-4 text-[#808080]" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={`${pathName.split("/").at(-1) === label._id ? "bg-primary-100 text-primary-500" : "text-secondary-50  hover:bg-[#f3f3f3]"} group grid grid-cols-[20px_1fr_auto] items-center rounded-md px-2 mb-1 py-2 font-semibold `}>
                                            <span>
                                                <Tag className="h-4 w-4 text-inherit" />
                                            </span>
                                            <Link href={`/dashboard/live-chat/labels//${label._id}`} className="text-inherit">{label.name}</Link>
                                            <div className="hidden group-hover:flex gap-2 transition-opacity duration-300">
                                                <span>
                                                    <Pencil onClick={() => {
                                                        setSelectedLabelToEdit(label._id);
                                                        setEditLabel(true)
                                                    }} className="h-4 w-4 cursor-pointer text-[#808080] hover:text-secondary-50" />
                                                </span>
                                                <span>
                                                    <Trash2 className="h-4 w-4 text-[#808080] cursor-pointer hover:text-[#f00]" onClick={() => removeLabel(label._id)} />
                                                </span>
                                            </div>
                                            <span className="block group-hover:hidden transition-opacity duration-300">{label?.conversations?.length}</span>
                                        </div>
                                    )}
                                </Fragment>
                            ))}
                    </div>
                    {openAddLabel && (
                        <div className="flex mb-5 w-[calc(100%-16px)] ml-1 rounded-md border border-primary-50 items-center gap-2 px-1 relative">
                            <input
                                placeholder="Name"
                                value={labelContent}
                                onChange={(e) => setLabelContent(e.target.value)}
                                type="text"
                                className="w-[50px] block flex-1  p-[6px] outline-0"
                            />
                            <div className="flex gap-1 items-center">
                                <span onClick={() => {
                                    setOpenAddLabel(labelContent ? false : true);
                                    addLabel();
                                }} className="cursor-pointer">
                                    <Check className="h-5 w-5 text-primary-500" />
                                </span>
                                <span onClick={() => setOpenAddLabel(false)} className="cursor-pointer">
                                    <X className="h-4 w-4 text-[#808080]" />
                                </span>
                            </div>
                            {error && <span className="absolute text-[12px] left-0 top-[calc(100%+3px)] text-[#f00]">This field cannot be empty</span>}
                        </div>
                    )}
                    {!openAddLabel ? <button
                        onClick={() => {
                            setShowAllLabels(true)
                            setOpenAddLabel(true)
                        }}
                        className="ml-5 font-semibold capitalize text-primary-500"
                    >
                        + label
                    </button> : <button
                        onClick={() => { addLabel(); setOpenAddLabel(true) }}
                        className="ml-5 font-semibold capitalize text-primary-500"
                    >
                        + Create another
                    </button>}
                    {labels?.length && labels?.length > 5 && <button onClick={() => setShowAllLabels(!showAllLabels)} className="ml-3 font-semibold flex items-center gap-2 mt-2">
                        <span>
                            <ChevronDown className={`h-5 w-5 text-[#808080] ${showAllLabels ? "rotate-180" : ""}`} />
                        </span>
                        <span>{showAllLabels ? "Show less" : "Show more"}</span>
                    </button>}
                </>
            )}
        </li>
    )
}