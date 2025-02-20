import { IListNodeContent } from "@/types/workflows/nodes/list.content";
import { ObjectId } from "bson";

export const ListContentInitialData: IListNodeContent = {
    id: new ObjectId().toHexString(),
    name: 'list',
    header: '',
    body: 'What would you like to choose?',
    footer: '',
    buttonName: '',
    errorMessage: 'Please enter a valid option from the mentioned choices',
    items: [
        {
            id: new ObjectId().toHexString(),
            name: 'item 1',
            description: '',
            category: null,
            nextNodeId: '',
        },
    ],
    categories: [
        {
            id: new ObjectId().toHexString(),
            name: ''
        }
    ],
    variables: ''
}