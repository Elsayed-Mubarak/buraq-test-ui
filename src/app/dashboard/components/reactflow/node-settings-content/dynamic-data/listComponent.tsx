"use client";

import { Input } from "@/components/ui/input"
import useDynamicDataWhatsappStore from "@/stores/nodes/dynamic-data/inbound-whatsapp.store";
import useFlowStore from "../../reactflowstate/store";
import { IDynamicDataWhatsappContent } from "@/types/workflows/nodes/dynamic-data/in-bound/whatsapp";
import { Node } from "@xyflow/react";
import TextEditorVariable from "@/components/workflow/nodeSettings/variable-editor/TextEditorVariable";
import TextInputVariable from "@/components/workflow/nodeSettings/variable-editor/TextInputVariable";

function ListComponent() {
    const {
        onChangeList,
    } = useDynamicDataWhatsappStore();
    const { selectedNode } = useFlowStore();


    const nodeContent = selectedNode?.data.nodeContent as IDynamicDataWhatsappContent;

    return (
        <div>
            <h3 className="text-sm text-nodeSettings my-1">Header message (Optional)</h3>
            <TextEditorVariable
                key={"header"}
                value={nodeContent.responseContentAs.header.value as string}
                onChange={(val: string) => onChangeList(selectedNode as Node, {
                    ...nodeContent,
                    responseContentAs: {
                        ...nodeContent.responseContentAs,
                        header: {
                            ...nodeContent.responseContentAs.header,
                            value: val
                        }
                    }
                })}
                message="60 characters limit"
            />

            <div className="my-4">
                <h3 className="mb-1 text-sm text-nodeSettings">Body</h3>
                <TextEditorVariable
                    key={"body"}
                    value={nodeContent.responseContentAs.body as string}
                    onChange={(val: string) => onChangeList(selectedNode as Node, {
                        ...nodeContent,
                        responseContentAs: {
                            ...nodeContent.responseContentAs,
                            body: val
                        }
                    })}
                    message="1024 characters limit"
                    className="h-[120px]"
                    showToolbar
                />
            </div>

            <div className="my-4">
                <h3 className="text-ms text-nodeSettings my-1">Footer message (Optional)</h3>
                <TextEditorVariable
                    value={nodeContent.responseContentAs.footer as string}
                    onChange={(val: string) => onChangeList(selectedNode as Node, {
                        ...nodeContent,
                        responseContentAs: {
                            ...nodeContent.responseContentAs,
                            footer: val
                        }
                    })}
                    message="When the visitors types a message which does not match the button text."
                />
            </div>


            <div className="my-4">
                <h3 className="text-xs text-nodeSettings my-1">Error message</h3>
                <TextEditorVariable
                    value={nodeContent.responseContentAs.error as string}
                    onChange={(val: string) => onChangeList(selectedNode as Node, {
                        ...nodeContent,
                        responseContentAs: {
                            ...nodeContent.responseContentAs,
                            error: val
                        }
                    })}
                    message="When the visitors types a message which does not match the button text."
                />
            </div>

            <div className="my-2">
                <h3 className="text-sm text-nodeSettings mb-1">
                    Button name
                </h3>
                <Input
                    value={nodeContent.responseContentAs.buttonName as string}
                    onChange={(e) => onChangeList(selectedNode as Node, {
                        ...nodeContent,
                        responseContentAs: {
                            ...nodeContent.responseContentAs,
                            buttonName: e.target.value
                        }
                    })}
                    className="h-[34px] ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent border-gray-300 hover:border-indigo-500"
                />
            </div>

            <div className="my-2">
                <h3 className="text-sm text-nodeSettings mb-1">
                    Button Payload
                </h3>
                <TextInputVariable
                    value={nodeContent.responseContentAs.buttonPayload as string}
                    onChange={(val) => onChangeList(selectedNode as Node, {
                        ...nodeContent,
                        responseContentAs: {
                            ...nodeContent.responseContentAs,
                            buttonPayload: val
                        }
                    })}
                    className="h-[34px] ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent border-gray-300 hover:border-indigo-500"
                />
            </div>

            <div className="flex flex-col gap-y-2">
                <h3 className="text-sm text-nodeSettings mb-1">
                    item category (Optional)
                </h3>
                <input
                    value={nodeContent.responseContentAs?.item?.category as string}
                    onChange={(e) => onChangeList(selectedNode as Node, {
                        ...nodeContent,
                        responseContentAs: {
                            ...nodeContent.responseContentAs,
                            item: {
                                ...nodeContent.responseContentAs.item,
                                category: e.target.value
                            }
                        }
                    })}
                    className="h-[34px] ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent border-gray-300 hover:border-indigo-500 border rounded-md"
                />
                <div className="my-2">
                    <h3 className="text-sm text-nodeSettings mb-1">
                        item name
                    </h3>
                    <Input
                        value={nodeContent.responseContentAs.item.name as string}
                        onChange={(e) => onChangeList(selectedNode as Node, {
                            ...nodeContent,
                            responseContentAs: {
                                ...nodeContent.responseContentAs,
                                item: {
                                    ...nodeContent.responseContentAs.item,
                                    name: e.target.value
                                }
                            }
                        })}
                        className="h-[34px] ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent border-gray-300 hover:border-indigo-500"
                    />
                </div>
                <div className="my-2">
                    <h3 className="text-sm text-nodeSettings mb-1">
                        item description (Optional)
                    </h3>
                    <Input
                        value={nodeContent.responseContentAs.item.description as string}
                        onChange={(e) => onChangeList(selectedNode as Node, {
                            ...nodeContent,
                            responseContentAs: {
                                ...nodeContent.responseContentAs,
                                item: {
                                    ...nodeContent.responseContentAs.item,
                                    description: e.target.value
                                }
                            }
                        })}
                        className="h-[34px] ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent border-gray-300 hover:border-indigo-500"
                    />
                </div>
            </div>


        </div>
    )
}

export default ListComponent