import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { create } from "zustand";
import { ObjectId } from "bson";
import { Node } from "@xyflow/react";
import { Condition, ConditionNodeContent, ConditionState, IConditionStore, SubCondition } from "@/types/workflows/nodes/condition.content";
import { subConditionInitialData } from "@/constants/nodes/condition.data";

const useConditionStore = create<IConditionStore>((set) => {
    return {
        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as ConditionNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ConditionNodeContent);

                clonedNodeContent.name = name;

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        visibleConditionId: null,
        setVisibleConditionId: (conditionId: string | null) => set({ visibleConditionId: conditionId }),

        addCondition: (node: Node) => {
            const { updateNodeContent, saveWorkflow, addOption } = useFlowStore.getState();


            if (node.data.nodeContent) {
                const clonedNodeContent = JSON.parse(JSON.stringify(node.data.nodeContent));
                const option = addOption(node);

                const newCondition: Condition = {
                    id: new ObjectId().toHexString(),
                    name: `Condition ${clonedNodeContent.conditions.length + 1}`,
                    subConditions: [subConditionInitialData],
                    isDefault: false,
                    nextNodeId: option,
                    conditionState: "any"
                };

                clonedNodeContent.conditions.push(newCondition);

                updateNodeContent({ conditions: clonedNodeContent.conditions }, node.id);
                saveWorkflow();
            }
        },

        deleteCondition: (node: Node, conditionId: string) => {
            const { updateNodeContent, saveWorkflow, deleteOneOption } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = JSON.parse(JSON.stringify(node.data.nodeContent));

                const chosenCondition: Condition = clonedNodeContent.conditions.find((condition: Condition) => condition.id === conditionId);

                deleteOneOption(chosenCondition.nextNodeId);

                clonedNodeContent.conditions = clonedNodeContent.conditions.filter(
                    (condition: Condition) => condition.id !== conditionId
                );

                console.log(chosenCondition);


                updateNodeContent({ conditions: clonedNodeContent.conditions }, node.id);
                saveWorkflow();
            }
        },

        addSubCondition: (node: Node, conditionId: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent as ConditionNodeContent) {
                const clonedNodeContent = JSON.parse(JSON.stringify(node.data.nodeContent as ConditionNodeContent));

                const chosenCondition = clonedNodeContent.conditions.find((condition: Condition) => condition.id === conditionId);

                const newSubCondition = { ...subConditionInitialData, id: new ObjectId().toHexString() };
                chosenCondition.subConditions.push(newSubCondition);

                updateNodeContent({ conditions: clonedNodeContent.conditions }, node.id);
                saveWorkflow();
            }
        },

        deleteSubCondition: (node: Node, conditionId: string, subConditionId: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = JSON.parse(JSON.stringify(node.data.nodeContent));

                const chosenCondition = clonedNodeContent.conditions.find((condition: Condition) => condition.id === conditionId);
                chosenCondition.subConditions = chosenCondition.subConditions.filter(
                    (subCondition: SubCondition) => subCondition.id !== subConditionId
                );

                updateNodeContent({ conditions: clonedNodeContent.conditions }, node.id);
                saveWorkflow();
            }
        },

        onChangeSubCondition: (node: Node, conditionId: string, subConditionId: string, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = JSON.parse(JSON.stringify(node.data.nodeContent));

                const chosenCondition = clonedNodeContent.conditions.find((condition: Condition) => condition.id === conditionId);

                const chosenSubCondition = chosenCondition.subConditions.find(
                    (subCondition: SubCondition) => subCondition.id === subConditionId
                );

                Object.assign(chosenSubCondition, values);

                updateNodeContent({ conditions: clonedNodeContent.conditions }, node.id);
                saveWorkflow();
            }
        },

        onChangeCondition: (node: Node, conditionId: string, value) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = JSON.parse(JSON.stringify(node.data.nodeContent));

                const chosenCondition = clonedNodeContent.conditions.find(
                    (condition: Condition) => condition.id === conditionId
                );

                if (chosenCondition) {
                    Object.assign(chosenCondition, value);
                }

                updateNodeContent({ conditions: clonedNodeContent.conditions }, node.id);
                saveWorkflow();
            }
        }
    }

});

export default useConditionStore;