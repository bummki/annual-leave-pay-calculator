import { Metadata } from "next";
import PromotionClient from "./PromotionClient";
import AdSenseBanner from "@/components/layout/AdSense";

export const metadata: Metadata = {
    title: "연차 사용 촉진 알림 계산기 | 법정 통보 일정",
    description: "근로기준법 제61조에 따른 연차 사용 촉진 제도의 1차/2차 통보 시기를 자동으로 계산해드립니다.",
};

export default function PromotionPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <header className="mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-foreground mb-4">연차 사용 촉진 알림</h1>
                <p className="text-muted-foreground">
                    근로기준법 제61조에 따라 회사는 미사용 연차에 대해 <span className="text-primary font-bold">사용 촉진 의무</span>가 있습니다.<br />
                    법정 통보 시기를 정확히 계산해보세요.
                </p>
            </header>
            <div className="max-w-4xl mx-auto">
                <PromotionClient />
            </div>
            <div className="mt-12">
                <AdSenseBanner />
            </div>
        </div>
    );
}
