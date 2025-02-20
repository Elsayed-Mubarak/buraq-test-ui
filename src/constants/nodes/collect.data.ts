import { ICollectInputNodeContent } from "@/types/workflows/nodes/inputCollect.content";
import { ObjectId } from "bson";

export const collectInputInitialData: ICollectInputNodeContent = {
    id: new ObjectId().toHexString(),
    name: 'Collect Input',
    question: "What is your…",
    variable: null,
}