"use client";

import CreateTeamDialog from "@/components/settings/Teams/CreateTeamDialog";
import TeamsTable from "@/components/settings/Teams/TeamsTable";
import useTeamStore from "@/stores/settings/useTeams.store";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
    const { getData, data } = useTeamStore();
    const [searchQuery, setSearchQuery] = useState(""); // State for the search query
    const [filteredData, setFilteredData] = useState<any[]>([]);

    useEffect(() => {
        getData();
    }, [getData]);


    useEffect(() => {
        const teams = (data as unknown as { data: any[] })?.data || []; // Extract teams or use an empty array
        console.log("#####################", teams)
        if (searchQuery.trim() === "") {
            setFilteredData(teams);
        } else {
            const filtered = teams.filter((team) =>
                team.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [data, searchQuery]);

    return (
        <section className="py-4 px-12">
            <h1 className="text-2xl font-semibold text-secondary-50">Teams</h1>
            <div className="flex items-center justify-between pt-[40px]">
                <div className="flex-1 relative max-w-[400px]">
                    <input
                        placeholder="Search..."
                        className="peer block w-full text-sm py-2 h-full pl-8 border border-primary-50 rounded-lg outline-0 hover:border-primary-600 focus:border-primary-600 transition-all duration-100 focus:shadow-[#343de6_0_0_4px]"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="text-[#808080] peer-focus:text-primary-600">
                        <Search className="w-4 h-4 absolute top-[50%] left-2  translate-y-[-50%]" />
                    </span>
                </div>
                <CreateTeamDialog />
            </div>
            <div className="text-base text-secondary-50 my-2">
                {filteredData.length} Teams
            </div>
            <TeamsTable data={filteredData} />
        </section>
    );
}
