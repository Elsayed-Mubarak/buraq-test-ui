"use client";
import TemplateOperations from "@/components/channel/whatsApp/templateMessages/TemplateOperations";
import WhatsappTemplateTable from "@/components/channel/whatsApp/templateMessages/WhatsappTemplateTable";
import SpinnerFull from "@/components/shared/SpinnerFull";
import { getAllTemplates } from "@/service/templateServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useEffect, useState } from "react";


function transformData(inputArray: any) {
  const transformedData = inputArray.map((item: any) => ({
    _id: item._id,
    name: item.name,
    createdBy: "Ali Mohamed", // do later when backend add this field
    category: item.category.toLowerCase(),
    createdOn: new Date(item.createdAt).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }),
    status: item.status ? item.status.toLowerCase() : "",
    rawTemplateData: item.rawTemplateData
  }));
  return transformedData;
}

// const data = [
//   {
//     _id: "1",
//     name: "dental",
//     createdBy: "Ali Mohamed",
//     category: "Marketing",
//     createdOn: "14-Nov-24, 12:31 AM",
//     status: "approved"
//   },
//   {
//     _id: "2",
//     name: "cartnew",
//     createdBy: "Ali Mohamed",
//     category: "Marketing",
//     createdOn: "14-Nov-24, 12:31 AM",
//     status: "inactive"
//   },
//   {
//     _id: "3",
//     name: "ecommerce",
//     createdBy: "Ali Mohamed",
//     category: "Marketing",
//     createdOn: "14-Nov-24, 12:31 AM",
//     status: "rejected"
//   },
//   {
//     _id: "4",
//     name: "celebration",
//     createdBy: "Ali Mohamed",
//     category: "Marketing",
//     createdOn: "14-Nov-24, 12:31 AM",
//     status: "requested"
//   },
//   {
//     _id: "5",
//     name: "invitation",
//     createdBy: "Ali Mohamed",
//     category: "Marketing",
//     createdOn: "14-Nov-24, 12:31 AM",
//     status: "approved"
//   },
// ]


function WhatsappTemplatesPage() {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string[]>([]);

  const { data: allTemplates, isLoading, refetch } = useQuery({
    queryKey: ["allTemplates"],
    queryFn: getAllTemplates,
  })

  function syncTemplates() {
    queryClient.invalidateQueries({ queryKey: ["approved-templates"] })
    refetch()
  }

  const filteredData = allTemplates && transformData(allTemplates?.templates).filter((item: any) => {
    // Filter by filterStatus
    const statusMatch = filterStatus.length === 0 || filterStatus.includes(item.status);

    // Filter by searchQuery
    const queryMatch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())

    return statusMatch && queryMatch;
  });

  if (isLoading) return <SpinnerFull />
  return (
    <div className="py-4 px-14">
      <div className="mb-8">
        <div className="text-2xl text-secondary-50 font-semibold">Template Messages</div>
        <div className="text-sm text-[#808080] max-w-md">
          Define your template messages and request for them to be approved, so that you can start using them to run outbound campaigns to engage your contacts.
        </div>
      </div>
      <TemplateOperations
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onSyncTemplates={syncTemplates}
      />
      <div className="flex items-center gap-1 font-semibold mb-6 mt-1 text-sm text-secondary-50">
        <span className="font-barlow">{filteredData?.length}</span>
        <span>Templates</span>
      </div>
      <WhatsappTemplateTable
        data={filteredData}
        onSyncTemplates={syncTemplates}
      />
    </div>
  )
}


export default WhatsappTemplatesPage