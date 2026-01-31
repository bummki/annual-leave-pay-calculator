"use client";

import { useState, useMemo } from "react";
import { formatCurrency, cn } from "@/lib/utils";
import { Calculator, DollarSign, Clock, Calendar } from "lucide-react";

export default function MoneyCalculator() {
    const [salary, setSalary] = useState<number | "">("");
    const [workHours, setWorkHours] = useState<number>(209);
    const [dailyHours, setDailyHours] = useState<number>(8);
    const [leaveDays, setLeaveDays] = useState<number | "">("");

    const result = useMemo(() => {
        if (!salary || !leaveDays) return 0;
        const hourlyRate = (Number(salary) / workHours);
        const dailyWage = hourlyRate * dailyHours;
        return Math.floor(dailyWage * Number(leaveDays));
    }, [salary, workHours, dailyHours, leaveDays]);

    const dailyWage = useMemo(() => {
        if (!salary) return 0;
        return Math.floor((Number(salary) / workHours) * dailyHours);
    }, [salary, workHours, dailyHours]);

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Input Section */}
                <div className="bg-card text-card-foreground rounded-2xl shadow-sm border p-6 space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Calculator className="w-6 h-6 text-primary" />
                        정보 입력
                    </h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                월 기본급 (세전)
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="number"
                                    placeholder="3,000,000"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={salary}
                                    onChange={(e) => setSalary(Number(e.target.value))}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                식대 등 비과세 수당을 제외한 통상임금 기준 월 급여를 입력하세요.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">월 소정근로시간</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="number"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm"
                                        value={workHours}
                                        onChange={(e) => setWorkHours(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">1일 근무시간</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="number"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm"
                                        value={dailyHours}
                                        onChange={(e) => setDailyHours(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">남은 연차 일수</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="number"
                                    step="0.5"
                                    placeholder="15"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm focus-visible:ring-2 focus-visible:ring-primary"
                                    value={leaveDays}
                                    onChange={(e) => setLeaveDays(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Result Section */}
                <div className="bg-primary text-primary-foreground rounded-2xl shadow-xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
                    <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 p-32 bg-accent/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

                    <div className="relative z-10 space-y-8 text-center">
                        <div>
                            <h3 className="text-lg font-medium text-primary-foreground/80 mb-2">예상 연차 수당</h3>
                            <div className="text-5xl font-extrabold tracking-tight text-white mb-2 break-keep">
                                {salary && leaveDays ? (
                                    <span className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        {formatCurrency(result)}
                                    </span>
                                ) : (
                                    <span className="text-white/20">0원</span>
                                )}
                            </div>
                            {result > 0 && (
                                <p className="text-sm text-accent font-bold bg-white/10 inline-block px-3 py-1 rounded-full">
                                    치킨 {Math.floor(result / 20000)}마리 값이에요! 🍗
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                            <div className="text-left">
                                <p className="text-sm text-primary-foreground/60">1일 통상임금</p>
                                <p className="text-xl font-bold">{formatCurrency(dailyWage)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-primary-foreground/60">설정된 시급</p>
                                <p className="text-xl font-bold">{formatCurrency(Math.floor(Number(salary || 0) / workHours))}</p>
                            </div>
                        </div>
                        <p className="text-xs text-primary-foreground/40 mt-4 text-left">
                            * 계산 결과는 통상임금 산정 기준에 따라 실제 수령액과 차이가 있을 수 있습니다.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
