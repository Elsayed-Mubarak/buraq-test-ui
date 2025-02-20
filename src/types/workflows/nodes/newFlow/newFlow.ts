import { Node } from "@xyflow/react";
import INodeContent from "../node.content";


export interface INewFlowNodeContent extends INodeContent {

    partialNodes : Node[];

}

export interface INewFlowNodeStore {
    changeName: (node: Node, name: string) => void;
    addPartialNode: (node: Node) => void;
    deletePartialNode: (node: Node, id: string) => void;
    onChangeData: (node: Node, value: any) => void;

}