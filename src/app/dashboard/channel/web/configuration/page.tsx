"use client"
import ReusableButton from "@/components/shared/ReusableButton"
import SpinnerFull from "@/components/shared/SpinnerFull"
import ToolTip from "@/components/shared/ToolTip"
import { getWebConfigurations, updateWebConfigurations } from "@/service/webConfigurationsServices"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Copy } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

type Props = {}

export default function ConfigurationPage({ }: Props) {
    const [copied, setCopied] = useState(false)
    const [webSiteUrl, setWebSiteUrl] = useState('')
    const [script, setScript] = useState('')
    const [error, setError] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ['webConfigurations'],
        queryFn: getWebConfigurations,
    })

    const { mutate: updateConfigurations, isPending } = useMutation({
        mutationFn: updateWebConfigurations,
        onSuccess: () => {
            toast.success('Web Configuration updated successfully')
        },
        onError: () => {
            toast.error('Failed to update Web Configuration')
        }
    })

    function handleUpdateConfigurations() {
        if (webSiteUrl) {
            updateConfigurations(webSiteUrl)
        }
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(script);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };


    function handleChange(e: any) {
        setWebSiteUrl(e.target.value)
        if (webSiteUrl) {
            setError(false)
        }
    }
    function handleError() {
        if (webSiteUrl) {
            setError(false)
        } else {
            setError(true)
        }
    }
    useEffect(() => {
        if (data) {
            setWebSiteUrl(data?.webSiteUrl)
            setScript(data?.script)
        }
    }, [data])

    useEffect(() => {
        return () => setError(false)
    }, [])

    if (isLoading) return <SpinnerFull />
    return (
        <div className="pt-4 pl-14">
            <div className="w-[536px]">
                <div className="mb-7">
                    <div className="text-secondary-50 font-semibold font-barlow text-2xl">Web Configuration</div>
                    <p className="text-[13px] text-[#808080]">Follow the steps listed on the right to setup your chatbot, and go live.</p>
                </div>
                <div className="group relative">
                    <label className={`group-focus-within:text-primary-500 text-sm block mb-1  ${error ? 'text-[#f00]' : "text-secondary-50"}`}>Website URL</label>
                    <input className={`p-2 w-full border hover:border-primary-500 focus:outline-none focus:border-primary-500  rounded-lg text-sm text-black ${error ? 'border-[#f00]' : "border-[#e4e4e4]"}`} value={webSiteUrl} onChange={handleChange} onBlur={handleError} type="text" />
                    {error && <span className="absolute top-[calc(100%)] block text-[11px] text-[#f00]">This field cannot be empty</span>}
                </div>
                <div className="my-6">
                    <ReusableButton disabled={webSiteUrl.length === 0 || isPending} onClick={handleUpdateConfigurations}>
                        {isPending ? <span className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-primary-600 text-primary-600"></span> : "Save"}
                    </ReusableButton>
                </div>
                <div>
                    <p className="text-[#808080] text-sm">Copy the code snippet below, and paste it before the {`<body>`} tag on every page of your website</p>
                    <div className="relative min-h-14 flex items-center border border-[#e4e4e4] bg-[#f3f3f3] gap-2 rounded-lg text-secondary-50 p-2">
                        <p className="text-sm break-all">{String(script)}</p>
                        <ToolTip title={copied ? "Copied!" : "Copy to clipboard"}>
                            <span onClick={handleCopy} className="absolute top-2 right-2 w-8 h-8 cursor-pointer bg-white flex items-center justify-center rounded-[4px] p-1">
                                <Copy size={20} className="text-[#808080]" />
                            </span>
                        </ToolTip>
                    </div>
                </div>
            </div>
            <div className="fixed top-0 right-0 flex flex-col gap-5 py-11 px-6 w-[324px] h-full bg-[#f3f3f3]">
                <div className="text-lg text-secondary-50 font-bold leading-5">How do I add the chatbot on my website?</div>
                <div>
                    <div className="text-sm text-secondary-50 mb-1">Step 1 : Enter the website URL</div>
                    <p className="text-sm text-[#808080]">Your website URL where you’d like to deploy the bot</p>
                </div>
                <div>
                    <div className="text-sm text-secondary-50 mb-1">Step 2 : Copy & paste the code snippet</div>
                    <p className="text-sm text-[#808080]">Copy & paste the code snippet only on those pages, where you’d like to display the bot</p>
                </div>
                <div>
                    <div className="text-sm text-secondary-50 mb-1">Step 3 : Test the integration</div>
                    <p className="text-sm text-[#808080]">Visit your website URL and check if the chat interface appears</p>
                </div>
            </div>
        </div>
    )
}