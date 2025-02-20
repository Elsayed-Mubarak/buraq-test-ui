import { Node } from "@xyflow/react";
import INodeContent from "../../node.content";

export type AnswerAiWhatsapp_AdvancedSettings = {
    openAiModel: string;
    executeFunctions: string[];
    answerSize: number;
    temprature: number;
    chunks: number;
    feedback: boolean;
    answerSource: boolean;
}

export interface IAnswerAiWhatsappNodeContent extends INodeContent {
    question: string;
    knowledgeBase: string;
    instructions: string;
    advancedSettings: AnswerAiWhatsapp_AdvancedSettings;
};

export interface IAnswerAiWhatsappStore {
    values: string[];
    onChangeData: (node: Node, values: Partial<IAnswerAiWhatsappNodeContent>) => void;
    changeName: (node: Node, name: string) => void;
}

