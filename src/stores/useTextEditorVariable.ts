import { create } from 'zustand';

interface TextEditorStore {
    openFallback: boolean;
    setFallback: (flag: boolean) => void;
}

const useTextEditorStore = create<TextEditorStore>((set, get) => ({
    openFallback: false,

    setFallback: (flag) => set({ openFallback: flag }),

}));


export default useTextEditorStore;