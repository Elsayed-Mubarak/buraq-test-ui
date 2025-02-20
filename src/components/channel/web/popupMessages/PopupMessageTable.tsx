import { useEffect, useState } from "react";
import PopupMessageDataTable from "./PopupMessageDataTable"
import RemovePopupMessageModal from "./RemovePopupMessageModal";
import EditPopupMessageModal from "./EditPopupMessageModal";
import { useQuery } from "@tanstack/react-query";
import { getPopupMessages } from "@/service/popupMessagesServices";
import SpinnerFull from "@/components/shared/SpinnerFull";

type Props = {
    setPopupMessagesCount: any
}

const columns = [
    { key: "include", label: "Include on URL(s)" },
    { key: "messages", label: "Messages" },
    { key: "media", label: "Media" },
];

export default function PopupMessageTable({ setPopupMessagesCount }: Props) {
    const [openEditPopupMessageModal, setOpenEditPopupMessageModal] = useState(false)
    const [openRemovePopupMessageModal, setOpenRemovePopupMessageModal] = useState(false)
    const [selectedPopupMessage, setSelectedPopupMessage] = useState({});

    const { data: popupMessages, isLoading } = useQuery({
        queryKey: ['popupMessages'],
        queryFn: () => getPopupMessages(),
    });

    useEffect(() => {
        if (popupMessages) setPopupMessagesCount(popupMessages?.length)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popupMessages])

    function handleEdit(row: any) {
        setOpenEditPopupMessageModal(true)
        setSelectedPopupMessage(row)
    }
    function handleDelete(row: any) {
        setOpenRemovePopupMessageModal(true)
        setSelectedPopupMessage(row)
    }

    const formatedData = Array.isArray(popupMessages)
        ? popupMessages.map((item) => ({
            _id: item._id,
            include: item.url,
            media: item.file,
            messages: item.message,
            name: item.filename
        }))
        : [];


    if (isLoading) return <SpinnerFull />
    return (
        <div className="">
            <RemovePopupMessageModal
                isOpen={openRemovePopupMessageModal}
                setIsOpen={setOpenRemovePopupMessageModal}
                selectedPopupMessage={selectedPopupMessage}
                setSelectedPopupMessage={setSelectedPopupMessage}
            />
            <EditPopupMessageModal
                isOpen={openEditPopupMessageModal}
                setIsOpen={setOpenEditPopupMessageModal}
                selectedPopupMessage={selectedPopupMessage}
                setSelectedPopupMessage={setSelectedPopupMessage}
            />
            <PopupMessageDataTable
                columns={columns}
                data={formatedData}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    )
}