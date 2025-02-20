import { axiosInstance } from "@/lib/axios";

export async function uploadFile(file: File) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axiosInstance.post("/webhook/upload", formData);
        return response.data;
    } catch (error: any) {
        console.log(error);
        throw error.response.data.message;
    }
}
export async function uploadAudio(audio: Blob) {
    try {
        const formData = new FormData();
        formData.append("file", audio, "recording.wav");
        const response = await axiosInstance.post("/webhook/upload", formData);
        return response.data;
    } catch (error: any) {
        console.log(error);
        throw error;
    }
}
export async function deleteFile(fileUrl: any) {
    try {
        const response = await axiosInstance.delete("/webhook/delete-media", {
            data: { fileUrl }
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        throw error.response.data.error;
    }
}