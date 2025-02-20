import { axiosInstance } from '@/lib/axios';
import { IHumanHandoverSettingsStore } from '@/types/settings/liveChat/humanHandover';
import toast from 'react-hot-toast';
import { create } from 'zustand';

const useHumanHandover = create<IHumanHandoverSettingsStore>((set, get) => {
    return {
        data: {},

        getData: async () => {
            try {
                const res = await axiosInstance.get('/human/handover');

                if (!res.data) throw new Error("Failed to Fetch Human Handover Data");

                set({ data: res.data });

                return res.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    }
});

export default useHumanHandover;