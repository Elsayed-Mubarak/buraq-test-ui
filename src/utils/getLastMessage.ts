export function getLastMessage(conversation: any) {
    if (!conversation || !conversation.messages || !Array.isArray(conversation.messages)) {
        return null;
    }

    for (let i = conversation.messages.length - 1; i >= 0; i--) {
        const message = conversation.messages[i];

        if (message.type === "system") continue;

        return message.type === "text" ? message.content : message.type;
    }

    return null;
}