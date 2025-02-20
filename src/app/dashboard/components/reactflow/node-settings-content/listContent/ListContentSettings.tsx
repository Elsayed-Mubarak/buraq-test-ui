"use client";

import { useCallback, useEffect, useRef, useState } from "react"
import { Input } from "../../../ui/input"
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header"
import { svgs } from "../../shared/SVG"
import { ItemCard, ItemContent } from "./Item.content"

import useFlowStore from "../../reactflowstate/store"

import useListContentStore from "@/stores/nodes/useList.store"
import ActionButton from "@/components/workflow/nodeSettings/ActionButton";
import VariablesDropdown from '@/components/workflow/nodeSettings/VariablesDropdown';

import TextEditorVariable from "@/components/workflow/nodeSettings/variable-editor/TextEditorVariable";
import { IListNodeContent } from "@/types/workflows/nodes/list.content";
import { CategoryList } from "./category.content";

function ListContentSettings() {
    const [type, setType] = useState<"items" | "category">('items');

    const { onChangeData, changeName, addItem, deleteItem, visibleItemId } = useListContentStore();

    const { selectedNode, activeVariables } = useFlowStore();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as IListNodeContent;



    if (visibleItemId) {
        return (
            <>
                {nodeContent?.items && nodeContent.items?.map((item, index) => (
                    <>
                        <div key={item.id} className={`${visibleItemId !== null ? 'invisible' : 'visible'} relative`}>
                            <ItemCard index={index} item={item} />
                            {!visibleItemId && nodeContent.items.length > 1 && (
                                <ActionButton
                                    handleClick={() => deleteItem(selectedNode, item.id)}
                                    action="delete"
                                />
                            )}
                        </div>
                        {visibleItemId === item.id && <ItemContent item={item} />}
                    </>
                ))
                }
            </>
        );
    }

    return (
        <div className="relative py-6">
            <NodeSettingsHeader
                icon={svgs.list}
                text={nodeContent?.name || selectedNode.data.nodeName as string}
                onChange={(e) => changeName(selectedNode, e.target.value)}
            />

            <h3 className="node-settings-desc my-3">
                Displays a list of options the visitor can choose to move to the next step.
            </h3>
            <h3 className="text-sm text-yellow-400">
                This action block is only supported in 360dialog Cloud and Meta.
            </h3>
            <div className="border-b-2 border-gray-400 my-2 pb-4">
                <h5 className="text-sm font-light text-nodeSettings">Header (Optional)</h5>
                <TextEditorVariable
                    key={"header"}
                    value={nodeContent.header as string}
                    onChange={(val: string) => onChangeData(selectedNode, {
                        ...nodeContent,
                        header: val,
                    })}
                    className="h-[80px]"
                />
            </div>

            <div className="border-b-2 border-gray-400 mb-2 pb-4">
                <h5 className="text-sm font-light text-nodeSettings">Body (Optional)</h5>
                <TextEditorVariable
                    key={"body"}
                    showToolbar
                    value={nodeContent.body as string}
                    onChange={(val: string) => onChangeData(selectedNode, {
                        ...nodeContent,
                        body: val,
                    })}
                    message="1024 characters limit"
                />
            </div>

            <div className="border-b-2 border-gray-400 mb-2 pb-4">
                <h5 className="text-sm font-light text-nodeSettings">Footer (Optional)</h5>
                <TextEditorVariable
                    key={"footer"}
                    value={nodeContent.footer as string}
                    onChange={(val: string) => onChangeData(selectedNode, {
                        ...nodeContent,
                        footer: val,
                    })}
                    className="h-[70px]"
                />
            </div>

            <div className="border-b-2 border-gray-400 mb-2 pb-4">
                <h5 className="text-sm font-light text-nodeSettings">Button Name</h5>
                <Input
                    type="text"
                    className="border-gray-300"
                    value={nodeContent.buttonName as string}
                    onChange={(e) => onChangeData(selectedNode, {
                        ...nodeContent,
                        buttonName: e.target.value
                    })}
                />
                <p className="text-xs text-gray-500">
                    Clicking on this button will open the list menu
                </p>
            </div>

            <div className="mb-4">
                <h5 className="text-sm font-light text-nodeSettings">Error message</h5>
                <TextEditorVariable
                    key={"error_message"}
                    value={nodeContent.errorMessage as string}
                    onChange={(val: string) => onChangeData(selectedNode, {
                        ...nodeContent,
                        errorMessage: val
                    })}
                    message="When the visitors types a message which does not match the button text."
                />
            </div>

            <div className="flex justify-between mb-2">
                <button
                    onClick={() => setType("items")}
                    className={`text-center text-gray-400 border-gray-300 w-full hover:bg-indigo-100 p-2 rounded-b-none 
                    ${type === "items" && 'text-indigo-500 border-b-2 border-indigo-500'}`}
                >
                    Items
                </button>
                <button
                    onClick={() => setType("category")}
                    className={`text-center text-gray-400 border-gray-300 w-full hover:bg-indigo-100 p-2 rounded-b-none 
                    ${type === "category" && 'text-indigo-500 border-b-2 border-indigo-500'}`}
                >
                    Category
                </button>
            </div>

            {type === 'items'
                ? <>
                    {nodeContent?.items && nodeContent.items?.map((item, index) => (
                        <>
                            <div key={item.id} className={`${visibleItemId !== null ? 'invisible' : 'visible'} relative`}>
                                <ItemCard index={index} item={item} />
                                {!visibleItemId && nodeContent.items.length > 1 && (
                                    <ActionButton
                                        handleClick={() => deleteItem(selectedNode, item.id)}
                                        action="delete"
                                    />
                                )}
                            </div>
                            {visibleItemId === item.id && <ItemContent item={item} />}
                        </>
                    ))
                    }
                    <ActionButton
                        action="add"
                        handleClick={() => addItem(selectedNode)}
                        text="Add item"
                    />
                </>
                : <CategoryList />
            }

            <div className="mt-2">
                <p className="text-sm text-[#09274b] font-medium">
                    Save response
                </p>

                <div className="bg-white relative">
                    <VariablesDropdown
                        triggerName={nodeContent.variables as string}
                        onChange={(e) => onChangeData(selectedNode, {
                            ...nodeContent,
                            variables: e.target.value
                        })}
                    />
                </div>
                <p className="text-xs text-gray-500  mt-1">
                    You can select a variable that can be referenced later in the conversation.
                </p>
            </div>

        </div>
    )
}

export default ListContentSettings