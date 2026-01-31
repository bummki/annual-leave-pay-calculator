import { Metadata } from "next";
import LeaveComparator from "@/components/calculator/LeaveComparator";

export const metadata: Metadata = {
    title: "입사일 기준 vs 회계연도 기준 연차 계산 | 직장인 권리 챙김",
    description: "입사일 기준과 회계연도 기준 연차 발생 일수를 한눈에 비교하고, 퇴직 시 유리한 정산 방식을 확인하세요.",
};

export default function LeaveDaysPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <header className="mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-foreground mb-4">연차 발생 기준 비교</h1>
                <p className="text-muted-foreground">
                    회사는 편의상 회계연도(1.1) 기준으로 연차를 관리할 수 있지만,<br />
                    퇴직 시에는 <span className="text-primary font-bold">입사일 기준</span>과 비교하여 근로자에게 유리한 방식으로 정산해야 합니다.
                </p>
            </header>
            <LeaveComparator />
        </div>
    );
}
