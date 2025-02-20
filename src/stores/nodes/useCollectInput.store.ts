import { create } from "zustand";
import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { ICollectInputNodeContent, ICollectInputStore } from "@/types/workflows/nodes/inputCollect.content";
import { Node } from "@xyflow/react";

const useCollectInputStore = create<ICollectInputStore>((set, get) => {

    return {
        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as ICollectInputNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ICollectInputNodeContent);

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


export default useCollectInputStore;