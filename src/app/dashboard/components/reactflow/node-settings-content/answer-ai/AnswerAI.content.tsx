"use client";

import TextBlock from "@/components/workflow/nodeSettings/TextBlock"
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header"
import { svgs } from "../../shared/SVG"
import CustomSelect from "@/components/workflow/nodeSettings/CustomSelect"
import { CiCircleInfo, CiSettings } from "react-icons/ci";
import ResizableTextBlock from "@/components/workflow/nodeSettings/ResizableTextBlock";
import { Textarea } from "../../../ui/textarea";
import { useState } from "react";
import AdvancedSettings from "./AdvancedSettings";
import useFlowStore from "../../reactflowstate/store";
import { IAnswerAiWhatsappNodeContent } from "@/types/workflows/nodes/answer-ai/inbound/whatsapp";
import useAnswerAIWhatsappStore from "@/stores/nodes/answer-ai/inbound-whatsapp.store";
import VariableEditor from "@/components/VariableEditor";
import TextEditorVariable from "@/components/workflow/nodeSettings/variable-editor/TextEditorVariable";

const knowledgeBase = [
    { id: 'buraq-ai', name: 'Buraq AI', value: 'buraq-ai' },
    { id: 'darent', name: 'Darent', value: 'darent' },
    { id: 'rewaa', name: 'Rewaa', value: 'rewaa' },
    { id: 'rekaz', name: 'rekaz', value: 'rekaz' },
    { id: 'untitled', name: 'untitled', value: 'untitled' },
]

function AnswerAIContent() {
    const [showSettings, setShowSettings] = useState<boolean>(false);

    const { selectedNode } = useFlowStore();

    const { onChangeData, changeName } = useAnswerAIWhatsappStore();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as IAnswerAiWhatsappNodeContent;

    return (
        <div className="relative">
            <NodeSettingsHeader
                icon={svgs.answer_AI}
                text={nodeContent.name || selectedNode.data.nodeName as string}
                onChange={(e) => changeName(selectedNode, e.target.value)}
            />

            <div className="my-4">
                <TextEditorVariable
                    key={"question"}
                    message="You can reference a variable by typing #"
                    value={nodeContent.question || ""}
                    onChange={(val: string) => onChangeData(selectedNode, {
                        question: val
                    })}
                />

            </div>

            <CustomSelect
                data={knowledgeBase}
                onChange={(val) => onChangeData(selectedNode, {
                    ...nodeContent,
                    knowledgeBase: val as string,
                })}
                triggerName={nodeContent.knowledgeBase || "Select KB"}
                label="Knowledge base"
                className="my-4"
            />

            <div className="my-4">
                <ResizableTextBlock
                    label="Prompt"
                >
                    <TextEditorVariable
                        key={"instructions"}
                        value={nodeContent.instructions as string}
                        onChange={(val: string) => onChangeData(selectedNode, {
                            ...nodeContent,
                            instructions: val,
                        })}
                        asChild
                    />
                </ResizableTextBlock>
            </div>

            <button className="flex items-center gap-1 mt-6" onClick={() => setShowSettings(true)}>
                <CiSettings className="h-5 w-5" />
                <p className="text-sm text-nodeSettings">Advanced settings</p>
            </button>

            <AdvancedSettings show={showSettings} setShow={setShowSettings} />

        </div>
    )
}

export default AnswerAIContent