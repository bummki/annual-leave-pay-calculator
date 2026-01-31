import { Metadata } from "next";
import HolidaySimulator from "@/components/calculator/HolidaySimulator";

export const metadata: Metadata = {
    title: "2025 황금연휴 시뮬레이터 | 연차 최적화",
    description: "연차 1개로 10일을 쉰다고? 2025년 공휴일을 분석하여 가성비 최고의 휴가 일정을 추천해드립니다.",
};

export default function CalendarPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <header className="mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-foreground mb-4">2025 황금연휴 시뮬레이터</h1>
                <p className="text-muted-foreground">
                    단순히 연차 개수만 세지 마세요.<br />
                    <span className="text-accent font-bold">최소한의 연차</span>로 <span className="text-primary font-bold">가장 길게 쉴 수 있는</span> 전략을 알려드립니다.
                </p>
            </header>
            <div className="max-w-4xl mx-auto">
                <HolidaySimulator />
            </div>
        </div>
    );
}
