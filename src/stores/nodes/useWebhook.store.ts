import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { create } from "zustand";
import { Node } from "@xyflow/react";
import { IWebhookNodeContent, IWebhookStore, WebhookVariable } from "@/types/workflows/nodes/webhook.content";
import { ObjectId } from "bson";

const useWebhookStore = create<IWebhookStore>((set, get) => {

    return {
        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as IWebhookNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IWebhookNodeContent);

                clonedNodeContent.name = name;

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        addVariable: (node: Node) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent as IWebhookNodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IWebhookNodeContent);

                const newVariable: WebhookVariable = {
                    id: new ObjectId().toHexString(),
                    objectPath: '',
                    variable: ''
                };

                clonedNodeContent.variables.push(newVariable);

                updateNodeContent({ ...clonedNodeContent, variables: clonedNodeContent.variables }, node.id);
                saveWorkflow();
            }
        },

        deleteVaraible: (node: Node, variableId: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IWebhookNodeContent);


                clonedNodeContent.variables = clonedNodeContent.variables.filter(
                    item => item.id !== variableId
                );

                updateNodeContent({ ...clonedNodeContent, variables: clonedNodeContent.variables }, node.id);
                saveWorkflow();
            }
        },

        onChangeTimeout: (node: Node, timeout) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IWebhookNodeContent);

                Object.assign(clonedNodeContent, timeout);

                updateNodeContent({
                    ...clonedNodeContent,
                    timeout: clonedNodeContent.timeout
                }, node.id);
                saveWorkflow();
            }
        },

        onChangeVariable: (node: Node, variableId: string, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IWebhookNodeContent);

                const chosenVariable = clonedNodeContent.variables.find((item) => item.id === variableId);

                chosenVariable && Object.assign(chosenVariable, values);

                updateNodeContent({ ...clonedNodeContent, variables: clonedNodeContent.variables }, node.id);
                saveWorkflow();
            }
        }

    }
});


export default useWebhookStore;