import { useEffect, useMemo, useState } from "react";


function useDataTable(data: any) {
    const [tableData, setTableData] = useState<any[]>([]);

    const rowsWithIds = useMemo(() => {
        const safeData = Array.isArray(data) ? data : [];
        return safeData.map((item: any, index: number) => ({
            id: item._id || index,
            ...item,
        }));
    }, [data]);

    useEffect(() => {
        setTableData(rowsWithIds)
    }, [data, rowsWithIds])

    return tableData;
}

export default useDataTable