"use client";

import useRolesStore from "@/stores/settings/useRoles.store";
import useTeammatesStore from "@/stores/settings/useTeamates.store";
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Props {
    view?: string;
}

function TeammateSearch({ view }: Props) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const { getTeammates } = useTeammatesStore();
    const { getRolesWithTeammate } = useRolesStore();

    useEffect(() => {
        if (view) {
            view === "teammates" ? getTeammates() : getRolesWithTeammate();;
        }
    }, [getTeammates, view, getRolesWithTeammate])

    const handleSearch = async (term: string) => {
        const params = new URLSearchParams(searchParams);

        term ? params.set("name", term) : params.delete("name");
        replace(`${pathname}?${params.toString()}`);

        try {
            if (view === "teammates") {
                if (term) {
                    await getTeammates(term);
                } else {
                    await getTeammates();
                }
            } else {
                if (term) {
                    await getRolesWithTeammate(term);
                } else {
                    await getRolesWithTeammate();
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex-1 relative max-w-[400px]">
            <input
                placeholder="Search..."
                className="peer block w-full text-sm py-2 h-full pl-8 border border-primary-50 rounded-lg outline-0 
                hover:border-primary-600 focus:border-primary-600 transition-all duration-100 focus:shadow-[#343de6_0_0_4px]"
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("name")?.toString()}
            />
            <span className="text-[#808080] peer-focus:text-primary-600">
                <Search className="w-4 h-4 absolute top-[50%] left-2  translate-y-[-50%]" />
            </span>
        </div>
    )
}

export default TeammateSearch