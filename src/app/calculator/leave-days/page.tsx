import { Metadata } from "next";
import LeaveComparator from "@/components/calculator/LeaveComparator";
import AdSenseBanner from "@/components/layout/AdSense";

export const metadata: Metadata = {
    title: "입사일 vs 회계연도 비교 | 퇴직 정산 계산기",
    description: "퇴직 시 어느 방식이 더 유리할까? 입사일 기준과 회계연도 기준을 비교하여 최적의 선택을 도와드립니다.",
};

export default function LeaveDaysPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <header className="mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-foreground mb-4">입사일 vs 회계연도 비교</h1>
                <p className="text-muted-foreground">
                    퇴직 시 어느 방식이 더 유리할까요?<br />
                    두 가지 방식을 비교하여 <span className="text-primary font-bold">최적의 선택</span>을 도와드립니다.
                </p>
            </header>
            <div className="max-w-4xl mx-auto">
                <LeaveComparator />
            </div>
            <div className="mt-12">
                <AdSenseBanner />
            </div>
        </div>
    );
}
