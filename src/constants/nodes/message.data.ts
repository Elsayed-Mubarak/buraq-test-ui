import { ISendMessageNodeContent } from "@/types/workflows/nodes/message";
import { ObjectId } from "bson";

export const sendMessageInitialData: ISendMessageNodeContent = {
    id: new ObjectId().toHexString(),
    name: 'Send Message',
    messages: [
        {
            id: new ObjectId().toHexString(),
            text: "Hi there! My name is..."
        },
    ],
    files: [],
};
