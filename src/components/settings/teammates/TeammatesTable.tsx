import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    TablePagination,
    TableSortLabel,
    Tooltip,
} from "@mui/material";
import EditTeammateDialog from "./EditTeammateDialog";
import RemoveTeammateDialog from "./RemoveTeamateDialog";
import TeammatesLogs from "./TeammatesLogs";
import { format } from "date-fns";
import useTeammatesStore from "@/stores/settings/useTeamates.store";

type Row = {
    id: any;
    profilePicture: any;
    name: any;
    email: any;
    role: any;
    fa: any;
    lastLogin: any;
    action: string;
};

const TeammatesTable = () => {
    const { teammates, getTeammates } = useTeammatesStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [orderBy, setOrderBy] = useState<"name" | "email" | "role" | "lastLogin" | "fa">("name");
    const [rows, setRows] = useState<Row[]>([]);

    useEffect(() => {
        getTeammates();
    }, [getTeammates]);

    useEffect(() => {
        const safeData = Array.isArray(teammates) ? teammates : [];
        const initialRows = safeData.map((item, index) => ({
            id: item?.teammate?._id || index,
            profilePicture: item?.teammate?.profilePicture,
            name:
                item?.teammate?.userName ||
                `${item?.teammate?.firstName} ${item?.teammate?.lastName}` ||
                "-",
            email: item?.teammate?.email || "-",
            role: item?.role?.name || "-",
            fa: item?.teammate?.twoFAStatus || "Disabled",
            lastLogin: item?.teammate?.lastLogin || "-",
            action: item?._id,
        }));
        setRows(initialRows);
    }, [teammates]);

    const handleSort = (property: "name" | "email" | "role" | "lastLogin" | "fa") => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);

        const sortedData = [...rows].sort((a, b) => {
            if (property === "lastLogin") {
                const dateA = new Date(a[property] as string);
                const dateB = new Date(b[property] as string);
                return isAsc ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
            }
            const valueA = a[property]?.toString().toLowerCase() || "";
            const valueB = b[property]?.toString().toLowerCase() || "";
            return isAsc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        });

        setRows(sortedData);
    };

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    let loggedIn = true;

    return (
        <Paper className="shadow-md rounded-lg overflow-hidden">
            <TableContainer className="overflow-x-auto shadow-md rounded-lg">
                <Table className="table-auto w-full">
                    {/* Table Head */}
                    <TableHead className="bg-[#f3f3f3]">
                        <TableRow>
                            <TableCell className="py-3 px-4 font-semibold text-gray-700 min-w-[150px]">
                                <TableSortLabel
                                    active={orderBy === "name"}
                                    direction={order}
                                    onClick={() => handleSort("name")}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="py-3 px-4 font-semibold text-gray-700 min-w-[200px]">
                                <TableSortLabel
                                    active={orderBy === "email"}
                                    direction={order}
                                    onClick={() => handleSort("email")}
                                >
                                    Email
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="py-3 px-4 font-semibold text-gray-700 text-center min-w-[100px]">
                                <TableSortLabel
                                    active={orderBy === "role"}
                                    direction={order}
                                    onClick={() => handleSort("role")}
                                >
                                    Role
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="py-3 px-4 font-semibold text-gray-700 text-center min-w-[150px]">
                                <TableSortLabel
                                    active={orderBy === "lastLogin"}
                                    direction={order}
                                    onClick={() => handleSort("lastLogin")}
                                >
                                    Last Login
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="py-3 px-4 font-semibold text-gray-700 text-center min-w-[120px]">
                                <TableSortLabel
                                    active={orderBy === "fa"}
                                    direction={order}
                                    onClick={() => handleSort("fa")}
                                >
                                    2FA Status
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className="py-3 px-4 font-semibold text-gray-700 text-center min-w-[150px]">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {/* Table Body */}
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow
                                key={row.id}
                                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } hover:bg-gray-100 border-b border-gray-200`}
                            >
                                {/* Name */}
                                <TableCell className="py-3 px-4 min-w-[150px]">
                                    <div className="flex items-center gap-2">
                                        {/* Profile Picture or Initials */}
                                        {row.profilePicture ? (
                                            <div className="relative">
                                                <Avatar
                                                    src={row.profilePicture}
                                                    alt={row.name}
                                                    className="w-8 h-8"
                                                />
                                                <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-gray-200 rounded-full block z-20 ${loggedIn ? "bg-green-500" : "bg-gray-300"}`} />
                                            </div>
                                        ) : (

                                            <div className="relative">
                                                <Avatar className="bg-gray-300 text-gray-700 w-8 h-8">
                                                    {row.name.charAt(0).toUpperCase()}
                                                </Avatar>
                                                <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-gray-200 rounded-full block z-20 ${loggedIn ? "bg-green-500" : "bg-gray-300"}`} />
                                            </div>
                                        )}
                                        {/* Tooltip for Full Name */}
                                        <Tooltip title={row.name}>
                                            <span className="truncate max-w-[100px] cursor-pointer">
                                                {row.name.length > 15 ? `${row.name.slice(0, 12)}...` : row.name}
                                            </span>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                                {/* Email */}
                                <TableCell className="py-3 px-4 min-w-[200px] truncate">
                                    {row.email}
                                </TableCell>
                                {/* Role */}
                                <TableCell className="py-3 px-4 min-w-[100px] text-center">
                                    {row.role}
                                </TableCell>
                                {/* Last Login */}
                                <TableCell className="py-3 px-4 min-w-[200px] text-center">
                                    {row.lastLogin !== "-"
                                        ? format(new Date(row.lastLogin), "dd-MMM-yy, hh:mm a")
                                        : "-"}
                                </TableCell>
                                {/* 2FA Status */}
                                <TableCell className="py-3 px-4 min-w-[120px] text-center">
                                    {row.fa}
                                </TableCell>
                                {/* Actions */}
                                <TableCell className="py-3 px-4 min-w-[150px] text-center">
                                    <div className="flex justify-center gap-2">
                                        <EditTeammateDialog id={row.action} />
                                        <RemoveTeammateDialog id={row.id} name={row.name} />
                                        <TeammatesLogs id={row.action} name={row.name} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="bg-[#f3f3f3]"
            />
        </Paper>
    );
};

export default TeammatesTable;
