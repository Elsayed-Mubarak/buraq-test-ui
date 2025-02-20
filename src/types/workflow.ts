import { ReactNode } from "react";

export type WorkflowBotType = 'inbound' | 'outbound';

export enum WorkflowBotInboundProvider {
    WEB = 'web',
    WHATSAPP = 'whatsapp',
    INSTAGRAM = 'instagram',
    SMS = 'sms',
    FACEBOOK = 'facebook',
    VOICE = 'voice',
}
export enum WorkflowBotOutboundProvider {
    ONE_OFF = 'one-off',
    ONGOING = 'ongoing',
}

// bot icons
export type WorkflowBotInboundProviderIcon = {
    [key in WorkflowBotInboundProvider]: React.ReactNode;
}
export type WorkflowBotOutboundProviderIcon = {
    [key in WorkflowBotOutboundProvider]: React.ReactNode;
}

// components Props
export interface IWorkflowBotCardOutboundProps {
    workflow: any;
    botType: WorkflowBotType;
}
export interface BotProviderIconProps {
    provider: WorkflowBotInboundProvider | WorkflowBotOutboundProvider;
    botType: WorkflowBotType;
}

// node settings bar
export interface INodeSettingsHeaderProps {
    icon: ReactNode;
    workflowBotType: WorkflowBotType 
}

// trigger 
export enum TriggerInboundFiltersEnum {
    DATE_RANGE = 'date-range',
    KEYWORD = 'keyword',
    BUTTON_PAYLOAD = 'button-payload'
}

// input conditions
export enum OperatorsEnum {
    EQUALS_TO = "equals-to",
    NOT_EQUALS_TO = "not-equals-to",
    CONTAINS = "contains",
    DOES_NOT_CONTAIN = "does-not-contain",
    IS_EMPTY = "is-empty",
    IS_NOT_EMPTY = "is-not-empty",
}