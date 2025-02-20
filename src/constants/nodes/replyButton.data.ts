import { IReplyButtonNodeContent } from "@/types/workflows/nodes/replyButton.content";
import { ObjectId } from "bson";

export const replyButtonInitialData: IReplyButtonNodeContent = {
    id: new ObjectId().toHexString(),
    name: 'Reply Button',
    messaging_product: "whatsapp",
    to: "",
    type: "interactive",
    interactive: {
        type: "button",
        header: {
            type: "text",
            text: "",
            file: {
                id: new ObjectId().toHexString(),
                name: "",
                s3Url: "",
            }
        },
        body: {
            text: ""
        },
        footer: {
            text: ""
        },
        errorMessage: "",
        action: {
            buttons: [
                {
                    type: "reply",
                    reply: {
                        id: new ObjectId().toHexString(),
                        title: "Button"
                    },
                    nextNodeId: "",
                }
            ]
        },
        variable: "",
    },
}