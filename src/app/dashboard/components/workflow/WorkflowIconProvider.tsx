import { MdWeb } from 'react-icons/md';
import {  FaFacebookMessenger, FaInstagram, FaRegFileAlt, FaVoicemail, FaWhatsapp } from 'react-icons/fa';
import { FiRotateCw } from "react-icons/fi";

import { BsChatTextFill } from 'react-icons/bs';
import { BotProviderIconProps, WorkflowBotInboundProviderIcon, WorkflowBotInboundProvider, WorkflowBotOutboundProvider, WorkflowBotOutboundProviderIcon } from '../../../../types/workflow';

const WorkFlowBotInboundProviderIcons: WorkflowBotInboundProviderIcon = {
    [WorkflowBotInboundProvider.WHATSAPP]: <FaWhatsapp className="w-5 h-5" />,
    [WorkflowBotInboundProvider.WEB]: <MdWeb className="w-5 h-5" />,
    [WorkflowBotInboundProvider.SMS]: <BsChatTextFill className="w-5 h-5" />,
    [WorkflowBotInboundProvider.VOICE]: <FaVoicemail className="w-5 h-5" />,
    [WorkflowBotInboundProvider.INSTAGRAM]: <FaInstagram className="w-5 h-5" />,
    [WorkflowBotInboundProvider.FACEBOOK]: <FaFacebookMessenger className="w-5 h-5" />,
};

const WorkFlowBotOutboundProviderIcons: WorkflowBotOutboundProviderIcon = {
    [WorkflowBotOutboundProvider.ONE_OFF]: <FaRegFileAlt className="w-5 h-5" />,
    [WorkflowBotOutboundProvider.ONGOING]:  <FiRotateCw />
    ,
}

export default function WorkFlowBotProviderIcon({ provider, botType }: BotProviderIconProps) {
    return (
        botType === "inbound"
        ? WorkFlowBotInboundProviderIcons[provider as WorkflowBotInboundProvider]
        : WorkFlowBotOutboundProviderIcons[provider as WorkflowBotOutboundProvider]
    )
}