import { axiosInstance } from "@/lib/axios";

export async function getChannelWhatsappConfigurations() {
    try {
        const response = await axiosInstance.get("/api/configurations");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching web configurations:", error);
        throw error.response.data.message;
    }
}

export async function createChannelWhatsappConfiguration(data: any) {
    try {
        const response = await axiosInstance.post("/api/channel/whatsapp/check-business-phone", data);
        return response.data;
    } catch (error: any) {
        console.error("Error creating web configurations:", error);
        throw error.response.data.message;
    }
}

export async function updateChannelWhatsappConfiguration(id: string, data: any) {
    try {
        const response = await axiosInstance.put(`/api/channel/whatsapp/config/${id}`, data);
        return response.data;
    } catch (error: any) {
        console.error("Error updating web configurations:", error);
        throw error.response.data.message;
    }
}
export async function deleteChannelWhatsappConfiguration(id: string) {
    try {
        const response = await axiosInstance.delete(`/api/channel/whatsapp/config/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error updating web configurations:", error);
        throw error.response.data.message;
    }
}