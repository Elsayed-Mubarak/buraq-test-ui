import { useState, useEffect } from "react";
import { OperatorsEnum } from "../types/workflow";
import useFlowStore from "../app/dashboard/components/reactflow/reactflowstate/store";
import { ObjectId } from "bson";


type SubCondition = {
    id: string;
    variable: string;
    operator: OperatorsEnum | null;
    value: string | string[];
};

type Condition = {
    id: string;
    name: string;
    subConditions: SubCondition[];
};

const newSubCondition = {
    id: new ObjectId().toHexString(),
    variable: "",
    value: "",
    operator: null,
};

const useConditionLogic = () => {
    const [variables, setVariables] = useState<any[]>([]);
    const [conditionRows, setConditionRows] = useState<Condition[]>([
        {
            id: new ObjectId().toHexString(),
            name: "Condition 1",
            subConditions: [newSubCondition],
        },
        {
            id: new ObjectId().toHexString(),
            name: "Condition 2",
            subConditions: [newSubCondition],
        },
        {
            id: new ObjectId().toHexString(),
            name: "Condition 3",
            subConditions: [newSubCondition],
        },
    ]);
    const [visibleConditionId, setVisibleConditionId] = useState<string | null>(null);

    const addConditionRow = () => {
        setConditionRows((prevRows) => [
            ...prevRows,
            {
                id: new ObjectId().toHexString(),
                name: `Condition ${prevRows.length + 1}`,
                subConditions: [
                    {
                        id: new ObjectId().toHexString(),
                        variable: "",
                        value: "",
                        operator: null,
                    },
                ],
            },
        ]);
    };

    const deleteConditionRow = (conditionId: string) => {
        setConditionRows((prevRows) =>
            prevRows.filter((row) => row.id !== conditionId)
        );
    };

    const addSubCondition = (conditionId: string) => {
        setConditionRows((prevRows) =>
            prevRows.map((row) =>
                row.id === conditionId
                    ? {
                        ...row,
                        subConditions: [
                            ...row.subConditions,
                            {
                                id: new ObjectId().toHexString(),
                                variable: "",
                                value: "",
                                operator: null,
                            },
                        ],
                    }
                    : row
            )
        );
    };

    const deleteSubCondition = (conditionId: string, subConditionId: string) => {
        setConditionRows((prevRows) =>
            prevRows.map((row) =>
                row.id === conditionId
                    ? {
                        ...row,
                        subConditions: row.subConditions.filter(
                            (sub) => sub.id !== subConditionId
                        ),
                    }
                    : row
            )
        );
    };

    const onChangeSubCondition = (
        nodeId: string,
        conditionId: string,
        subConditionId: string,
        updates: Partial<SubCondition>
    ) => {
        setConditionRows((prevRows) => {
            const updatedRows = prevRows.map((row) =>
                row.id === conditionId
                    ? {
                        ...row,
                        subConditions: row.subConditions.map((sub) =>
                            sub.id === subConditionId ? { ...sub, ...updates } : sub
                        ),
                    }
                    : row
            );

            const { updateNodeContent } = useFlowStore.getState();
            updateNodeContent(updatedRows, nodeId);

            return updatedRows;
        });
    };

    return {
        variables,
        setVariables,
        conditionRows,
        visibleConditionId,
        addConditionRow,
        deleteConditionRow,
        setVisibleConditionId,
        addSubCondition,
        deleteSubCondition,
        onChangeSubCondition,
    };
};

export default useConditionLogic;