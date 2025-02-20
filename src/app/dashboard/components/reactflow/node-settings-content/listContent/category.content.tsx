"use client";

import ActionButton from "@/components/workflow/nodeSettings/ActionButton"
import { Input } from "../../../ui/input"
import useListContentStore from "@/stores/nodes/useList.store";
import useFlowStore from "../../reactflowstate/store";
import { Category, IListNodeContent } from "@/types/workflows/nodes/list.content";

export function CategoryList() {
    const { addCategory } = useListContentStore();

    const { selectedNode } = useFlowStore();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as IListNodeContent;

    return (
        <div>
            <div className="flex flex-col gap-2 mb-4">
                {nodeContent.categories && nodeContent.categories?.map((category) => (
                    <CategoryItem key={category.id} category={category} />
                ))}
            </div>

            <ActionButton
                action="add"
                text="Category"
                handleClick={() => addCategory(selectedNode)}
            />
        </div>
    )
}

function CategoryItem({ category }: { category: Category }) {
    const { selectedNode } = useFlowStore();
    const { deleteCategory, onChangeCategory, visibleItemId } = useListContentStore();

    if (!selectedNode) return null;
    const nodeContent = selectedNode.data.nodeContent as IListNodeContent;

    return (
        <div className="relative">
            <Input
                type="text"
                value={category.name as string}
                onChange={(e) => onChangeCategory(selectedNode, category.id, { name: e.target.value })}
                className="outline-none focus:outline-none ring-0 ring-transparent hover:border-indigo-500 border-gray-300"
            />
            {!visibleItemId && nodeContent.categories && nodeContent.categories?.length > 1 && (
                <ActionButton
                    action="delete"
                    handleClick={() => deleteCategory(selectedNode, category.id)}
                />
            )
            }
        </div>
    )
}