import { axiosInstance } from '@/lib/axios';
import { Currency, IAccountSettingsStore } from '@/types/account-settings';
import { FormState } from '@/types/FormStateResponse';
import { AccountSettingsSchema } from '@/utils/formValidation/account-settings';
import { create } from 'zustand';
import { initalState } from "@/constants";

const initialData = {
    _id: "",
    name: '',
    businessValue: 0,
    enable2FA: false,
    hourlyCost: 0,
    currency: Currency.USD,
    timezone: '',
    profilePicture: "",
    token: ""
}

export const useAccountSettingsStore = create<IAccountSettingsStore>((set, get) => ({
    data: initialData,
    formState: initalState,

    getData: async () => {
        try {
            const res = await axiosInstance.get("/account/settings");
            if (!res.data) {
                console.error("There's No Bots Data");
                return [];
            }
            set({ data: res.data });
            return res.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    editiData: async (data: any) => {
        // let state: FormState;

        // const validateFields = AccountSettingsSchema.safeParse({
        //     name: formData.get("name"),
        //     timezone: formData.get("timezone"),
        //     currency: formData.get("currency") as Currency,
        //     businessValue: Number(formData.get("businessValue")),
        //     hourlyCost: Number(formData.get("hourlyCost")),
        //     enable2FA: Boolean(formData.get("enable2FA")),
        // });

        // if (!validateFields.success) {
        //     state = {
        //         status: "error",
        //         errors: validateFields.error.flatten().fieldErrors,
        //         message: "Oops, I think there is a mistake with your inputs.",
        //     };

        //     set({ formState: state });
        //     return [];
        // }

        try {
            const res = await axiosInstance.put("/account/settings", data);
            if (res.status !== 200) {
                console.log(res)
                throw new Error(`Unexpected status code: ${res.status}`);
            }

            set({
                // formState: {
                //     status: "success",
                //     message: "Account Settings has been updated!",
                // },
                data: res.data,
            });
            return res;
        } catch (error: any) {
            console.error("Error:", error);

            // set({
            //     formState: {
            //         status: "error",
            //         message: "An error occurred while updating your profile.",
            //     }
            // });
            return [];
        }
    },

    editAccountSettingsImage: async (data: any) => {
        try {
            const res = await axiosInstance.put('/account/settings/profile-pic', data);

            if (res.status !== 200) {
                throw new Error("Failed to get Profile Data");
            }
            console.log(res.data)

            set((state) => ({
                data: {
                    ...state.data,
                    profilePicture: res.data.data.profilePicture,
                },
            }));

            return res.data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    deleteAccountImage: async () => {
        try {
            set((state) => ({
                data: {
                    ...state.data,
                    profilePicture: "",
                },
            }));
            const res = await axiosInstance.delete('/account/settings/profile-pic');

            if (res.status !== 200) {
                throw new Error("Failed to get Profile Data");
            }

            await get().getData();
            return res;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}));
