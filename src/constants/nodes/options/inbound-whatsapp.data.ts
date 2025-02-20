import { IOptionsNodeContent } from "@/types/workflows/nodes/options/inbound/options-whatsapp";
import { ObjectId } from "bson";

export const OptionsWhatsappInitialData: IOptionsNodeContent = {
    id: new ObjectId().toHexString(),
    name: "otions 1",
    body: "Choose from the below options",
    optionItems: [
        {
            id: new ObjectId().toHexString(),
            item: "Branch",
            nextNodeId: "",
        }
    ],
    error: "Please enter a valid option from the above mentioned choices",
    savedResponse: "",
    hotKeywords: "",
}