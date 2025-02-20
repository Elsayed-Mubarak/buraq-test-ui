import React, { useState, useCallback, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
} from "@mui/material";
import CustomTablePagination from "@/components/shared/CustomTablePagination";
import UsersIcon from "../../../../../public/icons/UsersIcon";
import { RefreshCw } from "lucide-react";

type Props = {
    data: any;
    columns: any;
    onSync: any;
    onDelete: any;
    onPreview: any;
}
export default function TemplateTableData({
    data,
    columns,
    onSync,
    onDelete,
    onPreview,

}: Props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [orderBy, setOrderBy] = useState<any>(null);

    const handleRequestSort = (property: any) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };


    const sortedData = useCallback(() => {
        if (!orderBy) return data;
        return [...data].sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
            if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, order, orderBy]);

    if (!data) return null
    return (
        <div style={{ maxWidth: "100%", overflow: "hidden" }}>
            <TableContainer
                component={Paper}
                style={{
                    border: "1px solid #e4e4e4",
                    borderRadius: "10px",
                    maxHeight: "calc(100vh - 320px)",
                    minHeight: "calc(100vh - 320px)",
                    overflowY: "auto",

                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow >
                            {columns.map((column: any) => (
                                <TableCell
                                    key={String(column.key)}
                                    sortDirection={orderBy === column.key ? order : false}
                                    style={{
                                        color: "#092445",
                                        fontSize: "14px",
                                        padding: "12px 16px",
                                        backgroundColor: "#f3f3f3",
                                        fontFamily: "Nunito, sans-serif",
                                    }}
                                >
                                    {column.sortable ? (
                                        <TableSortLabel
                                            active={orderBy === column.key}
                                            direction={orderBy === column.key ? order : "asc"}
                                            onClick={() => handleRequestSort(column.key)}
                                            style={{ color: "#092445" }}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                </TableCell>
                            ))}
                            {(onDelete || onPreview) && <TableCell align="center" style={{
                                color: "#092445",
                                fontSize: "14px",
                                padding: "4px 16px",
                                backgroundColor: "#f3f3f3",
                                fontFamily: "Nunito, sans-serif",
                            }} />}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!data?.length && (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (onDelete ? 1 : 0)}
                                    style={{
                                        height: "calc(100vh - 370px)",
                                        textAlign: "center",
                                        border: "none"
                                    }}
                                >
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="flex flex-col justify-center items-center gap-4">
                                            <UsersIcon />
                                            <span className="text-lg font-semibold text-[#808080]">
                                                No Data Found
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                        {sortedData()
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any) => (
                                <TableRow key={String(row._id)} hover>
                                    {columns.map((column: any) => (
                                        <TableCell key={String(column.key)} style={{
                                            color: "#092445",
                                            fontSize: "14px",
                                            padding: "4px 16px",
                                            fontFamily: "Nunito, sans-serif",
                                        }}>
                                            {column.key === "status" ? <div className="flex gap-2 items-center">
                                                <span className={`${row[column.key] === "approved" && "text-[#13be66] bg-[#13be6629]"} ${row[column.key] === "rejected" && "text-[#ff0000] bg-[#ff000029]"} capitalize rounded-[3px] p-1 text-[13px] `}>{row[column.key]}</span>
                                                <span onClick={() => onSync(row)} className="cursor-pointer">
                                                    <RefreshCw size={12} />
                                                </span>
                                            </div> : column.render ? column.render(row) : row[column.key]}
                                        </TableCell>
                                    ))}
                                    {(onDelete || onPreview) && (
                                        <TableCell align="center">
                                            <div className="flex items-center gap-5 font-nunito">
                                                {onPreview && (
                                                    <button
                                                        className="text-primary-500"
                                                        onClick={() => onPreview(row)}
                                                    >
                                                        Preview
                                                    </button>
                                                )}

                                                {onDelete && (
                                                    <button
                                                        className="text-primary-500"
                                                        onClick={() => onDelete(row)}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomTablePagination
                data={data}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        </div>
    );
}
