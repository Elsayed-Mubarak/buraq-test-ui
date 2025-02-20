import { Node } from "@xyflow/react";
import INodeContent from "./node.content";


export interface ISalesforce extends INodeContent {
    accountName: string;
    organizationId: string;
}

export interface ISalesForceStore {
    changeName: (node: Node, name: string) => void;
    onChangeData: (node: Node, values: Partial<ISalesforce>) => void;
}