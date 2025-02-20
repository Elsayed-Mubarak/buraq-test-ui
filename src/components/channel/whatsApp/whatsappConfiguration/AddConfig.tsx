import { ChevronUp } from 'lucide-react'
import React, { useState } from 'react'
import SelectProvider from './SelectProvider'
import DisplyedConfigurations from './DisplyedConfigurations'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createChannelWhatsappConfiguration } from '@/service/channelWhatsappConfiguratioServices'

type Props = {
    setOpenAddAccount: any,
}

export default function AddConfig({ setOpenAddAccount }: Props) {
    const queryClient = useQueryClient()
    const [createProviderDisplayed, setCreateProviderDisplayed] = useState<"" | "meta" | "360dialog-cloud" | "gupshup" | "twilio">("")
    const { mutate: createAccount, isPending } = useMutation({
        mutationFn: (data: any) => createChannelWhatsappConfiguration(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["whatsapp-configurations"] })
            toast.success("WhatsApp Business Accounts created successfully")
            setOpenAddAccount(false)
            setCreateMetaProvider({
                provider: 'meta',
                phoneNumber: '',
                accountId: '',
                appId: "",
                phoneNumberId: "",
                token: "",
            })
        },
        onError: (error: any) => {
            toast.error(error)
            console.log(error)
        }
    })
    const [provideNameError, setProviderNameError] = useState(false)
    const [errorsObject, setErrorsObject] = useState({
        phoneNumber: false,
        accountId: false,
        appId: false,
        phoneNumberId: false,
        token: false,
    })
    const [createMetaProvider, setCreateMetaProvider] = useState({
        provider: 'meta',
        phoneNumber: '',
        accountId: '',
        appId: "",
        phoneNumberId: "",
        token: "",
    })
    const [createDialogCloudProvider, setCreateDialogCloudProvider] = useState({
        provider: '360dialog-cloud',
        phoneNumber: '',
        apiKey: "",
    })
    const [createGupshupProvider, setCreateGupshupProvider] = useState({
        provider: 'gupshup',
        phoneNumber: '',
        appName: "",
        appId: "",
        apiKey: "",
    })
    const [createTwilioProvider, setCreateTwilioProvider] = useState({
        provider: 'twilio',
        phoneNumber: '',
        accountSID: "",
        authToken: "",
    })


    function handleCreateAccount() {
        if (!createProviderDisplayed) {
            setProviderNameError(true)
            toast.error("please select a provider")
            return
        }
        if (createProviderDisplayed !== "meta") {
            toast.error("only meta is supported for now")
            return
        }

        let hasError = false;

        if (createMetaProvider.phoneNumber === "") {
            setErrorsObject((prev) => ({
                ...prev,
                phoneNumber: true, // Set phoneNumber error to true
            }));
            hasError = true;
        }

        if (createMetaProvider.accountId === "") {
            setErrorsObject((prev) => ({
                ...prev,
                accountId: true,
            }));
            hasError = true;
        }

        if (createMetaProvider.appId === "") {
            setErrorsObject((prev) => ({
                ...prev,
                appId: true,
            }));
            hasError = true;
        }

        if (createMetaProvider.phoneNumberId === "") {
            setErrorsObject((prev) => ({
                ...prev,
                phoneNumberId: true,
            }));
            hasError = true;
        }

        if (createMetaProvider.token === "") {
            setErrorsObject((prev) => ({
                ...prev,
                token: true,
            }));
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const data = {
            phone_number: createMetaProvider.phoneNumber,
            business_account_id: createMetaProvider.accountId,
            app_id: createMetaProvider.appId,
            phone_number_id: createMetaProvider.phoneNumberId,
            token: createMetaProvider.token,
        }
        createAccount(data)
    }
    return (
        <div className="relative w-[536px] bg-white shadow-md border-2 border-primary-500 py-5 px-10 mb-2 rounded-lg">
            <span onClick={() => setOpenAddAccount(false)} className="absolute top-5 right-4">
                <ChevronUp className="w-5 h-5 text-primary-500 cursor-pointer" />
            </span>
            <SelectProvider
                providerDisplayed={createProviderDisplayed}
                setProviderDisplayed={setCreateProviderDisplayed}
                providerError={provideNameError}
                setPorvideError={setProviderNameError}
            />
            {createProviderDisplayed === "" && <DisplyedConfigurations
                mode="create"
                provider={createMetaProvider}
                setProvider={setCreateMetaProvider}
                handleCancel={() => setOpenAddAccount(false)}
                providerSelected={createProviderDisplayed}
                isLoading={isPending}
                handleClick={handleCreateAccount}
                errorsObject={errorsObject}
                setErrorsObject={setErrorsObject}
            />}

            {createProviderDisplayed === "meta" && <DisplyedConfigurations
                mode="create"
                provider={createMetaProvider}
                setProvider={setCreateMetaProvider}
                handleCancel={() => setOpenAddAccount(false)}
                providerSelected={createProviderDisplayed}
                isLoading={isPending}
                handleClick={handleCreateAccount}
                errorsObject={errorsObject}
                setErrorsObject={setErrorsObject}
            />}

            {createProviderDisplayed === "360dialog-cloud" && <DisplyedConfigurations
                mode="create"
                provider={createDialogCloudProvider}
                setProvider={setCreateDialogCloudProvider}
                handleCancel={() => setOpenAddAccount(false)}
                providerSelected={createProviderDisplayed}
                isLoading={isPending}
                handleClick={handleCreateAccount}
            />}

            {createProviderDisplayed === "gupshup" && <DisplyedConfigurations
                mode="create"
                provider={createGupshupProvider}
                setProvider={setCreateGupshupProvider}
                handleCancel={() => setOpenAddAccount(false)}
                providerSelected={createProviderDisplayed}
                isLoading={isPending}
                handleClick={handleCreateAccount}
            />}

            {createProviderDisplayed === "twilio" && <DisplyedConfigurations
                mode="create"
                provider={createTwilioProvider}
                setProvider={setCreateTwilioProvider}
                handleCancel={() => setOpenAddAccount(false)}
                providerSelected={createProviderDisplayed}
                isLoading={isPending}
                handleClick={handleCreateAccount}
            />}
        </div>
    )
}