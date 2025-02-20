import { IEmailNodeContent } from "@/types/workflows/nodes/email.content";
import { ObjectId } from "bson";


export const sendEmailInitialData: IEmailNodeContent = {
    id: new ObjectId().toHexString(),
    name: 'Send email',
    email: '',
    cc: '',
    bcc: '',
    subject: 'Lead generated via Buraq',
    isTranscript: false,
    body: 'Add what you want to be notified when an email is sent...',
}