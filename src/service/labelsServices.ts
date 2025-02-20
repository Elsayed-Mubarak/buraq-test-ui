import { ILabel } from './../types/live-chat.d';
import { axiosInstance } from "../lib/axios";

export async function getLabels(): Promise<ILabel[]> {
  try {
    const response = await axiosInstance.get("/api/labels");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching labels:", error);
    throw error.response.data.message || error.response.data.error || "Error getting labels.";

  }
}

export async function createLabel(name: string) {
  try {
    const response = await axiosInstance.post("/api/labels", { name });
    return response.data;
  } catch (error: any) {
    console.error("Error posting label:", error.response.data.message);
    throw error.response.data.message || error.response.data.error || "Error creating label.";

  }
}
export async function deleteLabel(id: string) {
  try {
    const response = await axiosInstance.delete(`/api/labels/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting label:", error);
    throw error.response.data.message || error.response.data.error || "Error deleting label.";

  }
}
export async function updateLabel(labelId: string, name: string) {
  try {
    const response = await axiosInstance.put(`/api/labels/${labelId}`, { name });
    return response.data;
  } catch (error: any) {
    console.error("Error posting label:", error);
    throw error.response.data.message || error.response.data.error || "Error updating label.";

  }
}

export async function getConversationLabels(conversationId: string) {
  try {
    const response = await axiosInstance.get(`/api/labels/conversations/${conversationId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching conversation labels:", error);
    throw error.response.data.message || error.response.data.error || "Error gettings conversation labels.";
  }
}
export async function addLabelToConversation(conversationId: string, labelId: string) {
  try {
    const response = await axiosInstance.post(`/api/labels/${labelId}/conversations/${conversationId}`,);
    return response.data;
  } catch (error: any) {
    console.error("Error adding label to conversation:", error);
    throw error.response.data.message || error.response.data.error || "Error adding label to this conversation";
  }
}
export async function deleteLabelFromConversation(conversationId: string, labelId: string) {
  try {
    const response = await axiosInstance.delete(`/api/labels/${labelId}/conversations/${conversationId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting label from conversation:", error);
    throw error.response.data.message || error.response.data.error || "Error deleting label from conversation.";
  }
}
export async function getConversationsByLabel(labelId: string) {
  try {
    const response = await axiosInstance.get(`/api/labels/${labelId}/conversations`);
    console.log("getConversationsByLabel")
    return response.data;
  } catch (error: any) {
    console.error("Error fetching conversations by label:",)
    throw error.response.data.message || error.response.data.error || "Error getting conversations by label";
  }
}
