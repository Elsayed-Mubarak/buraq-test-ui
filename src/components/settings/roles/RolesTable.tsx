"use client";

import useRolesStore from "@/stores/settings/useRoles.store";
import ReusableTable from "../ReusableTable";
import { RolesColumns } from "./RolesColumns";
import { useEffect, useMemo } from "react";

const paginationModel = { page: 0, pageSize: 5 };

function RolesTable() {
    const {
        rolesWithTeammates,
        getRolesWithTeammate,
    } = useRolesStore();

    useEffect(() => {
        getRolesWithTeammate();
    }, [getRolesWithTeammate])


    useEffect(() => {
        console.log(rolesWithTeammates)
    }, [rolesWithTeammates])

    const rowsWithIds = useMemo(() => {
        const safeData = Array.isArray(rolesWithTeammates) ? rolesWithTeammates : [];
        return safeData.map((item: any, index: number) => ({
            id: item?._id || index,
            teammates: item?.teammates,
            name: `${item?.teammates?.firstName} ${item?.teammates?.lastName}` || "-",
            description: item?.roleDescription,
            role: item?.roleName,
            createdAt: item?.roleCreatedAt
        }));
    }, [rolesWithTeammates]);


    useEffect(() => {
        console.log(rowsWithIds)
    }, [rowsWithIds])


    return (
        <ReusableTable
            rows={rowsWithIds}
            columns={RolesColumns}
            paginationModel={paginationModel}
        />
    )
}

export default RolesTable