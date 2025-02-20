import UserIcon from "@/constants/icons/userIcon";
import { GridColDef } from "@mui/x-data-grid";
import EditTeammateDialog from "./EditTeammateDialog";
import Image from "next/image";
import RemoveTeamateDialog from "./RemoveTeamateDialog";
import { format } from "date-fns";
import TeammatesLogs from "./TeammatesLogs";

export const TeammatesColumns: GridColDef[] = [
    {
        field: 'name',
        flex: 1,
        headerName: 'Name',
        width: 250,
        sortable: true,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings w-[250px]",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3]",
        renderCell: (params) => (
            <div className="flex items-center gap-2">
                {params.row.profilePicture ? (
                    <Image
                        src={params.row.profilePicture}
                        alt=""
                        width={28}
                        height={28}
                        className="rounded-full object-cover block"
                    />
                ) : (
                    <UserIcon />
                )}
                <p>{params.row?.name?.slice(0, 20)}</p>
            </div>
        )
    },
    {
        field: 'email',
        flex: 1,
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
        flex: 1,
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
        flex: 1,
        headerName: 'Last Login',
        type: 'number',
        width: 250,
        sortable: true,
        headerAlign: 'left',
        align: 'left',
        cellClassName: "text-nodeSettings w-[250px]",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3]",
        renderCell(params) {
            const lastLogin = new Date(params?.row?.lastLogin);
            const isValidDate = !isNaN(lastLogin.getTime());

            return (
                <p>
                    {isValidDate ? format(lastLogin, 'dd-MMM-yy, hh:mm a') : "-"}
                </p>
            );
        },
    },
    {
        field: 'fa',
        flex: 1,
        headerName: '2FA Status',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 110,
        cellClassName: "text-nodeSettings w-[110px]",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3]",
    },
    {
        field: 'actions',
        flex: 1,
        headerName: '',
        headerAlign: 'center',
        align: 'center',
        cellClassName: "text-nodeSettings border-none",
        headerClassName: "text-nodeSettings w-full bg-[#f3f3f3]",
        sortable: false,
        renderCell: (params) => (
            < >
                <EditTeammateDialog id={params.row.id} />
                <RemoveTeamateDialog id={params.row.id} name={params.row.name} />
                <TeammatesLogs id={params.row.id} name={params.row.name} />
            </>
        )
    },
];