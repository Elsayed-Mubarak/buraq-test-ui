import { axiosInstance } from "@/lib/axios";

export const uploadFile = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axiosInstance.post(`/webhook/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};