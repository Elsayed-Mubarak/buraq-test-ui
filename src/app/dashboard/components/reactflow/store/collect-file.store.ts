import { create } from 'zustand';

type CollectFileStore = {
    botAskMessage: string;
    setBotAskMessage: (message: string) => void;

    selectedVariable: string | null;
    onSelectVariable: (val: string) => void;
}

export const useCollectFileStore = create<CollectFileStore>((set, get) => ({
    botAskMessage: 'Can you please upload your file?',
    setBotAskMessage: (msg: string) => set((state) => ({
        botAskMessage: state.botAskMessage = msg,
    })),

    selectedVariable: null,
    onSelectVariable: (val: string) => set((state) => ({
        selectedVariable: state.selectedVariable = val,
    })),
}))