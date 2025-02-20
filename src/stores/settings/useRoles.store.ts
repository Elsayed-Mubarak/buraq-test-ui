import { axiosInstance } from "@/lib/axios";
import { IRolesStore } from "@/types/settings/roles";
import toast from "react-hot-toast";
import { create } from "zustand";

const useRolesStore = create<IRolesStore>((set, get) => {
    return {
        roles: [],
        rolesWithTeammates: [],
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

        getRolesWithTeammate: async (x: string) => {
            try {
                const url = x ? `/api/roles-teammates?name=${x}` : "/api/roles-teammates";
                const res = await axiosInstance.get(url);
                if (!res.data) {
                    throw new Error(`Failed to Fetch Roles with teammates `);
                }
                set({ rolesWithTeammates: res.data });
                return res;
            } catch (error) {
                throw error;
            }
        },

        addRole: async (data: any) => {
            try {
                const res = await axiosInstance.post(`/api/roles`, data);

                if (res.status !== 201) throw new Error("Failed to Create Role");

                await get().getRolesWithTeammate();
                toast.success("Created Successfully!")
                return res;
            } catch (error) {
                throw error;
            }
        }

    };
});

export default useRolesStore;
