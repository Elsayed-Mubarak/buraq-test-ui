import { Node } from "@xyflow/react";
import INodeContent from "./node.content";

export type AssignTo = {
    type: 'teammates' | 'team';
    id: string;
    name: string;
    profilePicture: string;
}

export type AddvancedSettings = {
    handoverSuccessMsg: string;
    handoverErrorMsg: string;
    noAgentMsg: string;
    beyondOperationHoursMsg: string;
}

export type Rule = {
    id: string;
    name: string;
    assignTo: AssignTo;
    waittingTime: number;
}

export interface HumanNodeContent extends INodeContent {
    rules: Rule[],
    advancedSettings: AddvancedSettings;
}

export interface IHumanStore {
    visibleRuleId: string | null;
    showSettings: boolean;
    changeName: (node: Node, name: string) => void;
    setVisibleRuleId: (visibleId: string | null) => void;
    toggleShowSettings: (showSettings: boolean) => void;
    addRule: (node: Node) => void;
    deleteRule: (node: Node, ruleId: string) => void;
    onChangeData: (node: Node, ruleId: string, values: Partial<Rule>) => void;
    onChangeSettings: (node: Node, values: Partial<AddvancedSettings>) => void;
}