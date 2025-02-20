import { axiosInstance } from "@/lib/axios";

export async function getWebAppearnce() {
    try {
        const response = await axiosInstance.get("/api/channel/web/appearance");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching web configurations:", error);
        return error.response.data.message;
    }
}

export async function updateWebAppearnce(data: any) {
    try {
        const response = await axiosInstance.get("/api/channel/web/appearance", { data });
        return response.data;
    } catch (error) {
        console.error("Error fetching web configurations:", error);
        throw error;
    }
}

export async function getWebConfigurations() {
    try {
        const response = await axiosInstance.get("/api/channel/web/configuration");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching web configurations:", error);
        return error.response.data.message;
    }
}

export async function updateWebConfigurations(webSiteUrl: any) {
    try {
        const response = await axiosInstance.put("/api/channel/web/configuration", { webSiteUrl });
        return response.data;
    } catch (error: any) {
        console.error("Error fetching web configurations:", error);
        return error.response.data.message;
    }
}

export async function getPopupMessages() {
    try {
        const response = await axiosInstance.get("/api/channel/web/popupMessages");
        return response.data;
    } catch (error) {
        console.error("Error fetching web configurations:", error);
        throw error;
    }
}

export async function createPopupMessages(data: any) {
    try {
        const response = await axiosInstance.get("/api/channel/web/popupMessages", { data });
        return response.data;
    } catch (error) {
        console.error("Error fetching web configurations:", error);
        throw error;
    }
}

export async function updatePopupMessages(data: any) {
    try {
        const response = await axiosInstance.get("/api/channel/web/popupMessages", { data });
        return response.data;
    } catch (error) {
        console.error("Error fetching web configurations:", error);
        throw error;
    }
}

export async function deletePopupMessages(id: any) {
    try {
        const response = await axiosInstance.get(`/api/channel/web/popupMessages/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching web configurations:", error);
        throw error;
    }
}

export async function getWebGeneralSettings() {
    try {
        const response = await axiosInstance.get("/api/channel/web/generalSettings");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching web configurations:", error);
        return error.response.data.message;
    }
}

export async function updateWebGeneralSettings(data: any) {
    console.log(data)
    try {
        const response = await axiosInstance.put("/api/channel/web/generalSettings", { ...data });
        return response.data;
    } catch (error: any) {
        console.error("Error fetching web configurations:", error);
        return error.response.data.message;
    }
}

export async function getWebTriggerConditions() {
    try {
        const response = await axiosInstance.get("/api/channel/web/triggerConditions");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching web configurations:", error);
        return error.response.data.message;
    }
}

export async function updateWebTriggerConditions(data: any) {
    try {
        const response = await axiosInstance.put("/api/channel/web/triggerConditions", { ...data });
        return response.data;
    } catch (error: any) {
        console.error("Error fetching web configurations:", error);
        return error.response.data.message;
    }
}