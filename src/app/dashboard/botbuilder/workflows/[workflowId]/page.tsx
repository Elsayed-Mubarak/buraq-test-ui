"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import ReactFlowComponent from "../../../components/reactflow/ReactFlowComponent";
// import WorkflowHeader from "@/app/dashboard/components/reactflow/header/WorkflowHeader";

export const dynamic = "force-dynamic";



function Page() {
  const { workflowId } = useParams();

  const base_url =
    process.env.NEXT_PUBLIC_BACKEND_APP_API_URL || "https://dev.white-lab.io";

  return (
        <ReactFlowComponent />
  );
}

export default Page;
