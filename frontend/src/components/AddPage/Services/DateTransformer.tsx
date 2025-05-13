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

const reverseMonthsMap: Record<string, string> = {
    "01": "stycznia",
    "02": "lutego",
    "03": "marca",
    "04": "kwietnia",
    "05": "maja",
    "06": "czerwca",
    "07": "lipca",
    "08": "sierpnia",
    "09": "września",
    "10": "października",
    "11": "listopada",
    "12": "grudnia"
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

export function transformDateFormatToFormDate(date: string): string {

    if (date === "") return "";

    const dateParts = date.trim().split("-");

    const day = dateParts[2];
    const month = reverseMonthsMap[dateParts[1]]

    if(!month) return "";

    return `${day} ${month}`;
}