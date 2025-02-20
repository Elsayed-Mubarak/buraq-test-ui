import { Node } from "@xyflow/react";
import INodeContent from "./node.content";

export type Category = {
    id: string;
    name: string;
}

export type Item = {
    id: string;
    name: string;
    description: string;
    category: Category | null;
    nextNodeId: string;
}


export interface IListNodeContent extends INodeContent {
    header: string;
    body: string;
    footer: string;
    buttonName: string;
    errorMessage: string;
    items: Item[];
    categories: Category[] | null;
    variables: string;
}

export interface IListStore {
    visibleItemId: string | null;
    changeName: (node: Node, name: string) => void;
    toggleVisibleItem: (id: string | null) => void;
    addItem: (node: Node) => void;
    deleteItem: (node: Node, itemId: string) => void;
    addCategory: (node: Node) => void;
    deleteCategory: (node: Node, categoryId: string) => void;
    onChangeData: (node: Node, values: { header: string, body: string, footer: string, buttonName: string, errorMessage: string, variables: string }) => void;
    onChangeItem: (node: Node, itemId: string, values: Partial<Item>) => void;
    onChangeCategory: (node: Node, categoryId: string, values: { name: string }) => void;
}