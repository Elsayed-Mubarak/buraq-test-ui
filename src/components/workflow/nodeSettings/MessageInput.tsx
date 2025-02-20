import { Textarea } from "../../../app/dashboard/components/ui/textarea"
import { ISendText } from "../../../types/nodeSettings.types"


function MessageInput({ text, setText, label }: ISendText) {
    return (
        <div className="relative">
            <h3 className="text-sm text-[#092445] font-semibold mb-1">
                {label || "Send this message"}
            </h3>
            <Textarea
                value={text}
                onChange={(e) => setText(e.target.value as string)}
                className="ring-0 ring-transparent focus:ring-transparent focus:ring-0 focus:outline-none border-gray-200 resize-none"
            />
            <p className="text-xs font-semibold text-gray-500 my-1 flex justify-between items-center">
                <span>You can reference a variable by typing #</span>
                <span>24</span>
            </p>
        </div>
    )
}

export default MessageInput