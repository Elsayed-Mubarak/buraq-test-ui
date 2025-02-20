"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import appMarketData from "../../../../data/appMarketData";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
type Props = {
  params: any;
};

export default function SingleApp({ params }: Props) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const app = appMarketData.find((item) => item.href === `/${params.appId}`);
  const columns: GridColDef[] = [
    { field: "account", headerName: "Account", width: 240 },
    { field: "addedBy", headerName: "Added by", width: 250 },
    {
      field: "AddedOn",
      headerName: "Added on",
      width: 240,
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 110,
    },
  ];

  const rows = [
    {
      id: 1,
      account: "mohammed@buraq.ai",
      addedBy: "Mohammad Agent",
      AddedOn: "17-Aug-24, 11:24 AM",
    },
    {
      id: 2,
      account: "mohammed@buraq.ai",
      addedBy: "Mohammad Agent",
      AddedOn: "17-Aug-24, 11:24 AM",
    },
    {
      id: 3,
      account: "mohammed@buraq.ai",
      addedBy: "Mohammad Agent",
      AddedOn: "17-Aug-24, 11:24 AM",
    },
    {
      id: 4,
      account: "mohammed@buraq.ai",
      addedBy: "Mohammad Agent",
      AddedOn: "17-Aug-24, 11:24 AM",
    },
    {
      id: 5,
      account: "mohammed@buraq.ai",
      addedBy: "Mohammad Agent",
      AddedOn: "17-Aug-24, 11:24 AM",
    },
    {
      id: 6,
      account: "mohammed@buraq.ai",
      addedBy: "Mohammad Agent",
      AddedOn: "17-Aug-24, 11:24 AM",
    },
    {
      id: 7,
      account: "mohammed@buraq.ai",
      addedBy: "Mohammad Agent",
      AddedOn: "17-Aug-24, 11:24 AM",
    },
    {
      id: 8,
      account: "mohammed@buraq.ai",
      addedBy: "Mohammad Agent",
      AddedOn: "17-Aug-24, 11:24 AM",
    },
    {
      id: 9,
      account: "mohammed@buraq.ai",
      addedBy: "Mohammad Agent",
      AddedOn: "17-Aug-24, 11:24 AM",
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <div
        onClick={handleBack}
        className="flex w-fit cursor-pointer items-center gap-3 py-8 text-sm font-semibold text-secondary-50"
      >
        <ArrowLeft />
        <div>Back</div>
      </div>
      <div className="mb-4 flex gap-8">
        <div>
          <Image
            src={app?.image || ""}
            alt={app?.title || ""}
            width={app?.href === "/zoho-crm" ? 100 : 50}
            height={50}
          />
        </div>
        <div>
          <div className="mb-[6px] font-semibold text-secondary-50">
            {app?.title}
          </div>
          <div className="mb-2 h-10 w-[500px] text-[13px] text-secondary-50">
            {app?.description}
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <div>Avalibale on:</div>
            <div className="w-fit rounded-full border border-[#f1b000] bg-[#f1b00029] px-[6px] py-[2px] font-semibold text-[#f1b000]">
              Pro
            </div>
            <div className="w-fit rounded-full border border-[#fc7c29] bg-[#fc7c2929] px-[6px] py-[2px] font-semibold text-[#fc7c29]">
              Growth
            </div>
            <div className="w-fit rounded-full border border-[#2a7cff] bg-[#2a7cff29] px-[6px] py-[2px] font-semibold text-[#2a7cff]">
              Leadership
            </div>
            <div className="w-fit rounded-full border border-[#f00] bg-[#ff000029] px-[6px] py-[2px] font-semibold text-[#f00]">
              Enterprise
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-5 flex items-center gap-2">
          <div>Accounts</div>
          <div>Logs</div>
        </div>
        <div className="m-auto w-[860px] text-secondary-50">
          <div className="mb-4 flex gap-1">
            <span>0</span>
            <span>Accounts</span>
          </div>
          <Paper sx={{ height: 320, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10, 50]}
              sx={{ border: 0 }}
            />
          </Paper>
        </div>
      </div>
    </>
  );
}
