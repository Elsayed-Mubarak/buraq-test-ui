"use client";

import NodeSettingsHeader from "../../node-settings-bar/node-settings-header";
import { svgs } from "../../shared/SVG";
import useCollectFileStore from "@/stores/nodes/useCollectFile.store";
import useFlowStore from "../../reactflowstate/store";
import { ICollectFileNodeContent } from "@/types/workflows/nodes/collectFile";
import VariablesDropdown from "@/components/workflow/nodeSettings/VariablesDropdown";
import TextEditorVariable from "@/components/workflow/nodeSettings/variable-editor/TextEditorVariable";

function CollectFileSettingsContent() {
    const { onChangeData, changeName } = useCollectFileStore();

    const { selectedNode, activeVariables } = useFlowStore();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as ICollectFileNodeContent;

    return (
        <>
            <NodeSettingsHeader
                icon={svgs.file}
                text={nodeContent.name || selectedNode.data.nodeName as string}
                onChange={(e) => changeName(selectedNode, e.target.value)}
            />
            <h3 className="node-settings-desc my-6 font-medium">
                Allows the user to upload files in the defined format as below
            </h3>

            <div>
                <div className="mb-6">
                    <h5 className="text-sm  text-nodeSettings mb-1">
                        Bot asks this question
                    </h5>
                    <TextEditorVariable
                        key={"question"}
                        value={(selectedNode.data.nodeContent as ICollectFileNodeContent).question || ""}
                        onChange={(val: string) => onChangeData(selectedNode, {
                            question: val
                        })}
                        message="You can reference a variable by typing #"
                        wordsCount
                    />
                </div>

                <div className="relative bg-white">
                    <VariablesDropdown
                        onChange={(e) => onChangeData(selectedNode, {
                            variable: e.target.value as string
                        })}
                        triggerName={(selectedNode.data.nodeContent as ICollectFileNodeContent).variable as string}
                    />
                </div>

            </div>
        </>
    )
}

export default CollectFileSettingsContent;