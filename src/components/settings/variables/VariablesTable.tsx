"use client";


import { useMemo } from "react";
import ReusableTable from "../ReusableTable";
import { variablesColumns } from "./tableColumns";


function VariablesTable({ data, view }: { data: any, view: "active" | "archived" }) {
    const rowsWithIds = useMemo(() => {
        const safeData = Array.isArray(data) ? data : [];
        return safeData.map((item: any, index: number) => ({
            id: item._id || index,
            variableId: item._id,
            variableName: item.variableName,
            createdAt: item.createdAt,
            createdBy: item.createdBy,
            format: item.format,
            type: item.type,
            status: view,
        }));
    }, [data, view]);


    return (
        <div>
            <ReusableTable
                columns={variablesColumns}
                rows={rowsWithIds}
            />
        </div>
    )
}

export default VariablesTable