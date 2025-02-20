
import { DynamicData_Whatsapp_Header, DynamicData_Whatsapp_RenderAsEnum, IDynamicDataWhatsappContent, ReplyButtonResponse } from "@/types/workflows/nodes/dynamic-data/in-bound/whatsapp";
import { ObjectId } from "bson";

export const DynamicWhatsappInitiData: IDynamicDataWhatsappContent = {
    id: new ObjectId().toHexString(),
    name: 'dynamic data',
    dataVariable: '',
    savedResponseVariable: '',
    savePayloadResponse: "",
    renderAs: DynamicData_Whatsapp_RenderAsEnum.REPLYBUTTON,
    responseContentAs: {
        header: {
            type: DynamicData_Whatsapp_Header.TEXT,
            value: '',
            file: {
                name: '',
                s3Url: ''
            }
        },
        body: '',
        footer: '',
        error: '',
        buttonName: '',
        optionItems: "",
        item: {
            name: "",
            description: "",
            category: "",
        },
        buttonPayload: "",
    },
}