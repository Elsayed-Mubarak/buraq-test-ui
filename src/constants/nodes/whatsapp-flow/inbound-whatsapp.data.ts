import { IWhatsappflowNodeContent } from "@/types/workflows/nodes/whatsappflow/inbound-whatsappflow";
import { ObjectId } from "bson";

export const WhatsappflowInboundInitData: IWhatsappflowNodeContent = {
    id: new ObjectId().toHexString(),
    name: "Whatsapp flow",
    header: null,
    footer: null,
    body: "What would you like to choose?",
    error: "Please enter a valid option from the mentioned choices",
    buttonName: "",
    flow: "",
    startingScreen: "",
    data: [
        {
            id: new ObjectId().toHexString(),
            variable: "",
            value: "",
        },
        {
            id: new ObjectId().toHexString(),
            variable: "",
            value: "",
        },
        {
            id: new ObjectId().toHexString(),
            variable: "",
            value: "",
        },
    ],
    savedResponse: [
        {
            id: new ObjectId().toHexString(),
            response: "response",
            variable: ""
        },
        {
            id: new ObjectId().toHexString(),
            response: "response",
            variable: ""
        },
        {
            id: new ObjectId().toHexString(),
            response: "response",
            variable: ""
        }
    ]
}