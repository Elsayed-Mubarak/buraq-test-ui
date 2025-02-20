import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronDown, Search, Tag, Pencil, Trash2, ListFilter, GripVertical } from "lucide-react";
import CreateViewModal from "./modals/CreateViewModal";
import DeleteViewModal from "./modals/DeleteViewModal";
import EditViewModal from "./modals/EditViewModal";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {}

const views = [
    {
        _id: "452",
        name: "Ms",
        conversations: [
        ]
    },
    {
        _id: "1254254",
        name: "Unassigned",
        conversations: [
            "1234",
            "1235",
            "1234",
            "1235",
        ]
    },
    {
        _id: "12545244",
        name: "Bot",
        conversations: [
            "1234",

        ]
    },
    {
        _id: "12542554",
        name: "Ahmed",
        conversations: [
            "1234",
            "1235",
            "1235",
        ]
    },
    {
        _id: "2542",
        name: "test 1",
        conversations: [
            "1234",
            "1235",
        ]
    },
    {
        _id: "1255",
        name: "test 2",
        conversations: [
            "1234",
            "1235",
            "1235",
            "1235",
        ]
    },
]

export default function SidebarViews({ }: Props) {
    const pathName = usePathname()
    const queryClient = useQueryClient();
    const [openAddView, setOpenAddView] = useState(false);
    const [openDeleteView, setOpenDeleteView] = useState(false);
    const [openEditView, setOpenEditView] = useState(false);
    const [openViews, setOpenViews] = useState(false);
    const [viewContent, setViewContent] = useState("");
    const [openSearch, setOpenSearch] = useState(false);
    const [showAllViews, setShowAllViews] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");



    let searchViews = views?.filter((view: any) => view.name.toLowerCase().includes(searchQuery.toLowerCase()));
    let displayedViews = showAllViews ? views : views?.slice(0, 5);
    displayedViews = searchQuery ? searchViews : displayedViews;
    return (
        <li>
            {/* <CreateViewModal openAddView={openAddView} setOpenAddView={setOpenAddView} /> */}
            <EditViewModal openEditView={openEditView} setOpenEditView={setOpenEditView} />
            <DeleteViewModal openDeleteView={openDeleteView} setOpenDeleteView={setOpenDeleteView} />
            <div
                className="mt-2 flex cursor-pointer select-none items-center justify-between px-3"
            >
                <div onClick={() => setOpenViews(!openViews)} className="flex-1 text-sm font-semibold text-[#3a3a3a]">VIEWS</div>
                <div className="flex items-center gap-2">
                    <span onClick={() => {
                        setOpenSearch((prev) => !prev);
                        setOpenViews((prev) => prev || true);
                    }} className="flex h-9 w-7 items-center justify-center">
                        <Search className="h-4 w-4" />
                    </span>
                    <span onClick={() => setOpenViews(!openViews)} className="flex h-9 w-7 items-center justify-center">
                        <ChevronDown className={`${openViews && "rotate-180"} transition-all duration-200 h-4 w-4`} />
                    </span>
                </div>
            </div>
            {openViews && (
                <>
                    <div>
                        {openSearch && <div className="px-5 my-1">
                            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" className="border border-primary-50 rounded-md py-2 px-2  text-sm text-secondary-50 caret-primary-500 outline-0" placeholder="Search..." />

                        </div>}
                        {displayedViews &&
                            displayedViews.map((view: any) => (
                                <div key={view._id} className={`${pathName.split("/").at(-1) === view._id ? "bg-primary-100 text-primary-500" : "text-secondary-50  hover:bg-[#f3f3f3]"} group grid grid-cols-[20px_1fr_auto] mb-1 items-center rounded-md px-2 py-2 font-semibold `}>
                                    <span>
                                        <ListFilter className="h-4 w-4 text-inherit" />
                                    </span>
                                    <Link href={`/dashboard/live-chat/views/${view._id}`} className="text-inherit">{view.name}</Link>
                                    <div className="hidden group-hover:flex gap-2 transition-opacity duration-300">
                                        <span>
                                            <Pencil onClick={() => {
                                                setOpenEditView(true)
                                            }} className="h-4 w-4 cursor-pointer text-[#808080] hover:text-secondary-50" />
                                        </span>
                                        <span>
                                            <Trash2 className="h-4 w-4 text-[#808080] cursor-pointer hover:text-[#f00]" onClick={() => setOpenDeleteView(true)} />
                                        </span>
                                    </div>
                                    <span className="block group-hover:hidden transition-opacity duration-300">{view?.conversations?.length}</span>
                                </div>
                            ))}
                    </div>

                    <button
                        onClick={() => { setOpenAddView(true) }}
                        className="ml-5 font-semibold capitalize text-primary-500"
                    >
                        + views
                    </button>
                    {views?.length > 5 && <button onClick={() => setShowAllViews(!showAllViews)} className="ml-3 font-semibold flex items-center gap-2 mt-2">
                        <span>
                            <ChevronDown className={`h-5 w-5 text-[#808080] ${showAllViews ? "rotate-180" : ""}`} />
                        </span>
                        <span>{showAllViews ? "Show less" : "Show more"}</span>
                    </button>}
                </>
            )}
        </li>
    )
}