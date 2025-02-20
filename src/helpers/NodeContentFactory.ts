export default function NodeContentFactory() {
    const nodeTypes: Record<string, () => string> = {
        "collect": () => "collect",
        "condition": () => "Condition"
    }

    return function getNode(type: string): string {
        const createNode = nodeTypes[type];
        if (!createNode) {
            throw new Error(`Unknown node type: ${type}`);
        }
        return createNode();
    }


}