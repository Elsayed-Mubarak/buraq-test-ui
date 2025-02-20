import NodeSettingsHeader from "../../node-settings-bar/node-settings-header"
import { LuCopy } from "react-icons/lu";
import { svgs } from "../../shared/SVG"
import { useZapierStore } from "../../store/zipper.store";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip";
import useFlowStore from "../../reactflowstate/store";

function ZappierSettingsContent() {
    const { selectedNode } = useFlowStore();

    const [copied, setCopied] = useState<boolean>(false);
    const { handleCopyToken, token } = useZapierStore((state) => state);

    const onCopyToken = () => {
        handleCopyToken(token || "")
        setCopied(true)
    }

    return (
        <>
            <NodeSettingsHeader icon={svgs.zapier} text="Zapier 1" />

            <h3 className="node-settings-desc my-6">
                Triggers an automation on Zapier that performs actions on other tools.
            </h3>

            <div className="flex flex-col gap-4 text-nodeSettings text-sm font-medium">
                <div>
                    <h3 className="font-extrabold">Step1:</h3>
                    <p className="font-semibold">Open Zapier and add “Buraq” as the Trigger app.</p>
                </div>
                <div>
                    <h3 className="font-extrabold">Step2:</h3>
                    <p className="font-semibold">Choose “Zapier Block Activated” as the event.</p>
                </div>
                <div>
                    <h3 className="font-extrabold">Step3:</h3>
                    <p className="font-semibold">Connect your Buraq account by adding the API Token</p>
                    <div className="flex items-center justify-center gap-2 bg-[#f3f3f3] border p-3 rounded my-2">
                        <p className="line-clamp-2 flex-grow">
                            {token || ""}
                        </p>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        className="w-8 h-8 rounded hover:border-indigo-500 border bg-white flex items-center justify-center p-1.5"
                                        onClick={onCopyToken}
                                    >
                                        <LuCopy className="text-gray-500 w-4 h-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent className="text-sm font-semibold text-white bg-nodeSettings p-2 " align="center">
                                    <p>{copied ? "Copied" : "Copy to clipboard"}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div>
                    <h3 className="font-extrabold">Step4:</h3>
                    <p className="font-semibold">Choose the bot and block that activates this Zap</p>
                    <p className="font-extrabold">
                        <span className="me-1">Bot name:</span>
                        Untitled Bot (1235)
                    </p>
                    <p className="font-extrabold">
                        <span className="me-1">Block name:</span>
                        <span className="">Zapier 1 ({selectedNode?.id})</span>
                    </p>
                </div>
                <div>
                    <h3 className="font-extrabold">Step5:</h3>
                    <p className="font-semibold">Choose the action you want to perform when this zap is activated.</p>
                </div>
            </div>
        </>
    )
}

export default ZappierSettingsContent