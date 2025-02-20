import { Node } from "@xyflow/react";
import INodeContent from "../../node.content";

export type ZohoFiled = {
    id: string;
    field: string;
    value: string;
}

export interface IZohoCRMWhatsappNodeContent extends INodeContent {
    account: string;
    zohoFileds: ZohoFiled[];
}

export interface IZohoCRMWhatsappStore {
    changeName: (node: Node, name: string) => void;
    addZohoField: (node: Node) => void;
    deleteZohoField: (node: Node, filedId: string) => void;
    onChangeAccount: (node: Node, values: Partial<IZohoCRMWhatsappNodeContent>) => void;
    onChangeData: (node: Node, filedId: string, values: Partial<{ filed: string, value: string }>) => void;
}