export const getStatusLabel = (status: string): string => {
    const map: Record<string, string> = {
        "NOT_STARTED": "Nierozpoczęta",
        "IN_PROGRESS": "W trakcie",
        "FINISHED": "Zakończona"
    };
    return map[status] || status;
};

export const getPriceLabel = (status: string, hasBids: boolean): string => {
    switch (status) {
        case "NOT_STARTED":
            return "Cena wywoławcza:";
        case "IN_PROGRESS":
            return hasBids ? "Aktualna cena:" : "Cena wywoławcza:";
        case "FINISHED":
            return "Wylicytowana cena:";
        default:
            return "Cena:";
    }
};
