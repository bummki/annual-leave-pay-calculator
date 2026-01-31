"use client";

import { useState } from "react";
import { calculateJoinDateLeave, calculateFiscalYearLeave, LeaveEntitlement } from "@/lib/leave-calculator";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowRightLeft, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LeaveComparator() {
    const [joinDate, setJoinDate] = useState<string>("");
    const [targetDate, setTargetDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

    const joinData = joinDate ? calculateJoinDateLeave(new Date(joinDate), new Date(targetDate)) : [];
    const fiscalData = joinDate ? calculateFiscalYearLeave(new Date(joinDate), 0, new Date(targetDate)) : []; // 0 = Jan

    // Combine data for comparison table
    const maxYears = Math.max(joinData.length, fiscalData.length);
    const rows = [];
    for (let i = 0; i < maxYears; i++) {
        rows.push({
            year: i + 1,
            join: joinData[i] || null,
            fiscal: fiscalData[i] || null,
        });
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8">

            {/* Input Card */}
            <div className="bg-card rounded-2xl shadow-sm border p-6">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    입사일 입력
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">입사일자</label>
                        <input
                            type="date"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                            value={joinDate}
                            onChange={(e) => setJoinDate(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">계산 기준일 (퇴사 예정일 등)</label>
                        <input
                            type="date"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                            value={targetDate}
                            onChange={(e) => setTargetDate(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Comparison View */}
            {joinDate && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Join Date Basis */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-lg text-slate-800">입사일 기준</h3>
                            <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">원칙</span>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50/50 text-slate-500">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium">년차</th>
                                        <th className="px-4 py-2 text-left font-medium">발생 기간</th>
                                        <th className="px-4 py-2 text-right font-medium">일수</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {joinData.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-slate-900">{item.year}년차</td>
                                            <td className="px-4 py-3 text-slate-600">
                                                {format(item.periodStart, 'yyyy.MM.dd')} ~ {format(item.periodEnd, 'yyyy.MM.dd')}
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold text-primary">{item.days}일</td>
                                        </tr>
                                    ))}
                                    {joinData.length === 0 && (
                                        <tr><td colSpan={3} className="p-4 text-center text-slate-400">계산 결과가 없습니다.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Fiscal Year Basis */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden relative">
                        <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex items-center justify-between">
                            <h3 className="font-bold text-lg text-indigo-900">회계연도 기준 (1.1)</h3>
                            <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-1 rounded">편의</span>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-sm">
                                <thead className="bg-indigo-50/30 text-indigo-500">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium">년차</th>
                                        <th className="px-4 py-2 text-left font-medium">발생 기간</th>
                                        <th className="px-4 py-2 text-right font-medium">일수</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-indigo-50">
                                    {fiscalData.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-indigo-50/50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-indigo-900">{item.year}년차</td>
                                            <td className="px-4 py-3 text-indigo-700">
                                                {format(item.periodStart, 'yyyy.MM.dd')} ~ {format(item.periodEnd, 'yyyy.MM.dd')}
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold text-indigo-600">{item.days}일</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Recommendation Tip */}
                        <div className="bg-yellow-50 p-4 m-4 rounded-xl border border-yellow-100 flex items-start gap-3">
                            <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-yellow-800">
                                <strong>퇴직 정산 팁:</strong><br />
                                근로자에게 유리한 기준을 적용해야 합니다. 퇴직 시점에
                                <span className="font-bold mx-1">
                                    입사일 기준 총 {joinData.reduce((acc, curr) => acc + curr.days, 0)}일
                                </span>
                                vs
                                <span className="font-bold mx-1">
                                    회계연도 기준 총 {fiscalData.reduce((acc, curr) => acc + curr.days, 0)}일
                                </span>
                                중 더 많은 일수를 기준으로 수당을 받아야 합니다.
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {!joinDate && (
                <div className="text-center py-12 text-muted-foreground bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    입사일을 선택하여 계산을 시작하세요.
                </div>
            )}
        </div>
    );
}
