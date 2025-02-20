"use client";

import NodeSettingsHeader from "../../node-settings-bar/node-settings-header";
import { svgs } from "../../shared/SVG";
import CustomSelect from "@/components/workflow/nodeSettings/CustomSelect";
import ReplyList from "./replyList";
import useDynamicDataWhatsappStore from "@/stores/nodes/dynamic-data/inbound-whatsapp.store";
import { DynamicData_Whatsapp_RenderAsEnum, IDynamicDataWhatsappContent } from "@/types/workflows/nodes/dynamic-data/in-bound/whatsapp";
import OptionList from "./optionList";
import ListComponent from "./listComponent";
import useFlowStore from "../../reactflowstate/store";
import VariablesDropdown from "@/components/workflow/nodeSettings/VariablesDropdown";
import { useVariablesStore } from "@/stores/settings/useVariables.store";
import { useEffect } from "react";
import CheckboxView from "@/components/workflow/nodeSettings/CheckboxView";

const renderList = [
    { id: 'reply_btn', name: 'Reply button', value: 'reply-button' },
    { id: 'options', name: 'Options', value: 'options' },
    { id: 'list', name: 'List', value: 'list' },
]


export default function DynamicDataContentSettings() {
    const {
        onChangeRenderItem,
        onChangeSavedVariables,
        onChangeVariables,
        changeName,
        onChangeSavePayloadResponse
    } = useDynamicDataWhatsappStore();

    const { selectedNode, activeVariables } = useFlowStore();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as IDynamicDataWhatsappContent;

    return (
        <div className="relative">
            <NodeSettingsHeader
                icon={svgs.dynamic_data}
                text={nodeContent.name || selectedNode.data.nodeName as string}
                onChange={(e) => changeName(selectedNode, e.target.value)}
            />

            <h3 className="node-settings-desc my-3">
                Dynamically render buttons, carousels and more using the API response.
            </h3>

            <div className="border-b border-gray-400 pb-4">
                <div className="relative bg-white">
                    <VariablesDropdown
                        onChange={(e) => onChangeVariables(selectedNode, {
                            ...nodeContent,
                            dataVariable: e.target.value as string
                        })}
                        triggerName={nodeContent.dataVariable as string}
                    />
                </div>

                <CheckboxView
                    data={renderList}
                    triggerName={nodeContent.renderAs as string}
                    label="Render as"
                    onChange={(val) => onChangeRenderItem(selectedNode, {
                        renderAs: val as DynamicData_Whatsapp_RenderAsEnum
                    })}
                    className="my-2"
                />
            </div>

            <div>
                {nodeContent.renderAs === DynamicData_Whatsapp_RenderAsEnum.REPLYBUTTON && <ReplyList />}
                {nodeContent.renderAs === DynamicData_Whatsapp_RenderAsEnum.OPTIONS && <OptionList />}
                {nodeContent.renderAs === DynamicData_Whatsapp_RenderAsEnum.LIST && <ListComponent />}
            </div>


            <p className="mt-4 mb-1 text-sm text-nodeSettings">Save response</p>
            <div className="relative bg-white">
                <VariablesDropdown
                    onChange={(e) => onChangeSavedVariables(selectedNode, {
                        ...nodeContent,
                        savedResponseVariable: e.target.value as string
                    })}
                    triggerName={nodeContent.savedResponseVariable as string}
                />
            </div>

            {nodeContent.renderAs !== DynamicData_Whatsapp_RenderAsEnum.OPTIONS && (
                <>
                    <p className="mt-4 mb-1 text-sm text-nodeSettings">Save button payload response</p>
                    <div className="relative bg-white ">
                        <VariablesDropdown
                            onChange={(e) => onChangeSavePayloadResponse(selectedNode, {
                                ...nodeContent,
                                savePayloadResponse: e.target.value as string
                            })}
                            triggerName={nodeContent.savePayloadResponse as string}
                        />
                    </div>
                </>
            )}
        </div>
    )
}