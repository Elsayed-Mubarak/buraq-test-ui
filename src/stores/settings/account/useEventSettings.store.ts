import { axiosInstance } from '@/lib/axios';
import { IEventSettingsStore } from '@/types/settings/account/events';
import { create } from 'zustand';

const useEventsSettings = create<IEventSettingsStore>((set, get) => {
    return {
        data: {},

        fetchData: async () => {
            try {
                const res = await axiosInstance.get('/events/webhook');

                if (res.status !== 200) throw new Error("Failed to fetch Events");

                set({ data: res.data });
                return res;
            } catch (error) {
                throw error;
            }
        },

        mutateData: async (data: any) => {
            try {
                const res = await axiosInstance.post('/events/webhook', data);

                if (res.status !== 200) throw new Error("Failed to fetch Events");

                set({ data: res.data });

                return res;
            } catch (error) {
                throw error;
            }
        }
    }
});

export default useEventsSettings;