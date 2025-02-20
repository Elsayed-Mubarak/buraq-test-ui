import { axiosInstance } from "@/lib/axios";
import { IRolesStore } from "@/types/settings/account/roles";
import { create } from "zustand";

const useRolesStore = create<IRolesStore>((set, get) => {
    return {
        roles: [],
        role: {},
        getAllRoles: async () => {
            try {
                const res = await axiosInstance.get("/api/roles");
                if (!res.data) {
                    throw new Error("Failed to Fetch Roles");
                }

                set({ roles: res.data });
                return res;
            } catch (error) {
                throw error;
            }
        },
        getRoleById: async (id: string) => {
            try {
                const res = await axiosInstance.get(`/api/roles/${id}`);
                if (!res.data) {
                    throw new Error(`Failed to Fetch Role with this id ${id} `);
                }
                set({ role: res.data });
                return res;
            } catch (error) {
                throw error;
            }
        },
    };
});

export default useRolesStore;
