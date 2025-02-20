import { axiosInstance } from "../lib/axios";


export async function getClientInfoByConversationId(conversationId: string) {
  try {
    const response = await axiosInstance.get(`/api/clients/conversation/${conversationId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching client info", error);
    throw error.response.data.message || error.response.data.error || "Error fetching client info";
  }
}
export async function updateClient(client: any) {
  try {
    const { clientId, ...fieldsToUpdate } = client;
    const response = await axiosInstance.put(
      `/api/clients/${clientId}`,
      fieldsToUpdate,
    );
    return response.data;
  } catch (error: any) {
    console.error("Update client failed:", error.message);
    throw error.response.data.message || error.response.data.error || "Error updating client";
  }
}

export async function getClientConversations(clientId: any) {
  try {
    const response = await axiosInstance.get(`/api/conversationsbyclientid/${clientId}`);
    return response.data;
  } catch (error: any) {
    console.error("Get client conversations failed:", error.message);
    throw error;
  }
}


// Block Contact
export async function blockContact(data: any) {
  try {
    const response = await axiosInstance.post(`/api/contacts/block`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Failed to block contact."
    );
  }
}

// Unblock Contact
export async function unblockContact(data: any) {
  try {
    const response = await axiosInstance.post(`/api/contacts/unblock`, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error || "Failed to unblock contact."
  }
}

