import { userType } from "./userType";

export type ContentObject = {
  URL: string;
  name: string;
  folderId?: string;
  phoneNumbers?: string[];
  firstName?: string;
  lastName?: string;
};
export type MessageContent = string | ContentObject;

export type Message = {
  _id?: string;
  sender: userType | string;
  messageType:
    | "text"
    | "file"
    | "image"
    | "voice"
    | "other"
    | "video"
    | "folder"
    | "location"
    | "contact";
  content: MessageContent;
  timestamp: Date | string;
  deletedBy: { user: string; deletedAt: Date }[];
  readBy: { user: string; readAt: Date | string }[];
  selected?: boolean | undefined;
  userId?: string;
  messageId: string;
  deleteStatus: boolean;
  isForwarded?: boolean;
  isScheduled: boolean;
  isDelivered: boolean;
  repliedTo?: null | Message;
  isEdited?: boolean;
  createdAt: Date | string;
  updatedAt?: Date | string;
};