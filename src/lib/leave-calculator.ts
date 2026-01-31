import { differenceInMonths, differenceInYears, startOfYear, endOfYear, format } from "date-fns";

export type CalculationMethod = "join" | "fiscal";

export interface LeaveEntitlement {
    year: number; // 1st year, 2nd year...
    periodStart: Date;
    periodEnd: Date;
    days: number;
}

export function calculateJoinDateLeave(joinDate: Date, targetDate: Date = new Date()): LeaveEntitlement[] {
    const yearsOfService = differenceInYears(targetDate, joinDate);
    const entitlements: LeaveEntitlement[] = [];

    // Year 1 ( < 1 year)
    // Monthly accrual: 1 day per month working, max 11 days.
    // Note: This function simplifies to showing the max potential for the year.
    entitlements.push({
        year: 1,
        periodStart: joinDate,
        periodEnd: new Date(joinDate.getFullYear(), joinDate.getMonth(), joinDate.getDate() - 1 + 365), // Rough +1 year
        days: 11,
    });

    // Year 2 onwards (15 days + 1 every 2 years from Year 4)
    // Formula: 15 + floor((n-1)/2)
    for (let i = 1; i <= yearsOfService + 1; i++) {
        if (i === 1) continue; // Handled above
        const days = 15 + Math.floor((i - 2) / 2); // i=2 -> 15, i=3 -> 15, i=4 -> 16
        const start = new Date(joinDate);
        start.setFullYear(joinDate.getFullYear() + (i - 1));
        const end = new Date(start);
        end.setFullYear(start.getFullYear() + 1);
        end.setDate(end.getDate() - 1);

        entitlements.push({
            year: i,
            periodStart: start,
            periodEnd: end,
            days,
        });
    }

    return entitlements;
}

export function calculateFiscalYearLeave(joinDate: Date, fiscalStartMonth: number = 0, targetDate: Date = new Date()): LeaveEntitlement[] {
    // Assuming Fiscal Year starts Jan 1 (month 0)
    // Year 1: Pro-rated
    // Days = 15 * (WorkingDays / 365)

    const entitlements: LeaveEntitlement[] = [];
    const currentYear = targetDate.getFullYear();
    const joinYear = joinDate.getFullYear();

    // 1. Join Year (Pro-rated) form Join Date to Dec 31
    const firstYearEnd = endOfYear(joinDate);
    const totalDaysInFirstYear = 365; // Simplify leap year logic for now or use library
    const workedDays = Math.floor((firstYearEnd.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const proRatedDays = (15 * workedDays) / 365;

    entitlements.push({
        year: 1,
        periodStart: joinDate,
        periodEnd: firstYearEnd,
        days: parseFloat(proRatedDays.toFixed(1)), // Keep 1 decimal
    });

    // Subsequent Years (Jan 1 - Dec 31)
    // Logic:
    // Next Jan 1 is "Year 2" for calculation purposes?
    // Actually, at Jan 1 of next year, you get 15 days (if worked > 80%).
    // Formula: 15 + floor((n-1)/2) where n is years since join (fiscal count).

    const yearsSinceJoin = currentYear - joinYear;

    for (let i = 1; i <= yearsSinceJoin + 1; i++) {
        const fiscalYear = joinYear + i;
        const days = 15 + Math.floor((i - 1) / 2); // Year 2 (i=1) -> 15, Year 3 (i=2) -> 15...

        entitlements.push({
            year: i + 1, // Fiscal year count
            periodStart: startOfYear(new Date(fiscalYear, 0, 1)),
            periodEnd: endOfYear(new Date(fiscalYear, 0, 1)),
            days,
        });
    }

    return entitlements;
}
