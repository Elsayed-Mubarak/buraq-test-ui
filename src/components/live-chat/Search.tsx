"use client";
import { ListFilter, Search as SearchIcon } from "lucide-react";
import ToolTip from "../shared/ToolTip";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


type Props = {
  setOpenFilter: any;
  openFilter: any;
};
export default function Search({ setOpenFilter, openFilter }: Props) {
  // const searchParams = useSearchParams();
  // const router = useRouter();
  const [conversationSearchQuery, setConversationSearchQuery] = useState('');
  function handleClick() {
    setOpenFilter(!openFilter);
  }

  // function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
  //   if (event.key === "Enter") {
  //     const params = new URLSearchParams(searchParams.toString());

  //     if (conversationSearchQuery.trim()) {
  //       params.set("search", conversationSearchQuery.trim());
  //     } else {
  //       params.delete("search"); // Remove param if empty
  //     }
  //     params.set("page", "1");
  //     params.set("limit", "25");
  //     router.push(`?${params.toString()}`, { scroll: false });
  //   }
  // }

  return (
    <div className="p-2 h-[60px] border-b border-primary-50 flex items-center gap-2">
      <div className="flex-1 relative h-full">
        <input
          value={conversationSearchQuery}
          onChange={(e) => setConversationSearchQuery(e.target.value)}
          // onKeyDown={handleSearch}
          placeholder="Search..."
          className="peer block w-full text-sm  h-full pl-8 border border-primary-50 rounded-lg outline-0 hover:border-primary-600 focus:border-primary-600 transition-all duration-100 focus:shadow-[#343de6_0_0_4px]"
          type="text"
        />
        <span className="text-[#808080] peer-focus:text-primary-600">
          <SearchIcon className="  w-5 h-5 absolute top-[50%] left-2  translate-y-[-50%]" />
        </span>
      </div>
      <span onClick={handleClick} className="cursor-pointer select-none">
        <ToolTip title="Filter conversations" >
          <ListFilter className="h-5 w-5 text-[#808080]" />
        </ToolTip>
      </span>
    </div>
  );
}
