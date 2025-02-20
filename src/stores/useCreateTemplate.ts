import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { axiosInstance } from "@/lib/axios";

type BtnType = {
  id: string;
  type: "quick-reply" | "url" | "call";
  label: string;
  value?: string;
};

type CreateTemplateStore = {
  templateName: string;
  phoneNumber: string;
  category: string;
  language: string;
  buttons: BtnType[];
  headerObject: {
    name: string;
    type: string;
    value: any;
  };
  bodyObject: {
    name: string;
    value: string;
  };
  footerObject: {
    name: string;
    value: string;
  };
  variables: any[];
  setTemplateName: (name: string) => void;
  setPhoneNumber: (name: string) => void;
  setLanguage: (name: string) => void;
  setCategory: (name: string) => void;
  setButtons: () => void;
  addButton: (btn: BtnType) => void;
  removeButton: (id: string) => void;
  addQuickReplyBtn: () => void;
  addURLBtn: () => void;
  addCallBtn: () => void;
  updateButton: (id: string, field: keyof BtnType, value: string) => void;
  changeHeaderType: (newType: string) => void;
  changeHeaderValue: (newValue: string) => void;
  changeBodyText: (newValue: string) => void;
  changeFooterText: (newValue: string) => void;
  fetchAllVariables: () => Promise<void>;
  resetStore: () => void;
};

const useCreateTemplateStore = create<CreateTemplateStore>((set) => {
  const initialState = {
    templateName: "",
    phoneNumber: "",
    category: "",
    language: "en_US",
    buttons: [],
    headerObject: {
      name: "header",
      type: "no-header",
      value: "",
    },
    bodyObject: {
      name: "body",
      value: "",
    },
    footerObject: {
      name: "footer",
      value: "",
    },
  };

  return {
    ...initialState,
    variables: [],

    setTemplateName: (name: string) => set({ templateName: name }),
    setPhoneNumber: (phone: string) => set({ phoneNumber: phone }),
    setCategory: (category: string) => set({ category: category }),
    setLanguage: (lang: string) => set({ language: lang }),
    setButtons: () => set({ buttons: [] }),
    addButton: (btn) =>
      set((state) => ({
        buttons: [...state.buttons, btn],
      })),
    removeButton: (id) =>
      set((state) => ({
        buttons: state.buttons.filter((btn) => btn.id !== id),
      })),
    addQuickReplyBtn: () =>
      set((state) => ({
        buttons: [
          {
            id: uuidv4(),
            type: "quick-reply",
            label: "Know more",
          },
          ...state.buttons,
        ],
      })),
    addURLBtn: () =>
      set((state) => ({
        buttons: [
          ...state.buttons,
          {
            id: uuidv4(),
            type: "url",
            label: "Visit website",
            value: "",
          },
        ],
      })),
    addCallBtn: () =>
      set((state) => ({
        buttons: [
          ...state.buttons,
          {
            id: uuidv4(),
            type: "call",
            label: "Call now",
            value: "",
          },
        ],
      })),
    updateButton: (id, field, value) =>
      set((state) => ({
        buttons: state.buttons.map((btn) =>
          btn.id === id ? { ...btn, [field]: value } : btn
        ),
      })),
    changeHeaderType: (newType: string) =>
      set((state) => ({
        headerObject: { ...state.headerObject, type: newType },
      })),
    changeHeaderValue: (newValue: string) =>
      set((state) => ({
        headerObject: { ...state.headerObject, value: newValue },
      })),
    changeBodyText: (newValue: string) =>
      set((state) => ({
        bodyObject: { ...state.bodyObject, value: newValue },
      })),
    changeFooterText: (newValue: string) =>
      set((state) => ({
        footerObject: { ...state.footerObject, value: newValue },
      })),
    fetchAllVariables: async () => {
      try {
        const response = await axiosInstance.get("/api/variables/contact");
        set({ variables: response.data });
      } catch (error: any) {
        console.error("Error fetching variables:", error);
        throw error.response.data.message;
      }
    },
    resetStore: () => set(() => initialState), // Reset store to initial state
  };
});

export default useCreateTemplateStore;


// import { create } from "zustand";
// import { v4 as uuidv4 } from "uuid";

// type BtnType = {
//   id: string;
//   type: "quick-reply" | "url" | "call";
//   label: string;
//   value?: string;
// };

// type CreateTemplateStore = {
//   templateName: string;
//   phoneNumber: string;
//   category: string;
//   language: string;
//   buttons: BtnType[];
//   headerObject: {
//     name: string;
//     type: string;
//     value: any;
//   };
//   bodyObject: {
//     name: string;
//     value: string;
//   };
//   footerObject: {
//     name: string;
//     value: string;
//   };
//   setTemplateName: (name: string) => void;
//   setPhoneNumber: (name: string) => void;
//   setLanguage: (name: string) => void;
//   setCategory: (name: string) => void;
//   addButton: (btn: BtnType) => void;
//   removeButton: (id: string) => void;
//   addQuickReplyBtn: () => void;
//   addURLBtn: () => void;
//   addCallBtn: () => void;
//   updateButton: (id: string, field: keyof BtnType, value: string) => void;
//   changeHeaderType: (newType: string) => void;
//   changeHeaderValue: (newValue: string) => void;
//   changeBodyText: (newValue: string) => void;
//   changeFooterText: (newValue: string) => void;
// };

// const useCreateTemplateStore = create<CreateTemplateStore>((set) => ({
//   templateName: "",
//   phoneNumber: "",
//   category: "",
//   language: "en_US",
//   buttons: [],
//   headerObject: {
//     name: "header",
//     type: "no-header",
//     value: "",
//   },
//   bodyObject: {
//     name: "body",
//     value: "",
//   },
//   footerObject: {
//     name: "footer",
//     value: "",
//   },

//   setTemplateName: (name: string) => set({ templateName: name }),
//   setPhoneNumber: (phone: string) => set({ phoneNumber: phone }),
//   setCategory: (category: string) => set({ category: category }),
//   setLanguage: (lang: string) => set({ language: lang }),
//   addButton: (btn) =>
//     set((state) => ({
//       buttons: [...state.buttons, btn],
//     })),
//   removeButton: (id) =>
//     set((state) => ({
//       buttons: state.buttons.filter((btn) => btn.id !== id),
//     })),
//   addQuickReplyBtn: () =>
//     set((state) => ({
//       buttons: [
//         ...state.buttons,
//         {
//           id: uuidv4(),
//           type: "quick-reply",
//           label: "Know more",
//         },
//       ],
//     })),
//   addURLBtn: () =>
//     set((state) => ({
//       buttons: [
//         ...state.buttons,
//         {
//           id: uuidv4(),
//           type: "url",
//           label: "Visit website",
//           value: "",
//         },
//       ],
//     })),
//   addCallBtn: () =>
//     set((state) => ({
//       buttons: [
//         ...state.buttons,
//         {
//           id: uuidv4(),
//           type: "call",
//           label: "Call now",
//           value: "",
//         },
//       ],
//     })),
//   updateButton: (id, field, value) =>
//     set((state) => ({
//       buttons: state.buttons.map((btn) =>
//         btn.id === id ? { ...btn, [field]: value } : btn,
//       ),
//     })),
//   changeHeaderType: (newType: string) =>
//     set((state) => ({
//       headerObject: { ...state.headerObject, type: newType },
//     })),
//   changeHeaderValue: (newValue: string) =>
//     set((state) => ({
//       headerObject: { ...state.headerObject, value: newValue },
//     })),
//   changeBodyText: (newValue: string) =>
//     set((state) => ({
//       bodyObject: { ...state.bodyObject, value: newValue },
//     })),
//   changeFooterText: (newValue: string) =>
//     set((state) => ({
//       footerObject: { ...state.footerObject, value: newValue },
//     })),
// }));

// export default useCreateTemplateStore;
