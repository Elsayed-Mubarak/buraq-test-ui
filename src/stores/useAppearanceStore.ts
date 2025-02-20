import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

interface StoreState {
    widgetName: string;
    widgetIconLink: string;
    widgetIcon: File | null;
    widgetIconPreview: string | null;

    headerLogoName: string;
    headerLogoLink: string;
    headerLogo: File | null;
    headerLogoPreview: string | null;

    botIconName: string;
    botIconLink: string;
    botIcon: File | null;
    botIconPreview: string | null;

    headerText: string;
    hintText: string;
    accentColor: string;
    fontColor: string;
    customeStyleSheet: string;
    chatInterfacePosition: "left" | "right";

    isLoading: boolean;
    isUpdating: boolean;
    setIsLoading: (loading: boolean) => void;
    setIsUpdating: (loading: boolean) => void;

    setWidgetIconLink: (link: string) => void;
    setWidgetName: (name: string) => void;
    setWidgetIcon: (file: File | null) => void;
    deleteWidgetIcon: () => void;

    setHeaderLogoName: (name: string) => void;
    setHeaderLogoLink: (link: string) => void;
    setHeaderLogo: (file: File | null) => void;
    deleteHeaderLogo: () => void;

    setBotIconName: (name: string) => void;
    setBotIconLink: (link: string) => void;
    setBotIcon: (file: File | null) => void;
    deleteBotIcon: () => void;

    setHeaderText: (text: string) => void;
    setHintText: (text: string) => void;
    setAccentColor: (color: string) => void;
    setFontColor: (color: string) => void;
    setCustomeStyleSheet: (style: string) => void;
    setChatInterfacePosition: (position: "left" | "right") => void;

    fetchWebAppearanceData: () => Promise<void>;
    updateWebAppearance: () => Promise<void>;
    reset: () => void;
}

const initialState = {
    widgetName: "",
    widgetIconLink: "",
    widgetIcon: null,
    widgetIconPreview: null,

    headerLogoName: "",
    headerLogoLink: "",
    headerLogo: null,
    headerLogoPreview: null,

    botIconName: "",
    botIconLink: "",
    botIcon: null,
    botIconPreview: null,

    headerText: "",
    hintText: "",
    accentColor: "",
    fontColor: "",
    customeStyleSheet: "",
    chatInterfacePosition: "right" as "left" | "right",
    isLoading: false,
    isUpdating: false
};

const useAppearanceStore = create<StoreState>((set, get) => ({
    ...initialState,

    setIsLoading: (loading) => set(() => ({ isLoading: loading })),
    setIsUpdating: (loading) => set(() => ({ isUpdating: loading })),
    setWidgetName: (name) => set(() => ({ widgetName: name })),
    setWidgetIconLink: (link) => set(() => ({ widgetIconLink: link })),
    setWidgetIcon: (file) => set(() => ({
        widgetIcon: file,
        widgetIconPreview: file ? URL.createObjectURL(file) : null,
        widgetName: file ? file.name : "",
    })),
    deleteWidgetIcon: () => set(() => ({
        widgetIcon: null,
        widgetIconPreview: null,
        widgetName: "",
    })),

    setHeaderLogoName: (name) => set(() => ({ headerLogoName: name })),
    setHeaderLogoLink: (link) => set(() => ({ headerLogoLink: link })),
    setHeaderLogo: (file) => set(() => ({
        headerLogo: file,
        headerLogoPreview: file ? URL.createObjectURL(file) : null,
        headerLogoName: file ? file.name : "",
    })),
    deleteHeaderLogo: () => set(() => ({
        headerLogo: null,
        headerLogoPreview: null,
        headerLogoName: "",
    })),

    setBotIconName: (name) => set(() => ({ botIconName: name })),
    setBotIconLink: (link) => set(() => ({ botIconLink: link })),
    setBotIcon: (file) => set(() => ({
        botIcon: file,
        botIconPreview: file ? URL.createObjectURL(file) : null,
        botIconName: file ? file.name : "",
    })),
    deleteBotIcon: () => set(() => ({
        botIcon: null,
        botIconPreview: null,
        botIconName: "",
    })),

    setHeaderText: (text) => set(() => ({ headerText: text })),
    setHintText: (text) => set(() => ({ hintText: text })),
    setAccentColor: (color) => set(() => ({ accentColor: color })),
    setFontColor: (color) => set(() => ({ fontColor: color })),
    setCustomeStyleSheet: (style) => set(() => ({ customeStyleSheet: style })),
    setChatInterfacePosition: (position) => set(() => ({ chatInterfacePosition: position })),

    fetchWebAppearanceData: async () => {
        set(() => ({ isLoading: true })); // Start loading
        try {
            const response = await axiosInstance.get("/api/channel/web/appearance");
            const data = response.data;
            set(() => ({
                widgetName: data.widgetIconName,
                widgetIconLink: data.widgetIcon,
                headerText: data.headerText,
                hintText: data.hintText,
                accentColor: data.accentColor,
                fontColor: data.fontColor,
                chatInterfacePosition: data.chatInterfacePosition.toLowerCase() as "left" | "right",
                botIconLink: data.botIcon,
                botIconName: data.botIconName,
                headerLogoLink: data.headerLogo,
                headerLogoName: data.headerLogoName,
            }));
        } catch (error: any) {
            console.error("Failed to fetch data:", error);
            toast.error(error.message);
        } finally {
            set(() => ({ isLoading: false })); // Stop loading
        }
    },

    updateWebAppearance: async () => {
        set(() => ({ isUpdating: true }));
        const { fetchWebAppearanceData } = get();
        try {
            const {
                widgetName,
                headerText,
                hintText,
                accentColor,
                fontColor,
                chatInterfacePosition,
                botIcon,
                botIconName,
                headerLogo,
                headerLogoName,
                widgetIcon,
            } = get();

            const formData = new FormData();
            formData.append("headerText", headerText);
            formData.append("hintText", hintText);
            formData.append("accentColor", accentColor);
            formData.append("chatInterfacePosition", chatInterfacePosition);
            formData.append("fontColor", fontColor);

            if (widgetIcon) {
                formData.append("widgetIcon", widgetIcon);
                formData.append("widgetIconName", widgetName);
            }

            if (headerLogo) {
                formData.append("headerLogo", headerLogo);
                formData.append("headerLogoName", headerLogoName);
            }

            if (botIcon) {
                formData.append("botIcon", botIcon);
                formData.append("botIconName", botIconName);
            }

            await axiosInstance.put("/api/channel/webappearance", formData);

            toast.success("Web Apearance settings updated succussfully")
            await fetchWebAppearanceData();
        } catch (error: any) {
            console.error("Failed to update appearance:", error);
            toast.error(error.message)
        } finally {
            set(() => ({ isUpdating: false }));
        }
    },
    reset: () => set(() => ({ ...initialState, chatInterfacePosition: initialState.chatInterfacePosition })),
}));

export default useAppearanceStore;
