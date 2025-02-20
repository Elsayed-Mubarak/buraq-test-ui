import React from "react";
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
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
import ToolTip from "./ToolTip";

interface Row {
    id: string;
    name: string;
    conversations: number;
    createdBy: string;
    createdOn: string;
}

interface Props {
    rows: Row[];
}

const ReusableTable: React.FC<Props> = ({ rows }) => {
    const [selected, setSelected] = React.useState<string[]>([]);
    const [order, setOrder] = React.useState<"asc" | "desc">("asc");
    const [orderBy, setOrderBy] = React.useState<keyof Row>("name");

    const handleEdit = (id: string) => {
        console.log(`Edit row with id: ${id}`);
    };

    const handleDelete = (id: string) => {
        console.log(`Delete row with id: ${id}`);
    };
    const handlePreview = (id: string) => {
        console.log(`Preview row with id: ${id}`);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    };

    const handleSelectClick = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, id];
        } else {
            newSelected = selected.filter((selectedId) => selectedId !== id);
        }

        setSelected(newSelected);
        console.log("Selected IDs: ", newSelected); // For debugging purposes
    };

    const handleRequestSort = (property: keyof Row) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const sortedRows = [...rows].sort((a, b) => {
        if (order === "asc") {
            return a[orderBy] > b[orderBy] ? 1 : -1;
        }
        return a[orderBy] < b[orderBy] ? 1 : -1;
    });

    return (
        <div
            className="font-nunito"
            style={{
                maxWidth: "100%",
                overflow: "hidden",
            }}
        >
            <TableContainer
                component={Paper}
                style={{
                    border: "1px solid #e4e4e4",
                    borderRadius: "10px",
                    maxHeight: "calc(100vh - 200px)",
                    overflowY: "auto",
                }}
            >
                <Table
                    stickyHeader
                    sx={{
                        fontFamily: "Nunito, sans-serif",
                    }} style={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#f3f3f3" }}>
                            <TableCell
                                padding="checkbox"
                                style={{
                                    color: "#092445",
                                    fontSize: "14px",
                                    padding: "4px 16px",
                                    backgroundColor: "#f3f3f3",
                                }}
                            >
                                <Checkbox
                                    size="small"
                                    checked={selected.length === rows.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === "name" ? order : false}
                                style={{
                                    color: "#092445",
                                    fontSize: "14px",
                                    padding: "4px 16px",
                                    backgroundColor: "#f3f3f3",
                                    fontFamily: "Nunito, sans-serif",
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === "name"}
                                    direction={orderBy === "name" ? order : "asc"}
                                    onClick={() => handleRequestSort("name")}
                                    style={{ color: "#092445" }}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === "conversations" ? order : false}
                                style={{
                                    color: "#092445",
                                    fontSize: "14px",
                                    padding: "4px 16px",
                                    backgroundColor: "#f3f3f3",
                                    fontFamily: "Nunito, sans-serif",
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === "conversations"}
                                    direction={orderBy === "conversations" ? order : "asc"}
                                    onClick={() => handleRequestSort("conversations")}
                                    style={{ color: "#092445" }}
                                >
                                    Conversations
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === "createdBy" ? order : false}
                                style={{
                                    color: "#092445",
                                    fontSize: "14px",
                                    padding: "4px 16px",
                                    backgroundColor: "#f3f3f3",
                                    fontFamily: "Nunito, sans-serif",
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === "createdBy"}
                                    direction={orderBy === "createdBy" ? order : "asc"}
                                    onClick={() => handleRequestSort("createdBy")}
                                    style={{ color: "#092445" }}
                                >
                                    Created By
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === "createdOn" ? order : false}
                                style={{
                                    color: "#092445",
                                    fontSize: "14px",
                                    padding: "4px 16px",
                                    backgroundColor: "#f3f3f3",
                                    fontFamily: "Nunito, sans-serif",
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === "createdOn"}
                                    direction={orderBy === "createdOn" ? order : "asc"}
                                    onClick={() => handleRequestSort("createdOn")}
                                    style={{ color: "#092445" }}
                                >
                                    Created On
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    color: "#092445",
                                    fontSize: "14px",
                                    padding: "4px 16px",
                                    backgroundColor: "#f3f3f3",
                                }}
                            >

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows.map((row) => (
                            <TableRow hover role="checkbox" key={row.id}>
                                <TableCell
                                    padding="checkbox"
                                    style={{
                                        color: "#092445",
                                        fontSize: "14px",
                                        padding: "4px 16px",
                                    }}
                                >
                                    <Checkbox
                                        size="small"
                                        checked={selected.includes(row.id)}
                                        onChange={(event) => handleSelectClick(event, row.id)}
                                    />
                                </TableCell>
                                <TableCell
                                    style={{
                                        color: "#092445",
                                        fontSize: "14px",
                                        padding: "4px 16px",
                                        fontFamily: "Nunito, sans-serif",
                                    }}
                                >
                                    <ToolTip title={row.name}>
                                        {row.name}
                                    </ToolTip>
                                </TableCell>
                                <TableCell
                                    style={{
                                        color: "#092445",
                                        fontSize: "14px",
                                        padding: "4px 16px",
                                        fontFamily: "Nunito, sans-serif",
                                    }}
                                >
                                    {row.conversations}
                                </TableCell>
                                <TableCell
                                    style={{
                                        color: "#092445",
                                        fontSize: "14px",
                                        padding: "4px 16px",
                                        fontFamily: "Nunito, sans-serif",
                                    }}
                                >
                                    {row.createdBy}
                                </TableCell>
                                <TableCell
                                    style={{
                                        color: "#092445",
                                        fontSize: "14px",
                                        padding: "4px 16px",
                                        fontFamily: "Nunito, sans-serif",
                                    }}
                                >
                                    <ToolTip title={row.createdOn}>
                                        {row.createdOn}
                                    </ToolTip>
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        color: "#092445",
                                        fontSize: "14px",
                                        padding: "4px 16px",
                                    }}
                                >
                                    <div className="flex items-center gap-3 font-nunito">
                                        <button className="text-primary-500 text-sm" onClick={() => handlePreview(row.id)}>
                                            <LaunchRoundedIcon fontSize="small" />
                                        </button>
                                        <button className="text-primary-500 text-sm hover:underline" onClick={() => handleDelete(row.id)}>Edit</button>
                                        <button className="text-primary-500 text-sm hover:underline" onClick={() => handleEdit(row.id)}>Remove</button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <CustomTablePagination /> */}
        </div>
    );
};

export default ReusableTable;
