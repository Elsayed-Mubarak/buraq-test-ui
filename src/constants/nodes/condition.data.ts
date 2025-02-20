import { ObjectId } from "bson";
import { ConditionNodeContent, SubCondition } from "../../types/workflows/nodes/condition.content";

export const subConditionInitialData: SubCondition = {
    id: new ObjectId().toHexString(),
    variable: "",
    operator: null,
    value: "",
}


export const conditionIntitalData: ConditionNodeContent = {
    id: new ObjectId().toHexString(),
    name: "Condition",
    conditions: [
        {
            id: new ObjectId().toHexString(),
            name: "Condition 1",
            subConditions: [
                subConditionInitialData
            ],
            nextNodeId: "",
            isDefault: false,
            conditionState: "any"
        },
        {
            id: new ObjectId().toHexString(),
            name: "Condition 2",
            subConditions: [
                subConditionInitialData
            ],
            nextNodeId: "",
            isDefault: false,
            conditionState: "any"
        },
        {
            id: new ObjectId().toHexString(),
            name: "Condition 3",
            subConditions: [
                subConditionInitialData
            ],
            nextNodeId: "",
            isDefault: false,
            conditionState: "any"
        },
    ],
}


