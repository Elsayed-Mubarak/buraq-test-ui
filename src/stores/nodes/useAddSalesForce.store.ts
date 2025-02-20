import useFlowStore from '@/app/dashboard/components/reactflow/reactflowstate/store';
import { ISalesforce, ISalesForceStore } from '@/types/workflows/nodes/salesforce';
import { Node } from '@xyflow/react';
import { create } from 'zustand';



const useAddSalesForceStore = create<ISalesForceStore>((set) => ({
    changeName: (node: Node, name: string) => {
        const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

        if ((node.data.nodeContent as ISalesforce)) {
            const clonedNodeContent = structuredClone(node.data.nodeContent as ISalesforce);

            clonedNodeContent.name = name;

            updateNodeContent({ ...clonedNodeContent }, node.id);
            saveWorkflow();
        }
    },

    onChangeData: (node: Node, values) => {
        const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

        if (node.data.nodeContent) {
            const clonedNodeContent = JSON.parse(JSON.stringify(node.data.nodeContent));

            Object.assign(clonedNodeContent, values);

            updateNodeContent({
                accountName: clonedNodeContent.accountName,
                organizationId: clonedNodeContent.organizationId
            }, node.id);
            saveWorkflow();
        }
    }

}));

export default useAddSalesForceStore;