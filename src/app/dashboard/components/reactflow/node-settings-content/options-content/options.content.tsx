"use client";

import NodeSettingsHeader from "../../node-settings-bar/node-settings-header"
import { svgs } from "../../shared/SVG"
import { useEffect } from "react";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { MdLock } from "react-icons/md";
import ActionButton from "@/components/workflow/nodeSettings/ActionButton";
import VariablesDropdown from "@/components/workflow/nodeSettings/VariablesDropdown";
import { useVariablesStore } from "@/stores/settings/useVariables.store";
import useFlowStore from "../../reactflowstate/store";
import { IOptionsNodeContent } from "@/types/workflows/nodes/options/inbound/options-whatsapp";
import useOptionsWhatsappInbound from "@/stores/nodes/options/inbound-whatsapp.store";
import TextEditorVariable from "@/components/workflow/nodeSettings/variable-editor/TextEditorVariable";

function OptionsSettingsContent() {
    const { selectedNode } = useFlowStore();
    const { getActiveVariables, activeVariables } = useVariablesStore();
    const {
        addItem,
        deleteItem,
        onChangeData,
        changeName
    } = useOptionsWhatsappInbound();


    useEffect(() => {
        getActiveVariables();
    }, [getActiveVariables])


    if (!selectedNode) return null;
    const nodeContent = selectedNode.data.nodeContent as IOptionsNodeContent;

    return (
        <>
            <NodeSettingsHeader
                icon={svgs.options}
                text={nodeContent.name || selectedNode.data.nodeName as string}
                onChange={(e) => changeName(selectedNode, e.target.value)}
            />
            <h3 className="text-sm font-semibold text-gray-500 my-3">
                ptions allow the conversation flow to be branched into various paths based on user input
            </h3>

            <div className="my-4">
                <h4 className="text-sm text-[#092445] font-semibold mb-1">
                    Shows this question
                </h4>

                <TextEditorVariable
                    key={"body"}
                    value={nodeContent.body}
                    onChange={(val) => onChangeData(selectedNode, {
                        ...nodeContent,
                        body: val as string
                    })}
                    placeholder="Enter text header"
                    showToolbar
                    message="You can reference a variable by typing #"
                />
            </div>

            <div className="my-4 border-b-2 border-[#092445] pb-2">
                <h3 className="text-sm font-semibold text-gray-500 mb-1">List of options to be shown</h3>
                <div className="flex flex-col gap-2 w-full">
                    {nodeContent?.optionItems.length > 0 && nodeContent?.optionItems?.map((item, idx) => (
                        <div key={item.id} className="relative">
                            <div className="flex w-full h-[40px] items-center rounded-md">
                                <div
                                    className="h-full w-[60px] flex items-center justify-center text-sm font-semibold text-[#092445]"
                                >
                                    {idx + 1}
                                </div>
                                <Input
                                    type="text"
                                    className="border-none bg-gray-100 text-gray-500 font-semibold h-full w-full focus:border-none focus:ring-none focus:ring-transparent rounded-md rest-input"
                                    value={item.item}
                                    onChange={(e) => {
                                        const updatedOptionItems = nodeContent.optionItems.map(optionItem => {
                                            if (optionItem.id === item.id) {
                                                return { ...optionItem, item: e.target.value };
                                            }
                                            return optionItem;
                                        });

                                        onChangeData(selectedNode, {
                                            ...nodeContent,
                                            optionItems: updatedOptionItems,
                                        });
                                    }}
                                />
                            </div>
                            {nodeContent.optionItems.length > 1 && (
                                <ActionButton
                                    action="delete"
                                    handleClick={() => deleteItem(selectedNode, item.id)}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <ActionButton
                handleClick={() => addItem(selectedNode)}
                action="add"
                text="Option"
            />

            <div className="my-6">
                <h4 className="text-sm text-[#092445] font-semibold mb-1">
                    Error message
                </h4>
                <TextEditorVariable
                    key={"error"}
                    value={nodeContent.error}
                    onChange={(val) => onChangeData(selectedNode, {
                        ...nodeContent,
                        error: val as string
                    })}
                    placeholder="Enter error message"
                />
            </div>

            <div className="">
                <div className="bg-white relative">
                    <VariablesDropdown
                        onChange={(e) => onChangeData(selectedNode, {
                            ...nodeContent,
                            savedResponse: e.target.value
                        })}
                        triggerName={nodeContent.savedResponse || "Select"}
                    />
                </div>
                <p className="text-xs text-gray-500 font-medium mt-2">
                    You can select a variable that can be referenced later in the conversation.
                </p>
            </div>

            <div className="my-4">
                <Label className="tex-sm font-semibold text-[#092445]">
                    Hot Keywords
                </Label>
                <Input
                    type="text"
                    className="py-4 hover:border-indigo-500 ring-0 ring-transparent border-black/40 rest-input"
                    onChange={(e) => onChangeData(selectedNode, {
                        ...nodeContent,
                        hotKeywords: e.target.value
                    })}
                    value={nodeContent.hotKeywords}
                />
                <p className="text-xs text-gray-500 font-semibold">
                    You can define hot keywords which can be invoked at any point of time which direct the flow back to this block
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <div >
                    <div className="mt-2 flex items-center">
                        <input
                            type="checkbox"
                            name="filters"
                            id="filters"
                            className="rounded"
                        />
                        <label
                            htmlFor="filters"
                            className="text-sm mx-2 flex items-center gap-2"
                        >
                            <span className="font-bold text-gray-500">Track links in this message</span>
                            <MdLock className="text-yellow-300 w-6 h-6" />
                        </label>
                    </div>
                    <p className="text-xs font-normal text-gray-500 mt-1">
                        Upgrade your plan to access this feature
                    </p>
                </div>
            </div>

        </>
    )
}

export default OptionsSettingsContent