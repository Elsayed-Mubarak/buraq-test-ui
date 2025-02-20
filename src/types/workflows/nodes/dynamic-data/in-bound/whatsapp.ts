import { Node } from "@xyflow/react";
import INodeContent from "../../node.content";

export enum DynamicData_Whatsapp_RenderAsEnum {
    REPLYBUTTON = "reply-button",
    OPTIONS = "options",
    LIST = "list",
};

export enum DynamicData_Whatsapp_Header {
    TEXT = "text",
    FILE = "file",
}

export interface ReplyButtonResponse {
    header: {
        type: DynamicData_Whatsapp_Header,
        value: string;
        file: {
            s3Url: string;
            name: string;
        };
    };
    body: string;
    footer: string;
    error: string;
    buttonTitle: string;
}

export interface OptionsResponse {
    message: string;
    optionItems: string;
    error: string;
}

export interface ListResponse {
    header: string;
    body: string;
    footer: string;
    error: string;
    buttonName: string;
    item: {
        category: string,
        name: string,
        description: string,
    }
}

type ResponseContentAs = {
    header: {
        type: DynamicData_Whatsapp_Header,
        value: string;
        file: {
            s3Url: string;
            name: string;
        };
    };
    body: string;
    footer: string;
    error: string;
    buttonName: string;
    optionItems: string;
    item: {
        category: string,
        name: string,
        description: string,
    }
    buttonPayload: string;
};

export interface IDynamicDataWhatsappContent extends INodeContent {
    dataVariable: string;
    savedResponseVariable: string;
    savePayloadResponse: string;
    renderAs: DynamicData_Whatsapp_RenderAsEnum;
    responseContentAs: ResponseContentAs;
}


export interface IDynamicDataWhatsappStore {
    changeName: (node: Node, name: string) => void;
    onChangeRenderItem: (node: Node, values: { renderAs: DynamicData_Whatsapp_RenderAsEnum }) => void;
    onChangeVariables: (node: Node, values: { dataVariable: string }) => void;
    onChangeSavedVariables: (node: Node, values: { savedResponseVariable: string }) => void;
    onChangeSavePayloadResponse: (node: Node, values: { savePayloadResponse: string }) => void;
    onChangeReply: (node: Node, values: IDynamicDataWhatsappContent, file?: File) => void
    onChangeOptions: (node: Node, values: IDynamicDataWhatsappContent) => void
    onChangeList: (node: Node, values: IDynamicDataWhatsappContent) => void
}
