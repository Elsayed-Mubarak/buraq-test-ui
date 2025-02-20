import { getLabels } from '@/service/labelsServices';
import { ILabel } from './../types/live-chat.d';
import { create } from 'zustand';
interface ILabelStore {
    labels: ILabel[];
    setLabels: (labels: ILabel[]) => void;
}
export const useLabelsStore = create<ILabelStore>((set, get) => {
    return {
        labels: [],
        setLabels: (labels: ILabel[]) => set({ labels }),
    };
});