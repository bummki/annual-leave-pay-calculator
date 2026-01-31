import { Metadata } from "next";
import MoneyCalculator from "./MoneyCalculator";

export const metadata: Metadata = {
    title: "연차수당 계산기 | 내 연차는 돈으로 얼마일까?",
    description: "남은 연차를 돈으로 환산해보세요. 월 급여와 근무시간만 입력하면 바로 계산됩니다.",
};

export default function MoneyCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <header className="mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-foreground mb-4">연차수당 계산기</h1>
                <p className="text-muted-foreground">
                    사용하지 못한 연차, 포기하지 마세요.<br />
                    근로기준법에 따라 정당하게 받을 수 있는 수당을 미리 계산해드립니다.
                </p>
            </header>
            <MoneyCalculator />
        </div>
    );
}
