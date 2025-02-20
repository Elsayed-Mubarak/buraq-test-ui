import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";
interface Message {
  _id?: string;
  type: string;
  content: string;
  file?: File | string;
  attachmentUrl?: string;
  caption?: string;
  to: string;
  from: string;
  updatedAt: string;
}
interface Contact {
  phone: string;
  [key: string]: any; // Add additional fields as needed
}
interface Conversation {
  _id: string;
  contact: Contact;
  messages: Message[];
  [key: string]: any; // Add additional fields as needed
}
interface Conversations {
  you: Conversation[];
  assigned: Conversation[];
  unassigned: Conversation[];
  tempSla: Conversation[];
}

interface ClosedConversations {
  sla: Conversation[];
  closed: Conversation[];
}

interface ConversationCounts {
  you: number;
  assigned: number;
  unassigned: number;
}


interface ChatStore {
  activeMembers: string[];
  activeconversations: any;
  conversationCounts: any;
  closedconversations: any;
  selectedConversation: any;
  contactInfo: any;
  businessPhoneNumber: string;
  teamates: any[]
  teams: any[]
  savedReplies: any[]
  templates: any[]
  searchedConversations: any[];

  setSearchedConversations: (data: any, reset?: boolean) => void;
  setActiveMembers: (members: string[]) => void;
  setActiveConversations: (conversations: any) => void;
  setSelectedConversation: (conversation: any | null) => void;

  fetchActiveConversations: () => Promise<any | void>;
  fetchClosedConversations: () => Promise<any[]>;
  fetchSLAConversations: () => Promise<any[]>;
  addNewConversation: (newConversation: any) => void;

  setTeammates: (teammates: any[]) => void
  setTeams: (teams: any[]) => void
  setSavedReplies: (savedReplies: any[]) => void
  setTemplates: (templates: any) => void

  addNewMessage: (message: any) => void;
  updateMessagesStatus: (conversationId: string, messageId: string, status: any) => void;


}
export const useChatStore = create<ChatStore>()(
  persist((set, get) => ({
    activeMembers: [],
    activeconversations: {
      you: [],
      assigned: [],
      unassigned: [],
      tempSla: [],
    },
    conversationCounts: {
      you: 0,
      assigned: 0,
      unassigned: 0,
    },
    closedconversations: {
      sla: [],
      closed: [],
    },
    searchedConversations: [],
    selectedConversation: null,
    businessPhoneNumber: "+966597373049",
    contactInfo: null,
    teamates: [],
    teams: [],
    savedReplies: [],
    templates: [],

    setSearchedConversations: (data, reset = false) => {
      set((state) => ({
        searchedConversations: reset ? data : [...state.searchedConversations, ...data],
      }));
    },
    setActiveMembers: (members) => {
      set({
        activeMembers: members,
      });
    },
    setSelectedConversation: (conversation) => {
      set({
        selectedConversation: conversation,
        contactInfo: conversation?.contact,
      });
    },
    setActiveConversations: (conversations) => {
      set({
        activeconversations: conversations,
        conversationCounts: {
          you: conversations.you.length,
          assigned: conversations.assigned.length,
          unassigned: conversations.unassigned.length,
        },
      });
    },
    fetchActiveConversations: async () => {
      try {
        const [you, assigned, unassigned, tempSla] = await Promise.all([
          axiosInstance.get('/api/conversations/you'),
          axiosInstance.get('/api/conversations/assigned/opened'),
          axiosInstance.get('/api/conversations/unassigned/opened'),
          axiosInstance.get('/api/conversations/sla/opened'),
        ]);
        return {
          you: you.data,
          assigned: assigned.data,
          unassigned: unassigned.data,
          tempSla: tempSla.data,
        };
      } catch (error: any) {
        throw error.response.data.message || error.response.data.error;
      }
    },
    fetchClosedConversations: async () => {
      try {
        const { data } = await axiosInstance.get(`/api/conversations/closed`);
        set((state) => ({
          closedconversations: {
            ...state.closedconversations,
            closed: [...data],
          },
        }));
        return data;
      } catch (error: any) {
        throw error.response.data.message || error.response.data.error
      }
    },
    fetchSLAConversations: async () => {
      try {
        const { data } = await axiosInstance.get(`/api/conversations/sla/closed`);
        set((state) => ({
          closedconversations: {
            ...state.closedconversations,
            sla: data,
          },
        }));
        return data;
      } catch (error: any) {
        throw error.response.data.message || error.response.data.error
      }
    },
    setTeammates: (teammates) => {
      set({
        teamates: teammates,
      });
    },
    setTeams: (teams) => {
      set({ teams: teams })
    },
    setSavedReplies: (savedReplies) => {
      set({ savedReplies: savedReplies })
    },
    setTemplates: (templates) => {
      set({ templates: templates })
    },
    addNewConversation: (newConversation) => {
      set((state) => {
        const assignedTo = newConversation.assignedTo;
        if (assignedTo === useAuthStore.getState().authUser._id) return state;
        return {
          activeconversations: {
            ...state.activeconversations,
            assigned: assignedTo
              ? [...state.activeconversations.assigned, newConversation]
              : state.activeconversations.assigned,
            unassigned: !assignedTo
              ? [...state.activeconversations.unassigned, newConversation]
              : state.activeconversations.unassigned,
          },
          conversationCounts: {
            you: state.activeconversations.you.length,
            assigned: assignedTo
              ? state.activeconversations.assigned.length + 1
              : state.activeconversations.assigned.length,
            unassigned: !assignedTo
              ? state.activeconversations.unassigned.length + 1
              : state.activeconversations.unassigned.length,
          },
        }
      })
    },

    addNewMessage: (message) => {
      set((state) => ({
        ...state,
        selectedConversation:
          state.selectedConversation?._id === message.conversationId
            ? {
              ...state.selectedConversation,
              messages: [...(state.selectedConversation.messages || []), message],
            }
            : state.selectedConversation,
        activeconversations: {
          ...state.activeconversations,
          you: state.activeconversations.you.map((conv: any) =>
            conv._id === message.conversationId
              ? {
                ...conv,
                messages: [...conv.messages, message],
              }
              : conv
          ),
          assigned: state.activeconversations.assigned.map((conv: any) =>
            conv._id === message.conversationId
              ? {
                ...conv,
                messages: [...conv.messages, message],
              }
              : conv
          ),
          unassigned: state.activeconversations.assigned.map((conv: any) =>
            conv._id === message.conversationId
              ? {
                ...conv,
                messages: [...conv.messages, message],
              }
              : conv
          ),
        },
      }))
    },
    // updateMessagesStatus: (conversationId, messageId, status) => {
    //   if (status === "sent" || status === "read") {
    //     return
    //   }
    //   // set((state) => ({
    //   //   selectedConversation: {
    //   //     ...state.selectedConversation,
    //   //     messages: state.selectedConversation.messages.map((message: any) =>
    //   //       message.id === messageId
    //   //         ? { ...message, status: status }
    //   //         : message
    //   //     ),
    //   //   },
    //   // }));
    //   set((state) => ({
    //     ...state,
    //     selectedConversation: {
    //       ...state.selectedConversation,
    //       messages: state.selectedConversation?.messages.map((message: any) =>
    //         message.id === messageId
    //           ? { ...message, status: status }
    //           : message
    //       ),
    //     },
    //     activeconversations: {
    //       ...state.activeconversations,
    //       you: state.activeconversations.you.map((conv: any) =>
    //         conv._id === conversationId
    //           ? {
    //             ...conv,
    //             messages: conv.messages.map((message: any) =>
    //               message.id === messageId
    //                 ? { ...message, status: status }
    //                 : message
    //             ),
    //           }
    //           : conv
    //       ),
    //       assigned: state.activeconversations.assigned.map((conv: any) =>
    //         conv._id === conversationId
    //           ? {
    //             ...conv,
    //             messages: conv.messages.map((message: any) =>
    //               message.id === messageId
    //                 ? { ...message, status: status }
    //                 : message
    //             ),
    //           }
    //           : conv
    //       ),
    //       unassigned: state.activeconversations.assigned.map((conv: any) =>
    //         conv._id === conversationId
    //           ? {
    //             ...conv,
    //             messages: conv.messages.map((message: any) =>
    //               message.id === messageId
    //                 ? { ...message, status: status }
    //                 : message
    //             ),
    //           }
    //           : conv
    //       ),
    //       tempSla: state.activeconversations.tempSla.map((conv: any) =>
    //         conv._id === conversationId
    //           ? {
    //             ...conv,
    //             messages: conv.messages.map((message: any) =>
    //               message.id === messageId
    //                 ? { ...message, status: status }
    //                 : message
    //             ),
    //           }
    //           : conv
    //       ),
    //     }
    //   }))
    // },
    updateMessagesStatus: (conversationId: string, messageId: string, newStatus: "sent" | "delivered" | "read") => {
      const statusPriority: Record<"sent" | "delivered" | "read", number> = {
        sent: 1,
        delivered: 2,
        read: 3,
      };

      set((state) => {
        return {
          ...state,
          selectedConversation: {
            ...state.selectedConversation,
            messages: state.selectedConversation?.messages.map((message: any) =>
              message.id === messageId &&
                statusPriority[newStatus] > statusPriority[message.status as "sent" | "delivered" | "read"] // ✅ Type assertion added here
                ? { ...message, status: newStatus }
                : message
            ),
          },
          activeconversations: {
            ...state.activeconversations,
            you: state.activeconversations.you.map((conv: any) =>
              conv._id === conversationId
                ? {
                  ...conv,
                  messages: conv.messages.map((message: any) =>
                    message.id === messageId &&
                      statusPriority[newStatus] > statusPriority[message.status as "sent" | "delivered" | "read"]
                      ? { ...message, status: newStatus }
                      : message
                  ),
                }
                : conv
            ),
            assigned: state.activeconversations.assigned.map((conv: any) =>
              conv._id === conversationId
                ? {
                  ...conv,
                  messages: conv.messages.map((message: any) =>
                    message.id === messageId &&
                      statusPriority[newStatus] > statusPriority[message.status as "sent" | "delivered" | "read"]
                      ? { ...message, status: newStatus }
                      : message
                  ),
                }
                : conv
            ),
            unassigned: state.activeconversations.unassigned.map((conv: any) =>
              conv._id === conversationId
                ? {
                  ...conv,
                  messages: conv.messages.map((message: any) =>
                    message.id === messageId &&
                      statusPriority[newStatus] > statusPriority[message.status as "sent" | "delivered" | "read"]
                      ? { ...message, status: newStatus }
                      : message
                  ),
                }
                : conv
            ),
            tempSla: state.activeconversations.tempSla.map((conv: any) =>
              conv._id === conversationId
                ? {
                  ...conv,
                  messages: conv.messages.map((message: any) =>
                    message.id === messageId &&
                      statusPriority[newStatus] > statusPriority[message.status as "sent" | "delivered" | "read"]
                      ? { ...message, status: newStatus }
                      : message
                  ),
                }
                : conv
            ),
          },
        };
      });
    }

  }),
    {
      name: "chat-store",
      partialize: (state) => ({
        activeMembers: state.activeMembers,
      }),
    }
  )
);

