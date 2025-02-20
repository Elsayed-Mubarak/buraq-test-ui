import { INewFlowNodeContent } from "@/types/workflows/nodes/newFlow/newFlow";
import { ObjectId } from "bson";

export const partialFlowInitialData: INewFlowNodeContent = {
    id: new ObjectId().toHexString(), // Set AI Whatsapp Node
    name: "FlowStart",
    partialNodes: [
        {
            id: new ObjectId().toHexString(), 
            type:  "FlowStart",
            dragging : true,
            data: {
                nodeName: "FlowStart",
                description: "",
                nodeContent: {},
            },
            position: {
                x: 50 ,
                y: 50,
            },
        },

    ]

}