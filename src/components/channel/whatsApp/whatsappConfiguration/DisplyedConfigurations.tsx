import PhoneInput from "react-phone-input-2";
import { Input } from "@/components/ui/input";
import "react-phone-input-2/lib/style.css";
import { Copy } from "lucide-react";
import InputField from "./InputField";
import ToolTip from "@/components/shared/ToolTip";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
type Props = {
    provider: any,
    setProvider: any,
    handleCancel: any,
    mode: "edit" | "create",
    providerSelected?: any,
    handleClick?: any
    isLoading?: boolean,
    errorsObject?: any,
    setErrorsObject?: any
}

export default function DisplyedConfigurations({ provider, setProvider, handleCancel, mode, providerSelected, handleClick, isLoading, errorsObject,
    setErrorsObject }: Props) {
    const [copied, setCopied] = useState(false)
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(provider?.webhook);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    function handleSaveClick() {
        if (handleClick) {
            handleClick();
        }
    }

    useEffect(() => {
        if (!errorsObject) return
        if (provider.phoneNumber.length > 0) {
            setErrorsObject((prev: any) => ({
                ...prev,
                phoneNumber: false,
            }));
        } else {
            setErrorsObject((prev: any) => ({
                ...prev,
                phoneNumber: true,
            }));
        }
        if (provider.token.length > 0) {
            setErrorsObject((prev: any) => ({
                ...prev,
                token: false,
            }));
        } else {
            setErrorsObject((prev: any) => ({
                ...prev,
                token: true,
            }));
        }
        if (provider.phoneNumberId.length > 0) {
            setErrorsObject((prev: any) => ({
                ...prev,
                phoneNumberId: false,
            }));
        } else {
            setErrorsObject((prev: any) => ({
                ...prev,
                phoneNumberId: true,
            }));
        }
        if (provider.appId.length > 0) {
            setErrorsObject((prev: any) => ({
                ...prev,
                appId: false,
            }));
        } else {
            setErrorsObject((prev: any) => ({
                ...prev,
                appId: true,
            }));
        }
        if (provider.accountId.length > 0) {
            setErrorsObject((prev: any) => ({
                ...prev,
                accountId: false,
            }));
        } else {
            setErrorsObject((prev: any) => ({
                ...prev,
                accountId: true,
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provider])

    return (
        <>
            {((mode === "create" && providerSelected) || (mode === "edit")) &&
                <>
                    <div className="group max-w-[340px] mb-5 relative">
                        <label htmlFor="phone-number" className={`group-focus-within:text-primary-500 hover:border-primary-500 focus:border-primary-500 text-sm block mb-1 ${errorsObject?.phoneNumber ? "text-[#f00]" : "text-secondary-50"}`}>Phone Number</label>
                        <PhoneInput
                            country={"sa"}
                            value={provider?.phoneNumber}
                            onChange={(value) => setProvider((prev: any) => ({ ...prev, phoneNumber: value }))}
                            inputStyle={{
                                display: "block",
                                width: "100%",
                                color: "#000",
                                height: "35px",
                                border: "0",
                            }}
                            buttonStyle={{
                                backgroundColor: "#fff",
                                borderRadius: "6px",
                                border: "0",
                            }}
                            containerStyle={{
                                border: `1px solid ${errorsObject?.phoneNumber ? "#f00" : "#e4e4e4"}`,
                                borderRadius: "6px"
                            }}
                            dropdownStyle={{
                                maxWidth: "340px",
                                maxHeight: "200px",
                                overflowY: "auto",
                                overflowX: "hidden",
                                borderRadius: "6px",
                                border: "1px solid #e4e4e4",
                            }}
                        />
                        {errorsObject?.phoneNumber && <span className="absolute top-[105%] text-[#f00] text-[11px]">this field is required</span>}
                    </div>

                    <InputField field="accountId" label={"WhatsApp Business Account ID"} value={provider?.accountId} setValue={setProvider} error={errorsObject?.accountId} />
                    <InputField field="appName" label={"App Name"} value={provider?.appName} setValue={setProvider} />
                    <InputField field="appId" label={"App ID"} value={provider?.appId} setValue={setProvider} error={errorsObject?.appId} />
                    <InputField field="phoneNumberId" label={"Phone Number ID"} value={provider?.phoneNumberId} setValue={setProvider} error={errorsObject?.phoneNumberId} />
                    <InputField field="token" label={"Token"} value={provider?.token} setValue={setProvider} error={errorsObject?.token} />
                    <InputField field="apiKey" label={"API Key"} value={provider?.apiKey} setValue={setProvider} />
                    <InputField field="accountSID" label={"Account SID"} value={provider?.accountSID} setValue={setProvider} />
                    <InputField field="authToken" label={"Auth Token"} value={provider?.authToken} setValue={setProvider} />
                </>}

            {mode === "edit" && <div className="group max-w-[340px] mb-5 relative">
                <label htmlFor="" className="group-focus-within:text-primary-500 text-sm text-secondary-50 block mb-1">Webhook</label>
                <Input disabled id="whatsapp-business-account-id" className="disabled:opacity-100 disabled:border-[rgba(0,0,0,0.23)] disabled:bg-[#cdcdcd] disabled:text-[#808080]" value={provider?.webhook} onChange={(e) => setProvider((prev: any) => ({ ...prev, webhook: e.target.value }))} />
                <ToolTip title={copied ? "Copied!" : "Copy to clipboard"}>
                    <span onClick={handleCopy} className="bg-white border border-transparent hover:border-primary-500 cursor-pointer rounded-[4px] flex items-center justify-center w-8 h-8 z-10 absolute right-1 bottom-1 text-sm text-[#808080]">
                        <Copy size={20} />
                    </span>
                </ToolTip>
            </div>}
            <div className="flex items-center gap-2">
                <button disabled={isLoading} onClick={handleSaveClick} className={`h-9 flex items-center justify-center bg-primary-500 text-white px-5 rounded-lg text-sm hover:bg-primary-600 disabled:pointer-events-none disabled:cursor-not-allowed`}>
                    {isLoading ? "Saving..." : "Save"}
                </button>
                <button onClick={handleCancel} className="h-9 flex items-center justify-center border border-transparent hover:border-primary-500 text-primary-500 px-5 rounded-lg text-sm">Cancel</button>
            </div>
        </>
    )
}
