import io, { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid"
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_APP_API_URL;
// const BASE_URL = "http://localhost:3001";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { QueryClient } from "@tanstack/react-query";
import { playSound } from "@/utils/playSound";
import toast from "react-hot-toast";

class WebSocketSingleton {
  socket: Socket | null;
  queryClient: QueryClient | null = null;
  router: any = null;

  constructor() {
    this.socket = null;
  }
  setQueryClient(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  removeQueryClient() {
    this.queryClient = null;
  }
  setRouter(router: any) {
    this.router = router;
  }

  removeRouter() {
    this.router = null;
  }
  init(token: string | null) {
    if (this.socket && this.socket.connected) {
      console.log("Socket already initialized");
      return;
    }
    console.log("Attempting to connect to WebSocket server at", BASE_URL);
    this.socket = io(BASE_URL, {
      transports: ["websocket", "polling"],
      auth: { token },
    });

    this.socket.on("connect", () => {
      // this.socket?.emit("join-room", { token });
      console.log("Connected to WebSocket server");
    });

    this.socket.on("activeTeamMates", this.getActiveUsers);
    this.socket.on("newMessage", this.handleTeammateResponse);
    this.socket.on("newConversation", this.handleStartConversation);
    this.socket.on("closeConversationSuccess", this.handleCloseConversation);
    this.socket.on("joinConversationSuccess", this.handleJoinConversation);
    this.socket.on("unassignedConversationSuccess", this.handleUnassignConversation);
    this.socket.on("assignedConversationSuccess", this.handleAssignConversation);
    this.socket.on("messageRecieved", this.handleReceivedMessage);
    this.socket.on("messageStatus", this.handleMessageStatus);
    this.socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });
  }
  sendTextMessage(messageData: any) {
    this.socket?.emit("sendTextMessage", {
      content: messageData.content,
      conversationId: messageData.conversationId,
      id: messageData.id
    },
      (response: any) => {
        if (response) {
        } else {
        }
      }
    );
    useChatStore.getState().addNewMessage(messageData);
  }
  sendFileMessage(messageData: any) {
    this.socket?.emit("sendFileMessage", {
      fileUrl: messageData.file,
      fileName: messageData.fileName,
      conversationId: messageData.conversationId,
      id: messageData.id
    });
    useChatStore.getState().addNewMessage({
      attachmentUrl: messageData.file,
      ...messageData
    });
  }
  getActiveUsers = (data: any) => {
    useChatStore.getState().setActiveMembers(data);
  };
  handleStartConversation = (data: any) => {
    if (data.data.assignedTo._id !== useAuthStore.getState().authUser._id) {
      this.queryClient?.invalidateQueries({ queryKey: ["active-conversations"] });
    }
  }
  handleTeammateResponse = (data: any) => {
    const { conversationId, message, teammateId } = data;
    const isMyMessage = useAuthStore.getState().authUser._id === teammateId;
    if (isMyMessage) return;
    useChatStore.getState().addNewMessage({
      _id: message._id,
      type: message.type,
      id: message.id,
      content: message.content,
      conversationId: conversationId,
      to: message.to,
      from: message.from,
      status: "sent",
      updatedAt: message.updatedAt,
      fileName: message.fileName || "",
      attachmentUrl: message.attachmentUrl || ""
    });
  }
  handleReceivedMessage = (data: any) => {
    const message = {
      _id: data._id,
      type: data.type,
      id: data.id,
      content: data.content,
      conversationId: data.conversationId,
      to: data.to,
      from: data.from,
      status: data.status,
      updatedAt: data.updatedAt,
      fileName: data.fileName || "",
      messageId: data.messageId,
      attachmentUrl: data.attachmentUrl || ""
    }
    playSound("/Notifications.mp3");
    useChatStore.getState().addNewMessage(message);

  };
  closeConversation = (conversationId: any) => {
    this.socket?.emit("closeConversation", { conversationId },
      (response: any) => {
        if (response.success) {
          this.queryClient?.invalidateQueries({ queryKey: ["active-conversations"] });
          this.queryClient?.invalidateQueries({ queryKey: ["closedConversations"] });
        } else {
          console.log("Error closing conversation:", response);
        }
      });
  }
  handleCloseConversation = (data: any) => {
    if (data.closer._id === useAuthStore.getState().authUser._id) {
      return
    }
    this.queryClient?.invalidateQueries({ queryKey: ["active-conversations"] });
    this.queryClient?.invalidateQueries({ queryKey: ["closedConversations"] });
  }
  joinConversation: any = (conversationId: any) => {
    this.socket?.emit("joinConversation", { conversationId },
      (response: any) => {
        if (response.success) {
          this.queryClient?.invalidateQueries({ queryKey: ["active-conversations"] }).then(() => {
            this.router?.push(`/dashboard/live-chat`);
          });
        } else {
          console.log("Error joining conversation:", response);
        }
      });
  }
  handleJoinConversation = (data: any) => {
    if (data.joiner._id === useAuthStore.getState().authUser._id) {
      return
    }
    this.queryClient?.invalidateQueries({ queryKey: ["active-conversations"] });
  }
  assignConversation = (conversationId: any, assignedTo: any, assignedToModel: any) => {
    this.socket?.emit("assignedConversation", { conversationId, assignedTo, assignedToModel }, (response: any) => {
      if (response.success) {
        if (assignedTo === useAuthStore.getState().authUser._id) {
          this.queryClient?.invalidateQueries({ queryKey: ["active-conversations"] }).then(() => {
            this.router?.push(`/dashboard/live-chat`);
          });
        } else {
          this.queryClient?.invalidateQueries({ queryKey: ["active-conversations"] });
        }
      } else {
        toast.error(response.error)
        console.log("Error assigning conversation:", response.error);
      }
    });
  }
  handleAssignConversation = (data: any) => {
    if (data.assigner._id === useAuthStore.getState().authUser._id) {
      return
    }
    this.queryClient?.invalidateQueries({ queryKey: ["active-conversations"] });
  }
  unassignedConversation = (conversationId: any) => {
    this.socket?.emit("unassignedConversation", { conversationId }, (response: any) => {
      if (response.success) {
        this.queryClient?.invalidateQueries({ queryKey: ["active-conversations"] });
      } else {
        console.log("Error unassigning conversation:", response);
      }
    });
  }
  handleUnassignConversation = (data: any) => {
    if (data.unAssigner._id === useAuthStore.getState().authUser._id) {
      return
    }
    console.log("teammate Conversation unassigned successfully:", data);
    this.queryClient?.invalidateQueries({ queryKey: ["active-conversations"] });
  }
  handleMessageStatus = (data: any) => {
    const { id, status, conversationId } = data
    useChatStore.getState().updateMessagesStatus(conversationId, id, status)
  };
  close() {
    if (this.socket) {
      // this.socket.off("connect", this.handleConnect);
      this.socket.off("activeTeamMates", this.getActiveUsers);
      this.socket.off("newMessage", this.handleTeammateResponse);
      this.socket.off("newConversation", this.handleStartConversation);
      this.socket.off("closeConversationSuccess", this.handleCloseConversation);
      this.socket.off("joinConversationSuccess", this.handleJoinConversation);
      this.socket.off("unassignedConversationSuccess", this.handleUnassignConversation);
      this.socket.off("assignedConversationSuccess", this.handleAssignConversation);
      this.socket.off("messageRecieved", this.handleReceivedMessage);
      this.socket.off("messageStatus", this.handleMessageStatus);
      // this.socket.off("disconnect", this.handleDisconnect);
      this.socket.close();
      this.socket = null;
    }
  }
  getSocket() {
    return this.socket;
  }
}

const webSocketSingleton = new WebSocketSingleton();
export default webSocketSingleton;

