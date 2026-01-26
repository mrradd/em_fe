
/**
 * Takes a UTC date string and converts it to Day Month Date Year - HH:MM:SS.
 * e.g. Sun Jan 04 2026 - 17:36:55
 * @param utcDate 
 * @returns 
 */
export const utcToMericanDateTimeString = (utcDate: string): string | null => {
    //We must deal with a string.
    if ((typeof utcDate) !== 'string') {
        console.warn(`utcToMericanDateTimeString: utcDate not a string.`)
        return null;
    }

    const date = new Date(utcDate.replace(/\.(\d{3})\d+Z$/, '.$1Z'));

    const padZero = (n: number): string => (n < 10 ? `0${n}` : String(n));
    const hrs = padZero(date.getHours());
    const mins = padZero(date.getMinutes());
    const secs = padZero(date.getSeconds());
    return `${date.toDateString()} - ${hrs}:${mins}:${secs}`;
}
