import { axiosInstance } from "../lib/axios";

export async function getSavedReplies() {
  try {
    const response = await axiosInstance.get("/api/saved-replies");
    return response.data;
  } catch (error) {
    console.error("Error fetching saved replies:", error);
    throw error;
  }
}

export async function createSavedReply({ title, reply }: { title: string, reply: string }) {
  try {
    const response = await axiosInstance.post("/api/saved-replies", {
      title,
      reply,
    });
    return response.data;
  } catch (error) {
    console.error("Error posting reply:", error);
    throw error;
  }
}

export async function deleteSavedReply(id: string) {
  try {
    const response = await axiosInstance.delete(`/api/saved-replies/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error deleting reply: ${error.message}`);
    throw error.response.data.message || error.response.data.error || "Error edit saved reply.";
  }
}

export async function editSavedReply({ id, title, reply }: { id: string, title: string, reply: string }) {
  try {
    const response = await axiosInstance.put(`/api/saved-replies/${id}`, {
      title,
      reply,
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error updating reply: ${error.message}`);
    throw error.response.data.message || error.response.data.error || "Error edit saved reply.";
  }
}
