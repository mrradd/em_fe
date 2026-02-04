
/**
 * Convert a millisecond timestamp to a readable date-time string.
 * @param msTimestamp - Milliseconds since the Unix epoch.
 * @returns Formatted date string like "Mon Jan 01 2024 - 13:45:09", or "Invalid timestamp."
 */
export const msToDate = (msTimestamp: number): string => {
  if (!msTimestamp || typeof (msTimestamp) !== "number") {
    return "Invalid timestamp."
  }

  const date = new Date(msTimestamp);
  const padZero = (n: number): string => (n < 10 ? `0${n}` : String(n));
  const hrs = padZero(date.getHours());
  const mins = padZero(date.getMinutes());
  const secs = padZero(date.getSeconds());

  return `${date.toDateString()} - ${hrs}:${mins}:${secs}`;
}
