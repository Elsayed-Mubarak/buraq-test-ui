import { axiosInstance } from "@/lib/axios";

export async function getApprovedTemplates() {
    try {
        const response = await axiosInstance.get(`/api/approved-templates`);
        return response.data.approvedTemplates;
    } catch (error: any) {
        console.log(error);
        throw error.response.data.message;
    }
}

export async function getAllTemplates() {
    try {
        const response = await axiosInstance.get(`/api/get-templates`);
        return response.data;
    } catch (error: any) {
        console.log(error);
        throw error.response.data.message;
    }
}

export async function createTemplate(data: any) {
    try {
        const response = await axiosInstance.post("api/create-template", data);
        return response.data;
    } catch (error: any) {
        console.error("Error posting template:", error.response.data.message);
        throw error.response.data.message;
    }
}

export async function deleteTemplate(id: string) {
    try {
        const response = await axiosInstance.delete(`api/delete-template/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error posting template:", error.response.data.message);
        throw error.response.data.message;
    }
}
export async function reriveMediaHandler(data: any) {
    try {
        const response = await axiosInstance.post("/api/templates/mediahandler", data);
        return response.data;
    } catch (error: any) {
        console.error("Error posting template:", error.response.data.message);
        return error.response.data.message;
    }
}