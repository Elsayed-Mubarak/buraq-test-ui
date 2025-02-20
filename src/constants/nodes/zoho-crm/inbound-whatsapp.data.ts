import { ObjectId } from 'bson';
import { IZohoCRMWhatsappNodeContent } from './../../../types/workflows/nodes/zoho-crm/in-bound/whatsapp.';

export const ZohoCRMWhatsappInitialData: IZohoCRMWhatsappNodeContent = {
    id: new ObjectId().toHexString(),
    name: 'zoho',
    account: '',
    zohoFileds: [
        {
            id: new ObjectId().toHexString(),
            field: 'Last Name',
            value: ''
        }
    ]
}