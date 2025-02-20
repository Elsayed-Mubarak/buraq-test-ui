import { create } from "zustand";
import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { Node } from "@xyflow/react";
import { DynamicData_Whatsapp_Header, DynamicData_Whatsapp_RenderAsEnum, IDynamicDataWhatsappContent, IDynamicDataWhatsappStore } from "@/types/workflows/nodes/dynamic-data/in-bound/whatsapp";
import { uploadFile } from "@/helpers/uploadFile";


const useDynamicDataWhatsappStore = create<IDynamicDataWhatsappStore>((set, get) => {

    return {
        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as IDynamicDataWhatsappContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IDynamicDataWhatsappContent);

                clonedNodeContent.name = name;

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        onChangeRenderItem: (node: Node, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IDynamicDataWhatsappContent);

                Object.assign(clonedNodeContent, values);

                updateNodeContent({
                    ...clonedNodeContent,
                    renderAs: clonedNodeContent.renderAs,
                    responseContentAs: {
                        header: {
                            type: DynamicData_Whatsapp_Header.TEXT,
                            value: '',
                            file: {
                                name: '',
                                s3Url: ''
                            }
                        },
                        body: '',
                        footer: '',
                        error: '',
                        buttonName: '',
                        buttonPayload: '',
                        optionItems: "",
                        item: {
                            name: "",
                            description: "",
                            category: "",
                        }
                    }
                }, node.id);
                saveWorkflow();
            }
        },

        onChangeVariables: (node: Node, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IDynamicDataWhatsappContent);

                Object.assign(clonedNodeContent, values);

                updateNodeContent({ ...clonedNodeContent, dataVariable: clonedNodeContent.dataVariable }, node.id);
                saveWorkflow();
            }
        },

        onChangeSavePayloadResponse: (node: Node, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IDynamicDataWhatsappContent);

                Object.assign(clonedNodeContent, values);

                updateNodeContent({ ...clonedNodeContent, dataVariable: clonedNodeContent.dataVariable }, node.id);
                saveWorkflow();
            }
        },

        onChangeSavedVariables: (node: Node, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IDynamicDataWhatsappContent);

                Object.assign(clonedNodeContent, values);

                updateNodeContent({ ...clonedNodeContent, savedResponseVariable: clonedNodeContent.savedResponseVariable }, node.id);
                saveWorkflow();
            }
        },

        onChangeReply: async (node: Node, values, file?: File) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IDynamicDataWhatsappContent);

                if (clonedNodeContent.renderAs === DynamicData_Whatsapp_RenderAsEnum.REPLYBUTTON) {
                    Object.assign(clonedNodeContent, values);

                    if (clonedNodeContent.responseContentAs.header.type === "file" && file) {
                        const _file = await uploadFile(file);
                        clonedNodeContent.responseContentAs.header.file.s3Url = _file.url;
                        clonedNodeContent.responseContentAs.header.file.name = _file.name;
                    }


                    updateNodeContent({ ...clonedNodeContent, responseContentAs: clonedNodeContent.responseContentAs }, node.id);
                    saveWorkflow();
                }
            }
        },

        onChangeOptions: (node: Node, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IDynamicDataWhatsappContent);

                if (clonedNodeContent.renderAs === DynamicData_Whatsapp_RenderAsEnum.OPTIONS) {
                    Object.assign(clonedNodeContent, values);

                    updateNodeContent({ ...clonedNodeContent, responseContentAs: clonedNodeContent.responseContentAs }, node.id);
                    saveWorkflow();
                }
            }
        },

        onChangeList: (node: Node, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IDynamicDataWhatsappContent);

                if (clonedNodeContent.renderAs === DynamicData_Whatsapp_RenderAsEnum.LIST) {
                    Object.assign(clonedNodeContent, values);

                    updateNodeContent({ ...clonedNodeContent, responseContentAs: clonedNodeContent.responseContentAs }, node.id);
                    saveWorkflow();
                }
            }
        },

    }
});


export default useDynamicDataWhatsappStore;