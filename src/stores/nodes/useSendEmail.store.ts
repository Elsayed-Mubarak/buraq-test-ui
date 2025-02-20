import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { IEmailNodeContent, IEmailStore } from '@/types/workflows/nodes/email.content.d';
import { create } from "zustand";
import { Node } from "@xyflow/react";


const useEmailStore = create<IEmailStore>((set, get) => {
    return {
        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as IEmailNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IEmailNodeContent);

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
                    email: clonedNodeContent.email,
                    cc: clonedNodeContent.cc,
                    bcc: clonedNodeContent.bcc,
                    subject: clonedNodeContent.subject,
                    isTranscript: clonedNodeContent.isTranscript,
                    body: clonedNodeContent.body
                }, node.id);
                saveWorkflow();
            }
        },
    };
});

export default useEmailStore;



