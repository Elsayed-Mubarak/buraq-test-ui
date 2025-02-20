import { create } from 'zustand';

type ZapierStore = {
    token: string | null;
    handleCopyToken: (token: string) => void;
}

export const useZapierStore =
    create<ZapierStore>((set, get) => ({
        // token: localStorage.getItem('token'),
        token: "",

        handleCopyToken: (text: string) => navigator.clipboard.writeText(text),
    }))








