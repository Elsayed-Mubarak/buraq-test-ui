import { Button } from '@/app/dashboard/components/ui/button'
import { ReactElement, ReactNode } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { GoPlus } from "react-icons/go";

interface Props {
    handleClick: (...params: any[]) => void;
    icon?: ReactNode | ReactElement;
    text?: string;
    action?: "add" | "delete"
}

const Classes = {
    add: "flex w-fit items-center justify-center gap-1 border px-3 py-1.5 text-[#092451] transition-colors hover:bg-gray-50 rounded-md",
    delete: "flex w-fit items-center justify-center gap-1 px-3 py-1.5 text-[#092451] transition-colors absolute top-1/2 -translate-y-1/2 -right-9 rounded-md"
}

function ActionButton({ handleClick, icon, text, action = "add" }: Props) {


    return (
        <button
            className={Classes[action]}
            onClick={handleClick}
            type='button'
        >
            {action === "add"
                ? icon || <GoPlus className="w-4 h-4" />
                : icon || <FaRegTrashAlt className="w-4 h-4" />
            }
            {text && <span>{text}</span>}
        </button>
    )
}

export default ActionButton;