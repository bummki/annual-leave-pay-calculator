export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />

      <main className="z-10 text-center max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary">
            연차, 단순한 휴가가 아닌<br />
            <span className="text-accent">소중한 권리</span>입니다.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            나의 남은 연차가 <strong>돈으로 얼마인지</strong>,
            <strong>언제 사라지는지</strong>, <br />
            <strong>퇴직할 때 손해보지는 않는지</strong> 정확하게 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mx-auto">
          <a
            href="/calculator/money"
            className="premium-gradient text-primary-foreground font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform flex items-center justify-center"
          >
            연차 수당 계산하기
          </a>
          <a
            href="/calculator/leave-days"
            className="bg-white border-2 border-primary text-primary font-bold py-4 px-6 rounded-xl shadow-md hover:bg-slate-50 hover:scale-105 transition-all duration-300 text-lg flex items-center justify-center"
          >
            입사일 vs 회계연도 비교
          </a>
          <a
            href="/calculator/promotion"
            className="bg-white border-2 border-primary text-primary font-bold py-4 px-6 rounded-xl shadow-md hover:bg-slate-50 hover:scale-105 transition-all duration-300 text-lg flex items-center justify-center"
          >
            연차 촉진 알림 확인
          </a>
          <a
            href="/calculator/calendar"
            className="md:col-span-2 bg-indigo-50 border-2 border-indigo-200 text-indigo-700 font-bold py-4 px-6 rounded-xl shadow-sm hover:bg-indigo-100 hover:scale-105 transition-all duration-300 text-lg flex items-center justify-center"
          >
            2025 황금연휴 찾기
          </a>
          <a
            href="/calculator/new-hire"
            className="md:col-span-2 bg-emerald-50 border-2 border-emerald-200 text-emerald-700 font-bold py-4 px-6 rounded-xl shadow-sm hover:bg-emerald-100 hover:scale-105 transition-all duration-300 text-lg flex items-center justify-center"
          >
            신입사원(1년 미만) 연차 현황
          </a>
        </div>
      </main>

      <footer className="absolute bottom-4 text-sm text-slate-400">
        © 2026 PagePulse SEO. All rights reserved.
      </footer>
    </div>
  );
}
