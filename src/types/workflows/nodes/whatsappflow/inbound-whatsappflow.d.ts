import { Node } from "@xyflow/react";
import INodeContent from "../node.content";

type WhatsappFlowHeader = {
    type: "text" | "media" | "dynamic-data";
    value?: string;
    file: {
        s3Url: string;
        name: string;
    } | null;
}

type WhatsappFlowData = {
    id: string;
    variable: string;
    value: string;
}

type WhatsappFlowSaveResponse = {
    id: string;
    response: string;
    variable: string;
}

export interface IWhatsappflowNodeContent extends INodeContent {
    header: WhatsappFlowHeader | null;
    footer: string | null
    body: string;
    error: string;
    buttonName: string;
    flow: string;
    startingScreen: string;
    data: WhatsappFlowData[];
    savedResponse: WhatsappFlowSaveResponse[];
}

export interface IWhatsappflowStore {
    header: boolean;
    footer: boolean;
    toggleHeader: (flag: boolean) => void;
    toggleFooter: (flag: boolean) => void;
    onChangeData: (node: Node, values: any) => void;
    changeName: (node: Node, name: string) => void;
    addData: (node: Node) => void;
    deleteItem: (node: Node, id: string) => void;
    addResponse: (node: Node) => void;
    deleteResponse: (node: Node, id: string) => void;
}