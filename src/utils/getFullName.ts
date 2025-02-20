import { useChatStore } from "@/stores/useChatStore";

export function getFullName(id: string): string {
    const allTeammates = useChatStore.getState().teamates;
    const teammate = allTeammates.filter((teammate) => teammate?.teammate?._id === id)
    let username;
    if (teammate.length > 0) {
        username = `${teammate[0].teammate.firstName} ${teammate[0].teammate.lastName}`
    }

    if (!username || username === undefined) {
        return ""
    }

    return username
        .split(" ")
        .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}