"use client";

import NodeSettingsHeader from "../../node-settings-bar/node-settings-header";
import { svgs } from "../../shared/SVG";
import { MdLock } from "react-icons/md";
import FileInput from "../../../../../../components/workflow/nodeSettings/FileInput";
import useSendMessageStore from "@/stores/nodes/useSendMessage.store";
import useFlowStore from "../../reactflowstate/store";
import { ISendMessageNodeContent } from "@/types/workflows/nodes/message";
import ActionButton from "@/components/workflow/nodeSettings/ActionButton";
import TextEditorVariable from "@/components/workflow/nodeSettings/variable-editor/TextEditorVariable";


function SendMessageSettingsContent() {

    const {
        addFile,
        addMessage,
        onChangeData,
        deleteMessage,
        deleteFile,
        changeName,
        // onChangeFallbackData
    } = useSendMessageStore();
    const { selectedNode } = useFlowStore((state) => state);

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as ISendMessageNodeContent;

    return (
        <>
            <NodeSettingsHeader
                icon={svgs.message}
                text={nodeContent.name || selectedNode.data.nodeName as string}
                onChange={(e) => changeName(selectedNode, e.target.value)}
            />
            <div className="pt-4 pb-8 flex flex-col gap-4">
                <h3 className="text-sm font-bold text-gray-500">
                    Send message will only send messages to the user and not require a response back
                </h3>

                {nodeContent?.messages.length > 0 && (
                    <div className="my-3 flex flex-col gap-4">
                        {nodeContent?.messages?.map((message) => (
                            <div className="relative" key={message.id}>
                                <h3 className="text-sm text-nodeSettings mb-1">Send this message</h3>
                                <TextEditorVariable
                                    key={message.id}
                                    showToolbar
                                    wordsCount
                                    message={"You can reference a variable by typing #"}
                                    value={message.text}
                                    onChange={(val) => onChangeData(selectedNode, message.id, '', {
                                        text: val as string
                                    })}
                                    className="h-[120px]"
                                // onChangeFallback={(val) => onChangeFallbackData(selectedNode, message.id, val)}
                                // fallbackValue={message.fallbacks.find(fallback => fallback.id === message.id)?.fallback}
                                />
                                {(nodeContent?.messages && nodeContent?.messages?.length > 1 || nodeContent?.files && nodeContent?.files?.length > 0) && (
                                    <ActionButton
                                        action="delete"
                                        handleClick={() => deleteMessage(selectedNode, message.id)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
                <div className={`flex flex-col gap-2 `}>
                    {nodeContent?.files && nodeContent?.files?.length > 0 && nodeContent?.files?.map((file) => (
                        <div className={`relative`} key={file.id}>
                            <FileInput
                                rowId={`file_input_${file.id}`}
                                value={file.name || ""}
                                handleChange={(e) => {
                                    const files = Array.from(e.target.files || []);
                                    onChangeData(selectedNode, '', file.id as string, {
                                        file: files[0]
                                    })
                                }}
                            />

                            {(nodeContent?.files && nodeContent?.files?.length > 1 || nodeContent.messages.length > 0) && (
                                <ActionButton
                                    action="delete"
                                    handleClick={() => deleteFile(selectedNode, file.id)}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-2">
                <ActionButton
                    action="add"
                    handleClick={() => addMessage(selectedNode)}
                    text="message"
                />
                <ActionButton
                    action="add"
                    handleClick={() => addFile(selectedNode)}
                    text="file"
                />
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <div >
                    <div className="mt-2 flex items-center">
                        <input
                            type="checkbox"
                            name="filters"
                            id="filters"
                            className="rounded"
                            disabled
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

export default SendMessageSettingsContent;
