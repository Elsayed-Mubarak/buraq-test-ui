import { Input } from "@/components/ui/input"
import useDynamicDataWhatsappStore from "@/stores/nodes/dynamic-data/inbound-whatsapp.store";
import useFlowStore from "../../reactflowstate/store";
import { IDynamicDataWhatsappContent } from "@/types/workflows/nodes/dynamic-data/in-bound/whatsapp";
import { Node } from "@xyflow/react";
import TextEditorVariable from "@/components/workflow/nodeSettings/variable-editor/TextEditorVariable";

function OptionList() {
    const { onChangeOptions } = useDynamicDataWhatsappStore();
    const { selectedNode } = useFlowStore();

    const nodeContent = selectedNode?.data.nodeContent as IDynamicDataWhatsappContent;

    return (
        <div>
            <div className="my-4">
                <h3 className="mb-1 text-sm text-nodeSettings">show message</h3>
                <TextEditorVariable
                    key={"message"}
                    value={nodeContent.responseContentAs.body as string}
                    onChange={(val) => onChangeOptions(selectedNode as Node, {
                        ...nodeContent,
                        responseContentAs: {
                            ...nodeContent.responseContentAs,
                            body: val
                        }
                    })}
                />
            </div>

            <div className="mt-4">
                <h3 className="text-sm text-nodeSettings font-light mb-1">
                    Option items
                </h3>
                <Input
                    value={nodeContent.responseContentAs.optionItems as string}
                    onChange={(e) => onChangeOptions(selectedNode as Node, {
                        ...nodeContent,
                        responseContentAs: {
                            ...nodeContent.responseContentAs,
                            optionItems: e.target.value
                        }
                    })}
                    className="h-[34px] ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent border-gray-300 hover:border-indigo-500"
                />
            </div>

            <div className="my-4">
                <h3 className="text-sm text-nodeSettings my-1">Error message</h3>
                <TextEditorVariable
                    value={nodeContent.responseContentAs.error as string}
                    onChange={(val) => onChangeOptions(selectedNode as Node, {
                        ...nodeContent,
                        responseContentAs: {
                            ...nodeContent.responseContentAs,
                            error: val
                        }
                    })}
                />
            </div>
        </div>
    )
}

export default OptionList