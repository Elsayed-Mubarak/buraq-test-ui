import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { create } from "zustand";
import { ObjectId } from "bson";
import { Node } from "@xyflow/react";
import { HumanNodeContent, IHumanStore, Rule } from "@/types/workflows/nodes/human.content";

const useHumanStore = create<IHumanStore>((set) => {
    return {
        visibleRuleId: null,
        setVisibleRuleId: (conditionId: string | null) => set({ visibleRuleId: conditionId }),

        showSettings: false,
        toggleShowSettings: (flag: boolean) => set({ showSettings: flag }),

        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as HumanNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as HumanNodeContent);

                clonedNodeContent.name = name;

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        addRule: (node: Node) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent as HumanNodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as HumanNodeContent);

                const newRule: Rule = {
                    id: new ObjectId().toHexString(),
                    name: `Rule ${clonedNodeContent.rules.length + 1}`,
                    assignTo: {
                        id: '',
                        name: '',
                        profilePicture: '',
                        type: 'teammates'
                    },
                    waittingTime: 30
                };

                clonedNodeContent.rules.push(newRule);

                updateNodeContent({ ...clonedNodeContent, rules: clonedNodeContent.rules }, node.id);
                saveWorkflow();
            }
        },

        deleteRule: (node: Node, ruleId: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as HumanNodeContent);


                clonedNodeContent.rules = clonedNodeContent.rules.filter(
                    (rule: Rule) => rule.id !== ruleId
                );

                updateNodeContent({ ...clonedNodeContent, rules: clonedNodeContent.rules }, node.id);
                saveWorkflow();
            }
        },

        onChangeData: (node: Node, ruleId: string, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as HumanNodeContent);

                const chosenRule = clonedNodeContent.rules.find((rule) => rule.id === ruleId);

                chosenRule && Object.assign(chosenRule, values);

                updateNodeContent({ ...clonedNodeContent, rules: clonedNodeContent.rules }, node.id);
                saveWorkflow();
            }
        },

        onChangeSettings: (node: Node, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as HumanNodeContent);
                const advancedSettings = clonedNodeContent.advancedSettings

                Object.assign(advancedSettings, values);

                updateNodeContent({ ...clonedNodeContent, advancedSettings: clonedNodeContent.advancedSettings }, node.id);
                saveWorkflow();
            }
        }

    }

});

export default useHumanStore;