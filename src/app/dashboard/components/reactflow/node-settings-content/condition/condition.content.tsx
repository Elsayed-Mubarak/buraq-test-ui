"use client";

import React from "react";
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header";
import useFlowStore from "../../reactflowstate/store";
import { svgs } from "../../shared/SVG";
import { Condition, ConditionNodeContent } from "@/types/workflows/nodes/condition.content";
import { LiaAngleRightSolid } from "react-icons/lia";
import useConditionStore from "@/stores/nodes/useCondition.store";
import SubCondition from "./subCondition.content";
import ActionButton from "@/components/workflow/nodeSettings/ActionButton";


function ConditionSettingsContent() {
  const { selectedNode } = useFlowStore((state) => state);

  const {
    addCondition,
    deleteCondition,
    visibleConditionId,
    changeName
  } = useConditionStore();

  if (!selectedNode) return null;

  const nodeContent = selectedNode.data.nodeContent as ConditionNodeContent;

  return (
    <div className="relative">
      <NodeSettingsHeader
        icon={svgs.Condition}
        text={nodeContent.name || selectedNode.data.nodeName as string}
        onChange={(e) => changeName(selectedNode, e.target.value)}
      />

      <h3 className="my-4 text-sm font-semibold text-gray-500">
        Condition gives the ability to create multiple branches based on certain
        conditions, which have their own flows
      </h3>
      {(selectedNode.data.nodeContent as ConditionNodeContent)
        ? (selectedNode.data.nodeContent as ConditionNodeContent).conditions.map((condition, index) => (
          <React.Fragment key={index}>
            <div key={condition.id} className={`${visibleConditionId !== null ? "invisible" : "visible"} relative`}>
              <ConditionComponent
                key={condition.id}
                condition={condition}
                index={index}
              />
              {(selectedNode.data.nodeContent as ConditionNodeContent)
                .conditions.length > 1 && condition.isDefault === false &&
                < ActionButton
                  handleClick={() => deleteCondition(selectedNode, condition.id)}
                  action="delete"
                />
              }
            </div>
            {visibleConditionId === condition.id && <SubCondition condition={condition} />}
          </React.Fragment>
        ))
        : <h2>Nod Data</h2>
      }

      <ActionButton
        handleClick={() => addCondition(selectedNode)}
        text="Condition"
      />
    </div>
  );
}


function ConditionComponent({ condition, index }: { condition: Condition, index: number }) {
  const {
    visibleConditionId,
    setVisibleConditionId,
  } = useConditionStore();
  const { selectedNode } = useFlowStore((state) => state);

  if (!selectedNode) return null;

  const handleConditionClick = (id: string) => {
    setVisibleConditionId(visibleConditionId === id ? null : id);
  };

  return (
    <>
      {!condition.isDefault && (
        <div
          key={condition.id}
          className={`${visibleConditionId !== null ? "invisible" : "visible"} relative`}
        >
          <div
            className="mb-2 flex cursor-pointer items-center justify-between rounded-md bg-gray-100 p-2 shadows-sm text-nodeSettings"
            onClick={() => handleConditionClick(condition.id)}
          >
            Condition {index + 1}
            <LiaAngleRightSolid />
          </div>
        </div>
      )}
    </>
  )
}

export default ConditionSettingsContent;
