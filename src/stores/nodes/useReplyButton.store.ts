import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { create } from "zustand";
import { ObjectId } from "bson";
import { IReplyButtonNodeContent, IReplyButtonStore } from '@/types/workflows/nodes/replyButton.content';
import { Node } from "@xyflow/react";
import { uploadFile } from "@/helpers/uploadFile";

const useReplyButtonStore = create<IReplyButtonStore>((set) => {

    return {
        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as IReplyButtonNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IReplyButtonNodeContent);

                clonedNodeContent.name = name;

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        addButton: (node: Node) => {
            const { updateNodeContent, saveWorkflow, addOption } = useFlowStore.getState();

            if ((node.data.nodeContent as IReplyButtonNodeContent)) {
                const clonedNodeContent: IReplyButtonNodeContent = JSON.parse(JSON.stringify((node.data.nodeContent as IReplyButtonNodeContent)));

                const option = addOption(node);

                const newReplyAction = {
                    type: "reply",
                    reply: {
                        id: new ObjectId().toHexString(),
                        title: `Button ${clonedNodeContent.interactive.action.buttons.length + 1}`
                    },
                    nextNodeId: option
                };

                clonedNodeContent.interactive.action.buttons.push(newReplyAction);
                console.log(clonedNodeContent)

                updateNodeContent({ interactive: clonedNodeContent.interactive }, node.id);
                saveWorkflow();
            }
        },

        deleteButton: (node: Node, buttonId) => {
            const { updateNodeContent, saveWorkflow, deleteOneOption } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = JSON.parse(JSON.stringify(node.data.nodeContent));

                const chosenButton = clonedNodeContent.interactive.action.buttons.find((button: any) => button.reply.id === buttonId);

                deleteOneOption(chosenButton.nextNodeId);

                clonedNodeContent.interactive.action.buttons = clonedNodeContent.interactive.action.buttons.filter(
                    (button: any) => button.reply.id !== buttonId
                );

                updateNodeContent({ interactive: clonedNodeContent.interactive }, node.id);
                saveWorkflow();
            }
        },

        handleFileChange: async (node, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();



            const clonedNodeContent = structuredClone(node.data.nodeContent as IReplyButtonNodeContent);

            // Ensure the `file` object exists within `clonedNodeContent`
            if (!clonedNodeContent.interactive.header.file) {
                clonedNodeContent.interactive.header.file = {
                    id: new ObjectId().toHexString(),
                    name: "",
                    s3Url: ""
                };
            }
            console.log(values);
            console.log(values.file);
            const uploadedFile = await uploadFile(values.interactive.header.file);

            // Update the file properties
            clonedNodeContent.interactive.header.file.name = uploadedFile.name;
            clonedNodeContent.interactive.header.file.s3Url = uploadedFile.url;

            updateNodeContent({
                interactive: clonedNodeContent.interactive
            }, node.id);
            saveWorkflow();
        },



        onChangeData: (node: Node, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {


                const clonedNodeContent = structuredClone(node.data.nodeContent as IReplyButtonNodeContent);

                Object.assign(clonedNodeContent, values);

                updateNodeContent({
                    interactive: clonedNodeContent.interactive
                }, node.id);
                saveWorkflow();
            }
        }
    }
});


export default useReplyButtonStore;