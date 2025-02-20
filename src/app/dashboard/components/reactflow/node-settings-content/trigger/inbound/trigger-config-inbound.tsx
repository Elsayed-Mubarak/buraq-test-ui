import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../../../ui/select"
import useFlowStore from "../../../reactflowstate/store";
import { ITriggerWhatsappNodeContent } from "@/types/workflows/nodes/trigger/inbound-whatsapp";
import useTriggerWhatsappInbound from "@/stores/nodes/trigger/inbound-whatsapp.store";

function TriggerConfigContent() {
    const { selectedNode } = useFlowStore();

    const { onChangeData } = useTriggerWhatsappInbound()

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as ITriggerWhatsappNodeContent;

    return (
        <>
            <Select
                value={nodeContent.contactSubscription.subscription}
                onValueChange={(val) => onChangeData(selectedNode, {
                    ...nodeContent,
                    contactSubscription: {
                        ...nodeContent.contactSubscription,
                        subscription: val
                    }
                })}
            >
                <SelectTrigger className="mt-2 ring-0 ring-transparent text-sm font-semibold text-[#092445] py-4">
                    {nodeContent.contactSubscription.subscription || "Subscribed"}
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectItem
                        value={'Subscribed'}
                        className="cursor-pointer text-sm font-semibold text-[#092445]"
                    >
                        Subscribed
                    </SelectItem>
                    <SelectItem
                        value={'Unsubscribed'}
                        className="cursor-pointer text-sm font-semibold text-[#092445]"
                    >
                        Unsubscribed
                    </SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}

export default TriggerConfigContent