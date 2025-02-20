import { WorkflowBotType } from "../../../../../../types/workflow"

import TriggerOutboundSettingsContent from "./outbound/trigger.outbound.content"
import TriggerContentInbound from "./TriggerContent"


function TriggerContent({ workflowBotType }: { workflowBotType: WorkflowBotType }) {
    return (
        <>
            {workflowBotType === 'inbound'
                ? <TriggerContentInbound />
                : <TriggerOutboundSettingsContent />
            }
        </>
    )
}

export default TriggerContent