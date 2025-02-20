import { useCalendarStore } from "../../store/calendar.store";
import { Textarea } from "../../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../../ui/select";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import { Switch } from "../../../ui/switch";
import { SwitchButton } from "../../../ui/siwtch-button";
import { MdLock } from "react-icons/md";
import MessageInput from "../../../../../../components/workflow/nodeSettings/MessageInput";

function DateSelection() {
    const {
        message,
        selectedVariable,
        setMessage,
        onSelectVariable,
    } = useCalendarStore((state) => state);

    const modules = {
        toolbar: [
            ['bold', 'italic'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }]
        ]
    };

    return (
        <div className="flex flex-col">
            <MessageInput
                text={message}
                setText={setMessage}
            />

            <div className="mt-6">
                <Select value={selectedVariable as string} onValueChange={onSelectVariable}>
                    <Label className="text-sm font-semibold text-[#092445]">
                        Save the response in this variable
                    </Label>
                    <SelectTrigger className="ring-0 ring-transparent focus:outline-none outline-none">{selectedVariable || "Select"}</SelectTrigger>
                    <SelectContent className="bg-white w-full">
                        <SelectItem value="1">one</SelectItem>
                        <SelectItem value="2">two</SelectItem>
                        <SelectItem value="3">thre</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-xs font-semibold text-gray-500">
                    You can select a variable that can be referenced later in the conversation.
                </p>
            </div>

            <div className="mt-6">
                <p className="text-[#092445] font-semibold mb-2">Nature of date selection</p>
                <RadioGroup defaultValue="single-date" className="flex items-center justify-start gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="single-date" id="single-date" />
                        <Label className="font-semibold text-[#092445]" htmlFor="single-date">Single Date</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="date-range" id="date-range" disabled />
                        <Label className="font-semibold text-gray-400" htmlFor="date-range">Date range</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-[#092445] font-semibold">Show past dates</p>
                <SwitchButton value="show-past-date" />
            </div>

            <div className="mt-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="filters"
                        id="filters"
                        className="rounded"
                    />
                    <label
                        htmlFor="filters"
                        className="text-sm mx-2 flex items-center gap-2"
                    >
                        <span className="font-bold text-gray-500">Track links in this message</span>
                        <MdLock className="text-yellow-300 w-6 h-6" />
                    </label>
                </div>
                <p className="text-xs font-normal text-gray-500 mt-1">
                    Upgrade your plan to access this feature
                </p>
            </div>
        </div>
    )
}




export default DateSelection