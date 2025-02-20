"use client";

import CreateVaraibleDialog from "@/components/settings/variables/CreateVariableDialog";
import VariablesTable from "@/components/settings/variables/VariablesTable";
import ReusableSearch from "@/components/shared/ReusableSearch";
import { useVariablesStore } from "@/stores/settings/useVariables.store";
import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";

export default function VariableSettingsPage() {
    const [view, setView] = useState<'active' | 'archived'>('active');

    const {
        archivedVariables,
        activeVariables,
    } = useVariablesStore();


    useEffect(() => {
        console.log(activeVariables)
    }, [activeVariables])

    return (
        <section className="py-4 px-12">
            <div className="mb-4">
                <h1 className="text-2xl font-semibold text-secondary-50">Variables</h1>
                <p className="text-sm text-gray-500">
                    Create and manage variables used in your chat workflows
                </p>
            </div>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: 'fit-content', mb: 1 }}>
                <Tabs value={view} onChange={(e, value) => setView(value)} aria-label="basic tabs example">
                    <Tab label="Active" value="active" />
                    <Tab label="Archived" value="archived" />
                </Tabs>
            </Box>

            <div className="flex items-center justify-between mt-4 w-full">
                <ReusableSearch view={view} />

                <CreateVaraibleDialog />
            </div>


            <div className="text-sm text-secondary-50 my-4">
                {view === "active" ? activeVariables.length : archivedVariables.length} Variables
            </div>
            <VariablesTable
                view={view}
                data={view === "active" ? activeVariables : archivedVariables}
            />
        </section>
    )
}