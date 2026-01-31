"use client";

import { useMemo } from "react";
import { calculatePromotionDates, formatKoDate } from "@/lib/promotion-calculator";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface PromotionTimelineProps {
    baseDate: Date;
}

export default function PromotionTimeline({ baseDate }: PromotionTimelineProps) {
    const dates = useMemo(() => calculatePromotionDates(baseDate), [baseDate]);

    return (
        <div className="space-y-6">
            <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 py-2">

                {/* Step 1: Period Start */}
                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-slate-300 border-2 border-white" />
                    <h4 className="font-semibold text-slate-900">연차 산정 기간 시작</h4>
                    <p className="text-sm text-slate-500">{formatKoDate(dates.periodStart)}</p>
                </div>

                {/* Step 2: 1st Notification (Critical) */}
                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-accent border-2 border-white shadow-sm ring-4 ring-accent/20" />
                    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-bold text-green-900 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> 1차 촉진 시기 (연차 사용 권고)
                                </h4>
                                <p className="text-sm text-green-700 mt-1">
                                    회사는 근로자에게 남은 연차 일수를 알리고, 사용 계획을 제출하라고 서면으로 요구해야 합니다.
                                </p>
                            </div>
                        </div>
                        <div className="mt-3 flex gap-4 text-sm font-medium text-green-800 bg-white/50 p-2 rounded">
                            <span>시작: {formatKoDate(dates.firstNotiStart)}</span>
                            <span className="text-green-300">|</span>
                            <span>종료: {formatKoDate(dates.firstNotiEnd)}</span>
                        </div>
                    </div>
                </div>

                {/* Step 3: 2nd Notification */}
                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-orange-400 border-2 border-white" />
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                        <h4 className="font-bold text-orange-900 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> 2차 촉진 시기 (사용 시기 지정)
                        </h4>
                        <p className="text-sm text-orange-700 mt-1">
                            근로자가 사용 계획을 제출하지 않을 경우, 회사가 사용 시기를 지정하여 통보해야 되는 기한입니다.
                        </p>
                        <div className="mt-3 text-sm font-bold text-orange-800">
                            기한: {formatKoDate(dates.secondNotiDeadline)} 까지
                        </div>
                    </div>
                </div>

                {/* Step 4: Period End */}
                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-slate-900 border-2 border-white" />
                    <h4 className="font-semibold text-slate-900">연차 산정 기간 종료 (연차 소멸)</h4>
                    <p className="text-sm text-slate-500">{formatKoDate(dates.periodEnd)}</p>
                </div>

            </div>
        </div>
    );
}
