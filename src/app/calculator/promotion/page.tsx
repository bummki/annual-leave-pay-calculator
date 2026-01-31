import { Metadata } from "next";
import PromotionClient from "./PromotionClient";

export const metadata: Metadata = {
    title: "연차 사용 촉진 시기 계산기 | 합법적 연차 소멸 관리",
    description: "근로기준법 제61조에 따른 연차 사용 촉진 시기를 자동 계산하고, 필요한 서식을 안내받으세요.",
};

export default function PromotionPageContainer() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <header className="mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-foreground mb-4">연차 사용 촉진 알림</h1>
                <p className="text-muted-foreground">
                    연차 수당 지급 의무를 면제받으려면?<br />
                    <span className="text-primary font-bold">법적 시기</span>에 맞춰 정확하게 서면 통보를 해야 합니다.
                </p>
            </header>
            <PromotionClient />
        </div>
    );
}
