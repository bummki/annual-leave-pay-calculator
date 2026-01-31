import { Metadata } from "next";
import NewHireSimulator from "@/components/calculator/NewHireSimulator";

export const metadata: Metadata = {
    title: "신입사원(1년 미만) 연차 계산기 | 월차 발생 현황",
    description: "입사 1년 미만 신입사원의 월별 연차 발생 현황과 소멸 시기를 한눈에 확인하세요.",
};

export default function NewHirePage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <header className="mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-foreground mb-4">신입사원 연차 현황판</h1>
                <p className="text-muted-foreground">
                    입사 1년 미만일 때는 매월 개근 시 1일씩 생깁니다.<br />
                    <span className="text-primary font-bold">1년이 지나면 사라지는</span> 소중한 연차, 놓치지 말고 확인하세요.
                </p>
            </header>
            <div className="max-w-5xl mx-auto">
                <NewHireSimulator />
            </div>
        </div>
    );
}
