"use client";

import { useState } from "react";
import PromotionTimeline from "@/components/calculator/PromotionTimeline";
import { Calendar } from "lucide-react";

export default function PromotionPage() {
    const [baseDate, setBaseDate] = useState<string>("");

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            {/* Input Section */}
            <div className="bg-card rounded-2xl shadow-sm border p-6">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-primary" />
                    기준일 입력
                </h2>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">연차 산정 시작일 (입사일 또는 회계연도 시작일)</label>
                        <input
                            type="date"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary w-full md:w-1/2"
                            value={baseDate}
                            onChange={(e) => setBaseDate(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                            예: 입사일이 2024.05.01이라면 2024-05-01 입력
                        </p>
                    </div>
                </div>
            </div>

            {/* Result Section */}
            {baseDate ? (
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
                    <h3 className="text-lg font-bold mb-6 text-slate-900">연차 사용 촉진 타임라인</h3>
                    <PromotionTimeline baseDate={new Date(baseDate)} />
                </div>
            ) : (
                <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-muted-foreground">날짜를 입력하면 촉진 시기 타임라인이 표시됩니다.</p>
                </div>
            )}
        </div>
    );
}
