"use client";
// import { Switch } from "../../components/ui/switch";
// import WorkflowEditor from "../../components/workflow/WorkflowEditor";
import WorkflowHeader from "../../components/reactflow/header/WorkflowHeader";
// import useWorkflow from "../../components/workflow/store/workflow";


import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FlowWithProvider from "../../components/reactflow/ReactFlowComponent";
import { axiosInstance } from "@/lib/axios";

export const dynamic = 'force-dynamic';

type Workflow = {
  // _id: Id<"workflows">;
  title: string;
  nodes: any[];
  connections: any[];
  active: boolean;
};

function Page() {
  const { workflowId } = useParams();

  const [workFlow, setWorkFlow] = useState<Workflow>()
  // const workflow = useQuery(api.workflows.getWorkflow, { 
  //   id: workflowId as Id<"workflows">, 
  // }) as unknown as Workflow | null;

  // const updateWorkflow = useWorkflow(state => state.updateWorkflow);


  // useEffect(() => {
  //   if (workflow) updateWorkflow({...workflow, id: workflow._id});
  // }, [workflow, updateWorkflow]);

  // if (!workflow) return null;



  const base_url = process.env.NEXT_PUBLIC_BACKEND_APP_API_URL


  const fetchOneWorkFlow = async () => {

    try {
      if (!workflowId) {
        console.error("workflowId is undefined");
        return;
      }

      const response = await axiosInstance.get(`${base_url}/bot/workflow/${workflowId}`);
      if (response.status === 200) {
        // updateWorkflow(response.data)
      }
    }
    catch (error) {
      console.error(error);
    }

  }


  useEffect(() => {
    fetchOneWorkFlow();  // Call the API to fetch the workflow data      
  }, [fetchOneWorkFlow])

  return (
    <div className="w-[100%]"  >
      {/* <WorkflowHeader /> */}
      <div className=" h-screen w-100">
        {/* <ReactFlowComponent/> */}
        <FlowWithProvider />
      </div>
    </div>
  );
}

export default Page;
