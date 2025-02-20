import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { IJavaScriptNodeContent, IJavaScriptStore } from "@/types/workflows/nodes/javaSript.content";
import { Node } from "@xyflow/react";
import { create } from "zustand";

const useJavascripStore = create<IJavaScriptStore>((set) => {
    return {
        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as IJavaScriptNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IJavaScriptNodeContent);

                clonedNodeContent.name = name;

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        onChangeData: (node: Node, code: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();
            if (node.data.nodeContent) {
                const clonedNodeContent = JSON.parse(JSON.stringify(node.data.nodeContent));
                if (code) clonedNodeContent.code = code;

                console.log("clonedNodeContent", clonedNodeContent);
                updateNodeContent(clonedNodeContent, node.id);
                saveWorkflow();
            }
        }
    }

})


export default useJavascripStore;