"use client";

import CustomSelect from "@/components/workflow/nodeSettings/CustomSelect"
import { Input } from "@/components/ui/input"
import useFlowStore from "../../reactflowstate/store";
import { DynamicData_Whatsapp_Header, IDynamicDataWhatsappContent } from "@/types/workflows/nodes/dynamic-data/in-bound/whatsapp";
import useDynamicDataWhatsappStore from "@/stores/nodes/dynamic-data/inbound-whatsapp.store";
import FileInput from "@/components/workflow/nodeSettings/FileInput";
import { ChangeEvent, useCallback, useRef } from "react";
import { Node } from "@xyflow/react";
import TextEditorVariable from "@/components/workflow/nodeSettings/variable-editor/TextEditorVariable";
import TextInputVariable from "@/components/workflow/nodeSettings/variable-editor/TextInputVariable";

const headerData = [
    { id: 'text', name: 'Text', value: 'text' },
    { id: 'file', name: 'File', value: 'file' },
]

function ReplyList() {
    const { onChangeReply, } = useDynamicDataWhatsappStore();

    const { selectedNode } = useFlowStore();

    const nodeContent = selectedNode?.data.nodeContent as IDynamicDataWhatsappContent;

    const lastValBody = useRef(nodeContent.responseContentAs.body || "");

    const handleChange = useCallback(
        (val: string) => {
            if (val !== lastValBody.current) {
                lastValBody.current = val;
                onChangeReply(selectedNode as Node, {
                    ...nodeContent,
                    responseContentAs: {
                        ...nodeContent.responseContentAs,
                        body: val as string
                    }
                }
                );
            }
        },
        [onChangeReply, selectedNode, nodeContent]
    );


    return (
        <div>
            <div>
                <CustomSelect
                    data={headerData}
                    onChange={(val) => onChangeReply(selectedNode as Node, {
                        ...nodeContent,
                        responseContentAs: {
                            ...nodeContent.responseContentAs,
                            header: {
                                ...nodeContent.responseContentAs.header,
                                type: val as DynamicData_Whatsapp_Header
                            }
                        }
                    })}
                    label="Header type (Optional)"
                    className="my-2"
                    triggerName={nodeContent.responseContentAs.header.type || "Text"}
                />
                {nodeContent.responseContentAs.header.type === DynamicData_Whatsapp_Header.TEXT
                    ? (
                        <TextEditorVariable
                            value={nodeContent.responseContentAs.header.value as string}
                            onChange={(val: string) => onChangeReply(selectedNode as Node, {
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
                    ) : (
                        <FileInput
                            rowId={`file_input`}
                            value={nodeContent.responseContentAs.header.file?.name as string}
                            handleChange={(e) => {
                                const files = Array.from(e.target.files || []);
                                onChangeReply(selectedNode as Node, {
                                    ...nodeContent,
                                }, files[0])
                            }}
                        />
                    )
                }
            </div>

            <div className="my-2">
                <h3 className="mb-1 text-sm font-light text-nodeSettings">Body</h3>
                <TextEditorVariable
                    key={"body"}
                    showToolbar
                    value={nodeContent.responseContentAs.body}
                    onChange={(val: string) => onChangeReply(selectedNode as Node, {
                        ...nodeContent,
                        responseContentAs: {
                            ...nodeContent.responseContentAs,
                            body: val as string
                        }
                    })}
                    message="1024 characters limit"
                />
            </div>

            <h3 className="text-base font-light text-nodeSettings my-1">Footer message (Optional)</h3>
            <TextEditorVariable
                key={"footer"}
                message="When the visitors types a message which does not match the button text."
                value={nodeContent.responseContentAs.footer as string}
                onChange={(val: string) => onChangeReply(selectedNode as Node, {
                    ...nodeContent,
                    responseContentAs: {
                        ...nodeContent.responseContentAs,
                        footer: val
                    }
                })}
            />

            <h3 className="text-base font-light text-nodeSettings my-1">Error message</h3>
            <TextEditorVariable
                key={"error"}
                value={nodeContent.responseContentAs.error as string}
                message="When the visitors types a message which does not match the button text."
                onChange={(val: string) => onChangeReply(selectedNode as Node, {
                    ...nodeContent,
                    responseContentAs: {
                        ...nodeContent.responseContentAs,
                        error: val
                    }
                })}
            />

            <div className="my-2">
                <h3 className="text-sm text-nodeSettings font-light mb-1">
                    Button title
                </h3>
                <Input
                    value={nodeContent.responseContentAs.buttonName as string}
                    onChange={(e) => onChangeReply(selectedNode as Node, {
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
                <h3 className="text-sm text-nodeSettings font-light mb-1">
                    Button Payload
                </h3>
                <TextInputVariable
                    value={nodeContent.responseContentAs.buttonPayload as string}
                    onChange={(val) => onChangeReply(selectedNode as Node, {
                        ...nodeContent,
                        responseContentAs: {
                            ...nodeContent.responseContentAs,
                            buttonPayload: val
                        }
                    })}
                    className="h-[34px] ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent border-gray-300 hover:border-indigo-500"
                />
            </div>
        </div>
    )
}

export default ReplyList