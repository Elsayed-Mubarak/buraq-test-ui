
export interface IConversation {
    _id: string;
    name: string;
    messages: IMessage[];
    labels: ILabel[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface IMessage {
    _id: string;
    type: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface IUser {
    _id: string;
    name: string;
    email: string;
    conversations: IConversation[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface ILabel {
    _id: string;
    conversations: string[];
    name: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    __v: number;
}