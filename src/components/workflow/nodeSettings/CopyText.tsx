import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/dashboard/components/ui/tooltip";
import { useState } from "react";
import { LuCopy } from "react-icons/lu";

interface Props {
    text: string;
    lines?: string;
}

export default function CopyText({ text, lines }: Props) {
    const [copied, setCopied] = useState<boolean>(false);

    const onCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
    }

    return (
        <div className="flex items-center justify-center gap-2 bg-[#f3f3f3] border p-3 rounded">
            <p className={`line-clamp-2 flex-grow text-nodeSettings text-sm`}>
                {text || ""}
            </p>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            className="w-8 h-8 rounded hover:border-indigo-500 border bg-white flex items-center justify-center p-1.5"
                            onClick={onCopy}
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
    )
}