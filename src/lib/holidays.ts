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

// 2026년 공휴일 데이터 업데이트
const HOLIDAYS: Record<number, Holiday[]> = {
    2026: [
        { date: "2026-01-01", name: "신정" },
        { date: "2026-02-16", name: "설날 연휴" },
        { date: "2026-02-17", name: "설날" },
        { date: "2026-02-18", name: "설날 연휴" },
        { date: "2026-03-01", name: "삼일절" },
        { date: "2026-03-02", name: "대체공휴일" },
        { date: "2026-05-05", name: "어린이날" },
        { date: "2026-05-24", name: "부처님오신날" },
        { date: "2026-05-25", name: "대체공휴일" },
        { date: "2026-06-06", name: "현충일" },
        { date: "2026-08-15", name: "광복절" },
        { date: "2026-08-17", name: "대체공휴일" },
        { date: "2026-09-24", name: "추석 연휴" },
        { date: "2026-09-25", name: "추석" },
        { date: "2026-09-26", name: "추석 연휴" },
        { date: "2026-09-28", name: "대체공휴일" },
        { date: "2026-10-03", name: "개천절" },
        { date: "2026-10-05", name: "대체공휴일" },
        { date: "2026-10-09", name: "한글날" },
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
    // 2026 Key Dates Manual Definition
    if (year === 2026) {
        return [
            {
                startDate: new Date("2026-01-01"), // Thu
                endDate: new Date("2026-01-04"),   // Sun
                totalDays: 4,
                leaveDaysNeeded: 1, // Jan 2 (Fri)
                leaveDates: [new Date("2026-01-02")],
                description: "신정(목) 다음날 연차를 쓰면 새해 벽두부터 4일 연휴!"
            },
            {
                startDate: new Date("2026-02-14"), // Sat
                endDate: new Date("2026-02-22"),   // Sun
                totalDays: 9,
                leaveDaysNeeded: 2, // Feb 19, 20
                leaveDates: [new Date("2026-02-19"), new Date("2026-02-20")],
                description: "설날 연휴 뒤에 연차 2개를 붙여보세요. 무려 9일간의 긴 휴식!"
            },
            {
                startDate: new Date("2026-05-02"), // Sat
                endDate: new Date("2026-05-05"),   // Tue
                totalDays: 4,
                leaveDaysNeeded: 1, // May 4 (Mon)
                leaveDates: [new Date("2026-05-04")],
                description: "어린이날(화) 앞의 월요일에 연차를 쓰면 4일 휴가 완성."
            },
            {
                startDate: new Date("2026-09-19"), // Sat
                endDate: new Date("2026-09-28"),   // Mon
                totalDays: 10,
                leaveDaysNeeded: 2, // Sep 22, 23
                leaveDates: [new Date("2026-09-22"), new Date("2026-09-23")],
                description: "추석 연휴를 앞두고 연차 2개를 쓰면 열흘간의 황금연휴!"
            },
            {
                startDate: new Date("2026-10-03"), // Sat
                endDate: new Date("2026-10-05"),   // Mon
                totalDays: 3,
                leaveDaysNeeded: 0,
                leaveDates: [],
                description: "개천절 대체공유일로 연차 없이 3일 꿀맛 휴식."
            },
            {
                startDate: new Date("2026-10-09"), // Fri
                endDate: new Date("2026-10-11"),   // Sun
                totalDays: 3,
                leaveDaysNeeded: 0,
                leaveDates: [],
                description: "한글날 금요일 휴무로 깔끔한 3일 연휴."
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
