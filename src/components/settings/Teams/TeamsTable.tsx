"use client";

import ReusableTable from "../ReusableTable"
import { useMemo } from "react";
import { TeamsColumns } from "./TeamsColumn";


function TeamsTable({ data }: { data: any[] }) {

    const rowsWithIds = useMemo(() => {
        const safeData = Array.isArray(data) ? data : [];
        return safeData.map((item: any, index: number) => ({
            id: item._id || index,
            ...item,
        }));
    }, [data]);


    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <div>
            <ReusableTable
                columns={TeamsColumns}
                rows={rowsWithIds}
                paginationModel={paginationModel}
            />
        </div>
    )
}

export default TeamsTable