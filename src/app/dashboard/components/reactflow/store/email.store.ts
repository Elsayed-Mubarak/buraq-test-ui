import { create } from 'zustand';
import useFlowStore from '../reactflowstate/store';

type useEmailStore = {
    emailBody: string;
    onChangeEmailBody: (nodeId: string, text: string) => void;
}

export const useEmailStore = create<useEmailStore>((set, get) => {
    const { saveWorkflow, selectedNode, nodes } = useFlowStore.getState()
    const nodeId = selectedNode?.id as string;

    return {
        emailBody: "Add what you want to be notified when an email is sent...",

        onChangeEmailBody: (nodeId, text: string) => {
            set({ emailBody: text });
            saveWorkflow();
        }
    }

});
