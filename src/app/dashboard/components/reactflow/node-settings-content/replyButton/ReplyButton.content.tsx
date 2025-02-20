import { Select, SelectContent, SelectItem, SelectTrigger } from "../../../ui/select"
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header"
import { svgs } from "../../shared/SVG"
import useFlowStore from "../../reactflowstate/store"
import useReplyButtonStore from "@/stores/nodes/useReplyButton.store"
import { IReplyButtonNodeContent, ReplyBtnHeader } from "@/types/workflows/nodes/replyButton.content"
import ActionButton from "@/components/workflow/nodeSettings/ActionButton"
import FileInput from "@/components/workflow/nodeSettings/FileInput"
import VariablesDropdown from "@/components/workflow/nodeSettings/VariablesDropdown"
import { useVariablesStore } from "@/stores/settings/useVariables.store"
import { useEffect } from "react"
import TextEditorVariable from "@/components/workflow/nodeSettings/variable-editor/TextEditorVariable"
import CheckboxView from "@/components/workflow/nodeSettings/CheckboxView"
import { ObjectId } from "bson"

const headerTypes = [
    { id: "text", name: "Text", value: "text" },
    { id: "media-static", name: "Media", value: "media-static" },
    { id: "media-dynamic", name: "Media (Dynamic)", value: "media-dynamic" },
];


function ReplyButtonContentSettings() {

    const {
        addButton,
        deleteButton,
        onChangeData,
        changeName,
        handleFileChange
    } = useReplyButtonStore();
    const { variables, getVariables } = useVariablesStore();

    useEffect(() => {
        getVariables();
    }, [getVariables]);


    const { selectedNode, setOptionNodeName } = useFlowStore();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as IReplyButtonNodeContent;

    return (
        <div className="overflow-x-hidden">
            <NodeSettingsHeader
                icon={svgs.button}
                text={nodeContent.name || selectedNode.data.nodeName as string}
                onChange={(e) => changeName(selectedNode, e.target.value)}
            />
            <h3 className="node-settings-desc my-3">
                Provides an easy experience for the visitor to select the next step in the flow.
            </h3>

            <div className="border-b-2 border-nodeSettings py-4">
                <p className="mb-1 text-sm text-nodeSettings">Header (Optional)</p>

                <CheckboxView
                    data={headerTypes}
                    onChange={(val: string) => {
                        onChangeData(selectedNode, {
                            interactive: {
                                ...nodeContent.interactive,
                                header: {
                                    ...nodeContent.interactive.header,
                                    type: val,
                                    text: "",
                                    file: {
                                        id: new ObjectId().toHexString(),
                                        name: "",
                                        s3Url: ""
                                    }
                                }
                            }
                        })
                    }}

                    triggerName={nodeContent.interactive.header.type as string}
                    label=""
                />

                <div className="my-2">
                    {nodeContent.interactive.header.type === "media-static" ? (
                        <FileInput
                            rowId="header"
                            value={nodeContent?.interactive?.header?.file?.name}
                            handleChange={(e) => {
                                const files = Array.from(e.target.files || []);
                                handleFileChange(selectedNode, {
                                    interactive: {
                                        ...nodeContent.interactive,
                                        header: {
                                            ...nodeContent.interactive.header,
                                            file: files[0]
                                        }
                                    }
                                })
                            }}
                            placeholder="Upload file"
                        />
                    ) : (
                        <HeaderTypeContent
                            type={nodeContent.interactive.header.type}
                            onChange={(val) => onChangeData(selectedNode, {
                                interactive: {
                                    ...nodeContent.interactive,
                                    header: {
                                        ...nodeContent.interactive.header,
                                        text: val
                                    }
                                }
                            })}
                            value={nodeContent.interactive.header.text}
                        />
                    )}
                </div>
            </div>

            <div className="border-b-2 border-nodeSettings py-4">
                <h3 className="text-sm text-nodeSettings mb-1">Body</h3>
                <div className="mb-14">
                    <TextEditorVariable
                        key={"body"}
                        value={nodeContent.interactive.body.text}
                        onChange={(val: string) => onChangeData(selectedNode, {
                            interactive: {
                                ...nodeContent.interactive,
                                body: { text: val }
                            }
                        })}
                        message="1024 characters limit"
                    />
                </div>
            </div>

            <div className="border-b-2 border-nodeSettings py-4">
                <h3 className="text-sm text-nodeSettings mb-2">
                    Footer (Optional)
                </h3>
                <TextEditorVariable
                    key={"footer"}
                    value={nodeContent.interactive.footer.text}
                    onChange={(val: string) => onChangeData(selectedNode, {
                        interactive: {
                            ...nodeContent.interactive,
                            footer: { text: val }
                        }
                    })}
                    message="60 characters limit"
                />
            </div>

            <div className="border-b-2 border-nodeSettings py-4">
                <h3 className="text-sm text-nodeSettings mb-2">
                    Error message
                </h3>

                <TextEditorVariable
                    key={"error_message"}
                    message="When the visitors types a message which does not match the button text."
                    value={nodeContent.interactive.errorMessage || ""}
                    onChange={(val: string) => onChangeData(selectedNode, {
                        interactive: {
                            ...nodeContent.interactive,
                            errorMessage: val
                        }
                    })}
                />
            </div>

            <div className="flex flex-col gap-4 my-4 ">
                {(selectedNode.data.nodeContent as IReplyButtonNodeContent)?.interactive.action.buttons.map((button: any, index) => (
                    <div key={button.reply.id} className="relative">
                        <input
                            type="text"
                            className="flex items-center justify-center text-white bg-blue-700 
                            font-medium py-2 px-4 rounded-md w-full outline-none border-none text-center"
                            key={button.reply.id}
                            value={button.reply.title}
                            onChange={(e) => {
                                onChangeData(selectedNode, {
                                    interactive: {
                                        ...nodeContent.interactive,
                                        action: {
                                            buttons: nodeContent.interactive.action.buttons.map((b, i) => {
                                                if (i === index) {
                                                    return {
                                                        ...b,
                                                        reply: {
                                                            ...b.reply,
                                                            title: e.target.value
                                                        }
                                                    }
                                                }
                                                return b;
                                            })
                                        }
                                    }
                                })

                                console.log(button)

                                setOptionNodeName(button.reply.title, button.nextNodeId)
                            }


                            }
                        />

                        {
                            (nodeContent.interactive.action.buttons).length > 1 && (
                                <ActionButton
                                    action="delete"
                                    handleClick={() => deleteButton(selectedNode, button.reply.id)}
                                />
                            )
                        }

                    </div>
                ))}

                <ActionButton
                    action="add"
                    text="Reply Button"
                    handleClick={() => addButton(selectedNode)}
                />
            </div>

            <div className="bg-white relative">
                <VariablesDropdown
                    onChange={(e) => onChangeData(selectedNode, {
                        interactive: {
                            ...nodeContent.interactive,
                            variable: e.target.value as string
                        }
                    })}
                    triggerName={nodeContent.interactive.variable as string}
                />
            </div>

        </div>
    )
}

function HeaderTypeContent({ type, onChange, value }: { type: string, onChange: (e: any) => void, value: string }) {

    return (
        <div>
            {type === "text" && (
                <>
                    <TextEditorVariable
                        key={"header_text"}
                        onChange={onChange}
                        value={value}
                    />
                    <p className="text-xs text-gray-500">60 characters limit</p>
                </>
            )}
            {type === "media-dynamic" && (
                <>
                    <TextEditorVariable
                        key={"header_dynamic"}
                        onChange={onChange}
                        value={value}
                    />
                </>
            )}
        </div>
    )
}

export default ReplyButtonContentSettings