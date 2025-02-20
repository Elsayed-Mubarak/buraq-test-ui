import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { IAnswerAiWhatsappNodeContent, IAnswerAiWhatsappStore } from "@/types/workflows/nodes/answer-ai/inbound/whatsapp";
import { Node } from "@xyflow/react";
import { create } from "zustand";

const useAnswerAIWhatsappStore = create<IAnswerAiWhatsappStore>((set) => {
    return {
        values: [],

        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as IAnswerAiWhatsappNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IAnswerAiWhatsappNodeContent);

                clonedNodeContent.name = name;

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        onChangeData: (node: Node, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();
            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent);

                Object.assign(clonedNodeContent, values)

                updateNodeContent(clonedNodeContent, node.id);
                saveWorkflow();
            }
        }
    }
}

)


export default useAnswerAIWhatsappStore;