import useFlowStore from '@/app/dashboard/components/reactflow/reactflowstate/store';
import { IOptionsNodeContent, IOptionsWhatsapStore } from '@/types/workflows/nodes/options/inbound/options-whatsapp';
import { Node } from '@xyflow/react';
import { ObjectId } from 'bson';
import { create } from 'zustand';

const useOptionsWhatsappInbound = create<IOptionsWhatsapStore>((set, get) => {
    return {
        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as IOptionsNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IOptionsNodeContent);

                clonedNodeContent.name = name;

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        onChangeData: (node: Node, value: any) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent);

                Object.assign(clonedNodeContent, value);

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        addItem: (node: Node) => {
            const { updateNodeContent, saveWorkflow, addOption } = useFlowStore.getState();

            if ((node.data.nodeContent as IOptionsNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IOptionsNodeContent);

                const option = addOption(node);
                console.log(option)

                const newItem = {
                    id: new ObjectId().toString(),
                    item: "",
                    nextNodeId: option,
                };
                console.log("from add option button")
                console.log(newItem)
                clonedNodeContent.optionItems?.push(newItem)

                updateNodeContent({ ...clonedNodeContent, optionItems: clonedNodeContent.optionItems }, node.id);
                saveWorkflow();
            }
        },

        deleteItem: (node: Node, id: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            const clonedNodeContent = structuredClone(node.data.nodeContent);
            if (clonedNodeContent) {
                const optionItems = (clonedNodeContent as IOptionsNodeContent).optionItems?.filter(
                    (item) => item.id !== id
                );

                updateNodeContent({ ...clonedNodeContent, optionItems }, node.id);
                saveWorkflow();
            }
        }
    }
});

export default useOptionsWhatsappInbound;