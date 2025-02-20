import { Node } from "@xyflow/react";
import INodeContent from "./node.content";

export interface IEmailNodeContent extends INodeContent {
    email: string;
    cc: string;
    bcc: string;
    subject: string;
    isTranscript: boolean;
    body: string;
}

export interface IEmailStore {
    changeName: (node: Node, name: string) => void;
    onChangeData: (node: Node, values: Partial<IEmailNodeContent>) => void;
}