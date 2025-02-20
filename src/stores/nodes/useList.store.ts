import useFlowStore from '@/app/dashboard/components/reactflow/reactflowstate/store';
import { Category, IListNodeContent, IListStore, Item } from '@/types/workflows/nodes/list.content';
import { Node } from '@xyflow/react';
import { ObjectId } from 'bson';
import { create } from 'zustand';



const useListContentStore = create<IListStore>((set) => {
    return {
        visibleItemId: null,
        toggleVisibleItem: (id: string | null) => set({ visibleItemId: id }),

        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as IListNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IListNodeContent);

                clonedNodeContent.name = name;

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        addItem: (node: Node) => {
            const { updateNodeContent, saveWorkflow, addOption } = useFlowStore.getState();

            if (node.data.nodeContent as IListNodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IListNodeContent);
                const optionId = addOption(node)


                const newItem: Item = {
                    id: new ObjectId().toHexString(),
                    name: `Item ${clonedNodeContent.items.length + 1}`,
                    description: '',
                    category: null,
                    nextNodeId: optionId,
                }

                clonedNodeContent.items.push(newItem);

                updateNodeContent({ ...clonedNodeContent, items: clonedNodeContent.items }, node.id);
                saveWorkflow();
            }
        },

        deleteItem: (node: Node, itemId: string) => {
            const { updateNodeContent, saveWorkflow, deleteOneOption } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IListNodeContent);

                const chosenItem = clonedNodeContent.items.find((item: Item) => item.id === itemId);

                chosenItem && deleteOneOption(chosenItem.nextNodeId);

                clonedNodeContent.items = clonedNodeContent.items.filter(
                    (item: Item) => item.id !== itemId
                );

                updateNodeContent({ ...clonedNodeContent, items: clonedNodeContent.items }, node.id);
                saveWorkflow();
            }
        },

        addCategory: (node: Node) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent as IListNodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IListNodeContent);

                const newCategory: Category = {
                    id: new ObjectId().toHexString(),
                    name: '',
                }

                clonedNodeContent.categories && clonedNodeContent.categories.push(newCategory);

                updateNodeContent({ ...clonedNodeContent, categories: clonedNodeContent.categories }, node.id);
                saveWorkflow();
            }
        },

        deleteCategory: (node: Node, categoryId: string) => {
            const { updateNodeContent, saveWorkflow, deleteOneOption } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IListNodeContent);

                clonedNodeContent.categories = clonedNodeContent.categories && clonedNodeContent.categories.filter(
                    (c) => c.id !== categoryId
                );

                updateNodeContent({ ...clonedNodeContent, categories: clonedNodeContent.categories }, node.id);
                saveWorkflow();
            }
        },

        onChangeData: (node: Node, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IListNodeContent);

                Object.assign(clonedNodeContent, values);

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        onChangeItem: (node: Node, itemId: string, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IListNodeContent);

                const chosenItem = clonedNodeContent.items.find((item) => item.id === itemId);

                chosenItem && Object.assign(chosenItem, values);

                updateNodeContent({ ...clonedNodeContent, items: clonedNodeContent.items }, node.id);
                saveWorkflow();
            }
        },

        onChangeCategory: (node: Node, categoryId: string, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IListNodeContent);

                const chosenCategory = clonedNodeContent.categories && clonedNodeContent.categories.find((c) => c.id === categoryId);

                chosenCategory && Object.assign(chosenCategory, values);

                updateNodeContent({ ...clonedNodeContent, categories: clonedNodeContent.categories }, node.id);
                saveWorkflow();
            }
        }
    }
});

export default useListContentStore;