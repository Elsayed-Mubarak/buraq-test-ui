import { IJavaScriptNodeContent } from "@/types/workflows/nodes/javaSript.content";
import { ObjectId } from "bson";


export const javaScriptInitialData: IJavaScriptNodeContent = {
    id: new ObjectId().toHexString(),
    name: "Javascript",
    code: ``,
}