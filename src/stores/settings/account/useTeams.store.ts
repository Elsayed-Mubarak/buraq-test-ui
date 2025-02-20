import { axiosInstance } from "@/lib/axios";
import { ITeamStore } from "@/types/settings/account/teams";
import toast from "react-hot-toast";
import { create } from "zustand";

const useTeamStore = create<ITeamStore>((set, get) => {
  return {
    data: [],

    getData: async () => {
      try {
        const res = await axiosInstance.get("/teams");
        if (!res.data) throw new Error("There's No Teams Data");

        set({ data: res.data });
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },

    createTeam: async (data: any) => {
      try {
        const res = await axiosInstance.post("/teams", data);

        if (res.status !== 201) {
          throw new Error("Failed to create Team");
        }

        return res;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    deleteTeam: async (id: string) => {
      try {
        const res = await axiosInstance.delete(`/teams/${id}`);

        if (res.status !== 200) {
          throw new Error("Failed to create Team");
        }

        await get().getData();
        return res;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    getDataById: async (id: string) => {
      try {
        const res = await axiosInstance.get(`/teams/${id}`);

        if (res.status !== 200) {
          throw new Error("Failed to create Team");
        }

        await get().getData();
        return res.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    editTeam: async (id: string, data: any) => {
      try {
        const res = await axiosInstance.put(`/teams/${id}`, data);

        if (res.status !== 200) {
          throw new Error("Failed to create Team");
        }

        await get().getData();
        toast.success("edit successfully");
        return res.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  };
});

export default useTeamStore;
