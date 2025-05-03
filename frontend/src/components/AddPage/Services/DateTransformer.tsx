const monthsMap: Record<string, string> = {
    "stycznia": "01",
    "lutego": "02",
    "marca": "03",
    "kwietnia": "04",
    "maja": "05",
    "czerwca": "06",
    "lipca": "07",
    "sierpnia": "08",
    "września": "09",
    "października": "10",
    "listopada": "11",
    "grudnia": "12"
};

export function transformDateToDateFormat(dateFromForm: string): string {

    if (dateFromForm === "") return "";

    const dateParts = dateFromForm.trim().split(" ");

    const day = dateParts[0].padStart(2, "0");
    const month = monthsMap[dateParts[1].toLowerCase()]
    const actualYear = new Date().getFullYear();

    if(!month) return "";

    return `${actualYear}-${month}-${day}`;
}