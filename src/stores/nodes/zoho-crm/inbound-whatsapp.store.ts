import { create } from "zustand";
import useFlowStore from "@/app/dashboard/components/reactflow/reactflowstate/store";
import { Node } from "@xyflow/react";
import { IZohoCRMWhatsappNodeContent, IZohoCRMWhatsappStore, ZohoFiled } from "@/types/workflows/nodes/zoho-crm/in-bound/whatsapp.";
import { ObjectId } from "bson";


const useZohoWhatsappStore = create<IZohoCRMWhatsappStore>((set, get) => {

    return {
        changeName: (node: Node, name: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if ((node.data.nodeContent as IZohoCRMWhatsappNodeContent)) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IZohoCRMWhatsappNodeContent);

                clonedNodeContent.name = name;

                updateNodeContent({ ...clonedNodeContent }, node.id);
                saveWorkflow();
            }
        },

        addZohoField: (node: Node) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent as IZohoCRMWhatsappNodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IZohoCRMWhatsappNodeContent);

                const newZohoField: ZohoFiled = {
                    id: new ObjectId().toHexString(),
                    field: '',
                    value: ''
                };

                clonedNodeContent.zohoFileds.push(newZohoField);

                updateNodeContent({ ...clonedNodeContent, zohoFileds: clonedNodeContent.zohoFileds }, node.id);
                saveWorkflow();
            }
        },

        deleteZohoField: (node: Node, fieldId: string) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            const clonedNodeContent = structuredClone(node.data.nodeContent as IZohoCRMWhatsappNodeContent);
            if (clonedNodeContent) {
                const fileds = (clonedNodeContent as IZohoCRMWhatsappNodeContent).zohoFileds.filter(
                    (filde) => filde.id !== fieldId
                );

                updateNodeContent({ ...clonedNodeContent, zohoFileds: fileds }, node.id);
                saveWorkflow();
            }
        },

        onChangeAccount: (node: Node, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IZohoCRMWhatsappNodeContent);

                Object.assign(clonedNodeContent, values);

                updateNodeContent({ ...clonedNodeContent, account: clonedNodeContent.account }, node.id);
                saveWorkflow();
            }
        },
        onChangeData: (node: Node, filedId: string, values) => {
            const { updateNodeContent, saveWorkflow } = useFlowStore.getState();

            if (node.data.nodeContent) {
                const clonedNodeContent = structuredClone(node.data.nodeContent as IZohoCRMWhatsappNodeContent);

                const chosenFiled = (clonedNodeContent as IZohoCRMWhatsappNodeContent).zohoFileds.find(
                    (z) => z.id === filedId
                );

                if (chosenFiled) {
                    chosenFiled.field = values.filed as string;
                    chosenFiled.value = values.value as string;
                }

                updateNodeContent({ ...clonedNodeContent, zohoFileds: clonedNodeContent.zohoFileds }, node.id);
                saveWorkflow();
            }
        },
    }
});


export default useZohoWhatsappStore;