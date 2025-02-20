import React, { useEffect, useState } from 'react'
import DisplyedConfigurations from './DisplyedConfigurations'
import { ChevronRight, ChevronUp, Trash2 } from 'lucide-react'
import SelectProvider from './SelectProvider';
import toast from 'react-hot-toast';

type Props = {
    account: any
    selectedAccountId: string | null;
    setSelectedAccountId: React.Dispatch<React.SetStateAction<string | null>>;
    handleOpenConfig: (id: string) => void;
    handleOpenDeleteAccount: (id: string) => void,
    handleUpdateAccount: any,
    isLoading: boolean
}

export default function ConfigAccount({ account, selectedAccountId, setSelectedAccountId, handleOpenConfig, handleOpenDeleteAccount, handleUpdateAccount, isLoading }: Props) {
    const [providerDisplayed, setProviderDisplayed] = useState<"meta" | "360dialog-cloud" | "gupshup" | "twilio">("meta")
    const [metaProvider, setMetaProvider] = useState({
        provider: 'meta',
        phoneNumber: '+966165109042',
        accountId: '+9846552150662',
        appId: "6541561656",
        phoneNumberId: "6541561656",
        token: "ASAGo3Qs0zEgBOxsdFrj5jOKrr3iBG7Q2m9ddkTqsdZCkUikrHZC1s3H0dgIdxKYZAEEhYVSwJnZAgGzdlOLZBeHuuxtZApT94kAFa9ZCif9ZA5B8nZAOQUufJZCAzieNlZBhLTo584p2pXBeAAw3hfHMzJNjVlgcKhh6umxSg4JkZBZCThqsdlXqMJTOELTOa8SQcCDOIUANSDM",
        webhook: "https://hooks.buraq.ai/incoming/whatsapp/meta-message/5sefeg3vxeuE6851653886152xxefef5B",
    })
    const [dialogCloudProvider, setDialogCloudProvider] = useState({
        provider: '360dialog-cloud',
        phoneNumber: '+966165109042',
        apiKey: "",
        webhook: "https://hooks.buraq.ai/incoming/whatsapp/meta-message/5sefeg3vxeuE6851653886152xxefef5B",
    })
    const [gupshupProvider, setGupshupProvider] = useState({
        provider: 'gupshup',
        phoneNumber: '+966165109042',
        appName: "",
        appId: "",
        apiKey: "",
        webhook: "https://hooks.buraq.ai/incoming/whatsapp/meta-message/5sefeg3vxeuE6851653886152xxefef5B",
    })
    const [twilioProvider, setTwilioProvider] = useState({
        provider: 'twilio',
        phoneNumber: '+966165109042',
        accountSID: "",
        authToken: "",
        webhook: "https://hooks.buraq.ai/incoming/whatsapp/meta-message/5sefeg3vxeuE6851653886152xxefef5B",
    })
    const [errorsObject, setErrorsObject] = useState({
        phoneNumber: false,
        accountId: false,
        appId: false,
        phoneNumberId: false,
        token: false,
    })
    useEffect(() => {
        if (account) {
            setMetaProvider({
                ...metaProvider,
                provider: "meta",
                phoneNumber: account.phoneNumber,
                accountId: account.whatsappBusinessAccountId,
                appId: account.appId,
                phoneNumberId: account.phoneNumberId,
                token: account.apiToken,
                webhook: "need return from backend"
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    function updateAccount() {
        if (providerDisplayed !== "meta") {
            toast.error("only meta is supported for now")
            return
        }

        let hasError = false;

        if (metaProvider.phoneNumber === "") {
            setErrorsObject((prev) => ({
                ...prev,
                phoneNumber: true,
            }));
            hasError = true;
        }

        if (metaProvider.accountId === "") {
            setErrorsObject((prev) => ({
                ...prev,
                accountId: true,
            }));
            hasError = true;
        }

        if (metaProvider.appId === "") {
            setErrorsObject((prev) => ({
                ...prev,
                appId: true,
            }));
            hasError = true;
        }

        if (metaProvider.phoneNumberId === "") {
            setErrorsObject((prev) => ({
                ...prev,
                phoneNumberId: true,
            }));
            hasError = true;
        }

        if (metaProvider.token === "") {
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
            phone_number: `+${metaProvider.phoneNumber}`,
            business_account_id: metaProvider.accountId,
            app_id: metaProvider.appId,
            phone_number_id: metaProvider.phoneNumberId,
            token: metaProvider.token,
        }
        handleUpdateAccount(account._id, data)
    }

    return (
        <>
            {
                account._id !== selectedAccountId ? (<div className="group w-[568px] flex items-center mb-2 justify-between">
                    <div className="w-[536px] group flex items-center p-4 rounded-lg border-2 border-[#cdcdcd] bg-white min-h-[72px] shadow-md hover:border-primary-500">
                        <div className="flex items-center justify-between w-full">
                            <div className="text-sm text-secondary-50">{account.phoneNumber}</div>
                            <span onClick={() => handleOpenConfig(account._id)} className="text-[#808080] group-hover:text-primary-500">
                                <ChevronRight className="w-5 h-5 text-inherit cursor-pointer" />
                            </span>
                        </div>
                    </div>
                    <span onClick={() => handleOpenDeleteAccount(account._id)} className="opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-5 h-5 text-secondary-50 cursor-pointer hover:text-[#f00]" />
                    </span>
                </div>)
                    : (
                        <div className="relative w-[536px] bg-white shadow-md border-2 border-primary-500 py-5 px-10 mb-2 rounded-lg">
                            <span onClick={() => setSelectedAccountId(null)} className="absolute top-5 right-4">
                                <ChevronUp className="w-5 h-5 text-primary-500 cursor-pointer" />
                            </span>
                            <SelectProvider
                                providerDisplayed={providerDisplayed}
                                setProviderDisplayed={setProviderDisplayed}
                            />
                            {providerDisplayed === "meta" && <DisplyedConfigurations
                                mode="edit"
                                provider={metaProvider}
                                setProvider={setMetaProvider}
                                handleCancel={() => setSelectedAccountId(null)}
                                handleClick={updateAccount}
                                errorsObject={errorsObject}
                                setErrorsObject={setErrorsObject}
                                isLoading={isLoading}
                            />}

                            {providerDisplayed === "360dialog-cloud" && <DisplyedConfigurations
                                mode="edit"
                                provider={dialogCloudProvider}
                                setProvider={setDialogCloudProvider}
                                handleCancel={() => setSelectedAccountId(null)}
                                handleClick={updateAccount}
                                errorsObject={errorsObject}
                                setErrorsObject={setErrorsObject}
                                isLoading={isLoading}
                            />}

                            {providerDisplayed === "gupshup" && <DisplyedConfigurations
                                mode="edit"
                                provider={gupshupProvider}
                                setProvider={setGupshupProvider}
                                handleCancel={() => setSelectedAccountId(null)}
                                handleClick={updateAccount}
                                errorsObject={errorsObject}
                                setErrorsObject={setErrorsObject}
                                isLoading={isLoading}
                            />}

                            {providerDisplayed === "twilio" && <DisplyedConfigurations
                                mode="edit"
                                provider={twilioProvider}
                                setProvider={setTwilioProvider}
                                handleCancel={() => setSelectedAccountId(null)}
                                handleClick={updateAccount}
                                errorsObject={errorsObject}
                                setErrorsObject={setErrorsObject}
                                isLoading={isLoading}
                            />}
                        </div>
                    )
            }
        </>
    )
}