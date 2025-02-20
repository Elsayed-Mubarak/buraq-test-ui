import { create } from "zustand";
import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { Node } from "@xyflow/react";
import { ISendMessageNodeContent, ISendMessageStore, Message, MessageFile } from "@/types/workflows/nodes/message";
import { ObjectId } from "bson";
import { uploadFile } from "@/helpers/uploadFile";

const useSendMessageStore = create<ISendMessageStore>((set, get) => {

    return {
        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as ISendMessageNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ISendMessageNodeContent);

                clonedNodeContent.name = name;

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },
        addFile: (node: Node) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as ISendMessageNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ISendMessageNodeContent);

                const newFile: MessageFile = {
                    id: new ObjectId().toString(),
                    name: '',
                    s3Url: '',
                };

                clonedNodeContent.files?.push(newFile)

                updateNodeContent({ ...clonedNodeContent, files: clonedNodeContent.files }, node.id);
                saveWorkflow();
            }
        },

        addMessage: (node: Node) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as ISendMessageNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as ISendMessageNodeContent);

                const newMsg: Message = {
                    id: new ObjectId().toHexString(),
                    text: 'Hi there! My name is...',
                    // fallbacks: []
                };

                clonedNodeContent.messages.push(newMsg);

                updateNodeContent({ ...clonedNodeContent, messages: clonedNodeContent.messages }, node.id);
                saveWorkflow();
            }
        },

        onChangeData: async (node: Node, messageId: string, fileId: string, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            const clonedNodeContent = structuredClone(node.data.nodeContent);
            if (clonedNodeContent) {
                if (messageId) {
                    const chosenMessage = (clonedNodeContent as ISendMessageNodeContent).messages.find(
                        (message) => message.id === messageId
                    );
                    if (chosenMessage) {
                        chosenMessage.text = values.text as string;
                    }
                }

                if (fileId) {
                    const chosenFile = (clonedNodeContent as ISendMessageNodeContent).files?.find(
                        (file) => file.id === fileId
                    );
                    if (chosenFile) {
                        if (values.file) {
                            const file = await uploadFile(values.file);
                            chosenFile.s3Url = file.url;
                            chosenFile.name = file.name;
                        } else {
                            chosenFile.s3Url = '';
                            chosenFile.name = '';
                        }
                    }
                }

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },
        // onChangeFallbackData: async (node: Node, messageId: string, fallbackValue) => {
        //     const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

        //     const clonedNodeContent = structuredClone(node.data.nodeContent);
        //     if (clonedNodeContent) {
        //         if (messageId) {
        //             const chosenMessage = (clonedNodeContent as ISendMessageNodeContent).messages.find(
        //                 (message) => message.id === messageId
        //             );
        //             if (chosenMessage) {
        //                 let fallback = chosenMessage.fallbacks.find((item) => item.id === messageId);
        //                 if (fallback) {
        //                     fallback.id = messageId;
        //                     fallback.fallback = fallbackValue || "";

        //                 }
        //             }
        //         }

        //         updateNodeContent({ ...clonedNodeContent }, node.id);
        //         saveWorkflow();
        //     }
        // },

        deleteFile: (node: Node, fileId: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            const clonedNodeContent = structuredClone(node.data.nodeContent);
            if (clonedNodeContent) {
                const files = (clonedNodeContent as ISendMessageNodeContent).files?.filter(
                    (file) => file.id !== fileId
                );

                updateNodeContent({ ...clonedNodeContent, files }, node.id);
                saveWorkflow();
            }
        },

        deleteMessage: (node: Node, messageId: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            const clonedNodeContent = structuredClone(node.data.nodeContent);
            if (clonedNodeContent) {
                const messages = (clonedNodeContent as ISendMessageNodeContent).messages.filter(
                    (message) => message.id !== messageId
                );

                updateNodeContent({ ...clonedNodeContent, messages }, node.id);
                saveWorkflow();
            }
        }
    }
});


export default useSendMessageStore;




