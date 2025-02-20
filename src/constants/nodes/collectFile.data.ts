
import { ICollectFileNodeContent } from "@/types/workflows/nodes/collectFile";
import { ObjectId } from "bson";

export const collectFileInitialData: ICollectFileNodeContent = {
    id: new ObjectId().toHexString(),
    name: 'Collect File',
    question: "Can you please upload your file?",
    variable: '',
}