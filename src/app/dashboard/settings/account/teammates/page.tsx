"use client";

import AddTeammateDialog from "@/components/settings/teammates/AddTeammateDialog"
import { useState } from "react"
import TeammatesTable from "@/components/settings/teammates/TeammatesTable";
import { Box, Tab, Tabs } from "@mui/material";
import TeammateSearch from "@/components/settings/teammates/TeammateSearch";
import RolesTable from "@/components/settings/roles/RolesTable";
import CreateRoleDialog from "@/components/settings/roles/CreateRoleDialog";

export default function TeammatesSettingsPage() {
    const [view, setView] = useState<'teammates' | 'roles'>('teammates');

    return (
        <div className="py-4 px-12">
            <h3 className="text-2xl text-secondary-50 pb-6 capitalize">{view}</h3>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: 'fit-content', mb: 1 }}>
                <Tabs
                    value={view}
                    onChange={(_, value) => setView(value)}
                    aria-label="basic tabs example"
                >
                    <Tab label="Teammates" value="teammates" />
                    <Tab label="Roles" value="roles" />
                </Tabs>
            </Box>

            <div className="flex items-center justify-end gap-2">
                <TeammateSearch view={view} />
                {view === "teammates" ? <AddTeammateDialog /> : <CreateRoleDialog />}
            </div>


            <div className="mt-4">
                {view === 'teammates'
                    ? <TeammatesTable />
                    : <RolesTable />
                }
            </div>
        </div>
    )
}