import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { IJumpNodeContent, IJumpStore } from "@/types/workflows/nodes/jump";
import { Node } from "@xyflow/react";
import { create } from "zustand";

const useJumpStore = create<IJumpStore>((set) => {

    return {
        getNodes: () => {
            const { nodes } = useFlowStore.getState();
            return nodes;
        },

        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as IJumpNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IJumpNodeContent);

                clonedNodeContent.name = name;

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        onChangeData: (node: Node, value) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = JSON.parse(JSON.stringify(node.data.nodeContent));

                Object.assign(clonedNodeContent, value);

                updateNodeContent({
                    node: clonedNodeContent.node
                }, node.id);
                saveWorkflow();
            }
        }
    }
});

export default useJumpStore;