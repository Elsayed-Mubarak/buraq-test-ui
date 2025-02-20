import { format } from 'date-fns';
import { GridColDef } from "@mui/x-data-grid";
import { Avatar, AvatarGroup } from "@mui/material";
import Image from "next/image";
import RemoveTeamDialog from "./RemoveTeamDialog";
import EditTeamDialog from "./EditTeamDialog";

export const TeamsColumns: GridColDef[] = [
    {
        field: 'name',
        flex: 1,
        headerName: 'Name',
        width: 150,
        sortable: true,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings text-sm font-light",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3] text-sm font-light",
        renderCell: (params) => (
            <div className="flex items-center h-full gap-4">
                <Image
                    src={params.row.image || "https://buraq-ai-assets.storage.googleapis.com/static/img/team_default_avatar.svg"}
                    alt=""
                    width={28}
                    height={28}
                    className='w-[28px] h-[28px] rounded-full object-cover'
                />
                <p className="inline-block">{params.row.name}</p>
            </div>
        )
    },
    {
        field: 'members',
        flex: 1,
        headerName: 'Members',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 150,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings text-sm font-light py-4 flex items-center justify-center",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3] text-sm font-light",
        renderCell: (params) => {
            const members = params.row.members || [];
            return (
                <AvatarGroup spacing="small" max={4}>
                    {members.map((member: any) => (
                        <Avatar
                            key={member.teammate._id}
                            alt={member.teammate?.firstName || "User"}
                            src={member.teammate?.profilePicture || "https://via.placeholder.com/150"}
                        />
                    ))}
                </AvatarGroup>
            );
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
        field: 'actions',
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
                <EditTeamDialog
                    id={params.row.id}
                />
                <RemoveTeamDialog
                    id={params.row.id}
                    name={params.row.name}
                />
            </div>
        )
    },
];