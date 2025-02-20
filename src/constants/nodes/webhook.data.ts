import { IWebhookNodeContent } from "@/types/workflows/nodes/webhook.content";
import { ObjectId } from "bson";

export const WebhookInitialData: IWebhookNodeContent = {
    id: new ObjectId().toHexString(),
    name: 'webhook 1',
    timeout: 10,
    
    variables: [
        {
            id: new ObjectId().toHexString(),
            objectPath: 'result',
            variable: ''
        },
        {
            id: new ObjectId().toHexString(),
            objectPath: 'result',
            variable: ''
        },
        {
            id: new ObjectId().toHexString(),
            objectPath: 'result',
            variable: ''
        },
    ],
}