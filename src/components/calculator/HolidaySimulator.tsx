"use client";

import { useState, useMemo } from "react";
import { findGoldenHolidays, generateGoogleCalendarUrl, GoldenHoliday } from "@/lib/holidays";
import { format } from "date-fns";
import { Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HolidaySimulator() {
    const [year, setYear] = useState<number>(2025);
    const holidays = useMemo(() => findGoldenHolidays(year), [year]);

    return (
        <div className="space-y-8">
            {/* Year Selector */}
            <div className="flex justify-center gap-4">
                {[2025, 2026].map((y) => (
                    <button
                        key={y}
                        onClick={() => setYear(y)}
                        disabled={y === 2026} // MVP limit
                        className={cn(
                            "px-6 py-2 rounded-full font-bold transition-all",
                            year === y
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "bg-white text-muted-foreground border border-slate-200 hover:bg-slate-50",
                            y === 2026 && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {y}년 {y === 2026 && "(준비중)"}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6">
                {holidays.map((h, idx) => (
                    <HolidayCard key={idx} holiday={h} />
                ))}
                {holidays.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        해당 연도의 데이터가 준비되지 않았습니다.
                    </div>
                )}
            </div>
        </div>
    );
}

function HolidayCard({ holiday }: { holiday: GoldenHoliday }) {
    const calendarUrl = generateGoogleCalendarUrl(
        "연차 휴가 (Golden Holiday)",
        holiday.startDate,
        holiday.endDate,
        `${holiday.description}\n필요 연차: ${holiday.leaveDaysNeeded}일\n(${holiday.leaveDates.map(d => format(d, 'MM/dd')).join(', ')})`
    );

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:shadow-md transition-shadow">
            <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-full text-sm">
                        총 {holiday.totalDays}일 휴식
                    </span>
                    {holiday.leaveDaysNeeded === 0 ? (
                        <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full text-sm border border-blue-100">
                            연차 소진 0일!
                        </span>
                    ) : (
                        <span className="bg-slate-100 text-slate-600 font-medium px-3 py-1 rounded-full text-sm border border-slate-200">
                            연차 {holiday.leaveDaysNeeded}개 사용
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                    {format(holiday.startDate, "M월 d일")} ~ {format(holiday.endDate, "M월 d일")}
                </h3>

                <p className="text-muted-foreground">
                    {holiday.description}
                </p>

                {holiday.leaveDates.length > 0 && (
                    <div className="text-sm text-slate-500 flex items-center gap-1 mt-2">
                        <CheckCircle2 className="w-4 h-4 text-slate-400" />
                        추천 연차일: {holiday.leaveDates.map(d => format(d, "M월 d일")).join(", ")}
                    </div>
                )}
            </div>

            <div className="w-full md:w-auto">
                <a
                    href={calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full md:w-auto items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                    <Calendar className="w-4 h-4" />
                    구글 캘린더 등록
                </a>
            </div>
        </div>
    );
}
