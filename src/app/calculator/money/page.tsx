import { Metadata } from "next";
import MoneyCalculator from "./MoneyCalculator";
import AdSenseBanner from "@/components/layout/AdSense";

export const metadata: Metadata = {
    title: "연차수당 계산기 | 미사용 연차를 돈으로 환산",
    description: "남은 연차를 정확한 금액으로 계산해보세요. 통상임금 기준 자동 계산 및 치킨 지수 제공.",
};

export default function MoneyCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <header className="mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-foreground mb-4">연차수당 계산기</h1>
                <p className="text-muted-foreground">
                    남은 연차를 <span className="text-primary font-bold">돈</span>으로 환산하면 얼마일까요?<br />
                    통상임금 기준으로 정확하게 계산해 드립니다.
                </p>
            </header>
            <div className="max-w-2xl mx-auto">
                <MoneyCalculator />
            </div>
            <div className="mt-12">
                <AdSenseBanner />
            </div>
        </div>
    );
}
