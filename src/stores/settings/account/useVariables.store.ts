import { axiosInstance } from '@/lib/axios';
import { IVariables, IVariablesStore } from '@/types/settings/account/variables';
import { create } from 'zustand';


export const useVariablesStore = create<IVariablesStore>((set, get) => {
    return {
        variables: [],
        activeVariables: [],
        archivedVariables: [],

        addVariables: async (props: IVariables) => {
            try {
                const res = await axiosInstance.post('/api/variable', props);
                if (!res) {
                    throw new Error("Failed to add Variable");
                }

                await get().getVariables();
                await get().getActiveVariables();
                await get().getArchivedVariables();

                return res;
            } catch (error) {
                console.error(error)
                throw error;
            }
        },

        getVariables: async () => {
            try {
                const res = await axiosInstance.get('/api/variables');
                if (!res.data) {
                    console.error("There's No Variables Data");
                    return [];
                }

                set({ variables: res.data })
                return res.data;
            } catch (error) {
                console.error(error)
                return error;
            }
        },

        getActiveVariables: async (search?: string) => {
            try {
                const url = search ? `/api/variables/restored?search=${search}` : `/api/variables/restored`;
                const res = await axiosInstance.get(url);

                if (!res.data) {
                    console.error("Failed to Fetch Active Variables Data");
                    return [];
                }

                set({ activeVariables: res.data.data });
                return res.data;
            } catch (error) {
                console.error(error);
                return error;
            }
        },

        getArchivedVariables: async (search?: string) => {
            try {
                const url = search ? `/api/variables/archived?search=${search}` : `/api/variables/archived`;
                const res = await axiosInstance.get(url);

                if (!res.data) {
                    console.error("Failed to Fetch Archived Variables Data");
                    return [];
                }

                set({ archivedVariables: res.data.data });
                return res.data;
            } catch (error) {
                console.error(error);
                return error;
            }
        },


        archiveVariable: async (id: string) => {
            try {
                const res = await axiosInstance.put(`/api/${id}/archive`);
                if (!res.data) {
                    console.error("Failed to Archive");
                }

                await get().getActiveVariables();
                await get().getArchivedVariables();

                return res.data;
            } catch (error) {
                console.error(error)
                return error;
            }
        },

        restoreVariable: async (id: string) => {
            try {
                const res = await axiosInstance.put(`/api/${id}/restore`);
                if (!res.data) {
                    console.error("Failed to Restore");
                }

                await get().getActiveVariables();
                await get().getArchivedVariables();

                return res.data;
            } catch (error) {
                console.error(error)
                return error;
            }
        },

        editVariable: async (id: string, data: any) => {
            try {
                const res = await axiosInstance.put(`/api/variables/${id}`, data);
                if (!res.data) {
                    throw new Error("Failed to Edit");
                }

                await get().getActiveVariables();
                await get().getArchivedVariables();

                return res.data;
            } catch (error) {
                console.error(error)
                return error;
            }
        },

        getVariableById: async (id: string) => {
            try {
                const res = await axiosInstance.get(`/api/variables/${id}`);
                if (!res.data) {
                    throw new Error("Failed to Find the Variable");
                }
                await get().getActiveVariables();
                await get().getArchivedVariables();

                return res.data;
            } catch (error) {
                console.error(error)
                return error;
            }
        },

    }
})