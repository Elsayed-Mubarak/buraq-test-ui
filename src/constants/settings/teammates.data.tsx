import { GridColDef } from "@mui/x-data-grid";

export const teammatesColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        width: 250,
        sortable: true,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings w-[250px]",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3]",
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        sortable: true,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings w-[250px]",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3]",
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 110,
        sortable: true,
        headerAlign: 'center',
        align: 'center',
        cellClassName: "text-nodeSettings w-[110px]",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3]",
    },
    {
        field: 'lastLogin',
        headerName: 'Last Login',
        type: 'number',
        width: 250,
        sortable: true,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings w-[250px]",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3]",
    },
    {
        field: 'fa',
        headerName: '2FA Status',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 110,
        cellClassName: "text-nodeSettings w-[110px]",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3]",
    },
    {
        field: 'actions',
        headerName: '',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        cellClassName: "text-nodeSettings",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3]",
        sortable: false,
        renderCell: (params) => (
            <div className="flex justify-end items-center w-full gap-8 h-full px-5" >
                <button className="text-[14px] font-light text-blue-500 hover:underline"> Edit </button>
                <button className="text-[14px] font-light text-blue-500 hover:underline"> Remove </button>
                <button className="text-[14px] font-light text-blue-500 hover:underline"> logs </button>
            </div>
        )
    },
];