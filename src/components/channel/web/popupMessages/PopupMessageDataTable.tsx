import React, { useState, useCallback, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import UsersIcon from "../../../../../public/icons/UsersIcon";
import Image from "next/image";
type Props = {
    data: any;
    columns: any;
    onEdit: any;
    onDelete: any;

}
export default function PopupMessageDataTable({
    data,
    columns,
    onEdit,
    onDelete
}: Props) {

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
                            {columns.map((column: any) => (
                                <TableCell
                                    key={String(column.key)}
                                    style={{
                                        color: "#092445",
                                        fontSize: "14px",
                                        padding: "12px 16px",
                                        backgroundColor: "#f3f3f3",
                                        fontFamily: "Nunito, sans-serif",
                                        width: "33%"
                                    }}
                                >

                                    {column.label}

                                </TableCell>
                            ))}
                            {(onEdit || onDelete) && <TableCell align="center" style={{
                                color: "#092445",
                                fontSize: "14px",
                                padding: "4px 16px",
                                backgroundColor: "#f3f3f3",
                                fontFamily: "Nunito, sans-serif",
                            }} />}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!data.length && (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
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
                        {data
                            .map((row: any) => (
                                <TableRow key={String(row._id)} hover>
                                    {columns.map((column: any) => (
                                        <TableCell key={String(column.key)} style={{
                                            color: "#092445",
                                            fontSize: "14px",
                                            padding: "4px 16px",
                                            fontFamily: "Nunito, sans-serif",
                                        }}>
                                            {column.key === "media" ? <div className="w-[30px] h-[30px] rounded-full relative">
                                                <Image fill src={row[column.key]} alt="image" className="rounded-full object-cover" />
                                            </div> : column.render ? column.render(row) : row[column.key]}

                                        </TableCell>
                                    ))}
                                    {(onEdit || onDelete) && (
                                        <TableCell align="right" >
                                            <div className="flex items-center justify-end gap-5 font-nunito pr-6">
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
        </div>
    );
}
