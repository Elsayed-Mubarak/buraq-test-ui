import { Node } from '@xyflow/react'
import INodeContent from './node.content';

type Fallback = {
    id: string;
    variableName: string;
    fallback: string;
}

export type Message = {
    id: string;
    text: string
    // fallbacks?: Fallback[];
}

export type MessageFile = {
    id: string;
    name: string;
    s3Url: string;
}

export interface ISendMessageNodeContent extends INodeContent {
    messages: Message[];
    files?: MessageFile[];
};

export interface ISendMessageStore {
    changeName: (node: Node, name: string) => void;
    addFile: (node: Node) => void;
    addMessage: (node: Node) => void;
    deleteMessage: (node: Node, messageId: string) => void;
    deleteFile: (node: Node, fileId: string) => void;
    onChangeData: (node: Node, messageId: string, fileId: string, values: { text?: string, file?: File }) => void;
    // onChangeFallbackData: (node: Node, messageId: string, fallbackValue?: string) => void;
}
