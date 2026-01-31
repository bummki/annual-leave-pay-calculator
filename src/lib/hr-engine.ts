import { differenceInMonths, parseISO, startOfToday, format } from "date-fns";
import { calculateJoinDateLeave, calculateFiscalYearLeave } from "./leave-calculator";
import { calculatePromotionDates } from "./promotion-calculator";

export interface EmployeeRow {
    name: string;
    empId: string;
    joinDate: string;
    dept: string;
    salary: number;
    workHours: number;
    usedLeave: number;
    email: string;
    retirementDate?: string;
}

export interface HrCalculationResult extends EmployeeRow {
    dailyWage: number;
    totalEntitlement: number;
    remainingLeave: number;
    moneyValue: number;
    promotion1st: string;
    promotion2nd: string;
    retirementWarning: boolean;
    isNewHire: boolean;
}

export function processHrData(row: EmployeeRow): HrCalculationResult {
    const today = startOfToday();
    const jDate = parseISO(row.joinDate);
    const tenureMonths = differenceInMonths(today, jDate);
    const isNewHire = tenureMonths < 12;

    // 1. 수당 계산 (통상시급 기반)
    const hourlyRate = row.salary / row.workHours;
    const dailyWage = hourlyRate * 8;

    // 2. 연차 개수 산정 (입사일 기준 자동 계산)
    const leaveInfo = calculateJoinDateLeave(jDate, today);
    // leaveInfo는 배열이므로 가장 최근 연도의 days를 합산
    const totalEntitlement = leaveInfo.reduce((sum, item) => sum + item.days, 0);
    const remainingLeave = Math.max(0, totalEntitlement - row.usedLeave);
    const moneyValue = remainingLeave * dailyWage;

    // 3. 촉진 일정
    const promotionDates = calculatePromotionDates(jDate);

    // 4. 퇴직 정산 경고 (퇴직예정일이 있을 때)
    let retirementWarning = false;
    if (row.retirementDate) {
        const retireDate = parseISO(row.retirementDate);
        const fiscalInfo = calculateFiscalYearLeave(jDate, 0, retireDate);
        const joinInfo = calculateJoinDateLeave(jDate, retireDate);
        const fiscalTotal = fiscalInfo.reduce((sum, item) => sum + item.days, 0);
        const joinTotal = joinInfo.reduce((sum, item) => sum + item.days, 0);
        retirementWarning = joinTotal > fiscalTotal;
    }

    return {
        ...row,
        dailyWage,
        totalEntitlement,
        remainingLeave,
        moneyValue,
        promotion1st: format(promotionDates.firstNotiStart, "yyyy-MM-dd"),
        promotion2nd: format(promotionDates.secondNotiDeadline, "yyyy-MM-dd"),
        retirementWarning,
        isNewHire
    };
}
