
import { IoIosArrowRoundBack } from "react-icons/io";
import { Button } from "../../../ui/button";
import { Condition, ConditionState } from "@/types/workflows/nodes/condition.content";
import useConditionStore from "@/stores/nodes/useCondition.store";
import useFlowStore from "../../reactflowstate/store";
import ActionButton from "@/components/workflow/nodeSettings/ActionButton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "../../../ui/select";
import { OperatorsEnum } from "@/types/workflow";
import { removeHyphen } from "@/helpers/workflow.helper";
import { Combobox } from "../../../ui/Combobox";
import { RiCloseLargeLine } from "react-icons/ri";
import VariablesDropdown from "@/components/workflow/nodeSettings/VariablesDropdown";
import { useVariablesStore } from "@/stores/settings/useVariables.store";
import { useEffect } from "react";

interface SubConditionProps {
    condition: Condition
}

export default function SubCondition({ condition }: SubConditionProps) {
    const { activeVariables } = useFlowStore();

    const {
        setVisibleConditionId,
        addSubCondition,
        deleteSubCondition,
        onChangeSubCondition,
        onChangeCondition
    } = useConditionStore();

    const { selectedNode, closePopup } = useFlowStore();

    if (!selectedNode) return null;

    const handleAddSubCondition = () => addSubCondition(selectedNode, condition.id);

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-50">
            <div className="flex items-center justify-between mb-4">
                <Button
                    className="flex w-fit items-center gap-1 px-3 py-1.5 text-[#092451] transition-colors hover:bg-gray-50 "
                    onClick={() => setVisibleConditionId(null)}
                    variant={"ghost"}
                >
                    <IoIosArrowRoundBack className="w-5 h-5" />
                    <span className="text-sm font-semibold text-[#092451]">Condition</span>
                </Button>

                <button onClick={closePopup}>
                    <RiCloseLargeLine className="w-4 h-4" />
                </button>
            </div>

            <p className="text-xs text-gray-500 mb-4">
                You can specify a set of conditions that constitute this rule. Add multiple conditions with AND/OR
            </p>

            <div className="flex items-center gap-2 my-4 text-nodeSettings">
                <span>if</span>
                <div className="flex items-center border">
                    <label
                        htmlFor="any"
                        className={`flex items-center justify-center px-4 py-1 font-semibold text-sm ${condition.conditionState === "any" && ' bg-blue-500 text-white'}`}
                    >
                        ANY
                        <input
                            id="any"
                            type="radio"
                            name="conditionState"
                            value={'any'}
                            hidden
                            onChange={(e) =>
                                onChangeCondition(selectedNode, condition.id, { conditionState: e.target.value as ConditionState })
                            }
                            className={`hidden`}
                        />
                    </label>
                    <label
                        htmlFor="all"
                        className={`flex items-center justify-center px-4 py-1 font-semibold text-sm ${condition.conditionState === "all" && ' bg-blue-500 text-white'}`}
                    >
                        ALL
                        <input
                            id="all"
                            type="radio"
                            name="conditionState"
                            value={'all'}
                            hidden
                            onChange={(e) =>
                                onChangeCondition(selectedNode, condition.id, { conditionState: e.target.value as ConditionState })
                            }
                            className={`hidden`}
                        />
                    </label>
                </div>
                <span>conditions are met</span>
            </div>

            {condition.subConditions && condition.subConditions?.map((subCondition) => (
                <div key={subCondition.id} className="relative mb-4">
                    <div
                        key={subCondition.id}
                        className="flex flex-col gap-2 border-l-2 border-blue-600 px-2"
                    >
                        <div className="bg-white relative">
                            <VariablesDropdown
                                onChange={(e) => {
                                    onChangeSubCondition(selectedNode, condition.id, subCondition.id, {
                                        variable: e.target.value as string,
                                    })
                                }}
                                triggerName={subCondition.variable as string}
                            />
                        </div>

                        <Select
                            value={Array.isArray(subCondition.value) ? subCondition.value.join(", ") : subCondition.value ?? ""}
                            onValueChange={(newValue) =>
                                onChangeSubCondition(selectedNode, condition.id, subCondition.id, {
                                    operator: newValue,
                                })
                            }
                            disabled={!subCondition.variable}
                        >
                            <SelectTrigger className="border rounded-md ring-0 ring-transparent disabled:bg-gray-400 text-sm ">
                                Operator {" "} {subCondition.operator}
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {Object.entries(OperatorsEnum).map(([key, value]) => {
                                    const val = removeHyphen(value);
                                    return (
                                        <SelectItem key={key} value={val}>
                                            {val}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>

                        {subCondition.operator && (
                            <Combobox
                                placeholder=""
                                value={Array.isArray(subCondition.value) ? subCondition.value : []}
                                onValueChange={(newValue) =>
                                    onChangeSubCondition(selectedNode, condition.id, subCondition.id, {
                                        value: newValue,
                                    })
                                }
                            />
                        )}
                    </div>
                    {condition.subConditions && condition.subConditions?.length > 1 &&
                        <ActionButton
                            action="delete"
                            handleClick={() => deleteSubCondition(selectedNode, condition.id, subCondition.id)}
                        />
                    }
                </div>
            ))}
            <ActionButton
                handleClick={handleAddSubCondition}
                action="add"
                text="Condition"
            />
        </div>
    )
}