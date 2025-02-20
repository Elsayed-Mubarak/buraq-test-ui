"use client";

import useJumpStore from "@/stores/nodes/useJump.store"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../../ui/select"
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header"
import useFlowStore from "../../reactflowstate/store"
import { svgs } from "../../shared/SVG"
import { useEffect, useState } from "react";
import { Node } from "@xyflow/react";
import { IJumpNodeContent } from "@/types/workflows/nodes/jump";

type NodeType = Node & {
    data: {
        nodeName: string;
        description: string;
    }
}

function JumpSettingsContent() {
    const [nodes, setNodes] = useState<Node[]>([]);

    const {
        getNodes,
        onChangeData,
        changeName
    } = useJumpStore()

    const { selectedNode, } = useFlowStore();

  

    useEffect(() => {
        setNodes(getNodes());
    }, [selectedNode, getNodes])

    if (!selectedNode) return null;

    const isJumpNode = (node: Node) => node && !(node.type === "jump" || node.type === "trigger" || node.type === "Option");

    const filteredNodes = nodes.filter(isJumpNode);


    const showNodeName = (id: string) =>
        (filteredNodes.find((node) => node.id === id)?.data?.nodeContent as any)?.name || "";
    const nodeContent = selectedNode.data.nodeContent as IJumpNodeContent;

    return (
        <>
            <NodeSettingsHeader
                icon={svgs.jump}
                text={nodeContent.name || selectedNode.data.nodeName as string}
                onChange={(e) => changeName(selectedNode, e.target.value)}
            />

            <h3 className="node-settings-desc mt-6">
                Allows you to route the conversation flow from this point to the action block mentioned below.
            </h3>
            <div className="mt-6">
                <Select
                    value={(selectedNode.data.nodeContent as IJumpNodeContent)?.node || ""}
                    onValueChange={(val: string) => onChangeData(selectedNode, {
                        node: val
                    })}
                >
                    <SelectTrigger className="ring-0 ring-transparent">
                        {showNodeName((selectedNode.data.nodeContent as IJumpNodeContent)?.node) as string || "Choose the action block"}
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-[270px] h-full overflow-y-auto">
                        {filteredNodes.length > 0 && filteredNodes.map((node) => (
                            <SelectItem key={node.id} value={node.id}>{(node.data.nodeContent as any)?.name || node.data?.nodeName}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div >
        </>
    )
}

export default JumpSettingsContent