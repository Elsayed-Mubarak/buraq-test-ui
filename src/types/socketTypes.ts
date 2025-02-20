import { Message } from "./messageType";

export interface IMessageData {
  message: Message;
  conversationId: string;
  userId: string;
}

export interface IMessageReadListenData {
  conversationId: string;
  messages: Message[];
}

export interface IUserTypingData {
  conversationId: string;
  userId: string;
  name: string;
}

export interface IActiveUsersData {
  count: number;
  users: string[];
}

export interface IMessageReadData {
  messageIds: string[];
  conversationId: string;
  userId: string;
}
