import INodeContent from '@/types/workflows/nodes/node.content'
import { Node } from '@xyflow/react';

export type ConditionState = "any" | "all";

type SubConditionsValues = {
    variable: string;
    operator: string;
    value: any | any[];
}

export type SubCondition = {
    id: string;
    variable: string;
    operator: OperatorsEnum | null;
    value: string | string[];

};

export type Condition = {
    id: string;
    name: string;
    subConditions: SubCondition[] | null;
    nextNodeId: string;
    isDefault: boolean;
    conditionState: ConditionState;
};

export interface ConditionNodeContent extends INodeContent {
    conditions: Condition[];
}

export interface IConditionStore {
    visibleConditionId: string | null;
    changeName: (node: Node, name: string) => void;
    setVisibleConditionId: (conditionId: string | null) => void;
    addCondition: (node: Node) => void;
    deleteCondition: (node: Node, conditionId: string) => void;
    addSubCondition: (node: Node, conditionId: string) => void;
    deleteSubCondition: (node: Node, conditionId: string, subConditionId: string) => void;
    onChangeCondition: (node: Node, conditionId: string, value: Partial<Condition>) => void;
    onChangeSubCondition: (node: Node, conditionId: string, subConditionId: string,
        values: Partial<SubConditionsValues>) => void;
}

