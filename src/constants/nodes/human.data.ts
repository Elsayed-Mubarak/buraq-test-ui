import { HumanNodeContent } from "@/types/workflows/nodes/human.content";
import { ObjectId } from "bson";

export const HumanNodeContentInitialData: HumanNodeContent = {
    id: new ObjectId().toHexString(),
    name: 'talk to human',
    rules: [
        {
            id: new ObjectId().toHexString(),
            name: 'Rule 1',
            assignTo: {
                id: '',
                name: '',
                profilePicture: '',
                type: 'teammates'
            },
            waittingTime: 30
        },
    ],
    advancedSettings: {
        handoverSuccessMsg: 'Please wait while we connect you to our agent…',
        handoverErrorMsg: 'Sorry! All our agents are unavailable at this time',
        noAgentMsg: 'Sorry! All our agents are occupied at the moment',
        beyondOperationHoursMsg: 'Sorry! All our agents are unavailable at this time'
    }
}