import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../../ui/select";
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header";
import { svgs } from "../../shared/SVG";
import { useDialogStore } from "../../store/dialog.store";
import FileInput from "../../../../../../components/workflow/nodeSettings/FileInput";
import { ChangeEvent } from "react";


function DialogSettingsContent() {
    const { onSelectVariable, selectedVariable, FileValue, handleFileChange } = useDialogStore((state) => state);
    const link = "https://cloud.google.com/dialogflow/es/docs/quick/setup"


    return (
        <>
            <NodeSettingsHeader icon={svgs.dialog} text="Dialogflow 1" />
            <h3 className="my-4 text-sm text-gray-500 font-semibold">
                Invokes Google Dialogflow&apos;s Natural Language Processing(NLP) engine,
                and its responses from are displayed in the chatbot
            </h3>

            <div>
                <p className="text-sm text-[#09274b] font-semibold">
                    Enter the variable whose input will be used to call your Dialogflow agent
                </p>
                <Select value={selectedVariable as string} onValueChange={onSelectVariable}>
                    <SelectTrigger className="ring-0 ring-transparent">
                        {selectedVariable || "Select"}
                    </SelectTrigger>
                    <SelectContent className="w-full bg-white">
                        <SelectItem value="1">one</SelectItem>
                        <SelectItem value="2">two</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 font-semibold mt-1">
                    Follow the steps mentioned <Link href={link} className="text-blue-700 underline">in this URL</Link>
                    to generate the Service Account key of your Dialogflow agent in a JSON file.
                </p>
            </div>

            <FileInput
                handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files && e.target.files[0];
                    handleFileChange(file);
                }}
                rowId="file"
                value={FileValue?.name || ''}
            />

        </>
    )
}

export default DialogSettingsContent;