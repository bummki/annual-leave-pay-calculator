import { eachDayOfInterval, endOfYear, format, getDay, isSameDay, startOfYear, addDays } from "date-fns";
import { ko } from "date-fns/locale";

export interface Holiday {
    date: string; // YYYY-MM-DD
    name: string;
}

export interface GoldenHoliday {
    startDate: Date;
    endDate: Date;
    totalDays: number;
    leaveDaysNeeded: number;
    leaveDates: Date[];
    description: string;
}

// Fixed holidays and Major Lunar Holidays (Hardcoded for 2025-2026)
const HOLIDAYS: Record<number, Holiday[]> = {
    2025: [
        { date: "2025-01-01", name: "신정" },
        { date: "2025-01-27", name: "설날 연휴" },
        { date: "2025-01-28", name: "설날" },
        { date: "2025-01-29", name: "설날 연휴" },
        { date: "2025-01-30", name: "대체공휴일" },
        { date: "2025-03-01", name: "삼일절" },
        { date: "2025-03-03", name: "대체공휴일" },
        { date: "2025-05-05", name: "어린이날" },
        { date: "2025-05-06", name: "부처님오신날" },
        { date: "2025-06-06", name: "현충일" },
        { date: "2025-08-15", name: "광복절" },
        { date: "2025-10-03", name: "개천절" },
        { date: "2025-10-05", name: "추석 연휴" },
        { date: "2025-10-06", name: "추석" },
        { date: "2025-10-07", name: "추석 연휴" },
        { date: "2025-10-08", name: "대체공휴일" },
        { date: "2025-10-09", name: "한글날" },
        { date: "2025-12-25", name: "크리스마스" },
    ],
    2026: [
        { date: "2026-01-01", name: "신정" },
        { date: "2026-02-17", name: "설날" },
        { date: "2026-03-01", name: "삼일절" },
        { date: "2026-05-05", name: "어린이날" },
        { date: "2026-12-25", name: "크리스마스" },
    ]
};

function isWeekend(date: Date) {
    const day = getDay(date);
    return day === 0 || day === 6; // 0: Sun, 6: Sat
}

function getHolidayName(date: Date, year: number): string | null {
    const dateStr = format(date, "yyyy-MM-dd");
    const yearHolidays = HOLIDAYS[year] || [];
    const holiday = yearHolidays.find(h => h.date === dateStr);
    return holiday ? holiday.name : null;
}

export function findGoldenHolidays(year: number): GoldenHoliday[] {
    // 2025 Key Dates Manual Definition
    if (year === 2025) {
        return [
            {
                startDate: new Date("2025-01-25"), // Sat
                endDate: new Date("2025-02-02"),   // Sun
                totalDays: 9,
                leaveDaysNeeded: 2, // Jan 27(Mon), Jan 31(Fri)
                leaveDates: [new Date("2025-01-27"), new Date("2025-01-31")],
                description: "설날 앞뒤로 연차 2개를 쓰면 9일 휴가가 완성됩니다!"
            },
            {
                startDate: new Date("2025-05-03"),
                endDate: new Date("2025-05-06"),
                totalDays: 4,
                leaveDaysNeeded: 0,
                leaveDates: [],
                description: "5월 가정의 달, 연차 없이 4일 연속 휴식!"
            },
            {
                startDate: new Date("2025-06-06"), // Fri
                endDate: new Date("2025-06-08"),   // Sun
                totalDays: 3,
                leaveDaysNeeded: 0,
                leaveDates: [],
                description: "현충일 금요일 휴무로 3일 연휴"
            },
            {
                startDate: new Date("2025-08-15"), // Fri
                endDate: new Date("2025-08-17"),   // Sun
                totalDays: 3,
                leaveDaysNeeded: 0,
                leaveDates: [],
                description: "광복절 금요일 휴무로 시원한 3일 연휴"
            },
            {
                startDate: new Date("2025-10-03"), // Fri (Gaecheon)
                endDate: new Date("2025-10-12"),   // Next Sun
                totalDays: 10,
                leaveDaysNeeded: 1,
                leaveDates: [new Date("2025-10-10")],
                description: "2025년 역대급 추석 황금연휴! 연차 1개로 10일을 쉬세요."
            },
            {
                startDate: new Date("2025-12-25"), // Thu
                endDate: new Date("2025-12-28"),   // Sun
                totalDays: 4,
                leaveDaysNeeded: 1, // Dec 26 (Fri)
                leaveDates: [new Date("2025-12-26")],
                description: "크리스마스(목) 다음날 연차 쓰면 주말까지 4일 연휴!"
            }
        ];
    }

    return [];
}

export function generateGoogleCalendarUrl(title: string, start: Date, end: Date, details: string) {
    const s = format(start, "yyyyMMdd");
    const e = format(addDays(end, 1), "yyyyMMdd");

    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.append("action", "TEMPLATE");
    url.searchParams.append("text", title);
    url.searchParams.append("dates", `${s}/${e}`);
    url.searchParams.append("details", details);

    return url.toString();
}
