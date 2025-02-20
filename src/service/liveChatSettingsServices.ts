import { axiosInstance } from "@/lib/axios";


export async function getLiveChatSettings() {
    try {
        const response = await axiosInstance.get("/api/chat-settings");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching live chat settings:", error);
        throw error.response.data.message;
    }
}

export async function updateLiveChatSettings(updates: any) {
    try {
        const response = await axiosInstance.put("/api/chat-settings", updates);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching live chat settings:", error);
        throw error.response.data.message;
    }
}
export async function getHumanHandoverSettings() {
    try {
        const response = await axiosInstance.get("/human/handover");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching human handover settings:", error);
        throw error.response.data.message;
    }
}
export async function updateHumanHandoverSettings(updates: any) {
    try {
        const response = await axiosInstance.put("/human/handover", updates);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching human handover settings:", error);
        throw error.response.data.message;
    }
}