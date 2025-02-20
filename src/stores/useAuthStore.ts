import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
  // temp
}
interface AuthStore {
  token: string | null;
  authUser: any; // temp any
  isCheckingAuth: boolean;

  setToken: (token: string | null) => void;
  checkAuth: () => Promise<void>;
  signup: (data: Record<string, any>) => Promise<User>;
  login: (data: Record<string, any>) => Promise<User>;
  logout: () => Promise<void>;

}

export const useAuthStore = create<AuthStore>()(
  persist((set) => ({
    token: null,
    authUser: null,
    isCheckingAuth: true,

    setToken: (token) => set({ token }),
    checkAuth: async () => {
      try {
        const res = await axiosInstance.get("/api/auth/check");
        set({ authUser: res.data });
      } catch (error: any) {
        set({ authUser: null });
        console.log("Error in checkAuth:", error);
        throw error?.response?.data?.error || error?.response?.data?.message || error?.message;
      } finally {
        set({ isCheckingAuth: false });
      }
    },
    signup: async (data) => {
      try {
        const res = await axiosInstance.post("/api/auth/register", data);
        return res.data;
      } catch (error: any) {
        throw error?.response?.data?.message || error.response.data.message;
      }
    },
    login: async (data) => {
      try {
        const res = await axiosInstance.post("/api/auth/login", data);
        set({ authUser: res.data, token: res.data.token });
        return res.data;
      } catch (error: any) {
        throw error?.response?.data?.error || error?.response?.data?.message || error.message;
      }
    },
    logout: async () => {
      try {
        await axiosInstance.post("/api/auth/logout");
        set({ authUser: null, token: null });
        toast.success("Logged out successfully");
      } catch (error: any) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
      }
    }
  }),
    {
      name: "auth-store",
      partialize: (state) => ({
        token: state.token,
        authUser: state.authUser,
      }),
    }
  )
);
