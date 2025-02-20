
import { GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import ArchiveDialog from "./ArchiveDialog";
import RestoreVariableDialog from "./RestoreDialog";
import EditVariableDialog from "./EditDialog";

export const variablesColumns: GridColDef[] = [
    {
        field: 'variableName',
        flex: 1,
        headerName: 'Variable Name',
        width: 150,
        sortable: true,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings text-sm font-light flex items-center",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3] text-sm font-light",
    },
    {
        field: 'type',
        flex: 1,
        headerName: 'Type',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 150,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings text-sm font-light py-4 flex items-center",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3] text-sm font-light",
    },
    {
        field: 'format',
        flex: 1,
        headerName: 'Format',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 150,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings text-sm font-light py-4 flex items-center justify-center",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3] text-sm font-light",
    },
    {
        field: 'CreatedBy',
        flex: 1,
        headerName: 'Created by',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 150,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings text-sm font-light py-4 flex items-center justify-center",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3] text-sm font-light",
        renderCell(params) {
            return (
                <p>
                    {params.row.createdBy?.userName}
                </p>
            )
        }
    },
    {
        field: 'createdAt',
        flex: 1,
        headerName: 'Created On',
        width: 150,
        sortable: true,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings text-sm font-thin flex items-center h-full",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3] text-sm font-light",
        renderCell(params) {
            return (
                <p>
                    {format(new Date(params.row.createdAt), 'dd-MMM-yy, hh:mm a')}
                </p>
            )
        },
    },
    {
        field: 'status',
        flex: 1,
        headerName: '',
        width: 150,
        headerAlign: 'center',
        align: 'center',
        cellClassName: "text-nodeSettings text-sm font-light",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3] text-sm font-light",
        sortable: false,
        renderCell: (params) => (
            <div className="flex justify-end items-center w-full gap-8 h-full px-5" >
                {params.row.status === "active" ? (
                    <>
                        <EditVariableDialog
                            id={params.row.id}
                        />

                        <ArchiveDialog
                            id={params.row.id}
                            name={params.row.variableName}
                        />
                    </>
                ) : (
                    <RestoreVariableDialog
                        id={params.row.id}
                        name={params.row.variableName}
                    />
                )
                }
            </div>
        )
    },
];

