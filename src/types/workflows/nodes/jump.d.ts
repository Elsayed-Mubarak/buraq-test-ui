import { Node } from "@xyflow/react";
import INodeContent from "./node.content";

export interface IJumpNodeContent extends INodeContent {
    node: string;
}

export interface IJumpStore {
    changeName: (node: Node, name: string) => void;
    getNodes: () => Node[];
    onChangeData: (node: Node, { node: string }) => void;
}