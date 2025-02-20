import { Node } from "@xyflow/react";
import INodeContent from "./node.content";

export interface IJavaScriptNodeContent extends INodeContent {
    code: string | undefined;
}


export interface IJavaScriptStore {
    changeName: (node: Node, name: string) => void;
    onChangeData: (node: Node, code: string) => void;
}