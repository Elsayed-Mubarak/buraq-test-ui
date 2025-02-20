"use client";

import NodeSettingsHeader from "../../node-settings-bar/node-settings-header";
import { svgs } from "../../shared/SVG";
import useFlowStore from "../../reactflowstate/store";
import { useState } from "react";
import AddSalesAccountForce from '../../../../../../components/workflow/AddSalesForceAccount';
import { ISalesforce } from "@/types/workflows/nodes/salesforce";
import useAddSalesForceStore from "@/stores/nodes/useAddSalesForce.store";

function SalesForce() {
    const { selectedNode } = useFlowStore();
    const [open, setOpen] = useState(false)

    const { changeName } = useAddSalesForceStore();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as ISalesforce;

    if (!selectedNode) return null;

    return (
        <>
            <NodeSettingsHeader
                icon={svgs.salesForce}
                text={nodeContent.name || selectedNode.data.nodeName as string}
                onChange={(e) => changeName(selectedNode, e.target.value)}
            />


            <div>
                <h5 className="mt-3 text-sm  text-nodeSettings mb-1">
                    Creates a lead in Salesforce with the variable fields mapped in this action block                </h5>

            </div>
            <div className="mt-5">
                <button
                    onClick={() => setOpen(!open)}
                    className=" bg-white text-black font-light py-1 px-7 rounded-lg border border-gray shadow-sm hover:bg-gray-50 transition duration-300 "
                >
                    Connect your Salesforce account
                </button>

            </div>
            <AddSalesAccountForce nodeContent={nodeContent} open={open} onClose={() => setOpen(false)} />

        </>
    )
}

export default SalesForce;