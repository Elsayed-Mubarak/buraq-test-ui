export const getInitialsCharts = (conversation: any) => {
    const name = conversation?.contact?.name?.trim() || "";

    if (!name) return "VI";

    const nameParts = name.split(" ").filter(Boolean);

    if (nameParts.length === 1) {
        return nameParts[0][0].toUpperCase();
    }

    return `${nameParts[0][0].toUpperCase()}${nameParts[1][0].toUpperCase()}`;
};