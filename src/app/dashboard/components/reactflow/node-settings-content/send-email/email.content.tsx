"use client";

import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header";
import { svgs } from "../../shared/SVG";
import useFlowStore from "../../reactflowstate/store";
import { Textarea } from "../../../ui/textarea";
import useEmailStore from "@/stores/nodes/useSendEmail.store";
import { IEmailNodeContent } from "@/types/workflows/nodes/email.content";
import TextEditorVariable from "@/components/workflow/nodeSettings/variable-editor/TextEditorVariable";

function EmailSettingsContent() {
    const { onChangeData, changeName } = useEmailStore();

    const { selectedNode } = useFlowStore();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as IEmailNodeContent;

    return (
        <div className="pb-6">
            <NodeSettingsHeader
                icon={svgs.email}
                text={nodeContent.name || selectedNode.data.nodeName as string}
                onChange={(e) => changeName(selectedNode, e.target.value)}
            />
            <h3 className="text-sm text-gray-400 my-3">
                Sends an email to notify email recipients with details collected in the bot
            </h3>

            <div>
                <Label className="text-sm text-[#092445]">
                    Send an email to
                </Label>
                <div className="flex flex-col gap-2">
                    <Input
                        type="email"
                        placeholder="name@example.com"
                        className="placeholder:font-semibold rounded-lg invalid:border-red-500 ring-0 ring-transparent focus:ring-0 focus:ring-transparent hover:border-indigo-500 border-gray-300 h-[45px]"
                        value={nodeContent.email}
                        onChange={(e) => onChangeData(selectedNode, { email: e.target.value })}
                    />
                    <div className="border border-gray-300 h-[45px] flex items-center rounded-lg invalid:border-red-500 p-1">
                        <span className="text-[#112445] w-10 h-full flex items-center justify-start text-sm font-medium px-3">CC</span>
                        <Input
                            type="email"
                            placeholder="name@example.com"
                            className="placeholder:font-semibold ring-0 ring-transparent focus:ring-transparent hover:border-indigo-500 border-none h-full"
                            value={nodeContent.cc}
                            onChange={(e) => onChangeData(selectedNode, { cc: e.target.value })}
                        />
                    </div>
                    <div className="border border-gray-300 h-[45px] flex items-center rounded-lg invalid:border-red-500 p-1">
                        <span className="text-[#112445] w-10 h-full flex items-center justify-start text-sm font-medium px-3">BCC</span>
                        <Input
                            type="email"
                            placeholder="name@example.com"
                            className="placeholder:font-semibold ring-0 ring-transparent focus:ring-transparent hover:border-indigo-500 border-none h-full"
                            value={nodeContent.bcc}
                            onChange={(e) => onChangeData(selectedNode, { bcc: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="my-4">
                <p className="text-sm text-[#092445] font-medium">Subject</p>
                <TextEditorVariable
                    key={"email_subject"}
                    value={nodeContent.subject}
                    onChange={(val: string) => onChangeData(selectedNode, { subject: val })}
                />
            </div>

            <div className="flex items-center justify-between my-4">
                <div>
                    <p className="text-sm text-[#092445] font-medium">Include chat transcript</p>
                    <p className="text-xs text-gray-500">A summary of the chat up to this point.</p>
                </div>
                <Label
                    htmlFor="chat-transcript"
                    className="switch cursor-pointer">
                    <input
                        type="checkbox"
                        id="chat-transcript"
                        checked={nodeContent.isTranscript}
                        onChange={(e) => onChangeData(selectedNode, { isTranscript: e.target.checked as boolean })}
                    />
                    <span className="slider round" />
                </Label>
            </div>

            <div>
                <h3 className="text-sm text-[#092445] mb-1">Body</h3>
                <TextEditorVariable
                    key={"email_body"}
                    showToolbar
                    className="h-[300px]"
                    value={nodeContent.body}
                    onChange={(value: string) => onChangeData(selectedNode, { body: value })}
                />
            </div>
        </div>
    );
}

export default EmailSettingsContent;
