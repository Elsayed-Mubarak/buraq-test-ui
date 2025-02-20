"use client"
import { useState } from "react"
import ResuableButton from "../../shared/ReusableButton"
import ReusableCancelButton from "../../shared/ReusableCancelButton"
import CreateLabelModal from "../modals/CreateLabelModal"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getLabels, deleteLabel as deleteLabelApi } from "@/service/labelsServices"
import ReusableTableMui from "../../shared/ReusableTableMui"
import DeleteLabelModal from "../modals/DeleteLabelModal"
import EditLabelModal from "../modals/EditLabelModal"
import toast from "react-hot-toast"
import { useRouter } from 'next/navigation'

const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "conversations", label: "Conversations", sortable: true },
    { key: "createdBy", label: "Created By", sortable: true },
    { key: "createdOn", label: "Created On", sortable: true },
];
type Props = {}

export default function LabelsTable({ }: Props) {
    const router = useRouter()
    const queryClient = useQueryClient();
    const [selected, setSelected] = useState([]);
    const [openCreateLabelModal, setOpenCreateLabelModal] = useState(false)
    const [openEditLabelModal, setOpenEditLabelModal] = useState(false)
    const [openDeleteLabelModal, setOpenDeleteLabelModal] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState(null)

    const handleEdit = (row: any) => {
        setOpenEditLabelModal(true);
        setSelectedLabel(row);
    };
    const handleDelete = (row: any) => {
        setOpenDeleteLabelModal(true);
        setSelectedLabel(row);
    };
    const handlePreview = (row: any) => {
        router.push(`/dashboard/live-chat/labels/${row._id}`)
    }

    const { data: labels } = useQuery({
        queryKey: ["labels"],
        queryFn: getLabels,
    });
    const { mutate: deleteLabel, isPending } = useMutation({
        mutationFn: deleteLabelApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["labels"] });
            toast.success("Label deleted successfully");
            setOpenDeleteLabelModal(prev => prev === true ? false : prev);
            setSelected([]);
        },
        onError: (err) => {
            toast.error(err.message);
            console.log(err)
        },
    })

    function handleDeleteMultiple() {
        if (selected.length === 0) return
        selected.forEach((id: any) => {
            deleteLabel(id)
        })
    }

    const formattedArray = (labels ?? []).map((item: any) => ({
        _id: item._id,
        name: item.name,
        conversations: item.conversations?.length || 0, // Safely get the number of conversations
        createdBy: `${item.createdBy?.firstName || ""} ${item.createdBy?.lastName || ""}`.trim(), // 
        createdOn: item.createdAt
            ? new Date(item.createdAt).toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })
            : "N/A",
    }));

    return (
        <div>
            <CreateLabelModal
                openCreateLabelModal={openCreateLabelModal}
                setOpenCreateLabelModal={setOpenCreateLabelModal}
            />
            <DeleteLabelModal
                isOpen={openDeleteLabelModal}
                setIsOpen={setOpenDeleteLabelModal}
                selectedLabel={selectedLabel}
                setSelectedLabel={setSelectedLabel}
                deleteLabel={deleteLabel}
                isPending={isPending}
            />
            <EditLabelModal
                isOpen={openEditLabelModal}
                setIsOpen={setOpenEditLabelModal}
                selectedLabel={selectedLabel}
                setSelectedLabel={setSelectedLabel}
            />
            <div className="flex items-center justify-between mb-2">
                <ResuableButton className={`${!selected?.length && "pointer-events-none opacity-0"} bg-[#f00] hover:bg-[#ed2b2b]`} onClick={handleDeleteMultiple} disabled={isPending}>
                    {(selected?.length > 0 && isPending) ? <span className='w-5 h-5 rounded-full animate-spin border border-solid border-[#f00] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite'></span> : 'Delete'}
                </ResuableButton>
                <ResuableButton onClick={() => { setOpenCreateLabelModal(true) }} disabled={selected?.length > 0}>Create Label</ResuableButton>
            </div>
            <div className="flex items-center gap-3 min-h-9 mb-2">
                {!selected?.length ? <div className="flex items-center gap-1 text-sm text-secondary-50">
                    <span>{labels?.length}</span>
                    <span>Labels</span>
                </div>
                    :
                    <>
                        <div className="flex items-center gap-1 text-sm text-secondary-50">
                            <span>{selected?.length}</span>
                            <span>Labels selected</span>
                        </div>
                        <ReusableCancelButton onClick={() => { setSelected([]) }}>Clear</ReusableCancelButton>
                    </>
                }
            </div>
            <ReusableTableMui
                data={formattedArray}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPreview={handlePreview}
                selectable={true}
                selected={selected}
                setSelected={setSelected}
            />
        </div>
    )
}
