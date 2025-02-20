import { IHttpNodeContent } from "@/types/workflows/nodes/http.content";
import HttpRequest from "../../../../../../components/workflow/nodeSettings/HttpRequest";
import useFlowStore from "../../reactflowstate/store";

function HttpRequestContent() {
    const { selectedNode, updateNodeContent } = useFlowStore((state) => state);

    if (!selectedNode) return null;

    // Initialize with default data if nodeContent is not set

    const handleChange = (updatedContent: IHttpNodeContent) => {
        updateNodeContent(updatedContent, selectedNode.id);
    };

    return (
        <HttpRequest
            node={selectedNode.data.nodeContent as IHttpNodeContent}
            onChange={handleChange}
        />
    );
}

export default HttpRequestContent;
