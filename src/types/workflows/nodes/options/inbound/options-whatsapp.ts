import { Node } from "@xyflow/react";
import INodeContent from "../../node.content";

export interface IOptionsNodeContent extends INodeContent {
    body: string;
    optionItems: [
        {
            id: string;
            item: string;
            nextNodeId: string;
        },
    ];
    error: string;
    savedResponse: string;
    hotKeywords: string;
}

export interface IOptionsWhatsapStore {
    changeName: (node: Node, name: string) => void;
    addItem: (node: Node) => void;
    deleteItem: (node: Node, id: string) => void;
    onChangeData: (node: Node, value: any) => void;

}