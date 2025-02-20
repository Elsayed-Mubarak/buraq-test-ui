"use client";
import useHumanStore from "@/stores/nodes/useHuman.store"; import { FaArrowLeftLong } from "react-icons/fa6";
import { LiaAngleRightSolid } from "react-icons/lia";
import { RiCloseLargeLine } from "react-icons/ri";
import useFlowStore from "../../reactflowstate/store";
import { HumanNodeContent } from "@/types/workflows/nodes/human.content";
import { useCallback, useEffect, useRef } from "react";
import { Node } from "@xyflow/react";
import { useVariablesStore } from "@/stores/settings/useVariables.store";
import VariableEditor from "@/components/VariableEditor";
import TextEditorVariable from "@/components/workflow/nodeSettings/variable-editor/TextEditorVariable";

export function AdvancedSettingsCard() {
    const { toggleShowSettings, showSettings } = useHumanStore();

    return (
        <div
            onClick={() => toggleShowSettings(!showSettings)}
            className="mb-2 flex cursor-pointer items-center justify-between rounded-md bg-gray-100 p-3 text-nodeSettings text-sm"
        >
            Addvanced Settings
            <LiaAngleRightSolid />
        </div>
    )
}

export function AdvancedSettingsContent() {
    const { toggleShowSettings, showSettings, onChangeSettings } = useHumanStore();
    const { closePopup, selectedNode } = useFlowStore();

    const nodeContent = selectedNode?.data.nodeContent as HumanNodeContent;


    if (!selectedNode) return null;

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-50">
            <div className="mb-6 flex justify-between">
                <button
                    className="flex items-center justify-center gap-4"
                    onClick={() => toggleShowSettings(!showSettings)}
                >
                    <FaArrowLeftLong />
                    <span className="font-semibold">Talk to human</span>
                </button>

                <button onClick={closePopup}>
                    <RiCloseLargeLine className="w-4 h-4" />
                </button>
            </div>

            <h3 className="node-settings-desc mb-4">
                Following messages are sent to the visitor when a success/failure scenario occurs during human handover.
            </h3>

            <div className="mb-4">
                <p className="text-sm font-medium text-nodeSettings">
                    Handover is successful
                </p>
                <TextEditorVariable
                    key={"handoverSuccessMsg"}
                    value={nodeContent.advancedSettings.handoverSuccessMsg || ""}
                    onChange={(val: string) => onChangeSettings(selectedNode as Node, { handoverSuccessMsg: val })}
                />
            </div>
            <div className="mb-4">
                <p className="text-sm font-medium text-nodeSettings">
                    Handover is disabled
                </p>
                <TextEditorVariable
                    key={"handoverDisabledMsg"}
                    value={nodeContent.advancedSettings.handoverErrorMsg || ""}
                    onChange={(val: string) => onChangeSettings(selectedNode as Node, { handoverErrorMsg: val })}
                />
            </div>
            <div className="mb-4">
                <p className="text-sm font-medium text-nodeSettings">
                    No agent is available
                </p>
                <TextEditorVariable
                    key={"noAgentMsg"}
                    value={nodeContent.advancedSettings.noAgentMsg || ""}
                    onChange={(val: string) => onChangeSettings(selectedNode as Node, { noAgentMsg: val })}
                />
            </div>
            <div className="mb-4">
                <p className="text-sm font-medium text-nodeSettings">
                    Beyond operational hours
                </p>
                <TextEditorVariable
                    key={"beyondOperationHoursMsg"}
                    value={nodeContent.advancedSettings.beyondOperationHoursMsg || ""}
                    onChange={(val: string) => onChangeSettings(selectedNode as Node, { beyondOperationHoursMsg: val })}
                />
            </div>
        </div>
    )
}