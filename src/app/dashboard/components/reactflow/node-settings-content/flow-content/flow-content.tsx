"use client";

import NodeSettingsHeader from "../../node-settings-bar/node-settings-header";
import axios from "axios";
import { svgs } from "../../shared/SVG";
import { useRouter } from "next/navigation";
import useFlowStore from "../../reactflowstate/store";
import { axiosInstance } from "@/lib/axios";


function FlowSettingsContent() {
    const router = useRouter();
    const { workflow, toggleFlowEnterd, selectedNode } = useFlowStore();
    const base_url = process.env.NEXT_PUBLIC_BACKEND_APP_API_URL || "https://dev.white-lab.io";


    const handleNewFlow = async () => {

        if (selectedNode)
            toggleFlowEnterd(selectedNode)

    };

    return (
        <>
            <NodeSettingsHeader icon={svgs.flow} text="Flow 1" />
            <h3 className="node-settings-desc my-6">
                Use this action block to break-down your conversational flows into smaller chunks.
            </h3>

            <div className="space-y-2">
                <h3 className="text-sm text-[#092445] font-semibold">
                    When to use flow?
                </h3>
                <ul className="list-disc text-[#092445] text-sm font-semibold ms-6 space-y-2">
                    <li>When the flow is large and becomes very difficult to manage</li>
                    <li>To separate out important paths into its own flows</li>
                    <li>Focus on specific path while designing the flow</li>
                    <li>Easier onboarding for your team</li>
                </ul>
            </div>
            <button
                className="bg-blue-700 px-5 py-2 rounded-lg text-white text-sm font-semibold mt-3"
                onClick={handleNewFlow}
            >
                Enter flow
            </button>
        </>
    )
}

export default FlowSettingsContent;