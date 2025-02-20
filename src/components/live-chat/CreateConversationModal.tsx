"use client"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { startWhatsAppConversation as startWhatsAppConversationApi } from "@/service/chatService";
import toast from 'react-hot-toast';
import Button from './Button';
import { MessageSquarePlus } from "lucide-react";
import Portal from "@/components/shared/Portal";
import StartWhatsappConversation from "./StartWhatsappConversation";
import StartSmsConversation from "./StartSmsConversation";
import { useChatStore } from '@/stores/useChatStore';

type Props = {}

export default function CreateConversationModal({ }: Props) {
    const router = useRouter()
    const queryClient = useQueryClient();
    const setSelectedConversation = useChatStore((state) => state.setSelectedConversation)

    const [channel, setChannel] = useState<"whatsapp" | "sms">("whatsapp");
    const [template, setTemplate] = useState({})
    const [phone, setPhone] = useState<string>("")
    const [openModel, setOpenModel] = useState<boolean>(false);
    const [conversationVariables, setConversationVariables] = useState<any>([]);
    const [variblesErrors, setVariblesErrors] = useState(false)

    function openConversationModel() {
        setOpenModel(true);
    }

    const { mutate: createConversation, isPending: isCreateingConversation } =
        useMutation({
            mutationFn: startWhatsAppConversationApi,
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ["active-conversations"] });
                setPhone("");
                setOpenModel(false);
                router.push('/dashboard/live-chat')
                toast.success("Conversation created successfully");
                setSelectedConversation(data.conversation)
            },
            onError: (error: any) => {
                toast.error(error);
            },
        });

    const handleStartWhatsAppConversation = async () => {
        const hasEmptyValue = conversationVariables.some((item: any) => item.value === "");
        if (hasEmptyValue) {
            setVariblesErrors(true)
            return
        }
        createConversation({ from: "+966597373049", to: phone, template, variables: conversationVariables });
    };

    useEffect(() => {
        setVariblesErrors(false)
        return () => setVariblesErrors(false)
    }, [template])

    return (
        <>
            <Button onClick={openConversationModel} className="w-full">
                <span>
                    <MessageSquarePlus fill="#fff" stroke="#343de6" className="h-5 w-5" />
                </span>
                <span>New conversation</span>
            </Button>
            {
                openModel && (
                    <Portal>
                        <div className="fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-[rgba(0,0,0,.1)]">
                            {channel === "whatsapp" && <StartWhatsappConversation
                                channel={channel}
                                setChannel={setChannel}
                                setOpenModel={setOpenModel}
                                setTemplate={setTemplate}
                                template={template}
                                phone={phone}
                                setPhone={setPhone}
                                isCreateingConversation={isCreateingConversation}
                                handleStartWhatsAppConversation={handleStartWhatsAppConversation}
                                setConversationVariables={setConversationVariables}
                                variblesErrors={variblesErrors}
                                setVariblesErrors={setVariblesErrors}
                            />}

                            {channel === "sms" && <StartSmsConversation channel={channel} setChannel={setChannel} setOpenModel={setOpenModel} />}
                        </div>
                    </Portal>
                )
            }
        </>
    )
}

