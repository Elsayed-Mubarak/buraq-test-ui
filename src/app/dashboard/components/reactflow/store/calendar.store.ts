import {create} from 'zustand';

type CalendarStore = {
    message: string;
    setMessage: (message: string) => void;
    selectedVariable: string | null;
    onSelectVariable: (val: string) => void;
}

export const useCalendarStore = create<CalendarStore>((set, get) => ({
    message: "What is your preferred date?",
    setMessage: (msg: string) => set((state) => ({
        message: state.message = msg,
    })),

    selectedVariable: null,
    onSelectVariable: (val: string) => set((state) => ({
        selectedVariable: state.selectedVariable = val,
    })),

}));