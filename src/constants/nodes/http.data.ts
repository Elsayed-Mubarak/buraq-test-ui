import { ObjectId } from "bson";
import { IHttpNodeContent } from "@/types/workflows/nodes/http.content";


export const httpNodeInitialData: IHttpNodeContent  = {
        id: new ObjectId().toHexString(),
        name: "http_request",
        type: 'GET',
        url: '',
        headers: [],
        body: {
            bodyFormat: 'RAW',
            raw: '',
            form: [{
                id : new ObjectId().toHexString(),
                type : 'text',
                key: '',
                value: '' 
            }]
        },
        variables: [{
            id : new ObjectId().toHexString(),
            variable : '' ,
            objectPath : '',
        }]
    };
