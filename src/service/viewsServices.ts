import { axiosInstance } from "../lib/axios";



export async function getViews() {
    try {
        const response = await axiosInstance.get("/api/views");
        return response.data;
    } catch (error) {
        console.error("Error fetching views:", error);
        throw error;
    }
}

export async function createView(name: any) {
    try {
        const response = await axiosInstance.post("/api/views", { name });
        return response.data;
    } catch (error) {
        console.error("Error creating view:", error);
        throw error;
    }
}


export async function getViewsFields() {
    try {
        const response = await axiosInstance.get("/api/views/available-fields");
        return response.data.fields;
    } catch (error: any) {
        console.log("error in get views fields", error);
        return error.response.data.message || error.response.data.error || "Error getting views fields";
    }
}
export async function getViewsValues(field: string) {
    try {
        const response = await axiosInstance.get(`/api/views/field-values/${field}`);
        return response.data.values;
    } catch (error: any) {
        console.log("error in get views values", error);
        return error.response.data.message || error.response.data.error || "Error getting views values";
    }
}