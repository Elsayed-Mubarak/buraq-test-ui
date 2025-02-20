import React, { useState, useCallback, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    TableSortLabel,
} from "@mui/material";
import CustomTablePagination from "./CustomTablePagination";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import Link from "next/link";

type Props = {
    data: any;
    columns: any;
    onEdit: any;
    onDelete: any;
    onPreview?: any;
    selected?: any;
    setSelected?: any;
    selectable?: boolean;
}
export default function ReusableTableMui({
    data,
    columns,
    onEdit,
    onDelete,
    onPreview,
    selected,
    setSelected,
    selectable = true,
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

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => row._id));
        } else {
            setSelected([]);
        }
    };

    const handleSelectClick = (id: any) => {
        setSelected((prev: any) =>
            prev.includes(id) ? prev.filter((selectedId: any) => selectedId !== id) : [...prev, id]
        );
    };

    const sortedData = useCallback(() => {
        if (!orderBy) return data;
        return [...data].sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
            if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, order, orderBy]);

    return (
        <div style={{ maxWidth: "100%", overflow: "hidden" }}>
            <TableContainer
                component={Paper}
                style={{
                    border: "1px solid #e4e4e4",
                    borderRadius: "10px",
                    maxHeight: "calc(100vh - 270px)",
                    minHeight: "calc(100vh - 270px)",
                    overflowY: "auto",

                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow >
                            {selectable && (
                                <TableCell padding="checkbox"
                                    style={{
                                        backgroundColor: "#f3f3f3",
                                        padding: "12px 4px",
                                    }}>
                                    <Checkbox
                                        size="small"
                                        checked={data.length > 0 ? selected.length === data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length : false}
                                        onChange={handleSelectAllClick}
                                    />
                                </TableCell>
                            )}
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
                            {(onEdit || onDelete || onPreview) && <TableCell align="center" style={{
                                color: "#092445",
                                fontSize: "14px",
                                padding: "4px 16px",
                                backgroundColor: "#f3f3f3",
                                fontFamily: "Nunito, sans-serif",
                            }} />}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData()
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any) => (
                                <TableRow key={String(row._id)} hover>
                                    {selectable && (
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                size="small"
                                                checked={selected.includes(row._id)}
                                                onChange={() => handleSelectClick(row._id)}
                                            />
                                        </TableCell>
                                    )}
                                    {columns.map((column: any) => (
                                        <TableCell key={String(column.key)} style={{
                                            color: "#092445",
                                            fontSize: "14px",
                                            padding: "4px 16px",
                                            fontFamily: "Nunito, sans-serif",
                                        }}>
                                            {column.render ? column.render(row) : row[column.key]}
                                        </TableCell>
                                    ))}
                                    {(onEdit || onDelete || onPreview) && (
                                        <TableCell align="center">
                                            <div className="flex items-center gap-5 font-nunito">
                                                {onPreview && (
                                                    <button
                                                        className="text-primary-500"
                                                        onClick={() => onPreview(row)}
                                                    >
                                                        <LaunchRoundedIcon fontSize="small" />
                                                    </button>
                                                )}
                                                {onEdit && (
                                                    <button
                                                        className="text-primary-500 hover:underline"
                                                        onClick={() => onEdit(row)}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        className="text-primary-500 hover:underline"
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
