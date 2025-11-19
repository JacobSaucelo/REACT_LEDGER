import { format, parseISO } from "date-fns";

/**
 * Common date format presets
 */
export const DateFormats = {
  SHORT: "MM/dd/yyyy", // 11/19/2025
  MEDIUM: "MMM dd, yyyy", // Nov 19, 2025
  LONG: "MMMM do, yyyy", // November 19th, 2025
  FULL: "EEEE, MMMM do, yyyy", // Tuesday, November 19th, 2025
  TIME_12: "h:mm a", // 2:30 PM
  TIME_24: "HH:mm", // 14:30
  DATETIME_SHORT: "MM/dd/yyyy h:mm a", // 11/19/2025 2:30 PM
  DATETIME_MEDIUM: "MMM dd, yyyy h:mm a", // Nov 19, 2025 2:30 PM
  ISO: "yyyy-MM-dd'T'HH:mm:ss", // 2025-11-19T14:30:00
} as const;

type DateInput = Date | string | number;
type FormatPreset = keyof typeof DateFormats;

/**
 * Formats a date using date-fns with TypeScript support
 *
 * @param date - Date object, ISO string, or timestamp
 * @param formatStr - Custom format string or preset key
 * @returns Formatted date string
 *
 * @example
 * FEATURES_Format_Date(new Date(), 'MEDIUM') // "Nov 19, 2025"
 * FEATURES_Format_Date('2025-11-19', 'LONG') // "November 19th, 2025"
 * FEATURES_Format_Date(1700000000000, 'TIME_12') // "2:30 PM"
 * FEATURES_Format_Date(new Date(), 'yyyy-MM-dd') // "2025-11-19" (custom format)
 */
export function FEATURES_Format_Date(
  date: DateInput,
  formatStr: FormatPreset | string = "MEDIUM"
): string {
  try {
    let dateObj: Date;

    if (date instanceof Date) {
      dateObj = date;
    } else if (typeof date === "string") {
      dateObj = parseISO(date);
    } else if (typeof date === "number") {
      dateObj = new Date(date);
    } else {
      throw new Error("Invalid date input");
    }

    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid date");
    }

    const formatPattern =
      formatStr in DateFormats
        ? DateFormats[formatStr as FormatPreset]
        : formatStr;

    return format(dateObj, formatPattern);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Invalid Date";
  }
}

export function formatNow(formatStr: FormatPreset | string = "MEDIUM"): string {
  return FEATURES_Format_Date(new Date(), formatStr);
}

export function formatDateSafe(
  date: DateInput | null | undefined,
  formatStr: FormatPreset | string = "MEDIUM",
  fallback: string = "-"
): string {
  if (!date) return fallback;
  return FEATURES_Format_Date(date, formatStr);
}
