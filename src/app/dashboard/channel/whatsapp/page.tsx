"use client";
import { axiosInstance } from '@/lib/axios';
import { useEffect } from 'react';
import { useState } from "react";
import WhatsappConfigurationRightSide from "@/components/channel/whatsApp/whatsappConfiguration/WhatsappConfigurationRightSide";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getChannelWhatsappConfigurations, updateChannelWhatsappConfiguration, deleteChannelWhatsappConfiguration } from '@/service/channelWhatsappConfiguratioServices';
import SpinnerFull from '@/components/shared/SpinnerFull';
import AddConfig from '@/components/channel/whatsApp/whatsappConfiguration/AddConfig';
import ConfigAccount from '@/components/channel/whatsApp/whatsappConfiguration/ConfigAccount';
import DeleteAccountModal from '@/components/channel/whatsApp/whatsappConfiguration/DeleteAccountModal';
import toast from 'react-hot-toast';


type Props = {}

export default function WhatsappPage({ }: Props) {
    const queryClient = useQueryClient()
    const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)
    const [accountIdToDelete, setAccountIdToDelete] = useState<string | null>(null)
    const [openDeleteAccount, setOpenDeleteAccount] = useState<boolean>(false)
    const [openAddAccount, setOpenAddAccount] = useState(false)

    const [popupLink, setPopupLink] = useState("");

    const { data: whatsAppConfigurations, isLoading } = useQuery({
        queryKey: ["whatsapp-configurations"],
        queryFn: getChannelWhatsappConfigurations,
    })

    const { mutate: updateAccount, isPending: isUpdating } = useMutation({
        mutationFn: ({ id, data }: any) => updateChannelWhatsappConfiguration(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["whatsapp-configurations"] })
            toast.success("WhatsApp Business Accounts updated successfully")
            setSelectedAccountId(null)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const { mutate: deleteAccount, isPending: deletingAccount } = useMutation({
        mutationFn: deleteChannelWhatsappConfiguration,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["whatsapp-configurations"] })
            toast.success("WhatsApp Business Account deleted successfully")
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const handleButtonClick = async () => {
        try {
            const response = await axiosInstance.post("/api/connect");
            console.log("response:", response)
            const data = response.data;
            if (data?.authUrl) {
                setPopupLink(data.authUrl);
                const popup = window.open(data.authUrl, "WhatsAppConnectPopup", "width=600,height=600");
                if (popup) popup.focus();
            } else { console.error("No link received from API."); }
        }
        catch (error) { console.error("Failed to fetch Instagram link:", error); }
    };

    function handleOpenConfig(id: string) {
        setSelectedAccountId(id)
        setOpenAddAccount(false)
    }
    function handleOpenAddAccount() {
        setOpenAddAccount(true)
        setSelectedAccountId(null)
    }


    function handleOpenDeleteAccount(id: string) {
        setOpenDeleteAccount(true)
        setAccountIdToDelete(id)
    }
    function handleDeleteAccount() {
        if (!accountIdToDelete) return
        deleteAccount(accountIdToDelete)
    }
    function handleUpdateAccount(id: any, data: any) {
        updateAccount({ id: id, data: data })
    }

    if (isLoading) return <SpinnerFull />
    return (
        <div className="h-full pl-[56px] overflow-y-auto">
            <DeleteAccountModal
                isOpen={openDeleteAccount}
                setIsOpen={setOpenDeleteAccount}
                handleDeleteAccount={handleDeleteAccount}
                isLoading={deletingAccount}
            />
            <div className="max-w-[536px]">
                <div className="w-full pb-8">
                    <div className="pt-4">
                        <div className="font-barlow text-2xl font-semibold text-secondary-50 mb-[6px] leading-6">WhatsApp Configuration</div>
                        <div className="text-sm text-[#808080] leading-5">Connect your WhatsApp Business APIs to automate incoming/outgoing messages.</div>
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                        <span className="text-sm text-[#808080]">To add / get new WhatsApp API from Meta, click here</span>
                        <button onClick={handleButtonClick} className="flex items-center justify-center min-w-[120px] min-h-9 px-5 bg-primary-500 transition-all duration-300 hover:bg-primary-600 text-white rounded-lg cursor-pointer text-sm">Get WhatsApp API</button>
                    </div>
                    <div className="mt-2">
                        <button onClick={handleOpenAddAccount} className="my-3 bg-transparent border-none text-primary-500 text-sm cursor-pointer transition-all duration-300 hover:underline">Already have a WhatsApp API?</button>
                    </div>
                    <div>
                        <div className="text-sm text-[#808080]">WhatsApp Business Accounts</div>
                        <div>
                            {
                                whatsAppConfigurations?.configs.map((account: any) => (
                                    <ConfigAccount
                                        key={account._id}
                                        account={account}
                                        handleOpenDeleteAccount={handleOpenDeleteAccount}
                                        selectedAccountId={selectedAccountId}
                                        setSelectedAccountId={setSelectedAccountId}
                                        handleOpenConfig={handleOpenConfig}
                                        handleUpdateAccount={handleUpdateAccount}
                                        isLoading={isUpdating}
                                    />))
                            }
                            {openAddAccount && <AddConfig
                                setOpenAddAccount={setOpenAddAccount}
                            />}
                        </div>
                    </div>
                </div>
            </div>
            <WhatsappConfigurationRightSide />
        </div>
    )
}
