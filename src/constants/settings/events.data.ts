const eventsSettings = [
    {
        id: 1,
        label: "Conversation creation",
        value: "conversation.created",
        description: "When a new conversation is created.",
    },
    {
        id: 2,
        label: "Message exchange",
        value: "message.sent",
        description: "When a exchange of messages were made between visitors and the bots or agents.",
    },
    {
        id: 3,
        label: "Status change",
        value: "conversation.statusChanged",
        description: "When the conversation status changes i.e. chat changes from open to closed, or from assigned to unassigned etc.",
    },
    {
        id: 4,
        label: "assigned change",
        value: "conversation.assigned",
        description: "When the assignee of a chat changes from the bot to an agent, or amongst agents.",
    },
    {
        id: 5,
        label: "Variable",
        value: "conversation.variablesUpdated",
        description: "When an SLA breach event occurs with a conversation",
    },
    {
        id: 6,
        label: "Label",
        value: "conversation.labelled",
        description: "Creation or updation of the value stored in the variable.",
    },
    {
        id: 7,
        label: "Note",
        value: "conversation.notesAdded",
        description: "When a note is created, edited or deleted on a chat.",
    }
];

export default eventsSettings;