"use client";

import useWhatsappFlowStore from "@/stores/nodes/whatsapp-flow/inbound-whatsapp.store";
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header"
import { svgs } from "../../shared/SVG"
import { Label } from "@/components/ui/label"
import VariableEditor from "@/components/VariableEditor"
import CustomSelect from "@/components/workflow/nodeSettings/CustomSelect";
import TextBlock from "@/components/workflow/nodeSettings/TextBlock";
import { Input } from "@/components/ui/input";
import ActionButton from "@/components/workflow/nodeSettings/ActionButton";
import VariablesDropdown from "@/components/workflow/nodeSettings/VariablesDropdown";
import useFlowStore from "../../reactflowstate/store";
import { IWhatsappflowNodeContent } from "@/types/workflows/nodes/whatsappflow/inbound-whatsappflow";
import MyEditor from "@/components/workflow/nodeSettings/variable-editor/TextEditorVariable";

const headerTypes = [
    { id: 1, value: "text", name: "Text" },
    { id: 2, value: "media", name: "Media" },
    { id: 3, value: "dynamic-media", name: "Dynamic Media" },
];

function WhatsappFlowContent() {
    const {
        header,
        footer,
        toggleFooter,
        toggleHeader,
        addData,
        changeName,
        deleteItem,
        onChangeData,
        addResponse,
        deleteResponse
    } = useWhatsappFlowStore();


    const { selectedNode } = useFlowStore();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as IWhatsappflowNodeContent;

    return (
        <div>
            <NodeSettingsHeader
                text="Whatsapp flow"
                icon={svgs.whatsapp_flow}
                onChange={(e) => changeName(selectedNode, e.target.value)}
            />

            <p className="text-sm text-[#f6c100] my-3">Supported in 360dialog cloud and Meta.</p>

            <div className="flex items-center gap-3 my-3">
                <input
                    type="checkbox"
                    id="header"
                    checked={header}
                    className="!checked:bg-blue-500 w-4 h-4 cursor-pointer"
                    onChange={() => toggleHeader(!header)}
                />
                <Label htmlFor="header" className="text-nodeSettings !text-base cursor-pointer font-light">Add header content</Label>
            </div>

            {header && (
                <div className="my-3">
                    <CustomSelect
                        data={headerTypes}
                        onChange={(val) => onChangeData(selectedNode, {
                            ...nodeContent,
                            header: {
                                ...nodeContent.header,
                                type: val
                            }
                        })}
                        triggerName={nodeContent?.header?.type || "Text"}
                    />

                    <div className="my-2">
                        {nodeContent?.header && nodeContent?.header.type === "text" && (
                            // <TextBlock
                            //     onChange={(e) => onChangeData(selectedNode, {
                            //         ...nodeContent,
                            //         header: {
                            //             ...nodeContent.header,
                            //             value: e.target.value,
                            //         }
                            //     })}
                            //     value={nodeContent?.header?.value as string || ""}
                            // />

                            <MyEditor
                                showToolbar
                                onChange={(val) => onChangeData(selectedNode, {
                                    ...nodeContent,
                                    header: {
                                        ...nodeContent.header,
                                        value: val
                                    }
                                })}
                                value={nodeContent?.header?.value || ""}
                            />
                        )}
                    </div>
                </div>
            )}

            <div className="flex items-center gap-3 my-3">
                <input
                    type="checkbox"
                    id="footer"
                    checked={footer}
                    className="!checked:bg-blue-500 w-4 h-4 cursor-pointer"
                    onChange={() => toggleFooter(!footer)}
                />
                <Label htmlFor="footer" className="text-nodeSettings !text-base cursor-pointer font-light">Add footer content</Label>
            </div>

            {footer && (
                <div className="my-4">
                    <TextBlock
                        onChange={() => console.log('first')}
                        value={nodeContent?.footer as string || ""}
                    />
                </div>
            )}

            <div className="mb-16">
                <h4 className="text-nodeSettings font-light">Body</h4>
                <VariableEditor
                    onChange={() => console.log('first')}
                    value={nodeContent.body as string}
                />
            </div>

            <div className="my-4">
                <TextBlock
                    onChange={() => console.log('first')}
                    value={nodeContent.error as string}
                    footerMsg="When the visitors types a message which does not match the button text."
                />
            </div>

            <h4 className="text-nodeSettings font-light">Button Name</h4>
            <Input
                className="rest-input"
                onChange={(e) => onChangeData(selectedNode, {
                    ...nodeContent,
                    buttonName: e.target.value
                })}
                value={nodeContent.buttonName as string}
            />

            <div className="my-3">
                <CustomSelect
                    data={[]}
                    onChange={() => console.log('first')}
                    triggerName={nodeContent.flow as string || "Select"}
                    label="Flow"
                />
            </div>

            <div className="my-3">
                <CustomSelect
                    data={[]}
                    onChange={() => console.log('first')}
                    triggerName={nodeContent.startingScreen as string || "Select"}
                    label="Starting screen"
                />
            </div>

            <div className="my-4 w-[97%]">
                <h3 className="font-light text-nodeSettings">Data</h3>
                {nodeContent.data.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 mt-2 relative">
                        <div className="w-1/2">
                            <CustomSelect
                                data={[]}
                                onChange={() => console.log('first')}
                                triggerName={item.variable}
                            />
                        </div>
                        <div className="w-1/2">
                            <Input
                                className="rest-input"
                                placeholder="Value/Variable"
                                onChange={() => console.log('first')}
                                value={item.value}
                            />
                        </div>
                        {nodeContent.data.length > 1 && (
                            <ActionButton
                                action="delete"
                                handleClick={() => deleteItem(selectedNode, item.id)}
                            />
                        )}
                    </div>
                ))}
            </div>

            <ActionButton
                action="add"
                handleClick={() => addData(selectedNode)}
                text="Add data"
            />

            <div className="my-4 w-[97%]">
                <h4 className="text-nodeSettings">
                    Saves the response received from the WhatsApp flow to these variables.
                </h4>
                <div className="flex items-center gap-3 mb-1">
                    <h5 className="text-sm text-nodeSettings w-1/2">Object Path</h5>
                    <h5 className="text-sm text-nodeSettings w-1/2">Variables</h5>
                </div>
                {nodeContent.savedResponse.map((item) => (
                    <div key={item.id} className="flex gap-3 mt-2 relative">
                        <div className="w-1/2">
                            <Input
                                className="rest-input"
                                onChange={() => console.log('first')}
                                value={item.response}
                            />
                        </div>
                        <div className="w-1/2 relative bg-white">
                            <VariablesDropdown
                                onChange={() => console.log('first')}
                                triggerName={item.variable || "Select"}
                            />
                        </div>

                        {nodeContent.savedResponse.length > 1 && (
                            <ActionButton
                                action="delete"
                                handleClick={() => deleteResponse(selectedNode, item.id)}
                            />
                        )}
                    </div>
                ))}
            </div>

            <ActionButton
                action="add"
                handleClick={() => addResponse(selectedNode)}
                text="Add variable"
            />

        </div >
    )
}

export default WhatsappFlowContent