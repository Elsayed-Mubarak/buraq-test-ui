import { axiosInstance } from '@/lib/axios';
import { IBotStore } from '@/types/workflows/bot';
import toast from 'react-hot-toast';
import { create } from 'zustand';


export const useBotStore = create<IBotStore>((set, get) => {
    return {
        bots: [],
        inboundBots: [],
        outboundBots: [],

        deleteBot: async (id: string) => {
            try {
                const res = await axiosInstance.delete(`/bot/workflow/${id}`);
                if (!res) {
                    throw new Error("Failed to delete bot");
                }

                await get().getBots();
                await get().getInboundBots();
                await get().getOutboundBots();
                toast.success("Bot deleted successfully!", { id: "delete-success" });
                return res;
            } catch (error) {
                console.error(error)
                toast.error("Failed to delete bot");
                throw error;
            }
        },

        getBots: async () => {
            try {
                const res = await axiosInstance.get("/bot/workflow");
                if (!res.data) {
                    console.error("There's No Bots Data");
                    return [];
                }
                set({ bots: res.data })
                return res.data;
            } catch (error) {
                console.error(error)
                return error;
            }
        },
        getInboundBots: async () => {
            try {
                const res = await axiosInstance.get("/bot/workflow/inbound");
                if (!res.data) {
                    console.error("There's No Bots Data");
                    return [];
                }
                set({ inboundBots: res.data })
                return res.data;
            } catch (error) {
                console.error(error)
                return error;
            }
        },
        getOutboundBots: async () => {
            try {
                const res = await axiosInstance.get("/bot/workflow/outbound");
                if (!res.data) {
                    console.error("There's No Bots Data");
                    return [];
                }
                set({ outboundBots: res.data })
                return res.data;
            } catch (error) {
                console.error(error)
                return error;
            }
        },

    }
})