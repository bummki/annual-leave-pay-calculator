"use client";

import { useState } from "react";
import { addMonths, differenceInMonths, format, startOfToday, addYears, subDays } from "date-fns";
import { CheckCircle2, Circle, Clock, AlertTriangle, Calendar, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { downloadCsv } from "@/lib/csv-utils";

export default function NewHireSimulator() {
    const [joinDateStr, setJoinDateStr] = useState<string>("");

    const today = startOfToday();
    const joinDate = joinDateStr ? new Date(joinDateStr) : null;

    // Calculate tenure details
    const monthsWorked = joinDate ? differenceInMonths(today, joinDate) : 0;
    const isOverOneYear = monthsWorked >= 12;

    const timeline: { month: number; accrualDate: Date; isAccrued: boolean; isExpired: boolean }[] = [];

    if (joinDate) {
        // Generate 11 months of accrual points
        for (let i = 1; i <= 11; i++) {
            const accrualDate = addMonths(joinDate, i);
            // Adjust logic: If you join Jan 1, Month 1 complete -> Feb 1 leave occurs.
            // Is accrued if today >= accrualDate
            const isAccrued = today >= accrualDate;

            timeline.push({
                month: i,
                accrualDate,
                isAccrued,
                isExpired: isOverOneYear // Simplify expiration for visual clarity
            });
        }
    }

    return (
        <div className="space-y-8">
            {/* Input */}
            <div className="bg-card rounded-2xl shadow-sm border p-6">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-primary" />
                    입사일 입력
                </h2>
                <div className="space-y-4">
                    <label className="text-sm font-medium">입사일자</label>
                    <input
                        type="date"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary w-full md:w-1/2"
                        value={joinDateStr}
                        onChange={(e) => setJoinDateStr(e.target.value)}
                    />
                </div>
            </div>

            {joinDate && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Summary Card */}
                    <div className="md:col-span-1 space-y-4 h-fit">
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">현재 발생 현황</h3>
                            <div className="text-4xl font-extrabold text-primary mb-1">
                                {isOverOneYear ? "11" : Math.min(monthsWorked, 11)} / 11
                                <span className="text-lg font-normal text-muted-foreground ml-2">개</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {isOverOneYear
                                    ? "입사 1년이 지났습니다. 1년 미만 연차는 소멸되었습니다."
                                    : `${monthsWorked}개월 근무 중입니다.`}
                            </p>
                            <button
                                onClick={() => downloadCsv(timeline.map(t => ({ "회차": t.month, "발생일": format(t.accrualDate, "yyyy-MM-dd"), "발생여부": t.isAccrued ? "발생" : "예정" })), "신입사원_연차타임라인")}
                                className="w-full mt-4 flex items-center justify-center gap-2 text-primary font-bold py-2 border-2 border-primary/20 rounded-xl hover:bg-primary/5 transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                결과 다운로드 (CSV)
                            </button>
                        </div>

                        {isOverOneYear && (
                            <div className="bg-red-50 text-red-800 p-4 rounded-xl border border-red-100 text-sm flex gap-2">
                                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                                <div>
                                    <strong>주의: 연차 소멸</strong><br />
                                    1년 미만 기간 동안 발생한 연차(최대 11개)는 입사 1년이 되는 날 모두 소멸됩니다.
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Timeline */}
                    <div className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">월별 발생 타임라인</h3>
                        <div className="space-y-0">
                            {timeline.map((item, idx) => (
                                <div key={idx} className="relative pl-8 pb-8 last:pb-0">
                                    {/* Connector Line */}
                                    {idx !== timeline.length - 1 && (
                                        <div className="absolute left-[11px] top-3 bottom-0 w-0.5 bg-slate-100" />
                                    )}

                                    {/* Dot */}
                                    <div className={cn(
                                        "absolute left-0 top-1 h-6 w-6 rounded-full border-4 border-white flex items-center justify-center",
                                        item.isAccrued
                                            ? "bg-accent shadow-accent/30 shadow-sm"
                                            : "bg-slate-200"
                                    )}>
                                        {item.isAccrued ? (
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        ) : (
                                            <Circle className="w-4 h-4 text-white fill-transparent" />
                                        )}
                                    </div>

                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className={cn(
                                                "font-bold text-base",
                                                item.isAccrued ? "text-slate-900" : "text-slate-400"
                                            )}>
                                                {item.month}개월 만근 시
                                            </h4>
                                            <p className="text-sm text-muted-foreground mt-0.5">
                                                발생일: {format(item.accrualDate, "yyyy년 M월 d일")}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className={cn(
                                                "inline-block px-3 py-1 rounded-full text-xs font-bold",
                                                item.isAccrued
                                                    ? "bg-accent/10 text-accent"
                                                    : "bg-slate-100 text-slate-400"
                                            )}>
                                                {item.isAccrued ? "+1개 발생" : "대기 중"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
