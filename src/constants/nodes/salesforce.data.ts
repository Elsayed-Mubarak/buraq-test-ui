import { ISalesforce } from '@/types/workflows/nodes/salesforce';
import { ObjectId } from 'bson';

export const SalesForceInititalData: ISalesforce = {
    id: new ObjectId().toHexString(),
    name: 'salesforce',
    accountName: '',
    organizationId: ''
} 