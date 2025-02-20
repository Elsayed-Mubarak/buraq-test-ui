import { ReactNode } from "react";
import { FaUser } from "react-icons/fa";
import { MdChat } from "react-icons/md";

interface VariableTagProps {
    item: { variableName: string; type: string };
    children: ReactNode;
}

function VariableTag(props: VariableTagProps) {
    const { variableName, type } = props.item || {};

    return (
        <span contentEditable={false} className="inline-flex items-center bg-[#cdcdcd] text-nodeSettings p-1 text-sm my-1">
            {type === "Contact" && <FaUser className="mr-1 text-gray-700" />}
            {type === "Conversation" && <MdChat className="mr-1 text-gray-700" />}
            <span>{variableName}</span>
        </span>
    );
}

export default VariableTag;