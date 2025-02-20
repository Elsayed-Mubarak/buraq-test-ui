"use client";

import ActionButton from "@/components/workflow/nodeSettings/ActionButton";
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header";
import { svgs } from "../../shared/SVG";
import { RuleCard, RuleContent } from "./Rule.content";
import { AdvancedSettingsContent, AdvancedSettingsCard } from "./advancedSettings.content";
import useFlowStore from "../../reactflowstate/store";
import { HumanNodeContent } from "@/types/workflows/nodes/human.content";
import useHumanStore from "@/stores/nodes/useHuman.store";
import { useEffect } from "react";
import useTeammatesStore from "@/stores/settings/useTeamates.store";

function HumanContentSettings() {
    const { selectedNode } = useFlowStore();
    const {
        addRule,
        deleteRule,
        showSettings,
        visibleRuleId,
        changeName
    } = useHumanStore();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as HumanNodeContent;

    return (
        <div className="relative">
            <NodeSettingsHeader
                icon={svgs.human}
                text={nodeContent.name || selectedNode.data.nodeName as string}
                onChange={(e) => changeName(selectedNode, e.target.value)}
            />

            <h3 className="node-settings-desc mt-4 mb-6">
                Hands over the conversation to available human agents or places it in a queue from which agents can take over
            </h3>

            <div className="mb-4">
                <h4 className="text-sm text-nodeSettings">Assignment Rules</h4>
                <p className="text-xs text-gray-500 mb-1">
                    Conversations will be assigned to agents/teams in the following order of assignment rules
                </p>
                {nodeContent?.rules && nodeContent.rules?.map((rule, index) => (
                    <div key={index}>
                        <div key={rule.id || index} className={`${visibleRuleId !== null ? 'invisible' : 'visible'} relative`}>
                            <RuleCard index={index} rule={rule} />
                            {!showSettings && nodeContent.rules.length > 1 && (
                                <ActionButton
                                    handleClick={() => deleteRule(selectedNode, rule.id)}
                                    action="delete"
                                />
                            )}
                        </div>
                        {visibleRuleId === rule.id && <RuleContent rule={rule} />}
                    </div>
                ))}

                <div className="mt-2">
                    <ActionButton
                        action="add"
                        handleClick={() => addRule(selectedNode)}
                        text="Add rule"
                    />
                </div>
            </div>

            <AdvancedSettingsCard />
            {showSettings && <AdvancedSettingsContent />}
        </div>
    )
}

export default HumanContentSettings;