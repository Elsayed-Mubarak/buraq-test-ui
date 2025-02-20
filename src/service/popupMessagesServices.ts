import { axiosInstance } from "@/lib/axios";

export async function getPopupMessages() {
    try {
        const response = await axiosInstance.get("/api/channel/web/popupMessages");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching web configurations:", error);
        return error.response.data.message;
    }
}

export async function createPopupMessage(data: any) {
    try {
        const response = await axiosInstance.post("/api/channel/web/popupmessages", data);
        return response.data;
    } catch (error: any) {
        console.error("Error creating popup message:", error);
        return error.response.data.message;
    }
}

export async function updatePopupMessage(id: string, data: any) {
    try {
        const response = await axiosInstance.put(`/api/channel/web/popupmessages/${id}`, data);
        return response.data;
    } catch (error: any) {
        console.error("Error updating popup message:", error);
        return error.response.data.message;
    }
}
export async function deletePopupMessage(id: string) {
    try {
        const response = await axiosInstance.delete(`/api/channel/web/popupmessages/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error deleting popup message:", error);
        return error.response.data.message;
    }
}