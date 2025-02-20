import { useState } from "react";
import WebPreview from "./WebPreview";
import MobilePreview from "./MobilePreview";

type Props = {}

export default function ChatAppearance({ }: Props) {
    const [activeTab, setActiveTab] = useState<"web" | "mobile">('web');
    return (
        <div className="fixed top-9 right-20 w-[calc(100%-828px)]">
            <div className="mt-3 flex items-center justify-center">
                <div className="w-fit text-sm">
                    <div className="flex items-center">
                        <div onClick={() => setActiveTab('web')} className={`${activeTab === 'web' ? 'text-white bg-primary-500 border border-primary-500' : 'text-secondary-50 border border-[#141414]'} px-3 py-1 rounded-tl-[4px] cursor-pointer rounded-bl-[4px]`}>WEB</div>
                        <div onClick={() => setActiveTab('mobile')} className={` ${activeTab === 'mobile' ? 'text-white bg-primary-500 border border-primary-500' : 'text-secondary-50 border border-[#141414]'} px-3 py-1 rounded-tr-[4px] rounded-br-[4px] cursor-pointer`}>MOBILE</div>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                {activeTab === 'web' ? <WebPreview /> : <MobilePreview />}
            </div>
        </div>
    )
}
