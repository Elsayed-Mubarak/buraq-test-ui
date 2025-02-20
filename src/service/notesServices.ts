import { axiosInstance } from "../lib/axios";

export async function addClientNote({ clientId, content }: { clientId: string; content: string }) {
  try {
    const response = await axiosInstance.post(
      `/api/clients/${clientId}/notes`,
      {
        content,
      },
    );

    return response.data;
  } catch (error: any) {
    console.error("Add client note failed:", error.message);
    throw error.response.data.message || error.response.data.error || "Error adding client note.";
  }
}
export async function getClientNotes(clientId: string) {
  try {
    const response = await axiosInstance.get(`/api/clients/${clientId}/notes`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching client notes:", error);
    throw error.response.data.message || error.response.data.error || "Error fetching client notes.";
  }
}

export async function updateClientNote({ noteId, content }: { noteId: string; content: string }) {
  try {
    const response = await axiosInstance.put(
      `/api/notes/${noteId}`,
      {
        content,
      },
    );
    return response.data;
  } catch (error: any) {
    console.error("Error editing client note:", error);
    throw error.response.data.message || error.response.data.error || "Error update client notes.";
  }
}

export async function deleteClientNote(noteId: string) {
  try {
    const response = await axiosInstance.delete(`/api/notes/${noteId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting client note:", error);
    throw error.response.data.message || error.response.data.error || "Error delete client notes.";

  }
}   
