"use client";

import ActionButton from "@/components/workflow/nodeSettings/ActionButton";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LiaAngleRightSolid } from "react-icons/lia";
import { RiCloseLargeLine } from "react-icons/ri";
import useFlowStore from "../../reactflowstate/store";
import useListContentStore from "@/stores/nodes/useList.store";
import { IListNodeContent, Item } from "@/types/workflows/nodes/list.content";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../../ui/select";
import { useEffect, useRef } from "react";

export function ItemCard({ item, index }: { item: Item, index: number }) {

    const { toggleVisibleItem, visibleItemId, deleteItem } = useListContentStore();
    const { selectedNode } = useFlowStore();

    if (!selectedNode) return null;
    const nodeContent = selectedNode.data.nodeContent as IListNodeContent;


    return (
        <div className="relative">
            <div
                key={item.id}
                className={`${visibleItemId !== null ? "invisible" : "visible"} relative`}
            >
                <div
                    className="mb-2 flex cursor-pointer items-center justify-between rounded-md text-sm bg-gray-100 p-3 text-nodeSettings"
                    onClick={() => toggleVisibleItem(item.id)}
                >
                    Item {index + 1}
                    <LiaAngleRightSolid />
                </div>
            </div>
            {!visibleItemId && nodeContent.items.length > 1 && (
                <ActionButton
                    action="delete"
                    handleClick={() => deleteItem(selectedNode, item.id)}
                />
            )}
        </div>
    )
}

export function ItemContent({ item }: { item: Item }) {
    const { closePopup, selectedNode } = useFlowStore();
    const { toggleVisibleItem, onChangeItem } = useListContentStore();

    const itemRef = useRef<HTMLDivElement>(null);


    // useEffect(() => {
    //     if (item && itemRef.current) {
    //         itemRef.current.scrollIntoView({
    //             behavior: "smooth",
    //             block: "start",
    //             inline: "nearest",
    //         });
    //     }
    // }, [item]);



    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as IListNodeContent;


    return (
        <div
            className="absolute top-0 left-0 w-full h-full bg-white z-50 p-5 py-7"

            // className="absolute top-0 left-0 w-full h-full bg-white z-50 py-4"
            ref={itemRef}
        >
            <div className="mb-6 flex justify-between">
                <button
                    className="flex items-center justify-center gap-4"
                    onClick={() => toggleVisibleItem(null)}
                >
                    <FaArrowLeftLong />
                    <span className="font-semibold">item list</span>
                </button>

                <button onClick={closePopup}>
                    <RiCloseLargeLine className="w-4 h-4" />
                </button>
            </div>

            <div>
                <h5 className="text-sm text-nodeSettings font-light mb-1">item name</h5>
                <Input
                    type="text"
                    className="ring-0 ring-transparent outline-none border-gray-300 hover:border-indigo-500"
                    value={item.name}
                    onChange={e => onChangeItem(selectedNode, item.id, {
                        name: e.target.value
                    })}
                />
            </div>
            <div>
                <h5 className="text-sm text-nodeSettings font-light mb-1">item description</h5>
                <Textarea
                    className="ring-0 ring-transparent outline-none border-gray-300 hover:border-indigo-500 h-[70px]"
                    value={item.description}
                    onChange={e => onChangeItem(selectedNode, item.id, {
                        description: e.target.value
                    })}
                />
                <p className="text-xs text-gray-500">There is 72 characters limit</p>
            </div>

            <div className="mt-10">
                <p className="text-sm text-[#09274b] font-medium">
                    Category
                </p>
                <Select
                    value={item.category?.id}
                    onValueChange={(val) => onChangeItem(selectedNode, item.id, {
                        category: {
                            id: val,
                            name: nodeContent.categories?.find(category => category.id === val)?.name || ""
                        }
                    })}
                >
                    <SelectTrigger className="ring-0 ring-transparent">{item.category?.name || "Select"}</SelectTrigger>
                    <SelectContent className="bg-white">
                        {nodeContent.categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

            </div>

        </div>
    )
}




