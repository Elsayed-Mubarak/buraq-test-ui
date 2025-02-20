"use client";

import { Button } from "@/components/ui/button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RiCloseLargeLine } from "react-icons/ri";
import useFlowStore from "../../reactflowstate/store";
import CustomSelect from "@/components/workflow/nodeSettings/CustomSelect";
import SelectableSearchbox from "@/components/workflow/nodeSettings/SelectableSearchbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CustomSlider from "@/components/workflow/nodeSettings/CustomSlider";
import useAnswerAIWhatsappStore from "@/stores/nodes/answer-ai/inbound-whatsapp.store";
import { IAnswerAiWhatsappNodeContent } from "@/types/workflows/nodes/answer-ai/inbound/whatsapp";

const modelsAI = [
    { id: '1', name: 'gpt-4o', value: 'gpt-4o' },
    { id: '2', name: 'gpt-4o-mini', value: 'gpt-4o-mini' },
    { id: '3', name: 'gpt-4-turbo', value: 'gpt-4-turbo' },
    { id: '4', name: 'gpt-4', value: 'gpt-4' },
    { id: '5', name: 'gpt-4-0613', value: 'gpt-4-0613' },
    { id: '6', name: 'gpt-3.5-turbo', value: 'gpt-3.5-turbo' },
    { id: '7', name: 'gpt-3.5-turbo-16k', value: 'gpt-3.5-turbo-16k' },
];

const chunks = [
    { id: '1', name: '1', value: '1' },
    { id: '2', name: '2', value: '2' },
    { id: '3', name: '3', value: '3' },
    { id: '4', name: '4', value: '4' },
    { id: '5', name: '5', value: '5' },
    { id: '6', name: '6', value: '6' },
    { id: '7', name: '7', value: '7' },
    { id: '8', name: '8', value: '8' },
    { id: '9', name: '9', value: '9' },
    { id: '10', name: '10', value: '10' },
];

interface Props {
    show: boolean;
    setShow: (show: boolean) => void;
}

function AdvancedSettings({ setShow, show }: Props) {
    const [showTemp, setShowTemp] = useState();
    const { closePopup, selectedNode } = useFlowStore();

    const { onChangeData } = useAnswerAIWhatsappStore();

    if (!selectedNode) return null;
    const nodeContent = selectedNode.data.nodeContent as IAnswerAiWhatsappNodeContent;


    return (
        show && (
            <div className="absolute top-0 left-0 w-full h-full bg-white z-50 py-4">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        className="flex w-fit items-center gap-1 px-3 py-1.5 text-[#092451] transition-colors hover:bg-gray-50 "
                        onClick={() => setShow(false)}
                        variant={"ghost"}
                    >
                        <IoIosArrowRoundBack className="w-6 h-6" />
                        <span className="text-sm font-semibold text-[#092451]">Answer AI</span>
                    </Button>

                    <button onClick={closePopup}>
                        <RiCloseLargeLine className="w-4 h-4" />
                    </button>
                </div>

                <div>
                    <CustomSelect
                        data={modelsAI}
                        onChange={(val) => onChangeData(selectedNode, {
                            ...nodeContent,
                            advancedSettings: {
                                ...nodeContent.advancedSettings,
                                openAiModel: val as string
                            }
                        })}
                        triggerName={nodeContent.advancedSettings.openAiModel as string || "Select model"}
                    />
                </div>

                <div>
                    <SelectableSearchbox
                        data={modelsAI}
                        triggerName={`${nodeContent.advancedSettings.executeFunctions.length} function (s)` || 'Select'}
                        label="Execute function(s)"
                        defaultValues={nodeContent.advancedSettings.executeFunctions || []}
                        onChange={(selectedValues) => onChangeData(selectedNode, {
                            ...nodeContent,
                            advancedSettings: {
                                ...nodeContent.advancedSettings,
                                executeFunctions: selectedValues
                            }
                        })}
                    />
                </div>

                <div className="flex items-center justify-between my-4">
                    <p className="text-sm text-nodeSettings">
                        Restrict answer size
                    </p>
                    <Input
                        type="number"
                        value={nodeContent.advancedSettings.answerSize}
                        onChange={(e) => onChangeData(selectedNode, {
                            ...nodeContent,
                            advancedSettings: {
                                ...nodeContent.advancedSettings,
                                answerSize: Number(e.target.value)
                            }
                        })}
                        className="w-[90px] h-[34px] ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent focus:border-indigo-500"
                    />
                </div>

                <CustomSlider
                    value={nodeContent.advancedSettings.temprature}
                    onChange={(e) => onChangeData(selectedNode, {
                        ...nodeContent,
                        advancedSettings: {
                            ...nodeContent.advancedSettings,
                            temprature: e.target.value
                        }
                    })}
                />

                <div className="flex items-center justify-between my-5">
                    <p className="text-sm text-nodeSettings">
                        chunks
                    </p>
                    <CustomSelect
                        data={chunks}
                        onChange={(val) => onChangeData(selectedNode, {
                            ...nodeContent,
                            advancedSettings: {
                                ...nodeContent.advancedSettings,
                                chunks: Number(val)
                            }
                        })}
                        triggerName={`${nodeContent.advancedSettings.chunks}` || "Select"}
                        className="w-[90px] h-[33px]"
                    />
                </div>

                <div className="flex items-center justify-between mb-5 mt-6">
                    <p className="text-sm text-nodeSettings">
                        Ask for feedback
                    </p>
                    <label
                        htmlFor={'feedback'}
                        className="switch cursor-pointer" >
                        <input
                            type="checkbox"
                            id={'feedback'}
                            onChange={(e) => onChangeData(selectedNode, {
                                ...nodeContent,
                                advancedSettings: {
                                    ...nodeContent.advancedSettings,
                                    feedback: e.target.checked
                                }
                            })}
                            checked={Boolean(nodeContent.advancedSettings.feedback)}
                        />
                        <span className="slider round" />
                    </label>
                </div>

                <div className="flex items-center justify-between my-4">
                    <p className="text-sm text-nodeSettings">
                        Answer source
                    </p>
                    <label
                        htmlFor={'answer-source'}
                        className="switch cursor-pointer" >
                        <input
                            type="checkbox"
                            id={'answer-source'}
                            onChange={(e) => onChangeData(selectedNode, {
                                ...nodeContent,
                                advancedSettings: {
                                    ...nodeContent.advancedSettings,
                                    answerSource: e.target.checked
                                }
                            })}
                            checked={Boolean(nodeContent.advancedSettings.answerSource)}
                        />
                        <span className="slider round" />
                    </label>
                </div>
            </div>
        )
    )
}

export default AdvancedSettings