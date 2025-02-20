import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { create } from "zustand";
import { Node } from "@xyflow/react";
import { ICollectFileNodeContent, ICollectFileStore } from "@/types/workflows/nodes/collectFile";

const useCollectFileStore = create<ICollectFileStore>((set, get) => {

    return {
        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as ICollectFileNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ICollectFileNodeContent);

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
                    question: clonedNodeContent.question,
                    variable: clonedNodeContent.variable
                }, node.id);
                saveWorkflow();
            }
        }

    }
});


export default useCollectFileStore;