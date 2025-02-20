import useFlowStore from '@/app/dashboard/components/reactflow/reactflowstate/store';
import { IWhatsappflowNodeContent, IWhatsappflowStore } from '@/types/workflows/nodes/whatsappflow/inbound-whatsappflow';
import { Node } from '@xyflow/react';
import { ObjectId } from 'bson';
import { create } from 'zustand';

const useWhatsappFlowStore = create<IWhatsappflowStore>((set, get) => {
    return {
        header: false,
        toggleHeader: (flag: boolean) => set({ header: flag }),

        footer: false,
        toggleFooter: (flag: boolean) => set({ footer: flag }),

        onChangeData: (node: Node, values: any) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            const clonedNodeContent = structuredClone(node.data.nodeContent as IWhatsappflowNodeContent);

            if (node.data.nodeContent) {
                Object.assign(clonedNodeContent, values);

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IWhatsappflowNodeContent);

                clonedNodeContent.name = name;

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        addData: (node: Node) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IWhatsappflowNodeContent);

                const item = {
                    id: new ObjectId().toHexString(),
                    variable: "",
                    value: ""
                };

                clonedNodeContent.data.push(item);

                updateNodeContent({ ...clonedNodeContent, data: clonedNodeContent.data }, node.id);
                saveWorkflow();
            }
        },

        deleteItem: (node: Node, id: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            const clonedNodeContent = structuredClone(node.data.nodeContent);
            if (clonedNodeContent) {
                const data = (clonedNodeContent as IWhatsappflowNodeContent).data.filter(
                    (item) => item.id !== id
                );

                updateNodeContent({ ...clonedNodeContent, data }, node.id);
                saveWorkflow();
            }
        },
        addResponse: (node: Node) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IWhatsappflowNodeContent);

                const item = {
                    id: new ObjectId().toHexString(),
                    response: "",
                    variable: "",
                };

                clonedNodeContent.savedResponse.push(item);

                updateNodeContent({ ...clonedNodeContent, savedResponse: clonedNodeContent.savedResponse }, node.id);
                saveWorkflow();
            }
        },

        deleteResponse: (node: Node, id: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            const clonedNodeContent = structuredClone(node.data.nodeContent);
            if (clonedNodeContent) {
                const savedResponse = (clonedNodeContent as IWhatsappflowNodeContent).savedResponse.filter(
                    (item) => item.id !== id
                );

                updateNodeContent({ ...clonedNodeContent, savedResponse }, node.id);
                saveWorkflow();
            }
        }
    }
});

export default useWhatsappFlowStore;