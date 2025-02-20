import { IAnswerAiWhatsappNodeContent } from "@/types/workflows/nodes/answer-ai/inbound/whatsapp";
import { ObjectId } from "bson";

export const AnswerAIWhatsappInitialData: IAnswerAiWhatsappNodeContent = {
    id: new ObjectId().toHexString(),
    name: 'answer ai',
    question: 'How can I help you?',
    knowledgeBase: '',
    instructions: 'You are a smart assistant. You will try to answer the questions from the context information provided to you.  			 Always try to provide responses in a HTML format. If not possible, provide response in plain text. 			 If you do not have the answer to the question asked, respond with “Sorry, I do not know the answer to this. Can you try asking something else?“',
    advancedSettings: {
        openAiModel: '',
        executeFunctions: [],
        answerSize: 256,
        temprature: 0.5,
        chunks: 1,
        feedback: true,
        answerSource: false,
    }
}