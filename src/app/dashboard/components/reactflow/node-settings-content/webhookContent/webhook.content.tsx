import CopyText from "@/components/workflow/nodeSettings/CopyText";
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header";
import { svgs } from "../../shared/SVG";
import { Input } from "@/components/ui/input";
import useFlowStore from "../../reactflowstate/store";
import { IWebhookNodeContent } from "@/types/workflows/nodes/webhook.content";
import useWebhookStore from "@/stores/nodes/useWebhook.store";
import ActionButton from "@/components/workflow/nodeSettings/ActionButton";
import VariablesDropdown from "@/components/workflow/nodeSettings/VariablesDropdown";

export function WebhookContentSettings() {
    const { addVariable, deleteVaraible, onChangeTimeout, onChangeVariable } = useWebhookStore();

    const { selectedNode, activeVariables } = useFlowStore();
    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as IWebhookNodeContent;

    return (
        <div className="relative">
            <NodeSettingsHeader icon={svgs.webhook} text="Webhook 1" />

            <h3 className="node-settings-desc my-3">
                Listens to events that occur on this event and proceeds to the next step in the flow.
            </h3>

            <div className="my-4">
                <h3 className="text-sm font-light text-nodeSettings mb-1">Endpoint</h3>
                <CopyText text="https://hooks.buraq.ai/incoming/webhook/54qbXf3moVk3092430481846w7rS11Af" />
                <p className="text-xs text-gray-500 text-pretty">
                    Set this webhook endpoint on the application which will publish the event. It is mandatory to return the <strong>conversation_key</strong> as part of the response payload; if it is not present, our systems will not consider it as a successful response.
                </p>
            </div>

            <div className="my-4">
                <div className="flex justify-between items-center">
                    <p className="text-[15px] text-nodeSettings font-light">
                        Timeout duration (s)
                    </p>
                    <Input
                        type="number"
                        className="w-20 h-[34px] hover:border-indigo-500 outline-none ring-0 ring-transparent focus:outline-none focus:ring-transparent focus:ring-0 border-gray-300"
                        value={nodeContent.timeout}
                        onChange={(e) => onChangeTimeout(selectedNode, {
                            timeout: Number(e.target.value)
                        })}
                    />
                </div>
                <p className="text-xs text-gray-500">
                    Upon duration timeout, the flow will continue on the failure path shown in red.
                </p>
            </div>

            <div className="my-4">
                <h3 className="text-nodeSettings text-sm font-light">
                    Save the responses received from this webhook to these variables
                </h3>
                <p className="text-xs text-gray-500">
                    This variable can be referenced to anywhere in the flow to branch the conversation based on the type of response received from the webhook.
                </p>

                <div className="flex flex-col gap-2 my-3">
                    <div className="flex justify-between">
                        <h3 className="w-1/2 text-sm text-nodeSettings font-light">Object Path</h3>
                        <h3 className="w-1/2 text-sm text-nodeSettings font-light text-start">Variables</h3>
                    </div>
                    {nodeContent.variables.map((item) => (
                        <div key={item.id} className="flex gap-2 relative">
                            <div className="w-1/2">
                                <Input
                                    type="text"
                                    value={item.objectPath}
                                    onChange={e => onChangeVariable(selectedNode, item.id, {
                                        ...item,
                                        objectPath: e.target.value
                                    })}
                                    className="h-[34px] hover:border-indigo-500 outline-none ring-0 ring-transparent focus:outline-none focus:ring-transparent focus:ring-0 border-gray-300"
                                />
                            </div>
                            <div className="w-1/2 bg-white relative">
                                <VariablesDropdown
                                    triggerName={item.variable || "variable"}
                                    onChange={(e) => onChangeVariable(selectedNode, item.id, {
                                        ...item,
                                        variable: e.target.value
                                    })}
                                />

                            </div>
                            <ActionButton
                                action="delete"
                                handleClick={() => deleteVaraible(selectedNode, item.id)}
                            />
                        </div>
                    ))}
                </div>
                <ActionButton
                    action="add"
                    handleClick={() => addVariable(selectedNode)}
                    text="Add variable"
                />
            </div>
        </div>
    )
}