
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../../../ui/select"
import { TriggerInboundFiltersEnum } from "../../../../../../../types/workflow"
import { Button } from "../../../../ui/button";
import useFlowStore from "../../../reactflowstate/store";
import { ITriggerWhatsappNodeContent } from "@/types/workflows/nodes/trigger/inbound-whatsapp";
import ActionButton from "@/components/workflow/nodeSettings/ActionButton";
import useTriggerWhatsappInbound from "@/stores/nodes/trigger/inbound-whatsapp.store";
import { DatePickerWithRange } from "@/components/shared/datePicker/DatePicker";
import ChipEditor from "@/components/shared/ChipEditor";

function TriggerFiltersInbound() {
    const { selectedNode } = useFlowStore();

    const {
        onDeleteCondition,
        onChangeFilters,
        onAddOrGroup,
        onAddAndCondition,
        onChangePayload,
        onChangePayloadCondition,
        onChangeKeyword,
        onChangeKeywordCondition,
        onChangeDate
    } = useTriggerWhatsappInbound();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as ITriggerWhatsappNodeContent;

    return (
        <div className="relative">
            {nodeContent.triggerBot.groups.map((group) => (
                <div key={group.id.toString()}>
                    <div className="flex flex-col border-l-[2px] border-[#343de6] px-3 py-0 pt-0">
                        {group.conditions.map((condition) => (
                            <div key={condition.id.toString()} className="relative">
                                <div className="flex flex-col gap-2">
                                    {/* Select Dropdown for Filter Type */}
                                    <Select
                                        name="filters"
                                        value={condition.filterType || "Select"}
                                        onValueChange={(val: string) => {
                                            onChangeFilters(selectedNode, group.id, condition.id, val)
                                        }}
                                    >
                                        <SelectTrigger className="mt-2 ring-0 ring-transparent text-sm text-[#092445] py-2 !h-8 border border-gray-300">
                                            {condition.filterType === TriggerInboundFiltersEnum.DATE_RANGE && "date range"}
                                            {condition.filterType === TriggerInboundFiltersEnum.KEYWORD && "keyword"}
                                            {condition.filterType === TriggerInboundFiltersEnum.BUTTON_PAYLOAD && "button payload"}
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem
                                                value={TriggerInboundFiltersEnum.DATE_RANGE}
                                                className="cursor-pointer hover:bg-gray-100"
                                            >
                                                Date range
                                            </SelectItem>
                                            <SelectItem
                                                value={TriggerInboundFiltersEnum.KEYWORD}
                                                className="cursor-pointer hover:bg-gray-100"
                                            >
                                                Keyword
                                            </SelectItem>
                                            <SelectItem
                                                value={TriggerInboundFiltersEnum.BUTTON_PAYLOAD}
                                                className="cursor-pointer hover:bg-gray-100"
                                            >
                                                Button payload
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {/* Conditional Rendering Based on Filter Type */}
                                    {condition.filterType === TriggerInboundFiltersEnum.DATE_RANGE && (
                                        <>
                                            <Select name="date-range-filters">
                                                <SelectTrigger
                                                    className="ring-0 ring-transparent text-sm text-[#092445] py-2 disabled:bg-[#f3f3f3] 
                                                    disabled:cursor-default !h-8 border border-gray-300"
                                                    disabled
                                                >
                                                    is within
                                                </SelectTrigger>
                                            </Select>
                                            <DatePickerWithRange
                                                value={condition.value}
                                                onChange={(val) => onChangeDate(selectedNode, group.id, condition.id, val)}
                                            />
                                        </>
                                    )}
                                    {condition.filterType === TriggerInboundFiltersEnum.KEYWORD && (
                                        <div>
                                            <Select
                                                onValueChange={(val) => onChangeKeywordCondition(selectedNode, group.id, condition.id, val)}>
                                                <SelectTrigger className="ring-0 ring-transparent text-sm text-nodeSettings py-2 disabled:bg-gray-300">
                                                    {condition?.valueCondition == "EQUALS" && "equals to"}
                                                    {condition?.valueCondition == "NOT_EQUALS" && "not equals to"}
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem
                                                        value="EQUALS"
                                                        className="cursor-pointer  text-[#092445]"
                                                    >
                                                        equals to
                                                    </SelectItem>
                                                    <SelectItem
                                                        value="NOT_EQUALS"
                                                        className="cursor-pointer  text-[#092445]"
                                                    >
                                                        not equals to
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <ChipEditor
                                                onChange={(value) => onChangeKeyword(selectedNode,
                                                    group.id,
                                                    condition.id,
                                                    value
                                                )}
                                                value={condition.value}
                                            />
                                        </div>
                                    )}


                                    {/* Button Payload */}
                                    {condition.filterType === TriggerInboundFiltersEnum.BUTTON_PAYLOAD && (
                                        <div>
                                            <Select
                                                onValueChange={(val) => onChangePayloadCondition(selectedNode, group.id, condition.id, val)}>
                                                <SelectTrigger className="ring-0 ring-transparent text-sm text-nodeSettings py-2 disabled:bg-gray-300">
                                                    {condition?.valueCondition == "EQUALS" && "equals to"}
                                                    {condition?.valueCondition == "NOT_EQUALS" && "not equals to"}
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem
                                                        value="EQUALS"
                                                        className="cursor-pointer  text-[#092445]"
                                                    >
                                                        equals to
                                                    </SelectItem>
                                                    <SelectItem
                                                        value="NOT_EQUALS"
                                                        className="cursor-pointer  text-[#092445]"
                                                    >
                                                        not equals to
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <ChipEditor
                                                onChange={(value) => onChangePayload(selectedNode, {
                                                    groupId: group.id,
                                                    conditionId: condition.id,
                                                    payload: value
                                                })}
                                                value={condition.value}
                                            />
                                        </div>
                                    )}
                                </div>
                                {condition.nextConditionId && (
                                    <div className="text-blue-700 text-center w-full text-sm mt-3 mb-1">
                                        AND
                                    </div>
                                )}
                                {(nodeContent.triggerBot.groups.length > 1 || group.conditions.length > 1) && (
                                    <ActionButton
                                        action="delete"
                                        handleClick={() => onDeleteCondition(selectedNode, group.id, condition.id)}
                                    />
                                )}
                            </div>

                        ))}
                    </div>

                    < div className="flex gap-2 mt-3" >
                        <Button
                            className="py-1 px-3 font-semibold text-[#092445] border border-gray-300 hover:bg-gray-50 rounded-md w-14"
                            onClick={() => onAddAndCondition(selectedNode, group.id)}
                        >
                            AND
                        </Button>
                        <Button
                            className="py-1 px-3 font-semibold text-[#092445] border border-gray-300 hover:bg-gray-50 rounded-md w-14"
                            onClick={() => onAddOrGroup(selectedNode)}
                        >
                            OR
                        </Button>
                    </div>
                    {group.nextGroupId && (
                        <div className="text-blue-700 text-center w-full relative h-[1px] bg-blue-700 my-4">
                            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white w-10 py-1 z-10 text-sm">OR</span>
                        </div>
                    )}
                </div >
            ))}
        </div >
    );
}


export default TriggerFiltersInbound