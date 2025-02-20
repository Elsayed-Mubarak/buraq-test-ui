import { axiosInstance } from '@/lib/axios';
import { IProfileStore, ProfileSettings } from '@/types/settings/profile/profile';
import toast from 'react-hot-toast';
import { create } from 'zustand';

const defaultProfile: ProfileSettings = {
    id: '',
    _id: '',
    firstName: '',
    lastName: '',
    useName: '',
    email: '',
    profilePicture: ""
};


const useProfileStore = create<IProfileStore>((set, get) => {
    return {
        data: defaultProfile,
        image: "",

        getProfileData: async () => {
            try {
                const res = await axiosInstance.get('/user-settings/profile');

                if (res.status !== 200) {
                    throw new Error("Failed to get Profile Data");
                }

                set({ data: res.data });
                console.log(get().data);
                return res.data;
            } catch (error) {
                console.log(error)
            }
        },

        editProfileSettings: async (data: Partial<ProfileSettings>) => {
            try {
                // Merge current data with the new data
                const updatedData = { ...get().data, ...data };

                const res = await axiosInstance.put('/user-settings/profile', updatedData);

                if (res.status !== 200) {
                    throw new Error("Failed to update Profile Data");
                }

                // Update only the fields returned by the server
                set((state) => ({
                    data: {
                        ...state.data,
                        ...res.data, // Merge response data into the state
                    },
                }));

                toast.success("Profile has been updated");
                return res.data;
            } catch (error) {
                console.error("Error updating profile settings:", error);
                throw error;
            }
        },

        editProfileSettingsImage: async (data: any) => {
            try {
                const res = await axiosInstance.put('/user-settings/profile/picture', data);

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

        deleteProfileImage: async () => {
            try {
                set((state) => ({
                    data: {
                        ...state.data,
                        profilePicture: "",
                    },
                }));
                const res = await axiosInstance.delete('/user-settings/profile');

                if (res.status !== 200) {
                    throw new Error("Failed to get Profile Data");
                }

                await get().getProfileData();
                return res;
            } catch (error) {
                console.log(error)
                throw error;
            }
        }
    }
});

export default useProfileStore;