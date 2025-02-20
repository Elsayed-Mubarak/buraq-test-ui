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
import { ISetAiWhatsappNodeContent } from "@/types/workflows/nodes/set-ai/inbound/whatsapp";
import useSetAIWhatsappStore from "@/stores/nodes/set-ai/inbound-whatsapp.store";
import VariableEditor from "@/components/VariableEditor";
import VariablesDropdown from "@/components/workflow/nodeSettings/VariablesDropdown"
import { ICollectFileNodeContent } from "@/types/workflows/nodes/collectFile";


const knowledgeBase = [
    { id: 'buraq-ai', name: 'Buraq AI', value: 'buraq-ai' },
    { id: 'darent', name: 'Darent', value: 'darent' },
    { id: 'rewaa', name: 'Rewaa', value: 'rewaa' },
    { id: 'rekaz', name: 'rekaz', value: 'rekaz' },
    { id: 'untitled', name: 'untitled', value: 'untitled' },
]


const response = [
    { id: "response", name: "response", value: "response" },
    { id: "query", name: "query", value: "query" },
];

const question = [
    { id: 'query', name: 'query', value: 'query' },
    { id: 'query', name: 'question', value: 'question' },
]

function SetAIContent() {
    const [showSettings, setShowSettings] = useState<boolean>(false);

    const { selectedNode, activeVariables } = useFlowStore();

    const { onChangeData, changeName } = useSetAIWhatsappStore();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as ISetAiWhatsappNodeContent;


    return (

        <div className="relative">
            <NodeSettingsHeader
                icon={svgs.answer_AI}
                text={nodeContent.name || selectedNode.data.nodeName as string}
                onChange={(e) => changeName(selectedNode, e.target.value)}
            />

            {/* <TextBlock
                value={nodeContent.question as string}
                onChange={(e) => onChangeData(selectedNode, {
                    ...nodeContent,
                    question: e.target.value as string
                })}
                label="Ask this question"
                footerMsg="You can reference a variable by typing #"
                className="my-4"
            /> */}

            {/* <CustomSelect
                data={question}
                onChange={(val) => onChangeData(selectedNode, {
                    ...nodeContent,
                    question: val as string,
                })}
                triggerName={nodeContent.question || "Select question"}
                label="Question context"
                className="my-4"
            /> */}

            <div>
                <h3 className="text-sm text-nodeSettings" style={{ marginTop: '16px' }}>Question context</h3>

                <div className="bg-white relative">
                    <VariablesDropdown data={activeVariables}
                        onChange={(e) => onChangeData(selectedNode, {
                            question: e.target.value as string
                        })}
                        triggerName={(selectedNode.data.nodeContent as ICollectFileNodeContent || "Select variable").variable as string}
                    />
                </div>
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
                    label="Instructions"
                >
                    <Textarea
                        value={nodeContent.instructions as string}
                        onChange={(e) => onChangeData(selectedNode, {
                            ...nodeContent,
                            instructions: e.target.value,
                        })}
                        className="ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent border-gray-300 hover:border-indigo-500 w-full h-full text-nodeSettings"
                    />
                </ResizableTextBlock>
            </div>

            {/* <CustomSelect
                data={response}
                onChange={(val) => onChangeData(selectedNode, {
                    ...nodeContent,
                    response: val as string,
                })}
                triggerName={nodeContent.response || "Select response"}
                label="Save the response in this variable"
                className="my-4"
            /> */}



            <div>
                <h3 className="text-sm text-nodeSettings">Save response</h3>
                <div className="bg-white relative">
                    <VariablesDropdown data={activeVariables}
                        onChange={(e) => onChangeData(selectedNode, {
                            response: e.target.value as string
                        })}
                        triggerName={(selectedNode.data.nodeContent as ICollectFileNodeContent || "Select variable").variable as string}
                    />
                </div>
            </div>


            <button className="flex items-center gap-1 mt-6" onClick={() => setShowSettings(true)}>
                <CiSettings className="h-5 w-5" />
                <p className="text-sm text-nodeSettings">Advanced settings</p>
            </button>

            <AdvancedSettings show={showSettings} setShow={setShowSettings} />

        </div>

    )
}

export default SetAIContent