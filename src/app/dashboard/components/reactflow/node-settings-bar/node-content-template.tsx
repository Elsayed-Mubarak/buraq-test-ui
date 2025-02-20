import OptionsSettingsContent from "../node-settings-content/options-content/options.content";
import SendMessageSettingsContent from "../node-settings-content/send-message/send-message.content";
import useFlowStore from "../reactflowstate/store";
import InputCollectSettings from "../node-settings-content/input-collect/input-collect.content";
import EmailSettingsContent from "../node-settings-content/send-email/email.content";
import CalendarSettingsContent from "../node-settings-content/calendar-content/calendar-content";
import DialogSettingsContent from "../node-settings-content/dialog-content/dialog-content";
import FlowSettingsContent from "../node-settings-content/flow-content/flow-content";
import CollectFileSettingsContent from "../node-settings-content/collect-file/collect-file-content";
import JumpSettingsContent from "../node-settings-content/jumpSettingsContent/JumpSettingsContent";
import ZappierSettingsContent from "../node-settings-content/ZapierSettingsContent/ZappierSettingsContent";
import { NodeTypesSettingsEnum } from "../../../../../types/reactFlow";
import ConditionSettingsContent from "../node-settings-content/condition/condition.content";
import SalesForce from "../node-settings-content/salesforce/sales-force";
import ReplyButtonContentSettings from "../node-settings-content/replyButton/ReplyButton.content";
import HumanContentSettings from "../node-settings-content/humanContent/human.content";
import HttpRequestContent from "../node-settings-content/http-request/http-request.content";
import JavaScriptContent from "../node-settings-content/java-script/JavaScriptContent";
import ListContentSettings from "../node-settings-content/listContent/ListContentSettings";
import { WebhookContentSettings } from "../node-settings-content/webhookContent/webhook.content";
import DynamicDataContentSettings from "../node-settings-content/dynamic-data/dynamic-data.content";
import ZohoContentSettings from "../node-settings-content/zoho.content/Zoho.content";
import AnswerAIContent from "../node-settings-content/answer-ai/AnswerAI.content";
import SetAIContent from "../node-settings-content/set-ai/SetAI.content";
import WhatsappFlowContent from "../node-settings-content/whatsapp-flow/WhatsappFlowContent";
import DelayContentSettings from "../node-settings-content/delat-content/DelayContentSettings";
import SmsContentSettings from "../node-settings-content/sms-content/SmsContentSettings";
import SendOutboundWatsapp from "../node-settings-content/send-outbound-whatsapp-content/SendOutboundWatsapp"
import TriggerContentInbound from "../node-settings-content/trigger/TriggerContent";
import FlowStartSettings from "../node-settings-content/flow-start/FlowStartSettings";

const nodeSettingsContent: Record<NodeTypesSettingsEnum, React.FC> = {
    [NodeTypesSettingsEnum.JUMP]: JumpSettingsContent,
    [NodeTypesSettingsEnum.FLOW]: FlowSettingsContent,
    [NodeTypesSettingsEnum.EMAIL]: EmailSettingsContent,
    [NodeTypesSettingsEnum.DIALOG]: DialogSettingsContent,
    [NodeTypesSettingsEnum.ZAPIER]: ZappierSettingsContent,
    [NodeTypesSettingsEnum.TRIGGER]: TriggerContentInbound,
    [NodeTypesSettingsEnum.OPTIONS]: OptionsSettingsContent,
    [NodeTypesSettingsEnum.CONDITION]: ConditionSettingsContent,
    [NodeTypesSettingsEnum.CALENDAR]: CalendarSettingsContent,
    [NodeTypesSettingsEnum.MESSAGE]: SendMessageSettingsContent,
    [NodeTypesSettingsEnum.INPUT_COLLECT]: InputCollectSettings,
    [NodeTypesSettingsEnum.COLLECT_FILE]: CollectFileSettingsContent,
    [NodeTypesSettingsEnum.SALES_FORCE]: SalesForce,
    [NodeTypesSettingsEnum.REPLY_BUTTON]: ReplyButtonContentSettings,
    [NodeTypesSettingsEnum.TALK_TO_HUMAN]: HumanContentSettings,
    [NodeTypesSettingsEnum.HTTP_REQUEST]: HttpRequestContent,
    [NodeTypesSettingsEnum.JAVA_SCRIPT]: JavaScriptContent,
    [NodeTypesSettingsEnum.WEBHOOK]: WebhookContentSettings,
    [NodeTypesSettingsEnum.DYNAMIC_DATA]: DynamicDataContentSettings,
    [NodeTypesSettingsEnum.LIST]: ListContentSettings,
    [NodeTypesSettingsEnum.ZOHO]: ZohoContentSettings,
    [NodeTypesSettingsEnum.ANSWER_AI]: AnswerAIContent,
    [NodeTypesSettingsEnum.SET_AI]: SetAIContent,
    [NodeTypesSettingsEnum.WHATSAPP_FLOW]: WhatsappFlowContent,
    [NodeTypesSettingsEnum.DELAY]: DelayContentSettings,
    [NodeTypesSettingsEnum.SMS]: SmsContentSettings,
    [NodeTypesSettingsEnum.SEND_WHATSAPP]: SendOutboundWatsapp,
    [NodeTypesSettingsEnum.FLOWSTART]:FlowStartSettings ,




}

function NodeContentTemplate() {
    const { selectedNode } = useFlowStore((state) => state);

    if (!selectedNode) return null;

    const ContentSettings = nodeSettingsContent[selectedNode.type as NodeTypesSettingsEnum];

    return <ContentSettings />;
}

export default NodeContentTemplate;
