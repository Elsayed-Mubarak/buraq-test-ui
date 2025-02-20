import { ISetAiWhatsappNodeContent } from "@/types/workflows/nodes/set-ai/inbound/whatsapp";
import { ObjectId } from "bson";

export const SetAIWhatsappInitialData: ISetAiWhatsappNodeContent = {
    id: new ObjectId().toHexString(),
    name: 'set ai',
    question: 'How can I help you?',
    knowledgeBase: '',
    instructions: 'You are a smart assistant. You will try to answer the questions from the context information provided to you.  			 Always try to provide responses in a HTML format. If not possible, provide response in plain text. 			 If you do not have the answer to the question asked, respond with “Sorry, I do not know the answer to this. Can you try asking something else?“',
    response: '',
    advancedSettings: {
        openAiModel: '',
        executeFunctions: [],
        answerSize: 256,
        temprature: 0.5,
        chunks: 1,
        feedback: true,
        answerSource: false,
    },
}