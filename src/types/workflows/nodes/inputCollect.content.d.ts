import INodeContent from '@/types/workflows/nodes/node.content'
import { Node } from '@xyflow/react';

export interface ICollectInputNodeContent extends INodeContent {
    question: string;
    variable: string | null;
}

export interface ICollectInputStore {
    onChangeData: (node: Node, values: Partial<{ variable: string; question: string }>) => void;
    changeName: (node: Node, name: string) => void;
}