import { create } from 'zustand';

type DialogStore = {
    selectedVariable: string | null;
    onSelectVariable: (val: string) => void;
    FileValue: File | null;
    handleFileChange: (newFile: File | null) => void;
}

export const useDialogStore = create<DialogStore>((set, get) => ({
    selectedVariable: null,
    onSelectVariable: (val: string) => set((state) => ({
        selectedVariable: state.selectedVariable = val,
    })),

    FileValue: null,

    handleFileChange: (newFile: File | null) => {
        set({
            FileValue: newFile,
        })
    }

}));