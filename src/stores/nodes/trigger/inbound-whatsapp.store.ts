import useFlowStore from '@/app/dashboard/components/reactflow/reactflowstate/store';
import { axiosInstance } from '@/lib/axios';
import { TriggerInboundFiltersEnum } from '@/types/workflow';
import { ITriggerWhatsappNodeContent, ITriggerWhatsapStore } from '@/types/workflows/nodes/trigger/inbound-whatsapp';
import { Node } from '@xyflow/react';
import { ObjectId } from 'bson';
import { create } from 'zustand';

const useTriggerWhatsappInbound = create<ITriggerWhatsapStore>((set, get) => {
    return {
        whatsappPhoneNumbers: [],

        fetchPhoneNumber: async () => {
            try {
                const res = await axiosInstance.get('api/channel/whatsapp/phonenumbers');

                if (res.status !== 200) throw new Error("Failed to fetch whatsapp numbers");

                set({ whatsappPhoneNumbers: res.data });

                return res.data;
            } catch (error) {
                throw error;
            }
        },

        onChangeData: (node: Node, values: any) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as ITriggerWhatsappNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ITriggerWhatsappNodeContent);

                Object.assign(clonedNodeContent, values);

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        onChangeFilters: (node, groupId, conditionId, filterValue) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent as ITriggerWhatsappNodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ITriggerWhatsappNodeContent);

                // Find the correct group
                clonedNodeContent.triggerBot.groups = clonedNodeContent.triggerBot.groups.map((group) => {
                    if (group.id === groupId) {
                        return {
                            ...group,
                            conditions: group.conditions.map((condition) => {
                                if (condition.id === conditionId) {
                                    return {
                                        ...condition,
                                        filterType: filterValue,
                                        valueCondition: filterValue === TriggerInboundFiltersEnum.DATE_RANGE ? "WITHIN" : "EQUALS",
                                        value: Array.isArray(condition.value) ? [] : "",
                                    };
                                }
                                return condition;
                            }),
                        };
                    }
                    return group;
                });

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        onChangeVariable: (node, id, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ITriggerWhatsappNodeContent);

                const chosenVariable = clonedNodeContent.storeVariables.injectVariables.find((item) => item.id === id);

                chosenVariable && Object.assign(chosenVariable, values);

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        onChangePayload: (node, { groupId, conditionId, payload }) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent as ITriggerWhatsappNodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ITriggerWhatsappNodeContent);

                const targetGroup = clonedNodeContent.triggerBot.groups.find((group) => group.id === groupId);

                if (targetGroup) {
                    const targetCondition = targetGroup.conditions.find((condition) => condition.id === conditionId);

                    if (targetCondition) {
                        targetCondition.value = payload;
                        updateNodeContent({ ...clonedNodeContent }, node.id);
                        saveWorkflow();
                    }
                }
            }
        },

        onChangePayloadCondition: (node, groupId, conditionId, value) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent as ITriggerWhatsappNodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ITriggerWhatsappNodeContent);

                const targetGroup = clonedNodeContent.triggerBot.groups.find((group) => group.id === groupId);

                if (targetGroup) {
                    const targetCondition = targetGroup.conditions.find((condition) => condition.id === conditionId);

                    if (targetCondition) {
                        targetCondition.valueCondition = value;
                        updateNodeContent({ ...clonedNodeContent }, node.id);
                        saveWorkflow();
                    }
                }
            }
        },

        onChangeKeyword: (node, groupId, conditionId, payload) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent as ITriggerWhatsappNodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ITriggerWhatsappNodeContent);

                const targetGroup = clonedNodeContent.triggerBot.groups.find((group) => group.id === groupId);

                if (targetGroup) {
                    const targetCondition = targetGroup.conditions.find((condition) => condition.id === conditionId);

                    if (targetCondition) {
                        targetCondition.value = payload;
                        updateNodeContent({ ...clonedNodeContent }, node.id);
                        saveWorkflow();
                    }
                }
            }
        },

        onChangeKeywordCondition: (node, groupId, conditionId, value) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent as ITriggerWhatsappNodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ITriggerWhatsappNodeContent);

                const targetGroup = clonedNodeContent.triggerBot.groups.find((group) => group.id === groupId);

                if (targetGroup) {
                    const targetCondition = targetGroup.conditions.find((condition) => condition.id === conditionId);

                    if (targetCondition) {
                        targetCondition.valueCondition = value;
                        updateNodeContent({ ...clonedNodeContent }, node.id);
                        saveWorkflow();
                    }
                }
            }
        },

        onAddAndCondition: (node, groupId) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ITriggerWhatsappNodeContent);

                const targetGroup = clonedNodeContent.triggerBot.groups.find(
                    (g) => g.id.toString() === groupId.toString()
                );

                if (targetGroup) {
                    const newConditionId = new ObjectId().toHexString();

                    const newCondition = {
                        id: newConditionId,
                        filterType: "date-range",
                        value: "",
                        valueCondition: "WITHIN",
                        nextConditionId: null,
                    };

                    if (targetGroup.conditions.length > 0) {
                        const lastCondition =
                            targetGroup.conditions[targetGroup.conditions.length - 1];
                        lastCondition.nextConditionId = newConditionId;
                    }

                    targetGroup.conditions.push(newCondition);

                    updateNodeContent({ ...clonedNodeContent }, node.id);
                    saveWorkflow();
                }
            }
        },

        onChangeDate: (node, groupId, conditionId, payload) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent as ITriggerWhatsappNodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ITriggerWhatsappNodeContent);

                const targetGroup = clonedNodeContent.triggerBot.groups.find((group) => group.id === groupId);

                if (targetGroup) {
                    const targetCondition = targetGroup.conditions.find((condition) => condition.id === conditionId);

                    if (targetCondition) {
                        targetCondition.value = payload;
                        updateNodeContent({ ...clonedNodeContent }, node.id);
                        saveWorkflow();
                    }
                }
            }
        },

        onAddOrGroup: (node) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent as ITriggerWhatsappNodeContent) {
                const clonedNodeContent = structuredClone(
                    node.data.nodeContent as ITriggerWhatsappNodeContent
                );

                const newGroup = {
                    id: new ObjectId().toHexString(),
                    conditions: [
                        {
                            id: new ObjectId().toHexString(),
                            filterType: "date-range",
                            value: "",
                            valueCondition: "WITHIN",
                            nextConditionId: null,
                        },
                    ],
                    nextGroupId: null,
                };

                // Find the last group and update its `nextGroupId` to link it with the new group
                if (clonedNodeContent.triggerBot.groups.length > 0) {
                    const lastGroup =
                        clonedNodeContent.triggerBot.groups[
                        clonedNodeContent.triggerBot.groups.length - 1
                        ];
                    lastGroup.nextGroupId = newGroup.id;
                }

                clonedNodeContent.triggerBot.groups.push(newGroup);

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        onDeleteCondition: (node, groupId, conditionId) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent as ITriggerWhatsappNodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ITriggerWhatsappNodeContent);

                // Find the target group by `groupId`
                const targetGroup = clonedNodeContent.triggerBot.groups.find((group) => group.id === groupId);

                if (targetGroup) {
                    if (targetGroup.conditions.length === 1) {
                        // If the group only has one condition, remove the entire group
                        clonedNodeContent.triggerBot.groups = clonedNodeContent.triggerBot.groups.filter(
                            (group) => group.id !== groupId
                        );

                        // Update `nextGroupId` for the preceding group (if applicable)
                        clonedNodeContent.triggerBot.groups.forEach((group) => {
                            if (group.nextGroupId === groupId) {
                                group.nextGroupId = targetGroup.nextGroupId;
                            }
                        });
                    } else {
                        // Otherwise, just remove the specified condition
                        targetGroup.conditions = targetGroup.conditions.filter(
                            (condition) => condition.id !== conditionId
                        );

                        // Update `nextConditionId` for the remaining conditions
                        targetGroup.conditions.forEach((condition, index) => {
                            if (index < targetGroup.conditions.length - 1) {
                                condition.nextConditionId = targetGroup.conditions[index + 1].id;
                            } else {
                                condition.nextConditionId = null; // No next condition for the last one
                            }
                        });
                    }

                    updateNodeContent({ ...clonedNodeContent }, node.id);
                    saveWorkflow();
                } else {
                    console.error(`Group with ID ${groupId} not found`);
                }
            }
        },

        addVariable: (node: Node) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent as ITriggerWhatsappNodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ITriggerWhatsappNodeContent);

                const newVariable = {
                    id: new ObjectId().toHexString(),
                    key: '',
                    variable: ''
                };

                clonedNodeContent.storeVariables.injectVariables.push(newVariable);

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        deleteVaraible: (node: Node, variableId: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ITriggerWhatsappNodeContent);


                clonedNodeContent.storeVariables.injectVariables = clonedNodeContent.storeVariables.injectVariables.filter(
                    item => item.id !== variableId
                );

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },
    }
});


export default useTriggerWhatsappInbound;