"use client";

import { useState, useRef } from "react";
import { Download, Upload, FileSpreadsheet, Trash2, AlertCircle, TrendingUp, Info } from "lucide-react";
import { downloadHrTemplate, downloadCsv } from "@/lib/csv-utils";
import { processHrData, HrCalculationResult, EmployeeRow } from "@/lib/hr-engine";
import { cn, formatCurrency } from "@/lib/utils";
import AdSenseBanner from "@/components/layout/AdSense";

export default function HrDashboard() {
    const [results, setResults] = useState<HrCalculationResult[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // CSV 파일 파싱 (간단한 구현)
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
        let file: File | undefined;
        if ("files" in e.target && e.target.files) {
            file = e.target.files[0];
        } else if ("dataTransfer" in e) {
            e.preventDefault();
            file = e.dataTransfer.files[0];
        }

        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            parseCsv(text);
        };
        reader.readAsText(file, "UTF-8");
    };

    const parseCsv = (text: string) => {
        const lines = text.split("\n").filter(line => line.trim());
        if (lines.length < 2) return;

        const dataRows = lines.slice(1);
        const newResults = dataRows.map(line => {
            const [name, empId, joinDate, dept, salary, workHours, usedLeave, email, retirementDate] = line.split(",").map(v => v.replace(/"/g, "").trim());

            const row: EmployeeRow = {
                name,
                empId,
                joinDate,
                dept,
                salary: Number(salary) || 0,
                workHours: Number(workHours) || 209,
                usedLeave: Number(usedLeave) || 0,
                email,
                retirementDate: retirementDate || undefined
            };

            return processHrData(row);
        });

        setResults(newResults);
    };

    const clearData = () => {
        if (confirm("모든 데이터를 삭제하시겠습니까?")) {
            setResults([]);
        }
    };

    return (
        <div className="space-y-10">
            {/* Hero / Upload Section */}
            <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />

                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            인사팀을 위한 <br />
                            <span className="text-primary text-4xl block mt-1">올인원 연차 관리</span>
                        </h2>
                        <p className="text-slate-500 leading-relaxed max-w-md">
                            엑셀 파일을 업로드하여 전 직원의 연차 수당, 촉진 일정, 퇴직 정산 리스크를 한눈에 관리하세요. 전문가의 법적 자문을 바탕으로 설계된 전용 양식을 제공합니다.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={downloadHrTemplate}
                                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-emerald-200 active:scale-95"
                            >
                                <FileSpreadsheet className="w-5 h-5" />
                                표준 양식 다운로드 (CSV)
                            </button>
                        </div>
                    </div>

                    <div
                        className={cn(
                            "w-full md:w-[400px] aspect-square rounded-3xl border-3 border-dashed flex flex-col items-center justify-center gap-4 transition-all cursor-pointer group",
                            isDragging ? "border-primary bg-primary/5 scale-102 shadow-lg" : "border-slate-200 hover:border-primary/50 hover:bg-slate-50"
                        )}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => { setIsDragging(false); handleFileUpload(e); }}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="bg-primary/10 p-5 rounded-2xl group-hover:scale-110 transition-transform">
                            <Upload className="w-10 h-10 text-primary" />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-slate-700 text-lg">CSV 파일 업로드</p>
                            <p className="text-sm text-slate-400 mt-1">파일을 여기로 드래그하거나 클릭하세요</p>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".csv"
                            onChange={handleFileUpload}
                        />
                    </div>
                </div>
            </section>

            <AdSenseBanner />

            {/* Results Table */}
            {results.length > 0 && (
                <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <FileSpreadsheet className="w-6 h-6 text-emerald-500" />
                                분석 결과 리스트
                            </h3>
                            <p className="text-slate-500 text-sm mt-1">총 {results.length}명의 직원 데이터가 분석되었습니다.</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => downloadCsv(results, `연차분석_결과_${new Date().toISOString().split('T')[0]}`)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-200 transition-all active:scale-95"
                            >
                                <Download className="w-4 h-4" />
                                분석 결과 CSV 저장
                            </button>
                            <button
                                onClick={clearData}
                                className="bg-white border text-slate-400 hover:text-red-500 hover:border-red-200 p-2.5 rounded-xl transition-all"
                                title="데이터 초기화"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden shadow-slate-200/40">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                        <th className="px-6 py-4">직원 정보</th>
                                        <th className="px-6 py-4">연차 현황</th>
                                        <th className="px-6 py-4">예상 지급액</th>
                                        <th className="px-6 py-4">법적 촉진/정산 알림</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {results.map((emp, i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-6">
                                                <div className="font-bold text-slate-900">{emp.name}</div>
                                                <div className="text-xs text-slate-400 mt-1">{emp.dept} | {emp.empId}</div>
                                                <div className="text-[11px] text-slate-400">{emp.joinDate} 입사</div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="font-bold text-slate-700">{emp.totalEntitlement - emp.remainingLeave}</span>
                                                    <span className="text-slate-300">/</span>
                                                    <span className="font-bold text-primary">{emp.totalEntitlement}</span>
                                                    <span className="text-xs text-slate-400">일</span>
                                                </div>
                                                <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary"
                                                        style={{ width: `${((emp.totalEntitlement - emp.remainingLeave) / emp.totalEntitlement) * 100}%` }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 font-bold text-slate-900">
                                                {formatCurrency(emp.moneyValue)}
                                                <div className="text-[10px] text-slate-400 font-normal mt-1">시급: {formatCurrency(emp.dailyWage / 8)}</div>
                                            </td>
                                            <td className="px-6 py-6 max-w-xs">
                                                <div className="flex flex-wrap gap-2">
                                                    <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-[10px] font-bold border border-blue-100">
                                                        1차 촉진: {emp.promotion1st}
                                                    </div>
                                                    {emp.retirementWarning && (
                                                        <div className="bg-amber-50 text-amber-600 px-2 py-1 rounded text-[10px] font-bold border border-amber-200 flex items-center gap-1">
                                                            <AlertCircle className="w-3 h-3" />
                                                            퇴직 정산 주의
                                                        </div>
                                                    )}
                                                    {emp.isNewHire && (
                                                        <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-[10px] font-bold border border-emerald-100">
                                                            신입사원
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )}

            {/* Info Context */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 flex gap-4 shadow-sm">
                    <div className="bg-amber-100 p-3 h-fit rounded-xl">
                        <TrendingUp className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-1">통상임금 자동 환산</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            월급과 소정근로시간(기본 209시간)을 기준으로 정확한 시급을 도출하고, 잔여 연차를 수당으로 자동 환산합니다.
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 flex gap-4 shadow-sm">
                    <div className="bg-primary/10 p-3 h-fit rounded-xl">
                        <Info className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-1">법정 알림 자동 계산</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            근로기준법 제61조에 의거한 1차/2차 연차 사용 촉진 시기를 분석하여 인사 담당자의 리스크를 줄여드립니다.
                        </p>
                    </div>
                </div>
            </section>

            <AdSenseBanner />
        </div>
    );
}
