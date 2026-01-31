import { Metadata } from "next";
import HrDashboard from "@/components/hr/HrDashboard";

export const metadata: Metadata = {
    title: "HR 올인원 대시보드 | CSV 대량 연차 관리",
    description: "인사팀을 위한 최고의 솔루션. 전 직원의 연차 수당, 촉진 일정, 퇴직 정산 리스크를 CSV 업로드 한 번으로 관리하세요.",
};

export default function HrAdminPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <HrDashboard />
            </div>
        </div>
    );
}
