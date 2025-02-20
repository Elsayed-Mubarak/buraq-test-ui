import { Node } from "@xyflow/react";
import INodeContent from "../../node.content";

export type SetAiWhatsapp_AdvancedSettings = {
    openAiModel: string;
    executeFunctions: string[];
    answerSize: number;
    temprature: number;
    chunks: number;
    feedback: boolean;
    answerSource: boolean;
}

export interface ISetAiWhatsappNodeContent extends INodeContent {
    question: string;
    knowledgeBase: string;
    instructions: string;
    response: string;
    advancedSettings: SetAiWhatsapp_AdvancedSettings;
};

export interface ISetAiWhatsappStore {
    values: string[];
    onChangeData: (node: Node, values: Partial<ISetAiWhatsappNodeContent>) => void;
    changeName: (node: Node, name: string) => void;
}

