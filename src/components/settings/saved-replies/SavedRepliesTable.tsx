import React, { useState } from 'react'
import CreateSavedRepliesModal from '../modals/CreateSavedRepliesModal'
import EditSavedRepliesModal from '../modals/EditSavedRepliesModal'
import DeleteSavedReplyModal from '../modals/DeleteSavedReplyModal';
import { getSavedReplies, deleteSavedReply as deleteSavedReplyApi } from '@/service/savedReplies';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReusableTableMui from "@/components/shared/ReusableTableMui"
import ResuableButton from '@/components/shared/ReusableButton';
import ReusableCancelButton from '@/components/shared/ReusableCancelButton';
import toast from 'react-hot-toast';

const columns = [
    { key: "title", label: "Title", sortable: true },
    { key: "frequency", label: "Frequency", sortable: true },
    { key: "createdBy", label: "Created By", sortable: true },
    { key: "modifiedOn", label: "Modified On", sortable: true },
    { key: "createdOn", label: "Created On", sortable: true },
];
type Props = {}

export default function SavedRepliesTable({ }: Props) {
    const queryClient = useQueryClient();
    const [selected, setSelected] = useState([]);
    const [selectedSavedReply, setSelectedSavedReply] = useState({});
    const [openCreateSavedReplyModal, setOpenCreateSavedReplyModal] = useState(false)
    const [openEditSavedReplyModal, setOpenEditSavedReplyModal] = useState(false)
    const [openDeleteSavedReplyModal, setOpenDeleteSavedReplyModal] = useState(false)

    const handleEdit = (row: any) => {
        setSelectedSavedReply(row);
        setOpenEditSavedReplyModal(true);
    };
    const handleDelete = (row: any) => {
        setSelectedSavedReply(row);
        setOpenDeleteSavedReplyModal(true);
    };
    const { data: savedReplies } = useQuery({
        queryKey: ["saved-replies"],
        queryFn: getSavedReplies,
    });


    const { mutate: deleteSavedReply, isPending } = useMutation({
        mutationFn: deleteSavedReplyApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["labels"] });
            toast.success("Label deleted successfully");
            setOpenDeleteSavedReplyModal(prev => prev === true ? false : prev);
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
            deleteSavedReply(id)
        })
    }

    const formattedArray = (savedReplies ?? []).map((item: any) => ({
        _id: item._id,
        title: item.title,
        reply: item.reply,
        frequency: item.frequency,
        createdBy: `${item.createdBy?.firstName || ""} ${item.createdBy?.lastName || ""}`.trim(),
        modifiedOn: item.modifiedAt
            ? new Date(item.modifiedAt).toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }) : "N/A",
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
            <CreateSavedRepliesModal
                isOpen={openCreateSavedReplyModal}
                setIsOpen={setOpenCreateSavedReplyModal}
            />
            <EditSavedRepliesModal
                isOpen={openEditSavedReplyModal}
                setIsOpen={setOpenEditSavedReplyModal}
                selectedSavedReply={selectedSavedReply}
                setSelectedSavedReply={setSelectedSavedReply}
            />
            <DeleteSavedReplyModal
                isOpen={openDeleteSavedReplyModal}
                setIsOpen={setOpenDeleteSavedReplyModal}
                selectedSavedReply={selectedSavedReply}
                setSelectedSavedReply={setSelectedSavedReply}
                isPending={isPending}
                deleteSavedReply={deleteSavedReply}
            />
            <div className='flex justify-between items-center mb-3'>
                <div>
                    {!selected?.length ? <div className="flex items-center gap-1 text-sm text-secondary-50">
                        <span>{savedReplies?.length}</span>
                        <span>saved replies</span>
                    </div>
                        :
                        <div className='flex items-center gap-2'>
                            <div className="flex items-center gap-1 text-sm text-secondary-50">
                                <span>{selected?.length}</span>
                                <span>saved replies selected</span>
                            </div>
                            <ReusableCancelButton onClick={() => { setSelected([]) }}>Clear</ReusableCancelButton>
                        </div>
                    }
                </div>
                <div className='flex items-center gap-2'>
                    <ResuableButton className={`${!selected?.length && "pointer-events-none opacity-0"} bg-[#f00] hover:bg-[#ed2b2b]`} onClick={handleDeleteMultiple} disabled={false}>Delete</ResuableButton>
                    <ResuableButton onClick={() => { setOpenCreateSavedReplyModal(true) }} disabled={selected?.length > 0}>Create Saved Reply</ResuableButton>
                </div>
            </div>
            <ReusableTableMui
                data={formattedArray}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                selectable={true}
                selected={selected}
                setSelected={setSelected}
            />
        </div>
    )
}