import { useState } from "react";
import TemplateTableData from "./TemplateDataTable";
import RemoveTemplateMessageModal from "./RemoveTemplateMessageModal";
import PreviewTemplateMessageModal from "./PreviewTemplateModal";


const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "createdBy", label: "Created By", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "createdOn", label: "Created On", sortable: true },
    { key: "status", label: "Status", sortable: true },
];


type Props = {
    data: any
    onSyncTemplates: any
}

export default function WhatsappTemplateTable({ data, onSyncTemplates }: Props) {
    const [openRemoveTemplate, setOpenRemoveTemplate] = useState(false)
    const [openPreviewTemplate, setOpenPreviewTemplate] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

    const handleSync = (row: any) => {
        onSyncTemplates()
    };
    const handleDelete = (row: any) => {
        setOpenRemoveTemplate(true);
        setSelectedTemplate(row);
    };
    const handlePreview = (row: any) => {
        setOpenPreviewTemplate(true);
        setSelectedTemplate(row);
    }
    return (
        <div className="mt-5">
            <RemoveTemplateMessageModal
                isOpen={openRemoveTemplate}
                setIsOpen={setOpenRemoveTemplate}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
            />
            <PreviewTemplateMessageModal
                isOpen={openPreviewTemplate}
                setIsOpen={setOpenPreviewTemplate}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
            />
            <TemplateTableData
                data={data}
                columns={columns}
                onPreview={handlePreview}
                onDelete={handleDelete}
                onSync={handleSync}
            />
        </div>
    )
}
