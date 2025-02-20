import useFlowStore from "../reactflowstate/store";
import { ReactNode, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";

interface Props {
    icon: any;
    text: string;
    onChange?: (...props: any[]) => void;
}


function NodeSettingsHeader({ icon, text, onChange }: Props) {
    const [triggerText, setTriggerText] = useState(text || '');
    const { closePopup } = useFlowStore((state) => state);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTriggerText(e.target.value);
        onChange?.(e);
    }




    return (
        <form className="border-b">
            <div className="flex items-center justify-between gap-2 pb-5">
                <span>{icon}</span>
                <button
                    onClick={closePopup}
                >
                    <RiCloseLargeLine />
                </button>
            </div>
            <input
                className="text-lg font-bold w-full border-0 border-gray-300 px-0 py-1 outline-none ring-0 focus:ring-transparent focus:outline-transparent"
                type="text"
                value={triggerText}
                onChange={handleChange}
            />
        </form>
    )
}

export default NodeSettingsHeader;