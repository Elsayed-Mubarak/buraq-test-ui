import { axiosInstance } from "@/lib/axios";
import { ITeammatesStore } from "@/types/settings/account/teammates";
import toast from "react-hot-toast";
import { create } from "zustand";

const useTeammatesStore = create<ITeammatesStore>((set, get) => {
  return {
    teammates: [],
    teammate: {},

    getTeammates: async () => {
      try {
        const res = await axiosInstance.get("/api/teammates");
        if (!res.data) throw new Error("There's No Teamates Data");
        console.log(res.data);
        set({ teammates: res.data });
        return res.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    getTeammateById: async (id: string) => {
      try {
        const res = await axiosInstance.get(`/api/teammates/${id}`);
        if (!res.data) throw new Error("There's No Teamate with this id");

        if (res.status === 200) {
          set({ teammate: res.data });
          return res.data;
        }
      } catch (error) {
        console.error(error);
        return error;
      }
    },

    editTeammate: async (id: string, data: any) => {
      try {
        const res = await axiosInstance.put(
          `/api/teammates/${id}/edit-role`,
          data,
        );
        if (!res.data) throw new Error("Failed to edit");

        await get().getTeammates();
        toast.success("Edited Successfully!");
        return res.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },

    deleteTeamate: async (id: string) => {
      try {
        const res = await axiosInstance.put(`/api/teammates/${id}/remove`);
        if (!res.data) throw new Error("Failed to edit");
        toast.success("Removed Successfully!");
        return res;
      } catch (error) {
        console.error(error);
        return error;
      }
    },

    inviteTeammate: async (data: any) => {
      try {
        const res = await axiosInstance.post('/api/inviteTeammate', data);
        if (!res.data) throw new Error("Failed");
        return res;
      } catch (error) {
        throw error;
      }
    },

    addTeamate: async (token: string, data: any) => {
      try {
        const res = await axiosInstance.post(`/api/inviteTeammate/${token}`, data);
        if (!res.data) throw new Error("Failed");
        return res;
      } catch (error) {
        throw error;
      }
    },

  };
});

export default useTeammatesStore;
