import { ITriggerWhatsappNodeContent } from "@/types/workflows/nodes/trigger/inbound-whatsapp";
import useFlowStore from "../../reactflowstate/store"
import { svgs } from "../../shared/SVG";
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header";
import TriggerFiltersInbound from "./inbound/trigger-filters-inbound";
import useTriggerWhatsappInbound from "@/stores/nodes/trigger/inbound-whatsapp.store";
import TriggerConfigContent from "./inbound/trigger-config-inbound";
import VariableInputForm from "./inbound/variable-input-form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useEffect } from "react";

function TriggerContentInbound() {
    const { selectedNode } = useFlowStore();

    const {
        onChangeData,
        fetchPhoneNumber,
        whatsappPhoneNumbers
    } = useTriggerWhatsappInbound();

    useEffect(() => {
        fetchPhoneNumber();
    }, [fetchPhoneNumber])


    useEffect(() => {
        console.log(whatsappPhoneNumbers)
    }, [whatsappPhoneNumbers])

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as ITriggerWhatsappNodeContent;

    return (
        <div>
            <NodeSettingsHeader icon={svgs.trigger} text="Bot is triggered if…" />

            <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center my-2">
                    <input
                        type="checkbox"
                        name="filters"
                        id="filters"
                        className="rounded"
                        checked={nodeContent.triggerBot.flag}
                        onChange={(e) =>
                            onChangeData(selectedNode, {
                                ...nodeContent,
                                triggerBot: {
                                    ...nodeContent.triggerBot,
                                    flag: e.target.checked
                                }
                            })
                        }

                    />
                    <label
                        htmlFor="filters"
                        className="text-sm mx-2 text-nodeSettings"
                    >
                        Trigger bot when condition(s) are met
                    </label>
                </div>
            </div>

            {nodeContent.triggerBot.flag && <TriggerFiltersInbound />}

            <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center my-2">
                    <input
                        type="checkbox"
                        name="config"
                        id="config"
                        className="rounded"
                        checked={nodeContent.contactSubscription.flag}
                        onChange={(e) =>
                            onChangeData(selectedNode, {
                                ...nodeContent,
                                contactSubscription: {
                                    ...nodeContent.contactSubscription,
                                    flag: e.target.checked
                                }
                            })
                        }

                    />
                    <label
                        htmlFor="config"
                        className="text-sm mx-2 text-nodeSettings"
                    >
                        Configure contact subscription status when bot is triggered
                    </label>
                </div>
            </div>

            {nodeContent.contactSubscription.flag && <TriggerConfigContent />}

            <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center my-2">
                    <input
                        type="checkbox"
                        name="variables"
                        id="variables"
                        className="rounded"
                        checked={nodeContent.storeVariables.flag}
                        onChange={(e) =>
                            onChangeData(selectedNode, {
                                ...nodeContent,
                                storeVariables: {
                                    ...nodeContent.storeVariables,
                                    flag: e.target.checked
                                }
                            })
                        }

                    />
                    <label
                        htmlFor="variables"
                        className="text-sm mx-2 text-nodeSettings"
                    >
                        Store/Inject other values into variables
                    </label>
                </div>
            </div>

            {nodeContent.storeVariables.flag && <VariableInputForm />}

            <Select
                value={nodeContent?.phoneNumber}
                onValueChange={(val) => onChangeData(selectedNode, {
                    ...nodeContent,
                    phoneNumber: val
                })}
            >
                <SelectTrigger className="rest-input mt-4">
                    {nodeContent.phoneNumber || "Select"}
                </SelectTrigger>
                <SelectContent>
                    {whatsappPhoneNumbers.map((item) => (
                        <SelectItem key={item.phoneNumber} value={item.phoneNumber}>
                            {item.phoneNumber}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div >
    )
}

export default TriggerContentInbound