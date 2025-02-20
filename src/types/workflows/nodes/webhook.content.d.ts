import { ObjectId } from "bson";
import INodeContent from "./node.content";
import { Node } from "@xyflow/react";

type WebhookVariable = {
    id: string;
    objectPath: string;
    variable: string;
};

export interface IWebhookNodeContent extends INodeContent {
    timeout: number;
    variables: WebhookVariable[];
    successTargetId?: string;
    failureTargetId?: string;

}

export interface IWebhookStore {
    changeName: (node: Node, name: string) => void;
    addVariable: (node: Node) => void;
    deleteVaraible: (node: Node, nodeId: string) => void;
    onChangeTimeout: (node: Node, timeout: { timeout: number }) => void;
    onChangeVariable: (node: Node, variableId: string, values: { objectPath: string, variable: string }) => void;
}