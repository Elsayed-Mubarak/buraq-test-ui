import { Node } from "@xyflow/react";
import INodeContent from "../node.content";

// @Desc    logic between conditions is always AND
type Condition = {
    id: string;
    filterType: string;
    value: any;
    valueCondition: string;
    nextConditionId: string | null;
}

// @Desc    logic between groups will be always OR
type Group = {
    id: string;
    conditions: Condition[];
    nextGroupId: string | null;
}

type InjectVariables = {
    id: string;
    key: string;
    variable: string;
}

export interface ITriggerWhatsappNodeContent extends INodeContent {
    triggerBot: {
        flag: boolean;
        groups: Group[]
    }
    contactSubscription: {
        flag: boolean;
        subscription: "Subscribed" | "Unsubscribed";
    };
    storeVariables: {
        flag: boolean;
        injectVariables: InjectVariables[];
    };
    phoneNumber: string;
}

export interface ITriggerWhatsapStore {
    whatsappPhoneNumbers: any[];
    fetchPhoneNumber: () => Promise<any[]>;
    onChangeData: (node: Node, values: any) => void;

    onChangeFilters: (node: Node, groupId, conditionId, filterValue) => void;

    onChangeDate: (node: Node, groupId: string, conditionId: string, value: any) => void;

    onChangeKeyword: (node: Node, groupId: string, conditionId: string, payload: string[]) => void;
    onChangeKeywordCondition: (node: Node, groupId: string, conditionId: string, value: string) => void;

    onChangePayload: (node: Node, { groupId, conditionId, payload }: any) => void;
    onChangePayloadCondition: (node: Node, groupId: string, conditionId: string, value: string) => void;

    addVariable: (node: Node) => void;
    deleteVaraible: (node: Node, id: string) => void;

    onChangeVariable: (node: Node, id: string, value: any) => void;

    onAddAndCondition: (node: Node, groupId: string) => void;
    onAddOrGroup: (node: Node) => void;
    onDeleteCondition: (node: Node, groupId: string, conditionId: string) => void;

}
