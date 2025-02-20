import { S3FILE } from '@/types/s3File';
import INodeContent from './node.content';
import { Interactive } from './replyButton.content.d';
import { Node } from "@xyflow/react";

export type MessagingProduct = "whatsapp" | "facebook" | "instagram";

export type ReplyAction = {
    type: string;
    reply: {
        id: string;
        title: string;
    },
    nextNodeId: string;
}

export type ActionReplyButton = {
    buttons: ReplyAction[];
}

export type ReplyBtnHeader = "media-static" | "text" | "media-dynamic";

export type Interactive = {
    type: string;
    header: {
        type: ReplyBtnHeader;
        text: string;
        file: {
            id: string;
            name: string;
            s3Url: string;
        };
    },
    body: {
        text: string;
    },
    footer: {
        text: string;
    },
    errorMessage: string;
    action: ActionReplyButton;
    variable: string;
};

export interface IReplyButtonNodeContent extends INodeContent {
    messaging_product: MessagingProduct;
    to: string;
    type: "interactive";
    interactive: Interactive;
}

export interface IReplyButtonStore {
    changeName: (node: Node, name: string) => void;
    addButton: (node: Node) => void;
    deleteButton: (node: Node, buttonId: string) => void;
    // onChangeData: (node: Node, headerType: ReplyBtnHeader, values: Partial<IReplyButtonNodeContent>) => void;
    onChangeData: (node: Node, values: any) => void;
    handleFileChange: (node: Node, values: any) => void;
}

