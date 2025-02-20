import { Avatar, AvatarGroup } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";


export const RolesColumns: GridColDef[] = [
    {
        field: 'role',
        headerName: 'Role',
        width: 200,
        sortable: true,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings w-[250px]",
        headerClassName: "text-nodeSettings w-full",
    },
    {
        field: 'description',
        headerName: 'Description',
        flex: 1,
        width: 250,
        sortable: true,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings w-[250px]",
        headerClassName: "text-nodeSettings w-full",
    },
    {
        field: 'teammates',
        headerName: 'Teammates',
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings",
        headerClassName: "text-nodeSettings w-full",
        sortable: false,
        renderCell: (params) => {
            const teammates = params.row.teammates || [];
            return (
                <div className="flex items-center justify-normal">
                    <p>
                        {teammates?.length} members
                    </p>
                    <div className="h-4 border-l border-black mx-4" />
                    <AvatarGroup spacing="small" max={4}>
                        {teammates.map((teammate: any) => (
                            <Avatar
                                key={teammate.firstName}
                                alt={teammate?.firstName || "User"}
                                src={teammate?.profilePicture || "https://via.placeholder.com/150"}
                            />
                        ))}
                    </AvatarGroup>
                </div>
            );
        }
    },
    {
        field: 'createdAt',
        headerName: 'Created on',
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings",
        headerClassName: "text-nodeSettings w-full",
        sortable: false,
        renderCell: (params) => (
            <div className="flex justify-start items-center w-full gap-8 h-full">
                {params.row.createdAt ? format(new Date(params?.row?.createdAt), "dd-MMM-yy, hh:mm a") : "-"}
            </div>
        )
    },
];
