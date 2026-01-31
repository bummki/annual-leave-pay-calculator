import { addYears, subMonths, addDays, subDays, startOfDay, format } from "date-fns";
import { ko } from "date-fns/locale";

export interface PromotionTimeline {
    periodStart: Date;
    periodEnd: Date;

    // 1st Notification (Employer notifies unused leave)
    // Timing: 6 months before period end.
    firstNotiStart: Date; // Exactly 6 months before
    firstNotiEnd: Date;   // 10 days duration

    // 2nd Notification (Employer designates usage)
    // Timing: 2 months before period end.
    secondNotiDeadline: Date;
}

export function calculatePromotionDates(baseDate: Date): PromotionTimeline {
    // Assume baseDate is the start of the 1-year annual leave period.
    // e.g., If Join Date is 2024-01-01, period is 2024-01-01 ~ 2024-12-31.

    const periodStart = startOfDay(baseDate);
    const periodEnd = subDays(addYears(periodStart, 1), 1); // 1 year - 1 day

    // 1st Notification: 6 months before period end
    // Valid action period: During the 10 days starting from 6 months prior
    const firstNotiStart = subMonths(periodEnd, 6);
    const firstNotiEnd = addDays(firstNotiStart, 10);

    // 2nd Notification: 2 months before period end
    // Valid action period: Must be done by this date
    const secondNotiDeadline = subMonths(periodEnd, 2);

    return {
        periodStart,
        periodEnd,
        firstNotiStart,
        firstNotiEnd,
        secondNotiDeadline,
    };
}

export function formatKoDate(date: Date): string {
    return format(date, "yyyy년 M월 d일 (EEE)", { locale: ko });
}
