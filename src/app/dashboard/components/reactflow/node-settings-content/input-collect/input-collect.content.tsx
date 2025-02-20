import NodeSettingsHeader from "../../node-settings-bar/node-settings-header"
import { svgs } from "../../shared/SVG"
import useCollectInputStore from "@/stores/nodes/useCollectInput.store";
import useFlowStore from "../../reactflowstate/store";
import { ICollectInputNodeContent } from "@/types/workflows/nodes/inputCollect.content";
import VariablesDropdown from "@/components/workflow/nodeSettings/VariablesDropdown";
import TextEditorVariable from "@/components/workflow/nodeSettings/variable-editor/TextEditorVariable";

function InputCollectSettings() {
    const {
        onChangeData,
        changeName
    } = useCollectInputStore((state) => state);

    const { selectedNode, activeVariables } = useFlowStore((state) => state);

    const nodeContent = selectedNode?.data.nodeContent as ICollectInputNodeContent;


    if (!selectedNode) return null;

    return (
        <>
            <NodeSettingsHeader
                icon={svgs.collect_input}
                text={nodeContent.name || selectedNode.data.nodeName as string}
                onChange={(e) => changeName(selectedNode, e.target.value)}
            />
            <h3 className="text-sm font-semibold text-gray-400 my-3">
                Collect input asks a question to a user which requires an answer
            </h3>
            <div className="my-4">
                <h4 className="text-sm text-[#092445] mb-1">
                    Bot asks this question
                </h4>
                <TextEditorVariable
                    key={"question"}
                    showToolbar
                    wordsCount
                    message="You can reference a variable by typing #"
                    value={(selectedNode.data.nodeContent as ICollectInputNodeContent).question || ""}
                    onChange={(val: string) => onChangeData(selectedNode, {
                        question: val
                    })}
                    className="h-[120px]"
                />
            </div>
            <div>
                <h3 className="text-sm text-nodeSettings">Save response</h3>
                <div className="relative bg-white">
                    <VariablesDropdown
                        onChange={(e) => onChangeData(selectedNode, {
                            variable: e.target.value as string
                        })}
                        triggerName={(selectedNode.data.nodeContent as ICollectInputNodeContent).variable as string}
                    />
                </div>
            </div>
        </>
    )
}
export default InputCollectSettings